import { getSanityClient } from "@/sanity/lib/client";
import { 
  CONTACTS_INQUIRY_QUERY,
  CONTACTS_STATS_QUERY,
  CONTACTS_BY_ID_QUERY,
} from "@/sanity/lib/queries/inquiries/contact-queries";
import type {
  Contact,
  ContactStatus,
} from "./types";


export async function getContacts({
  search = "",
  status,
}: {
  search?: string;
  status?: ContactStatus;
} = {}) {
  const client = getSanityClient();

  return client.fetch<Contact[]>(
    CONTACTS_INQUIRY_QUERY,
    {
      search: search.trim()
        ? `*${search.trim()}*`
        : "",
      status: status || "",
    },
    {
      next: {
        revalidate: 0,
      },
    }
  );
}

export async function getContactStats() {
  const client = getSanityClient();

  return client.fetch<{
    new: number;
    read: number;
    replied: number;
    resolved: number;
    archived: number;
    total: number;
  }>(
    CONTACTS_STATS_QUERY,
    {},
    {
      next: {
        revalidate: 0,
      },
    }
  );
}

export async function getContactById(
  id: string
) {
  const client = getSanityClient();

  return client.fetch<Contact | null>(
    CONTACTS_BY_ID_QUERY,
    { id },
    {
      next: {
        revalidate: 0,
      },
    }
  );
}
