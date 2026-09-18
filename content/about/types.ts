import { SeoData } from "@/sanity/lib/types";
import { SanityImageSource } from "@sanity/image-url";

export type AboutValue = {
  number?: string;
  title: string;
  text?: string;
};

export type AboutStat = {
  value: string;
  label: string;
};

export type SupplyChainStep = {
  _id: string;
  number: string;
  title: string;
  description: string;
};

export type StoryFact = {
  value: string;
  label: string;
};


export type StoryPrincipleProps = {
  number: string;
  title: string;
  description: string;
};

export type OurStorySectionProps = {
  eyebrow?: string;
  title?: string;
  paragraphs?: string[];
  facts?: StoryFact[];
  principles?: StoryPrincipleProps[];
};

export type AboutPageData = {
  _id: string;
  title: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;

  whoWeAreEyebrow?: string;
  whoWeAreTitle?: string;
  whoWeAreParagraphs?: string[];

  storyEyebrow?: string;
  storyTitle?: string;
  storyParagraphs?: string[];
  principles?: StoryPrincipleProps[];
  storyFacts?: StoryFact[];

  stats?: AboutStat[];

  foundationEyebrow?: string;
  foundationTitle?: string;
  values?: AboutValue[];

  missionEyebrow?: string;
  missionTitle?: string;
  missionDescription?: string;

  featuredLeader: TeamMember;

  seo: SeoData;
};


export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  department?: string;
  bio?: string;
  credentials?: string[];
  image?: SanityImageSource;
  linkedIn?: string;
  country?: string;
  isAdvisoryBoard?: boolean;
  quote?: string;
  order?: number;
}

export type AboutPageQueryResult = {
  page: AboutPageData | null;
  supplyChain: SupplyChainStep[];
};