import Link from "next/link";

import {
  getInquiries,
  getInquiryStats,
} from "@/lib/inquiries/get-inquiries";

import { requireAdmin } from "@/lib/auth/require-admin";

import {
  InquiryStatus,
  inquiryStatuses,
  InquiryType,
  inquiryTypes,
} from "@/lib/inquiries/types";

type SearchParams = Promise<{
  status?: string;
  q?: string;
  type?: string;
}>;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusLabel(status: string) {
  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function statusClass(status: string) {
  switch (status) {
    case "NEW":
      return "bg-blue-50 text-blue-700 ring-blue-600/10";

    case "IN_PROGRESS":
      return "bg-amber-50 text-amber-700 ring-amber-600/10";

    case "CONTACTED":
      return "bg-purple-50 text-purple-700 ring-purple-600/10";

    case "RESOLVED":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/10";

    case "REJECTED":
      return "bg-red-50 text-red-700 ring-red-600/10";

    default:
      return "bg-zinc-100 text-zinc-700 ring-zinc-500/10";
  }
}

function inquiryTypeLabel(type: string) {
  switch (type) {
    case "contact":
      return "Contact";

    case "product":
      return "Quote";

    case "partnership":
      return "Partnership";

    case "export_buyer":
      return "Export Buyer";

    default:
      return "Inquiry";
  }
}

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await requireAdmin();

  const params = await searchParams;

  const query = params.q?.trim() || "";

  const status =
    params.status &&
    inquiryStatuses.includes(
      params.status as InquiryStatus
    )
      ? (params.status as InquiryStatus)
      : undefined;

  const type =
    params.type &&
    inquiryTypes.includes(
      params.type as InquiryType
    )
      ? (params.type as InquiryType)
      : undefined;

  const [inquiries, stats] = await Promise.all([
    getInquiries({
      search: query,
      status,
      type,
    }),
    getInquiryStats(),
  ]);

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-zinc-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Golden Palmera Global
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
              Customer inquiries
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-zinc-500">
              Manage incoming product, export, partnership,
              and general customer inquiries.
            </p>
          </div>

          <div className="text-sm text-zinc-400">
            {inquiries.length}{" "}
            {inquiries.length === 1
              ? "result"
              : "results"}
          </div>
        </div>

        {/* Filters */}
        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <form
            method="GET"
            className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px_auto]"
          >
            {/* Search */}
            <div className="relative">
              <label
                htmlFor="inquiry-search"
                className="sr-only"
              >
                Search inquiries
              </label>

              <input
                id="inquiry-search"
                name="q"
                defaultValue={params.q}
                placeholder="Search name, email, reference..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-zinc-200
                  bg-white
                  px-4
                  text-sm
                  text-zinc-900
                  outline-none
                  placeholder:text-zinc-400
                  focus:border-emerald-600
                  focus:ring-2
                  focus:ring-emerald-600/10
                "
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="inquiry-status"
                className="sr-only"
              >
                Filter by status
              </label>

              <select
                id="inquiry-status"
                name="status"
                defaultValue={status ?? ""}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-zinc-200
                  bg-white
                  px-4
                  text-sm
                  text-zinc-700
                  outline-none
                  focus:border-emerald-600
                  focus:ring-2
                  focus:ring-emerald-600/10
                "
              >
                <option value="">
                  All statuses
                </option>

                {inquiryStatuses.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {statusLabel(item)}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="inquiry-type"
                className="sr-only"
              >
                Filter by type
              </label>

              <select
                id="inquiry-type"
                name="type"
                defaultValue={type ?? ""}
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-zinc-200
                  bg-white
                  px-4
                  text-sm
                  text-zinc-700
                  outline-none
                  focus:border-emerald-600
                  focus:ring-2
                  focus:ring-emerald-600/10
                "
              >
                <option value="">
                  All types
                </option>

                {inquiryTypes.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {inquiryTypeLabel(item)}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <button
              type="submit"
              className="
                h-11
                rounded-xl
                bg-zinc-900
                px-6
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-zinc-800
                focus:outline-none
                focus:ring-2
                focus:ring-zinc-900/10
              "
            >
              Search
            </button>
          </form>

          {/* Active filters */}
          {(query || status || type) && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-4">
              <span className="text-xs font-medium text-zinc-400">
                Active filters:
              </span>

              {query && (
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                  Search: {query}
                </span>
              )}

              {status && (
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                  Status: {statusLabel(status)}
                </span>
              )}

              {type && (
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                  Type: {inquiryTypeLabel(type)}
                </span>
              )}

              <Link
                href="/admin/inquiries"
                className="ml-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
              >
                Clear filters
              </Link>
            </div>
          )}
        </section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <StatCard
            label="Total"
            value={stats.total}
          />

          <StatCard
            label="New"
            value={stats.new}
            tone="blue"
          />

          <StatCard
            label="In Progress"
            value={stats.inProgress}
            tone="amber"
          />

          <StatCard
            label="Contacted"
            value={stats.contacted}
            tone="purple"
          />

          <StatCard
            label="Resolved"
            value={stats.resolved}
            tone="green"
          />

          <StatCard
            label="Rejected"
            value={stats.rejected}
            tone="red"
          />
        </section>

        {/* Results */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          {inquiries.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <h2 className="text-sm font-semibold text-zinc-900">
                No inquiries found
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Try changing your search or filters.
              </p>

              {(query || status || type) && (
                <Link
                  href="/admin/inquiries"
                  className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  Clear filters
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="border-b border-zinc-200 bg-zinc-50">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      Inquiry
                    </th>

                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      Type
                    </th>

                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      Destination
                    </th>

                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      Submitted
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-100">
                  {inquiries.map((inquiry) => (
                    <tr
                      key={inquiry._id}
                      className="transition-colors hover:bg-zinc-50"
                    >
                      {/* Reference */}
                      <td className="px-6 py-5">
                        <Link
                          href={`/admin/inquiries/${inquiry._id}`}
                          className="font-semibold text-emerald-700 hover:text-emerald-900"
                        >
                          {inquiry.reference}
                        </Link>

                        <p className="mt-1 line-clamp-1 max-w-[220px] text-xs text-zinc-500">
                          {inquiry.message}
                        </p>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-5">
                        <p className="font-medium text-zinc-900">
                          {inquiry.name}
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          {inquiry.email}
                        </p>

                        {inquiry.company && (
                          <p className="mt-1 text-xs text-zinc-400">
                            {inquiry.company}
                          </p>
                        )}
                      </td>

                      {/* Type */}
                      <td className="px-6 py-5">
                        <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                          {inquiryTypeLabel(
                            inquiry.type
                          )}
                        </span>
                      </td>

                      {/* Product */}
                      <td className="px-6 py-5">
                        <p className="text-sm text-zinc-900">
                          {inquiry.product || "—"}
                        </p>

                        {inquiry.quantity && (
                          <p className="mt-1 text-xs text-zinc-500">
                            {inquiry.quantity}
                          </p>
                        )}
                      </td>

                      {/* Destination */}
                      <td className="px-6 py-5 text-sm text-zinc-600">
                        {inquiry.destination || "—"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`
                            inline-flex
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ring-1
                            ring-inset
                            ${statusClass(
                              inquiry.status
                            )}
                          `}
                        >
                          {statusLabel(
                            inquiry.status
                          )}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-zinc-500">
                        {formatDate(
                          inquiry.submittedAt
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number;
  tone?:
    | "default"
    | "blue"
    | "amber"
    | "purple"
    | "green"
    | "red";
}) {
  const tones = {
    default:
      "bg-white text-zinc-900",

    blue:
      "bg-blue-50/60 text-blue-700",

    amber:
      "bg-amber-50/60 text-amber-700",

    purple:
      "bg-purple-50/60 text-purple-700",

    green:
      "bg-emerald-50/60 text-emerald-700",

    red:
      "bg-red-50/60 text-red-700",
  };

  return (
    <div
      className={`
        rounded-2xl
        border
        border-zinc-200
        p-5
        ${tones[tone]}
      `}
    >
      <p className="text-xs font-medium text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold tracking-tight">
        {value}
      </p>
    </div>
  );
}
