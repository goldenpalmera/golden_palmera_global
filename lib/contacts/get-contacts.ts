import { getSanityClient } from "@/sanity/lib/client";

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
  const query = `
    *[
      _type == "contact"

      && (
        $search == ""
        || name match $search
        || email match $search
        || company match $search
        || message match $search
        || reference match $search
      )

      && (
        $status == ""
        || status == $status
      )
    ]

    | order(submittedAt desc)

    {
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
    }
  `;

  const client = getSanityClient();

  return client.fetch<Contact[]>(
    query,
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
  const query = `
    {
      "new": count(*[
        _type == "contact"
        && status == "NEW"
      ]),

      "read": count(*[
        _type == "contact"
        && status == "READ"
      ]),

      "replied": count(*[
        _type == "contact"
        && status == "REPLIED"
      ]),

      "resolved": count(*[
        _type == "contact"
        && status == "RESOLVED"
      ]),

      "archived": count(*[
        _type == "contact"
        && status == "ARCHIVED"
      ]),

      "total": count(*[
        _type == "contact"
      ])
    }
  `;

  const client = getSanityClient();

  return client.fetch<{
    new: number;
    read: number;
    replied: number;
    resolved: number;
    archived: number;
    total: number;
  }>(
    query,
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
  const query = `
    *[
      _type == "contact"
      && _id == $id
    ][0]{
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
    }
  `;

  const client = getSanityClient();

  return client.fetch<Contact | null>(
    query,
    { id },
    {
      next: {
        revalidate: 0,
      },
    }
  );
}
