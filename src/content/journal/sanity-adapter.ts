/**
 * Sanity-Backed Journal Data Functions
 *
 * Single source of truth for all journal data functions.
 * Queries Sanity CMS directly with full type safety and transforms.
 *
 * @see src/sanity/lib/queries.ts for GROQ queries
 * @see src/sanity/lib/transforms.ts for data transforms
 */

import type { JournalArticle, JournalCategory } from "./types";

import { client } from "@/sanity/lib/client";
import { cacheTags } from "@/sanity/lib/fetch";
import {
  articlesQuery,
  articleBySlugQuery,
  articlesByCategoryQuery,
  featuredArticleQuery,
  articleSlugsQuery,
} from "@/sanity/lib/queries";
import { transformSanityArticle, transformSanityArticles } from "@/sanity/lib/transforms";

/**
 * Get all journal articles, sorted by publishedAt (descending)
 *
 * @returns Array of all published journal articles
 */
export async function getArticles(): Promise<JournalArticle[]> {
  try {
    const sanityArticles = await client.fetch(
      articlesQuery,
      {},
      {
        next: { tags: [cacheTags.articles] },
      },
    );
    return transformSanityArticles(sanityArticles);
  } catch (error) {
    console.error("Failed to fetch articles from Sanity:", error);
    return [];
  }
}

/**
 * Get a single article by slug
 *
 * @param slug - Article slug identifier
 * @returns Article if found, undefined otherwise
 */
export async function getArticleBySlug(slug: string): Promise<JournalArticle | undefined> {
  try {
    const sanityArticle = await client.fetch(
      articleBySlugQuery,
      { slug },
      {
        next: { tags: [cacheTags.articles, cacheTags.article(slug)] },
      },
    );
    if (!sanityArticle) return undefined;
    return transformSanityArticle(sanityArticle) ?? undefined;
  } catch (error) {
    console.error(`Failed to fetch article ${slug} from Sanity:`, error);
    return undefined;
  }
}

/**
 * Get the latest / featured article
 *
 * @returns Latest published article, or undefined if none
 */
export async function getFeaturedArticle(): Promise<JournalArticle | undefined> {
  try {
    const sanityArticle = await client.fetch(
      featuredArticleQuery,
      {},
      {
        next: { tags: [cacheTags.articles] },
      },
    );
    if (sanityArticle) {
      const transformed = transformSanityArticle(sanityArticle);
      if (transformed) return transformed;
    }
    const all = await getArticles();
    return all[0];
  } catch (error) {
    console.error("Failed to fetch featured article from Sanity:", error);
    return undefined;
  }
}

/**
 * Get articles by category
 *
 * @param category - Journal category
 * @returns Array of articles in that category
 */
export async function getArticlesByCategory(category: JournalCategory): Promise<JournalArticle[]> {
  try {
    const sanityArticles = await client.fetch(
      articlesByCategoryQuery,
      { category },
      {
        next: { tags: [cacheTags.articles] },
      },
    );
    return transformSanityArticles(sanityArticles);
  } catch (error) {
    console.error(`Failed to fetch articles for category ${category}:`, error);
    return [];
  }
}

/**
 * Get all active categories that have at least one published article
 *
 * @returns Array of active categories
 */
export async function getActiveCategories(): Promise<JournalCategory[]> {
  const allArticles = await getArticles();
  const categoriesSet = new Set<JournalCategory>();

  allArticles.forEach((article) => {
    if (article.category) {
      categoriesSet.add(article.category);
    }
  });

  return Array.from(categoriesSet).sort();
}

/**
 * Get related articles based on category overlap and shared project references
 *
 * @param article - Reference article
 * @param count - Maximum number of related articles to return (default: 3)
 * @returns Array of related articles
 */
export async function getRelatedArticles(
  article: JournalArticle,
  count = 3,
): Promise<JournalArticle[]> {
  const allArticles = await getArticles();

  return allArticles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => {
      // Prioritize shared category
      const aMatchesCategory = a.category === article.category ? 1 : 0;
      const bMatchesCategory = b.category === article.category ? 1 : 0;
      if (aMatchesCategory !== bMatchesCategory) {
        return bMatchesCategory - aMatchesCategory;
      }
      // Then sort by date
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, count);
}

/**
 * Get all article slugs (for static path generation)
 *
 * @returns Array of article slugs
 */
export async function getArticleSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch<string[]>(
      articleSlugsQuery,
      {},
      {
        next: { tags: [cacheTags.articles] },
      },
    );
    return slugs || [];
  } catch (error) {
    console.error("Failed to fetch article slugs from Sanity:", error);
    return [];
  }
}

/**
 * Backward compatibility export
 */
export const journal = {
  getArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getFeaturedArticle,
  getRelatedArticles,
  getArticleSlugs,
  getActiveCategories,
} as const;
