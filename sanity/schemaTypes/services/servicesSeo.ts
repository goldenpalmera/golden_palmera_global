// sanity/schemaTypes/servicesPage.ts

import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "What We Do",
    }),

    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "What We Do",
    }),

    defineField({
      name: "heroTitle1",
      title: "Hero Title 1",
      type: "string",
      initialValue:
        "Building better agricultural supply chains.",
    }),

    defineField({
      name: "heroTitle2",
      title: "Hero Title 2",
      type: "string",
      initialValue:
        "Building better agricultural supply chains.",
    }),

    defineField({
      name: "heroTitle3",
      title: "Hero Title 3",
      type: "string",
      initialValue:
        "Building better agricultural supply chains.",
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
    }),

    defineField({
      name: "heroImages",
      title: "Hero Images",
      type: "array",
      description:
        "Four images used in the Services hero composition. Order: Upper Left, Upper Right, Lower Left, Lower Right.",
      validation: (Rule) =>
        Rule.required().length(4),
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "servicesIntroEyebrow",
      title: "Introduction",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "servicesIntroDescription",
      title: "Description",
      type: "text",
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