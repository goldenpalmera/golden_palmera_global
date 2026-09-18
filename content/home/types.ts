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
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
};

export type HomeApproach = {
  id: string;
  number: string;
  title: string;
  href: string;
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

export type HomePageContent = {
  hero: HomeHeroContent;
  intro: HomeIntroContent;
  quality: {
    eyebrow?: string;
    title?: string;
    description?: string;
    sampleDocumentLabel?: string;
    sampleDocumentUrl?: string;
  };
  commodities: Product[];
  services: HomeService[];
  approach: HomeApproach[];
  supplyChain: SupplyChainStep[];
  qualityTests: QualityTest[];
  inspectionPartners: InspectionPartner[];
  documents: QualityDocument[];
  caseStudies: HomeCaseStudy[];
  testimonials: HomeTestimonial[];
  contact: HomeContactContent;
};
