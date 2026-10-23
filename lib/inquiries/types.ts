import { z } from "zod";
import { EmailStatus } from "../email/types";

export const inquiryStatuses = [
  "NEW",
  "IN_PROGRESS",
  "CONTACTED",
  "RESOLVED",
  "REJECTED",
] as const;

export type InquiryStatus =
  (typeof inquiryStatuses)[number];

export const inquiryStatusSchema = 
  z.enum(inquiryStatuses);

export const inquiryTypes = [
  "general",
  "product",
  "partnership",
  "export_buyer",
  "contact",
] as const;

export type InquiryType =
  (typeof inquiryTypes)[number];

export type Inquiry = {
  _id: string;
  reference: string;
  type: InquiryType;

  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;

  subject?: string;

  product?: string;
  quantity?: string;
  packaging?: string;
  destination?: string;

  organizationType?: string;
  market?: string;
  partnershipFocus?: string;
  companyWebsite?: string;

  message: string;

  status: InquiryStatus;
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

export type InquiryInput = {
  type: InquiryType;

  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;

  subject?: string;

  product?: string;
  quantity?: string;
  packaging?: string;
  destination?: string;

  organizationType?: string;
  market?: string;
  partnershipFocus?: string;
  companyWebsite?: string;

  message: string;
};
