import type { Metadata } from "next";
import type { BuildMetadataOptions } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { SITE_NAME, SITE_URL } from "./site";

export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  canonical = "/",
}: BuildMetadataOptions): Metadata {
  const title = seo?.metaTitle || fallbackTitle;

  const description = seo?.metaDescription || fallbackDescription;

  const canonicalPath = seo?.canonicalUrl || canonical;

  const canonicalUrl =
    canonicalPath.startsWith("http")
      ? canonicalPath
      : `${SITE_URL}${canonicalPath}`;

  const ogImage = seo?.ogImage
    ? urlFor(seo.ogImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .url()
    : undefined;

  return {
    title,
    description,

    keywords: seo?.keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: seo?.noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      ...(ogImage
        ? { images: [ogImage] }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage
        ? { images: [ogImage] }
        : {}),
    },
  };
}
