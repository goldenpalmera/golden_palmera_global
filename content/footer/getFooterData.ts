import { getFooter } from "./getFooter";

import {
  DEFAULTS,
  FOOTER_COLS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_TRUST_BADGES,
} from "./fallbacks";

import type { FooterData } from "./types";

export async function getFooterData(): Promise<FooterData> {
  const data = await getFooter();

  return {
    companyName:
      data?.companyName?.trim() ||
      DEFAULTS.companyName,

    companyTagline:
      data?.companyTagline?.trim() ||
      DEFAULTS.companyTagline,

    description:
      data?.footerDescription?.trim() ||
      DEFAULTS.description,

    email:
      data?.email?.trim() ||
      "info@goldenpalmeraglobal.com",

    location: {
      country:
        data?.location?.country?.trim() ||
        "Nigeria",

      region:
        data?.location?.region?.trim() ||
        "West Africa",
    },

    cacNumber:
      data?.cacNumber?.trim() ||
      DEFAULTS.cacNumber,

    copyrightYear:
      data?.copyrightYear ??
      DEFAULTS.copyrightYear,

    columns:
      data?.footerColumns?.length
        ? data.footerColumns
        : FOOTER_COLS,

    socialLinks:
      data?.socialLinks?.length
        ? data.socialLinks
        : DEFAULT_SOCIAL_LINKS,

    trustBadges:
      data?.trustBadges?.length
        ? data.trustBadges
        : DEFAULT_TRUST_BADGES,

    bottomMessage:
      data?.bottomMessage?.trim() ||
      DEFAULTS.bottomMessage,
  };
}
