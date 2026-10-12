import { defineField, defineType } from "sanity";

export const blogPage = defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",

  fields: [
    // ─────────────────────────────────────
    // HERO
    // ─────────────────────────────────────

    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      description: "Small text displayed above the main hero title.",
      initialValue: "GPG Insights",
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: "heroTitleLine1",
      title: "Hero Title — Line 1",
      type: "string",
      initialValue: "Agriculture.",
      validation: (Rule) =>
        Rule.required().max(80),
    }),

    defineField({
      name: "heroTitleLine2",
      title: "Hero Title — Line 2",
      type: "string",
      initialValue: "Commodities.",
      validation: (Rule) =>
        Rule.required().max(80),
    }),

    defineField({
      name: "heroTitleAccent",
      title: "Hero Title — Accent",
      type: "string",
      initialValue: "Global Trade.",
      description:
        "The final title line displayed using the accent colour.",
      validation: (Rule) =>
        Rule.required().max(80),
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      initialValue:
        "Perspectives on agricultural commodities, African supply chains, export markets, sustainability, and international trade.",
      validation: (Rule) =>
        Rule.required().max(300),
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Main image displayed on the Blog page hero section.",
      validation: (Rule) =>
        Rule.required(),
    }),

    // ─────────────────────────────────────
    // SEO
    // ─────────────────────────────────────

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Blog Page",
        subtitle: "Blog page content and hero",
      };
    },
  },
});