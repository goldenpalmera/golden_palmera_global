import type { TeamMember } from "./types";
import { SeoData } from "@/sanity/lib/types";

export const FALLBACK_SUPPLY_CHAIN = [
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
];

/**
 * These are intentionally realistic placeholder profiles used when
 * leadership content has not yet been entered in Sanity.
 *
 */
export const FALLBACK_LEADERSHIP: TeamMember[] = [
  {
    _id: "fallback-leader-1",
    name: "Daniel Okafor",
    role: "Managing Director",
    department: "Executive Leadership",
    bio:
      "Leads commercial strategy, international partnerships, and long-term growth across the company's agricultural commodity markets.",
    credentials: [
      "International Trade",
      "Agribusiness",
      "Strategic Management",
    ],
    linkedIn: "",
    quote:
      "Our role is to make the journey from producer to international buyer more reliable, transparent, and valuable for every partner in the chain.",
    isAdvisoryBoard: false,
    order: 1,
  },

  {
    _id: "fallback-leader-2",
    name: "Amaka Eze",
    role: "Head of Operations",
    department: "Operations",
    bio:
      "Oversees sourcing, processing, quality systems, and operational coordination across the company's supply network.",
    credentials: [
      "Supply Chain",
      "Quality Management",
      "Operations",
    ],
    linkedIn: "",
    quote: "",
    isAdvisoryBoard: false,
    order: 2,
  },

  {
    _id: "fallback-leader-3",
    name: "Ibrahim Musa",
    role: "Head of International Trade",
    department: "Commercial",
    bio:
      "Manages buyer relationships, export documentation, commercial negotiations, and shipment execution across international markets.",
    credentials: [
      "Export Trade",
      "Commodity Markets",
      "Logistics",
    ],
    linkedIn: "",
    quote: "",
    isAdvisoryBoard: false,
    order: 3,
  },

  {
    _id: "fallback-leader-4",
    name: "Grace Adeyemi",
    role: "Quality & Compliance Lead",
    department: "Quality & Compliance",
    bio:
      "Coordinates quality assurance, inspection requirements, product specifications, and compliance throughout the export process.",
    credentials: [
      "Quality Assurance",
      "Food Safety",
      "Compliance",
    ],
    linkedIn: "",
    quote: "",
    isAdvisoryBoard: false,
    order: 4,
  },
];


export const COMPANY_STATS = [
  {
    value: "14",
    label: "Countries currently supplied",
  },
  {
    value: "8",
    label: "Premium commodities in active export",
  },
  {
    value: "40K MT",
    label: "Annual processing capacity",
  },
  {
    value: "200+",
    label: "Cooperative partner farms",
  },
  {
    value: "100%",
    label: "Third-party inspected pre-shipment",
  },
  {
    value: "48hr",
    label: "Guaranteed RFQ response time",
  },
] as const;

export const FALLBACK_STORY_PARAGRAPHS = [
  "The African agribusiness export sector has a trust problem — not a quality problem. West Africa produces some of the world's finest palm oil, sesame, cashew, and cocoa. What has historically been missing is the infrastructure of credibility: third-party inspection, standardised documentation, and the institutional presentation that serious buyers require.",

  "Golden Palmera was built specifically to close that gap. We are headquartered in Nigeria with sourcing operations across Rivers State, Delta State, Cross River, Kano, and Niger State. We invest in the systems, certifications, and relationships that allow our commodities to compete on the global market on quality — not just on price.",

  "We do not broker third-party commodities. Every product we export passes through our own processing and quality control operations. Each supply source is audited annually. Farm GPS coordinates, yield data, and compliance records are maintained in our traceability system — designed to meet and exceed EUDR requirements.",
];

export const FALLBACK_STORY_FACTS = [
  {
    value: "5 States",
    label:
      "Active sourcing: Rivers, Delta, Cross River, Kano, Niger State",
  },
  {
    value: "200+ Farms",
    label:
      "Cooperative partner farms with GPS coordinates and annual audits",
  },
];

export const FALLBACK_STORY_PRINCIPLES = [
  {
    number: "01",
    title: "Source",
    description:
      "Build direct and accountable relationships with producers and cooperative partners.",
  },
  {
    number: "02",
    title: "Process",
    description:
      "Apply disciplined handling, quality control, processing, and documentation.",
  },
  {
    number: "03",
    title: "Deliver",
    description:
      "Connect verified commodities with international buyers through dependable export execution.",
  },
];

export const ABOUT_PAGE_FALLBACK_SEO: SeoData = {
  metaTitle: "About Golden Palmera Global",

  metaDescription:
    "Golden Palmera Global is an agricultural commodities and international trade company focused on sourcing, processing, packaging, and exporting quality products to markets around the world.",

  keywords: [
    "Golden Palmera Global",
    "about page",
    "agricultural trade",
    "agribusiness",
    "International trade",
    "agricultural supply chains",
    "sourcing, processing, packing and exporting"
  ],

  canonicalUrl: "/about",

  noIndex: false,
}