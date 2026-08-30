import crypto from "crypto";

import { client } from "@/sanity/lib/client";
import { Resend } from "resend";

import {
  contactSchema,
} from "@/lib/validation/contact-validation";

import {
  contactRateLimit,
} from "@/lib/security/rate-limit";

import { ContactInput } from "./types"

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const notificationEmail =
  process.env.INQUIRY_NOTIFICATION_EMAIL ||
  "goldenpalmeraglobal@gmail.com";

const fromEmail =
  process.env.RESEND_FROM_EMAIL ||
  "onboarding@resend.dev";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
) {
  /*
   * 1. Generate immutable reference
   */
  const reference = generateReference();
  
  const submittedAt = new Date().toDateString();

  /**
   * Store inquiry First.
   * 
   * Email failure must not destroy
   * the customer's inquiry.
   */
  let createdContact;

  try {
    createdContact =
      await client.create({
        _type: "contact",

        reference,
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        company: data.company || undefined,
        country: data.company || undefined,
        message: data.message,
        status: "NEW",
        submittedAt,
        emailStatus: "pending",
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
    const notification =
      await resend.emails.send({
        from: `Golden Palmera Global <${fromEmail}>`,

        to: notificationEmail,

        replyTo: data.email,

        subject:
          `New Contact Message — ${data.name}-${reference}`,

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #18181b;
            "
          >
            <h2>
              New Golden Palmera Global Contact Message
            </h2>

            <p>
              <strong>Name:</strong>
              ${escapeHtml(data.name)}
            </p>

            <p>
              <strong>Email:</strong>
              ${escapeHtml(data.email)}
            </p>

            <p>
              <strong>Email:</strong>
              ${escapeHtml(data.phone || "_")}
            </p>

            <p>
              <strong>Company:</strong>
              ${escapeHtml(
                data.company || "—"
              )}
            </p>

            <p>
              <strong>Company:</strong>
              ${escapeHtml(
                data.country || "—"
              )}
            </p>

            <h3>
              Message
            </h3>

            <p>
              ${escapeHtml(
                data.message
              ).replace(/\n/g, "<br />")}
            </p>
          </div>
        `,
      },
    {
      idempotencyKey: `contact-notification:${reference}`
    });

    if (notification.error) {
      throw new Error(
        notification.error.message
      );
    }

    // Customer confirmation
    const customerEmail = process.env.NODE_ENV === "development"
        ? process.env.RESEND_TEST_EMAIL
        : data.email;

    if (!customerEmail) {
      throw new Error(
        "Customer email destination is not configured."
      )
    }

    const confirmation = await resend.emails.send(
        {
          from: `Golden Palmera Global <${fromEmail}>`,

          // to: data.email,

          to: customerEmail,

          subject:
            `We received your inquiry — ${reference}`,

          html:
            buildCustomerEmail(
              data.name,
              reference
            ),
        },
        {
          idempotencyKey:
            `inquiry-confirmation:${reference}`,
        }
      );

    if (confirmation.error) {
      throw new Error(
        confirmation.error.message
      );
    }

    /*
     * Mark email as sent
     */
    try {
      await client
        .patch(createdContact._id)
        .set({
          emailStatus: "sent",
        })
        .commit();
    } catch (statusError) {
      console.error(
        `[${context.requestId}] Failed to update contact email status:`,
        statusError
      );
    }

    return {
      success: true as const,
    };
  } catch (error) {
    console.error(
      `[${conext.requestId}] Contact email delivery failed:`,
      error
    );

    /*
     * Contact is already stored.
     *
     * Email failure must not make the
     * contact message disappear.
     */
    try {
      await client
        .patch(createdContact._id)
        .set({
          emailStatus: "failed",
        })
        .commit();
    } catch (statusError) {
      console.error(
        `[${context.requestId}] Failed to update contact email status:`,
        statusError
      );
    }

    return {
      success: true as const,
      reference,
      emailWarning: true as const,
    };
  }
}