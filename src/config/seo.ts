import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const seoConfig = {
  defaultRobots: {
    follow: true,
    index: true,
  },
} as const;

export function createMetadata(overrides: Omit<Metadata, "metadataBase"> = {}): Metadata {
  const { ...rest } = overrides;

  return {
    robots: seoConfig.defaultRobots,
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon/favicon.ico",
      apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/favicon/site.webmanifest",
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
    },
    ...rest,
  };
}
