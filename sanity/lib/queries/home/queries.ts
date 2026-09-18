import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
{
  "page": *[_type == "homePage"][0] {
    hero {
      eyebrow,
      title,
      titleAccent,
      titleEnd,
      description,
      image {
        asset-> {
          _id,
          url
        },
        hotspot,
        crop
      }
    },

    intro {
      label,
      heading,
      headingAccent,
      largeCopy,
      body,
      linkText,
      linkHref,
      image {
        asset-> {
          _id,
          url
        },
        hotspot,
        crop
      }
    },

    quality {
      eyebrow,
      heading,
      subheading,

      tests[]->{
        _id,
        name
      },

      partners[]->{
        _id,
        name,
        role
      },

      documents[]->{
        _id,
        name,
        sub,
        description
      },

      sampleDocumentLabel,

      sampleDocument {
        asset -> {
          _id,
          url
        }
      }
    },

    contact {
      label,
      heading,
      headingAccent,
      description,
      email
    },

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
  },

  "commodities": *[
    _type == "product"
    && active == true
    && featured == true
  ]
  | order(order asc, name asc)[0...8] {
    _id,
    name,
    "slug": slug.current,
    botanicalName,
    shortDescription,
    featured,
    image {
      asset-> {
        _id,
        url
      },
      hotspot,
      crop
    }
  },

  "services": *[
    _type == "service"
    && active == true
    && featured == true
  ]
  | order(order asc, number asc)[0...4] {
    _id,
    number,
    title,
    shortDescription,
    "slug": slug.current
  },

  "approach": *[
    _type == "approach"
    && active == true
  ]
  | order(order asc) {
    _id,
    number,
    title,
    "slug": slug.current
  },

  "supplyChain": *[
    _type == "supplyChainStep"
    && active == true
  ]
  | order(order asc) {
    _id,
    number,
    title,
    description
  },

  "caseStudies": *[
    _type == "caseStudy"
    && active == true
  ]
  | order(order asc) {
    _id,
    title,
    country,
    volume,
    product,
    summary
  },

  "testimonials": *[
    _type == "testimonial"
    && active == true
  ]
  | order(order asc) {
    _id,
    quote,
    companyType,
    country,
    isNamed,
    name,
    title
  }
}
`);

export const HOME_PAGE_SEO_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    title,

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
