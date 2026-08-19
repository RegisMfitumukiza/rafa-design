"use client";

import type { Route } from "next";

import { Search as SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, useId, useMemo, useState } from "react";

import { ui } from "@/content/ui";

import { useNavigation } from "./navigation-context";
import { searchContent, type SearchResult, type SearchResultType } from "./search-index";

const resultLabels: Record<SearchResultType, string> = {
  project: "Project",
  service: "Service",
  article: "Journal",
};

export interface MenuSearchProps {
  autoFocus?: boolean;
}

export const MenuSearch = forwardRef<HTMLInputElement, MenuSearchProps>(
  function MenuSearch({ autoFocus }, ref) {
    const { closeMenu } = useNavigation();
    const [query, setQuery] = useState("");
    const results = useMemo(() => searchContent(query), [query]);
    const searchInputId = useId();

    return (
      <section aria-label={ui.navigation.search} className="gap-sm flex flex-col w-full">
        <div className="relative flex items-center">
          <SearchIcon className="text-foreground/40 absolute left-0 size-4 select-none pointer-events-none" />
          <label htmlFor={searchInputId} className="sr-only">
            {ui.navigation.search}
          </label>
          <input
            ref={ref}
            id={searchInputId}
            type="search"
            value={query}
            autoFocus={autoFocus}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={ui.navigation.searchPlaceholder}
            autoComplete="off"
            className="border-border/40 focus:border-foreground py-sm pl-7 pr-12 placeholder:text-foreground/35 w-full border-b bg-transparent font-sans text-sm md:text-base transition-colors outline-none"
          />
          <span
            aria-hidden="true"
            className="text-foreground/30 font-mono text-[9px] uppercase tracking-widest absolute right-0 pointer-events-none"
          >
            ⌘K / /
          </span>
        </div>

        {query.trim() && (
          <ul
            aria-label={ui.navigation.search}
            aria-live="polite"
            className="gap-xs flex flex-col pt-xs max-h-[22rem] overflow-y-auto scrollbar-hide"
          >
            {results.map((result) => (
              <SearchResultLink key={result.id} result={result} onNavigate={closeMenu} />
            ))}
            {results.length === 0 && (
              <li className="text-foreground/40 py-sm text-sm font-mono">{ui.navigation.noResults}</li>
            )}
          </ul>
        )}
      </section>
    );
  },
);

interface SearchResultLinkProps {
  result: SearchResult;
  onNavigate: () => void;
}

function SearchResultLink({ result, onNavigate }: SearchResultLinkProps) {
  return (
    <li>
      <Link
        href={result.href as Route}
        onClick={onNavigate}
        className="group py-xs px-xs -mx-xs flex items-center gap-md rounded-sm hover:bg-foreground/5 transition-colors"
      >
        {result.imageSrc && (
          <div className="relative size-10 flex-shrink-0 overflow-hidden rounded-xs bg-muted">
            <Image
              src={result.imageSrc}
              alt={result.title}
              fill
              sizes="40px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <div className="gap-xs flex items-center">
            <span className="text-foreground/50 font-mono text-[9px] tracking-widest uppercase">
              {resultLabels[result.type]}
            </span>
            <span className="text-foreground font-medium text-sm transition-colors group-hover:text-accent truncate">
              {result.title}
            </span>
          </div>
          <span className="text-foreground/40 line-clamp-1 text-xs">{result.subtitle}</span>
        </div>
      </Link>
    </li>
  );
}
