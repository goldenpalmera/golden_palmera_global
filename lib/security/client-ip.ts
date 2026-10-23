// import type { Headers } from "next/headers";

export function getClientIp(
  headers: Headers
) {
  const forwardedFor =
    headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor
      .split(",")[0]
      .trim();
  }

  const realIp =
    headers.get("x-real-ip");

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}
