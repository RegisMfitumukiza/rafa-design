"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/motion";

/**
 * ProjectReadingProgress
 *
 * A 1px architectural progress indicator fixed at the top of the viewport.
 * Fills from left to right as the reader scrolls through the project monograph.
 * Respects prefers-reduced-motion.
 */
export function ProjectReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(scrolled / total, 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
      className="bg-accent fixed top-0 right-0 left-0 z-[200] h-px transition-transform duration-75 will-change-transform"
    />
  );
}
