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
import { ProcessTimeline } from "@/features/process/process-timeline";
import { DisciplineCta } from "@/features/services/discipline-cta";
import { ImageReveal, Reveal } from "@/motion";
import { getPageIntros, getProcessPage } from "@/sanity/lib";

export async function generateMetadata(): Promise<Metadata> {
  const [cmsProcess, cmsIntros] = await Promise.all([getProcessPage(), getPageIntros()]);
  const title =
    cmsProcess?.seo?.title ??
    cmsProcess?.title ??
    cmsIntros.process?.title ??
    pageContent.process.title;
  const description =
    cmsProcess?.seo?.description ??
    cmsProcess?.description ??
    cmsIntros.process?.description ??
    pageContent.process.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function ProcessPage() {
  const [cmsProcess, cmsIntros] = await Promise.all([getProcessPage(), getPageIntros()]);
  const steps =
    cmsProcess?.steps && cmsProcess.steps.length > 0 ? cmsProcess.steps : getProcessSteps();
  const total = String(steps.length).padStart(2, "0");
  const heroImage = cmsProcess?.heroImage ?? processHero;

  const processIntro = cmsIntros.process ?? {};
  const overline = cmsProcess?.overline ?? processIntro.overline ?? pageContent.process.overline;
  const title = cmsProcess?.title ?? processIntro.title ?? pageContent.process.title;
  const description =
    cmsProcess?.description ?? processIntro.description ?? pageContent.process.description;

  const proof = {
    overline: cmsProcess?.proof?.overline ?? "Specification // Evidence",
    heading: cmsProcess?.proof?.heading ?? "Built Proof",
    body:
      cmsProcess?.proof?.body ??
      "Our methodology is tested and refined through every built project — from private residences to adaptive reuse.",
    actionText: cmsProcess?.proof?.actionText ?? ui.sections.seeTheWork,
    actionUrl: cmsProcess?.proof?.actionUrl ?? "/projects",
  };

  const cta = {
    overline:
      cmsProcess?.cta?.overline ?? processIntro.cta?.overline ?? pageContent.process.cta.overline,
    heading:
      cmsProcess?.cta?.heading ?? processIntro.cta?.heading ?? pageContent.process.cta.heading,
    body: cmsProcess?.cta?.body ?? processIntro.cta?.body ?? pageContent.process.cta.body,
    action: cmsProcess?.cta?.action ?? processIntro.cta?.action ?? pageContent.process.cta.action,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Process", path: "/process" }])} />

      {/* ── 1. EDITORIAL 12-COLUMN HEADER (Pattern B) ── */}
      <Section container="wide">
        <Reveal visible>
          <div className="gap-x-xl gap-y-md grid items-start md:grid-cols-12">
            {/* Left 6 cols: Title */}
            <div className="md:col-span-6 lg:col-span-6">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                {overline}
              </p>
              <h1 className="font-display text-foreground mt-sm text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {title}
              </h1>
            </div>
            {/* Right 6 cols: Description */}
            <div className="md:pt-md md:col-span-6 lg:col-span-6">
              <p className="text-foreground/70 w-full text-xl leading-relaxed md:text-2xl">
                {description}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 2. HERO — THE WORK IN PROGRESS ── */}
      <Section container="wide" className="mt-xl md:mt-2xl">
        <ImageReveal className="w-full">
          <Image
            asset={heroImage}
            fill
            sizes="100vw"
            priority
            className="aspect-[16/9] w-full md:aspect-[21/9]"
            imgClassName="object-cover"
          />
        </ImageReveal>
        {heroImage.caption && (
          <Reveal delay={0.1}>
            <div className="mt-sm border-border/30 pt-xs flex items-baseline justify-between border-t font-mono text-[10px] tracking-widest uppercase">
              <p className="text-foreground/45">
                FIGURE 00 {"//"} {heroImage.caption}
              </p>
              <span className="text-foreground/25 hidden sm:inline-block">
                Atelier Archive // In Progress
              </span>
            </div>
          </Reveal>
        )}
      </Section>

      {/* ── 3. METHODOLOGY INDEX ── */}
      <Section container="wide" className="mt-2xl" id="methodology">
        <Reveal>
          <div className="mb-md border-border/40 pb-sm flex items-baseline justify-between border-b font-mono text-[10px] tracking-widest uppercase">
            <div className="gap-xs text-foreground/45 flex items-center">
              <span className="bg-foreground/40 inline-block h-1 w-1 rounded-full" />
              <span>{ui.overlines.sequence}</span>
            </div>
            <span className="text-foreground/40">PHASE 01 — {total}</span>
          </div>
        </Reveal>

        <ProcessTimeline steps={steps} titleAs="h2" />
      </Section>

      {/* ── 4. EDITORIAL PROOF TRANSITION ── */}
      <Section container="wide" className="mt-2xl">
        <Reveal>
          <div className="border-border/40 pt-2xl gap-y-lg gap-x-xl grid border-t md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                {proof.overline}
              </p>
              <Heading variant="h2" className="mt-sm text-3xl sm:text-4xl">
                {proof.heading}
              </Heading>
            </div>
            <div className="space-y-lg md:col-span-7">
              <p className="text-foreground/70 text-lg leading-relaxed md:text-xl">{proof.body}</p>
              <Link
                href={(proof.actionUrl || "/projects") as Route}
                className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background group px-md py-sm gap-lg inline-flex items-center justify-between rounded-xs border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300"
              >
                <span>{proof.actionText}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 5. CTA ── */}
      <DisciplineCta content={cta} className="mt-2xl" />
    </>
  );
}
