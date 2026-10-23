import { defineField, defineType } from "sanity";

type LinkValue = {
  type?: "internal" | "external";
  internalPath?: string;
  externalUrl?: string;
  newTab?: boolean;
};

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",

  fields: [
    defineField({
      name: "type",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Internal Page", value: "internal" },
          { title: "External URL", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "internalPath",
      title: "Internal Path",
      type: "string",
      description: "Example: /quote/request-quote or /contact",
      hidden: ({ parent }) => parent?.type !== "internal",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as LinkValue | undefined;

          if (parent?.type !== "internal") {
            return true;
          }

          if (!value) {
            return "An internal path is required";
          }

          if (!value.startsWith("/")) {
            return "Internal paths must start with /";
          }

          return true;
        }),
    }),

    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as LinkValue | undefined;

          if (parent?.type !== "external") {
            return true;
          }

          if (!value) {
            return "An external URL is required";
          }

          return true;
        }),
    }),

    defineField({
      name: "newTab",
      title: "Open in New Tab",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      type: "type",
      internalPath: "internalPath",
      externalUrl: "externalUrl",
    },

    prepare({ type, internalPath, externalUrl }) {
      return {
        title:
          type === "internal"
            ? internalPath || "Internal Page"
            : externalUrl || "External URL",
      };
    },
  },
});
