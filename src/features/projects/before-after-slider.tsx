"use client";

import { Image } from "@/components/media/Image";
import type { BeforeAfterImage } from "@/content/projects";
import { Reveal } from "@/motion";

interface BeforeAfterSliderProps {
  data: BeforeAfterImage;
  className?: string;
}

export function BeforeAfterSlider({ data, className = "" }: BeforeAfterSliderProps) {
  return (
    <div className={className}>
      <Reveal>
        <div className="mb-md">
          <p className="text-foreground/40 mb-xs font-mono text-[10px] tracking-widest uppercase">
            Transformation
          </p>
          {data.caption && (
            <p className="text-foreground/70 text-base font-light italic">{data.caption}</p>
          )}
        </div>
      </Reveal>

      <div className="gap-md grid md:grid-cols-2">
        {/* BEFORE IMAGE */}
        <Reveal delay={0.1}>
          <div className="border-border/40 relative border">
            <div className="bg-background/85 text-foreground/70 px-xs absolute top-3 left-3 z-10 py-1 font-mono text-[10px] tracking-widest uppercase">
              The Existing Building
            </div>
            <Image
              asset={data.before}
              className="aspect-landscape w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>

        {/* AFTER IMAGE */}
        <Reveal delay={0.2}>
          <div className="border-border/40 relative border">
            <div className="bg-foreground text-background px-xs absolute top-3 left-3 z-10 py-1 font-mono text-[10px] tracking-widest uppercase">
              The Completed Work
            </div>
            <Image
              asset={data.after}
              className="aspect-landscape w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
