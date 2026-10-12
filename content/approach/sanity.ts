import { getSanityClient } from "@/sanity/lib/client";

import {
  allApproachesQuery,
  approachBySlugQuerySEO,
  approachBySlugQuery,
} from "@/sanity/lib/queries/approaches/queries";

import type {
  ApproachSeoData,
  ApproachPage,
} from "./types";

export async function getApproaches(): Promise<ApproachPage[]> {
  const client = getSanityClient();

  return client.fetch<ApproachPage[]>(
    allApproachesQuery
  );
}

export async function getApproach(
  slug: string
): Promise<ApproachPage | null> {
  const client = getSanityClient();

  return client.fetch<ApproachPage | null>(
    approachBySlugQuery,
    { slug }
  );
}

export async function getApproachSEO(
  slug: string
): Promise<ApproachSeoData | null> {
  try {
    const client = getSanityClient();

    return await client.fetch<ApproachSeoData | null>(
      approachBySlugQuerySEO,
      { slug }
    );
  } catch (error) {
    console.error(
      "[Approach] Failed to fetch SEO:",
      error
    );

    return null;
  }
}
