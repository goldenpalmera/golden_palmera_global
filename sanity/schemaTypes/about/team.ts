import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Leadership Team",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(2).max(100),
    }),

    defineField({
      name: "role",
      title: "Position / Role",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(120),
    }),

    defineField({
      name: "department",
      title: "Department",
      type: "string",
    }),

    defineField({
      name: "image",
      title: "Profile Photo",
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
      validation: (Rule) =>
        Rule.max(600),
    }),

    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "linkedIn",
      title: "LinkedIn Profile",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      validation: (Rule) =>
        Rule.integer().min(0),
    }),

    defineField({
      name: "isAdvisoryBoard",
      title: "Advisory Board Member",
      description:
        "Advisory board members are excluded from the main leadership section.",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
			name: "quote",
			title: "Leadership Quote",
			description:
					"Optional quote that can be displayed when this team member is selected as the featured leader on the About Page.",
			type: "text",
			rows: 5,
			validation: (Rule) =>
					Rule.max(600),
		}),

  ],

  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },

  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
      by: [
        {
          field: "order",
          direction: "asc",
        },
      ],
    },
  ],
});
