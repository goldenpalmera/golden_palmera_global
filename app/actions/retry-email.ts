"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { getSanityClient } from "@/sanity/lib/client";

import {
  sendContactNotification,
} from "@/lib/contacts/send-contact-notification";

import {
  sendContactConfirmation,
} from "@/lib/contacts/send-contact-confirmation";

import {
  sendInquiryNotification,
} from "@/lib/inquiries/send-inquiry-notification";

import {
  sendCustomerConfirmation,
} from "@/lib/inquiries/send-customer-email";

import type {
  EmailType,
} from "@/lib/email/types";
import { success } from "zod";
import { error } from "console";

type DocumentType =
  | "contact"
  | "inquiry";

export async function retryEmail(
  documentType: DocumentType,
  id: string,
  emailType: EmailType
) {
  await requireAdmin();

  if (!id) {
    return {
      success: false as const,
      error: "Invalid document.",
    };
  }

  if (
    documentType !== "contact" &&
    documentType !== "inquiry"
  ) {
    return {
      success: false as const,
      error: "Invalid document type.",
    };
  }

  if (
    emailType !== "notification" &&
    emailType !== "confirmation"
  ) {
    return {
      success: false as const,
      error: "Invalid email type."
    }
  }

  /*
   * LOAD DOCUMENT
   */
  const client = getSanityClient();

  const document = await client.fetch<{
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
  } | null>(
    `*[
      _type == $type
      && _id == $id
    ][0]{
      _id,
      _type,
      reference,
      name,
      email,
      phone,
      company,
      country,
      product,
      quantity,
      packaging,
      destination,
      message,
      organizationType,
      market,
      companyWebsite,
      partnershipFocus,
      subject
    }`,
    {
      type: documentType,
      id,
    }
  );

  if (!document) {
    return {
      success: false as const,
      error: "Document not found.",
    };
  }

  const attemptedAt =
    new Date().toISOString();

  /*
   * MARK PENDING
   */
  await client
    .patch(id)
    .set({
      [`${emailType}EmailStatus`]: "pending",
      [`${emailType}EmailLastAttemptAt`]:
        attemptedAt,
    })
    .commit();

  /*
   * SEND EMAIL
   */

  try {
    if (documentType === "contact") {
      if (emailType === "notification") {
        await sendContactNotification({
          reference: document.reference,
          name: document.name,
          email: document.email,
          phone: document.phone,
          company: document.company,
          country: document.country,
          message: document.message || "",
        });
      } else {
        await sendContactConfirmation({
          reference: document.reference,
          name: document.name,
          email: document.email,
        });
      }
    }

    if (documentType === "inquiry") {
      if (emailType === "notification") {
        await sendInquiryNotification({
          reference: document.reference,
          name: document.name,
          email: document.email,
          phone: document.phone,
          company: document.company,
          country: document.country,
          product: document.product,
          quantity: document.quantity,
          packaging: document.packaging,
          destination: document.destination,
          message: document.message || "",
          type: document.type,
          organizationType: document.organizationType,
          market: document.market,
          companyWebsite: document.companyWebsite,
          partnershipFocus: document.partnershipFocus,
          subject: document.subject,
        });
      } else {
        await sendCustomerConfirmation({
          reference: document.reference,
          name: document.name,
          email: document.email,
        });
      }
    }

    /*
     * MARK SENT
     */

    const sentAt =
      new Date().toISOString();

    await client
      .patch(id)
      .set({
        [`${emailType}EmailStatus`]: "sent",
        [`${emailType}EmailSentAt`]: sentAt,
      })
      .commit();

    /*
     * REVALIDATE
     */

    revalidatePath(
      `/admin/${documentType}s/${id}`
    );

    revalidatePath(
      `/admin/${documentType}s`
    );

    return {
      success: true as const,
    };
  } catch (error) {
    console.error(
      "Failed to retry email.",
      {
        documentType,
        emailType,
        error,
      }
    );

    /*
     * MARK FAILED
     */

    const failedAt = new Date().toISOString();

    await client
      .patch(id)
      .set({
        [`${emailType}EmailStatus`]: "failed",
        [`${emailType}EmailFailedAt`]: failedAt,
      })
      .commit();

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Unable to send email.",
    };
  }
}
