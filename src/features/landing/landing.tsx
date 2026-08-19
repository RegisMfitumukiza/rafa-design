"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/config/site";
import { contactInformation } from "@/content/company/contact";
import { ui } from "@/content/ui";
import { motion } from "@/design-system/motion";
import { PrimaryNavIndex } from "@/features/navigation/primary-nav-index";
import { capitalize } from "@/lib/capitalize";
import { useReducedMotion } from "@/motion";

import { LandingSocialStrip } from "./LandingSocialStrip";

export function Landing() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const durationBase = motion.values.duration.base;
    const durationSlow = motion.values.duration.slow;
    const durationCinematic = motion.values.duration.cinematic;
    const easeEmphasized = motion.values.ease.emphasized;

    const context = gsap.context(() => {
      const bar = root.querySelector<HTMLElement>("[data-landing-bar]");
      const divider = root.querySelector<HTMLElement>("[data-landing-divider]");
      const logo = root.querySelector<HTMLElement>("[data-landing-logo]");
      const primary = root.querySelectorAll<HTMLElement>(
        "[data-landing-label], [data-nav-index-item]",
      );
      const socialMobile = root.querySelector<HTMLElement>("[data-landing-social-mobile]");

      const tl = gsap.timeline({ defaults: { ease: easeEmphasized } });
      tl.fromTo(bar, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: durationBase })
        .fromTo(
          divider,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: durationSlow },
          "<0.1",
        )
        .fromTo(
          logo,
          { autoAlpha: 0, scale: 0.94 },
          { autoAlpha: 1, scale: 1, duration: durationCinematic },
          "<0.05",
        )
        .fromTo(
          primary,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: durationBase, stagger: 0.05 },
          "-=0.3",
        )
        .fromTo(
          socialMobile,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: durationBase },
          "<0.1",
        );
    }, root);

    return () => context.revert();
  }, [reduced]);

  const socialLinks = contactInformation.socialLinks.filter((link) => link.url !== "#");

  return (
    <div ref={rootRef} className="relative flex min-h-svh flex-col">
      {/* Top Bar — logotype wordmark + theme toggle */}
      <div
        data-landing-bar
        className="container-standard flex h-(--header-height) items-center justify-between"
      >
        <Link
          href="/"
          aria-label="RAFA Design Hub — Home"
          className="inline-flex min-h-(--touch-target) items-center gap-[0.4em] transition-opacity select-none hover:opacity-70"
        >
          <span className="text-foreground font-sans text-xs font-semibold tracking-[0.22em] uppercase">
            RAFA
          </span>
          <span className="bg-foreground/30 h-3 w-px" aria-hidden="true" />
          <span className="text-foreground/70 font-sans text-xs font-light tracking-[0.22em] uppercase">
            DESIGN HUB
          </span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Editorial divider */}
      <div data-landing-divider className="border-border/30 border-t" aria-hidden="true" />

      {/* Cover Composition — fills remaining viewport */}
      <div className="container-standard relative flex flex-1 flex-col">
        {/* Hero Logo
            Mobile / Tablet : in document flow, top-padded, sizes off viewport height
            Desktop (lg+)   : lifted out of flow, absolutely centered in full container */}
        <div
          data-landing-logo
          className="pt-xl flex justify-center lg:pointer-events-none lg:absolute lg:inset-0 lg:items-center lg:justify-center lg:pt-0"
        >
          {/*
            We render <Image> directly here (NOT the <Logo> wrapper component) because
            <Logo> has h-12 hardcoded for its compact header use-case. Here we need
            full control of the hero sizing across all breakpoints.
          */}
          <Image
            src="/logo/rafa-bg-black.png"
            alt={siteConfig.name}
            width={2325}
            height={2159}
            priority
            className="h-[clamp(8rem,26vh,20rem)] w-auto object-contain invert md:h-[clamp(10rem,30vh,26rem)] lg:h-[clamp(26rem,62vh,68rem)] dark:invert-0"
          />
        </div>

        {/* Bottom Section — nav + mobile social row */}
        <div className="pb-lg lg:pb-xl relative z-10 mt-auto flex flex-col">
          {/* Primary nav */}
          <nav aria-label={ui.navigation.menu} className="flex flex-col">
            <p
              data-landing-label
              className="text-foreground/35 mb-sm lg:mb-md font-mono text-[9px] tracking-[0.3em] uppercase"
            >
              {ui.navigation.menu}
            </p>
            <PrimaryNavIndex variant="display" />
          </nav>

          {/*
            Social links — visible on mobile & tablet only.
            On desktop these live in the right-side <LandingSocialStrip />.
            Shown as a simple flat row: accessible, light, consistent with the rest of the
            landing typography.
          */}
          <div
            data-landing-social-mobile
            className="mt-lg gap-md flex flex-wrap items-center lg:hidden"
            aria-label="Social links"
          >
            <a
              href={`mailto:${contactInformation.email}`}
              className="text-foreground/45 hover:text-foreground inline-flex min-h-(--touch-target) items-center font-mono text-[9px] tracking-[0.25em] uppercase transition-colors"
            >
              Email
            </a>
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/45 hover:text-foreground inline-flex min-h-(--touch-target) items-center font-mono text-[9px] tracking-[0.25em] uppercase transition-colors"
              >
                {capitalize(link.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop-only animated right-side social strip */}
      <LandingSocialStrip />
    </div>
  );
}
