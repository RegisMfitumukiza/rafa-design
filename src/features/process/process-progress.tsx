"use client";

import { gsap } from "gsap";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/motion";
import { useScopedGsap } from "@/motion/use-scoped-gsap";

interface ProcessProgressProps {
  /** Element id of the section the progress line is bound to */
  targetId: string;
  className?: string;
}

/**
 * ProcessProgress
 *
 * A quiet reading-progress hairline pinned beneath the site header. It tracks
 * scroll position through the methodology section (scrubbed via ScrollTrigger).
 *
 * - Fades IN smoothly when entering the methodology section.
 * - Scrubs progress from 0% to 100% while reading methodology.
 * - Fades OUT smoothly when scrolling past methodology (or back above it).
 */
export function ProcessProgress({ targetId, className }: ProcessProgressProps) {
  const reduced = useReducedMotion();
  const scope = useScopedGsap(
    (_, scopeRef) => {
      if (reduced || !scopeRef.current) {
        return;
      }

      const section = document.getElementById(targetId);
      const fill = scopeRef.current.querySelector<HTMLElement>("[data-progress-fill]");

      if (!fill || !section) {
        return;
      }

      // Hide progress container by default
      gsap.set(scopeRef.current, { autoAlpha: 0 });

      gsap.fromTo(
        fill,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 30%",
            end: "bottom 85%",
            scrub: true,
            onEnter: () => gsap.to(scopeRef.current, { autoAlpha: 1, duration: 0.3 }),
            onLeave: () => gsap.to(scopeRef.current, { autoAlpha: 0, duration: 0.3 }),
            onEnterBack: () => gsap.to(scopeRef.current, { autoAlpha: 1, duration: 0.3 }),
            onLeaveBack: () => gsap.to(scopeRef.current, { autoAlpha: 0, duration: 0.3 }),
          },
        },
      );
    },
    [reduced, targetId],
  );

  return (
    <div
      ref={scope}
      aria-hidden
      className={cn(
        "border-border/40 z-header pointer-events-none fixed inset-x-0 top-(--header-height) border-b",
        className,
      )}
    >
      <div
        data-progress-fill
        className="bg-foreground/40 h-px w-full origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
