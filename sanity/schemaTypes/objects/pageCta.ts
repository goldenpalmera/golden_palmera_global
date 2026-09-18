import { defineField, defineType } from "sanity";

export const advisoryBoardCta = defineType({
  name: "pageCta",
  title: "Call To Action",
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
      rows: 3,
    }),

    defineField({
      name: "label",
      title: "Button Label",
      type: "string",
    }),

    defineField({
      name: "href",
      title: "Button URL",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
