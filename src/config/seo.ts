import type { Metadata } from "next";

import { fallbackSiteConfig } from "@/lib/get-site-config";
import type { SiteConfig } from "@/lib/get-site-config";

export const seoConfig = {
  defaultRobots: {
    follow: true,
    index: true,
  },
} as const;

/**
 * Build page metadata.
 *
 * The root layout supplies the resolved site configuration (Sanity-first,
 * static fallback) so global identity values — name, description, URL,
 * keywords, default OG — never need to be hardcoded per page. Pages that
 * call this without a config receive the static fallback.
 */
export function createMetadata(
  overrides: Omit<Metadata, "metadataBase"> = {},
  config: SiteConfig = fallbackSiteConfig,
): Metadata {
  const { ...rest } = overrides;

  const defaultTitle = config.seoDefaults?.title ?? config.name;
  const defaultDescription = config.seoDefaults?.description ?? config.description;
  const ogImage = config.seoDefaults?.ogImage;

  const defaultImages = ogImage?.src
    ? [
        {
          url: ogImage.src,
          width: ogImage.width ?? 1200,
          height: ogImage.height ?? 630,
          alt: ogImage.alt ?? defaultTitle,
        },
      ]
    : undefined;

  return {
    metadataBase: new URL(config.url),
    robots: seoConfig.defaultRobots,
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: config.name,
      title: defaultTitle,
      description: defaultDescription,
      ...(defaultImages ? { images: defaultImages } : {}),
      ...rest.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      ...(defaultImages ? { images: [ogImage!.src] } : {}),
      ...rest.twitter,
    },
    ...rest,
  };
}
