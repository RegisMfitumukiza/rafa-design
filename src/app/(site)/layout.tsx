import { type ReactNode } from "react";

import { PageTransition } from "@/components/layout/PageTransition";
import { SiteShell } from "@/components/layout/SiteShell";
import { NavigationProvider } from "@/features/navigation/navigation-provider";

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <NavigationProvider>
      <SiteShell>
        <PageTransition>{children}</PageTransition>
      </SiteShell>
    </NavigationProvider>
  );
}
