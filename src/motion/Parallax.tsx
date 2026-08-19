"use client";

import { gsap } from "gsap";
import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

import { parallax } from "./presets";
import { useReducedMotion } from "./use-reduced-motion";
import { useScopedGsap } from "./use-scoped-gsap";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({ children, className, speed = parallax.speed }: ParallaxProps) {
  const reduced = useReducedMotion();
  const scope = useScopedGsap(
    (_, scopeRef) => {
      if (reduced || !scopeRef.current) {
        return;
      }
      const image = gsap.utils.toArray<HTMLElement>("img", scopeRef.current)[0];
      if (!image) {
        return;
      }
      gsap.set(image, { scale: parallax.scale });
      gsap.fromTo(
        image,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    [reduced, speed],
  );

  return (
    <div ref={scope} className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}
