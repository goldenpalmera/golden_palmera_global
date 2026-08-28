import { defineField, defineType } from "sanity";

export const compliancePage = defineType({
  name: "compliancePage",
  title: "Compliance Page",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Compliance",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "Trust • Standards • Accountability",
    }),

  defineField({
    name: "seo",
    title: "SEO",
    type: "seo",
  }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Compliance is part of the product.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "complianceAreas",
      title: "Compliance Areas",
      type: "array",
      validation: (Rule) =>
        Rule.required().min(1).max(12),

      of: [
        {
          type: "object",
          name: "complianceArea",
          title: "Compliance Area",

          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
              description: 'Example: "01"',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "text",
              title: "Description",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "active",
              title: "Active",
              type: "boolean",
              initialValue: true,
            }),
          ],

          preview: {
            select: {
              title: "title",
              subtitle: "number",
            },
          },
        },
      ],
    }),

    defineField({
      name: "commitmentEyebrow",
      title: "Commitment Eyebrow",
      type: "string",
      initialValue: "Our Commitment",
    }),

    defineField({
      name: "commitmentTitle",
      title: "Commitment Title",
      type: "string",
      initialValue:
        "Building confidence from origin to destination.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "commitmentDescription",
      title: "Commitment Description",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});