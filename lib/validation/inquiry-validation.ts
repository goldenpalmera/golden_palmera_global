// lib/validation/inquiry-validation.ts

import { z } from "zod";

export const inquirySchema = z.object({
  type: z.enum([
    "product",
    "general",
    "partnership",
    "export_buyer",
  ]),

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
    .max(254),

  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .trim()
    .max(150)
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .trim()
    .max(100)
    .optional()
    .or(z.literal("")),

  subject: z
    .string()
    .trim()
    .max(200)
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
    .max(150)
    .optional()
    .or(z.literal("")),

  quantity: z
    .string()
    .trim()
    .max(100)
    .optional()
    .or(z.literal("")),

  packaging: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal("")),

  destination: z
    .string()
    .trim()
    .max(150)
    .optional()
    .or(z.literal("")),

  organizationType: z
      .string()
      .trim()
      .max(150)
      .optional()
      .or(z.literal("")),

    market: z
      .string()
      .trim()
      .max(150)
      .optional()
      .or(z.literal("")),

    companyWebsite: z
      .string()
      .trim()
      .max(300)
      .optional()
      .or(z.literal("")),

    partnershipFocus: z
      .string()
      .trim()
      .max(200)
      .optional()
      .or(z.literal("")),

  /**
   * Honeypot.
   *
   * Real users never fill this.
   */
  website: z
    .string()
    .max(0)
    .optional()
    .or(z.literal("")),
});

export type InquiryInput =
  z.infer<typeof inquirySchema>;
