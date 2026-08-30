"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  updateContactStatus,
} from "@/app/actions/admin-contact";

import type {
  ContactStatus,
} from "@/lib/contacts/types";

const statuses: ContactStatus[] = [
  "NEW",
  "READ",
  "REPLIED",
  "RESOLVED",
  "ARCHIVED",
];

export default function ContactStatusForm({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: ContactStatus;
}) {
  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [
    status,
    setStatus,
  ] = useState(currentStatus);

  const [
    error,
    setError,
  ] = useState("");

  function handleChange(
    nextStatus: ContactStatus
  ) {
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
          setStatus(currentStatus);

          setError(
            "Failed to update status."
          );
        }
      } catch (error) {
        console.error(error);

        setStatus(currentStatus);

        setError(
          "Failed to update status."
        );
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
              .value as ContactStatus
          )
        }
        className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-800 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 disabled:opacity-60"
      >
        {statuses.map(
          (item) => (
            <option
              key={item}
              value={item}
            >
              {item
                .replace(
                  "_",
                  " "
                )
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