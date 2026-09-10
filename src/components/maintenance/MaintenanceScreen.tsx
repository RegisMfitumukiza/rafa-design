"use client";

import type { Route } from "next";

import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import type { ContactInformation } from "@/content/company/contact";
import type { SiteConfig } from "@/lib/get-site-config";
import { useStudioTime } from "@/lib/studio-time";

interface MaintenanceScreenProps {
  config: SiteConfig;
  contact?: ContactInformation | null;
}

/**
 * MaintenanceScreen
 *
 * Museum-Grade Architectural Holding Screen.
 * Displayed when maintenanceMode is activated in Sanity Studio (/admin Site Settings).
 *
 * Features:
 * - Architectural Monochromatic Canvas with subtle hairline framing
 * - Studio Monogram / Mark
 * - Operational Status Beacon: "SYSTEM STATUS // ARCHIVAL MAINTENANCE"
 * - Dynamic studio name and editorial maintenance notice from Sanity
 * - Direct Client Commission Channel (live mailto / tel) so high-value leads are never lost
 * - Architectural Coordinates & Live Studio Time
 * - Discreet Staff Access portal linking to /admin
 */
export function MaintenanceScreen({ config, contact }: MaintenanceScreenProps) {
  const { formatted: studioTimeFormatted } = useStudioTime();
  const email = contact?.email || "studio@rafadesign.com";
  const phone = contact?.phone;
  const coordinates = contact?.coordinates || "41.1579° N, 8.6291° W";
  const city = contact?.offices?.[0]?.city || "Porto";
  const country = contact?.offices?.[0]?.country || "Portugal";

  return (
    <main
      role="alert"
      aria-live="polite"
      className="bg-background text-foreground selection:bg-foreground selection:text-background relative flex min-h-dvh flex-col justify-between p-6 sm:p-10 md:p-14"
    >
      {/* Top Ledger: Studio Coordinates & Time */}
      <header className="border-border/30 text-foreground/45 flex flex-wrap items-center justify-between gap-4 border-b pb-4 font-mono text-[10px] tracking-[0.2em] uppercase">
        <div className="flex items-center gap-2">
          <span className="bg-foreground/60 inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
          <span>
            {city}, {country} [{coordinates}]
          </span>
        </div>
        <div>
          <span>STUDIO TIME // {studioTimeFormatted}</span>
        </div>
      </header>

      {/* Center Composition: Monogram + Editorial Maintenance Statement */}
      <div className="mx-auto my-auto w-full max-w-2xl py-12 text-center">
        {/* Studio Monogram Logo */}
        <div className="mb-8 flex justify-center">
          <Logo variant="display" />
        </div>

        {/* Status Pill Badge */}
        <div className="border-border/60 bg-surface/80 text-foreground/75 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase shadow-xs backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="bg-foreground/40 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-foreground/80 relative inline-flex h-2 w-2 rounded-full" />
          </span>
          <span>Status // Archival Maintenance</span>
        </div>

        {/* Studio Title */}
        <h1 className="font-display text-3xl font-medium tracking-tight uppercase sm:text-4xl md:text-5xl lg:text-6xl">
          {config.name}
        </h1>

        {/* Hairline Divider with Center Notch */}
        <div className="my-6 flex items-center justify-center">
          <div className="bg-border/60 h-px w-24 sm:w-32" />
          <div className="border-border/60 mx-2 h-1 w-1 rotate-45 border" />
          <div className="bg-border/60 h-px w-24 sm:w-32" />
        </div>

        {/* Editorial Notice from Sanity (or elegant default) */}
        <p className="text-foreground/75 mx-auto max-w-xl text-base leading-relaxed font-light sm:text-lg">
          {config.maintenanceMessage ||
            "Our digital spatial archive is undergoing scheduled refinement. Full portfolio monographs and interactive case studies will return shortly."}
        </p>

        {/* Direct Private Inquiries Fallback */}
        <div className="border-border/40 bg-surface/40 mt-10 rounded-sm border px-6 pt-6 pb-6">
          <p className="text-foreground/45 mb-3 font-mono text-[10px] tracking-[0.2em] uppercase">
            Direct Inquiries For Private Commissions & Press
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs">
            <a
              href={`mailto:${email}`}
              className="text-foreground/85 hover:text-foreground underline-offset-4 transition-colors hover:underline"
            >
              {email}
            </a>
            {phone && (
              <>
                <span className="text-foreground/20 hidden sm:inline">·</span>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="text-foreground/85 hover:text-foreground underline-offset-4 transition-colors hover:underline"
                >
                  {phone}
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Ledger: Legal attribution & Discreet Staff Link */}
      <footer className="border-border/30 text-foreground/45 flex flex-wrap items-center justify-between gap-4 border-t pt-4 font-mono text-[10px] tracking-[0.2em] uppercase">
        <div>
          &copy; {new Date().getFullYear()} {config.name}. All Rights Reserved.
        </div>
        <div>
          <Link
            href={"/admin" as Route}
            className="hover:text-foreground underline-offset-4 transition-colors hover:underline"
            title="Sanity Studio Staff Portal"
          >
            Staff Access ↗
          </Link>
        </div>
      </footer>
    </main>
  );
}
