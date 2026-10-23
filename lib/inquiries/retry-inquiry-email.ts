"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getSanityClient } from "@/sanity/lib/client";

import { sendInquiryNotification } from "./send-inquiry-notification";
import { sendCustomerConfirmation } from "./send-customer-email";

export type InquiryEmailType =
  | "notification"
  | "confirmation";

export async function retryInquiryEmail(
  id: string,
  emailType: InquiryEmailType
) {
  await requireAdmin();

  if (!id) {
    return {
      success: false as const,
      error: "Invalid inquiry.",
    };
  }

  const client = getSanityClient();
  
  const inquiry =
    await client.fetch<{
      _id: string;
      reference: string;
      type: string;
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

      notificationEmailStatus?: string;
      confirmationEmailStatus?: string;
    } | null>(
      `*[
        _type == "inquiry"
        && _id == $id
      ][0]{
        _id,
        reference,
        type,
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
        subject,
        notificationEmailStatus,
        confirmationEmailStatus
      }`,
      { id }
    );

  if (!inquiry) {
    throw new Error("Inquiry not found.");
  }

  const attemptedAt =
    new Date().toISOString();

  /*
   * Mark selected email as pending
   */
  if (emailType === "notification") {
    await client
      .patch(id)
      .set({
        notificationEmailStatus: "pending",
        notificationEmailLastAttemptAt:
          attemptedAt,
      })
      .commit();
  } else {
    await client
      .patch(id)
      .set({
        confirmationEmailStatus: "pending",
        confirmationEmailLastAttemptAt:
          attemptedAt,
      })
      .commit();
  }

  try {
    /*
     * Send notification email
     */
    if (emailType === "notification") {
      await sendInquiryNotification({
        reference: inquiry.reference,
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        company: inquiry.company,
        country: inquiry.country,
        product: inquiry.product,
        quantity: inquiry.quantity,
        packaging: inquiry.packaging,
        destination: inquiry.destination,
        subject: inquiry.subject,
        organizationType:
          inquiry.organizationType,
        market: inquiry.market,
        companyWebsite:
          inquiry.companyWebsite,
        partnershipFocus:
          inquiry.partnershipFocus,
        message: inquiry.message || "",
        type: inquiry.type,
      });
    }

    /*
     * Send customer confirmation
     */
    else {
      await sendCustomerConfirmation({
        reference: inquiry.reference,
        name: inquiry.name,
        email: inquiry.email,
      });
    }

    /*
     * Mark as sent
     */
    const sentAt =
      new Date().toISOString();

    if (emailType === "notification") {
      await client
        .patch(id)
        .set({
          notificationEmailStatus: "sent",
          notificationEmailSentAt: sentAt,
        })
        .commit();
    } else {
      await client
        .patch(id)
        .set({
          confirmationEmailStatus: "sent",
          confirmationEmailSentAt: sentAt,
        })
        .commit();
    }

    revalidatePath(
      `/admin/inquiries/${id}`
    );

    revalidatePath(
      "/admin/inquiries"
    );

    return {
      success: true as const,
    };
  } catch (error) {
    console.error(
      "Failed to retry inquiry email.",
      {
        inquiry: id,
        emailType,
        error,
      }
    );

    const failedAt =
      new Date().toISOString();

    if (emailType === "notification") {
      await client
        .patch(id)
        .set({
          notificationEmailStatus: "failed",
          notificationEmailFailedAt:
            failedAt,
        })
        .commit();
    } else {
      await client
        .patch(id)
        .set({
          confirmationEmailStatus: "failed",
          confirmationEmailFailedAt:
            failedAt,
        })
        .commit();
    }

    throw error;
  }
}
