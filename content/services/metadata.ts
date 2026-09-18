    import type { Metadata } from "next";

import { buildMetadata } from "@/sanity/lib/seo";

import { getServicesPage, getService } from "./sanity";

export async function getServicesMetadata(): Promise<Metadata> {
  const page = await getServicesPage();

  return buildMetadata({
    seo: page?.seo,

    fallbackTitle:
      page?.heroTitle ||
      "Services | Golden Palmera Global",

    fallbackDescription:
      page?.intro ||
      "Golden Palmera Global provides sourcing, processing, packaging, quality control, and export services for agricultural commodities.",

    canonical: "/services",
  });
}

export async function getServiceMetadata(
  slug: string,
): Promise<Metadata> {
  const service = await getService(slug);

  if (!service) {
    return {
      title: "Service Not Found | Golden Palmera Global",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildMetadata({
    seo: service.seo,

    fallbackTitle:
      `${service.title} | Golden Palmera Global`,

    fallbackDescription:
      service.shortDescription ||
      `Learn more about ${service.title} from Golden Palmera Global.`,

    canonical: `/services/${service.slug}`,
  });
}
