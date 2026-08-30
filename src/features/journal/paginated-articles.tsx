/**
 * PaginatedArticles
 *
 * Thin wrapper — delegates rendering to JournalEditorialGrid.
 * The view toggle (grid/list) has been removed in favour of a committed editorial layout.
 */

import type { JournalArticle } from "@/content/journal";
import { JournalEditorialGrid } from "@/features/journal/journal-editorial-grid";

interface PaginatedArticlesProps {
  articles: JournalArticle[];
  className?: string | undefined;
}

export function PaginatedArticles({ articles, className }: PaginatedArticlesProps) {
  return <JournalEditorialGrid articles={articles} {...(className ? { className } : {})} />;
}
