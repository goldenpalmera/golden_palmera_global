import { getSanityClient } from "@/sanity/lib/client";
import { PARTNERSHIP_PAGE_QUERY } from "@/sanity/lib/queries/contact/queries";
import type { PartnershipPage } from "./types";

const SANITY_OPTIONS = {
  next: {
    revalidate: 60,
  },
};

export async function getPartnershipPage(): Promise<PartnershipPage | null> {
  const client = getSanityClient();

  return client.fetch<PartnershipPage | null>(
    PARTNERSHIP_PAGE_QUERY,
    {},
    SANITY_OPTIONS,
  );
}