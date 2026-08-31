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
              .child(
                S.documentTypeList("project")
                  .title("Projects")
                  .defaultOrdering([{ field: "year", direction: "desc" }]),
              ),

            // 02 // Journal
            S.listItem()
              .title("02 // Journal")
              .icon(() => "📰")
              .child(
                S.documentTypeList("journalArticle")
                  .title("Journal Articles")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
              ),

            // 03 // Services
            S.listItem()
              .title("03 // Services")
              .icon(() => "🏗️")
              .child(
                S.documentTypeList("service")
                  .title("Services")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),

            // 04 // Team
            S.listItem()
              .title("04 // Team")
              .icon(() => "👥")
              .child(
                S.documentTypeList("teamMember")
                  .title("Team Members")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),

            // 05 // Studio
            S.listItem()
              .title("05 // Studio")
              .icon(() => "🏛️")
              .child(S.documentTypeList("studio").title("Studio")),

            // 06 // Careers
            S.listItem()
              .title("06 // Careers")
              .icon(() => "💼")
              .child(
                S.documentTypeList("career")
                  .title("Job Postings")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),

            // 07 // Careers Page
            S.listItem()
              .title("07 // Careers Page")
              .icon(() => "📄")
              .child(S.documentTypeList("careers").title("Careers Page")),

            // 08 // Contact
            S.listItem()
              .title("08 // Contact")
              .icon(() => "✉️")
              .child(S.documentTypeList("contact").title("Contact Information")),

            // 09 // Site Settings
            S.listItem()
              .title("09 // Site Settings")
              .icon(() => "⚙️")
              .child(S.documentTypeList("siteSettings").title("Site Settings")),
          ]),
    }),

    // Vision plugin for testing GROQ queries
    visionTool({
      defaultApiVersion: "2024-08-20",
    }),
  ],

  // Schema types
  schema: {
    types: schemaTypes,
  },

  // Document actions configuration
  document: {
    // For singleton documents, hide create/delete/duplicate actions so only a
    // single document of each type can exist.
    actions: (prev, context) => {
      const singletonTypes = ["studio", "careers", "contact", "siteSettings"];
      const { schemaType } = context;

      if (singletonTypes.includes(schemaType as string)) {
        return prev.filter(
          (desc) =>
            !desc.action || !["delete", "duplicate", "publish", "unpublish"].includes(desc.action),
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
