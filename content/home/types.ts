import { SanityImage } from "@/sanity/lib/types";
import {
  InspectionPartner,
  QualityDocument,
  QualityTest,
} from "../compliance/types";
import { SupplyChainStep } from "../about/types";
import  { Product } from "../products/types";

export type HomeHeroContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  titleEnd: string;
  description: string;
  image?: SanityImage;
};

export type HomeIntroContent = {
  label: string;
  heading: string;
  headingAccent: string;
  largeCopy: string;
  body: string;
  linkText: string;
  linkHref: string;
  image?: SanityImage;
};

export type HomeService = {
  _id: string;
  number?: string;
  title: string;
  category?: string;
  shortDescription?: string;
  slug?: string;
  coverImage?: SanityImage;
};

export type HomeApproach = {
  _id: string;
  number?: string;
  title: string;
  shortDescription?: string;
  slug?: string;
  coverImage?: SanityImage;
};

export type HomeCaseStudy = {
  id: string;
  title: string;
  country: string;
  volume: string;
  product: string;
  summary: string;
};

export type HomeTestimonial = {
  id: string;
  quote: string;
  companyType?: string;
  country?: string;
  isNamed?: boolean;
  name?: string;
  title?: string;
};

export type HomeContactContent = {
  label: string;
  heading: string;
  headingAccent: string;
  description: string;
  email: string;
};

export type HomeQualityContent = {
  eyebrow?: string;
  title?: string;
  description?: string;

  tests?: QualityTest[];
  partners: InspectionPartner[];
  documents: QualityDocument[];

  sampleDocumentLabel?: string;
  sampleDocumentUrl?: string;
};

export type HomePageContent = {
  _id: string;
  hero: HomeHeroContent;
  intro: HomeIntroContent;
  featuredProducts: Product[];
  supplyChain: SupplyChainStep[];
  featuredServices: HomeService[];
  featuredApproaches: HomeApproach[];
  featuredCaseStudies: HomeCaseStudy[];
  featuredTestimonials: HomeTestimonial[];
  quality?: HomeQualityContent;
  contact: HomeContactContent;
};

export type SanityHomeData = {
  commodities?: Array<{
    _id: string;
    name: string;
    slug?: string;
    botanicalName?: string;
    shortDescription?: string;
    image?: {
      asset?: {
        _id: string;
        url: string;
      };
      hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
      };
      crop?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
    };
    featured?: boolean;
  }>;

  services?: Array<{
    _id: string;
    number?: string;
    title: string;
    shortDescription?: string;
    slug?: string;
  }>;

  approach?: Array<{
    _id: string;
    number?: string;
    title: string;
    slug?: string;
    shortDescription?: string;
  }>;

  supplyChain?: Array<{
    _id: string;
    number?: string;
    title: string;
    description?: string;
  }>;

  qualityTests?: Array<{
    _id: string;
    name: string;
  }>;

  inspectionPartners?: Array<{
    _id: string;
    name: string;
    role?: string;
  }>;

  documents?: Array<{
    _id: string;
    name: string;
    sub?: string;
    description?: string;
  }>;

  caseStudies?: Array<{
    _id: string;
    title: string;
    country?: string;
    volume?: string;
    product?: string;
    summary?: string;
  }>;

  testimonials?: Array<{
    _id: string;
    quote: string;
    companyType?: string;
    country?: string;
    isNamed?: boolean;
    name?: string;
    title?: string;
  }>;
};