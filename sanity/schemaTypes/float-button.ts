import { defineField, defineType } from "sanity";

export const floatingButtons = defineType({
  name: "floatingButtons",
  title: "Floating Contact Buttons",
  type: "document",

  fields: [
    defineField({
      name: "enabled",
      title: "Enable Floating Buttons",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enabled",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "number",
          title: "WhatsApp Number",
          type: "string",
          description:
            "International format without + or spaces. Example: 2348012345678",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "message",
          title: "Default Message",
          type: "text",
          rows: 3,
          initialValue:
            "Hello, I'd like to enquire about your commodity export services.",
        }),
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          initialValue: "WhatsApp Trade Desk",
        }),
      ],
    }),

    defineField({
      name: "phoneCall",
      title: "Phone Call",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enabled",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "calendlyUrl",
          title: "Calendly URL",
          type: "url",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "label",
          title: "Button Label",
          type: "string",
          initialValue: "Book a Phone Call",
        }),
        defineField({
          name: "title",
          title: "Modal Title",
          type: "string",
          initialValue: "Book a Trade Consultation",
        }),
        defineField({
          name: "description",
          title: "Modal Description",
          type: "string",
          initialValue:
            "Schedule a phone call with our trade desk.",
        }),
        defineField({
          name: "fallbackLabel",
          title: "Fallback Link Label",
          type: "string",
          initialValue: "Open booking page in a new tab →",
        }),
      ],
    }),

    defineField({
      name: "toggleLabel",
      title: "Open Button Accessible Label",
      type: "string",
      initialValue: "Contact options",
    }),

    defineField({
      name: "closeLabel",
      title: "Close Button Accessible Label",
      type: "string",
      initialValue: "Close contact options",
    }),
  ],
});
