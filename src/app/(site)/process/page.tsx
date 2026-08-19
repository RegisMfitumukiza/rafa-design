import type { Metadata } from "next";
import type { Route } from "next";

import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import { JsonLd } from "@/components/seo/JsonLd";
import { Heading } from "@/components/typography/Heading";
import { breadcrumbSchema } from "@/config/schema";
import { pageContent } from "@/content/pages";
import { getProcessSteps, processHero } from "@/content/process";
import { ui } from "@/content/ui";
import { ProcessProgress } from "@/features/process/process-progress";
import { ProcessTimeline } from "@/features/process/process-timeline";
import { DisciplineCta } from "@/features/services/discipline-cta";
import { ImageReveal, Reveal } from "@/motion";

export const metadata: Metadata = {
  title: pageContent.process.title,
  description: pageContent.process.description,
  openGraph: {
    title: pageContent.process.title,
    description: pageContent.process.description,
  },
};

export default function ProcessPage() {
  const steps = getProcessSteps();
  const total = String(steps.length).padStart(2, "0");

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Process", path: "/process" }])} />
      <ProcessProgress targetId="methodology" />

      {/* ── 1. EDITORIAL 12-COLUMN HEADER (Pattern B) ── */}
      <Section container="wide">
        <Reveal>
          <div className="gap-x-xl gap-y-md grid items-start md:grid-cols-12">
            {/* Left 6 cols: Title */}
            <div className="md:col-span-6 lg:col-span-6">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                {pageContent.process.overline}
              </p>
              <h1 className="font-display text-foreground mt-sm text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {pageContent.process.title}
              </h1>
            </div>
            {/* Right 6 cols: Description */}
            <div className="md:pt-md md:col-span-6 lg:col-span-6">
              <p className="text-foreground/70 w-full text-xl leading-relaxed md:text-2xl">
                {pageContent.process.description}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 2. HERO — THE WORK IN PROGRESS ── */}
      <Section container="wide" className="mt-xl md:mt-2xl">
        <ImageReveal className="w-full">
          <Image
            asset={processHero}
            sizes="100vw"
            priority
            className="aspect-[16/9] w-full md:aspect-[21/9]"
            imgClassName="object-cover"
          />
        </ImageReveal>
        <Reveal delay={0.1}>
          <p className="text-foreground/40 mt-sm font-mono text-[10px] tracking-widest uppercase">
            {processHero.caption}
          </p>
        </Reveal>
      </Section>

      {/* ── 3. METHODOLOGY INDEX ── */}
      <Section container="wide" className="mt-2xl" id="methodology">
        <Reveal>
          <div className="mb-md gap-sm border-border/40 pb-sm flex items-baseline justify-between border-b">
            <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
              {ui.overlines.sequence}
            </p>
            <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
              01 — {total}
            </p>
          </div>
        </Reveal>

        <ProcessTimeline steps={steps} titleAs="h2" />
      </Section>

      {/* ── 4. EDITORIAL PROOF TRANSITION (Clean flow after Completion, no double line) ── */}
      <Section container="wide" className="mt-xl md:mt-2xl">
        <Reveal>
          <div className="gap-y-lg gap-x-xl grid md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                Specification // Evidence
              </p>
              <Heading variant="h2" className="mt-sm">
                Built Proof
              </Heading>
            </div>
            <div className="space-y-lg md:col-span-7">
              <p className="text-foreground/70 text-lg leading-relaxed md:text-xl">
                Our methodology is tested and refined through every built project — from private
                residences to adaptive reuse.
              </p>
              <Link
                href={"/projects" as Route}
                className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background group px-md py-sm gap-lg inline-flex items-center justify-between rounded-sm border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300"
              >
                <span>{ui.sections.seeTheWork}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 5. CTA ── */}
      <DisciplineCta content={pageContent.process.cta} className="mt-2xl" />
    </>
  );
}
