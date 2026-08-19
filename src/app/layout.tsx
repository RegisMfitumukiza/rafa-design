import type { Metadata, Viewport } from "next";
import Script from "next/script";

// Century Gothic is self-hosted via @font-face in src/styles/fonts.css

import { JsonLd } from "@/components/seo/JsonLd";
import { SplashProvider } from "@/components/splash/SplashProvider";
import { organizationSchema, websiteSchema } from "@/config/schema";
import { createMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { theme } from "@/config/theme";
import { Providers } from "@/providers/providers";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.locale}
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        {/* Theme init: next/script beforeInteractive runs before hydration without React warning */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className="bg-background text-foreground flex min-h-dvh flex-col font-sans">
        <a
          href="#main-content"
          className="focus:left-md focus:top-md focus:z-modal focus:bg-surface focus:px-md focus:py-sm focus:text-foreground focus:shadow-medium sr-only focus:not-sr-only focus:fixed focus:rounded-sm"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Providers>
          <SplashProvider>{children}</SplashProvider>
        </Providers>
      </body>
    </html>
  );
}
