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

const fromEmail =
  process.env.RESEND_FROM_EMAIL ||
    "onboarding@resend.dev";

if (!fromEmail) {
  throw new Error(
    "RESEND_FROM_EMAIL is not configured."
  );
}

type ConfirmationData = {
  reference: string;
  name: string;
  email: string;
};

export async function sendContactConfirmation(
  contact: ConfirmationData
) {
  const customerEmail = process.env.NODE_ENV === "development"
    ? process.env.RESEND_TEST_EMAIL
    : contact.email;

    if (!customerEmail) {
      throw new Error(
        "Customer email destination is not configured."
      )
    }

    const resendClient = getResend()

  const result =
    await resendClient.emails.send(
      {
        from:
          `Golden Palmera Global <${fromEmail}>`,

        to: [customerEmail],

        subject:
          `We received your enquiry — ${contact.reference}`,

        html: `
          <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #18181b;
          ">
            <h2>
              Thank you for contacting Golden Palmera Global
            </h2>


            <h2>
              Dear, ${escapeHtml(contact.name)}
            </h2>

            <p>
              We have received your enquiry.
            </p>

            <div style="
              margin: 24px 0;
              padding: 16px;
              border: 1px solid #d1d5db;
              background: #f9fafb;
            ">
              <p style="
                margin: 0;
                font-size: 12px;
                text-transform: uppercase;
                color: #71717a;
              ">
                Reference
              </p>

              <p style="
                margin: 6px 0 0;
                font-family: monospace;
                font-size: 20px;
                font-weight: bold;
              ">
                ${escapeHtml(contact.reference)}
              </p>

              <p>
                Please keep this reference number 
                for future correspondence.
              </p>
            </div>

            <p>
              Our team will review your message
              and get back to you as soon as possible.
            </p>
            
            <p>
              Kind regards, <br />
              Golden Palmera Global
            </p>
          </div>
        `,
      },
      {
        idempotencyKey:
          `contact-confirmation:${contact.reference}`,
      }
    );

  if (result.error) {
    throw new Error(
      result.error.message
    );
  }

  return result.data;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
