import { z } from "zod";

const baseInquirySchema = z.object({
  type: z.enum([
    "product",
    "partnership",
    "export_buyer",
  ]),

  requestId: z
    .string()
    .trim()
    .max(100, "Request ID is too long."),
    
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long."),

  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .trim()
    .max(150, "Company name is too long.")
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .trim()
    .max(100, "Country name is too long.")
    .optional()
    .or(z.literal("")),

  subject: z
    .string()
    .trim()
    .max(200, "Subject is too long.")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(
      10,
      "Please provide at least 10 characters."
    )
    .max(
      5000,
      "Message is too long."
    ),

  product: z
    .string()
    .trim()
    .max(150, "Product name is too long.")
    .optional()
    .or(z.literal("")),

  quantity: z
    .string()
    .trim()
    .max(100, "Quantity is too long.")
    .optional()
    .or(z.literal("")),

  packaging: z
    .string()
    .trim()
    .max(200, "Packaging information is too long.")
    .optional()
    .or(z.literal("")),

  destination: z
    .string()
    .trim()
    .max(150, "Destination is too long.")
    .optional()
    .or(z.literal("")),

  organizationType: z
    .string()
    .trim()
    .max(150, "Organisation type is too long.")
    .optional()
    .or(z.literal("")),

  market: z
    .string()
    .trim()
    .max(150, "Market information is too long.")
    .optional()
    .or(z.literal("")),

  companyWebsite: z
    .string()
    .trim()
    .max(300, "Website address is too long.")
    .optional()
    .or(z.literal("")),

  partnershipFocus: z
    .string()
    .trim()
    .max(200, "Partnership focus is too long.")
    .optional()
    .or(z.literal("")),

  /**
   * Honeypot.
   *
   * This is intentionally not restricted to an empty
   * value here. The API route handles non-empty values
   * as bot submissions and returns a fake success.
   */
  website: z
    .string()
    .max(500, "Invalid honeypot value.")
    .optional()
    .or(z.literal("")),
});

export const inquirySchema =
  baseInquirySchema.superRefine(
    (data, ctx) => {
      /*
       * Product quotation
       */
      if (data.type === "product") {
        if (!data.product) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["product"],
            message: "Please specify the product.",
          });
        }

        if (!data.quantity) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["quantity"],
            message: "Please specify the quantity required.",
          });
        }

        if (!data.destination) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["destination"],
            message: "Please specify the destination.",
          });
        }
      }

      /*
       * Export buyer enquiry
       */
      if (data.type === "export_buyer") {
        if (!data.product) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["product"],
            message: "Please specify the product required.",
          });
        }
      }

      /*
       * Partnership enquiry
       */
      if (data.type === "partnership") {
        if (!data.partnershipFocus) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["partnershipFocus"],
            message: "Please describe the partnership opportunity.",
          });
        }
      }
    }
  );

export type InquiryInput =
  z.infer<typeof inquirySchema>;