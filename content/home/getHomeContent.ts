import { HOME_FALLBACKS } from "./fallbacks";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries/home/queries";
import { mapSanityHomeContent } from "./sanity";
import type { HomePageContent } from "./types";
import { getSanityClient } from "@/sanity/lib/client";

function withFallback<T>(
  value: T[] | undefined,
  fallback: T[]
): T[] {
  return value && value.length > 0
    ? value
    : fallback;
}

export async function getHomeContent(): Promise<HomePageContent> {
	const client = getSanityClient();
  const sanityData = await client.fetch(
    HOME_PAGE_QUERY,
    {},
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const sanityContent =
    mapSanityHomeContent(sanityData);

  return {
    hero: HOME_FALLBACKS.hero,
    intro: HOME_FALLBACKS.intro,
    quality: HOME_FALLBACKS.quality,

    /*
     * Collections are Sanity-first.
     * If Sanity has no entries, fallback content is used.
     */
    commodities: withFallback(
      sanityData.commodities,
      HOME_FALLBACKS.commodities
    ),

    services: withFallback(
      sanityContent.services,
      HOME_FALLBACKS.services
    ),

    approach: withFallback(
      sanityContent.approach,
      HOME_FALLBACKS.approach
    ),

    supplyChain: withFallback(
      sanityData.supplyChain,
      HOME_FALLBACKS.supplyChain
    ),

    qualityTests: withFallback(
      sanityData.qualityTests,
      HOME_FALLBACKS.qualityTests
    ),

    inspectionPartners: withFallback(
      sanityData.inspectionPartners,
      HOME_FALLBACKS.inspectionPartners
    ),

    documents: withFallback(
      sanityData.documents,
      HOME_FALLBACKS.documents
    ),

    caseStudies: withFallback(
      sanityContent.caseStudies,
      HOME_FALLBACKS.caseStudies
    ),

    testimonials: withFallback(
      sanityContent.testimonials,
      HOME_FALLBACKS.testimonials
    ),

    contact: HOME_FALLBACKS.contact,
  };
}
