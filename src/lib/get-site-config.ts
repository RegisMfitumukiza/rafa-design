import { siteConfig } from "@/config/site";
import type { ImageAsset } from "@/content/types";
import { getSiteSettings } from "@/sanity/lib";

/**
 * Site-wide configuration.
 *
 * Single source of truth for global identity, SEO defaults, analytics and
 * maintenance controls, sourced from the Sanity `siteSettings` singleton
 * and merged over the static `src/config/site.ts` fallback so the site
 * stays online if the CMS is unreachable.
 */
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  keywords: string[];
  maintenanceMode: boolean;
  tagline?: string;
  analyticsCode?: string;
  maintenanceMessage?: string;
  seoDefaults?: {
    title?: string;
    description?: string;
    ogImage?: ImageAsset;
  };
}

/**
 * Static fallback configuration used when Sanity is unavailable.
 */
export const fallbackSiteConfig: SiteConfig = {
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  keywords: [...siteConfig.keywords],
  maintenanceMode: false,
};

/**
 * Resolve the site-wide configuration.
 *
 * Prefers the Sanity `siteSettings` document (tagged with `cacheTags.settings`,
 * so publishing in Studio revalidates every dependent page automatically) and
 * falls back to `fallbackSiteConfig` when the CMS is unreachable.
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  const settings = await getSiteSettings();

  if (!settings) {
    return fallbackSiteConfig;
  }

  return {
    name: settings.siteName || siteConfig.name,
    description: settings.description || siteConfig.description,
    url: settings.siteUrl || siteConfig.url,
    keywords:
      settings.defaultSeo?.keywords && settings.defaultSeo.keywords.length > 0
        ? settings.defaultSeo.keywords
        : [...siteConfig.keywords],
    maintenanceMode: settings.maintenanceMode,
    ...(settings.tagline ? { tagline: settings.tagline } : {}),
    ...(settings.analyticsCode ? { analyticsCode: settings.analyticsCode } : {}),
    ...(settings.maintenanceMessage ? { maintenanceMessage: settings.maintenanceMessage } : {}),
    ...(settings.defaultSeo
      ? {
          seoDefaults: {
            ...(settings.defaultSeo.title ? { title: settings.defaultSeo.title } : {}),
            ...(settings.defaultSeo.description
              ? { description: settings.defaultSeo.description }
              : {}),
            ...(settings.defaultSeo.ogImage ? { ogImage: settings.defaultSeo.ogImage } : {}),
          },
        }
      : {}),
  };
}
