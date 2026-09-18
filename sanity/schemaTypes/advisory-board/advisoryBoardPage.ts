import { defineField, defineType } from "sanity";

export const advisoryBoardPage = defineType({
  name: "advisoryBoardPage",
  title: "Advisory Board Page",
  type: "document",

  fields: [
    // Hero
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Advisory Board",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "Governance & Expertise",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(300),
    }),

    // Statistics
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "advisoryBoardStat",
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // Board Members
    defineField({
      name: "members",
      title: "Board Members",
      type: "array",
      of: [
        {
          type: "advisoryBoardMember",
        },
      ],
    }),

    // Philosophy
    defineField({
      name: "philosophyEyebrow",
      title: "Philosophy Eyebrow",
      type: "string",
    }),

    defineField({
      name: "philosophyTitle",
      title: "Philosophy Title",
      type: "string",
    }),

    defineField({
      name: "philosophyParagraphs",
      title: "Philosophy Paragraphs",
      type: "array",
      of: [
        {
          type: "text",
          rows: 4,
        },
      ],
    }),

    // CTA
    defineField({
      name: "cta",
      title: "Call To Action",
      type: "pageCta",
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "heroTitle",
    },

    prepare({ title, subtitle }) {
      return {
        title: title || "Advisory Board",
        subtitle,
      };
    },
  },
});
