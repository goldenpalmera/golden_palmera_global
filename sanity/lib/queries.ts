import { defineQuery } from "next-sanity";

export const FOOTER_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    companyName,
    companyTagline,
    footerDescription,
    cacNumber,
    copyrightYear,

    email,

    location {
      country,
      region
    },

    socialLinks[]{
      _key,
      platform,
      url,
      label
    },

    trustBadges,
    bottomMessage,

    "products": *[
      _type == "product"
      && active == true
      && defined(slug.current)
    ]
    | order(order asc, name asc) {
      _id,
      name,
      "slug": slug.current
    },

    "services": *[
      _type == "service"
      && active == true
      && defined(slug.current)
    ]
    | order(order asc, number asc) {
      _id,
      title,
      number,
      "slug": slug.current
    },

    "approaches": *[
      _type == "approach"
      && active == true
      && defined(slug.current)
    ]
    | order(order asc, number asc) {
      _id,
      title,
      number,
      "slug": slug.current
    }
  }
`);

export const FLOAT_BUTTONS_QUERY = defineQuery(`
  *[_type == "floatingButtons"][0]{
    enabled,

    whatsapp{
      enabled,
      number,
      message,
      label
    },

    phoneCall{
      enabled,
      calendlyUrl,
      label,
      title,
      description,
      fallbackLabel
    },

    toggleLabel,
    closeLabel
  }
`);
