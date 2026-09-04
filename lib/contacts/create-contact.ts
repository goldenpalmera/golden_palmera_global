import crypto from "crypto";
import { getSanityClient } from "@/sanity/lib/client";
import { ContactInput } from "./types"
import { sendContactNotification } from "./send-contact-notification";
import { sendContactConfirmation } from "./send-contact-confirmation";
import type { CreateInquiryResult } from "../type";

type ContactContext = {
  requestId: string;
  ip: string;
}

function generateReference() {
  const year = new Date().getFullYear();

  const random = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `GPG-${year}-${random}`;
}

export async function createContact(
  data: ContactInput,
  context: ContactContext,
): Promise<CreateInquiryResult> {
  // Track failures
  let notificationFailed = false;
  let confirmationFailed = false;
  /*
   * Generate immutable reference
   */
  const reference = generateReference();
  
  const submittedAt = new Date().toISOString();

  /**
   * Store inquiry First.
   * 
   * Email failure must not destroy
   * the customer's inquiry.
   */
  let createdContact;
  const client = getSanityClient();
  
  try {
    createdContact =
      await client.create({
        _type: "contact",

        reference,
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        company: data.company || "",
        country: data.country || "",
        message: data.message,

        status: "NEW",

        submittedAt,

        notificationEmailStatus: "pending",
        confirmationEmailStatus: "pending",
        notificationEmailLastAttemptAt: null,
        notificationEmailSentAt: null,
        notificationEmailFailedAt: null,
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
      `[${context.requestId}] Contact storage failed:`,
      error
    );

    return {
      success: false as const,
      error:
        "We could not save your message. Please try again.",
    };
  }

  /*
   * Notification email
   */
  try {
    await client
      .patch(createdContact._id)
      .set({ 
        notificationEmailStatus: "pending",
        notificationEmailLastAttemptAt: new Date().toISOString(),
      })
      .commit()
    
    await sendContactNotification({
      reference,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      country: data.country,
      message: data.message,
    });

    await client
      .patch(createdContact._id)
      .set({ 
        notificationEmailStatus: "sent",
        notificationEmailSentAt: new Date().toISOString(),
      })
      .commit();

  } catch (error) {
    notificationFailed = true;

    console.log(
      `[${context.requestId}] Contact notification email failed:`,
      error
    );

    try {
      await client
        .patch(createdContact._id)
        .set({ 
          notificationEmailStatus: "failed",
          notificationEmailFailedAt: new Date().toISOString(),
        })
        .commit();

    } catch (statusError) {
      console.error(
        `[${context.requestId}] Failed to update notification status:`,
        statusError
      );
    }
  };

  try {
    // Customer confirmation
    await client
    .patch(createdContact._id)
    .set({
      confirmationEmailLastAttemptAt: new Date().toISOString(),
    })
    .commit();

    await sendContactConfirmation({
      reference,
      name: data.name,
      email: data.email,
    });

    await client
      .patch(createdContact._id)
      .set({
        confirmationEmailStatus: "sent",
        confirmationEmailSentAt: new Date().toISOString()
      })
      .commit();

  } catch (error) {
    confirmationFailed = true;

    console.error(
      `[${context.requestId}] Customer confirmation email failed:`,
      error
    );

    try {
      await client
        .patch(createdContact._id)
        .set({
          confirmationEmailStatus: "failed",
          confirmationEmailFailedAt: new Date().toISOString(),
        })
        .commit();
    } catch (statusError) {
      console.error(
        `[${context.requestId}] Failed to update confirmation email status:`,
        statusError
      );
    }
  }
  return {
      success: true as const,
      reference,
      message: "Your enquiry has been received.",
      emailWarning: notificationFailed || confirmationFailed,
    };
}