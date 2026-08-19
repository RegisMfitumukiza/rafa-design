# Known Issues

> This document tracks all known issues, technical debt, unfinished work, and planned improvements.
>
> It serves as the project's living backlog.
>
> Unlike the Implementation Tracker, this document focuses on problems rather than completed work.
>
> Issues should only be removed once they have been resolved.
>
> When an issue is fixed:
>
> - remove it from this document
> - update the Implementation Tracker
> - add the fix to the Release Notes
> - record it in the Changelog if it affects a released version

---

# Priority Levels

Use the following priorities.

🔴 Critical
Must be resolved before production.

🟠 High
Should be resolved before release.

🟡 Medium
Can be completed during polishing.

🟢 Low
Future enhancement.

---

# Critical

None — the critical homepage issue was resolved 2026-08-01 (root `src/app/page.tsx` deleted; `/` renders the real homepage).

---

# High

None — all image references now resolve to real files. 32 deterministic placeholder JPEGs were generated into `public/images/**` (2026-08-01) at every path referenced by `src/content/**`, so no `<Image>` renders the fallback box anymore. Obtaining the client's actual photography remains a content deliverable (see Notes below), not a code defect.

---

# Medium

- **`/studio` horizontal scroll at exactly 768px (resize scenario, 2026-08-10):** resizing the viewport down to 768px causes a ~23px horizontal document scroll (`scrollW 776 > clientW 753`). A fresh load at 768px is clean (`scrollW == clientW`). Root cause is the interplay between the GSAP-parallax-scaled hero image (its laid-out box bleeds beyond its `overflow-hidden` wrapper) and the vertical-scrollbar width change on resize — the exact element whose box extends to the scroll boundary is not an offender in the fresh-load case. The fullscreen menu overlay itself is clean at every width. Fix candidates (untested): measure the hero image wrapper against `clientWidth` on resize, or give the containing `main`/`body` `overflow-x: clip`.

None — the full medium backlog (12 items) was resolved in the 2026-08-01 technical-debt resolution session:

- Reduced-motion guard no longer paints late (`useReducedMotion` uses `useSyncExternalStore`; first render reads the media query synchronously).
- Stagger values default to the motion token; only explicit overrides remain.
- `ScrollTrigger.refresh()` now fires after image load, on route change, and after Lenis init.
- Lenis provider drives from `gsap.ticker`, destroys on unmount, sources tuning from motion tokens; dead `useLenis` removed.
- Content copy extracted to `src/content/` (`ui`, `pages`, `footer`, `home`); homepage journal previews link to real article slugs.
- Shared primitives extracted: `Grid`, `FilterChips`, `Field`, `StatePanel`, `useDialog`; homepage previews reuse `ProjectCard` / `JournalCard`.
- Nested `<Link><Button>` in `contact-cta` replaced with a button-styled link.
- Systematic accessibility pass per `docs/22-accessibility.md` (skip link, focus traps, Tabs/Accordion/Carousel ARIA, mobile menu, `aria-pressed` filters, form alerts, office-map role, contrast).
- Broken/no-op CSS utilities implemented (`scrollbar-hide`, `transition-grid`, `animate-in`, `fade-in`).
- Dead code and empty scaffold directories removed.
- Route/navigation config drift synced (`home` active, `not-found.tsx` added, prefix-matched nav active state).
- Content model inconsistencies unified (shared `SocialLink`, `Location`, content barrel, garbled copy fixed).

---

# Low

None — all three low-priority items were resolved in the 2026-08-01 backlog-completion session:

- Design-token duplication: dead `motion.durations` / `motion.easing` exports removed from `src/design-system/motion.ts` (all consumers use `motion.values`); breakpoint systems unified behind `--breakpoint-tablet` / `--breakpoint-desktop` (see ADR-021 — media queries must use literals).
- Hardcoded values: `aspect-[21/9]` → `aspect-hero`, `aspect-[16/9]` → `aspect-landscape`, `aspect-[4/3]` → `aspect-standard`, `aspect-[3/4]` → `aspect-portrait`, `h-16` → `h-(--header-height)`, `min-h-[6rem]` → `min-h-(--spacing-3xl)`, `hover:-translate-y-1` → `hover:-translate-y-(--micro-lift)`, `scale-[1.04]` → `scale-(--micro-scale)`, and the `#f5f1e8` literal in `layout.tsx` now sources from `src/config/theme.ts`.
- Dark mode implemented: `.dark` class palette in `tokens.css`, `html.dark { color-scheme: dark; }`, inline pre-hydration script + `suppressHydrationWarning`, `ThemeProvider` + `useTheme`, Header Sun/Moon toggle, `viewport.themeColor` for both schemes (ADR-020).

---

# Notes

- **Real photography pending:** the generated placeholders are intentional stand-ins for client-provided media. When the studio delivers photographs, place files at the existing paths in `public/images/**` and regenerate with `npm run generate:images` (the script skips existing files). The generator lives at `scripts/generate-placeholder-images.mjs` and derives its file list from `src/content/**`.
- **Media queries can't use CSS custom properties:** `@media (width >= var(--breakpoint-desktop))` is invalid CSS and breaks the build. Media conditions use literal `48rem` / `64rem` with a comment naming the token (ADR-021).

---

# Review Checklist

During every development session, verify:

- Have any new issues been introduced?
- Have resolved issues been removed?
- Has the Implementation Tracker been updated?
- Have Release Notes been updated?
- Has the Changelog been updated (if applicable)?

---

# Definition of Done

An issue is considered resolved when:

✓ The root cause has been fixed.

✓ The solution has been tested.

✓ Documentation has been updated.

✓ No regression has been introduced.

✓ The issue has been removed from this document.

---

# Goal

The objective is to maintain a transparent and continuously updated view of the project's health.

This document should always reflect the current state of the platform and help guide development priorities.
