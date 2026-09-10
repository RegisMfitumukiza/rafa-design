import { type ReactNode } from "react";

import { PageTransition } from "@/components/layout/PageTransition";
import { SiteShell } from "@/components/layout/SiteShell";
import { MaintenanceScreen } from "@/components/maintenance/MaintenanceScreen";
import { ContactProvider } from "@/features/contact/contact-provider";
import { NavigationProvider } from "@/features/navigation/navigation-provider";
import { buildSearchIndex } from "@/features/navigation/search-index";
import { SearchIndexProvider } from "@/features/navigation/search-index-provider";
import { ServicesProvider } from "@/features/services/services-provider";
import { SiteConfigProvider } from "@/features/site/site-config-provider";
import { getSiteConfig } from "@/lib/get-site-config";
import {
  getArticles,
  getCareers,
  getContactInformation,
  getProjects,
  getServices,
} from "@/sanity/lib";

interface SiteLayoutProps {
  children: ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  // Resolve all site-wide data in parallel. Every client component reads from
  // a context provider — no client-side Sanity fetches needed anywhere in the tree.
  const [config, contact, services, careers, projects, articles] = await Promise.all([
    getSiteConfig(),
    getContactInformation(),
    getServices(),
    getCareers(),
    getProjects(),
    getArticles(),
  ]);

  if (config.maintenanceMode) {
    return <MaintenanceScreen config={config} contact={contact} />;
  }

  // Build the full search index server-side from live Sanity data.
  // Cached by Next.js ISR and invalidated on each Sanity publish via revalidateTag.
  const searchIndex = buildSearchIndex(projects, services, articles);

  return (
    <ContactProvider contact={contact}>
      <SiteConfigProvider config={config}>
        <ServicesProvider services={services}>
          <SearchIndexProvider index={searchIndex}>
            <NavigationProvider careersCount={careers.length}>
              <SiteShell>
                <PageTransition>{children}</PageTransition>
              </SiteShell>
            </NavigationProvider>
          </SearchIndexProvider>
        </ServicesProvider>
      </SiteConfigProvider>
    </ContactProvider>
  );
}
