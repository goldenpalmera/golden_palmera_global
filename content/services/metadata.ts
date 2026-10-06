import type { Metadata } from "next";
import { buildMetadata } from "@/sanity/lib/seo";
import { FALLBACK_SERVICES } from "./fallbacks";

import { getServicesPage, getService } from "./sanity";

export async function getServicesMetadata(): Promise<Metadata> {
  const page = await getServicesPage();

  return buildMetadata({
    seo: page?.seo,

    fallbackTitle:
      page?.heroTitle1 && page?.heroTitle2
        ? `${page.heroTitle1} ${page.heroTitle2} ${page.heroTitle3 || ""} | Golden Palmera Global`
        : "Services | Golden Palmera Global",

    fallbackDescription:
      page?.heroDescription ||
      "Golden Palmera Global provides sourcing, processing, packaging, quality control, and export services for agricultural commodities.",

    canonical: "/services",
  });
}

export async function getServiceMetadata(
  slug: string,
): Promise<Metadata> {
  const service = await getService(slug) ??
    FALLBACK_SERVICES.find(
      (item) => item.slug === slug,
    );

  if (!service) {
    return {
      title: "Services | Golden Palmera Global",
      description:
        "Agricultural sourcing, export, logistics, and global market access.",
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
