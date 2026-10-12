import { SeoData } from "@/sanity/lib/types";
import type { 
  AdvisoryBoardPageData,
} from "./types";

export const ADVISORY_BOARD_FALLBACK: AdvisoryBoardPageData = {
  title: "Advisory Board",

  heroEyebrow: "Governance & Expertise",
  heroTitle: "Advisory Board",
  heroDescription:
    "Experienced perspectives helping Golden Palmera Global build resilient agricultural supply chains, meet international standards, and create sustainable value across global markets.",

  stats: [
    {
      value: "6",
      label: "Advisory Members",
    },
    {
      value: "5",
      label: "Countries Represented",
    },
    {
      value: "120+",
      label: "Combined Years Experience",
    },
    {
      value: "4",
      label: "Specialisation Domains",
    },
  ],

  members: [
    {
      _id: "1",
      name: "Dr. Adaeze Okonkwo",
      role: "Agricultural Trade Advisor",
      specialisation: "West African Commodity Markets",
      country: "Nigeria",
      bio: "Former Director at the Nigerian Export Promotion Council. 20+ years advising on commodity export policy and international market access.",
      credentials: [
        "PhD Agricultural Economics",
        "NEPC",
        "ECOWAS Trade Commission",
      ],
    },
    {
      _id: "2",
      name: "Klaus Hoffman",
      role: "European Market Advisor",
      specialisation: "EU Regulatory & EUDR Compliance",
      country: "Germany",
      bio: "Senior trade compliance consultant specialising in EU food import regulations. Advised 40+ African agribusiness companies on EUDR and food safety law.",
      credentials: [
        "LLM EU Trade Law",
        "20yr Hamburg Commodities",
      ],
    },
    {
      _id: "3",
      name: "Yuki Tanaka",
      role: "Asia-Pacific Trade Advisor",
      specialisation: "Japanese & Vietnamese Commodity Procurement",
      country: "Japan",
      bio: "Former Head of Procurement at a major Tokyo-based food trading house. Deep network across Asian commodity import markets including sesame, cashew, and cocoa.",
      credentials: [
        "MBA Hitotsubashi",
        "JFTC Certified Trader",
      ],
    },
    {
      _id: "4",
      name: "Prof. Nneka Eze",
      role: "Food Science & Quality Advisor",
      specialisation: "Agri-Food Quality Standards",
      country: "Nigeria",
      bio: "Professor of Food Science at the University of Nigeria, Nsukka. ISO 9001 Lead Auditor. Designed curriculum for 3 national commodity quality programmes.",
      credentials: [
        "PhD Food Science (UNN)",
        "ISO 9001 Lead Auditor",
        "SON Technical Committee",
      ],
    },
    {
      _id: "5",
      name: "James Odhiambo",
      role: "Logistics & Freight Advisor",
      specialisation: "East & West African Port Operations",
      country: "Kenya",
      bio: "30 years in African freight forwarding and port logistics. Former Operations Director at a Pan-African shipping line. Expert in Apapa Port operations and Incoterms structuring.",
      credentials: [
        "FIATA Certified Freight Forwarder",
        "Port Operations Specialist",
      ],
    },
    {
      _id: "6",
      name: "Fatima Al-Rashidi",
      role: "MENA Markets Advisor",
      specialisation: "Gulf & Middle East Commodity Import",
      country: "UAE",
      bio: "Commodity trade consultant based in Dubai. Facilitates trade relationships between West African exporters and Gulf-based food processing and retail groups.",
      credentials: [
        "Dubai Multi Commodities Centre",
        "MENA Agri-Food Expert",
      ],
    },
  ],

  philosophyEyebrow: "Our Approach",
  philosophyTitle:
    "Experience that strengthens every link in the chain.",

  philosophyParagraphs: [
    "Our advisory approach brings together knowledge from agriculture, international trade, supply-chain management, quality assurance, and market development.",
    "Together, these perspectives help Golden Palmera Global make informed decisions while building long-term relationships with farmers, suppliers, buyers, and international partners.",
  ],

  cta: {
    title: "Interested in joining our Advisory Board?",
    description:
      "We welcome senior professionals with relevant expertise in agribusiness, commodity trade, food science, or international logistics.",
    label: "Get in Touch",
    link: {
      newTab: false,
      href: "/contact",
    }
  }
};

export const ADVISORY_BOARD_FALLBACK_SEO: SeoData = {
  metaTitle: "Advisory Board | Golden Palmera Global",

  metaDescription:
    "Meet the advisory team helping Golden Palmera Global build resilient agricultural supply chains and international trade relationships.",

  keywords: [
    "Golden Palmera Global",
    "advisory board",
    "agricultural trade",
    "agribusiness",
    "commodity trade",
    "agricultural supply chains",
  ],

  canonicalUrl: "/advisory-board",

  noIndex: false,
};