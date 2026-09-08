/**
 * Career Schema
 *
 * Individual job posting rendered on the `/careers` page. Maps 1:1 to the
 * `CareerPosition` interface in `src/content/company/careers.ts`.
 *
 * Each posting is its own document so roles can be opened, closed, or
 * re-ordered independently of one another.
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "career",
  title: "Career / Job Posting",
  type: "document",
  groups: [
    {
      name: "content",
      title: "01 // Content",
      default: true,
    },
    {
      name: "configuration",
      title: "02 // Configuration",
    },
    {
      name: "seo",
      title: "03 // SEO",
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════
    // 01 // CONTENT
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(80),
      description: 'e.g. "Architect"',
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
    }),

    defineField({
      name: "discipline",
      title: "Discipline / Category",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Architecture", value: "Architecture" },
          { title: "Interior Architecture", value: "Interior Architecture" },
          { title: "Visualization & Media", value: "Visualization & Media" },
          { title: "Urban Design & Research", value: "Urban Design & Research" },
          { title: "Practice & Operations", value: "Practice & Operations" },
        ],
      },
      description: 'Discipline classification, e.g. "Architecture"',
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(80),
      description: 'e.g. "Kigali, Rwanda", "Remote", "Hybrid"',
    }),

    defineField({
      name: "type",
      title: "Employment Type",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Internship", value: "internship" },
          { title: "Contract", value: "contract" },
          { title: "Part-time", value: "part-time" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "content",
      rows: 4,
      validation: (Rule) => Rule.required().max(600),
    }),

    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1),
      description: "Key skills / experience needed",
    }),

    defineField({
      name: "applicationLink",
      title: "Application Link",
      type: "string",
      group: "content",
      description: "Optional external application URL (Google Forms, Typeform, etc.)",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 02 // CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "configuration",
      validation: (Rule) => Rule.required().integer().min(1),
      description: "Order in listings (1 = first)",
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "configuration",
      options: {
        list: [
          { title: "Open", value: "Open" },
          { title: "Closed", value: "Closed" },
          { title: "On Hold", value: "On Hold" },
        ],
      },
      initialValue: "Open",
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "configuration",
      initialValue: false,
      description: "Highlight this role at the top of the careers page",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 03 // SEO
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
          validation: (Rule) => Rule.max(300),
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "location",
      type: "type",
      status: "status",
      order: "order",
    },
    prepare({ title, subtitle, type, status, order }) {
      return {
        title: title || "Untitled Position",
        subtitle: `${String(order || 0).padStart(2, "0")} · ${subtitle || ""} · ${type || ""} · ${status || ""}`,
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
      title: "Status, then Order",
      name: "statusOrder",
      by: [
        { field: "status", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
});
