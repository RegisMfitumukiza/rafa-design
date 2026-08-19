"use client";

import { gsap } from "gsap";
import { type ReactNode } from "react";

import { motion } from "@/design-system/motion";
import { cn } from "@/lib/cn";

import { revealStart } from "./presets";
import { useReducedMotion } from "./use-reduced-motion";
import { useScopedGsap } from "./use-scoped-gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
  once?: boolean;
  mount?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = motion.values.reveal.y,
  duration = motion.values.duration.slow,
  start = revealStart,
  once = true,
  mount = false,
}: RevealProps) {
  const reduced = useReducedMotion();
  const scope = useScopedGsap(
    (ctx, scopeRef) => {
      if (reduced || !scopeRef.current) {
        return;
      }
      
      // Set initial state
      gsap.set(scopeRef.current, { autoAlpha: 0, y });
      
      const tweenVars: gsap.TweenVars = {
        autoAlpha: 1,
        y: 0,
        duration,
        delay,
        ease: motion.values.ease.emphasized,
      };
      if (!mount) {
        tweenVars.scrollTrigger = {
          trigger: scopeRef.current,
          start,
          once,
          invalidateOnRefresh: true,
        };
      }
      gsap.to(scopeRef.current, tweenVars);
    },
    [reduced, delay, y, duration, start, once, mount],
  );

  return (
    <div ref={scope} className={cn("w-full", className)}>
      {children}
    </div>
  );
}
