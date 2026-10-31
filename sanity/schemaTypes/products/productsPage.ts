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

    // HERO SECTION
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Our Commodities",
        }),

        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "Quality agricultural products from Africa.",
        }),

        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        }),

        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
          options: {
            hotspot: true,
          },
          description:
            "Main image displayed in the Products page hero.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // PORTFOLIO SECTION
    defineField({
      name: "portfolio",
      title: "Product Portfolio",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Our product portfolio",
        }),

        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "Commodities with global potential",
        }),

        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        }),
      ],
    }),

    // SUPPLY CHAIN SECTION
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

    // CALL TO ACTION
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "pageCta",
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
