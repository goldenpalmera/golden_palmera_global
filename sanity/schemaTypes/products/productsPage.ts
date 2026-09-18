import { defineField, defineType } from "sanity";

export const productsPage = defineType({
  name: "productsPage",
  title: "Products Page",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Our Commodities",
    }),

    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "Our Commodities",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Quality agricultural products from Africa.",
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "portfolioEyebrow",
      title: "Portfolio Eyebrow",
      type: "string",
      initialValue: "Our product portfolio",
    }),

    defineField({
      name: "portfolioTitle",
      title: "Portfolio Title",
      type: "string",
      initialValue: "Commodities with global potential",
    }),

    defineField({
      name: "portfolioDescription",
      title: "Portfolio Description",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "supplyChain",
      title: "Supply Chain",
      type: "object",

      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Beyond sourcing",
        }),

        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "From origin to destination.",
        }),

        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        }),

        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            {
              type: "object",
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
                }),

                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 3,
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "cta",
      title: "Call to Action",
      type: "pageCta",
    }),

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
