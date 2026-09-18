import { getSanityClient } from "@/sanity/lib/client";
import { 
  advisoryBoardPageQuery,
  advisoryBoardSEOQuery,
} from "@/sanity/lib/queries/advisoryBoard/queries";
import type {
  AdvisoryBoardPageData,
  BoardMember,
} from "./types";

export async function getAdvisoryBoardPage(): Promise<AdvisoryBoardPageData> {
  const client = getSanityClient();

  const page = await client.fetch<AdvisoryBoardPageData>(
    advisoryBoardPageQuery
  );

  return page;
}

export async function getAdvisoryBoardSeo(): Promise<AdvisoryBoardPageData> {
  try {
    const client = getSanityClient();

    const result = await client.fetch<AdvisoryBoardPageData | null>(
      advisoryBoardSEOQuery
    );

    return result ?? {};
  } catch (error) {
    console.error(
      "[AdvisoryBoard] Failed to fetch SEO:",
      error
    );
    return {};
  }
}

export function getActiveMembers(
  members: BoardMember[] = []
): BoardMember[] {
  return members.filter((member) => member.active !== false);
}
