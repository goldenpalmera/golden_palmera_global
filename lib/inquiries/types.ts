import { z } from "zod";

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

export const emailStatuses = [
  "pending",
  "sent",
  "failed",
] as const;

export type EmailStatus =
  (typeof emailStatuses)[number];

export type Inquiry = {
  _id: string;
  reference: string;
  type: string;
  status: InquiryStatus;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  product?: string;
  quantity?: string;
  packaging?: string;
  destination?: string;
  organizationType?: string;
  market?: string;
  companyWebsite?: string;
  partnershipFocus?: string;
  message?: string;
  emailStatus?: EmailStatus;
  submittedAt: string;
  lastEmailAttemptAt?: string;
  statusHistory?: {
    _key: string;
    status: InquiryStatus;
    changedAt: string;
    changedBy?: string;
  }[];
};
