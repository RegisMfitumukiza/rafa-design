/**
 * Sanity Image Transformation Utilities
 *
 * Converts Sanity image references to the ImageAsset interface
 * used throughout the RAFA Design website.
 *
 * @see src/content/types.ts for ImageAsset interface
 */

import type { SanityImageSource } from "@sanity/image-url";

import { createImageUrlBuilder } from "@sanity/image-url";

import { client } from "./client";

// Initialize image URL builder
const builder = createImageUrlBuilder(client);

/**
 * Build a Sanity image URL with optional transformations
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Alias for urlFor
 */
export const urlForImage = urlFor;

export interface SanityRawImage {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
  alt?: string;
  caption?: string;
  credit?: string;
  narrative?: string;
  intent?: import("@/content/projects").ChapterIntent;
  fullBleed?: boolean;
  [key: string]: unknown;
}

/**
 * Transform a Sanity image object to ImageAsset interface
 *
 * @param sanityImage - Sanity image object with asset reference
 * @returns ImageAsset compatible with website components
 */
export function sanityImageToAsset(
  sanityImage: SanityRawImage | null | undefined,
): import("@/content/types").ImageAsset | null {
  if (!sanityImage) return null;

  // Check for asset reference
  const asset = sanityImage.asset;
  if (!asset) return null;

  // Build URL with optimization parameters
  let url: string;
  try {
    // Create a proper image object for the URL builder
    const imageForUrl = {
      asset: asset,
      ...sanityImage,
    };

    // Add Sanity image optimization parameters
    url = urlFor(imageForUrl as SanityImageSource)
      .auto("format") // Auto-select best format (WebP, AVIF)
      .quality(85) // Good quality with smaller file size
      .url();
  } catch (error) {
    console.error("Failed to generate image URL:", error);
    return null;
  }

  // Get dimensions if available (from dereferenced asset metadata)
  const width = asset.metadata?.dimensions?.width;
  const height = asset.metadata?.dimensions?.height;

  return {
    src: url,
    alt: sanityImage.alt || "",
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
    ...(sanityImage.caption ? { caption: sanityImage.caption } : {}),
    ...(sanityImage.credit ? { credit: sanityImage.credit } : {}),
  };
}

/**
 * Transform a Sanity chapter image to ChapterImage interface
 *
 * @param sanityImage - Sanity image with narrative and intent fields
 * @returns ChapterImage with all editorial metadata
 */
export function sanityImageToChapterImage(
  sanityImage: SanityRawImage | null | undefined,
): import("@/content/projects").ChapterImage | null {
  const baseImage = sanityImageToAsset(sanityImage);
  if (!baseImage) return null;

  return {
    ...baseImage,
    ...(sanityImage?.narrative ? { narrative: sanityImage.narrative } : {}),
    ...(sanityImage?.intent ? { intent: sanityImage.intent } : {}),
    fullBleed: sanityImage?.fullBleed ?? false,
  };
}

/**
 * Transform an array of Sanity images to ImageAsset array
 *
 * @param sanityImages - Array of Sanity image objects
 * @returns Array of ImageAssets, filtering out nulls
 */
export function sanityImagesToAssets(
  sanityImages: SanityRawImage[],
): import("@/content/types").ImageAsset[] {
  if (!sanityImages || !Array.isArray(sanityImages)) return [];

  return sanityImages
    .map(sanityImageToAsset)
    .filter((img): img is NonNullable<typeof img> => img !== null);
}

/**
 * Transform an array of Sanity chapter images
 *
 * @param sanityImages - Array of Sanity image objects with chapter metadata
 * @returns Array of ChapterImages, filtering out nulls
 */
export function sanityImagesToChapterImages(
  sanityImages: SanityRawImage[],
): import("@/content/projects").ChapterImage[] {
  if (!sanityImages || !Array.isArray(sanityImages)) return [];

  return sanityImages
    .map(sanityImageToChapterImage)
    .filter((img): img is NonNullable<typeof img> => img !== null);
}
