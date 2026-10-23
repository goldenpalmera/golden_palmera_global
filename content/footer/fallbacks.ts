import type { FooterData } from "./types";

export const FOOTER_COLS: FooterData["columns"] = [
  {
    heading: "Products",
    links: [
      {
        label: "Crude Palm Oil",
        href: "/products/crude-palm-oil",
      },
      {
        label: "Sesame Seeds",
        href: "/products/sesame-seeds",
      },
      {
        label: "Cashew Kernels",
        href: "/products/cashew-kernels",
      },
      {
        label: "Shea Butter",
        href: "/products/shea-butter",
      },
      {
        label: "Cocoa Beans",
        href: "/products/cocoa-beans",
      },
      {
        label: "View All",
        href: "/products",
      },
    ],
  },

  {
    heading: "Company",
    links: [
      {
        label: "About Us",
        href: "/about",
      },
      {
        label: "Advisory Board",
        href: "/advisory-board",
      },
      {
        label: "Supply Chain",
        href: "/about#supply-chain",
      },
    ],
  },

  {
    heading: "Compliance",
    links: [
      {
        label: "Certifications",
        href: "/compliance",
      },
      {
        label: "EUDR Roadmap",
        href: "/compliance#eudr",
      },
      {
        label: "Documentation",
        href: "/compliance#documents",
      },
    ],
  },

  {
    heading: "Contact",
    links: [
      {
        label: "Request Quotation",
        href: "/contact",
      },
      {
        label: "WhatsApp Trade Desk",
        href: "https://wa.me/2348000000000",
        external: true,
      },
      {
        label: "Book a Phone Call",
        href: "https://calendly.com/your-demo-account/30min",
      },
    ],
  },
];

export const DEFAULT_SOCIAL_LINKS: FooterData["socialLinks"] = [
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/",
    label: "LinkedIn",
  },
];

export const DEFAULT_TRUST_BADGES = [
  "SSL Secured",
  "GDPR Compliant",
];

export const DEFAULTS = {
  companyName: "Golden Palmera Global Limited",
  companyTagline: "Global Limited",
  description:
    "West Africa's agribusiness export company, connecting verified African agricultural commodities with global markets through reliable sourcing, value creation, and international trade.",
  bottomMessage:
    "Committed to traceable, farmer-fair agricultural sourcing.",
  copyrightYear: 2026,
  cacNumber: "2233355",
};