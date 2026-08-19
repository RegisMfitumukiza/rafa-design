# Folder Responsibilities

## Purpose

This document defines the responsibility of every folder in the project.

Every folder has one clearly defined purpose.

Files must always be placed in the most appropriate location.

Avoid duplicate implementations.

Avoid "miscellaneous" folders.

When in doubt, extend an existing folder instead of creating a new one.

---

# Source Directory

```
src/
```

Everything inside `src` should contribute directly to the application.

Nothing outside of `src` should contain application logic.

---

# app/

```
src/app
```

Purpose

Owns the Next.js App Router.

Responsibilities

• Routes
• Layouts
• Metadata
• Loading states
• Error boundaries
• Global styles
• Route groups

Contains

```
layout.tsx
page.tsx
loading.tsx
error.tsx
not-found.tsx
globals.css
```

Must NOT contain

Business logic

Large UI components

Animation logic

Feature implementation

---

# assets/

```
src/assets
```

Purpose

Stores static design assets.

Contains

Icons

Images

Videos

3D models

SVG assets

Illustrations

Fonts (if locally hosted)

Must NOT contain

React components

Logic

Configuration

---

# public/

```
public
```

Purpose

Serves static assets directly via URL.

Contains

```
public/images/
```

Media is organized by content area:

```
public/images/projects/

public/images/team/

public/images/journal/

public/images/studio/

public/images/process/
```

Rules

- Content references media via public URL paths (e.g. `/images/projects/casa-monte-hero.jpg`).
- All application imagery lives in `public/images/` organized by content area.
- Do not place unoptimized or duplicate media here.
- Keep `src/assets/` for design assets that are imported by code (icons, logos, fonts).

---

# components/

```
src/components
```

Purpose

Reusable presentation components.

Components here must be reusable across multiple pages.

Examples

Button

Card

Section Heading

Video Player

Image Component

Dialog

Badge

Navigation

Footer

Media

Forms

Typography

Feedback

UI primitives

Rules

Components should remain presentation-focused.

Business logic belongs elsewhere.

---

## components/ui

Lowest-level reusable UI primitives.

Examples

Button

Input

Textarea

Card

Dialog

Badge

Avatar

Tooltip

These should never depend on feature-specific code.

---

## components/layout

Shared layout pieces.

Examples

Header

Footer

Container

Grid

Section Wrapper

Logo

Navigation Shell

---

## components/navigation

> Deprecated (2026-08-03). Navigation moved to the `features/navigation` feature per docs/06. This folder no longer exists — do not recreate `DesktopNavigation` / `MobileNavigation` / `NavigationMenu`.

## features/navigation

Everything related to navigation (docs/06 philosophy).

Navigation Provider (menu state, route-change close, `inert` background)

Fullscreen Navigation (primary menu — dialog, primary + supporting links, contact, featured content)

Menu Search (static client-side search)

Search Index (content-derived search entries)

Navigation Context (`useNavigation`)

---

## components/media

Reusable media.

Image

Video

Gallery

Carousel

Figure

Caption

---

## components/forms

Reusable form components.

Input

Textarea

Select

Checkbox

Radio

Validation UI

---

## components/feedback

User feedback.

Loading

Skeleton

Progress

Toast

Error State

Empty State

Success State

---

## components/typography

Typography primitives.

Heading

Paragraph

Caption

Label

Quote

Overline

---

# config/

Purpose

Global application configuration.

Contains

Site configuration

Navigation

SEO

Routes

Environment helpers

Should remain static.

---

# constants/

Purpose

Application constants.

Examples

Animation durations

API endpoints

Regex

Limits

Default values

Do not place business logic here.

---

# content/

Purpose

Structured content separated from components.

Shared content types (e.g. `ImageAsset`) live in `src/content/types.ts`.

Examples

Homepage copy

Navigation labels

Footer links

Project descriptions

Journal metadata

Studio information

Allows content editing without touching UI.

---

# contexts/

Purpose

React Context providers.

Examples

Theme

Cursor

Navigation

Global UI

Authentication (if needed)

Avoid storing business state here.

---

# design-system/

Purpose

Single source of truth for design.

Contains

Typography

Spacing

Colors

Radius

Containers

Motion

Breakpoints

Shadows

Z-index

No component logic.

Only design definitions.

---

# features/

Purpose

Feature-based architecture.

Each folder represents one feature.

Examples

Hero

Projects

Journal

Studio

Navigation

Footer

Process

Services

Contact

A feature may contain

```
components/

hooks/

animations/

types/

utils/

constants/
```

Feature code should remain isolated.

---

# hooks/

Purpose

Reusable custom React hooks.

Examples

useScroll

useMouse

useIntersection

useMediaQuery

useLenis

Hooks should be generic.

---

# layouts/

Purpose

Application layouts beyond Next.js root layout.

Examples

Page Layout

Editorial Layout

Project Layout

Journal Layout

Studio Layout

---

# lib/

Purpose

Framework integrations and utility libraries.

Examples

cn()

GSAP setup

Lenis setup

Three.js helpers

Utilities shared by the framework

---

# motion/

Purpose

Animation orchestration.

Contains

Timelines

Scroll animations

Reveal animations

Animation presets

Animation hooks

This folder should NOT contain UI.

---

# providers/

Purpose

Application providers.

Examples

ThemeProvider

LenisProvider

GSAPProvider

ThreeProvider

AnalyticsProvider

These wrap the application.

---

# sections/

Purpose

Large page sections.

Examples

Hero Section

Projects Section

Studio Section

Contact Section

Journal Section

Each section assembles smaller components.

Sections should not become pages.

---

# services/

Purpose

Communication with external systems.

Examples

CMS

Email

Analytics

API

Search

Future backend integration

Never place fetch logic directly inside components.

---

# stores/

Purpose

Global client-side state.

Examples

Zustand

Jotai

Context wrappers

Keep stores minimal.

Only global state belongs here.

---

# styles/

Purpose

Global styling.

Contains

Base styles

CSS variables

Utilities

Animations

Global resets

Should not contain component-specific styling.

---

# three/

> **Removed 2026-08-11** — the entire `src/three/` layer was deleted with the homepage hero in the Studio Index landing pivot. If a future story reintroduces Three.js, follow `docs/11-threejs-guidelines.md`.

Purpose

Three.js implementation.

Contains

Scenes

Lights

Materials

Meshes

Shaders

Loaders

Controls

Camera

Postprocessing

Do not place React UI here.

---

# types/

Purpose

Shared TypeScript types.

Examples

Project

Journal

Service

Navigation

Design system

Reusable interfaces only.

---

# utils/

Purpose

Pure utility functions.

Examples

Formatting

Math

Date

Slug

String

Helpers

Utilities should remain framework-independent.

---

# Folder Relationships

```
Pages

↓

Sections

↓

Features

↓

Components

↓

UI Primitives

↓

Design System
```

Dependencies always flow downward.

Lower layers must never depend on higher layers.

---

# Dependency Rules

Allowed

Page

↓

Feature

↓

Component

↓

Design System

Not Allowed

Component

↓

Page

Feature

↓

Page

UI

↓

Feature

Design System

↓

Components

---

# Import Rules

Prefer absolute imports.

Example

```
@/components/ui/button

@/features/projects

@/design-system

@/motion

@/services
```

Avoid deep relative imports.

Example

```
../../../../components
```

---

# Architecture Principles

Every folder should have one responsibility.

Every component should have one purpose.

Every feature should remain isolated.

Every page should assemble existing pieces.

No duplicated logic.

No duplicated UI.

No duplicated animations.

The architecture should scale cleanly from one page to an entire studio website without structural changes.
