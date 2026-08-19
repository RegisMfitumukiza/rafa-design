# Architecture Decisions

## Purpose

This document records the fundamental architectural decisions that govern the entire project.

These decisions are considered long-term and should only change when there is a compelling architectural reason.

All developers and AI assistants must respect these decisions before proposing new implementations.

Documentation is the project's source of truth.

---

# ADR-001 — Framework

## Decision

The website will be built using **Next.js (App Router)** with **TypeScript**.

## Reason

- Server Components improve performance.
- Excellent SEO capabilities.
- Flexible routing system.
- Modern React architecture.
- Long-term maintainability.
- Strong ecosystem.

---

# ADR-002 — Styling System

## Decision

The project will use:

- Tailwind CSS
- CSS Variables
- Design Tokens

No styling decisions should exist outside the design system.

## Reason

This guarantees consistency, scalability, maintainability, and easy future updates.

---

# ADR-003 — Design System First

## Decision

Every interface must originate from the Design System before implementation.

No page should introduce its own spacing, colors, typography, or component patterns.

## Reason

The Design System is the single visual source of truth.

---

# ADR-004 — Feature-Based Architecture

## Decision

The application follows a feature-first architecture.

Features own their business logic.

Components remain reusable.

Pages assemble features.

## Reason

This structure scales better than page-centric development and reduces duplication.

---

# ADR-005 — Component Reusability

## Decision

Reusable UI elements must exist only once.

If multiple pages require the same UI, it becomes a reusable component.

## Reason

Consistency.

Maintainability.

Reduced duplication.

---

# ADR-006 — Editorial Design Philosophy

## Decision

The website is an editorial experience rather than a traditional marketing website.

Projects are the primary content.

Everything else supports the projects.

## Reason

Architecture firms communicate through their work rather than promotional copy.

The website should feel like a curated exhibition.

---

# ADR-007 — Storytelling Through Motion

## Decision

Animation exists to enhance storytelling.

Motion must guide attention, communicate transitions, and create rhythm.

Animation must never become decoration.

## Reason

Premium architectural websites use restrained motion to elevate the user experience without distracting from the work.

---

# ADR-008 — GSAP as the Primary Animation Engine

## Decision

GSAP is the primary animation library.

Native CSS animations may be used for simple interactions.

## Reason

GSAP provides superior timeline control, sequencing, performance, and scalability for editorial experiences.

---

# ADR-009 — Three.js as Progressive Enhancement

## Decision

Three.js enhances the experience but never replaces content.

Every page must remain fully functional if WebGL is unavailable.

## Reason

Accessibility, performance, and graceful degradation are priorities.

---

# ADR-010 — Original Design Language

## Decision

The project may study industry-leading architecture studios for inspiration but must never replicate their layouts, navigation, animations, typography, or visual identity.

## Reason

The goal is to create an original digital identity for RAFA Design.

Users should recognize the website by its own design language.

---

# ADR-011 — Performance Before Effects

## Decision

Performance always takes priority over visual complexity.

Heavy animations, unnecessary JavaScript, and oversized assets should be avoided.

## Reason

Architecture imagery is already visually rich.

The interface should remain smooth, responsive, and efficient.

---

# ADR-012 — Accessibility by Default

## Decision

Accessibility is a core requirement rather than a final checklist.

Every implementation should support:

- Semantic HTML
- Keyboard navigation
- Screen readers
- Reduced motion
- Proper focus management
- Sufficient color contrast

## Reason

Premium user experiences must be inclusive.

---

# ADR-013 — Mobile-First Responsive Design

## Decision

Responsive behavior is designed from mobile upward.

Layouts should progressively enhance for larger screens.

## Reason

Consistency, maintainability, and predictable scaling.

---

# ADR-014 — Documentation-Driven Development

## Decision

Every implementation must follow the documentation before writing code.

If documentation and generated ideas conflict, documentation wins.

## Reason

This ensures architectural consistency across developers and AI assistants.

---

# ADR-015 — Incremental Development

## Decision

Features are implemented incrementally.

One feature.

One review.

One refinement.

Large, unrelated changes should be avoided.

## Reason

Incremental development improves code quality, reduces regressions, and makes reviews significantly easier.

---

# ADR-016 — Content Before Decoration

## Decision

Content determines layout.

Layouts should never exist simply to showcase visual effects.

Photography, projects, drawings, and stories remain the primary focus.

## Reason

Architecture websites exist to present work, not interface elements.

---

# ADR-017 — Long-Term Maintainability

## Decision

Every implementation should optimize for readability, maintainability, and scalability rather than cleverness.

Simple solutions are preferred over complex abstractions.

## Reason

The project should remain understandable and maintainable for years.

---

# ADR-018 — AI as an Implementation Partner

## Decision

AI assists implementation but does not make architectural decisions independently.

Major architectural changes require explicit approval.

## Reason

Architectural consistency is the responsibility of the project's documentation and developer, not the AI.

---

# Decision Review Process

Architecture Decisions should rarely change.

Before modifying an ADR, ask:

- Does this improve long-term maintainability?
- Does it align with the project's vision?
- Does it conflict with existing documentation?
- Will it require widespread refactoring?
- Is there a compelling reason to change it?

If the answer is uncertain, preserve the existing decision.

---

# ADR-019 — Static Content for Version 1.0

## Decision

Version 1.0 ships with static content managed through the codebase content layer (`src/content/`) and structured, versioned data.

No CMS is introduced in Version 1.0.

## Reason

- The content layer is already structured for future migration.
- Static content avoids external service dependencies and credentials.
- Content stays versioned, reviewable, and deployable with the code.
- A CMS adds infrastructure cost and complexity without immediate benefit at current scale.

## Consequence

- The content architecture remains compatible with a future CMS migration.
- Components continue consuming normalized models.
- Revisit CMS integration after Version 1.0 if the studio needs non-technical publishing.

---

# ADR-020 — Dark Mode via Class-Based Theming

## Decision

Dark mode uses a `.dark` class toggled on `document.documentElement`, with the user's preference persisted in `localStorage` (key `rafa-theme`) and the initial state resolved by an inline script before hydration (stored value first, then `prefers-color-scheme`).

## Reason

A `prefers-color-scheme: dark` CSS approach forces `color-scheme: light` onto the document, which overrides user-agent defaults for scrollbars, inputs, and system form controls. Those forced-light UI surfaces are nearly impossible to revert with CSS alone. A manual class toggle keeps the site neutral by default while remaining fully compatible with the OS preference at first paint.

## Consequence

- Dark palette lives in `tokens.css` under `.dark { ... }`; components keep using the same semantic tokens (`background`, `foreground`, `surface`, `border`, `muted`, `accent`).
- The root layout ships an inline no-dependency script (set `.dark` before hydration), `suppressHydrationWarning`, and `viewport.themeColor` entries for light + dark.
- `ThemeProvider` exposes `isDark` / `toggleTheme`; the Header renders a Sun/Moon toggle.
- `html.dark { color-scheme: dark; }` so native UI follows the active theme.

---

# ADR-021 — Media Queries Use Literal Breakpoint Values

## Decision

CSS `@media` conditions use literal lengths (`48rem`, `64rem`) rather than `var(--breakpoint-*)`.

## Reason

CSS custom properties are not allowed inside media query conditions (`@media (width >= var(--breakpoint-desktop))` is invalid CSS and is rejected by the build pipeline's CSS parser). The `--breakpoint-*` tokens therefore exist for runtime/`sizes`/JS usage, while media queries reference the same values literally with an adjacent comment naming the token.

## Consequence

- `utilities.css` and Tailwind `md:`/`lg:` variants use literals that match `--breakpoint-tablet` (48rem) and `--breakpoint-desktop` (64rem).
- A future CSS spec extension (custom-property media queries) would allow full tokenization.

---

# Guiding Principle

> Build a timeless digital experience that allows architecture to remain the protagonist.

Technology, animation, and interaction exist to support the work—not compete with it.
