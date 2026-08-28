"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  retryInquiryEmail,
} from "@/app/actions/retry-inquiry-email";

export default function RetryEmailButton({
  inquiryId,
}: {
  inquiryId: string;
}) {
  const [
    pending,
    startTransition,
  ] = useTransition();

  const [
    error,
    setError,
  ] = useState("");

  function retry() {
    setError("");

    startTransition(async () => {
      try {
        await retryInquiryEmail(
          inquiryId
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to send email."
        );
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={retry}
        disabled={pending}
        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending
          ? "Retrying..."
          : "Retry Email"}
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
