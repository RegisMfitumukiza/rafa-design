import type { Metadata } from "next";

import { SplashProvider } from "@/components/splash/SplashProvider";
import { Landing } from "@/features/landing/landing";
import { getSiteConfig } from "@/lib/get-site-config";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  return {
    title: {
      absolute: config.name,
    },
    description: config.description,
  };
}

export default function HomePage() {
  return (
    <SplashProvider>
      <Landing />
    </SplashProvider>
  );
}
