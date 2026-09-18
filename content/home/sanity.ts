import type {
  HomeService,
  HomeApproach,
  HomeCaseStudy,
  HomeTestimonial,
} from "./types";

type SanityHomeData = {
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


export function mapSanityHomeContent(
  data: SanityHomeData
) {

  const services: HomeService[] =
    data.services?.map((item) => ({
      id: item._id,
      number: item.number ?? "",
      title: item.title,
      description: item.shortDescription ?? "",
      href: item.slug
        ? `/services/${item.slug}`
        : "/services",
    })) ?? [];

  const approach: HomeApproach[] =
    data.approach?.map((item) => ({
      id: item._id,
      number: item.number ?? "",
      title: item.title,
      href: item.slug
        ? `/approach/${item.slug}`
        : "/approach",
    })) ?? [];

  const caseStudies: HomeCaseStudy[] =
    data.caseStudies?.map((item) => ({
      id: item._id,
      title: item.title,
      country: item.country ?? "",
      volume: item.volume ?? "",
      product: item.product ?? "",
      summary: item.summary ?? "",
    })) ?? [];

  const testimonials: HomeTestimonial[] =
    data.testimonials?.map((item) => ({
      id: item._id,
      quote: item.quote,
      companyType: item.companyType,
      country: item.country,
      isNamed: item.isNamed,
      name: item.name,
      title: item.title,
    })) ?? [];

  return {
    services,
    approach,
    caseStudies,
    testimonials,
  };
}
