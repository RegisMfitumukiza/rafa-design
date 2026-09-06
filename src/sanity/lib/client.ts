/**
 * Sanity Client Configuration
 *
 * Provides configured Sanity clients for:
 * - Server-side data fetching (with CDN)
 * - Client-side queries
 * - Preview/draft mode
 *
 * @see https://www.sanity.io/docs/js-client
 */

import { createClient } from "next-sanity";

// Project configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-08-20";

// Validate required environment variables
if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable");
}

if (!dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET environment variable");
}

/**
 * Base client configuration shared across all clients
 */
const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Will be overridden per client
};

/**
 * Server-side client for Next.js ISR data fetching.
 * useCdn MUST be false when using on-demand ISR revalidation via webhooks;
 * otherwise Sanity's API CDN edge cache serves stale data for up to a minute
 * after publishing. Next.js already handles caching at the framework level.
 */
export const client = createClient({
  ...config,
  useCdn: false,
});

/**
 * Client-side client for real-time queries
 * Use this for client components that need fresh data
 */
export const clientWrite = createClient({
  ...config,
  useCdn: false, // No CDN for fresh data
  ...(process.env.SANITY_API_READ_TOKEN && {
    token: process.env.SANITY_API_READ_TOKEN,
  }),
});

/**
 * Preview client for draft content
 * Use this in preview mode to see unpublished changes
 */
export const previewClient = createClient({
  ...config,
  useCdn: false,
  perspective: "previewDrafts", // Show drafts
  ...(process.env.SANITY_API_READ_TOKEN && {
    token: process.env.SANITY_API_READ_TOKEN,
  }),
});

/**
 * Get the appropriate client based on preview mode
 * @param preview - Whether to use preview mode
 */
export function getClient(preview = false) {
  return preview ? previewClient : client;
}

/**
 * Sanity configuration object for use in sanity.config.ts
 */
export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
};
