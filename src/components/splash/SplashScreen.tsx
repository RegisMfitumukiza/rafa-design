"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

import { useSiteConfig } from "@/features/site/site-config-context";
import { cn } from "@/lib/cn";

export type SplashPhase = "cover" | "playing" | "fading";

interface SplashScreenProps {
  phase: SplashPhase;
  onFadeComplete: () => void;
}

/**
 * SplashScreen
 *
 * Museum-Grade Architectural Monograph & Drafting Line Reveal.
 * Industrial/editorial intro animation:
 *   1. Displays 'RAFA DESIGN HUB' with dynamic tracking settling (0.4em -> 0.2em).
 *   2. Extends 1px architectural hairline drafting rules from center.
 *   3. Fades in GPS coordinates & specification overline (41.1579° N, 8.6291° W).
 *   4. Elevates curtain screen upward (yPercent: -100) with a precise architectural curve.
 */
export function SplashScreen({ phase, onFadeComplete }: SplashScreenProps) {
  const { name } = useSiteConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const coordsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (phase !== "playing") return;

    const container = containerRef.current;
    const line = lineRef.current;
    const text = textRef.current;
    const overline = overlineRef.current;
    const coords = coordsRef.current;

    if (!container || !line || !text || !overline || !coords) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onFadeComplete();
        },
      });

      // 1. Studio Name Entrance + Letter-Spacing Settling
      tl.fromTo(
        text,
        { autoAlpha: 0, y: 10, letterSpacing: "0.4em" },
        { autoAlpha: 1, y: 0, letterSpacing: "0.22em", duration: 0.45, ease: "power3.out" },
      )
        // 2. 1px Architectural Drafting Line Center-Outward Expansion
        .fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.4, ease: "cubic-bezier(0.85, 0, 0.15, 1)" },
          "-=0.15",
        )
        // 3. Specification Overline & GPS Coordinates Staggered Reveal
        .fromTo(
          [overline, coords],
          { autoAlpha: 0, y: 4 },
          { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.08, ease: "power2.out" },
          "-=0.1",
        )
        // 4. Snappy Pause (150ms) then Architectural Curtain Elevation
        .to(container, {
          yPercent: -100,
          duration: 0.55,
          ease: "cubic-bezier(0.77, 0, 0.175, 1)",
          delay: 0.15,
        });
    }, container);

    return () => ctx.revert();
  }, [phase, onFadeComplete]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      role="presentation"
      className={cn(
        "bg-background text-foreground z-overlay p-lg pointer-events-none fixed inset-0 flex flex-col items-center justify-center select-none",
      )}
    >
      <div className="space-y-sm flex w-full max-w-lg flex-col items-center justify-center text-center">
        {/* Monospace Specification Overline */}
        <p
          ref={overlineRef}
          className="text-foreground/40 text-micro font-mono tracking-[0.25em] uppercase opacity-0"
        >
          SPECIFICATION // ARCHITECTURE STUDIO
        </p>

        {/* Studio Monogram Title */}
        <h1
          ref={textRef}
          className="font-display text-foreground text-3xl font-medium uppercase opacity-0 sm:text-4xl md:text-5xl"
        >
          {name}
        </h1>

        {/* 1px Architectural Drafting Line */}
        <div
          ref={lineRef}
          className="bg-foreground/40 my-xs h-px w-full origin-center opacity-100"
        />

        {/* GPS Coordinates & Local Studio Time */}
        <p
          ref={coordsRef}
          className="text-foreground/40 text-micro font-mono tracking-[0.2em] uppercase opacity-0"
        >
          1.9592° S, 30.1047° E // KIGALI, GASABO
        </p>
      </div>
    </div>
  );
}
