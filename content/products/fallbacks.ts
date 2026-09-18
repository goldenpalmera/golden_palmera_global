import { ProductsPage } from "./types";

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
