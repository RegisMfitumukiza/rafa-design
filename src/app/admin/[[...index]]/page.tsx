/**
 * Sanity Studio Page
 *
 * Embeds the Sanity Studio at /admin route for content management.
 * Uses catch-all route [[...index]] to handle all Studio navigation.
 *
 * Access: Owner-only (configure authentication in production)
 * Location: yourdomain.com/admin
 *
 * Note: This route is separate from the public studio information page
 * at /studio (src/app/(site)/studio/page.tsx) which displays team/awards/timeline
 *
 * @see sanity.config.ts for Studio configuration
 */

import type { Metadata, Viewport } from "next";

import { Studio } from "./Studio";

/**
 * Page metadata
 */
export const metadata: Metadata = {
  title: "RAFA Design Studio | Content Management",
  description: "Sanity Studio for managing RAFA Design website content",
};

/**
 * Viewport configuration (separate from metadata in Next.js 16)
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Studio page component
 * Renders the embedded Sanity Studio via Client Component
 */
export default function StudioPage() {
  return <Studio />;
}
