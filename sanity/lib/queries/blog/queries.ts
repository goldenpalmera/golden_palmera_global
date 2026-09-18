import { defineQuery } from "next-sanity";

/**
 * Published blog posts with pagination and optional search.
 */
export const BLOG_POSTS_QUERY = defineQuery(`
  {
    "posts": *[
      _type == "post"
      && defined(slug.current)
      && defined(publishedAt)
      && publishedAt <= now()
      && (
        !defined($search)
        || $search == ""
        || title match $search
        || excerpt match $search
        || category match $search
        || $search in tags
      )
    ]
    | order(publishedAt desc)
    [$start...$end] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      publishedAt,
      featured
    },

    "total": count(*[
      _type == "post"
      && defined(slug.current)
      && defined(publishedAt)
      && publishedAt <= now()
      && (
        !defined($search)
        || $search == ""
        || title match $search
        || excerpt match $search
        || category match $search
        || $search in tags
      )
    ])
  }
`);

/**
 * Blog listing page SEO.
 */
export const BLOGS_SEO_QUERY = defineQuery(`
  *[
    _type == "blogPage"
  ][0].seo {
    metaTitle,
    metaDescription,
    keywords,
    noIndex,
    canonicalUrl,

    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
      hotspot,
      crop
    }
  }
`);

/**
 * Single published blog post.
 */
export const POST_QUERY = defineQuery(`
  *[
    _type == "post"
    && slug.current == $slug
    && defined(publishedAt)
    && publishedAt <= now()
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,

    author->{
      _id,
      name,
      role,
      bio,
      image
    },

    publishedAt,
    category,
    tags,
    body,
    featured
  }
`);

/**
 * Single post SEO.
 */
export const POST_SEO_QUERY = defineQuery(`
  *[
    _type == "post"
    && slug.current == $slug
    && defined(publishedAt)
    && publishedAt <= now()
  ][0] {
    title,
    "slug": slug.current,

    seo {
      metaTitle,
      metaDescription,
      keywords,
      noIndex,
      canonicalUrl,

      ogImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        hotspot,
        crop
      }
    }
  }
`);

/**
 * Related posts.
 *
 * Priority:
 * 1. Same category
 * 2. Matching tags
 * 3. Newest publication date
 */
export const RELATED_BLOG_POSTS_QUERY = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
    && defined(publishedAt)
    && publishedAt <= now()
    && slug.current != $slug
    && (
      category == $category
      || count(tags[@ in $tags]) > 0
    )
  ]
  | order(
      select(
        category == $category => 0,
        1
      ) asc,
      publishedAt desc
    )
  [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    publishedAt
  }
`);

/**
 * Recent posts fallback.
 */
export const RECENT_BLOG_POSTS_QUERY = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
    && defined(publishedAt)
    && publishedAt <= now()
    && slug.current != $slug
  ]
  | order(publishedAt desc)
  [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    publishedAt
  }
`);
