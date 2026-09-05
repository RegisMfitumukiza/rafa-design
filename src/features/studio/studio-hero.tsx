import Link from "next/link";

import { Image } from "@/components/media/Image";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { Parallax } from "@/motion";

interface StudioHeroProps {
  image: ImageAsset;
  overline: string;
  name: string;
  caption?: string | undefined;
  className?: string;
}

/**
 * StudioHero
 *
 * Cinematic opening composition for the Studio page.
 * Constrained to `100svh - var(--header-height)` so the entire frame,
 * photography, breadcrumb, overline, title, and caption appear
 * simultaneously in the viewport without vertical clipping or overflow.
 *
 * The breadcrumb is unified directly above the overline to eliminate the
 * awkward vertical dead space.
 */
export function StudioHero({ image, overline, name, caption, className }: StudioHeroProps) {
  const displayCaption = caption || image.caption || "RAFA Design Hub // Studio Archive";

  return (
    <div
      className={cn(
        "relative h-[calc(100svh-var(--header-height))] max-h-[920px] min-h-[520px] w-full overflow-hidden",
        className,
      )}
    >
      {/* Parallax image layer with full cover fill */}
      <Parallax className="absolute inset-0 h-full w-full" speed={0.06}>
        <Image
          asset={image}
          fill
          className="h-full w-full"
          imgClassName="object-cover w-full h-full object-center"
          sizes="100vw"
          priority
          loading="eager"
          fetchPriority="high"
        />
      </Parallax>

      {/* Gradient scrim — soft at top, deep at bottom for crisp typographic contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20"
      />

      {/* Bottom unified typographic plate — keeps breadcrumb, overline, title, and caption in full view */}
      <div className="pb-md sm:pb-lg md:pb-xl absolute right-0 bottom-0 left-0 z-10 px-[var(--container-gutter)]">
        <div className="gap-md flex flex-col items-start justify-between md:flex-row md:items-end">
          {/* Left: Unified Breadcrumb → Overline → Title hierarchy */}
          <div className="space-y-xs sm:space-y-sm max-w-4xl">
            {/* Breadcrumb placed immediately above overline to eliminate the huge gap */}
            <div className="gap-xs flex items-center font-mono text-[10px] tracking-widest text-white/70">
              <Link
                href="/"
                className="underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                RAFA
              </Link>
              <span className="text-white/40">→</span>
              <span className="text-white/90">Studio</span>
            </div>

            <p className="font-mono text-[10px] tracking-widest text-white/75 uppercase">
              {overline}
            </p>

            <h1 className="text-4xl leading-[0.92] font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {name}
            </h1>
          </div>

          {/* Right: Caption plate — anchored and clearly visible */}
          {displayCaption && (
            <div className="pl-sm max-w-xs shrink-0 border-l border-white/20 md:border-l-0 md:pl-0 md:text-right">
              <p className="font-mono text-[10px] tracking-widest text-white/60 uppercase">
                {displayCaption}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
