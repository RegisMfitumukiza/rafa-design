import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/config/schema";
import { pageContent } from "@/content/pages";
import { ui } from "@/content/ui";
import { Awards } from "@/features/studio/awards";
import { Beliefs } from "@/features/studio/beliefs";
import { Partners } from "@/features/studio/partners";
import { StudioFilm } from "@/features/studio/studio-film";
import { StudioHero } from "@/features/studio/studio-hero";
import { TeamGrid } from "@/features/studio/team-grid";
import { Timeline } from "@/features/studio/timeline";
import { VisitStudio } from "@/features/studio/visit-studio";
import { WorkingMethods } from "@/features/studio/working-methods";
import { Parallax, Reveal } from "@/motion";
import {
  getStudioCollections,
  getStudioHistory,
  getStudioInfo,
  getTeamMembers,
} from "@/sanity/lib";

export const metadata: Metadata = {
  title: pageContent.studio.title,
  description: pageContent.studio.description,
};

export default async function StudioPage() {
  const [studio, team, { awards, timeline, clientSectors, clientReferencesNote }, history] =
    await Promise.all([
      getStudioInfo(),
      getTeamMembers(),
      getStudioCollections(),
      getStudioHistory(),
    ]);

  // Sanity-first: without studio content the page cannot be composed.
  if (!studio) {
    return null;
  }

  const heroImage = studio.images[0];
  const atelierImage = studio.images[1];
  const historyNarrative = history || studio.history;
  const referencesNote = clientReferencesNote ?? "Full client references available on request.";

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Studio", path: "/studio" }])} />

      {/* 1 — Unified Editorial Monograph Opener */}
      {heroImage && (
        <StudioHero
          image={heroImage}
          overline={studio.overline}
          name={studio.name}
          manifesto={studio.manifesto}
          introduction={studio.introduction}
          caption={heroImage.caption}
        />
      )}

      {/* 2 — Beliefs / Principles */}
      <Beliefs studio={studio} />

      {/* 3 — Second atelier image (material samples) */}
      {atelierImage && (
        <Section container="wide">
          <Parallax speed={0.06}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm lg:aspect-[21/9]">
              <Image
                asset={atelierImage}
                fill
                className="h-full w-full"
                imgClassName="object-cover w-full h-full object-center"
                sizes="100vw"
              />
            </div>
          </Parallax>
          {atelierImage.caption && (
            <Reveal delay={0.1}>
              <div className="mt-sm gap-sm flex items-baseline justify-between">
                <p className="text-foreground/50 text-overline font-mono tracking-widest uppercase">
                  02 // {atelierImage.caption}
                </p>
                <p className="text-foreground/30 text-overline font-mono tracking-widest uppercase">
                  {ui.overlines.atelier}
                </p>
              </div>
            </Reveal>
          )}
        </Section>
      )}

      {/* 4 — Atelier Film / Practice Video (Optional) */}
      {studio.atelierVideo && <StudioFilm video={studio.atelierVideo} />}

      {/* 5 — Team */}
      <TeamGrid members={team} />

      {/* 6 — Working Methods */}
      <WorkingMethods studio={studio} />

      {/* 7 — Awards */}
      <Awards awards={awards} />

      {/* 8 — Timeline (History merged in as intro paragraph) */}
      <Timeline events={timeline} intro={historyNarrative} />

      {/* 9 — Client Sectors / Partners */}
      <Partners sectors={clientSectors} note={referencesNote} />

      {/* 10 — Visit Studio CTA */}
      <VisitStudio studio={studio} />
    </>
  );
}
