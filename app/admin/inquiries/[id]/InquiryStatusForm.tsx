"use client";

import {
  useState,
  useTransition,
} from "react";

import {updateInquiryStatus } from "@/app/actions/inquiry-status";
import { InquiryStatus } from "@/lib/inquiries/types";

const statuses: InquiryStatus[] = [
  "NEW",
  "IN_PROGRESS",
  "CONTACTED",
  "RESOLVED",
  "REJECTED",
];

export default function InquiryStatusForm({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: InquiryStatus;
}) {
  const [ isPending, startTransition ] = useTransition();
  const [ status, setStatus ] = useState(currentStatus);
  const [ error, setError ] = useState("");

  function handleChange(
    nextStatus: InquiryStatus
  ) {
    setStatus(nextStatus);

    setError("");

    startTransition(async () => {
      const result =
        await updateInquiryStatus(
          id,
          nextStatus
        );

      if (!result.success) {
        setStatus(currentStatus);

        setError(result.error ?? "Failed to update inquiry status.");
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <select
        value={status}
        disabled={isPending}
        onChange={(event) =>
          handleChange(
            event.target
              .value as InquiryStatus
          )
        }
        className="
          h-11 
          rounded-xl 
          border 
          border-zinc-200 
          bg-white 
          px-4 
          text-sm 
          font-medium 
          text-zinc-800 
          outline-none 
          focus:border-emerald-600 
          focus:ring-2 
          focus:ring-emerald-600/10 
          disabled:opacity-60
        "
      >
        {statuses.map(
          (item) => (
            <option
              key={item}
              value={item}
            >
              {item
                .replace("_", " ")
                .replace(
                  /\b\w/g,
                  (char) =>
                    char.toUpperCase()
                )}
            </option>
          )
        )}
      </select>

      {isPending && (
        <p className="text-xs text-zinc-500">
          Updating...
        </p>
      )}

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
