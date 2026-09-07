/**
 * Process Page Schema
 *
 * Singleton document defining the content for the `/process` page:
 * - 01 // Hero & Header
 * - 02 // Methodology Steps (6-phase architectural sequence)
 * - 03 // Built Proof Transition
 * - 04 // Closing Call to Action
 * - 05 // SEO Overrides
 *
 * Industrial UI/UX Principles:
 * - Clear editorial grouping
 * - Strong field validation
 * - Single source of truth for the process sequence
 */

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "processPage",
  title: "Process Page",
  type: "document",
  groups: [
    {
      name: "hero",
      title: "01 // Hero & Intro",
      default: true,
    },
    {
      name: "methodology",
      title: "02 // Methodology Steps",
    },
    {
      name: "proof",
      title: "03 // Built Proof",
    },
    {
      name: "cta",
      title: "04 // Call to Action",
    },
    {
      name: "seo",
      title: "05 // SEO",
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════
    // 01 // HERO & INTRO
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "heroOverline",
      title: "Hero Overline",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.max(80),
      description: 'e.g. "Specification // Methodology"',
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required().max(80),
      description: 'Main display heading — e.g. "Methodology"',
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      group: "hero",
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
      description: "Lead editorial statement explaining the studio's architectural methodology.",
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image (Work in Progress)",
      type: "image",
      group: "hero",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Accessibility description of the hero image",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
          description:
            'Mono caption beneath hero — e.g. "Material samples and study models at the work table"',
        },
      ],
      description: 'Cinematic lead plate representing the studio "work in progress".',
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 02 // METHODOLOGY STEPS
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "steps",
      title: "Methodology Steps",
      type: "array",
      group: "methodology",
      of: [
        defineArrayMember({
          type: "object",
          name: "processStep",
          title: "Process Phase",
          fields: [
            defineField({
              name: "order",
              title: "Phase Number",
              type: "number",
              validation: (Rule) => Rule.required().integer().min(1).max(20),
              description: "Sequence order (1 = Discovery, 2 = Concept, etc.)",
            }),
            defineField({
              name: "title",
              title: "Phase Title",
              type: "string",
              validation: (Rule) => Rule.required().max(80),
              description: 'e.g. "Discovery", "Design Development"',
            }),
            defineField({
              name: "duration",
              title: "Duration",
              type: "string",
              validation: (Rule) => Rule.max(40),
              description: 'Typical timeframe — e.g. "4 – 8 weeks"',
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required().max(800),
              description: "Detailed narrative describing what occurs during this phase.",
            }),
            defineField({
              name: "deliverables",
              title: "Key Deliverables",
              type: "array",
              of: [{ type: "string" }],
              options: {
                layout: "tags",
              },
              description: 'Tags for deliverables — e.g. "Concept Drawings", "Site Analysis"',
            }),
            defineField({
              name: "visual",
              title: "Evidence Plate (Optional)",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alt Text",
                },
                {
                  name: "caption",
                  type: "string",
                  title: "Caption",
                },
              ],
              description: "Full-width editorial evidence image shown beneath the phase row.",
            }),
          ],
          preview: {
            select: {
              title: "title",
              order: "order",
              duration: "duration",
              media: "visual",
            },
            prepare({ title, order, duration, media }) {
              return {
                title: `${String(order || 0).padStart(2, "0")} // ${title || "Untitled Phase"}`,
                subtitle: duration ? `Duration: ${duration}` : "No duration specified",
                media,
              };
            },
          },
        }),
      ],
      description: "The sequenced phases of the studio's architectural methodology.",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 03 // BUILT PROOF
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "proof",
      title: "Built Proof Transition",
      type: "object",
      group: "proof",
      fields: [
        defineField({
          name: "overline",
          title: "Overline",
          type: "string",
          description: 'e.g. "Specification // Evidence"',
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description: 'e.g. "Built Proof"',
        }),
        defineField({
          name: "body",
          title: "Body Copy",
          type: "text",
          rows: 3,
          description: "Transition statement linking the methodology to completed buildings.",
        }),
        defineField({
          name: "actionText",
          title: "Action Link Label",
          type: "string",
          description: 'e.g. "See the Work"',
        }),
        defineField({
          name: "actionUrl",
          title: "Action Link URL",
          type: "string",
          description: 'e.g. "/projects"',
        }),
      ],
      description: "Editorial transition section linking the process to projects archive.",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 04 // CALL TO ACTION
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "cta",
      title: "Closing Call to Action",
      type: "object",
      group: "cta",
      fields: [
        defineField({
          name: "overline",
          title: "Overline",
          type: "string",
          description: 'e.g. "Collaboration // Next Steps"',
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description: 'e.g. "Have a project in mind?"',
        }),
        defineField({
          name: "body",
          title: "Body Copy",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "action",
          title: "Button Label",
          type: "string",
          description: 'e.g. "Start a project"',
        }),
        defineField({
          name: "actionUrl",
          title: "Button Link",
          type: "string",
          description: 'e.g. "/contact"',
        }),
      ],
      description: "Closing call to action guiding prospective clients to inquiry.",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 05 // SEO
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "seo",
      title: "SEO Overrides",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
      ],
      description: "Optional metadata overrides for search engines and social cards.",
    }),
  ],

  preview: {
    select: {
      title: "heroTitle",
      subtitle: "heroOverline",
      media: "heroImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Process Page",
        subtitle: subtitle || "Methodology & Sequence",
        media,
      };
    },
  },
});
