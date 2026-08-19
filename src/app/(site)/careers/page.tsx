import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import { JsonLd } from "@/components/seo/JsonLd";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Link as TextLink } from "@/components/ui/Link";
import { breadcrumbSchema } from "@/config/schema";
import { careerPositions, benefits, careersContent } from "@/content/company/careers";
import { contactInformation } from "@/content/company/contact";
import { pageContent } from "@/content/pages";
import { ui } from "@/content/ui";
import { Parallax, Reveal, Stagger } from "@/motion";

export const metadata: Metadata = {
  title: pageContent.careers.title,
  description: pageContent.careers.description,
};

export default function CareersPage() {
  const { hero, openApplication, studioImage } = careersContent;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Careers", path: "/careers" }])} />

      {/* 01 — Hero */}
      <Section container="standard">
        <div className="gap-2xl grid items-start md:grid-cols-12">
          <div className="md:col-span-8 lg:col-span-7">
            <Reveal>
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-sm">
                {ui.sections.careersOverline}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance mb-xl">
                {hero.heading}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <Text variant="body" className="text-foreground/60 text-lg md:text-xl leading-relaxed max-w-prose">
                {hero.body}
              </Text>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 02 — Open Positions Index */}
      <Section container="standard">
        <Reveal>
          <div className="mb-2xl">
            <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-sm">
              {ui.sections.openPositionsOverline}
            </p>
            <Heading variant="h2" className="text-3xl md:text-4xl">
              Current opportunities
            </Heading>
          </div>
        </Reveal>

        {careerPositions.length > 0 ? (
          <Stagger className="flex flex-col">
            {careerPositions.map((position, idx) => (
              <div
                key={position.id}
                className={`group border-border py-2xl grid gap-lg md:grid-cols-12 border-t transition-all ${
                  idx === careerPositions.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="text-foreground/30 font-mono text-sm font-medium tracking-widest group-hover:text-foreground/50 group-hover:scale-105 transition-all origin-left md:col-span-1">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-3 lg:col-span-4">
                  <Heading
                    as="h3"
                    variant="h3"
                    className="text-foreground/90 group-hover:text-foreground text-xl md:text-2xl lg:text-3xl transition-colors mb-xs"
                  >
                    {position.title}
                  </Heading>
                  <div className="gap-sm flex flex-wrap items-center text-xs md:text-sm">
                    <span className="text-foreground/40 font-mono uppercase tracking-wider">
                      {position.type.replace("-", " ")}
                    </span>
                    <span className="text-foreground/30">·</span>
                    <span className="text-foreground/50">{position.location}</span>
                  </div>
                </div>
                <div className="md:col-span-8 lg:col-span-7 space-y-md">
                  <Text variant="body" className="text-foreground/60 text-base md:text-lg leading-relaxed">
                    {position.description}
                  </Text>
                  {position.requirements.length > 0 && (
                    <ul className="space-y-xs">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="gap-sm text-foreground/55 flex text-sm md:text-base leading-relaxed">
                          <span className="text-foreground/30 mt-1 shrink-0">—</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="pt-sm">
                    <TextLink
                      href={
                        position.applicationLink
                          ? position.applicationLink
                          : `mailto:${contactInformation.email}?subject=Application — ${position.title}`
                      }
                      variant="underline"
                      external={!!position.applicationLink}
                      className="font-medium text-sm md:text-base group/link inline-flex items-center gap-xs"
                    >
                      {ui.sections.applyForPosition}
                      <span className="inline-block transition-transform group-hover/link:translate-x-1">
                        →
                      </span>
                    </TextLink>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        ) : (
          <Reveal>
            <div className="border-border border-y py-2xl">
              <Text variant="body" className="text-foreground/60 text-base md:text-lg leading-relaxed max-w-prose">
                {ui.careers.emptyState}{" "}
                <TextLink
                  href={`mailto:${contactInformation.email}?subject=Open Application`}
                  variant="underline"
                  className="font-medium"
                >
                  {ui.careers.openApplication}
                </TextLink>
                .
              </Text>
            </div>
          </Reveal>
        )}
      </Section>

      {/* 03 — Studio Image */}
      {studioImage && (
        <Section container="wide">
          <Parallax>
            <Image
              asset={studioImage}
              className="aspect-[16/9] w-full"
              sizes="100vw"
            />
          </Parallax>
          {studioImage.caption && (
            <Reveal delay={0.1}>
              <div className="mt-sm gap-sm flex items-baseline justify-between">
                <p className="text-foreground/40 text-xs">{studioImage.caption}</p>
                <p className="text-foreground/30 font-mono text-[10px] tracking-widest uppercase">
                  The Atelier
                </p>
              </div>
            </Reveal>
          )}
        </Section>
      )}

      {/* 04 — Working at RAFA */}
      <Section container="standard">
        <Reveal>
          <div className="mb-2xl">
            <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-sm">
              {ui.sections.workingAtRafaOverline}
            </p>
            <Heading variant="h2" className="text-3xl md:text-4xl">
              Life at the practice
            </Heading>
          </div>
        </Reveal>

        <Stagger className="flex flex-col">
          {benefits.map((benefit, idx) => (
            <div
              key={benefit.id}
              className={`group border-border py-2xl grid gap-lg md:grid-cols-12 border-t transition-all ${
                idx === benefits.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="text-foreground/30 font-mono text-sm font-medium tracking-widest group-hover:text-foreground/50 group-hover:scale-105 transition-all origin-left md:col-span-1">
                {benefit.number}
              </span>
              <div className="md:col-span-3 lg:col-span-4">
                <Heading
                  as="h3"
                  variant="h3"
                  className="text-foreground/90 group-hover:text-foreground text-xl md:text-2xl lg:text-3xl transition-colors"
                >
                  {benefit.title}
                </Heading>
              </div>
              <div className="md:col-span-8 lg:col-span-7">
                <Text variant="body" className="text-foreground/60 text-base md:text-lg leading-relaxed">
                  {benefit.description}
                </Text>
              </div>
            </div>
          ))}
        </Stagger>
      </Section>

      {/* 05 — Open Application CTA */}
      <Section container="standard">
        <Reveal>
          <div className="gap-2xl grid items-end md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-sm">
                Specification // {openApplication.overline}
              </p>
              <Heading variant="h2" className="text-3xl md:text-4xl lg:text-5xl leading-tight text-balance">
                {openApplication.heading}
              </Heading>
            </div>
            <div className="md:col-span-4 md:col-start-9 md:pb-xs">
              <Text variant="body" className="text-foreground/60 text-base md:text-lg mb-lg leading-relaxed">
                {openApplication.body}
              </Text>
              <TextLink
                href={`mailto:${contactInformation.email}?subject=Open Application`}
                variant="underline"
                className="font-medium text-base md:text-lg group"
              >
                {openApplication.cta}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </TextLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
