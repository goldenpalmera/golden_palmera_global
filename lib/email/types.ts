export type EmailType =
  | "notification"
  | "confirmation";

export type EmailStatus =
  | "pending"
  | "sent"
  | "failed";

export type EmailDocumentType =
    | "contact"
    | "inquiry";

export type RetryEmail = {
    _id: string;
    _type: string;

    reference: string;
    name: string;
    email: string;

    phone?: string;
    company?: string;
    country?: string;
    product?: string;
    quantity?: string;
    packaging?: string;
    destination?: string;
    message?: string;

    organizationType?: string;
    market?: string;
    companyWebsite?: string;
    partnershipFocus?: string;
    subject?: string;
    type: string
  }