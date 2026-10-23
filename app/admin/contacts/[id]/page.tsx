import Link from "next/link";
import { notFound } from "next/navigation";

import { getSanityClient } from "@/sanity/lib/client";
import { type ContactStatus }  from "@/lib/contacts/types"

import ContactStatusForm from "./ContactStatusForm";
import EmailDelivery from "@/components/admin/EmailDelivery";

const contactQuery = `*[
  _type == "contact"
  && _id == $id
][0] {
  _id,
  reference,
  name,
  email,
  phone,
  company,
  country,
  message,
  status,
  submittedAt,

  notificationEmailStatus,
  notificationEmailLastAttemptAt,
  notificationEmailSentAt,
  notificationEmailFailedAt,

  confirmationEmailStatus,
  confirmationEmailLastAttemptAt,
  confirmationEmailSentAt,
  confirmationEmailFailedAt
}`;

const statusStyles: Record<ContactStatus, string> = {
  'NEW': "border-blue-500 text-blue-500",
  "READ": "border-yellow-500 text-yellow-500",
  "REPLIED": "border-purple-500 text-purple-500",
  "ARCHIVED": "border-red-500 text-red-500",
  "RESOLVED": "border-emerald-500 text-emerald-500",
};

export default async function ContactDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = getSanityClient();

  const contact = await client.fetch(
    contactQuery,
    { id },
    {
      next: {
        revalidate: 0,
      },
    }
  );

  if (!contact) {
    notFound();
  }

  return (
    <div className="min-h-full bg-[#faf9f6]">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10 lg:px-10">
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/admin/contacts"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
          >
            <span aria-hidden="true">←</span>
            Back to messages
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10 border-b border-zinc-200 pb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* Identity */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c6d35]">
                  Contact message
                </p>

                {contact.reference && (
                  <span className="font-mono text-xs text-zinc-400">
                    {contact.reference}
                  </span>
                )}
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-zinc-950 md:text-3xl">
                {contact.name}
              </h1>

              <p className="mt-2 text-sm text-zinc-500">
                Received{" "}
                {new Date(
                  contact.submittedAt
                ).toLocaleString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Reply */}
              <a
                href={`mailto:${contact.email}`}
                className="
                  inline-flex
                  h-10
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-zinc-200
                  bg-white
                  px-4
                  text-sm
                  font-semibold
                  text-zinc-800
                  shadow-sm
                  transition
                  hover:border-zinc-300
                  hover:bg-zinc-50
                  hover:text-zinc-950
                  focus:outline-none
                  focus:ring-2
                  focus:ring-zinc-900/10
                "
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M17 4.5 10 11l-7-6.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M3 4.5h14v11H3z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                Reply
              </a>

              {/* Status */}
              <ContactStatusForm
                id={contact._id}
                currentStatus={contact.status}
              />
            </div>
          </div>
        </header>

        {/* Main layout */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          {/* Main content */}
          <main className="min-w-0">
            {/* Contact information */}
            <section className="rounded-2xl border border-zinc-200 bg-white">
              <div className="border-b border-zinc-100 px-6 py-5">
                <h2 className="text-sm font-semibold text-zinc-900">
                  Contact information 
                  <span
                    className={`
                      ml-2
                      rounded-2xl 
                      borderrounded-2xl  
                      ${ statusStyles[contact.status as ContactStatus] || "border-zinc-500" }
                      p-1
                      text-xs 
                      sm:justify-self-end
                    `}
                  > 
                     {contact.status}
                  </span>
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Details submitted with this enquiry.
                </p>
              </div>

              <div className="grid gap-x-8 gap-y-7 p-6 sm:grid-cols-2">
                <InfoItem
                  label="Email"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />

                <InfoItem
                  label="Phone"
                  value={contact.phone}
                />

                <InfoItem
                  label="Company"
                  value={contact.company}
                />

                <InfoItem
                  label="Country"
                  value={contact.country}
                />
              </div>
            </section>

            {/* Message */}
            <section className="mt-8 rounded-2xl border border-zinc-200 bg-white">
              <div className="border-b border-zinc-100 px-6 py-5">
                <h2 className="text-sm font-semibold text-zinc-900">
                  Message
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  The message submitted by the contact.
                </p>
              </div>

              <div className="px-6 py-7">
                <p className="whitespace-pre-wrap text-[15px] leading-7 text-zinc-700">
                  {contact.message}
                </p>
              </div>
            </section>
          </main>

          {/* Right sidebar */}
          <aside className="lg:sticky lg:top-8">
            <EmailDelivery
              documentType="contact"
              documentId={contact._id}

              notificationStatus={
                contact.notificationEmailStatus
              }

              notificationLastAttemptAt={
                contact.notificationEmailLastAttemptAt
              }

              notificationSentAt={
                contact.notificationEmailSentAt
              }

              notificationFailedAt={
                contact.notificationEmailFailedAt
              }

              confirmationStatus={
                contact.confirmationEmailStatus
              }

              confirmationLastAttemptAt={
                contact.confirmationEmailLastAttemptAt
              }

              confirmationSentAt={
                contact.confirmationEmailSentAt
              }

              confirmationFailedAt={
                contact.confirmationEmailFailedAt
              }
            />

          </aside>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  href,
}: {
  label: string;
  value?: string | null;
  href?: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
        {label}
      </p>

      {href && value ? (
        <a
          href={href}
          className="mt-2 block break-words text-sm font-medium text-zinc-900 transition-colors hover:text-[#8c6d35]"
        >
          {value}
        </a>
      ) : (
        <p className="mt-2 text-sm font-medium text-zinc-900">
          {value || "Not provided"}
        </p>
      )}
    </div>
  );
}
