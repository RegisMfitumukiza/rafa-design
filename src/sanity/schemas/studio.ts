/**
 * Studio Schema
 *
 * Single source of truth for the studio's identity and the data rendered on
 * the `/studio` page. Maps 1:1 to the `Studio` interface plus the separate
 * `awards`, `timeline`, and `clientSectors` collections in
 * `src/content/studio/index.ts`.
 *
 * Designed as a singleton document (one `studio` record) so the Studio page
 * resolves in a single GROQ hit with no N+1 queries.
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "studio",
  title: "Studio",
  type: "document",
  groups: [
    {
      name: "content",
      title: "01 // Content",
      default: true,
    },
    {
      name: "principles",
      title: "02 // Principles & Methods",
    },
    {
      name: "media",
      title: "03 // Media",
    },
    {
      name: "history",
      title: "04 // History & Evidence",
    },
    {
      name: "visit",
      title: "05 // Visit",
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════
    // 01 // CONTENT
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "name",
      title: "Studio Name",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(60),
    }),

    defineField({
      name: "overline",
      title: "Overline",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
      description: 'e.g. "Architecture & Interior Design // Porto"',
    }),

    defineField({
      name: "manifesto",
      title: "Manifesto",
      type: "text",
      group: "content",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),

    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      group: "content",
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
    }),

    defineField({
      name: "philosophy",
      title: "Philosophy",
      type: "text",
      group: "content",
      rows: 4,
      validation: (Rule) => Rule.required().max(600),
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 02 // PRINCIPLES & METHODS
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "beliefs",
      title: "Principles / Beliefs",
      type: "array",
      group: "principles",
      of: [
        {
          type: "object",
          name: "principle",
          title: "Principle",
          fields: [
            {
              name: "code",
              type: "string",
              title: "Code",
              description: 'e.g. "PRINCIPLE 01"',
              validation: (Rule) => Rule.required().max(30),
            },
            {
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required().max(60),
            },
            {
              name: "statement",
              type: "text",
              title: "Statement",
              rows: 2,
              validation: (Rule) => Rule.required().max(300),
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "statement",
            },
          },
        },
      ],
    }),

    defineField({
      name: "workingMethods",
      title: "Working Methods",
      type: "array",
      group: "principles",
      of: [
        {
          type: "object",
          name: "workingMethod",
          title: "Working Method",
          fields: [
            {
              name: "code",
              type: "string",
              title: "Code",
              description: 'e.g. "METHOD 01"',
              validation: (Rule) => Rule.required().max(30),
            },
            {
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required().max(60),
            },
            {
              name: "description",
              type: "text",
              title: "Description",
              rows: 3,
              validation: (Rule) => Rule.required().max(400),
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 03 // MEDIA
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "atelierImage",
      title: "Studio Atelier / Practice Overview Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
        { name: "caption", type: "string", title: "Caption" },
        { name: "credit", type: "string", title: "Credit" },
      ],
      description:
        "Official photograph of the practice atelier / studio in Kigali. Used as the default visual on the Services index page before hovering on a specific discipline.",
    }),

    defineField({
      name: "images",
      title: "Studio Images",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
            { name: "caption", type: "string", title: "Caption" },
            { name: "credit", type: "string", title: "Credit" },
          ],
        },
      ],
      description: "Order matters: [0] is the hero opener, [1] is the atelier plate.",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 04 // HISTORY & EVIDENCE
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "history",
      title: "History Narrative",
      type: "text",
      group: "history",
      rows: 4,
      description: "Intro paragraph for the timeline section",
    }),

    defineField({
      name: "timeline",
      title: "Timeline",
      type: "array",
      group: "history",
      of: [
        {
          type: "object",
          name: "timelineEvent",
          title: "Timeline Event",
          fields: [
            {
              name: "year",
              type: "number",
              title: "Year",
              validation: (Rule) => Rule.required().min(1900).max(2100),
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
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "year",
            },
          },
        },
      ],
    }),

    defineField({
      name: "awards",
      title: "Awards & Honors",
      type: "array",
      group: "history",
      of: [
        {
          type: "object",
          name: "award",
          title: "Award",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required().max(120),
            },
            {
              name: "organization",
              type: "string",
              title: "Organization",
              validation: (Rule) => Rule.required().max(80),
            },
            {
              name: "year",
              type: "number",
              title: "Year",
              validation: (Rule) => Rule.min(1900).max(2100),
            },
            { name: "project", type: "string", title: "Project" },
            { name: "citation", type: "text", title: "Citation", rows: 3 },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "organization",
            },
          },
        },
      ],
    }),

    defineField({
      name: "clientSectors",
      title: "Client Sectors",
      type: "array",
      group: "history",
      of: [
        {
          type: "object",
          name: "clientSector",
          title: "Client Sector",
          fields: [
            {
              name: "code",
              type: "string",
              title: "Code",
              description: 'e.g. "SECTOR 01"',
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
            {
              name: "projects",
              type: "array",
              title: "Projects",
              of: [{ type: "string" }],
            },
            {
              name: "clients",
              type: "array",
              title: "Clients",
              of: [{ type: "string" }],
            },
            {
              name: "collaborators",
              type: "array",
              title: "Collaborators",
              of: [{ type: "string" }],
            },
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        },
      ],
    }),

    defineField({
      name: "clientReferencesNote",
      title: "Client References Note",
      type: "string",
      group: "history",
      description: 'Footer note, e.g. "Full client references available on request."',
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 05 // VISIT
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "visit",
      title: "Visit Studio",
      type: "object",
      group: "visit",
      fields: [
        {
          name: "overline",
          type: "string",
          title: "Overline",
          description: 'e.g. "The Studio // Porto"',
        },
        {
          name: "heading",
          type: "string",
          title: "Heading",
        },
        {
          name: "body",
          type: "text",
          title: "Body",
          rows: 3,
        },
        {
          name: "visits",
          type: "string",
          title: "Visits Note",
          description: 'e.g. "Studio visits by appointment"',
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "overline",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Studio",
        subtitle: subtitle || "Studio",
      };
    },
  },
});
