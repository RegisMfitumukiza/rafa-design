import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import { JsonLd } from "@/components/seo/JsonLd";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Link as TextLink } from "@/components/ui/Link";
import { breadcrumbSchema } from "@/config/schema";
import { pageContent } from "@/content/pages";
import { sustainabilityContent } from "@/content/sustainability";
import { Parallax, Reveal, Stagger } from "@/motion";
import { getPageIntros } from "@/sanity/lib";

export async function generateMetadata(): Promise<Metadata> {
  const cmsIntros = await getPageIntros();
  const title = cmsIntros.sustainability?.heading ?? pageContent.sustainability.title;
  const description = cmsIntros.sustainability?.body ?? pageContent.sustainability.description;
  return {
    title,
    description,
  };
}

export default async function SustainabilityPage() {
  const { manifesto, philosophy, materialImage, commitments, principles, collaboration } =
    sustainabilityContent;
  const cmsIntros = await getPageIntros();

  const overline = cmsIntros.sustainability?.overline ?? manifesto.overline;
  const heading = cmsIntros.sustainability?.heading ?? manifesto.heading;
  const body = cmsIntros.sustainability?.body ?? manifesto.body;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Sustainability", path: "/sustainability" }])} />

      {/* 01 — Monograph Cover / Manifesto */}
      <Section container="standard">
        <div className="gap-2xl grid items-start md:grid-cols-12">
          <div className="md:col-span-8 lg:col-span-7">
            <Reveal visible>
              <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-widest uppercase">
                Specification // {overline}
              </p>
            </Reveal>
            <Reveal visible>
              <h1 className="font-display mb-xl text-5xl leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl">
                {heading}
              </h1>
            </Reveal>
            <Reveal visible>
              <Text
                variant="body"
                className="text-foreground/60 max-w-prose text-lg leading-relaxed md:text-xl"
              >
                {body}
              </Text>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 02 — Philosophy Statement */}
      <Section container="standard">
        <Reveal>
          <div className="gap-2xl grid items-start md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-widest uppercase">
                Specification // Philosophy
              </p>
              <Heading
                variant="h2"
                className="text-3xl leading-tight text-balance md:text-4xl lg:text-5xl"
              >
                {philosophy.heading}
              </Heading>
            </div>
            <div className="md:pt-lg md:col-span-7">
              <Text variant="body" className="text-foreground/65 text-lg leading-relaxed">
                {philosophy.body}
              </Text>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 03 — Material Moment */}
      {materialImage && (
        <Section container="wide">
          <Parallax>
            <Image asset={materialImage} className="aspect-[16/9] w-full" sizes="100vw" />
          </Parallax>
          {materialImage.caption && (
            <Reveal delay={0.1}>
              <div className="mt-sm gap-sm flex items-baseline justify-between">
                <p className="text-foreground/40 text-xs">{materialImage.caption}</p>
                <p className="text-foreground/30 font-mono text-[10px] tracking-widest uppercase">
                  Material Study
                </p>
              </div>
            </Reveal>
          )}
        </Section>
      )}

      {/* 04 — Four Commitments — Ruled Architectural Index */}
      <Section container="standard">
        <Reveal>
          <div className="mb-2xl">
            <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-widest uppercase">
              Specification // Commitments
            </p>
            <Heading variant="h2" className="text-3xl md:text-4xl">
              Four commitments
            </Heading>
          </div>
        </Reveal>

        <Stagger className="flex flex-col">
          {commitments.map((commitment, idx) => (
            <div
              key={commitment.id}
              className={`group border-border py-2xl gap-lg grid border-t transition-all md:grid-cols-12 ${
                idx === commitments.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="text-foreground/30 group-hover:text-foreground/50 origin-left font-mono text-sm font-medium tracking-widest transition-all group-hover:scale-105 md:col-span-1">
                {commitment.number}
              </span>
              <div className="md:col-span-3 lg:col-span-4">
                <Heading
                  as="h3"
                  variant="h3"
                  className="text-foreground/90 group-hover:text-foreground text-xl transition-colors md:text-2xl lg:text-3xl"
                >
                  {commitment.title}
                </Heading>
              </div>
              <div className="md:col-span-8 lg:col-span-7">
                <Text
                  variant="body"
                  className="text-foreground/60 text-base leading-relaxed md:text-lg"
                >
                  {commitment.description}
                </Text>
              </div>
            </div>
          ))}
        </Stagger>
      </Section>

      {/* 05 — Design Principles */}
      <Section container="standard">
        <Reveal>
          <div className="gap-2xl grid items-start md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-widest uppercase">
                Specification // Principles
              </p>
              <Heading
                variant="h2"
                className="text-3xl leading-tight text-balance md:text-4xl lg:text-5xl"
              >
                Our guiding rules.
              </Heading>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <Stagger className="gap-xl flex flex-col">
                {principles.map((principle, idx) => (
                  <div
                    key={idx}
                    className="border-border/30 gap-lg pb-xl flex items-start border-b last:border-0 last:pb-0"
                  >
                    <span className="text-foreground/30 mt-1 shrink-0 font-mono text-sm tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <Text
                      variant="body"
                      className="text-foreground/70 text-lg leading-relaxed italic md:text-xl"
                    >
                      &ldquo;{principle}&rdquo;
                    </Text>
                  </div>
                ))}
              </Stagger>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 06 — Collaboration CTA */}
      <Section container="standard">
        <Reveal>
          <div className="gap-2xl grid items-end md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-widest uppercase">
                Specification // Collaboration
              </p>
              <Heading
                variant="h2"
                className="text-3xl leading-tight text-balance md:text-4xl lg:text-5xl"
              >
                {collaboration.heading}
              </Heading>
            </div>
            <div className="md:pb-xs md:col-span-4 md:col-start-9">
              <Text
                variant="body"
                className="text-foreground/60 mb-lg text-base leading-relaxed md:text-lg"
              >
                {collaboration.body}
              </Text>
              <TextLink
                href="/contact"
                variant="underline"
                className="group text-base font-medium md:text-lg"
              >
                {collaboration.cta}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </TextLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
