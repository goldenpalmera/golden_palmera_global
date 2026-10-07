import type {
  RequestQuotePage,
  ExportBuyerPage,
  PartnershipPage,
  ContactPage,
} from "./types"

export const FALLBACK_EXPORT_BUYER: ExportBuyerPage = {
   _id: "export-buyer-01",

  heroEyebrow:"International buyers",
  heroTitleLine1:"Tell us what",
  heroTitleLine2:"you need.",
  heroDescription:"Share your commodity, quantity, specifications, destination and packaging requirements. We'll review your request and respond with the next steps.",
  heroImage: null,

  sourceEyebrow:"Source from Africa",
  sourceTitle:"Reliable commodities. Clear requirements. Global delivery.",
  sourceDescription:"Tell us exactly what you are looking for and our team can assess the product, quantity, specifications and destination before moving forward.",

  buyerSteps: [ 
    {
      number:"01",
      title:"Tell us what you need",
      text:"Product, quantity, packaging and destination.",
    },
    {
      number:"02",
      title:"We review your requirements",
      text:"Our team assesses sourcing, specifications and availability.",
    },
    {
      number:"03",
      title:"We come back with next steps",
      text:"We discuss pricing, documentation, logistics and delivery.",
    },
  ],
  availabilityTitle:"Agricultural commodities sourced from Nigeria and West Africa.",
  availabilityDescription:"Subject to product availability, specifications and destination requirements.",

  bottomEyebrow:"Global trade",
  bottomTitleLine1:"From African origin",
  bottomTitleLine2:"to global destination.",

  seo: {
    metaTitle: "Export & Buyer Inquiry | Golden Palmera Global",
    metaDescription: "Submit an export or international buyer inquiry for agricultural commodities from Golden Palmera Global.",
    keywords: [
      "Golden Palmera Global",
      "export buyer",
      "international buyer",
      "partnership",
      "agricultural trade",
      "agribusiness",
      "commodity trade",
      "agricultural supply chains",
      "Inquiry",
      "contact",
    ],
    noIndex: false,
    canonicalUrl: "/contact/export-buyer",
  }
}

export const FALLBACK_PARTNERSHIP: PartnershipPage = {
  _id: "partnership-01",

  heroEyebrow:"Strategic partnerships",
  heroTitleLine1:"Let's build",
  heroTitleAccent:"something together.",
  heroDescription:"We believe the strongest businesses are built through the right relationships. Tell us where you see an opportunity to work together.",
  heroImage: null,

  contentEyebrow:"Work with us",
  contentTitleLine1:"Good partnerships",
  contentTitleLine2:"create lasting value.",
  contentDescription:"Golden Palmera Global works across agricultural sourcing, processing, export and international trade. We are open to relationships that strengthen our supply chain, expand market access and create long-term commercial value.",

  partnershipTypesEyebrow:"Potential partnerships",
  partnershipTypes: [
    "Supply & sourcing relationships",
    "International distribution",
    "Strategic commercial partnerships",
    "Processing & value addition",
    "Market development",
  ],

  nextStepsEyebrow:"What happens next",
  nextStepsDescription:"Share a little about your organization and the opportunity. Our team will review your proposal and get back to you directly.",

  formEyebrow:"Start the conversation",
  formTitleLine1:"Tell us about",
  formTitleLine2:"your opportunity.",
  formDescription:"Give us enough information to understand your organization, objectives and how we might work together.",

  closingEyebrow:"Long-term thinking",
  closingTitleLine1:"Built on relationships.",
  closingTitleLine2:"Driven by opportunity.",

  seo: {
    metaTitle: "Partnership Inquiry | Golden Palmera Global",
    metaDescription: "Discuss partnership opportunities with Golden Palmera Global.",
    keywords: [
      "Golden Palmera Global",
      "international buyer",
      "partnership",
      "agricultural trade",
      "agribusiness",
      "commodity trade",
      "agricultural supply chains",
      "Inquiry",
      "contact",
    ],
    noIndex: false,
    canonicalUrl: "/contact/partnership",
  }
}

export const FALLBACK_CONTACT: ContactPage = {
  _id: "contact-01",

  heroEyebrow: "Start a conversation",
  heroTitleLine1: "let's",
  heroTitleLine2: "connect",
  heroImage: null,

  contactInfoEyebrow: "Golden Palmera Global",

  emailLabel: "Email",
  email: "info@goldenpalmeraglobal.com",
  

  locationLabel: "Location",
  location: "Nigeria",
  region: "West Africal",

  businessLabel: "Business",
  businessDescription: "Agricultural sourcing, processing, export and internationaln trade.",

  bottomEyebrow: "Global Reach",
  bottomTitleLine1: "Rooted in Africa.",
  bottomTitleLine2: "Connected to the world.",

  bottomLinkText: "Explore our Products",
  bottomLinkUrl: "/products",

  seo: {
    metaTitle: "Contact | Golden Palmera Global",
    metaDescription: "Contact Golden Palmera Global.",
    keywords: [
      "Golden Palmera Global",
      "international buyer",
      "partnership",
      "agricultural trade",
      "agribusiness",
      "commodity trade",
      "agricultural supply chains",
      "contact",
    ],
    noIndex: false,
    canonicalUrl: "/contact",
  }
}

export const FALLBACK_REQUEST_QUOTE: RequestQuotePage = {
  _id: "request-quote-01",

  heroEyebrow: "Golden Palmera Global" ,
  heroTitle: "Let's discuss your",
  heroTitleAccent: "requirements.",
  heroDescription: "Tell us what you need and our team will work with you to provide the right product, specifications, packaging and export solution.",

  sectionEyebrow: "Request a Quote" ,
  sectionTitle: "Tell us about your order." ,
  sectionDescription: "Whether you are looking for a single commodity or a long-term supply partnership, share your requirements with us.",

  productInterestLabel: "Product of Interest",

  infoPoints: [
    {
      title:"Quality focused",
      text:"We work with defined quality and specification requirements.",
    },
    {
      title:"Export ready",
      text: "We support documentation, logistics and international trade requirements.",
    },
    {
      title:"Long-term partnerships",
      text:"Our goal is to build dependable relationships across global markets.",
    }
  ],

  seo: {
    metaTitle: "Request a Quote | Golden Palmera Global",
    metaDescription: "Request a quote for agricultural commodities and export products from Golden Palmera Global.",
    keywords: [
      "Golden Palmera Global",
      "export buyer",
      "international buyer",
      "partnership",
      "agricultural trade",
      "agribusiness",
      "commodity trade",
      "agricultural supply chains",
      "Inquiry",
      "contact",
      "quote",
      "request",
    ],
    noIndex: false,
    canonicalUrl: "/quote/request-quote",
  } 
}