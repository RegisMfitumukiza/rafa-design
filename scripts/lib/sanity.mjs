/**
 * Shared Sanity client + asset upload helpers for migration scripts.
 *
 * Reads credentials from `.env.local` and provides:
 *  - a write-capable Sanity client (`SANITY_API_TOKEN`)
 *  - `assetFromPublic(publicPath)` — uploads a local `/public` image to Sanity
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-08-20",
  useCdn: false,
});

/**
 * Upload a local static image (under `/public`) to Sanity as a reusable asset.
 *
 * @param {string} publicPath - Path relative to /public, e.g. "/images/studio/studio-atelier.jpg"
 * @returns {Promise<import("@sanity/client").SanityDocument | null>} The uploaded asset, or null.
 */
export async function assetFromPublic(publicPath) {
  if (!publicPath) return null;

  const filePath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    console.warn(`   ⚠️  Image not found, skipping: ${publicPath}`);
    return null;
  }

  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(publicPath).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";

  try {
    const asset = await client.assets.upload("image", buffer, {
      contentType,
      filename: path.basename(publicPath),
    });
    return asset;
  } catch (error) {
    console.warn(`   ⚠️  Failed to upload ${publicPath}: ${error.message}`);
    return null;
  }
}

/**
 * Build a Sanity image field value from an uploaded asset plus alt/caption.
 *
 * @param {import("@sanity/client").SanityDocument | null} asset - Uploaded asset document
 * @param {{alt?: string, caption?: string}} meta - Image metadata
 * @returns {object | undefined} A Sanity `image` field value, or undefined.
 */
export function imageField(asset, meta = {}) {
  if (!asset || !asset._id) return undefined;
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    ...(meta.alt ? { alt: meta.alt } : {}),
    ...(meta.caption ? { caption: meta.caption } : {}),
  };
}

/**
 * Resolve the script root (project root) for relative file reads.
 */
export const projectRoot = fileURLToPath(new URL("../..", import.meta.url));
