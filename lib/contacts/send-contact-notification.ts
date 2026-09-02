import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const notificationEmail =
  process.env.INQUIRY_NOTIFICATION_EMAIL ||
    "goldenpalmeraglobal@gmail.com";

const fromEmail =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

if (!notificationEmail) {
  throw new Error(
    "INQUIRY_NOTIFICATION_EMAIL is not configured."
  );
}

if (!fromEmail) {
  throw new Error(
    "RESEND_FROM_EMAIL is not configured."
  );
}

type ContactEmailData = {
  reference: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  message: string;
};

export async function sendContactNotification(
  contact: ContactEmailData
) {
  const result =
    await resend.emails.send(
      {
        from:
          `Golden Palmera Global <${fromEmail}>`,

        to: [notificationEmail],

        replyTo: contact.email,

        subject:
          `New Contact — ${contact.reference}`,

        html: `
          <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #18181b;
          ">

            <h2>
              New Contact Message
            </h2>

            <p>
              <strong>Reference:</strong>
              ${escapeHtml(contact.reference)}
            </p>

            <p>
              <strong>Name:</strong>
              ${escapeHtml(contact.name)}
            </p>

            <p>
              <strong>Email:</strong>
              ${escapeHtml(contact.email)}
            </p>

            <p>
              <strong>Phone:</strong>
              ${escapeHtml(contact.phone || "—")}
            </p>

            <p>
              <strong>Company:</strong>
              ${escapeHtml(contact.company || "—")}
            </p>

            <p>
              <strong>Country:</strong>
              ${escapeHtml(contact.country || "—")}
            </p>

            <h3>Message</h3>

            <p>
              ${escapeHtml(contact.message)
                .replace(/\n/g, "<br />")}
            </p>

          </div>
        `,
      },
      {
        idempotencyKey:
          `contact-notification:${contact.reference}`,
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
