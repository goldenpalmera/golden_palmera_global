import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimit: Ratelimit | null = null;

function getRateLimiter(): Ratelimit {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url) {
    throw new Error(
      "Missing UPSTASH_REDIS_REST_URL environment variable."
    );
  }

  if (!token) {
    throw new Error(
      "Missing UPSTASH_REDIS_REST_TOKEN environment variable."
    );
  }

  if (!ratelimit) {
    const redis = new Redis({
      url,
      token,
    });

    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
    });
  }

  return ratelimit;
}

export async function checkRateLimit(identifier: string) {
  const limiter = getRateLimiter();

  return limiter.limit(identifier);
}