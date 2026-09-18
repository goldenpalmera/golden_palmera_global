import { defineQuery } from "next-sanity";

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
