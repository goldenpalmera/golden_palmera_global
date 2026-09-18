import type { CompliancePageData } from "./types";

export const COMPLIANCE_FALLBACKS: CompliancePageData = {
  _id: "01",
  title: "Compliance",

  hero: {
    eyebrow: "Trust • Standards • Accountability",
    title: "Compliance is part of the product.",
    description:
      "Golden Palmera Global is committed to building transparent, reliable, and responsible agricultural supply chains that meet applicable regulatory and international trade requirements.",
  },

  certificationsSection: {
    eyebrow: "Active Certifications",
    title: "Our Certification Portfolio",
  },

  qualitySection: {
    eyebrow: "Quality Assurance",
    title: "Every Shipment. Independently Verified.",
    description:
      "Third-party inspection on every lot. No exceptions, no shortcuts.",

    tests: [
      {
        _id: "fallback-test-1",
        name: "Moisture & foreign matter",
      },
      {
        _id: "fallback-test-2",
        name: "AflaTOX / Aflatoxin",
      },
      {
        _id: "fallback-test-3",
        name: "Ochratoxin A",
      },
      {
        _id: "fallback-test-4",
        name: "Pesticide residue screening",
      },
      {
        _id: "fallback-test-5",
        name: "Microbiological analysis",
      },
      {
        _id: "fallback-test-6",
        name: "Physical quality grading",
      },
    ],

    partners: [
      {
        _id: "fallback-partner-1",
        name: "SGS",
        role: "Independent inspection and certification",
      },
      {
        _id: "fallback-partner-2",
        name: "Bureau Veritas",
        role: "Commodity inspection and verification",
      },
      {
        _id: "fallback-partner-3",
        name: "Intertek",
        role: "Testing, inspection and assurance",
      },
    ],

    documents: [
      {
        _id: "fallback-document-1",
        name: "Certificate of Analysis",
        description:
          "Independent laboratory results for each shipment.",
      },
      {
        _id: "fallback-document-2",
        name: "Phytosanitary Certificate",
        description:
          "Official plant-health documentation for export.",
      },
      {
        _id: "fallback-document-3",
        name: "Certificate of Origin",
        description:
          "Verified country-of-origin documentation.",
      },
      {
        _id: "fallback-document-4",
        name: "Inspection Certificate",
        description:
          "Independent pre-shipment inspection report.",
      },
    ],

    sampleDocumentLabel: "Download sample doc set",
  },

  certifications: [
    {
      _id: "fallback-cert-1",
      name: "ISO 9001",
      shortName: "ISO 9001",
      description:
        "Quality management systems supporting consistent operational standards.",
      status: "Active",
      verifyUrl: undefined,
      logo: undefined,
      certificateFile: undefined,
    },
    {
      _id: "fallback-cert-2",
      name: "HACCP",
      shortName: "HACCP",
      description:
        "Preventive food-safety controls applied across relevant handling processes.",
      status: "Active",
      verifyUrl: undefined,
      logo: undefined,
      certificateFile: undefined,
    },
    {
      _id: "fallback-cert-3",
      name: "GlobalG.A.P.",
      shortName: "G.A.P.",
      description:
        "Good agricultural practices supporting responsible and traceable sourcing.",
      status: "Active",
      verifyUrl: undefined,
      logo: undefined,
      certificateFile: undefined,
    },
    {
      _id: "fallback-cert-4",
      name: "Organic Certification",
      shortName: "ORGANIC",
      description:
        "Certification pathway supporting verified organic agricultural production.",
      status: "Active",
      verifyUrl: undefined,
      logo: undefined,
      certificateFile: undefined,
    },
  ],

  eudrSection: {
    eyebrow: "EUDR Compliance",
    title:
      "EU Deforestation Regulation — Our Traceability Roadmap",
    description:
      "The EU Deforestation Regulation (EUDR) requires commodities placed on the EU market to have not contributed to deforestation after 31 December 2020. Golden Palmera is implementing a full traceability programme — positioning us ahead of 95% of West African commodity exporters.",

    stats: [
      {
        value: "100%",
        label:
          "Farm-level GPS data collection — Palm Oil & Cocoa",
      },
      {
        value: "2020",
        label:
          "Baseline cutoff — all source farms verified pre-2020",
      },
      {
        value: "Q3 2025",
        label:
          "Target: full EUDR due diligence system operational",
      },
      {
        value: "0",
        label:
          "Forest-risk sourcing incidents recorded to date",
      },
    ],

    roadmapTitle: "Implementation Roadmap",
  },

  milestones: [
    {
      _id: "fallback-milestone-1",
      year: "2024",
      quarter: "Q4",
      title: "Farm-level data collection",
      description:
        "Begin GPS polygon collection and farmer registration across priority sourcing areas.",
      status: "Completed",
    },
    {
      _id: "fallback-milestone-2",
      year: "2025",
      quarter: "Q1",
      title: "Deforestation baseline verification",
      description:
        "Cross-reference farm locations against available forest-cover and satellite datasets.",
      status: "Completed",
    },
    {
      _id: "fallback-milestone-3",
      year: "2025",
      quarter: "Q2",
      title: "Traceability system integration",
      description:
        "Connect farmer records, farm polygons, purchasing records and shipment documentation.",
      status: "In Progress",
    },
    {
      _id: "fallback-milestone-4",
      year: "2025",
      quarter: "Q3",
      title: "Due diligence system operational",
      description:
        "Deploy the full EUDR due diligence workflow for relevant commodities and EU-bound shipments.",
      status: "Planned",
    },
    {
      _id: "fallback-milestone-5",
      year: "2025",
      quarter: "Q4",
      title: "Continuous monitoring",
      description:
        "Maintain risk assessment, documentation review and ongoing supplier verification.",
      status: "Planned",
    },
  ],

  dossierSection: {
    title: "Request our full Compliance Dossier",
    description:
      "Includes all certificates, inspection agreements, and EUDR traceability status report.",
    downloadLabel: "Download Compliance Dossier",
    contactLabel: "Speak to Our QC Director",
  },

  commitment: {
    eyebrow: "Our Commitment",
    title: "Building confidence from origin to destination.",
    text:
      "Our objective is to make every stage of the agricultural export journey more dependable — from responsible sourcing and quality control to documentation, logistics, and delivery.",
  },

  seo: undefined,
};
