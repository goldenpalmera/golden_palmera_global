import { client } from "@/sanity/lib/client";

import type {
  Contact,
} from "./types";

export async function getContacts({
  search = "",
  status,
}: {
  search?: string;
  status?: string;
} = {}) {
  const query = `
    *[
      _type == "contactSubmission"

      && (
        $search == ""
        || name match $search + "*"
        || email match $search + "*"
        || company match $search + "*"
        || message match $search + "*"
      )

      && (
        $status == ""
        || status == $status
      )
    ]

    | order(submittedAt desc)

    {
      _id,
      name,
      email,
      company,
      message,
      status,
      emailStatus,
      submittedAt
    }
  `;

  return client.fetch<Contact[]>(
    query,

    {
      search: search.trim(),
      status: status || "",
    },

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
  const query = `
    *[
      _type == "contactSubmission"
      && _id == $id
    ][0]
  `;

  return client.fetch<
    Contact | null
  >(
    query,
    { id },
    {
      next: {
        revalidate: 0,
      },
    }
  );
}