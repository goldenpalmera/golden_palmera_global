import { SeoData } from "@/sanity/lib/types";
import type { HomePageContent } from "./types";

export const HOME_FALLBACKS: HomePageContent = {
  _id: "01",

  hero: {
    eyebrow: "West Africa's Premier Agribusiness Export House",
    title: "From trusted ",
    titleAccent: "origins",
    titleEnd: "to global markets.",
    description:
      "Golden Palmera Global connects quality agricultural commodities from Africa with buyers and markets around the world.",
  },

  intro: {
    label: "01 — THE COMPANY",
    heading: "Building bridges between",
    headingAccent: " agriculture and opportunity.",
    largeCopy:
      "Golden Palmera Global is an agricultural commodities and international trade company focused on sourcing, processing, packaging and exporting quality products to global markets.",
    body:
      "We work across the agricultural value chain, building dependable relationships with farmers, cooperatives, suppliers, logistics partners and international buyers.",
    linkText: "Work with us",
    linkHref: "#contact",
  },

  featuredProducts: [],

  supplyChain: [
    {
      _id: "fallback-chain-1",
      number: "01",
      title: "Source & Aggregate",
      description:
        "Direct partnerships with certified cooperative farms across Nigeria.",
    },
    {
      _id: "fallback-chain-2",
      number: "02",
      title: "Grade & Sort",
      description:
        "Every batch graded by trained QC technicians against published specifications.",
    },
    {
      _id: "fallback-chain-3",
      number: "03",
      title: "Process & Package",
      description:
        "Commodity-specific processing parameters and packaging according to buyer specification.",
    },
    {
      _id: "fallback-chain-4",
      number: "04",
      title: "Pre-Shipment Inspection",
      description:
        "Independent inspection verifies quantity, quality, packing and marking.",
    },
    {
      _id: "fallback-chain-5",
      number: "05",
      title: "Documentation",
      description:
        "Complete documentation package prepared for every shipment.",
    },
    {
      _id: "fallback-chain-6",
      number: "06",
      title: "Logistics & Shipping",
      description:
        "International logistics coordinated from origin to destination.",
    },
  ],

  featuredServices: [],

  featuredApproaches: [],

  featuredCaseStudies: [
    {
      id: "fallback-case-1",
      title: "Sesame Supply to Japan",
      country: "Japan",
      volume: "500 MT",
      product: "Sesame Seeds",
      summary:
        "Supplying 500MT of Grade A certified sesame seeds to a leading Japanese food processor under a 12-month supply agreement.",
    },
    {
      id: "fallback-case-2",
      title: "Palm Oil Agreement — Germany",
      country: "Germany",
      volume: "1,200 MT",
      product: "Crude Palm Oil",
      summary:
        "A 12-month palm oil supply agreement with a German commodity house.",
    },
    {
      id: "fallback-case-3",
      title: "Cashew Kernels to Vietnam",
      country: "Vietnam",
      volume: "200 MT",
      product: "Cashew Kernels W320",
      summary:
        "W320 cashew kernel export to a Vietnamese snack manufacturer.",
    },
  ],

  featuredTestimonials: [
    {
      id: "fallback-testimonial-1",
      quote:
        "Their documentation package is the most complete we have received from a West African supplier. Every certificate was in order before our customs filing.",
      companyType: "Commodity Trading House",
      country: "Netherlands",
    },
    {
      id: "fallback-testimonial-2",
      quote:
        "SGS inspection reports arrive before the vessel even departs. That level of organisation from a Nigerian exporter is genuinely unusual and earns our continued business.",
      companyType: "Food Processing Company",
      country: "Germany",
    },
    {
      id: "fallback-testimonial-3",
      quote:
        "We have run three procurement cycles with Golden Palmera. Quality has been consistent, communication clear, and not one shipment has arrived outside specification.",
      companyType: "Agricultural Importer",
      country: "Japan",
    },
  ],

  contact: {
    label: "05 — LET'S CONNECT",
    heading: "Let's take your",
    headingAccent: "commodity further.",
    description:
      "Whether you are an international buyer, agricultural supplier, cooperative or strategic partner, we would like to hear from you.",
    email: "info@goldenpalmera.com",
  },
};


export const HOMEPAGE_FALLBACK_SEO: SeoData = {
  metaTitle: "Home Page | Golden Palmera Global",

  metaDescription:
    "Golden Palmera Global connects quality agricultural commodities from Africa with buyers and markets around the world.",

  keywords: [
    "Golden Palmera Global",
    "home page",
    "agricultural trade",
    "agribusiness",
    "commodity trade",
    "agricultural supply chains",
    "africa",
    "buyers, sellers, and marketers",
  ],

  canonicalUrl: "/",

  noIndex: false,
};