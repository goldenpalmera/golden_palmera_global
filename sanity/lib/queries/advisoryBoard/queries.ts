import { defineQuery } from "next-sanity";

export const advisoryBoardPageQuery = defineQuery(`
  *[_type == "advisoryBoardPage"][0] {
    title,

    heroEyebrow,
    heroTitle,
    heroDescription,

    stats[] {
      value,
      label
    },

    members[] {
      _id,
      name,
      role,
      bio,
      image,
      country,
      specialization,
      credentials,
      "linkedIn": linkedin,
      active
    },

    philosophyEyebrow,
    philosophyTitle,
    philosophyParagraphs,

    cta {
      title,
      description,
      label,
      href
    }
  }
`);

export const advisoryBoardSEOQuery = defineQuery(`
  *[_type == "advisoryBoardPage"][0].seo {
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
