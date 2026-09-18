import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`
  *[
    _type == "product"
    && active == true
  ]
  | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    botanicalName,
    category,
    shortDescription,

    image {
      asset-> {
        _id,
        url
      },
      hotspot,
      crop
    },

    origin,
    forms,
    packaging,
    applications,
    featured
  }
`);

export const PRODUCT_QUERY = defineQuery(`
  *[
    _type == "product"
    && slug.current == $slug
    && active == true
  ][0] {
    _id,
    name,
    "slug": slug.current,
    botanicalName,
    category,
    shortDescription,
    description,

    image {
      asset-> {
        _id,
        url
      },
      hotspot,
      crop
    },

    gallery[] {
      asset-> {
        _id,
        url
      },
      hotspot,
      crop
    },

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

export const PRODUCT_SEO_QUERY = defineQuery(`
  *[
    _type == "product"
    && slug.current == $slug
    && active == true
  ][0] {
    seo {
      metaTitle,
      metaDescription,
      keywords,
      noIndex,
      canonicalUrl,

      ogImage {
        asset-> {
          _id,
          url
        },
        hotspot,
        crop
      }
    }
  }
`);


export const PRODUCTS_PAGE_QUERY = defineQuery(`
  *[_type == "productsPage"][0] {
    title,

    heroEyebrow,
    heroTitle,
    heroDescription,

    portfolioEyebrow,
    portfolioTitle,
    portfolioDescription,

    supplyChain {
      eyebrow,
      title,
      description,

      steps[] {
        number,
        title,
        description
      }
    },

    cta {
      title,
      description,
      label,

      link {
        type,
        internalPath,
        externalUrl,
        newTab
      }
    }
  }
`);

export const PRODUCTS_PAGE_SEO_QUERY = defineQuery(`
  *[_type == "productsPage"][0] {
    seo {
      metaTitle,
      metaDescription,
      keywords,
      noIndex,
      canonicalUrl,

      ogImage {
        asset-> {
          _id,
          url
        },
        hotspot,
        crop
      }
    }
  }
`);
