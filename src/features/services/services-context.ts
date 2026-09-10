"use client";

import { createContext, useContext } from "react";

import type { Service } from "@/content/services";

export const ServicesContext = createContext<Service[]>([]);

/**
 * Access the live services/disciplines list.
 * Server layout fetches from Sanity and passes via ServicesProvider;
 * the static content module is used as a fallback so no surface ever renders empty.
 */
export function useServices(): Service[] {
  return useContext(ServicesContext);
}
