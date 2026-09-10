import type { ImageAsset } from "@/content/types";

/**
 * Global site settings sourced from the Sanity `siteSettings` singleton.
 *
 * Provides site-wide identity, default SEO, and organisational contact
 * configuration. Optional fields are conditionally-shaped for
 * `exactOptionalPropertyTypes` compliance.
 */
export interface SiteSettings {
  id: string;
  siteName: string;
  description: string;
  maintenanceMode: boolean;
  tagline?: string;
  siteUrl?: string;
  analyticsCode?: string;
  maintenanceMessage?: string;
  defaultSeo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: ImageAsset;
  };
}
