"use client";

import { useState, useTransition } from "react";
import { updateContactStatus } from "@/app/actions/contact-status";
import type { ContactStatus } from "@/lib/contacts/types";

const statuses: ContactStatus[] = [
  "NEW",
  "READ",
  "REPLIED",
  "RESOLVED",
  "ARCHIVED",
];

function formatStatus(status: ContactStatus) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ContactStatusForm({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: ContactStatus;
}) {
  const [ isPending, startTransition ] = useTransition();
  const [ status, setStatus ] = useState<ContactStatus>(currentStatus);
  const [ error, setError ] = useState("");

  function handleChange(nextStatus: ContactStatus) {
    const previousStatus = status;

    setStatus(nextStatus);
    setError("");

    startTransition(async () => {
      try {
        const result =
          await updateContactStatus(
            id,
            nextStatus
          );

        if (!result.success) {
          setStatus(previousStatus);
          setError(
            result.error
          );
        }

        setError("")
      } catch (error) {
        console.error(
          "Status update failed:",
          error
        );

        setStatus(previousStatus);
        setError(
          "Failed to update status."
        );
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-2 sm:item-end">
      <div className="flex items-center gap-3">
        {isPending && (
          <span className="text-xs text-zinc-400">
            Updating
          </span>
        )}

        <label 
          className="sr-only"
          htmlFor="contact status"
        >
          Contact status
        </label>

        <select
          value={status}
          disabled={isPending}
          onChange={(event) =>
            handleChange(
              event.target.value as ContactStatus)
          }
          className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 disabled:opacity-60"
        >
          {statuses.map((item) => (
            <option
              key={item}
              value={item}
            >
              {formatStatus(item)}
            </option>
            ))}
        </select>
      </div>

      {error && (
        <p className="max-w-[240px] text-right text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}