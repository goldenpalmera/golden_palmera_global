import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`
  *[
    _type == "product"
  ]
  | order(order asc, name asc) {
    _id,
    name,
    botanicalName,
    "slug": slug.current,
    shortDescription,
    image,
    origin,
    forms,
    packaging,
    applications,
    featured
  }
`);

export const PRODUCT_QUERY = defineQuery(`
  *[
    _type == "product" &&
    slug.current == $slug
  ][0] {
    _id,
    name,
    botanicalName,
    "slug": slug.current,
    category,
    shortDescription,
    description,
    image,
    gallery,
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
    seoTitle,
    seoDescription
  }
`);

export const PRODUCTS_SEO_QUERY = `
  *[_type == "productsPage"][0]{
    title,
    heroEyebrow,
    heroTitle,
    heroDescription,
    portfolioEyebrow,
    portfolioTitle,
    portfolioDescription,

    seo{
      metaTitle,
      metaDescription,
      keywords,
      noIndex,
      ogImage{
        asset->{
          url
        }
      }
    }
  }
`;

export const POSTS_QUERY = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
    && defined(publishedAt)
    && publishedAt <= now()
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,

    author->{
      _id,
      name,
      role,
      bio,
      image
    },

    publishedAt,
    category,
    tags,
    featured
  }
`);

export const POST_QUERY = defineQuery(`
  *[
    _type == "post"
    && slug.current == $slug
    && defined(publishedAt)
    && publishedAt <= now()
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    author->{
      _id,
      name,
      role,
      bio,
      image
    },
    publishedAt,
    category,
    tags,
    body,
    featured,

    seoTitle,
    seoDescription,

    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage
    }
  }
`);

export const blogPostsQuery = `
  *[
    _type == "post"
    && defined(slug.current)
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    author,
    category,
    tags,
    publishedAt,
    featured
  }
`;

export const featuredBlogPostsQuery = `
  *[
    _type == "blogPost"
    && featured == true
    && defined(slug.current)
  ]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    author->{
      name,
    },
    category,
    publishedAt
  }
`;

export const RELATED_BLOG_POSTS_QUERY = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
    && defined(publishedAt)
    && publishedAt <= now()
    && slug.current != $slug
    && (
      category == $category
      || count(tags[@ in $tags]) > 0
    )
  ]
  | order(
      select (
        category == $category => 0,
        1
      ) asc,
      publishedAt desc
    )[0...3] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      category,
      publishedAt,
      tags,

      author->{
        name,
        role
      }
    }
`);

/**
 * Fallback related articles.
 *
 * Useful when there aren't enough articles in
 * the same category/tag.
 */
export const RECENT_BLOG_POSTS_QUERY = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
    && defined(publishedAt)
    && publishedAt <= now()
    && slug.current != $slug
  ]
  | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    publishedAt,

    author->{
      name,
      role
    }
  }
`);

export const SEARCH_BLOG_POSTS_QUERY = defineQuery(`
  *[
    _type == "post"
    && defined(slug.current)
    && defined(publishedAt)
    && publishedAt <= now()
    && (
      title match $search
      || excerpt match $search
      || category match $search
      || $search in tags
    )
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    publishedAt
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[
    _type == "service"
  ]
  | order(order asc, number asc) {
    _id,
    title,
    number,
    category,
    "slug": slug.current,
    description,
    items,
    image,
    featured,
    order
  }
`);

export const SERVICES_SEO_QUERY = `
  *[_type == "servicesPage"][0]{
    title,
    heroEyebrow,
    heroTitle,
    intro,

    seo{
      metaTitle,
      metaDescription,
      keywords,
      noIndex,
      ogImage{
        asset->{
          url
        }
      }
    }
  }
`;

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

export const compliancePageQuery = `
  *[_type == "compliancePage"][0] {
    title,
    heroEyebrow,
    heroTitle,
    heroDescription,

    complianceAreas[] {
      number,
      title,
      text
    },

    commitmentEyebrow,
    commitmentTitle,
    commitmentText,

    seo {
      metaTitle,
      metaDescription,
      keywords,
      noIndex,
      canonicalUrl,
      ogImage {
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      }
    }
  }
`;

export const advisoryBoardPageQuery = `
  *[_type == "advisoryBoardPage"][0] {
    title,
    heroEyebrow,
    heroTitle,
    heroDescription,

    members[] {
      name,
      role,
      description,
      image,
      linkedin,
      active
    },

    philosophyEyebrow,
    philosophyTitle,
    philosophyParagraphs,

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
`;

export const commoditiesQuery = `
  *[
    _type == "commodity"
    && active == true
    && featured == true
  ]
  | order(order asc) {
    _id,
    name,
    slug,
    scientific,
    description,
    symbol,
    order,

    image {
      asset-> {
        _id,
        url
      },
      hotspot,
      crop
    }
  }
`;

export const allCommoditiesQuery = `
  *[
    _type == "commodity"
    && active == true
  ]
  | order(order asc) {
    _id,
    name,
    slug,
    scientific,
    description,
    symbol,
    order,

    image {
      asset-> {
        _id,
        url
      },
      hotspot,
      crop
    }
  }
`;

export const featuredProductsQuery = `
  *[
    _type == "product"
    && active == true
    && featured == true
  ]
  | order(order asc, name asc)
  [0...8] {
    _id,
    name,
    "slug": slug.current,
    scientificName,
    description,
    symbol,
    image {
      asset->{
        _id,
        url
      },
      hotspot,
      crop
    }
  }
`;

export const homepageProductsQuery = `
  *[
    _type == "product"
    && active == true
    && featured == true
  ]
  | order(order asc, _createdAt asc)
  [0...8] {
    _id,
    name,
    scientificName,
    description,
    image,
    symbol
  }
`;

export const homeServicesQuery = `
  *[
    _type == "service"
    && active == true
  ]
  | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    number,
    shortDescription
  }
`;

export const homeServiceBySlugQuery = `
  *[
    _type == "service"
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
`;

export const approachesQuery = `
  *[
    _type == "approach"
    && active == true
  ]
  | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    number,
    shortDescription
  }
`;

export const approachBySlugQuery = `
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
`;

export const homePageQuery = `
  *[_type == "homePage"][0]{
    title,
    seo{
      metaTitle,
      metaDescription,
      keywords,
      ogImage{
        asset->{
          _id,
          url
        }
      },
      noIndex
    }
  }
`;

export const ABOUT_PAGE_QUERY = `
  *[_type == "aboutPage"][0]{
    title,

    heroEyebrow,
    heroTitle,
    heroDescription,

    whoWeAreEyebrow,
    whoWeAreTitle,
    whoWeAreParagraphs,

    foundationEyebrow,
    foundationTitle,

    values[]{
      number,
      title,
      text
    },

    missionEyebrow,
    missionTitle,
    missionDescription,

    seo{
      metaTitle,
      metaDescription,
      keywords,
      noIndex,
      ogImage{
        asset->{
          url
        }
      }
    }
  }
`;

export const servicesQuery = `
  *[
    _type == "service"
    && active == true
  ]
  | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    number,
    shortDescription
  }
`;

export const serviceBySlugQuery = `
  *[
    _type == "service"
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
`;

const query = `
{
  "total": count(*[
    _type == "inquiry"
  ]),

  "new": count(*[
    _type == "inquiry"
    && status == "NEW"
  ]),

  "inProgress": count(*[
    _type == "inquiry"
    && status == "IN_PROGRESS"
  ]),

  "contacted": count(*[
    _type == "inquiry"
    && status == "CONTACTED"
  ]),

  "resolved": count(*[
    _type == "inquiry"
    && status == "RESOLVED"
  ]),

  "rejected": count(*[
    _type == "inquiry"
    && status == "REJECTED"
  ])
}
`;
