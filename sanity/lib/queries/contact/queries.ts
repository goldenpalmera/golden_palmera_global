import { defineQuery } from "next-sanity";

export const EXPORT_BUYER_PAGE_QUERY = defineQuery(`
  *[
    _type == "exportBuyerPage"
  ][0] {
    _id,

    heroEyebrow,
    heroTitleLine1,
    heroTitleLine2,
    heroDescription,
    heroImage,

    sourceEyebrow,
    sourceTitle,
    sourceDescription,

    buyerSteps[] {
      number,
      title,
      text
    },

    availabilityTitle,
    availabilityDescription,

    bottomEyebrow,
    bottomTitleLine1,
    bottomTitleLine2,

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

export const PARTNERSHIP_PAGE_QUERY = defineQuery(`
  *[
    _type == "partnershipPage"
  ][0] {
    _id,

    heroEyebrow,
    heroTitleLine1,
    heroTitleAccent,
    heroDescription,
    heroImage,

    contentEyebrow,
    contentTitleLine1,
    contentTitleLine2,
    contentDescription,

    partnershipTypesEyebrow,
    partnershipTypes[],

    nextStepsEyebrow,
    nextStepsDescription,

    formEyebrow,
    formTitleLine1,
    formTitleLine2,
    formDescription,

    closingEyebrow,
    closingTitleLine1,
    closingTitleLine2,

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

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[
    _type == "contactPage"
  ][0] {
    _id,

    heroEyebrow,
    heroTitleLine1,
    heroTitleLine2,
    heroImage,

    contactInfoEyebrow,

    emailLabel,
    email,

    locationLabel,
    location,
    region,

    businessLabel,
    businessDescription,

    bottomEyebrow,
    bottomTitleLine1,
    bottomTitleLine2,
    bottomLinkText,
    bottomLinkUrl,

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

export const REQUEST_QUOTE_PAGE_QUERY = defineQuery(`
  *[
    _type == "requestQuotePage"
  ][0] {
    _id,

    heroEyebrow,
    heroTitle,
    heroTitleAccent,
    heroDescription,
    heroImage,

    sectionEyebrow,
    sectionTitle,
    sectionDescription,

    productInterestLabel,

    infoPoints[] {
      title,
      text
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