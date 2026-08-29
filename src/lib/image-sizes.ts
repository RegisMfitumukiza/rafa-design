/**
 * Image Sizes Utilities
 *
 * Centralized responsive image sizes for optimal performance.
 * These `sizes` strings tell the browser which image size to download
 * based on viewport width, improving LCP and reducing bandwidth.
 *
 * Formula: sizes = "media query: width, media query: width, default width"
 *
 * Breakpoints from design system:
 * - Mobile: < 768px (48rem)
 * - Tablet: 768px - 1024px (48rem - 64rem)
 * - Desktop: ≥ 1024px (64rem)
 */

/**
 * Full width hero images (21:9 aspect ratio)
 * Used on: Landing, project heroes, editorial heroes
 */
export const HERO_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1920px";

/**
 * Full width cinematic images (16:9 aspect ratio)
 * Used on: Full-bleed photography, journal featured images
 */
export const FULL_WIDTH_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1920px";

/**
 * Container-width images (constrained by max-width)
 * Used on: Studio hero, process hero, section imagery
 */
export const CONTAINER_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1152px";

/**
 * Two-column grid images
 * Used on: Project grids on mobile/tablet
 */
export const TWO_COL_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 512px";

/**
 * Three-column grid images
 * Used on: Project cards, journal cards on desktop
 */
export const THREE_COL_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 512px";

/**
 * Four-column grid images
 * Used on: Team cards, small galleries
 */
export const FOUR_COL_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 25vw, 384px";

/**
 * Gallery images (variable width based on layout)
 * Used on: Project galleries with mixed layouts
 */
export const GALLERY_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 60vw, 960px";

/**
 * Portrait images (team photos, vertical imagery)
 * Used on: Team member cards
 */
export const PORTRAIT_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 384px";

/**
 * Thumbnail images (previews, small cards)
 * Used on: Navigation previews, related content thumbnails
 */
export const THUMBNAIL_IMAGE_SIZES =
  "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 256px";

/**
 * Featured project card (asymmetric layout - large lead image)
 * Used on: Homepage featured projects, journal featured article
 */
export const FEATURED_CARD_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1536px) 60vw, 960px";

/**
 * Secondary card in asymmetric layout
 * Used on: Secondary cards next to featured content
 */
export const SECONDARY_CARD_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 40vw, 640px";

/**
 * Icon or logo images (small, fixed size)
 * Used on: Brand logos, icons, badges
 */
export const ICON_IMAGE_SIZES = "128px";

/**
 * Map images (office location, site maps)
 * Used on: Contact page map
 */
export const MAP_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1152px";

/**
 * Before/After slider images (full width within container)
 * Used on: Renovation/transformation comparisons
 */
export const BEFORE_AFTER_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px";

/**
 * Editorial narrative images (inline within text)
 * Used on: Journal article inline images, project narratives
 */
export const EDITORIAL_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 70vw, 896px";

/**
 * Helper: Custom sizes for special cases
 * Use when none of the presets fit your specific layout
 *
 * @example
 * ```ts
 * const customSizes = createCustomSizes([
 *   { maxWidth: 768, size: "100vw" },
 *   { maxWidth: 1024, size: "80vw" },
 *   { default: "960px" }
 * ]);
 * ```
 */
export function createCustomSizes(
  rules: Array<{ maxWidth?: number; size: string; default?: boolean }>,
): string {
  const parts: string[] = [];

  for (const rule of rules) {
    if (rule.default) {
      parts.push(rule.size);
    } else if (rule.maxWidth) {
      parts.push(`(max-width: ${rule.maxWidth}px) ${rule.size}`);
    }
  }

  return parts.join(", ");
}

/**
 * Get optimal sizes based on aspect ratio and layout context
 */
export function getSizesByAspect(
  aspect: "hero" | "landscape" | "standard" | "portrait",
  layout: "full" | "container" | "grid-2" | "grid-3" | "grid-4" = "container",
): string {
  if (layout === "full") {
    return aspect === "hero" ? HERO_IMAGE_SIZES : FULL_WIDTH_IMAGE_SIZES;
  }

  if (layout === "container") {
    return CONTAINER_IMAGE_SIZES;
  }

  if (layout === "grid-2") {
    return TWO_COL_IMAGE_SIZES;
  }

  if (layout === "grid-3") {
    return aspect === "portrait" ? PORTRAIT_IMAGE_SIZES : THREE_COL_IMAGE_SIZES;
  }

  if (layout === "grid-4") {
    return FOUR_COL_IMAGE_SIZES;
  }

  return CONTAINER_IMAGE_SIZES;
}
