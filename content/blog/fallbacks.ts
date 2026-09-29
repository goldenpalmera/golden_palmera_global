import type { SeoData } from "@/sanity/lib/types";
import type { BlogPost } from "@/content/blog/types";

export const BLOGS_FALLBACK_SEO: SeoData = {
  metaTitle: "GPG Insights | Golden Palmera Global",

  metaDescription:
    "Perspectives on agricultural commodities, African supply chains, sustainability, export markets, and international trade.",

  keywords: [
    "Golden Palmera Global",
    "Insights",
    "agricultural trade",
    "agribusiness",
    "commodity trade",
    "agricultural supply chains",
    "blog",
  ],

  canonicalUrl: "/blog",

  noIndex: false,
};

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    _id: "fallback-1",
    slug: "future-of-african-agricultural-trade",
    title: "The Future of African Agricultural Trade",
    excerpt:
      "How stronger supply chains, better market access, and strategic sourcing can unlock the next chapter of African agricultural trade.",
    category: "Agricultural Trade",
    publishedAt: "2026-09-12T00:00:00.000Z",
    tags: ["Africa", "Trade", "Agriculture"],

    coverImage: undefined,
    // {
    //   fallbackUrl: "/images/blog/african-agriculture.jpg",
    // },

    author: {
      name: "Golden Palmera Global",
      role: "GPG Insights",
    },

    body: [],
  },

  {
    _id: "fallback-2",
    slug: "building-resilient-agricultural-supply-chains",
    title: "Building More Resilient Agricultural Supply Chains",
    excerpt:
      "A practical look at sourcing, logistics, quality assurance, and the relationships that keep agricultural commodities moving across borders.",
    category: "Supply Chains",
    publishedAt: "2026-09-05T00:00:00.000Z",
    tags: ["Supply Chain", "Sourcing", "Logistics"],

    // coverImage: {
    //   fallbackUrl: "/images/blog/commodity-warehouse.jpg",
    // },


    author: {
      name: "Golden Palmera Global",
      role: "GPG Insights",
    },

    body: [],
  },

  {
    _id: "fallback-3",
    slug: "understanding-global-commodity-markets",
    title: "Understanding Global Commodity Markets",
    excerpt:
      "The major forces shaping agricultural commodity markets and what they mean for producers, exporters, buyers, and international partners.",
    category: "Commodity Markets",
    publishedAt: "2026-08-28T00:00:00.000Z",
    tags: ["Commodities", "Markets", "Global Trade"],

    // coverImage: {
    //   fallbackUrl: "/images/blog/global-trade.jpg",
    // },

    author: {
      name: "Golden Palmera Global",
      role: "GPG Insights",
    },

    body: [],
  },

  {
    _id: "fallback-4",
    slug: "sustainable-sourcing-in-africa",
    title: "Why Sustainable Sourcing Matters",
    excerpt:
      "Exploring responsible sourcing practices and the long-term value they create for farmers, buyers, communities, and global markets.",
    category: "Sustainability",
    publishedAt: "2026-08-20T00:00:00.000Z",
    tags: ["Sustainability", "Sourcing"],

    // coverImage: {
    //   fallbackUrl: "/images/blog/sustainable-farming.jpg",
    // },

    author: {
      name: "Golden Palmera Global",
      role: "GPG Insights",
    },

    body: [],
  },

  {
    _id: "fallback-5",
    slug: "from-farm-to-global-market",
    title: "From Farm to Global Market",
    excerpt:
      "What it takes to transform agricultural production into reliable, export-ready commodity supply.",
    category: "Export",
    publishedAt: "2026-08-14T00:00:00.000Z",
    tags: ["Export", "Agriculture"],

    // coverImage: {
    //   fallbackUrl: "/images/blog/export-logistics.jpg",
    // },

    author: {
      name: "Golden Palmera Global",
      role: "GPG Insights",
    },

    body: [],
  },

  {
    _id: "fallback-6",
    slug: "the-role-of-quality-in-commodity-trade",
    title: "The Role of Quality in Commodity Trade",
    excerpt:
      "Why consistency, traceability, quality control, and trust are essential to building durable international commodity relationships.",
    category: "Quality & Standards",
    publishedAt: "2026-08-07T00:00:00.000Z",
    tags: ["Quality", "Commodities", "Trade"],

    // coverImage: {
    //   fallbackUrl: "/images/blog/cocoa-harvest.jpg",
    // },

    author: {
      name: "Golden Palmera Global",
      role: "GPG Insights",
    },

    body: [],
  },
];

export const FALLBACK_ARTICLE: BlogPost = {
  ...FALLBACK_BLOG_POSTS[0],

  body: [
    {
      _type: "block",
      _key: "intro",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "intro-span",
          text:
            "Africa's agricultural sector sits at the intersection of production, trade, infrastructure, and growing international demand.",
          marks: [],
        },
      ],
      markDefs: [],
    },

    {
      _type: "block",
      _key: "heading-1",
      style: "h2",
      children: [
        {
          _type: "span",
          _key: "heading-1-span",
          text: "A connected agricultural marketplace",
          marks: [],
        },
      ],
      markDefs: [],
    },

    {
      _type: "block",
      _key: "paragraph-1",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "paragraph-1-span",
          text:
            "Building reliable agricultural trade requires more than production alone. Buyers need dependable quality, transparent sourcing, predictable logistics, and partners who understand the markets they operate in.",
          marks: [],
        },
      ],
      markDefs: [],
    },

    {
      _type: "block",
      _key: "heading-2",
      style: "h2",
      children: [
        {
          _type: "span",
          _key: "heading-2-span",
          text: "From local supply to global opportunity",
          marks: [],
        },
      ],
      markDefs: [],
    },

    {
      _type: "block",
      _key: "paragraph-2",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "paragraph-2-span",
          text:
            "The opportunity is to build stronger connections between producers, aggregators, exporters, processors, and international buyers. When these relationships work together, agricultural commodities can move more efficiently from origin to destination.",
          marks: [],
        },
      ],
      markDefs: [],
    },

    {
      _type: "block",
      _key: "heading-3",
      style: "h2",
      children: [
        {
          _type: "span",
          _key: "heading-3-span",
          text: "Building trust across borders",
          marks: [],
        },
      ],
      markDefs: [],
    },

    {
      _type: "block",
      _key: "paragraph-3",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "paragraph-3-span",
          text:
            "International agricultural trade depends on relationships that extend beyond a single transaction. Consistent quality, clear communication, traceability, and reliable fulfilment create the foundation for long-term partnerships.",
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
};

export const FALLBACK_IMAGE_BY_SLUG: Record<
  string,
  string
> = {
  "future-of-african-agricultural-trade":
    "/images/blog/african-agriculture.jpg",

  "building-resilient-agricultural-supply-chains":
    "/images/blog/commodity-warehouse.jpg",

  "understanding-global-commodity-markets":
    "/images/blog/global-trade.jpg",

  "sustainable-sourcing-in-africa":
    "/images/blog/sustainable-farming.jpg",

  "from-farm-to-global-market":
    "/images/blog/export-logistics.jpg",

  "the-role-of-quality-in-commodity-trade":
    "/images/blog/cocoa-harvest.jpg",
};
