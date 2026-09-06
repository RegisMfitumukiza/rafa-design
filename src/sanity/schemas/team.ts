/**
 * Team Member Schema
 *
 * Individual people listed on the Studio page team grid and their
 * Monograph Dossier modal. Maps 1:1 to the `TeamMember` interface in
 * `src/content/studio/index.ts`.
 *
 * Industrial UI/UX Principles:
 * - Logical grouping by function
 * - Clear field hierarchy
 * - Production-grade validation
 * - `displayOnTeamPage` gate for public visibility
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  groups: [
    {
      name: "content",
      title: "01 // Content",
      default: true,
    },
    {
      name: "media",
      title: "02 // Media & Social",
    },
    {
      name: "configuration",
      title: "03 // Configuration",
    },
    {
      name: "seo",
      title: "04 // SEO",
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════
    // 01 // CONTENT
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(80),
      description: 'e.g. "Rafael Mendes"',
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
      description: "Unique identifier used for the team member id",
    }),

    defineField({
      name: "role",
      title: "Role at RAFA",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(80),
      description: 'e.g. "Founder & Lead Architect"',
    }),

    defineField({
      name: "biography",
      title: "Biography",
      type: "text",
      group: "content",
      rows: 4,
      validation: (Rule) => Rule.required().min(60).max(600),
      description: "Short editorial bio / personal story (shown in dossier modal)",
    }),

    defineField({
      name: "disciplines",
      title: "Disciplines",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: 'e.g. "Architecture", "Master Planning"',
    }),

    defineField({
      name: "interests",
      title: "Interests",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: 'e.g. "Monolithic form", "Stone construction"',
    }),

    defineField({
      name: "experience",
      title: "Years of Experience",
      type: "number",
      group: "content",
      validation: (Rule) => Rule.min(0).max(60),
      description: "Optional — used for dossier context",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 02 // MEDIA & SOCIAL
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "image",
      title: "Portrait",
      type: "image",
      group: "media",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Accessibility description of the portrait",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
      validation: (Rule) => Rule.required(),
      description: "Studio portrait / headshot (portrait 3:4 preferred)",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "media",
      validation: (Rule) => Rule.email(),
    }),

    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "media",
      description: "International format preferred",
    }),

    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "media",
      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Social Link",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Platform",
              description: 'Lowercase identifier, e.g. "instagram", "tiktok", "youtube"',
              validation: (Rule) => Rule.required().lowercase(),
            },
            {
              name: "url",
              type: "string",
              title: "URL",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "label",
              type: "string",
              title: "Label Override",
              description: 'Optional display label (e.g. "Portfolio")',
            },
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
      description: "Professional / social profiles",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 03 // CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "configuration",
      validation: (Rule) => Rule.required().integer().min(1),
      description: "Order in team grid (1 = first)",
    }),

    defineField({
      name: "category",
      title: "Category // Seniority Tier",
      type: "reference",
      to: [{ type: "teamCategory" }],
      group: "configuration",
      description:
        "Seniority tier — managed in Studio under Team Categories. Used for team ordering and future filter rails.",
    }),

    defineField({
      name: "displayOnTeamPage",
      title: "Display on Team Page",
      type: "boolean",
      group: "configuration",
      initialValue: true,
      description: "Exclude from the public team listing when false",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 04 // SEO
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
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "description",
          type: "text",
          title: "Meta Description",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
      ],
      description: "Optional SEO overrides",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "role",
      order: "order",
      media: "image",
    },
    prepare({ title, subtitle, order, media }) {
      return {
        title: title || "Untitled Team Member",
        subtitle: `${String(order || 0).padStart(2, "0")} · ${subtitle || "No role"}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name (A-Z)",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
