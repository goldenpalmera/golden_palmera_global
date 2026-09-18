import { getSanityClient } from "@/sanity/lib/client";
import { 
  ABOUT_PAGE_QUERY,
  ABOUT_PAGE_SEO_QUERY
} from "@/sanity/lib/queries/about/queries";
import type { AboutPageData, AboutPageQueryResult } from "./types";

export async function getAboutPage(): Promise<AboutPageQueryResult> {
  const client = getSanityClient();

  return client.fetch<AboutPageQueryResult>(
    ABOUT_PAGE_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["about-page"],
      },
    }
  );
}

export async function getAboutPageSEO(): Promise<AboutPageData | null> {
  const client = getSanityClient();

  return client.fetch<AboutPageData | null>(
    ABOUT_PAGE_SEO_QUERY,
    {},
    {
      next: {
        revalidate: 60,
        tags: ["about-page-seo"],
      },
    }
  );
}
