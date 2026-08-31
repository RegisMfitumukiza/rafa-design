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
    // Hide document actions we don't need for editorial workflow
    actions: (prev) => {
      // For singleton documents (when we add them), hide create/delete actions
      // Currently no singletons, so just return all actions
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
