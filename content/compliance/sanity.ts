import { getSanityClient } from "@/sanity/lib/client";
import { COMPLIANCE_PAGE_QUERY, COMPLIANCE_PAGE_SEO_QUERY } from "@/sanity/lib/queries/compliance/queries";
import type { CompliancePageData } from "./types";

export async function getCompliancePage(): Promise<CompliancePageData | null> {
  const client = getSanityClient();

  return client.fetch(
    COMPLIANCE_PAGE_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["compliance"],
      },
    },
  );
}

export async function getCompliancePageSEO(): Promise<CompliancePageData | null> {
  const client = getSanityClient();

  return client.fetch<CompliancePageData | null>(
    COMPLIANCE_PAGE_SEO_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["about-page-seo"],
      },
    }
  );
}