import { z } from "zod";

export const contactSchema = z.object({
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
    .max(30, "Phone nummber is too long.")
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .trim()
    .max(200, "Country name is too long.")
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .trim()
    .max(150, "Company name is too long.")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(
      10,
      "Please tell us a little more about your requirements."
    )
    .max(
      5000,
      "Message is too long."
    ),

  website: z
    .string()
    .max(0)
    .optional()
    .or(z.literal("")),
});

export type ContactInput =
  z.infer<typeof contactSchema>;