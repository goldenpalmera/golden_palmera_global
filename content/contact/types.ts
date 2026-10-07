import { SanityImageSource } from "@sanity/image-url";
import { SeoData } from "@/sanity/lib/types";

export type ExportBuyerPage = {
  _id: string;

  heroEyebrow?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroDescription?: string;
  heroImage?: SanityImageSource | null;

  sourceEyebrow?: string;
  sourceTitle?: string;
  sourceDescription?: string;

  buyerSteps?: {
    number: string;
    title: string;
    text: string;
  }[];

  availabilityTitle?: string;
  availabilityDescription?: string;

  bottomEyebrow?: string;
  bottomTitleLine1?: string;
  bottomTitleLine2?: string;

  seo: SeoData;
};

export type PartnershipPage = {
  _id: string;

  heroEyebrow?: string;
  heroTitleLine1?: string;
  heroTitleAccent?: string;
  heroDescription?: string;
  heroImage?: SanityImageSource | null;

  contentEyebrow?: string;
  contentTitleLine1?: string;
  contentTitleLine2?: string;
  contentDescription?: string;

  partnershipTypesEyebrow?: string;
  partnershipTypes?: string[];

  nextStepsEyebrow?: string;
  nextStepsDescription?: string;

  formEyebrow?: string;
  formTitleLine1?: string;
  formTitleLine2?: string;
  formDescription?: string;

  closingEyebrow?: string;
  closingTitleLine1?: string;
  closingTitleLine2?: string;

  seo: SeoData;
};

export type ContactPage = {
  _id: string;

  heroEyebrow?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroImage?: SanityImageSource | null;

  contactInfoEyebrow?: string;

  emailLabel?: string;
  email?: string;

  locationLabel?: string;
  location?: string;
  region?: string;

  businessLabel?: string;
  businessDescription?: string;

  bottomEyebrow?: string;
  bottomTitleLine1?: string;
  bottomTitleLine2?: string;

  bottomLinkText?: string;
  bottomLinkUrl?: string;

  seo: SeoData;
};

export type RequestQuoteInfoPoint = {
  title: string;
  text: string;
};

export type RequestQuotePage = {
  _id: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroTitleAccent?: string;
  heroDescription?: string;
  heroImage?: SanityImageSource | null;

  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionDescription?: string;

  productInterestLabel?: string;

  infoPoints?: RequestQuoteInfoPoint[];

  seo: SeoData;
};