"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { Image } from "@/components/media/Image";
import type { ProjectHeroVideo } from "@/content/projects";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";
import { Parallax } from "@/motion";

interface ProjectHeroParallaxProps {
  heroImage: ImageAsset;
  heroVideo?: ProjectHeroVideo | undefined;
  title: string;
  subtitle?: string | undefined;
  year: number;
  locationCity: string;
  locationCountry: string;
  typology?: string[] | undefined;
  photographerCredit?: string | undefined;
  className?: string | undefined;
}

/**
 * ProjectHeroParallax
 *
 * A full-viewport cinematic opening composition for the project detail page.
 * Merges the project title + hero photography into one monumental opening frame.
 *
 * When heroVideo is uploaded, it plays an ambient loop in the parallax layer,
 * backed by the heroImage for instant first paint and low-bandwidth resilience.
 */
export function ProjectHeroParallax({
  heroImage,
  heroVideo,
  title,
  subtitle,
  year,
  locationCity,
  locationCountry,
  typology,
  photographerCredit,
  className,
}: ProjectHeroParallaxProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className={cn(
        "relative h-[calc(100svh-var(--header-height))] min-h-[520px] w-full overflow-hidden",
        className,
      )}
    >
      {/* Parallax layer — photo or cinematic ambient video */}
      <Parallax className="absolute inset-0 h-full w-full" speed={0.15}>
        <div className="relative h-full w-full">
          <Image
            asset={heroImage}
            fill
            className="h-full w-full object-cover"
            imgClassName="object-cover w-full h-full"
            sizes="100vw"
            priority
            loading="eager"
            fetchPriority="high"
          />
          {heroVideo?.url && (
            <video
              ref={videoRef}
              src={heroVideo.url}
              autoPlay
              muted
              loop
              playsInline
              poster={heroImage.src}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      </Parallax>

      {/* Top gradient scrim — guarantees contrast for breadcrumb & top bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent"
      />

      {/* Dark gradient — bottom heavy for title legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
      />

      {/* Content container — vertical space distribution */}
      <div className="absolute inset-0 z-10 flex flex-col px-[var(--container-gutter)]">
        {/* Top breadcrumb — frosted architectural pill */}
        <div className="pt-sm sm:pt-md pb-xs">
          <div className="text-overline inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono tracking-widest text-white/70 uppercase backdrop-blur-md">
            <Link
              href="/projects"
              className="underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Projects
            </Link>
            <span className="text-white/30" aria-hidden="true">
              →
            </span>
            <span className="max-w-[180px] truncate font-medium text-white/95 sm:max-w-none">
              {title}
            </span>
          </div>
        </div>

        {/* Spacer - pushes content to bottom */}
        <div className="flex-1" />

        {/* Bottom title composition */}
        <div className="pb-md sm:pb-lg md:pb-xl w-full min-w-0">
          {/* Overline metadata */}
          <p className="mb-xs md:mb-sm text-overline font-mono tracking-widest text-white/60 uppercase [text-shadow:_0_1px_12px_rgba(0,0,0,0.9)]">
            {year}
            {locationCity && ` · ${locationCity}, ${locationCountry}`}
            {typology &&
              Array.isArray(typology) &&
              typology.length > 0 &&
              ` · ${typology.join(", ")}`}
          </p>

          {/* Monumental title with design system display font */}
          <h1 className="font-display max-w-4xl text-3xl leading-[0.95] font-medium tracking-tight break-words text-white [text-shadow:_0_2px_16px_rgba(0,0,0,0.8),_0_4px_32px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-xs md:mt-sm line-clamp-4 w-full max-w-2xl overflow-hidden text-sm leading-relaxed font-light break-words text-white/80 [text-shadow:_0_1px_8px_rgba(0,0,0,0.8)] sm:line-clamp-none sm:text-base md:text-lg">
              {subtitle}
            </p>
          )}

          {/* Photographer / film credit — inline on mobile */}
          {(heroVideo?.credit || photographerCredit) && (
            <p className="mt-xs text-micro font-mono tracking-widest text-white/45 uppercase md:hidden">
              {heroVideo?.credit
                ? `Film: ${heroVideo.credit}`
                : `Photography: ${photographerCredit}`}
            </p>
          )}
        </div>
      </div>

      {/* Media controls & credit — bottom right on desktop */}
      <div className="bottom-md absolute right-[var(--container-gutter)] z-20 hidden items-center gap-4 md:flex">
        {heroVideo?.url && (
          <div className="text-micro flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono tracking-widest text-white/70 uppercase backdrop-blur-md">
            <button
              type="button"
              onClick={togglePlay}
              className="transition-colors hover:text-white"
              aria-label={isPlaying ? "Pause cinematic reel" : "Play cinematic reel"}
            >
              {isPlaying ? "PAUSE" : "PLAY"}
            </button>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={toggleMute}
              className="transition-colors hover:text-white"
              aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            >
              {isMuted ? "SOUND ON" : "MUTED"}
            </button>
          </div>
        )}
        {(heroVideo?.credit || photographerCredit) && (
          <p className="text-overline font-mono tracking-widest text-white/40 uppercase">
            {heroVideo?.credit ? `Film: ${heroVideo.credit}` : `Photography: ${photographerCredit}`}
          </p>
        )}
      </div>
    </div>
  );
}
