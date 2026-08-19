# RAFA Design Website

Premium architecture and interior design website built with Next.js App Router, React,
TypeScript, Tailwind CSS, GSAP, Framer Motion, Three.js, Lenis, and modern frontend
engineering standards.

This repository is currently in **Phase 1: Foundation**. No landing page, reusable UI
components, sections, or animations are implemented yet.

## Architecture Tree

```txt
.
├── .github/
│   └── workflows/
│       └── audit.yml
├── .husky/
│   └── pre-commit
├── public/
│   ├── favicon/
│   ├── images/
│   ├── videos/
│   ├── models/
│   ├── manifest/
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── projects/
│   │   │   ├── studio/
│   │   │   ├── services/
│   │   │   ├── process/
│   │   │   ├── journal/
│   │   │   ├── careers/
│   │   │   ├── contact/
│   │   │   └── privacy/
│   │   ├── api/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   ├── models/
│   │   └── videos/
│   ├── components/
│   │   ├── common/
│   │   ├── feedback/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── media/
│   │   ├── navigation/
│   │   ├── typography/
│   │   └── ui/
│   ├── config/
│   │   ├── navigation.ts
│   │   ├── routes.ts
│   │   ├── seo.ts
│   │   ├── site.ts
│   │   └── theme.ts
│   ├── constants/
│   ├── content/
│   │   ├── company/
│   │   ├── footer/
│   │   ├── home/
│   │   ├── journal/
│   │   ├── legal/
│   │   ├── navigation/
│   │   ├── process/
│   │   ├── projects/
│   │   ├── services/
│   │   └── studio/
│   ├── contexts/
│   ├── data/
│   ├── design-system/
│   │   ├── breakpoints.ts
│   │   ├── colors.ts
│   │   ├── containers.ts
│   │   ├── grid.ts (to be removed — grid lives in breakpoints.ts)
│   │   ├── index.ts
│   │   ├── motion.ts
│   │   ├── radius.ts
│   │   ├── ratios.ts
│   │   ├── shadows.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── z-index.ts
│   ├── features/
│   │   ├── careers/
│   │   ├── contact/
│   │   ├── footer/
│   │   ├── hero/
│   │   ├── journal/
│   │   ├── navigation/
│   │   ├── process/
│   │   ├── projects/
│   │   ├── services/
│   │   └── studio/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── motion/
│   ├── providers/
│   │   ├── gsap-provider.tsx
│   │   ├── lenis-provider.tsx
│   │   └── providers.tsx
│   ├── sections/
│   ├── services/
│   ├── stores/
│   ├── styles/
│   │   ├── animations.css
│   │   ├── base.css
│   │   ├── tokens.css
│   │   └── utilities.css
│   ├── three/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── loaders/
│   │   ├── materials/
│   │   ├── scenes/
│   │   └── utils/
│   ├── types/
│   │   └── design-system.ts
│   └── utils/
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc.mjs
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Folder Responsibilities

| Folder              | Responsibility                                                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app`           | Next.js App Router only: route files, root layout, metadata, global CSS import, and route-level conventions.                                    |
| `src/components`    | Reusable presentation components organized by type: ui, layout, navigation, media, forms, feedback, typography, common.                         |
| `src/features`      | Feature-based business logic modules with local components, hooks, and animations organized by domain.                                          |
| `src/layouts`       | Future reusable page shells and structural layout patterns.                                                                                     |
| `src/sections`      | Future page sections such as hero, project index, journal rail, and CTA sections.                                                               |
| `src/motion`        | Future GSAP timelines, scroll triggers, animation presets, and animation orchestration helpers.                                                 |
| `src/three`         | React Three Fiber scenes, shaders, materials, camera rigs, loaders, and utils.                                                                  |
| `src/hooks`         | Future reusable React hooks. Hooks that are feature-specific stay inside `features`.                                                            |
| `src/providers`     | App-level providers: GSAP (ScrollTrigger registration), Lenis (smooth scroll), and future theme/analytics.                                      |
| `src/services`      | Future integrations with external services, APIs, CMS, email, analytics, and storage.                                                           |
| `src/lib`           | Small framework-agnostic utilities used across the application.                                                                                 |
| `src/utils`         | Future pure utility functions that do not own infrastructure or external integrations.                                                          |
| `src/design-system` | Single source of truth for design: colors, typography, spacing, containers, grid, breakpoints, radius, shadows, motion tokens, ratios, z-index. |
| `src/constants`     | Future shared constants that are not environment-specific and are not design tokens.                                                            |
| `src/types`         | Shared TypeScript types and contracts.                                                                                                          |
| `src/config`        | Site, route, navigation, SEO, and environment-facing configuration.                                                                             |
| `src/styles`        | Global CSS foundation, Tailwind v4 theme tokens (`tokens.css`), base reset, utilities, and animation defaults.                                  |
| `src/assets`        | Source-controlled static design assets used by code (fonts, icons, images, models, videos).                                                     |
| `src/data`          | Future structured local data, fixtures, indexes, and non-CMS datasets.                                                                          |
| `src/content`       | Future editorial content, project copy, journal source files, and CMS content.                                                                  |
| `src/contexts`      | Future React contexts that are not better expressed as providers or stores.                                                                     |
| `src/stores`        | Future client state stores for persistent interactive state.                                                                                    |
| `public`            | Root-level Next.js static assets served from `/`; stays outside `src` by framework convention.                                                  |

## Design Tokens

Tokens live in two synchronized layers:

- `src/styles/tokens.css` exposes Tailwind v4 theme variables, semantic CSS custom properties,
  light/dark mode values, container utilities, and the base grid utility.
- `src/design-system/` exposes the same design language to TypeScript for component,
  motion, and Three.js code.

Token categories: typography, spacing, radius, containers, shadows, z-index/layers,
transitions, animation durations, easing, blur, opacity, breakpoints, grids, image ratios,
and semantic colors.

Components must use semantic names such as `bg-background`, `text-foreground`,
`border-border`, `text-muted-foreground`, and `bg-accent`. Hardcoded colors belong only
inside token files.

## Typography System

| Token       | Purpose                                                           |
| ----------- | ----------------------------------------------------------------- |
| `display`   | Cinematic editorial statements and future first-viewport moments. |
| `heading1`  | Primary page titles.                                              |
| `heading2`  | Major section titles.                                             |
| `heading3`  | Subsection or project feature titles.                             |
| `heading4`  | Compact panel and card headings.                                  |
| `bodyLarge` | Editorial introduction copy.                                      |
| `body`      | Default reading text.                                             |
| `caption`   | Meta text, credits, and supporting details.                       |
| `overline`  | Small uppercase labels with positive letter spacing.              |
| `button`    | Action labels with controlled weight and spacing.                 |

Responsive type uses `clamp()` tokens. Letter spacing is `0` for display, heading, and body
styles, with restrained positive tracking only for overline and button text.

## Color System

The palette is architectural: warm limestone backgrounds, ink foregrounds, controlled bronze
accent, muted plaster surfaces, and dark-mode charcoal surfaces. The system is semantic first:
`primary`, `neutral`, `background`, `surface`, `border`, `accent`, `muted`, `success`,
`warning`, and `error`.

Light mode is the default token set. Dark mode is available through `.dark` and also follows
`prefers-color-scheme` when no explicit `.light` class is present.

## Grid, Containers, and Spacing

- Desktop grid: 12 columns.
- Tablet grid: 8 columns.
- Mobile grid: 4 columns.
- Gutter: responsive `clamp(1rem, 2vw, 2rem)` on desktop, reduced on smaller screens.
- Containers: `standard`, `wide`, `full`, `narrow`, `content`, and `editorial`.
- Image ratios: portrait `3 / 4`, landscape `16 / 10`, cinematic `21 / 9`, square `1 / 1`,
  and editorial `4 / 5`.
- Spacing scale: 8-point system where `1 = 0.5rem = 8px`, `2 = 16px`, `3 = 24px`,
  continuing through large section spacing.

Breakpoints: mobile `30rem`, tablet `48rem`, laptop `64rem`, desktop `80rem`,
large desktop `96rem`, ultra wide `120rem`.

## Animation Principles

No animation is implemented in Phase 1. Future motion should feel quiet, physical, and
editorial rather than decorative.

- CSS transitions: small hover, focus, opacity, and color state changes.
- Framer Motion: React state, layout presence, route transitions, and small interaction states.
- GSAP: timeline-heavy sequences, scroll choreography, pinned scenes, and split text work.
- Lenis: the single owner of smooth scrolling; native smooth scroll is not used globally.
- Three.js: immersive, high-value scenes only, loaded dynamically and isolated from core content.
- Page transitions: brief, content-aware, and interruptible.
- Reveal animations: opacity and transform only; no layout-shifting reveals.
- Hover behavior: fast, reversible, and accessible by focus state.
- Image transitions: scale and mask motion must preserve composition and avoid layout shift.
- Parallax: subtle depth only, disabled or reduced for motion-sensitive users.
- Performance: animate `transform` and `opacity`, avoid layout thrash, clean up GSAP contexts,
  and lazy-load heavy client-only modules.
- Accessibility: respect `prefers-reduced-motion`, keep focus visible, and never hide essential
  content behind animation.

## Component Roadmap

Planned only: Button, Container, Heading, Section, Reveal, Image, Video, Navbar, Footer, Card,
Project Card, Cursor, Loader, Marquee, Magnetic Button, Split Text, Grid, Pill, Tag, Stats, CTA,
and Form Elements.

No component is implemented in Phase 1 because the current objective is system foundation.

## Page Architecture

Planned routes: Landing `/`, Projects `/projects`, Project Details
`/projects/[slug]`, Services `/services`, Studio `/studio`, Process `/process`, Journal
`/journal`, Contact `/contact`, Careers `/careers`, Privacy `/privacy`, and 404.

`src/config/routes.ts` records the future route surface without creating route folders or pages.

## Configuration Standards

- Next.js: typed routes enabled, optimized image formats configured, experimental package import
  optimization enabled for `framer-motion`, `lucide-react` left to Next's default optimizer, and
  powered-by header disabled.
- TypeScript: strict mode plus exact optional properties, casing checks, no unchecked indexed
  access, and absolute aliases for each major source folder.
- ESLint: Next core web vitals, Next TypeScript rules, explicit import ordering, and Prettier
  conflict resolution.
- Prettier: Tailwind class sorting, consistent formatting, and `cn`/`cva` class detection.
- Husky: pre-commit hook runs lint-staged.
- GitHub Actions: audit, typecheck, lint, format check, and production build.
- Environment variables: `.env.example` documents public deployment URL expectations; real
  `.env*` files stay ignored.

## Performance Standards

Use `next/image` for visual assets, static imports when possible, remote image patterns only when
providers are known, route-level code splitting by default, dynamic imports for heavy client-only
work, optimized Next fonts, semantic Metadata API, and accessible loading/error states when pages
are introduced.

## Code Standards

- Components use PascalCase files and exports.
- Hooks use `useThing` naming.
- Utilities use named exports unless a framework convention requires default export.
- Server Components are the default; use `"use client"` only at interaction boundaries.
- Feature-specific code stays in its feature folder.
- Shared code must prove reuse before being promoted.
- Imports are grouped: type, built-in, external, internal aliases, then relative imports.
- Tailwind classes must use tokens and semantic utilities instead of hardcoded values.
- Animation code must live in `animations`, `motion`, or `three` unless it is local and trivial.

## Created and Updated Files

Created:

- `.env.example`: documents the public site URL variable.
- `.prettierrc.mjs`: Prettier and Tailwind class sorting configuration.
- `.prettierignore`: keeps generated and asset-heavy folders out of formatting runs.
- `.husky/pre-commit`: runs lint-staged before commits.
- `src/styles/tokens.css`: CSS and Tailwind token source.
- `src/styles/base.css`: global reset, accessibility, and base element rules.
- `src/config/site.ts`: central site metadata configuration.
- `src/config/routes.ts`: future route map without page creation.
- `src/design-system/`: colors, typography, spacing, containers, breakpoints, grid, radius, shadows, motion tokens, ratios, z-index, and the barrel export index.
- `src/providers/gsap-provider.tsx`: GSAP ScrollTrigger registration.
- `src/providers/lenis-provider.tsx`: Lenis smooth scroll initialization with GSAP sync.
- `src/providers/providers.tsx`: composed provider wrapper.
- `src/lib/cn.ts`: `clsx` plus `tailwind-merge` class utility.
- `src/types/design-system.ts`: shared design-system type vocabulary.

Updated:

- `src/app/layout.tsx`: production metadata, font variables, and semantic body styling.
- `src/app/page.tsx`: blank root route so no landing page is built in Phase 1.
- `src/app/globals.css`: imports Tailwind, tokens, and base styles only.
- `next.config.ts`: production-minded Next configuration.
- `tsconfig.json`: stricter TypeScript and absolute path aliases.
- `eslint.config.mjs`: import ordering and Prettier compatibility.
- `package.json` and `package-lock.json`: scripts plus dev-tooling dependencies.
- `.gitignore`: allows `.env.example` while real environment files stay ignored.
- `.github/workflows/audit.yml`: CI validates audit, typecheck, lint, format, and build.

Deleted:

- No files were deleted. Default demo content was removed from existing files instead.

## Next Build Phase

Phase 3 — Core Layout should build the application shell: global navigation, mobile navigation, footer, page container, section component, and page transition system. After that, Phase 4 — Core Components (buttons, typography components, cards, media components, form elements) and Phase 5 — Homepage.
