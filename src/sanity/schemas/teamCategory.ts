/**
 * Team Category Schema
 *
 * Defines seniority tiers for team members.
 * Fully managed in Sanity Studio — no hardcoded enum in code.
 *
 * Each tier has:
 *   - title  : Display label (e.g. "Senior Architect")
 *   - order  : Controls the sort order of the tier in any future filter rail
 *
 * Usage: referenced by the `teamMember.category` field.
 * In Studio: managed under "Team Categories" in the desk structure.
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamCategory",
  title: "Team Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tier Title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
      description:
        'Seniority tier displayed in the dossier and used for team filtering — e.g. "Director", "Senior Architect", "Intern"',
    }),

    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1),
      description:
        "Controls the order of this tier in filter rails (1 = top of hierarchy — Director, Partner, etc.)",
      initialValue: 99,
    }),
  ],

  preview: {
    select: {
      title: "title",
      order: "order",
    },
    prepare({ title, order }) {
      return {
        title: title || "Untitled Category",
        subtitle: `Tier ${String(order || 0).padStart(2, "0")}`,
      };
    },
  },

  orderings: [
    {
      title: "Hierarchy (Director first)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Alphabetical",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
