// sanity/schemaTypes/homePage.ts

import { defineField, defineType } from "sanity";

export const homePageSeo = defineType({
  name: "homePageSeo",
  title: "HomepageSeo",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Golden Palmera Global",
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