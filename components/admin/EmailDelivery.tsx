"use client";

import RetryEmailButton from "./RetryEmailButton";

import type {
  EmailType,
  EmailStatus,
  EmailDocumentType,
} from "@/lib/email/types";

type Props = {
  documentType: EmailDocumentType;
  documentId: string;

  notificationStatus?: EmailStatus | string;
  confirmationStatus?: EmailStatus | string;

  notificationSentAt?: string;
  confirmationSentAt?: string;

  notificationFailedAt?: string;
  confirmationFailedAt?: string;

  notificationLastAttemptAt?: string;
  confirmationLastAttemptAt?: string;
};

function normalizeStatus(
  status?: string
): EmailStatus | undefined {
  if (!status) {
    return undefined;
  }

  const normalized =
    status.toLowerCase();

  if (
    normalized === "sent" ||
    normalized === "pending" ||
    normalized === "failed"
  ) {
    return normalized;
  }

  return undefined;
}

function statusLabel(
  status?: string
) {
  switch (
    normalizeStatus(status)
  ) {
    case "sent":
      return "Sent";

    case "pending":
      return "Pending";

    case "failed":
      return "Failed";

    default:
      return "Not sent";
  }
}

function statusClasses(
  status?: string
) {
  switch (
    normalizeStatus(status)
  ) {
    case "sent":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/10";

    case "pending":
      return "bg-amber-50 text-amber-700 ring-amber-600/10";

    case "failed":
      return "bg-red-50 text-red-700 ring-red-600/10";

    default:
      return "bg-zinc-100 text-zinc-600 ring-zinc-500/10";
  }
}

function formatDate(
  value?: string
) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(date);
}

export default function EmailDelivery({
  documentId,
  documentType,
  notificationStatus,
  confirmationStatus,
  notificationSentAt,
  confirmationSentAt,
  notificationFailedAt,
  confirmationFailedAt,
  notificationLastAttemptAt,
  confirmationLastAttemptAt,
}: Props) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-zinc-100 px-6 py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
          Email delivery
        </p>

        <h2 className="mt-1.5 text-base font-semibold tracking-[-0.01em] text-zinc-950">
          Delivery status
        </h2>

        <p className="mt-1 text-sm leading-6 text-zinc-500">
          Status of automated emails associated
          with this enquiry.
        </p>
      </div>

      {/* Rows */}
      <div className="divide-y divide-zinc-100">
        <EmailRow
          label="Notification"
          description="Internal team notification"
          status={notificationStatus}
          sentAt={notificationSentAt}
          failedAt={notificationFailedAt}
          lastAttemptAt={notificationLastAttemptAt}
          documentType={documentType}
          documentId={documentId}
          emailType="notification"
        />

        <EmailRow
          label="Confirmation"
          description="Customer confirmation"
          status={confirmationStatus}
          sentAt={confirmationSentAt}
          failedAt={confirmationFailedAt}
          lastAttemptAt={confirmationLastAttemptAt}
          documentType={documentType}
          documentId={documentId}
          emailType="confirmation"
        />

      </div>
    </section>
  );
}

function EmailRow({
  label,
  description,
  status,
  sentAt,
  failedAt,
  lastAttemptAt,
  documentType,
  documentId,
  emailType,
}: {
  label: string;
  description: string;

  status?: EmailStatus | string;

  sentAt?: string;
  failedAt?: string;
  lastAttemptAt?: string;

  documentType:
    | "contact"
    | "inquiry";

  documentId: string;
  emailType: EmailType;
}) {
  const normalizedStatus =
    normalizeStatus(status);

  return (
    <div className="px-6 py-5">
      <div className="flex items-start justify-between gap-4">
        {/* Information */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-sm font-semibold text-zinc-900">
              {label}
            </p>

            <span
              className={`
                inline-flex
                items-center
                rounded-full
                px-2.5
                py-1
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.08em]
                ring-1
                ring-inset
                ${statusClasses(status)}
              `}
            >
              <span
                className="
                  mr-1.5
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-current
                "
              />

              {statusLabel(status)}
            </span>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-zinc-500">
            {description}
          </p>

          {/* Sent */}
          {sentAt && (
            <p className="mt-2 text-[11px] text-zinc-400">
              Sent {formatDate(sentAt)}
            </p>
          )}

          {/* Failed */}
          {failedAt && (
            <p className="mt-2 text-[11px] text-red-500">
              Failed {formatDate(failedAt)}
            </p>
          )}

          {/* Pending */}
          {normalizedStatus ===
            "pending" &&
            lastAttemptAt && (
              <p className="mt-2 text-[11px] text-amber-600">
                Attempted{" "}
                {formatDate(
                  lastAttemptAt
                )}
              </p>
            )}
        </div>

        {/* Action */}
        {normalizedStatus ===
          "failed" && (
          <RetryEmailButton
            documentType={documentType}
            documentId={documentId}
            emailType={emailType}
          />
        )}
      </div>
    </div>
  );
}