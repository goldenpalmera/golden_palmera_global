import { defineField, defineType } from "sanity";

export const advisoryBoardMember = defineType({
  name: "advisoryBoardMember",
  title: "Advisory Board Member",
  type: "object",

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "specialization",
      title: "Specialization",
      type: "string",
    }),

    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "linkedin",
      title: "LinkedIn Profile",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
      active: "active",
    },

    prepare({ title, subtitle, media, active }) {
      return {
        title: title || "Unnamed Member",
        subtitle: `${active === false ? "Inactive · " : ""}${subtitle || ""}`,
        media,
      };
    },
  },
});
