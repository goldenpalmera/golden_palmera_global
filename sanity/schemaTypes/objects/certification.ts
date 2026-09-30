import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certification",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "shortName",
      title: "Short Name",
      type: "string",
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
          { title: "Active", value: "Active" },
          { title: "Pending", value: "Pending" },
          { title: "Expired", value: "Expired" },
          { title: "Suspended", value: "Suspended" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "certificateFile",
      title: "Certificate File",
      type: "file",
    }),

    defineField({
      name: "verifyUrl",
      title: "Verification URL",
      type: "url",
    }),
  ],

  preview: {
    select: {
      title: "name",
      shortName: "shortName",
      status: "status",
      media: "logo",
    },

    prepare({ title, shortName, status, media }) {
      return {
        title: title || "Untitled Certification",
        subtitle: [shortName, status].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
