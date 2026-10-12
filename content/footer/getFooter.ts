import { FOOTER_QUERY } from "@/sanity/lib/queries";
import { getSanityClient } from "@/sanity/lib/client";
import { FooterResponse } from "./types";

export async function getFooter(): Promise<FooterResponse> {
  const client = getSanityClient();

  return await client.fetch<FooterResponse>(
    FOOTER_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["site-settings"],
      },
    }
  );
}