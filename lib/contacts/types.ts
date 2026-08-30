export const contactStatuses = [
  "NEW",
  "READ",
  "REPLIED",
  "RESOLVED",
  "ARCHIVED",
] as const;

export type ContactStatus =
  (typeof contactStatuses)[number];

export type Contact = {
  _id: string;

  name: string;

  email: string;

  company?: string;

  message: string;

  status: ContactStatus;

  submittedAt: string;

  emailStatus?: "pending" | "sent" | "failed";
};

export type ContactInput = {
  name: string;
  email: string;
  phone?: string;
  country: string;
  company?: string;
  message: string;
}