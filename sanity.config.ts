/**
 * Sanity Studio Configuration
 *
 * This file configures the Sanity Studio that will be embedded at /studio route.
 *
 * Documentation-driven architecture: schemas added during migration phases.
 * Phase 1 (Foundation): Basic Studio setup with Vision plugin
 * Phases 2-5: Schema types added incrementally
 *
 * @see https://www.sanity.io/docs/configuration
 * @see SANITY-MIGRATION-READINESS-REPORT.md
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schemas";

// Import custom Studio styles
import "./src/sanity/studio.css";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  // Project identification
  name: "rafa-design-hub-studio",
  title: "RAFA Design Hub Studio",

  // Project credentials
  projectId,
  dataset,

  // Base path for Studio (embedded at /admin route)
  basePath: "/admin",

  // Plugins
  plugins: [
    // Structure tool for content management
    structureTool({
      structure: (S) =>
        S.list()
          .title("RAFA CMS")
          .items([
            // 01 // Projects
            S.listItem()
              .title("01 // Projects")
              .icon(() => "📐")
              .schemaType("project")
              .child(
                S.documentTypeList("project")
                  .title("Projects")
                  .defaultOrdering([{ field: "year", direction: "desc" }]),
              ),

            // 02 // Journal
            S.listItem()
              .title("02 // Journal")
              .icon(() => "📰")
              .schemaType("journalArticle")
              .child(
                S.documentTypeList("journalArticle")
                  .title("Journal Articles")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
              ),

            // 03 // Services
            S.listItem()
              .title("03 // Services")
              .icon(() => "🏗️")
              .schemaType("service")
              .child(
                S.documentTypeList("service")
                  .title("Services")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),

            // 04 // Team
            S.listItem()
              .title("04 // Team")
              .icon(() => "👥")
              .schemaType("teamMember")
              .child(
                S.documentTypeList("teamMember")
                  .title("Team Members")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),

            // 05 // Studio Page (Singleton)
            S.listItem()
              .title("05 // Studio Page")
              .icon(() => "🏛️")
              .schemaType("studio")
              .child(S.documentTypeList("studio").title("Studio Page Content")),

            // 06 // Job Postings (Collection)
            S.listItem()
              .title("06 // Job Postings")
              .icon(() => "💼")
              .schemaType("career")
              .child(
                S.documentTypeList("career")
                  .title("Open Job Postings")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),

            // 07 // Careers Page (Singleton)
            S.listItem()
              .title("07 // Careers Page")
              .icon(() => "📄")
              .schemaType("careers")
              .child(S.documentTypeList("careers").title("Careers Page Content")),

            // 08 // Contact Page (Singleton)
            S.listItem()
              .title("08 // Contact Page")
              .icon(() => "✉️")
              .schemaType("contact")
              .child(S.documentTypeList("contact").title("Contact & Office Information")),

            // 09 // Site Settings (Singleton)
            S.listItem()
              .title("09 // Site Settings")
              .icon(() => "⚙️")
              .schemaType("siteSettings")
              .child(S.documentTypeList("siteSettings").title("Site Settings")),
          ]),
    }),

    // Vision plugin for testing GROQ queries
    visionTool({
      defaultApiVersion: "2024-08-20",
    }),
  ],

  // Schema types + template configuration
  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global "+" (New document) menu
    // so editors cannot accidentally create duplicate singletons
    templates: (prev) => {
      const singletonTypes = ["studio", "careers", "contact", "siteSettings"];
      return prev.filter((template) => !singletonTypes.includes(template.schemaType));
    },
  },

  // Document actions configuration
  document: {
    // For singleton documents, hide delete/duplicate/unpublish actions so only a
    // single document of each type can exist, while allowing publishing.
    actions: (prev, context) => {
      const singletonTypes = ["studio", "careers", "contact", "siteSettings"];
      const { schemaType } = context;

      if (singletonTypes.includes(schemaType as string)) {
        return prev.filter(
          (desc) => !desc.action || !["delete", "duplicate", "unpublish"].includes(desc.action),
        );
      }

      return prev;
    },
  },

  // Studio UI configuration
  studio: {
    components: {
      // Custom logo component can be added here
      // logo: StudioLogo,
    },
  },

  // Tools configuration
  tools: (prev) => {
    // Filter out tools we don't need
    return prev;
  },
});
