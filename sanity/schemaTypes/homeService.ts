import { defineField, defineType } from "sanity";

export const homeService = defineType({
  name: "homeService",
  title: "HomeServices",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "number",
      title: "Number",
      type: "string",
      description: "Example: 01",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 1,
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
      subtitle: "shortDescription",
      media: "coverImage",
    },
  },

  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});