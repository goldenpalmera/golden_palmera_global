import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/validation/contact-validation";

describe("contactSchema", () => {
  const validContact = {
    name: "Jane Doe",
    email: "JANE@EXAMPLE.COM",
    phone: "+2348012345678",
    country: "Nigeria",
    company: "Example Ltd",
    message: "Please contact me about your products.",
    website: "",
  };

  it("accepts valid contact details", () => {
    const result = contactSchema.safeParse(validContact);

    expect(result.success).toBe(true);
  });

  it("normalizes the email address", () => {
    const result = contactSchema.safeParse(validContact);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.email).toBe("jane@example.com");
    }
  });

  it("rejects an invalid email address", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a message shorter than ten characters", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      message: "Too short",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a name shorter than two characters", () => {
    const result = contactSchema.safeParse({
      ...validContact,
      name: "J",
    });

    expect(result.success).toBe(false);
  });
});
