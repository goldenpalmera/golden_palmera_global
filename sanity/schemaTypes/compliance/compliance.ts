import { defineType } from "sanity";

defineType({
  name: "compliancePage",
  title: "Compliance Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Internal Title",
      type: "string",
    },

    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        },
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        },
      ],
    },

    {
      name: "certificationsSection",
      title: "Certification Section",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        },
        {
          name: "title",
          title: "Title",
          type: "string",
        },
      ],
    },

    {
			name: "qualitySection",
			title: "Quality Assurance",
			type: "object",
			fields: [
				{
					name: "eyebrow",
					title: "Eyebrow",
					type: "string",
				},
				{
					name: "title",
					title: "Title",
					type: "string",
				},
				{
					name: "description",
					title: "Description",
					type: "text",
					rows: 4,
				},

				{
					name: "tests",
					title: "Lab Tests",
					type: "array",
					of: [
						{
							type: "reference",
							to: [{ type: "qualityTest" }],
						},
					],
				},

				{
					name: "partners",
					title: "Inspection Partners",
					type: "array",
					of: [
						{
							type: "reference",
							to: [{ type: "inspectionPartner" }],
						},
					],
				},

				{
					name: "documents",
					title: "Documentation",
					type: "array",
					of: [
						{
							type: "reference",
							to: [{ type: "documentItem" }],
						},
					],
				},
			],
		},

    {
      name: "eudrSection",
      title: "EUDR Section",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        },
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          rows: 5,
        },
        {
          name: "stats",
          title: "Statistics",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "value",
                  title: "Value",
                  type: "string",
                },
                {
                  name: "label",
                  title: "Label",
                  type: "string",
                },
              ],
              preview: {
                select: {
                  title: "value",
                  subtitle: "label",
                },
              },
            },
          ],
        },
        {
          name: "roadmapTitle",
          title: "Roadmap Title",
          type: "string",
        },
      ],
    },

		{
			name: "milestones",
			title: "Roadmap Milestones",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "eudrMilestone" }],
				},
			],
		},

		{
			name: "certifications",
			title: "Certifications",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "certification" }],
				},
			],
		},

    {
      name: "dossierSection",
      title: "Compliance Dossier CTA",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "downloadLabel",
          title: "Download Button Label",
          type: "string",
        },
        {
          name: "downloadFile",
          title: "Compliance Dossier",
          type: "file",
        },
        {
          name: "contactLabel",
          title: "Contact Button Label",
          type: "string",
        },
      ],
    },

    {
      name: "commitment",
      title: "Commitment",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        },
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "text",
          title: "Text",
          type: "text",
          rows: 5,
        },
      ],
    },

    {
      name: "seo",
      title: "SEO",
      type: "seo",
    },
  ],
});
