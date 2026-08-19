"use client";

import { gsap } from "gsap";
import { type ReactNode } from "react";

import { motion } from "@/design-system/motion";
import { cn } from "@/lib/cn";

import { revealStart } from "./presets";
import { useReducedMotion } from "./use-reduced-motion";
import { useScopedGsap } from "./use-scoped-gsap";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
  once?: boolean;
}

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = motion.values.reveal.stagger,
  y = motion.values.reveal.y,
  duration = motion.values.duration.slow,
  start = revealStart,
  once = true,
}: StaggerProps) {
  const reduced = useReducedMotion();
  const scope = useScopedGsap(
    (ctx, scopeRef) => {
      if (reduced || !scopeRef.current) {
        return;
      }
      const items = gsap.utils.toArray<HTMLElement>(scopeRef.current.children);
      if (items.length === 0) {
        return;
      }
      
      // Set initial state
      gsap.set(items, { autoAlpha: 0, y });
      
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: motion.values.ease.emphasized,
        scrollTrigger: {
          trigger: scopeRef.current,
          start,
          once,
          invalidateOnRefresh: true,
        },
      });
    },
    [reduced, delay, stagger, y, duration, start, once],
  );

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  );
}
