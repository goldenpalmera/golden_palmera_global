import { getSanityClient } from "@/sanity/lib/client";
import {
  REQUEST_QUOTE_PAGE_QUERY,
} from "@/sanity/lib/queries/contact/queries";
import type { RequestQuotePage } from "./types";

const SANITY_OPTIONS = {
  next: {
    revalidate: 60,
  },
};

export async function getRequestQuotePage(): Promise<RequestQuotePage> {
  const client = getSanityClient();

  return client.fetch<RequestQuotePage>(
    REQUEST_QUOTE_PAGE_QUERY,
    {},
    SANITY_OPTIONS,
  );
}