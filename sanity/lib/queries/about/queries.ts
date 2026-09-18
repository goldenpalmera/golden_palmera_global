import { defineQuery } from "next-sanity";

export const ABOUT_PAGE_QUERY = defineQuery(`
{
  "page": *[_type == "aboutPage"][0] {
    _id,
    title,

    heroEyebrow,
    heroTitle,
    heroDescription,

    whoWeAreEyebrow,
    whoWeAreTitle,
    whoWeAreParagraphs,

    storyEyebrow,
    storyTitle,
    storyParagraphs,

    storyFacts[] {
      value,
      label
    },

    stats[] {
      value,
      label
    },

    foundationEyebrow,
    foundationTitle,

    values[] {
      number,
      title,
      text
    },

    featuredLeader-> {
      _id,
      name,
      role,
      department,
      bio,
      credentials,
      image,
      linkedIn,
      quote,
      order,
      isAdvisoryBoard
    },

    missionEyebrow,
    missionTitle,
    missionDescription,
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
  }
}
`);

export const ABOUT_PAGE_SEO_QUERY = defineQuery(`
  *[_type == "aboutPage"][0].seo {
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


export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"]
    | order(order asc) {
      _id,
      name,
      role,
      department,
      bio,
      credentials,
      image,
      linkedIn,
      quote,
      order,
      isAdvisoryBoard
    }
`);

