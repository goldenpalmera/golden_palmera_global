import Link from "next/link";
import ContactStats from "@/components/admin/ContactStats";
import ContactFilters from "@/components/admin/ContactFilters";
import { getContacts, getContactStats } from "@/lib/contacts/get-contacts";
import type { ContactStatus } from "@/lib/contacts/types";

type Props = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

export default async function AdminContactsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const search = params.search ?? "";

  const status =
    params.status &&
    [
      "NEW",
      "READ",
      "REPLIED",
      "RESOLVED",
      "ARCHIVED",
    ].includes(params.status)
      ? (params.status as ContactStatus)
      : undefined;

  /*
   * Load contacts and statistics
   * in parallel.
   */
  const [contacts, stats] =
    await Promise.all([
      getContacts({
        search,
        status,
      }),

      getContactStats(),
    ]);

  return (
    <div className="min-h-full bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c6d35]">
              Administration
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-zinc-950 md:text-3xl">
              Contact messages
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Manage enquiries and monitor email delivery.
            </p>
          </div>

          <span className="text-sm text-zinc-400">
            {contacts.length}{" "}
            {contacts.length === 1
              ? "matching message"
              : "matching messages"}
          </span>
        </div>

        {/* Statistics */}
        <ContactStats stats={stats} />

        {/* Filters */}
        <ContactFilters />

        {/* Results */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div
            className="
              hidden
              grid-cols-[1.2fr_1.4fr_1fr_0.8fr_0.8fr]
              border-b
              border-zinc-100
              bg-zinc-50
              px-5
              py-3.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-zinc-400
              md:grid
            "
          >
            <span>Name</span>
            <span>Email</span>
            <span>Company</span>
            <span>Status</span>
            <span>Date</span>
          </div>

          {contacts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm font-medium text-zinc-900">
                No messages found
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            contacts.map((contact) => (
              <Link
                key={contact._id}
                href={`/admin/contacts/${contact._id}`}
                className="
                  grid
                  gap-3
                  border-b
                  border-zinc-100
                  px-5
                  py-5
                  transition-colors
                  last:border-b-0
                  hover:bg-zinc-50
                  md:grid-cols-[1.2fr_1.4fr_1fr_0.8fr_0.8fr]
                  md:items-center
                "
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900">
                    {contact.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-zinc-400 md:hidden">
                    {contact.email}
                  </p>
                </div>

                <span className="hidden truncate text-sm text-zinc-600 md:block">
                  {contact.email}
                </span>

                <span className="text-sm text-zinc-600">
                  {contact.company || "—"}
                </span>

                <StatusBadge
                  status={contact.status}
                />

                <span className="text-xs text-zinc-400">
                  {new Date(
                    contact.submittedAt
                  ).toLocaleDateString()}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    NEW:
      "bg-blue-50 text-blue-700 ring-blue-600/10",

    READ:
      "bg-zinc-100 text-zinc-600 ring-zinc-500/10",

    REPLIED:
      "bg-violet-50 text-violet-700 ring-violet-600/10",

    RESOLVED:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/10",

    ARCHIVED:
      "bg-zinc-100 text-zinc-500 ring-zinc-500/10",
  };

  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        rounded-full
        px-2.5
        py-1
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.08em]
        ring-1
        ring-inset
        ${styles[status] ?? styles.READ}
      `}
    >
      {status}
    </span>
  );
}
