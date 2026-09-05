import type { Metadata } from "next";

import { SplashProvider } from "@/components/splash/SplashProvider";
import { siteConfig } from "@/config/site";
import { Landing } from "@/features/landing/landing";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <SplashProvider>
      <Landing />
    </SplashProvider>
  );
}
