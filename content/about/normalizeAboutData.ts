import type { TeamMember } from "./types";

import {
  FALLBACK_LEADERSHIP,
  FALLBACK_STORY_FACTS,
  FALLBACK_STORY_PARAGRAPHS,
  FALLBACK_STORY_PRINCIPLES,
  FALLBACK_SUPPLY_CHAIN,
} from "./fallbacks";

type AboutPage = {
  storyEyebrow?: string | null;
  storyTitle?: string | null;
  storyParagraphs?: string[] | null;

  storyFacts?: {
    value: string;
    label: string;
  }[] | null;

  storyPrinciples?: {
    number: string;
    title: string;
    description: string;
  }[] | null;
};

export function normalizeOurStory(
  page?: AboutPage | null
) {
  return {
    eyebrow:
      page?.storyEyebrow?.trim() ||
      "Our Story",

    title:
      page?.storyTitle?.trim() ||
      "Built to close the trust gap in African agribusiness.",

    paragraphs:
      page?.storyParagraphs?.length
        ? page.storyParagraphs
        : FALLBACK_STORY_PARAGRAPHS,

    facts:
      page?.storyFacts?.length
        ? page.storyFacts
        : FALLBACK_STORY_FACTS,

    principles:
      page?.storyPrinciples?.length
        ? page.storyPrinciples
        : FALLBACK_STORY_PRINCIPLES,
  };
}

export function normalizeLeadership(
  members?: TeamMember[] | null
): TeamMember[] {
  const leadership =
    members?.filter(
      (member) => !member.isAdvisoryBoard
    ) ?? [];

  return leadership.length
    ? leadership
    : FALLBACK_LEADERSHIP;
}

export function getFeaturedLeader(
  cmsFeaturedLeader: TeamMember | null | undefined,
  team: TeamMember[]
): TeamMember | null {
  if (
    cmsFeaturedLeader &&
    cmsFeaturedLeader.quote?.trim()
  ) {
    return cmsFeaturedLeader;
  }

  return (
    team.find(
      (member) => member.quote?.trim()
    ) ?? null
  );
}

export function normalizeSupplyChain(
  supplyChain?: typeof FALLBACK_SUPPLY_CHAIN | null
) {
  return supplyChain?.length
    ? supplyChain
    : FALLBACK_SUPPLY_CHAIN;
}