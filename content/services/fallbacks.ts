import { Service } from "./types";

export const FALLBACK_SERVICE_IMAGES: Record<
  string,
  string
> = {
  sourcing:
    "/images/services/sourcing.jpg",

  export:
    "/images/services/export.jpg",

  logistics:
    "/images/services/logistics.jpg",

  "market-access":
    "/images/services/market-access.jpg",
};

export const FALLBACK_SERVICES: Service[] = [
  {
    _id: "fallback-service-sourcing",
    number: "01",
    slug: "sourcing",
    title: "Agricultural Sourcing",
    // name: "Agricultural Sourcing",

   shortDescription:
      "Reliable sourcing networks connecting quality agricultural commodities with international buyers.",

    // description:
    //   "We work with trusted producers, aggregators, and agricultural networks to source quality commodities from origin.",

    category: "Sourcing",
    items: [
      "Producer and aggregator networks",
      "Commodity sourcing",
      "Quality-focused procurement",
      "Origin-level supply coordination",
    ],

    // image: undefined,

    description: [
      {
        _type: "block",
        _key: "sourcing-intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "sourcing-intro-span",
            text:
              "Golden Palmera Global connects international buyers with dependable agricultural supply networks across Africa.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "sourcing-heading",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "sourcing-heading-span",
            text: "From origin to opportunity",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "sourcing-body",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "sourcing-body-span",
            text:
              "Our sourcing approach focuses on quality, consistency, traceability, and long-term relationships with agricultural producers and supply partners.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },

  {
    _id: "fallback-service-export",
    number: "02",
    slug: "export",
    title: "Commodity Export",
    // name: "Commodity Export",

   shortDescription:
      "Export solutions designed to move African agricultural commodities efficiently into global markets.",

    // description:
    //   "We coordinate sourcing, quality, documentation, and fulfilment to support reliable agricultural commodity exports.",

    category: "Export",
    items: [
      "Export coordination",
      "Documentation support",
      "Quality preparation",
      "International fulfilment",
    ],

    // image: undefined,

    description: [
      {
        _type: "block",
        _key: "export-intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "export-intro-span",
            text:
              "International commodity trade requires dependable execution at every stage of the export process.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "export-heading",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "export-heading-span",
            text: "Exporting with confidence",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "export-body",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "export-body-span",
            text:
              "We help coordinate the journey from agricultural origin through preparation, documentation, logistics, and international delivery.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },

  {
    _id: "fallback-service-logistics",
    number: "03",
    slug: "logistics",
    title: "Trade & Logistics",
    // name: "Trade & Logistics",

   shortDescription:
      "Coordinated logistics and trade support for agricultural commodities moving across borders.",

    // description:
    //   "From origin handling to international shipment, we help create dependable pathways for agricultural commodities.",

    category: "Logistics",
    items: [
      "Origin handling",
      "Shipment coordination",
      "Trade documentation",
      "Destination logistics",
    ],

    // image: undefined,

    description: [
      {
        _type: "block",
        _key: "logistics-intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "logistics-intro-span",
            text:
              "Efficient logistics are essential to turning agricultural production into dependable international supply.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "logistics-heading",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "logistics-heading-span",
            text: "Keeping commodities moving",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "logistics-body",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "logistics-body-span",
            text:
              "Our trade and logistics support is designed around clear communication, reliable coordination, and efficient movement from origin to destination.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },

  {
    _id: "fallback-service-market-access",
    number: "04",
    slug: "market-access",
    title: "Global Market Access",
    // name: "Global Market Access",

   shortDescription:
      "Connecting African agricultural supply with buyers and opportunities across international markets.",

    // description:
    //   "We help create commercial connections between agricultural supply networks and international commodity markets.",

    category: "Market Access",
    items: [
      "International buyer connections",
      "Market development",
      "Producer-to-buyer relationships",
      "Long-term trade opportunities",
    ],

    // image: undefined,

    description: [
      {
        _type: "block",
        _key: "market-intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "market-intro-span",
            text:
              "Strong agricultural markets depend on strong commercial connections between origin and destination.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "market-heading",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "market-heading-span",
            text: "Connecting supply with demand",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "market-body",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "market-body-span",
            text:
              "We build relationships between producers, exporters, processors, traders, and international buyers to create opportunities for long-term agricultural trade.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
];
