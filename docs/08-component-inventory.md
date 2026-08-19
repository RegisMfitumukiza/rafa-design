# 08 — Component Inventory

> Source of Truth
>
> This document defines every reusable component that exists in the project.
>
> Before creating a new component, check this inventory first.
>
> Duplicate components must never be created.

---

# Philosophy

The website is built from a finite collection of reusable components.

Pages are assembled.

Components are not reinvented.

Whenever possible, existing components should be reused.

---

# Navigation

## Header

✅ Implemented (2026-08-03, refined 2026-08-12) — `src/components/layout/Header.tsx`. Minimal fixed header: image `<Logo />` + Theme Toggle + Menu button on every non-landing route (docs/06 full-philosophy). `SiteShell` (2026-08-11) hides the Header on `/`, where the Studio Index landing is the page itself. Menu button carries `aria-expanded`/`aria-haspopup="dialog"` + `aria-controls="site-navigation"`; labels come from `ui.navigation`. No horizontal link bar — the fullscreen navigation is the only primary menu. (2026-08-12) Hides on downward scroll and reveals on upward scroll via GSAP (reduced-motion aware) and renders the shared image logo (`public/logo/rafa-bg-black.png`, `invert dark:invert-0`).

---

## Logo

Brand identity — renders the transparent image logo `public/logo/rafa-bg-black.png` (`invert dark:invert-0`) in the Header, FullscreenNavigation, Landing (top bar + cover), and Footer (2026-08-12). `imgClassName?: string` sizes the mark per surface (default `h-12`; the landing cover uses `h-[clamp(4rem,12vh,12rem)]`). Server component; `min-h-(--touch-target)` hit area.

---

## Fullscreen Navigation

✅ Implemented (2026-08-03, rebuilt 2026-08-10, rebuilt 2026-08-11, refined 2026-08-12) — `src/features/navigation/fullscreen-navigation.tsx`. The primary navigation on every breakpoint (docs/06). Rendered by `NavigationProvider`; returns `null` when closed. Full directory composition: sticky top bar (image `<Logo />` + `ThemeToggle` + CLOSE, `aria-controls="site-navigation"`), then three columns on the 12-col grid — GENERAL (numbered 01–06 primary rail via `PrimaryNavIndex variant="display"`, 44px `--touch-target` items, `aria-current="page"`), DISCIPLINES (the six services, `getServices()` → `/services/[slug]`), PRACTICE (`supportingNavLinks`) — with mono 10px overlines, plus a full-width bottom row holding `MenuSearch` and an email + phone (`tel:`) + capitalized social row (wraps on narrow widths). Uses `useDialog` (focus trap, Escape, scroll lock, focus restore), `inert` on the background while open, staged GSAP open/close (overlay → bar → primary stagger → search → social, faster reversed close), `data-lenis-prevent` for native menu scrolling, reduced-motion aware (instant show/hide). (2026-08-11) Rebuilt from the Studio Index composition back into a directory: the giant brand field, `Image`, and `[data-nav-logo]` were removed and the Disciplines column restored — services are directly reachable from the menu again. (2026-08-12) Sticky `<Logo />` replaces the text brand, the primary rail is the shared `PrimaryNavIndex`, the dead backdrop blur was removed, and the per-item hover logic moved into `PrimaryNavIndex`.

---

## Primary Nav Index

✅ Implemented (2026-08-12) — `src/features/navigation/primary-nav-index.tsx`. Shared numbered 01–06 primary index deduplicating the FullscreenNavigation + Landing (`variant="display"`, `text-2xl md:text-3xl`) and the Footer (`variant="compact"`, quiet `text-sm`). `aria-current="page"` (first-segment match → accent index + hairline underline); restrained GSAP hover/focus nudges (title `x: 6`, number `x: -4`, neighbors → 0.45) gated by `useReducedMotion`; `onNavigate` callback closes the menu on link activation.

---

## Menu Search

✅ Implemented (2026-08-03) — `src/features/navigation/menu-search.tsx`. Lightweight static client-side search over projects, services, and journal articles (`search-index.ts`), placed in the fullscreen navigation and reused in the footer brand column. Editorial underline input, labeled results links, live region for results/no-results.

---

## Navigation Provider

✅ Implemented (2026-08-03) — `src/features/navigation/navigation-provider.tsx` + `navigation-context.ts`. Owns `isMenuOpen`, closes the menu on route change, wraps the page in `inert` while open, mounts `FullscreenNavigation`. Exposes `useNavigation()`.

---

## Navigation Indicator

Active page indicator. Handled inside `PrimaryNavIndex` via `isActivePath` (first-segment match) + `aria-current="page"` (accent index + hairline underline).

---

## Theme Toggle

✅ Implemented (2026-08-10) — `src/components/ui/ThemeToggle.tsx`. Shared client component consuming `useTheme`; Sun/Moon icon, `aria-label` from `ui.theme.light` / `ui.theme.dark`, `--touch-target` hit area. Used by the `Header` and the fullscreen navigation bar (docs/01 ADR-020 dark mode).

---

## Language Switcher

Future support.

---

# Landing

## Studio Index Landing

✅ Implemented (2026-08-11, reworked 2026-08-12) — `src/features/landing/landing.tsx`. The homepage (`src/app/(site)/page.tsx` renders `<Landing />`). A pure viewport-filling cover with no header, footer, or search on the route. Image-logo top bar (brand + `ThemeToggle`, `h-(--header-height)`) plus a cover composition: the brand mark (`<Logo imgClassName="h-[clamp(4rem,12vh,12rem)] w-auto" />`, `invert dark:invert-0`) is absolutely centered top (`lg:top-xl lg:left-1/2 lg:-translate-x-1/2`), and the `flex-1` bottom wrapper flips to `lg:flex-row lg:items-end`, pinning the numbered 01–06 primary rail (`PrimaryNavIndex variant="display"` under an `INDEX` mono overline) bottom-left and the email + capitalized social row (filters `url !== "#"`, `flex-wrap`) bottom-right. Below `lg` the three stack in normal flow: logo → index → socials. GSAP staged reveal (reduced-motion aware) in bar → logo → index stagger → social order, keyed to `[data-landing-bar]/[data-landing-logo]/[data-landing-index]/[data-landing-social]`; hover/focus nudges live in `PrimaryNavIndex`. `SiteShell` hides the `Header` and the `Footer` and drops header padding on this route.

---

## Site Shell

✅ Implemented (2026-08-11) — `src/components/layout/SiteShell.tsx`. Client wrapper around `Header` + `Footer` + `PageContainer` in `src/app/(site)/layout.tsx`. Uses `usePathname()` to hide the `Header` and the `Footer` on `/` and passes `unpadded` to `PageContainer` so the landing has no header-height offset. The fullscreen menu (incl. `FullscreenNavigation`) stays available on every other route via `NavigationProvider`.

---

# Projects

## Featured Project

Large editorial project.

---

## Project Card

Standard project preview.

---

## Project Grid

Responsive layout.

---

## Project Filter

Category filtering.

---

## Project Gallery

Image gallery.

---

## Project Metadata

Location

Year

Category

Area

---

## Project Navigation

Next

Previous

---

# Studio

## Studio Introduction

Manifesto hero — overline, display `h1` (`TextReveal`), manifesto `h3`, introduction body, hero image with caption/credit row.

Implemented (2026-08-07) — `src/features/studio/studio-introduction.tsx`.

---

## Beliefs

Industrial principles index — `PRINCIPLE 01…` mono codes, hairline divided list.

Implemented (2026-08-07) — `src/features/studio/beliefs.tsx`.

---

## Team Grid

People.

Implemented (2026-08-07) — `src/features/studio/team-grid.tsx`.

---

## Team Member

Individual profile — experience counter, discipline micro-tags, design interests, filtered social anchors.

Implemented (2026-08-07) — `src/features/studio/team-member-card.tsx`.

---

## Awards

Recognition — year-leading index with project reference and citation.

Implemented (2026-08-07) — `src/features/studio/awards.tsx`.

---

## History

Studio narrative.

Implemented (2026-08-07) — `src/features/studio/history.tsx`.

---

## Partners

Clients & collaborators — sector index (`SECTOR 01…`) with project references and client note.

Implemented (2026-08-07) — `src/features/studio/partners.tsx`.

---

## Timeline

Studio history — narrative intro + dot timeline.

Implemented (2026-08-07) — `src/features/studio/timeline.tsx`.

---

## Working Methods

Industrial 4-col specification grid — `METHOD 01…` codes, hairline dividers, hover tint.

Implemented (2026-08-07) — `src/features/studio/working-methods.tsx`.

---

## Visit Studio

Dispatch panel — office/phone/email/visits ledger, industrial CTA.

Implemented (2026-08-07) — `src/features/studio/visit-studio.tsx`.

---

# Services

## Discipline Index

Implemented (2026-08-13) — `src/features/services/discipline-index.tsx`. Client component. Editorial, ruled index of the practice's disciplines (rows "01"–"06"). Each row is a full-width `Link` (mono index · display title `text-3xl md:text-4xl` · one-line description · revealed arrow) in a `border-y divide-y` hairline list; rows reveal with an incremental `Reveal` delay. Hover is disciplined: title nudge (`translate-x-2`), arrow reveal, accent hairline extending from the left, and a faint background tint. A quiet project preview (`lg` only, sticky under the fixed header) shows the discipline's most recent project hero where evidence exists (`getProjectBySlug(relatedProjects[0])`), else a muted placeholder with the discipline label; it is mouse-only (state-driven via `onMouseEnter`/`onFocus`) and hidden below `lg` and under `prefers-reduced-motion` (global). `previewProject` loads only the active image — no stacked preloaded layers.

## Discipline Approach

Implemented (2026-08-13) — `src/features/services/discipline-approach.tsx`. Server component. The four numbered methodological points (`service.approach`, "01"–"04") rendered as a ruled editorial list (`Stagger`), layout `[2] number · [4] title · [6] statement` per row. Used on the discipline detail pages.

## Selected Work

Implemented (2026-08-13) — `src/features/services/selected-work.tsx`. Server component. Project evidence for a discipline (`getProjectBySlug` over `relatedProjects`) as a ruled list of rows — small `aspect-standard` image, title, and `Location · Year · Typology` mono metadata (`project.location.city/country`, `project.year`, `project.typology`) — each row a link to `/projects/[slug]`. When a discipline lists no public evidence (Urban Design, Consulting) a quiet "No project evidence listed" empty state is shown instead. The section is omitted entirely via its guard in the page — this component always renders its own header.

## Discipline Related

Implemented (2026-08-13) — `src/features/services/discipline-related.tsx`. Server component. Disciplines that share project evidence with the current one (`getRelatedServicesForService`, strongest first) as a ruled index of links ("01 / title / description / arrow"). Returns `null` when there is no shared evidence, keeping the section restrained for disciplines without project overlap.

## Discipline CTA

Implemented (2026-08-13) — `src/features/services/discipline-cta.tsx`. Server component. Editorial closing call-to-action — overline, display heading, body, and a bordered "Start a project →" button linking to the existing `/contact` route. Defaults to `pageContent.services.cta`; accepts an optional `content` override (used by `/process` with `pageContent.process.cta`). No new contact system is introduced.

> Removed 2026-08-13: `ServiceCard` / `ServicesGrid` (the bordered 3-card grid) — superseded by `DisciplineIndex`. Their `titleAs` heading-level concern no longer applies; search consumption (`search-index.ts`) reads the same `Service` content fields (`shortDescription`, `description`).

## Process Timeline

Implemented (2026-08-14) — `src/features/process/process-timeline.tsx`. Server component. The methodology (`getProcessSteps()`) rendered as a ruled editorial index — a hairline-bordered (`border-y divide-y`) column of phases, each row staggered into view (`Stagger`, stagger 0.06). Supersedes the original vertical "numbered circles + connector" timeline. Used on `/process`. Accepts `steps`, `titleAs` (default `h3`; `/process` passes `h2`), `className`.

## Process Step

Implemented (2026-08-14) — `src/features/process/process-step.tsx`. Client component (uses `ImageReveal`). A single phase as a ruled editorial row — layout `[2] number · [4] title · [6] description` (mono padded index, display title, faint description). When the phase carries a `visual`, it renders as a full-width editorial evidence plate beneath the row (`ImageReveal`, 16:9, mono caption `"01 — …"`). No circles, no connectors, no arrow affordance (rows are not links — the content model defines no project associations for phases). Accepts `step`, `index`, `titleAs` (default `h3`), `className`.

## Process Progress

Implemented (2026-08-14) — `src/features/process/process-progress.tsx`. Client component. A quiet reading-progress hairline pinned beneath the site header (`fixed`, `top-(--header-height)`), scrubbed via ScrollTrigger across the methodology section (`targetId`). Decorative only — `aria-hidden`, `pointer-events-none`; under `prefers-reduced-motion` the line stays collapsed to zero width (same DOM rendered for hydration). Accepts `targetId`, `className`.

# Journal

## Featured Article

Highlighted story.

---

## Journal Grid

Article collection.

---

## Journal Card

Preview.

---

## Category Filter

Categories.

---

## Newsletter

Subscription.

---

# Contact

## Contact Information

Office information.

---

## Contact Form

Inquiry form.

---

## Office Map

Interactive map.

---

## Social Links

Studio profiles.

---

# Careers

## Position Card

Open role.

---

## Benefits

Employee benefits.

---

## Application Form

Application workflow.

---

# Shared Components

## Section Header

Reusable heading block.

---

## Section Intro

Introductory text.

---

## Divider

Visual separation.

---

## CTA Banner

Call to action.

---

## Statistics

Numerical highlights.

---

## Quote

Editorial quotation.

---

## Marquee

Scrolling content.

---

## Badge

Small labels.

---

## Tags

Project categorization.

---

## Breadcrumb

Navigation hierarchy.

---

## Pagination

Navigation between pages.

---

## Footer

✅ Implemented (2026-08-10, refined 2026-08-12) — `src/components/layout/Footer.tsx`. Client component; quiet counterpart to the fullscreen menu (docs/06 one-IA doctrine). Rendered by `SiteShell` (moved out of `src/app/(site)/layout.tsx` on 2026-08-11) and hidden on `/`. Single-column stack below `lg`, then a directory grid (brand column + `GENERAL` (`PrimaryNavIndex variant="compact"`) + `DISCIPLINES` (`getServices()` → `/services/[slug]`) + `PRACTICE` (`supportingNavLinks` + email + phone `tel:`)). Brand column carries the image `<Logo />`, tagline (`max-w-[20rem]`), locations joined " • ", and a hairline `MenuSearch` layer. Mono 10px overlines on every column. Sub-footer wraps on mobile (© year + rights, social links, Back to top ↑) — every footer link has a `min-h-(--touch-target)` hit area (2026-08-12); the Privacy Policy link was removed (route `/privacy` is `planned`, 404 today).

---

# Media Components

## Image

Standard image wrapper.

---

## Responsive Image

Adaptive images.

---

## Video

Local or streamed media.

---

## Lightbox

Image viewer.

---

## Carousel

Horizontal gallery.

---

# Feedback

## Loading

Loading state.

---

## Skeleton

Content placeholder.

---

## Empty State

No content.

---

## Error State

Failure UI.

---

## Success State

Confirmation.

---

# Motion Components

## Fade

---

## Reveal

---

## Slide

---

## Stagger

---

## Parallax

---

## Scale

---

## Marquee Motion

---

## Text Reveal

---

## Image Reveal

---

## Hover Effects

---

## Cursor Motion

---

# Layout Components

## Page Container

✅ Implemented — `src/components/layout/PageContainer.tsx`. `min-h-screen` wrapper used by `SiteShell`; gained an `unpadded` prop (2026-08-11) that drops `pt-(--header-height)` for the landing route.

---

## Content Container

---

## Editorial Container

---

## Grid

---

## Stack

---

## Cluster

---

## Split Layout

---

## Sidebar Layout

---

## Masonry Layout

---

# Shared Primitives

Actual implemented primitives (see `docs/25-implementation-tracker.md` Phase 4 for the full component list).

## Grid

Responsive grid wrapper (1/2/3 columns) used by `ProjectGrid`, `JournalGrid`, and `ServicesGrid`.

---

## FilterChips

Shared pill filter with an "All" option (`ui.filters.all`), `aria-pressed` active state, and URL-based category syncing. Used by `ProjectFilter` and `CategoryFilter`.

---

## Field

Label + control + error wrapper shared by `Input` and `Textarea` (`aria-invalid`, `aria-describedby`, `role="alert"` errors).

---

## StatePanel

Shared icon/title/message/children layout used by `EmptyState`, `ErrorState` (alert), and `SuccessState` (polite live region).

---

## useDialog

Shared overlay logic for `Modal`, `Dialog`, and `Drawer`: Escape-to-close, body scroll lock, focus trap, focus restore, `aria-modal` + `aria-labelledby`.

---

# Component Creation Checklist

Before creating a new component ask

- Does this already exist?
- Can an existing component be extended?
- Does it follow the Design System?
- Is it reusable?
- Is it responsive?
- Is it accessible?
- Is it animation-ready?
- Does it avoid duplication?

If the answer to any question is **No**, revise the component before implementation.

---

# Final Rule

The Component Inventory is the definitive catalog of reusable UI.

No component should exist outside this inventory without first updating this document.
