# 07 — Component Architecture

> Source of Truth
>
> This document defines how every React component in the project must be designed, organized, composed, and maintained.
>
> Every component must follow these rules without exception.

---

# Purpose

The goal of the component architecture is to ensure that every UI element across the website behaves consistently regardless of the page it belongs to.

Our architecture emphasizes:

- Reusability
- Simplicity
- Scalability
- Accessibility
- Animation readiness
- Performance
- Maintainability

Components are designed once and reused everywhere.

---

# Architecture Philosophy

The project follows a compositional architecture.

Large interfaces are never built directly.

Instead they are assembled from progressively larger building blocks.

```
Design System
        ↓
Primitive Components
        ↓
Reusable Components
        ↓
Feature Components
        ↓
Sections
        ↓
Pages
```

Every level depends only on the level beneath it.

Pages never bypass the architecture.

---

# Component Layers

## Layer 1 — Design System

The foundation of the entire application.

Contains no React components.

Only design decisions.

Examples

Typography

Colors

Spacing

Containers

Grid

Motion

Radius

Elevation

Breakpoints

Shadows

Z-index

Every visual decision originates here.

---

## Layer 2 — Primitive Components

Small reusable building blocks.

These contain almost no business logic.

Examples

Button

Container

Grid

Heading

Text

Image

Video

Icon

Badge

Divider

Spacer

AspectRatio

Section

These components should be completely reusable.

---

## Layer 3 — Reusable Components

Built using primitive components.

Shared throughout the website.

Examples

Navbar

Footer

ProjectCard

JournalCard

Gallery

Statistics

ProjectFilter

Quote

CTA

Awards

Timeline

Testimonials

Marquee

These should never contain page-specific content.

---

## Layer 4 — Feature Components

Feature components belong to a single page or feature.

Examples

Home Hero

Projects Hero

Studio Introduction

Journal Categories

Contact Form

Services Process

Career Positions

These live inside

```
src/features
```

If another page later requires the same component it should be promoted into reusable components.

---

## Layer 5 — Sections

Sections assemble multiple feature and reusable components.

Examples

Hero Section

Projects Grid

Studio Section

Journal Preview

Awards Section

Contact Section

Every section has one responsibility.

---

## Layer 6 — Pages

Pages should contain almost no UI logic.

Their only responsibility is composition.

Example

```
<HomeHero />

<FeaturedProjects />

<StudioPreview />

<JournalPreview />

<ContactCTA />

<Footer />
```

Pages should remain readable.

---

# Folder Responsibility

## components/

Reusable forever.

No page-specific logic.

---

## features/

Specific functionality belonging to one page.

---

## sections/

Page composition.

---

## layouts/

Global layouts.

---

## providers/

Global providers.

---

## motion/

Animation utilities.

---

# Component Principles

Every component should satisfy the following principles.

## Single Responsibility

One purpose.

Nothing more.

---

## Reusability

If another page can use it, build it generically.

---

## Composition

Prefer composition over configuration.

Good

```
<Card>

<Card.Image />

<Card.Content />

<Card.Footer />

</Card>
```

Avoid giant prop objects.

---

## Predictability

A component should always behave consistently regardless of where it is rendered.

---

## Isolation

Components should never depend on unrelated pages.

---

## Accessibility

Every component must support

- keyboard navigation
- focus visibility
- semantic HTML
- ARIA attributes where required
- screen readers
- reduced motion

Accessibility is never optional.

---

## Animation Ready

Every component should be designed assuming animation may be added later.

Animations should never require rewriting the component.

---

## Responsive First

Every component works on

Mobile

Tablet

Desktop

Large Desktop

Ultra-wide

No desktop-only layouts.

---

# Component Size

Ideal

50–150 lines

Maximum

250 lines

Beyond this point split the component.

---

# Component Structure

Every component follows the same order.

```
Imports

Types

Constants

Hooks

Component

Helpers

Export
```

Example

```tsx
import ...

interface Props {}

const variants = {}

export function ProjectCard() {

return (...)

}
```

---

# Naming

Use PascalCase.

Good

```
Hero.tsx

Navbar.tsx

ProjectCard.tsx

StudioTimeline.tsx
```

Avoid

```
card.tsx

project.tsx

ComponentNew.tsx

hero-final.tsx
```

---

# Props

Props should remain minimal.

Good

```tsx
interface ProjectCardProps {
  title: string;

  location: string;

  image: string;
}
```

Avoid passing massive objects.

---

# State

Local UI

React State

Shared UI

Context

Application

Store

Server

Future CMS/API

Never duplicate state.

---

# Styling

Components never contain hardcoded values.

Never

```
padding:47px;

margin:63px;
```

Always consume the Design System.

Typography

Spacing

Containers

Motion

Radius

Colors

Elevation

---

# Variants

Reusable components should expose variants.

Example

Button

Primary

Secondary

Ghost

Outline

Large

Small

Dark

Light

Variants should be implemented consistently.

---

# Images

Always use Next Image unless impossible.

Images should define

aspect ratio

sizes

loading strategy

priority only when necessary

---

# Performance

Avoid unnecessary renders.

Lazy load heavy sections.

Use memoization only when profiling demonstrates a benefit.

---

# Error States

Interactive components should support

Loading

Empty

Success

Error

Fallback

---

# Testing Checklist

Before a component is complete verify

✓ Responsive

✓ Accessible

✓ Dark mode

✓ Keyboard support

✓ Animation ready

✓ Uses design tokens

✓ No duplicated code

✓ Proper naming

✓ Reusable

---

# Golden Rule

Pages assemble.

Sections organize.

Features specialize.

Components reuse.

Primitives build.

The Design System governs everything.

No layer should bypass the architecture.
