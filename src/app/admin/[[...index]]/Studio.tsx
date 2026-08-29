/**
 * Sanity Studio Client Component
 *
 * This must be a Client Component to work with Next.js 16 + Sanity v6.
 * The NextStudio component uses client-side hooks and state management.
 *
 * Config is imported here (client-side only) to avoid Server Component issues.
 */

"use client";

import { visionTool } from "@sanity/vision";
import { NextStudio } from "next-sanity/studio";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "../../../../src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const config = defineConfig({
  name: "rafa-design-hub-studio",
  title: "RAFA Design Hub Studio",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [
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

            S.divider(),
          ]),
    }),
    visionTool({
      defaultApiVersion: "2024-08-20",
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      const singletonTypes = ["studio", "careers", "contact", "siteSettings"];
      if (singletonTypes.includes(context.schemaType)) {
        return prev.filter(
          (action) => !["unpublish", "delete", "duplicate"].includes(action.action || ""),
        );
      }
      return prev;
    },
  },
});

/**
 * Studio component wrapper
 * Renders the embedded Sanity Studio
 */
export function Studio() {
  return <NextStudio config={config} />;
}
