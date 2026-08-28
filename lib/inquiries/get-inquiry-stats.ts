import {
  client,
} from "@/sanity/lib/client";

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
