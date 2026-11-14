import type { PortableTextBlock } from "@portabletext/types";

type FallbackApproach = {
  _id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  description: PortableTextBlock[];
};

export const FALLBACK_APPROACHES: FallbackApproach[] = [
  {
    _id: "fallback-approach-01",
    slug: "origin-first",
    number: "01",
    title: "Origin First",
    shortDescription:
      "We start at origin, building strong relationships with producers, aggregators, and local supply networks.",
    description: [
      {
        _type: "block",
        _key: "origin-intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "origin-intro-span",
            text:
              "Great agricultural trade starts with a strong understanding of where products come from. We work close to origin to understand production realities, supply availability, quality, and the people behind the commodities we move.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "origin-heading",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "origin-heading-span",
            text: "Closer to the source",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "origin-body",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "origin-body-span",
            text:
              "Our approach is built around relationships with farmers, aggregators, processors, and local partners. This helps us understand the supply chain before a commodity ever reaches an international market.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "origin-heading-2",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "origin-heading-2-span",
            text: "Building reliable supply",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "origin-body-2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "origin-body-2-span",
            text:
              "By developing long-term relationships at origin, we can create more dependable supply pathways while maintaining a clear understanding of quality and availability.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },

  {
    _id: "fallback-approach-02",
    slug: "quality-driven",
    number: "02",
    title: "Quality Driven",
    shortDescription:
      "Quality, consistency, and transparency guide every stage of our agricultural supply process.",
    description: [
      {
        _type: "block",
        _key: "quality-intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "quality-intro-span",
            text:
              "Quality is more than a specification. It is the foundation of trust between producers, exporters, and international buyers.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "quality-heading",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "quality-heading-span",
            text: "Consistency creates confidence",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "quality-body",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "quality-body-span",
            text:
              "We focus on clear specifications, careful handling, appropriate quality controls, and communication throughout the supply chain.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "quality-heading-2",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "quality-heading-2-span",
            text: "Designed for international markets",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "quality-body-2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "quality-body-2-span",
            text:
              "Our processes are designed to help agricultural products meet the expectations of international buyers while preserving the integrity of the product from origin to destination.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },

  {
    _id: "fallback-approach-03",
    slug: "relationship-led",
    number: "03",
    title: "Relationship Led",
    shortDescription:
      "Long-term relationships create stronger agricultural supply chains and more sustainable trade opportunities.",
    description: [
      {
        _type: "block",
        _key: "relationship-intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "relationship-intro-span",
            text:
              "International trade works best when the people behind every transaction are treated as long-term partners rather than one-time counterparties.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "relationship-heading",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "relationship-heading-span",
            text: "Partnerships that compound",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "relationship-body",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "relationship-body-span",
            text:
              "We believe trust is built through consistent communication, dependable execution, transparency, and a shared commitment to creating value across the supply chain.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "relationship-heading-2",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "relationship-heading-2-span",
            text: "Connecting people and markets",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "relationship-body-2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "relationship-body-2-span",
            text:
              "Our role is to create meaningful connections between agricultural supply at origin and demand in international markets.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },

  {
    _id: "fallback-approach-04",
    slug: "global-perspective",
    number: "04",
    title: "Global Perspective",
    shortDescription:
      "We combine local knowledge with an international perspective on agricultural markets and trade.",
    description: [
      {
        _type: "block",
        _key: "global-intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "global-intro-span",
            text:
              "Agricultural markets are global, but successful trade depends on understanding the realities at both ends of the supply chain.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "global-heading",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "global-heading-span",
            text: "Local knowledge, global reach",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "global-body",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "global-body-span",
            text:
              "We combine knowledge of agricultural production and African supply networks with an understanding of international markets, buyers, logistics, and trade requirements.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "global-heading-2",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "global-heading-2-span",
            text: "Creating connections across borders",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "global-body-2",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "global-body-2-span",
            text:
              "The result is a more connected approach to agricultural trade, helping quality supply reach the markets where it is needed.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
];
