import type { Metadata } from "next";
import { buildMetadata } from "@/sanity/lib/seo";
import { getApproachSEO } from "./sanity";

export async function getApproachMetadata(
  params: Promise<{ slug: string }>
): Promise<Metadata> {
  const { slug } = await params;

  const approach = await getApproachSEO(slug);

  if (!approach) {
    return {
      title: "Our Approach | Golden Palmera Global",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildMetadata({
    seo: approach.seo,

    fallbackTitle:
      `${approach.title} | Golden Palmera Global`,

    fallbackDescription:
      `Learn about ${approach.title} at Golden Palmera Global.`,

    canonical:
      `/approach/${approach.slug}`,
  });
}
