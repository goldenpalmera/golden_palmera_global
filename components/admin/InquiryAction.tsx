"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  updateInquiryStatus,
} from "@/app/actions/inquiry-status";

import type {
  Inquiry,
  InquiryStatus,
} from "@/lib/inquiries/types";

const statuses: {
  value: InquiryStatus;
  label: string;
}[] = [
  {
    value: "NEW",
    label: "New",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    value: "CONTACTED",
    label: "Contacted",
  },
  {
    value: "RESOLVED",
    label: "Resolved",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
];

export default function InquiryActions({
  inquiry,
}: {
  inquiry: Inquiry;
}) {
  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    error,
    setError,
  ] = useState("");

  const [
    selected,
    setSelected,
  ] =
    useState<InquiryStatus>(
      inquiry.status
    );

  function changeStatus(
    status: InquiryStatus
  ) {
    setSelected(status);
    setError("");

    startTransition(async () => {
      try {
        await updateInquiryStatus(
          inquiry._id,
          status
        );
      } catch (error) {
        setSelected(
          inquiry.status
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to update status."
        );
      }
    });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <select
        value={selected}
        disabled={isPending}
        onChange={(event) =>
          changeStatus(
            event.target
              .value as InquiryStatus
          )
        }
        className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 outline-none focus:border-emerald-600 disabled:opacity-60"
      >
        {statuses.map(
          (status) => (
            <option
              key={status.value}
              value={status.value}
            >
              {status.label}
            </option>
          )
        )}
      </select>

      {isPending && (
        <span className="self-center text-xs text-zinc-500">
          Saving...
        </span>
      )}

      {error && (
        <span className="self-center text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}
