"use client";

import { createContext, useContext } from "react";

import type { SiteConfig } from "@/lib/get-site-config";

export const SiteConfigContext = createContext<SiteConfig | null>(null);

export function useSiteConfig(): SiteConfig {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within SiteConfigProvider");
  }
  return context;
}
