import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "email",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),

    defineField({
      name: "message",
      title: "Message",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "NEW" },
          { title: "Read", value: "READ" },
          { title: "Replied", value: "REPLIED" },
          { title: "Resolved", value: "RESOLVED" },
          { title: "Archived", value: "ARCHIVED" },
        ],
        layout: "dropdown",
      },
      initialValue: "NEW",
    }),

    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      email: "email",
      status: "status",
    },

    prepare({ title, email, status }) {
      return {
        title: title || "Contact Submission",
        subtitle: `${email || ""} · ${status || "NEW"}`,
      };
    },
  },
});