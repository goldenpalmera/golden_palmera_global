import { getSanityClient } from "@/sanity/lib/client";
import { TEAM_MEMBERS_QUERY } from "@/sanity/lib/queries/about/queries";
import type { TeamMember } from "./types";

export async function getTeamMembers(): Promise<TeamMember[]> {
  const client = getSanityClient();

  return client.fetch<TeamMember[]>(
    TEAM_MEMBERS_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["team-members"],
      },
    }
  );
}
