
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  checkRateLimit: vi.fn(),
  createContact: vi.fn(),
}));

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: mocks.checkRateLimit,
}));

vi.mock("@/lib/contacts/create-contact", () => ({
  createContact: mocks.createContact,
}));

import { POST } from "../../app/api/contact/route";

const validContact = {
  name: "Test Customer",
  email: "customer@example.com",
  message: "I would like to discuss your agricultural commodities.",
};

function makeRequest(
  body: string,
  origin = "https://example.com",
) {
  return new Request("https://example.com/api/contact", {
    method: "POST",
    headers: {
      origin,
      "content-type": "application/json",
      "x-forwarded-for": "203.0.113.10",
    },
    body,
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    process.env.ALLOWED_ORIGINS = "https://example.com";

    mocks.checkRateLimit.mockResolvedValue({
      success: true,
    });

    mocks.createContact.mockResolvedValue({
      success: true,
      reference: "GPG-2026-TEST01",
    });
  });

  it("rejects requests from an unapproved origin", async () => {
    const response = await POST(
      makeRequest(JSON.stringify(validContact), "https://untrusted.example"),
    );

    expect(response.status).toBe(403);
    expect(mocks.checkRateLimit).not.toHaveBeenCalled();
    expect(mocks.createContact).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(makeRequest("{"));

    expect(response.status).toBe(400);
    expect(mocks.createContact).not.toHaveBeenCalled();
  });

  it("rejects invalid form data", async () => {
    const response = await POST(
      makeRequest(
        JSON.stringify({
          name: "A",
          email: "not-an-email",
          message: "Short",
        }),
      ),
    );

    expect(response.status).toBe(400);
    expect(mocks.createContact).not.toHaveBeenCalled();

    const body = await response.json();
    expect(body.fields).toBeDefined();
  });


  it("accepts a honeypot submission without saving it", async () => {
    const response = await POST(
      makeRequest(
        JSON.stringify({
          ...validContact,
          website: "bot-filled-value",
        }),
      ),
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);

    expect(mocks.checkRateLimit).not.toHaveBeenCalled();
    expect(mocks.createContact).not.toHaveBeenCalled();
  });


  it("returns 429 when the rate limit is exceeded", async () => {
    mocks.checkRateLimit.mockResolvedValue({
      success: false,
    });

    const response = await POST(
      makeRequest(JSON.stringify(validContact)),
    );

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("600");
    expect(mocks.createContact).not.toHaveBeenCalled();
  });

  it("creates a contact and returns its reference", async () => {
    const response = await POST(
      makeRequest(JSON.stringify(validContact)),
    );

    expect(response.status).toBe(201);

    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.reference).toBe("GPG-2026-TEST01");
    expect(body.requestId).toBeTruthy();

    expect(mocks.checkRateLimit).toHaveBeenCalledWith(
      "203.0.113.10",
    );

    expect(mocks.createContact).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Test Customer",
        email: "customer@example.com",
      }),
      expect.objectContaining({
        requestId: expect.any(String),
        ip: "203.0.113.10",
      }),
    );
  });

  it("returns 500 when contact creation fails", async () => {
    mocks.createContact.mockResolvedValue({
      success: false,
      error: "Unable to save the enquiry.",
    });

    const response = await POST(
      makeRequest(JSON.stringify(validContact)),
    );

    expect(response.status).toBe(500);
    expect(mocks.createContact).toHaveBeenCalledOnce();
  });

  it("returns 503 when both rate-limit backends are unavailable", async () => {
    mocks.checkRateLimit.mockRejectedValue(
      new Error("All rate-limit backends are unavailable."),
    );

    const response = await POST(
      makeRequest(JSON.stringify(validContact)),
    );

    expect(response.status).toBe(503);
    expect(response.headers.get("Retry-After")).toBe("60");
    expect(mocks.createContact).not.toHaveBeenCalled();

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.requestId).toBeTruthy();
  });
});
