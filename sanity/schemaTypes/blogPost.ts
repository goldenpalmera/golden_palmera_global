import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "post",
  title: "Blog Articles",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Article Title",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
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
      name: "author",
      title: "Author",
      type: "string",
    }),

    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Agriculture", value: "agriculture" },
          { title: "Agribusiness", value: "agribusiness" },
          { title: "Commodity Markets", value: "commodity-markets" },
          { title: "Export & Trade", value: "export-trade" },
          { title: "Palm Oil", value: "palm-oil" },
          { title: "Sustainability", value: "sustainability" },
          { title: "Company News", value: "company-news" },
        ],
      },
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "body",
      title: "Article Body",
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
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      initialValue: false,
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

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),

        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),

        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
        }),

        defineField({
          name: "ogImage",
          title: "Social / Open Graph Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },

  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});