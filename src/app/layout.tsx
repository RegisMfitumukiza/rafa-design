import type { Metadata, Viewport } from "next";

import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

// Century Gothic is self-hosted via @font-face in src/styles/fonts.css

import { WebVitals } from "@/components/performance/web-vitals";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/config/schema";
import { createMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { theme } from "@/config/theme";
import { getSiteConfig } from "@/lib/get-site-config";
import { Providers } from "@/providers/providers";
import { getContactInformation } from "@/sanity/lib";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  // Sanity-first with a static fallback — identity driven by /admin Site Settings.
  const config = await getSiteConfig();

  return createMetadata(
    {
      title: {
        default: config.name,
        template: `%s | ${config.name}`,
      },
      description: config.description,
      applicationName: config.name,
      authors: [{ name: config.name }],
      creator: config.name,
      keywords: [...config.keywords],
      publisher: config.name,
    },
    config,
  );
}

export const viewport: Viewport = {
  colorScheme: theme.colorScheme,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: theme.background },
    { media: "(prefers-color-scheme: dark)", color: theme.backgroundDark },
  ],
};

// Inline theme initialisation — runs before React hydration to prevent flash.
// Uses next/script strategy="beforeInteractive" so Next.js hoists this into
// the document head without the React script-tag-in-JSX warning.
const themeScript = `(function(){try{var p=localStorage.getItem(${JSON.stringify(
  theme.storageKey,
)});var d=p?p==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [contact, config] = await Promise.all([getContactInformation(), getSiteConfig()]);

  return (
    <html lang={siteConfig.locale} className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts for optimal LCP */}
        <link
          rel="preload"
          href="/fonts/CenturyGothicPaneuropeanRegular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CenturyGothicPaneuropeanSemiBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CenturyGothicPaneuropeanBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-background text-foreground flex min-h-dvh flex-col font-sans">
        {/* Theme init script - must be in body for Next.js Script component */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <a
          href="#main-content"
          className="focus:left-md focus:top-md focus:z-modal focus:bg-surface focus:px-md focus:py-sm focus:text-foreground focus:shadow-medium sr-only focus:not-sr-only focus:fixed focus:rounded-sm"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema(contact)} />
        <JsonLd data={websiteSchema()} />
        <Providers>{children}</Providers>
        {/* Analytics driven by /admin Site Settings (Operational) when set */}
        {config.analyticsCode && (
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${config.analyticsCode}`}
            strategy="afterInteractive"
          />
        )}
        {config.analyticsCode && (
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(config.analyticsCode)});
              `,
            }}
          />
        )}
        <Analytics />
        <WebVitals />
      </body>
    </html>
  );
}
