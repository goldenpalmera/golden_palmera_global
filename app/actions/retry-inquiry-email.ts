"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import {
  serverClient,
} from "@/sanity/lib/server-client";

import { Resend } from "resend";

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

const notificationEmail =
  process.env.INQUIRY_NOTIFICATION_EMAIL!;

const fromEmail =
  process.env.RESEND_FROM_EMAIL!;

export async function retryInquiryEmail(
  id: string
) {
  const session =
    await auth();

  if (!session?.user?.email) {
    throw new Error(
      "Unauthorized."
    );
  }

  const inquiry =
    await serverClient.fetch<{
      _id: string;
      reference: string;
      name: string;
      email: string;
      company?: string;
      product?: string;
      quantity?: string;
      destination?: string;
      message?: string;
      type: string;
    } | null>(
      `*[
        _type == "inquiry"
        && _id == $id
      ][0]{
        _id,
        reference,
        name,
        email,
        company,
        product,
        quantity,
        destination,
        message,
        type
      }`,
      { id }
    );

  if (!inquiry) {
    throw new Error(
      "Inquiry not found."
    );
  }

  const attemptedAt =
    new Date().toISOString();

  await serverClient
    .patch(id)
    .set({
      lastEmailAttemptAt:
        attemptedAt,
      emailStatus:
        "pending",
    })
    .commit();

  try {
    const result =
      await resend.emails.send(
        {
          from: `Golden Palmera Global <${fromEmail}>`,

          to: notificationEmail,

          replyTo:
            inquiry.email,

          subject:
            `New Inquiry — ${inquiry.reference}`,

          html: `
            <h2>
              Golden Palmera Global Inquiry
            </h2>

            <p>
              <strong>Reference:</strong>
              ${escapeHtml(
                inquiry.reference
              )}
            </p>

            <p>
              <strong>Name:</strong>
              ${escapeHtml(
                inquiry.name
              )}
            </p>

            <p>
              <strong>Email:</strong>
              ${escapeHtml(
                inquiry.email
              )}
            </p>

            <p>
              <strong>Company:</strong>
              ${escapeHtml(
                inquiry.company || "—"
              )}
            </p>

            <p>
              <strong>Product:</strong>
              ${escapeHtml(
                inquiry.product || "—"
              )}
            </p>

            <p>
              <strong>Quantity:</strong>
              ${escapeHtml(
                inquiry.quantity || "—"
              )}
            </p>

            <p>
              <strong>Destination:</strong>
              ${escapeHtml(
                inquiry.destination ||
                  "—"
              )}
            </p>

            <h3>
              Message
            </h3>

            <p>
              ${escapeHtml(
                inquiry.message || ""
              ).replace(
                /\n/g,
                "<br>"
              )}
            </p>
          `,
        },
        {
          idempotencyKey:
            `inquiry-retry:${inquiry.reference}`,
        }
      );

    if (result.error) {
      throw new Error(
        result.error.message
      );
    }

    await serverClient
      .patch(id)
      .set({
        emailStatus: "sent",
      })
      .commit();

    revalidatePath(
      `/admin/inquiries/${id}`
    );

    revalidatePath(
      "/admin/inquiries"
    );

    return {
      success: true,
    };
  } catch (error) {
    await serverClient
      .patch(id)
      .set({
        emailStatus: "failed",
      })
      .commit();

    throw error;
  }
}

function escapeHtml(
  value: string
) {
  return value
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}
