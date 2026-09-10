"use client";

import { type ReactNode } from "react";

import { getServices as getStaticServices } from "@/content/services";
import type { Service } from "@/content/services";

import { ServicesContext } from "./services-context";

interface ServicesProviderProps {
  children: ReactNode;
  /**
   * Live services from Sanity, or null/undefined to fall back to the static
   * content module so no surface ever renders empty.
   */
  services?: Service[] | null;
}

/**
 * Provides the site-wide services/disciplines list to client surfaces.
 * The server layout feeds live Sanity services; when absent the static
 * `getServices()` module is used as a seamless fallback.
 */
export function ServicesProvider({ children, services }: ServicesProviderProps) {
  const value = services && services.length > 0 ? services : getStaticServices();

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
}
