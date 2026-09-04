import { getSanityClient } from "@/sanity/lib/client";

import type {
  Inquiry,
  InquiryStatus,
} from "./types";

const client = getSanityClient();

export async function getInquiries({
  search = "",
  status,
  type,
}: {
  search?: string;
  status?: InquiryStatus;
  type?: string;
} = {}) {
  const query = `
    *[
      _type == "inquiry"

      && (
        $search == ""
        || name match $search + "*"
        || email match $search + "*"
        || reference match $search + "*"
        || company match $search + "*"
        || message match $search + "*"
      )

      && (
        $status == ""
        || status == $status
      )

      && (
        $type == ""
        || type == $type
      )
    ]

    | order(submittedAt desc)

    {
      _id,
      reference,
      type,

      name,
      email,
      phone,
      company,
      country,

      subject,

      product,
      quantity,
      packaging,
      destination,

      organizationType,
      market,
      partnershipFocus,
      companyWebsite,

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

  return client.fetch<Inquiry[]>(
    query,
    {
      search: search.trim(),
      status: status || "",
      type: type || "",
    },
    {
      next: {
        revalidate: 0,
      },
    }
  );
}

export async function getInquiryById(
  id: string
) {
  const query = `
    *[
      _type == "inquiry"
      && _id == $id
    ][0] {
      _id,
      reference,
      type,

      name,
      email,
      phone,
      company,
      country,

      subject,

      product,
      quantity,
      packaging,
      destination,

      organizationType,
      market,
      partnershipFocus,
      companyWebsite,

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

  return client.fetch<Inquiry | null>(
    query,
    { id },
    {
      next: {
        revalidate: 0,
      },
    }
  );
}


export async function getInquiryStats() {
  const result =
    await client.fetch<{
      total: number;
      new: number;
      inProgress: number;
      contacted: number;
      resolved: number;
      rejected: number;
    }>(
      `{
        "total": count(*[
          _type == "inquiry"
        ]),

        "new": count(*[
          _type == "inquiry"
          && status == "NEW"
        ]),

        "inProgress": count(*[
          _type == "inquiry"
          && status == "IN_PROGRESS"
        ]),

        "contacted": count(*[
          _type == "inquiry"
          && status == "CONTACTED"
        ]),

        "resolved": count(*[
          _type == "inquiry"
          && status == "RESOLVED"
        ]),

        "rejected": count(*[
          _type == "inquiry"
          && status == "REJECTED"
        ])
      }`,
      {},
      {
        next: {
          revalidate: 0,
        },
      }
    );

  return result;
}
