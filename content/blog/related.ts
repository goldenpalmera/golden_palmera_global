import {
  getRecentPosts,
  getRelatedPosts,
} from "./sanity";

import type {
  BlogPost,
  RelatedPost,
} from "./types";

const MAX_RELATED_POSTS = 3;

export async function getRelatedBlogPosts(
  article: Pick<BlogPost, "slug" | "category" | "tags">,
): Promise<RelatedPost[]> {
  const related = await getRelatedPosts(
    article.slug,
    article.category,
    article.tags ?? [],
  );

  const results: RelatedPost[] = [];
  const existingIds = new Set<string>();

  for (const post of related) {
    if (results.length >= MAX_RELATED_POSTS) {
      break;
    }

    if (existingIds.has(post._id)) {
      continue;
    }

    results.push(post);
    existingIds.add(post._id);
  }

  if (results.length >= MAX_RELATED_POSTS) {
    return results;
  }

  const recent = await getRecentPosts(article.slug);

  for (const post of recent) {
    if (results.length >= MAX_RELATED_POSTS) {
      break;
    }

    if (existingIds.has(post._id)) {
      continue;
    }

    results.push(post);
    existingIds.add(post._id);
  }

  return results;
}