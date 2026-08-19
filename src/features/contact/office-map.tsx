"use client";

import { useState } from "react";

import { Image } from "@/components/media/Image";
import { contactInformation } from "@/content/company/contact";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { ImageReveal, Reveal } from "@/motion";

interface OfficeMapProps {
  className?: string;
}

/**
 * OfficeMap (Atelier Location Viewer)
 *
 * Interactive studio location viewer replacing the conventional generic map iframe.
 * Features an editorial split layout:
 *   - Tab switcher for selecting Porto Atelier or Lisbon Studio
 *   - High-resolution photography of the selected atelier
 *   - Live-updating address, GPS coordinates, opening hours, and direct Google Maps satellite view link
 */
export function OfficeMap({ className }: OfficeMapProps) {
  const offices = contactInformation.offices;
  const [activeId, setActiveId] = useState<string>(offices[0]?.id ?? "porto");

  const activeOffice = offices.find((o) => o.id === activeId) ?? offices[0];

  if (!activeOffice) return null;

  // Dynamic title: "Location" (singular) or "Locations" (plural)
  const locationTitle = offices.length === 1 ? "Our Location" : "Our Locations";

  return (
    <div className={cn("border-border/40 border-t pt-xl", className ?? "")}>
      {/* Header & Tab Selector */}
      <Reveal>
        <div className="mb-lg gap-md flex flex-wrap items-baseline justify-between">
          <div>
            <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
              {ui.contact.locationOverline}
            </p>
            <h2 className="font-display text-foreground mt-xs text-2xl font-medium tracking-tight md:text-3xl">
              {locationTitle}
            </h2>
          </div>

          {/* Interactive Office Tabs */}
          <div className="gap-xs flex items-center">
            {offices.map((office, idx) => {
              const isActive = office.id === activeId;
              return (
                <button
                  key={office.id}
                  type="button"
                  onClick={() => setActiveId(office.id)}
                  className={cn(
                    "px-md py-xs font-mono text-[10px] font-medium tracking-wider uppercase rounded-xs border transition-all duration-300",
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/50 text-foreground/60 hover:border-foreground/60 hover:text-foreground bg-transparent",
                  )}
                >
                  {String(idx + 1).padStart(2, "0")} // {office.name}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Editorial Split Viewer */}
      <div className="gap-xl grid items-center md:grid-cols-12">
        {/* Left 7 cols: High-Res Atelier Photo */}
        <div className="md:col-span-7">
          <ImageReveal key={activeOffice.id} className="w-full">
            <Image
              asset={activeOffice.image}
              sizes="(max-width: 48rem) 100vw, 58vw"
              className="aspect-[16/10] w-full rounded-sm"
              imgClassName="object-cover"
            />
          </ImageReveal>
        </div>

        {/* Right 5 cols: Office Specifications */}
        <div className="space-y-md md:col-span-5">
          <Reveal key={activeOffice.id}>
            <div>
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                {activeOffice.city}, {activeOffice.country}
              </p>
              <h3 className="font-display text-foreground mt-xs text-2xl font-medium tracking-tight">
                {activeOffice.name}
              </h3>
            </div>

            <div className="border-border/40 divide-border/40 divide-y border-y mt-md space-y-sm py-sm font-mono text-xs">
              <div className="py-xs flex justify-between gap-sm">
                <span className="text-foreground/40 uppercase text-[10px] tracking-wider">ADDRESS</span>
                <span className="text-foreground/80 text-right">{activeOffice.address}</span>
              </div>
              <div className="py-xs flex justify-between gap-sm">
                <span className="text-foreground/40 uppercase text-[10px] tracking-wider">GPS</span>
                <span className="text-foreground/80 text-right">{activeOffice.coordinates}</span>
              </div>
              <div className="py-xs flex justify-between gap-sm">
                <span className="text-foreground/40 uppercase text-[10px] tracking-wider">HOURS</span>
                <span className="text-foreground/80 text-right">{activeOffice.hours}</span>
              </div>
              {activeOffice.phone && (
                <div className="py-xs flex justify-between gap-sm">
                  <span className="text-foreground/40 uppercase text-[10px] tracking-wider">PHONE</span>
                  <a
                    href={`tel:${activeOffice.phone.replace(/\s+/g, "")}`}
                    className="text-foreground/90 hover:text-foreground font-medium underline underline-offset-2 transition-colors text-right break-all"
                    aria-label={`Call ${activeOffice.name} at ${activeOffice.phone}`}
                  >
                    {activeOffice.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="pt-sm">
              <a
                href={activeOffice.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background group px-md py-sm gap-md inline-flex items-center rounded-xs border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300"
              >
                <span>Open in Satellite Maps</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
