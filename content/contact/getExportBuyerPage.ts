import { getSanityClient } from "@/sanity/lib/client";
import { EXPORT_BUYER_PAGE_QUERY } from "@/sanity/lib/queries/contact/queries";
import type { ExportBuyerPage } from "./types";

const SANITY_OPTIONS = {
  next: {
    revalidate: 60,
  },
};

export async function getExportBuyerPage(): Promise<ExportBuyerPage | null> {
  const client = getSanityClient();

  return client.fetch<ExportBuyerPage | null>(
    EXPORT_BUYER_PAGE_QUERY,
    {},
    SANITY_OPTIONS,
  );
}