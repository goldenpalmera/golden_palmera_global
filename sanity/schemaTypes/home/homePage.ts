import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",

  fields: [
    // HERO
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "West Africa's Premier Agribusiness Export House",
        }),

        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "From trusted",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "titleAccent",
          title: "Title Accent",
          type: "string",
          initialValue: "origins",
        }),

        defineField({
          name: "titleEnd",
          title: "Title Ending",
          type: "string",
          initialValue: "to global markets.",
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
        }),
      ],
    }),

    // INTRO
    defineField({
      name: "intro",
      title: "Introduction",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Section Label",
          type: "string",
          initialValue: "01 — THE COMPANY",
        }),

        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Building bridges between",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "headingAccent",
          title: "Heading Accent",
          type: "string",
          initialValue: " agriculture and opportunity.",
        }),

        defineField({
          name: "largeCopy",
          title: "Large Copy",
          type: "text",
          rows: 5,
        }),

        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 5,
        }),

        defineField({
          name: "linkText",
          title: "Link Text",
          type: "string",
          initialValue: "Work with us",
        }),

        defineField({
          name: "linkHref",
          title: "Link URL",
          type: "string",
          initialValue: "#contact",
        }),

        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),

    defineField({
      name: "featuredProducts",
      title: "Featured Products",
      type: "array",
      validation: (Rule) => Rule.max(8),
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
          options: {
            filter: "active == true",
          },
        },
      ],
    }),

    defineField({
      name: "featuredServices",
      title: "Featured Services",
      type: "array",
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: "reference",
          to: [{ type: "service" }],
          options: {
            filter: "active == true",
          },
        },
      ],
    }),

    defineField({
      name: "featuredApproaches",
      title: "Featured Approaches",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "approach" }],
          options: {
            filter: "active == true",
          },
        },
      ],
    }),

    defineField({
      name: "featuredCaseStudies",
      title: "Featured Case Studies",
      type: "array",
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: "reference",
          to: [{ type: "caseStudy" }],
          options: {
            filter: "active == true",
          },
        },
      ],
    }),

    defineField({
      name: "featuredTestimonials",
      title: "Featured Testimonials",
      type: "array",
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }],
          options: {
            filter: "active == true",
          },
        },
      ],
    }),

    // Quality
    defineField({
      name: "quality",
      title: "Quality Assurance",
      type: "object",

      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Quality Assurance",
        }),

        defineField({
          name: "title",
          title: "Heading",
          type: "string",
          initialValue:
            "Every Shipment. Independently Verified.",
        }),

        defineField({
          name: "description",
          title: "Subheading",
          type: "text",
          rows: 3,
          initialValue:
            "Third-party inspection on every lot. No exceptions, no shortcuts.",
        }),

        defineField({
          name: "tests",
          title: "Lab Testing",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "qualityTest" }],
              options: {
                filter: "active == true",
              },
            },
          ],
        }),

        defineField({
          name: "partners",
          title: "Inspection Partners",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "inspectionPartner" }],
              options: {
                filter: "active == true",
              },
            },
          ],
        }),

        defineField({
          name: "documents",
          title: "Documentation Package",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "documentItem" }],
              options: {
                filter: "active == true",
              },
            },
          ],
        }),

        defineField({
          name: "sampleDocumentLabel",
          title: "Sample Document Link Label",
          type: "string",
          initialValue: "Download sample doc set",
        }),

        defineField({
          name: "sampleDocument",
          title: "Sample Document",
          type: "file",
        }),
      ],
    }),

    // CONTACT
    defineField({
      name: "contact",
      title: "Contact CTA",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "05 — LET'S CONNECT",
        }),

        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Let's take your",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "headingAccent",
          title: "Heading Accent",
          type: "string",
          initialValue: "commodity further.",
        }),

        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        }),

        defineField({
          name: "email",
          title: "Email",
          type: "string",
          initialValue: "info@goldenpalmera.com",
        }),
      ],
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
      title: "hero.title",
      media: "hero.image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Homepage",
        subtitle: "Homepage Content",
        media,
      };
    },
  },
});
