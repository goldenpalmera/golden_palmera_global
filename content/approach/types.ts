import type { SeoData } from "@/sanity/lib/types";
import { PortableTextBlock } from "next-sanity";

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
  seo?: SeoData
};