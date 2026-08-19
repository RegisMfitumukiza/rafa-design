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
      icon: "/icon.svg",
    },
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
