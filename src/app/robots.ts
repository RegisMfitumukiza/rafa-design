import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/get-site-config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getSiteConfig();
  const baseUrl = config.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/admin", "/admin/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
