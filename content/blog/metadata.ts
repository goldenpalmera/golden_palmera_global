import type { Metadata } from "next";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPostSEO } from "./sanity";
import { getBlogsSEO } from "./sanity";
import { BLOGS_FALLBACK_SEO } from "./fallbacks";

export async function getBlogsMetadata(): Promise<Metadata> {
  const seo = await getBlogsSEO();

  const finalSEO = {
    ...BLOGS_FALLBACK_SEO,
    ...seo,
  };

  return buildMetadata({
    seo: finalSEO,

    fallbackTitle:
      BLOGS_FALLBACK_SEO.metaTitle!,

    fallbackDescription:
      BLOGS_FALLBACK_SEO.metaDescription!,

    canonical:
      BLOGS_FALLBACK_SEO.canonicalUrl,
  });
}


export async function getBlogPostMetadata(
  params: Promise<{ slug: string }>
): Promise<Metadata> {
  const { slug } = await params;

  const result = await getPostSEO(slug);

  if (!result) {
    return buildMetadata({
      fallbackTitle:
        "Article | Golden Palmera Global",

      fallbackDescription:
        "Insights from Golden Palmera Global on agricultural commodities, African supply chains, sustainability, export markets, and international trade.",

      canonical:
        `/blog/${slug}`,
    });
  }

  return buildMetadata({
    seo: result.seo,

    fallbackTitle:
      `${result.title} | Golden Palmera Global`,

    fallbackDescription:
      `Read ${result.title} from GPG Insights.`,

    canonical:
      `/blog/${result.slug}`,
  });
}
