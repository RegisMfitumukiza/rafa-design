/**
 * Careers Page Schema
 *
 * Singleton document holding the page-level content for `/careers`:
 * hero copy, open application CTA, and lifecycle benefits. Individual job
 * postings are separate `career` documents.
 *
 * Maps 1:1 to the `CareersContent` and `Benefit` interfaces in
 * `src/content/company/careers.ts`.
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "careers",
  title: "Careers Page",
  type: "document",
  groups: [
    {
      name: "hero",
      title: "01 // Hero",
      default: true,
    },
    {
      name: "openApplication",
      title: "02 // Open Application",
    },
    {
      name: "benefits",
      title: "03 // Benefits",
    },
    {
      name: "media",
      title: "04 // Media",
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════
    // 01 // HERO
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        {
          name: "overline",
          type: "string",
          title: "Overline",
          description: 'e.g. "Careers"',
        },
        {
          name: "heading",
          type: "string",
          title: "Heading",
          validation: (Rule) => Rule.required().max(80),
        },
        {
          name: "body",
          type: "text",
          title: "Body",
          rows: 4,
          validation: (Rule) => Rule.required().max(600),
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 02 // OPEN APPLICATION
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "openApplication",
      title: "Open Application CTA",
      type: "object",
      group: "openApplication",
      fields: [
        { name: "overline", type: "string", title: "Overline" },
        { name: "heading", type: "string", title: "Heading" },
        { name: "body", type: "text", title: "Body", rows: 3 },
        { name: "cta", type: "string", title: "CTA Label" },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 03 // BENEFITS
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      group: "benefits",
      of: [
        {
          type: "object",
          name: "benefit",
          title: "Benefit",
          fields: [
            {
              name: "number",
              type: "string",
              title: "Number",
              description: 'e.g. "01"',
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
              rows: 2,
              validation: (Rule) => Rule.required().max(300),
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
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 04 // MEDIA
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "studioImage",
      title: "Studio Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
        { name: "caption", type: "string", title: "Caption" },
      ],
      description: "Full-width atelier plate shown between positions and benefits.",
    }),
  ],

  preview: {
    select: {
      title: "hero.heading",
    },
    prepare({ title }) {
      return {
        title: title || "Careers Page",
        subtitle: "Singleton",
      };
    },
  },
});
