import { defineField, defineType } from "sanity";

export const advisoryBoardStat = defineType({
  name: "advisoryBoardStat",
  title: "Advisory Board Stat",
  type: "object",

  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "value",
      subtitle: "label",
    },
  },
});
