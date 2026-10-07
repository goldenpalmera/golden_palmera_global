import { defineField, defineType } from "sanity";

export const requestQuotePage = defineType({
  name: "requestQuotePage",
  title: "Request Quote Page",
  type: "document",

  fields: [
    // ─────────────────────────────────────
    // HERO
    // ─────────────────────────────────────

    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "Golden Palmera Global",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Let's discuss your",
      validation: (Rule) => Rule.required().max(150),
    }),

    defineField({
      name: "heroTitleAccent",
      title: "Hero Title Accent",
      type: "string",
      initialValue: "requirements.",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      initialValue:
        "Tell us what you need and our team will work with you to provide the right product, specifications, packaging and export solution.",
      validation: (Rule) => Rule.required().max(400),
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Hero image for the Request a Quote page.",
      validation: (Rule) => Rule.required(),
    }),

    // ─────────────────────────────────────
    // FORM SECTION
    // ─────────────────────────────────────

    defineField({
      name: "sectionEyebrow",
      title: "Section Eyebrow",
      type: "string",
      initialValue: "Request a Quote",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      initialValue: "Tell us about your order.",
      validation: (Rule) => Rule.required().max(150),
    }),

    defineField({
      name: "sectionDescription",
      title: "Section Description",
      type: "text",
      rows: 4,
      initialValue:
        "Whether you are looking for a single commodity or a long-term supply partnership, share your requirements with us.",
      validation: (Rule) => Rule.required().max(400),
    }),

    // ─────────────────────────────────────
    // PRODUCT OF INTEREST
    // ─────────────────────────────────────

    defineField({
      name: "productInterestLabel",
      title: "Product Interest Label",
      type: "string",
      initialValue: "Product of Interest",
      validation: (Rule) => Rule.required().max(100),
    }),

    // ─────────────────────────────────────
    // INFO POINTS
    // ─────────────────────────────────────

    defineField({
      name: "infoPoints",
      title: "Information Points",
      type: "array",
      of: [
        {
          type: "object",
          name: "infoPoint",
          title: "Info Point",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) =>
                Rule.required().max(100),
            }),

            defineField({
              name: "text",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) =>
                Rule.required().max(250),
            }),
          ],

          preview: {
            select: {
              title: "title",
              subtitle: "text",
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).max(6),
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
        title: "Request Quote Page",
        subtitle: "Quote page content and SEO",
      };
    },
  },
});