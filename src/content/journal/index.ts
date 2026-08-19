// ============================================================================
// RAFA JOURNAL — MAIN EXPORT
// Unified interface for legacy and new article formats
// ============================================================================

import type { JournalArticle, LegacyJournalArticle } from "./types";

// Export new types
export * from "./types";

// Import new articles
import { articles as newArticles } from "./articles";
import { migrateLegacyArticle } from "./migration";

// ----------------------------------------------------------------------------
// LEGACY TYPES (for backward compatibility)
// ----------------------------------------------------------------------------

export type JournalCategory = "news" | "research" | "awards" | "events" | "ideas" | "publications";

export interface EventDetails {
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
}

export interface ImageCredit {
  name: string;
  role?: string;
  url?: string;
  images?: string[];
}

export interface ExternalLink {
  label: string;
  url: string;
  description?: string;
}

// ----------------------------------------------------------------------------
// LEGACY ARTICLES (will be migrated)
// ----------------------------------------------------------------------------

const legacyArticles: LegacyJournalArticle[] = [
  {
    id: "material-stories-concrete",
    slug: "material-stories-concrete",
    title: "Material Stories: Concrete",
    excerpt:
      "Concrete is often dismissed as cold and industrial. We see it differently — as a material of honesty, texture, and quiet permanence.",
    content:
      "Of all the materials we work with, concrete carries the most prejudice. It is associated with brutalist towers and grey car parks, with everything impersonal and unlovable about modern construction. But concrete is also the material of the Roman Pantheon, of the great Mediterranean reservoirs, of bridges that have outlasted empires. Its story depends entirely on how it is used.\n\nWe use concrete with restraint and respect. A cast-in-situ concrete wall, formed carefully and left to cure at its own pace, develops a surface that records the process of its making — the grain of the formwork, the variation of the mix, the subtle colour changes from pour to pour.\n\nIn our projects, concrete appears where it is the most honest answer: as a retaining wall against a hillside, as a cantilevered stair that needs no support, as a thermal mass that cools a courtyard house. We never paint it, rarely render it. The material is allowed to be itself.\n\nThis is the first in a series on the materials we build with. Each material — stone, timber, lime, ceramic — has a story worth telling. Because buildings are made of stories, held in place by materials.",
    coverImage: {
      src: "/images/journal/material-stories-concrete.jpg",
      alt: "Concrete surface detail",
    },
    author: "Tiago Martins",
    publishedAt: "2026-05-02",
    category: "research",
    relatedProjects: ["atelier-norte", "studio-patio"],
  },
  {
    id: "coastal-modernism",
    slug: "coastal-modernism",
    title: "Coastal Modernism",
    excerpt:
      "A reflection on the architecture of the Algarve — white volumes, shaded patios, and the quiet radicalism of the vernacular.",
    content:
      "For decades, the architecture of the Algarve coast was understood as a backdrop for tourism — white cubes stacked above a blue sea, sun-bleached and interchangeable. But the vernacular architecture of the region is far more sophisticated than its tourist image suggests.\n\nThe traditional Algarvian house is an essay in climate response. Its thick walls moderate the temperature swing between day and night. Its deep roof overhangs shade the facade in summer and admit the low winter sun. Its patio creates a shaded microclimate at the heart of the house, where water, planting, and air movement keep the interior cool without mechanical systems.\n\nModernist architects have long admired these principles. In the 1950s and 60s, Portuguese architects adapted the vernacular to a contemporary idiom — flat roofs, generous terraces, sliding glass walls that dissolve the boundary between inside and out. The result was a coastal modernism that felt both modern and deeply rooted.\n\nOur own coastal projects — Casa Monte, Villa Marim — are conversations with this tradition. We are not building pastiche. We are re-reading the principles and expressing them in the language of today: larger openings, better glazing, more ambitious structures. But the essence is the same: shade, breeze, water, and the discipline of doing less.",
    coverImage: {
      src: "/images/journal/coastal-modernism.jpg",
      alt: "Coastal house with white volumes",
    },
    author: "Sara Costa",
    publishedAt: "2025-11-14",
    category: "ideas",
    relatedProjects: ["casa-monte", "villa-marim"],
  },
  {
    id: "material-stories-limestone",
    slug: "material-stories-limestone",
    title: "Material Stories: Limestone",
    excerpt:
      "The second in our series on materials — the enduring partnership between Portuguese architecture and its most abundant stone.",
    content:
      "Portugal is a country built of limestone. The warm, golden stone of Lisbon's built fabric, the pale limestone of the Algarve cliffs, the marly calcareous stone of the interior — for two thousand years, this material has shaped the country's architecture.\n\nLimestone is a sedimentary rock, formed from the compressed remains of marine organisms. It is warm to the touch, soft enough to carve, and hard enough to endure. It weathers gracefully, taking on a patina that records the passage of time.\n\nIn our projects, limestone appears in several roles. In Villa Marim, local limestone is used for the walls that define the courtyards, giving the project a sense of permanence and grounding. In Largo Gallery, a pale limestone floor unifies the sequence of rooms and absorbs the changing quality of daylight.\n\nWe are careful about sourcing. Stone is heavy and carbon-intensive to transport, so we prefer local quarries. Each region of Portugal produces a slightly different stone — a difference in colour, grain, and character that roots the building in its place.\n\nLike all materials in our practice, limestone is not decoration. It is structure, memory, and context made visible.",
    coverImage: {
      src: "/images/journal/material-stories-limestone.jpg",
      alt: "Limestone wall texture",
    },
    author: "Tiago Martins",
    publishedAt: "2026-03-21",
    category: "research",
    relatedProjects: ["villa-marim", "largo-gallery"],
  },
];

// ----------------------------------------------------------------------------
// UNIFIED ARTICLE COLLECTION
// ----------------------------------------------------------------------------

/**
 * All articles (new format + migrated legacy)
 */
const allArticles: JournalArticle[] = [...newArticles, ...legacyArticles.map(migrateLegacyArticle)];

const categories: JournalCategory[] = [
  "news",
  "research",
  "awards",
  "events",
  "ideas",
  "publications",
];

// ----------------------------------------------------------------------------
// PUBLIC API
// ----------------------------------------------------------------------------

export function getArticles(): JournalArticle[] {
  // Sort by date descending (latest first)
  return [...allArticles].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getFeaturedArticle(): JournalArticle {
  // Featured article is always the latest (most recent)
  const sorted = getArticles();
  return sorted[0]!;
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: JournalCategory): JournalArticle[] {
  return allArticles.filter((a) => a.category === category);
}

export function getActiveCategories(): JournalCategory[] {
  const active = new Set<JournalCategory>();
  allArticles.forEach((a) => active.add(a.category));
  return categories.filter((c) => active.has(c));
}

export function getRelatedArticles(article: JournalArticle, count = 5): JournalArticle[] {
  const scored = allArticles
    .filter((a) => a.slug !== article.slug)
    .map((a) => {
      let score = 0;
      // Matching related project (+3)
      if (a.relatedProjects?.some((p) => article.relatedProjects?.includes(p))) {
        score += 3;
      }
      // Matching category (+2)
      if (a.category === article.category) {
        score += 2;
      }
      // Matching article type (+1)
      if (a.type === article.type) {
        score += 1;
      }
      return { article: a, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.article.publishedAt).getTime() - new Date(a.article.publishedAt).getTime();
    });

  return scored.map((item) => item.article).slice(0, count);
}
