import { defineQuery } from "next-sanity";

export const COMPLIANCE_PAGE_QUERY = defineQuery(`
  *[_type == "compliancePage"][0] {
    _id,
    title,

    hero {
      eyebrow,
      title,
      description
    },

    certificationsSection {
      eyebrow,
      title
    },

    certifications[]->{
      _id,
      name,
      shortName,
      description,
      status,

      logo {
        asset -> {
          url
        }
      },

      certificateFile {
        asset -> {
          url
        }
      },

      verifyUrl
    },

    qualitySection {
      eyebrow,
      title,
      description,

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
        description
      },
      "sampleDocumentUrl": sampleDocumentUrl.asset->url,
      sampleDocumentLable
    },

    eudrSection {
      eyebrow,
      title,
      description,

      stats[] {
        _key,
        value,
        label
      },

      roadmapTitle
    },

    milestones[]->{
      _id,
      year,
      quarter,
      title,
      description,
      status
    },

    dossierSection {
      title,
      description,
      downloadLabel,

      downloadFile {
        asset -> {
          url
        }
      },

      contactLabel
    },

    commitment {
      eyebrow,
      title,
      text
    },
  }
`);

export const COMPLIANCE_PAGE_SEO_QUERY = defineQuery(`
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