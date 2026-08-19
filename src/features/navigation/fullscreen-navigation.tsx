"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useEffect, useRef, useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useDialog } from "@/components/ui/useDialog";
import { contactInformation } from "@/content/company/contact";
import { supportingNavLinks } from "@/content/navigation";
import { getServices } from "@/content/services";
import { ui } from "@/content/ui";
import { motion } from "@/design-system/motion";
import { capitalize } from "@/lib/capitalize";
import { useStudioTime } from "@/lib/studio-time";
import { useReducedMotion } from "@/motion";

import { MenuSearch } from "./menu-search";
import { useNavigation } from "./navigation-context";
import { PrimaryNavIndex } from "./primary-nav-index";

const ambientPreviews = [
  "/images/projects/casa-monte-hero.jpg",
  "/images/projects/atelier-norte-hero.jpg",
  "/images/projects/villa-marim-hero.jpg",
  "/images/projects/baia-house-hero.jpg",
  "/images/projects/largo-gallery-hero.jpg",
  "/images/projects/casa-monte-01.jpg",
];

export function FullscreenNavigation() {
  const { isMenuOpen, closeMenu } = useNavigation();
  const reduced = useReducedMotion();
  const [isPresent, setPresent] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const { formatted: studioTimeFormatted } = useStudioTime();

  const { panelRef, dialogProps } = useDialog({
    open: isMenuOpen && isPresent,
    onClose: closeMenu,
    fallbackLabel: ui.navigation.menu,
  });

  useEffect(() => {
    if (!isMenuOpen) {
      // Reset hover state when menu closes
      setHoveredIndex(null);
      return;
    }
    queueMicrotask(() => setPresent(true));
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    if (!isPresent) {
      return;
    }
    const root = rootRef.current;
    if (!root) {
      return;
    }

    if (reduced) {
      if (!isMenuOpen) {
        queueMicrotask(() => setPresent(false));
      }
      return;
    }

    const context = gsap.context(() => {
      const overlay = root;
      const bar = root.querySelector<HTMLElement>("[data-nav-bar]");
      const primary = root.querySelectorAll<HTMLElement>("[data-nav-label], [data-nav-index-item]");
      const search = root.querySelector<HTMLElement>("[data-nav-search]");
      const directory = root.querySelectorAll<HTMLElement>("[data-nav-dir-col]");
      const durationFast = motion.values.duration.fast;
      const durationBase = motion.values.duration.base;
      const easeStandard = motion.values.ease.standard;
      const easeEmphasized = motion.values.ease.emphasized;

      if (isMenuOpen) {
        const timeline = gsap.timeline({ defaults: { ease: easeEmphasized } });
        timeline
          .fromTo(
            overlay,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: durationFast, ease: easeStandard },
          )
          .fromTo(
            bar,
            { autoAlpha: 0, y: -12 },
            { autoAlpha: 1, y: 0, duration: durationBase },
            "-=0.08",
          )
          .fromTo(
            primary,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: durationBase, stagger: 0.04 },
            "<0.05",
          )
          .fromTo(
            search,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: durationBase },
            "<0.1",
          )
          .fromTo(
            directory,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: durationBase, stagger: 0.04 },
            "<0.05",
          );
      } else {
        const timeline = gsap.timeline({ defaults: { ease: easeStandard } });
        timeline
          .to(directory, { autoAlpha: 0, y: 8, duration: durationFast, stagger: 0.02 }, "<")
          .to(search, { autoAlpha: 0, y: 8, duration: durationFast }, "<")
          .to(primary, { autoAlpha: 0, y: 12, duration: durationFast, stagger: 0.02 }, "<")
          .to(bar, { autoAlpha: 0, duration: durationFast }, "<")
          .to(overlay, { autoAlpha: 0, duration: durationBase, ease: easeStandard })
          .eventCallback("onComplete", () => setPresent(false));
      }
    }, root);

    return () => context.revert();
  }, [isPresent, isMenuOpen, reduced]);

  if (!isPresent) {
    return null;
  }

  const socialLinks = contactInformation.socialLinks.filter((link) => link.url !== "#");
  const services = getServices();
  const phoneHref = contactInformation.phone
    ? `tel:${contactInformation.phone.replace(/\s+/g, "")}`
    : null;

  const currentPreviewSrc =
    hoveredIndex !== null && ambientPreviews[hoveredIndex]
      ? ambientPreviews[hoveredIndex]
      : null;

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        panelRef.current = node;
      }}
      {...dialogProps}
      id="site-navigation"
      data-nav-overlay
      data-lenis-prevent
      tabIndex={-1}
      className="bg-background scrollbar-hide z-overlay fixed inset-0 overflow-y-auto"
    >
      {/* Ambient Background Media Preview Layer */}
      {currentPreviewSrc && !reduced && isMenuOpen && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-700 opacity-15 dark:opacity-20"
        >
          <Image
            src={currentPreviewSrc}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover filter grayscale contrast-125 scale-105 transition-transform duration-1000"
          />
        </div>
      )}

      {/* Top Bar — sticky */}
      <div
        data-nav-bar
        className="border-border/40 container-standard z-modal bg-background/90 backdrop-blur-md sticky top-0 flex h-(--header-height) items-center justify-between border-b"
      >
        <Logo />

        {/* Center — Studio Local Time & Coordinates */}
        <div
          aria-hidden="true"
          className="hidden md:flex items-center gap-xs font-mono text-[10px] tracking-[0.2em] text-foreground/40 uppercase select-none"
        >
          <span>PORTO · LISBON</span>
          <span className="text-foreground/20">|</span>
          <span className="tabular-nums">{studioTimeFormatted}</span>
        </div>

        <div className="gap-sm md:gap-md flex items-center">
          <ThemeToggle />
          <button
            type="button"
            onClick={closeMenu}
            aria-label={ui.navigation.closeMenu}
            aria-controls="site-navigation"
            className="group z-modal text-foreground/80 hover:text-foreground gap-xs px-xs flex min-h-(--touch-target) min-w-(--touch-target) items-center text-xs font-mono tracking-widest uppercase transition-colors"
          >
            <span className="relative flex flex-col justify-between h-2.5 w-4 overflow-hidden" aria-hidden="true">
              <span className="h-0.5 w-full bg-accent translate-y-[4px] rotate-45 transition-all duration-300" />
              <span className="h-0.5 w-full bg-accent -translate-y-[4px] -rotate-45 transition-all duration-300" />
            </span>
            <span>CLOSE</span>
          </button>
        </div>
      </div>

      {/* Navigation Editorial Architecture */}
      <div className="container-standard relative z-10 pt-xl pb-xl md:pt-2xl md:pb-2xl">
        <div className="flex flex-col gap-xl max-w-5xl">
          
          {/* TIER 1: Primary Index */}
          <nav aria-label={ui.navigation.general} className="flex flex-col">
            <p
              data-nav-label
              className="text-foreground/40 mb-md font-mono text-[10px] tracking-[0.25em] uppercase"
            >
              {ui.navigation.general}
            </p>
            <PrimaryNavIndex
              variant="display"
              onNavigate={closeMenu}
              onHoverItem={setHoveredIndex}
            />
          </nav>

          {/* TIER 2: Search Bridge */}
          <div data-nav-search className="pt-sm pb-xs my-xs">
            <MenuSearch ref={searchRef} />
          </div>

          {/* TIER 3: Directory Architecture (3 Balanced Columns) */}
          <div className="grid gap-xl md:grid-cols-3 pt-xs">
            
            {/* Column 1 — Core Pages */}
            <div data-nav-dir-col className="flex flex-col">
              <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-[0.2em] uppercase">
                Directory
              </p>
              <ul className="gap-xs flex flex-col">
                {supportingNavLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      onClick={closeMenu}
                      className="text-foreground/60 hover:text-foreground inline-flex min-h-(--touch-target) items-center text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 — Disciplines & Services */}
            <div data-nav-dir-col className="flex flex-col">
              <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-[0.2em] uppercase">
                {ui.navigation.disciplines}
              </p>
              <ul className="gap-xs flex flex-col">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={closeMenu}
                      className="text-foreground/60 hover:text-foreground inline-flex min-h-(--touch-target) items-center text-sm transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Connect & Social */}
            <div data-nav-dir-col className="flex flex-col">
              <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-[0.2em] uppercase">
                {ui.navigation.menu} // Connect
              </p>
              <div className="gap-xs flex flex-col">
                <a
                  href={`mailto:${contactInformation.email}`}
                  className="text-foreground/70 hover:text-foreground inline-flex min-h-(--touch-target) items-center text-sm transition-colors font-medium"
                >
                  {contactInformation.email}
                </a>
                {phoneHref && (
                  <a
                    href={phoneHref}
                    className="text-foreground/60 hover:text-foreground inline-flex min-h-(--touch-target) items-center text-sm transition-colors"
                  >
                    {contactInformation.phone}
                  </a>
                )}
                <div className="gap-sm flex flex-wrap pt-xs">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      className="text-foreground/50 hover:text-foreground inline-flex min-h-(--touch-target) items-center text-xs font-mono tracking-widest uppercase transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {capitalize(link.platform)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
