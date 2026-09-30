import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    _id,

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
      title,
      description,

      tests[]-> {
        _id,
        name
      },

      partners[]-> {
        _id,
        name,
        role
      },

      documents[]-> {
        _id,
        name,
        description,
        "fileUrl": file.asset->url
      },

      sampleDocumentLabel,
      "sampleDocumentUrl": sampleDocument.asset->url
    },

    contact {
      label,
      heading,
      headingAccent,
      description,
      email
    },

    featuredProducts[]-> {
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
      }
    },

    featuredServices[]-> {
      _id,
      title,
      number,
      category,
      "slug": slug.current,
      shortDescription,

      coverImage {
        asset-> {
          _id,
          url
        },
        hotspot,
        crop
      }
    },

    featuredApproaches[]-> {
      _id,
      title,
      number,
      "slug": slug.current,
      shortDescription,

      coverImage {
        asset-> {
          _id,
          url
        },
        hotspot,
        crop
      }
    },

    featuredCaseStudies[]-> {
      _id,
      title,
      country,
      volume,
      product,
      summary
    },

    featuredTestimonials[]-> {
      _id,
      quote,
      companyType,
      country,
      isNamed,
      name,
      title
    },
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
