/**
 * POST /api/revalidate
 *
 * On-demand ISR revalidation triggered by Sanity webhooks.
 *
 * When a document is created, updated, or deleted in Sanity Studio, the
 * configured webhook POSTs the published document body to this endpoint.
 * The route verifies the signed request (Stripe-style HMAC signature),
 * then revalidates the affected Next.js cache tags and routes so static
 * pages reflect the new content without a full deployment.
 *
 * This is the missing piece between "edit in the CMS" and
 * "everyone sees it live" for the statically generated site.
 *
 * Security:
 * - Requires `sanity-webhook-signature` header verified against
 *   `SANITY_WEBHOOK_SECRET` (via @sanity/webhook HMAC-SHA256).
 * - Cross-checks `sanity-project-id` / `sanity-dataset` headers when present.
 * - In development, signature verification is skipped if the secret is unset
 *   (mirrors the /api/cron/editorial-reminder authorization pattern).
 *
 * @see docs/33-sanity-integration-complete.md
 * @see src/sanity/lib/fetch.ts `cacheTags` for the tag registry
 */

import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { cacheTags } from "@/sanity/lib/fetch";

const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

/**
 * Sanity document `_type` -> affected cache tags.
 * Revalidating a tag regenerates every page that read data tagged with it.
 * Shared content (contact, site settings, studio, team) invalidates across
 * the whole site because those values are consumed by layouts and headers.
 */
const DOCUMENT_TAGS: Record<string, string[]> = {
  journalArticle: [cacheTags.articles],
  project: [cacheTags.projects],
  service: [cacheTags.services],
  teamMember: [cacheTags.team],
  studio: [cacheTags.studio, cacheTags.team],
  career: [cacheTags.careers],
  careers: [cacheTags.careers],
  contact: [cacheTags.contact],
  siteSettings: [cacheTags.settings],
  pageIntros: [cacheTags.pageIntros],
};

/**
 * Sanity document `_type` -> affected route paths.
 * Revalidating a path regenerates the page (and its metadata) for that route.
 */
const DOCUMENT_PATHS: Record<string, (slug?: string) => string[]> = {
  journalArticle: (slug) => (slug ? [`/journal`, `/journal/${slug}`] : [`/journal`]),
  project: (slug) => (slug ? [`/projects`, `/projects/${slug}`] : [`/projects`]),
  service: (slug) => (slug ? [`/services`, `/services/${slug}`] : [`/services`]),
  teamMember: () => [`/studio`],
  studio: () => [`/studio`, `/services`],
  career: () => [`/careers`],
  careers: () => [`/careers`],
  contact: () => [`/contact`],
  siteSettings: () => [`/`],
  pageIntros: () => [
    `/projects`,
    `/services`,
    `/journal`,
    `/process`,
    `/sustainability`,
    `/contact`,
  ],
};

/** Extract the current slug from a webhook payload (object or string form). */
function extractSlug(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const candidate = (payload as { slug?: unknown }).slug;
  if (typeof candidate === "string") return candidate;
  if (candidate && typeof candidate === "object") {
    const current = (candidate as { current?: unknown }).current;
    if (typeof current === "string") return current;
  }
  return undefined;
}

/**
 * POST handler — receives the Sanity webhook that fires on publish.
 */
export async function POST(request: Request) {
  // The validation must run against the exact raw body bytes, never a
  // re-encoded JSON string, or the signature will mismatch.
  const body = await request.text();
  if (!body) {
    return NextResponse.json({ message: "Empty request body" }, { status: 400 });
  }

  // Verify the request signature (Stripe-style: t=<ts>,v1=<sig>).
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (webhookSecret) {
    if (!signature) {
      return NextResponse.json({ message: "Missing signature" }, { status: 401 });
    }
    const valid = await isValidSignature(body, signature, webhookSecret);
    if (!valid) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV !== "development") {
    // Production must have a secret configured — do not accept unsigned hooks.
    return NextResponse.json(
      { message: "SANITY_WEBHOOK_SECRET is not configured" },
      { status: 500 },
    );
  }

  // Defense in depth: cross-check Sanity identity headers when present.
  const headerProjectId = request.headers.get("sanity-project-id");
  const headerDataset = request.headers.get("sanity-dataset");
  if (projectId && headerProjectId && headerProjectId !== projectId) {
    return NextResponse.json({ message: "Project mismatch" }, { status: 401 });
  }
  if (dataset && headerDataset && headerDataset !== dataset) {
    return NextResponse.json({ message: "Dataset mismatch" }, { status: 401 });
  }

  // Parse the payload.
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ message: "Unexpected payload shape" }, { status: 400 });
  }

  const type = (payload as { _type?: unknown })._type;
  const documentTags = typeof type === "string" ? DOCUMENT_TAGS[type] : undefined;
  const documentPaths = typeof type === "string" ? DOCUMENT_PATHS[type] : undefined;
  if (!documentTags || !documentPaths) {
    return NextResponse.json({ message: "Unsupported document type" }, { status: 200 });
  }

  const slug = extractSlug(payload);

  // Per-slug tags so a single edited document revalidates its own detail page.
  const tags = new Set(documentTags);
  if (slug) {
    if (type === "journalArticle") tags.add(cacheTags.article(slug));
    if (type === "project") tags.add(cacheTags.project(slug));
    if (type === "service") tags.add(cacheTags.service(slug));
    if (type === "career") tags.add(cacheTags.career(slug));
  }

  const paths = documentPaths(slug);
  if (type === "contact" || type === "siteSettings") {
    // Shared content appears in the footer/nav/JSON-LD on every page.
    paths.push("/");
  }

  try {
    for (const tag of tags) {
      // "max" profile: keep the regenerated entry cached until the next
      // webhook invalidates it. Required since Next 16 - see
      // https://nextjs.org/docs/messages/revalidate-tag-single-arg
      revalidateTag(tag, "max");
    }
    for (const path of paths) {
      revalidatePath(path);
    }
  } catch (error) {
    console.error("[revalidate] Failed to revalidate:", error);
    return NextResponse.json({ message: "Revalidation failed" }, { status: 500 });
  }

  return NextResponse.json({
    revalidated: true,
    type,
    slug,
    tags: [...tags],
    paths,
  });
}

/**
 * GET handler — for manual or diagnostic revalidation via browser or curl.
 *
 * Example:
 * /api/revalidate?secret=YOUR_SECRET&path=/studio
 * /api/revalidate?secret=YOUR_SECRET&tag=studio
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");
  const tag = searchParams.get("tag");

  if (!webhookSecret || secret !== webhookSecret) {
    return NextResponse.json({ message: "Invalid or missing secret" }, { status: 401 });
  }

  const revalidatedPaths: string[] = [];
  const revalidatedTags: string[] = [];

  if (path) {
    revalidatePath(path);
    revalidatedPaths.push(path);
  }

  if (tag) {
    revalidateTag(tag, "max");
    revalidatedTags.push(tag);
  }

  if (!path && !tag) {
    for (const corePath of ["/", "/studio", "/services", "/projects", "/journal", "/contact"]) {
      revalidatePath(corePath);
      revalidatedPaths.push(corePath);
    }
  }

  return NextResponse.json({
    revalidated: true,
    paths: revalidatedPaths,
    tags: revalidatedTags,
    timestamp: new Date().toISOString(),
  });
}
