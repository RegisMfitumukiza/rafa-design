// ============================================================================
// PROJECT STORY TEMPLATE
// Mini monograph with editorial plates and project context
// ============================================================================

import type { JournalArticle } from "@/content/journal";
import { JournalDocument } from "../document";
import { ReadingIndex } from "../document/reading-index";
import { ReadingIndexMobile } from "../document/reading-index-mobile";
import { ScrollProgress } from "../document/scroll-progress";
import { BackToTop } from "../document/back-to-top";

interface ProjectStoryTemplateProps {
  article: JournalArticle;
  categoryLabel: string;
  currentSection?: string;
}

export function ProjectStoryTemplate({ 
  article, 
  categoryLabel,
  currentSection 
}: ProjectStoryTemplateProps) {
  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Desktop Reading Index (for longer stories) */}
      {article.sections && article.sections.length >= 4 && (
        <ReadingIndex
          sections={article.sections}
          {...(article.estimatedReadingTime !== undefined && { estimatedReadingTime: article.estimatedReadingTime })}
        />
      )}

      {/* Mobile Reading Index */}
      {article.sections && article.sections.length >= 4 && (
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
