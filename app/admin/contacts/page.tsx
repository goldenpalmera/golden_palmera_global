import Link from "next/link";
import { client } from "@/sanity/lib/client";

const contactsQuery = `
  *[_type == "contactSubmission"]
  | order(createdAt desc) {
    _id,
    name,
    email,
    company,
    message,
    status,
    submittedAt
  }
`;

export default async function AdminContactsPage() {
  const contacts = await client.fetch(
    contactsQuery,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  );

  return (
    <div className="p-6 md:p-10">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#8c6d35]">
            Administration
          </p>

          <h1 className="mt-3 text-4xl font-medium tracking-[-0.04em]">
            Contact Messages
          </h1>
        </div>

        <span className="font-mono text-sm text-black/40">
          {contacts.length} messages
        </span>
      </div>

      <div className="overflow-hidden border border-black/10">
        <div className="hidden grid-cols-[1.2fr_1.2fr_1fr_0.7fr_0.8fr] border-b border-black/10 bg-[#f5f1e8] px-5 py-4 text-[10px] uppercase tracking-[0.2em] text-black/45 md:grid">
          <span>Name</span>
          <span>Email</span>
          <span>Company</span>
          <span>Status</span>
          <span>Date</span>
        </div>

        {contacts.length === 0 ? (
          <div className="p-10 text-sm text-black/50">
            No contact messages yet.
          </div>
        ) : (
          contacts.map((contact: any) => (
            <Link
              key={contact._id}
              href={`/admin/contacts/${contact._id}`}
              className="grid gap-3 border-b border-black/10 p-5 transition-colors last:border-b-0 hover:bg-[#f5f1e8] md:grid-cols-[1.2fr_1.2fr_1fr_0.7fr_0.8fr] md:items-center"
            >
              <div>
                <p className="font-medium">{contact.name}</p>

                <p className="mt-1 text-xs text-black/45 md:hidden">
                  {contact.email}
                </p>
              </div>

              <span className="hidden text-sm text-black/60 md:block">
                {contact.email}
              </span>

              <span className="text-sm text-black/60">
                {contact.company || "—"}
              </span>

              <span className="text-xs uppercase tracking-[0.15em]">
                {contact.status}
              </span>

              <span className="text-xs text-black/45">
                {new Date(contact.submittedAt).toLocaleDateString()}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}