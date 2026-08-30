import crypto from "crypto";

import { client } from "@/sanity/lib/client";
import { Resend } from "resend";
import { buildCustomerEmail } from "../send-customer-email";


const resend = new Resend(
    process.env.RESEND_API_KEY
  );

const notificationEmail =
  process.env.INQUIRY_NOTIFICATION_EMAIL || "goldenpalmeraglobal@gmail.com";

  // "info@goldenpalmeraglobal.com";
  // "goldenpalmeraglobal@gmail.com";

const fromEmail =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  // "notifications@goldenpalmeraglobal.com";

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
  website?: string;
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

  const random =
    crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase();

  return `GPG-${year}-${random}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getInquiryLabel(type: string) {
  switch (type) {
    case "product":
      return "Product Inquiry";

    case "partnership":
      return "Partnership Inquiry";

    case "export_buyer":
      return "Export / Buyer Inquiry";

    default:
      return "General Contact";
  }
}

export async function createInquiry(
  data: InquiryInput,
  context: InquiryContext
) {
  //  Generate immutable reference
  const reference =
    generateReference();

  const submittedAt = new Date().toISOString();

  /*
   * Store inquiry FIRST.
   *
   * Email failure must not destroy
   * the customer's inquiry.
   */
  let createdInquiry;

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
    notificationEmailStatus: "pending",
    confirmationEmailStatus: "pending",
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

  // Send notification email
  try {
    // Admin notification
    const notification = await resend.emails.send(
        {
          from: `Golden Palmera Global <${fromEmail}>`,

          to: notificationEmail,

          replyTo: data.email,

          subject: `New ${getInquiryLabel(
              data.type
            )} — ${reference}`,

          html: buildNotificationEmail(
            data,
            reference
          ),
        },
        {
          idempotencyKey: `inquiry-notification:${reference}`,
        }
      );

    if (notification.error) {
      throw new Error(
        notification.error.message
      );
    }

    await client
      .patch(createdInquiry._id)
      .set({ notificationEmailStatue: "sent"})
      .commit();
  } catch (error) {
    console.log(
      `[${context.requestId}] Inquiry notification email failed:`,
      error
    );

    try {
      await client
        .patch(createdInquiry._id)
        .set({ notificationEmailStatus: "failed"})
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

    // Mark email delivery successful
    await client
      .patch(createdInquiry._id)
      .set({
        confirmationEmailStatus: "sent",
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
    };
}

function buildNotificationEmail(
  data: {
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
    subject?: string;
    message: string;
    type: string;
  },
  reference: string
) {
  return `
    <div
      style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #18181b;
      "
    >
      <h2>
        New Golden Palmera Global Inquiry
      </h2>

      <p>
        <strong>Reference:</strong>
        ${escapeHtml(reference)}
      </p>

      <p>
        <strong>Type:</strong>
        ${escapeHtml(
          getInquiryLabel(data.type)
        )}
      </p>

      <hr />

      <p>
        <strong>Name:</strong>
        ${escapeHtml(data.name)}
      </p>

      <p>
        <strong>Email:</strong>
        ${escapeHtml(data.email)}
      </p>

      ${
        data.phone
          ? `
            <p>
              <strong>Phone:</strong>
              ${escapeHtml(data.phone)}
            </p>
          `
          : ""
      }

      ${
        data.company
          ? `
            <p>
              <strong>Company:</strong>
              ${escapeHtml(data.company)}
            </p>
          `
          : ""
      }

      ${
        data.country
          ? `
            <p>
              <strong>Country:</strong>
              ${escapeHtml(data.country)}
            </p>
          `
          : ""
      }

      ${
        data.product
          ? `
            <p>
              <strong>Product:</strong>
              ${escapeHtml(data.product)}
            </p>
          `
          : ""
      }

      ${
        data.quantity
          ? `
            <p>
              <strong>Quantity:</strong>
              ${escapeHtml(data.quantity)}
            </p>
          `
          : ""
      }

      ${
        data.packaging
          ? `
            <p>
              <strong>Packaging:</strong>
              ${escapeHtml(data.packaging)}
            </p>
          `
          : ""
      }

      ${
        data.destination
          ? `
            <p>
              <strong>Destination:</strong>
              ${escapeHtml(
                data.destination
              )}
            </p>
          `
          : ""
      }

      ${
  data.subject
    ? `
      <p>
        <strong>Subject:</strong>
        ${escapeHtml(data.subject)}
      </p>
    `
    : ""
}

${
  data.organizationType
    ? `
      <p>
        <strong>Organisation Type:</strong>
        ${escapeHtml(data.organizationType)}
      </p>
    `
    : ""
}

${
  data.market
    ? `
      <p>
        <strong>Market / Region:</strong>
        ${escapeHtml(data.market)}
      </p>
    `
    : ""
}

${
  data.companyWebsite
    ? `
      <p>
        <strong>Website:</strong>
        ${escapeHtml(data.companyWebsite)}
      </p>
    `
    : ""
}

${
  data.partnershipFocus
    ? `
      <p>
        <strong>Partnership Focus:</strong>
        ${escapeHtml(data.partnershipFocus)}
      </p>
    `
    : ""
}

      <h3>
        Additional Requirements
      </h3>

      <p>
        ${escapeHtml(
          data.message
        ).replace(
          /\n/g,
          "<br />"
        )}
      </p>
    </div>
  `;
}


