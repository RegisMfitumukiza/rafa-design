/**
 * Contact Schema
 *
 * Singleton document holding the practice's contact information rendered on
 * the `/contact` page. Maps 1:1 to the `ContactInformation` interface in
 * `src/content/company/contact.ts`.
 *
 * Note: contact form submissions are handled by the backend (Resend) API;
 * this schema stores the studio's public contact details and office locations.
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Information",
  type: "document",
  groups: [
    {
      name: "details",
      title: "01 // Contact Details",
      default: true,
    },
    {
      name: "offices",
      title: "02 // Offices",
    },
    {
      name: "social",
      title: "03 // Social",
    },
    {
      name: "editorial",
      title: "04 // Editorial",
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════
    // 01 // CONTACT DETAILS
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "email",
      title: "Primary Email",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required().email(),
    }),

    defineField({
      name: "phone",
      title: "Primary Phone",
      type: "string",
      group: "details",
      description: "International format preferred",
    }),

    defineField({
      name: "address",
      title: "Primary Address",
      type: "string",
      group: "details",
    }),

    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "string",
      group: "details",
      description: 'e.g. "41.1579° N, 8.6291° W"',
    }),

    defineField({
      name: "projectTypes",
      title: "Project Types",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      description: 'e.g. "Architecture", "Interior Design", "Renovation", "Other"',
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 02 // OFFICES
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "offices",
      title: "Offices",
      type: "array",
      group: "offices",
      of: [
        {
          type: "object",
          name: "office",
          title: "Office",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Office Name",
              validation: (Rule) => Rule.required().max(80),
            },
            { name: "city", type: "string", title: "City" },
            { name: "country", type: "string", title: "Country" },
            { name: "address", type: "string", title: "Address" },
            { name: "coordinates", type: "string", title: "Coordinates" },
            { name: "hours", type: "string", title: "Opening Hours" },
            { name: "phone", type: "string", title: "Phone" },
            { name: "mapsUrl", type: "url", title: "Maps URL" },
            {
              name: "image",
              type: "image",
              title: "Office Image",
              options: { hotspot: true },
              fields: [
                { name: "alt", type: "string", title: "Alt Text" },
                { name: "caption", type: "string", title: "Caption" },
              ],
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "city",
            },
          },
        },
      ],
      description: "Order matters for display",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 03 // SOCIAL
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      group: "social",
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
            { name: "url", type: "string", title: "URL", validation: (Rule) => Rule.required() },
            { name: "label", type: "string", title: "Label Override" },
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 04 // EDITORIAL
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "editorialImage",
      title: "Editorial Image",
      type: "image",
      group: "editorial",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
        { name: "caption", type: "string", title: "Caption" },
      ],
      description: "Closing editorial image on the contact page.",
    }),
  ],

  preview: {
    select: {
      title: "email",
    },
    prepare({ title }) {
      return {
        title: title || "Contact Information",
        subtitle: "Singleton",
      };
    },
  },
});
