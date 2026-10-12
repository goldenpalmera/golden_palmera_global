import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",

  fields: [
    // HERO
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "Get in touch",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroTitleLine1",
      title: "Hero Title — Line 1",
      type: "string",
      initialValue: "Let's talk",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroTitleLine2",
      title: "Hero Title — Line 2",
      type: "string",
      initialValue: "about what's next.",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Main image displayed on the Contact page hero.",
      validation: (Rule) => Rule.required(),
    }),

    // ─────────────────────────────────────
    // CONTACT INFORMATION
    // ─────────────────────────────────────

    defineField({
      name: "contactInfoEyebrow",
      title: "Contact Information Eyebrow",
      type: "string",
      initialValue: "Golden Palmera Global",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "emailLabel",
      title: "Email Label",
      type: "string",
      initialValue: "Email",
      validation: (Rule) => Rule.required().max(50),
    }),

    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      initialValue: "info@goldenpalmeraglobal.com",
      validation: (Rule) =>
        Rule.required().email(),
    }),

    defineField({
      name: "locationLabel",
      title: "Location Label",
      type: "string",
      initialValue: "Location",
      validation: (Rule) => Rule.required().max(50),
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "text",
      rows: 3,
      initialValue: "Nigeria",
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: "region",
      title: "Region",
      type: "text",
      rows: 3,
      initialValue: "West Africa",
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: "businessLabel",
      title: "Business Label",
      type: "string",
      initialValue: "Business",
      validation: (Rule) => Rule.required().max(50),
    }),

    defineField({
      name: "businessDescription",
      title: "Business Description",
      type: "text",
      rows: 4,
      initialValue:
        "Agricultural sourcing, processing, export and international trade.",
      validation: (Rule) => Rule.required().max(300),
    }),

    // ─────────────────────────────────────
    // BOTTOM CTA
    // ─────────────────────────────────────

    defineField({
      name: "bottomEyebrow",
      title: "Bottom CTA Eyebrow",
      type: "string",
      initialValue: "Global reach",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "bottomTitleLine1",
      title: "Bottom CTA Title — Line 1",
      type: "string",
      initialValue: "Rooted in Africa.",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "bottomTitleLine2",
      title: "Bottom CTA Title — Line 2",
      type: "string",
      initialValue: "Connected to the world.",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "bottomLinkText",
      title: "Bottom CTA Link Text",
      type: "string",
      initialValue: "Explore our products",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "bottomLinkUrl",
      title: "Bottom CTA Link URL",
      type: "string",
      initialValue: "/products",
      validation: (Rule) => Rule.required().max(200),
    }),

    // ─────────────────────────────────────
    // SEO
    // ─────────────────────────────────────

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Contact Page",
        subtitle: "Contact page content and hero",
      };
    },
  },
});