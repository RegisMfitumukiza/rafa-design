/**
 * Sanity Data Transformation Layer
 *
 * Transforms Sanity CMS responses to match the existing TypeScript interfaces
 * used throughout the RAFA Design website. This ensures complete compatibility
 * with all existing components without requiring any component-level changes.
 *
 * @see src/content/projects/index.ts for target interfaces
 */

import type { JournalArticle, Person } from "@/content/journal";
import type {
  BeforeAfterImage,
  ChapterIntent,
  Project,
  ProjectAward,
  ProjectChapter,
  ProjectCoordinates,
  ProjectDrawing,
  ProjectMaterial,
  ProjectSEO,
  ProjectTeam,
} from "@/content/projects";
import type { Service, ServiceApproach } from "@/content/services";
import type { Location } from "@/content/types";

import {
  sanityImageToAsset,
  sanityImageToChapterImage,
  sanityImagesToChapterImages,
  type SanityRawImage,
} from "./image";

interface SanityRawProject {
  slug?: { current?: string };
  title?: string;
  subtitle?: string;
  category?: import("@/content/projects").ProjectCategory[];
  typology?: string;
  status?: import("@/content/projects").ProjectStatus;
  year?: number;
  areaM2?: number;
  featured?: boolean;
  location?: Location;
  coordinates?: ProjectCoordinates;
  client?: string;
  concept?: string;
  description?: string;
  story?: string;
  services?: string[];
  heroImage?: SanityRawImage;
  gallery?: SanityRawImage[];
  chapters?: Array<{ heading?: string; body?: string; image?: SanityRawImage }>;
  materialNarrative?: Array<{ name?: string; rationale?: string }>;
  lightStrategy?: string;
  siteResponse?: string;
  drawings?: Array<{
    title?: string;
    code?: string;
    scale?: string;
    image?: SanityRawImage;
    alt?: string;
    caption?: string;
    description?: string;
  }>;
  beforeAfter?: { before?: SanityRawImage; after?: SanityRawImage; caption?: string };
  photographerCredit?: string;
  team?: {
    partnerInCharge?: string;
    projectLead?: string;
    team?: string[];
    collaborators?: string[];
  };
  awards?: Array<{ title?: string; year?: number; organization?: string }>;
  seo?: { title?: string; description?: string; ogImage?: SanityRawImage };
  [key: string]: unknown;
}

/**
 * Transform Sanity project document to Project interface
 *
 * @param sanityProject - Raw project document from Sanity
 * @returns Fully transformed Project matching TypeScript interface
 */
export function transformSanityProject(sanityProject: SanityRawProject): Project | null {
  // Transform hero image (required, but handle gracefully if missing during migration)
  const heroImage = sanityImageToAsset(sanityProject.heroImage);
  if (!heroImage) {
    console.warn(`Project ${sanityProject.slug?.current} missing hero image - skipping`);
    return null; // Return null instead of throwing, will be filtered out
  }

  // Transform gallery images (can include ChapterImage metadata)
  const gallery = sanityImagesToChapterImages(sanityProject.gallery || []);

  // Transform drawings if present
  const drawings = sanityProject.drawings
    ? sanityProject.drawings
        .map((drawing, index: number) => transformDrawing(drawing, index))
        .filter((d): d is ProjectDrawing => d !== null)
    : undefined;

  // Transform before/after images
  const beforeAfter = sanityProject.beforeAfter
    ? transformBeforeAfter(sanityProject.beforeAfter)
    : undefined;

  // Transform chapters with images
  const chapters = sanityProject.chapters
    ? sanityProject.chapters.map(transformChapter).filter((c): c is ProjectChapter => c !== null)
    : undefined;

  // Transform material narrative
  const materialNarrative = sanityProject.materialNarrative
    ? sanityProject.materialNarrative.map(transformMaterial)
    : undefined;

  // Transform team
  const team = sanityProject.team ? transformTeam(sanityProject.team) : undefined;

  // Transform awards
  const awards = sanityProject.awards ? sanityProject.awards.map(transformAward) : undefined;

  // Transform SEO if present
  const seo = sanityProject.seo ? transformSEO(sanityProject.seo) : undefined;

  // Transform location
  const location: Location = {
    city: sanityProject.location?.city || "",
    country: sanityProject.location?.country || "",
  };

  // Transform coordinates if present
  const coordinates: ProjectCoordinates | undefined = sanityProject.coordinates
    ? {
        lat: sanityProject.coordinates.lat,
        lng: sanityProject.coordinates.lng,
        label: sanityProject.coordinates.label,
      }
    : undefined;

  // Build complete Project object
  const project: Project = {
    // Identity
    id: sanityProject.slug?.current || "",
    slug: sanityProject.slug?.current || "",
    title: sanityProject.title || "",

    // Classification
    category: sanityProject.category || [],
    status: sanityProject.status || "completed",
    year: sanityProject.year || new Date().getFullYear(),

    // Location
    location,

    // Editorial Storytelling
    description: sanityProject.description || "",

    // Media
    heroImage,
    gallery,

    // Configuration
    services: sanityProject.services || [],
    featured: sanityProject.featured ?? false,

    // Optional fields (conditional spread for exactOptionalPropertyTypes compliance)
    ...(sanityProject.subtitle ? { subtitle: sanityProject.subtitle } : {}),
    ...(sanityProject.typology
      ? {
          typology: Array.isArray(sanityProject.typology)
            ? sanityProject.typology
            : [sanityProject.typology],
        }
      : {}),
    ...(sanityProject.areaM2 ? { areaM2: sanityProject.areaM2 } : {}),
    ...(coordinates ? { coordinates } : {}),
    ...(sanityProject.client ? { client: sanityProject.client } : {}),
    ...(sanityProject.concept ? { concept: sanityProject.concept } : {}),
    ...(sanityProject.story ? { story: sanityProject.story } : {}),
    ...(chapters && chapters.length > 0 ? { chapters } : {}),
    ...(materialNarrative && materialNarrative.length > 0 ? { materialNarrative } : {}),
    ...(sanityProject.lightStrategy ? { lightStrategy: sanityProject.lightStrategy } : {}),
    ...(sanityProject.siteResponse ? { siteResponse: sanityProject.siteResponse } : {}),
    ...(drawings && drawings.length > 0 ? { drawings } : {}),
    ...(beforeAfter ? { beforeAfter } : {}),
    ...(sanityProject.photographerCredit
      ? { photographerCredit: sanityProject.photographerCredit }
      : {}),
    ...(team ? { team } : {}),
    ...(awards && awards.length > 0 ? { awards } : {}),
    ...(seo ? { seo } : {}),
  };

  return project;
}

/**
 * Transform Sanity chapter to ProjectChapter
 */
function transformChapter(sanityChapter: {
  heading?: string;
  body?: string;
  image?: SanityRawImage;
}): ProjectChapter | null {
  if (!sanityChapter?.body) return null;

  const chapter: ProjectChapter = {
    ...(sanityChapter.heading ? { heading: sanityChapter.heading } : {}),
    body: sanityChapter.body,
  };

  // Transform chapter image if present
  if (sanityChapter.image) {
    const chapterImage = sanityImageToChapterImage(sanityChapter.image);
    if (chapterImage) {
      chapter.image = chapterImage;
    }
  }

  return chapter;
}

/**
 * Transform Sanity drawing to ProjectDrawing
 */
function transformDrawing(
  sanityDrawing: {
    title?: string;
    code?: string;
    scale?: string;
    image?: SanityRawImage;
    alt?: string;
    caption?: string;
    description?: string;
  },
  index: number,
): ProjectDrawing | null {
  if (!sanityDrawing?.image) return null;

  const image = sanityImageToAsset(sanityDrawing.image);
  if (!image) return null;

  return {
    id: `drawing-${index + 1}`,
    title: sanityDrawing.title || "",
    code: sanityDrawing.code || "",
    scale: sanityDrawing.scale || "",
    image: {
      ...image,
      alt: sanityDrawing.alt || image.alt,
      ...(sanityDrawing.caption ? { caption: sanityDrawing.caption } : {}),
    },
    caption: sanityDrawing.caption || "",
    ...(sanityDrawing.description ? { description: sanityDrawing.description } : {}),
  };
}

/**
 * Transform Sanity material to ProjectMaterial
 */
function transformMaterial(sanityMaterial: { name?: string; rationale?: string }): ProjectMaterial {
  return {
    name: sanityMaterial.name || "",
    rationale: sanityMaterial.rationale || "",
  };
}

/**
 * Transform Sanity team to ProjectTeam
 */
function transformTeam(sanityTeam: {
  partnerInCharge?: string;
  projectLead?: string;
  team?: string[];
  collaborators?: string[];
}): ProjectTeam {
  return {
    partnerInCharge: sanityTeam.partnerInCharge || "",
    projectLead: sanityTeam.projectLead || "",
    team: sanityTeam.team || [],
    ...(sanityTeam.collaborators && sanityTeam.collaborators.length > 0
      ? { collaborators: sanityTeam.collaborators }
      : {}),
  };
}

/**
 * Transform Sanity award to ProjectAward
 */
function transformAward(sanityAward: {
  title?: string;
  year?: number;
  organization?: string;
}): ProjectAward {
  return {
    title: sanityAward.title || "",
    year: sanityAward.year || new Date().getFullYear(),
    ...(sanityAward.organization ? { organization: sanityAward.organization } : {}),
  };
}

/**
 * Transform Sanity before/after to BeforeAfterImage
 */
function transformBeforeAfter(sanityBeforeAfter: {
  before?: SanityRawImage;
  after?: SanityRawImage;
  caption?: string;
}): BeforeAfterImage | undefined {
  const before = sanityImageToAsset(sanityBeforeAfter.before);
  const after = sanityImageToAsset(sanityBeforeAfter.after);

  if (!before || !after) return undefined;

  return {
    before,
    after,
    ...(sanityBeforeAfter.caption ? { caption: sanityBeforeAfter.caption } : {}),
  };
}

/**
 * Transform array of Sanity projects
 *
 * @param sanityProjects - Array of raw Sanity project documents
 * @returns Array of transformed Projects
 */
export function transformSanityProjects(sanityProjects: SanityRawProject[]): Project[] {
  if (!sanityProjects || !Array.isArray(sanityProjects)) return [];

  return sanityProjects
    .map((project) => {
      try {
        return transformSanityProject(project);
      } catch (error) {
        console.error(`Failed to transform project ${project?.slug?.current}:`, error);
        return null;
      }
    })
    .filter((project): project is Project => project !== null);
}

/**
 * Transform Sanity SEO to ProjectSEO
 */
function transformSEO(sanitySEO?: {
  title?: string;
  description?: string;
  ogImage?: SanityRawImage;
}): ProjectSEO | undefined {
  if (!sanitySEO) return undefined;

  const seo: ProjectSEO = {};

  if (sanitySEO.title) {
    seo.title = sanitySEO.title;
  }

  if (sanitySEO.description) {
    seo.description = sanitySEO.description;
  }

  if (sanitySEO.ogImage) {
    const ogImage = sanityImageToAsset(sanitySEO.ogImage);
    if (ogImage) {
      seo.ogImage = ogImage;
    }
  }

  // Only return SEO object if at least one field is populated
  return Object.keys(seo).length > 0 ? seo : undefined;
}

/**
 * ============================================================================
 * JOURNAL TRANSFORMS
 * ============================================================================
 */

export interface SanityRawArticle {
  slug?: { current?: string };
  type?: import("@/content/journal").JournalType;
  category?: import("@/content/journal").JournalCategory;
  title?: string;
  subtitle?: string;
  excerpt?: string;
  publishedAt?: string;
  updatedAt?: string;
  hero?: SanityRawImage;
  author?: { name?: string; role?: string; url?: string };
  readingTime?: number;
  content?: Array<Record<string, unknown>>;
  relatedProjects?: Array<{ slug?: { current?: string } | string }>;
  relatedArticles?: Array<{ slug?: { current?: string } | string }>;
  seo?: { keywords?: string[] };
  [key: string]: unknown;
}

/**
 * Transform Sanity journal article to JournalArticle interface
 *
 * @param sanityArticle - Raw article document from Sanity
 * @returns Fully transformed JournalArticle
 */
export function transformSanityArticle(sanityArticle: SanityRawArticle): JournalArticle | null {
  // Transform hero image (required)
  const heroAsset = sanityImageToAsset(sanityArticle.hero);
  if (!heroAsset) {
    console.warn(`Article ${sanityArticle.slug?.current} missing hero image - skipping`);
    return null;
  }

  let heroCredit: import("@/content/journal").Credit | undefined = undefined;
  if (sanityArticle.hero?.credit) {
    heroCredit =
      typeof sanityArticle.hero.credit === "string"
        ? { role: "photography", name: sanityArticle.hero.credit }
        : (sanityArticle.hero.credit as import("@/content/journal").Credit);
  }

  const hero: import("@/content/journal").JournalMedia = {
    src: heroAsset.src,
    alt: heroAsset.alt || sanityArticle.title || "",
    aspectRatio: "hero",
    ...(heroAsset.caption ? { caption: heroAsset.caption } : {}),
    ...(heroCredit ? { credit: heroCredit } : {}),
  };

  // Transform author if present
  const author = sanityArticle.author ? transformAuthor(sanityArticle.author) : undefined;

  // Transform related projects if present
  const relatedProjects = sanityArticle.relatedProjects
    ? sanityArticle.relatedProjects
        .map((project) => (typeof project.slug === "object" ? project.slug?.current : project.slug))
        .filter((slug): slug is string => Boolean(slug))
    : undefined;

  // Transform related articles if present
  const relatedArticles = sanityArticle.relatedArticles
    ? sanityArticle.relatedArticles
        .map((article) => (typeof article.slug === "object" ? article.slug?.current : article.slug))
        .filter((slug): slug is string => Boolean(slug))
    : undefined;

  // Extract keywords from SEO object if present
  const keywords = sanityArticle.seo?.keywords || undefined;

  // Build complete JournalArticle object
  const article: JournalArticle = {
    // Identity
    id: sanityArticle.slug?.current || "",
    slug: sanityArticle.slug?.current || "",

    // Type & Classification
    type: sanityArticle.type || "essay",
    category: sanityArticle.category || "ideas",

    // Metadata
    title: sanityArticle.title || "",
    excerpt: sanityArticle.excerpt || "",
    publishedAt: sanityArticle.publishedAt || new Date().toISOString(),

    // Hero
    hero,

    // Content (portable text array - will be processed by frontend)
    content: sanityArticle.content || [],

    // Optional fields
    ...(sanityArticle.subtitle ? { subtitle: sanityArticle.subtitle } : {}),
    ...(sanityArticle.updatedAt ? { updatedAt: sanityArticle.updatedAt } : {}),
    ...(author ? { author } : {}),
    ...(sanityArticle.readingTime ? { estimatedReadingTime: sanityArticle.readingTime } : {}),
    ...(relatedProjects && relatedProjects.length > 0 ? { relatedProjects } : {}),
    ...(relatedArticles && relatedArticles.length > 0 ? { relatedArticles } : {}),
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
  };

  return article;
}

/**
 * Transform Sanity author to Person
 */
function transformAuthor(sanityAuthor: { name?: string; role?: string; url?: string }): Person {
  const name = sanityAuthor.name || "RAFA Design Hub";
  return {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    ...(sanityAuthor.role ? { role: sanityAuthor.role } : {}),
    ...(sanityAuthor.url ? { url: sanityAuthor.url } : {}),
  };
}

/**
 * Transform array of Sanity articles
 *
 * @param sanityArticles - Array of raw Sanity article documents
 * @returns Array of transformed JournalArticles
 */
export function transformSanityArticles(sanityArticles: SanityRawArticle[]): JournalArticle[] {
  if (!sanityArticles || !Array.isArray(sanityArticles)) return [];

  return sanityArticles
    .map((article) => {
      try {
        return transformSanityArticle(article);
      } catch (error) {
        console.error(`Failed to transform article ${article?.slug?.current}:`, error);
        return null;
      }
    })
    .filter((article): article is JournalArticle => article !== null);
}

/**
 * ============================================================================
 * SERVICE TRANSFORMS
 * ============================================================================
 */

export interface SanityRawService {
  slug?: { current?: string };
  title?: string;
  shortDescription?: string;
  intro?: string;
  description?: string;
  icon?: string;
  approach?: Array<{ title?: string; statement?: string }>;
  relatedProjects?: Array<{ slug?: { current?: string } | string }>;
  editorialIntents?: ChapterIntent[];
  [key: string]: unknown;
}

/**
 * Transform Sanity service to Service interface
 *
 * @param sanityService - Raw service document from Sanity
 * @returns Fully transformed Service
 */
export function transformSanityService(sanityService: SanityRawService): Service | null {
  if (!sanityService || !sanityService.slug?.current) return null;

  // Transform approach points
  const approach: ServiceApproach[] = sanityService.approach
    ? sanityService.approach
        .filter((point) => Boolean(point?.title && point?.statement))
        .map((point) => ({
          title: point.title || "",
          statement: point.statement || "",
        }))
    : [];

  // Transform related projects (get slugs only)
  const relatedProjects = sanityService.relatedProjects
    ? sanityService.relatedProjects
        .map((project) => (typeof project.slug === "object" ? project.slug?.current : project.slug))
        .filter((slug): slug is string => Boolean(slug))
    : [];

  // Build complete Service object
  const service: Service = {
    id: sanityService.slug.current,
    slug: sanityService.slug.current,
    title: sanityService.title || "",
    shortDescription: sanityService.shortDescription || "",
    intro: sanityService.intro || "",
    description: sanityService.description || "",
    approach,
    relatedProjects,
    editorialIntents: sanityService.editorialIntents || [],

    // Optional fields
    ...(sanityService.icon ? { icon: sanityService.icon } : {}),
  };

  return service;
}

/**
 * Transform array of Sanity services
 *
 * @param sanityServices - Array of raw Sanity service documents
 * @returns Array of transformed Services
 */
export function transformSanityServices(sanityServices: SanityRawService[]): Service[] {
  if (!sanityServices || !Array.isArray(sanityServices)) return [];

  return sanityServices
    .map((service) => {
      try {
        return transformSanityService(service);
      } catch (error) {
        console.error(`Failed to transform service ${service?.slug?.current}:`, error);
        return null;
      }
    })
    .filter((service): service is Service => service !== null);
}
