"use client";

import { useTransition } from "react";

import { updateInquiryStatus } from "@/app/actions/inquiry-status";

const statuses = [
  "NEW",
  "IN_PROGRESS",
  "CONTACTED",
  "RESOLVED",
  "REJECTED",
] as const;

type Status =
  (typeof statuses)[number];

export default function UpdateInquiryStatus({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: Status;
}) {
  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleChange(
    status: Status
  ) {
    startTransition(async () => {
      await updateInquiryStatus(
        id,
        status
      );
    });
  }

  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
        Submission status
      </label>

      <select
        value={currentStatus}
        disabled={isPending}
        onChange={(event) =>
          handleChange(
            event.target.value as Status
          )
        }
        className="mt-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm outline-none"
      >
        {statuses.map((status) => (
          <option
            key={status}
            value={status}
          >
            {formatStatus(status)}
          </option>
        ))}
      </select>
    </div>
  );
}

function formatStatus(status: string) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}