import { Resend } from "resend";

import type { InquiryInput } from "@/lib/validation/inquiry-validation";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const notificationEmail =
  process.env.INQUIRY_NOTIFICATION_EMAIL;

const senderEmail =
  process.env.RESEND_FROM_EMAIL;

if (!notificationEmail) {
  throw new Error(
    "INQUIRY_NOTIFICATION_EMAIL is not configured."
  );
}

if (!senderEmail) {
  throw new Error(
    "RESEND_FROM_EMAIL is not configured."
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMessage(value: string) {
  return escapeHtml(value).replace(
    /\n/g,
    "<br />"
  );
}

function getInquiryLabel(
  type: InquiryInput["type"]
) {
  switch (type) {
    case "product":
      return "Product Inquiry";

    case "partnership":
      return "Partnership Inquiry";

    case "export_buyer":
      return "Export / Buyer Inquiry";

    case "general":
      return "General Contact";
  }
}

export async function sendInquiryEmails({
  data,
  reference,
}: {
  data: InquiryInput;
  reference: string;
}) {
  const label =
    getInquiryLabel(data.type);

  const notification = await resend.emails.send(
    {
      from: `Golden Palmera Global <${senderEmail}>`,

      to: notificationEmail,

      replyTo: data.email,

      subject: `New ${label} — ${reference}`,

      html: `
        <div style="
          font-family:Arial,Helvetica,sans-serif;
          max-width:700px;
          margin:0 auto;
          color:#18181b;
        ">
          <h1>New Inquiry</h1>

          <p>
            <strong>Reference:</strong>
            ${escapeHtml(reference)}
          </p>

          <p>
            <strong>Type:</strong>
            ${escapeHtml(label)}
          </p>

          <hr />

          <h2>Customer</h2>

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
              ? `<p>
                  <strong>Phone:</strong>
                  ${escapeHtml(data.phone)}
                </p>`
              : ""
          }

          ${
            data.company
              ? `<p>
                  <strong>Company:</strong>
                  ${escapeHtml(data.company)}
                </p>`
              : ""
          }

          ${
            data.country
              ? `<p>
                  <strong>Country:</strong>
                  ${escapeHtml(data.country)}
                </p>`
              : ""
          }

          <h2>Requirements</h2>

          <p>
            <strong>Product:</strong>
            ${escapeHtml(data.product)}
          </p>

          <p>
            <strong>Quantity:</strong>
            ${escapeHtml(data.quantity)}
          </p>

          ${
            data.packaging
              ? `<p>
                  <strong>Packaging:</strong>
                  ${escapeHtml(data.packaging)}
                </p>`
              : ""
          }

          <p>
            <strong>Destination:</strong>
            ${escapeHtml(data.destination)}
          </p>

          <h2>Message</h2>

          <div style="
            background:#f4f4f5;
            padding:20px;
            border-radius:12px;
          ">
            ${formatMessage(data.message)}
          </div>
        </div>
      `,
    }
  );

  if (notification.error) {
    throw notification.error;
  }

  const confirmation =
    await resend.emails.send({
      from: `Golden Palmera Global <${senderEmail}>`,

      to: data.email,

      subject:
        `We received your inquiry — ${reference}`,

      html: `
        <div style="
          font-family:Arial,Helvetica,sans-serif;
          max-width:620px;
          margin:0 auto;
          color:#18181b;
        ">
          <h1>
            Thank you for contacting
            Golden Palmera Global
          </h1>

          <p>
            Dear ${escapeHtml(data.name)},
          </p>

          <p>
            We have received your inquiry.
            Our team will review your
            requirements and get back to
            you shortly.
          </p>

          <div style="
            background:#ecfdf5;
            border:1px solid #a7f3d0;
            padding:20px;
            border-radius:12px;
          ">
            <strong>
              Reference:
            </strong>

            <div style="
              font-size:24px;
              font-weight:bold;
              color:#047857;
              margin-top:6px;
            ">
              ${escapeHtml(reference)}
            </div>
          </div>

          <p>
            Please keep this reference number
            for future correspondence.
          </p>

          <p>
            Kind regards,<br />
            <strong>
              Golden Palmera Global
            </strong>
          </p>
        </div>
      `,
    });

    {inquiry.emailStatus ===
  "failed" && (
  <RetryEmailButton
    inquiryId={inquiry._id}
  />
)}


  if (confirmation.error) {
    throw confirmation.error;
  }

  return {
    success: true,
  };
}
