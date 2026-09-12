# Release Notes

> This document records the evolution of the RAFA Design platform.
>
> Every development session should end with an update to this document.
>
> The purpose is to provide a chronological history of the project so that any developer or AI assistant can immediately understand what changed, why it changed, and what should happen next.
>
> Unlike the Implementation Tracker, this document is historical and should never be rewritten. New entries are always added to the top.

# 2026-09-12 (Industrial Editorial Cron Email Dispatcher)

## Version

0.16.15-alpha

## Summary

Upgraded the platform's monthly editorial inactivity cron monitor (`/api/cron/editorial-reminder`) from a silent JSON logging endpoint into a production-grade, automated email dispatcher. When the RAFA Journal archive experiences 6+ months (>= 180 days) of inactivity, the system now automatically dispatches a museum-grade architectural email notification to the studio curation team via Resend. The query layer was optimized from a heavy full-dataset fetch (`getArticles()`) to a microsecond 3-field projection (`latestPublishedArticleQuery`).

## Changes

### `src/lib/email/editorial-reminder-template.ts`

- **NEW**: Created architectural email template generator producing high-contrast, branded HTML and plain-text fallback.
- Design: Architectural monochrome dark palette (`#0d0d0d` background, `#141414` container, `#282828` hairline borders, `#f0f0f0` typography).
- Editorial Ledger: Formatted table documenting latest published story title, publication date, elapsed duration (`diffInDays` / `diffInMonths`), and studio policy cadence goal (6 months).
- Action CTAs: Direct buttons to compose a new story in Sanity Studio (`/admin/structure/journalArticle`) and browse the public archive (`/journal`).

### `src/sanity/lib/queries.ts`

- Added `latestPublishedArticleQuery`: Targets the single latest published document (`!(_id in path("drafts.**")) && defined(publishedAt)`), retrieving only `_id`, `title`, `slug`, and `publishedAt`. Replaces previous `getArticles()` call that loaded entire article payloads with all image projections.

### `src/app/api/cron/editorial-reminder/route.ts`

- Wired `latestPublishedArticleQuery` with dynamic `revalidate: 0` client fetch.
- Dynamic recipient resolution: queries live Sanity `contactInformation.email`, falling back to `EDITORIAL_NOTIFICATION_EMAIL` env var or static config.
- Resend integration: uses existing `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. Gracefully degrades with diagnostic error messaging if the API key is not configured.
- Added test flags: `?force=true` (forces alert generation for immediate testing) and `?dryRun=true` (renders payload without dispatching via Resend).
- Compliant with TypeScript `exactOptionalPropertyTypes: true`.

## Verification

- `npx tsc --noEmit` — exit code 0
- `npx eslint src/app/api/cron/editorial-reminder/route.ts src/lib/email/editorial-reminder-template.ts src/sanity/lib/queries.ts` — exit code 0

---

# 2026-09-11 (Team Dossier Modal — Responsive Bottom-Sheet & Scroll Fix)

## Version

0.16.14-alpha

## Summary

Fixed the Team Member Dossier modal on `/studio` which appeared "stuck" and non-scrollable when the browser viewport was sized to mobile/tablet widths (laptop dev-tools responsive mode). Three root causes were identified and resolved: (1) Missing `data-lenis-prevent` attribute — Lenis smooth-scroll was intercepting all wheel/touch events inside the overlay, making it impossible to scroll the panel content; (2) Incorrect scroll ownership — the outer `fixed inset-0` wrapper held `overflow-y-auto` while the inner panel had `overflow-hidden`, producing content that was clipped and unreachable on any viewport narrower than the full panel height; (3) No mobile UX pattern — the centred modal treated all viewports identically with no affordance for small screens.

## Changes

### `src/features/studio/team-member-modal.tsx`

- Restructured into a **responsive adaptive layout**: bottom-sheet drawer on `< md` breakpoint, centred modal on `≥ md`
- On mobile/tablet: panel is `fixed inset-x-0 bottom-0 max-h-[96dvh] overflow-y-auto rounded-t-xl` — the sheet itself scrolls, the backdrop remains separate
- On desktop: `fixed inset-0 m-auto h-fit max-h-[88vh] flex-col overflow-hidden` — inner body is the only scrollable zone
- Added `data-lenis-prevent` on the panel element to prevent Lenis hijacking scroll inside the modal
- Added a **drag-handle pill** (mobile-only) above the header bar — the universal iOS/Android bottom-sheet affordance
- Added `h-safe-bottom` bottom padding inside the body to clear home-indicator notch on iOS/Android
- Removed the old single-wrapper `overflow-y-auto flex items-center` centring approach that caused the regression
- Separated the backdrop scrim into its own sibling element (no longer inside the scroll wrapper)

## Verification

- `npx tsc --noEmit` — exit 0
- `npx eslint src/features/studio/team-member-modal.tsx` — exit 0
- Husky / lint-staged pre-commit — passed
- Commit `f6a2aec` pushed to `origin/main`

---

# 2026-09-11 (Video Architecture Upgrade & Hardcoded Video Cleanup)

## Version

0.16.13-alpha

## Summary

Removed static hardcoded intro video asset (`public/videos/rafa-video.mp4` and `introVideo` in `site.ts`) from the repository. Implemented complete industrial, dynamic video upload infrastructure across Sanity CMS and the frontend: (1) Project monograph hero video upload with desktop card hover video preview loops on `ProjectCard` and `FeaturedProjectCard`; (2) Ambient monograph hero video layer in `ProjectHeroParallax` with accessible play/pause & mute controls and cinematography credit; (3) Project gallery mixed-media support for `galleryVideo` plates with poster frames, narrative, intent tags, full-bleed presentation, and `ProjectLightbox` video playback; (4) Studio atelier film (`atelierVideo`) in Sanity schema + dedicated `StudioFilm` component on `/studio`; (5) Journal Portable Text video block upgraded with direct file upload alongside URL embeds.

## What Changed

- Deleted `public/videos/rafa-video.mp4` (removed ~4MB static binary).
- `src/config/site.ts`: Removed `introVideo` property.
- `src/sanity/schemas/project.ts`:
  - Added `heroVideo` file field to group `04 // Photography & Media`.
  - Updated `gallery` array schema with `galleryVideo` object type (video file asset, poster image, caption, credit, narrative, intent, fullBleed).
- `src/sanity/schemas/studio.ts`:
  - Added `atelierVideo` file field to group `03 // Media` with poster frame, caption, and cinematography credit.
- `src/sanity/schemas/journal.ts`:
  - Added `videoFile` file upload field to the Portable Text video block; customized validation so either an uploaded video file or an external URL satisfies the block.
- `src/sanity/lib/queries.ts`:
  - Added `videoProjection` and `galleryMediaProjection`.
  - Updated `projectsQuery`, `projectBySlugQuery`, and `projectsBySlugQuery` to project `heroVideo` and mixed gallery plates.
  - Updated `studioQuery` to project `atelierVideo`.
  - Updated `articleBySlugQuery` to project uploaded `videoFile.asset`.
- `src/sanity/lib/transforms.ts`:
  - Updated `transformSanityProject` to map `heroVideo` and mixed gallery items (images or video plates).
  - Updated `transformSanityStudio` to map `atelierVideo`.
- `src/content/projects/index.ts`:
  - Added `ProjectHeroVideo`, `ProjectGalleryVideo`, `ProjectGalleryMedia` types.
  - Updated `Project` interface with `heroVideo?: ProjectHeroVideo` and `gallery: (ChapterImage | ProjectGalleryVideo)[]`.
- `src/content/studio/index.ts`:
  - Added `StudioVideo` interface and `atelierVideo?: StudioVideo` to `Studio`.
- `src/features/projects/project-card.tsx`:
  - Converted to `"use client"`. Added silent desktop hover video preview loop with smooth opacity cross-fade when `project.heroVideo` exists.
- `src/features/projects/featured-project-card.tsx`:
  - Added desktop hover video preview loop with smooth cross-fade.
- `src/features/projects/project-hero-parallax.tsx`:
  - Renders ambient video loop in parallax hero layer with poster fallback. Added accessible PLAY/PAUSE and SOUND ON/MUTED controls + cinematography credit.
- `src/app/(site)/projects/[slug]/page.tsx`:
  - Passed `heroVideo={project.heroVideo}` to `ProjectHeroParallax`.
- `src/features/projects/project-gallery.tsx`:
  - Added rendering for `ProjectGalleryVideo` plates in both full-bleed and standard column layouts with intent tags, narrative, caption, and credit.
- `src/features/projects/project-lightbox.tsx`:
  - Discriminated video items in lightbox and rendered `<video>` with native controls and autoplay.
- `src/features/studio/studio-film.tsx`:
  - New component rendering the optional Atelier Film monograph essay with poster frame, custom layout, caption, and credit.
- `src/app/(site)/studio/page.tsx`:
  - Rendered `StudioFilm` section when `studio.atelierVideo` is uploaded.
- `src/components/journal/portable-text.tsx`:
  - Upgraded `VideoBlock` to render native `<video>` tag for direct uploaded Sanity CDN video files.
- `src/config/schema.ts` & `src/app/(site)/services/[slug]/page.tsx`:
  - Updated image extraction to safely narrow and handle video posters.

---

# 2026-09-10 (Mobile Project Card Typology Fix)

## Version

0.16.12-alpha

## Summary

Fixed a UX bug on real mobile phones (360–390px viewport) where the project card typology label (`ADAPTIVE REUSE`, `RESIDENTIAL`, etc.) was being truncated to `ADAPT...` because the metadata overline tried to fit both the location/year/typology string and the `● COMPLETED` status badge on the same line. Typology now always renders in full. Status info is relocated to the bottom spec ledger.

## What Changed

- `src/features/projects/project-card.tsx`:
  - Removed `truncate` CSS class and the flex `justify-between` layout from the top metadata overline row.
  - Removed the mobile `● STATUS` badge from the top row entirely.
  - Typology text now occupies 100% of the card width and wraps naturally on narrow screens.
  - Bottom mobile spec ledger updated: left side now shows `● STATUS · AREA M²` (status dot + label + area in one group), right side retains `Explore Monograph →`.

## Motivation

On real 360–390px phones the status badge was ~85px wide, leaving only ~240px for the metadata string. With projects like "PORTO, PORTUGAL · 2024 · ADAPTIVE REUSE" that exceeded this budget, `truncate` silently clipped the typology — producing `ADAPT...`. This is inconsistent with industrial/museum-grade quality standards. The fix gives typology a full-width line.

---

# 2026-09-10 (Zero-Flash System Theme Persistence & Background Restoration)

## Version

0.16.11-alpha

## Summary

Implemented a bulletproof, zero-flash theme persistence architecture ensuring that the active theme (whether from OS system preference or manual user toggle) is synchronously applied to the document root and background before initial paint on every reload. Moved the theme initialization script directly into `<head>` as an inline synchronous script, added native CSS `@media (prefers-color-scheme: dark)` token overrides in `tokens.css`, synchronized `document.documentElement.style.colorScheme` and `.light` / `.dark` classes in `ThemeProvider`, and wired dynamic live listening for OS theme changes when no manual override exists.

## What Changed

- `src/app/layout.tsx`:
  - Moved `themeScript` into `<head>` as a synchronous inline `<script id="theme-init">`, executing before the browser parses `<body>` and eliminating all white flashes on page reload.
  - Script now sets both `.dark` / `.light` classes and `document.documentElement.style.colorScheme` immediately.
- `src/styles/tokens.css`:
  - Added `@media (prefers-color-scheme: dark) { :root:not(.light) { ... } }` brand palette fallback so system dark mode colors apply natively at the stylesheet level before script evaluation.
- `src/providers/theme-provider.tsx`:
  - `toggleTheme`: synchronizes `.dark`, `.light`, and `style.colorScheme` on `document.documentElement`.
  - `subscribeToTheme`: added a live listener on `window.matchMedia("(prefers-color-scheme: dark)")` that updates the site in real-time if the user changes their OS theme while browsing (when no manual override is saved).

## Verification

- `npm run typecheck` — exit 0
- `npm run lint` — exit 0
- `npm run format:check` — exit 0
- `npm run build` — exit 0, all 34 routes compiled cleanly

---

# 2026-09-10 (Micro-Typography Utility Fix & Featured Project Card Layout Restoration)

## Version

0.16.10-alpha

## Summary

Diagnosed and resolved the root cause of enlarged micro-text and broken layout in the Projects Archive featured commission card. In Tailwind CSS v4, `--font-size-*` in `@theme` does not generate `text-*` utilities, causing `text-overline`, `text-micro`, and `text-label` to be omitted from the compiled CSS (defaulting to 16px). Concurrently, custom `--spacing-*` tokens in `@theme` caused Tailwind to map `max-w-lg` to `--spacing-lg` (32px) and `max-w-3xl` to `--spacing-3xl` (96px), squeezing the featured project title and subtitle into narrow vertical columns that expanded upwards and overlapped the top badge. Fixed by renaming `@theme` variables to `--text-*`, adding dedicated `@utility` declarations in `utilities.css`, enforcing container widths on `max-w-*`, and upgrading `FeaturedProjectCard` to design-system `aspect-hero` (`21/9`) with a safe minimum height.

## What Changed

- `src/styles/tokens.css`:
  - Renamed `@theme` typography keys from `--font-size-*` to `--text-overline: 0.625rem`, `--text-micro: 0.5625rem`, `--text-label: 0.6875rem` so Tailwind v4 recognizes them as font-size utilities.
- `src/styles/utilities.css`:
  - Added explicit `@utility text-overline`, `@utility text-micro`, and `@utility text-label` rules with corresponding line-heights.
  - Added explicit container `.max-w-*` rules mapping `max-w-xs` through `max-w-4xl` to their respective `--container-*` design tokens (`!important`), preventing Tailwind v4 from overriding them with spacing tokens.
- `src/features/projects/featured-project-card.tsx`:
  - Updated title to `max-w-(--container-3xl)` and subtitle to `max-w-(--container-lg)`.
  - Replaced cramped arbitrary `lg:aspect-[3/1]` with design-system `aspect-hero` (`md:aspect-[21/9]`) and safe responsive minimum heights (`min-h-[360px] sm:min-h-[420px] md:min-h-[460px]`), ensuring ample breathing room between photography, badge, and copy on all viewports.

## Verification

- `npm run typecheck` — exit 0
- `npm run lint` — exit 0
- `npm run format:check` — exit 0
- `npm run build` — exit 0, all 34 routes compiled cleanly
- CSS verification: confirmed `.text-overline{font-size:.625rem}`, `.text-micro{font-size:.5625rem}`, and `.max-w-lg{max-width:var(--container-lg)!important}` are present in compiled output.

---

# 2026-09-10 (System-wide Typography Harmonization & Micro-Scale Tokenization)

## Version

0.16.9-alpha

## Summary

Completed an exhaustive, page-by-page audit and architectural harmonization of the site-wide typography. Validated Century Gothic Paneuropean as the client's singular, unified identity typeface across both display headings and body text, updating design system documentation to match production reality. Eliminated all hardcoded arbitrary micro-text sizes (`text-[10px]`, `text-[9px]`, `text-[11px]`) across 73 components by establishing named design tokens in `tokens.css`: `text-overline` (10px), `text-micro` (9px), and `text-label` (11px). Fixed the oversized heading in Careers `PositionCard` and restored semantic `font-display` to the primary navigation index.

## What Changed

- `Design System & Documentation` (`docs/04-design-system.md`, `src/styles/tokens.css`):
  - Updated typeface documentation from legacy General Sans + Manrope to the intentional client choice: Century Gothic Paneuropean across display and body roles, with monospace reserved for machine-precision data and specifications.
  - Defined named micro-scale typography tokens in `@theme`:
    - `--font-size-overline: 0.625rem` (`text-overline`, 10px) — section overlines, architectural ledgers, specification table labels.
    - `--font-size-micro: 0.5625rem` (`text-micro`, 9px) — image overlays, hover badges, micro status indicators.
    - `--font-size-label: 0.6875rem` (`text-label`, 11px) — gallery captions, timeline entries, tag pills.
- `Careers Position Card` (`src/features/careers/position-card.tsx`):
  - Replaced oversized `Heading variant="h3"` (which clamped to 32–56px) with semantic `Tag` using `className="font-display text-xl font-medium tracking-tight"`, matching the card heading standard in `ProjectCard` and `JournalCard`.
- `Primary Navigation Index` (`src/features/navigation/primary-nav-index.tsx`):
  - Added explicit `font-display` to `data-nav-index-title` to ensure semantic adherence to the design system.
- `Codebase-wide Tokenization` (73 files across `src/features/`, `src/components/`, `src/app/`):
  - Replaced all raw `text-[10px]` instances with `text-overline`.
  - Replaced all raw `text-[9px]` instances with `text-micro`.
  - Replaced all raw `text-[11px]` instances with `text-label`.

## Verification

- `npm run typecheck` — exit 0
- `npm run lint` — exit 0
- `npm run format:check` — exit 0
- `npm run build` — exit 0, all 34 routes compiled cleanly

---

# 2026-09-10 (Homepage Supporting Practice Navigation Elevation)

## Version

0.16.8-alpha

## Summary

Elevated the Studio Index homepage (`/`) by adding quiet secondary architectural navigation directly underneath the primary `01–06` rail for `Careers` (with live Sanity active role count badge) and `Sustainability`. Eliminates discoverability friction for talent and institutional clients while strictly preserving the pristine, minimalist monograph cover aesthetic and avoiding redundant menu-in-menu popups.

## What Changed

- `Landing` (`src/features/landing/landing.tsx`):
  - Added `data-landing-supporting` secondary practice links directly under the primary `01–06` monograph index.
  - Sourced from `supportingNavLinks` (`Careers`, `Sustainability`).
  - Integrated dynamic `careersCount` badge from `useNavigation()`.
  - Added entrance animation step into GSAP timeline (`-=0.1` after primary nav).
  - Mobile architecture: positioned supporting links directly above external social channels, separated by a delicate `border-border/20` hairline rule for crisp structural hierarchy.

## Verification

- `npm run typecheck` — exit 0
- `npm run lint` — exit 0
- `npm run format:check` — exit 0
- `npm run build` — exit 0, all 34 routes compiled cleanly

---

# 2026-09-10 (Editorial Footer & Navigation Live Sanity Data Elevation)

## Version

0.16.7-alpha

## Summary

Complete industrial elevation of the Editorial Footer, Fullscreen Navigation Menu, and search ecosystem. Eliminated all hardcoded location strings, decoupled static content arrays from client UI components, and connected services/disciplines, careers count, and the site-wide search index directly to live Sanity CMS data via unified server layout fetching and React Context providers.

## What Changed

- `ServicesContext` & `ServicesProvider` (`src/features/services/services-context.ts`, `services-provider.tsx`):
  - Created a new React context pattern mirroring `ContactProvider` and `SiteConfigProvider`.
  - Injects live Sanity disciplines fetched via `getServices()` from `@/sanity/lib` into client surfaces, with seamless fallback to static `getServices()` when CMS is unreachable.
- `SearchIndexContext` & `SearchIndexProvider` (`src/features/navigation/search-index-context.ts`, `search-index-provider.tsx`):
  - Injects a server-built live search index across all published projects, services, and journal articles directly into client search components.
- `search-index.ts` (`src/features/navigation/search-index.ts`):
  - Refactored from a static module-level evaluation into a pure factory (`buildSearchIndex(projects, services, articles)`) and search executor (`searchContent(query, index)`). Eliminates static content capture at build time.
- `NavigationContext` & `NavigationProvider` (`src/features/navigation/navigation-context.ts`, `navigation-provider.tsx`):
  - Added `careersCount: number` to the navigation context value, passed down as a prop from server layout.
- `(site)/layout.tsx`:
  - Upgraded root site layout to resolve all site-wide entities concurrently via `Promise.all([getSiteConfig(), getContactInformation(), getServices(), getCareers(), getProjects(), getArticles()])`.
  - Builds the dynamic `searchIndex` server-side once and mounts `ServicesProvider`, `SearchIndexProvider`, and `NavigationProvider` with live data. Zero client-side network roundtrips.
- `Footer` (`src/components/layout/Footer.tsx`):
  - Dynamic studio location: replaced the hardcoded `"KIGALI, RWANDA"` string with dynamic primary office city and country (`offices[0].city, offices[0].country`), falling back to `contactInformation.address`.
  - Disciplines column: consumes live Sanity services via `useServices()`.
  - Careers badge: consumes live Sanity active role count via `useNavigation().careersCount`.
- `FullscreenNavigation` (`src/features/navigation/fullscreen-navigation.tsx`):
  - Disciplines column: consumes live Sanity services via `useServices()`.
  - Careers badge: consumes live Sanity active role count via `useNavigation().careersCount`.
- `MenuSearch` (`src/features/navigation/menu-search.tsx`):
  - Consumes live server-built index via `useSearchIndex()`.

## Verification

- `npm run typecheck` — exit 0
- `npm run lint` — exit 0
- `npm run format:check` — exit 0
- `npm run build` — exit 0, all 34 routes compiled cleanly

---

# 2026-09-10 (Fullscreen Navigation Careers Alignment & HiringBanner Pruning)

## Version

0.16.6-alpha

## Summary

Aligned the Fullscreen Navigation Menu with the Editorial Footer by adding an active position count badge to the Careers link when open roles exist, matching the architectural design of the studio directory. Pruned the unused `HiringBanner` component to eliminate dead code and preserve the studio's restraint against intrusive pop-ups and retail banners.

## What Changed

- `FullscreenNavigation` (`src/features/navigation/fullscreen-navigation.tsx`):
  - Imported `careerPositions` from `@/content/company/careers`.
  - Added an active position count badge (`({careerPositions.length})`) beside `Careers` in the Directory column when positions exist (`careerPositions.length > 0`), maintaining 100% typographic consistency with the Footer.
  - When there are 0 openings, seamlessly displays plain `Careers` without a badge.
- `HiringBanner` (`src/features/careers/hiring-banner.tsx`):
  - Deleted the unused component completely.

## Verification

- `npm run typecheck` — exit 0
- `npm run lint` — exit 0
- `npm run format:check` — exit 0
- `npm run build` — exit 0, all 34 routes compiled cleanly

---

# 2026-09-10 (Site Settings Ecosystem & Museum-Grade Maintenance Elevation)

## Version

0.16.5-alpha

## Summary

Complete industrial elevation of the Site Settings ecosystem across all 8 architectural touchpoints. Created a dedicated museum-grade `MaintenanceScreen` component, resolved OpenGraph and Twitter default image omissions in `seo.ts`, made dynamic OG route generators strictly monochromatic and dynamic via `getSiteConfig()`, updated JSON-LD schemas (`organizationSchema`, `websiteSchema`) to accept dynamic configuration, and wired dynamic canonical URLs into `sitemap.ts` and `robots.ts`.

## What Changed

- `MaintenanceScreen` (`src/components/maintenance/MaintenanceScreen.tsx`):
  - Extracted inline layout markup into a dedicated museum-grade architectural holding screen.
  - Features: top ledger with GPS coordinates (`[41.1579° N, 8.6291° W]`) and live studio time (`useStudioTime`); centered display logo mark (`Logo variant="display"`); animated pulsing status beacon (`Status // Archival Maintenance`); monumental title and custom editorial notice from Sanity; direct private commission contact fallback with interactive `mailto:` and `tel:` links; bottom ledger with legal copyright and discreet staff portal link to `/admin`.
- `(site)/layout.tsx`:
  - Upgraded to fetch `config` and `contact` concurrently using `Promise.all([getSiteConfig(), getContactInformation()])`.
  - When `config.maintenanceMode` is active, mounts `<MaintenanceScreen config={config} contact={contact} />`, while `/admin` and `/api` remain accessible.
- `src/config/seo.ts`:
  - Fixed critical bug where `config.seoDefaults?.ogImage` was not being populated into `openGraph.images` or `twitter.images`. Default social cards now reliably display the Sanity-uploaded OG asset.
- `src/app/opengraph-image.tsx` & `src/app/twitter-image.tsx`:
  - Upgraded route handlers to async functions consuming `await getSiteConfig()`.
  - Replaced legacy `#986f45` bronze circle with the monochromatic design system palette (`#fafafa` on `#0a0a0a`).
- `src/config/schema.ts`:
  - Updated `organizationSchema` and `websiteSchema` to accept dynamic `config?: SiteConfig`. Google search bots and schema indexers now receive real-time updates when studio identity or canonical URLs change in Sanity.
- `src/app/layout.tsx`:
  - Passed `config` to `organizationSchema(contact, config)` and `websiteSchema(config)`.
  - Sanitized `analyticsCode?.trim()` to prevent empty script tag injection from accidental whitespace.
- `src/app/(site)/page.tsx`:
  - Homepage `generateMetadata` now calls `createMetadata` passing `config.seoDefaults?.title ?? config.name` and `config.seoDefaults?.description ?? config.description`, ensuring homepage social cards and meta tags inherit full Sanity SEO defaults.
- `src/app/sitemap.ts` & `src/app/robots.ts`:
  - Upgraded to resolve canonical base URL dynamically via `(await getSiteConfig()).url`.

## Verification

- `npm run typecheck` — exit 0
- `npm run lint` — exit 0
- `npm run format:check` — exit 0
- `npm run build` — exit 0, all 34 routes compiled cleanly

---

# 2026-09-10 (Project Detail Monograph — Industrial UI/UX Elevation)

## Version

0.16.4-alpha

## Summary

Comprehensive UI/UX audit and elevation of the `projects/[slug]` project detail monograph page. Fixed semantic HTML errors, removed UI hierarchy violations, upgraded the BeforeAfterSlider to a real interactive drag comparison, restored backward project navigation, and polished mobile ergonomics across all 8 sub-components.

## What Changed

- `ProjectConcept`: Added `CONCEPT STATEMENT` architectural overline label (via `<Reveal>`) so the large editorial concept statement has explicit section hierarchy rather than floating anonymously after the hero.
- `ProjectMetadata`: Moved the `Specifications` overline label inside the component (co-located with the data it describes); replaced the flat `<div>` wrapper with a semantic `<dl>` element so all `<dt>`/`<dd>` spec pairs are valid HTML (accessibility win); imports `Reveal` from `@/motion` for smooth entrance.
- `page.tsx` (`/projects/[slug]`): Removed the duplicate hardcoded `<p>Specifications</p>` label that was previously orphaned in the grid column above `ProjectMetadata`; `ProjectMetadata` now owns its own overline. Always passes `prev` to `ProjectNavigation` (previously suppressed when `next` was also present).
- `ProjectNavigation`: Restored full bidirectional project navigation — NEXT remains the dominant full-width cinematic panel; PREV now renders as a quiet horizontal strip below it (`border-t border-border/20`, `← Previous · {title}`, right-aligned year+city metadata) whenever a previous project exists.
- `BeforeAfterSlider`: Upgraded from a static two-column image pair to a real interactive clip-path drag/touch comparison slider. Features: `clip-path: inset(0 X% 0 0)` clipping for the BEFORE layer; frosted circular drag handle with a `↔` SVG icon; mouse drag (`onMouseMove`), touch drag (`onTouchMove`), and keyboard (`ArrowLeft`/`ArrowRight`) support; ARIA `role="slider"` with `aria-valuenow`; respects `prefers-reduced-motion` (falls back to the original static side-by-side layout). No new dependencies.
- `ProjectChapterBlock`: Fixed the mobile intent-label wrapping bug where the separator dot `·` could be orphaned on its own line. Labels now stack vertically on mobile (`flex-col`) and sit inline on `md+` (`md:flex-row`); the dot is hidden on mobile with `hidden md:inline`.
- `ProjectGallery`: Changed container from `space-y-2xl` to `flex flex-col gap-2xl` (equivalent spacing but avoids the extra top margin that `space-y-*` adds via the `:not(:first-child)` selector, tightening the gap between the "Spatial Archive" overline and the first image); added `loading="lazy"` to contained gallery images for better page performance.
- `ProjectDrawingViewer`: Changed drawing image from `aspect-landscape object-cover` (16:9, clips drawing edges) to `aspect-[2/1] object-contain` (shows the full drawing plate without cropping); background updated to `bg-muted/30` for better contrast against the `grayscale` drawing.

## Verification

- `npm run typecheck` — exit 0
- `npm run lint` — exit 0
- `npm run format:check` — exit 0
- `npm run build` — exit 0, all 34 routes compiled

---

# 2026-09-10 (Site Settings — Single Source of Truth)

## Version

0.16.3-alpha

## Summary

The Sanity `siteSettings` singleton is now the single source of truth for global website configuration (identity, canonical URL, footer copy, maintenance, analytics) — no more hardcoded site values in components or metadata. Canonical/domain registry corrected to `https://www.rafadesignhub.com`.

## What Changed

- **`src/lib/get-site-config.ts`** (new) — `SiteConfig` interface + async `getSiteConfig()` resolving the resolved configuration from the tagged Sanity `siteSettings` fetch with a static `src/config/site.ts` fallback; exports a synchronous `fallbackSiteConfig` for non-async contexts.
- **Root `layout.tsx`** — metadata converted from static `export const metadata` to async `generateMetadata`; `createMetadata` now accepts the resolved config and drives `metadataBase` (canonical), og/twitter defaults, title/description/keywords/applicationName/authors/creator/publisher. Google Analytics gtag `<Script>`s are injected only when `siteSettings.analyticsCode` is set (Operational group).
- **`src/config/seo.ts`** — `createMetadata(overrides, config = fallbackSiteConfig)`; `metadataBase` derived from the site URL so absolute URLs (canonical, og) always point to the configured domain.
- **Home `/`** — static metadata replaced with async `generateMetadata`.
- **`SiteConfigProvider` / `useSiteConfig`** (`src/features/site/`) — client context mirroring the `useContact` pattern; server layout feeds the resolved config. `Footer` (tagline + copyright name), `Logo` (alt/aria-label, now a client component), and `SplashScreen` consume it. Footer fallback tagline remains in `src/content/footer/index.ts` (static `studio.name` removed).
- **Maintenance mode** — `(site)/layout.tsx` renders a full-screen maintenance view (studio name + optional `maintenanceMessage`) when `siteSettings.maintenanceMode` is on. Placed below the root layout so `/admin` (Studio) and API routes stay reachable to disable it. Toggling in Studio revalidates via the existing `siteSettings` cache tag — takes effect without a redeploy. Verified end-to-end against the production dataset (ON → maintenance view, OFF → normal site).
- **Contact de-duplication** — `email`/`phone` removed from the `siteSettings` schema (the now-empty "Organisation" group was dropped), `siteSettingsQuery`, `transformSanitySiteSettings`, and the `SiteSettings` content type. Contact details live exclusively in the `contact` document.
- **`scripts/remove-site-settings-contact.mjs`** (new, `npm run migrate:remove-site-settings-contact`) — unset the stored `email` (`studio@rafadesign.com`) and `phone` from the production singleton.
- **Domain correction** — the seeded `siteSettings.siteUrl` was `https://rafadesign.pt` while the real domain is `https://www.rafadesignhub.com`; corrected the production dataset value and the seed in `scripts/migrate-site-settings-to-sanity.mjs`.

## Verification

- `npm run typecheck`: 0 errors
- `npm run lint`: 0 errors (changed files)
- `npm run build`: 34 routes generated, 0 errors
- Served HTML on `localhost:8000`: `<title>` and `description` from config, `canonical` = `https://www.rafadesignhub.com`, footer tagline pulled from the CMS ("Architecture & Interior Design // Porto"), no gtag markup emitted when `analyticsCode` is unset, maintenance gate toggled ON/OFF through the real `/api/revalidate` flow.

---

# 2026-09-10 (Projects Mobile UI/UX Elevation)

## Version

0.16.2-alpha

## Summary

Elevated mobile responsiveness, touch-screen ergonomics, and visual hierarchy across the Projects Archive ecosystem (`FeaturedProjectCard`, `ProjectCard`, and `ProjectsArchive`).

## What Changed

- `FeaturedProjectCard`:
  - Upgraded overshadowed "Featured Commission" text to an industrial frosted architectural pill badge (`backdrop-blur-md`, hairline border, drop shadow, white beacon dot).
  - Added a top gradient scrim (`h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent`) ensuring complete legibility across any photographic exposure or bright concrete/sky elements.
  - Replaced cramped 16:9 mobile aspect with an editorial 4:3 ratio (`aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]`) to provide vertical presence and adequate typographical canvas on mobile.
  - Subtitle ("A hillside retreat in the Algarve") and `View Project →` CTA are permanently visible by default across all devices (`text-white/80`), eliminating empty void spaces, with interactive brightening to `text-white` and an animated arrow slide (`group-hover:translate-x-1`) on hover.
  - Added `font-display` to the H2 title for Design System conformity.
- `ProjectCard`:
  - Implemented `.card-hover-overlay` in `src/styles/utilities.css` bypassing Tailwind v4's `@media (hover: hover)` restriction, ensuring desktop and hybrid/touchscreen laptops reliably trigger the bottom architectural spec overlay (status beacon, square meterage, and `Explore Monograph →` CTA) upon cursor hover.
  - On mobile (`< md`), specs remain directly legible within `Card.Content` so mobile users never miss completion status or area.
- `ProjectsArchive`:
  - Safeguarded view mode switcher rail (`01 GRID`, `02 SPEC TABLE`, `03 GEOGRAPHIC INDEX`) with horizontal scroll and `whitespace-nowrap` on narrow viewports.
  - Added `min-w-[680px]` to the Spec Table (`Mode B`) to avoid column squishing on mobile screens.
- `ProjectDetailMonograph` (`/projects/[slug]`):
  - Fixed Tailwind v4 `@theme` container mapping in `tokens.css`: explicitly defined `--container-xs` through `--container-7xl` and `--container-prose`, resolving project-wide bug where `max-w-xl` was constrained to 48px (causing word-by-word vertical text wrap).
  - Fixed mobile viewport height overflow: replaced `h-svh` with `h-[calc(100svh-var(--header-height))] min-h-[520px]`, eliminating the 64px header overflow that pushed subtitles into the bottom bezel.
  - Upgraded breadcrumb to an architectural frosted pill badge (`bg-black/40 backdrop-blur-md border border-white/15 rounded-full`) with a top gradient scrim for universal contrast.
  - Enforced `font-display` and responsive sizing (`text-3xl sm:text-5xl md:text-6xl lg:text-7xl`) on the monumental H1.
  - Stacked photographer credit inline on mobile to prevent collisions with the bottom title composition.
  - Upgraded next project navigation banner in `ProjectNavigation` to responsive aspect ratio (`aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9]`) and enforced `font-display`.

## Verification

- `npm run typecheck`: 0 errors
- `npm run lint`: 0 errors
- `npm run format:check`: 100% compliant
- `npm run build`: 34 routes statically generated with 0 errors

---

# 2026-09-06 (Professional Favicon Set)

## Version

0.16.1-alpha

## Summary

Replaced the placeholder favicon set with a single professional brand mark: a rule-based geometric "R" (uniform 7-unit beams, closed counter, 45° V-bottom bowl) on a soft-black rounded tile in the studio's neutral palette. The mark replaces `public/icon.svg` and it is delivered as a complete, standards-compliant set.

## What Changed

- `public/icon.svg` redesigned — same brand identity (geometric R monogram) but corrected letterform: the previous path had no top bar, unbalanced stem/leg widths and a chevron "A-shaped" counter that rendered the mark illegible at favicon sizes; the new construction is traced from explicit rule coordinates (top bar `14..21`, stems `x15..22` / `x43..50`, baseline `y50`, counter `(22,21)(43,21)(43,33)(35,41)(30,41)(22,33)`) and exists only as reusable geometry.
- Full raster set regenerated from the SVG (vector-rendered per size, no upscaling): `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180×180, opaque), `android-chrome-192x192.png`, `android-chrome-512x512.png`, and multi-size `favicon.ico` (16/32/48, PNG-embedded). The new files replace the previous near-blank placeholder PNGs in `public/favicon/` (same filenames, so zero stale references).
- `public/favicon.ico` + `public/apple-touch-icon.png` also placed at the public root for legacy auto-discovery browsers.
- `public/manifest.json` (previously unlinked, SVG-only) now declares the full icon set (`any` + `any maskable`) and is wired up via metadata.
- `src/config/seo.ts` icons metadata now emits the complete link set: `icon` (SVG + 32 + 16), `shortcut` (favicon.ico), `apple` (180×180), plus `manifest: "/manifest.json"`.

## Verification

- Production build green (34 routes).
- `next start` head output confirmed: `rel=manifest`, `rel=shortcut icon`, `rel=icon` (svg/32/16), `rel=apple-touch-icon` — replacing the previous single `icon.svg` link.
- All 9 favicon/manifest assets return `200` with correct content-types from the production server.
- Mark verified optically by raster inspection at 16/32/64 px (counter, V-bowl and leg structure all legible at 16 px).

## Notes

- Part of the rafa-design favicon replacement request. No dependencies added; the favicon generation used the already-present `sharp` in `node_modules` (test tooling only, nothing committed).

---

# 2026-09-05 (Phase 16 Optimization + Phase 17 Deployment Complete)

## Version

0.16.0-alpha

## Summary

Closed the final two project phases. Optimization work: production error boundaries, above-fold content that is never hidden before ScrollTrigger fires, a correct `sizes`/`fetchPriority` hero image, and a home-only intro splash. Deployment work: Vercel Analytics wired for every page load, Web Vitals telemetry flowing from real users into the Vercel dashboard, and the monitoring posture documented. Full QA sign-off with an 11-route Lighthouse matrix, a 12-route × 4-viewport responsive pass with zero overflow, and cross-browser verification in Chrome + Edge. **Repository at 100% completion.**

## Error Handling

- New `src/app/(site)/error.tsx` — design-system-styled error boundary (RETRY action + error digest exposure), replacing the previous boundary-less layout; unknown routes still render `not-found.tsx`.
- New `src/app/global-error.tsx` — the outermost boundary for root-layout errors, which owns its own `<html>`/`<body>` per Next.js requirements.

## Analytics + Web Vitals

- `@vercel/analytics` installed; `<Analytics />` mounted in the root layout for automatic pageview/event collection.
- New client `src/components/performance/web-vitals.tsx` renders `<ReportWebVitals/>` using `useReportWebVitals`, feeding `reportWebVitals` in `src/lib/performance.ts` — production builds now `track("Web Vitals", { … })` real-user CLS/FID/FCP/LCP/TTFB + resource entries into Vercel Analytics; development logs to console. This completes the Phase 16 "wiring a Web Vitals provider" link that previously tracked to Phase 17.

## Above-the-Fold Rendering Fixes

- `Reveal`/`ImageReveal` (`src/motion/Reveal.tsx`, `src/motion/ImageReveal.tsx`) gained a `visible` prop that skips the initial `gsap.set(autoAlpha:0, …)`/clip-path hiding so ScrollTrigger never hides critical first-paint content before it triggers. Applied to every hero: `/services`, `/process`, `/contact`, `/sustainability`, `/careers`, journal index header, projects archive editorial statement, service discipline hero, and both journal document renderers. `/projects` element render delay measured drop: 2284 ms → 486 ms.
- Landing hero logo now emits `sizes` (down to ~256 px on mobile vs 2560 previously) + `fetchPriority="high"`, cutting transmitted bytes and improving LCP.

## Splash Scope Decision (user)

- The intro splash is now **home-only**: `SplashProvider` lives in the home page (`src/app/(site)/page.tsx`), not the root layout. Inner-page navigations skip the intro entirely.

## Monitoring

- Vercel Analytics + Speed Insights = real-user Web Vitals and page views; Vercel runtime logs handle error forensics; Vercel Status covers uptime. `/api/revalidate` remains the CMS-publish→production gateway. No error-tracking agent added (kept dependency-light per project rules).

## Quality Gates

- Production builds green (34 routes) across every change; `tsc --noEmit` 0 errors, eslint/prettier clean.
- Lighthouse matrix (local `next start`, Performance): home 63 · projects 55 · services 54 · journal 52 · process 58 · sustainability 58 · contact 55 · studio 61 · project-detail 54 · service-detail 71 · journal-detail 65. FCP ~1–1.3 s across all routes; LCP 4.5–6 s on inner pages remains driven by late-painting Sanity CDN imagery + ~1.5 s script evaluation (GSAP/ScrollTrigger/Lenis init) — a tracking item, not a regression.
- Responsive: 12 routes × 4 viewports (375/768/1024/1440) in headless Chrome + Edge — zero horizontal overflow, zero page errors.
- Environmental note: the image optimizer intermittently timed out fetching Sanity CDN assets from this local machine (`TimeoutError`, sporadic HTTP 500, non-reproducible on retry) — local latency noise, not a code defect; production fetches originate from Vercel's network.

## Architecture Notes

- No new architectures; only existing primitives (`Reveal`/`ImageReveal`, design tokens, `Image`) extended. One new runtime dependency in the entire change set: `@vercel/analytics`.

---

# 2026-09-02 (CMS-Driven Page Introductions)

## Version

0.15.0-alpha

## Summary

The editorial introductions (overline, title, description, and where applicable the closing CTA / contact closing copy) of every top-level page are now editable in the Sanity CMS instead of being hardcoded in code. Admins edit a single `pageIntros` singleton in `/admin` (structure item "10 // Page Introductions"), publish, and the Sanity webhook revalidates every affected route — no redeploy required.

## What Changed

- **\_New `pageIntros` singleton schema** (`src/sanity/schemas/pageIntros.ts`) with six field groups (01 Projects, 02 Services, 03 Journal, 04 Process, 05 Sustainability, 06 Contact), each holding exactly the fields its page's 12-column editorial header consumes. Registered in `src/sanity/schemas/index.ts` and exposed as a true singleton in `sanity.config.ts` (single instance, filtered from the New-document menu and delete/duplicate actions).
- **New data-access layer**: `pageIntrosQuery` GROQ in `src/sanity/lib/queries.ts`, `transformSanityPageIntros` in `src/sanity/lib/transforms.ts` (returns only the fields Sanity provides, enabling a clean merge-over-static-default pattern), and `getPageIntros()` in `src/sanity/lib/fetch.ts` (tagged `cacheTags.pageIntros` = `page-intros`).
- **Consuming pages updated** to fetch intros with graceful fallback to static `pageContent`:
  - `/projects` — overline/title/description now flow through a new `intro` prop on `ProjectsArchive` (previously hardcoded JSX).
  - `/services` — overline/title editable, plus optional description override (default remains the dynamic count-based `getServicesDescription(count)`).
  - `/journal` — overline/title/description via a new `intro` prop on `JournalIndexHeader` (type now `PageIntro | undefined` to satisfy `exactOptionalPropertyTypes`).
  - `/process` — overline/title/description plus the closing CTA; metadata switched to async `generateMetadata`.
  - `/sustainability` — manifesto overline/heading/body; metadata switched to async `generateMetadata`.
  - `/contact` — header overline/title/description/briefHeading plus the editorial closing (image caption overline, dialogue overline, closing heading/body) via a new `intro` prop on `ContactEditorial`.
- **Webhook route extended** (`src/app/api/revalidate/route.ts`): `pageIntros` maps to revalidation tag `page-intros` and paths `/projects /services /journal /process /sustainability /contact`, so a single publish revalidates all affected pages instantly.

## Verification

- `npx tsc --noEmit` — 0 errors.
- `npm run lint` — 0/0.
- `npx prettier --check .` — clean.
- Production build green — 34 routes; `/projects`, `/services`, `/process`, `/sustainability`, `/contact` remain static `○` (prerendered with current CMS values, revalidated on publish); `/api/revalidate` stays dynamic `ƒ`.

## Notes

- Careers/studio page metadata and their on-screen intros were already CMS-driven in earlier work and are intentionally left out of the `pageIntros` singleton.
- No new runtime dependencies were introduced.

---

# 2026-09-02 (On-Demand Revalidation via Sanity Webhook)

## Version

v1.0.0-alpha

### Status

Done. Publishing (or updating/deleting) any document in Sanity Studio now triggers a signed webhook to `POST /api/revalidate`, which purges the Next.js data cache (`revalidateTag(tag, "max")`) and regenerates the affected routes (`revalidatePath`) — so CMS edits go live instantly without a Vercel redeploy.

---

## Summary

The site is statically prerendered, so CMS changes previously required a deployment to go live. This release closes that gap with the professional/industrial pattern: a Sanity webhook fires on create/update/delete, and an on-demand ISR endpoint invalidates only the affected cache tags and paths. Every Sanity query in the three fetch modules now carries contextual cache tags via `cacheTags` (`src/sanity/lib/fetch.ts`), so regeneration rebuilds exactly the pages that read the changed document.

## Added

- `src/app/api/revalidate/route.ts` — webhook receiver: raw-body HMAC-SHA256 verification via `isValidSignature` (`@sanity/webhook`), `sanity-project-id`/`sanity-dataset` header cross-check (defense in depth), dev-only skip when `SANITY_WEBHOOK_SECRET` is unset, per-type tag/path mapping
- `SANITY_WEBHOOK_SECRET` documented in `.env.example` (never committed)

## Changed

- `src/sanity/lib/fetch.ts` — all Sanity fetches now pass `next: { tags }` from `cacheTags`
- `src/content/projects/sanity.ts` — project fetches tagged
- `src/content/journal/sanity-adapter.ts` — journal fetches tagged
- `docs/33-sanity-integration-complete.md` — added "On-Demand Revalidation (Webhook)" section incl. Sanity dashboard setup steps

## Notes

- Next.js 16.2 requires the cache-profile second argument: `revalidateTag(tag, "max")`
- Webhook must be created in the Sanity dashboard (sanity.io/manage → API → Webhooks) with URL `https://www.rafadesignhub.com/api/revalidate` and the same secret as `SANITY_WEBHOOK_SECRET`
- `/api/revalidate` is a dynamic route (`ƒ`); list/detail pages stay static/SSG with on-demand invalidation

## Verified

- `npx tsc --noEmit` — 0 errors
- `npm run lint` — 0 errors / 0 warnings
- `npm run build` — production build green; `/api/revalidate` present, `[slug]` pages SSG with tags

---

# 2026-09-01 (CI/CD Fix — Audit Gate + Node Version)

## Version

v1.0.0-alpha

### Status

✅ GitHub Actions CI restored to green. The audit gate broke 2026-09-01 when npm flagged 9 transitive advisories in the Sanity Studio CLI-only toolchain (`adm-zip`, `js-yaml`, `uuid` under `@sanity/cli`) that have no safe upstream fix. Resolved via `npm-audit-resolver` with a committed `audit-resolve.json` allowlist scoped to those exact dependency paths; any **new** advisory still fails CI. Node pinned from 20 → 22 (Node 20 is EOL/deprecated by GitHub).

---

# 2026-09-01 (Sanity-Driven Social Links)

## Version

v1.0.0-alpha

### Status

✅ All site-wide social links and contact details (footer, fullscreen navigation, homepage social strip, visit-studio spec sheet, contact form project types, and the Organization JSON-LD) now come from the Sanity `contact` singleton — editable in one place in Studio (Settings → Contact → Social Links) with a static fallback when Sanity is unreachable.

---

## Summary

Contact information previously flowed from the static `src/content/company/contact.ts` module into every client surface. This release introduces a `ContactProvider` that the server-side layout feeds from `getContactInformation()`, so all client components consume real CMS data through `useContact()` while falling back to the static module if the fetch fails. The server-rendered JSON-LD (`organizationSchema`) now also accepts the fetched contact document.

## Added

- `src/features/contact/contact-context.ts` — `ContactContext` + `useContact()` hook
- `src/features/contact/contact-provider.tsx` — client `ContactProvider` with static fallback

## Changed

- `src/app/(site)/layout.tsx` — async layout fetches `getContactInformation()` and wraps the tree in `ContactProvider`
- `src/app/layout.tsx` — fetches contact and passes it to `organizationSchema(contact)` for JSON-LD
- `src/config/schema.ts` — `organizationSchema(contact?: ContactInformation | null)` accepts Sanity contact with static fallback
- `src/components/layout/Footer.tsx` — social links/details via `useContact()`
- `src/features/navigation/fullscreen-navigation.tsx` — social links/phone/email via `useContact()`
- `src/features/landing/landing.tsx`, `landing/LandingSocialStrip.tsx` — social links/email via `useContact()`
- `src/features/studio/visit-studio.tsx` — async server fetch of `getContactInformation()` (static fallback)
- `src/features/contact/contact-form.tsx` — project types via `useContact()`

## Verified

- `npx tsc --noEmit` → 0 errors
- Targeted `eslint` → 0 errors / 0 warnings
- `npm run build` → 32 static routes
- Rendered homepage HTML confirmed to contain the Sanity-migrated social links

---

## Version

v1.0.0-alpha

### Status

✅ Team, Studio, Careers, Contact, and Site Settings pages are now 100% Sanity-driven — the entire company surface uses CMS content instead of hardcoded TypeScript, completing the CMS migration pathway begun with projects/journal/services.

---

## Summary

The Sanity CMS integration (previously covering Projects, Journal, and Services) was extended to every company page and the global site configuration. Six new schemas map 1:1 onto the existing content models so pages switched with near-zero component breakage — no new architecture, no duplicate components, and no hardcoded values. Real placeholder data was migrated into the production dataset via idempotent scripts and verified end-to-end (typecheck, lint, build, and rendered HTML).

## Added

- `src/sanity/schemas/team.ts` — `teamMember` document (name/slug/role/bio/disciplines/interests/experience/portrait/email/phone/socialLinks/order/category/displayOnTeamPage/SEO)
- `src/sanity/schemas/studio.ts` — `studio` singleton (identity, principles/methods, media images, history/timeline/awards/client-sectors, visit)
- `src/sanity/schemas/career.ts` — `career` job-posting document (slug/type/location/description/requirements/order/status/featured)
- `src/sanity/schemas/careers.ts` — `careers` page singleton (hero/openApplication/benefits/studioImage)
- `src/sanity/schemas/contact.ts` — `contact` info singleton (details/offices[]/socialLinks[]/editorialImage)
- `src/sanity/schemas/siteSettings.ts` — `siteSettings` global singleton (identity/SEO defaults/organisation/operational)
- `src/sanity/lib/queries.ts` — `teamQuery`, `studioQuery`, `careersPositionsQuery`, `careerBySlugQuery`, `careerSlugsQuery`, `careersQuery`, `contactQuery`, `siteSettingsQuery`
- `src/sanity/lib/transforms.ts` — `transformSanityTeamMember(s)/Studio/StudioCollections/Career(s)/CareersPage/Contact/SiteSettings` + `transformSocialLinks`/`transformOffice`/`sanitizeId`
- `src/sanity/lib/fetch.ts` — `getTeamMembers`, `getStudioInfo`, `getStudioCollections`, `getStudioHistory`, `getCareers`, `getCareerBySlug`, `getCareerSlugs`, `getCareersPageContent`, `getContactInformation`, `getSiteSettings`
- `src/content/siteSettings.ts` — new `SiteSettings` interface
- `scripts/migrate-{team,studio,careers,contact,site-settings}-to-sanity.mjs` + shared `scripts/lib/sanity.mjs` upload helper (`npm run migrate:company` runs all five)

## Changed

- `src/sanity/schemas/index.ts` — all 9 schemas registered
- `src/app/(site)/studio/page.tsx`, `(site)/careers/page.tsx`, `(site)/contact/page.tsx` — rewritten Sanity-first (async, fetch + null fallback)
- `src/features/contact/office-map.tsx`, `contact-editorial.tsx` — converted from static-import to prop-driven
- `sanity.config.ts` — 9 Studio sections (01 Projects … 09 Site Settings) + singleton action guards
- `src/sanity/lib/index.ts` — exports new transforms + fetch functions
- `package.json` — added `migrate:team|studio|careers|contact|site-settings|company` scripts

## Verified

- `npm run typecheck` → 0 errors
- Targeted `eslint` → 0 errors / 0 warnings
- `npm run build` → 32 static routes; `/studio`, `/careers`, `/contact` all `○` static
- Rendered HTML confirmed to contain migrated Sanity content (manifesto, team member names, principles, client sectors, contact email)

---

# 2026-08-19 (Dynamic Image Brightness Detection for Featured Cards)

## Version

v1.0.0-alpha

### Status

✅ Implemented dynamic brightness detection and adaptive overlay system for featured project cards to ensure text readability on both light and dark images

---

## Summary

The featured project card now analyzes hero image brightness automatically and adjusts overlay opacity dynamically. When bright images (like Casa Monte's light stone facade) are displayed, the system strengthens the gradient overlay to maintain text legibility. The solution uses three layers: (1) a dynamically-adjusted full-image gradient overlay, (2) a localized backdrop specifically behind the text area, and (3) a semi-transparent backdrop directly behind the title with backdrop-blur. A custom React hook (`useImageBrightness`) analyzes the bottom third of images using Canvas API and calculates average luminance using the relative luminance formula (0.299R + 0.587G + 0.114B). Based on brightness scores (0-255), images are categorized as "light" (>180), "medium" (100-180), or "dark" (<100), with corresponding overlay strengths. The component was converted from server to client-side (`"use client"`) to enable the brightness analysis hook. All implementations follow the Design System and maintain performance through image sampling (200px width) and CORS-enabled image loading.

## Added

- `src/hooks/use-image-brightness.ts` — Custom React hook to analyze image brightness using Canvas API pixel data
  - `useImageBrightness(imageUrl, enabled)` — Analyzes bottom third of image, returns brightness 0-255
  - `getBrightnessCategory(brightness)` — Categorizes as "light" | "medium" | "dark"
  - `getOverlayOpacity(brightness)` — Returns dynamic Tailwind classes for gradient and backdrop
- Dynamic overlay system with three brightness categories:
  - **Light images (>180)**: `from-black/98 via-black/75 to-black/15` + `from-black/80 via-black/45 to-transparent`
  - **Medium images (100-180)**: `from-black/95 via-black/60 to-black/5` + `from-black/70 via-black/30 to-transparent`
  - **Dark images (<100)**: `from-black/90 via-black/45 to-black/0` + `from-black/50 via-black/20 to-transparent`

## Changed

- `src/features/projects/featured-project-card.tsx` — Converted to client component with dynamic brightness detection
  - Added `"use client"` directive for React hooks
  - Integrated `useImageBrightness` hook with Sanity image URL
  - Gradient overlay now uses dynamic classes from `getOverlayOpacity()`
  - Text area backdrop now uses dynamic classes
  - Added semi-transparent backdrop directly behind title: `bg-black/40 backdrop-blur-sm`
  - Enhanced text shadows for better contrast on all brightness levels
  - Metadata overline now has additional blur backdrop layer

## Technical Details

- **Brightness Analysis**: Samples 200px-wide version of image for performance
- **Region of Interest**: Analyzes bottom third of image where text overlay appears
- **Luminance Formula**: Uses relative luminance (0.299R + 0.587G + 0.114B) weighted for human perception
- **Cross-Origin**: Enables CORS with `img.crossOrigin = "anonymous"` for Sanity CDN images
- **Fallback**: Returns "medium" category if analysis fails, ensuring graceful degradation
- **Performance**: Off-screen canvas, small sample size, single analysis on mount

## Fixes

- ✅ Text illegibility on bright images (Casa Monte white stone facade)
- ✅ Over-darkening on dark images
- ✅ Inconsistent contrast across different image types

---

# 2026-08-14 (Process editorial redesign)

## Version

v1.0.0-alpha

### Status

✅ `/process` rebuilt from a conventional vertical numbered timeline into an editorial architectural-methodology page — 12-col intro, work-in-progress hero, ruled phase index with evidence plates, reading-progress hairline, and a shared closing CTA

---

## Summary

The Process page was redesigned to match the RAFA editorial design language (docs/02, 04, 05, 12): a 12-column split intro ("Specification // Methodology" overline → h1 "Methodology" → editorial lead), a cinematic work-in-progress hero (the studio's material samples / study models, `ImageReveal`, 16:9 → 21:9, mono caption), and a ruled methodology index replacing the original vertical "numbered circles + connector" timeline. `ProcessTimeline`/`ProcessStep` were rebuilt as `border-y divide-y` rows (`[2] number · [4] title · [6] description`) staggered into view; phase `visual`s (Concept sketch, Construction site visit) now render as full-width 16:9 editorial evidence plates with mono `"01 — …"` captions instead of thumbnails. A quiet "See the Work →" link points at `/projects` (the only cross-reference the content model supports — rows are not links). A new `ProcessProgress` client component draws a reading-progress hairline beneath the header, scrubbed across the methodology section via ScrollTrigger; it is decorative, reduced-motion aware, and hydration-safe. The closing CTA reuses `DisciplineCta` with a new `content` override (`pageContent.process.cta` → `/contact`). All copy lives in content (`pageContent.process.overline`/`.cta`, `ui.overlines.sequence`, `ui.sections.seeTheWork`, `processHero`); the `ProcessStep` model is unchanged — no invented phase copy. Only existing primitives reused; no new dependencies. Also resolved a dev-only 404: the stale `.next/dev` route cache from the 2026-08-14 bulk file restore emptied the dev `routes-manifest.json` (dev server 404ed every route until restarted with a cleared cache). Verified with typecheck, targeted eslint, prettier, a production build (33 routes), and live `/process` HTML (single h1, 6 phase h2s, CTA h2, breadcrumb JSON-LD, hero + evidence plates, progress fill).

## Added

- `ProcessProgress` — `src/features/process/process-progress.tsx`, client, reading-progress hairline under the header scrubbed across the methodology section (`targetId`), `aria-hidden` + `pointer-events-none`, collapsed under `prefers-reduced-motion` with a stable DOM for hydration.
- Content — `processHero: ImageAsset` in `src/content/process/index.ts`; `pageContent.process.overline` + `.cta`; `ui.overlines.sequence`; `ui.sections.seeTheWork`.

## Changed

- `/process` — page composition rewritten: editorial 12-col intro → work-in-progress hero → ruled methodology index → "See the Work →" link → closing CTA (was h1 + description, `bg-muted` placeholder hero, and the numbered vertical timeline).
- `ProcessTimeline` / `ProcessStep` — rebuilt as a ruled editorial index (hairline borders, `[2] number · [4] title · [6] description` rows, `Stagger` reveal, full-width evidence plates for phase visuals). Numbered circles, connectors, and rounded thumbnails removed.
- `DisciplineCta` — accepts an optional `content` override (defaults to `pageContent.services.cta`), reused by `/process` with process-specific copy.

## Removed

- The vertical "numbered circles + connector" timeline styling and the placeholder hero from `/process` (no components removed — `ProcessTimeline`/`ProcessStep` were rewritten in place).

---

## Version

v1.0.0-alpha

### Status

✅ `/services` and `/services/[slug]` rebuilt from a bordered 3-card grid into an editorial "discipline index" (ruled rows, hairlines, restrained motion, hover project preview)

---

## Summary

The Services section was redesigned to match the RAFA editorial design language (docs/02, 04, 05, 12): a numbered 01–06 discipline index on `/services` and a full editorial "discipline page" on each `/services/[slug]`. The `Service` content model is now the single source of truth for both surfaces — it gained `intro` (editorial detail statement) and `approach: ServiceApproach[]` (4 numbered methodological points), plus helpers `getServiceIndex` (zero-padded "01"–"06") and `getRelatedServicesForService` (disciplines sharing project evidence, strongest first). The index renders ruled rows (mono index · display title · short description · arrow) with a disciplined hover (title nudge, arrow reveal, accent hairline extend) and an `lg`-only sticky preview of the discipline's most recent project, mouse/focus-driven and empty-state-safe. The detail page flows: "01 / Architecture" overline → h1 → intro → rule → "Practice & Approach" (long-form + 4-point ruled list) → Selected Work (project evidence with `Location · Year · Typology`, quiet empty state for Urban Design/Consulting) → Related Disciplines (only where shared evidence exists) → a "Have a project in mind?" CTA pointing at the existing `/contact`. All copy lives in content (`pageContent.services`, `ui.sections`, `ui.overlines`) — nothing hardcoded in components; only existing primitives reused (`Section`/`Heading`/`Text`/`Link`/`Image`/`Reveal`/`Stagger`); no new dependencies. `ServiceCard`/`ServicesGrid` were removed. Verified with typecheck, targeted eslint, prettier, a production build (33 routes), and the headless-Edge CDP harness (probe18/19): 6 ruled rows with correct indexes, no column overlap (bands 2/5/4/1), preview `none` < `lg` / `block` ≥ `lg`, hover reveals the project preview, detail sections render correctly, Consulting shows the empty selected-work state, CTA → `/contact`, zero horizontal overflow at 1440/1024/768/390.

## Added

- `DisciplineIndex` — `src/features/services/discipline-index.tsx`, the editorial ruled index (rows 01–06, hover = title nudge + arrow reveal + accent hairline extend; `lg`-only sticky project preview, mouse/focus-driven, single active image loaded).
- `DisciplineApproach` — `src/features/services/discipline-approach.tsx`, ruled `[2] number · [4] title · [6] statement` list for the four approach points.
- `SelectedWork` — `src/features/services/selected-work.tsx`, ruled project-evidence list with `Location · Year · Typology` metadata and a "No project evidence listed" empty state.
- `DisciplineRelated` — `src/features/services/discipline-related.tsx`, related-disciplines index (skipped entirely when no shared evidence).
- `DisciplineCta` — `src/features/services/discipline-cta.tsx`, closing CTA reusing `pageContent.services.cta` → `/contact`.
- Content — `Service.intro` + `ServiceApproach` (×4 per service), `getServiceIndex`, `getRelatedServicesForService` in `src/content/services/index.ts`; `pageContent.services.overline` + `.cta`, `ui.sections.selectedWork`/`relatedDisciplines`, `ui.overlines.practiceApproach`/`noProjectEvidence`.

## Changed

- `/services` — header (overline "Disciplines // Services" → h1 → editorial lead) above the ruled `DisciplineIndex` (was `ServicesGrid` of bordered `ServiceCard`s).
- `/services/[slug]` — discipline-page composition: "01 / Architecture" overline, h1, `intro`, rule, "Practice & Approach", Selected Work, Related Disciplines, CTA (was h1 + description + a grid of `ProjectCard`s).

## Removed

- `src/features/services/service-card.tsx` and `src/features/services/services-grid.tsx` (superseded by `DisciplineIndex`).

## Documentation Updated

- `docs/08-component-inventory.md` (Services section: five new component entries + removal note)
- `docs/20-content-models.md` (Service model + helpers)
- `docs/25-implementation-tracker.md` (Phase 8 → 90%, session note)
- `docs/30-changelog.md`

---

# 2026-08-11 (Dependency audit)

## Version

v1.0.0-alpha

### Status

✅ npm audit resolved — 0 vulnerabilities (was 2 moderate, 3 high)

---

## Summary

`npm audit` reported 5 vulnerabilities (2 moderate, 3 high) in transitive dependencies: `brace-expansion` (DoS ×2), `js-yaml` ≤4.3.0 (quadratic CPU in `!!omap`), `nanoid` <3.3.17 (zero-size generator loop), and `postcss` ≤8.5.22 (sourceMappingURL read, via `next`). A plain `npm audit fix` (without `--force`) resolved all 5 entirely in range through the lockfile — `postcss` → 8.5.26, `nanoid` → 3.3.18, `brace-expansion` → 5.0.9 / 1.1.18, `js-yaml` → 4.3.1. `next` stayed at 16.2.11 (the audit's `--force` suggestion of next@16.3.0 was deliberately not taken). No direct `package.json` spec changed. `npm audit` now reports 0 vulnerabilities and `npm run build` remains green (33 static routes).

## Documentation Updated

- `docs/25-implementation-tracker.md` (session note)
- `docs/30-changelog.md` ([Unreleased] Security section)

---

# 2026-08-11 (Navigation architecture)

## Version

v1.0.0-alpha

### Status

✅ Homepage refined into a viewport-filling cover (logo top-center, numbered index bottom-left, socials bottom-right on desktop); fullscreen menu rebuilt as a full directory; footer hidden on `/`

---

## Summary

Navigation architecture pass on top of the Studio Index landing. `/` is now a pure viewport-filling cover with no header and no footer: the brand mark sits top-center (desktop) with the numbered 01–06 index pinned bottom-left and the email + social row bottom-right; below `lg` the three stack in normal flow (logo → index → socials). The fullscreen menu was rebuilt from the Studio Index composition back into a full directory: a sticky top bar (brand + `ThemeToggle` + CLOSE) over three columns on the 12-col grid (GENERAL numbered 01–06 index with `aria-current="page"`, DISCIPLINES with the six services → `/services/[slug]`, MORE with the supporting links), plus a full-width bottom row holding `MenuSearch` and the contact/social cluster. The giant brand field and image are gone from the menu. The `Footer` is now hidden on `/` too, gated by `SiteShell` (which previously only hid the `Header`); it remains the condensed view of the same IA on every other route. Verified with typecheck, targeted eslint, prettier, a production build (33 static routes), and the headless-Edge CDP harness: no header/footer/search on `/`, exact bottom-left/bottom-right anchors at 1440×900, zero horizontal and vertical scroll at 1440/1280/1024/768/390/360, menu opens to the directory with 0 `<img>` in the overlay, sticky bar, correct `aria-current`, and reduced-motion renders everything instantly.

## Added

- Fullscreen menu directory — `GENERAL` (01–06) / `DISCIPLINES` (`getServices()`) / `MORE` columns (lg 6/3/3, xl 5/3/4) + full-width `MenuSearch` + contact/social row in `src/features/navigation/fullscreen-navigation.tsx`
- `container-standard` tokens — `--container-standard: 72rem` + `--container-gutter: clamp(1rem, 3vw, 3rem)` in `src/styles/tokens.css`, consumed via `.container-standard` in `src/styles/utilities.css`

## Changed

- Landing composition — `src/features/landing/landing.tsx` reworked into a viewport-filling cover: logo top-center at `lg` (`lg:top-xl lg:left-1/2 lg:-translate-x-1/2`), bottom wrapper `lg:flex-row lg:items-end` pinning the 01–06 index bottom-left and the social row bottom-right; stacked below `lg` (logo → index → socials); entrance order bar → logo → index stagger → social
- `SiteShell` — `src/components/layout/SiteShell.tsx` now gates the `Footer` behind `!isLanding` as well as the `Header`; `src/app/(site)/layout.tsx` no longer renders `Footer` itself
- Fullscreen menu composition — removed the giant brand field, the `Image` import, and `[data-nav-logo]`; the `DISCIPLINES` column was restored so the six services are directly reachable from the menu again (docs/06)

## Removed

- `Header` and `Footer` from `/` (both now gated by `SiteShell` behind `!isLanding`)

## Documentation Updated

- `docs/08-component-inventory.md` (Landing + Site Shell + Fullscreen Navigation + Footer entries)
- `docs/12-page-architecture.md` (Landing page category)
- `docs/25-implementation-tracker.md` (session note)
- `docs/30-changelog.md`

---

# 2026-08-11 (Studio Index landing)

## Version

v1.0.0-alpha

### Status

✅ Homepage pivoted to the Studio Index landing; hero + homepage previews and the Three.js layer removed; search index extended for real content coverage

---

## Summary

Client pivot: the Studio Index composition built for the fullscreen menu became the homepage itself. `/` now renders a minimal landing (`src/features/landing/landing.tsx`) with a top bar (brand + theme toggle, no menu trigger), a `MENU` mono label, the numbered 01–06 primary rail, a giant brand field, and an email + social row — no hero, no homepage preview sections, and (per user decision) no search on the landing. Search stays in the fullscreen menu and footer, now with real content coverage: the `SearchResult` model gained an optional `keywords` field, and projects/services/journal are indexed against their location, typology, category, materials, client, year, status, description, category/author, and published year. The `Header` is hidden on `/` via the new `SiteShell`, which also passes `unpadded` to `PageContainer`. The Three.js layer (only referenced by the deleted hero) was removed in full: `src/three/`, the `theme.scene` palette, and the `@react-three/fiber` / `three` / `@types/three` dependencies. Verified with typecheck, targeted eslint, prettier, and the headless-Edge CDP harness: landing has no `header`, all 6 index items are 44px with correct hrefs, the only search input on the page is the footer's, zero horizontal overflow at 1440/1280/1024/768/390/360 (a 14px overflow at 360 caused by the socials row in the scrollbar gutter was fixed with `flex-wrap`), footer search returns real matches (lisbon / limestone / porto / courtyard), reduced-motion renders the landing instantly, and the fullscreen menu still opens correctly on subpages with zero overflow.

## Added

- Studio Index landing — `src/features/landing/landing.tsx`: minimal homepage rendering the 01–06 index (`primaryNavLinks`) as the primary content; brand + `ThemeToggle` top bar; email + capitalized social row; GSAP staged reveal + hover/focus nudges (reduced-motion aware)
- `SiteShell` — `src/components/layout/SiteShell.tsx`: hides the `Header` on `/`, passes `unpadded` to `PageContainer`
- `PageContainer` `unpadded` prop — drops `pt-(--header-height)` for the landing route
- Search index real coverage — `SearchResult.keywords?: string` in `src/features/navigation/search-index.ts`; projects indexed by location city/country, typology, humanized category, materials, client, year, status; services by full description; journal by category, author, and published year

## Changed

- `src/app/(site)/page.tsx` — now renders `<Landing />` (same metadata)
- `src/features/navigation/search-index.ts` — keyword coverage per result type (still substring, case-insensitive, over title + subtitle + keywords, max 8)

## Removed

- `src/features/home/` — all 8 homepage preview sections (hero, featured projects, studio preview, services preview, process preview, sustainability preview, journal preview, contact CTA)
- `src/content/home/` and the `homeContent` export in `src/content/index.ts`
- `src/three/` — the entire Three.js layer (9 files incl. `HeroScene` / `HeroCanvas`) and `theme.scene` palette in `src/config/theme.ts`
- `@react-three/fiber`, `three`, `@types/three` dependencies (npm removed 20 packages)
- `Header` from `/` (now rendered only on non-landing routes)

## Documentation Updated

- `docs/08-component-inventory.md` (Landing + Site Shell entries; Hero + Three.js Components sections removed; Header + Page Container updated)
- `docs/12-page-architecture.md` (Landing page category)
- `docs/25-implementation-tracker.md` (Phase 5 → Landing, Phase 15 removed, session note)
- `docs/27-development-order.md` (Phase 5 + Phase 15 status)
- `docs/00-documentation-index.md` (Three.js section removed)
- `docs/30-changelog.md`

---

# 2026-08-10 (Navigation visual refinement)

## Version

v1.0.0-alpha

### Status

✅ Fullscreen navigation typography hierarchy + footer search layer added; responsive overflow defects fixed

---

## Summary

A visual-refinement pass over the Studio Index navigation and its footer counterpart. The sidebar navigation now opens with a small mono `MENU` editorial label above the numbered rail (01–06), completing the typography hierarchy specified in the brief (label → muted index → medium-large title). The footer gained the SEARCH layer: the shared `MenuSearch` component is now reused in the footer brand column beneath a hairline rule, keeping the search layer (docs/06 layer 4) present at the end of the journey. Responsive defects found during breakpoint testing were fixed: the menu's social row now wraps at ~768px (it previously overflowed the overlay by ~40px), the footer directory grid moved from `md:` to `lg:` so it stacks as a calm single column below 1024px (the old 12-col grid collapsed to ~100px columns at 768px, overflowing the email link), and the sub-footer cluster wraps instead of overflowing on 360/390px. Dead `ui.navigation` labels (`explore`, `featured`, `previous`, `next`) were removed. Verified with typecheck, targeted eslint, prettier, and a headless-Chrome CDP harness at 1440/1280/1024/768/390/360 in light + dark (menu overlay has zero horizontal overflow at every width; footer and sub-footer overflow eliminated; reduced-motion open/close instant; footer search returns live results).

## Added

- Footer SEARCH layer — `MenuSearch` reused in the footer brand column (hairline rule above)
- `MENU` editorial label above the numbered sidebar rail in the fullscreen navigation (`data-nav-label`, included in the primary stagger)

## Changed

- `src/features/navigation/fullscreen-navigation.tsx` — `MENU` label added; social row wraps on narrow widths (`md:flex-wrap`); primary stagger selector now includes the label
- `src/components/layout/Footer.tsx` — search layer in the brand column; directory grid switched `md:` → `lg:` (single-column stack below 1024px) with columns rebalanced to 4/2/3/3; sub-footer cluster wraps on mobile
- `src/content/ui/index.ts` — dead navigation labels removed
- `src/features/home/services-preview.tsx` — `max-w-xs` (8px Tailwind v4 substitution) → `max-w-[20rem]`

## Removed

- Dead `ui.navigation` labels: `explore`, `featured`, `previous`, `next`

## Documentation Updated

- `docs/08-component-inventory.md` (Fullscreen Navigation, Menu Search, Footer)
- `docs/25-implementation-tracker.md` (session note)
- `docs/30-changelog.md`
- `docs/29-known-issues.md` (new `/studio` 768px entry)

---

# 2026-08-10 (Studio Index navigation)

## Version

v1.0.0-alpha

### Status

✅ Fullscreen navigation rebuilt as an architectural Studio Index; Footer refined as its quiet counterpart

---

## Summary

The fullscreen navigation was rebuilt from a directory-style list into an editorial **Studio Index** composition, and the Footer was refined as its quiet counterpart. The menu now opens to an asymmetric layout: a narrow numbered primary rail (01–06, `primaryNavLinks`, `aria-current="page"`) with `MenuSearch` below it, and a wide identity field holding the brand mark (`public/logo/rafa-bg-black.png`, inverted in light theme) with an email + social row beneath. The top bar carries the site name, the shared `ThemeToggle`, and the `CLOSE` trigger. Removed from the menu: the featured project image, the latest journal article, the supporting tier, the phone number, and the Disciplines section — services remain reachable via the "Services" primary nav item. Motion was restaged (overlay → bar → primary stagger → logo → search → social, faster reversed close) and stays reduced-motion aware. Accessibility is preserved: dialog semantics, focus trap, Escape, focus restore, `inert` background, `aria-current`, `data-lenis-prevent`. The theme toggle was extracted into a shared `src/components/ui/ThemeToggle.tsx` consumed by both the Header and the menu. The Footer now mirrors the same IA (brand column, `GENERAL`, `DISCIPLINES`, `MORE`, and a sub-footer with © year, socials, Privacy Policy, Back to top ↑). Verified with typecheck, targeted eslint, prettier, and a headless-Chrome CDP harness across light/dark and mobile/desktop widths; a Tailwind v4 gotcha (`max-w-xs` = 8px) was found and fixed.

## Added

- `src/components/ui/ThemeToggle.tsx` — shared Sun/Moon theme toggle (`useTheme`, `ui.theme.light` / `ui.theme.dark` labels, `--touch-target` hit area)
- `ui.navigation.general` / `ui.navigation.more` labels in `src/content/ui/index.ts`

## Changed

- `src/features/navigation/fullscreen-navigation.tsx` — rebuilt as the Studio Index composition (top bar, numbered rail + `MenuSearch`, brand identity field, email/social row); staged open/close restaged; hover focus nudges the title/index and dims neighbors; reduced-motion = instant show/hide
- `src/components/layout/Header.tsx` — consumes the shared `ThemeToggle`; `• MENU` / `• CLOSE` editorial trigger retained
- `src/components/layout/Footer.tsx` — quiet counterpart: brand column + `GENERAL` / `DISCIPLINES` / `MORE` + sub-footer (© year + rights, social links, Privacy Policy, Back to top ↑); tagline uses `max-w-[20rem]`

## Removed

- From the fullscreen menu: featured project image, latest journal article, supporting tier, phone number, Disciplines section, and the `ArrowUpRight` hover icon (menu links use the `link-underline` treatment)
- `max-w-xs` on the menu search wrapper (8px under Tailwind v4 `--spacing-xs`) — wrapper is now `w-full`

## Documentation Updated

- `docs/08-component-inventory.md` (Fullscreen Navigation, Theme Toggle, Footer)
- `docs/25-implementation-tracker.md` (session note)
- `docs/30-changelog.md`

---

# 2026-08-07 (Studio industrial redesign)

## Version

v1.0.0-alpha

### Status

✅ Studio page evolved into a professionally industrial editorial experience

---

## Summary

Studio page redesigned along the industrial specification language established by `ProcessPreview` and `ContactCta` (mono uppercase overlines, hairline `border-border/40` rules, divided grids, `hover:bg-foreground/[0.02]` tints). The content model was restructured: `mission`/`vision`/`values` were replaced by a `beliefs` principles index; `clients` (string list) became `clientSectors` with project references; and the `Studio` model gained `overline`, `manifesto`, `workingMethods`, and a `visit` close. `TeamMember` gained `disciplines`, `experience`, and `interests`; `Award` gained `project` and `citation` references. New sections: `Beliefs` (PRINCIPLE 01–05 index), `WorkingMethods` (METHOD 01–04 four-column specification grid), and `VisitStudio` (dispatch panel with office/phone/email/visits ledger and industrial CTA). `StudioIntroduction` was rebuilt around a manifesto statement with overline + `TextReveal` display h1. The atelier image now uses `Parallax` with a caption row. `Partners` became a `SECTOR 01–04` index with a client-references note; `Awards` became a year-leading index with citations; `Timeline` gained a narrative intro; `History` gained its overline. Verified: `npx tsc --noEmit`, targeted `eslint`, and prettier all pass.

## Added

- `src/features/studio/beliefs.tsx` — principles index (replaces `philosophy.tsx`, deleted)
- `src/features/studio/working-methods.tsx` — 4-col industrial specification grid, `/process` link
- `src/features/studio/visit-studio.tsx` — dispatch panel reusing `contactInformation`
- `ui.overlines` block (principles/methods/recognition/chronology/collaboration/team/atelier/history) and `ui.sections.beliefs`/`workingMethods`/`visit` in `src/content/ui/index.ts`
- `timelineIntro`, `clientSectors`, `clientReferencesNote` exports in `src/content/studio/index.ts` (barrel updated)

## Changed

- `src/content/studio/index.ts` — Studio model: `overline`, `manifesto`, `beliefs`, `workingMethods`, `visit`; removed `mission`/`vision`/`values` and `clients`; `TeamMember` + `Award` extended; images captioned
- `src/features/studio/studio-introduction.tsx` — manifesto hero (overline, `TextReveal` h1, manifesto h3, caption row)
- `src/features/studio/awards.tsx` — year-leading mono index with project + citation
- `src/features/studio/timeline.tsx` — narrative intro + polish
- `src/features/studio/partners.tsx` — sector index (`clientSectors`) + note
- `src/features/studio/team-grid.tsx` / `team-member-card.tsx` — disciplines/experience/interests
- `src/app/(site)/studio/page.tsx` — new section order + atelier `Parallax` + caption; `clients` import swapped for `clientSectors`

---

# 2026-08-07 (Studio Phase 7 QA fixes)

## Version

v1.0.0-alpha

### Status

✅ Studio Phase 7 closed — social links fixed, `studio.history` rendered, keys stabilized

---

## Summary

Closed Phase 7 (Studio) with a QA pass over the Studio feature. Three findings were resolved: (1) `TeamMemberCard` and `ContactInformation` rendered `socialLinks` as inert `<span>`s — the `url` was never used, and on the Contact page real URLs were hidden as plain text. Both now filter `url !== "#"` (the same rule the `Footer` already applied) and render real anchors with `target="_blank"`, `rel="noopener noreferrer"`, and `--touch-target` hit areas. (2) `studio.history` was dead content — populated in `src/content/studio/index.ts:46` and documented in `docs/20-content-models.md`, but never rendered. A new `History` feature section (`src/features/studio/history.tsx`) renders the narrative between the dense `Awards` and `Timeline` lists, which also satisfies the "never stack multiple dense sections together" rule in `docs/12-page-architecture.md:195`. (3) `Awards`, `Timeline`, and `Partners` used index-based `key={i}` — replaced with stable content-derived keys. Verified: `npx tsc --noEmit`, targeted `eslint`, and prettier all pass.

## Added

- `src/features/studio/history.tsx` — Studio History section (narrow editorial prose, `Reveal` motion, renders `studio.history`, returns `null` when absent)
- `ui.sections.history` label in `src/content/ui/index.ts`

## Changed

- `src/features/studio/team-member-card.tsx` — social links now real anchors; `url !== "#"` filtered (matching Footer + Fullscreen Navigation)
- `src/features/contact/contact-information.tsx` — social links now real anchors; `url !== "#"` filtered
- `src/features/studio/timeline.tsx` — stable key `${event.year}-${event.title}` instead of `key={i}`
- `src/features/studio/awards.tsx` — stable key `${award.title}-${award.year}` instead of `key={i}`
- `src/features/studio/partners.tsx` — uses the client string as key instead of `key={i}`
- `src/app/(site)/studio/page.tsx` — `History` section inserted between `Awards` and `Timeline`

## Documentation Updated

- `docs/25-implementation-tracker.md` (Phase 7 → ✅ Completed, 100%; session note added)
- `docs/08-component-inventory.md` (History section added under Studio)
- `docs/30-changelog.md`

---

# 2026-08-03 (Navigation evolution — docs/06 philosophy)

## Version

v1.0.0-alpha

### Status

✅ Navigation rebuilt around the docs/06 philosophy: minimal header + fullscreen navigation as the only primary menu on all breakpoints

---

## Summary

Reviewed the existing navigation against `docs/06-navigation-philosophy.md`. The previous system was misaligned (no fullscreen navigation, a desktop horizontal link bar, no search layer, no supporting tier, menu state living inside the Header) and — critically — the repo did not compile: `DesktopNavigation` / `MobileNavigation` had been deleted after being documented, leaving dangling imports and orphaned lines in `Header.tsx` (TS1128/TS1109). Rebuilt navigation as a proper feature per docs/03: `src/features/navigation/` with a provider, context, fullscreen menu, and static search. The Header is now minimal on every breakpoint; the footer consumes the same shared navigation content; the sitemap derives its static routes from the typed navigation config. Motion follows the docs/06 staging sequence and is reduced-motion aware; accessibility uses `useDialog` + `inert` + `aria-current` + labeled search. Verified: typecheck + eslint + production build pass (32 routes).

## Added

- `src/features/navigation/navigation-provider.tsx` — owns `isMenuOpen`, closes the menu on route change (`queueMicrotask`), wraps the page in `inert` while open, mounts `FullscreenNavigation`
- `src/features/navigation/navigation-context.ts` — `NavigationContext` + `useNavigation` (separate module to avoid a circular import with the fullscreen menu)
- `src/features/navigation/fullscreen-navigation.tsx` — fullscreen primary menu (dialog via `useDialog`, numbered primary links 01–06, supporting tier, contact email/phone, featured project image, latest journal article, `data-lenis-prevent`, staged GSAP open/close)
- `src/features/navigation/menu-search.tsx` + `search-index.ts` — lightweight static client-side search over projects, services, and journal articles
- `src/config/navigation.ts` — typed `navigationConfig` (`primary`/`supporting` route keys) driving the menu, footer, and sitemap
- `src/content/navigation/index.ts` — `primaryNavLinks` / `supportingNavLinks` (replaces `navLinks`)

## Changed

- `Header` — minimal (Logo + Theme Toggle + Menu button) on all breakpoints; menu button has `aria-expanded` + `aria-haspopup="dialog"` and labels from `ui.navigation`; the desktop horizontal link bar is removed
- `Footer` — refactored to consume shared navigation content (`primaryNavLinks` / `supportingNavLinks`), `contactInformation` (email/phone/social with `#` filtered), and `ui.navigation` / `ui.sections` labels; 12-col 5/3/4 grid
- `src/app/sitemap.ts` — derives static routes from `navigationConfig` + `routes` (`staticRouteKeys`)
- `src/content/index.ts` / `src/content/ui/index.ts` — updated exports + navigation labels (`openMenu`, `closeMenu`, `menu`, `explore`, `featured`, `search`, `searchPlaceholder`, `noResults`)
- `src/app/(site)/layout.tsx` — wraps pages in `NavigationProvider`
- Menu order (docs/06): primary = Projects, Studio, Services, Process, Journal, Contact; supporting = Careers

## Removed

- `src/components/navigation/NavigationMenu.tsx` and the `src/components/navigation/` directory (dead code)
- The orphaned `DesktopNavigation` / `MobileNavigation` references — these are intentionally not recreated (docs/06)

## Documentation Updated

- `docs/08-component-inventory.md` (Navigation section → Header / Fullscreen Navigation / Menu Search / Navigation Provider)
- `docs/25-implementation-tracker.md` (Phase 3 tasks + note + sprint list)
- `docs/30-changelog.md`

---

# 2026-08-03 (Phase 14 — Motion: video intro splash)

## Version

v1.0.0-alpha

### Status

✅ Video intro splash implemented (Phase 14 Loading Experience)

---

## Summary

Implemented the branded full-screen video intro using `public/videos/rafa-video.mp4`. The overlay covers the viewport (`z-overlay`, above the header), plays the video (autoplay/muted/playsInline, `object-cover`, no controls), waits for `window load` + `document.fonts.ready` before starting, then fades out over 480 ms (opacity only) revealing the already-mounted header and homepage — the video's final logo is meant to align with the header logo for a continuous transition. Plays once per session via `sessionStorage`; refreshes/navigations skip it. `prefers-reduced-motion` skips the video entirely (instant display). Scroll is locked while active and restored on completion. All listeners and fallback timers are cleaned up. Also registered the Tailwind v4 `dark:` class variant and switched the Logo to a single transparent PNG with `invert dark:invert-0` (no white-box mismatch, no hydration flash).

## Added

- `src/components/splash/SplashProvider.tsx` — session + reduced-motion + ready-gating + scroll-lock logic (states: idle → cover → playing → fading → done)
- `src/components/splash/SplashScreen.tsx` — full-screen overlay + `<video>` + opacity fade
- `siteConfig.introVideo` (`/videos/rafa-video.mp4`) in `src/config/site.ts`
- `SplashProvider` mounted inside `Providers` in `src/app/layout.tsx`
- `@custom-variant dark` in `src/app/globals.css`

## Changed

- `Logo` — single transparent logo PNG with `invert dark:invert-0` (server component again; no theme state)

## Documentation Updated

- `docs/25-implementation-tracker.md` (Phase 14 Loading Experience ✅, 95%)
- `docs/09-animation-guidelines.md` (approved exception: branded video intro)
- `docs/10-animation-library.md` (Video Intro Splash animation entry)
- `docs/30-changelog.md`

---

## Version

v1.0.0-alpha

### Status

✅ Accessibility review completed — CDP a11y audit clean across all 11 routes

---

## Summary

Completed the accessibility review (Phase 16). Audited the production build with the CDP harness (`cdp-a11y.js`) across all 11 routes for the docs/21 targets: exactly one `h1` per page, no skipped heading levels, landmarks, skip link, image `alt`, accessible names on every interactive/form element, no placeholder (`#`) links, no duplicate IDs, and ≥44px touch targets. The first run surfaced four finding classes, all fixed in this session; the re-run is CLEAN on every route.

## Fixed

- **Heading hierarchy** — `FeaturedArticle` on `/journal` rendered a second `h1` beneath the page `h1` (changed to semantic `h2` via `as="h2"`; display styling unchanged). Listing pages (`/projects`, `/journal`, `/services`, `/process`, `/careers`) skipped from `h1` to card `h3` headings — added a `titleAs?: HeadingTag` prop to `ProjectCard` / `JournalCard` / `ServiceCard` / `PositionCard` / `ProcessStep` (default `h3`); listing pages pass `titleAs="h2"` while homepage and related sections keep `h3`. `HeadingTag` is now exported from `src/components/typography/Heading.tsx`.
- **Placeholder links** — footer social links were all `href="#"` (dead links that jump to top). `Footer` now filters to `href !== "#"` (`realSocialLinks`) and renders the "Connect" block only when real URLs exist, so no dead links ship until the studio provides real social URLs.
- **Touch targets** — added the `--touch-target: 2.75rem` design token to `src/styles/tokens.css`. Header nav links, logo, footer links, and filter chips use `min-h-(--touch-target)` / `min-w-(--touch-target)`; the theme toggle and mobile menu buttons use `size-(--touch-target)`. The nav active-underline indicator is now measured from the label span (`[data-nav-label]` — width, left, and bottom) so it still hugs the text after the enlarged hit area.

## Changed

- `src/features/journal/featured-article.tsx` — featured title is a semantic `h2`
- `src/features/projects/project-card.tsx`, `src/features/journal/journal-card.tsx`, `src/features/services/service-card.tsx`, `src/features/careers/position-card.tsx`, `src/features/process/process-step.tsx`, `src/features/process/process-timeline.tsx` — new `titleAs` prop
- Listing pages (`projects`, `journal`, `services`, `process`, `careers`) — pass `titleAs="h2"`
- `src/components/layout/Footer.tsx` — placeholder social links filtered; 44px link targets
- `src/components/navigation/NavigationMenu.tsx` — 44px targets + indicator re-anchored to the label span
- `src/components/layout/Header.tsx` (theme + mobile-menu buttons), `src/components/layout/Logo.tsx`, `src/components/ui/FilterChips.tsx` — 44px targets
- `src/components/typography/Heading.tsx` — `HeadingTag` type exported
- `src/styles/tokens.css` — `--touch-target` token

## Added

- `--touch-target: 2.75rem` design token (44px accessibility target)

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/30-changelog.md`

---

# 2026-08-01 (Phase 16 — Optimization: performance audit baseline + structured data; Phase 15 closed)

## Version

v1.0.0-alpha

### Status

✅ Phase 15 closed; Phase 16 opened (SEO — structured data shipped; final performance audit baseline)

---

## Summary

The final performance audit for Phase 15 ran on the production build via the CDP harness across 11 routes. Results meet the docs/20 budget: TTFB 12–78 ms, FCP 176–436 ms, LCP ≤ 1172 ms, CLS ≤ 0.0002, zero console errors/warnings, ~296–523 KB eager JS, 0–13 KB images, exactly two preloaded font families (Manrope + Inter), and a single lazy three.js canvas on `/`. The audit surfaced a critical defect: every `[slug]` detail page (projects/journal/services) was silently prerendered as a 404 because Next.js 16 fully removed synchronous `params` access — the pages destructured `{ params }` synchronously, so `params.slug` was `undefined` at build time and `notFound()` was baked into static HTML for every slug. Fixed by awaiting the `params` Promise (async pages + `Promise<{ slug: string }>` types) in all three `[slug]/page.tsx` files. Also opened Phase 16 and shipped its first SEO deliverable — Schema.org structured data: a `JsonLd` script component plus schema builders (`Organization` + `WebSite` globally in the root layout; `CreativeWork` on project detail, `Article` on journal detail, `BreadcrumbList` on listing/detail/static pages), verified as valid JSON-LD on every audited route. Lighthouse was attempted for the baseline but is not viable in this environment (Chrome launch hangs); the CDP numbers substitute and already meet the performance budget.

## Added

- `src/config/schema.ts` — Schema.org JSON-LD builders: `organizationSchema`, `websiteSchema`, `breadcrumbSchema`, `projectSchema` (CreativeWork), `articleSchema` (Article).
- `src/components/seo/JsonLd.tsx` — reusable server component rendering `application/ld+json` script tags.
- Global `Organization` + `WebSite` structured data in `src/app/layout.tsx`; `BreadcrumbList` on projects/journal/services (listing + detail) and studio/process/contact/careers.

## Fixed

- All `[slug]` detail pages returned 404 (Next.js 16 removed synchronous `params` access) — `src/app/(site)/projects/[slug]/page.tsx`, `src/app/(site)/journal/[slug]/page.tsx`, `src/app/(site)/services/[slug]/page.tsx` now `async` with `await params` (`Promise<{ slug: string }>`).

## Changed

- Phase 15 marked 100% (final performance audit baseline recorded); Phase 16 opened at 10% with SEO in progress.

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/30-changelog.md`

---

# 2026-08-01 (Bug fix — header overlapped by page content while scrolling)

## Version

v1.0.0-alpha

### Status

✅ Fixed — navigation stays visible and clickable while scrolling

---

## Summary

While scrolling, page content was painting over the fixed navigation header — hiding the nav links and intercepting clicks. Root cause: the z-index design tokens used the `--z-*` theme namespace (`--z-header`, `--z-overlay`, `--z-modal`, `--z-content`), but Tailwind v4's z-index theme namespace is `--z-index-*` (confirmed in `tailwindcss@4.3.3` `dist/lib.js` — the `z` utility declares `themeKeys: ["--z-index"]`). The `--z-*` variables therefore generated no utilities: `z-header`, `z-overlay`, and `z-modal` were absent from the compiled CSS, the fixed Header rendered with `z-index: auto`, and content with `z-10` (e.g. the hero column) painted above it. Fix: renamed the tokens to `--z-index-base/content/header/overlay/modal` in `src/styles/tokens.css`. Verified with the CDP harness on the production build: header computed `z-index: 50`, `elementFromPoint` returns the nav links (not page content) at scroll 0 / 300 / 1200, and the hero scene scroll integration is unchanged.

## Fixed

- `src/styles/tokens.css` — z-index tokens renamed from `--z-*` to `--z-index-*` (Tailwind v4's recognized z-index theme namespace), restoring the `z-header` / `z-overlay` / `z-modal` / `z-content` utilities.

## Documentation Updated

- `docs/30-changelog.md`
- `docs/25-implementation-tracker.md`

---

# 2026-08-01 (Phase 15 — Scroll Integration)

## Version

v1.0.0-alpha

### Status

✅ Hero scene scroll integration shipped

---

## Summary

The homepage hero scene now responds to scroll in the documented way (docs/10 Scroll Integration, docs/08 Scroll Philosophy): as the hero exits the viewport the scene recedes — a scrubbed GSAP ScrollTrigger fades it to zero opacity and scales it to 0.94 while the camera rises gently and dollies toward the composition. Scroll controls the transition from hero into content; the browser (Lenis) remains in control — no pinning, no scroll-jacking. The scroll value is bridged to the render loop through a tiny module (`src/three/utils/scroll-progress.ts`) read in `useFrame`, mirroring the existing pointer-ref pattern so Three.js rendering state stays isolated from React state. The effect is reduced-motion safe (the scene never mounts) and the camera response is gated to the high-quality preset. Also this session: `three`/`@types/three` downgraded to `^0.182.0` to clear the r185 `THREE.Clock` deprecation warning surfaced by R3F 9.7.0. Verified with the CDP harness on dev + production: wrapper opacity/scale track scroll exactly, reduced motion renders no canvas, console clean. typecheck + lint + prettier + build pass (32 routes).

## Added

- `src/three/utils/scroll-progress.ts` — isolated scroll-progress bridge (`setScrollProgress` / `getScrollProgress`) between ScrollTrigger and the render loop.

## Changed

- `src/three/scenes/HeroCanvas.tsx` — scrubbed `gsap.fromTo` on the scene wrapper via `useScopedGsap` (opacity → 0, scale → 0.94) over the hero exit (`start: "top top"`, `end: "bottom top"`), `onUpdate` writes progress; progress resets on unmount.
- `src/three/components/CameraRig.tsx` — reads scroll progress in `useFrame`; camera rises (+0.7 Y), dollies toward the composition (−0.6 Z), and the look-at lifts (+0.6), gated behind `enabled` (high quality only).
- `three` `^0.185.1` → `^0.182.0`, `@types/three` `^0.185.3` → `^0.182.0` — clears the `THREE.Clock` deprecation warning while staying within R3F 9.7.0's supported peer range.

## Documentation Updated

- `docs/30-changelog.md`
- `docs/25-implementation-tracker.md`
- `docs/27-development-order.md`

---

# 2026-08-01 (Bug fix — dark-mode hydration mismatch)

## Version

v1.0.0-alpha

### Status

✅ Console error resolved — dark-mode theme toggle no longer breaks hydration

---

## Summary

The `ThemeProvider` initialized `isDark` by reading the DOM during hydration while the server always rendered `isDark = false`. On dark-mode systems the pre-hydration script adds the `.dark` class, so the client's first render (Sun / "Switch to light mode") disagreed with the server HTML (Moon / "Switch to dark mode"). React treated the mismatch as a hydration failure, discarded the server HTML, and regenerated the whole tree client-side — which is what re-created the inline pre-hydration `<script>` element and surfaced React's "Encountered a script tag while rendering React component" console error. Fixed by deriving `isDark` from the live `.dark` class via `useSyncExternalStore` (server snapshot `false` keeps SSR/hydration output identical; a `MutationObserver` keeps consumers in sync after hydration). Verified with a headless-Chrome CDP harness in both `prefers-color-scheme` schemes on the home and studio pages: no hydration errors, no script-tag error, and the toggle still flips the class, persists `localStorage`, and swaps the Sun/Moon icon.

## Fixed

- Dark-mode hydration mismatch in the Header theme toggle (server vs client `isDark`) — the root cause of the reported "Encountered a script tag" console error.
- `ThemeProvider` now derives `isDark` from `document.documentElement` `.dark` class via `useSyncExternalStore` instead of `useState` + `useEffect`; `toggleTheme` writes the class and `localStorage` directly.

## Changed

- `three` `^0.185.1` → `^0.182.0` and `@types/three` `^0.185.3` → `^0.182.0` to eliminate the `THREE.Clock` deprecation warning (introduced in r183) while staying within R3F 9.7.0's supported peer range. Scene renders identically; no project code touched.

## Issues Encountered

- Discovered a third-party console warning in the Phase 15 scene: three r185 deprecated `THREE.Clock` in favor of `THREE.Timer`, and `@react-three/fiber@9.7.0` still constructs a `Clock` internally. Resolved by downgrading `three` / `@types/three` to `0.182.0` (the last release before the deprecation; still within R3F's supported `>= 0.156` range). Verified the warning is gone with the CDP harness.

## Documentation Updated

- `docs/30-changelog.md`
- `docs/29-known-issues.md`
- `docs/25-implementation-tracker.md`

---

# 2026-08-01 (Phase 15 — Three.js Hero Scene)

## Version

v1.0.0-alpha

### Status

🟨 Phase 15 (Three.js) started — first approved scene shipped

---

## Summary

Built the first scene type from `docs/11-threejs-guidelines.md` — the Hero Scene — as a calm architectural massing model rendered behind the homepage hero. A new isolated `src/three/` layer provides progressive enhancement (WebGL + reduced-motion gated), a homepage-only lazy client chunk, a theme-adaptive palette, a mobile low-quality preset, and an offscreen pause. typecheck + lint + prettier + production build all pass (32 routes).

---

## Completed

- 🟨 Three.js foundation — installed `three@0.185.1`, `@react-three/fiber@9.7.0`, `@types/three` and created the documented `src/three/{components,hooks,scenes,utils}` structure (drei intentionally omitted — no HDR/model assets; R3F primitives keep the bundle lean).
- 🟨 Hero Scene — an instanced stone massing model (1 draw call, 14 volumes) over a soft circular plinth, warm key + ambient lighting with a soft shadow, gentle camera drift + mouse parallax (`CameraRig`), and an `IntersectionObserver` offscreen pause.
- 🟨 Progressive enhancement — `HeroScene` renders nothing without WebGL or under `prefers-reduced-motion`; the SSR home page contains no `<canvas>`; the existing typographic hero is untouched and remains the fallback.
- 🟨 Mobile fallbacks — `useSceneQuality` selects a low preset at ≤48rem (fewer instances, no shadows, static camera, dpr clamp).
- 🟨 Performance — `next/dynamic` + `ssr:false`; the ~868 KB three/fiber chunk appears in zero routes' eager manifests (client-only, homepage-gated, lazy-loaded).
- 🟨 Fixed a pre-existing type error in `TextReveal` (polymorphic `as: ElementType` + `ref` does not typecheck under React 19 types — switched to `createElement` + `HTMLElementType`).

## Changed

- `src/features/home/hero.tsx` — hosts the scene layer (`aria-hidden`, `pointer-events-none`) with a `z-10` content column
- `src/config/theme.ts` — added a theme-adaptive scene palette (volume + ground) for the 3D layer
- `package.json` — added three deps; `sharp` override aligned to `^0.35.3` (npm 11 rejects overrides that differ from the direct dependency)
- `src/motion/TextReveal.tsx` — polymorphic rendering via `createElement` + `HTMLElementType`

## Added

- `src/three/hooks/use-is-webgl.ts`
- `src/three/hooks/use-scene-quality.ts`
- `src/three/components/CameraRig.tsx`
- `src/three/components/StudioLighting.tsx`
- `src/three/components/ArchitecturalVolumes.tsx`
- `src/three/scenes/HeroCanvas.tsx`
- `src/three/scenes/HeroScene.tsx`
- `src/three/utils/getScenePalette.ts`

## Decisions Made

- Drei is omitted despite docs/10 "prefer Drei" — with no HDR/model assets it would add heavy sub-dependencies; the scene is built from R3F primitives and matches "avoid unnecessary dependencies".
- The scene palette lives in `src/config/theme.ts` (the JS token mirror) so 3D colors are theme-adaptive and design-system-driven, matching the existing `background` / `backgroundDark` precedent.

## Issues Encountered

- `npm i` failed with `EOVERRIDE` — npm 11 requires the `sharp` override to match the direct dependency spec (`^0.35.3`).
- `TextReveal` did not typecheck under React 19 types (`as: ElementType` + `ref` resolves `children`/`ref` to `never`) — pre-existing, fixed in this session.

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/27-development-order.md`
- `docs/28-release-notes.md` — this entry
- `docs/30-changelog.md`
- `docs/08-component-inventory.md`

---

# 2026-08-01 (Backlog Completion — Placeholder Imagery, Tokens, Dark Mode)

## Version

v1.0.0-alpha

### Status

🟢 High backlog + remaining Low backlog resolved

---

## Summary

Resolved the last high item and all remaining low items from `docs/29-known-issues.md`. Generated 32 deterministic placeholder images into `public/images/**` so every `<Image>` renders real imagery instead of the fallback box; tokenized remaining hardcoded values (aspect ratios, header height, textarea min-height, micro-interactions); removed duplicated motion token exports; and implemented dark mode via a `.dark` class with an inline pre-hydration script and a stored user preference. The known-issues backlog is now empty. typecheck + lint + prettier + production build all pass (32 routes).

---

## Completed

- 🟠 Placeholder imagery — new `scripts/generate-placeholder-images.mjs` (Node + sharp) derives the 32 unique `/images/**` paths from `src/content/**`, renders deterministic seeded JPEGs (seeded hue gradient + horizon accent + vignette, per-asset aspect ratio, quality 75) into `public/images/**`. Wired as `npm run generate:images`. All project/studio/journal/process/team imagery now resolves; the muted fallback box is gone.
- 🟢 Token dedup — removed dead `motion.durations` / `motion.easing` exports from `src/design-system/motion.ts` (all consumers use `motion.values`). Breakpoint systems unified behind `--breakpoint-tablet` (48rem) / `--breakpoint-desktop` (64rem); media queries intentionally use literals with a token-naming comment because CSS `@media` conditions cannot consume `var()` (documented as ADR-021 — the build pipeline rejects it).
- 🟢 Hardcoded values → tokens — new `@theme` aspect tokens (`aspect-hero` 21/9, `aspect-landscape` 16/9, `aspect-standard` 4/3, `aspect-portrait` 3/4) consumed in heroes, cards, galleries, the office map, and process/team visuals; `:root` `--header-height: 4rem`, `--micro-lift: 0.25rem`, `--micro-scale: 1.04` consumed by `h-(--header-height)`/`pt-(--header-height)`, `hover:-translate-y-(--micro-lift)` and `scale-(--micro-scale)`; Textarea `min-h-[6rem]` → `min-h-(--spacing-3xl)`; layout theme color sourced from `src/config/theme.ts` (single JS theme source).
- 🟢 Dark mode (ADR-020) — `.dark` palette in `tokens.css` (`--rafa-background: #14120f`, `foreground`, `surface`, `accent`, `border`, `muted`), `html.dark { color-scheme: dark; }`, inline no-dependency script in `layout.tsx` that sets `.dark` before hydration (stored value → `prefers-color-scheme`), `suppressHydrationWarning`, `viewport.themeColor` for light + dark, new `src/providers/theme-provider.tsx` (`isDark` / `toggleTheme`, persists to `localStorage`), and a Header Sun/Moon toggle consuming `ui.theme` copy.

## Changed

- `src/styles/tokens.css` — added `--aspect-*` theme tokens, `:root` header/micro tokens, and the `.dark` palette
- `src/styles/base.css` — added `html.dark { color-scheme: dark; }`
- `src/styles/utilities.css` — media-query literals annotated with the breakpoint token they mirror
- `src/app/layout.tsx` — theme-color viewport, pre-hydration script, `suppressHydrationWarning`
- `src/components/layout/Header.tsx` — `h-16` → `h-(--header-height)`; Sun/Moon theme toggle added
- `src/components/layout/PageContainer.tsx` — `pt-16` → `pt-(--header-height)`
- `src/components/forms/Textarea.tsx` — `min-h-[6rem]` → `min-h-(--spacing-3xl)`
- `src/components/media/Image.tsx`, `Carousel.tsx`, `office-map.tsx`, all project/journal/studio/process cards & heroes — aspect + micro-interaction tokens
- `src/design-system/motion.ts` — removed dead `durations` / `easing` exports
- `src/providers/providers.tsx` — wraps app in `ThemeProvider`
- `src/content/ui/index.ts` — added `ui.theme.{light,dark}` labels
- `package.json` — added `generate:images` script; `sharp` devDependency pinned to the existing `^0.35.0` override

## Added

- `scripts/generate-placeholder-images.mjs`
- `src/providers/theme-provider.tsx`
- `src/config/theme.ts` (repurposed from deleted stub to the single JS theme source)
- 32 JPEG assets under `public/images/{projects,studio,journal,process,team}/`

## Removed

- Dead `motion.durations` / `motion.easing` exports from `src/design-system/motion.ts`

## Decisions Made

- Placeholder images are deterministic and committed; the generator is idempotent (skips existing files) and re-runnable after client photography arrives.
- Dark mode uses a `.dark` class + stored preference rather than pure `prefers-color-scheme`, because `color-scheme: light` would force light user-agent UI (scrollbars/inputs) that CSS cannot fully override (ADR-020).
- Media queries keep literal breakpoint values — `var()` inside `@media` is invalid CSS and breaks the Turbopack build (ADR-021).
- `motion.durations`/`motion.easing` (CSS-var strings) had zero consumers; only `motion.values` is used.

## Issues Encountered

- `npm i -D sharp` failed with `EOVERRIDE` — the repo pins a `sharp@^0.35.0` override, so installed `sharp@^0.35.0` to match.
- First build attempt failed with 6 CSS parse errors — `@media (width >= var(--breakpoint-*))` is rejected by the CSS parser. Reverted the `--breakpoint-md`/`--breakpoint-lg` var aliases and the var-based media queries; verified the build is clean with literals.

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md` — this entry
- `docs/29-known-issues.md` — backlog cleared; notes added for placeholder regeneration + media-query constraint
- `docs/30-changelog.md`
- `docs/01-architecture-decisions.md` — ADR-020 (dark mode), ADR-021 (media-query literals)
- `docs/04-design-system.md` — design tokens section

## Current Progress

Current Phase

🟨 Phase 14 — Motion (core complete)

Current Milestone

Core motion language wired across all pages

Overall Progress

62%

## Next Session

- Phase 15 — Three.js (hero scene, interactive elements, performance optimization, mobile fallbacks), or
- Refresh `public/images/**` with client-provided photography (`npm run generate:images` regenerates any missing files).

---

---

## Version

v1.0.0-alpha

### Status

🟢 Medium backlog resolved

---

## Summary

Resolved the entire medium-priority backlog from `docs/29-known-issues.md` (12 items) plus the low-priority port/theme/`.gitkeep` scaffolding items. The medium backlog is now empty: motion correctness, content separation, shared primitives, accessibility, CSS utilities, dead code, config drift, and content-model inconsistencies are all addressed. typecheck + lint + prettier + production build all pass (32 routes).

---

## Completed

- 🟡 Reduced-motion guard no longer paints one frame late — `useReducedMotion` now uses `useSyncExternalStore` and reads the media query synchronously on first render.
- 🟡 Stagger values default to the motion token (`motion.values.reveal.stagger`); only intentional explicit overrides remain (previously 11 files hardcoded values).
- 🟡 `ScrollTrigger.refresh()` wired in: `Image` fires it on `onLoad`; `PageTransition` on route change and for reduced-motion users; `lenis-provider` after setup.
- 🟡 Lenis provider rewritten — driven from `gsap.ticker` (shared clock, `lagSmoothing(0)`), syncs with `ScrollTrigger.update`, tuned from motion tokens, destroys instance on unmount; dead `useLenis` export removed.
- 🟡 Content copy extracted: new `src/content/ui/` (filters, metadata, navigation, sections, form) and `src/content/pages/` (page titles + descriptions); footer content sourced from `@/content/navigation`; all pages/features/components consume content modules; `homeContent.journal.articles` gained real slugs + ISO dates so preview cards link to articles.
- 🟡 Shared primitives extracted: `Grid`, `FilterChips`, `Field`, `StatePanel`, `useDialog`; `ProjectFilter`/`CategoryFilter`, `Project/Journal/Services` grids, `Input`/`Textarea`, `Empty/Error/Success` states, and `Modal`/`Dialog`/`Drawer` now delegate to them; homepage previews reuse `ProjectCard`/`JournalCard`; `services/[slug]` related row reuses `ProjectCard`.
- 🟡 Nested `<Link><Button>` in `contact-cta` replaced with a button-styled link (valid HTML, single tab stop).
- 🟡 Accessibility pass per `docs/22-accessibility.md`: skip link to `#main-content`; focus trap + focus restore + `aria-modal` on overlays; Tabs roving tabindex + arrow keys + real ids; Accordion `aria-expanded`/`aria-controls`/`role="region"`; Carousel region semantics + `aria-current` dots; MobileNavigation Escape/focus trap/`inert`; filters `aria-pressed`; form errors `role="alert"` + success `aria-live`; `OfficeMap` region role; label contrast raised to `/60`.
- 🟡 CSS utilities implemented as Tailwind v4 `@utility`: `scrollbar-hide`, `transition-grid`, `animate-in`, `fade-in`. `Dialog` destructive variant, `Toast` style map (4 distinct types), and `Video` unused ref fixed.
- 🟡 Dead code removed: 8 feature barrels, dead `motion/index.ts` exports, `config/theme.ts`, `types/design-system.ts`, unused `design-system` modules (colors/spacing/radius/shadows/z-index/containers/breakpoints/ratios), empty scaffold dirs (`src/constants|data|contexts|hooks|layouts|sections|services|stores|utils`, `src/three/**`, `src/features/{navigation,footer}`, `src/app/(site)/privacy`, `src/assets/**`).
- 🟡 Route/config drift synced: `routes.ts` `home` + `notFound` active; `src/app/not-found.tsx` added; `NavigationMenu` active state uses first-segment prefix matching (nested routes highlight parents); `robots.txt` verified against real `sitemap.ts`.
- 🟡 Content model unified: shared `SocialLink` + `Location` in `src/content/types.ts`; `Office` extends `Location`; new `src/content/index.ts` barrel; garbled `减法` text fixed.
- 🟢 `.env.example` URL aligned to port 8000; `PageTransition` hardened (tween wrapped in `gsap.context`, cleanup on unmount, import via `@/motion` barrel).

## Changed

- `src/motion/{use-reduced-motion,TextReveal,Parallax,Reveal,Stagger,ImageReveal}.tsx`, `src/motion/index.ts`, `src/motion/reduced-motion.ts` (deleted)
- `src/providers/lenis-provider.tsx`
- `src/components/media/{Image,Carousel,Video}.tsx`
- `src/components/layout/{PageTransition,Footer}.tsx`
- `src/components/navigation/{MobileNavigation,NavigationMenu}.tsx`
- `src/components/ui/{Modal,Dialog,Drawer,Tabs,Accordion,Toast}.tsx`
- `src/components/forms/{Form,Input,Textarea}.tsx`
- `src/components/feedback/{EmptyState,ErrorState,SuccessState}.tsx`
- `src/app/layout.tsx`, `src/app/(site)/**/page.tsx` (all pages), `src/features/**`
- `src/styles/utilities.css`
- `src/content/**` (ui, pages, footer, home, journal, studio, projects, company)
- `src/config/{routes,theme}.ts`, `src/types/design-system.ts`, `src/design-system/index.ts`
- `.env.example`

## Added

- `src/components/ui/{Grid,FilterChips,Field,StatePanel,useDialog}.tsx`
- `src/content/{ui,pages,index}.ts`
- `src/app/not-found.tsx`

## Removed

- 8 feature barrel `index.ts` files
- `src/config/theme.ts`, `src/types/design-system.ts`
- `src/design-system/{colors,spacing,radius,shadows,z-index,containers,breakpoints,ratios}.ts`
- `src/motion/reduced-motion.ts` and dead exports from `src/motion/index.ts`
- Empty scaffold directories and `.gitkeep` files

## Decisions Made

- Stagger overrides are now explicit and intentional; the default comes from the token.
- Feature components import from subpaths (e.g. `@/features/projects/project-card`) after removing barrels.
- `config/seo.ts` and `design-system/motion.ts`/`typography.ts` are kept (consumed); other TS token modules deleted in favor of the CSS token layer.
- `robots.txt` → `/sitemap.xml` was already correct (`sitemap.ts` exists).
- Dark-mode (`color-scheme: light`) remains deferred per ADR.

## Issues Encountered

- Prettier repo-wide debt (docs + many components never formatted) — resolved by running `prettier --write .`; `format:check` now passes.
- `pageContent.studio.title` was missing — added, and the studio page metadata now consumes it.
- `import/order` errors in 4 landing pages after content extraction — fixed.

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md` — this entry
- `docs/29-known-issues.md` — medium backlog removed; remaining: 1 high (images) + 3 low
- `docs/30-changelog.md`

## Current Progress

Current Phase

🟨 Phase 14 — Motion (core complete)

Current Milestone

Core motion language wired across all pages

Overall Progress

62%

## Next Session

- Phase 15 — Three.js (hero scene, interactive elements, performance optimization, mobile fallbacks), or
- The 1 remaining high item: obtain client-provided photography (`public/images/**`), or
- The 3 low items from `docs/29-known-issues.md`.

---

---

# 2026-08-01 (Debt Resolution)

## Version

v1.0.0-alpha

### Status

🟢 Critical + High backlog resolved

---

## Summary

Resolved the critical and high-priority issues from the 2026-08-01 audit backlog (`docs/29-known-issues.md`). The production homepage now renders, listing-page filters work, GSAP eases register before first use, motion duration utilities apply, the contact form validates and submits through a real API route, unused dependencies are pruned, and SEO metadata is complete (OG/Twitter/icons/sitemap/generateMetadata). typecheck + lint + production build all pass (32 routes).

---

## Completed

- 🔴 Deleted `src/app/page.tsx` (returned `null` and shadowed the real homepage at `/`) — verified the built `index.html` now contains the full homepage.
- 🟠 `projects/page.tsx` and `journal/page.tsx` now type `searchParams` as `Promise` and `await` it — category filtering activates again.
- 🟠 `GSAPProvider` registers `ScrollTrigger` + `CustomEase` and creates the three named eases at module scope, before any motion primitive creates tweens.
- 🟠 `tokens.css` adds Tailwind v4 namespace aliases (`--transition-duration-*` → `duration-*`, `--ease-*` → `ease-*`) so `duration-base` / `duration-slow` etc. apply in ~11 components.
- 🟠 Contact form rebuilt on `react-hook-form` + `zod` with real validation and a submission path: new `/api/contact` route validates server-side and sends via Resend when `RESEND_API_KEY` is set.
- 🟠 Removed 10 unused production deps (framer-motion, sonner, swiper, react-countup, react-markdown, yet-another-react-lightbox, three, @react-three/fiber, @react-three/drei, cva); form stack adopted and now used.
- 🟠 SEO: root layout uses new `createMetadata()` helper (`src/config/seo.ts`); added OG + Twitter blocks, icons, canonical; detail pages return bare titles (no double site-name); every landing page exports `generateMetadata`; added `src/app/sitemap.ts`; added `opengraph-image.tsx` + `twitter-image.tsx`; added `public/icon.svg`; `siteConfig.url` falls back to localhost so `metadataBase`/sitemap resolve without env.

## Changed

- `src/app/layout.tsx`, `src/app/(site)/**/page.tsx` (all pages), `src/providers/gsap-provider.tsx`, `src/styles/tokens.css`, `src/components/forms/{Input,Textarea}.tsx`, `src/features/contact/contact-form.tsx`, `src/config/{seo,site}.ts`, `src/app/api/contact/route.ts` (new), `src/app/sitemap.ts` (new), `src/app/{opengraph-image,twitter-image}.tsx` (new), `public/icon.svg` (new), `.env.example` (`RESEND_API_KEY`), `next.config.ts`, `package.json`.

## Added

- `src/app/api/contact/route.ts`
- `src/app/sitemap.ts`
- `src/app/opengraph-image.tsx`
- `src/app/twitter-image.tsx`
- `public/icon.svg`

## Removed

- `src/app/page.tsx`
- `src/app/api/.gitkeep`
- 10 unused production dependencies

## Issues Encountered

- `exactOptionalPropertyTypes` rejected `error?: string | undefined` from react-hook-form — widened the prop types on `Input` / `Textarea`.
- Stale `.next` cache referenced the deleted root `page.tsx` — cleared `.next` before rebuilding.
- Prettier repo-wide debt is pre-existing (docs + many untouched components); only touched files were formatted.

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md` — this entry
- `docs/29-known-issues.md` — critical + high items removed
- `docs/30-changelog.md`

## Current Progress

Current Phase

🟨 Phase 14 — Motion (core complete)

Current Milestone

Core motion language wired across all pages

Overall Progress

62%

## Next Session

- Phase 15 — Three.js (hero scene, interactive elements, performance optimization, mobile fallbacks), or
- Continue the Medium backlog from `docs/29-known-issues.md` (a11y pass, shared primitives, content extraction, Lenis tuning, `ScrollTrigger.refresh()`).

---

---

# 2026-08-01 (Project Audit)

## Version

v1.0.0-alpha

### Status

🟢 Project Audit — no code changed

---

## Summary

Performed a full-project review of the codebase (components, features, motion, providers, design system, content, config, app pages) and of the production build output. Documented the complete technical-debt backlog in `docs/29-known-issues.md` (rewritten — previously contained only stale resolved entries). No implementation changes were made; findings are staged for the next session.

---

## Findings — Technical Debt

### Critical

- Homepage renders blank in production: `src/app/page.tsx` returns `null` and shadows the real homepage at `src/app/(site)/page.tsx` for `/`. Verified empirically — the built `/` page body contains only the root layout shell. Fix: delete the root `page.tsx`.

### High

- `searchParams` read synchronously on `projects` / `journal` pages — a Promise in Next 15+/16, so category filtering never activates at runtime.
- GSAP `ScrollTrigger`/`CustomEase` registration runs in a passive effect after child layout effects create the first tweens (wrong ease + possible missing triggers on first paint).
- `--motion-duration-*` / `--motion-ease-*` tokens don't map to Tailwind v4 namespaces → `duration-base` / `duration-slow` are silent no-ops in ~11 components.
- Contact form has no validation or submission (always succeeds); `react-hook-form` / `zod` / `resend` installed but unused.
- 14 unused production dependencies (framer-motion, three stack, form stack, sonner, swiper, react-markdown, react-countup, lightbox, cva).
- All real image assets missing (`public/images/**` is `.gitkeep`-only) — every image renders the fallback.
- SEO/metadata incomplete: no OG/Twitter/icons (favicon deleted), detail pages double-append the site name, most pages lack `generateMetadata`, `robots.txt` references a missing sitemap, `seoConfig` is dead code.

### Medium

- Reduced-motion first-paint flash (media query read one effect phase too late).
- Hardcoded stagger values (11 files) bypass the motion token.
- No `ScrollTrigger.refresh()` anywhere.
- Lenis provider: separate rAF clock, StrictMode double-create, dead `useLenis`, hardcoded tuning.
- Content copy hardcoded in ~20 components/pages instead of `src/content/`.
- Duplicated components: filters, grids, Modal/Dialog/Drawer, Input/Textarea, state panels; homepage previews re-implement cards inline.
- Nested `<Link><Button>` in `contact-cta`.
- Accessibility gaps: no skip link, no focus trap in overlays, broken Tabs ARIA, focusable closed mobile menu, filters without `aria-pressed`, `noValidate` form, low-contrast labels.
- Broken CSS utilities: `scrollbar-hide`, `transition-grid`, `animate-in` (plugin not installed).
- Dead code: 13 unused components, 8 unused feature barrels, dead exports/config/types, ~15 empty `.gitkeep` scaffold dirs, no-op `Dialog` destructive variant, Toast style-map duplicates.
- Route/navigation config drift (`home` still `planned`, `notFound` route without a page, footer re-implements nav map).
- Content-model inconsistencies (two `SocialLink` shapes, `Location` vs `Office`, date formats) and garbled `减法` text in studio philosophy.

### Low

- Motion values duplicated across `tokens.css` and `motion.ts`; three parallel breakpoint systems; `max-w-*` defaults instead of container tokens.
- Hardcoded hex/spacing/aspect ratios instead of tokens; dev port 8000 vs `NEXT_PUBLIC_SITE_URL` 3000 mismatch; theme stub.
- Residual `.gitkeep` files; `PageTransition` SSR `useLayoutEffect` without cleanup.

---

## What Can Be Improved / Refactored (planned)

- Extract shared primitives: `Grid`, `FilterChips`, `Overlay`/`useDialog`, `Field`, `StatePanel`, `MediaCard`; reuse `ProjectCard`/`JournalCard` in homepage previews.
- Register GSAP plugins at module scope; drive Lenis from `gsap.ticker`; add `ScrollTrigger.refresh()` after image load and route change.
- Rename motion CSS tokens to Tailwind namespaces and standardize the utility form.
- Move all page/feature copy into `src/content/`.
- Delete dead components/exports/scaffold dirs and the 14 unused dependencies.
- Systematize the accessibility pass per `docs/22-accessibility.md`.

---

## Documentation Updated

- `docs/25-implementation-tracker.md` — audit note + Known Issues section now links to the backlog
- `docs/29-known-issues.md` — full rewrite from stale state with the complete audit backlog
- `docs/28-release-notes.md` — this entry

## Current Progress

Current Phase

🟨 Phase 14 — Motion (core complete)

Current Milestone

Core motion language wired across all pages

Overall Progress

62%

## Next Session

- Resolve the critical + high issues from `docs/29-known-issues.md` (delete root `page.tsx`; await `searchParams`; fix plugin registration order; fix motion token utilities; prune dependencies; wire contact form)
- Then Phase 15 — Three.js

---

---

# 2026-08-01 (Phase 14)

## Version

v1.0.0-alpha

### Status

🟢 Phase 14 — Motion (core complete, 90%)

---

## Summary

Built the core motion system — tokenized animation primitives in a new `src/motion/` module, reduced-motion support, pathname-keyed page transitions, a navigation active indicator, and tokenized hover micro-interactions — then wired motion across every page (homepage, projects, services, studio, process, journal, contact, careers, and all slug pages). Custom cursor and fake loading experience were intentionally skipped per `docs/09-animation-guidelines.md`.

---

## Completed

- Extended `src/design-system/motion.ts` — motion tokens: durations (fast 0.16 / base 0.24 / slow 0.48 / cinematic 0.9), ease names (standard / emphasized / cinematic) + cubic-bezier `easePath`, `reveal` (start "top 85%", y 24, stagger 0.1), `parallax.max 0.2`, `micro` (scale 1.04, lift 4)
- GSAP provider registers `CustomEase` and creates the three named eases from tokens
- New `src/motion/` primitives: `Reveal`, `Stagger`, `TextReveal` (word-split), `ImageReveal` (clip-path + inner scale), `Parallax`, `useReducedMotion`, `useScopedGsap`, `presets`, `reduced-motion`, barrel `index.ts`
- All primitives gated by reduced-motion and driven by design tokens
- `PageTransition` — pathname-keyed fade-in on route change (skips first render, respects reduced motion)
- `NavigationMenu` — absolute accent indicator aligned to `[aria-current="page"]`, repositioned on resize/fonts ready
- New utilities `.link-underline` and `.transition-micro`; `Image` component gains `imgClassName` for hover zoom
- Wired motion across homepage, projects, services, studio, process, journal, contact, careers, and slug pages
- Grid wrappers (`ProjectGrid`, `ServicesGrid`, `JournalGrid`) + timelines/staggered lists animate via `Stagger`
- Card micro-interactions: image zoom on hover, card lift, link underlines
- Removed hero `animate-bounce` in favor of a tokenized mount reveal

## Changed

- `src/providers/gsap-provider.tsx` — registers `CustomEase`; creates `ease-standard`, `ease-emphasized`, `ease-cinematic` from tokens
- `src/components/layout/PageTransition.tsx` — from passthrough div to client fade shell
- `src/components/navigation/NavigationMenu.tsx` — active indicator + underline utility
- `src/components/media/Image.tsx` — added `imgClassName` prop
- `src/styles/utilities.css` — added `.link-underline` and `.transition-micro`
- Homepage + all feature sections and pages — wrapped in `Reveal` / `Stagger` / `ImageReveal` / `TextReveal`
- `docs/25-implementation-tracker.md` — Phase 14 0% → 90%, overall 56% → 62%

## Added

- `src/motion/reduced-motion.ts`
- `src/motion/use-reduced-motion.ts`
- `src/motion/use-scoped-gsap.ts`
- `src/motion/presets.ts`
- `src/motion/Reveal.tsx`
- `src/motion/Stagger.tsx`
- `src/motion/TextReveal.tsx`
- `src/motion/ImageReveal.tsx`
- `src/motion/Parallax.tsx`
- `src/motion/index.ts`

## Removed

- Hero `animate-bounce` (replaced with tokenized reveal)
- `src/motion/.gitkeep`, `src/hooks/.gitkeep` (replaced by real modules)

## Decisions Made

- Motion language built as small composable primitives (`Reveal`, `Stagger`, `TextReveal`, `ImageReveal`) rather than one global animation system
- All durations/eases come from design tokens; `CustomEase` curves registered once in the GSAP provider
- Reveals use `once: true` with `start: "top 85%"` per animation guidelines; above-fold content uses `mount` mode
- `useScopedGsap` passes the scope ref into the setup callback to satisfy the `react-hooks/immutability` lint rule
- Custom cursor skipped — `docs/09-animation-guidelines.md` discourages non-functional custom cursors
- Loading experience skipped — `docs/08` discourages fake loaders; real assets/Three.js may warrant a strategy later
- Reduced-motion preference disables all animation via a matchMedia hook

## Issues Encountered

- `react-hooks/immutability` ESLint error when setup callback referenced the scope ref — resolved by passing the ref as a callback argument (`(_, scopeRef) => ...`)

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/27-development-order.md`
- `docs/28-release-notes.md`
- `docs/30-changelog.md`

## Current Progress

Current Phase

🟨 Phase 14 — Motion

Current Milestone

Core motion language wired across all pages

Overall Progress

62%

## Next Session

- Phase 15 — Three.js (hero scene, interactive elements, performance optimization, mobile fallbacks)
- Deferred Phase 14 tasks: custom cursor + loading experience (revisit after Phase 16 if warranted)

---

---

# 2026-07-31 (Phase 13)

## Version

v1.0.0-alpha

### Status

🟢 Phase 13 — Media Infrastructure (80%)

---

## Summary

Built the core media infrastructure — the `Image` component now consumes the `ImageAsset` content model with a graceful placeholder fallback, wired across projects, studio, journal, homepage, and process supporting visuals. Fixed all lint debt and the `useSearchParams` prerender error; the production build now passes with 28 static routes.

---

## Completed

- Rewrote `Image` component to consume `ImageAsset` (src, alt, width, height, caption, credit)
- Added graceful `bg-muted` fallback when an asset fails to load or is missing
- Populated image data for studio, journal articles, and process supporting visuals
- Wired `Image` across project cards, galleries, detail heroes, journal cards/featured, studio intro + team cards, homepage sections
- Added `ProcessStep.visual?: ImageAsset` optional field
- Created local media directories `public/images/{projects,team,journal,studio,process}`
- Fixed `useSearchParams` CSR bailout — filters now receive `active` from server pages (no Suspense needed)
- Cleaned lint to 0 errors / 0 warnings
- Production build passes: 28 static routes (○ Static / ● SSG)

## Changed

- `src/components/media/Image.tsx` — now a client component consuming `ImageAsset`; `sizes` required, dead `aspectRatio` prop removed, fill/non-fill branches collapsed, fallback keeps `alt` via `aria-label`
- `ImageAsset` type moved to shared `src/content/types.ts` (removed cross-feature dependency on `@/content/projects`)
- `sizes` breakpoints aligned with design tokens (`48rem` / `64rem`)
- `ProjectFilter` / `CategoryFilter` — accept `active` prop instead of calling `useSearchParams`
- `src/content/{home,studio,process}/index.ts` — image data added
- `docs/25-implementation-tracker.md` — Phase 13 0% → 80%, overall 52% → 56%

## Added

- `public/images/projects/.gitkeep`
- `public/images/team/.gitkeep`
- `public/images/journal/.gitkeep`
- `public/images/studio/.gitkeep`
- `public/images/process/.gitkeep`
- `src/content/types.ts` — shared content models

## Issues Encountered

- `next build` first failed with a stale Turbopack `next/font` cache error — resolved by clearing `.next`

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`
- `docs/30-changelog.md`

## Current Progress

Current Phase

🟨 Phase 13 — Media Infrastructure

Current Milestone

Image pipeline wired across all pages

Overall Progress

56%

## Next Session

- Phase 14 — Motion (GSAP scroll reveals, hero animation, image parallax/zoom per `docs/09-animation-guidelines.md` + `docs/10-animation-library.md`)
- Deferred Phase 13 tasks: real photography assets (client-provided media), video pipeline (external credentials)

---

---

# 2026-07-31 (ADR-019)

## Version

v1.0.0-alpha

### Status

🟢 Decision

---

## Summary

Removed CMS integration from Version 1.0 scope. The static content layer (`src/content/`) is the content platform for v1.

---

## Decisions Made

- ADR-019 — Static Content for Version 1.0: no CMS in v1; content stays versioned in the codebase, structured for future migration.
- Phase 12 (CMS Integration) removed from the Development Order.
- Cloudinary and Video Delivery removed from v1 scope (external credentials).

---

## Documentation Updated

- `docs/01-architecture-decisions.md` — added ADR-019
- `docs/24-product-roadmap.md` — stack + content/media deliverables updated
- `docs/27-development-order.md` — Phase 12 marked removed; Phase 13 tasks adjusted
- `docs/25-implementation-tracker.md` — Phase 12 out of scope; Phase 13 in progress
- `docs/30-changelog.md` — removed entries

## Next Session

- Phase 13 — Media Infrastructure (next/image, responsive images, gallery optimization)

---

---

# Release Template

## YYYY-MM-DD

### Version

v1.0.0-alpha

### Status

🟨 In Progress

---

## Summary

A short summary of the work completed during this session.

---

## Completed

List every completed task.

Example

- Completed Design System documentation
- Added Development Order
- Refined Component Architecture
- Created Product Roadmap
- Updated Folder Responsibilities

---

## Changed

List existing features or documentation that were modified.

Example

- Renamed Future Roadmap → Product Roadmap
- Simplified documentation hierarchy
- Improved Design Principles
- Updated Page Architecture

---

## Added

List every new file, folder, or system introduced.

Example

- Release Notes
- Architecture Decisions
- Development Order
- Content Models

---

## Removed

Document anything intentionally removed.

Example

- Removed duplicate animation rules
- Deleted unused design tokens
- Removed deprecated folder structure

---

## Decisions Made

Record important architectural decisions.

Example

- Content will remain static until CMS integration.
- Three.js will only enhance storytelling.
- Sanity CMS selected as the initial content platform.
- Cloudinary selected for media management.

---

## Issues Encountered

Record problems discovered during development.

Example

- Hero architecture required redesign.
- Navigation hierarchy was too complex.
- Typography scale needed adjustment.

If none:

None.

---

## Resolved

Record issues that were fixed.

Example

- Unified documentation structure.
- Removed duplicate design tokens.
- Simplified folder organization.

---

## Documentation Updated

List every documentation file updated during the session.

Example

- Documentation Index
- Project Overview
- Design Principles
- Coding Standards

---

## Current Progress

Current Phase

Example

🟨 Phase 1 — Foundation

Current Milestone

Documentation

Overall Progress

Example

12%

---

## Next Session

List the exact work that should begin next.

Example

- Configure project foundation
- Build Design System
- Configure global layout
- Create navigation system

---

## Notes

Optional observations for future reference.

Example

The homepage should behave like an editorial publication rather than a traditional marketing landing page.

---

---

---

# 2026-07-31 (Phase 11)

## Version

v1.0.0-alpha

### Status

🟢 Phase 11 — Contact (80%)

---

## Summary

Built the Contact and Careers experience — content data, contact page with form and studio information, careers page with positions and benefits.

---

## Completed

- Created ContactInformation content model (email, phone, address, offices, socialLinks)
- Created Office model (city, country, address)
- Created CareerPosition content model (id, title, location, type, description, requirements)
- Created Benefit model + 4 benefits
- Populated 2 offices (Porto, Lisbon), 4 social links, 4 career positions
- Built ContactInformation component (studio contact details, offices, social links)
- Built ContactForm (client component reusing Form/Input/Textarea/Button, SuccessState on submit)
- Built OfficeMap (placeholder — real map deferred)
- Built contact page (`/contact`) with info + form + map
- Built PositionCard (reuses Card compound component, type badge, requirements list)
- Built Benefits component
- Built careers page (`/careers`) with positions grid + benefits
- Marked contact + careers routes as `"active"`

## Changed

- `src/config/routes.ts` — contact + careers status changed from `"planned"` to `"active"`
- `docs/25-implementation-tracker.md` — Phase 11 0% → 80%, overall 48% → 52%

## Added

- `src/content/company/contact.ts`
- `src/content/company/careers.ts`
- `src/features/contact/contact-information.tsx`
- `src/features/contact/contact-form.tsx`
- `src/features/contact/office-map.tsx`
- `src/features/contact/index.ts`
- `src/features/careers/position-card.tsx`
- `src/features/careers/benefits.tsx`
- `src/features/careers/index.ts`
- `src/app/(site)/contact/page.tsx`
- `src/app/(site)/careers/page.tsx`

## Decisions Made

- Contact + careers content lives in `src/content/company/` (follows content location structure)
- ContactForm is client-only with client-side state; form submission is a stub (no backend yet — deferred until deployment)
- OfficeMap is a semantic placeholder with aria-label (Mapbox integration deferred to Phase 16)
- Careers uses PositionCard + Benefits following the component inventory
- No individual career application form yet (deferred — requires form backend)

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`
- `src/config/routes.ts`

## Current Progress

Current Phase

🟨 Phase 11 — Contact

Current Milestone

Contact + Careers pages

Overall Progress

52%

## Next Session

- Phase 13 — Media Infrastructure (next/image, responsive images, gallery optimization)

---

## Version

v1.0.0-alpha

### Status

🟢 Phase 10 — Journal (80%)

---

## Summary

Built the Journal editorial experience — content data with 6 full articles, FeaturedArticle, JournalCard/Grid, URL-based category filtering, listing page, and article detail pages with related articles.

---

## Completed

- Created JournalArticle content model (id, slug, title, excerpt, content, coverImage, author, publishedAt, category, relatedProjects)
- Created JournalCategory type (news, research, awards, events, ideas, publications)
- Wrote 6 full editorial articles with multi-paragraph content
- Built FeaturedArticle (large editorial hero on listing page)
- Built JournalCard (16:9 cover placeholder, category badge, title, author + year)
- Built JournalGrid (responsive 1/2/3-column grid)
- Built CategoryFilter (URL-based filtering, same pattern as ProjectFilter)
- Built Journal listing page (`/journal`) with featured article + filtered grid
- Built Journal detail page (`/journal/[slug]`) with full article body, date, and related articles
- Set up `generateStaticParams` for static generation
- Marked journal + articleDetails routes as `"active"`

## Changed

- `src/config/routes.ts` — journal + articleDetails status changed from `"planned"` to `"active"`
- `docs/25-implementation-tracker.md` — Phase 10 0% → 80%, overall 45% → 48%

## Added

- `src/content/journal/index.ts`
- `src/features/journal/featured-article.tsx`
- `src/features/journal/journal-card.tsx`
- `src/features/journal/journal-grid.tsx`
- `src/features/journal/category-filter.tsx`
- `src/features/journal/index.ts`
- `src/app/(site)/journal/page.tsx`
- `src/app/(site)/journal/[slug]/page.tsx`

## Decisions Made

- Article model follows `docs/20-content-models.md` (JournalArticle interface)
- Content is plain text paragraphs split on `\n` (Portable Text / rich content deferred to Phase 12 CMS)
- CategoryFilter reuses the same URL-based pattern as ProjectFilter for consistency
- FeaturedArticle is the first article when no category is selected; hidden when filtered
- Related articles computed by shared project references first, then shared category
- Newsletter deferred to Phase 16 (Optimization)
- Search deferred — requires search infrastructure

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`
- `src/config/routes.ts`

## Current Progress

Current Phase

🟨 Phase 10 — Journal

Current Milestone

Listing + Detail pages

Overall Progress

48%

## Next Session

- Phase 11 — Contact (Contact Page, Contact Form, Studio Information, Careers)

---

## Version

v1.0.0-alpha

### Status

🟢 Phase 9 — Process (80%)

---

## Summary

Built the Process page — content data with 6 steps following the studio workflow, visual numbered timeline, and supporting page layout.

---

## Completed

- Created ProcessStep content model (id, title, description, order)
- Populated 6 steps: Discovery, Concept, Design Development, Documentation, Construction, Completion
- Built ProcessTimeline (vertical layout with numbered circles and connecting lines)
- Built ProcessStep (individual step with number, title, description, connector)
- Built Process page with hero section, hero image, and timeline
- Marked process route as `"active"`

## Changed

- `src/config/routes.ts` — process status changed from `"planned"` to `"active"`
- `docs/25-implementation-tracker.md` — Phase 9 0% → 80%, overall 42% → 45%

## Added

- `src/content/process/index.ts`
- `src/features/process/process-timeline.tsx`
- `src/features/process/process-step.tsx`
- `src/features/process/index.ts`
- `src/app/(site)/process/page.tsx`

## Decisions Made

- Process model follows `docs/20-content-models.md` (ProcessStep interface)
- Steps follow the example workflow from the content model (Research → Completion)
- Timeline is vertical with numbered circles matching the Studio timeline visual language
- Supporting Visuals deferred to Phase 13/14 (media + motion)
- Page uses a single page (no individual step pages — process is a narrative, not a catalog)

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`
- `src/config/routes.ts`

## Current Progress

Current Phase

🟨 Phase 9 — Process

Current Milestone

Complete process page with timeline

Overall Progress

45%

## Next Session

- Phase 10 — Journal (Listing, Categories, Search, Article Template, Related Articles)

---

## Version

v1.0.0-alpha

### Status

🟢 Phase 8 — Services (80%)

---

## Summary

Built the complete Services feature — content data layer with 6 services, ServiceCard/ServicesGrid components, listing page, and detail pages with related project cross-links.

---

## Completed

- Created Service content model (id, slug, title, shortDescription, description, relatedProjects)
- Populated 6 services: Architecture, Interior Design, Landscape Design, Urban Design, Renovation, Consulting
- Built ServiceCard (reuses Card, Heading, Text)
- Built ServicesGrid (responsive 1/2/3-column grid)
- Built Services listing page (`/services`) with intro text
- Built Service detail page (`/services/[slug]`) with full description and related project links
- Set up `generateStaticParams` for static generation of detail pages
- Marked services route as `"active"`

## Changed

- `src/config/routes.ts` — services status changed from `"planned"` to `"active"`
- `docs/25-implementation-tracker.md` — Phase 8 0% → 80%, overall 38% → 42%

## Added

- `src/content/services/index.ts`
- `src/features/services/service-card.tsx`
- `src/features/services/services-grid.tsx`
- `src/features/services/index.ts`
- `src/app/(site)/services/page.tsx`
- `src/app/(site)/services/[slug]/page.tsx`

## Decisions Made

- Service model follows `docs/20-content-models.md` (Service interface with id, slug, title, shortDescription, description, relatedProjects)
- Detail page cross-links to related projects using existing `getProjectBySlug` from project content layer
- Process Integration deferred to Phase 9 (Process page will reference services)
- No icon field used yet (deferred to Phase 14 visual polish)

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`
- `src/config/routes.ts`

## Current Progress

Current Phase

🟨 Phase 8 — Services

Current Milestone

Listing + Detail pages

Overall Progress

42%

## Next Session

- Phase 9 — Process (Timeline, Methodology, Supporting Visuals)

---

## Version

v1.0.0-alpha

### Status

🟢 Phase 7 — Studio (80%)

---

## Summary

Built the complete Studio presentation — content data layer, 6 feature components (Introduction, Philosophy, TeamGrid, Awards, Timeline, Partners), and the Studio page.

---

## Completed

- Created Studio content model (Studio interface, TeamMember, Award, TimelineEvent, SocialLink)
- Populated studio data with realistic content (name, philosophy, mission, vision, values, history)
- Created 4 team members with biographies and social links
- Created 4 awards, 6 timeline events, 4 client categories
- Built StudioIntroduction (hero area with studio name, intro text, hero image)
- Built Philosophy section (philosophy text + mission, vision, values)
- Built TeamGrid + TeamMemberCard (4-column responsive grid, portrait placeholders)
- Built Awards section (list with title, project, organization, year)
- Built Timeline (visual timeline with connecting dots and lines)
- Built Partners section (client cards in centered wrap layout)
- Built Studio page assembling all sections
- Marked studio route as `"active"` in routes config

## Changed

- `src/config/routes.ts` — studio status changed from `"planned"` to `"active"`
- `docs/25-implementation-tracker.md` — Phase 7 0% → 80%, overall 33% → 38%

## Added

- `src/content/studio/index.ts`
- `src/features/studio/studio-introduction.tsx`
- `src/features/studio/philosophy.tsx`
- `src/features/studio/team-grid.tsx`
- `src/features/studio/team-member-card.tsx`
- `src/features/studio/awards.tsx`
- `src/features/studio/timeline.tsx`
- `src/features/studio/partners.tsx`
- `src/features/studio/index.ts`
- `src/app/(site)/studio/page.tsx`

## Decisions Made

- Studio content model follows `docs/20-content-models.md` (Studio + TeamMember interfaces)
- Images use placeholder `bg-muted` divs until Phase 13 (Media Infrastructure)
- Timeline uses visual dots with connecting lines (CSS-only, no JS animation yet — deferred to Phase 14)
- Team cards use semantic `<div>` without Link wrapper (no individual team member pages in v1)
- Social links shown as text labels (icon integration deferred to Phase 13/14)
- Studio page uses all 7 sections without a CTA (studio is informational, not conversion-oriented)

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`
- `src/config/routes.ts`

## Current Progress

Current Phase

🟨 Phase 7 — Studio

Current Milestone

Complete studio presentation

Overall Progress

38%

## Next Session

- Phase 8 — Services (Listing, Service Detail, Process Integration)

---

## Version

v1.0.0-alpha

### Status

🟢 Phase 6 — Projects (70%)

---

## Summary

Built the complete Projects feature — content data layer, feature components, listing page with filtering, and detail page with gallery, metadata, navigation, and related projects.

---

## Completed

- Created Project content model (6 projects with full data adhering to `docs/20-content-models.md`)
- Built ProjectCard (reuses Card compound component with Badge, Heading, Text)
- Built ProjectGrid (responsive 1/2/3-column grid)
- Built ProjectFilter (client-side category buttons with "All" reset)
- Built ProjectGallery (full-width image sequence for detail page)
- Built ProjectMetadata (location, year, status, area, materials as definition list)
- Built ProjectNavigation (prev/next with Chevron icons)
- Built RelatedProjects (shared category matching, grid of ProjectCards)
- Built Projects listing page (`/projects`) with filter state
- Built Project detail page (`/projects/[slug]`) with hero, story, metadata, gallery, nav, related
- Marked projects and projectDetails routes as `"active"` in routes config
- Updated homepage FeaturedProjects to consume real project data from content layer
- Set up `generateStaticParams` for static generation of detail pages

## Changed

- `src/features/home/featured-projects.tsx` — now uses `getFeaturedProjects()` from `src/content/projects/` instead of inline stubs
- `src/content/home/index.ts` — removed unused `featuredProjects` section (moved to project content layer)
- `src/config/routes.ts` — projects + projectDetails status changed from `"planned"` to `"active"`
- `docs/25-implementation-tracker.md` — Phase 6 0% → 70%, overall 28% → 33%

## Added

- `src/content/projects/index.ts` (Project types + 6 projects + query helpers)
- `src/features/projects/project-card.tsx`
- `src/features/projects/project-grid.tsx`
- `src/features/projects/project-filter.tsx`
- `src/features/projects/project-gallery.tsx`
- `src/features/projects/project-metadata.tsx`
- `src/features/projects/project-navigation.tsx`
- `src/features/projects/related-projects.tsx`
- `src/features/projects/index.ts`
- `src/app/(site)/projects/page.tsx`
- `src/app/(site)/projects/[slug]/page.tsx`

## Decisions Made

- Project content model follows `docs/20-content-models.md` with a pragmatic subset for static data (no Drawing, VideoAsset, ModelAsset yet — deferred to CMS integration)
- Images use placeholder `bg-muted` divs until Phase 13 (Media Infrastructure)
- ProjectFilter is a client component (uses `useState`) — the listing page is `"use client"` at the page level
- Project detail pages use `generateStaticParams` for static generation
- Search deferred — requires search infrastructure not yet in place

## Issues Encountered

- `exactOptionalPropertyTypes` requires explicit `?? ""` on optional className props when passing to Card and Section components
- `ProjectCategory` type needed `export` keyword to be consumable by feature components

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`
- `src/config/routes.ts`

## Current Progress

Current Phase

🟨 Phase 6 — Projects

Current Milestone

Listing + Detail pages (70%)

Overall Progress

33%

## Next Session

- Phase 7 — Studio (Overview, Philosophy, Team, Awards, Timeline)
- Phase 8 — Services (Listing, Details, Process Integration)
- Or deferred items: Homepage Motion, Footer Integration (Phase 14)

---

## Version

v1.0.0-alpha

### Status

🟢 Phase 5 — Homepage Core Sections

---

## Summary

Built all 8 homepage sections and content data layer. Homepage is now structurally complete.

---

## Completed

- Created `src/content/home/index.ts` — all copy separated from UI
- Built Hero section (full-screen, heading, tagline, scroll hint)
- Built Featured Projects section (3-column grid, placeholders, Badge + Heading + location)
- Built Studio Preview section (narrow container, centered, inline text link)
- Built Services Preview section (2-column grid of bordered cards)
- Built Process Preview section (4-column numbered steps)
- Built Journal Preview section (3-column grid, Badge + Heading + date)
- Built Contact CTA section (narrow container, centered, primary Button)
- Created barrel export from `src/features/home/index.ts`
- Updated `src/app/(site)/page.tsx` assembling all sections

## Changed

- `src/app/(site)/page.tsx` — empty `<main />` replaced with all 7 homepage sections
- `docs/25-implementation-tracker.md` — Phase 5 0% → 75%, overall 25% → 28%

## Added

- `src/content/home/index.ts`
- `src/features/home/hero.tsx`
- `src/features/home/featured-projects.tsx`
- `src/features/home/studio-preview.tsx`
- `src/features/home/services-preview.tsx`
- `src/features/home/process-preview.tsx`
- `src/features/home/journal-preview.tsx`
- `src/features/home/contact-cta.tsx`
- `src/features/home/index.ts`

## Decisions Made

- Content data lives in `src/content/home/index.ts` (separated from UI, per Content Strategy)
- Each section is a standalone component in `src/features/home/` (feature-first architecture)
- Homepage Motion deferred to Phase 14 (motion pass after sections are stable)
- Footer Integration deferred to Phase 3 completion (global Loader + Navigation Indicator also deferred to Phase 14)

## Issues Encountered

- `exactOptionalPropertyTypes: true` caused TS2375 errors when passing `className?: string` to Section — fixed by defaulting `className = ""` in destructuring and using `?? ""` at call sites
- Next.js Link Route type requires `as Route` cast with `exactOptionalPropertyTypes`

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`

## Current Progress

Current Phase

🟨 Phase 5 — Homepage

Current Milestone

Core sections (Hero through Contact CTA)

Overall Progress

28%

## Next Session

- Homepage Motion (Phase 14) or
- Phase 6 — Projects (Listing, Categories, Filters, Detail, Galleries)
- Phase 7 — Studio (Overview, Philosophy, Team, Awards, Timeline, Clients)

---

# 2026-07-31 (Tier 4)

## Version

v1.0.0-alpha

### Status

🟢 Phase 4 — Tier 4

---

## Summary

Built Tier 4 of Phase 4 — 6 interactive/overlay components: Modal, Dialog, Drawer, Accordion, Tabs, Toast.

---

## Completed

- Built Modal (backdrop, escape/click-to-close, body scroll lock, 3 sizes)
- Built Dialog (alertdialog role, confirm/cancel actions, destructive variant)
- Built Drawer (slide from left/right, backdrop, scroll lock)
- Built Accordion (single/multiple mode, animated via CSS grid)
- Built Tabs (tablist/tabpanel roles, keyboard support)
- Built Toast (imperative `toast()` API, auto-dismiss 4s, 4 types)

## Changed

- `docs/25-implementation-tracker.md` — Phase 4 24% → 50%, overall 19% → 22%

## Added

- `src/components/ui/Modal.tsx`
- `src/components/ui/Dialog.tsx`
- `src/components/ui/Drawer.tsx`
- `src/components/ui/Accordion.tsx`
- `src/components/ui/Tabs.tsx`
- `src/components/ui/Toast.tsx`

## Decisions Made

- Toast uses a module-level listener pattern (`toastListeners` array) for its imperative API, avoiding a React portal dependency
- Accordion uses CSS `grid-template-rows` animation for smooth expand/collapse without JS height calculation
- All overlay components use `document.body.style.overflow = "hidden"` for scroll lock
- Drawer slides in via CSS transforms (GPU-accelerated)

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`

## Current Progress

Current Phase

🟨 Phase 4 — Core Components

Current Milestone

Tier 4 — Interactive/Overlay (Modal, Dialog, Drawer, Accordion, Tabs, Toast)

Overall Progress

22%

## Next Session

Phase 4 — Remaining:

- Carousel
- Feedback Components (Skeleton, Loading, Empty, Error, Success states)

---

# 2026-07-31 (Tier 3)

## Version

v1.0.0-alpha

### Status

🟢 Phase 4 — Tier 3

---

## Summary

Built Tier 3 of Phase 4 — Input, Textarea, and Form components.

---

## Completed

- Built Input (text/email/tel/url/password, label, required indicator, error state, aria attributes)
- Built Textarea (same pattern as Input, configurable rows, min-height)
- Built Form (form wrapper with noValidate, onSubmit)

## Changed

- `docs/25-implementation-tracker.md` — Phase 4 17% → 24%, overall 18% → 19%

## Added

- `src/components/forms/Input.tsx`
- `src/components/forms/Textarea.tsx`
- `src/components/forms/Form.tsx`

## Decisions Made

- All form controls use `useId()` for label-input association
- Error states use `aria-invalid` and `aria-describedby` for accessibility
- `required` fields show a subtle accent asterisk with `aria-hidden="true"`
- `noValidate` on Form to keep client-side validation in userland

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`

## Current Progress

Current Phase

🟨 Phase 4 — Core Components

Current Milestone

Tier 3 — Form Controls (Input, Textarea, Form)

Overall Progress

19%

## Next Session

Phase 4 — Tier 4 (Interactive/Overlay):

- Modal
- Dialog
- Drawer
- Accordion
- Tabs
- Toast

---

# 2026-07-31 (Continued)

## Version

v1.0.0-alpha

### Status

🟢 Phase 4 — Tier 2

---

## Summary

Built Tier 2 of Phase 4 — Image, Video, and Card components.

---

## Completed

- Built Image component (Next.js wrapper, fill mode + explicit dimensions, aspect ratio)
- Built Video component (HTML5 wrapper, controls/autoplay/loop/muted, aspect ratio)
- Built Card component (composable: Card, Card.Image, Card.Content, Card.Footer; variants: default, elevated, bordered)

## Changed

- `docs/25-implementation-tracker.md` — Phase 4 10% → 17%, overall 17% → 18%

## Added

- `src/components/media/Image.tsx`
- `src/components/media/Video.tsx`
- `src/components/ui/Card.tsx`

## Decisions Made

- Card uses `Object.assign` pattern for composable sub-components
- Image uses conditional rendering for fill vs. explicit dimensions to satisfy `exactOptionalPropertyTypes`

## Issues Encountered

- Next.js `Image` and `Link` props types don't include `undefined` in unions, conflicting with `exactOptionalPropertyTypes: true` — requires defensive defaults or conditional rendering

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`

## Current Progress

Current Phase

🟨 Phase 4 — Core Components

Current Milestone

Tier 2 — Media & Content (Image, Video, Card)

Overall Progress

18%

## Next Session

Phase 4 — Tier 3 (Form Controls):

- Input
- Textarea
- Form

---

# 2026-07-31

## Version

v1.0.0-alpha

### Status

🟢 Phase 4

---

## Summary

Built Tier 1 of Phase 4 — 6 primitive UI components: Button, Link, Heading, Text, Badge, Tags.

---

## Completed

- Built Button (4 variants: primary, secondary, ghost, outline; 3 sizes: sm, md, lg)
- Built Link (internal + external, 3 variants: default, underline, subtle)
- Built Heading (maps typography tokens: display, h1, h2, h3)
- Built Text (maps typography tokens: body, small)
- Built Badge (3 variants: default, accent, outline; 2 sizes: sm, md)
- Built Tags (active state tracking, tag click handler)

## Changed

- `docs/25-implementation-tracker.md` — Phase 4 0% → 10%, overall 16% → 17%

## Added

- `src/components/ui/Button.tsx`
- `src/components/ui/Link.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Tags.tsx`
- `src/components/typography/Heading.tsx`
- `src/components/typography/Text.tsx`

## Removed

None.

## Decisions Made

- Heading uses inline `style` for font-size/line-height/weight since typography tokens use `clamp()` values that can't be expressed as Tailwind utilities
- Link wraps Next.js `Link` internally; uses native `<a>` for external links with `target="_blank"` and `rel="noopener noreferrer"`

## Issues Encountered

- Dynamic JSX tag (`<Tag>`) requires proper type narrowing when looking up from a tag map

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`

## Current Progress

Current Phase

🟨 Phase 4 — Core Components

Current Milestone

Tier 1 — Primitives (Button, Link, Heading, Text, Badge, Tags)

Overall Progress

17%

## Next Session

Phase 4 — Tier 2:

- Image (Next.js Image wrapper with aspect ratio)
- Video
- Card (composable: Card, Card.Image, Card.Content, Card.Footer)

## Notes

Tier 1 establishes the foundational primitives that all higher-level components consume. Clean typecheck with zero errors.

---

# 2026-07-30

## Version

v1.0.0-alpha

### Status

🟢 Phase 3

---

## Summary

Built the complete Core Layout system — Header, Desktop/Mobile Navigation, Footer, Page Container, Section component, and basic Page Transition shell.

---

## Completed

- Created navigation content data in `src/content/navigation/`
- Created footer content data in `src/content/footer/`
- Built NavigationMenu component (shared link rendering with active state)
- Built DesktopNavigation component (horizontal nav bar, hidden on mobile)
- Built MobileNavigation component (overlay menu, controlled by Header)
- Built Logo component
- Built Header component (fixed, blurred backdrop, toggles mobile menu)
- Built Footer component (studio info, nav links, social links, copyright)
- Built PageContainer component (semantic `<main>` wrapper with min-height)
- Built Section component (reusable wrapper with container widths)
- Built PageTransition component (basic shell, full system deferred to Phase 14)
- Updated `(site)/layout.tsx` wiring Header + PageContainer + PageTransition + Footer

## Changed

- `src/app/(site)/layout.tsx` — bare `<div>` replaced with full application shell
- `docs/25-implementation-tracker.md` — Phase 3 progress 15% → 75%, overall 12% → 16%
- `docs/29-known-issues.md` — `(site)/layout.tsx` bare div issue marked resolved

## Added

- `src/content/navigation/index.ts`
- `src/content/footer/index.ts`
- `src/components/navigation/NavigationMenu.tsx`
- `src/components/navigation/DesktopNavigation.tsx`
- `src/components/navigation/MobileNavigation.tsx`
- `src/components/layout/Logo.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/PageContainer.tsx`
- `src/components/layout/Section.tsx`
- `src/components/layout/PageTransition.tsx`

## Removed

None.

## Decisions Made

- PageTransition is a basic div shell for now; GSAP/Framer Motion fade will be added in Phase 14
- Global Loader deferred to Phase 14 (Motion polish)
- Navigation Indicator deferred to Phase 14

## Issues Encountered

- `exactOptionalPropertyTypes: true` in tsconfig requires careful handling of optional callback props with Next.js Link's onClick type
- ESLint takes >60s project-wide (pre-existing performance issue)

## Resolved

- `(site)/layout.tsx` bare div (Known Issue)
- Phase 3 Core Layout now at 75% completion

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`
- `docs/30-changelog.md`

## Current Progress

Current Phase

🟨 Phase 3 — Core Layout

Current Milestone

Header, Navigation, Footer, Page Shell

Overall Progress

16%

## Next Session

Phase 4 — Core Components:

- Buttons
- Links
- Typography Components (Headings, Body, Caption)
- Cards
- Image Component
- Badge
- Tags

## Notes

Phase 3 took the project from 12% → 16% overall (15% → 75% within Phase 3). The application now has a proper semantic shell with responsive navigation, footer, and layout infrastructure. Ready for reusable UI components in Phase 4.

---

# 2026-07-30

## Version

v1.0.0-alpha

## Status

🟠 Needs Attention

---

## Summary

Performed a comprehensive project audit. Identified and documented 18 issues across the codebase (2 critical, 5 high, 8 medium, 3 low). Corrected Implementation Tracker progress from 85% → 12% to reflect actual project state.

---

## Completed

- Full project audit: code, docs, config, dependencies, structure
- Implementation Tracker corrected — Phase 1/2 at 100%, Phase 3 at 15%, overall at 12%
- Known Issues document populated with all findings
- Phase 3 status updated with accurate partial progress (Root Layout + Smooth Scrolling done)

---

## Changed

- `docs/25-implementation-tracker.md` — corrected overall progress 85% → 12%, updated Phase 3 to 🟨 15%, fixed Current Sprint, marked Root Layout and Smooth Scrolling as done
- `docs/29-known-issues.md` — complete rewrite with 18 documented issues organized by severity

---

## Added

None.

---

## Removed

None.

---

## Decisions Made

- Implementation Tracker must reflect actual codebase state, not aspirational progress.
- Known Issues is now the project's living backlog — all findings documented before fixes begin.

---

## Issues Encountered

Significant gap between documented progress and actual implementation. Tracker claimed 85% when only 2 of 17 phases are functional.

---

## Resolved

- Implementation Tracker accuracy
- Known Issues populated (was empty)

---

## Documentation Updated

- Implementation Tracker
- Known Issues
- Release Notes

---

## Current Progress

Current Phase

🟨 Phase 3 — Core Layout

Current Milestone

Complete

Overall Progress

12%

---

## Next Session

Resolve critical config issues:

- Remove `about` from `routes.ts` and `navigation.ts`
- Update README and Three.js guidelines docs
- Clean up orphaned `ratios.ts` and `grid.ts`
- Remove or implement placeholder animation stubs

Then begin Phase 3 — Core Layout (Navigation, Footer, Page Container).

---

## Notes

The project has an excellent documentation foundation (30 docs, 15,000+ lines) and a well-designed token system, but almost no application code. The audit revealed that much of the documentation structure is out of sync with the actual codebase. The first priority should be fixing the critical config issues before building new features.

---

# 2026-07-30 (Fixes)

## Version

v1.0.0-alpha

### Status

🟢 Stable

---

## Summary

Resolved 3 remaining Known Issues: Three.js guidelines doc structure, .env.example, and cleaned up stale resolved entries. All 18 audit issues now closed.

---

## Completed

- Updated Three.js guidelines folder structure to match actual `src/three/` layout
- Added all 5 missing env vars to `.env.example`
- Cleaned up stale category sections in Known Issues (Foundation, Design System, Navigation, Documentation, Animation, Technical Debt)
- Removed resolved Low entries for `ratios.ts` and `grid.ts` export inconsistencies
- Marked `.env.example` issue as resolved

---

## Changed

- `docs/11-threejs-guidelines.md` — folder structure updated from `camera/`, `controls/`, etc. to `components/`, `hooks/`, `loaders/`, `materials/`, `scenes/`, `utils/`
- `.env.example` — added `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_MAPBOX_TOKEN`, `NEXT_PUBLIC_CMS_URL`, `CMS_API_TOKEN`
- `docs/29-known-issues.md` — cleaned up all resolved issues, removed stale category sections

---

## Added

None.

---

## Removed

- Stale category sections from Known Issues (Foundation, Design System, Navigation, Documentation, Animation, Technical Debt)

---

## Resolved

- Three.js guidelines doc structure mismatch
- `.env.example` missing env vars
- Stale "resolved" entries cluttering Known Issues

---

## Documentation Updated

- `docs/25-implementation-tracker.md`
- `docs/28-release-notes.md`
- `docs/30-changelog.md`
- `.env.example`

---

## Current Progress

Current Phase

🟨 Phase 3 — Core Layout

Current Milestone

Complete

Overall Progress

12%

---

## Next Session

Begin Phase 3 — Core Layout:

- Build global navigation header
- Build mobile navigation
- Build footer
- Create page container component
- Create section component
- Set up page transition system

---

## Notes

All 18 issues from the audit are now resolved. The Known Issues doc is clean — only 7 items remain (all deferred to future phases). Ready to start building real application code.

---

---

# 2026-07-29

## Version

v1.0.0-alpha

## Status

🟨 Active Development

---

## Summary

Implemented GSAP and Lenis global providers. Phase 1 (Foundation) and Phase 2 (Design System) are now complete.

---

## Completed

- Created GSAP provider with ScrollTrigger registration
- Created Lenis provider with smooth scroll, GSAP sync, and React context
- Created composed Providers wrapper
- Integrated Providers into root layout
- Updated Implementation Tracker — Phase 1 ✅ 100%, Phase 2 ✅ 100%

---

## Changed

- `src/app/layout.tsx` — wrapped children with `<Providers>`

---

## Added

- `src/providers/gsap-provider.tsx`
- `src/providers/lenis-provider.tsx`
- `src/providers/providers.tsx`

---

## Removed

- `src/providers/.gitkeep` (replaced by actual providers)

---

## Decisions Made

- GSAP ScrollTrigger registered in a React provider rather than globally to respect the component lifecycle.
- Lenis duration set to 1.2s with a natural easing curve for a premium feel.
- Lenis instance exposed via React context for use by custom hooks (e.g., `useLenis`).

---

## Issues Encountered

None.

---

## Resolved

None.

---

## Documentation Updated

- Implementation Tracker
- Release Notes

---

## Current Progress

Current Phase

✅ Phase 1 — Foundation

Current Milestone

Complete

Overall Progress

85%

---

## Next Session

- Begin Phase 3 — Core Layout (Navigation, Footer, Page Container, Smooth Scrolling)
- Or begin Phase 4 — Core Components if layout is stable

---

## Notes

Phase 1 and Phase 2 are both fully implemented and the tracker has been corrected to reflect the actual project state. The project now has a solid foundation for building the UI layer.

---

---

# 2026-07-29

## Version

v1.0.0-alpha

## Status

🟨 Active Development

---

## Summary

Configured Google Fonts (Manrope + Inter) via next/font and updated the Implementation Tracker to reflect the true project state.

---

## Completed

- Added Manrope font via `next/font/google` with CSS variable `--font-manrope`
- Added Inter font via `next/font/google` with CSS variable `--font-inter`
- Updated Root Layout to apply font variables to `<html>` element
- Updated Implementation Tracker — Phase 1 progress corrected to 92%
- Updated Implementation Tracker — added Completed Milestones
- Updated Implementation Tracker — added fonts config note

---

## Changed

- `src/app/layout.tsx` — added font imports and variable classNames
- `docs/25-implementation-tracker.md` — synced with actual project state

---

## Added

None.

---

## Removed

None.

---

## Decisions Made

- Fonts loaded via `next/font/google` (CDN) rather than self-hosted for simplicity.
- General Sans (used in `--font-display` token) deferred; Manrope serves as fallback for now.

---

## Issues Encountered

None.

---

## Resolved

None.

---

## Documentation Updated

- Implementation Tracker
- Release Notes

---

## Current Progress

Current Phase

🟨 Phase 1 — Foundation

Current Milestone

Project Setup

Overall Progress

80%

---

## Next Session

- Configure global providers (GSAP, Lenis)
- Mark Phase 1 as complete
- Begin Phase 2 — Design System or Phase 3 — Core Layout

---

## Notes

General Sans (referenced in `tokens.css` `--font-display`) cannot be loaded via `next/font/google`. It requires self-hosting if needed later. For now, Manrope serves as the display font fallback.

---

# 2026-07-29

## Version

v1.0.0-alpha

### Status

🟨 Documentation Phase

---

## Summary

Established the complete documentation architecture for the project before implementation begins.

---

## Completed

- Defined overall project vision.
- Finalized documentation hierarchy.
- Created Architecture Decisions.
- Created Development Order.
- Created Product Roadmap.
- Created Implementation Tracker.
- Completed Design System documentation.
- Completed Design Principles.
- Completed Component Architecture.
- Completed Component Inventory.
- Completed Page Architecture.
- Completed Three.js Guidelines.
- Completed Animation Guidelines.
- Completed Development Workflow.
- Completed Coding Standards.
- Completed Naming Conventions.
- Completed Content Strategy.
- Completed Content Models.
- Completed Accessibility.
- Completed SEO.
- Completed Performance Checklist.
- Completed Deployment Guide.

---

## Changed

- Refined the project structure.
- Simplified folder responsibilities.
- Reorganized documentation numbering.
- Replaced the original Future Roadmap with a Product Roadmap.

---

## Added

- Documentation Index
- Architecture Decisions
- Development Order
- Implementation Tracker
- Release Notes

---

## Removed

- Duplicate documentation.
- Obsolete roadmap structure.

---

## Decisions Made

- Documentation is the project's primary source of truth.
- Development will strictly follow the Development Order.
- Static content will be used initially before CMS integration.
- Sanity CMS will become the content platform.
- Cloudinary will manage media assets.
- GSAP and Three.js will be the only animation technologies.
- The website should feel like a premium architectural publication rather than a traditional corporate website.

---

## Issues Encountered

None.

---

## Resolved

- Documentation hierarchy finalized.
- Folder structure finalized.
- Architecture finalized.

---

## Documentation Updated

- All documentation completed and synchronized.

---

## Current Progress

Current Phase

🟨 Phase 1 — Foundation

Current Milestone

Documentation Complete

Overall Progress

5%

---

## Next Session

- Configure project foundation.
- Configure global styles.
- Build the Design System.
- Create the Root Layout.
- Build the navigation.
- Begin the homepage architecture.

---

## Notes

Documentation is now considered stable.

Future implementation should follow the documentation before introducing any new architecture or features.
