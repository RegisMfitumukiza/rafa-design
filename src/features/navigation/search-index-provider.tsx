"use client";

import { type ReactNode } from "react";

import type { SearchResult } from "@/features/navigation/search-index";

import { SearchIndexContext } from "./search-index-context";

interface SearchIndexProviderProps {
  children: ReactNode;
  /** Pre-built search index from the server. Defaults to empty array. */
  index: SearchResult[];
}

/**
 * Injects the server-built search index into the client component tree.
 * Built once per request in (site)/layout.tsx from live Sanity data, so
 * MenuSearch always searches real content with zero client-side fetching.
 */
export function SearchIndexProvider({ children, index }: SearchIndexProviderProps) {
  return <SearchIndexContext.Provider value={index}>{children}</SearchIndexContext.Provider>;
}
