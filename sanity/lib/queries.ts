import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`
  *[
    _type == "product"
  ]
  | order(order asc, name asc) {
    _id,
    name,
    botanicalName,
    "slug": slug.current,
    shortDescription,
    image,
    origin,
    forms,
    packaging,
    applications,
    featured
  }
`);

export const PRODUCT_QUERY = defineQuery(`
  *[
    _type == "product" &&
    slug.current == $slug
  ][0] {
    _id,
    name,
    botanicalName,
    "slug": slug.current,
    shortDescription,
    description,
    image,
    gallery,
    origin,
    forms,
    packaging,
    applications,
    featured,
    seoTitle,
    seoDescription
  }
`);

export const POSTS_QUERY = defineQuery(`
  *[
    _type == "blogPost"
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    author,
    publishedAt,
    category,
    featured
  }
`);

export const POST_QUERY = defineQuery(`
  *[
    _type == "blogPost" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    author,
    publishedAt,
    category,
    body,
    seoTitle,
    seoDescription
  }
`);

export const blogPostsQuery = `
  *[
    _type == "blogPost"
    && defined(slug.current)
  ]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    author,
    category,
    tags,
    publishedAt,
    featured
  }
`;

export const featuredBlogPostsQuery = `
  *[
    _type == "blogPost"
    && featured == true
    && defined(slug.current)
  ]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    author,
    category,
    publishedAt
  }
`;

export const SERVICES_QUERY = defineQuery(`
  *[
    _type == "service"
  ]
  | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    description,
    image,
    featured
  }
`);