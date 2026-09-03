/**
 * Sanity Data Transformation Layer
 *
 * Transforms Sanity CMS responses to match the existing TypeScript interfaces
 * used throughout the RAFA Design website. This ensures complete compatibility
 * with all existing components without requiring any component-level changes.
 *
 * @see src/content/projects/index.ts for target interfaces
 */

import type {
  Benefit,
  CareerPosition,
  CareersContent,
  PositionType,
} from "@/content/company/careers";
import type { ContactInformation, Office } from "@/content/company/contact";
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
import type { SiteSettings } from "@/content/siteSettings";
import type { Award, ClientSector, Studio, TeamMember, TimelineEvent } from "@/content/studio";
import type { ImageAsset, Location, SocialLink } from "@/content/types";

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

export interface SanityRawServiceProject {
  _id?: string;
  slug?: { current?: string } | string;
  title?: string;
  subtitle?: string;
  category?: unknown;
  typology?: unknown;
  year?: number;
  location?: Location;
  photographerCredit?: string;
  heroImage?: SanityRawImage;
  gallery?: SanityRawImage[];
}

export interface SanityRawService {
  slug?: { current?: string };
  title?: string;
  shortDescription?: string;
  intro?: string;
  description?: string;
  coverImage?: SanityRawImage;
  approach?: Array<{ title?: string; statement?: string }>;
  /** relatedProjects can be dereferenced objects (from []->) or bare slug references */
  relatedProjects?: Array<SanityRawServiceProject | { slug?: { current?: string } | string }>;
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

  // Transform related projects — extract slugs for the Service.relatedProjects string[]
  const relatedProjects = sanityService.relatedProjects
    ? sanityService.relatedProjects
        .map((project) => {
          const slugField = (project as SanityRawServiceProject).slug;
          if (typeof slugField === "object" && slugField !== null) return slugField.current;
          if (typeof slugField === "string") return slugField;
          return null;
        })
        .filter((slug): slug is string => Boolean(slug))
    : [];

  // Cover image priority:
  // 1. Explicit coverImage uploaded in Studio for this service
  // 2. heroImage of the first related project (already dereferenced in GROQ via []->)
  // 3. Nothing — components will show bg-muted placeholder
  const explicitCoverImage = sanityImageToAsset(sanityService.coverImage);
  const firstRelatedProject = sanityService.relatedProjects?.[0] as
    SanityRawServiceProject | undefined;
  const firstProjectHeroImage = firstRelatedProject?.heroImage
    ? sanityImageToAsset(firstRelatedProject.heroImage)
    : null;
  const coverImage = explicitCoverImage ?? firstProjectHeroImage ?? undefined;

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
    ...(coverImage ? { coverImage } : {}),
    // Store the display order from Sanity so components use the CMS value
    // rather than looking up position in the local hardcoded static array
    ...((sanityService as Record<string, unknown>).order !== undefined
      ? { order: Number((sanityService as Record<string, unknown>).order) }
      : {}),
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

/**
 * ============================================================================
 * TEAM MEMBER TRANSFORMS
 * ============================================================================
 */

export interface SanityRawTeamMember {
  _id?: string;
  slug?: { current?: string };
  name?: string;
  role?: string;
  biography?: string;
  disciplines?: string[];
  experience?: number;
  interests?: string[];
  email?: string;
  phone?: string;
  image?: SanityRawImage;
  socialLinks?: Array<{ platform?: string; url?: string; label?: string }>;
  order?: number;
  category?: string;
  [key: string]: unknown;
}

/**
 * Transform a Sanity team member into the shared `TeamMember` type.
 */
export function transformSanityTeamMember(sanityMember: SanityRawTeamMember): TeamMember | null {
  if (!sanityMember?._id) return null;

  const image = sanityImageToAsset(sanityMember.image);

  const member: TeamMember = {
    id: sanityMember.slug?.current || sanityMember._id,
    name: sanityMember.name || "",
    role: sanityMember.role || "",
    biography: sanityMember.biography || "",
    image: image ?? { src: "", alt: sanityMember.name || "Team member" },
  };

  if (sanityMember.disciplines && sanityMember.disciplines.length > 0) {
    member.disciplines = sanityMember.disciplines;
  }
  if (typeof sanityMember.experience === "number") {
    member.experience = sanityMember.experience;
  }
  if (sanityMember.interests && sanityMember.interests.length > 0) {
    member.interests = sanityMember.interests;
  }
  if (sanityMember.socialLinks && sanityMember.socialLinks.length > 0) {
    member.socialLinks = transformSocialLinks(sanityMember.socialLinks);
  }
  if (sanityMember.email) {
    member.email = sanityMember.email;
  }
  if (sanityMember.phone) {
    member.phone = sanityMember.phone;
  }

  return member;
}

/**
 * Transform an array of Sanity team members.
 */
export function transformSanityTeamMembers(sanityMembers: SanityRawTeamMember[]): TeamMember[] {
  if (!sanityMembers || !Array.isArray(sanityMembers)) return [];

  return sanityMembers
    .map((member) => {
      try {
        return transformSanityTeamMember(member);
      } catch (error) {
        console.error(`Failed to transform team member ${member?.name}:`, error);
        return null;
      }
    })
    .filter((member): member is TeamMember => member !== null);
}

/**
 * ============================================================================
 * STUDIO TRANSFORMS
 * ============================================================================
 */

export interface SanityRawStudio {
  _id?: string;
  name?: string;
  overline?: string;
  manifesto?: string;
  introduction?: string;
  philosophy?: string;
  beliefs?: Array<{ code?: string; title?: string; statement?: string }>;
  workingMethods?: Array<{ code?: string; title?: string; description?: string }>;
  history?: string;
  images?: SanityRawImage[];
  visit?: { overline?: string; heading?: string; body?: string; visits?: string };
  timeline?: Array<{ year?: number; title?: string; description?: string }>;
  awards?: Array<{
    title?: string;
    organization?: string;
    year?: number;
    project?: string;
    citation?: string;
  }>;
  clientSectors?: Array<{
    code?: string;
    title?: string;
    description?: string;
    projects?: string[];
    clients?: string[];
    collaborators?: string[];
  }>;
  clientReferencesNote?: string;
  [key: string]: unknown;
}

/**
 * Transform a Sanity studio document into the shared `Studio` type.
 */
export function transformSanityStudio(sanityStudio: SanityRawStudio): Studio | null {
  if (!sanityStudio?._id) return null;

  const images = (sanityStudio.images || [])
    .map(sanityImageToAsset)
    .filter((img): img is ImageAsset => img !== null);
  const fallbackImage: ImageAsset = {
    src: "",
    alt: sanityStudio.name || "Studio",
  };

  const studio: Studio = {
    name: sanityStudio.name || "",
    overline: sanityStudio.overline || "",
    manifesto: sanityStudio.manifesto || "",
    introduction: sanityStudio.introduction || "",
    philosophy: sanityStudio.philosophy || "",
    beliefs: (sanityStudio.beliefs || []).map((principle) => ({
      code: principle.code || "",
      title: principle.title || "",
      statement: principle.statement || "",
    })),
    workingMethods: (sanityStudio.workingMethods || []).map((method) => ({
      code: method.code || "",
      title: method.title || "",
      description: method.description || "",
    })),
    images: images.length > 0 ? images : [fallbackImage],
    visit: {
      overline: sanityStudio.visit?.overline || "",
      heading: sanityStudio.visit?.heading || "",
      body: sanityStudio.visit?.body || "",
      visits: sanityStudio.visit?.visits || "",
    },
  };

  if (sanityStudio.history) {
    studio.history = sanityStudio.history;
  }

  return studio;
}

/**
 * Transform the Studio page's separate collections (awards, timeline, clientSectors).
 */
export function transformSanityStudioCollections(sanityStudio: SanityRawStudio): {
  awards: Award[];
  timeline: TimelineEvent[];
  clientSectors: ClientSector[];
  clientReferencesNote?: string;
} {
  const awards: Award[] = (sanityStudio.awards || [])
    .filter((award) => award?.title)
    .map((award) => ({
      title: award.title || "",
      organization: award.organization || "",
      year: award.year || new Date().getFullYear(),
      ...(award.project ? { project: award.project } : {}),
      ...(award.citation ? { citation: award.citation } : {}),
    }));

  const timeline: TimelineEvent[] = (sanityStudio.timeline || [])
    .filter((event) => event?.year)
    .map((event) => ({
      year: event.year || 0,
      title: event.title || "",
      description: event.description || "",
    }));

  const clientSectors: ClientSector[] = (sanityStudio.clientSectors || [])
    .filter((sector) => sector?.title)
    .map((sector) => ({
      code: sector.code || "",
      title: sector.title || "",
      description: sector.description || "",
      ...(sector.projects && sector.projects.length > 0 ? { projects: sector.projects } : {}),
      ...(sector.clients && sector.clients.length > 0 ? { clients: sector.clients } : {}),
      ...(sector.collaborators && sector.collaborators.length > 0
        ? { collaborators: sector.collaborators }
        : {}),
    }));

  return {
    awards,
    timeline,
    clientSectors,
    ...(sanityStudio.clientReferencesNote
      ? { clientReferencesNote: sanityStudio.clientReferencesNote }
      : {}),
  };
}

/**
 * ============================================================================
 * CAREER TRANSFORMS
 * ============================================================================
 */

export interface SanityRawCareer {
  _id?: string;
  slug?: { current?: string };
  title?: string;
  location?: string;
  type?: PositionType;
  description?: string;
  requirements?: string[];
  applicationLink?: string;
  order?: number;
  status?: string;
  featured?: boolean;
  [key: string]: unknown;
}

/**
 * Transform a Sanity career posting into the shared `CareerPosition` type.
 */
export function transformSanityCareer(sanityCareer: SanityRawCareer): CareerPosition | null {
  if (!sanityCareer?._id || !sanityCareer.title) return null;

  const position: CareerPosition = {
    id: sanityCareer.slug?.current || sanityCareer._id,
    title: sanityCareer.title,
    location: sanityCareer.location || "",
    type: sanityCareer.type || "full-time",
    description: sanityCareer.description || "",
    requirements: sanityCareer.requirements || [],
  };

  if (sanityCareer.applicationLink) {
    position.applicationLink = sanityCareer.applicationLink;
  }

  return position;
}

/**
 * Transform an array of Sanity career postings.
 */
export function transformSanityCareers(sanityCareers: SanityRawCareer[]): CareerPosition[] {
  if (!sanityCareers || !Array.isArray(sanityCareers)) return [];

  return sanityCareers
    .map((career) => {
      try {
        return transformSanityCareer(career);
      } catch (error) {
        console.error(`Failed to transform career ${career?.title}:`, error);
        return null;
      }
    })
    .filter((career): career is CareerPosition => career !== null);
}

/**
 * ============================================================================
 * CAREERS PAGE TRANSFORMS
 * ============================================================================
 */

export interface SanityRawCareersPage {
  _id?: string;
  hero?: { overline?: string; heading?: string; body?: string };
  openApplication?: { overline?: string; heading?: string; body?: string; cta?: string };
  benefits?: Array<{ number?: string; title?: string; description?: string }>;
  studioImage?: SanityRawImage;
  [key: string]: unknown;
}

/**
 * Transform the Sanity careers singleton into the shared `CareersContent` type
 * plus the `Benefit` collection.
 */
export function transformSanityCareersPage(sanityCareers: SanityRawCareersPage): {
  content: CareersContent;
  benefits: Benefit[];
} {
  const studioImage = sanityImageToAsset(sanityCareers.studioImage);

  const content: CareersContent = {
    hero: {
      overline: sanityCareers.hero?.overline || "",
      heading: sanityCareers.hero?.heading || "",
      body: sanityCareers.hero?.body || "",
    },
    openApplication: {
      overline: sanityCareers.openApplication?.overline || "",
      heading: sanityCareers.openApplication?.heading || "",
      body: sanityCareers.openApplication?.body || "",
      cta: sanityCareers.openApplication?.cta || "",
    },
  };

  if (studioImage) {
    content.studioImage = {
      src: studioImage.src,
      alt: studioImage.alt,
      caption: studioImage.caption || "",
    };
  }

  const benefits: Benefit[] = (sanityCareers.benefits || [])
    .filter((benefit) => benefit?.title)
    .map((benefit, index) => ({
      id: `benefit-${index + 1}`,
      number: benefit.number || String(index + 1),
      title: benefit.title || "",
      description: benefit.description || "",
    }));

  return { content, benefits };
}

/**
 * ============================================================================
 * CONTACT TRANSFORMS
 * ============================================================================
 */

export interface SanityRawOffice {
  name?: string;
  city?: string;
  country?: string;
  address?: string;
  coordinates?: string;
  hours?: string;
  phone?: string;
  mapsUrl?: string;
  image?: SanityRawImage;
}

export interface SanityRawContact {
  _id?: string;
  email?: string;
  phone?: string;
  address?: string;
  coordinates?: string;
  projectTypes?: string[];
  offices?: SanityRawOffice[];
  socialLinks?: Array<{ platform?: string; url?: string; label?: string }>;
  editorialImage?: SanityRawImage;
  [key: string]: unknown;
}

/**
 * Transform a Sanity contact document into the shared `ContactInformation` type.
 */
export function transformSanityContact(sanityContact: SanityRawContact): ContactInformation | null {
  if (!sanityContact?._id) return null;

  const editorialImage = sanityImageToAsset(sanityContact.editorialImage);
  const fallbackImage: ImageAsset = { src: "", alt: "RAFA Design Hub" };

  const contact: ContactInformation = {
    email: sanityContact.email || "",
    phone: sanityContact.phone || "",
    address: sanityContact.address || "",
    coordinates: sanityContact.coordinates || "",
    offices: (sanityContact.offices || []).map(transformOffice),
    socialLinks: transformSocialLinks(sanityContact.socialLinks || []),
    projectTypes: sanityContact.projectTypes || [],
    editorialImage: editorialImage ?? fallbackImage,
  };

  return contact;
}

/**
 * Transform a Sanity office object into the shared `Office` type.
 */
function transformOffice(sanityOffice: SanityRawOffice): Office {
  const image = sanityImageToAsset(sanityOffice.image);
  const office: Office = {
    id: sanitizeId(sanityOffice.name || "office"),
    name: sanityOffice.name || "",
    city: sanityOffice.city || "",
    country: sanityOffice.country || "",
    address: sanityOffice.address || "",
    coordinates: sanityOffice.coordinates || "",
    hours: sanityOffice.hours || "",
    mapsUrl: sanityOffice.mapsUrl || "",
    image: image ?? { src: "", alt: sanityOffice.name || "Office" },
  };

  if (sanityOffice.phone) {
    office.phone = sanityOffice.phone;
  }

  return office;
}

/**
 * Transform a list of Sanity social links into the shared `SocialLink` type.
 */
function transformSocialLinks(
  sanityLinks: Array<{ platform?: string; url?: string; label?: string }>,
): SocialLink[] {
  return sanityLinks
    .filter((link) => link?.platform && link?.url)
    .map((link) => ({
      platform: link.platform as SocialLink["platform"],
      url: link.url || "",
      ...(link.label ? { label: link.label } : {}),
    }));
}

/**
 * Convert an arbitrary string into a URL-safe id.
 */
function sanitizeId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * ============================================================================
 * SITE SETTINGS TRANSFORMS
 * ============================================================================
 */

export interface SanityRawSiteSettings {
  _id?: string;
  siteName?: string;
  tagline?: string;
  description?: string;
  siteUrl?: string;
  defaultSeo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: SanityRawImage;
  };
  email?: string;
  phone?: string;
  analyticsCode?: string;
  maintenanceMode?: boolean;
  maintenanceMessage?: string;
  [key: string]: unknown;
}

/**
 * Transform a Sanity site settings document into a typed object.
 */
export function transformSanitySiteSettings(
  sanitySettings: SanityRawSiteSettings,
): SiteSettings | null {
  if (!sanitySettings?._id) return null;

  const settings: SiteSettings = {
    id: sanitySettings._id,
    siteName: sanitySettings.siteName || "",
    description: sanitySettings.description || "",
    maintenanceMode: sanitySettings.maintenanceMode ?? false,
  };

  if (sanitySettings.tagline) settings.tagline = sanitySettings.tagline;
  if (sanitySettings.siteUrl) settings.siteUrl = sanitySettings.siteUrl;
  if (sanitySettings.email) settings.email = sanitySettings.email;
  if (sanitySettings.phone) settings.phone = sanitySettings.phone;
  if (sanitySettings.analyticsCode) settings.analyticsCode = sanitySettings.analyticsCode;
  if (sanitySettings.maintenanceMessage)
    settings.maintenanceMessage = sanitySettings.maintenanceMessage;

  if (sanitySettings.defaultSeo) {
    const ogImage = sanityImageToAsset(sanitySettings.defaultSeo.ogImage);
    settings.defaultSeo = {
      ...(sanitySettings.defaultSeo.title ? { title: sanitySettings.defaultSeo.title } : {}),
      ...(sanitySettings.defaultSeo.description
        ? { description: sanitySettings.defaultSeo.description }
        : {}),
      ...(sanitySettings.defaultSeo.keywords && sanitySettings.defaultSeo.keywords.length > 0
        ? { keywords: sanitySettings.defaultSeo.keywords }
        : {}),
      ...(ogImage ? { ogImage } : {}),
    };
  }

  return settings;
}
