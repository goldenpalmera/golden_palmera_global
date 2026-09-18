import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

import type { SeoData } from "@/sanity/lib/types";

export type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
    q?: string;
  }>;
};

export type BlogParams = {
  slug: string;
};

export type BlogPostAuthor = {
  _id?: string;
  name?: string;
  role?: string;
  bio?: string;
  image?: SanityImageSource;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImageSource;

  author?: BlogPostAuthor;

  publishedAt?: string;
  category?: string;
  tags?: string[];
  body?: PortableTextBlock[];
  featured?: boolean;
};

export type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
  category?: string;
  publishedAt?: string;
};

export type BlogPostsResult = {
  posts: BlogPost[];
  total: number;
};

export type BlogPostSEO = {
  title: string;
  slug: string;
  seo?: SeoData;
};
