/**
 * Site Settings Schema
 *
 * Global singleton document for site-wide configuration: identity, SEO
 * defaults, and contact/analytics settings. Supplied in addition to the
 * dedicated `contact` and `studio` documents.
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    {
      name: "identity",
      title: "01 // Identity",
      default: true,
    },
    {
      name: "seo",
      title: "02 // SEO",
    },
    {
      name: "organisation",
      title: "03 // Organisation",
    },
    {
      name: "operational",
      title: "04 // Operational",
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════
    // 01 // IDENTITY
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required().max(60),
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.max(120),
    }),

    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      group: "identity",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "string",
      group: "identity",
      description: "Canonical site URL",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 02 // SEO
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Default Meta Title",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "description",
          type: "text",
          title: "Default Meta Description",
          rows: 3,
          validation: (Rule) => Rule.max(300),
          description:
            "Recommended ~155–160 characters for search engine snippets, up to 300 for social previews.",
        },
        {
          name: "keywords",
          type: "array",
          title: "Default Keywords",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        },
        {
          name: "ogImage",
          type: "image",
          title: "Default OG Image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 03 // ORGANISATION
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      group: "organisation",
      validation: (Rule) => Rule.email(),
    }),

    defineField({
      name: "phone",
      title: "Contact Phone",
      type: "string",
      group: "organisation",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 04 // OPERATIONAL
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "analyticsCode",
      title: "Analytics Code",
      type: "string",
      group: "operational",
      description: "Google Analytics / measurement ID",
    }),

    defineField({
      name: "maintenanceMode",
      title: "Maintenance Mode",
      type: "boolean",
      group: "operational",
      initialValue: false,
      description: "Show a maintenance page when enabled",
    }),

    defineField({
      name: "maintenanceMessage",
      title: "Maintenance Message",
      type: "text",
      group: "operational",
      rows: 2,
    }),
  ],

  preview: {
    select: {
      title: "siteName",
    },
    prepare({ title }) {
      return {
        title: title || "Site Settings",
        subtitle: "Singleton",
      };
    },
  },
});
