import type { Metadata } from "next";
import { buildMetadata } from "@/sanity/lib/seo";
import { getAboutPageSEO } from "./getAboutPage";

export async function getAboutPageMetadata(): Promise<Metadata> {
  const page = await getAboutPageSEO();
  
  return buildMetadata({
    seo: page?.seo,

    fallbackTitle:
      page?.heroTitle || 
        "About Golden Palmera Global",

    fallbackDescription:
      page?.heroDescription || 
        "Golden Palmera Global is an agricultural commodities and international trade company focused on sourcing, processing, packaging, and exporting quality products to markets around the world.",

    canonical:
      "/about",
  })
}