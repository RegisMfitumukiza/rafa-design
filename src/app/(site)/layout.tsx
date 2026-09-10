import { type ReactNode } from "react";

import { PageTransition } from "@/components/layout/PageTransition";
import { SiteShell } from "@/components/layout/SiteShell";
import { MaintenanceScreen } from "@/components/maintenance/MaintenanceScreen";
import { ContactProvider } from "@/features/contact/contact-provider";
import { NavigationProvider } from "@/features/navigation/navigation-provider";
import { SiteConfigProvider } from "@/features/site/site-config-provider";
import { getSiteConfig } from "@/lib/get-site-config";
import { getContactInformation } from "@/sanity/lib";

interface SiteLayoutProps {
  children: ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  // Concurrently resolve site settings and studio contact details.
  // The public (site) group checks maintenanceMode on every route,
  // while /admin and the API routes stay reachable so operators can manage the studio.
  const [config, contact] = await Promise.all([getSiteConfig(), getContactInformation()]);

  if (config.maintenanceMode) {
    return <MaintenanceScreen config={config} contact={contact} />;
  }

  return (
    <ContactProvider contact={contact}>
      <SiteConfigProvider config={config}>
        <NavigationProvider>
          <SiteShell>
            <PageTransition>{children}</PageTransition>
          </SiteShell>
        </NavigationProvider>
      </SiteConfigProvider>
    </ContactProvider>
  );
}
