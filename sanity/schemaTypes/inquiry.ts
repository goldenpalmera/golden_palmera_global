import { defineField, defineType } from "sanity";

export const inquiry = defineType({
  name: "inquiry",
  title: "Inquiry",
  type: "document",

  fields: [
    defineField({
      name: "reference",
      title: "Reference",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(50),
      readOnly: true,
    }),

    defineField({
      name: "type",
      title: "Inquiry Type",
      type: "string",
      options: {
        list: [
          {
            title: "Product Inquiry",
            value: "product",
          },
          {
            title: "General Contact",
            value: "general",
          },
          {
            title: "Partnership",
            value: "partnership",
          },
          {
            title: "Export / Buyer",
            value: "export_buyer",
          },
        ],
        layout: "dropdown",
      },
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          {
            title: "New",
            value: "NEW",
          },
          {
            title: "In Progress",
            value: "IN_PROGRESS",
          },
          {
            title: "Contacted",
            value: "CONTACTED",
          },
          {
            title: "Resolved",
            value: "RESOLVED",
          },
          {
            title: "Rejected",
            value: "REJECTED",
          },
        ],
      },
      initialValue: "NEW",
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(100),
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().email(),
    }),

    defineField({
      name: "phone",
      title: "Phone / WhatsApp",
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
      name: "product",
      title: "Product",
      type: "string",
    }),

    defineField({
      name: "quantity",
      title: "Quantity",
      type: "string",
    }),

    defineField({
      name: "packaging",
      title: "Packaging",
      type: "string",
    }),

    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
    }),

    defineField({
      name: "organizationType",
      title: "Organisation Type",
      type: "string",
    }),

    defineField({
      name: "market",
      title: "Market / Region",
      type: "string",
    }),

    defineField({
      name: "companyWebsite",
      title: "Company Website",
      type: "url",
    }),

    defineField({
      name: "partnershipFocus",
      title: "Partnership Focus",
      type: "string",
    }),

    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 8,
    }),

    defineField({
  name: "requestId",
  title: "Request ID",
  type: "string",
  readOnly: true,
}),


    defineField({
      name: "emailStatus",
      title: "Email Status",
      type: "string",
      options: {
        list: [
          {
            title: "Pending",
            value: "pending",
          },
          {
            title: "Sent",
            value: "sent",
          },
          {
            title: "Failed",
            value: "failed",
          },
        ],
      },
      initialValue: "pending",
    }),

    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "lastEmailAttemptAt",
      title: "Last Email Attempt",
      type: "datetime",
    }),

    defineField({
      name: "statusHistory",
      title: "Status History",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: [
                  {
                    title: "New",
                    value: "NEW",
                  },
                  {
                    title: "In Progress",
                    value: "IN_PROGRESS",
                  },
                  {
                    title: "Contacted",
                    value: "CONTACTED",
                  },
                  {
                    title: "Resolved",
                    value: "RESOLVED",
                  },
                  {
                    title: "Rejected",
                    value: "REJECTED",
                  },
                ],
              },
            }),

            defineField({
              name: "changedAt",
              title: "Changed At",
              type: "datetime",
            }),

            defineField({
              name: "changedBy",
              title: "Changed By",
              type: "string",
            }),
          ],

          preview: {
            select: {
              status: "status",
              changedAt: "changedAt",
              changedBy: "changedBy",
            },

            prepare({
              status,
              changedAt,
              changedBy,
            }) {
              return {
                title: status,
                subtitle: [
                  changedAt,
                  changedBy,
                ]
                  .filter(Boolean)
                  .join(" • "),
              };
            },
          },
        },
      ],
    }),
  ],

  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [
        {
          field: "submittedAt",
          direction: "desc",
        },
      ],
    },
  ],

  preview: {
    select: {
      reference: "reference",
      name: "name",
      company: "company",
      status: "status",
      submittedAt: "submittedAt",
    },

    prepare({
      reference,
      name,
      company,
      status,
      submittedAt,
    }) {
      return {
        title:
          `${reference} — ${name}`,

        subtitle: [
          company,
          status,
          submittedAt
            ? new Date(
                submittedAt
              ).toLocaleDateString()
            : "",
        ]
          .filter(Boolean)
          .join(" • "),
      };
    },
  },
});
