import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";

const contactQuery = `
  *[_type == "contactSubmission" && _id == $id][0] {
    _id,
    name,
    email,
    company,
    message,
    status,
    submittedAt
  }
`;

export default async function ContactDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const contact = await client.fetch(contactQuery, { id });

  if (!contact) {
    notFound();
  }

  return (
    <div className="max-w-4xl p-6 md:p-10">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[#8c6d35]">
          Contact Message
        </p>

        <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em]">
          {contact.name}
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Email
          </p>

          <a
            href={`mailto:${contact.email}`}
            className="mt-2 block text-lg hover:text-[#8c6d35]"
          >
            {contact.email}
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Company
          </p>

          <p className="mt-2 text-lg">
            {contact.company || "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Status
          </p>

          <p className="mt-2 text-sm uppercase tracking-[0.15em]">
            {contact.status}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Received
          </p>

          <p className="mt-2 text-lg">
            {new Date(contact.submittedAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-12 border border-black/10 bg-[#f5f1e8] p-6 md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-black/40">
          Message
        </p>

        <p className="mt-6 whitespace-pre-wrap text-lg leading-8">
          {contact.message}
        </p>
      </div>
    </div>
  );
}