import { getSanityClient } from "@/sanity/lib/client";

import {
  SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICES_PAGE_QUERY,
} from "@/sanity/lib/queries/services/queries";

import type {
  Service,
  ServicePageData,
  ServicesPageData,
} from "./types";

export async function getServices(): Promise<Service[]> {
  const client = getSanityClient();

  return client.fetch(
    SERVICES_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["services"],
      },
    },
  );
}

export async function getService(
  slug: string,
): Promise<ServicePageData | null> {
  const client = getSanityClient();

  return client.fetch(
    SERVICE_BY_SLUG_QUERY,
    { slug },
    {
      next: {
        revalidate: 60,
        tags: [`service:${slug}`],
      },
    },
  );
}

export async function getServicesPage(): Promise<ServicesPageData | null> {
  const client = getSanityClient();

  return client.fetch(
    SERVICES_PAGE_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["services-page"],
      },
    },
  );
}
