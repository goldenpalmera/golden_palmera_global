import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  checkRateLimit: vi.fn(),
  createInquiry: vi.fn(),
}));

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: mocks.checkRateLimit,
}));

vi.mock("@/lib/inquiries/create-inquiry", () => ({
  createInquiry: mocks.createInquiry,
}));

import { POST } from "../../app/api/inquiry/route";

const validInquiry = {
  type: "product",
  name: "Test Buyer",
  email: "buyer@example.com",
  message: "I would like a quotation for your agricultural products.",
  product: "Sesame seed",
  quantity: "5 metric tonnes",
  destination: "Lagos, Nigeria",
};

function makeRequest(
  body: string,
  origin = "https://example.com",
) {
  return new Request("https://example.com/api/inquiry", {
    method: "POST",
    headers: {
      origin,
      "content-type": "application/json",
      "x-forwarded-for": "203.0.113.20",
    },
    body,
  });
}

describe("POST /api/inquiry", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    process.env.ALLOWED_ORIGINS = "https://example.com";

    mocks.checkRateLimit.mockResolvedValue({
      success: true,
    });

    mocks.createInquiry.mockResolvedValue({
      success: true,
      reference: "GPG-2026-TEST02",
    });
  });

  it("rejects requests from an unapproved origin", async () => {
    const response = await POST(
      makeRequest(
        JSON.stringify(validInquiry),
        "https://untrusted.example",
      ),
    );

    expect(response.status).toBe(403);
    expect(mocks.checkRateLimit).not.toHaveBeenCalled();
    expect(mocks.createInquiry).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(makeRequest("{"));

    expect(response.status).toBe(400);
    expect(mocks.createInquiry).not.toHaveBeenCalled();
  });

  it("rejects invalid inquiry data", async () => {
    const response = await POST(
      makeRequest(
        JSON.stringify({
          ...validInquiry,
          email: "not-an-email",
        }),
      ),
    );

    expect(response.status).toBe(400);
    expect(mocks.createInquiry).not.toHaveBeenCalled();

    const body = await response.json();
    expect(body.fields).toBeDefined();
  });

  it("returns 429 when the rate limit is exceeded", async () => {
    mocks.checkRateLimit.mockResolvedValue({
      success: false,
    });

    const response = await POST(
      makeRequest(JSON.stringify(validInquiry)),
    );

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("600");
    expect(mocks.createInquiry).not.toHaveBeenCalled();
  });

  it("accepts a honeypot submission without saving it", async () => {
    const response = await POST(
      makeRequest(
        JSON.stringify({
          ...validInquiry,
          website: "bot-filled-value",
        }),
      ),
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);

    expect(mocks.checkRateLimit).not.toHaveBeenCalled();
    expect(mocks.createInquiry).not.toHaveBeenCalled();
  });

  it("creates an inquiry and returns its reference", async () => {
    const response = await POST(
      makeRequest(JSON.stringify(validInquiry)),
    );

    expect(response.status).toBe(201);

    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.reference).toBe("GPG-2026-TEST02");
    expect(body.requestId).toBeTruthy();

    expect(mocks.checkRateLimit).toHaveBeenCalledWith(
      "203.0.113.20",
    );

    expect(mocks.createInquiry).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "product",
        name: "Test Buyer",
        email: "buyer@example.com",
        product: "Sesame seed",
      }),
      expect.objectContaining({
        requestId: expect.any(String),
        ip: "203.0.113.20",
      }),
    );
  });

  it("reports a non-fatal email warning on success", async () => {
    mocks.createInquiry.mockResolvedValue({
      success: true,
      reference: "GPG-2026-TEST03",
      emailWarning: true,
    });

    const response = await POST(
      makeRequest(JSON.stringify(validInquiry)),
    );

    expect(response.status).toBe(201);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.emailWarning).toBe(true);
  });

  it("returns 500 when inquiry creation fails", async () => {
    mocks.createInquiry.mockResolvedValue({
      success: false,
      error: "Unable to save the enquiry.",
    });

    const response = await POST(
      makeRequest(JSON.stringify(validInquiry)),
    );

    expect(response.status).toBe(500);
    expect(mocks.createInquiry).toHaveBeenCalledOnce();
  });

  it("returns 503 when both rate-limit backends are unavailable", async () => {
    mocks.checkRateLimit.mockRejectedValue(
      new Error("All rate-limit backends are unavailable."),
    );

    const response = await POST(
      makeRequest(JSON.stringify(validInquiry)),
    );

    expect(response.status).toBe(503);
    expect(response.headers.get("Retry-After")).toBe("60");
    expect(mocks.createInquiry).not.toHaveBeenCalled();

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.requestId).toBeTruthy();
  });
});
