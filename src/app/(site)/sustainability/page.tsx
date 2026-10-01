import type { Metadata } from "next";
import type { Route } from "next";

import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import { JsonLd } from "@/components/seo/JsonLd";
import { Heading } from "@/components/typography/Heading";
import { breadcrumbSchema } from "@/config/schema";
import { pageContent } from "@/content/pages";
import { ImageReveal, Reveal, Stagger } from "@/motion";
import { getContactInformation, getSustainabilityContent } from "@/sanity/lib";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSustainabilityContent();
  const title =
    content.seo?.title ??
    (content.manifesto?.heading
      ? `${content.manifesto.heading} | Sustainability`
      : pageContent.sustainability.title);
  const description =
    content.seo?.description ?? content.manifesto?.body ?? pageContent.sustainability.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function SustainabilityPage() {
  const [content, contact] = await Promise.all([
    getSustainabilityContent(),
    getContactInformation(),
  ]);

  const {
    manifesto,
    philosophy,
    materialImage,
    commitments,
    principles,
    certifications = [],
    collaboration,
  } = content;

  const contactEmail = contact?.email || "studio@rafadesign.com";

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Sustainability", path: "/sustainability" }])} />

      {/* ── 01. EDITORIAL 12-COLUMN HEADER (Pattern B) ── */}
      <Section container="wide">
        <Reveal visible>
          <div className="gap-x-xl gap-y-md grid items-start md:grid-cols-12">
            {/* Left 6 cols: Overline & Title */}
            <div className="md:col-span-6 lg:col-span-6">
              <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
                {manifesto.overline || "Environmental Responsibility // Ecological Stewardship"}
              </p>
              <h1 className="font-display text-foreground mt-sm text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {manifesto.heading}
              </h1>
            </div>
            {/* Right 6 cols: Lead Description */}
            <div className="md:pt-md md:col-span-6 lg:col-span-6">
              <p className="text-foreground/70 w-full text-xl leading-relaxed md:text-2xl">
                {manifesto.body}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 02. PHILOSOPHY STATEMENT ── */}
      <Section container="wide" className="mt-xl md:mt-2xl">
        <Reveal>
          <div className="border-border/40 pt-2xl gap-y-lg gap-x-xl grid border-t md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
                Specification // Philosophy
              </p>
              <Heading variant="h2" className="mt-sm text-3xl sm:text-4xl">
                {philosophy.heading}
              </Heading>
            </div>
            <div className="space-y-md md:col-span-7">
              <p className="text-foreground/70 text-lg leading-relaxed md:text-xl">
                {philosophy.body}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 03. MATERIAL ATELIER PLATE ── */}
      {materialImage && (
        <Section container="wide" className="mt-xl md:mt-2xl">
          <ImageReveal className="w-full">
            <Image
              asset={materialImage}
              fill
              priority={false}
              className="aspect-[16/9] w-full md:aspect-[21/9]"
              imgClassName="object-cover"
              sizes="100vw"
            />
          </ImageReveal>
          {materialImage.caption && (
            <Reveal delay={0.1}>
              <div className="border-border/30 mt-sm pt-xs text-overline flex items-baseline justify-between border-t font-mono tracking-widest uppercase">
                <p className="text-foreground/45">
                  FIGURE 01 {"//"} {materialImage.caption}
                </p>
                <span className="text-foreground/25 hidden sm:inline-block">
                  Material Archive // Provenance
                </span>
              </div>
            </Reveal>
          )}
        </Section>
      )}

      {/* ── 04. FOUR COMMITMENTS (Architectural 4-Column Spec Matrix) ── */}
      {commitments.length > 0 && (
        <Section container="wide" className="mt-xl md:mt-2xl" id="commitments">
          <Reveal className="w-full min-w-0">
            <div className="mb-md border-border/40 pb-sm text-overline gap-xs flex w-full min-w-0 flex-wrap items-baseline justify-between border-b font-mono tracking-widest uppercase">
              <div className="gap-xs text-foreground/45 flex items-center">
                <span className="bg-foreground/40 inline-block h-1 w-1 rounded-full" />
                <span>CORE COMMITMENTS // ECOLOGICAL METHODOLOGY</span>
              </div>
              <span className="text-foreground/40">PILLARS 01 — 04</span>
            </div>
          </Reveal>

          <Stagger className="border-border/40 divide-border/40 grid grid-cols-1 divide-y border-y md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
            {commitments.map((commitment) => (
              <div
                key={commitment.id}
                className="py-lg md:py-xl md:px-lg flex flex-col justify-between px-0 first:md:pl-0 last:md:pr-0"
              >
                <div>
                  <span className="text-foreground/35 text-label font-mono tracking-widest uppercase">
                    {commitment.number}
                  </span>
                  <h3 className="font-display text-foreground mt-sm text-xl font-medium tracking-tight sm:text-2xl">
                    {commitment.title}
                  </h3>
                  <p className="text-foreground/65 mt-sm text-sm leading-relaxed md:text-base">
                    {commitment.description}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>
        </Section>
      )}

      {/* ── 05. GUIDING PRINCIPLES ── */}
      {principles.length > 0 && (
        <Section container="wide" className="mt-xl md:mt-2xl">
          <Reveal>
            <div className="border-border/40 pt-2xl gap-y-lg gap-x-xl grid border-t md:grid-cols-12 md:items-start">
              <div className="md:col-span-5">
                <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
                  AXIOMS // GUIDING PRINCIPLES
                </p>
                <Heading variant="h2" className="mt-sm text-3xl sm:text-4xl">
                  Our guiding rules.
                </Heading>
                <p className="text-foreground/50 mt-sm text-sm leading-relaxed md:text-base">
                  Five non-negotiable architectural tenets that determine our material choices,
                  structural lifecycle, and ecological footprint.
                </p>
              </div>

              <div className="md:col-span-7">
                <Stagger className="border-border/30 divide-border/30 flex flex-col divide-y">
                  {principles.map((principle, idx) => (
                    <div key={idx} className="py-md gap-md flex items-start first:pt-0 last:pb-0">
                      <span className="text-foreground/35 shrink-0 pt-0.5 font-mono text-xs tracking-widest tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="text-foreground/85 text-base leading-relaxed italic md:text-lg">
                        &ldquo;{principle}&rdquo;
                      </p>
                    </div>
                  ))}
                </Stagger>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      {/* ── 06. ENVIRONMENTAL FRAMEWORKS & CERTIFICATIONS ── */}
      {certifications.length > 0 && (
        <Section container="wide" className="mt-xl md:mt-2xl">
          <Reveal>
            <div className="mb-md border-border/40 pb-sm text-overline flex items-baseline justify-between border-b font-mono tracking-widest uppercase">
              <div className="gap-xs text-foreground/45 flex items-center">
                <span className="bg-foreground/40 inline-block h-1 w-1 rounded-full" />
                <span>BENCHMARKS // ENVIRONMENTAL FRAMEWORKS</span>
              </div>
              <span className="text-foreground/40">CERTIFICATION STANDARDS</span>
            </div>
          </Reveal>

          <Stagger className="border-border/40 divide-border/40 grid grid-cols-1 divide-y border-y md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="py-lg md:py-xl md:px-lg flex flex-col justify-between px-0 first:md:pl-0 last:md:pr-0"
              >
                <div>
                  <div className="gap-xs flex items-center">
                    <span className="border-border/60 bg-muted/40 px-xs text-micro rounded-xs border py-0.5 font-mono tracking-widest uppercase">
                      STANDARD
                    </span>
                  </div>
                  <h3 className="font-display text-foreground mt-sm text-xl font-medium tracking-tight">
                    {cert.name}
                  </h3>
                  <p className="text-foreground/60 mt-xs text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>
        </Section>
      )}

      {/* ── 07. COLLABORATION CTA ── */}
      <Section container="wide" className="mt-xl md:mt-2xl">
        <Reveal>
          <div className="border-border/40 pt-2xl gap-y-lg gap-x-xl grid border-t md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
                Specification // Collaboration
              </p>
              <Heading variant="h2" className="mt-sm text-3xl sm:text-4xl">
                {collaboration.heading}
              </Heading>
            </div>
            <div className="space-y-lg md:col-span-7">
              <p className="text-foreground/70 text-lg leading-relaxed md:text-xl">
                {collaboration.body}
              </p>
              <div className="pt-xs gap-md flex flex-wrap items-center">
                <Link
                  href={"/contact" as Route}
                  className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background group px-md py-sm gap-lg inline-flex items-center justify-between rounded-xs border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300"
                >
                  <span>{collaboration.cta || "Start a conversation"}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
                <Link
                  href={
                    `mailto:${contactEmail}?subject=Inquiry: Sustainable Architecture Brief` as Route
                  }
                  className="text-foreground/50 hover:text-foreground font-mono text-xs tracking-wider uppercase underline underline-offset-4 transition-colors"
                >
                  Or email directly
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
