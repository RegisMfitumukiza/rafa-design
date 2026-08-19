// ============================================================================
// EVENT TEMPLATE
// Calendar-integrated event pages with structured metadata
// ============================================================================

import type { JournalArticle } from "@/content/journal";

import { JournalDocument } from "../document";
import { BackToTop } from "../document/back-to-top";
import { ScrollProgress } from "../document/scroll-progress";

interface EventTemplateProps {
  article: JournalArticle;
  categoryLabel: string;
}

export function EventTemplate({ article, categoryLabel }: EventTemplateProps) {
  // Event pages are typically shorter and don't need reading index
  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <JournalDocument article={article} categoryLabel={categoryLabel} />
    </>
  );
}
