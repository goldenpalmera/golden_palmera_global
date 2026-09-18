// sanity/schemaTypes/aboutPage.ts

import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",

  fields: [
    // Page
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "About Golden Palmera Global",
      validation: (Rule) => Rule.required(),
    }),

    // Hero
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "About Golden Palmera Global",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue:
        "From African agriculture to global markets.",
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
    }),


    // Who We Are
    defineField({
      name: "whoWeAreEyebrow",
      title: "Who We Are Eyebrow",
      type: "string",
      initialValue: "Who we are",
    }),

    defineField({
      name: "whoWeAreTitle",
      title: "Who We Are Title",
      type: "string",
      initialValue:
        "Building a trusted bridge between producers and the world.",
    }),

    defineField({
      name: "whoWeAreParagraphs",
      title: "Who We Are Content",
      type: "array",
      of: [
        {
          type: "text",
          rows: 4,
        },
      ],
    }),

    // Our Story
    defineField({
      name: "storyEyebrow",
      title: "Story Eyebrow",
      type: "string",
      initialValue: "Our Story",
    }),

    defineField({
      name: "storyTitle",
      title: "Story Title",
      type: "string",
      initialValue:
        "Built to close the trust gap in African agribusiness.",
    }),

    defineField({
      name: "storyParagraphs",
      title: "Story Content",
      type: "array",
      of: [
        {
          type: "text",
          rows: 5,
        },
      ],
    }),

    // Story Facts
    defineField({
      name: "storyFacts",
      title: "Story Facts",
      type: "array",
      of: [
        {
          type: "object",
          name: "storyFact",
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
        },
      ],
    }),

    // Company Stats
    defineField({
      name: "stats",
      title: "Company Statistics",
      type: "array",
      of: [
        {
          type: "object",
          name: "stat",
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
        },
      ],
    }),

    // Foundation / Values
    defineField({
      name: "foundationEyebrow",
      title: "Foundation Eyebrow",
      type: "string",
      initialValue: "Our foundation",
    }),

    defineField({
      name: "foundationTitle",
      title: "Foundation Title",
      type: "string",
      initialValue: "What guides our work",
    }),

    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        {
          type: "object",
          name: "value",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
            }),

            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "text",
              title: "Description",
              type: "text",
              rows: 4,
            }),
          ],

          preview: {
            select: {
              title: "title",
              subtitle: "number",
            },
          },
        },
      ],
    }),

    defineField({
      name: "featuredLeader",
      title: "Featured Leadership Quote",
      description:
        "Select the leadership team member whose quote should appear in the Featured Quote section.",
      type: "reference",
      to: [
        {
          type: "teamMember",
        },
      ],
      options: {
        disableNew: true,
      },
    }),


    // Mission
    defineField({
      name: "missionEyebrow",
      title: "Mission Eyebrow",
      type: "string",
      initialValue: "Our mission",
    }),

    defineField({
      name: "missionTitle",
      title: "Mission Title",
      type: "string",
      initialValue:
        "Creating value from farm to international market.",
    }),

    defineField({
      name: "missionDescription",
      title: "Mission Description",
      type: "text",
      rows: 4,
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});
