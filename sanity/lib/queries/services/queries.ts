import { defineQuery } from "next-sanity";

export const SERVICES_QUERY = defineQuery(`
  *[
    _type == "service"
    && active == true
  ]
  | order(order asc, number asc) {
    _id,
    title,
    number,
    category,
    "slug": slug.current,
    shortDescription,
    items,
    description,
    coverImage {
      asset-> {
        _id,
        url
      },
      hotspot,
      crop
    },
    featured,
    active,
    order
  }
`);

export const SERVICE_QUERY = defineQuery(`
  *[
    _type == "service"
    && slug.current == $slug
    && active == true
  ][0] {
    _id,
    title,
    number,
    category,
    "slug": slug.current,
    shortDescription,
    description,
    items,
    image {
      asset-> {
        _id,
        url
      },
      hotspot,
      crop
    },
    featured,
    order,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      noIndex,
      canonicalUrl,
      ogImage {
        asset-> {
          url
        }
      }
    }
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_type == "servicesPage"][0] {
    title,
    heroEyebrow,
    heroTitle,
    heroDescription,
    intro,

    seo {
      metaTitle,
      metaDescription,
      keywords,
      noIndex,
      canonicalUrl,
      ogImage {
        asset-> {
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

export const SERVICE_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "service"
    && slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    number,
    category,
    shortDescription,
    description,

    coverImage {
      asset->{
        url
      }
    },

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
