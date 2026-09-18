import type { Metadata } from "next";
import { buildMetadata } from "@/sanity/lib/seo";
import { getCompliancePageSEO } from "./sanity";

export async function getComplianceMetadata(): Promise<Metadata> {
  const page = await getCompliancePageSEO();

  return buildMetadata({
    seo: page?.seo,

    fallbackTitle:
      page?.hero?.title ??
      "Compliance | Golden Palmera Global",

    fallbackDescription:
      page?.hero?.description ??
      "Golden Palmera Global's approach to quality assurance, traceability, export documentation, responsible sourcing, and international trade standards.",

    canonical:
      page?.seo?.canonicalUrl ??
      "/compliance",
  });
}
