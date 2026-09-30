import { defineField, defineType } from "sanity";

export const qualityTest = defineType({
  name: "qualityTest",
  title: "Quality Test",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Test Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "name",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled Quality Test",
        subtitle: "Quality Test",
      };
    },
  },
});
