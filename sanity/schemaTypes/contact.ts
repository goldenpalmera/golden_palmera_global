import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact",
  type: "document",

  fields: [
    defineField({
      name: "reference",
      title: "Reference",
      type: "string",
      readOnly: true,
    }),

    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "email",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),

    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),

    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),

    defineField({
      name: "message",
      title: "Message",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "NEW" },
          { title: "Read", value: "READ" },
          { title: "Replied", value: "REPLIED" },
          { title: "Resolved", value: "RESOLVED" },
          { title: "Archived", value: "ARCHIVED" },
        ],
        layout: "dropdown",
      },
      initialValue: "NEW",
    }),

    /*
     * Notification email
     */

    defineField({
      name: "notificationEmailStatus",
      title: "Notification Email Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Sent", value: "sent" },
          { title: "Failed", value: "failed" },
        ],
      },
    }),

    defineField({
      name: "notificationEmailLastAttemptAt",
      title: "Notification Email Last Attempt",
      type: "datetime",
    }),

    defineField({
      name: "notificationEmailSentAt",
      title: "Notification Email Sent At",
      type: "datetime",
    }),

    defineField({
      name: "notificationEmailFailedAt",
      title: "Notification Email Failed At",
      type: "datetime",
    }),

    /*
     * Confirmation email
     */

    defineField({
      name: "confirmationEmailStatus",
      title: "Confirmation Email Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Sent", value: "sent" },
          { title: "Failed", value: "failed" },
        ],
      },
    }),

    defineField({
      name: "confirmationEmailLastAttemptAt",
      title: "Confirmation Email Last Attempt",
      type: "datetime",
    }),

    defineField({
      name: "confirmationEmailSentAt",
      title: "Confirmation Email Sent At",
      type: "datetime",
    }),

    defineField({
      name: "confirmationEmailFailedAt",
      title: "Confirmation Email Failed At",
      type: "datetime",
    }),

    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      email: "email",
      status: "status",
    },

    prepare({ title, email, status }) {
      return {
        title: title || "Contact Submission",
        subtitle: `${email || ""} · ${status || "NEW"}`,
      };
    },
  },
});
