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
import { Providers } from "@/providers/providers";
import { getContactInformation } from "@/sanity/lib";

import "./globals.css";

export const metadata: Metadata = createMetadata({
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  keywords: [...siteConfig.keywords],
  publisher: siteConfig.name,
  verification: {
    google: "uoeBlATnaUhu2CItaPyySNQgwkuIrLEMsXoklysHqlE",
  },
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
});

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
  const contact = await getContactInformation();

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
        <Analytics />
        <WebVitals />
      </body>
    </html>
  );
}
