import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .max(200, "phone nummber is too long.")
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .trim()
    .max(200, "Counry name is too long.")
    .optional()
    .or(z.literal("")),

  company: z
    .string()
    .trim()
    .max(200, "Company name is too long.")
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
    .optional()
    .or(z.literal("")),
});

export type ContactInput =
  z.infer<typeof contactSchema>;