import {
  ADVISORY_BOARD_FALLBACK,
  ADVISORY_BOARD_FALLBACK_SEO,
} from "./fallbacks";

import type {
  AdvisoryBoardPageData,
  AdvisoryBoardResponse,
} from "./types";
import { mapLink } from "../shared/linkMapper";
import { SeoData } from "@/sanity/lib/types";

export function mapAdvisoryBoardPage(
  page: AdvisoryBoardResponse | null
): AdvisoryBoardPageData {
  if (!page) {
    return ADVISORY_BOARD_FALLBACK;
  }

  return {
    title:
      page?.title ??
      ADVISORY_BOARD_FALLBACK.title!,

    heroEyebrow:
      page?.heroEyebrow ??
      ADVISORY_BOARD_FALLBACK.heroEyebrow!,

    heroTitle:
      page?.heroTitle ??
      ADVISORY_BOARD_FALLBACK.heroTitle!,

    heroDescription:
      page?.heroDescription ??
      ADVISORY_BOARD_FALLBACK.heroDescription!,

		stats:
			page?.stats?.length
				? page.stats
				: ADVISORY_BOARD_FALLBACK.stats,

    members:
      page?.members?.length
        ? page.members
        : ADVISORY_BOARD_FALLBACK.members,

    philosophyEyebrow:
      page?.philosophyEyebrow ??
      ADVISORY_BOARD_FALLBACK.philosophyEyebrow!,

    philosophyTitle:
      page?.philosophyTitle ??
      ADVISORY_BOARD_FALLBACK.philosophyTitle!,

    philosophyParagraphs:
      page?.philosophyParagraphs?.length
        ? page.philosophyParagraphs
        : ADVISORY_BOARD_FALLBACK.philosophyParagraphs,

    cta: {
      title:
        page?.cta?.title ??
        ADVISORY_BOARD_FALLBACK.cta!.title!,

      description:
        page?.cta?.description ??
        ADVISORY_BOARD_FALLBACK.cta!.description!,

      label:
        page?.cta?.label ??
        ADVISORY_BOARD_FALLBACK.cta!.label!,

      link:
        mapLink(page?.cta?.link)
    },
  };
};

export function mapAdvisoryBoardSEO(
  seo: SeoData | null
): SeoData {
  return {
    metaTitle:
      seo?.metaTitle ??
      ADVISORY_BOARD_FALLBACK_SEO.metaTitle!,

    metaDescription:
      seo?.metaDescription ??
      ADVISORY_BOARD_FALLBACK_SEO.metaDescription!,

    keywords:
      seo?.keywords?.length
        ? seo.keywords
        : ADVISORY_BOARD_FALLBACK_SEO.keywords,

    noIndex:
      seo?.noIndex ??
      ADVISORY_BOARD_FALLBACK_SEO.noIndex ??
      false,

    canonicalUrl:
      seo?.canonicalUrl ??
      ADVISORY_BOARD_FALLBACK_SEO.canonicalUrl,

    ogImage:
      seo?.ogImage ??
      ADVISORY_BOARD_FALLBACK_SEO.ogImage,
  };
}
