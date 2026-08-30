import { PortableTextBlock } from "next-sanity";

export type ComplianceArea = {
  number: string;
  title: string;
  text: string;
};

export type CompliancePageData = {
  _id: string;
  title: string;
  heroEyebrow?: string;
  heroTitle: string;
  heroDescription: string;
  complianceAreas: ComplianceArea[];
  commitmentEyebrow?: string;
  commitmentTitle: string;
  commitmentDescription: string;
};

export type BoardMember = {
  name: string;
  role: string;
  description: string;
  linkedin?: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
};

export type AdvisoryBoardPageData = {
  _id: string;
  title: string;
  heroEyebrow?: string;
  heroTitle: string;
  heroDescription: string;
  members: BoardMember[];
  philosophyEyebrow?: string;
  philosophyTitle: string;
  philosophyParagraphs: string[];
};

export type Commodity = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  scientific?: string;
  description: string;
  symbol?: string;
  order: number;
  image?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
};

// type HomeProduct = {
//   _id: string;
//   name: string;
//   slug: string;
//   scientificName?: string;
//   description: string;
//   symbol?: string;
//   image?: unknown;
// };

export type HomeService = {
  _id: string;
  title: string;
  slug: string;
  number: string;
  shortDescription?: string;
};

export type Approach = {
  _id: string;
  title: string;
  slug: string;
  number: string;
  shortDescription?: string;
};

// sanity/lib/types.ts

export type SeoData = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  noIndex?: boolean;
  canonicalUrl?: string;
  ogImage?: {
    asset?: {
      url?: string;
    };
  };
};

export type HomePageData = {
  title?: string;
  seo?: SeoData;
};

export type AboutPageData = {
  title?: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;

  whoWeAreEyebrow?: string;
  whoWeAreTitle?: string;
  whoWeAreParagraphs?: string[];

  foundationEyebrow?: string;
  foundationTitle?: string;

  values?: {
    number?: string;
    title?: string;
    text?: string;
  }[];

  missionEyebrow?: string;
  missionTitle?: string;
  missionDescription?: string;

  seo?: SeoData;
};

export type ProductsSeoData = {
  title?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  portfolioEyebrow?: string;
  portfolioTitle?: string;
  portfolioDescription?: string;
  seo?: SeoData;
};

export type ServicesSeoData = {
  title?: string;
  heroTitle?: string;
  heroEyebrow?: string;
  intro?: string;
  seo?: SeoData;
}

export const inquiryStatuses = [
  "NEW",
  "IN_PROGRESS",
  "CONTACTED",
  "RESOLVED",
  "REJECTED",
] as const;

export type InquiryStatus =
  (typeof inquiryStatuses)[number];

export const emailStatuses = [
  "pending",
  "sent",
  "failed",
] as const;

export type EmailStatus =
  (typeof emailStatuses)[number];

export type Inquiry = {
  _id: string;

  reference: string;

  type: string;

  status: InquiryStatus;

  name: string;

  email: string;

  phone?: string;

  company?: string;

  country?: string;

  product?: string;

  quantity?: string;

  packaging?: string;

  destination?: string;

  message?: string;

  emailStatus?: EmailStatus;

  submittedAt: string;

  lastEmailAttemptAt?: string;

  statusHistory?: {
    _key: string;
    status: InquiryStatus;
    changedAt: string;
    changedBy?: string;
  }[];
};

export type ApproachPage = {
  title: string;
  slug: string;
  number: string;
  shortDescription?: string;
  description?: PortableTextBlock[];
  seo?: SeoData
};
