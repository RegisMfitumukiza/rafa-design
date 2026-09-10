import type { Metadata } from "next";

import { SplashProvider } from "@/components/splash/SplashProvider";
import { createMetadata } from "@/config/seo";
import { Landing } from "@/features/landing/landing";
import { getSiteConfig } from "@/lib/get-site-config";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const title = config.seoDefaults?.title ?? config.name;
  const description = config.seoDefaults?.description ?? config.description;

  return createMetadata(
    {
      title: {
        absolute: title,
      },
      description,
    },
    config,
  );
}

export default function HomePage() {
  return (
    <SplashProvider>
      <Landing />
    </SplashProvider>
  );
}
