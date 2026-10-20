import "dotenv/config";

import { createHmac, randomUUID } from "node:crypto";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";

vi.mock("server-only", () => ({}));

vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: class MockRatelimit {
    static slidingWindow() {
      return "sliding-window-limiter";
    }

    async limit() {
      throw new Error("Simulated Upstash outage");
    }
  },
}));

vi.mock("@upstash/redis", () => ({
  Redis: class MockRedis {
    constructor() {}
  },
}));

import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/security/rate-limit";

const previousUpstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const previousUpstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const TEST_HASH_SECRET = "gpg-rate-limit-integration-test-secret";
const activeHashes = new Set<string>();

function hashIdentifier(identifier: string): string {
  return createHmac("sha256", TEST_HASH_SECRET)
    .update(identifier)
    .digest("hex");
}

function createTestIdentifier(label: string): string {
  const identifier = `integration-test:${label}:${randomUUID()}`;
  activeHashes.add(hashIdentifier(identifier));
  return identifier;
}

describe("PostgreSQL rate-limit fallback integration", () => {
  const previousHashSecret = process.env.RATE_LIMIT_HASH_SECRET;

  beforeAll(() => {
    process.env.UPSTASH_REDIS_REST_URL = "https://test-redis.example";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-only-token";
    
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is missing. Configure your local test database first.",
      );
    }

    process.env.RATE_LIMIT_HASH_SECRET = TEST_HASH_SECRET;
  });

  afterEach(async () => {
    // Remove only rate-limit events created by this test file.
    for (const keyHash of activeHashes) {
      await prisma.rateLimitEvent.deleteMany({
        where: { keyHash },
      });
    }

    activeHashes.clear();
  });

  afterAll(async () => {
    if (previousHashSecret === undefined) {
      delete process.env.RATE_LIMIT_HASH_SECRET;
    } else {
      process.env.RATE_LIMIT_HASH_SECRET = previousHashSecret;
    }

    if (previousUpstashUrl === undefined) {
      delete process.env.UPSTASH_REDIS_REST_URL;
    } else {
      process.env.UPSTASH_REDIS_REST_URL = previousUpstashUrl;
    }

    if (previousUpstashToken === undefined) {
      delete process.env.UPSTASH_REDIS_REST_TOKEN;
    } else {
      process.env.UPSTASH_REDIS_REST_TOKEN = previousUpstashToken;
    }

    await prisma.$disconnect();
  });

  it("allows five requests and rejects the sixth", async () => {
    const identifier = createTestIdentifier("limit");

    const results = [];

    for (let i = 0; i < 6; i++) {
      results.push(await checkRateLimit(identifier));
    }

    expect(results.map((result) => result.success)).toEqual([
      true,
      true,
      true,
      true,
      true,
      false,
    ]);

    expect(results[4].remaining).toBe(0);
    expect(results[5].remaining).toBe(0);

    const count = await prisma.rateLimitEvent.count({
      where: { keyHash: hashIdentifier(identifier) },
    });

    expect(count).toBe(5);
  });

  it("keeps limits independent for different identifiers", async () => {
    const firstIdentifier = createTestIdentifier("first");
    const secondIdentifier = createTestIdentifier("second");

    for (let i = 0; i < 5; i++) {
      const result = await checkRateLimit(firstIdentifier);
      expect(result.success).toBe(true);
    }

    const secondResult = await checkRateLimit(secondIdentifier);
    expect(secondResult.success).toBe(true);

    const blockedResult = await checkRateLimit(firstIdentifier);
    expect(blockedResult.success).toBe(false);

    const secondStillAllowed = await checkRateLimit(secondIdentifier);
    expect(secondStillAllowed.success).toBe(true);
  });

  it("does not count events older than ten minutes", async () => {
    const identifier = createTestIdentifier("expired");
    const keyHash = hashIdentifier(identifier);

    await prisma.rateLimitEvent.create({
      data: {
        keyHash,
        createdAt: new Date(Date.now() - 11 * 60 * 1000),
      },
    });

    // The expired event should be removed and must not consume a slot.
    for (let i = 0; i < 5; i++) {
      const result = await checkRateLimit(identifier);
      expect(result.success).toBe(true);
    }

    const blockedResult = await checkRateLimit(identifier);
    expect(blockedResult.success).toBe(false);

    const events = await prisma.rateLimitEvent.findMany({
      where: { keyHash },
      select: { createdAt: true },
    });

    expect(events).toHaveLength(5);
    expect(
      events.every(
        (event) => event.createdAt.getTime() >= Date.now() - 10 * 60 * 1000,
      ),
    ).toBe(true);
  });

  it("enforces the limit under concurrent requests", async () => {
    const identifier = createTestIdentifier("concurrent");

    const results = await Promise.all(
      Array.from({ length: 10 }, () => checkRateLimit(identifier)),
    );

    expect(results.filter((result) => result.success)).toHaveLength(5);
    expect(results.filter((result) => !result.success)).toHaveLength(5);

    const count = await prisma.rateLimitEvent.count({
      where: { keyHash: hashIdentifier(identifier) },
    });

    expect(count).toBe(5);
  });
});
