import { getSanityClient } from "@/sanity/lib/client";

import {
  BLOG_POSTS_QUERY,
  BLOGS_SEO_QUERY,
  POST_QUERY,
  POST_SEO_QUERY,
  RELATED_BLOG_POSTS_QUERY,
  RECENT_BLOG_POSTS_QUERY,
} from "@/sanity/lib/queries/blog/queries";

import type {
  BlogPost,
  BlogPostSEO,
  BlogPostsResult,
  RelatedPost,
} from "./types";

import type { SeoData } from "@/sanity/lib/types";

const SANITY_OPTIONS = {
  next: {
    revalidate: 60,
  },
};

export const PAGE_SIZE = 9;

export async function getBlogPosts(
  page: number,
  search = "",
): Promise<BlogPostsResult> {
  const client = getSanityClient();

  const safePage = Number.isFinite(page) 
    ? Math.max(1, Math.floor(page))
    : 1;
  const start = (safePage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return client.fetch<BlogPostsResult>(
    BLOG_POSTS_QUERY,
    {
      start,
      end,
      search: search.trim(),
    },
    SANITY_OPTIONS,
  );
}

export async function getBlogsSEO(): Promise<SeoData | null> {
  try {
    const client = getSanityClient();

    return await client.fetch<SeoData | null>(
      BLOGS_SEO_QUERY,
      {},
      SANITY_OPTIONS,
    );
  } catch (error) {
    console.error("[Blogs SEO] Failed to fetch SEO:", error);

    return null;
  }
}

export async function getPost(
  slug: string,
): Promise<BlogPost | null> {
  if (!slug.trim()) {
    return null;
  }

  const client = getSanityClient();

  return client.fetch<BlogPost | null>(
    POST_QUERY,
    { slug: slug.trim() },
    SANITY_OPTIONS,
  );
}

export async function getPostSEO(
  slug: string,
): Promise<BlogPostSEO | null> {
  if (!slug.trim()) {
    return null;
  }

  try {
    const client = getSanityClient();

    return await client.fetch<BlogPostSEO | null>(
      POST_SEO_QUERY,
      { slug: slug.trim() },
      SANITY_OPTIONS,
    );
  } catch (error) {
    console.error("[Blog SEO] Failed to fetch SEO:", error);

    return null;
  }
}

export async function getRelatedPosts(
  slug: string,
  category?: string,
  tags: string[] = [],
): Promise<RelatedPost[]> {
  const client = getSanityClient();

  return client.fetch<RelatedPost[]>(
    RELATED_BLOG_POSTS_QUERY,
    {
      slug,
      category: category ?? null,
      tags,
    },
    SANITY_OPTIONS,
  );
}

export async function getRecentPosts(
  slug: string,
): Promise<RelatedPost[]> {
  const client = getSanityClient();

  return client.fetch<RelatedPost[]>(
    RECENT_BLOG_POSTS_QUERY,
    { slug },
    SANITY_OPTIONS,
  );
}