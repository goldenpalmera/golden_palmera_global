import { SanityImage, SeoData } from "@/sanity/lib/types";
import { PortableTextBlock } from "next-sanity";

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
};

export type ServicePageData = {
  _id: string;
  title: string;
  slug: string;
  number?: string;
  category?: string;
  shortDescription?: string;
  description?: PortableTextBlock[];
  coverImage?: {
    asset?: {
      url?: string;
    };
  };
  seo?: SeoData;
};

export type ServicesPageData = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  intro?: string;
  seo?: SeoData;
};

