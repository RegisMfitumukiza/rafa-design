import { type ReactNode } from "react";

import { PageTransition } from "@/components/layout/PageTransition";
import { SiteShell } from "@/components/layout/SiteShell";
import { ContactProvider } from "@/features/contact/contact-provider";
import { NavigationProvider } from "@/features/navigation/navigation-provider";
import { SiteConfigProvider } from "@/features/site/site-config-provider";
import { getSiteConfig } from "@/lib/get-site-config";
import { getContactInformation } from "@/sanity/lib";

interface SiteLayoutProps {
  children: ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  // Maintenance gate: the public (site) group checks the Sanity flag on every
  // route, while /admin and the API routes stay reachable so operators can
  // turn the site back on.
  const config = await getSiteConfig();

  if (config.maintenanceMode) {
    return (
      <main className="bg-background text-foreground px-lg flex min-h-dvh flex-col items-center justify-center font-sans">
        <div className="space-y-sm max-w-md text-center">
          <p className="text-foreground/40 font-mono text-[10px] tracking-[0.2em] uppercase">
            Specification // Maintenance
          </p>
          <h1 className="font-display text-foreground text-3xl font-medium uppercase sm:text-4xl md:text-5xl">
            {config.name}
          </h1>
          <div className="bg-foreground/40 my-sm h-px w-full" />
          {config.maintenanceMessage && (
            <p className="text-foreground/60 font-medium">{config.maintenanceMessage}</p>
          )}
          <p className="text-foreground/40 font-mono text-[10px] tracking-[0.2em] uppercase">
            We&apos;ll be back soon.
          </p>
        </div>
      </main>
    );
  }

  const contact = await getContactInformation();

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
