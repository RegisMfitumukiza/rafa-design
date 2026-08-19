// ============================================================================
// NEWS TEMPLATE
// Short studio announcements with minimal composition
// ============================================================================

import type { JournalArticle } from "@/content/journal";

import { JournalDocument } from "../document";
import { BackToTop } from "../document/back-to-top";
import { ScrollProgress } from "../document/scroll-progress";

interface NewsTemplateProps {
  article: JournalArticle;
  categoryLabel: string;
}

export function NewsTemplate({ article, categoryLabel }: NewsTemplateProps) {
  // News articles are short and don't need reading index
  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <JournalDocument article={article} categoryLabel={categoryLabel} />
    </>
  );
}
