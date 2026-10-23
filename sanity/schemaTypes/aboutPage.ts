// sanity/schemaTypes/aboutPage.ts

import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "About Golden Palmera Global",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "About Golden Palmera Global",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue:
        "From African agriculture to global markets.",
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "whoWeAreEyebrow",
      title: "Who We Are Eyebrow",
      type: "string",
      initialValue: "Who we are",
    }),

    defineField({
      name: "whoWeAreTitle",
      title: "Who We Are Title",
      type: "string",
      initialValue:
        "Building a trusted bridge between producers and the world.",
    }),

    defineField({
      name: "whoWeAreParagraphs",
      title: "Who We Are Content",
      type: "array",
      of: [{ type: "text" }],
    }),

    defineField({
      name: "foundationEyebrow",
      title: "Foundation Eyebrow",
      type: "string",
      initialValue: "Our foundation",
    }),

    defineField({
      name: "foundationTitle",
      title: "Foundation Title",
      type: "string",
      initialValue: "What guides our work",
    }),

    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        {
          type: "object",
          name: "value",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
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
      name: "missionEyebrow",
      title: "Mission Eyebrow",
      type: "string",
      initialValue: "Our mission",
    }),

    defineField({
      name: "missionTitle",
      title: "Mission Title",
      type: "string",
      initialValue:
        "Creating value from farm to international market.",
    }),

    defineField({
      name: "missionDescription",
      title: "Mission Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});