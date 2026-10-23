import type { Metadata } from "next";
import { buildMetadata } from "@/sanity/lib/seo";
import type { SeoData } from "@/sanity/lib/types";

export async function getContactMetadata(page: SeoData): Promise<Metadata> {
  return buildMetadata({
    seo: page,

    fallbackTitle: page?.metaTitle ??
      "Contact | Golden Palmera Global",

    fallbackDescription: page?.metaDescription ??
      "Contact Golden Palmera Global.",

    canonical: page?.canonicalUrl ??
      "/contact",
  })
}