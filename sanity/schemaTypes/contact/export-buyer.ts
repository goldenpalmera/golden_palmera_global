import { defineField, defineType } from "sanity";

export const exportBuyerPage = defineType({
  name: "exportBuyerPage",
  title: "Export Buyer Page",
  type: "document",

  fields: [
    // ─────────────────────────────────────
    // HERO
    // ─────────────────────────────────────

    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "International buyers",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroTitleLine1",
      title: "Hero Title — Line 1",
      type: "string",
      initialValue: "Tell us what",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroTitleLine2",
      title: "Hero Title — Line 2",
      type: "string",
      initialValue: "you need.",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      initialValue:
        "Share your commodity, quantity, specifications, destination and packaging requirements. We'll review your request and respond with the next steps.",
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
        "Main image used in the export buyer page hero section.",
      validation: (Rule) => Rule.required(),
    }),

    // ─────────────────────────────────────
    // SOURCE FROM AFRICA
    // ─────────────────────────────────────

    defineField({
      name: "sourceEyebrow",
      title: "Source Section Eyebrow",
      type: "string",
      initialValue: "Source from Africa",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "sourceTitle",
      title: "Source Section Title",
      type: "string",
      initialValue:
        "Reliable commodities. Clear requirements. Global delivery.",
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: "sourceDescription",
      title: "Source Section Description",
      type: "text",
      rows: 4,
      initialValue:
        "Tell us exactly what you are looking for and our team can assess the product, quantity, specifications and destination before moving forward.",
      validation: (Rule) => Rule.required().max(500),
    }),

    // ─────────────────────────────────────
    // BUYER STEPS
    // ─────────────────────────────────────

    defineField({
      name: "buyerSteps",
      title: "Buyer Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
              validation: (Rule) =>
                Rule.required().max(10),
            }),

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
              number: "number",
              title: "title",
              text: "text",
            },
            prepare({
              number,
              title,
              text,
            }) {
              return {
                title: `${number} — ${title}`,
                subtitle: text,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).max(6),
    }),

    // ─────────────────────────────────────
    // INFORMATION CALLOUT
    // ─────────────────────────────────────

    defineField({
      name: "availabilityTitle",
      title: "Availability Callout",
      type: "string",
      initialValue:
        "Agricultural commodities sourced from Nigeria and West Africa.",
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: "availabilityDescription",
      title: "Availability Note",
      type: "text",
      rows: 3,
      initialValue:
        "Subject to product availability, specifications and destination requirements.",
      validation: (Rule) => Rule.required().max(300),
    }),

    // ─────────────────────────────────────
    // BOTTOM CTA
    // ─────────────────────────────────────

    defineField({
      name: "bottomEyebrow",
      title: "Bottom CTA Eyebrow",
      type: "string",
      initialValue: "Global trade",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "bottomTitleLine1",
      title: "Bottom CTA Title — Line 1",
      type: "string",
      initialValue: "From African origin",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "bottomTitleLine2",
      title: "Bottom CTA Title — Line 2",
      type: "string",
      initialValue: "to global destination.",
      validation: (Rule) => Rule.required().max(100),
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
        title: "Export & Buyer Inquiry",
        subtitle: "Export buyer page content",
      };
    },
  },
});