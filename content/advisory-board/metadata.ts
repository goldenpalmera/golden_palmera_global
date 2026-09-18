import type { Metadata } from "next";
import { getAdvisoryBoardSeo } from "./sanity";
import { buildMetadata } from "@/sanity/lib/seo";

export async function getAdvisoryBoardMetadata(): Promise<Metadata> {
  const page = await getAdvisoryBoardSeo();
  
  return buildMetadata({
    seo: page?.seo,

    fallbackTitle:
      page?.heroTitle ||
        "Advisory Board | Golden Palmera Global",

    fallbackDescription:
      page?.heroDescription ||
        "Meet the advisory team helping Golden Palmera Global build resilient agricultural supply chains and international trade relationships.",

    canonical:
      "/advisory-board",
  })
}
