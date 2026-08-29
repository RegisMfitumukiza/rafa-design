/**
 * Sanity Data Fetching Utilities
 *
 * High-level functions for fetching and transforming Sanity data.
 * These functions combine GROQ queries, client calls, and transforms
 * to provide ready-to-use data for Next.js pages.
 *
 * @see src/sanity/lib/queries.ts for GROQ queries
 * @see src/sanity/lib/transforms.ts for data transforms
 */

import type { JournalArticle, JournalCategory } from "@/content/journal";
import type { Project } from "@/content/projects";

import { client } from "./client";
import {
  articlesQuery,
  articleBySlugQuery,
  articlesByCategoryQuery,
  featuredArticleQuery,
  articleSlugsQuery,
  projectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsBySlugQuery,
} from "./queries";
import {
  transformSanityArticle,
  transformSanityArticles,
  transformSanityProject,
  transformSanityProjects,
} from "./transforms";

/**
 * ============================================================================
 * JOURNAL FETCHING
 * ============================================================================
 */

/**
 * Get all journal articles
 */
export async function getArticles(): Promise<JournalArticle[]> {
  try {
    const sanityArticles = await client.fetch(articlesQuery);
    return transformSanityArticles(sanityArticles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

/**
 * Get single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<JournalArticle | null> {
  try {
    const sanityArticle = await client.fetch(articleBySlugQuery, { slug });
    if (!sanityArticle) return null;
    return transformSanityArticle(sanityArticle);
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    return null;
  }
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category: JournalCategory): Promise<JournalArticle[]> {
  try {
    const sanityArticles = await client.fetch(articlesByCategoryQuery, { category });
    return transformSanityArticles(sanityArticles);
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
    return [];
  }
}

/**
 * Get featured article (latest)
 */
export async function getFeaturedArticle(): Promise<JournalArticle | null> {
  try {
    const sanityArticle = await client.fetch(featuredArticleQuery);
    if (!sanityArticle) return null;
    return transformSanityArticle(sanityArticle);
  } catch (error) {
    console.error("Error fetching featured article:", error);
    return null;
  }
}

/**
 * Get related articles for an article (by category, excluding current)
 */
export async function getRelatedArticles(
  slug: string,
  category: JournalCategory,
  limit = 3,
): Promise<JournalArticle[]> {
  try {
    const query = `
      *[_type == "journalArticle" && category == $category && slug.current != $slug && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...${limit}] {
        _id,
        slug,
        title,
        excerpt,
        category,
        publishedAt,
        hero {
          asset->{
            _id,
            url,
            metadata {
              dimensions,
              lqip
            }
          },
          alt,
          caption,
          credit
        }
      }
    `;
    const sanityArticles = await client.fetch(query, { category, slug });
    return transformSanityArticles(sanityArticles);
  } catch (error) {
    console.error(`Error fetching related articles for ${slug}:`, error);
    return [];
  }
}

/**
 * Get all article slugs (for generateStaticParams)
 */
export async function getArticleSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch<string[]>(articleSlugsQuery);
    return slugs || [];
  } catch (error) {
    console.error("Error fetching article slugs:", error);
    return [];
  }
}

/**
 * ============================================================================
 * PROJECT FETCHING
 * ============================================================================
 */

/**
 * Get all projects
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const sanityProjects = await client.fetch(projectsQuery);
    return transformSanityProjects(sanityProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

/**
 * Get single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const sanityProject = await client.fetch(projectBySlugQuery, { slug });
    if (!sanityProject) return null;
    return transformSanityProject(sanityProject);
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return null;
  }
}

/**
 * Get projects by slug array (for related projects)
 */
export async function getProjectsBySlugs(slugs: string[]): Promise<Project[]> {
  try {
    const sanityProjects = await client.fetch(projectsBySlugQuery, { slugs });
    return transformSanityProjects(sanityProjects);
  } catch (error) {
    console.error("Error fetching projects by slugs:", error);
    return [];
  }
}

/**
 * Get all project slugs (for generateStaticParams)
 */
export async function getProjectSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch<string[]>(projectSlugsQuery);
    return slugs || [];
  } catch (error) {
    console.error("Error fetching project slugs:", error);
    return [];
  }
}

/**
 * ============================================================================
 * CACHE TAGS
 * ============================================================================
 */

/**
 * Cache tag helpers for Next.js 15+ on-demand revalidation
 */
export const cacheTags = {
  articles: "articles",
  article: (slug: string) => `article:${slug}`,
  projects: "projects",
  project: (slug: string) => `project:${slug}`,
} as const;
