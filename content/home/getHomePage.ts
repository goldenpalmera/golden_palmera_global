import { getSanityClient } from "@/sanity/lib/client";
import { HOME_PAGE_SEO_QUERY } from "@/sanity/lib/queries/home/queries";
import { SeoData } from "@/sanity/lib/types";

export async function getHomePageSEO(): Promise<SeoData> {
  try {
		const client = getSanityClient();

  	const result = await client.fetch<SeoData | null>(
		HOME_PAGE_SEO_QUERY,
  );

	return result ?? {};
	} catch (error) {
		console.error(
			"[HomePage] Failed to fetch SEO:",
			error
		);
		return {};
	}
}