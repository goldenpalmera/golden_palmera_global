import { defineQuery } from "next-sanity";

export const CONTACTS_INQUIRY_QUERY = defineQuery(
  `
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
  `
);

export const CONTACTS_STATS_QUERY = defineQuery(
  `
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
  `
);

export const CONTACTS_BY_ID_QUERY = defineQuery(
  `
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
  `
);