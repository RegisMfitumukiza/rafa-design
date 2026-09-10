# Changelog

All notable changes to the RAFA Design platform are documented in this file.

The format follows the principles of Keep a Changelog while remaining tailored to this project.

Versioning follows Semantic Versioning.

MAJOR.MINOR.PATCH

Example

1.0.0

---

# Version Status

Current Version

v0.1.0-alpha

Status

🚧 In Development

---

# Types of Changes

Added

New features.

Changed

Updates to existing functionality.

Improved

Enhancements without changing behavior.

Fixed

Bug fixes.

Removed

Deleted functionality.

Deprecated

Features scheduled for removal.

Security

Security improvements.

Documentation

Documentation updates.

---

# [Unreleased]

## Changed

- Micro-typography utility fix & featured project card layout restoration (2026-09-10) — resolved the root cause of enlarged micro-text and broken layout in the Projects Archive featured commission card. Renamed `@theme` typography keys to `--text-*` and added explicit `@utility` definitions in `src/styles/utilities.css` for `text-overline` (10px), `text-micro` (9px), and `text-label` (11px). Added explicit container `.max-w-*` rules in `utilities.css` mapping `max-w-xs` through `max-w-4xl` to their respective `--container-*` design tokens (`!important`), preventing Tailwind v4 from overriding them with tiny spacing tokens. Upgraded `FeaturedProjectCard` title to `max-w-(--container-3xl)` and subtitle to `max-w-(--container-lg)`, and replaced cramped arbitrary `lg:aspect-[3/1]` with design-system `aspect-hero` (`md:aspect-[21/9]`) and safe responsive minimum heights (`min-h-[360px] sm:min-h-[420px] md:min-h-[460px]`), ensuring clean visual hierarchy and ample breathing room between photography, badge, and copy.
- System-wide typography harmonization & micro-scale tokenization (2026-09-10) — completed a comprehensive site-wide typography audit and code-level refactor. Formally documented Century Gothic Paneuropean as the client's singular identity typeface across both display headings and body text in `docs/04-design-system.md`. Replaced all raw hardcoded arbitrary micro-text sizes (`text-[10px]`, `text-[9px]`, `text-[11px]`) across 73 files with named design tokens defined in `src/styles/tokens.css`: `text-overline` (10px for overlines and specification tables), `text-micro` (9px for badges and overlays), and `text-label` (11px for captions and timeline entries). Normalized Careers `PositionCard` heading size from oversized clamp (32–56px) to standard card scale (`text-xl font-display font-medium tracking-tight`), and added semantic `font-display` to the primary navigation index titles.
- Homepage supporting practice navigation elevation (2026-09-10) — elevated the Studio Index landing (`/`) by adding quiet secondary architectural navigation directly beneath the primary `01–06` rail for `Careers` (with live Sanity active role count badge) and `Sustainability`. Eliminates discoverability friction for talent and institutional partners while preserving the tranquil, minimalist monograph cover aesthetic and avoiding redundant menu-in-menu overlays.
- Editorial footer & navigation live Sanity data elevation (2026-09-10) — eliminated all hardcoded location strings and decoupled static content imports from client navigation surfaces. Built `ServicesContext` & `ServicesProvider` (`src/features/services/`) and `SearchIndexContext` & `SearchIndexProvider` (`src/features/navigation/`) mirroring the `ContactProvider` architecture. Updated `(site)/layout.tsx` to resolve `config`, `contact`, `services`, `careers`, `projects`, and `articles` concurrently via `Promise.all`, constructing the live search index server-side with zero client fetch overhead. Connected `Footer.tsx` and `fullscreen-navigation.tsx` to live services and `careersCount`, and replaced the hardcoded `"KIGALI, RWANDA"` location string with dynamic primary office city and country fields (`offices[0].city`, `offices[0].country`) falling back to `contactInformation.address`.
- Fullscreen navigation careers count & hiring banner removal (2026-09-10) — aligned the Fullscreen Navigation Menu directory with the Editorial Footer by displaying the active role count badge `({careerPositions.length})` next to Careers when positions exist, maintaining zero-clutter architectural consistency; deleted the unused `src/features/careers/hiring-banner.tsx` component to keep the codebase lean and free of unaligned marketing pop-up patterns.
- Site Settings ecosystem & museum-grade maintenance elevation (2026-09-10) — elevated the Site Settings system across all 8 core touchpoints. `MaintenanceScreen` (`src/components/maintenance/MaintenanceScreen.tsx`): extracted inline layout block into a dedicated architectural holding screen with display logo mark, pulsing operational status beacon, custom Sanity maintenance notice, interactive commission contact fallback (`mailto:` and `tel:`), live studio time and coordinates (`useStudioTime`), and staff portal link to `/admin`; `(site)/layout.tsx` concurrently resolves config and contact via `Promise.all`. `src/config/seo.ts`: resolved critical bug where Sanity `defaultSeo.ogImage` was not wired to `openGraph.images` and `twitter.images`. `opengraph-image.tsx` & `twitter-image.tsx`: updated to dynamic handlers reading `getSiteConfig()` and restored pure monochromatic palette. `schema.ts`: updated `organizationSchema` and `websiteSchema` to accept dynamic `SiteConfig` for real-time JSON-LD updates. `(site)/page.tsx`: homepage metadata now routes through `createMetadata` with Sanity SEO title/description defaults. `sitemap.ts` & `robots.ts`: dynamically derive canonical URL via `(await getSiteConfig()).url`.
- Site configuration Sanity-first (2026-09-10) — the Sanity `siteSettings` singleton is now the single source of truth for global website configuration via a new `src/lib/get-site-config.ts` (`getSiteConfig()`: resolves `SiteConfig` from the tagged `getSiteSettings()` fetch with a static `src/config/site.ts` fallback). Root `layout.tsx` metadata is now async `generateMetadata` (`createMetadata` takes the resolved config: title/description/keywords, `metadataBase`, og/twitter defaults); home `/` metadata is dynamic; analytics is injected as Google Analytics gtag `<Script>`s only when `siteSettings.analyticsCode` is set; footer tagline and copyright, logo `alt`/`aria-label`, and the intro splash studio name now read from the new `SiteConfigProvider` (`useSiteConfig`, mirroring the `useContact` pattern). Redundant `email`/`phone` fields removed from the `siteSettings` schema (organisational group dropped) + query/transform/content type; `scripts/remove-site-settings-contact.mjs` (`migrate:remove-site-settings-contact`) unset the stored production values — contact details live only in the `contact` document. Maintenance gate: `(site)/layout.tsx` renders a full maintenance screen (name + optional message) when `maintenanceMode` is on, while `/admin` and API routes stay reachable to switch it back off; toggling revalidates via the existing `siteSettings` cache tag, so it takes effect without a redeploy — verified end-to-end on the production dataset. Verified: 34-route build, typeclean lint, correct `<title>`/canonical (`https://www.rafadesignhub.com`) in served HTML. Fixes the stale `siteUrl: "https://rafadesign.pt"` seed in `scripts/migrate-site-settings-to-sanity.mjs` → `https://www.rafadesignhub.com` and corrected the live dataset value on 2026-09-10.
- Project detail monograph industrial elevation (2026-09-10) — comprehensive UI/UX audit and elevation of the `/projects/[slug]` page across 8 sub-components. `ProjectConcept`: added `CONCEPT STATEMENT` architectural overline label via `<Reveal>`. `ProjectMetadata`: moved the `Specifications` overline inside the component; wrapped `dt`/`dd` pairs in a semantic `<dl>` element (accessibility fix). `page.tsx`: removed the duplicate hardcoded `<p>Specifications</p>` label; always passes `prev` to `ProjectNavigation` so backward navigation is always available. `ProjectNavigation`: restored bidirectional navigation — NEXT remains the dominant cinematic panel; PREV now renders as a quiet horizontal strip below it with `← Previous · {title}` and year+city metadata. `BeforeAfterSlider`: upgraded from static two-column images to a real interactive `clip-path` drag/touch comparison slider with a frosted circular drag handle (`↔` SVG icon), mouse/touch/keyboard support, ARIA `role="slider"`, and `prefers-reduced-motion` fallback to the original side-by-side layout (zero new dependencies). `ProjectChapterBlock`: fixed mobile intent-label wrapping bug where the separator dot `·` could orphan on its own line — labels now stack vertically on mobile (`flex-col`), inline on `md+` with the dot hidden on mobile. `ProjectGallery`: changed from `space-y-2xl` to `flex flex-col gap-2xl` to tighten the gap to the section overline; added `loading="lazy"` to contained gallery images. `ProjectDrawingViewer`: changed drawing image from `aspect-landscape object-cover` (16:9, clips edges) to `aspect-[2/1] object-contain` (shows full drawing plate); background updated to `bg-muted/30`.
- Projects mobile UI/UX & industrial elevation (2026-09-10) — elevated the Projects Archive ecosystem and project detail monographs (`/projects/[slug]`) for mobile touch viewports and responsive browser testing. `FeaturedProjectCard`: fixed the overshadowed 'Featured Commission' text with an industrial frosted architectural pill badge (`backdrop-blur-md`, hairline border, drop shadow, active beacon dot) paired with a top gradient scrim; replaced the cramped 16:9 mobile aspect with an editorial 4:3 portrait ratio (`aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]`); kept subtitle ("A hillside retreat in the Algarve") and 'View Project →' CTA permanently visible by default across all devices (`text-white/80`), with interactive brightening to `text-white` and an animated arrow slide (`group-hover:translate-x-1`) on hover; added `font-display` to H2. `ProjectCard`: implemented `.card-hover-overlay` in `src/styles/utilities.css` bypassing Tailwind v4's `@media (hover: hover)` restriction, ensuring desktop and hybrid/touchscreen laptops reliably trigger the bottom architectural spec overlay upon cursor hover, while maintaining dedicated mobile specs in `Card.Content`. `ProjectsArchive`: safeguarded the view mode rail with non-wrapping horizontal scroll and added `min-w-[680px]` to the Spec Table. `ProjectDetailMonograph` (`/projects/[slug]`): defined container scales (`--container-xs` to `--container-7xl` and `--container-prose`) in `@theme` inside `tokens.css`, fixing the Tailwind v4 bug where `max-w-xl` crushed text containers to 48px; fixed viewport height overflow with `h-[calc(100svh-var(--header-height))] min-h-[520px]`; elevated breadcrumbs with a frosted pill badge and top gradient scrim; enforced `font-display` on monumental H1; responsive photographer credit and next project navigation banner.
- Professional favicon set (2026-09-06) — replaced the placeholder favicons. `public/icon.svg` first: the previous single-path mark had no top bar, unbalanced stem/leg widths and a chevron counter that read as a broken "A" at favicon sizes; the new mark is a rule-based geometric R (uniform 7-unit beams, closed counter with rounded top corners, 45° V-bottom bowl) on a soft-black rounded tile in the studio palette. The full delivery is a standards-compliant set rasterized per-size from the SVG (16/32/180/192/512 + multi-size `favicon.ico` 16/32/48), overwriting the near-blank placeholder PNGs in `public/favicon/`; `favicon.ico` + `apple-touch-icon.png` also live at the public root for legacy discovery. `public/manifest.json` (previously unlinked, SVG-only) now declares `any` + `any maskable` icons and is wired via metadata; `src/config/seo.ts` icons metadata now emits the complete set (`icon` svg/32/16, `shortcut` ico, `apple` 180, `manifest`). Production-built and verified: full link set served in `<head>` and all 9 assets return 200 with correct content-types.

- Dataset health audit + full array key normalization (2026-09-05) — audited every document in the dataset (published + drafts, all 10 content types) against the real Sanity schema for the two Studio warning classes. Found and fixed: `teamMember.socialLinks` items missing `_key` (4 docs), `careers.benefits` items missing `_key`, and both journal **drafts** (`language-of-light`, `casa-monte-archdaily-award`) with portable-text blocks/spans/markDefs missing `_key`. Also added missing `alt`/`caption` sub-fields to the team `image` (Portrait) field — the stored portraits carried `alt` that the schema didn't define ("Unknown field found" when editing media in Studio). New reusable tooling following the migration-script conventions: `scripts/audit-dataset-health.mjs` (schema-aware scan; bundles schema descriptors to the OS temp dir so nothing generated is committed), `scripts/ensure-array-keys.mjs` (idempotent key normalization). Post-run audit: **0 unknown fields, 0 missing keys, 0 unknown item types** across the whole dataset.
- Stale `icon` field + missing array keys in service documents (2026-09-05) — the production dataset carried legacy data from the old services schema: an `icon` field no longer defined in `src/sanity/schemas/service.ts` ("Unknown field found" warning) and `approach` array items created via the API without `_key` ("Missing keys" warning, lists uneditable). New `scripts/cleanup-stale-service-icons.mjs` and `scripts/fix-service-array-keys.mjs` removed `icon` (8 docs) and added `_key` to every approach/reference item (4 docs); verified 0 published + 0 draft docs still carry either issue.
- Phase 16 + Phase 17 closed (2026-09-05) — repository at 100% completion. Optimization: `error.tsx` + `global-error.tsx` error boundaries added (only `not-found.tsx` existed); `Reveal`/`ImageReveal` gained a `visible` prop that skips the initial GSAP `autoAlpha:0`/clip-path hide so critical above-fold hero content is never JS-hidden (applied across all 10 hero surfaces); hero logo on the landing page now emits correct `sizes` + `fetchPriority="high"` (mobile requests ~256px instead of 2560px); the intro splash is now **home-only** (`SplashProvider` moved from the root layout into the home page). Deployment: `@vercel/analytics` installed and mounted in the root layout; Web Vitals wired end-to-end via `useReportWebVitals` → `reportWebVitals` → `track("Web Vitals", …)` in production; monitoring posture documented (Vercel Analytics/Speed Insights + runtime logs + Status). QA: 11-route Lighthouse matrix (Performance 52–71, FCP ~1–1.3 s), responsive (12 routes × 4 viewports, zero horizontal overflow / zero page errors) and cross-browser testing (Chrome + Edge headless). Results detailed in `docs/28` (2026-09-05) and `docs/25` Notes.
- Implementation tracker cleaned (2026-09-04) — `docs/25-implementation-tracker.md` reconciled with the actual codebase after a deep review. Phase 3/5/6/8/10/11/12/13/14/16/17 statuses and percentages corrected (search exists via `MenuSearch`, contact API ships Resend, CMS is fully integrated despite ADR-019, Three.js is removed, deployment is live). Overall progress 73% → 93%. Remaining work isolated to Phase 16 (Lighthouse, responsive, browser, error handling) and Phase 17 (analytics, monitoring, final QA). _Superseded 2026-09-05 — both phases closed, overall 100%._
- Singleton studio structure (2026-09-04) — the five singleton structure items (`studio` / `careers` / `contact` / `siteSettings` / `pageIntros`) switched from `S.documentTypeList` (which surfaced an empty "no documents of this type" list) to the canonical singleton pattern: each is a direct `S.editor().documentId(<type>)` under the corresponding structure item, navigating straight to the editor and auto-creating a draft on first open.
- CMS-driven page introductions (2026-09-02) — top-level page editorial headers now fetch the Sanity `pageIntros` singleton (`getPageIntros()`) and render its overline/title/description with static `pageContent` fallback. `/projects` and `/journal` flow intros through new `intro` props on `ProjectsArchive` and `JournalIndexHeader`; `/services` (overline/title + optional description), `/process` (overline/title/description + closing CTA), `/sustainability` (manifesto overline/heading/body), and `/contact` (header + editorial closing via `ContactEditorial`) derive copy from the singleton; `/process`, `/sustainability`, and `/contact` metadata switched to async `generateMetadata`. Static `pageContent` remains the fallback.
- On-demand ISR revalidation (2026-09-02) — every Sanity fetch now passes `next: { tags }` from the `cacheTags` registry (`src/sanity/lib/fetch.ts` ×16, `src/content/projects/sanity.ts` ×4, `src/content/journal/sanity-adapter.ts` ×5), and a new `POST /api/revalidate` webhook receiver purges only the affected tags + paths on Sanity publish/update/delete. Next.js 16.2 requires `revalidateTag(tag, "max")`. Static pages reflect CMS edits immediately — no redeploy.
- Site-wide social links + contact details Sanity-driven (2026-09-01) — `src/features/contact/contact-context.ts` (`useContact()`) + `contact-provider.tsx` (client provider with static fallback) now feed every client surface from the Sanity `contact` singleton. `(site)/layout.tsx` is now async and fetches `getContactInformation()`; `Footer`, `fullscreen-navigation`, `landing` + `LandingSocialStrip`, and `contact-form` consume via `useContact()`; `visit-studio.tsx` became async (direct server fetch, static fallback); root `layout.tsx` passes the fetched contact to `organizationSchema(contact)` for the `sameAs` social-profile JSON-LD. Static `src/content/company/contact.ts` remains the typed fallback shape.
- CI/CD hardening (2026-09-01) — `npm run audit` now runs `check-audit` (npm-audit-resolver) with a committed `audit-resolve.json` allowlist; `.github/workflows/audit.yml` pins Node 22.

- Company pages Sanity migration (2026-08-31) — the Studio, Careers, Contact, and Site Settings surfaces switched from hardcoded `src/content` TypeScript to Sanity-first fetching. `/studio`, `/careers`, and `/contact` pages are now async Sanity fetch + null-fallback; `office-map.tsx` and `contact-editorial.tsx` converted from static-import to prop-driven. `sanity.config.ts` now defines 9 Studio sections (01 Projects / 02 Journal / 03 Services / 04 Team / 05 Studio / 06 Careers / 07 Careers Page / 08 Contact / 09 Site Settings) with singleton action guards (`studio`/`careers`/`contact`/`siteSettings` hide create/delete/publish/unpublish/duplicate). `src/sanity/lib/{queries,transforms,fetch,index}.ts` extended with the team/studio/career/careers/contact/siteSettings data layer.

## Added

- `@vercel/analytics` integration (2026-09-05) — `<Analytics />` mounted in `src/app/layout.tsx`; new client `src/components/performance/web-vitals.tsx` (`useReportWebVitals`) drives `reportWebVitals` in `src/lib/performance.ts`, which sends production telemetry via `track("Web Vitals", …)` (dev logs to console).
- Error boundaries (2026-09-05) — `src/app/(site)/error.tsx` (design-system-styled site boundary with RETRY + error digest) and `src/app/global-error.tsx` (owns its own `<html>`/`<body>`) for unhandled render/parallel errors.
- `scripts/align-singleton-ids.mjs` (2026-09-04) — `npm run migrate:align-singletons`: renames each singleton document to its canonical `_id` (type name) in a copy + delete transaction (with draft cleanup) and creates an empty `pageIntros` document if missing, so the `S.editor().documentId(type)` structure items resolve to the real documents.
- `scripts/seed-page-intros.mjs` (2026-09-04) — `npm run migrate:seed-page-intros`: pre-populates the `pageIntros` singleton with the current website editorial values so each field shows its live value when edited; Services `description` left blank to keep the auto-count.
- `pageIntros` Sanity singleton schema (2026-09-02) — `src/sanity/schemas/pageIntros.ts` with field groups 01 Projects / 02 Services / 03 Journal / 04 Process / 05 Sustainability / 06 Contact; registered in `schemas/index.ts` and exposed as a true singleton in `sanity.config.ts` (structure item "10 // Page Introductions", hidden from the New-document menu and delete/duplicate actions). Data layer: `pageIntrosQuery` (GROQ), `transformSanityPageIntros` (only non-empty fields for merge-over-static fallback), and `getPageIntros()` (tagged `cacheTags.pageIntros` = `page-intros`).
- `src/app/api/revalidate/route.ts` (2026-09-02) — Sanity webhook receiver (`POST`): raw-body HMAC-SHA256 signature verification via `isValidSignature` (`@sanity/webhook`), `sanity-project-id`/`sanity-dataset` header cross-check, dev-only skip when `SANITY_WEBHOOK_SECRET` is unset, per-`_type` tag/path mapping with per-slug detail-page tags; `contact`/`siteSettings` also revalidate `/`. Extended for `pageIntros` (tag `page-intros`, paths `/projects /services /journal /process /sustainability /contact`).
- `SANITY_WEBHOOK_SECRET` (2026-09-02) — documented in `.env.example`; must be set in Vercel env vars and the Sanity dashboard webhook (URL `https://www.rafadesignhub.com/api/revalidate`). Never committed.
- `audit-resolve.json` (2026-09-01) — `npm-audit-resolver` allowlist scoping the 9 Sanity-Studio-CLI-only transitive advisories (adm-zip / js-yaml / uuid under `@sanity/cli`) to their exact dependency paths. New advisories still fail CI.
- `npm-audit-resolver` devDependency (2026-09-01) — powers `check-audit`, the new `npm run audit` gate.

- Company content schemas (2026-08-31) — `teamMember` (`team.ts`), `studio` singleton (`studio.ts`), `career` job postings (`career.ts`), `careers` page singleton (`careers.ts`), `contact` singleton (`contact.ts`), `siteSettings` singleton (`siteSettings.ts`) in `src/sanity/schemas/`, all registered in `schemas/index.ts`. Nested object types: `principle`, `workingMethod`, `timelineEvent`, `award`, `clientSector`, `socialLink`, `office`, `benefit`, `hero`, `openApplication`.
- Company GROQ queries — `teamQuery`, `studioQuery`, `careersPositionsQuery`, `careerBySlugQuery`, `careerSlugsQuery`, `careersQuery`, `contactQuery`, `siteSettingsQuery` (full projections incl. image assets/metadata).
- Company transforms — `transformSanityTeamMember(s)/Studio/StudioCollections/Career(s)/CareersPage/Contact/SiteSettings` plus `transformSocialLinks`/`transformOffice`/`sanitizeId` helpers in `src/sanity/lib/transforms.ts`.
- Company fetch functions — `getTeamMembers`, `getStudioInfo`, `getStudioCollections`, `getStudioHistory`, `getCareers`, `getCareerBySlug`, `getCareerSlugs`, `getCareersPageContent`, `getContactInformation`, `getSiteSettings` in `src/sanity/lib/fetch.ts`.
- `src/content/siteSettings.ts` — new `SiteSettings` interface (identity, SEO defaults, organisation, operational fields).
- Migration scripts — `scripts/migrate-{team,studio,careers,contact,site-settings}-to-sanity.mjs` + shared `scripts/lib/sanity.mjs` upload helper; run all five via `npm run migrate:company`. Idempotent (skip existing by slug/singleton) and upload the local placeholder images as Sanity assets.
- Suite of `migrate:*` npm scripts (`team`, `studio`, `careers`, `contact`, `site-settings`, `company`).
- `src/features/contact/contact-context.ts` — `ContactContext` + `useContact()` hook (2026-09-01).
- `src/features/contact/contact-provider.tsx` — client `ContactProvider` fed by the server layout, static fallback (2026-09-01).

- Process editorial redesign (2026-08-14) — `/process` rebuilt as an architectural-methodology page: 12-col intro, work-in-progress hero, ruled phase index with evidence plates, "See the Work →" link, and shared closing CTA. `ProcessTimeline`/`ProcessStep` rewritten as ruled editorial rows (`[2] number · [4] title · [6] description`, `border-y divide-y`, `Stagger`; phase `visual`s as full-width 16:9 `ImageReveal` evidence plates with mono captions). New `ProcessProgress` client component — reading-progress hairline under the header scrubbed across the methodology section, decorative + reduced-motion aware. `DisciplineCta` gained a `content` override (reused by `/process` via `pageContent.process.cta`).
- Process content in content (2026-08-14) — `processHero: ImageAsset` in `src/content/process/index.ts`, `pageContent.process.overline` + `.cta`, `ui.overlines.sequence`, `ui.sections.seeTheWork`.
- Services editorial redesign (2026-08-13) — `src/features/services/`: `discipline-index.tsx` (client, ruled 01–06 index with disciplined hover + `lg`-only sticky project preview), `discipline-approach.tsx` (ruled `[2] number · [4] title · [6] statement` approach list), `selected-work.tsx` (project evidence with `Location · Year · Typology` + "No project evidence listed" empty state), `discipline-related.tsx` (related-disciplines index, skipped when no shared evidence), `discipline-cta.tsx` (closing CTA → existing `/contact`).
- Services content model (2026-08-13) — `Service.intro` + `approach: ServiceApproach[]` (×4 per service), helpers `getServiceIndex(slug)` (zero-padded "01"–"06") and `getRelatedServicesForService(service)` (shared-project evidence, strongest first) in `src/content/services/index.ts`.
- Services copy in content (2026-08-13) — `pageContent.services.overline` + `.cta` (heading/body/action/overline), `ui.sections.selectedWork` / `ui.sections.relatedDisciplines`, `ui.overlines.practiceApproach` / `ui.overlines.noProjectEvidence`.
- `PrimaryNavIndex` (2026-08-12) — `src/features/navigation/primary-nav-index.tsx`, the shared numbered 01–06 primary index (menu + landing `variant="display"`; footer `variant="compact"`): `aria-current="page"` (accent index + hairline), restrained GSAP hover/focus nudges, reduced-motion aware, `onNavigate` closes the menu on activation.
- `Logo` size prop (2026-08-12) — `imgClassName` on `src/components/layout/Logo.tsx` (default `h-12`; landing cover `h-[clamp(4rem,12vh,12rem)]`) so the brand mark sizes per surface.
- `src/lib/capitalize.ts` (2026-08-12) — shared humanizer deduplicating Footer / FullscreenNavigation / Landing.
- `ui.navigation.index` label (2026-08-12) — "Index" overline + nav label for the landing primary index.
- Studio Index landing (2026-08-11) — `src/features/landing/landing.tsx`: the homepage is a pure viewport-filling cover — logo top-center at `lg`, numbered 01–06 primary rail bottom-left, email + capitalized social row bottom-right (stacked logo → index → socials below `lg`); GSAP staged reveal (bar → logo → index → social) + hover/focus nudges, reduced-motion aware; no header, footer, or search on `/`.
- `SiteShell` (2026-08-11) — `src/components/layout/SiteShell.tsx` hides the `Header` and the `Footer` on `/` and passes `unpadded` to `PageContainer` (which drops `pt-(--header-height)` on that route).
- `container-standard` tokens (2026-08-11) — `--container-standard: 72rem` + `--container-gutter: clamp(1rem, 3vw, 3rem)` in `src/styles/tokens.css`, consumed via `.container-standard` in `src/styles/utilities.css`.
- Search index real content coverage (2026-08-11) — `SearchResult` gained `keywords?: string`; projects index location city/country, typology, humanized category, materials, client, year, status; services index the full description; journal indexes category, author, and published year (substring, case-insensitive, max 8).
- Navigation visual refinement (2026-08-10) — `MENU` editorial label above the numbered sidebar rail in `fullscreen-navigation.tsx`; `MenuSearch` reused as a footer SEARCH layer in the footer brand column.
- Studio Index navigation (2026-08-10) — `src/components/ui/ThemeToggle.tsx` shared Sun/Moon toggle (Header + fullscreen menu bar); `ui.navigation.general` / `ui.navigation.more` labels.
- Studio industrial redesign (2026-08-07) — `src/features/studio/`: `beliefs.tsx` (PRINCIPLE 01–05 index), `working-methods.tsx` (METHOD 01–04 four-column specification grid), `visit-studio.tsx` (dispatch panel with office/phone/email/visits ledger reusing `contactInformation`).
- Studio content model additions — `src/content/studio/index.ts`: `overline`, `manifesto`, `beliefs: StudioPrinciple[]`, `workingMethods: WorkingMethod[]`, `visit` close, `timelineIntro`, `clientSectors: ClientSector[]`, `clientReferencesNote`; `TeamMember` gained `disciplines`/`experience`/`interests`; `Award` gained `project`/`citation`.
- `ui.overlines` block and `ui.sections.beliefs`/`workingMethods`/`visit` in `src/content/ui/index.ts` (mono "Specification // …" overlines).

- Motion primitives — `src/motion/` module: `Reveal`, `Stagger`, `TextReveal` (word-split), `ImageReveal` (clip-path), `Parallax`, `useReducedMotion`, `useScopedGsap`.
- Motion tokens in the Design System — durations (fast/base/slow/cinematic), eased curve names (standard/emphasized/cinematic) with CustomEase registration in the GSAP provider.
- Page transitions — pathname-keyed fade shell in `PageTransition`.
- Navigation active indicator + `link-underline` hover utility.
- Tokenized hover micro-interactions (`transition-micro`) and image zoom on cards.
- Image pipeline — `Image` component consumes `ImageAsset` model with placeholder fallback for missing assets.
- Local media organization — `public/images/projects|team|journal|studio|process`.
- Responsive images via `next/image` (sizes + priority per usage).
- Process supporting visuals (optional `visual` on `ProcessStep`).
- Shared content modules — `src/content/{ui,pages,index}.ts` (UI/filter/metadata/nav/section/form copy, page titles + descriptions, unified content barrel).
- Shared UI primitives — `Grid`, `FilterChips`, `Field`, `StatePanel`, `useDialog`.
- `src/app/not-found.tsx` — styled 404 page.
- Real Tailwind v4 utilities — `scrollbar-hide`, `transition-grid`, `animate-in`, `fade-in`.
- Placeholder imagery — 32 deterministic JPEGs in `public/images/**` generated by `scripts/generate-placeholder-images.mjs` (`npm run generate:images`), so every `<Image>` resolves instead of showing the fallback.
- Dark mode (ADR-020) — `.dark` class palette, `ThemeProvider`/`useTheme`, Header Sun/Moon toggle, inline pre-hydration theme script, `themeColor` for light + dark.
- Aspect-ratio design tokens — `aspect-hero` (21/9), `aspect-landscape` (16/9), `aspect-standard` (4/3), `aspect-portrait` (3/4).
- Layout/micro tokens — `--header-height`, `--micro-lift`, `--micro-scale` (consumed as `h-(--header-height)`, `hover:-translate-y-(--micro-lift)`, `scale-(--micro-scale)`).
- `src/config/theme.ts` — single JS theme source (brand name, schemes, theme-color values, storage key).
- Three.js hero scene (Phase 15) — new isolated `src/three/` layer: `hooks/use-is-webgl` (WebGL capability gate), `hooks/use-scene-quality` (high/low preset at ≤48rem), `components/CameraRig` (gentle drift + mouse parallax), `components/StudioLighting` (ambient + hemisphere + warm key with soft shadow), `components/ArchitecturalVolumes` (instanced stone massing model, 1 draw call; 14 volumes desktop / 8 mobile), `scenes/HeroCanvas` (Canvas, dpr clamp, `IntersectionObserver` offscreen pause), `scenes/HeroScene` (progressive-enhancement gate + `next/dynamic` `ssr:false`). Mounted as an `aria-hidden`, `pointer-events-none` background behind the homepage hero.
- Three.js stack re-added — `three@0.185.1`, `@react-three/fiber@9.7.0`, `@types/three` (deps previously pruned as unused are now required by Phase 15; drei intentionally omitted). The ~868 KB three/fiber chunk is lazy, client-only, and absent from every route's eager manifest.
- Theme-adaptive scene palette — `theme.scene.{light,dark}` (`volume` + `ground`) in `src/config/theme.ts` consumed by `src/three/utils/getScenePalette.ts`.
- `src/three/utils/scroll-progress.ts` — isolated bridge (`setScrollProgress` / `getScrollProgress`) that ScrollTrigger writes and the render loop reads, keeping scroll input out of React/UI state.
- Structured data (Phase 16 SEO) — `src/components/seo/JsonLd.tsx` (renders `application/ld+json` scripts) and `src/config/schema.ts` builders (`organizationSchema`, `websiteSchema`, `breadcrumbSchema`, `projectSchema` as CreativeWork, `articleSchema` as Article). Global `Organization` + `WebSite` in the root layout; `BreadcrumbList` on projects/journal/services listing + detail pages and studio/process/contact/careers.
- `--touch-target: 2.75rem` design token (`src/styles/tokens.css`) — the 44px accessibility minimum, consumed as `min-h-(--touch-target)` / `min-w-(--touch-target)` / `size-(--touch-target)`.
- `titleAs?: HeadingTag` prop on `ProjectCard` / `JournalCard` / `ServiceCard` / `PositionCard` / `ProcessStep` (default `h3`; listing pages pass `titleAs="h2"`) — lets shared cards render correct heading levels per document context.
- Video intro splash (Phase 14 Loading Experience) — `src/components/splash/{SplashProvider,SplashScreen}.tsx` mounted inside `Providers` in the root layout. Full-screen `z-overlay` overlay plays `public/videos/rafa-video.mp4` (`siteConfig.introVideo`) `object-cover`, autoplay/muted/playsInline, no controls. Fades out over `duration-slow` (480 ms) revealing the already-mounted header/content; session-gated via `sessionStorage` (`rafa-splash-played`), waits for `window load` + `document.fonts.ready` (+150 ms buffer, 3 s cap), scroll-locked while active, skips under `prefers-reduced-motion`, `onError` treated as ended, all listeners cleaned up.
- CSS `dark:` variant registered (`@custom-variant dark`) so Tailwind v4 class-based dark-mode utilities work.
- Logo now renders a single transparent logo PNG (`public/logo/rafa-bg-black.png`, a white logo on alpha) with `invert dark:invert-0` — no background mismatch in either theme, no hydration flash.
- Navigation feature (docs/06 philosophy) — `src/features/navigation/`: `navigation-provider.tsx` (owns `isMenuOpen`, closes on route change, wraps the page in `inert` while open) + `navigation-context.ts` (`useNavigation`) + `fullscreen-navigation.tsx` (fullscreen primary menu: numbered primary links, supporting tier, contact, featured project image, latest journal article) + `menu-search.tsx` / `search-index.ts` (static client-side search over projects, services, and journal articles).
- Typed shared navigation config — `src/config/navigation.ts` (`navigationConfig` with `primary`/`supporting` route keys, `satisfies`-checked) and `primaryNavLinks`/`supportingNavLinks` in `src/content/navigation/index.ts` (replaces the single `navLinks` export). `src/app/sitemap.ts` now derives static routes from the config (`staticRouteKeys`).
- Fullscreen navigation staged open/close motion (docs/06) — overlay → bar → primary link stagger → rail → search → featured, with reversed close, ~500–700 ms, `useReducedMotion` aware, `data-lenis-prevent` for native menu scrolling.
- Menu disciplines — `ui.navigation` label (`disciplines`) and a Disciplines section in the fullscreen navigation rail listing the six services (`getServices()` → `/services/[slug]`), so disciplines (Architecture, Interior Design, Landscape Design, etc.) are reachable directly from the menu per docs/06.
- Footer Disciplines column — `Footer` now includes a Disciplines nav (the six services) between Explore and Contact, keeping the footer in sync with the fullscreen navigation as the condensed view of the same IA (docs/06). Grid adjusted to 4/2/3/3.

## Changed

- Process section (2026-08-14) — `/process` and `src/features/process/` rewritten from a numbered vertical timeline into a ruled editorial methodology index; `DisciplineCta` now accepts a `content` override.
- Services section (2026-08-13) — `/services` and `/services/[slug]` rebuilt as an editorial discipline index/detail (ruled rows, overlines, hairline rules, numbered approach points, Selected Work / Related Disciplines / CTA) replacing the bordered card grid; `src/app/(site)/services/page.tsx` and `src/app/(site)/services/[slug]/page.tsx` rewritten.
- Navigation image-logo + consistency pass (2026-08-12) — Header, FullscreenNavigation, Landing, and Footer now all render the `public/logo/rafa-bg-black.png` image logo (`invert dark:invert-0`); the numbered 01–06 primary index is a single shared `PrimaryNavIndex` component (menu/landing `display`, footer `compact`) with `aria-current="page"`; mono 10px overlines unified across columns; `ui.navigation.more` = "Practice" everywhere; the footer gains a `tel:` phone link under email; the Header hides on scroll and reveals on upward scroll (GSAP, reduced-motion aware); the landing cover is redesigned around the image logo (top bar + top-center cover) with stage reveals; the fullscreen menu drops its dead backdrop blur; `--header-height` aligned to docs/04 (now `4rem`).
- Navigation architecture (2026-08-11) — the landing was reworked from the promoted Studio Index into a viewport-filling cover (logo top-center, index bottom-left, socials bottom-right on desktop; stacked below `lg`); the fullscreen menu was rebuilt as a full directory (sticky bar + GENERAL 01–06 / DISCIPLINES / MORE columns + `MenuSearch` + contact/social row; the giant brand field and `Image` were removed); the `Footer` is now hidden on `/` too — gated by `SiteShell` and removed from `src/app/(site)/layout.tsx`.
- Landing pivot (2026-08-11) — `src/app/(site)/page.tsx` now renders `<Landing />`; `PageContainer` gained `unpadded`; the landing socials row wraps (`flex-wrap`) fixing a 14px horizontal overflow at 360px in the scrollbar gutter; `search-index.ts` keyword coverage per result type.
- Navigation/footer responsive + hierarchy polish (2026-08-10) — menu social row wraps (`md:flex-wrap`) fixing a ~40px overlay overflow at 768px; footer directory grid moved `md:` → `lg:` (calm single-column stack below 1024px) with columns rebalanced to 4/2/3/3; sub-footer cluster wraps on 360/390px; dead `ui.navigation` labels removed; `max-w-xs` (8px Tailwind v4 substitution) → `max-w-[20rem]` in `services-preview`.
- Fullscreen navigation rebuilt as a Studio Index (2026-08-10) — `fullscreen-navigation.tsx` now composes a top bar (site name + `ThemeToggle` + `CLOSE`), a numbered primary rail (01–06) with `MenuSearch`, and an asymmetric brand identity field (logo + email/social row); featured project image, journal preview, supporting tier, phone, and the Disciplines section removed from the menu. `Header` consumes the shared `ThemeToggle`. `Footer` refactored as its quiet counterpart — brand column + `GENERAL` / `DISCIPLINES` / `MORE` + sub-footer (© year, socials, Privacy Policy, Back to top ↑). Menu search wrapper fixed from `max-w-xs` (8px Tailwind v4 substitution) to `w-full`; footer tagline uses `max-w-[20rem]`.
- Studio page (2026-08-07) — rebuilt along the industrial specification language: `StudioIntroduction` manifesto hero (overline + `TextReveal` display h1 + caption row), `Beliefs` replaces `Philosophy` (deleted `philosophy.tsx`), `Awards` year-leading index with citations, `Timeline` narrative intro, `Partners` sector index (replaces `clients` string list), `TeamMemberCard` disciplines/experience/interests, atelier image via `Parallax` with caption; page assembled with `clients` → `clientSectors`.
- `src/content/studio/index.ts` — removed `mission`/`vision`/`values` and the `clients` export (superseded by `beliefs`/`clientSectors`); barrel updated in `src/content/index.ts`.
- `docs/12-page-architecture.md` — added "Page Intro Composition" rule: heading clusters (overline + H1 + ≤ one tagline) always stack vertically; any second full-length text block must split horizontally on the 12-col grid at a shared baseline.
- Dark-mode foundations: `html.dark { color-scheme: dark; }` in `base.css`; `layout.tsx` viewport + `suppressHydrationWarning`.
- Hardcoded values tokenized — `aspect-[21/9]`/`[16/9]`/`[4/3]`/`[3/4]` → `aspect-*` tokens; `h-16`/`pt-16` → `--header-height`; `min-h-[6rem]` → `--spacing-3xl`; `hover:-translate-y-1`/`scale-[1.04]` → `--micro-lift`/`--micro-scale`.
- `motion.durations` / `motion.easing` (CSS-var strings) removed from `src/design-system/motion.ts` — all consumers use `motion.values`.
- Media-query breakpoint literals annotated with the token they mirror (ADR-021 — `var()` is not valid inside `@media` conditions).
- `Header` gains a theme toggle and uses `h-(--header-height)`.
- `Hero` (homepage) restructured into a `relative` section hosting the Three.js scene layer plus a `z-10` content column — content, SEO, and motion behavior unchanged.
- `TextReveal` polymorphic rendering switched from JSX `<Tag ref={...}>` (`as: ElementType`) to `React.createElement` + `HTMLElementType` — the JSX form does not typecheck under React 19 types (`children`/`ref` resolve to `never`).
- `package.json` — `sharp` `overrides` entry aligned to `^0.35.3` to match the direct dependency (npm 11 rejects overrides that differ from the direct dependency spec).
- `three` `^0.185.1` → `^0.182.0` and `@types/three` `^0.185.3` → `^0.182.0` — eliminates the `THREE.Clock` deprecation warning (three r183 deprecated `Clock`; R3F 9.7.0 still constructs one internally). `0.182.0` stays within R3F's supported `three >= 0.156` peer range; no project code changed.
- Hero scene scroll integration (Phase 15) — `HeroCanvas` scrubs a `gsap.fromTo` (opacity → 0, scale → 0.94) on the scene wrapper over the hero exit (`useScopedGsap`, `start: "top top"` → `end: "bottom top"`) and writes `self.progress` to `scroll-progress`; `CameraRig` reads it in `useFrame` and subtly raises the camera (+0.7 Y), dollies toward the composition (−0.6 Z), and lifts the look-at (+0.6), gated to high quality. Reduced-motion safe; no pinning/scroll-jacking.
- `src/providers/theme-provider.tsx` — `isDark` derived from the `documentElement` `.dark` class via `useSyncExternalStore` (hydration-safe server snapshot) instead of `useState` + `useEffect`; `toggleTheme` writes the class + `localStorage` directly.

- Motion now used across homepage, projects, services, studio, process, journal, contact, and careers pages (including slug pages).
- Grid wrappers (`ProjectGrid`, `ServicesGrid`, `JournalGrid`) and timelines now animate via `Stagger`.
- Hero removed `animate-bounce` in favor of a tokenized mount reveal.
- All image placeholders across projects, studio, journal, homepage, and process now use the `Image` component.
- `ImageAsset` type moved to shared `src/content/types.ts` (no longer defined inside the projects content module).
- `Image` component: `sizes` is now required, dead `aspectRatio` prop removed, fill/non-fill branches collapsed, error fallback keeps `alt` via `aria-label`.
- Breakpoints inside `sizes` strings aligned with design tokens (`48rem` / `64rem` instead of `768px` / `1200px`).
- Lint cleaned to 0 errors (unused imports, `import/order`, `jsx-a11y/alt-text` exemption for the `Image` wrapper).
- `ProjectFilter` / `CategoryFilter` accept `active` prop from server pages (fixes `useSearchParams` prerender bailout).
- `LenisProvider` creates the Lenis instance lazily (fixes refs/set-state lint errors).
- GSAP plugin + CustomEase registration moved to module scope in `GSAPProvider` so eases exist before the first tweens are created.
- Motion duration/ease CSS tokens given Tailwind v4 namespace aliases (`--transition-duration-*` → `duration-*`, `--ease-*` → `ease-*`) so `duration-base` / `duration-slow` utilities actually apply.
- `Input` / `Textarea` now forward `value`, `onBlur`, and `ref` (React 19 ref-as-prop) and accept `error?: string | undefined`.
- Metadata root layout now uses `createMetadata` from `src/config/seo.ts` (OG/Twitter/icons/canonical); detail pages return bare titles (no more double site-name suffix).
- All landing pages export `generateMetadata`; homepage uses an absolute title to avoid duplicating the template suffix.
- `siteConfig.url` falls back to `http://localhost:3000` so `metadataBase` and the sitemap resolve without an env var.
- Reduced-motion guard reads the media query synchronously via `useSyncExternalStore` — no more first-paint flash.
- Lenis provider now drives from `gsap.ticker`, syncs with `ScrollTrigger.update`, sources tuning from motion tokens, and destroys the instance on unmount.
- `PageTransition` wraps its tween in `gsap.context` with cleanup and imports `useReducedMotion` from the `@/motion` barrel.
- `useReducedMotion` is exported through the `@/motion` barrel.
- Content copy moved out of components/pages into `src/content/` — footer, form, section headings, metadata labels, filters, and all page titles/intros consume content modules.
- Homepage `journal-preview` and `services/[slug]` related rows reuse `JournalCard` / `ProjectCard`.
- `Footer` is now a server component and sources `navLinks` from `@/content/navigation`.
- `Modal`/`Dialog`/`Drawer` share `useDialog` (focus trap, focus restore, scroll lock, Escape); `Input`/`Textarea` delegate to `Field`; `EmptyState`/`ErrorState`/`SuccessState` delegate to `StatePanel`.
- `Tabs` — real ids, roving tabindex, Arrow/Home/End navigation. `Accordion` — full ARIA wiring. `Carousel` — region semantics + `aria-current` dots. `MobileNavigation` — Escape/focus trap/`inert` when closed.
- `routes.ts` — `home` and `notFound` marked `"active"`; `NavigationMenu` active state prefix-matches nested routes.
- Shared types — `SocialLink` and `Location` in `src/content/types.ts`; contact `Office` extends `Location`.
- `.env.example` — `NEXT_PUBLIC_SITE_URL` aligned to port 8000.
- `Header` is now minimal on every breakpoint — Logo + Theme Toggle + Menu button only (`aria-expanded`, `aria-haspopup="dialog"`); the fullscreen navigation is the only primary menu (docs/06). The desktop horizontal link bar and the separate mobile menu are gone.
- `Footer` consumes the shared navigation content — `primaryNavLinks` / `supportingNavLinks` from `@/content/navigation`, `routes.contact.label`, `contactInformation` (email/phone/social, `#` links filtered), and `ui.navigation` / `ui.sections` labels, with a 12-col 5/3/4 grid.
- Menu primary order per docs/06: Projects, Studio, Services, Process, Journal, Contact; supporting: Careers (Sustainability deferred until its page exists).

## Removed

- Services feature components (2026-08-13) — `src/features/services/service-card.tsx` and `src/features/services/services-grid.tsx`, superseded by the editorial `DisciplineIndex` (search consumption unchanged — `search-index.ts` reads `shortDescription` + `description` from the same `Service` model).
- Homepage pivot deletions (2026-08-11) — `src/features/home/` (8 preview sections), `src/content/home/` + the `homeContent` export, the entire `src/three/` layer (9 files incl. `HeroScene` / `HeroCanvas`) and the `theme.scene` palette in `src/config/theme.ts`, the `Header` from `/`, and dependencies `@react-three/fiber` / `three` / `@types/three` (re-pruned after the hero that consumed them was deleted).
- Sanity CMS from Version 1.0 scope (ADR-019 — static content layer for v1).
- Cloudinary / Video Delivery from Version 1.0 scope (external credentials, ADR-019).
- Root `src/app/page.tsx` that returned `null` and shadowed the real homepage at `/`.
- 10 unused production dependencies: `framer-motion`, `sonner`, `swiper`, `react-countup`, `react-markdown`, `yet-another-react-lightbox`, `three`, `@react-three/fiber`, `@react-three/drei`, `class-variance-authority`.
- 8 feature barrel `index.ts` files (components import from subpaths).
- Dead exports — `useLenis`, `prefersReducedMotion`, motion presets (`fadeIn`, `fadeUp`, `scaleIn`), unused design-system modules (colors/spacing/radius/shadows/z-index/containers/breakpoints/ratios), `config/theme.ts`, `types/design-system.ts`.
- Empty scaffold directories — `src/{constants,data,contexts,hooks,layouts,sections,services,stores,utils}`, `src/three/**`, `src/features/{navigation,footer}`, `src/app/(site)/privacy`, `src/assets/**` — and remaining `.gitkeep` files.
- Dead `motion.durations` / `motion.easing` exports from `src/design-system/motion.ts` (zero consumers).
- `src/components/navigation/` — the old `NavigationMenu.tsx` and the whole folder (dead code superseded by the fullscreen navigation feature). The separately-documented `DesktopNavigation` / `MobileNavigation` are intentionally not recreated (docs/06 full philosophy).
- Menu + Footer Disciplines sections — the six services were listed directly in the fullscreen navigation rail and the footer, duplicating the `/services` umbrella page (already the "Services" primary nav item). Removed the `ui.navigation` `disciplines` label and the `getServices()` lists from both surfaces; the footer grid reverted to 5/3/4. "Services" is now the single navigation entry point.

---

## Fixed

- Footer directory + sub-footer links below the 44px minimum — every footer link (index, disciplines, practice, email/phone, sub-footer socials + back-to-top) now uses `min-h-(--touch-target)`; the dead Privacy Policy link (route `/privacy` is `planned`, 404 today) was removed.
- Pre-existing `import/order` lint debt in `src/features/projects/*` and `src/app/(site)/sustainability` autofixed via `eslint . --fix` (lint now fully green).
- GSAP "target not found" warnings when opening the fullscreen menu — the overlay target resolved to `null` (`querySelector("[data-nav-overlay]")` from the element that itself carried the attribute; `querySelector` only matches descendants) and the primary stagger selector `[data-nav-primary] > li` matched nothing because the items sit inside a nested `<ul>`. The overlay now animates the root dialog element directly and the primary selector is `[data-nav-primary] ul > li`.
- Dark-mode hydration mismatch — `ThemeProvider` initialized `isDark` from the live DOM during hydration while the server always rendered `isDark = false`; on dark-mode systems this made the Header theme toggle differ from the server HTML, React discarded the server tree, and the client-side regeneration re-created the inline pre-hydration `<script>` (React 19: "Encountered a script tag while rendering React component"). `isDark` is now derived from the `.dark` class via `useSyncExternalStore` (server snapshot `false`; `MutationObserver` syncs consumers post-hydration).
- Homepage renders blank in production (root `page.tsx` shadowed `(site)/page.tsx` at `/`).
- Category filtering on `/projects` and `/journal` never activated — `searchParams` is now awaited as a Promise (Next 15+).
- Contact form always reported success — now validates with `react-hook-form` + `zod` and submits to a real `/api/contact` route (Resend-backed, guarded by `RESEND_API_KEY`).
- Missing `/sitemap.xml` referenced by `robots.txt` — added `src/app/sitemap.ts`.
- Missing favicon / OG / Twitter metadata — added `public/icon.svg` and `opengraph-image.tsx` / `twitter-image.tsx` routes.
- Reduced-motion users no longer see an invisible-content flash on first paint.
- No stale ScrollTrigger positions — `ScrollTrigger.refresh()` after image load, route change, and Lenis init.
- Nested interactive element (`<Link>` wrapping `<Button>`) in `contact-cta` — now a button-styled link.
- Broken/no-op CSS utilities (`scrollbar-hide`, `transition-grid`, `animate-in`) — implemented.
- No-op `Dialog` destructive variant and duplicated `Toast` styles — distinct variants now.
- Garbled `减法` text in the studio philosophy — replaced with coherent English.
- `pageContent.studio.title` missing — added and consumed by the studio page metadata.
- Prettier repo-wide debt — all docs and components now pass `format:check`.
- Header overlapped by page content while scrolling — `src/styles/tokens.css` z-index tokens used the `--z-*` theme namespace, which Tailwind v4 does not recognize for z-index (its namespace is `--z-index-*`, confirmed in `tailwindcss@4.3.3` `dist/lib.js`). The `z-header` / `z-overlay` / `z-modal` / `z-content` utilities were never emitted, so the fixed Header rendered with `z-index: auto` and content with `z-10` painted above it, hiding the nav and intercepting clicks. Tokens renamed to `--z-index-{base,content,header,overlay,modal}`; verified via CDP that the Header computes `z-index: 50` and `elementFromPoint` returns nav links at scroll 0 / 300 / 1200.
- All `[slug]` detail pages (projects/journal/services) silently prerendered as 404 — Next.js 16 removed synchronous `params` access (Async Request APIs breaking change); the pages destructured `{ params }` synchronously, so `params.slug` was `undefined` at build time and `notFound()` was baked into the static HTML for every slug. `generateMetadata` and the page component in `projects/[slug]/page.tsx`, `journal/[slug]/page.tsx`, and `services/[slug]/page.tsx` are now `async` with `await params` (`Promise<{ slug: string }>`). Verified on the production build: detail pages return 200 with real content titles.
- Second `h1` on `/journal` — `FeaturedArticle` rendered `h1` under the page `h1`; now semantic `h2` via `as="h2"` (display styling unchanged).
- Skipped heading levels on listing pages — card `h3` headings sat directly under the page `h1`; listing pages (`/projects`, `/journal`, `/services`, `/process`, `/careers`) now pass `titleAs="h2"` so cards render `h2` (homepage/related sections keep `h3`).
- Dead placeholder links — footer social links were all `href="#"` (jump-to-top); `Footer` filters to real URLs (`href !== "#"`) and renders the "Connect" block only when one exists.
- Touch targets below 44px — header nav links, logo, theme toggle, mobile menu button, filter chips, and footer links now meet the 44px minimum (`--touch-target` token). The nav active-underline indicator was re-anchored to the label span so it still hugs the text after the enlarged hit area.
- Social links rendered as inert `<span>`s in `TeamMemberCard` and `ContactInformation` — the `SocialLink.url` was never used (the Contact page even hid real profile URLs as plain text). Both now filter `url !== "#"` (matching the Footer) and render real anchors with `target="_blank"`, `rel="noopener noreferrer"`, and `--touch-target` hit areas.
- `studio.history` was dead content — populated in `src/content/studio/index.ts` and documented in `docs/20-content-models.md` but never rendered. A new `History` section (`src/features/studio/history.tsx`) renders the narrative between the dense `Awards` and `Timeline` lists, satisfying the "never stack multiple dense sections together" rule in `docs/12-page-architecture.md`.
- Index-based `key={i}` in `Awards`, `Timeline`, and `Partners` — replaced with stable content-derived keys (`${title}-${year}` / `${year}-${title}` / client string) so reorders and filters don't cause component-state mismatches.

---

## Security

- Dependency audit resolved (2026-08-11) — `npm audit fix` patched the reported 5 vulnerabilities (2 moderate, 3 high) entirely in range via the lockfile: `postcss` → 8.5.26, `nanoid` → 3.3.18, `brace-expansion` → 5.0.9 / 1.1.18, `js-yaml` → 4.3.1. `next` stayed at 16.2.11 (no forced `--force` upgrade). Audit now reports 0 vulnerabilities.

## Documentation

- Initial documentation completed.

---

# Version History

Future releases should be added below.

Example

---

# [0.2.0]

Date

YYYY-MM-DD

## Added

-

## Changed

-

## Improved

-

## Fixed

-

## Removed

-

---

# [0.3.0]

Date

YYYY-MM-DD

## Added

-

## Changed

-

## Improved

-

## Fixed

-

---

# [1.0.0]

Date

YYYY-MM-DD

## Added

Production release.

---

# Release Rules

A new version should be created when:

Major

Breaking architectural changes.

Examples

- CMS replacement.
- Routing overhaul.
- Major redesign.

Minor

New features.

Examples

- Journal.
- Studio page.
- New animations.
- CMS integration.

Patch

Bug fixes.

Examples

- Accessibility fixes.
- SEO improvements.
- Performance optimization.
- Animation refinements.

---

# Version Lifecycle

v0.x.x

Active development.

v1.0.0

First production release.

v1.x.x

Feature updates.

v2.x.x

Major platform evolution.

---

# Relationship to Other Documents

Implementation Tracker

Tracks current progress.

Release Notes

Records development sessions.

Known Issues

Tracks unresolved work.

Changelog

Records released changes.

---

# Goal

The Changelog provides a concise, version-based history of the platform.

It should remain readable, accurate, and focused on meaningful changes rather than daily development activity.
