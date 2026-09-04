/**
 * Page Intros Seed Script
 *
 * Seeds the `pageIntros` singleton with the CURRENT website editorial values so
 * admins opening the Studio can see exactly what each field represents and what
 * the current copy is (rather than blank fields and built-in fallbacks).
 *
 * Values mirror `src/content/pages/index.ts`, the shared projects overline
 * default, and `src/content/sustainability/index.ts` (manifesto).
 *
 * NOTE: the Services `description` is intentionally left BLANK so the page
 * keeps its live auto-count (`getServicesDescription(count)`). Fill it in
 * Sanity if you ever want a static override.
 *
 * Usage: node scripts/seed-page-intros.mjs
 */

import { client } from "./lib/sanity.mjs";

const INTRO_ID = "pageIntros";

const doc = {
  _id: INTRO_ID,
  _type: "pageIntros",
  projects: {
    overline: "INDEX // PORTFOLIO ARCHIVE",
    title: "Projects",
    description:
      "A selection of recent residential, cultural, and public architecture by RAFA Design Hub.",
  },
  services: {
    overline: "Disciplines // Services",
    title: "Services",
    // description intentionally omitted -> keeps the live auto-count
    cta: {
      overline: "Disciplines // Contact",
      heading: "Have a project in mind?",
      body: "Tell us about the place, the ambition and the challenge.",
      action: "Start a project",
    },
  },
  journal: {
    overline: "Specification // Journal",
    title: "Journal",
    description:
      "Essays, research, and observations on architecture, craft, material culture, and the ideas behind the work.",
  },
  process: {
    overline: "Specification // Methodology",
    title: "Methodology",
    description:
      "Every project follows a clear arc — from discovery to completion. The path is never linear, but the principles remain the same: listen, conceive, refine, build.",
    cta: {
      overline: "Process // Contact",
      heading: "Have a project in mind?",
      body: "Tell us about the place, the ambition and the challenge.",
      action: "Start a project",
    },
  },
  sustainability: {
    overline: "Our Responsibility",
    heading: "Architecture that endures - for people and for the planet.",
    body: "Every project is an act of permanence. We consider environmental responsibility not as an additional layer applied to architecture, but as part of the architectural decision-making process from the beginning.",
  },
  contact: {
    overline: "Specification // Contact",
    title: "Contact",
    description:
      "Tell us about the project, place, ambition, or question you would like to explore with RAFA Design Hub.",
    briefHeading: "Project Brief",
    closingHeading: "EVERY PROJECT BEGINS WITH A CONVERSATION.",
    closingBody:
      "Whether the idea is fully formed or still taking shape, we would be glad to hear from you.",
    editorialOverline: "The Practice // Working Environment",
    dialogueOverline: "Specification // Dialogue",
  },
};

async function seed() {
  console.log("🚀 Seeding pageIntros singleton with current website values\n");

  const result = await client.createOrReplace(doc);
  console.log(`✅ pageIntros seeded (${result._id}).`);
}

seed().catch((error) => {
  console.error("💥 Seeding failed:", error);
  process.exit(1);
});
