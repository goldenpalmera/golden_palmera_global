import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",

  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
        }),
        defineField({
          name: "highlight",
          title: "Highlighted Headline",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
        }),
      ],
    }),

    defineField({
      name: "intro",
      title: "Introduction",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
      ],
    }),

    defineField({
      name: "supplyChain",
      title: "Supply Chain",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
  ],
});