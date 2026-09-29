import { defineQuery } from "next-sanity";

export const allApproachesQuery = defineQuery(`
  *[
    _type == "approach"
    && active == true
  ] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    number,
    shortDescription,
    description,
    coverImage,
    order,
    seo
  }
`);

export const approachBySlugQuery = defineQuery(`
  *[
    _type == "approach"
    && slug.current == $slug
    && active == true
  ][0] {
    _id,
    title,
    "slug": slug.current,
    number,
    shortDescription,
    description,
    coverImage,
    order,
    seo
  }
`);

export const approachBySlugQuerySEO = defineQuery(`
  *[
    _type == "approach"
    && slug.current == $slug
    && active == true
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
