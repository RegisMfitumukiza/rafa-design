// ============================================================================
// ESSAY TEMPLATE
// Long-form architectural thinking with reading rhythm
// ============================================================================

import type { JournalArticle } from "@/content/journal";

import { JournalDocument } from "../document";
import { BackToTop } from "../document/back-to-top";
import { ReadingIndex } from "../document/reading-index";
import { ReadingIndexMobile } from "../document/reading-index-mobile";
import { ScrollProgress } from "../document/scroll-progress";

interface EssayTemplateProps {
  article: JournalArticle;
  categoryLabel: string;
  currentSection?: string;
}

export function EssayTemplate({ article, categoryLabel, currentSection }: EssayTemplateProps) {
  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Desktop Reading Index */}
      {article.sections && (
        <ReadingIndex
          sections={article.sections}
          {...(article.estimatedReadingTime !== undefined && {
            estimatedReadingTime: article.estimatedReadingTime,
          })}
        />
      )}

      {/* Mobile Reading Index */}
      {article.sections && (
        <ReadingIndexMobile
          sections={article.sections}
          {...(currentSection !== undefined && { currentSection })}
        />
      )}

      {/* Main Document */}
      <JournalDocument article={article} categoryLabel={categoryLabel} />
    </>
  );
}
