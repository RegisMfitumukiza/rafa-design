"use client";

import { Image } from "@/components/media/Image";
import { contactInformation } from "@/content/company/contact";
import { pageContent } from "@/content/pages";
import { cn } from "@/lib/cn";
import { ImageReveal, Reveal } from "@/motion";

interface ContactEditorialProps {
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
export function ContactEditorial({ className }: ContactEditorialProps) {
  const contact = pageContent.contact;
  const contactInfo = contactInformation;

  return (
    <div className={cn("space-y-2xl", className ?? "")}>
      {/* Studio Working Environment Context Image */}
      <div>
        <ImageReveal className="w-full">
          <Image
            asset={contactInfo.editorialImage}
            sizes="100vw"
            className="aspect-[16/9] w-full rounded-sm md:aspect-[21/9]"
            imgClassName="object-cover"
          />
        </ImageReveal>
        <Reveal delay={0.1}>
          <p className="text-foreground/40 mt-sm font-mono text-[10px] tracking-widest uppercase">
            {contact.editorialOverline}
          </p>
        </Reveal>
      </div>

      {/* Editorial Closing Statement */}
      <div className="border-border/40 pt-2xl border-t">
        <Reveal>
          <div className="gap-y-md gap-x-xl grid md:grid-cols-12 md:items-baseline">
            <div className="md:col-span-5">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                {contact.dialogueOverline}
              </p>
              <h2 className="font-display text-foreground mt-sm text-3xl font-medium tracking-tight text-balance md:text-4xl">
                {contact.closingHeading}
              </h2>
            </div>
            <div className="space-y-md md:col-span-7">
              <p className="text-foreground/70 text-lg leading-relaxed text-balance md:text-xl">
                {contact.closingBody}
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
