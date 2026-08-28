import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",

  fields: [
    defineField({
      name: "number",
      title: "Service Number",
      type: "string",
      description: "Example: 01, 02, 03",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Example: SOURCE, PROCESS, TRADE",
      validation: (Rule) => Rule.required(),
    }),

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
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "items",
      title: "Service Items",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    }),

    defineField({
      name: "image",
      title: "Service Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "featured",
      title: "Featured Service",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the order services appear on the website.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});