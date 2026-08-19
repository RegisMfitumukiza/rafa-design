import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { Image } from "@/components/media/Image";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/config/schema";
import { pageContent } from "@/content/pages";
import {
  studioContent,
  teamMembers,
  awards,
  timeline,
  clientSectors,
  clientReferencesNote,
} from "@/content/studio";
import { ui } from "@/content/ui";
import { Awards } from "@/features/studio/awards";
import { Beliefs } from "@/features/studio/beliefs";
import { Partners } from "@/features/studio/partners";
import { StudioHero } from "@/features/studio/studio-hero";
import { StudioIntroduction } from "@/features/studio/studio-introduction";
import { TeamGrid } from "@/features/studio/team-grid";
import { Timeline } from "@/features/studio/timeline";
import { VisitStudio } from "@/features/studio/visit-studio";
import { WorkingMethods } from "@/features/studio/working-methods";
import { Parallax, Reveal } from "@/motion";

export const metadata: Metadata = {
  title: pageContent.studio.title,
  description: pageContent.studio.description,
};

export default function StudioPage() {
  const heroImage = studioContent.images[0];
  const atelierImage = studioContent.images[1];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Studio", path: "/studio" }])} />

      {/* 1 — Cinematic hero opener */}
      {heroImage && (
        <StudioHero
          image={heroImage}
          overline={studioContent.overline}
          name={studioContent.name}
          caption={heroImage.caption}
        />
      )}

      {/* 2 — Manifesto / Introduction split */}
      <StudioIntroduction studio={studioContent} />

      {/* 3 — Beliefs / Principles */}
      <Beliefs studio={studioContent} />

      {/* 4 — Second atelier image (material samples) */}
      {atelierImage && (
        <Section container="wide">
          <Parallax>
            <Image asset={atelierImage} className="aspect-hero w-full" sizes="100vw" />
          </Parallax>
          {atelierImage.caption && (
            <Reveal delay={0.1}>
              <div className="mt-sm gap-sm flex items-baseline justify-between">
                <p className="text-foreground/40 text-xs">{atelierImage.caption}</p>
                <p className="text-foreground/30 font-mono text-[10px] tracking-widest uppercase">
                  {ui.overlines.atelier}
                </p>
              </div>
            </Reveal>
          )}
        </Section>
      )}

      {/* 5 — Team */}
      <TeamGrid members={teamMembers} />

      {/* 6 — Working Methods */}
      <WorkingMethods studio={studioContent} />

      {/* 7 — Awards */}
      <Awards awards={awards} />

      {/* 8 — Timeline (History merged in as intro paragraph) */}
      <Timeline
        events={timeline}
        intro={studioContent.history}
      />

      {/* 9 — Client Sectors / Partners */}
      <Partners sectors={clientSectors} note={clientReferencesNote} />

      {/* 10 — Visit Studio CTA */}
      <VisitStudio studio={studioContent} />
    </>
  );
}
