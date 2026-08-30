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
    category,
    shortDescription,
    description,
    image,
    gallery,
    origin,
    processing,
    grade,
    minimumOrder,
    availability,
    certifications,
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
  | order(order asc, number asc) {
    _id,
    title,
    number,
    category,
    "slug": slug.current,
    description,
    items,
    image,
    featured,
    order
  }
`);

export const RELATED_PRODUCTS_QUERY = defineQuery(`
  *[
    _type == "product" &&
    defined(slug.current) &&
    slug.current != $slug
  ]
  | order(featured desc, order asc, name asc)[0...4] {
    _id,
    name,
    botanicalName,
    "slug": slug.current,
    shortDescription,
    image,
    featured
  }
`);