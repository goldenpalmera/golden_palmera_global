import type { Metadata } from "next";
import { buildMetadata } from "@/sanity/lib/seo";
import { getApproachSEO } from "./sanity";
import { FALLBACK_APPROACHES } from "./fallback";

export async function getApproachMetadata(
  params: Promise<{ slug: string }>
): Promise<Metadata> {
  const { slug } = await params;

  const approach = await getApproachSEO(slug) ?? 
    FALLBACK_APPROACHES.find(
      (item) => item.slug === slug,
    );

  if (!approach) {
    return {
      title: "Our Approach | Golden Palmera Global",
      description:
        "Discover how Golden Palmera Global approaches agricultural sourcing, trade, quality, and international markets.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildMetadata({
    ...approach,

    fallbackTitle:
      `${approach.title} | Golden Palmera Global`,

    fallbackDescription:
      `Learn about ${approach.title} at Golden Palmera Global.`,

    canonical:
      `/approach/${approach.slug}`,
  });
}
