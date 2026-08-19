import type { MetadataRoute } from "next";

import { navigationConfig } from "@/config/navigation";
import { routes, type RouteKey } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { getArticles } from "@/content/journal";
import { getProjects } from "@/content/projects";
import { getServices } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

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

  const projectRoutes = getProjects().map((project) => ({
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

  const articleRoutes = getArticles().map((article) => ({
    url: `${base}/journal/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...articleRoutes];
}
