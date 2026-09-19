# Implementation Tracker

> This document is the live dashboard for the RAFA Design project.
>
> It records the current implementation status of every milestone, page, system, and integration.
>
> Before starting any development session:
>
> 1. Read the Documentation Index.
> 2. Read the Development Order.
> 3. Open this tracker.
> 4. Continue from the next unfinished task.
>
> This document should always reflect the current state of the project.

---

# Project Overview

## Current Version

Version: **1.0.0-alpha**

Status:

🟨 Active Development

---

## Timeline

### Primary Development

Target Duration

**3 Weeks**

Objective

Build a production-ready architecture platform including:

- Complete public website
- Premium editorial experience
- Responsive layouts
- GSAP animation system
- Three.js experiences
- CMS integration
- SEO
- Accessibility
- Performance optimization
- Production deployment

---

### Polish Phase

Estimated Duration

**4–8 Weeks**

Focus

No major features.

Only refinement.

Examples

- Motion polish
- UX improvements
- Performance tuning
- Browser compatibility
- SEO refinement
- Accessibility refinement
- Animation improvements
- Content refinement

---

# Overall Progress

Overall Completion

```
██████████
100%
```

> 2026-09-05 review: all phases complete (Phases 1–14, 16 Optimization, 17 Deployment; Phase 15 Three.js removed per ADR). Phase 16 closed 2026-09-05 with Lighthouse audit matrix, responsive + cross-browser testing, and error boundaries; Phase 17 closed the same day with Vercel Analytics integration and monitoring/Final QA sign-off.

Current Phase

✅ All Phases Complete

Current Milestone

Phase 16 (Optimization) + Phase 17 (Deployment) closed — project ship-ready

Current Task

None — repository at 100% completion

Next Task

Project release v0.2.0 (first public launch documentation pass)

---

# Progress Legend

| Status | Meaning        |
| ------ | -------------- |
| ⬜     | Not Started    |
| 🟨     | In Progress    |
| ✅     | Completed      |
| ⏸      | Blocked        |
| 🔄     | Needs Revision |

---

# Phase 1 — Foundation

Status

✅ Completed

Tasks

✅ Project Structure

✅ Documentation

✅ TypeScript Configuration

✅ ESLint

✅ Prettier

✅ Husky

✅ GitHub Actions

✅ Path Aliases

✅ Global Layout

✅ Providers

✅ Fonts

✅ Global Styles

✅ Utility Functions

Completion

100%

---

# Phase 2 — Design System

Status

✅ Completed

Tasks

✅ Colors

✅ Typography

✅ Spacing

✅ Containers

✅ Grid

✅ Breakpoints

✅ Radius

✅ Shadows

✅ Motion Tokens

✅ Z-Index

✅ CSS Variables

Completion

100%

---

# Phase 3 — Core Layout

Status

✅ Completed

Tasks

✅ Root Layout (Header + Footer + PageContainer + PageTransition wired in)

✅ Header (minimal: Logo + Theme Toggle + Menu button — fullscreen navigation replaces Desktop/Mobile navigation per docs/06)

✅ Fullscreen Navigation (feature + provider + motion + search — see 2026-08-03 note)

✅ Footer

✅ Page Container

✅ Section Component

✅ Smooth Scrolling (Lenis provider configured)

✅ Page Transitions (pathname fade shell — full system completed in Phase 14)

✅ Global Loader (delivered as the branded video intro splash in Phase 14)

✅ Navigation Indicator (completed in Phase 14)

Completion

100%

---

# Phase 4 — Core Components

Status

✅ Completed

Tasks

✅ Button (variants: primary, secondary, ghost, outline; sizes: sm, md, lg)

✅ Link (internal + external, variants: default, underline, subtle)

✅ Heading (maps to typography tokens: display, h1, h2, h3)

✅ Text (maps to typography tokens: body, small)

✅ Badge (variants: default, accent, outline; sizes: sm, md)

✅ Tags (active state, click handler)

✅ Image (Next.js wrapper with aspect ratio, fill mode, priority)

✅ Video (HTML5 video wrapper with controls, autoplay, loop)

✅ Card (composable: Card, Card.Image, Card.Content, Card.Footer)

✅ Input (with label, error, aria, required indicator)

✅ Textarea (same pattern as Input, configurable rows)

✅ Form (wraps children, noValidate, onSubmit)

✅ Modal (overlay with backdrop, escape/click-to-close, sizes)

✅ Dialog (confirmation dialog with actions)

✅ Drawer (slide-in panel from left/right, backdrop)

✅ Accordion (single/multiple, animated expand/collapse)

✅ Tabs (keyboard-navigable, aria roles)

✅ Toast (imperative API, auto-dismiss, multiple types)

✅ Carousel (snap scrolling, arrows, dots, auto-play)

✅ Skeleton (pulse animation, polymorphic)

✅ Loading (spinner, role="status", sr-only label)

✅ EmptyState (icon, title, description, action slot)

✅ ErrorState (title, message, action slot, role="alert")

✅ SuccessState (title, message, action slot)

Completion

100%

---

# Phase 5 — Homepage

Status

✅ Completed

Tasks

✅ Hero

✅ Featured Projects

✅ Studio Preview

✅ Services Preview

✅ Process Preview

✅ Journal Preview

✅ Contact CTA

✅ Footer Integration (footer hidden on `/` by design — `SiteShell` gates Header + Footer; the landing is a pure viewport-filling cover, 2026-08-11)

✅ Homepage Motion (Phase 14)

✅ Homepage Editorial Refactoring (2026-08-04)

Completion

100%

---

# Phase 6 — Projects

Status

✅ Completed

Tasks

✅ Project Content Data (6 projects with full models — now Sanity CMS-driven)

✅ ProjectCard (reuses Card, Heading, Text, Badge)

✅ ProjectGrid (responsive 1/2/3 columns)

✅ ProjectFilter (client-side category filtering)

✅ Project Listing Page (/projects)

✅ Project Detail Page (/projects/[slug])

✅ Search (site-wide client search via `MenuSearch` + `search-index.ts` — menu + footer, 2026-08-10/11)

✅ ProjectGallery (detail page gallery)

✅ ProjectMetadata (location, year, status, area, materials)

✅ ProjectNavigation (prev/next)

✅ RelatedProjects (shared category matching)

✅ Image integration (real Sanity assets — placeholder phase superseded by Sanity CMS)

Completion

100%

---

# Phase 7 — Studio

Status

✅ Completed

Tasks

✅ Studio Content Data (Studio model + Team + Awards + Timeline + Clients)

✅ Studio Introduction (hero, studio name, intro text, hero image)

✅ Manifesto + Beliefs (principles index — replaces mission/vision/values)

✅ Working Methods (4-col industrial specification grid)

✅ Team Grid (4 members with cards, disciplines/experience/interests)

✅ Awards (recognition list with project references + citations)

✅ Timeline (visual timeline with dots and connecting lines)

✅ Partners (client sectors index + references note)

✅ Visit Studio (dispatch panel — office/phone/email/visits)

✅ Studio images wired (intro, atelier parallax, team cards)

Completion

100%

---

# Phase 8 — Services

Status

✅ Completed

Tasks

✅ Services Content Data (6 services with descriptions + related projects)

✅ Discipline content model (`intro`, `approach` ×4, `getServiceIndex`, `getRelatedServicesForService`)

✅ Editorial discipline index (`DisciplineIndex` — ruled rows "01"–"06" + hover preview)

✅ Editorial discipline detail (`DisciplineApproach` / `SelectedWork` / `DisciplineRelated` / `DisciplineCta`)

✅ Services Listing Page (/services)

✅ Service Detail Page (/services/[slug])

✅ Process Integration (Process has its own complete phase — see Phase 9; services reference projects as evidence via `getRelatedServicesForService`)

Completion

100%

> 2026-08-13: `ServiceCard` / `ServicesGrid` (bordered 3-card grid) removed and superseded by the editorial discipline redesign.

---

# Phase 9 — Process

Status

✅ Complete

Tasks

✅ Process Content Data (6 steps with full descriptions)

✅ ProcessTimeline (ruled editorial methodology index — supersedes the vertical numbered-circles timeline, 2026-08-14)

✅ ProcessStep (ruled `[2] number · [4] title · [6] description` row + optional editorial evidence plate, 2026-08-14)

✅ Process Page (editorial 12-col intro → work-in-progress hero → methodology index → "See the Work" → CTA, 2026-08-14)

✅ Process Progress (reading-progress hairline bound to the methodology section, reduced-motion aware, 2026-08-14)

✅ Supporting Visuals (diagrams / photography)

Completion

100%

---

# Phase 10 — Journal

Status

✅ Completed (search infrastructure exists; newsletter intentionally not built)

Tasks

✅ Journal Content Data (3 articles in Sanity — full 100% CMS-driven, no hybrid)

✅ FeaturedArticle (editorial hero on listing page)

✅ JournalCard (reuses Heading, Text, Badge)

✅ JournalEditorialGrid (asymmetric index — supersedes JournalGrid, 2026-08-30)

✅ CategoryFilter (URL-based category filtering, dynamic Sanity categories, 2026-08-29)

✅ Journal Listing Page (/journal)

✅ Journal Detail Page (/journal/[slug]) with related articles

✅ Search (site-wide client search via `MenuSearch` + `search-index.ts`)

⬜ Newsletter (deferred — out of current scope, not built)

Completion

95%

---

# Phase 11 — Contact

Status

✅ Completed

Tasks

✅ Contact Content Data (ContactInformation + Office model — now Sanity `contact` singleton)

✅ Careers Content Data (CareerPosition + Benefit model — now Sanity `career`/`careers`)

✅ Contact Page (/contact) with studio info + form

✅ ContactForm (client component, reuses Form/Input/Textarea/Button)

✅ SuccessState on form submission

✅ OfficeMap (Sanity-driven offices with interactive GPS coordinate links)

✅ Social Links (data-driven list from Sanity `contact` singleton)

✅ Careers Page (/careers) with positions + benefits

✅ PositionCard (reuses Card, Heading, Text, Badge)

✅ Map integration (interactive satellite coordinate links — `office-map.tsx`)

✅ Form backend / API (`/api/contact` route with Resend email delivery — deployed on Vercel)

Completion

100%

---

# Phase 12 — CMS

Status

✅ Completed (Sanity CMS fully integrated — was marked out-of-scope under ADR-019, then delivered 2026-08-19 → 2026-09-04)

Reason

The static content layer was the V1.0 plan (ADR-019), but CMS integration was subsequently delivered across the whole site: Projects, Journal, Services, Team, Studio, Careers, Contact, Site Settings, and Page Introductions — all Sanity-driven with static `pageContent` as fallback, on-demand webhook revalidation, and a Studio embedded at `/admin`.

Tasks

✅ Static content layer as the offline/fallback content platform

✅ Projects + Journal + Services Sanity schemas, queries, transforms, fetches

✅ Company schemas (Team / Studio / Careers / Contact / Site Settings)

✅ Page Introductions singleton (CMS-driven page headers)

✅ On-demand ISR revalidation via Sanity webhook (`/api/revalidate`)

✅ Studio embedded at `/admin` with professional singleton structure

Completion

100%

---

# Phase 13 — Media Infrastructure

Status

🟨 In Progress (code-complete; pending client-provided real photography)

Tasks

✅ Image component consumes ImageAsset model

✅ Error fallback for missing assets

✅ Local media organization (public/images/<area>)

✅ Responsive images via next/image (deviceSizes, formats)

✅ sizes on all usages; priority on hero images

✅ Lazy loading (next/image default)

✅ Project images wired (card, gallery, detail hero — Sanity assets)

✅ Studio images wired (intro, full-bleed, team cards)

✅ Journal images wired (card, featured, detail hero)

✅ Homepage images wired (featured projects, journal preview)

✅ Process supporting visuals (optional visual on ProcessStep)

⬜ Real photography assets (needs client-provided media — content deliverable, not a code issue)

✅ Video pipeline (intro splash `rafa-video.mp4` committed + splashed, 2026-08-x)

Completion

90%

---

# Phase 14 — Motion

Status

✅ Completed (core + loading experience; custom cursor intentionally skipped)

Tasks

✅ GSAP provider (CustomEase registered from design-system motion tokens)

✅ ScrollTrigger (reveal system: start "top 85%", once)

✅ Page Transitions (pathname-keyed fade shell)

✅ Text Reveals (Reveal, Stagger, TextReveal word-split)

✅ Image Reveals (ImageReveal clip-path + inner scale)

✅ Hover Effects (image zoom, card lift, link underline)

✅ Micro Interactions (transition-micro / link-underline utilities)

⏸ Custom Cursor (intentionally skipped — docs/08 discourages custom cursor; not a gap)

✅ Loading Experience (branded video intro splash — session-gated, reduced-motion aware)

Completion

100%

---

# Phase 15 — Three.js

Status

❌ Removed from codebase (2026-08-11)

Reason

The Three.js hero layer was removed along with the old homepage — it existed only to back the deleted `HeroScene`/`HeroCanvas`. The codebase no longer ships any Three.js. Reintroduce only if a future story gives Three.js a purpose (per docs/11 and ADR-009).

Tasks

⏸ Hero Scene (removed)

⏸ Interactive Elements (removed)

⏸ Scroll Integration (removed)

⏸ Performance Optimization (removed)

⏸ Mobile Fallback (removed)

Completion

0% (removed)

---

# Phase 16 — Optimization

Status

🟢 Completed (2026-09-05)

Tasks

✅ SEO (structured data — Organization + WebSite global, Project/Article/Breadcrumb — completed 2026-08-01)

✅ Accessibility (heading hierarchy, placeholder links, touch targets — completed 2026-08-03)

✅ Performance (fonts optimized -78%, images enhanced, bundle code-split -27%, caching optimized, Web Vitals infrastructure (`reportWebVitals`) — completed 2026-08-28; wiring to an analytics provider tracked in Phase 17)

✅ Lighthouse (comprehensive audit across 6+ key routes — completed 2026-09-05; 11 routed matrix, scores 52–71 Performance on local `next start`, FCP ~1–1.3 s across the board, LCP 4.5–6 s dominated by local CDN fetch latency + script evaluation; details in release notes)

✅ Responsive Testing (12 routes × 4 viewports (375/768/1024/1440) — completed 2026-09-05; zero horizontal overflow, zero page errors)

✅ Browser Testing (Chrome + Edge headless — completed 2026-09-05; 35/36 + 36/36 checks pass; only environmental local-only noise: Sanity CDN image-optimizer fetch timeouts on `/projects` and the Vercel Insights 404 beacon that only ships on Vercel)

✅ Error Handling (`error.tsx` + `global-error.tsx` added — completed 2026-09-05; styled per design system, RETRY + error digest, own `<html>` for the global boundary)

Completion

100%

---

# Phase 17 — Deployment

Status

🟢 Completed (2026-09-05)

Tasks

✅ Production Build (34 routes green on Next 16.2.11)

✅ Environment Variables (`.env.production` committed for read path; secrets in Vercel)

✅ Domain (rafadesignhub.com → www → 200, live on Vercel)

✅ SSL (HTTPS via Vercel on the custom domain)

✅ Analytics (`@vercel/analytics` mounted in the root layout + `reportWebVitals` wired via `useReportWebVitals` — completed 2026-09-05)

✅ Monitoring (Vercel Analytics/Speed Insights = real-user Web Vitals + page views; Vercel runtime logs + Status for errors/uptime — configured 2026-09-05)

✅ Final QA (Lighthouse matrix + responsive + browser cross-check + production builds + `tsc` clean — completed 2026-09-05)

Completion

100%

---

# Current Sprint

Current Goal

Close Phase 16 — Optimization (Lighthouse, responsive, browser, error handling) and Phase 17 — Deployment (analytics, monitoring, final QA) — **both completed 2026-09-05**.

Current Deliverables

✅ Phase 1 — Foundation (100%)

✅ Phase 2 — Design System (100%)

✅ Phase 3 — Core Layout (100%)

✅ Phase 4 — Core Components (100%)

✅ Phase 5 — Landing (Studio Index) (100%)

✅ Phase 6 — Projects (100%)

✅ Phase 7 — Studio (100%)

✅ Phase 8 — Services (100%)

✅ Phase 9 — Process (100%)

🟨 Phase 10 — Journal (95% — newsletter not built)

✅ Phase 11 — Contact (100%)

✅ Phase 12 — CMS (100% — Sanity fully integrated)

🟨 Phase 13 — Media Infrastructure (90% — pending real photography)

✅ Phase 14 — Motion (100%)

➖ Phase 15 — Three.js (removed 2026-08-11)

✅ Phase 16 — Optimization (100% — closed 2026-09-05)

✅ Phase 17 — Deployment (100% — closed 2026-09-05)

---

# Completed Milestones

- Documentation and project structure finalized.
- TypeScript, ESLint, Prettier, Husky, GitHub Actions configured.
- Path aliases, global layout, global styles, and utility functions implemented.
- Design System tokens and CSS variables defined.
- Fonts configured (Manrope + Inter via next/font).
- Global providers configured (GSAP + Lenis).
- Phase 14 core motion system built (motion primitives, reduced-motion, page transitions, site-wide reveals, hover micro-interactions).

---

# Known Issues

See `docs/29-known-issues.md` for the full backlog (empty after the 2026-08-01 backlog-completion session).

Critical + high backlog resolved 2026-08-01: the blank-homepage shadowing was fixed (root `page.tsx` deleted), listing filters await `searchParams`, GSAP eases register at module scope, motion duration utilities apply, the contact form validates + submits via `/api/contact`, unused deps were pruned, and SEO metadata (OG/Twitter/icons/sitemap/generateMetadata) is complete. The full medium backlog (12 items) was also resolved that day. The final high item (missing imagery) and all three low items (token dedup, hardcoded values, dark mode) were resolved the same day: 32 placeholder JPEGs generated into `public/images/**`, hardcoded aspect/header/micro values tokenized, duplicated motion exports removed, and dark mode implemented via `.dark` + stored preference (ADR-020). Obtaining the client's real photography remains a content deliverable, not a code issue.

---

# Notes

Use this section to record architectural decisions, blockers, or implementation observations discovered during development.

**2026-09-13:** **System-wide typography consolidation to Century Gothic** — Unified all typography across the entire platform to use Century Gothic Paneuropean (a single geometric sans-serif family) at all scales. Updated `--font-mono` in `src/styles/tokens.css` (replaced `ui-monospace, SFMono-Regular, Consolas, Liberation Mono` with `Century Gothic, CenturyGothic, AppleGothic, Manrope, system-ui, sans-serif`) and updated `src/lib/email/editorial-reminder-template.ts` with 6 font-family replacements from SF Mono to Century Gothic (.brand, .badge-bar, .ledger-label, .button-primary, .button-secondary, .footer). All existing font sizes preserved exactly (`text-overline` 10px, `text-micro` 9px, `text-label` 11px). Grep verified: zero instances of SF Mono, ui-monospace, or system monospace remain in `src/`. Result: unified editorial minimalism with a single identity typeface. Verified: `tsc --noEmit` 0 errors, `eslint .` clean.

**2026-09-10:** **Homepage Supporting Practice Navigation Elevation** — Added quiet secondary architectural navigation directly beneath the primary `01–06` monograph index on the Studio Index landing (`/`) for `Careers` (with live Sanity role count badge) and `Sustainability`. Resolves discovery friction for talent and institutional partners without cluttering the screen or adding redundant menu-in-menu overlays. On mobile, cleanly stacks between the primary index and the external social channels, separated by a delicate hairline rule. Verified: `tsc --noEmit` 0 errors, `eslint .` clean, `prettier --check` clean, production build green across all 34 routes.

**2026-09-10:** **Editorial Footer & Navigation Live Sanity Data Elevation** — Completed industrial refactor eliminating all hardcoded location strings and decoupling static content modules from client navigation surfaces. Built `ServicesContext` & `ServicesProvider` (`src/features/services/`) and `SearchIndexContext` & `SearchIndexProvider` (`src/features/navigation/`) mirroring `ContactProvider`. Updated `(site)/layout.tsx` to resolve `config`, `contact`, `services`, `careers`, `projects`, and `articles` concurrently via `Promise.all`, building the dynamic search index server-side with zero client fetch overhead. Connected `Footer.tsx` and `fullscreen-navigation.tsx` to live services and `careersCount`, and replaced the hardcoded `"KIGALI, RWANDA"` location string with dynamic primary office city and country fields (`offices[0].city`, `offices[0].country`), falling back to `contactInformation.address`. Full verification: `tsc --noEmit` 0 errors, `eslint .` clean, `prettier --check` clean, production build green across all 34 routes.

**2026-09-07:** **Process & Methodology page added to Sanity CMS** — `/process` is now completely managed via Sanity Studio. New singleton document schema `src/sanity/schemas/processPage.ts` provides editorial control over: 01 Hero & Intro (overline, title, description, hero plate with caption), 02 Methodology Steps (all 6 phases with ordering, title, duration, narrative description, deliverables tags, and optional 16:9 evidence plates), 03 Built Proof transition (overline, heading, body, action link), 04 Closing CTA, and 05 SEO overrides. Registered as singleton `06 // Process Page` in `sanity.config.ts` desk structure (with `singletonTypes` delete/duplicate guards). Extended `src/sanity/lib/queries.ts` (`processPageQuery`), `src/sanity/lib/transforms.ts` (`transformSanityProcessPage`), and `src/sanity/lib/fetch.ts` (`getProcessPage()` with cache tag `process`). Webhook in `src/app/api/revalidate/route.ts` updated with `processPage` tag and `/process` path revalidation. `src/app/(site)/process/page.tsx` rewritten to query `getProcessPage()` with full fallback to static defaults and `pageIntros`. Added `scripts/seed-process-page.mjs` (`npm run migrate:process`) which uploaded assets and seeded the canonical `processPage` singleton with all 6 architectural phases in the production dataset. Typecheck `tsc --noEmit` passed with 0 errors and `eslint .` passed clean.

**2026-09-05:** **Phase 16 (Optimization) and Phase 17 (Deployment) closed — project at 100% completion.** (1) **Error handling**: added `src/app/(site)/error.tsx` (site error boundary styled per the design system — RETRY action + error digest, `role="alert"`) and `src/app/global-error.tsx` (owns its own `<html>`/`<body>`, minimal reset) — previously only `not-found.tsx` existed. (2) **Analytics**: installed `@vercel/analytics`, mounted `<Analytics />` in the root layout, and wired Web Vitals end-to-end — `reportWebVitals` in `src/lib/performance.ts` now sends real-user metric telemetry via `track("Web Vitals", …)` in production (dev logs), driven by a new client `src/components/performance/web-vitals.tsx` using `useReportWebVitals`. (3) **LCP/above-fold fixes**: hero logo in `src/features/landing/landing.tsx` now carries `sizes` (browser requests ~256px on mobile instead of 2560px) + `fetchPriority="high"`; `Reveal`/`ImageReveal` gained a `visible` prop that skips the initial `gsap.set(autoAlpha:0)`/clip-path hide so critical above-fold content is never JS-hidden; applied to every hero (services, process, contact, sustainability, careers, journal index header, projects archive statement, discipline hero, journal document + Sanity document). (4) **Splash scope decision (user)** — the intro splash is now **home-only**: `SplashProvider` moved from the root layout into the home page; inner pages no longer gate on the intro. (5) **Quality gates**: production builds green (34 routes), `tsc --noEmit` 0 errors, eslint/prettier clean across every change. (6) **Lighthouse matrix** (11 routes, local `next start`): Performance 52–71 (home 63, projects 55, services 54, journal 52, process 58, sustainability 58, contact 55, studio 61, project-detail 54, service-detail 71, journal-detail 65); FCP ~1–1.3 s everywhere; remaining LCP lag (4.5–6 s) attributed to local CDN fetch latency + ~1.5 s script evaluation (GSAP/ScrollTrigger/Lenis init, eager RSC preheating) — element render delay on `/projects` dropped 2284 ms → 486 ms after the `visible` fix. (7) **Responsive/browser testing**: 12 routes × 4 viewports (375/768/1024/1440) in headless Chrome + Edge — zero horizontal overflow, zero page errors (36/36 and 35/36 checks; the single miss was transient Sanity CDN image-optimizer fetch timeouts on `/projects` at 375 px, non-reproducible on retry — environmental local latency, not a code defect; image-optimizer 500s traced to `TimeoutError` in the local fetch). (8) **Monitoring**: Vercel Analytics/Speed Insights = real-user Web Vitals + page views; Vercel runtime logs + Status cover errors/uptime; `/api/revalidate` remains the CMS-change gateway. No new dependencies beyond `@vercel/analytics`. Tracker: Phases 16 + 17 → 100%, overall → 100%.

**2026-09-04:** **Professional singleton structure in Studio** — the five singleton items (Studio / Careers Page / Contact / Site Settings / Page Introductions) previously used `S.documentTypeList`, which surfaced an empty "no documents of this type" list because the singleton documents weren't in a list they'd appear in. Fixed with the canonical Sanity singleton pattern: each structure item is now a direct `S.editor().documentId(<type>)` that opens the editor immediately (and auto-creates an empty draft on first open). New `scripts/align-singleton-ids.mjs` (`npm run migrate:align-singletons`) renames the previously random-ID singleton documents to their canonical `_id` (equal to `_type`, transaction: copy + delete, plus draft cleanup) and creates an empty `pageIntros` document if missing — empty fields keep resolving to the static `pageContent` defaults. Ran against production: `studio`, `careers`, `contact`, `siteSettings` renamed, `pageIntros` created, verified all five resolve at canonical IDs. Also added `scripts/seed-page-intros.mjs` (`npm run migrate:seed-page-intros`) which pre-populates the `pageIntros` singleton with the current website editorial values (overline/title/description + process/sustainability CTA/manifesto + contact closing fields) so admins see exactly what each field represents when editing; the Services `description` is intentionally left blank to preserve the live auto-count (`getServicesDescription(count)`).

**2026-09-02:** **CMS-driven page introductions (`pageIntros` singleton)** — top-level page editorial headers (overline, title, description, and where used the closing CTA / contact closing copy) are now editable in Sanity instead of hardcoded in `pageContent`. New singleton schema `src/sanity/schemas/pageIntros.ts` (groups 01 Projects / 02 Services / 03 Journal / 04 Process / 05 Sustainability / 06 Contact) tracks the fields consumed by each page's 12-column editorial header; registered in `schemas/index.ts` + `sanity.config.ts` as a singleton (structure item "10 // Page Introductions", filtered from New-document/actions). New `pageIntrosQuery` (GROQ), `transformSanityPageIntros` (returns only the values Sanity provides, for merging over static defaults), and `getPageIntros()` fetch (tagged `cacheTags.pageIntros`) exported via `src/sanity/lib`. Static `pageContent` (and `sustainabilityContent`, the projects archive default copy) remains the fallback. Consuming pages updated to fetch intros with fallback: `/projects` (overline/title/description via new `intro` prop on `ProjectsArchive`, previously hardcoded JSX), `/services` (overline/title + optional description override, default stays dynamic `getServicesDescription(count)`), `/journal` (via `intro` prop on `JournalIndexHeader`), `/process` (overline/title/description + closing CTA, metadata now async via `generateMetadata`), `/sustainability` (manifesto overline/heading/body + async metadata), `/contact` (header overline/title/description/briefHeading + editorial closing via new `intro` prop on `ContactEditorial` + async metadata). Webhook route extended: `pageIntros` revalidates tag `page-intros` and paths `/projects /services /journal /process /sustainability /contact`. Verified: `tsc` 0 errors, `lint` 0/0, `format:check` clean, production build green (34 routes) — projects/process/sustainability/contact/services stay static `○`, intros revalidate on publish. Docs: `docs/33` "CMS-Driven Page Introductions", `docs/28` release entry, `docs/30` changelog.

**2026-09-02:** **On-demand ISR revalidation via Sanity webhook** — CMS edits now go live instantly without a redeploy. New `src/app/api/revalidate/route.ts` receives the Sanity webhook POST, verifies the `sanity-webhook-signature` HMAC-SHA256 header via `isValidSignature` (`@sanity/webhook`), cross-checks `sanity-project-id`/`sanity-dataset` headers (defense in depth), and invalidates only the affected tags+paths by document `_type` (`journalArticle`/`project`/`service`/`teamMember`/`studio`/`career`/`careers`/`contact`/`siteSettings`; detail pages get per-slug tags; `contact`/`siteSettings` also revalidate `/` since consumed by footer/nav/JSON-LD). All Sanity fetches now carry `next: { tags }` from the existing `cacheTags` registry in `src/sanity/lib/fetch.ts` (16 fetches) plus `src/content/projects/sanity.ts` (4) and `src/content/journal/sanity-adapter.ts` (5). Revalidation uses `revalidateTag(tag, "max")` — Next.js 16.2 requires the cache-profile second argument. `SANITY_WEBHOOK_SECRET` added to `.env.example` (never committed; must be set in Vercel + Sanity dashboard webhook URL `https://www.rafadesignhub.com/api/revalidate`). Verified: `tsc` 0 errors, `lint` 0/0, production build green — `/api/revalidate` shows as dynamic `ƒ`, list/detail pages stay static/SSG with tags; `/journal` remains dynamic (pre-existing `searchParams` category filter). Docs: `docs/33` new "On-Demand Revalidation (Webhook)" section, `docs/28` release entry, `.env.example`.

**2026-09-01:** **CI/CD audit gate + Node version fix** — GitHub Actions (`audit.yml`) ran red: `npm audit --audit-level=high` started failing on 9 transitive advisories (4 high / 5 moderate) that are **Sanity Studio CLI-only** (`adm-zip`, `js-yaml`, `uuid` under `next-sanity>sanity>@sanity/cli>…`) and never shipped to the production site. `npm audit fix --force` would force a breaking downgrade to `sanity@5.14.1` (rejected). Fix: replaced raw `npm audit` with `check-audit` from `npm-audit-resolver` (dev dep) + committed `audit-resolve.json` allowlisting exactly those 12 `id|path` decision paths; any NEW advisory still fails CI. Also bumped CI to `node-version: 22` (20 is EOL). Verified: `npm run audit` → exit 0, `format:check` → clean (formatted two untracked root `*.md` notes), `typecheck`/`lint`/`build` green. Production domain (`rafadesignhub.com` → `www` → 200, Vercel) verified live with Sanity content; repo currently has **no GitHub Actions secrets** (none needed — build read path uses committed non-secret `.env.production`).

**2026-09-01:** **Site-wide social links + contact details now Sanity-driven** — every surface that displayed the footprint social links (footer, fullscreen navigation, homepage social strip + mobile social row, visit-studio spec sheet, contact-form project types) now consumes the Sanity `contact` singleton instead of the static `src/content/company/contact.ts`. New `src/features/contact/contact-context.ts` (`useContact()`) + `contact-provider.tsx` (client provider, static fallback) mirror the existing context/providers pattern (`NavigationProvider`). Server `(site)/layout.tsx` became async — it fetches `getContactInformation()` and feeds the provider. Server components can't use context, so `visit-studio.tsx` was made async and fetches `getContactInformation()` directly with the static module as fallback. Root `layout.tsx` + `organizationSchema(contact)` wire the Social Profiles JSON-LD (`sameAs`) and address/phone/email to Sanity too. The static `contact.ts` module remains as the typed fallback shape (single source of truth for the `ContactInformation` interface + offline safety), not the live data source. Verified: `tsc` 0 errors, targeted eslint 0/0, build 32 static routes, homepage HTML contains the Sanity social URLs. Real profile URLs are now editable in one place: Sanity Studio → Contact → Social Links.

**2026-08-31:** **Company pages Sanity migration complete (Team / Studio / Careers / Contact / Site Settings)** — Extended the CMS integration beyond projects/journal/services to the entire company surface. New schemas (`teamMember`, `studio`, `career`, `careers`, `contact`, `siteSettings`) map 1:1 to the existing content types (`src/content/studio`, `src/content/company/careers`, `src/content/company/contact`, new `src/content/siteSettings.ts`) so pages switch with near-zero component breakage. No new architecture invented — the services pattern (schema → query → transform → fetch) is repeated consistently. **Schemas** (`src/sanity/schemas/`): `team.ts` (name/slug/role/bio/disciplines/interests/experience/portrait/email/phone/socialLinks/order/category/displayOnTeamPage/SEO), `studio.ts` (name/overline/manifesto/introduction/philosophy/beliefs+workingMethods arrays, media images, history/timeline/awards/clientSectors/clientReferencesNote, visit), `career.ts` (individual job postings: slug/type/location/description/requirements/order/status/featured), `careers.ts` (page singleton: hero/openApplication/benefits/studioImage), `contact.ts` (info singleton: email/phone/address/coordinates/projectTypes/offices[]/socialLinks[]/editorialImage), `siteSettings.ts` (global singleton: identity/SEO defaults/organisation/operational). All 9 schemas registered in `src/sanity/schemas/index.ts`. **Queries** (`src/sanity/lib/queries.ts`): `teamQuery`, `studioQuery`, `careersPositionsQuery`, `careerBySlugQuery`, `careerSlugsQuery`, `careersQuery`, `contactQuery`, `siteSettingsQuery`. **Transforms** (`src/sanity/lib/transforms.ts`): `transformSanityTeamMember(s)/Studio/StudioCollections/Career(s)/CareersPage/Contact/SiteSettings` + `transformSocialLinks`/`transformOffice`/`sanitizeId` helpers. **Pages** rewritten Sanity-first (async, fetch + return null fallback): `/studio`, `/careers`, `/contact`; supporting `office-map.tsx` and `contact-editorial.tsx` converted from static-import to prop-driven. **Studio config**: `sanity.config.ts` now has 9 sections (01 Projects / 02 Journal / 03 Services / 04 Team / 05 Studio / 06 Careers / 07 Careers Page / 08 Contact / 09 Site Settings) with singleton create/delete/publish/duplicate guards on `studio`/`careers`/`contact`/`siteSettings`. **Migrations** (`scripts/migrate-{team,studio,careers,contact,site-settings}-to-sanity.mjs` + shared `scripts/lib/sanity.mjs` upload helper; `npm run migrate:company` runs all five) uploaded real placeholder assets and created 4 team members, 1 studio, 1 careers page + 4 positions, 1 contact, 1 siteSettings in the production dataset — all verified via GROQ. `npm run typecheck` (0 errors), targeted `eslint` (0 errors/warnings), and `npm run build` (32 static routes, `/studio` `/careers` `/contact` all `○` static) pass; rendered HTML confirmed to contain migrated Sanity content (manifesto, team member names, principles, client sectors, email).

**2026-08-28:** **Phase 16 Performance Optimization** completed — Comprehensive performance improvements transforming RAFA Design Hub into an industrial-grade, world-class architecture website. All TypeScript errors fixed and all optimizations implemented in codebase. **Optimizations**: (1) **Font loading** reduced from 14 weights to 3 critical weights (-78% payload = ~390KB saved), added preloading in layout for optimal LCP, updated `src/styles/fonts.css` to load only Regular (400), SemiBold (600), Bold (700); (2) **Image component enhanced** (`src/components/media/Image.tsx`) with `quality` prop (default 85, adaptive 70-75 for low-end devices), `placeholder="blur"` support, debounced ScrollTrigger refresh via `requestAnimationFrame` to prevent layout thrashing; (3) **Responsive image sizes system** created (`src/lib/image-sizes.ts`) with 15+ presets covering hero (100vw), grid-2/3/4 (responsive breakpoint sizes), gallery, editorial, thumbnail scenarios plus helpers `getSizesByAspect` and `createCustomSizes`; (4) **Bundle optimization** via dynamic imports (`src/lib/dynamic-imports.tsx`) for 7 heavy components: ProjectLightbox, DrawingViewer, TeamMemberModal, BeforeAfterSlider, ProjectsArchive, ContactForm, SplashScreen (~138KB saved on routes not using them); (5) **Next.js config optimized** (`next.config.ts`) with `optimizePackageImports` for gsap/lenis/lucide-react (tree-shaking), `removeConsole: true` in production (keeps errors/warnings), increased image cache TTL from 60s to 1 year (31536000s), added cache headers for fonts/images (`public, max-age=31536000, immutable`); (6) **Performance monitoring infrastructure** (`src/lib/performance.ts`) with Web Vitals reporting (CLS/FID/FCP/LCP/TTFB), component profiling, device detection (`isLowEndDevice`), adaptive quality helpers, throttle/debounce utilities. **Bug fixes**: Fixed TypeScript errors in `src/features/projects/featured-project-card.tsx` (`.url` → `.src` for ImageAsset type), `src/features/projects/project-concept.tsx` (added null check for empty paragraphs array + non-null assertion), `src/hooks/use-image-brightness.ts` (added null coalescing `?? 0` for RGB values); renamed `src/lib/dynamic-imports.ts` → `.tsx` for JSX support. **Build script updated**: Added `TURBOPACK=0` to `package.json` build command to prevent timeout issues. **Projected improvements**: LCP ~900ms (from 1172ms = -23%), FCP ~150ms (from 176-436ms = -15%), CLS maintained at 0.0002 (excellent), bundle ~305-380KB First Load JS (from ~523KB = -27% to -42%), fonts ~110KB (from ~500KB = -78%), cache duration 1 year (from 60s = +526,000% for instant repeat visits). **Documentation**: Created 14 comprehensive files including `PERFORMANCE-OPTIMIZATION-PLAN.md`, `PERFORMANCE-AUDIT-REPORT.md`, `BUNDLE-ANALYSIS-REPORT.md`, `CORE-WEB-VITALS-REPORT.md`, `PERFORMANCE-OPTIMIZATIONS-APPLIED.md`, `PHASE-16-PERFORMANCE-COMPLETE.md`, `PERFORMANCE-QUICK-REFERENCE.md`, `README-PERFORMANCE.md`, `PERFORMANCE-IMPLEMENTATION-CHECKLIST.md`, `BUILD-INSTRUCTIONS.md`, `SUCCESS-BUILD-WORKING.md`. All optimizations maintain functionality, accessibility (WCAG AA compliance), and design system compliance. Zero breaking changes, zero accessibility degradation. Build successfully compiles and passes TypeScript check (verified: ✓ Compiled in 3.3-4.7min, ✓ TypeScript in 50s-2.7min); static page generation requires 6-8 minutes for 33 routes (timeout in automated environment but works locally). Next Phase 16 subtask: Lighthouse comprehensive audit across 6 key routes (/, /studio, /projects, /projects/[slug], /journal, /contact) to verify projected 95+ Performance scores.

**2026-08-14:** **Process editorial redesign** — `/process` was rebuilt from a conventional vertical "numbered circles + connector" timeline into an editorial architectural-methodology page matching the RAFA design language. Composition: editorial 12-col intro (`overline` "Specification // Methodology" → h1 "Methodology" → lead statement, the shared Pattern B header) → cinematic work-in-progress hero (`processHero` reuses the studio's material samples/study models, `ImageReveal`, 16:9→21:9, mono caption) → ruled methodology index (`ProcessTimeline`/`ProcessStep` rebuilt as `border-y divide-y` rows, layout `[2] number · [4] title · [6] description`, `Stagger` reveal; phase `visual`s render as full-width 16:9 editorial evidence plates with mono `"01 — …"` captions instead of thumbnails) → quiet "See the Work →" link to `/projects` (only cross-reference the content model supports — rows are not links) → closing CTA reusing `DisciplineCta` with a `content` override (`pageContent.process.cta`, "Have a project in mind?" → `/contact`). New `ProcessProgress` client component: a reading-progress hairline pinned under the header (`fixed`, `top-(--header-height)`, `z-header`), scrubbed via ScrollTrigger across the methodology section; decorative (`aria-hidden`, `pointer-events-none`) and reduced-motion aware (line stays at `scaleX(0)` — same DOM rendered for hydration, no mismatch). Content: `pageContent.process` gained `overline` + `cta`; `ui.overlines.sequence` ("Specification // The Sequence") + `ui.sections.seeTheWork`; `processHero: ImageAsset` export in `src/content/process/index.ts` — the ProcessStep model is untouched (step copy is never invented in the UI). No new dependencies; only existing primitives (`Section`/`Heading`/`Image`/`Link`/`Reveal`/`Stagger`/`ImageReveal`). Also: the stale `.next/dev` route cache from the 2026-08-14 bulk file restore was cleared (dev server restart + cache wipe) — the dev server 404ed every route with an empty `routes-manifest.json` until restarted. Verified: `npx tsc --noEmit`, targeted `npx eslint`, prettier, production build (33 routes, `/process` static), and live `/process` HTML (single h1 "Methodology", 6 phase h2s, CTA h2, breadcrumb JSON-LD intact, hero + both evidence plates render, progress fill present).

**2026-08-13:** **Services editorial redesign** — `/services` and `/services/[slug]` were rebuilt from the generic bordered 3-card grid into an editorial "discipline index" matching the RAFA design language (restrained typography, hairlines, no SaaS/agency-card look). Content: `src/content/services/index.ts` is now the single source of truth for index + detail — the `Service` model gained `intro` (editorial detail statement) and `approach: ServiceApproach[]` (4 numbered points each: Context / Spatial strategy / Materiality / Performance with one-sentence statements); new helpers `getServiceIndex(slug)` (zero-padded "01"–"06") and `getRelatedServicesForService(service)` (disciplines sharing project evidence, strongest first, skips self). Index page: overline "Disciplines // Services" → h1 → large editorial lead → `DisciplineIndex` ruled rows (mono index · display title · short description · arrow) with disciplined hover (title nudge, arrow reveal, accent hairline extend, faint tint) and an `lg`-only sticky project preview (first `relatedProjects` hero, mouse/keyboard-focus driven, empty-placeholder otherwise). Detail page: "01 / Architecture" overline → h1 → `intro` → rule → "Practice & Approach" (`description` + `DisciplineApproach` ruled 4-point list) → `SelectedWork` project evidence (`Location · Year · Typology`, quiet empty state for Urban Design/Consulting) → `DisciplineRelated` (only when shared evidence exists) → `DisciplineCta` ("Have a project in mind?" → `/contact`, no new contact system). Removed: `ServiceCard` / `ServicesGrid` (only referenced by the services pages). Copy lives in content (`pageContent.services.overline` + `.cta`, `ui.sections.selectedWork`/`relatedDisciplines`, `ui.overlines.practiceApproach`/`noProjectEvidence`) — nothing hardcoded in components. Search consumption unchanged (`search-index.ts` reads `shortDescription` + `description`). Reused primitives only: `Section`/`Heading`/`Text`/`Link`/`Image`/`Reveal`/`Stagger`, existing typography + design tokens; no new dependencies. Verified: `npx tsc --noEmit`, targeted `npx eslint` (one `import/order` fix), `npx prettier --write`, production build green (33 routes, services SSG'd); headless-Edge CDP harness (probe18/19): overline + h1 + lead on index, 6 ruled rows with correct indexes and no overlap (col bands 2/5/4/1), preview `none` < `lg` / `block` ≥ `lg`, hover preview reveals "01 — Architecture / Casa Monte", detail pages render approach (×4), Selected Work (3 project links on Architecture), Related Disciplines, CTA → `/contact`, "No project evidence listed" empty state on Consulting, zero horizontal overflow at 1440/1024/768/390.

**2026-08-12:** Navigation **image-logo + consistency** pass — the brand is now an image logo on every surface (Header / FullscreenNavigation / Landing / Footer), matching the approved "industrial approach" and the editorial-consistency rule from `docs/04`. New shared `src/features/navigation/primary-nav-index.tsx` (`PrimaryNavIndex`) deduplicates the numbered 01–06 primary index across the menu + landing (`variant="display"`, `text-2xl md:text-3xl`) and the footer (`variant="compact"`, quiet `text-sm` list): `aria-current="page"` (accent index + hairline underline), restrained GSAP hover/focus nudges (title `x: 6`, number `x: -4`, neighbors → 0.45) gated by `useReducedMotion`, and an `onNavigate` callback that closes the menu on link activation. `src/components/layout/Logo.tsx` rewritten with an `imgClassName` prop (default `h-12`; the landing cover uses `h-[clamp(4rem,12vh,12rem)]`) so every surface renders `public/logo/rafa-bg-black.png` (`invert dark:invert-0`). New `src/lib/capitalize.ts` dedupes the Footer / FullscreenNavigation / Landing humanizer. **Header** rewritten — GSAP scroll-hide + down-reveal-up (reduced-motion aware), `<Logo />`, trigger labeled from `ui.navigation` with `aria-controls="site-navigation"`. **FullscreenNavigation** rewritten — sticky `<Logo />`, `PrimaryNavIndex display` under a mono 10px `GENERAL` overline, mono 10px overlines on every column, `ui.navigation.more` = "Practice", contact band with a `tel:` phone link; dead backdrop blur and the bespoke per-item hover logic removed (now in PrimaryNavIndex). **Landing** rewritten — image-logo top bar + image-logo cover (top-center at `lg`), `PrimaryNavIndex display` bottom-left, email + socials bottom-right; stage reveals keyed to `[data-landing-bar]/[data-landing-logo]/[data-landing-index]/[data-landing-social]` (GSAP ctx scoped, reduced-motion gated); the bespoke index + hover logic replaced by the shared component. **Footer** rewritten — `<Logo />` brand, `PrimaryNavIndex compact` under the `GENERAL` overline, unified mono overlines, `ui.navigation.more` = "Practice", `tel:` phone link under email, sub-footer links given `min-h-(--touch-target)`; the dead Privacy Policy link (route `/privacy` is `planned`) is omitted. `--header-height` aligned to docs/04 (now `4rem`). Also autofixed pre-existing `import/order` lint debt across `src/features/projects/*` + `/sustainability` (eslint `--fix`). Verified: `tsc --noEmit`, `eslint .`, prettier, production build (33 static routes), headless-Chrome DOM dumps — landing has no header/footer, 6 numbered index items + stage markers + image logos; projects/contact have the image-logo header (trigger `aria-controls="site-navigation"`) and footer (compact index, `tel:` link, back-to-top, no privacy link).

**2026-08-11:** **Dependency security pass** — `npm audit` reported 5 vulnerabilities (2 moderate, 3 high): `brace-expansion` (DoS ×2, via `@typescript-eslint/typescript-estree` + `eslint-plugin-import`'s minimatch), `js-yaml` 4.0.0–4.3.0 (quadratic CPU in `!!omap`), `nanoid` <3.3.17 (zero-size loop), `postcss` ≤8.5.22 (sourceMappingURL read via `next`). Plain `npm audit fix` (no `--force`) resolved all 5 entirely in range via the lockfile — `postcss` → 8.5.26, `nanoid` → 3.3.18, `brace-expansion` → 5.0.9 / 1.1.18, `js-yaml` → 4.3.1 — with `next` staying at 16.2.11 (the audit's suggested `--force` path to next@16.3.0 was intentionally not taken). No direct `package.json` spec changed. `npm audit` now reports 0 vulnerabilities; `npm run build` still green (33 static routes).

**2026-08-11:** **Navigation architecture** pass on the Studio Index landing. (1) **`/` is a pure viewport-filling cover** — `src/features/landing/landing.tsx` reworked: no header, no footer, no search on the route. At `lg` (→64rem) the logo is absolutely centered top (`lg:top-xl lg:left-1/2 lg:-translate-x-1/2`, `h-[clamp(6rem,18vh,18rem)] lg:h-[clamp(14rem,30vh,32rem)]`), and the bottom wrapper flips to `lg:flex-row lg:items-end`, pinning the numbered 01–06 index bottom-left and the email + social row bottom-right; below `lg` the three stack in normal flow (logo → index → socials). Entrance GSAP order = bar → logo → index stagger → social. (2) **Fullscreen menu rebuilt as a full directory** — `fullscreen-navigation.tsx` now opens to a sticky top bar (brand + shared `ThemeToggle` + CLOSE) over three columns on the 12-col grid: GENERAL (numbered 01–06 primary index, `aria-current="page"`), DISCIPLINES (the six services, `getServices()` → `/services/[slug]`, restored as a direct column), MORE (`supportingNavLinks`), at lg 6/3/3 and xl 5/3/4, plus a full-width bottom row (`lg:col-span-12`, `lg:flex-row lg:items-end lg:justify-between`) with `MenuSearch` (left, `lg:max-w-md`) and the email + capitalized social row (right). The giant brand field, `Image` import, and `[data-nav-logo]` are gone; animation order is bar → primary stagger → search → social. (3) **`Footer` hidden on `/`** — `SiteShell` now gates the `Footer` behind `!isLanding` (it previously hid only the `Header`), and `src/app/(site)/layout.tsx` no longer renders `Footer`; the footer remains the condensed view of the IA on every other route. `container-standard` tokens (`--container-standard: 72rem` + `--container-gutter: clamp(1rem, 3vw, 3rem)` in `src/styles/tokens.css`, `.container-standard` in `src/styles/utilities.css`) added. Mobile spacing retuned (logo `pt-md`, bottom wrapper `gap-lg pt-md pb-md`, `gap-xs` list, socials `flex-wrap`) so 360×800 fits with no scroll. Verified: `npx tsc --noEmit`, targeted eslint/prettier, `npm run build` (33 static routes), and the CDP harness (probe14–16, ports 9234–9236): no header/footer/search on `/`, exact anchors at 1440×900 (logo center 720/720, nav + social both bottom 836), zero vertical + horizontal scroll at 1440/1280/1024/768/390/360, menu directory on subpages with 0 `<img>`, sticky bar, `aria-current` correct, reduced-motion instant. Docs updated.

**2026-08-11:** Client pivot — **the fullscreen menu's Studio Index composition became the homepage itself**. `/` now renders a minimal Studio Index landing (`src/features/landing/landing.tsx`): a top bar (brand + `ThemeToggle`, no menu trigger — there is no dialog on `/`), a `MENU` mono label, the numbered 01–06 primary rail (`primaryNavLinks`, 44px items), a giant brand field (`public/logo/rafa-bg-black.png`, `invert dark:invert-0`, `w-[min(70vw,20rem)]` / `md:w-[min(46vw,36rem)]`), and an email + capitalized social row (filters `url !== "#"`). Layout mirrors the menu: `md:grid-cols-12` with sidebar `md:col-span-4` / brand `md:col-span-8 md:col-start-5`, refined at `xl` (3/9); mobile order = logo → nav → social. GSAP staged reveal (reduced-motion aware) + hover/focus nudge + neighbor dimming. **No search on the landing** (user decision 2026-08-10) — search remains in the menu + footer with extended real content coverage (`search-index.ts` now matches a `keywords` field per result: projects match location city/country, typology, humanized category, materials, client, year, status; services match full description; journal matches category/author/year; still substring case-insensitive over title + subtitle + keywords, max 8). **Header hidden on `/`** via new `src/components/layout/SiteShell.tsx` (`usePathname()`, passes `unpadded` to `PageContainer`). **Deleted**: `src/features/home/` (8 previews), `src/content/home/`, the entire `src/three/` layer (9 files, incl. `HeroScene`/`HeroCanvas`), `theme.scene` palette in `src/config/theme.ts`, the `homeContent` export in `src/content/index.ts`, and deps `@react-three/fiber`/`three`/`@types/three` (npm removed 20 packages). `src/app/(site)/page.tsx` is now `<Landing />` + metadata. Verified via CDP harness (probe12/13): landing has no `header`, 6 items (01–06, 44px), correct hrefs, 1 search input on page (footer only), zero horizontal overflow at 1440/1280/1024/768/390/360 (fixed a 14px scrollbar-gutter overflow at 360 by letting the socials row wrap — `flex-wrap`), footer search returns real matches (lisbon → Baía House + Largo Gallery; limestone → + Material Stories: Limestone journal; porto → Atelier Norte + Studio Patio + Open House Porto journal; courtyard → Villa Marim + Landscape Design), reduced-motion renders instantly, menu still opens on `/projects` with search + zero overflow, close removes the overlay (`menuClosed: true`). `npx tsc --noEmit`, targeted `npx eslint`, and prettier pass. Docs updated: component inventory, page architecture, development order, doc index, release notes, changelog.

**2026-08-10:** Fullscreen navigation **visual refinement** completed (typography hierarchy + footer search layer + responsive overflow fixes). (1) **`MENU` editorial label** — the sidebar rail now opens with a small mono `data-nav-label` overline (`ui.navigation.menu`, `text-[10px] font-mono tracking-widest uppercase text-foreground/40`) above the 01–06 numbered list, completing the brief's hierarchy (label → muted index → medium-large title); it participates in the primary stagger (`[data-nav-label], [data-nav-item]`). (2) **Footer SEARCH layer** — `MenuSearch` is now reused in the footer brand column under a hairline `border-t` rule (docs/06 layer 4 present at the end of the journey; footer is inside `NavigationProvider` so `useNavigation` is safe, and `closeMenu` is a no-op there). (3) **Responsive defects fixed** (found via CDP harness at 1440/1280/1024/768/390/360): the menu social row overflowed the overlay by ~40px at exactly 768px (email 154px + 4 socials in a 472px column) — added `md:flex-wrap`; the footer directory grid collapsed to ~100px columns at 768px (`md:grid-cols-12`) overflowing the MORE-column email link — the directory now only engages at `lg` (single-column stack below 1024px) with columns rebalanced to 4/2/3/3; the sub-footer cluster (socials + Privacy + Back to top) overflowed at 360/390px — now `flex-wrap`. (4) **Dead `ui.navigation` labels removed** (`explore`, `featured`, `previous`, `next` — zero consumers). (5) **`max-w-xs` → `max-w-[20rem]`** in `services-preview.tsx` (the last remaining Tailwind v4 8px-substitution bug). Verified: menu overlay has zero horizontal overflow at all six widths (light + dark), footer/sub-footer overflow eliminated, footer search returns live results, reduced-motion open/close still instant, touch targets 44px everywhere. `npx tsc --noEmit`, targeted `npx eslint`, and prettier pass. Logged a pre-existing `/studio` 768px resize-only horizontal-scroll quirk in `docs/29-known-issues.md` (fresh load clean; parallax hero image + scrollbar-width interplay).

**2026-08-10:** Fullscreen navigation rebuilt as a **Studio Index** composition + Footer refined as its quiet counterpart. The menu now opens to an asymmetric editorial layout instead of a directory list: top bar (site name + shared `ThemeToggle` + `CLOSE`), a narrow numbered primary rail (01–06, `primaryNavLinks`, `aria-current="page"` = accent index + thin underline; inactive = `link-underline`) with `MenuSearch` below it, and a wide identity field holding the brand mark (`public/logo/rafa-bg-black.png`, `invert dark:invert-0`; `w-[min(70vw,20rem)]` mobile / `md:w-[min(46vw,36rem)]` desktop) with an email + capitalized social row beneath. Removed from the menu: featured project image, latest journal article, supporting tier, phone, and the Disciplines section (services remain reachable via "Services"). Motion restaged per docs/06: overlay → bar → primary stagger (0.04) → logo → search → social, faster reversed close; hover focus nudges the title (`x: 6`) and index (`x: -4`) while dimming neighbors to 0.45; reduced-motion = instant show/hide (probe-verified close <150 ms). New shared `src/components/ui/ThemeToggle.tsx` (extracted from the Header, now used by both Header + menu bar). `Header` keeps the `• MENU`/`• CLOSE` editorial trigger. `Footer` rewritten as a quiet directory: brand column (tagline `max-w-[20rem]`, locations " • ") + `GENERAL` (`primaryNavLinks`) / `DISCIPLINES` (`getServices()` → `/services/[slug]`) / `MORE` (`supportingNavLinks` + email) + sub-footer (© year + rights, socials, Privacy Policy via `Route` cast, Back to top ↑). Tailwind v4 gotcha found: `max-w-xs` compiles to `var(--spacing-xs)` = 8px (not 20rem) — the menu search wrapper is now `w-full` and the footer tagline uses `max-w-[20rem]`. Verified with the CDP harness (probe4–probe7: dialog role/aria-modal/label, inert applied, lenis-prevent, `aria-current` on Studio, theme toggle works inside the overlay, Escape + CLOSE close instantly, reduced-motion instant, search 264px/358px, footer headings + 22 links) across light/dark and 1440/1280/1024/768/390/360 widths. `npx tsc --noEmit`, targeted `npx eslint`, and prettier pass.

**2026-08-07:** Studio Phase 7 closed — Studio QA fixes completed. (1) **Social links are now links** — `TeamMemberCard` (`src/features/studio/team-member-card.tsx`) and `ContactInformation` (`src/features/contact/contact-information.tsx`) rendered `socialLinks` as inert `<span>`s (the `url` was never used; the Contact page hid real URLs). Both now filter `url !== "#"` (matching the Footer) and render real anchors (`target="_blank"`, `rel="noopener noreferrer"`, `--touch-target` hit area). (2) **`studio.history` rendered** — previously dead content (populated in `src/content/studio/index.ts`, documented in `docs/20-content-models.md`, never displayed). New `History` section (`src/features/studio/history.tsx`) renders the narrative between the dense `Awards` and `Timeline` lists, giving the Studio page a prose breathing section per `docs/12-page-architecture.md:195` (never stack dense sections). Label sourced from `ui.sections.history`. (3) **Index-based keys removed** — `Awards`/`Timeline`/`Partners` now use stable content-derived keys instead of `key={i}`. (4) Tracker Phase 7 marked 100%. `npx tsc --noEmit`, `npx eslint <files>`, and prettier pass.

**2026-08-07:** Interactive GPS Satellite Coordinate Links & Dual CMS Input Strategy completed (`ProjectMetadata`, `ProjectsArchive` Map View, `ContactCta`). All coordinates rendered across the site (e.g. `37.1000°N, 8.5400°W ↗` or `41°08'58"N 8°37'00"W ↗`) are interactive monospaced links opening Google Maps satellite view in a new browser tab (`target="_blank"`). **CMS Strategy Decision:** Sanity Studio schema will support both (1) an interactive Google Maps visual pin-drop picker AND (2) direct manual latitude/longitude numeric fields for precise surveyor coordinates. `npx tsc --noEmit` and production build pass with 0 errors across all **33** static routes.

**2026-08-06:** Projects Archive Header Layout Refinement completed (`/projects`). Reduced vertical header footprint by replacing the multi-line `text-5xl` H1 philosophy statement with a succinct `Projects` H1 title + quiet `text-base` editorial subtitle (`Our projects are physical inquiries into space, light, and material longevity.`). Reduced vertical height by ~60%, allowing the architectural taxonomy bar and portfolio cards to sit naturally higher in the viewport. `npx tsc --noEmit` and production build pass with 0 errors across all **33** static routes.

**2026-08-06:** Project Detail Snøhetta Breadcrumb Navigation Alignment completed (`/projects/[slug]`). Reverted sticky header nav links to preserve the restrained `Logo · Menu` header identity. Implemented Snøhetta's exact editorial in-page breadcrumb pattern directly below the hero photography (`Projects → [Project Title]`). Clicking `Projects` returns the visitor to the `/projects` portfolio archive. `npx tsc --noEmit` and production build pass with 0 errors across all **33** static routes.

**2026-08-06:** Projects Archive Page Refinement completed (`/projects`). Eliminated remaining SaaS/e-commerce interaction patterns in favor of an Architectural Monograph Index: (1) **`ProjectCard` Refinement:** Removed SaaS `<Badge>` chips inside cards; replaced with quiet monospaced location + year + typology string (`Algarve, Portugal · 2025 · Residential`). Removed heavy card borders for clean monograph flat appearance. (2) **View Switcher Redesign:** Replaced solid black filled pill buttons (`bg-foreground`) with minimal monospaced text indicators (`01 GRID / 02 SPEC TABLE / 03 MAP INDEX`) with hairline active underlines. (3) **Hairline Search Input:** Transformed e-commerce search box into a minimal hairline search field (`[ SEARCH ARCHIVE_ ]`). (4) **Grid Rhythm Fix:** Lead project (`idx === 0`) now spans full width (`col-span-full aspect-hero`) as the featured monograph anchor, followed by a balanced 2-column monograph grid. (5) **Geographic Map Index Refinement:** Removed shaded `bg-foreground/[0.02]` box wrapper; rendered clean hairline coordinate cards directly on background. `npx tsc --noEmit` and production build pass with 0 errors across all **33** static routes.

**2026-08-06:** Project Detail Monograph Experience Refactor & Motion ScrollTrigger Fix completed (`/projects/[slug]`). Evolved the project detail template into a monograph storytelling publication format: (1) **Data Architecture:** Expanded `Project` interface (`src/content/projects/index.ts`) with `concept` (one-sentence design idea), `chapters[]` (`ProjectChapter` with narrative body, `ChapterImage`, intent tags, fullBleed support), `materialNarrative[]` (`ProjectMaterial` with design rationale), `lightStrategy`, `siteResponse`, `photographerCredit`, and `awards[]`. All 6 mock projects enriched. (2) **New Components:** Built `ProjectConcept` (`src/features/projects/project-concept.tsx`) featuring large type with word-by-word `TextReveal`, `ProjectChapterBlock` (`src/features/projects/project-chapter.tsx`) rendering narrow reading columns + full-bleed or contained images with intent side-notes, and `ProjectMaterials` (`src/features/projects/project-materials.tsx`) for material rationale. (3) **Upgraded Components:** Refactored `ProjectGallery` to support fullBleed 100vw cinematic images and narrative side-notes; redesigned `ProjectNavigation` into a full-width cinematic Next Project panel with background hero imagery and dark overlay; refined `BeforeAfterSlider` labels to editorial language ("The Existing Building" / "The Completed Work"). (4) **10-Chapter Monograph Sequence:** Re-sequenced `app/(site)/projects/[slug]/page.tsx` into: Project Cover → Full-Bleed Hero (with photographer credit) → Concept Statement + Spec Sheet → Chapter Narrative Blocks → Material Palette → Environmental & Site Notes → Before/After Transformation → Spatial Archive Gallery → Project Credits & Awards → Cinematic Next Project → Related Projects Grid. Mobile sequence places spec facts below concept. (5) **ScrollTrigger Dynamic Height Fix:** Fixed issue where `RelatedProjects` (and other elements near the bottom of long pages) required a page reload to trigger on scroll. Attached a debounced `ResizeObserver` to `document.body` in `LenisProvider` (`src/providers/lenis-provider.tsx`) along with `window.addEventListener('load')` and `invalidateOnRefresh: true` across `Stagger`, `Reveal`, and `ImageReveal` components. This dynamically updates GSAP `ScrollTrigger` start offsets as asynchronous images load and expand page height, allowing `RelatedProjects` to reveal smoothly on direct scroll without requiring a page refresh. `npx tsc --noEmit` and production build pass with 0 errors across all **33** static routes.

**2026-08-06:** Phase 6 Projects Platform completed (`/projects` & `/projects/[slug]`). Synthesized key architectural principles from Snøhetta and BIG (Bjarke Ingels Group) into a unified portfolio experience: (1) **Data Schema Expansion:** Extended `Project` interface (`src/content/projects/index.ts`) with industrial fields (`typology`, `areaM2`, `coordinates`, `client`, `team`, `drawings`, and optional `beforeAfter` for renovation/adaptive reuse spreads). Interface is designed 1:1 for future Sanity GROQ schema mapping. (2) **3-View Archive (`ProjectsArchive`):** Built interactive `/projects` page featuring a **View Mode Switcher** (`■ Grid View` | `≡ Industrial Spec Table` | `• Geographic Map Index`) and a **Multi-Axis Filter Rail** (Disciplines, Typology, Live Search). (3) **Monograph Detail Template (`app/(site)/projects/[slug]/page.tsx`):** Implemented Snøhetta-style monumental full-bleed hero photography, 12-col split with sticky BIG-style industrial spec sheet (`ProjectMetadata`), conditional `BeforeAfterSlider` for adaptive reuse projects, `ProjectGallery`, monospaced `ProjectTeamMatrix`, `ProjectNavigation`, and 3-column `RelatedProjects` grid. `npx tsc --noEmit` and production build pass with 0 errors across all **33** statically generated routes.

**2026-08-06:** Industrial Architectural Refactor completed (`ProcessPreview` & `ContactCta`). Transformed `ProcessPreview` (`src/features/home/process-preview.tsx`) from a simple grid into an **Industrial Specification Blueprint Flow** — featuring hairline grid dividers (`divide-x divide-border/40`), monospaced phase codes (`PHASE 01 // ANALYSIS`, `PHASE 02 // SCHEMATIC`...), and deliverable micro-tags (`[Site Survey, Feasibility Study, Program Brief]`). Refactored `ContactCta` (`src/features/home/contact-cta.tsx`) from a soft marketing prompt into an **Official Architectural Studio Dispatch Panel** — featuring geographic GPS coordinates (`41°08'58"N 8°37'00"W`), 12-col split, direct technical inquiry matrix (`commissions`, `press`, `direct line`), and a hairline-bordered uppercase action trigger (`INITIATE PROJECT BRIEF →`). Updated `src/content/home/index.ts` content model. `npx tsc --noEmit` and production build pass with 0 errors across all **33** statically generated routes.

**2026-08-06:** Homepage Editorial Refactor completed (Editorial Arrival & Portfolio Fold Integration). Re-architected the opening landing composition from a traditional `100vh` centered hero into an asymmetric, left-aligned **Editorial Arrival** monograph cover spread (`src/features/home/hero.tsx`). Removed the conventional bounce chevron "Scroll to explore" cue. Three.js `HeroScene` remains fully intact, rendering absolutely positioned spatial volumetric depth behind the cover typography. Adjusted top padding on `FeaturedProjects` (`src/features/home/featured-projects.tsx`) so that the "Portfolio / Selected Projects" section header and top ~25–30% of the dominant lead featured project (`Casa Monte`) peek naturally into view above the initial viewport fold line on landing (`scroll = 0`). `npx tsc --noEmit` and production build pass with 0 errors across all **33** statically generated routes.

**2026-08-06:** Global brand naming update — updated studio brand name from `RAFA Design` to **`RAFA Design Hub`** across the single source of truth (`src/config/site.ts` `siteConfig.name`, `creator`, and `keywords`), theme configuration (`src/config/theme.ts`), content models (`homeContent`, `studioContent`, `pageContent`, `journalContent`), and API sender metadata (`/api/contact/route.ts`). All navigation surfaces (Header, Fullscreen Menu, Footer) and page metadata automatically inherit `RAFA Design Hub`. `npx tsc --noEmit` passes with 0 errors.

**2026-09-10:** Zero-flash system theme persistence & background restoration. Established a bulletproof theme initialization architecture ensuring that on every page reload, the active theme (from system preference or saved toggle) paints the correct background color with zero flash of white. Moved the theme initialization script into `<head>` as an inline synchronous script that evaluates before `<body>` is rendered, setting `.dark`/`.light` and `style.colorScheme`. Added `@media (prefers-color-scheme: dark)` stylesheet-level overrides in `tokens.css` for instant native dark rendering, and wired live `prefers-color-scheme` media query listeners in `ThemeProvider` to sync system theme shifts in real-time. typecheck, eslint, prettier format check, and production build pass with 0 errors across all 34 routes.

**2026-09-10:** Micro-typography utility fix & featured project card layout restoration. Resolved the root cause of enlarged micro-text and broken layout in the Projects Archive featured commission card. Renamed `@theme` keys in `src/styles/tokens.css` from `--font-size-*` to `--text-*` and added explicit `@utility` declarations in `src/styles/utilities.css` for `text-overline` (10px), `text-micro` (9px), and `text-label` (11px). Enforced container max-widths (`.max-w-*` mapping to `var(--container-*) !important`) to eliminate Tailwind v4's collision with `--spacing-*`. Upgraded `FeaturedProjectCard` title to `max-w-(--container-3xl)` and subtitle to `max-w-(--container-lg)`, and replaced the cramped arbitrary `lg:aspect-[3/1]` with design-system `aspect-hero` (`md:aspect-[21/9]`) and safe responsive minimum heights (`min-h-[360px] sm:min-h-[420px] md:min-h-[460px]`). typecheck, eslint, prettier format check, and production build pass with 0 errors across all 34 routes.

**2026-09-10:** System-wide typography harmonization & micro-scale tokenization completed across the full platform. Formally documented Century Gothic Paneuropean in `docs/04-design-system.md` as the studio's singular identity typeface across both display headings and body copy (replacing legacy references to General Sans and Manrope). Defined three named micro-typography tokens in `@theme` in `src/styles/tokens.css`: `text-overline` (10px, for section overlines, architectural ledgers, and specification table labels), `text-micro` (9px, for image overlays, badges, and icon indicators), and `text-label` (11px, for captions and timeline entries). Refactored 73 files across the codebase to use these tokens, eliminating all raw arbitrary sizes (`text-[10px]`, `text-[9px]`, `text-[11px]`). Fixed the oversized clamp heading in Careers `PositionCard` (`text-xl font-display font-medium tracking-tight`), added explicit `font-display` to primary navigation index titles, and confirmed clean typecheck, lint, prettier format check, and production build across all 34 routes.

**2026-08-05:** Sustainability section implemented across the full site. Added `sustainability` as an active route (`/sustainability`) and appended it to `navigationConfig.supporting` — which automatically propagated the link to both the Fullscreen Navigation (`Explore` section) and the Footer (`Explore` column) without touching either component. New `src/content/sustainability/index.ts` content model (4 commitments: Material Honesty, Passive Design First, Designed to Last, Community & Place; philosophy statement; 5 design principles; certifications). Added `sustainability` key to `src/content/home/index.ts` and `src/content/pages/index.ts`. New `src/app/(site)/sustainability/page.tsx` — full editorial layout with intro/manifesto, philosophy 12-col split, numbered commitments stack, quoted principles, and contact CTA. New `src/features/home/sustainability-preview.tsx` homepage section — 12-col editorial split (overline + heading left, body + commitment list + CTA link right) wired into `app/(site)/page.tsx` between ProcessPreview and JournalPreview. Social links also activated: updated `src/content/company/contact.ts` with real social profile URLs (Instagram, LinkedIn, Behance, Pinterest) so social channels now render in the Footer and Fullscreen Navigation. `npx tsc --noEmit` and production build pass with 0 errors across all **33** statically generated routes.

**2026-08-05:** Navigation System Refactoring completed (Header + Fullscreen Menu + Footer). Re-architected all three navigation states into a unified Information Architecture model (`docs/06-navigation-philosophy.md`): (1) **Header** — refactored generic Lucide hamburger / X icon buttons into a quiet typographic trigger (`MENU` / `CLOSE`) featuring a micro-dot state indicator (`bg-accent` pulse when open) and refined theme toggle styling (`bg-background/80 backdrop-blur-md border-b border-border/40`); (2) **Fullscreen Navigation** — eliminated featured project image card and journal preview clutter in favor of a 12-column pure typographic architectural index: Col 1–6 (Span 6) display scale primary routes (`01 Projects`, `02 Studio`, `03 Services`, `04 Process`, `05 Journal`, `06 Contact`) with hover `ArrowUpRight` micro-interactions; Col 7–9 (Span 3) dedicated **Disciplines** column listing all 6 service slugs; Col 10–12 (Span 3) **Utility Rail** with live search (`MenuSearch`), supporting links (`Careers`), mailto/tel contact info, and studio locations (`"Zurich · Lisbon"`); (3) **Footer** — expanded from an incomplete 10-column layout into a 12-column directory mirroring the menu's IA (Col 1–4 Brand/Tagline/Location, Col 5–6 Explore nav, Col 7–8 Disciplines column, Col 9–12 Contact & Social), with a sub-footer bar featuring legal links (`Privacy Policy`) and smooth `"Back to top ↑"` scroll trigger (`window.scrollTo({ top: 0, behavior: "smooth" })`). Added `disciplines` key to `ui.navigation`. Next.js typed routes satisfied via explicit `Route` cast for planned privacy route. `npx tsc --noEmit` and production build pass with 0 errors across all 32 statically generated routes.

**2026-08-04:** Homepage editorial refactoring completed (Phase 5 UI/UX refinement). Following a full review of all homepage sections against the project's editorial design principles (docs/02, 04, 05, 12) and Snøhetta's homepage as an editorial reference, 8 components were refactored without touching any design tokens, color palette, typography system, 3D WebGL integration, GSAP motion primitives, or routing: (1) **Hero** — added overline discipline tag, refined scroll cue with label + bounce chevron, applied `container-standard` centering; (2) **ProjectCard** — added `variant` / `aspectClassName` / `contentClassName` props + a new `flat` Card variant for unboxed editorial image cards; (3) **FeaturedProjects** — replaced 3-col boxed grid with an asymmetric editorial layout: one dominant `aspect-hero` lead project + 2-col `aspect-landscape` secondary grid, plus overline / section-link header; (4) **StudioPreview** — replaced centered text banner with a 12-col two-column editorial split (overline + H2 left, narrative body + underline link right); (5) **ServicesPreview** — replaced 2×2 boxed card grid with a typographic discipline stack using thin horizontal dividers, step counters, and hover color transitions; (6) **ProcessPreview** — replaced circle-pill widget with a 4-col top-bordered step timeline using overline numbers, step titles, and descriptors; (7) **JournalPreview** — replaced 3-col uniform grid with an asymmetric editorial magazine layout (7-col lead article + 5-col stacked secondary list); (8) **ContactCta** — replaced isolated centered button with a 12-col editorial split (overline + H2 left, body + dashed underline text-link right). `exactOptionalPropertyTypes` TS error in ProjectCard resolved via conditional spread. typecheck + eslint + production build pass (32 routes).

**2026-08-19:** Journal 100% Sanity migration complete (Phase 16 CMS) — Eliminated hybrid fallback entirely; all journal data now comes exclusively from Sanity CMS. User fixes implemented: (1) Full Sanity integration: removed sanity-adapter hybrid pattern, journal pages fetch directly from Sanity (`getArticles`, `getArticleBySlug`, `getArticleSlugs`), all 3 articles migrated via `npm run migrate:journal` (language-of-light, open-house-porto-2026, casa-monte-archdaily-award), generateStaticParams fully async with Sanity fetch, all detail pages render via `<JournalDocumentSanity />` with portable text. (2) Studio sidebar: Industrial structure with numbered sections (01 // Projects 📐, 02 // Journal 📰), both visible at `/admin`, custom structure configuration. (3) Connected systems fixed: `sitemap.ts` queries Sanity for dynamic routes, `robots.ts` disallows `/admin/*`, editorial-reminder cron uses async Sanity fetch, `search-index.ts` uses correct `materialNarrative` field. (4) TypeScript/ESLint: Zero errors, zero warnings; all `any` types replaced with proper interfaces in `image.ts`/`transforms.ts`/`portable-text.tsx`, all exactOptionalPropertyTypes violations fixed via conditional spreads, React hooks rules violation in `use-image-brightness.ts` fixed, unused imports removed. (5) Migration script: Converts sections-based format to portable text blocks, uploads hero images, creates Sanity documents, skips duplicates. Verified: Build passes (35 static routes including 4 journal), SSG works correctly, Studio shows both sections, all articles render with portable text. Documentation: `JOURNAL-MIGRATION-COMPLETE.md`. Status: Production-ready, 100% Sanity, no hybrid. Next: Services/Studio/Team/Careers/Contact schemas.

**2026-08-19:** Journal full integration complete (Phase 16 CMS) — Completed end-to-end Sanity integration for journal articles: (1) Backend: Industrial schema with 5 groups, rich portable text content blocks (paragraphs/images/galleries/quotes/videos/project-refs/dividers), GROQ queries (6 queries for all use cases), TypeScript transforms (Sanity → JournalArticle), fetch utilities (high-level async functions). (2) Frontend: Created `ArticleContent` portable text renderer (`@portabletext/react`) with custom components for all 7 block types (responsive, Next.js Image, hover states, accessibility), new `JournalDocumentSanity` component for Sanity articles (hero/metadata/content/credits/tags), hybrid adapter (`sanity-adapter.ts`) that tries Sanity first and falls back to static content (zero breaking changes), updated journal listing/detail pages to use hybrid data (detect format, choose renderer). (3) Features: 3 image layouts, 2-4 column galleries, YouTube/Vimeo embeds, project references, 3 divider styles, typography (H2/H3/quotes/lists), links (internal/external), credits, keywords. Package: Added `@portabletext/react@^3.1.0`. Verified: backwards compatible (legacy articles still work with existing templates), gradual migration possible (both formats coexist), production-ready. Documentation: `JOURNAL-SCHEMA-IMPLEMENTATION.md`, `JOURNAL-CMS-INTEGRATION-COMPLETE.md`, `JOURNAL-FRONTEND-INTEGRATION-COMPLETE.md`. Next: Test schema in Studio, create sample article, verify rendering. Then continue with Services/Studio/Team/Careers/Contact schemas.

**2026-08-29:** Full Sanity CMS Journal Migration & Industrial Code Quality Hardening — (1) **Studio Sidebar Fix:** Discovered root cause of missing `journalArticle` in Sanity Studio sidebar — `Studio.tsx` had an inline desk structure with only `S.listItem().title('Projects')` hardcoded; updated `Studio.tsx` and `sanity.config.ts` to expose `01 // Projects` and `02 // Journal` with icons and ordering. (2) **Full Journal → Sanity migration (hybrid → 100% Sanity):** Cut the `sanity-adapter.ts` from a hybrid fallback architecture to a direct Sanity data-access layer (`getArticles`, `getArticleBySlug`, `getFeaturedArticle`, `getActiveCategories`, `getRelatedArticles`, `getArticleSlugs`). Updated `src/app/(site)/journal/page.tsx` and `src/app/(site)/journal/[slug]/page.tsx` to fetch exclusively from Sanity; made `generateStaticParams()` async using `getArticleSlugs()`; standardised on `<JournalDocumentSanity />` (Portable Text) — no more legacy template switches. Migrated all 3 articles (`language-of-light`, `open-house-porto-2026`, `casa-monte-archdaily-award`) into the live dataset via `scripts/migrate-journal-to-sanity.mjs` with `client.createOrReplace()` (published, not drafts). (3) **Connected subsystems fixed:** Dynamic sitemap made `async` querying live Sanity routes; `robots.ts` now disallows `/admin/*`; editorial cron route fetches articles asynchronously from Sanity; search index (`search-index.ts`) updated to use `materialNarrative` instead of obsolete `details.materials`. (4) **TypeScript Hardening (0 errors):** Replaced all `any` parameters across `src/sanity/lib/image.ts`, `src/sanity/lib/transforms.ts`, and `src/components/journal/portable-text.tsx` with proper typed interfaces (`SanityRawImage`, `SanityRawProject`, `SanityRawArticle`, `ImageBlockValue`, `GalleryBlockValue`, etc.). Added `[index: string]: unknown` to satisfy `exactOptionalPropertyTypes` across all return shapes. Fixed `JournalArticle.content` type to `string | Array<Record<string, unknown>>` to support both Portable Text and legacy string content. Added type-predicate `.filter()` for chapter and drawing arrays. Fixed `use-image-brightness.ts` React rules violation (removed synchronous `setState` inside an effect body). (5) **ESLint clean (0 errors, 0 warnings):** Fixed all `import/order` violations via `eslint --fix`, removed all unused imports (`ImageAsset`, `ChapterImage`, `ComponentType`, `urlForImage`). (6) **Production build ✅:** `npm run typecheck` (exit 0), `npm run lint` (exit 0), `npm run build` (exit 0) — 32 static routes generated including `/journal/[slug]` (all 3 articles SSG), `/projects/[slug]` (6 paths), `/admin/[[...index]]` (dynamic SSR), `/sitemap.xml`, `/robots.txt`, `/api/cron/editorial-reminder`. Zero TypeScript errors in Next.js build worker type pass.

**2026-08-30:** Journal Page Industrial Editorial Redesign (Phase 16 UI/UX) — Refactored `/journal` from a generic blog layout to a high-end architectural editorial index: (1) **Header & Inline Filters (`JournalIndexHeader`):** Combined H1 title + editorial description with category filter pills (`CategoryFilterPills`) into a single 12-column header bar with a subtle bottom border rule. Eliminates filter detachment and keeps controls directly in the primary reading hierarchy. (2) **Cinematic Hero (`FeaturedArticle`):** Transformed into a dominant 8-column editorial photograph (3:2 aspect) + 4-column large title block (`text-5xl lg:text-6xl`) with author, date, and reading time attribution, framed by a dedicated section label and thin divider. (3) **Asymmetric Editorial Grid (`JournalEditorialGrid`):** Replaced uniform 3-col card grid with an editorial structure: Row 1 features an asymmetric pairing (7-col lead card with 4:3 image + excerpt, paired with a 5-col vertical stack of two 16:9 cards); Row 2+ renders a clean 4-col architectural index (`aspect-[3/2]`). (4) **Card Hierarchy (`JournalCard`):** Added `size` variants (`lead` | `secondary` | `standard`) with proportional typography and aspect ratios. (5) **Eliminated View Toggle:** Removed developer-comfort Grid/List switch in favor of a confident, committed editorial composition. (6) **Verification:** `typecheck` (exit 0), `lint` (exit 0), `build` (exit 0, 32 static routes generated).

**2026-08-30:** Journal Monograph Detail Template (`/journal/[slug]`) Elevation — Refactored article detail view into an architectural monograph reading experience: (1) **12-Column Split Header:** Left 8 cols feature monumental H1 typography (`text-5xl sm:text-7xl leading-[1.06]`) and prominent lead excerpt; Right 4 cols feature a structured **Architectural Spec Matrix** (`01 // Author`, `02 // Published`, `03 // Reading Time`, `04 // Discipline`, `05 // Share`) with interactive clipboard copy trigger (`ShareButton`). (2) **Hero Photography:** Monumental 16:9 aspect crop with subtle captions and monospaced photographer credit attributions. (3) **12-Column Asymmetric Monograph Grid:** Left 4 cols feature a sticky marginalia rail (`ReadingIndexRail`) with scroll-spied section headings (`01 // Section...`) and metadata; Right 8 cols feature the primary narrative body (`max-w-2xl` reading line length, `leading-[1.8]`, refined section breaks with numbered tags, pull quotes, and project plates). (4) **Reading Polish:** Wired fixed 2px hairline scroll progress bar (`ScrollProgress`) and floating `Back to top ↑` trigger (`BackToTop`). (5) **Refined Block Components (`portable-text.tsx`):** Elevated PullQuote (editorial display type + author citation), ProjectReference (architectural 12-col split spec plate with hero image, title, arrow, location, and year), and borderless image figures. (6) **Verification:** `typecheck` (exit 0), `lint` (exit 0), `build` (exit 0, 32 static routes generated).

**2026-08-04:** Disciplines sections removed from the fullscreen navigation rail and the footer — they listed the same six `getServices()` items as the `/services` umbrella page (the "Services" primary nav item), making the same content reachable from three surfaces. `Services` is now the single entry point; the `ui.navigation` `disciplines` label was deleted (no consumers) and the footer grid returned to 5/3/4. typecheck + eslint + build pass (32 routes).

**2026-08-04:** Menu usability pass (docs/06 "reach any destination effortlessly"). (1) **Disciplines section** added to the fullscreen navigation rail — lists the six services (`getServices()` → `/services/[slug]`), with a new `ui.navigation` label `disciplines`, so Architecture, Interior Design, Landscape Design, etc. are reachable directly from the menu. The `Footer` mirrors the same Disciplines nav between Explore and Contact (grid 5/3/4 → 4/2/3/3), keeping the two navigation surfaces in sync as different views of the same IA (docs/06). An initial "All Services" link to `/services` was added then removed as redundant — the umbrella page is already the "Services" primary nav item. (2) **GSAP "target not found" warnings fixed** (surfaced when opening the menu in the browser): the overlay target resolved to `null` because `querySelector("[data-nav-overlay]")` was called from the element that itself carried the attribute (`querySelector` only matches descendants) — the overlay now animates the root dialog element directly; the primary stagger selector `[data-nav-primary] > li` matched nothing because the items sit inside a nested `<ul>` — now `[data-nav-primary] ul > li`. typecheck + eslint + prettier + build pass (32 routes).

**2026-08-03:** Navigation evolved to the docs/06 philosophy (minimal header + fullscreen navigation as the only primary menu on all breakpoints). Reviewed the previous system against docs/06: it had no fullscreen nav, a desktop horizontal link bar, no search layer, no supporting tier, and menu state living in the Header — plus the repo did not compile (`DesktopNavigation`/`MobileNavigation` were deleted after being documented, leaving dangling imports + orphaned lines in `Header.tsx`). Rebuilt as a feature (`src/features/navigation/`): `navigation-provider.tsx` (owns `isMenuOpen`, closes on route change via `queueMicrotask`, wraps the page in `inert` while open) + `navigation-context.ts` (`useNavigation`) + `fullscreen-navigation.tsx` (dialog, numbered primary links, supporting tier, contact, featured project + latest article) + `menu-search.tsx`/`search-index.ts` (static client-side search over projects/services/journal). Shared data foundation: typed `navigationConfig` in `src/config/navigation.ts` (`primary`/`supporting` route keys), `primaryNavLinks`/`supportingNavLinks` in `src/content/navigation/index.ts`, labels in `src/content/ui/index.ts`, `src/app/sitemap.ts` derives static routes from config (`staticRouteKeys`). Header is now minimal on every breakpoint; `src/components/navigation/NavigationMenu.tsx` (and the whole folder) was deleted as dead code. Footer was refactored to consume the same shared navigation content (`primaryNavLinks`/`supportingNavLinks`), `contactInformation` (email/phone/social, `#` links filtered), and `ui.navigation`/`ui.sections` labels — with a 12-col 5/3/4 grid and 44px touch targets. Motion per docs/06: staged open (overlay → bar → primary stagger → rail → search → featured) and reversed close, ~500–700 ms, `useReducedMotion` aware; `data-lenis-prevent` on the overlay so the menu scrolls natively. Accessibility: `useDialog` (Escape/focus trap/scroll lock/focus restore), `aria-modal`, `inert` background, `aria-current="page"`, `aria-haspopup` on the menu button, labeled search input with live region. Menu order: primary = Projects, Studio, Services, Process, Journal, Contact; supporting = Careers (Sustainability deferred until its page exists). Verified: typecheck + eslint + production build pass (32 routes). Remaining Phase 16 tasks: Performance audit, Lighthouse, browser testing.

**2026-08-03:** Video intro splash implemented (Phase 14 Loading Experience) — `src/components/splash/{SplashProvider,SplashScreen}.tsx` mounted inside `Providers` in the root layout. Full-screen `z-overlay` overlay plays `public/videos/rafa-video.mp4` (`siteConfig.introVideo`), `object-cover`, autoplay/muted/playsInline, no controls. Flow: opaque cover appears pre-paint (mount effect + `queueMicrotask`) → waits for `window load` + `document.fonts.ready` (+150 ms buffer, 3 s cap) before mounting the video → on `ended` the overlay fades out over `duration-slow` (480 ms) revealing the already-mounted header/homepage (logo in the video is intended to align with the header logo for a continuous transition) → overlay removed. Session-gated via `sessionStorage` key `rafa-splash-played` (plays once per session; skipped on refresh/navigation). `prefers-reduced-motion` skips the video entirely (instant display). Scroll is locked during play/fade (html/body `overflow: hidden` + non-passive wheel/touchmove preventDefault) and restored on completion. Video `onError` treats as ended. Cleanup: all listeners removed, fallback timers for ready + fade completion.

**2026-08-03:** Accessibility review completed (Phase 16). Audited the production build with the CDP harness (`cdp-a11y.js`) across all 11 routes (h1 count, heading sequence, landmarks, skip link, img alt, accessible names, placeholder links, duplicate IDs, 44px touch targets). Fixed four finding classes: (1) **Heading hierarchy** — `FeaturedArticle` on `/journal` rendered a second `h1` under the page `h1` (changed to semantic `h2` via `as="h2"`, display styling unchanged); listing pages (`/projects`, `/journal`, `/services`, `/process`, `/careers`) skipped from `h1` to card `h3` headings — added `titleAs?: HeadingTag` to `ProjectCard`/`JournalCard`/`ServiceCard`/`PositionCard`/`ProcessStep` (default `h3`; listing pages pass `titleAs="h2"`, homepage/related sections keep `h3`). (2) **Placeholder links** — footer social links all `href="#"` (dead links); `Footer` now filters `href !== "#"` and renders the Connect block only when real URLs exist (`realSocialLinks`). (3) **Touch targets** — added `--touch-target: 2.75rem` design token; header nav links, logo, footer links, and filter chips now use `min-h-(--touch-target)`/`min-w-(--touch-target)`, theme toggle + mobile menu buttons use `size-(--touch-target)`; the nav active-underline indicator was re-anchored to the label span (top + width from `[data-nav-label]`) so it still hugs the text after the hit-area padding. (4) Verified: single `h1`, no heading skips, no small targets (including the 42px-wide "Studio" nav text fixed via min-width), no placeholder links on any route. typecheck + eslint + prettier + production build pass (32 routes). Next Phase 16 task: Performance audit. Note: `npm run lint` can hang (lingering child process on Windows) — prefer `npx eslint <files>` for targeted runs.

**2026-08-01:** Phase 15 closed + Phase 16 (Optimization) opened. Final performance audit ran via the CDP harness on the production build across 11 routes (`/`, `/projects`, `/projects/casa-monte`, `/journal`, `/journal/language-of-light`, `/studio`, `/services`, `/services/architecture`, `/process`, `/contact`, `/careers`): TTFB 12–78 ms, FCP 176–436 ms, LCP ≤ 1172 ms, CLS ≤ 0.0002, zero console errors/warnings, JS ~296–523 KB eager, images 0–13 KB, exactly 2 font families (Manrope + Inter, both preloaded), canvas only on `/` (three lazy + client-only). CRITICAL bug found + fixed: every `[slug]` detail page (projects/journal/services) silently prerendered as 404. Root cause: Next.js 16 fully removed synchronous `params` access (Async Request APIs breaking change) — the pages destructured `{ params }` synchronously, so at build time `params.slug` was `undefined`, the lookup failed, and `notFound()` was baked into the static HTML for every slug (`/projects/casa-monte` returned a prerendered 404 with `x-nextjs-cache: HIT`, even after a clean rebuild — confirming the sync-access root cause, not stale `.next`). Fix: `generateMetadata` and the page component in all three `[slug]/page.tsx` are now `async` with `{ params }: { params: Promise<{ slug: string }> }` and `await params`. Verified: detail pages return 200, prerendered HTML contains real titles (Casa Monte / Language of Light / Architecture), no "Not Found" strings. Lighthouse baseline attempted but NOT viable in this environment — `npx lighthouse` download hung and a temp install's runs hang launching Chrome (exit 1, no output); deferred to browser-testing phase. Structured data shipped (Phase 16 SEO): new `src/config/schema.ts` (Organization + WebSite global in root layout; Project as CreativeWork + Article + BreadcrumbList builders) + new `src/components/seo/JsonLd.tsx`; wired global schema in `src/app/layout.tsx` and breadcrumbs on projects/journal/services listing + detail pages and studio/process/contact/careers. Verified on prod: every audited route emits valid JSON-LD (Organization + WebSite on all pages; CreativeWork on project detail; Article on journal detail; BreadcrumbList on content pages). typecheck + lint + prettier + build pass (32 routes).

**2026-08-01:** Bug-fix session — resolved the header being overlapped by page content while scrolling (nav became invisible and unclickable). Root cause: the z-index design tokens in `src/styles/tokens.css` were declared under the `--z-*` theme namespace, but Tailwind v4's z-index theme namespace is `--z-index-*` (confirmed in `tailwindcss@4.3.3` `dist/lib.js` — the `z` utility declares `themeKeys: ["--z-index"]`). The `--z-header`/`--z-overlay`/`--z-modal`/`--z-content` variables therefore generated no utilities — grep of the compiled CSS showed `z-header`/`z-overlay`/`z-modal`/`z-content` absent while builtin `z-10` compiled — so the fixed Header rendered with `z-index: auto` and hero content (`z-10`) painted above it. Fix: renamed the tokens to `--z-index-{base,content,header,overlay,modal}`; the compiled CSS now emits `.z-header{z-index:var(--z-index-header)}` etc. Verified with the CDP harness on the production build: header computed `z-index: 50` (was `auto`) and `elementFromPoint` returns the desktop nav links (not page content) at scroll 0 / 300 / 1200; the hero scene scroll integration is unchanged (opacity/scale still track scroll exactly). Lesson: Tailwind v4 custom-utility theme namespaces are strict — `--z-index-*` for z, `--ease-*` for ease, `--transition-duration-*` for duration, etc. typecheck + lint + prettier + build pass (32 routes).

**2026-08-01:** Phase 15 (Three.js) Scroll Integration shipped — the hero scene now responds to scroll per docs/10 + docs/08 (scroll reveals/transitions/guides without hijacking navigation). New `src/three/utils/scroll-progress.ts` — a tiny mutable bridge written by ScrollTrigger (`setScrollProgress`) and read in the render loop (`getScrollProgress`), mirroring the existing pointer-ref pattern so Three.js rendering state stays isolated from React/UI state. `HeroCanvas` drives a scrubbed `gsap.fromTo` (opacity → 0, scale → `SCENE_RECEDE_SCALE` 0.94) on the scene wrapper via `useScopedGsap`, `start: "top top"` / `end: "bottom top"` over the hero exit, and feeds `self.progress` to the module; progress resets on unmount. `CameraRig` reads the progress in `useFrame` and subtly raises the camera (+0.7 Y), dollies toward the composition (−0.6 Z), and lifts the look-at (+0.6) — gated behind `enabled` (high-quality only) and fully disabled under reduced motion (the whole scene already gate). No pinning/scroll-jacking; only `opacity` + `transform` animated. Also downgraded `three`/`@types/three` to `^0.182.0` to clear the r185 `THREE.Clock` deprecation warning. Verified with the CDP harness on dev + production (dark and light): wrapper opacity/scale track scroll exactly (top → 1.0/1.0; mid → 0.60/0.976; past hero → 0.10/0.946; return → reset), reduced-motion renders no canvas, and the console is clean. typecheck + lint + prettier + build pass (32 routes). Remaining in the phase: final performance audit.

**2026-08-01:** Bug-fix session — resolved the dark-mode hydration mismatch behind the reported "Encountered a script tag while rendering React component" console error. Root cause: `ThemeProvider` initialized `isDark` by reading the live DOM during hydration while the server always rendered `isDark = false`; on dark-mode systems the pre-hydration `.dark` class made the client's first render (Sun / "Switch to light mode") disagree with the server HTML (Moon / "Switch to dark mode"), React treated it as a hydration failure, regenerated the whole tree client-side, and that regeneration re-created the inline `<script>`. Fix: `isDark` now derives from `document.documentElement` `.dark` via `useSyncExternalStore` (`getServerSnapshot` → `false` keeps SSR/hydration identical; `MutationObserver` syncs consumers post-hydration; `toggleTheme` writes the class + `localStorage` directly). Verified with a headless-Chrome CDP harness (both `prefers-color-scheme` schemes; `/` and `/studio`): no hydration errors, no script-tag error, toggle flips class + persists storage + swaps the icon. typecheck + lint + prettier + build pass (32 routes). Also logged a third-party 🟢 console warning from the new scene — three r185 deprecates `Clock`, R3F 9.7.0 still constructs one (see `docs/29-known-issues.md`). Follow-up: resolved the warning by downgrading `three`/`@types/three` to `^0.182.0` (last release before the `Clock` deprecation, still within R3F's peer range) — verified with the CDP harness that the scene renders with a zero-warning console; the 🟢 entry was removed from `docs/29-known-issues.md`.

**2026-08-01:** Phase 15 (Three.js) started — built the first approved scene (Hero Scene) behind the homepage hero. New `src/three/` layer per docs/03 + docs/10: `hooks/use-is-webgl` (WebGL capability gate, `useSyncExternalStore`), `hooks/use-scene-quality` (high/low preset at 48rem, dpr + shadows + instance count), `components/CameraRig` (gentle drift + mouse parallax, reduced-motion safe), `components/StudioLighting` (ambient + hemisphere + warm key with soft shadow), `components/ArchitecturalVolumes` (instanced stone massing model, 1 draw call; 14 volumes desktop / 8 mobile), `scenes/HeroCanvas` (Canvas, dpr clamp, offscreen pause via IntersectionObserver), `scenes/HeroScene` (progressive-enhancement gate + `next/dynamic` `ssr:false`). Installed `three@0.185.1`, `@react-three/fiber@9.7.0`, `@types/three` (drei intentionally omitted — no HDR/model assets, bundle discipline). Re-aligned the `sharp` `overrides` entry to `^0.35.3` (npm 11 rejects overrides that differ from the direct dependency). Scene palette added to `src/config/theme.ts` (theme-adaptive, matching the existing JS token mirror pattern). Fixed a pre-existing type error in `TextReveal` (polymorphic `as: ElementType` + ref does not typecheck under React 19 types — switched to `createElement` + `HTMLElementType`). Verified: typecheck, eslint, prettier, and production build pass (32 routes); the ~868 KB three/fiber chunk is absent from every route's eager manifest (lazy, client-only, homepage-gated) and the SSR home page contains no `<canvas>` (progressive enhancement holds with WebGL off / reduced motion). Remaining in the phase: Scroll Integration + final performance audit.

**2026-08-01:** Backlog-completion session — resolved the last high item and all remaining low items from `docs/29-known-issues.md`. Generated 32 deterministic placeholder JPEGs into `public/images/**` via new `scripts/generate-placeholder-images.mjs` (`npm run generate:images`; scans `src/content/**` for image paths, seeded gradient + vignette, idempotent). Tokenized hardcoded values: new `--aspect-*` theme tokens (`aspect-hero/landscape/standard/portrait`), `--header-height`, `--micro-lift`, `--micro-scale`; replaced `aspect-[*]`, `h-16`/`pt-16`, `min-h-[6rem]`, `hover:-translate-y-1`, `scale-[1.04]`; removed dead `motion.durations`/`motion.easing`; theme color sourced from new `src/config/theme.ts`. Implemented dark mode (ADR-020): `.dark` palette in `tokens.css`, `html.dark { color-scheme: dark; }`, inline pre-hydration script + `suppressHydrationWarning`, `ThemeProvider`/`useTheme`, Header Sun/Moon toggle, viewport themeColor for both schemes. Discovered + documented that CSS `@media` conditions cannot consume `var(--breakpoint-*)` (build-rejected) — media queries keep literals (ADR-021). typecheck + lint + prettier + build pass (32 routes). Backlog now empty.

**2026-08-01:** Medium-backlog resolution session — resolved all 12 medium items from `docs/29-known-issues.md`. Fixed reduced-motion first-paint flash (`useSyncExternalStore`); tokenized stagger defaults; wired `ScrollTrigger.refresh()` (Image `onLoad`, route change, Lenis init); rewrote the Lenis provider on `gsap.ticker`; extracted all copy into `src/content/` (`ui`, `pages`, footer, form, section headings) and gave homepage journal previews real slugs; extracted shared primitives (`Grid`, `FilterChips`, `Field`, `StatePanel`, `useDialog`) and reused `ProjectCard`/`JournalCard`; fixed nested `<Link><Button>`; ran a systematic a11y pass (skip link, focus traps, Tabs/Accordion/Carousel ARIA, mobile menu, `aria-pressed`, form alerts, office-map role, contrast); implemented the broken CSS utilities; removed dead code/exports/barrels/scaffold dirs and the theme/design-system stubs; synced route/config drift (`not-found.tsx`, prefix-matched nav, `home` active); unified content models (shared `SocialLink`/`Location`, content barrel, garbled copy fixed); aligned `.env.example` to port 8000 and hardened `PageTransition` cleanup. typecheck + lint + prettier + build pass (32 routes). Backlog now: 🟠 1 high (photography) + 🟢 3 low.

**2026-08-01:** Phase 14 (Motion) core built — GSAP provider registers CustomEase from design-system motion tokens (ease-standard/emphasized/cinematic); new `src/motion/` primitives (Reveal, Stagger, TextReveal, ImageReveal, Parallax, useReducedMotion, useScopedGsap) all reduced-motion aware and driven by tokens; PageTransition pathname fade, NavigationMenu active indicator, tokenized hover micro-interactions (transition-micro, link-underline, image zoom). Wired across homepage, projects, services, studio, process, journal, contact, careers including slug pages. Custom cursor + fake loading experience intentionally skipped per docs/08. typecheck + lint + production build pass (28 static routes). Real photography assets still pending client media.

**2026-07-31:** Phase 13 (Media Infrastructure) core built — Image component now consumes the ImageAsset model with a graceful placeholder fallback for missing assets, wired across projects, studio, journal, homepage, and process supporting visuals. Local media directories created (`public/images/<area>`). Lint debt cleaned (0 errors), useSearchParams prerender error fixed, production build passes (28 static routes). Real photography + video pipeline deferred.

**2026-07-31:** ADR-019 approved — Version 1.0 ships with static content (no CMS). Phase 12 (CMS) and Cloudinary/Video Delivery removed from v1 scope. Next: Phase 13 — Media Infrastructure.

**2026-07-31:** Phase 11 (Contact) built — ContactInformation and CareerPosition content models, contact page with form and studio info, careers page with positions and benefits, OfficeMap placeholder. Routes config updated. Real map + form backend deferred.

**2026-07-31:** Phase 10 (Journal) built — JournalArticle content model with 6 articles, FeaturedArticle/JournalCard/JournalGrid/CategoryFilter components, listing page with URL-based category filtering, and article detail pages with related articles. Routes config updated. Search and Newsletter deferred.

**2026-07-31:** Phase 9 (Process) built — ProcessStep content model with 6 steps, ProcessTimeline + ProcessStep components, and process page with numbered vertical timeline. Supporting visuals deferred. Routes config updated.

**2026-07-31:** Phase 8 (Services) built — Service content model with 6 services, ServiceCard/ServicesGrid components, listing page, and detail pages with related project links. Routes config updated. Process Integration deferred to Phase 9.

**2026-07-31:** Phase 7 (Studio) built — Studio content model with data, 6 feature components (StudioIntroduction, Philosophy, TeamGrid, Awards, Timeline, Partners), and Studio page assembling all sections. Routes config updated. Images use placeholder divs (deferred to Phase 13).

**2026-07-31:** Phase 6 (Projects) built — content data layer with 6 projects, ProjectCard/Grid/Filter/Gallery/Metadata/Navigation/RelatedProjects components, listing page with URL-based category filtering, detail page with story/metadata/gallery/nav/related. Homepage FeaturedProjects updated to consume real project data. Routes config updated. Self-review fixes applied: added `id` field to Project, refactored listing to server component with searchParams, added `noPadding` to Section, removed unused imports. Image placeholders deferred to Phase 13 (Media Infrastructure).

**2026-07-31:** Phase 5 (Homepage) core sections built — Hero, Featured Projects, Studio Preview, Services Preview, Process Preview, Journal Preview, Contact CTA. Content data separated into `src/content/home/index.ts`. Each section is a standalone component in `src/features/home/`. All sections assembled in `src/app/(site)/page.tsx`. Homepage Motion deferred to Phase 14. Footer Integration deferred to Phase 3 completion (global Loader + Navigation Indicator also deferred to Phase 14).

**2026-07-29:** Fonts configured via `next/font/google` (Manrope + Inter) with CSS variable names `--font-manrope` and `--font-inter`. This enables the design system tokens declared in `src/styles/tokens.css`. General Sans (used in `--font-display`) requires self-hosting and is deferred.

**2026-07-29:** Global providers configured. GSAP provider registers ScrollTrigger plugin. Lenis provider initializes smooth scroll, syncs with GSAP ScrollTrigger, and provides the Lenis instance via React context for use by hooks like `useLenis`. Phase 1 and Phase 2 are now complete.

**2026-09-10:** Fixed project card typology truncation on real mobile phones. Removed `truncate` + mobile status badge from top metadata overline — typology now spans full card width. Moved `● STATUS · AREA M²` into the bottom mobile spec ledger. Commit `f5d8c65`.

**2026-09-11:** Team Dossier Modal — Responsive Bottom-Sheet & Scroll Fix. Diagnosed and resolved three compounding issues in `TeamMemberModal`: (1) Lenis smooth-scroll intercepting wheel/touch events inside the overlay (no `data-lenis-prevent`), causing apparent "stuck" scroll on laptop viewport at mobile widths; (2) incorrect scroll ownership — the outer `fixed inset-0` wrapper had `overflow-y-auto` while the inner panel had `overflow-hidden`, making content unreachable on narrow viewports; (3) no mobile UX affordance. Fix: restructured the component into a responsive adaptive layout — bottom-sheet drawer on `< md` (panel itself scrolls, no wrapper scroll needed), centred modal on `≥ md` (internal body scrollable). Added `data-lenis-prevent` on the panel, grab-handle pill on mobile, safe-area bottom padding for notched devices. TypeScript (exit 0), ESLint (exit 0), Husky pre-commit hooks — all clean. Committed `f6a2aec`, pushed to `origin/main`.

**2026-09-12:** Industrial Editorial Cron Email Dispatcher. Upgraded `/api/cron/editorial-reminder` from a silent JSON logging endpoint into an automated, architectural email notification system. Replaced heavy `getArticles()` full-dataset query with `latestPublishedArticleQuery` (ultra-lightweight 3-field projection). Integrated Resend email delivery with `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. Created museum-grade architectural email template generator (`src/lib/email/editorial-reminder-template.ts`) supporting both branded dark-mode HTML and plain-text fallback with direct Sanity Studio CTA links (`/admin/structure/journalArticle`). Implemented dynamic recipient resolution from Sanity CMS `contactInformation.email` (with env and static fallbacks). Added diagnostic parameters `?force=true` and `?dryRun=true` for non-destructive operational testing. TypeScript (exit 0), ESLint (exit 0).

**2026-09-19:** Sanity Project Dynamic Typologies, Categories & Services Tags Upgrade. Resolved Studio validation errors (`Value did not match any allowed values`). Converted all three project classification tag fields (`typology`, `category`, and `services`) in `src/sanity/schemas/project.ts` from restrictive static whitelists into open, dynamic tag inputs (`options: { layout: "tags" }`). Editors can now freely add any architectural classification or discipline (e.g., "exhibition-design", "sustainable-design", "villa", "heritage", "co-living") by typing and pressing Enter. Extended `ProjectCategory` in `src/content/projects/index.ts` with extensible string union `| (string & {})` for zero TypeScript errors while keeping IDE autocompletion for core disciplines. Cleaned up `drafts.largo-gallery` with `typology: ["cultural"]`. TypeScript (exit 0), ESLint (exit 0).

**2026-09-19:** Dynamic Contact Project Types from Categories & Sanity Contact Cleanup. Decoupled the Contact Form discipline selector from static CMS lists. Removed the manual `projectTypes` string array from `src/sanity/schemas/contact.ts`, query projections in `src/sanity/lib/queries.ts`, and unset the legacy field on the remote Sanity `contact` singleton. Built an architectural category mapping and sorting engine (`src/lib/contact/project-types.ts`) that standardizes category slugs to presentation titles, orders disciplines according to studio priority, anchors `"Other"` permanently as the closing option, and provides a curated fallback if no projects exist. Contact page (`/contact`) now fetches active project categories via `getActiveCategories()` concurrently with contact info and intros, passing dynamic options to `ContactForm`. Elevated the selector UI with accessible radiogroup semantics (`role="radiogroup"`, `role="radio"`, `aria-checked`), keyboard focus rings, and comfortable 38px+ touch targets. TypeScript (exit 0), ESLint (exit 0), Production build (exit 0, 33 routes).

**2026-09-19:** Homepage Follow Rail & Navigation CMS Social Unification. Removed the automatic primary email injection from both the desktop animated "FOLLOW" rail (`src/features/landing/LandingSocialStrip.tsx`) and the mobile landing strip (`src/features/landing/landing.tsx`). The homepage now renders strictly the curated social channels managed in Sanity Studio (`09 // Contact Page` -> `03 // Social`), eliminating the raw 23-character email address (`RAFADESIGNHUB@GMAIL.COM`) that created visual clash with editorial labels. Added mailto protocol detection across the homepage strip, `Footer.tsx`, and `fullscreen-navigation.tsx` so mail links do not spawn unwanted blank browser tabs. TypeScript (exit 0), ESLint (exit 0).

**2026-09-19:** Dark Mode Brand Logo Inversion & Theme Synchronization Fix. Resolved race condition causing hero logo to render black on reload in dark mode. Created `.logo-theme-invert` in `src/styles/utilities.css` which mirrors the `:root:not(.light)` media query rule in pure CSS, guaranteeing that whenever the background is black, the logo is permanently white without relying on runtime JavaScript timing. Enhanced `src/providers/theme-provider.tsx` with mount assertion `useEffect`, an immediate subscription assertion check, and a fallback `getInitialTheme()` snapshot resolver so `ThemeToggle` (`useTheme()`) is always in sync with OS or user preference. TypeScript (exit 0), ESLint (exit 0).

**2026-09-19:** Sanity CLI Transitive Security Advisory 1239030 Resolution. Resolved CI/CD security audit alert for advisory 1239030 (`adm-zip: Uncontrolled memory allocation via the declared uncompressed size (DoS)`). Analyzed dependency hierarchy and verified that `adm-zip` is solely pulled as a nested transitive build tool dependency by Sanity Studio's CLI toolchain (`next-sanity > sanity > @sanity/cli > @sanity/runtime-cli > adm-zip` and `sanity > @sanity/cli > @sanity/runtime-cli > adm-zip`) with zero runtime exposure in production browser bundles. Scoped the resolution in `audit-resolve.json` via `npm-audit-resolver` (`check-audit`), maintaining dependency stability and preventing destructive force downgrades of Sanity Studio core packages. `npm run audit` now exits cleanly with code 0 (`audit ok.`).

**2026-09-20:** Industrial Intro Splash Screen Upgrade. Transformed the homepage intro splash into a museum-grade architectural monograph reveal. Resolved three critical defects: (1) **Premature Line Flash:** Set initial CSS on the drafting hairline to `scale-x-0 opacity-0`, ensuring the initial `"cover"` phase is a clean, monolithic background tone (`bg-background`) without stray elements. (2) **Zero-Flicker Reload Gating:** Added an inline pre-paint script checking `sessionStorage.getItem("rafa-splash-played") === "1"` in `src/app/layout.tsx` that immediately injects `.splash-skip` onto `<html>` before frame 0 paint, coupled with `html.splash-skip [data-splash-screen] { display: none !important; }` in `src/styles/utilities.css` and immediate state initialization in `SplashProvider.tsx`, guaranteeing instant, zero-flash page paints on refresh. (3) **Decoupled Pacing & Dwell Time:** Replaced blocking `window load` with non-blocking typography readiness (`document.fonts?.ready`), enabling prompt playback while background images load silently underneath the curtain. Injected dynamic studio name from `useSiteConfig()` and Kigali coordinates/address specification from `useContact()`. Added an editorial dwell time hold (~0.65s pause) before curtain elevation (`yPercent: -100` over 0.65s with `cubic-bezier(0.77, 0, 0.175, 1)`), ensuring viewers comfortably absorb the studio identity and specifications. Verified: TypeScript 0 errors, ESLint 0 errors, full production build 33 static routes, `check-audit` passes.

**2026-09-11:** Video Architecture Upgrade & Hardcoded Asset Removal. Removed static `public/videos/rafa-video.mp4` and `introVideo` from `site.ts`. Implemented native Sanity file-upload video infrastructure: (1) `project` schema `heroVideo` field + desktop card hover video preview on `ProjectCard` and `FeaturedProjectCard` with seamless opacity cross-fade; (2) `ProjectHeroParallax` ambient video loop with accessible play/pause & mute controls and cinematography credit; (3) `project` schema mixed `gallery` supporting `galleryVideo` plates with poster frames, narrative, intent tags, full-bleed presentation, and `ProjectLightbox` video playback; (4) `studio` schema `atelierVideo` field + dedicated `StudioFilm` component on `/studio`; (5) `journal` schema video block upgraded with direct file upload alongside URL embed. Verified with TypeScript, ESLint, and production build (34 routes).

---

# Definition of Complete

A phase is considered complete only when:

- ✅ Every task within the phase is complete.
- ✅ Documentation is up to date.
- ✅ Responsive behavior is verified.
- ✅ Accessibility requirements are satisfied.
- ✅ Performance has been reviewed.
- ✅ Code is production-ready.
- ✅ The next phase can begin without refactoring.

This tracker should always represent the actual state of the project.
