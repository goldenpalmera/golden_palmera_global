import { SanityImage, SeoData } from "@/sanity/lib/types";
import { PortableTextBlock } from "next-sanity";
import { PageCTA } from "@/sanity/lib/types";

export type Product = {
  _id: string;
  name: string;
  slug: string;
  botanicalName?: string;
  category?: string;
  shortDescription?: string;
  description?: PortableTextBlock;

  image?: SanityImage;
  gallery?: SanityImage[];

  origin?: string;
  processing?: string;
  grade?: string;
  minimumOrder?: string;
  availability?: string;

  certifications?: string[];
  forms?: string[];
  packaging?: string[];
  applications?: string[];

  featured?: boolean;

  seo?: SeoData;
};

export type RelatedProduct = {
  _id: string;
  name: string;
  botanicalName?: string;
  slug?: string;
  shortDescription?: string;
  image?: SanityImage;
  featured?: boolean;
};

export type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export type ProductsPage = {
  title: string;

  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };

  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
  };

  supplyChain: {
    eyebrow: string;
    title: string;
    description: string;

    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };

  cta: PageCTA;
};

export type ProductsSeoData = {
  title?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  portfolioEyebrow?: string;
  portfolioTitle?: string;
  portfolioDescription?: string;
  supplyChain?: {
    eyebrow?: string,
    title?: string
    description?: string
    steps?: {
      number?: string,
      title?: string,
      description?: string,
    } [];
  };
  cta?: {
		title?: string;
		description?: string;
		label?: string;
		link?: {
			type?: "internal" | "external";
			internalPath?: string;
			externalUrl?: string;
			newTab?: boolean;
		};
	};
  seo: SeoData;
};