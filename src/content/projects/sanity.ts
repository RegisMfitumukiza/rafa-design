/**
 * Sanity-Backed Project Data Functions
 *
 * Drop-in replacement for hardcoded project data functions.
 * Maintains identical function signatures and return types for
 * complete backward compatibility with existing components.
 *
 * @see src/content/projects/index.ts for original implementations
 */

import type { Project, ProjectCategory } from "./index";

import { client } from "@/sanity/lib/client";
import { cacheTags } from "@/sanity/lib/fetch";
import {
  projectBySlugQuery,
  projectsQuery,
  projectsBySlugQuery,
  projectSlugsQuery,
} from "@/sanity/lib/queries";
import { transformSanityProject, transformSanityProjects } from "@/sanity/lib/transforms";

// Remove cache - fetch fresh data every time in development
// In production, Next.js will handle caching via ISR

/**
 * Get all projects, sorted by year (descending)
 *
 * @returns Array of all published projects
 */
export async function getProjects(): Promise<Project[]> {
  try {
    // Fetch from Sanity (no cache in dev, Next.js handles caching in production)
    const sanityProjects = await client.fetch(
      projectsQuery,
      {},
      {
        next: { tags: [cacheTags.projects] },
      },
    );
    const projects = transformSanityProjects(sanityProjects);

    return projects;
  } catch (error) {
    console.error("Failed to fetch projects from Sanity:", error);
    return [];
  }
}

/**
 * Get all featured projects
 *
 * @returns Array of featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getProjects();
  return allProjects.filter((project) => project.featured);
}

/**
 * Get a single project by slug
 *
 * @param slug - Project slug identifier
 * @returns Project if found, undefined otherwise
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const sanityProject = await client.fetch(
      projectBySlugQuery,
      { slug },
      {
        next: { tags: [cacheTags.projects, cacheTags.project(slug)] },
      },
    );

    if (!sanityProject) {
      return undefined;
    }

    return transformSanityProject(sanityProject) ?? undefined;
  } catch (error) {
    console.error(`Failed to fetch project ${slug} from Sanity:`, error);
    return undefined;
  }
}

/**
 * Get a project by title (exact match)
 *
 * @param title - Project title
 * @returns Project if found, undefined otherwise
 */
export async function getProjectByTitle(title: string): Promise<Project | undefined> {
  const allProjects = await getProjects();
  return allProjects.find((project) => project.title === title);
}

/**
 * Get all projects in a specific category
 *
 * @param category - Project category
 * @returns Array of projects in that category
 */
export async function getProjectsByCategory(category: ProjectCategory): Promise<Project[]> {
  const allProjects = await getProjects();
  return allProjects.filter((project) => project.category.includes(category));
}

/**
 * Get all active categories (categories that have at least one project)
 *
 * @returns Array of active categories
 */
export async function getActiveCategories(): Promise<ProjectCategory[]> {
  const allProjects = await getProjects();
  const categoriesSet = new Set<ProjectCategory>();

  allProjects.forEach((project) => {
    project.category.forEach((cat) => categoriesSet.add(cat));
  });

  return Array.from(categoriesSet).sort();
}

/**
 * Get related projects based on category overlap and featured status
 *
 * Uses a scoring algorithm:
 * - Same category: +1 point per shared category
 * - Featured status: +2 points
 *
 * @param project - Reference project
 * @param count - Maximum number of related projects to return (default: 3)
 * @returns Array of related projects, sorted by relevance
 */
export async function getRelatedProjects(project: Project, count = 3): Promise<Project[]> {
  const allProjects = await getProjects();

  // Calculate relevance score for each project
  const scoredProjects = allProjects
    .filter((p) => p.slug !== project.slug) // Exclude current project
    .map((p) => {
      let score = 0;

      // Score based on category overlap
      const sharedCategories = p.category.filter((cat) => project.category.includes(cat));
      score += sharedCategories.length;

      // Bonus for featured projects
      if (p.featured) {
        score += 2;
      }

      return { project: p, score };
    })
    .filter((item) => item.score > 0) // Only projects with some relevance
    .sort((a, b) => {
      // Sort by score (descending), then by year (descending)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.project.year - a.project.year;
    });

  return scoredProjects.slice(0, count).map((item) => item.project);
}

/**
 * Get projects by slug array (for service-related projects)
 *
 * @param slugs - Array of project slugs
 * @returns Array of projects matching the slugs
 */
export async function getProjectsBySlugs(slugs: string[]): Promise<Project[]> {
  try {
    const sanityProjects = await client.fetch(
      projectsBySlugQuery,
      { slugs },
      {
        next: { tags: [cacheTags.projects] },
      },
    );
    return transformSanityProjects(sanityProjects);
  } catch (error) {
    console.error("Failed to fetch projects by slugs from Sanity:", error);
    return [];
  }
}

/**
 * Get all project slugs (for static path generation)
 *
 * @returns Array of project slugs
 */
export async function getProjectSlugs(): Promise<string[]> {
  try {
    return await client.fetch(
      projectSlugsQuery,
      {},
      {
        next: { tags: [cacheTags.projects] },
      },
    );
  } catch (error) {
    console.error("Failed to fetch project slugs from Sanity:", error);
    return [];
  }
}

/**
 * Clear the projects cache (for development/testing)
 * Note: Cache removed in favor of letting Next.js handle caching
 */
export function clearProjectsCache(): void {
  console.log("Cache disabled - fetching fresh data from Sanity");
}
