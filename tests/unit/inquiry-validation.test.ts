import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/validation/inquiry-validation";

describe("inquirySchema", () => {
  const validProductInquiry = {
    type: "product",
    name: "Jane Doe",
    email: "JANE@EXAMPLE.COM",
    phone: "+2348012345678",
    company: "Example Ltd",
    country: "Nigeria",
    product: "Sesame Seed",
    quantity: "20 MT",
    packaging: "Bags",
    destination: "Rotterdam, Netherlands",
    message: "We need a quotation for our next shipment.",
    website: "",
  };

  const validExportBuyerInquiry = {
    type: "export_buyer",
    name: "John Smith",
    email: "john@example.com",
    phone: "+441234567890",
    company: "Global Imports Ltd",
    country: "United Kingdom",
    product: "Dried Ginger",
    destination: "London, United Kingdom",
    message: "We are interested in importing dried ginger.",
    website: "",
  };

  const validPartnershipInquiry = {
    type: "partnership",
    name: "Mary Johnson",
    email: "mary@example.com",
    phone: "+2348012345678",
    company: "Agricultural Partners Ltd",
    country: "Nigeria",
    partnershipFocus: "Farmer aggregation",
    message: "We would like to discuss a supply partnership.",
    website: "",
  };

  describe("product inquiries", () => {
    it("accepts a valid product inquiry", () => {
      const result = inquirySchema.safeParse(validProductInquiry);

      expect(result.success).toBe(true);
    });

    it("requires a product", () => {
      const { product: _product, ...inquiry } = validProductInquiry;

      const result = inquirySchema.safeParse(inquiry);

      expect(result.success).toBe(false);
    });

    it("requires a quantity", () => {
      const { quantity: _quantity, ...inquiry } = validProductInquiry;

      const result = inquirySchema.safeParse(inquiry);

      expect(result.success).toBe(false);
    });

    it("requires a destination", () => {
      const { destination: _destination, ...inquiry } = validProductInquiry;

      const result = inquirySchema.safeParse(inquiry);

      expect(result.success).toBe(false);
    });
  });

  describe("export buyer inquiries", () => {
    it("accepts a valid export buyer inquiry", () => {
      const result = inquirySchema.safeParse(validExportBuyerInquiry);

      expect(result.success).toBe(true);
    });

    it("requires a product", () => {
      const { product: _product, ...inquiry } = validExportBuyerInquiry;

      const result = inquirySchema.safeParse(inquiry);

      expect(result.success).toBe(false);
    });
  });

  describe("partnership inquiries", () => {
    it("accepts a valid partnership inquiry", () => {
      const result = inquirySchema.safeParse(validPartnershipInquiry);

      expect(result.success).toBe(true);
    });

    it("requires a partnership focus", () => {
      const {
        partnershipFocus: _partnershipFocus,
        ...inquiry
      } = validPartnershipInquiry;

      const result = inquirySchema.safeParse(inquiry);

      expect(result.success).toBe(false);
    });
  });

  describe("shared validation", () => {
    it("rejects an unsupported inquiry type", () => {
      const result = inquirySchema.safeParse({
        ...validProductInquiry,
        type: "unknown",
      });

      expect(result.success).toBe(false);
    });

    it("rejects an invalid email address", () => {
      const result = inquirySchema.safeParse({
        ...validProductInquiry,
        email: "not-an-email",
      });

      expect(result.success).toBe(false);
    });

    it("normalizes the email address", () => {
      const result = inquirySchema.safeParse(validProductInquiry);

      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.email).toBe("jane@example.com");
      }
    });

    it("allows a populated honeypot through schema validation", () => {
      const result = inquirySchema.safeParse({
        ...validProductInquiry,
        website: "https://spam.example",
      });

      expect(result.success).toBe(true);
    });

    it("rejects a message shorter than ten characters", () => {
      const result = inquirySchema.safeParse({
        ...validProductInquiry,
        message: "Too short",
      });

      expect(result.success).toBe(false);
    });
  });
});
