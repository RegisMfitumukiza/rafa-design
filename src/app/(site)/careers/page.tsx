import type { Metadata } from "next";
import type { Route } from "next";

import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import { JsonLd } from "@/components/seo/JsonLd";
import { Heading } from "@/components/typography/Heading";
import { breadcrumbSchema } from "@/config/schema";
import { pageContent } from "@/content/pages";
import { ui } from "@/content/ui";
import { ImageReveal, Reveal, Stagger } from "@/motion";
import { getCareers, getCareersPageContent, getContactInformation } from "@/sanity/lib";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getCareersPageContent();
  const title = content.hero?.heading
    ? `${content.hero.heading} | Careers`
    : pageContent.careers.title;
  const description = content.hero?.body ?? pageContent.careers.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CareersPage() {
  const [careerPositions, { content, benefits }, contact] = await Promise.all([
    getCareers(),
    getCareersPageContent(),
    getContactInformation(),
  ]);

  const careersContent = content;
  const { hero, openApplication, studioImage } = careersContent;
  const contactEmail = contact?.email || "studio@rafadesign.com";
  const totalPositions = String(careerPositions.length).padStart(2, "0");

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Careers", path: "/careers" }])} />

      {/* ── 01. EDITORIAL 12-COLUMN HEADER (Pattern B) ── */}
      <Section container="wide">
        <Reveal visible>
          <div className="gap-x-xl gap-y-md grid items-start md:grid-cols-12">
            {/* Left 6 cols: Overline & Title */}
            <div className="md:col-span-6 lg:col-span-6">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                {hero.overline || ui.sections.careersOverline}
              </p>
              <h1 className="font-display text-foreground mt-sm text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {hero.heading}
              </h1>
            </div>
            {/* Right 6 cols: Lead Description */}
            <div className="md:pt-md md:col-span-6 lg:col-span-6">
              <p className="text-foreground/70 w-full text-xl leading-relaxed md:text-2xl">
                {hero.body}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 02. OPEN POSITIONS INDEX ── */}
      <Section container="wide" className="mt-xl md:mt-2xl" id="positions">
        <Reveal>
          <div className="mb-md border-border/40 pb-sm flex items-baseline justify-between border-b font-mono text-[10px] tracking-widest uppercase">
            <div className="gap-xs text-foreground/45 flex items-center">
              <span className="bg-foreground/40 inline-block h-1 w-1 rounded-full" />
              <span>{ui.sections.openPositionsOverline}</span>
            </div>
            <span className="text-foreground/40">ROLES 01 — {totalPositions}</span>
          </div>
        </Reveal>

        {careerPositions.length > 0 ? (
          <Stagger className="border-border/40 divide-border/40 flex flex-col divide-y border-y">
            {careerPositions.map((position, idx) => (
              <div key={position.id} className="py-lg md:py-xl group transition-colors">
                <div className="gap-x-md gap-y-sm grid items-start md:grid-cols-12">
                  {/* Index code */}
                  <span className="text-foreground/35 font-mono text-[11px] tracking-widest uppercase md:col-span-1 md:pt-1.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Role Title & Metadata */}
                  <div className="md:col-span-4">
                    <h2 className="font-display text-foreground text-2xl font-medium tracking-tight md:text-3xl">
                      {position.title}
                    </h2>
                    <div className="mt-xs gap-xs flex items-center">
                      <span className="bg-foreground/30 inline-block h-px w-3" />
                      <span className="text-foreground/45 font-mono text-[10px] tracking-widest uppercase">
                        {position.discipline ? `${position.discipline} // ` : ""}
                        {position.type.replace("-", " ")} {"//"} {position.location}
                      </span>
                    </div>
                  </div>

                  {/* Description, Requirements & Action */}
                  <div className="space-y-md md:col-span-7">
                    <p className="text-foreground/70 text-base leading-relaxed md:text-lg">
                      {position.description}
                    </p>

                    {/* Architectural Criteria Specification */}
                    {position.requirements && position.requirements.length > 0 && (
                      <div className="border-border/25 mt-md pt-sm border-t">
                        <p className="text-foreground/35 mb-xs font-mono text-[10px] tracking-wider uppercase select-none">
                          SPEC // CRITERIA & QUALIFICATIONS:
                        </p>
                        <ul className="pt-xs space-y-1.5">
                          {position.requirements.map((req, i) => (
                            <li
                              key={i}
                              className="gap-sm text-foreground/65 flex text-sm leading-relaxed"
                            >
                              <span className="text-foreground/30 select-none" aria-hidden>
                                —
                              </span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Industrial Apply Button */}
                    <div className="pt-sm">
                      <Link
                        href={
                          (position.applicationLink
                            ? position.applicationLink
                            : `mailto:${contactEmail}?subject=Application — ${position.title}`) as Route
                        }
                        target={position.applicationLink ? "_blank" : undefined}
                        rel={position.applicationLink ? "noopener noreferrer" : undefined}
                        className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background group/btn px-md py-sm gap-lg inline-flex items-center justify-between rounded-xs border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300"
                      >
                        <span>{ui.sections.applyForPosition}</span>
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        ) : (
          <Reveal>
            <div className="border-border/40 py-2xl border-y">
              <p className="text-foreground/60 max-w-prose text-base leading-relaxed md:text-lg">
                {ui.careers.emptyState}{" "}
                <Link
                  href={`mailto:${contactEmail}?subject=Open Application` as Route}
                  className="text-foreground hover:text-foreground/80 font-medium underline underline-offset-4"
                >
                  {ui.careers.openApplication}
                </Link>
                .
              </p>
            </div>
          </Reveal>
        )}
      </Section>

      {/* ── 03. STUDIO ATELIER PLATE ── */}
      {studioImage && (
        <Section container="wide" className="mt-xl md:mt-2xl">
          <ImageReveal className="w-full">
            <Image
              asset={studioImage}
              fill
              priority={false}
              className="aspect-[16/9] w-full md:aspect-[21/9]"
              imgClassName="object-cover"
              sizes="100vw"
            />
          </ImageReveal>
          {studioImage.caption && (
            <Reveal delay={0.1}>
              <div className="border-border/30 mt-sm pt-xs flex items-baseline justify-between border-t font-mono text-[10px] tracking-widest uppercase">
                <p className="text-foreground/45">
                  FIGURE 01 {"//"} {studioImage.caption}
                </p>
                <span className="text-foreground/25 hidden sm:inline-block">
                  Atelier Archive // Culture
                </span>
              </div>
            </Reveal>
          )}
        </Section>
      )}

      {/* ── 04. LIFE AT THE PRACTICE (Architectural 4-Column Spec Matrix) ── */}
      {benefits.length > 0 && (
        <Section container="wide" className="mt-xl md:mt-2xl">
          <Reveal>
            <div className="mb-md border-border/40 pb-sm flex items-baseline justify-between border-b font-mono text-[10px] tracking-widest uppercase">
              <div className="gap-xs text-foreground/45 flex items-center">
                <span className="bg-foreground/40 inline-block h-1 w-1 rounded-full" />
                <span>{ui.sections.workingAtRafaOverline}</span>
              </div>
              <span className="text-foreground/40">PRACTICE // 04 PILLARS</span>
            </div>
          </Reveal>

          <Stagger className="border-border/40 divide-border/40 grid grid-cols-1 divide-y border-y md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="py-lg md:py-xl md:px-lg flex flex-col justify-between px-0 first:md:pl-0 last:md:pr-0"
              >
                <div>
                  <span className="text-foreground/35 font-mono text-[11px] tracking-widest uppercase">
                    {benefit.number}
                  </span>
                  <h3 className="font-display text-foreground mt-sm text-xl font-medium tracking-tight sm:text-2xl">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/65 mt-sm text-sm leading-relaxed md:text-base">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>
        </Section>
      )}

      {/* ── 05. OPEN APPLICATION TRANSITION ── */}
      <Section container="wide" className="mt-xl md:mt-2xl">
        <Reveal>
          <div className="border-border/40 pt-2xl gap-y-lg gap-x-xl grid border-t md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                Specification // {openApplication.overline || "Inquiry"}
              </p>
              <Heading variant="h2" className="mt-sm text-3xl sm:text-4xl">
                {openApplication.heading}
              </Heading>
            </div>
            <div className="space-y-lg md:col-span-7">
              <p className="text-foreground/70 text-lg leading-relaxed md:text-xl">
                {openApplication.body}
              </p>
              <Link
                href={`mailto:${contactEmail}?subject=Open Application` as Route}
                className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background group px-md py-sm gap-lg inline-flex items-center justify-between rounded-xs border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300"
              >
                <span>{openApplication.cta || "Send an open application"}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
