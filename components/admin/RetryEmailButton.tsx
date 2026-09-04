"use client";

import {
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import {
  retryEmail,
} from "@/app/actions/retry-email";

import type {
  EmailType,
} from "@/lib/email/types";

type Props = {
  documentType:
    | "contact"
    | "inquiry";

  documentId: string;
  emailType: EmailType;
};

export default function RetryEmailButton({
  documentType,
  documentId,
  emailType,
}: Props) {
  const router = useRouter();

  const [
    pending,
    startTransition,
  ] = useTransition();

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  function retry() {
    setError("");
    setSuccess(false);

    startTransition(async () => {
      try {
        const result =
          await retryEmail(
            documentType,
            documentId,
            emailType
          );

        if (!result.success) {
          setError(result.error);
          return;
        }

        setSuccess(true);

        router.refresh();
      } catch (error) {
        console.error(
          "Retry email failed:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to send email."
        );
      }
    });
  }

  return (
    <div className="shrink-0 text-right">
      <button
        type="button"
        onClick={retry}
        disabled={pending}
        className="
          inline-flex
          h-8
          items-center
          justify-center
          rounded-lg
          border
          border-zinc-200
          bg-white
          px-3
          text-xs
          font-semibold
          text-zinc-700
          shadow-sm
          transition
          hover:border-zinc-300
          hover:bg-zinc-50
          hover:text-zinc-950
          focus:outline-none
          focus:ring-2
          focus:ring-zinc-900/10
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {pending ? (
          <>
            <span
              className="
                mr-2
                h-3
                w-3
                animate-spin
                rounded-full
                border-2
                border-zinc-300
                border-t-zinc-700
              "
            />

            Retrying
          </>
        ) : (
          <>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="mr-1.5 h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path
                d="M15.5 7.5A6 6 0 1 0 16 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                d="M13.5 4.5h3v3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Retry
          </>
        )}
      </button>

      {success && (
        <p className="mt-1.5 text-[10px] text-emerald-600">
          Sent successfully
        </p>
      )}

      {error && (
        <p className="mt-1.5 max-w-[150px] text-[10px] leading-4 text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
