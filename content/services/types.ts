import { SanityImage, SeoData } from "@/sanity/lib/types";
import { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

export type ServicesPageSEO = {
  _id: string;
  title?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  intro?: string;

  seo?: SeoData;
};


export type Service = {
  _id: string;
  title: string;
  number: string;
  category: string;
  slug: string;
  shortDescription?: string;
  description?: PortableTextBlock[];
  items?: string[];
  coverImage?: SanityImage;
  featured?: boolean;
  order?: number;
  active?: boolean;
  seo?: SeoData;
};

export type ServicePageData = {
  _id: string;
  title: string;
  slug: string;
  number?: string;
  category?: string;
  shortDescription?: string;
  description?: PortableTextBlock[];
  heroImages?: Array<
    SanityImageSource & {
      alt?: string;
    }
  >;
  coverImage?: {
    asset?: {
      url?: string;
    };
  };
  seo?: SeoData;
};

export type ServicesPageData = {
  heroEyebrow?: string;
  heroTitle1?: string;
  heroTitle2?: string;
  heroTitle3?: string;
  heroDescription?: string;
  heroImages?: Array<
    SanityImageSource & {
      alt?: string;
    }
  >;
  servicesIntroEyebrow?: string;
  servicesIntroDescription: string;
  seo?: SeoData;
};

