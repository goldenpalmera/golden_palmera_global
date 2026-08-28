import { client } from "@/sanity/lib/client";

import type {
  Inquiry,
} from "./types";

export async function getInquiries({
  search = "",
  status,
  type,
}: {
  search?: string;
  status?: string;
  type?: string;
} = {}) {
  const query = `
    *[
      _type == "inquiry"
      && (
        $search == ""
        || name match $search + "*"
        || email match $search + "*"
        || company match $search + "*"
        || reference match $search + "*"
        || product match $search + "*"
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
      type,
      status,
      name,
      email,
      company,
      country,
      product,
      quantity,
      destination,
      emailStatus,
      submittedAt
    }
  `;

  return client.fetch<
    Inquiry[]
  >(
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
    ][0]
  `;

  return client.fetch<
    Inquiry | null
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
