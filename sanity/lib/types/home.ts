import { SanityImage } from "../types";

export type SanityHomeCta = {
  label?: string;
  href?: string;
};

export type SanityHomeData = {
  page?: {
    hero?: {
      eyebrow?: string;
      headline?: string;
      highlight?: string;
      description?: string;
      image?: SanityImage;
      primaryCta?: SanityHomeCta;
      secondaryCta?: SanityHomeCta;
    };

    intro?: {
      eyebrow?: string;
      title?: string;
      description?: string;
      ctaLabel?: string;
      ctaHref?: string;
    };

    commoditiesSection?: {
      eyebrow?: string;
      title?: string;
      description?: string;
      ctaLabel?: string;
      ctaHref?: string;
    };

    servicesSection?: {
      eyebrow?: string;
      title?: string;
      description?: string;
      ctaLabel?: string;
      ctaHref?: string;
    };

    approachSection?: {
      eyebrow?: string;
      title?: string;
      description?: string;
    };

    supplyChainSection?: {
      eyebrow?: string;
      title?: string;
      description?: string;
    };

    qualitySection?: {
      eyebrow?: string;
      title?: string;
      description?: string;
    };

    caseStudiesSection?: {
      eyebrow?: string;
      title?: string;
      description?: string;
    };

    testimonialsSection?: {
      eyebrow?: string;
      title?: string;
      description?: string;
    };

    contact?: {
      eyebrow?: string;
      title?: string;
      description?: string;
      ctaLabel?: string;
      ctaHref?: string;
    };

    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string[];
      noIndex?: boolean;
      canonicalUrl?: string;
      ogImage?: SanityImage;
    };
  };

  commodities?: Array<{
    _id: string;
    name?: string;
    slug?: string;
    scientificName?: string;
    shortDescription?: string;
    featured?: boolean;
    image?: SanityImage;
  }>;

  services?: Array<{
    _id: string;
    number?: string;
    title?: string;
    shortDescription?: string;
    slug?: string;
  }>;

  approach?: Array<{
    _id: string;
    number?: string;
    title?: string;
    slug?: string;
  }>;

  supplyChain?: Array<{
    _id: string;
    number?: string;
    title?: string;
    description?: string;
  }>;

  qualityTests?: Array<{
    _id: string;
    name?: string;
  }>;

  inspectionPartners?: Array<{
    _id: string;
    name?: string;
    role?: string;
  }>;

  documents?: Array<{
    _id: string;
    name?: string;
    sub?: string;
    description?: string;
  }>;

  caseStudies?: Array<{
    _id: string;
    title?: string;
    country?: string;
    volume?: string;
    product?: string;
    summary?: string;
  }>;

  testimonials?: Array<{
    _id: string;
    quote?: string;
    companyType?: string;
    country?: string;
    isNamed?: boolean;
    name?: string;
    title?: string;
  }>;
};
