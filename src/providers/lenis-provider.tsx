"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

import { motion } from "@/design-system/motion";

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const lenisRef = useRef<Lenis | null>(null);

  // ── Create the Lenis instance once (or when toggling admin) ──────────────
  useEffect(() => {
    // Disable Lenis on Sanity Studio (/admin) to allow seamless native trackpad,
    // two-finger gesture, and mouse wheel scrolling across all nested Studio panes
    if (isAdmin) {
      return;
    }

    const lenis = new Lenis({
      duration: motion.values.duration.cinematic,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    // Automatically refresh ScrollTrigger positions when images/content expand page height
    let resizeTimer: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });

    if (typeof document !== "undefined" && document.body) {
      resizeObserver.observe(document.body);
    }

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      lenisRef.current = null;
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      window.removeEventListener("load", handleLoad);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [isAdmin]);

  // ── On every client-side route change: reset scroll + refresh triggers ───
  // Without this, the old Lenis scroll position bleeds into the new page,
  // leaving ScrollTrigger in a stale/pinned state that blocks scrolling.
  useEffect(() => {
    if (isAdmin) return;

    const lenis = lenisRef.current;
    if (!lenis) return;

    // Jump to top immediately (no smooth animation) so the new page starts clean
    lenis.scrollTo(0, { immediate: true });

    // Allow one frame for the new page's DOM to settle, then recalculate
    // all ScrollTrigger positions against the new page height
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname, isAdmin]);

  return <>{children}</>;
}
