import { EmailStatus } from "../email/types";

export const contactStatuses = [
  "NEW",
  "READ",
  "REPLIED",
  "RESOLVED",
  "ARCHIVED",
] as const;

export type ContactStatus =
  (typeof contactStatuses)[number];

export type ContactEmailType = 
  | "notification"
  | "confirmation";

export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  company?: string;
  message: string;
  status: ContactStatus;
  submittedAt: string;
  notificationEmailStatus?: EmailStatus;
  notificationEmailLastAttemptAt?: string;
  notificationEmailSentAt?: string;
  notificationEmailFailedAt?: string;

  confirmationEmailStatus?: EmailStatus;
  confirmationEmailLastAttemptAt?: string;
  confirmationEmailSentAt?: string;
  confirmationEmailFailedAt?: string;
};

export type ContactInput = {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  company?: string;
  message: string;
}