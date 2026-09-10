import type { JournalArticle } from "@/content/journal";
import type { Project } from "@/content/projects";
import type { Service } from "@/content/services";

export type SearchResultType = "project" | "service" | "article";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  href: string;
  imageSrc?: string;
  /** Additional searchable terms beyond title + subtitle (e.g. location, materials). */
  keywords?: string;
}

function humanize(value: string): string {
  return value.replaceAll("-", " ").toLowerCase();
}

const MAX_RESULTS = 8;

/**
 * Build a full search index from live data arrays.
 * Called server-side in (site)/layout.tsx; the result is passed to
 * SearchIndexProvider so client components never fetch data themselves.
 */
export function buildSearchIndex(
  projects: Project[],
  services: Service[],
  articles: JournalArticle[],
): SearchResult[] {
  return [
    ...projects.map((project) => ({
      id: project.id,
      type: "project" as const,
      title: project.title,
      subtitle: project.description,
      imageSrc: project.heroImage.src,
      keywords: [
        project.location.city,
        project.location.country,
        project.typology,
        ...project.category.map(humanize),
        ...(project.materialNarrative?.map((m) => m.name) ?? []),
        project.client,
        String(project.year),
        project.status,
      ]
        .filter((value): value is string => Boolean(value))
        .join(" "),
      href: `/projects/${project.slug}`,
    })),
    ...services.map((service) => ({
      id: service.id,
      type: "service" as const,
      title: service.title,
      subtitle: service.shortDescription,
      keywords: service.description,
      href: `/services/${service.slug}`,
    })),
    ...articles.map((article) => ({
      id: article.id,
      type: "article" as const,
      title: article.title,
      subtitle: article.excerpt || "",
      ...(article.hero?.src && { imageSrc: article.hero.src }),
      keywords: [
        article.category,
        typeof article.author === "object" ? article.author?.name : article.author,
        article.publishedAt?.slice(0, 4),
      ]
        .filter((value): value is string => Boolean(value))
        .join(" "),
      href: `/journal/${article.slug}`,
    })),
  ];
}

/**
 * Search a pre-built index. Accepts the index as a parameter so the same
 * pure function works for both the server-built live index and tests.
 */
export function searchContent(query: string, index: SearchResult[]): SearchResult[] {
  const term = query.trim().toLowerCase();
  if (!term) {
    return [];
  }

  return index
    .filter((result) =>
      `${result.title} ${result.subtitle} ${result.keywords ?? ""}`.toLowerCase().includes(term),
    )
    .slice(0, MAX_RESULTS);
}
