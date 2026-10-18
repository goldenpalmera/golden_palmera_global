
import { afterEach, describe, expect, it } from "vitest";
import { getClientIp } from "@/lib/security/client-ip";
import { validateOrigin } from "@/lib/security/validate-origin";
import { generateRequestId } from "@/lib/security/request-id";

describe("validateOrigin", () => {
  afterEach(() => {
    delete process.env.ALLOWED_ORIGINS;
  });

  it("rejects a request without an Origin header", () => {
    process.env.ALLOWED_ORIGINS = "https://goldenpalmeraglobal.com";

    expect(validateOrigin(new Request("https://example.com"))).toBe(false);
  });

  it("accepts an allowed origin", () => {
    process.env.ALLOWED_ORIGINS = "https://goldenpalmeraglobal.com";

    const request = new Request("https://example.com", {
      headers: {
        origin: "https://goldenpalmeraglobal.com",
      },
    });

    expect(validateOrigin(request)).toBe(true);
  });

  it("rejects an unapproved origin", () => {
    process.env.ALLOWED_ORIGINS = "https://goldenpalmeraglobal.com";

    const request = new Request("https://example.com", {
      headers: {
        origin: "https://attacker.example",
      },
    });

    expect(validateOrigin(request)).toBe(false);
  });

  it("normalizes a trailing slash in the configured origin", () => {
    process.env.ALLOWED_ORIGINS = "https://goldenpalmeraglobal.com/";

    const request = new Request("https://example.com", {
      headers: {
        origin: "https://goldenpalmeraglobal.com",
      },
    });

    expect(validateOrigin(request)).toBe(true);
  });
});

describe("getClientIp", () => {
  it("uses the first forwarded IP", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.10, 10.0.0.1",
    });

    expect(getClientIp(headers)).toBe("203.0.113.10");
  });

  it("falls back to x-real-ip", () => {
    const headers = new Headers({
      "x-real-ip": "203.0.113.20",
    });

    expect(getClientIp(headers)).toBe("203.0.113.20");
  });

  it("returns unknown when no IP headers exist", () => {
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});

describe("generateRequestId", () => {
  it("generates a UUID", () => {
    expect(generateRequestId()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });
});
