import { HOME_FALLBACKS } from "./fallbacks";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries/home/queries";
import { mapSanityHomeContent } from "./sanity";
import type { HomePageContent } from "./types";
import { getSanityClient } from "@/sanity/lib/client";
import { FALLBACK_PRODUCTS } from "../products/fallbacks";
import { FALLBACK_SERVICES } from "../services/fallbacks";
import { FALLBACK_APPROACHES } from "../approach/fallback";
import { COMPLIANCE_FALLBACKS } from "../compliance/fallbacks";
import { FALLBACK_SUPPLY_CHAIN } from "../about/fallbacks";

function withFallback<T>(
  value: T[] | undefined,
  fallback: T[]
): T[] {
  return value && value.length > 0 ? value : fallback;
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

  const sanityContent = mapSanityHomeContent(sanityData);

  return {
    _id: sanityData?._id ?? "home",

    hero: sanityData?.hero ?? HOME_FALLBACKS.hero,
    intro: sanityData?.intro ?? HOME_FALLBACKS.intro,

    featuredProducts: withFallback(
      sanityData?.featuredProducts,
      FALLBACK_PRODUCTS
    ),

    featuredServices: withFallback(
      sanityContent.services,
      FALLBACK_SERVICES
    ),

    featuredApproaches: withFallback(
      sanityContent.approach,
      FALLBACK_APPROACHES
    ),

    supplyChain: withFallback(
      sanityData?.supplyChain,
      FALLBACK_SUPPLY_CHAIN
    ),

    quality: {
      ...HOME_FALLBACKS.quality,

      tests: withFallback(
        sanityData?.quality?.tests,
        COMPLIANCE_FALLBACKS.qualitySection?.tests ?? []
      ),

      partners: withFallback(
        sanityData?.quality?.partners,
        COMPLIANCE_FALLBACKS.qualitySection?.partners ?? []
      ),

      documents: withFallback(
        sanityData?.quality?.documents,
        COMPLIANCE_FALLBACKS.qualitySection?.documents ?? []
      ),
    },

    featuredCaseStudies: withFallback(
      sanityContent.caseStudies,
      HOME_FALLBACKS.featuredCaseStudies
    ),

    featuredTestimonials: withFallback(
      sanityContent.testimonials,
      HOME_FALLBACKS.featuredTestimonials
    ),

    contact: sanityData?.contact ?? HOME_FALLBACKS.contact,
  };
}
