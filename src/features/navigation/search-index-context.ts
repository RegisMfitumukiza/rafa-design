"use client";

import { createContext, useContext } from "react";

import type { SearchResult } from "@/features/navigation/search-index";

export const SearchIndexContext = createContext<SearchResult[]>([]);

/**
 * Access the server-built search index.
 * Server layout builds the index from live Sanity data and passes it via
 * SearchIndexProvider. MenuSearch reads this context so search is always instant
 * with no client-side data fetching.
 */
export function useSearchIndex(): SearchResult[] {
  return useContext(SearchIndexContext);
}
