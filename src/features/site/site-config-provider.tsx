"use client";

import { type ReactNode } from "react";

import type { SiteConfig } from "@/lib/get-site-config";

import { SiteConfigContext } from "./site-config-context";

interface SiteConfigProviderProps {
  children: ReactNode;
  /** Resolved site configuration, fed from the server layout. */
  config: SiteConfig;
}

/**
 * Provides the site-wide configuration (identity, tagline, maintenance
 * controls) to client surfaces. The server layout resolves it from the
 * Sanity `siteSettings` singleton with a static fallback.
 */
export function SiteConfigProvider({ children, config }: SiteConfigProviderProps) {
  return <SiteConfigContext.Provider value={config}>{children}</SiteConfigContext.Provider>;
}
