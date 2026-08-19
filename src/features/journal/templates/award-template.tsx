// ============================================================================
// AWARD TEMPLATE
// Visually restrained recognition announcements
// ============================================================================

import type { JournalArticle } from "@/content/journal";
import { JournalDocument } from "../document";
import { ScrollProgress } from "../document/scroll-progress";
import { BackToTop } from "../document/back-to-top";

interface AwardTemplateProps {
  article: JournalArticle;
  categoryLabel: string;
}

export function AwardTemplate({ article, categoryLabel }: AwardTemplateProps) {
  // Award articles are typically concise
  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <JournalDocument article={article} categoryLabel={categoryLabel} />
    </>
  );
}
