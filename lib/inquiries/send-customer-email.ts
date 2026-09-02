import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const fromEmail =
  process.env.RESEND_FROM_EMAIL ||
  "onboarding@resend.dev";

type ConfirmationData = {
  reference: string;
  name: string;
  email: string;
};

export async function sendCustomerConfirmation(
  customer: ConfirmationData
) {
  const customerEmail =
    process.env.NODE_ENV === "development"
      ? process.env.RESEND_TEST_EMAIL
      : customer.email;

  if (!customerEmail) {
    throw new Error(
      "Customer email destination is not configured."
    );
  }

  const confirmation =
    await resend.emails.send(
      {
        from: `Golden Palmera Global <${fromEmail}>`,
        to: [customerEmail],

        subject:
          `We received your inquiry — ${customer.reference}`,

        html: buildCustomerEmail(
          customer.name,
          customer.reference
        ),
      },
      {
        idempotencyKey:
          `inquiry-confirmation:${customer.reference}`,
      }
    );

  if (confirmation.error) {
    throw new Error(
      confirmation.error.message
    );
  }

  return confirmation.data;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildCustomerEmail(
  name: string,
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
        Thank you for contacting
        Golden Palmera Global
      </h2>

      <p>
        Dear ${escapeHtml(name)},
      </p>

      <p>
        We have received your inquiry
        and our team will review your
        requirements shortly.
      </p>

      <p>
        <strong>
          Your reference number:
        </strong>
        ${escapeHtml(reference)}
      </p>

      <p>
        Please keep this reference number
        for future correspondence.
      </p>

      <p>
        Kind regards,<br />
        Golden Palmera Global
      </p>
    </div>
  `;
}
