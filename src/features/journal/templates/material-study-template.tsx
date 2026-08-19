// ============================================================================
// MATERIAL STUDY TEMPLATE
// Experimental/editorial material exploration
// ============================================================================

import type { JournalArticle } from "@/content/journal";

import { JournalDocument } from "../document";
import { BackToTop } from "../document/back-to-top";
import { ReadingIndex } from "../document/reading-index";
import { ReadingIndexMobile } from "../document/reading-index-mobile";
import { ScrollProgress } from "../document/scroll-progress";

interface MaterialStudyTemplateProps {
  article: JournalArticle;
  categoryLabel: string;
  currentSection?: string;
}

export function MaterialStudyTemplate({
  article,
  categoryLabel,
  currentSection,
}: MaterialStudyTemplateProps) {
  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Reading Index for longer studies */}
      {article.sections && article.sections.length >= 3 && (
        <>
          <ReadingIndex
            sections={article.sections}
            {...(article.estimatedReadingTime !== undefined && {
              estimatedReadingTime: article.estimatedReadingTime,
            })}
          />
          <ReadingIndexMobile
            sections={article.sections}
            {...(currentSection !== undefined && { currentSection })}
          />
        </>
      )}

      {/* Main Document */}
      <JournalDocument article={article} categoryLabel={categoryLabel} />
    </>
  );
}
