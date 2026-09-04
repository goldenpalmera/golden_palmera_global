"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  contactStatuses,
  type ContactStatus,
} from "@/lib/contacts/types";

export default function ContactFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams =
    useSearchParams();

  const currentSearch =
    searchParams.get("search") ?? "";

  const currentStatus =
    searchParams.get("status") ?? "";

  function updateFilters({
    search = currentSearch,
    status = currentStatus,
  }: {
    search?: string;
    status?: string;
  }) {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (search.trim()) {
      params.set(
        "search",
        search.trim()
      );
    } else {
      params.delete("search");
    }

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    router.push(
      `${pathname}?${params.toString()}`
    );
  }

  function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form =
      new FormData(
        event.currentTarget
      );

    updateFilters({
      search:
        String(
          form.get("search") ?? ""
        ),
      status: currentStatus,
    });
  }

  function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    updateFilters({
      search: currentSearch,
      status: event.target.value,
    });
  }

  function clearFilters() {
    router.push(pathname);
  }

  const hasFilters =
    Boolean(
      currentSearch ||
        currentStatus
    );

  return (
    <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 lg:flex-row"
      >
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          >
            <path
              d="m14.5 14.5 3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <circle
              cx="8.5"
              cy="8.5"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          <input
            name="search"
            defaultValue={
              currentSearch
            }
            placeholder="Search name, email, company, message..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-zinc-200
              bg-white
              pl-10
              pr-4
              text-sm
              text-zinc-900
              outline-none
              transition
              placeholder:text-zinc-400
              focus:border-zinc-400
              focus:ring-2
              focus:ring-zinc-900/5
            "
          />
        </div>

        {/* Status */}
        <select
          value={currentStatus}
          onChange={handleStatusChange}
          className="
            h-11
            rounded-xl
            border
            border-zinc-200
            bg-white
            px-4
            text-sm
            font-medium
            text-zinc-700
            outline-none
            focus:border-zinc-400
            focus:ring-2
            focus:ring-zinc-900/5
          "
        >
          <option value="">
            All statuses
          </option>

          {contactStatuses.map(
            (status: ContactStatus) => (
              <option
                key={status}
                value={status}
              >
                {status
                  .toLowerCase()
                  .replace(
                    /\b\w/g,
                    (char) =>
                      char.toUpperCase()
                  )}
              </option>
            )
          )}
        </select>

        {/* Search button */}
        <button
          type="submit"
          className="
            h-11
            rounded-xl
            bg-zinc-900
            px-5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-zinc-800
          "
        >
          Search
        </button>

        {/* Clear */}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="
              h-11
              rounded-xl
              border
              border-zinc-200
              bg-white
              px-5
              text-sm
              font-medium
              text-zinc-600
              transition
              hover:bg-zinc-50
              hover:text-zinc-900
            "
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
}
