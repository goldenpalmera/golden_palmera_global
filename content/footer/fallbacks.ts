import type { FooterData } from "./types";

export const FOOTER_COLS: FooterData["columns"] = [
  {
    heading: "Products",
    links: [
      {
        label: "Red Palm Oil",
        href: "/products/where-to-buy-quality-red-palm-oil-from-africa",
      },
      {
        label: "Sesame Seeds",
        href: "/products/where-to-source-export-sesame-seeds-from-africa",
      },
      {
        label: "Cashew Nuts",
        href: "/products/where-to-buy-african-raw-cashew-nuts-for-export",
      },
      {
        label: "Shea Butter",
        href: "/products/where-to-source-natural-african-shea-butter-for-export",
      },
      {
        label: "Cocoa Beans",
        href: "/products/where-to-source-quality-african-cocoa-beans-for-export",
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
        label: "contact",
        href: "/contact",
      },
      {
        label: "Request Quotation",
        href: "/contact",
      },
      {
        label: "Export Buyer",
        href: "/contact/export-buyer",
      },
      {
        label: "Partnership",
        href: "/contact/partnership",
      },
      {
        label: "WhatsApp Trade Desk",
        href: "https://wa.me/2349039303660",
        external: true,
      },
      {
        label: "Book a Phone Call",
        href: "https://calendly.com/goldenpalmeraglobal/30min",
      },
    ],
  },
];

export const DEFAULT_SOCIAL_LINKS: FooterData["socialLinks"] = [
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/company/golden-palmera-global/",
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
  cacNumber: "RC 9538830",
};