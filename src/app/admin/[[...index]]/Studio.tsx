/**
 * Sanity Studio Client Component
 *
 * This must be a Client Component to work with Next.js 16 + Sanity v6.
 * Uses the centralized configuration from sanity.config.ts.
 */

"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

/**
 * Studio component wrapper
 * Renders the embedded Sanity Studio at /admin
 */
export function Studio() {
  return <NextStudio config={config} />;
}
