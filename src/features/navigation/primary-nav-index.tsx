"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

import { primaryNavLinks } from "@/content/navigation";
import { motion } from "@/design-system/motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/motion";

export interface PrimaryNavIndexProps {
  /** `display` — large numbered index (menu + landing). `compact` — quiet reference list (footer). */
  variant?: "display" | "compact";
  /** Called on link activation (e.g. close the menu). */
  onNavigate?: () => void;
  /** Optional callback fired when hovering a primary nav link with its index (0-5) or null on leave. */
  onHoverItem?: (index: number | null) => void;
  className?: string;
}

function isActivePath(pathname: string, path: string): boolean {
  if (path === "/") {
    return pathname === "/";
  }
  return pathname.split("/")[1] === path.split("/")[1];
}

export function PrimaryNavIndex({
  variant = "display",
  onNavigate,
  onHoverItem,
  className,
}: PrimaryNavIndexProps) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLUListElement | null>(null);

  // Restrained hover for the display variant only: title nudge, index micro-move,
  // neighbors dim. Skipped entirely for reduced motion. The compact (footer) variant
  // relies on CSS transitions only.
  useLayoutEffect(() => {
    if (variant !== "display" || reduced) {
      return;
    }
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const durationBase = motion.values.duration.base;
    const easeStandard = motion.values.ease.standard;

    const context = gsap.context(() => {
      const links = Array.from(root.querySelectorAll<HTMLElement>("[data-nav-index-link]"));

      const focus = (link: HTMLElement, entering: boolean) => {
        const title = link.querySelector<HTMLElement>("[data-nav-index-title]");
        const number = link.querySelector<HTMLElement>("[data-nav-index-number]");
        if (title) {
          gsap.to(title, {
            x: entering ? 6 : 0,
            duration: durationBase,
            ease: easeStandard,
            overwrite: "auto",
          });
        }
        if (number) {
          gsap.to(number, {
            x: entering ? -4 : 0,
            duration: durationBase,
            ease: easeStandard,
            overwrite: "auto",
          });
        }
        links.forEach((other) => {
          if (other === link) {
            return;
          }
          gsap.to(other, {
            opacity: entering ? 0.45 : 1,
            duration: durationBase,
            ease: easeStandard,
            overwrite: "auto",
          });
        });
      };

      links.forEach((link, idx) => {
        const onEnter = () => {
          focus(link, true);
          onHoverItem?.(idx);
        };
        const onLeave = () => {
          focus(link, false);
          onHoverItem?.(null);
        };
        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);
        link.addEventListener("focusin", onEnter);
        link.addEventListener("focusout", onLeave);
      });
    }, root);

    return () => context.revert();
  }, [variant, reduced, onHoverItem]);

  const display = variant === "display";

  return (
    <ul
      ref={rootRef}
      className={cn(display ? "gap-sm flex flex-col" : "gap-xs flex flex-col", className)}
    >
      {primaryNavLinks.map((link, index) => {
        const isActive = isActivePath(pathname, link.path);
        return (
          <li key={link.path} data-nav-index-item>
            <Link
              href={link.path}
              {...(onNavigate ? { onClick: () => onNavigate() } : {})}
              data-nav-index-link
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative inline-flex min-h-(--touch-target) items-center transition-colors",
                display ? "gap-md" : "gap-sm",
                isActive ? "text-foreground font-semibold" : "text-foreground/60 hover:text-foreground",
              )}
            >
              <span
                data-nav-index-number
                className={cn(
                  "font-mono text-xs tabular-nums",
                  isActive ? "text-foreground font-semibold" : "text-foreground/40 group-hover:text-foreground/60",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                data-nav-index-title
                className={cn(
                  "font-medium tracking-tight",
                  display ? "text-2xl md:text-3xl" : "text-sm",
                )}
              >
                {link.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
