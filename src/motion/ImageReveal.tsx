"use client";

import { gsap } from "gsap";
import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

import { imageReveal, revealStart } from "./presets";
import { useReducedMotion } from "./use-reduced-motion";
import { useScopedGsap } from "./use-scoped-gsap";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  start?: string;
  once?: boolean;
  /** Skip the clip-path reveal — the image stays fully visible from the
   *  first frame. Use for hero/above-the-fold images so the LCP element paints
   *  immediately without waiting for GSAP/ScrollTrigger. */
  visible?: boolean;
}

export function ImageReveal({
  children,
  className,
  start = revealStart,
  once = true,
  visible = false,
}: ImageRevealProps) {
  const reduced = useReducedMotion();
  const scope = useScopedGsap(
    (_, scopeRef) => {
      if (visible || reduced || !scopeRef.current) {
        return;
      }
      const image = gsap.utils.toArray<HTMLElement>("img", scopeRef.current)[0];
      gsap.from(scopeRef.current, {
        clipPath: imageReveal.clipPath,
        duration: imageReveal.duration,
        ease: imageReveal.ease,
        scrollTrigger: {
          trigger: scopeRef.current,
          start,
          once,
          invalidateOnRefresh: true,
        },
      });
      if (image) {
        gsap.from(image, {
          scale: imageReveal.scale,
          duration: imageReveal.duration,
          ease: imageReveal.ease,
          scrollTrigger: {
            trigger: scopeRef.current,
            start,
            once,
            invalidateOnRefresh: true,
          },
        });
      }
    },
    [reduced, start, once],
  );

  return (
    <div ref={scope} className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}
