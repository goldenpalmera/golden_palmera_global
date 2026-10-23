import { defineField, defineType } from "sanity";

export const advisoryBoardPage = defineType({
  name: "advisoryBoardPage",
  title: "Advisory Board Page",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Advisory Board",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "Governance & Expertise",
    }),

    defineField({
        name: "seo",
        title: "SEO",
        type: "seo",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Advisory Board",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "members",
      title: "Board Members",
      type: "array",

      of: [
        {
          type: "object",
          name: "boardMember",
          title: "Board Member",

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
              name: "description",
              title: "Description",
              type: "text",
              rows: 5,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "image",
              title: "Photo",
              type: "image",
              options: {
                hotspot: true,
              },
            }),

            defineField({
              name: "linkedin",
              title: "LinkedIn URL",
              type: "url",
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
            },
          },
        },
      ],
    }),

    defineField({
      name: "philosophyEyebrow",
      title: "Philosophy Eyebrow",
      type: "string",
      initialValue: "Our Approach",
    }),

    defineField({
      name: "philosophyTitle",
      title: "Philosophy Title",
      type: "string",
      initialValue:
        "Experience that strengthens every link in the chain.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "philosophyParagraphs",
      title: "Philosophy",
      type: "array",

      of: [
        {
          type: "text",
        },
      ],

      validation: (Rule) =>
        Rule.required().min(1).max(5),
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});