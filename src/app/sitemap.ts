import type { MetadataRoute } from "next";

import { navigationConfig } from "@/config/navigation";
import { routes, type RouteKey } from "@/config/routes";
import { getArticles } from "@/content/journal/sanity-adapter";
import { getProjects } from "@/content/projects/sanity";
import { getServices } from "@/content/services";
import { getSiteConfig } from "@/lib/get-site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getSiteConfig();
  const base = config.url.replace(/\/$/, "");

  const staticRouteKeys: Array<"" | RouteKey> = [
    "",
    ...navigationConfig.primary,
    ...navigationConfig.supporting,
  ];

  const staticRoutes = staticRouteKeys.map((key) => ({
    url: `${base}${key === "" ? "" : routes[key].path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: key === "" ? 1 : 0.8,
  }));

  const [projects, articles] = await Promise.all([getProjects(), getArticles()]);

  const projectRoutes = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const serviceRoutes = getServices().map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${base}/journal/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...articleRoutes];
}
