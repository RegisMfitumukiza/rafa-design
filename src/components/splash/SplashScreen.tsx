"use client";

import { gsap } from "gsap";
import { useContext, useEffect, useRef } from "react";

import { ContactContext } from "@/features/contact/contact-context";
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
 * Industrial editorial intro animation:
 *   1. Fades in specification overline ('SPECIFICATION // ARCHITECTURE STUDIO').
 *   2. Displays Studio Monogram with dynamic letter-spacing settling (0.35em -> 0.22em).
 *   3. Extends 1px architectural hairline drafting rule from center outward.
 *   4. Fades in GPS coordinates & atelier specification.
 *   5. Dignified editorial dwell time (~0.65s hold) allowing comfortable reading.
 *   6. Elevates curtain screen upward (yPercent: -100) with a precise architectural curve.
 */
export function SplashScreen({ phase, onFadeComplete }: SplashScreenProps) {
  const { name } = useSiteConfig();
  const contact = useContext(ContactContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const coordsRef = useRef<HTMLParagraphElement>(null);

  const studioName = name || "RAFA DESIGN HUB";
  const coordinates = contact?.coordinates ?? "1.9592° S, 30.1047° E";
  const locationSpec = contact?.address
    ? `${coordinates} // ${contact.address.toUpperCase()}`
    : `${coordinates} // KIGALI, GASABO`;

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

      // 1. Monospace Specification Overline Reveal
      tl.fromTo(
        overline,
        { autoAlpha: 0, y: -6 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
      )
        // 2. Studio Monogram Title Entrance + Dynamic Letter-Spacing Settling
        .fromTo(
          text,
          { autoAlpha: 0, y: 10, letterSpacing: "0.35em" },
          { autoAlpha: 1, y: 0, letterSpacing: "0.22em", duration: 0.55, ease: "power3.out" },
          "-=0.2",
        )
        // 3. 1px Architectural Drafting Line Center-Outward Expansion
        .fromTo(
          line,
          { scaleX: 0, autoAlpha: 0 },
          { scaleX: 1, autoAlpha: 1, duration: 0.5, ease: "cubic-bezier(0.85, 0, 0.15, 1)" },
          "-=0.2",
        )
        // 4. GPS Coordinates Specification Staggered Reveal
        .fromTo(
          coords,
          { autoAlpha: 0, y: 6 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.15",
        )
        // 5. Dignified Editorial Dwell Time (The Reading Hold)
        // Gives viewer comfortable dwell time to absorb studio monogram, specification, and location.
        // 6. Architectural Curtain Elevation
        .to(container, {
          yPercent: -100,
          duration: 0.65,
          ease: "cubic-bezier(0.77, 0, 0.175, 1)",
          delay: 0.65,
        });
    }, container);

    return () => ctx.revert();
  }, [phase, onFadeComplete]);

  return (
    <div
      ref={containerRef}
      data-splash-screen
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
          {studioName}
        </h1>

        {/* 1px Architectural Drafting Line - initialized invisible & scaled to center */}
        <div
          ref={lineRef}
          className="bg-foreground/40 my-xs h-px w-full origin-center scale-x-0 opacity-0"
        />

        {/* GPS Coordinates & Atelier Specification */}
        <p
          ref={coordsRef}
          className="text-foreground/40 text-micro font-mono tracking-[0.2em] uppercase opacity-0"
        >
          {locationSpec}
        </p>
      </div>
    </div>
  );
}
