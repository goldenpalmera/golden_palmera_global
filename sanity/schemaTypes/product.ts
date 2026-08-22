import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "botanicalName",
      title: "Botanical Name",
      type: "string",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Agricultural Commodity", value: "agricultural-commodity" },
          { title: "Processed Product", value: "processed-product" },
          { title: "Oil & Derivatives", value: "oil-derivatives" },
          { title: "Other", value: "other" },
        ],
      },
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),

    defineField({
      name: "image",
      title: "Main Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "gallery",
      title: "Product Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      name: "origin",
      title: "Origin",
      type: "string",
    }),

    defineField({
      name: "processing",
      title: "Processing / Preparation",
      type: "string",
    }),

    defineField({
      name: "grade",
      title: "Grade / Specification",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "minimumOrder",
      title: "Minimum Order Quantity",
      type: "string",
    }),

    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
    }),

    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "forms",
      title: "Available Forms",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    }),

    defineField({
      name: "packaging",
      title: "Packaging Options",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    }),

    defineField({
      name: "applications",
      title: "Applications",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    }),

    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "botanicalName",
      media: "image",
    },
  },
});