import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",

  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "companyType",
      title: "Company Type",
      type: "string",
      description:
        "Example: International Trader, Food Manufacturer, Commodity Buyer",
    }),

    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),

    defineField({
      name: "isNamed",
      title: "Named Testimonial",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "name",
      title: "Name",
      type: "string",
      hidden: ({ parent }) => !parent?.isNamed,
    }),

    defineField({
      name: "title",
      title: "Person's Title",
      type: "string",
      hidden: ({ parent }) => !parent?.isNamed,
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
      quote: "quote",
      name: "name",
      companyType: "companyType",
      country: "country",
    },

    prepare({ quote, name, companyType, country }) {
      return {
        title: name || "Anonymous Testimonial",
        subtitle: [companyType, country, quote]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
