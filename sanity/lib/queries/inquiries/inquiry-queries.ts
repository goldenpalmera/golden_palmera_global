import { defineQuery } from "next-sanity";

export const INQUIRIES_QUERY = defineQuery(
  `
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
  `
);

export const INQUIRIES_STATS = defineQuery(
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
    }
  `
);

export const INQUIRIES_BY_ID_QUERY = defineQuery(
  `
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
  `
);

export const RETRY_EMAIL_QUERY = defineQuery(
  `*[
      _type == $type
      && _id == $id
    ][0]{
      _id,
      _type,
      reference,
      name,
      email,
      phone,
      company,
      country,
      product,
      quantity,
      packaging,
      destination,
      message,
      organizationType,
      market,
      companyWebsite,
      partnershipFocus,
      subject
    }
  `
)