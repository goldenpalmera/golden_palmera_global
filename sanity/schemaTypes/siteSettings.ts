import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  groups: [
    {
      name: "company",
      title: "Company",
    },
    {
      name: "footer",
      title: "Footer",
    },
    {
      name: "social",
      title: "Social",
    },
  ],

  fields: [
    // ─────────────────────────────────────────────
    // Company
    // ─────────────────────────────────────────────

    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      group: "company",
      initialValue: "Golden Palmera Global Limited",
      validation: (Rule) =>
        Rule.required().max(100),
    }),

    defineField({
      name: "companyTagline",
      title: "Company Tagline",
      type: "string",
      group: "company",
      initialValue: "Global Limited",
      validation: (Rule) =>
        Rule.max(80),
    }),

    // ─────────────────────────────────────────────
    // Footer navigation
    // ─────────────────────────────────────────────
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      group: "footer",
      rows: 4,
      validation: (Rule) =>
        Rule.max(300),
    }),

    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      group: "footer",
      initialValue: "info@goldenpalmeraglobal.com",
      validation: (Rule) =>
        Rule.required().email(),
    }),

    defineField({
      name: "location",
      title: "Business Location",
      type: "object",
      group: "footer",

      fields: [
        defineField({
          name: "country",
          title: "Country",
          type: "string",
          initialValue: "Nigeria",
          validation: (Rule) =>
            Rule.required().max(80),
        }),

        defineField({
          name: "region",
          title: "Region",
          type: "string",
          initialValue: "West Africa",
          validation: (Rule) =>
            Rule.required().max(80),
        }),
      ],

      preview: {
        select: {
          country: "country",
          region: "region",
        },

        prepare({ country, region }) {
          return {
            title: country || "Location",
            subtitle: region || "",
          };
        },
      },
    }),

    defineField({
      name: "cacNumber",
      title: "CAC Registration Number",
      type: "string",
      group: "company",
      validation: (Rule) =>
        Rule.max(50),
    }),


    // ─────────────────────────────────────────────
    // Social
    // ─────────────────────────────────────────────

    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "social",
      validation: (Rule) =>
        Rule.max(6),

      of: [
        {
          type: "object",
          name: "socialLink",

          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",

              options: {
                list: [
                  {
                    title: "LinkedIn",
                    value: "linkedin",
                  },
                  {
                    title: "Facebook",
                    value: "facebook",
                  },
                  {
                    title: "Instagram",
                    value: "instagram",
                  },
                  {
                    title: "X",
                    value: "x",
                  },
                  {
                    title: "YouTube",
                    value: "youtube",
                  },
                ],
                layout: "dropdown",
              },

              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: "url",
              title: "URL",
              type: "url",

              validation: (Rule) =>
                Rule.required()
                  .uri({
                    scheme: ["https"],
                  }),
            }),

            defineField({
              name: "label",
              title: "Accessible Label",
              type: "string",
              description:
                "Optional screen-reader label.",
            }),
          ],

          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // Trust
    // ─────────────────────────────────────────────

    defineField({
      name: "trustBadges",
      title: "Trust / Compliance Labels",
      type: "array",
      group: "footer",
      validation: (Rule) =>
        Rule.max(8),

      of: [
        {
          type: "string",
        },
      ],
    }),

    defineField({
      name: "bottomMessage",
      title: "Bottom Message",
      type: "string",
      group: "footer",
      validation: (Rule) =>
        Rule.max(180),
    }),
    defineField({
      name: "copyrightYear",
      title: "Copyright Year",
      type: "number",
      group: "footer",
      initialValue: 2026,
      validation: (Rule) =>
        Rule.integer()
          .min(2000)
          .max(2100),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
