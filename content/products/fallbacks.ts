import { Product, ProductsPage } from "./types";

export const FALLBACK: ProductsPage = {
  title: "Our Commodities",

  hero: {
    eyebrow: "Our Commodities",
    title: "Quality agricultural products from Africa.",
    description:
      "We source, aggregate, process, package, and prepare agricultural commodities for local and international markets.",
  },

  portfolio: {
    eyebrow: "Our product portfolio",
    title: "Commodities with global potential",
    description:
      "Our portfolio covers a range of agricultural and natural products selected for their commercial value and demand across international markets.",
  },

  supplyChain: {
    eyebrow: "Beyond sourcing",
    title: "From origin to destination.",
    description:
      "Our role extends beyond simply sourcing commodities. We work across the supply chain to support quality control, aggregation, processing, packaging, documentation, logistics, and export readiness.",

    steps: [
      {
        number: "01",
        title: "Sourcing",
        description:
          "Working with farmers, cooperatives, and trusted suppliers.",
      },
      {
        number: "02",
        title: "Quality",
        description:
          "Selection, grading, handling, and quality control.",
      },
      {
        number: "03",
        title: "Processing",
        description:
          "Value addition, preservation, and packaging.",
      },
      {
        number: "04",
        title: "Export",
        description:
          "Documentation, logistics, and international delivery.",
      },
    ],
  },

  cta: {
    title: "Looking for a supplier?",
    description:
      "Let's discuss your commodity requirements.",
    label: "Request a Quote",
    link: {
      href: "/quote/request-quote",
      newTab: false,
    }
  },
};


export const FALLBACK_PRODUCT_IMAGES: Record<
  string,
  string
> = {
  cocoa:
    "/images/products/palm_oil.jpg",

  sesame:
    "/images/products/palm_fruit.jpg",

  cashew:
    "/images/products/cashew.jpg",

  hibiscus:
    "/images/products/hibiscus.jpg",
};

export const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: "fallback-product-cocoa",
    slug: "cocoa",
    name: "Cocoa",
    // title: "Premium African Cocoa",
    category: "Cocoa Butter",
    botanicalName: "Coc",
    shortDescription:
      "Carefully sourced cocoa from trusted agricultural supply networks across West Africa.",
    // description:
      // "Our cocoa supply is built around quality, traceability, and dependable export fulfilment for international buyers."
    image: undefined,
    origin: "West Africa",
    availability: "yes",
    processing: "yes",
    grade: "Highest",
    minimumOrder: "2 MT",
    forms: ["yes"],
    packaging: ["yes"],
    applications: ["yes", "True"],
    certifications: ["yes", "True"],
    featured: true,

    // attributes: [
    //   {
    //     label: "Origin",
    //     value: "West Africa",
    //   },
    //   {
    //     label: "Product",
    //     value: "Cocoa",
    //   },
    //   {
    //     label: "Supply",
    //     value: "Export ready",
    //   },
    //   {
    //     label: "Market",
    //     value: "International",
    //   },
    // ],
  },

  {
    _id: "fallback-product-sesame",
    slug: "sesame",
    name: "Sesame",
    botanicalName: "Sesamum indicum",
    // title: "Premium Sesame Seeds",
    category: "Oilseeds",
    shortDescription:
      "Quality sesame sourced through reliable agricultural supply networks.",
    // description:
    //   "Our sesame sourcing programme connects producers and aggregators with international buyers seeking consistent quality and dependable supply.",
    image: undefined,

    // attributes: [
    //   {
    //     label: "Origin",
    //     value: "West Africa",
    //   },
    //   {
    //     label: "Product",
    //     value: "Sesame Seeds",
    //   },
    //   {
    //     label: "Supply",
    //     value: "Bulk",
    //   },
    //   {
    //     label: "Market",
    //     value: "International",
    //   },
    // ],
  },

  {
    _id: "fallback-product-cashew",
    slug: "cashew",
    name: "Cashew",
    botanicalName: "Anacardium occidentale",
    // title: "African Cashew",
    category: "Tree Crops",
    shortDescription:
      "Export-oriented cashew supply focused on quality, consistency, and long-term partnerships.",
    // description:
    //   "We work across agricultural supply networks to connect quality cashew production with international commodity markets.",
    image: undefined,

    // attributes: [
    //   {
    //     label: "Origin",
    //     value: "West Africa",
    //   },
    //   {
    //     label: "Product",
    //     value: "Cashew",
    //   },
    //   {
    //     label: "Supply",
    //     value: "Export ready",
    //   },
    //   {
    //     label: "Market",
    //     value: "International",
    //   },
    // ],
  },

  {
    _id: "fallback-product-hibiscus",
    slug: "hibiscus",
    name: "Hibiscus",
    botanicalName: "Hibiscus sabdariffa",
    // title: "Dried Hibiscus",
    category: "Botanicals",
    shortDescription:
      "Carefully sourced dried hibiscus for international food, beverage, and ingredient markets.",
    // description:
    //   "Our hibiscus sourcing focuses on product quality, careful handling, reliable aggregation, and international fulfilment.",
    image: undefined,

    // attributes: [
    //   {
    //     label: "Origin",
    //     value: "West Africa",
    //   },
    //   {
    //     label: "Product",
    //     value: "Dried Hibiscus",
    //   },
    //   {
    //     label: "Supply",
    //     value: "Bulk",
    //   },
    //   {
    //     label: "Market",
    //     value: "International",
    //   },
    // ],
  },
];
