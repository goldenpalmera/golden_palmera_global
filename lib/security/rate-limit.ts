import "server-only";

import { createHmac } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { prisma } from "@/lib/prisma";

const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

let ratelimit: Ratelimit | null = null;
let fallbackWarningAt = 0;

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

function getRateLimiter(): Ratelimit {
  if (ratelimit) return ratelimit;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Upstash credentials are missing.");
  }

  ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "10 m"),
    prefix: "gpg:inquiry",
  });

  return ratelimit;
}

function hashIdentifier(identifier: string): string {
  const secret = process.env.RATE_LIMIT_HASH_SECRET;

  if (!secret) {
    throw new Error("RATE_LIMIT_HASH_SECRET is missing.");
  }

  return createHmac("sha256", secret)
    .update(identifier)
    .digest("hex");
}

async function checkPostgresFallback(
  identifier: string
): Promise<RateLimitResult> {
  const keyHash = hashIdentifier(identifier);
  const now = new Date();
  const cutoff = new Date(now.getTime() - WINDOW_MS);

  return prisma.$transaction(async (tx) => {
    // Serialize requests sharing the same identifier.
    await tx.$queryRaw`
      SELECT 1
      FROM (
        SELECT pg_advisory_xact_lock(hashtext(${keyHash}))
      ) AS advisory_lock
    `;

    // Remove expired events for this identifier.
    await tx.rateLimitEvent.deleteMany({
      where: {
        keyHash,
        createdAt: { lt: cutoff },
      },
    });

    const events = await tx.rateLimitEvent.findMany({
      where: {
        keyHash,
        createdAt: { gte: cutoff },
      },
      orderBy: { createdAt: "asc" },
      take: MAX_REQUESTS,
      select: { createdAt: true },
    });

    if (events.length >= MAX_REQUESTS) {
      return {
        success: false,
        limit: MAX_REQUESTS,
        remaining: 0,
        reset: events[0].createdAt.getTime() + WINDOW_MS,
      };
    }

    await tx.rateLimitEvent.create({
      data: { keyHash },
    });

    return {
      success: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS - events.length - 1,
      reset:
        events.length > 0
          ? events[0].createdAt.getTime() + WINDOW_MS
          : now.getTime() + WINDOW_MS,
    };
  });
}

export async function checkRateLimit(
  identifier: string
): Promise<RateLimitResult> {
  try {
    // Primary: Upstash.
    return await getRateLimiter().limit(identifier);
  } catch (error) {
    // Do not log the identifier, email, or IP address.
    const now = Date.now();

    if (now - fallbackWarningAt >= 60_000) {
      fallbackWarningAt = now;
      console.error(
        "[RateLimit] Upstash failed; switching to PostgreSQL fallback.",
        error instanceof Error ? error.message : "Unknown error"
      );
    }

    try {
      return await checkPostgresFallback(identifier);
    } catch (fallbackError) {
      console.error(
        "[RateLimit] PostgreSQL fallback failed.",
        fallbackError instanceof Error
          ? fallbackError.message
          : "Unknown error"
      );

      throw new Error("All rate-limit backends are unavailable.");
    }
  }
}
