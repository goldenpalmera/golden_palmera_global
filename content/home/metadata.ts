import type { Metadata } from "next";

import { buildMetadata } from "@/sanity/lib/seo";
import { getHomePageSEO } from "@/content/home/getHomePage";
import { HOMEPAGE_FALLBACK_SEO } from "./fallbacks";

export async function getHomeMetadata(): Promise<Metadata> {
  const seo = await getHomePageSEO();

  const resolvedSeo = {
    ...HOMEPAGE_FALLBACK_SEO,
    ...seo,
  };

  return buildMetadata({
    seo: resolvedSeo,

    fallbackTitle:
      HOMEPAGE_FALLBACK_SEO.metaTitle ??
      "Golden Palmera Global",

    fallbackDescription:
      HOMEPAGE_FALLBACK_SEO.metaDescription ??
      "Golden Palmera Global connects African agricultural commodities with international markets.",

    canonical: "/",
  });
}
