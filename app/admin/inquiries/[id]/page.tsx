import Link from "next/link";
import { notFound } from "next/navigation";
import { getInquiryById } from "@/lib/inquiries/get-inquiries";
import { requireAdmin } from "@/lib/auth/require-admin";
import InquiryStatusForm from "./InquiryStatusForm";
import EmailDelivery from "@/components/admin/EmailDelivery";

function formatDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en",
    {
      dateStyle: "full",
      timeStyle: "short",
    }
  ).format(new Date(value));
}

// function label(value?: string) {
//   if (!value) {
//     return "—";
//   }

//   return value
//     .replace(/_/g, " ")
//     .replace(/\b\w/g, (char) =>
//       char.toUpperCase()
//     );
// }

function inquiryTypeLabel(
  type: string
) {
  switch (type) {
    case "contact":
      return "Contact";

    case "product":
      return "Quote";

    case "partnership":
      return "Partnership";

    case "export_buyer":
      return "Export Buyer";

    case "contact":
      return "Contact"

    default:
      return "Inquiry";
  }
}

const statusStyles = {
  'NEW': "!border-blue-500 text-blue-500",
  "IN_PROGRESS": "!border-yellow-500 text-yellow-500",
  "CONTACTED": "!border-purple-500 text-purple-500",
  "REJECTED": "!border-red-500 text-red-500",
  "RESOLVED": "!border-emerald-500 text-emerald-500",
};


export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  await requireAdmin();

  const { id } = await params;

  const inquiry =
    await getInquiryById(id);

  if (!inquiry) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/admin/inquiries"
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
        >
          ← Back to inquiries
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">
              {inquiry.reference} 
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                {inquiryTypeLabel(inquiry.type)}
              </span>
            </p>

            <h1 className="mt-1 text-3xl font-bold text-zinc-900">
              {inquiry.name}
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Submitted{" "}
              {formatDate(
                inquiry.submittedAt
              )}
            </p>
          </div>

          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <InquiryStatusForm
              id={inquiry._id}
              currentStatus={inquiry.status}
            />

            <a
              href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                `Re: ${inquiry.reference} — Golden Palmera Global`
              )}`}
              className="
                inline-flex 
                h-11 
                items-center 
                justify-center 
                rounded-xl 
                bg-emerald-700 
                px-5 
                text-sm 
                font-semibold 
                text-white 
                transition-colors
                duration-500
                ease-in-out
                hover:bg-white
                hover:text-emerald-700
              "
            >
              Reply to Customer
            </a>
          </div>
          
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 lg:col-span-2">
            <div className="grid gap-5 sm:grid-cols-2">
              <h2 className="text-lg font-semibold text-zinc-900">
                Customer Information
              </h2>
              <h3 className={`
                rounded-2xl 
                border-zinc-200 
                borderrounded-2xl 
                border 
                ${ statusStyles[inquiry.status] || "border-zinc-500" }
                p-2 
                text-xs 
                sm:justify-self-end`}
              >
                {inquiry.status}
              </h3>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Info
                label="Full Name"
                value={inquiry.name}
              />

              <Info
                label="Email"
                value={inquiry.email}
                href={`mailto:${inquiry.email}`}
              />

              <Info
                label="Phone / WhatsApp"
                value={inquiry.phone}
                href={
                  inquiry.phone
                    ? `tel:${inquiry.phone}`
                    : undefined
                }
              />

              <Info
                label="Company"
                value={
                  inquiry.company
                }
              />

              <Info
                label="Country"
                value={
                  inquiry.country
                }
              />
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="mt-1">
              <EmailDelivery
                documentType="inquiry"
                documentId={inquiry._id}
                notificationStatus={
                  inquiry.notificationEmailStatus
                }
                notificationLastAttemptAt={
                  inquiry.notificationEmailLastAttemptAt
                }
                notificationSentAt={
                  inquiry.notificationEmailSentAt
                }
                notificationFailedAt={
                  inquiry.notificationEmailFailedAt
                }
                confirmationStatus={
                  inquiry.confirmationEmailStatus
                }
                confirmationLastAttemptAt={
                  inquiry.confirmationEmailLastAttemptAt
                }
                confirmationSentAt={
                  inquiry.confirmationEmailSentAt
                }
                confirmationFailedAt={
                  inquiry.confirmationEmailFailedAt
                }
              />
            </div>
          </section>
        </div>

        {inquiry.type === "product" || inquiry.type === "export_buyer" ? (
          <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900">
              {inquiry.type === "export_buyer"
                ? "Buyer Requirements"
                : "Order Requirements"}
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Info
                label="Product"
                value={inquiry.product}
              />

              <Info
                label="Quantity"
                value={inquiry.quantity}
              />

              <Info
                label="Packaging"
                value={inquiry.packaging}
              />

              <Info
                label="Destination"
                value={inquiry.destination}
              />
            </div>
          </section>
        ) : null}

        {inquiry.type === "partnership" && (
          <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900">
              Partnership Details
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Info
                label="Organisation Type"
                value={inquiry.organizationType}
              />

              <Info
                label="Market / Region"
                value={inquiry.market}
              />

              <Info
                label="Partnership Focus"
                value={inquiry.partnershipFocus}
              />

              <Info
                label="Website"
                value={inquiry.companyWebsite}
                href={inquiry.companyWebsite}
              />
            </div>
          </section>
        )}

        {inquiry.type === "contact" && (
          <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900">
              Contact Enquiry
            </h2>

            <div className="mt-6">
              <Info
                label="Subject"
                value={inquiry.subject}
              />
            </div>
          </section>
        )}

        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">
            Additional Requirements
          </h2>

          <div className="mt-5 whitespace-pre-wrap rounded-xl bg-zinc-50 p-5 text-sm leading-7 text-zinc-700">
            {inquiry.message}
          </div>
        </section>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
  href,
}: {
  label: string;
  value?: string;
  href?: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {label}
      </p>

      {href && value ? (
        <a
          href={href}
          className="mt-1 block break-words text-sm font-medium text-emerald-700 hover:text-emerald-900"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 break-words text-sm font-medium text-zinc-900">
          {value || "—"}
        </p>
      )}
    </div>
  );
}
