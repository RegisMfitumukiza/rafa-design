/**
 * Sustainability Page Schema
 *
 * Singleton document defining the content for the `/sustainability` page:
 * - 01 // Hero & Manifesto
 * - 02 // Philosophy
 * - 03 // Material Media
 * - 04 // Four Commitments (Pillars)
 * - 05 // Guiding Principles
 * - 06 // Environmental Frameworks & Certifications
 * - 07 // Collaboration Call to Action
 * - 08 // SEO Overrides
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "sustainability",
  title: "Sustainability Page",
  type: "document",
  groups: [
    {
      name: "hero",
      title: "01 // Hero & Manifesto",
      default: true,
    },
    {
      name: "philosophy",
      title: "02 // Philosophy",
    },
    {
      name: "media",
      title: "03 // Material Media",
    },
    {
      name: "commitments",
      title: "04 // Four Commitments",
    },
    {
      name: "principles",
      title: "05 // Guiding Principles",
    },
    {
      name: "certifications",
      title: "06 // Frameworks & Certifications",
    },
    {
      name: "collaboration",
      title: "07 // Collaboration CTA",
    },
    {
      name: "seo",
      title: "08 // SEO",
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════
    // 01 // HERO & MANIFESTO
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "manifesto",
      title: "Manifesto / Intro",
      type: "object",
      group: "hero",
      fields: [
        {
          name: "overline",
          type: "string",
          title: "Overline",
          description: 'e.g. "Environmental Responsibility // Ecological Stewardship"',
        },
        {
          name: "heading",
          type: "string",
          title: "Heading",
          validation: (Rule) => Rule.required().max(120),
          description: 'e.g. "Architecture that endures — for people and for the planet."',
        },
        {
          name: "body",
          type: "text",
          title: "Lead Body",
          rows: 4,
          validation: (Rule) => Rule.required().max(600),
          description: "Editorial introduction to the studio's environmental approach.",
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 02 // PHILOSOPHY
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "philosophy",
      title: "Philosophy Statement",
      type: "object",
      group: "philosophy",
      fields: [
        {
          name: "heading",
          type: "string",
          title: "Heading",
          validation: (Rule) => Rule.required().max(120),
          description: 'e.g. "Good architecture is inherently sustainable."',
        },
        {
          name: "body",
          type: "text",
          title: "Body Copy",
          rows: 5,
          validation: (Rule) => Rule.required().max(800),
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 03 // MATERIAL MEDIA
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "materialImage",
      title: "Material Study Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
          description: 'e.g. "Material samples at the studio table — stone, timber, and earth."',
        },
      ],
      description:
        "Full-width architectural plate illustrating material study and natural textures.",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 04 // FOUR COMMITMENTS
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "commitments",
      title: "Core Commitments",
      type: "array",
      group: "commitments",
      of: [
        {
          type: "object",
          name: "commitment",
          title: "Commitment",
          fields: [
            {
              name: "number",
              type: "string",
              title: "Index Number",
              description: 'e.g. "01", "02"',
            },
            {
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required().max(80),
            },
            {
              name: "description",
              type: "text",
              title: "Description",
              rows: 3,
              validation: (Rule) => Rule.required().max(600),
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              number: "number",
            },
            prepare({ title, subtitle, number }) {
              return {
                title: number ? `${number} // ${title || "Untitled"}` : title || "Untitled",
                subtitle: subtitle || "",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 05 // GUIDING PRINCIPLES
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "principles",
      title: "Guiding Principles",
      type: "array",
      group: "principles",
      of: [{ type: "string" }],
      description: "Concise architectural tenets and design aphorisms.",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 06 // FRAMEWORKS & CERTIFICATIONS
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "certifications",
      title: "Environmental Frameworks & Standards",
      type: "array",
      group: "certifications",
      of: [
        {
          type: "object",
          name: "certification",
          title: "Framework / Certification",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Standard Name",
              description: 'e.g. "BREEAM", "Passive House", "LEED"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "string",
              title: "Scope / Full Title",
              description: 'e.g. "Building Research Establishment Environmental Assessment Method"',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "description",
            },
          },
        },
      ],
      description: "Building standards, ecological ratings, and benchmark certifications.",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 07 // COLLABORATION CALL TO ACTION
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "collaboration",
      title: "Collaboration Call to Action",
      type: "object",
      group: "collaboration",
      fields: [
        {
          name: "heading",
          type: "string",
          title: "Heading",
          validation: (Rule) => Rule.required().max(100),
          description: 'e.g. "Sustainable architecture starts with the brief."',
        },
        {
          name: "body",
          type: "text",
          title: "Body Text",
          rows: 3,
          validation: (Rule) => Rule.required().max(400),
        },
        {
          name: "cta",
          type: "string",
          title: "CTA Button Label",
          description: 'e.g. "Start a conversation"',
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 08 // SEO
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "seo",
      title: "SEO Override",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Meta Title",
          validation: (Rule) => Rule.max(70),
        },
        {
          name: "description",
          type: "text",
          title: "Meta Description",
          rows: 3,
          validation: (Rule) => Rule.max(300),
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "manifesto.heading",
    },
    prepare({ title }) {
      return {
        title: title || "Sustainability Page",
        subtitle: "Singleton // Environmental Stewardship",
      };
    },
  },
});
