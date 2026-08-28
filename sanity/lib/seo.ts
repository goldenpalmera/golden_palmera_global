import type { Metadata } from "next";
import type { SeoData } from "./types";

type BuildMetadataOptions = {
  seo?: SeoData;
  fallbackTitle: string;
  fallbackDescription?: string;
  canonical?: string;
};

export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  canonical,
}: { BuildMetadataOptions }): Metadata {
  const title = seo?.metaTitle || fallbackTitle;
  const description =
    seo?.metaDescription || fallbackDescription;
  const image = seo?.ogImage?.assert?.url;
  return {
    title,
    description,
    keywords: seo?.keywords,

    robots: seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    ...(canonical
      ? {
        alternates: {
          canonical,
        },
      }
    : {}),

    openGraph: {
      title,
      description,
      type: "website",
      images: seo?.ogImage?.asset?.url
        ? [{ url: seo.ogImage.asset.url }]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: seo?.ogImage?.asset?.url
        ? [seo.ogImage.asset.url]
        : undefined,
    },
  };
}