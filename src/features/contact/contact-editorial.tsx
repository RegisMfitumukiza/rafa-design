"use client";

import { Image } from "@/components/media/Image";
import { pageContent } from "@/content/pages";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { ImageReveal, Reveal } from "@/motion";

export interface ContactIntroEditorial {
  editorialOverline?: string;
  dialogueOverline?: string;
  closingHeading?: string;
  closingBody?: string;
}

interface ContactEditorialProps {
  editorialImage: ImageAsset;
  email: string;
  intro?: ContactIntroEditorial;
  className?: string;
}

/**
 * ContactEditorial
 *
 * Studio Human Context & Editorial Closing Statement.
 *
 * Renders a single high-quality studio working environment photograph
 * followed by the restrained closing statement:
 *   "EVERY PROJECT BEGINS WITH A CONVERSATION."
 * with a direct email action link.
 */
export function ContactEditorial({
  editorialImage,
  email,
  intro,
  className,
}: ContactEditorialProps) {
  const contact = pageContent.contact;
  const contactInfo = { email };

  const editorialOverline = intro?.editorialOverline ?? contact.editorialOverline;
  const dialogueOverline = intro?.dialogueOverline ?? contact.dialogueOverline;
  const closingHeading = intro?.closingHeading ?? contact.closingHeading;
  const closingBody = intro?.closingBody ?? contact.closingBody;

  return (
    <div className={cn("space-y-2xl", className ?? "")}>
      {/* Studio Working Environment Context Image */}
      <div>
        <ImageReveal className="w-full">
          <Image
            asset={editorialImage}
            fill
            sizes="100vw"
            className="aspect-[16/9] w-full rounded-sm md:aspect-[21/9]"
            imgClassName="object-cover"
          />
        </ImageReveal>
        <Reveal delay={0.1}>
          <p className="text-foreground/40 mt-sm text-overline font-mono tracking-widest uppercase">
            {editorialOverline}
          </p>
        </Reveal>
      </div>

      {/* Editorial Closing Statement */}
      <div className="border-border/40 pt-2xl border-t">
        <Reveal>
          <div className="gap-y-md gap-x-xl grid md:grid-cols-12 md:items-baseline">
            <div className="md:col-span-5">
              <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
                {dialogueOverline}
              </p>
              <h2 className="font-display text-foreground mt-sm text-3xl font-medium tracking-tight text-balance md:text-4xl">
                {closingHeading}
              </h2>
            </div>
            <div className="space-y-md md:col-span-7">
              <p className="text-foreground/70 text-lg leading-relaxed text-balance md:text-xl">
                {closingBody}
              </p>
              <div className="pt-xs">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background group px-md py-sm gap-md inline-flex items-center rounded-xs border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300"
                >
                  <span>{contactInfo.email}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
