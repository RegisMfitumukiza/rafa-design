/**
 * Page Intros Schema
 *
 * Singleton document holding the editorial introduction copy for top-level
 * pages — the overline, title, description, and (where used) CTA that appear
 * in the 12-column editorial headers. Lets admins edit page introductions
 * without touching the codebase, with the static `pageContent` module as
 * fallback when this document is empty.
 *
 * Maps 1:1 to the `PageIntro` interface in `src/content/pages/index.ts`.
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageIntros",
  title: "Page Introductions",
  type: "document",
  description:
    "Editorial intro copy (overline, title, description, CTA) for each top-level page. Leave fields blank to use the built-in defaults.",
  groups: [
    { name: "projects", title: "01 // Projects", default: true },
    { name: "services", title: "02 // Services" },
    { name: "journal", title: "03 // Journal" },
    { name: "process", title: "04 // Process" },
    { name: "sustainability", title: "05 // Sustainability" },
    { name: "contact", title: "06 // Contact" },
  ],
  fields: [
    defineField({
      name: "projects",
      title: "Projects",
      type: "object",
      group: "projects",
      fields: [
        { name: "overline", type: "string", title: "Overline" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description", rows: 3 },
      ],
    }),

    defineField({
      name: "services",
      title: "Services",
      type: "object",
      group: "services",
      fields: [
        { name: "overline", type: "string", title: "Overline" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description", rows: 3 },
        {
          name: "cta",
          type: "object",
          title: "Closing CTA",
          fields: [
            { name: "overline", type: "string", title: "Overline" },
            { name: "heading", type: "string", title: "Heading" },
            { name: "body", type: "text", title: "Body", rows: 2 },
            { name: "action", type: "string", title: "Action Label" },
          ],
        },
      ],
    }),

    defineField({
      name: "journal",
      title: "Journal",
      type: "object",
      group: "journal",
      fields: [
        { name: "overline", type: "string", title: "Overline" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description", rows: 3 },
      ],
    }),

    defineField({
      name: "process",
      title: "Process",
      type: "object",
      group: "process",
      fields: [
        { name: "overline", type: "string", title: "Overline" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description", rows: 3 },
        {
          name: "cta",
          type: "object",
          title: "Closing CTA",
          fields: [
            { name: "overline", type: "string", title: "Overline" },
            { name: "heading", type: "string", title: "Heading" },
            { name: "body", type: "text", title: "Body", rows: 2 },
            { name: "action", type: "string", title: "Action Label" },
          ],
        },
      ],
    }),

    defineField({
      name: "sustainability",
      title: "Sustainability",
      type: "object",
      group: "sustainability",
      fields: [
        { name: "overline", type: "string", title: "Overline" },
        { name: "heading", type: "string", title: "Heading" },
        { name: "body", type: "text", title: "Body", rows: 3 },
      ],
    }),

    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      group: "contact",
      fields: [
        { name: "overline", type: "string", title: "Overline" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description", rows: 3 },
        { name: "briefHeading", type: "string", title: "Brief Heading" },
        { name: "closingHeading", type: "string", title: "Closing Heading" },
        { name: "closingBody", type: "text", title: "Closing Body", rows: 2 },
        { name: "editorialOverline", type: "string", title: "Editorial Overline" },
        { name: "dialogueOverline", type: "string", title: "Dialogue Overline" },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Page Introductions",
        subtitle: "Singleton — editorial headers for top-level pages",
      };
    },
  },
});
