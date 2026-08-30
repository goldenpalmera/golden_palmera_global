import Link from "next/link";

import {
  getInquiries,
} from "@/lib/inquiries/get-inquiries";

import {
  getInquiryStats,
} from '@/lib/inquiries/get-inquiry-stats'

import {
  requireAdmin,
} from "@/lib/auth/require-admin";

type SearchParams = Promise<{
  status?: string;
  q?: string;
}>;

const statuses = [
  "NEW",
  "IN_PROGRESS",
  "CONTACTED",
  "RESOLVED",
  "REJECTED",
] as const;

function formatDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(new Date(value));
}

function statusLabel(
  status: string
) {
  return status
    .replace("_", " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

function statusClass(
  status: string
) {
  switch (status) {
    case "NEW":
      return "bg-blue-50 text-blue-700";

    case "IN_PROGRESS":
      return "bg-amber-50 text-amber-700";

    case "CONTACTED":
      return "bg-purple-50 text-purple-700";

    case "RESOLVED":
      return "bg-emerald-50 text-emerald-700";

    case "REJECTED":
      return "bg-red-50 text-red-700";

    default:
      return "bg-zinc-100 text-zinc-700";
  }
}

function inquiryTypeLabel(type: string) {
  switch (type) {
    case "general":
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

  const query =
  params.q?.trim() || "";

const status =
  params.status || "";

const [inquiries, stats] = await Promise.all([
  getInquiries({
    search: query,
    status,
  }),
  getInquiryStats(),
]);

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">
              Golden Palmera Global
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
              Customer Inquiries
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Manage incoming product and
              export inquiries.
            </p>
          </div>

          <div className="flex gap-3">
            <Stat
              label="New"
              value={stats.new}
            />

            <Stat
              label="Active"
              value={
                stats.inProgress + stats.contacted
              }
            />

            <Stat
              label="Total"
              value={inquiries.length}
            />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-4">
          <form
            method="GET"
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              name="q"
              defaultValue={params.q}
              placeholder="Search name, email, reference..."
              className="h-11 flex-1 rounded-xl border border-zinc-200 px-4 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10"
            />

            <select
              name="status"
              defaultValue={status}
              className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-emerald-600"
            >
              <option value="">
                All statuses
              </option>

              {statuses.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {statusLabel(item)}
                  </option>
                )
              )}
            </select>

            <button
              type="submit"
              className="h-11 rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Search
            </button>
          </form>
        </div>
        
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
  <StatCard
    label="New"
    value={stats.new}
  />

  <StatCard
    label="In Progress"
    value={stats.inProgress}
  />

  <StatCard
    label="Contacted"
    value={stats.contacted}
  />

  <StatCard
    label="Resolved"
    value={stats.resolved}
  />

  <StatCard
    label="Rejected"
    value={stats.rejected}
  />
</div>


        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {inquiries.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <h2 className="text-lg font-semibold text-zinc-900">
                No inquiries found
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Try changing your search or
                status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="border-b border-zinc-200 bg-zinc-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Inquiry
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Destination
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Submitted
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-100">
                  {inquiries.map(
                    (inquiry) => (
                      <tr
                        key={inquiry._id}
                        className="transition hover:bg-zinc-50"
                      >
                        <td className="px-6 py-5">
                          <Link
                            href={`/admin/inquiries/${inquiry._id}`}
                            className="font-semibold text-emerald-700 hover:text-emerald-900"
                          >
                            {inquiry.reference}
                          </Link>

                          <p className="mt-1 text-xs text-zinc-500">
                            {inquiryTypeLabel(inquiry.type)}
                          </p>
                        </td>

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

                        <td className="px-6 py-5">
                          <p className="text-sm text-zinc-900">
                            {inquiry.product ||
                              "—"}
                          </p>

                          {inquiry.quantity && (
                            <p className="mt-1 text-xs text-zinc-500">
                              {inquiry.quantity}
                            </p>
                          )}
                        </td>

                        <td className="px-6 py-5 text-sm text-zinc-600">
                          {inquiry.destination ||
                            "—"}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                              inquiry.status
                            )}`}
                          >
                            {statusLabel(
                              inquiry.status
                            )}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-zinc-500">
                          {formatDate(
                            inquiry.submittedAt
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-zinc-900">
        {value}
      </p>
    </div>
  );
}
 function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-zinc-900">
        {value}
      </p>
    </div>
  );
}
