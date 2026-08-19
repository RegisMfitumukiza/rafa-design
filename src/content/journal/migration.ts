// ============================================================================
// RAFA JOURNAL — CONTENT MIGRATION UTILITIES
// Convert legacy articles to new block-based format
// ============================================================================

import type {
  JournalArticle,
  LegacyJournalArticle,
  JournalSection,
  JournalBlock,
  JournalType,
  Person,
  Credit,
  JournalEvent,
  ExternalLinkBlock,
} from "./types";

/**
 * Infer journal type from legacy category
 */
function inferJournalType(
  category: string,
  hasEventDetails: boolean,
): JournalType {
  if (hasEventDetails) return "event";
  if (category === "awards") return "award";
  if (category === "news") return "news";
  if (category === "research") return "material-study";
  if (category === "ideas") return "essay";
  return "essay";
}

/**
 * Convert legacy author string to Person
 */
function convertAuthor(authorString?: string): Person | undefined {
  if (!authorString) return undefined;
  
  return {
    id: authorString.toLowerCase().replace(/\s+/g, "-"),
    name: authorString,
    organization: "RAFA Design Hub",
  };
}

/**
 * Convert legacy credits to Credit array
 */
function convertCredits(
  legacyCredits?: Array<{
    name: string;
    role?: string;
    url?: string;
    images?: string;
  }>,
): Credit[] {
  if (!legacyCredits) return [];
  
  return legacyCredits.map((credit) => {
    const mappedCredit: Credit = {
      role: (credit.role?.toLowerCase() as any) || "photography",
      name: credit.name,
    };
    
    // Only add url if it exists (for exactOptionalPropertyTypes compatibility)
    if (credit.url) {
      mappedCredit.url = credit.url;
    }
    
    return mappedCredit;
  });
}

/**
 * Convert legacy event details to JournalEvent
 */
function convertEventDetails(
  legacyEvent?: {
    date: string;
    endDate?: string;
    time?: string;
    endTime?: string;
    timezone?: string;
    location?: string;
    venue?: string;
    address?: string;
    registrationLink?: string;
    moreInfoLink?: string;
    admission?: string;
  },
): JournalEvent | undefined {
  if (!legacyEvent) return undefined;
  
  const event: JournalEvent = {
    date: legacyEvent.date,
    location: legacyEvent.location || "",
  };
  
  // Only add optional fields if they exist
  if (legacyEvent.endDate) event.endDate = legacyEvent.endDate;
  if (legacyEvent.time) event.time = legacyEvent.time;
  if (legacyEvent.endTime) event.endTime = legacyEvent.endTime;
  if (legacyEvent.timezone) event.timezone = legacyEvent.timezone;
  if (legacyEvent.venue) event.venue = legacyEvent.venue;
  if (legacyEvent.address) event.address = legacyEvent.address;
  if (legacyEvent.registrationLink) event.registrationLink = legacyEvent.registrationLink;
  if (legacyEvent.moreInfoLink) event.moreInfoLink = legacyEvent.moreInfoLink;
  if (legacyEvent.admission) event.admission = legacyEvent.admission;
  
  return event;
}

/**
 * Convert plain text content to sections with blocks
 */
function convertContentToSections(content: string): JournalSection[] {
  const paragraphs = content.split("\n\n").filter(Boolean);
  
  // First paragraph is introduction
  const introduction: JournalSection = {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        type: "text",
        content: paragraphs[0] || "",
      },
    ],
  };
  
  // Remaining paragraphs become text blocks in main section
  const remainingBlocks: JournalBlock[] = paragraphs.slice(1).map((para) => ({
    type: "text",
    content: para,
  }));
  
  const mainSection: JournalSection = {
    id: "content",
    title: "Content",
    blocks: remainingBlocks,
  };
  
  return [introduction, mainSection];
}

/**
 * Estimate reading time from content
 */
function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Migrate legacy article to new format
 */
export function migrateLegacyArticle(
  legacy: LegacyJournalArticle,
): JournalArticle {
  const type = inferJournalType(legacy.category, !!legacy.eventDetails);
  const author = convertAuthor(legacy.author);
  const credits = convertCredits(legacy.credits);
  const event = convertEventDetails(legacy.eventDetails);
  
  // Build sections
  let sections = convertContentToSections(legacy.content);
  
  // Add event block if event article
  if (event) {
    sections.push({
      id: "event-details",
      title: "Event Details",
      blocks: [
        {
          type: "event",
          event,
        },
      ],
    });
  }
  
  // Add external links if present
  if (legacy.externalLinks && legacy.externalLinks.length > 0) {
    const linkBlocks: JournalBlock[] = legacy.externalLinks.map((link) => {
      const block: ExternalLinkBlock = {
        type: "external-link",
        label: link.label,
        url: link.url,
      };
      
      // Only add description if it exists
      if (link.description) {
        block.description = link.description;
      }
      
      return block;
    });
    
    sections.push({
      id: "links",
      title: "Related Links",
      blocks: linkBlocks,
    });
  }
  
  // Build the article object with required fields
  const article: JournalArticle = {
    id: legacy.id,
    slug: legacy.slug,
    type,
    category: legacy.category,
    title: legacy.title,
    excerpt: legacy.excerpt,
    publishedAt: legacy.publishedAt,
    hero: {
      src: legacy.coverImage.src,
      alt: legacy.coverImage.alt,
      aspectRatio: "hero",
    },
    sections,
    content: legacy.content, // Keep for fallback
    estimatedReadingTime: estimateReadingTime(legacy.content),
    credits,
  };
  
  // Only add optional fields if they exist
  if (legacy.subtitle) article.subtitle = legacy.subtitle;
  if (author) article.author = author;
  if (event) article.event = event;
  if (legacy.relatedProjects) article.relatedProjects = legacy.relatedProjects;
  
  return article;
}

/**
 * Batch migrate multiple legacy articles
 */
export function migrateLegacyArticles(
  legacyArticles: LegacyJournalArticle[],
): JournalArticle[] {
  return legacyArticles.map(migrateLegacyArticle);
}

/**
 * Check if article is using new format
 */
export function isNewFormat(article: JournalArticle): boolean {
  return !!article.sections && article.sections.length > 0;
}

/**
 * Check if article is using legacy format
 */
export function isLegacyFormat(article: JournalArticle): boolean {
  return !!article.content && !article.sections;
}
