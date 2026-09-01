"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ui } from "@/content/ui";
import { motion } from "@/design-system/motion";
import { useNavigation } from "@/features/navigation/navigation-context";
import { cn } from "@/lib/cn";
import { useStudioTime } from "@/lib/studio-time";
import { useReducedMotion } from "@/motion";

import { Logo } from "./Logo";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { isMenuOpen, toggleMenu } = useNavigation();
  const headerRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { formatted: studioTimeFormatted } = useStudioTime();

  // Hide on scroll down, reveal on scroll up — orientation without permanent presence.
  useLayoutEffect(() => {
    if (reduced) {
      return;
    }
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const height = header.offsetHeight;
    let lastY = window.scrollY;
    let raf = 0;

    const onScroll = () => {
      if (raf) {
        return;
      }
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const delta = y - lastY;
        lastY = y;
        gsap.to(header, {
          y: y > height && delta > 0 ? -height : 0,
          duration: motion.values.duration.base,
          ease: motion.values.ease.standard,
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, [reduced]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "z-header border-border/40 bg-background/80 fixed inset-x-0 top-0 border-b backdrop-blur-md transition-colors",
        className,
      )}
    >
      <div className="container-standard flex h-(--header-height) items-center justify-between">
        <Logo />

        {/* Center — Studio Local Time Anchor */}
        <div
          aria-hidden="true"
          className="gap-xs text-foreground/40 hidden items-center font-mono text-[10px] tracking-[0.2em] uppercase select-none md:flex"
        >
          <span>KIGALI</span>
          <span className="text-foreground/20">|</span>
          <span className="tabular-nums">{studioTimeFormatted}</span>
        </div>

        <div className="gap-sm md:gap-md flex items-center">
          <ThemeToggle />

          {/* Morphing Architectural Line Trigger */}
          <button
            type="button"
            onClick={toggleMenu}
            className="group z-modal text-foreground/80 hover:text-foreground gap-xs px-xs flex min-h-(--touch-target) min-w-(--touch-target) items-center font-mono text-xs tracking-widest uppercase transition-colors"
            aria-label={isMenuOpen ? ui.navigation.closeMenu : ui.navigation.openMenu}
            aria-expanded={isMenuOpen}
            aria-haspopup="dialog"
            aria-controls="site-navigation"
          >
            {/* Architectural Line Icon */}
            <span
              className="relative flex h-2.5 w-4 flex-col justify-between overflow-hidden"
              aria-hidden="true"
            >
              <span
                className={cn(
                  "h-0.5 w-full origin-center transform transition-all duration-300",
                  isMenuOpen
                    ? "bg-accent translate-y-[4px] rotate-45"
                    : "bg-foreground/60 group-hover:bg-foreground",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-full origin-center transform transition-all duration-300",
                  isMenuOpen
                    ? "bg-accent -translate-y-[4px] -rotate-45"
                    : "bg-foreground/60 group-hover:bg-foreground",
                )}
              />
            </span>

            <span>{isMenuOpen ? "CLOSE" : "MENU"}</span>

            {/* Keyboard hint indicator on desktop */}
            <span
              aria-hidden="true"
              className="ml-xs text-foreground/30 border-border/40 hidden rounded-xs border px-1 py-0.5 font-mono text-[9px] lg:inline-block"
            >
              /
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
