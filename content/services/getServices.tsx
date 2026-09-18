import { getSanityClient } from "@/sanity/lib/client";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import type { Service } from "@/content/services/types";

export async function getServices(): Promise<Service[]> {
  const client = getSanityClient();

  return client.fetch<Service[]>(
    SERVICES_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["services"],
      },
    }
  );
}
