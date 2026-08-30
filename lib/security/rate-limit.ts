import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

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

const redis = new Redis({
  url,
  token,
});

export const inquiryRateLimit = new Ratelimit({
  redis,

  limiter: Ratelimit.slidingWindow(
    5,
    "10 m"
  ),

  analytics: true,

  prefix: "gpg:inquiry",
});

export const contactRateLimit = new Ratelimit({
  redis,

  limiter: Ratelimit.slidingWindow(
    5,
    "10 m"
  ),

  analytics: true,

  prefix: "gpg:inquiry",
});