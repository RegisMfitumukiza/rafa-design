"use client";

import { gsap } from "gsap";
import { createElement, type HTMLElementType } from "react";

import { motion } from "@/design-system/motion";
import { cn } from "@/lib/cn";

import { useReducedMotion } from "./use-reduced-motion";
import { useScopedGsap } from "./use-scoped-gsap";

type TextRevealTag = HTMLElementType;

interface TextRevealProps {
  text: string;
  className?: string;
  as?: TextRevealTag;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  once?: boolean;
}

export function TextReveal({
  text,
  className,
  as: Tag = "div",
  delay = 0,
  stagger = motion.values.reveal.stagger,
  duration = motion.values.duration.slow,
  start,
  once = true,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const scope = useScopedGsap(
    (_, scopeRef) => {
      if (reduced || !scopeRef.current) {
        return;
      }
      const words = gsap.utils.toArray<HTMLElement>("[data-text-word]", scopeRef.current);
      if (words.length === 0) {
        return;
      }
      const tweenVars: gsap.TweenVars = {
        yPercent: 100,
        duration,
        delay,
        stagger,
        ease: motion.values.ease.emphasized,
      };
      if (start !== undefined) {
        tweenVars.scrollTrigger = {
          trigger: scopeRef.current,
          start,
          once,
        };
      }
      gsap.from(words, tweenVars);
    },
    [reduced, delay, stagger, duration, start, once],
  );

  const words = text.split(" ");

  return createElement(
    Tag,
    { ref: scope, className: cn(className) },
    words.map((word, index) => (
      <span key={`${word}-${index}`} className="inline-block overflow-hidden align-top">
        <span data-text-word className="inline-block will-change-transform">
          {word}
        </span>
      </span>
    )),
  );
}
