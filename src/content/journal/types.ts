// ============================================================================
// RAFA JOURNAL — EDITORIAL DOCUMENT SYSTEM
// Content Model Architecture
// ============================================================================

// ----------------------------------------------------------------------------
// JOURNAL TYPES
// ----------------------------------------------------------------------------

/**
 * Content types for different editorial approaches.
 * Each type has its own compositional template and rendering strategy.
 */
export type JournalType =
  | "essay" // Long-form architectural thinking
  | "project-story" // Mini monograph about a project
  | "material-study" // Experimental/editorial material exploration
  | "interview" // Studio dialogues & interviews
  | "field-notes" // Site research & field notes
  | "news" // Studio announcements
  | "event" // Calendar-integrated event & exhibition pages
  | "award" // Recognition & awards announcements
  | "general"
  | (string & {});

/**
 * Journal categories for filtering/organization.
 * Open string union allows any custom topic while providing autocomplete.
 */
export type JournalCategory =
  | "architecture"
  | "interior"
  | "landscape"
  | "urbanism"
  | "sustainability"
  | "materiality"
  | "news"
  | "research"
  | "awards"
  | "events"
  | "ideas"
  | "publications"
  | (string & {});

// ----------------------------------------------------------------------------
// MEDIA SYSTEM
// ----------------------------------------------------------------------------

/**
 * Credit types for different content sources
 */
export type CreditRole =
  | "photography"
  | "visualization"
  | "rendering"
  | "drawing"
  | "film"
  | "artwork"
  | "source"
  | "courtesy";

/**
 * Professional credit attribution
 */
export interface Credit {
  role: CreditRole;
  name: string;
  url?: string;
  organization?: string;
}

/**
 * Aspect ratio presets for editorial composition
 */
export type AspectRatio =
  | "landscape" // 3:2
  | "portrait" // 2:3
  | "square" // 1:1
  | "wide" // 21:9
  | "hero"; // 16:9

/**
 * Image size variants for editorial plates
 */
export type ImageSize =
  | "full" // Full bleed
  | "large" // 80% container
  | "medium" // 60% container
  | "small" // 40% container
  | "thumbnail"; // 20% container

/**
 * Professional media model with captions and credits
 */
export interface JournalMedia {
  src: string;
  alt: string;
  caption?: string;
  credit?: Credit;
  aspectRatio?: AspectRatio;
  size?: ImageSize;
}

// ----------------------------------------------------------------------------
// PERSON & REFERENCE SYSTEM
// ----------------------------------------------------------------------------

/**
 * Person reference for authors, speakers, etc.
 */
export interface Person {
  id: string;
  name: string;
  role?: string;
  organization?: string;
  url?: string;
}

/**
 * Project reference for cross-linking
 */
export interface ProjectReference {
  id: string;
  slug: string;
  title: string;
  location?: string;
  year?: number;
  type?: string;
  coverImage?: string;
}

// ----------------------------------------------------------------------------
// EVENT SYSTEM
// ----------------------------------------------------------------------------

/**
 * Event metadata for calendar integration
 */
export interface JournalEvent {
  date: string;
  endDate?: string;
  time?: string;
  endTime?: string;
  timezone?: string;
  location: string;
  venue?: string;
  address?: string;
  city?: string;
  country?: string;
  speakers?: Person[];
  registrationLink?: string;
  moreInfoLink?: string;
  admission?: string;
  capacity?: number;
}

// ----------------------------------------------------------------------------
// CONTENT BLOCKS
// ----------------------------------------------------------------------------

/**
 * Text content block
 */
export interface TextBlock {
  type: "text";
  content: string;
}

/**
 * Section heading block
 */
export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3;
  content: string;
  id?: string; // For section navigation
}

/**
 * Single image block with editorial control
 */
export interface ImageBlock {
  type: "image";
  media: JournalMedia;
  layout?: "full" | "wide" | "contained";
}

/**
 * Multi-image gallery block
 */
export interface GalleryBlock {
  type: "gallery";
  images: JournalMedia[];
  columns?: 2 | 3 | 4;
  layout?: "grid" | "masonry" | "carousel";
}

/**
 * Pull quote block for emphasis
 */
export interface PullQuoteBlock {
  type: "pullquote";
  content: string;
  author?: string;
  layout?: "center" | "wide" | "offset";
}

/**
 * Video embed block
 */
export interface VideoBlock {
  type: "video";
  src: string;
  poster?: string;
  caption?: string;
  credit?: Credit;
}

/**
 * Project reference card block
 */
export interface ProjectReferenceBlock {
  type: "project-reference";
  project: ProjectReference;
}

/**
 * Fact/specification block
 */
export interface FactBlock {
  type: "fact";
  label: string;
  value: string;
}

/**
 * Event information block
 */
export interface EventBlock {
  type: "event";
  event: JournalEvent;
}

/**
 * Credits block for end of article
 */
export interface CreditsBlock {
  type: "credits";
  credits: Credit[];
}

/**
 * Visual divider block
 */
export interface DividerBlock {
  type: "divider";
  style?: "line" | "space" | "ruled";
}

/**
 * External link block
 */
export interface ExternalLinkBlock {
  type: "external-link";
  label: string;
  url: string;
  description?: string;
}

/**
 * Union type of all content blocks
 */
export type JournalBlock =
  | TextBlock
  | HeadingBlock
  | ImageBlock
  | GalleryBlock
  | PullQuoteBlock
  | VideoBlock
  | ProjectReferenceBlock
  | FactBlock
  | EventBlock
  | CreditsBlock
  | DividerBlock
  | ExternalLinkBlock;

// ----------------------------------------------------------------------------
// SECTION SYSTEM
// ----------------------------------------------------------------------------

/**
 * Editorial section for structured content
 */
export interface JournalSection {
  id: string;
  number?: string; // "01", "02", etc.
  title: string;
  blocks: JournalBlock[];
}

// ----------------------------------------------------------------------------
// ARTICLE MODEL
// ----------------------------------------------------------------------------

/**
 * Complete journal article with editorial document structure
 */
export interface JournalArticle {
  // Identity
  id: string;
  slug: string;

  // Type & Classification
  type: JournalType;
  category: JournalCategory;

  // Metadata
  title: string;
  subtitle?: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt?: string;

  // Author
  author?: Person;

  // Hero
  hero?: JournalMedia;

  // Content Structure
  sections?: JournalSection[]; // Structured content
  content?: string | Array<Record<string, unknown>>; // Portable text or legacy string

  // Event-specific
  event?: JournalEvent;

  // Cross-references
  relatedProjects?: string[];
  relatedArticles?: string[];

  // Reading metadata
  estimatedReadingTime?: number; // In minutes

  // SEO
  keywords?: string[];

  // Credits (can also be in CreditsBlock)
  credits?: Credit[];
}

// ----------------------------------------------------------------------------
// LEGACY SUPPORT
// ----------------------------------------------------------------------------

/**
 * Legacy article format for backward compatibility
 * @deprecated Use JournalArticle with block-based content
 */
export interface LegacyJournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string; // Plain text content
  coverImage: {
    src: string;
    alt: string;
  };
  author?: string;
  publishedAt: string;
  category: JournalCategory;
  relatedProjects?: string[];
  eventDetails?: {
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
  };
  credits?: Array<{
    name: string;
    role?: string;
    url?: string;
    images?: string;
  }>;
  externalLinks?: Array<{
    label: string;
    url: string;
    description?: string;
  }>;
}
