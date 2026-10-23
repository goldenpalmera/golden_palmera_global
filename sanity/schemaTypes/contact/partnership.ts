import { defineField, defineType } from "sanity";

export const partnershipPage = defineType({
  name: "partnershipPage",
  title: "Partnership Page",
  type: "document",

  fields: [

    // HERO
    defineField({
      name: "heroBrand",
      title: "Hero Brand",
      type: "string",
      initialValue: "Golden Palmera Global",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroReference",
      title: "Hero Reference",
      type: "string",
      initialValue: "PARTNERSHIP / 01",
      validation: (Rule) => Rule.required().max(50),
    }),

    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "Strategic partnerships",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroTitleLine1",
      title: "Hero Title — Line 1",
      type: "string",
      initialValue: "Let's build",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroTitleAccent",
      title: "Hero Title — Accent",
      type: "string",
      initialValue: "something together.",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 4,
      initialValue:
        "We believe the strongest businesses are built through the right relationships. Tell us where you see an opportunity to work together.",
      validation: (Rule) => Rule.required().max(400),
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Image displayed in the desktop and mobile partnership hero.",
      validation: (Rule) => Rule.required(),
    }),

    // ─────────────────────────────────────
    // PARTNERSHIP CONTENT
    // ─────────────────────────────────────

    defineField({
      name: "contentEyebrow",
      title: "Content Eyebrow",
      type: "string",
      initialValue: "Work with us",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "contentTitleLine1",
      title: "Content Title — Line 1",
      type: "string",
      initialValue: "Good partnerships",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "contentTitleLine2",
      title: "Content Title — Line 2",
      type: "string",
      initialValue: "create lasting value.",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "contentDescription",
      title: "Content Description",
      type: "text",
      rows: 5,
      initialValue:
        "Golden Palmera Global works across agricultural sourcing, processing, export and international trade. We are open to relationships that strengthen our supply chain, expand market access and create long-term commercial value.",
      validation: (Rule) => Rule.required().max(700),
    }),

    // ─────────────────────────────────────
    // PARTNERSHIP TYPES
    // ─────────────────────────────────────

    defineField({
      name: "partnershipTypesEyebrow",
      title: "Partnership Types Eyebrow",
      type: "string",
      initialValue: "Potential partnerships",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "partnershipTypes",
      title: "Potential Partnerships",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      initialValue: [
        "Supply & sourcing relationships",
        "International distribution",
        "Strategic commercial partnerships",
        "Processing & value addition",
        "Market development",
      ],
      validation: (Rule) =>
        Rule.required().min(1).max(12),
    }),

    // ─────────────────────────────────────
    // WHAT HAPPENS NEXT
    // ─────────────────────────────────────

    defineField({
      name: "nextStepsEyebrow",
      title: "Next Steps Eyebrow",
      type: "string",
      initialValue: "What happens next",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "nextStepsDescription",
      title: "Next Steps Description",
      type: "text",
      rows: 4,
      initialValue:
        "Share a little about your organization and the opportunity. Our team will review your proposal and get back to you directly.",
      validation: (Rule) => Rule.required().max(400),
    }),

    // ─────────────────────────────────────
    // FORM INTRO
    // ─────────────────────────────────────

    defineField({
      name: "formEyebrow",
      title: "Form Eyebrow",
      type: "string",
      initialValue: "Start the conversation",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "formTitleLine1",
      title: "Form Title — Line 1",
      type: "string",
      initialValue: "Tell us about",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "formTitleLine2",
      title: "Form Title — Line 2",
      type: "string",
      initialValue: "your opportunity.",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "formDescription",
      title: "Form Description",
      type: "text",
      rows: 4,
      initialValue:
        "Give us enough information to understand your organization, objectives and how we might work together.",
      validation: (Rule) => Rule.required().max(400),
    }),

    // ─────────────────────────────────────
    // CLOSING STATEMENT
    // ─────────────────────────────────────

    defineField({
      name: "closingEyebrow",
      title: "Closing Eyebrow",
      type: "string",
      initialValue: "Long-term thinking",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "closingTitleLine1",
      title: "Closing Title — Line 1",
      type: "string",
      initialValue: "Built on relationships.",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "closingTitleLine2",
      title: "Closing Title — Line 2",
      type: "string",
      initialValue: "Driven by opportunity.",
      validation: (Rule) => Rule.required().max(100),
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
        title: "Partnership Page",
        subtitle: "Partnership page content and hero",
      };
    },
  },
});