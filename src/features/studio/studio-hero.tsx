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
 * Full-viewport cinematic opening composition for the Studio page.
 * Studio photography fills the viewport behind a gradient scrim.
 * Studio name and overline are anchored bottom-left — the same
 * editorial composition used on project detail pages.
 */
export function StudioHero({ image, overline, name, caption, className }: StudioHeroProps) {
  return (
    <div className={cn("relative h-svh overflow-hidden", className)}>
      {/* Parallax image layer */}
      <Parallax className="absolute inset-0 h-full w-full" speed={0.15}>
        <Image
          asset={image}
          className="h-full w-full scale-110 object-cover"
          sizes="100vw"
          priority
        />
      </Parallax>

      {/* Gradient scrim — bottom-heavy for text legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20"
      />

      {/* Top breadcrumb */}
      <div className="top-md absolute right-0 left-0 z-10 px-[var(--container-gutter)]">
        <div className="gap-xs flex items-center font-mono text-[10px] tracking-widest text-white/50">
          <Link
            href="/"
            className="underline-offset-4 transition-colors hover:text-white/80 hover:underline"
          >
            RAFA
          </Link>
          <span className="text-white/30">→</span>
          <span className="text-white/70">Studio</span>
        </div>
      </div>

      {/* Bottom-left — overline + studio name */}
      <div className="pb-xl absolute right-0 bottom-0 left-0 z-10 px-[var(--container-gutter)]">
        <p className="mb-sm font-mono text-[10px] tracking-widest text-white/50 uppercase">
          {overline}
        </p>
        <h1 className="max-w-3xl text-5xl leading-[0.92] font-medium tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          {name}
        </h1>
      </div>

      {/* Caption — bottom right */}
      {caption && (
        <p className="bottom-md absolute right-[var(--container-gutter)] z-10 font-mono text-[10px] tracking-widest text-white/35">
          {caption}
        </p>
      )}
    </div>
  );
}
