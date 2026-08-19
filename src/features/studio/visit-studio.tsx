import type { Route } from "next";

import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { Text } from "@/components/typography/Text";
import { contactInformation } from "@/content/company/contact";
import type { Studio } from "@/content/studio";
import { cn } from "@/lib/cn";
import { Reveal } from "@/motion";

interface VisitStudioProps {
  studio: Studio;
  className?: string;
}

/**
 * VisitStudio
 *
 * Industrial closing CTA section for the Studio page ("The Studio // Porto").
 *
 * Left (6 cols): Overline, Heading, and Studio Visit narrative.
 * Right (5 cols): Ruled contact specs (Office address + Google Maps link,
 * coordinates, phone, email, visit rules) and the main conversation CTA button.
 */
export function VisitStudio({ studio, className }: VisitStudioProps) {
  const office = contactInformation.offices[0];
  const mapsUrl = office
    ? `https://maps.google.com/?q=${encodeURIComponent(`${office.address}, ${office.city}`)}`
    : null;

  return (
    <Section container="standard" className={cn(className ?? "")}>
      <div className="border-border/40 pt-2xl border-t">
        <div className="gap-xl grid items-start md:grid-cols-12">
          {/* Left Column (6 cols) */}
          <div className="md:col-span-6">
            <Reveal>
              <p className="text-foreground/50 mb-xs font-mono text-xs tracking-widest uppercase">
                {studio.visit.overline}
              </p>
              <h2 className="font-display text-foreground text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl md:text-5xl">
                {studio.visit.heading}
              </h2>
              <Text
                variant="body"
                className="mt-md text-foreground/60 leading-relaxed text-balance"
              >
                {studio.visit.body}
              </Text>
            </Reveal>
          </div>

          {/* Right Column (5 cols) */}
          <div className="md:col-span-5 md:col-start-8">
            <Reveal delay={0.1}>
              <div className="border-border/40 divide-border/40 divide-y border-y">
                {/* Office Address & Map Link */}
                {office && (
                  <div className="gap-sm py-sm text-xs">
                    <p className="text-foreground/40 mb-xs font-mono tracking-wider uppercase">
                      Atelier Location
                    </p>
                    {mapsUrl ? (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80 hover:text-foreground group inline-flex flex-col font-mono transition-colors"
                      >
                        <span className="underline-offset-4 group-hover:underline">
                          {office.address} ↗
                        </span>
                        {contactInformation.coordinates && (
                          <span className="text-foreground/35 mt-[2px] text-[10px]">
                            {contactInformation.coordinates}
                          </span>
                        )}
                      </a>
                    ) : (
                      <p className="text-foreground/80 font-mono">
                        {office.address}, {office.city}
                      </p>
                    )}
                  </div>
                )}

                {/* Direct Line */}
                <div className="gap-sm py-sm text-xs">
                  <p className="text-foreground/40 mb-xs font-mono tracking-wider uppercase">
                    Direct Line
                  </p>
                  {contactInformation.phone && (
                    <a
                      href={`tel:${contactInformation.phone.replace(/\s/g, "")}`}
                      className="text-foreground/80 hover:text-foreground font-mono transition-colors"
                    >
                      {contactInformation.phone}
                    </a>
                  )}
                </div>

                {/* Commissions Email */}
                <div className="gap-sm py-sm text-xs">
                  <p className="text-foreground/40 mb-xs font-mono tracking-wider uppercase">
                    Commissions
                  </p>
                  <a
                    href={`mailto:${contactInformation.email}`}
                    className="text-foreground/80 hover:text-foreground font-mono transition-colors"
                  >
                    {contactInformation.email}
                  </a>
                </div>

                {/* Visit Policy */}
                <div className="gap-sm py-sm text-xs">
                  <p className="text-foreground/40 mb-xs font-mono tracking-wider uppercase">
                    Visits
                  </p>
                  <p className="text-foreground/80 font-mono">{studio.visit.visits}</p>
                </div>
              </div>

              {/* Main CTA Button */}
              <div className="mt-xl">
                <Link
                  href={"/contact" as Route}
                  className={cn(
                    "group border-border/60 hover:border-foreground hover:bg-foreground hover:text-background px-md py-sm flex items-center justify-between rounded-sm border transition-all duration-300",
                    "font-mono text-xs font-medium tracking-widest uppercase",
                  )}
                >
                  <span>Initiate a conversation</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
