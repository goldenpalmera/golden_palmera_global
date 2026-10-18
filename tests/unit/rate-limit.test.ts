import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  limit: vi.fn(),
  slidingWindow: vi.fn(() => "sliding-window-limiter"),
  queryRaw: vi.fn(),
  deleteMany: vi.fn(),
  findMany: vi.fn(),
  create: vi.fn(),
  transaction: vi.fn(),
}));

vi.mock("server-only", () => ({}));

vi.mock("@upstash/ratelimit", () => {
  class MockRatelimit {
    static slidingWindow = mocks.slidingWindow;
    limit = mocks.limit;
    constructor(_options: unknown) {}
  }

  return { Ratelimit: MockRatelimit };
});

vi.mock("@upstash/redis", () => ({
  Redis: class MockRedis {
    constructor(_options: unknown) {}
  },
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    $transaction: mocks.transaction,
  },
}));

const IDENTIFIER = "203.0.113.20";
const HASH_SECRET = "test-only-rate-limit-hash-secret";

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    process.env.UPSTASH_REDIS_REST_URL = "https://test-redis.example";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-only-token";
    process.env.RATE_LIMIT_HASH_SECRET = HASH_SECRET;

    mocks.limit.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 10 * 60 * 1000,
    });

    mocks.queryRaw.mockResolvedValue([]);
    mocks.deleteMany.mockResolvedValue({ count: 0 });
    mocks.findMany.mockResolvedValue([]);
    mocks.create.mockResolvedValue({});

    mocks.transaction.mockImplementation(
      async (callback: (tx: any) => Promise<unknown>) =>
        callback({
          $queryRaw: mocks.queryRaw,
          rateLimitEvent: {
            deleteMany: mocks.deleteMany,
            findMany: mocks.findMany,
            create: mocks.create,
          },
        }),
    );

    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("uses Upstash when it succeeds", async () => {
    const upstashResult = {
      success: true,
      limit: 5,
      remaining: 3,
      reset: Date.now() + 60_000,
    };

    mocks.limit.mockResolvedValue(upstashResult);

    const { checkRateLimit } = await import("@/lib/security/rate-limit");
    const result = await checkRateLimit(IDENTIFIER);

    expect(result).toEqual(upstashResult);
    expect(mocks.limit).toHaveBeenCalledWith(IDENTIFIER);
    expect(mocks.transaction).not.toHaveBeenCalled();
  });

  it("uses PostgreSQL when Upstash fails", async () => {
    mocks.limit.mockRejectedValue(new Error("Upstash unavailable"));

    const { checkRateLimit } = await import("@/lib/security/rate-limit");
    const result = await checkRateLimit(IDENTIFIER);

    expect(result.success).toBe(true);
    expect(result.limit).toBe(5);
    expect(result.remaining).toBe(4);

    expect(mocks.transaction).toHaveBeenCalledOnce();
    expect(mocks.queryRaw).toHaveBeenCalledOnce();

    expect(mocks.deleteMany).toHaveBeenCalledOnce();
    expect(mocks.findMany).toHaveBeenCalledOnce();

    expect(mocks.create).toHaveBeenCalledOnce();

    const createCall = mocks.create.mock.calls[0][0] as {
      data: { keyHash: string };
    };

    expect(createCall.data.keyHash).toMatch(/^[a-f0-9]{64}$/);
    expect(createCall.data.keyHash).not.toBe(IDENTIFIER);
  });

  it("rejects a request when five events already exist in the window", async () => {
    mocks.limit.mockRejectedValue(new Error("Upstash unavailable"));

    const now = Date.now();
    const oldestEvent = new Date(now - 5 * 60 * 1000);

    mocks.findMany.mockResolvedValue([
      { createdAt: oldestEvent },
      { createdAt: new Date(now - 4 * 60 * 1000) },
      { createdAt: new Date(now - 3 * 60 * 1000) },
      { createdAt: new Date(now - 2 * 60 * 1000) },
      { createdAt: new Date(now - 1 * 60 * 1000) },
    ]);

    const { checkRateLimit } = await import("@/lib/security/rate-limit");
    const result = await checkRateLimit(IDENTIFIER);

    expect(result.success).toBe(false);
    expect(result.limit).toBe(5);
    expect(result.remaining).toBe(0);
    expect(result.reset).toBe(oldestEvent.getTime() + 10 * 60 * 1000);

    expect(mocks.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          createdAt: expect.objectContaining({
            gte: expect.any(Date),
          }),
        }),
        take: 5,
      }),
    );

    expect(mocks.create).not.toHaveBeenCalled();
  });

  it("fails closed when both Upstash and PostgreSQL are unavailable", async () => {
    mocks.limit.mockRejectedValue(new Error("Upstash unavailable"));
    mocks.transaction.mockRejectedValue(new Error("PostgreSQL unavailable"));

    const { checkRateLimit } = await import("@/lib/security/rate-limit");

    await expect(checkRateLimit(IDENTIFIER)).rejects.toThrow(
      "All rate-limit backends are unavailable.",
    );

    expect(mocks.limit).toHaveBeenCalledWith(IDENTIFIER);
    expect(mocks.transaction).toHaveBeenCalledOnce();
  });
});
