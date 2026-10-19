import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getSanityClient: vi.fn(),
  create: vi.fn(),
  patch: vi.fn(),
  set: vi.fn(),
  commit: vi.fn(),
  sendContactNotification: vi.fn(),
  sendContactConfirmation: vi.fn(),
}));

vi.mock("@/sanity/lib/client", () => ({
  getSanityClient: mocks.getSanityClient,
}));

vi.mock("@/lib/contacts/send-contact-notification", () => ({
  sendContactNotification: mocks.sendContactNotification,
}));

vi.mock("@/lib/contacts/send-contact-confirmation", () => ({
  sendContactConfirmation: mocks.sendContactConfirmation,
}));

import { createContact } from "@/lib/contacts/create-contact";

const validContact = {
  name: "Test Contact",
  email: "contact@example.com",
  phone: "+2348000000000",
  company: "Example Trading Ltd",
  country: "Nigeria",
  message: "We would like to discuss your agricultural commodities.",
};

const context = {
  requestId: "test-request-001",
  ip: "203.0.113.20",
};

describe("createContact integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.getSanityClient.mockReturnValue({
      create: mocks.create,
      patch: mocks.patch,
    });

    mocks.create.mockResolvedValue({
      _id: "contact-document-001",
    });

    mocks.patch.mockReturnValue({
      set: mocks.set,
    });

    mocks.set.mockReturnValue({
      commit: mocks.commit,
    });

    mocks.commit.mockResolvedValue({});

    mocks.sendContactNotification.mockResolvedValue(undefined);
    mocks.sendContactConfirmation.mockResolvedValue(undefined);
  });

  it("saves the contact and records successful email statuses", async () => {
    const result = await createContact(validContact, context);

    expect(result.success).toBe(true);

    if (!result.success) {
      throw new Error("Expected contact creation to succeed");
    }

    expect(result.reference).toMatch(/^GPG-\d{4}-[A-F0-9]{8}$/);
    expect(result.emailWarning).toBe(false);

    expect(mocks.create).toHaveBeenCalledOnce();

    expect(mocks.create).toHaveBeenCalledWith(
      expect.objectContaining({
        _type: "contact",
        requestId: context.requestId,
        reference: result.reference,
        name: validContact.name,
        email: validContact.email,
        message: validContact.message,
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

    expect(mocks.sendContactNotification).toHaveBeenCalledOnce();
    expect(mocks.sendContactConfirmation).toHaveBeenCalledOnce();

    expect(mocks.patch).toHaveBeenCalledWith("contact-document-001");

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

  it("preserves the saved contact when notification email fails", async () => {
    mocks.sendContactNotification.mockRejectedValueOnce(
      new Error("Simulated notification failure"),
    );

    const consoleSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    try {
      const result = await createContact(validContact, context);

      expect(result.success).toBe(true);

      if (!result.success) {
        throw new Error("Expected the saved contact to remain successful");
      }

      expect(result.emailWarning).toBe(true);
      expect(mocks.create).toHaveBeenCalledOnce();

      expect(mocks.set).toHaveBeenCalledWith(
        expect.objectContaining({
          notificationEmailStatus: "failed",
        }),
      );

      // Customer confirmation should still be attempted.
      expect(mocks.sendContactConfirmation).toHaveBeenCalledOnce();

      expect(mocks.set).toHaveBeenCalledWith(
        expect.objectContaining({
          confirmationEmailStatus: "sent",
        }),
      );
    } finally {
      consoleSpy.mockRestore();
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
      const result = await createContact(validContact, context);

      expect(result.success).toBe(false);

      expect(mocks.create).toHaveBeenCalledOnce();
      expect(mocks.patch).not.toHaveBeenCalled();
      expect(mocks.sendContactNotification).not.toHaveBeenCalled();
      expect(mocks.sendContactConfirmation).not.toHaveBeenCalled();
    } finally {
      consoleSpy.mockRestore();
    }
  });
});