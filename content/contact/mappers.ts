import { 
  ContactPage,
  PartnershipPage,
  ExportBuyerPage,
  RequestQuotePage,
} from "./types";
import {
  FALLBACK_CONTACT,
  FALLBACK_PARTNERSHIP,
  FALLBACK_EXPORT_BUYER,
  FALLBACK_REQUEST_QUOTE,
} from "./fallbacks";

export function mapContactPage(page: ContactPage | null): ContactPage {
  return {
    _id: page?._id ?? FALLBACK_CONTACT._id,

    heroEyebrow: page?.heroEyebrow ?? FALLBACK_CONTACT.heroEyebrow,
    heroTitleLine1: page?.heroTitleLine1 ?? FALLBACK_CONTACT.heroTitleLine1,
    heroTitleLine2: page?.heroTitleLine2 ?? FALLBACK_CONTACT.heroTitleLine2,
    heroImage: page?.heroImage ?? FALLBACK_CONTACT.heroImage,

    contactInfoEyebrow: page?.contactInfoEyebrow ?? FALLBACK_CONTACT.contactInfoEyebrow,

    emailLabel: page?.emailLabel ?? FALLBACK_CONTACT.emailLabel,
    email: page?.email ?? FALLBACK_CONTACT.email,

    locationLabel: page?.locationLabel ?? FALLBACK_CONTACT.locationLabel,
    location: page?.location ?? FALLBACK_CONTACT.location,
    region: page?.region ?? FALLBACK_CONTACT.region,

    businessLabel: page?.businessLabel ?? FALLBACK_CONTACT.businessLabel,
    businessDescription: page?.businessDescription ?? FALLBACK_CONTACT.businessDescription,

    bottomEyebrow: page?.bottomEyebrow ?? FALLBACK_CONTACT.bottomEyebrow,
    bottomTitleLine1: page?.bottomTitleLine1 ?? FALLBACK_CONTACT.bottomTitleLine1,
    bottomTitleLine2: page?.bottomTitleLine2 ?? FALLBACK_CONTACT.bottomTitleLine2,

    bottomLinkText: page?.bottomLinkText ?? FALLBACK_CONTACT.bottomLinkText,
    bottomLinkUrl: page?.bottomLinkUrl ?? FALLBACK_CONTACT.bottomLinkUrl,

    seo: page?.seo ?? FALLBACK_CONTACT.seo,
  }
}

export function mapPartnershipPage(page: PartnershipPage | null): PartnershipPage {
  return {
    _id: page?._id ?? FALLBACK_PARTNERSHIP._id,

    heroEyebrow: page?.heroEyebrow ?? FALLBACK_PARTNERSHIP.heroEyebrow,
    heroTitleLine1: page?.heroTitleLine1 ?? FALLBACK_PARTNERSHIP.heroTitleLine1,
    heroTitleAccent: page?.heroTitleAccent ?? FALLBACK_PARTNERSHIP.heroTitleAccent,
    heroDescription: page?.heroDescription ?? FALLBACK_PARTNERSHIP.heroDescription,
    heroImage: page?.heroImage ?? FALLBACK_PARTNERSHIP.heroImage,

    contentEyebrow: page?.contentEyebrow ?? FALLBACK_PARTNERSHIP.contentEyebrow,
    contentTitleLine1: page?.contentTitleLine1 ?? FALLBACK_PARTNERSHIP.contentTitleLine1,
    contentTitleLine2: page?.contentTitleLine2 ?? FALLBACK_PARTNERSHIP.contentTitleLine2,
    contentDescription: page?.contentDescription ?? FALLBACK_PARTNERSHIP.contentDescription,

    partnershipTypesEyebrow: page?.partnershipTypesEyebrow ?? FALLBACK_PARTNERSHIP.partnershipTypesEyebrow,
    partnershipTypes: page?.partnershipTypes ?? FALLBACK_PARTNERSHIP.partnershipTypes,

    nextStepsEyebrow: page?.nextStepsEyebrow ?? FALLBACK_PARTNERSHIP.nextStepsEyebrow,
    nextStepsDescription: page?.nextStepsDescription ?? FALLBACK_PARTNERSHIP.nextStepsDescription,

    formEyebrow: page?.formEyebrow ?? FALLBACK_PARTNERSHIP.formEyebrow,
    formTitleLine1: page?.formTitleLine1 ?? FALLBACK_PARTNERSHIP.formTitleLine1,
    formTitleLine2: page?.formTitleLine2 ?? FALLBACK_PARTNERSHIP.formTitleLine2,
    formDescription: page?.formDescription ?? FALLBACK_PARTNERSHIP.formDescription,

    closingEyebrow: page?.closingEyebrow ?? FALLBACK_PARTNERSHIP.closingEyebrow,
    closingTitleLine1: page?.closingTitleLine1 ?? FALLBACK_PARTNERSHIP.closingTitleLine1,
    closingTitleLine2: page?.closingTitleLine2 ?? FALLBACK_PARTNERSHIP.closingTitleLine2,

    seo: page?.seo ?? FALLBACK_PARTNERSHIP.seo,
  }
}

export function mapExportBuyerPage(page: ExportBuyerPage | null): ExportBuyerPage {
  return {
    _id: page?._id ?? FALLBACK_EXPORT_BUYER._id,

    heroEyebrow: page?.heroEyebrow ?? FALLBACK_EXPORT_BUYER.heroEyebrow,
    heroTitleLine1: page?.heroTitleLine1 ?? FALLBACK_EXPORT_BUYER.heroTitleLine1,
    heroTitleLine2: page?.heroTitleLine2 ?? FALLBACK_EXPORT_BUYER.heroTitleLine2,
    heroDescription: page?.heroDescription ?? FALLBACK_EXPORT_BUYER.heroDescription,
    heroImage: page?.heroImage ?? FALLBACK_EXPORT_BUYER.heroImage,


    sourceEyebrow: page?.sourceEyebrow ?? FALLBACK_EXPORT_BUYER.sourceEyebrow,
    sourceTitle: page?.sourceTitle ?? FALLBACK_EXPORT_BUYER.sourceTitle,
    sourceDescription: page?.sourceDescription ?? FALLBACK_EXPORT_BUYER.sourceDescription,

    buyerSteps: page?.buyerSteps ?? FALLBACK_EXPORT_BUYER.buyerSteps,

    availabilityTitle: page?.availabilityTitle ?? FALLBACK_EXPORT_BUYER.availabilityTitle,
    availabilityDescription: page?.availabilityDescription ?? FALLBACK_EXPORT_BUYER.availabilityDescription,

    bottomEyebrow: page?.bottomEyebrow ?? FALLBACK_EXPORT_BUYER.bottomEyebrow,
    bottomTitleLine1: page?.bottomTitleLine1 ?? FALLBACK_EXPORT_BUYER.bottomTitleLine1,
    bottomTitleLine2: page?.bottomTitleLine2 ?? FALLBACK_EXPORT_BUYER.bottomTitleLine2,

    seo: page?.seo ?? FALLBACK_EXPORT_BUYER.seo,
  }
}

export function mapRequestQuotePage(page: RequestQuotePage): RequestQuotePage {
  return {
    _id: page?._id ?? FALLBACK_REQUEST_QUOTE._id,

  heroEyebrow: page?.heroEyebrow ?? FALLBACK_REQUEST_QUOTE.heroEyebrow,
  heroTitle: page?.heroTitle ?? FALLBACK_REQUEST_QUOTE.heroTitle,
  heroTitleAccent: page?.heroTitleAccent ?? FALLBACK_REQUEST_QUOTE.heroTitleAccent,
  heroDescription: page?.heroDescription ?? FALLBACK_REQUEST_QUOTE.heroDescription,
  heroImage: page?.heroImage ??  FALLBACK_REQUEST_QUOTE.heroImage,

  sectionEyebrow: page?.sectionEyebrow ?? FALLBACK_REQUEST_QUOTE.sectionEyebrow,
  sectionTitle: page?.sectionTitle ?? FALLBACK_REQUEST_QUOTE.sectionTitle,
  sectionDescription: page?.sectionDescription ?? FALLBACK_REQUEST_QUOTE.sectionDescription,

  productInterestLabel:page?.productInterestLabel ?? FALLBACK_REQUEST_QUOTE.productInterestLabel,

  infoPoints: page?.infoPoints ?? FALLBACK_REQUEST_QUOTE.infoPoints,

  seo: page?.seo ?? FALLBACK_REQUEST_QUOTE.seo,
  }
}