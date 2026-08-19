"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

import { contactInformation } from "@/content/company/contact";
import { motion } from "@/design-system/motion";
import { capitalize } from "@/lib/capitalize";
import { useReducedMotion } from "@/motion";

export function LandingSocialStrip() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLElement[]>([]);

  const socialLinks = contactInformation.socialLinks.filter((link) => link.url !== "#");

  useLayoutEffect(() => {
    if (reduced) return;

    const container = containerRef.current;
    if (!container) return;

    const links = linksRef.current.filter(Boolean);

    const durationBase = motion.values.duration.base;
    const durationFast = motion.values.duration.fast;
    const easeEmphasized = motion.values.ease.emphasized;
    const easeStandard = motion.values.ease.standard;

    // Set initial hidden state
    gsap.set(links, { autoAlpha: 0, x: 20 });

    const context = gsap.context(() => {
      const onEnter = () => {
        gsap.to(links, {
          autoAlpha: 1,
          x: 0,
          duration: durationBase,
          ease: easeEmphasized,
          stagger: 0.05,
          overwrite: "auto",
        });
      };

      const onLeave = () => {
        gsap.to(links, {
          autoAlpha: 0,
          x: 16,
          duration: durationFast,
          ease: easeStandard,
          stagger: { each: 0.03, from: "end" },
          overwrite: "auto",
        });
      };

      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);

      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
      };
    }, container);

    return () => context.revert();
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      data-landing-social
      aria-label="Social links"
      className="fixed top-1/2 right-0 z-10 hidden -translate-y-1/2 cursor-default flex-col items-end gap-0 lg:flex"
    >
      {/* Hover trigger zone — thin visible strip */}
      <div className="group flex flex-col items-end">
        {/* Vertical label — always visible hint */}
        <span
          aria-hidden="true"
          className="text-foreground/50 hover:text-foreground/80 mb-4 block rotate-180 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 select-none"
          style={{ writingMode: "vertical-rl" }}
        >
          Follow
        </span>

        {/* Social links — animated in/out */}
        <div className="gap-xs pr-sm flex flex-col items-end">
          <a
            ref={(el) => {
              if (el) linksRef.current[0] = el;
            }}
            href={`mailto:${contactInformation.email}`}
            className="text-foreground/60 hover:text-foreground inline-flex min-h-(--touch-target) items-center py-1 pr-1 text-[10px] tracking-widest uppercase transition-colors"
          >
            {contactInformation.email}
          </a>

          {socialLinks.map((link, index) => (
            <a
              key={link.platform}
              ref={(el) => {
                if (el) linksRef.current[index + 1] = el;
              }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground inline-flex min-h-(--touch-target) items-center py-1 pr-1 text-[10px] tracking-widest uppercase transition-colors"
            >
              {capitalize(link.platform)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
