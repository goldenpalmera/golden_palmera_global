import { defineField, defineType } from "sanity";

export const commodity = defineType({
  name: "commodity",
  title: "Commodities",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Commodity Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "scientific",
      title: "Scientific Name",
      type: "string",
    }),

    defineField({
        name: "seo",
        title: "SEO",
        type: "seo",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Commodity Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "symbol",
      title: "Display Symbol",
      type: "string",
      description:
        "Optional fallback symbol, e.g. ◉, ✿, ◌, ✦",
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: true,
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
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "scientific",
      media: "image",
    },
  },

  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});