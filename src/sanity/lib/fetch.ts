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

import type { Benefit, CareerPosition, CareersContent } from "@/content/company/careers";
import type { ContactInformation } from "@/content/company/contact";
import type { JournalArticle, JournalCategory } from "@/content/journal";
import type { Project } from "@/content/projects";
import type { Service } from "@/content/services";
import type { SiteSettings } from "@/content/siteSettings";
import type { Award, ClientSector, Studio, TeamMember, TimelineEvent } from "@/content/studio";

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
  services: "services",
  service: (slug: string) => `service:${slug}`,
  team: "team",
  studio: "studio",
  careers: "careers",
  career: (slug: string) => `career:${slug}`,
  contact: "contact",
  settings: "settings",
} as const;

/**
 * ============================================================================
 * SERVICE FETCHING
 * ============================================================================
 */

/**
 * Get all services
 */
export async function getServices(): Promise<Service[]> {
  try {
    const { servicesQuery } = await import("./queries");
    const { transformSanityServices } = await import("./transforms");
    const sanityServices = await client.fetch(servicesQuery);
    return transformSanityServices(sanityServices);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

/**
 * Get single service by slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const { serviceBySlugQuery } = await import("./queries");
    const { transformSanityService } = await import("./transforms");
    const sanityService = await client.fetch(serviceBySlugQuery, { slug });
    if (!sanityService) return null;
    return transformSanityService(sanityService);
  } catch (error) {
    console.error(`Error fetching service ${slug}:`, error);
    return null;
  }
}

/**
 * Get all service slugs (for generateStaticParams)
 */
export async function getServiceSlugs(): Promise<string[]> {
  try {
    const { serviceSlugsQuery } = await import("./queries");
    const slugs = await client.fetch<string[]>(serviceSlugsQuery);
    return slugs || [];
  } catch (error) {
    console.error("Error fetching service slugs:", error);
    return [];
  }
}

/**
 * ============================================================================
 * TEAM MEMBER FETCHING
 * ============================================================================
 */

/**
 * Get all team members shown on the studio page.
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const { teamQuery } = await import("./queries");
    const { transformSanityTeamMembers } = await import("./transforms");
    const sanityMembers = await client.fetch(teamQuery);
    return transformSanityTeamMembers(sanityMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

/**
 * ============================================================================
 * STUDIO FETCHING
 * ============================================================================
 */

/**
 * Get studio information (singleton document).
 */
export async function getStudioInfo(): Promise<Studio | null> {
  try {
    const { studioQuery } = await import("./queries");
    const { transformSanityStudio } = await import("./transforms");
    const sanityStudio = await client.fetch(studioQuery);
    if (!sanityStudio) return null;
    return transformSanityStudio(sanityStudio);
  } catch (error) {
    console.error("Error fetching studio info:", error);
    return null;
  }
}

/**
 * Get the studio page's separate collections (awards, timeline, clientSectors).
 */
export async function getStudioCollections(): Promise<{
  awards: Award[];
  timeline: TimelineEvent[];
  clientSectors: ClientSector[];
  clientReferencesNote?: string;
}> {
  try {
    const { studioQuery } = await import("./queries");
    const { transformSanityStudioCollections } = await import("./transforms");
    const sanityStudio = await client.fetch(studioQuery);
    return transformSanityStudioCollections(sanityStudio || {});
  } catch (error) {
    console.error("Error fetching studio collections:", error);
    return { awards: [], timeline: [], clientSectors: [] };
  }
}

/**
 * Get the studio page's headline history narrative.
 */
export async function getStudioHistory(): Promise<string | undefined> {
  try {
    const { studioQuery } = await import("./queries");
    const sanityStudio = await client.fetch(studioQuery);
    return sanityStudio?.history || undefined;
  } catch (error) {
    console.error("Error fetching studio history:", error);
    return undefined;
  }
}

/**
 * ============================================================================
 * CAREER FETCHING
 * ============================================================================
 */

/**
 * Get all open career postings.
 */
export async function getCareers(): Promise<CareerPosition[]> {
  try {
    const { careersPositionsQuery } = await import("./queries");
    const { transformSanityCareers } = await import("./transforms");
    const sanityCareers = await client.fetch(careersPositionsQuery);
    return transformSanityCareers(sanityCareers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    return [];
  }
}

/**
 * Get a single career posting by slug.
 */
export async function getCareerBySlug(slug: string): Promise<CareerPosition | null> {
  try {
    const { careerBySlugQuery } = await import("./queries");
    const { transformSanityCareer } = await import("./transforms");
    const sanityCareer = await client.fetch(careerBySlugQuery, { slug });
    return transformSanityCareer(sanityCareer);
  } catch (error) {
    console.error(`Error fetching career ${slug}:`, error);
    return null;
  }
}

/**
 * Get all open career slugs (for generateStaticParams).
 */
export async function getCareerSlugs(): Promise<string[]> {
  try {
    const { careerSlugsQuery } = await import("./queries");
    const slugs = await client.fetch<string[]>(careerSlugsQuery);
    return slugs || [];
  } catch (error) {
    console.error("Error fetching career slugs:", error);
    return [];
  }
}

/**
 * Get the careers page singleton content (hero, open application, benefits).
 */
export async function getCareersPageContent(): Promise<{
  content: CareersContent;
  benefits: Benefit[];
}> {
  try {
    const { careersQuery } = await import("./queries");
    const { transformSanityCareersPage } = await import("./transforms");
    const sanityCareers = await client.fetch(careersQuery);
    return transformSanityCareersPage(sanityCareers || {});
  } catch (error) {
    console.error("Error fetching careers page content:", error);
    return {
      content: {
        hero: { overline: "", heading: "", body: "" },
        openApplication: { overline: "", heading: "", body: "", cta: "" },
      },
      benefits: [],
    };
  }
}

/**
 * ============================================================================
 * CONTACT FETCHING
 * ============================================================================
 */

/**
 * Get contact information (singleton document).
 */
export async function getContactInformation(): Promise<ContactInformation | null> {
  try {
    const { contactQuery } = await import("./queries");
    const { transformSanityContact } = await import("./transforms");
    const sanityContact = await client.fetch(contactQuery);
    if (!sanityContact) return null;
    return transformSanityContact(sanityContact);
  } catch (error) {
    console.error("Error fetching contact information:", error);
    return null;
  }
}

/**
 * ============================================================================
 * SITE SETTINGS FETCHING
 * ============================================================================
 */

/**
 * Get global site settings (singleton document).
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const { siteSettingsQuery } = await import("./queries");
    const { transformSanitySiteSettings } = await import("./transforms");
    const sanitySettings = await client.fetch(siteSettingsQuery);
    if (!sanitySettings) return null;
    return transformSanitySiteSettings(sanitySettings);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}
