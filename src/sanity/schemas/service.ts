/**
 * Service Schema — Professional Disciplines
 *
 * Industrial UI/UX Principles:
 * - Logical grouping by function
 * - Clear field hierarchy
 * - Minimal but powerful
 * - Business-focused workflow
 * - Production-grade validation
 *
 * @see src/content/services/index.ts for TypeScript interfaces
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    {
      name: "content",
      title: "01 // Content",
      default: true,
    },
    {
      name: "approach",
      title: "02 // Approach",
    },
    {
      name: "references",
      title: "03 // References",
    },
    {
      name: "configuration",
      title: "04 // Configuration",
    },
    {
      name: "seo",
      title: "05 // SEO",
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════
    // 01 // CONTENT
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(60),
      description: 'Professional discipline name (e.g., "Architecture", "Interior Design")',
    }),

    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "Auto-generated from title",
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
      description: "Punchy one-line description for cards and search (120 characters max)",
    }),

    defineField({
      name: "intro",
      title: "Introduction Statement",
      type: "text",
      group: "content",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
      description: "Large editorial statement shown at top of detail page (300 characters max)",
    }),

    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      group: "content",
      rows: 5,
      validation: (Rule) => Rule.required().min(100).max(800),
      description: "Long-form editorial description of how RAFA approaches this discipline",
    }),

    defineField({
      name: "coverImage",
      title: "Cover / Lead Discipline Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Accessibility description of the image",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
        {
          name: "credit",
          type: "string",
          title: "Photographer / Visualization Credit",
        },
      ],
      description:
        "Optional dedicated hero image for this service. If omitted, the lead related project's hero image is used automatically.",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 02 // APPROACH
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "approach",
      title: "Methodological Approach",
      type: "array",
      group: "approach",
      of: [
        {
          type: "object",
          name: "approachPoint",
          title: "Approach Point",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Title",
              description: 'Short title (e.g., "Context", "Materiality")',
              validation: (Rule) => Rule.required().max(30),
            },
            {
              name: "statement",
              type: "text",
              title: "Statement",
              rows: 2,
              description: "One-sentence editorial statement",
              validation: (Rule) => Rule.required().max(200),
            },
          ],
          preview: {
            select: {
              title: "title",
              statement: "statement",
            },
            prepare({ title, statement }) {
              return {
                title: title,
                subtitle: statement,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(6),
      description: "Numbered methodology points (3-6 points recommended)",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 03 // REFERENCES
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      group: "references",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
      description: "Projects that demonstrate this discipline",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 04 // CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "configuration",
      validation: (Rule) => Rule.required().integer().min(1),
      description: "Order in which service appears in listings (1 = first)",
    }),

    defineField({
      name: "editorialIntents",
      title: "Editorial Image Intents",
      type: "array",
      group: "configuration",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Design Intent", value: "design-intent" },
              { title: "Spatial Experience", value: "spatial-experience" },
              { title: "Site Relationship", value: "site-relationship" },
              { title: "Materiality", value: "materiality" },
              { title: "Construction", value: "construction" },
              { title: "Environmental", value: "environmental" },
            ],
          },
        },
      ],
      description:
        "Which project image intents are relevant for this discipline (filters related project images)",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 05 // SEO
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
          description: "Override default title for SEO (leave empty to use service title)",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "description",
          type: "text",
          title: "Meta Description",
          description:
            "Override default description for SEO (leave empty to use short description)",
          rows: 3,
          validation: (Rule) => Rule.max(300),
        },
        {
          name: "keywords",
          type: "array",
          title: "Keywords",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
          description: "SEO keywords (lowercase-with-hyphens format)",
        },
      ],
      description: "Optional SEO overrides (defaults use service data)",
    }),
  ],

  // ═══════════════════════════════════════════════════════════════════════
  // PREVIEW CONFIGURATION
  // ═══════════════════════════════════════════════════════════════════════

  preview: {
    select: {
      title: "title",
      shortDescription: "shortDescription",
      order: "order",
    },
    prepare({ title, shortDescription, order }) {
      return {
        title: title || "Untitled Service",
        subtitle: `${String(order || 0).padStart(2, "0")} · ${shortDescription || "No description"}`,
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ORDERING
  // ═══════════════════════════════════════════════════════════════════════

  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Title (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
