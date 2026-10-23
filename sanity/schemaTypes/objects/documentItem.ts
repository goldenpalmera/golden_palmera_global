import { defineField, defineType } from "sanity";

export const documentItem = defineType({
  name: "documentItem",
  title: "Quality Document",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Document Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "file",
      title: "File",
      type: "file",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "description",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Document",
        subtitle: subtitle || "Quality Document",
      };
    },
  },
});
