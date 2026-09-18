import { getSanityClient } from "@/sanity/lib/client";
import { SERVICES_PAGE_QUERY } from "@/sanity/lib/queries/services/queries";
import type { ServicesPageData } from "./types";

export async function getServicesPage() {
  const client = getSanityClient();

  return client.fetch<ServicesPageData | null>(
    SERVICES_PAGE_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["services-page"],
      },
    }
  );
}