import crypto from "crypto";

import { client } from "@/sanity/lib/client";
import { CreateInquiryResult } from "../type";
import { sendCustomerConfirmation } from "./send-customer-email";
import { sendInquiryNotification } from "./send-inquiry-notification";

type InquiryInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;

  product?: string;
  quantity?: string;
  packaging?: string;
  destination?: string;

  message: string;
  type: string;

  organizationType?: string;
  market?: string;
  companyWebsite?: string;
  partnershipFocus?: string;
  subject?: string;
};

type InquiryContext = {
  requestId: string;
  ip: string;
};

function generateReference() {
  const year = new Date().getFullYear();

  const random = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `GPG-${year}-${random}`;
}

export async function createInquiry(
  data: InquiryInput,
  context: InquiryContext
): Promise<CreateInquiryResult> {
  const reference = generateReference();
  const submittedAt = new Date().toISOString();

  let createdInquiry;

  /*
   * CREATE INQUIRY
   */
  try {
    createdInquiry = await client.create({
      _type: "inquiry",

      reference,
      type: data.type,
      status: "NEW",

      name: data.name,
      email: data.email,
      phone: data.phone || "",
      company: data.company || "",
      country: data.country || "",

      subject: data.subject || "",

      product: data.product || "",
      quantity: data.quantity || "",
      packaging: data.packaging || "",
      destination: data.destination || "",

      message: data.message,

      organizationType: data.organizationType || "",
      market: data.market || "",
      companyWebsite: data.companyWebsite || "",
      partnershipFocus: data.partnershipFocus || "",

      submittedAt,

      /*
       * EMAIL DELIVERY
       */
      notificationEmailStatus: "pending",
      notificationEmailLastAttemptAt: null,
      notificationEmailSentAt: null,
      notificationEmailFailedAt: null,

      confirmationEmailStatus: "pending",
      confirmationEmailLastAttemptAt: null,
      confirmationEmailSentAt: null,
      confirmationEmailFailedAt: null,

      statusHistory: [
        {
          _key: crypto.randomUUID(),
          status: "NEW",
          changedAt: submittedAt,
          changedBy: "system",
        },
      ],
    });
  } catch (error) {
    console.error(
      `[${context.requestId}] Inquiry storage failed:`,
      error
    );

    return {
      success: false as const,
      error:
        "We could not save your enquiry. Please try again.",
    };
  }

  /*
   * SEND INTERNAL NOTIFICATION
   */
  try {
    const attemptedAt = new Date().toISOString();

    await client
      .patch(createdInquiry._id)
      .set({
        notificationEmailStatus: "pending",
        notificationEmailLastAttemptAt: attemptedAt,
      })
      .commit();

    await sendInquiryNotification({
      reference,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      country: data.country,

      product: data.product,
      quantity: data.quantity,
      packaging: data.packaging,
      destination: data.destination,

      subject: data.subject,

      organizationType: data.organizationType,

      market: data.market,

      companyWebsite: data.companyWebsite,
      partnershipFocus: data.partnershipFocus,

      message: data.message,
      type: data.type,
    });

    await client
      .patch(createdInquiry._id)
      .set({
        notificationEmailStatus: "sent",
        notificationEmailSentAt: attemptedAt
      })
      .commit();
  } catch (error) {
    console.error(
      `[${context.requestId}] Inquiry notification email failed:`,
      error
    );

    try {
      await client
        .patch(createdInquiry._id)
        .set({
          notificationEmailStatus: "failed",
          notificationEmailFailedAt:
            new Date().toISOString(),
        })
        .commit();
    } catch (statusError) {
      console.error(
        `[${context.requestId}] Failed to update notification status:`,
        statusError
      );
    }
  }

  /*
   * SEND CUSTOMER CONFIRMATION
   */
  try {
    const attemptedAt = new Date().toISOString();

    await client
      .patch(createdInquiry._id)
      .set({
        confirmationEmailStatus: "pending",
        confirmationEmailLastAttemptAt: attemptedAt,
      })
      .commit();

    await sendCustomerConfirmation({
      reference,
      name: data.name,
      email: data.email,
    });

    await client
      .patch(createdInquiry._id)
      .set({
        confirmationEmailStatus: "sent",
        confirmationEmailSentAt: attemptedAt,
      })
      .commit();
  } catch (error) {
    console.error(
      `[${context.requestId}] Inquiry confirmation email failed:`,
      error
    );

    try {
      await client
        .patch(createdInquiry._id)
        .set({
          confirmationEmailStatus: "failed",
          confirmationEmailFailedAt:
            new Date().toISOString(),
        })
        .commit();
    } catch (statusError) {
      console.error(
        `[${context.requestId}] Failed to update confirmation status:`,
        statusError
      );
    }
  }

  return {
    success: true as const,
    reference,
    message:
      "Your enquiry has been received.",
  };
}
