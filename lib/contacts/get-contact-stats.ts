import { client } from "@/sanity/lib/client";

export async function getContactStats() {
  const result =
    await client.fetch<{
      new: number;
      read: number;
      replied: number;
      resolved: number;
      archived: number;
      total: number;
    }>(
      `
        {
          "new": count(*[
            _type == "contactSubmission"
            && status == "NEW"
          ]),

          "read": count(*[
            _type == "contactSubmission"
            && status == "READ"
          ]),

          "replied": count(*[
            _type == "contactSubmission"
            && status == "REPLIED"
          ]),

          "resolved": count(*[
            _type == "contactSubmission"
            && status == "RESOLVED"
          ]),

          "archived": count(*[
            _type == "contactSubmission"
            && status == "ARCHIVED"
          ]),

          "total": count(*[
            _type == "contactSubmission"
          ])
        }
      `,
      {},
      {
        next: {
          revalidate: 0,
        },
      }
    );

  return result;
}