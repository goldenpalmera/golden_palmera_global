import { beforeEach, describe, expect, it, vi } from "vitest";
import { InquiryInput } from "@/lib/inquiries/types";

const mocks = vi.hoisted(() => ({
  getSanityClient: vi.fn(),
  create: vi.fn(),
  patch: vi.fn(),
  set: vi.fn(),
  commit: vi.fn(),
  sendInquiryNotification: vi.fn(),
  sendCustomerConfirmation: vi.fn(),
}));

vi.mock("@/sanity/lib/client", () => ({
  getSanityClient: mocks.getSanityClient,
}));

vi.mock("@/lib/inquiries/send-inquiry-notification", () => ({
  sendInquiryNotification: mocks.sendInquiryNotification,
}));

vi.mock("@/lib/inquiries/send-customer-email", () => ({
  sendCustomerConfirmation: mocks.sendCustomerConfirmation,
}));

import { createInquiry } from "@/lib/inquiries/create-inquiry";

const validInquiry = {
  type: "product",
  name: "Test Buyer",
  email: "buyer@example.com",
  message: "I would like a quotation for your agricultural products.",
  product: "Sesame seed",
  quantity: "5 metric tonnes",
  destination: "Lagos, Nigeria",
} satisfies InquiryInput;

const context = {
  requestId: "test-inquiry-001",
  ip: "203.0.113.20",
};

describe("createInquiry integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.getSanityClient.mockReturnValue({
      create: mocks.create,
      patch: mocks.patch,
    });

    mocks.create.mockResolvedValue({
      _id: "inquiry-document-001",
    });

    mocks.patch.mockReturnValue({
      set: mocks.set,
    });

    mocks.set.mockReturnValue({
      commit: mocks.commit,
    });

    mocks.commit.mockResolvedValue({});

    mocks.sendInquiryNotification.mockResolvedValue(undefined);
    mocks.sendCustomerConfirmation.mockResolvedValue(undefined);
  });

  it("saves the inquiry and records successful email statuses", async () => {
    const result = await createInquiry(validInquiry, context);

    expect(result.success).toBe(true);

    if (!result.success) {
      throw new Error("Expected inquiry creation to succeed");
    }

    expect(result.reference).toMatch(/^GPG-\d{4}-[A-F0-9]{8}$/);
    expect(result.emailWarning).toBe(false);

    expect(mocks.create).toHaveBeenCalledOnce();

    expect(mocks.create).toHaveBeenCalledWith(
      expect.objectContaining({
        _type: "inquiry",
        requestId: context.requestId,
        reference: result.reference,
        name: validInquiry.name,
        email: validInquiry.email,
        message: validInquiry.message,
        status: "NEW",
        notificationEmailStatus: "pending",
        confirmationEmailStatus: "pending",
        statusHistory: [
          expect.objectContaining({
            status: "NEW",
            changedBy: "system",
          }),
        ],
      }),
    );

    expect(mocks.sendInquiryNotification).toHaveBeenCalledOnce();
    expect(mocks.sendCustomerConfirmation).toHaveBeenCalledOnce();

    expect(mocks.patch).toHaveBeenCalledWith("inquiry-document-001");

    const savedStatuses = mocks.set.mock.calls.map(([value]) => value);

    expect(savedStatuses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          notificationEmailStatus: "sent",
        }),
        expect.objectContaining({
          confirmationEmailStatus: "sent",
        }),
      ]),
    );
  });

  it("preserves the saved inquiry when notification email fails", async () => {
    mocks.sendInquiryNotification.mockRejectedValueOnce(
      new Error("Simulated notification failure"),
    );

    const consoleSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    try {
      const result = await createInquiry(validInquiry, context);

      expect(result.success).toBe(true);

      if (!result.success) {
        throw new Error("Expected the saved inquiry to remain successful");
      }

      expect(result.emailWarning).toBe(true);
      expect(mocks.create).toHaveBeenCalledOnce();

      expect(mocks.set).toHaveBeenCalledWith(
        expect.objectContaining({
          notificationEmailStatus: "failed",
        }),
      );

      // Customer confirmation should still be attempted.
      expect(mocks.sendCustomerConfirmation).toHaveBeenCalledOnce();

      expect(mocks.set).toHaveBeenCalledWith(
        expect.objectContaining({
          confirmationEmailStatus: "sent",
        }),
      );
    } finally {
      consoleSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    }
  });

  it("returns a failure and skips email when initial storage fails", async () => {
    mocks.create.mockRejectedValueOnce(
      new Error("Simulated Sanity storage failure"),
    );

    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    try {
      const result = await createInquiry(validInquiry, context);

      expect(result.success).toBe(false);

      expect(mocks.create).toHaveBeenCalledOnce();
      expect(mocks.patch).not.toHaveBeenCalled();
      expect(mocks.sendInquiryNotification).not.toHaveBeenCalled();
      expect(mocks.sendCustomerConfirmation).not.toHaveBeenCalled();
    } finally {
      consoleSpy.mockRestore();
    }
  });
});
