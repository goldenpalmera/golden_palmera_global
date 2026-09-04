import type { MetadataRoute } from "next";
import { getSanityClient } from "@/sanity/lib/client";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://goldenpalmeraglobal.com";

type SitemapPost = {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = getSanityClient();
  
  const posts = await client.fetch<SitemapPost[]>(
    `*[
      _type == "post" &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now()
    ] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt,
      "updatedAt": _updatedAt
    }`,
    {},
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advisory-board`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/compliance`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}