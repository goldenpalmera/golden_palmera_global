import { PageCTA, SeoData } from "@/sanity/lib/types";

export type BoardMember = {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  image?: unknown;
  country?: string;
  specialisation?: string;
  credentials?: string[];
  linkedIn?: string;
  active?: boolean;
};

export type AdvisoryBoardStat = {
  value: string;
  label: string;
};


/**
 * Application/content model.
 *
 * This is what the React page consumes.
 * It should already contain fallback values.
 */
export type AdvisoryBoardPageData = {
  title?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  stats?: AdvisoryBoardStat[];
  members?: BoardMember[];
  philosophyEyebrow?: string;
  philosophyTitle?: string;
  philosophyParagraphs?: string[];
  cta?: PageCTA;
  seo?: SeoData;
};


/**
 * Raw Sanity response for page content.
 *
 * Everything is optional because the editor may leave
 * fields empty or the document may not exist.
 */
export type AdvisoryBoardResponse = {
  title?: string;

  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;

  stats?: AdvisoryBoardStat[];

  members?: BoardMember[];

  philosophyEyebrow?: string;
  philosophyTitle?: string;
  philosophyParagraphs?: string[];

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
};
