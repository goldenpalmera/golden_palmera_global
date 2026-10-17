import { getSanityClient } from "@/sanity/lib/client";
import {
  INQUIRIES_QUERY,
  INQUIRIES_STATS,
  INQUIRIES_BY_ID_QUERY,
} from "@/sanity/lib/queries/inquiries/inquiry-queries";
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

  return client.fetch<Inquiry[]>(
    INQUIRIES_QUERY,
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
  return client.fetch<Inquiry | null>(
    INQUIRIES_BY_ID_QUERY,
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
      INQUIRIES_STATS,
      {},
      {
        next: {
          revalidate: 0,
        },
      }
    );

  return result;
}
