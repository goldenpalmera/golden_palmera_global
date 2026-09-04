import { Resend } from "resend";

let resend: Resend | null = null;

function getResend(): Resend {
  const resend_api_key = process.env.RESEND_API_KEY;

  if (!resend_api_key) {
    throw new Error(
      "Missing RESEND_API_KEY environment variable."
    )
  }

  if (!resend) {
    resend = new Resend(resend_api_key);
  }

  return resend;
}

const notificationEmail =
  process.env.INQUIRY_NOTIFICATION_EMAIL ||
  "goldenpalmeraglobal@gmail.com";

const fromEmail =
  process.env.RESEND_FROM_EMAIL ||
  "onboarding@resend.dev";

type InquiryEmailData = {
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

  subject?: string;

  organizationType?: string;
  market?: string;
  companyWebsite?: string;
  partnershipFocus?: string;

  message: string;
  type: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getInquiryLabel(
  type: string
) {
  switch (type) {
    case "product":
      return "Product Inquiry";

    case "partnership":
      return "Partnership Inquiry";

    case "export_buyer":
      return "Export / Buyer Inquiry";

    case "contact":
      return "General Contact";

    default:
      return "General Contact";
  }
}

export async function sendInquiryNotification(
  inquiry: InquiryEmailData
) {
  const resendClient = getResend();

  const notification =
    await resendClient.emails.send(
      {
        from: `Golden Palmera Global <${fromEmail}>`,

        to: notificationEmail,

        replyTo: inquiry.email,

        subject: `New ${getInquiryLabel(
          inquiry.type
        )} — ${inquiry.reference}`,

        html: buildNotificationEmail(inquiry),
      },
      {
        idempotencyKey:
          `inquiry-notification:${inquiry.reference}`,
      }
    );

  if (notification.error) {
    throw new Error(
      notification.error.message
    );
  }

  return notification.data;
}


function buildNotificationEmail(
  data: InquiryEmailData
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
        ${escapeHtml(data.reference)}
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
              ${escapeHtml(data.destination)}
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
              ${escapeHtml(
                data.organizationType
              )}
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
              ${escapeHtml(
                data.companyWebsite
              )}
            </p>
          `
          : ""
      }

      ${
        data.partnershipFocus
          ? `
            <p>
              <strong>Partnership Focus:</strong>
              ${escapeHtml(
                data.partnershipFocus
              )}
            </p>
          `
          : ""
      }

      <h3>
        Additional Requirements
      </h3>

      <p>
        ${escapeHtml(data.message).replace(
          /\n/g,
          "<br />"
        )}
      </p>
    </div>
  `;
}
