import { defineField, defineType } from "sanity";

export const eudrMilestone = defineType({
  name: "eudrMilestone",
  title: "EUDR Milestone",
  type: "document",

  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "quarter",
      title: "Quarter",
      type: "string",
      options: {
        list: [
          { title: "Q1", value: "Q1" },
          { title: "Q2", value: "Q2" },
          { title: "Q3", value: "Q3" },
          { title: "Q4", value: "Q4" },
        ],
      },
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "Completed" },
          { title: "In Progress", value: "In Progress" },
          { title: "Planned", value: "Planned" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      year: "year",
      quarter: "quarter",
      title: "title",
      status: "status",
    },

    prepare({ year, quarter, title, status }) {
      return {
        title: title || "Untitled Milestone",
        subtitle: [year, quarter, status].filter(Boolean).join(" · "),
      };
    },
  },
});
