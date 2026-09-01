import { type ReactNode } from "react";

import { PageTransition } from "@/components/layout/PageTransition";
import { SiteShell } from "@/components/layout/SiteShell";
import { ContactProvider } from "@/features/contact/contact-provider";
import { NavigationProvider } from "@/features/navigation/navigation-provider";
import { getContactInformation } from "@/sanity/lib";

interface SiteLayoutProps {
  children: ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const contact = await getContactInformation();

  return (
    <ContactProvider contact={contact}>
      <NavigationProvider>
        <SiteShell>
          <PageTransition>{children}</PageTransition>
        </SiteShell>
      </NavigationProvider>
    </ContactProvider>
  );
}
