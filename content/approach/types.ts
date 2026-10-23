import type { SeoData } from "@/sanity/lib/types";
import { PortableTextBlock } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url";

export type Props = {
  params: Promise<{slug: string}>;
};


export type ApproachSeoData = {
  title: string;
  slug: string;
  seo?: SeoData;
};

export type ApproachPage = {
  title: string;
  slug: string;
  number: string;
  shortDescription?: string;
  description?: PortableTextBlock[];
  coverImage?: SanityImageSource | null;
  seo?: SeoData
};