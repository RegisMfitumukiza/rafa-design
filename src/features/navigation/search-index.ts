import { getArticles } from "@/content/journal";
import { getProjects } from "@/content/projects";
import { getServices } from "@/content/services";

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

const searchIndex: SearchResult[] = [
  ...getProjects().map((project) => ({
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
      ...(project.details?.materials ?? []),
      project.client,
      String(project.year),
      project.status,
    ]
      .filter((value): value is string => Boolean(value))
      .join(" "),
    href: `/projects/${project.slug}`,
  })),
  ...getServices().map((service) => ({
    id: service.id,
    type: "service" as const,
    title: service.title,
    subtitle: service.shortDescription,
    keywords: service.description,
    href: `/services/${service.slug}`,
  })),
  ...getArticles().map((article) => ({
    id: article.id,
    type: "article" as const,
    title: article.title,
    subtitle: article.excerpt || "",
    ...(article.hero?.src && { imageSrc: article.hero.src }),
    keywords: [article.category, article.author, article.publishedAt.slice(0, 4)]
      .filter((value): value is string => Boolean(value))
      .join(" "),
    href: `/journal/${article.slug}`,
  })),
];

const MAX_RESULTS = 8;

export function searchContent(query: string): SearchResult[] {
  const term = query.trim().toLowerCase();
  if (!term) {
    return [];
  }

  return searchIndex
    .filter((result) =>
      `${result.title} ${result.subtitle} ${result.keywords ?? ""}`.toLowerCase().includes(term),
    )
    .slice(0, MAX_RESULTS);
}
