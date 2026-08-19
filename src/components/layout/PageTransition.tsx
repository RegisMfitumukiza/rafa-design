"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { type ReactNode, useLayoutEffect, useRef } from "react";

import { motion } from "@/design-system/motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/motion";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const scope = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const element = scope.current;
    if (!element) {
      return;
    }
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: motion.values.duration.slow,
          ease: motion.values.ease.standard,
          clearProps: "opacity,visibility",
          onComplete: () => ScrollTrigger.refresh(),
        },
      );
    }, element);
    return () => ctx.revert();
  }, [pathname, reduced]);

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  );
}
