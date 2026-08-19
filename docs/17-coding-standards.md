# Coding Standards

## Purpose

This document defines the coding standards for the RAFA Design website.

Every implementation should prioritize:

- Readability
- Maintainability
- Consistency
- Scalability
- Performance
- Accessibility

These standards apply to all developers and AI assistants contributing to the project.

---

# General Principles

Code should be:

- Simple
- Predictable
- Reusable
- Modular
- Well organized
- Self-documenting

Avoid clever code.

Readable code is preferred over shorter code.

---

# TypeScript

## Always Use TypeScript

All code must be written in TypeScript.

Avoid JavaScript files unless absolutely necessary.

---

## Never Use Any

Avoid

```ts
const value: any;
```

Prefer

```ts
unknown;
```

or proper interfaces.

---

## Explicit Types

Prefer explicit interfaces for reusable objects.

Good

```ts
interface ProjectCardProps {
  title: string;
  location: string;
  image: string;
}
```

Avoid large anonymous object types.

---

## Reuse Types

Never duplicate interfaces.

Shared types belong inside

```
src/types
```

or

```
feature/types
```

---

# React Standards

## Functional Components Only

Always use functional components.

Never use class components.

---

## Server Components First

Prefer Server Components.

Only use Client Components when required.

Examples

- animations
- browser APIs
- event handlers
- state management

---

## Keep Components Small

One component should have one responsibility.

Avoid components exceeding approximately 200 lines.

Split when necessary.

---

## Component Naming

Use PascalCase.

Examples

```
ProjectCard

FeaturedProjects

StudioHero

NavigationMenu
```

---

## File Naming

Components

```
ProjectCard.tsx
```

Hooks

```
useScrollProgress.ts
```

Utilities

```
formatDate.ts
```

Types

```
project.ts
```

---

# Hooks

Create hooks only when logic is reusable.

Avoid

```
useHeroAnimation()

used once.
```

Prefer keeping one-time logic inside the component.

---

# Props

Pass only necessary props.

Avoid prop drilling.

Prefer composition.

Good

```
<Card>

<Card.Image/>

<Card.Content/>

<Card.Footer/>

</Card>
```

---

# State Management

Prefer

1. Local State

↓

2. Context

↓

3. External Store

Do not introduce global state unnecessarily.

---

# Styling

Never use inline styles unless required.

Good

```
className=""
```

Bad

```tsx
style={{
marginTop:43
}}
```

---

# Tailwind

Prefer utility composition.

Avoid massive utility strings.

If classes become difficult to read:

Extract components.

---

# Design Tokens

Never hardcode

- colors
- spacing
- typography
- radius
- shadows

Use the Design System.

Bad

```css
padding: 37px;

font-size: 41px;

color: #8a7252;
```

Good

Use tokens.

---

# CSS

Global CSS should only contain

- resets
- variables
- typography
- utilities
- animations

Avoid feature styling in globals.

---

# Component Structure

Recommended order

```tsx
Imports;

Types;

Constants;

Component;

Helpers;

Export;
```

---

# Imports

Order imports consistently.

```tsx
React;

Next;

Libraries;

Components;

Features;

Hooks;

Utils;

Types;

Styles;
```

---

# Naming

Variables

camelCase

```
projectImage
```

Constants

UPPER_SNAKE_CASE

```
MAX_PROJECTS
```

Components

PascalCase

```
ProjectCard
```

Hooks

camelCase

```
useNavigation
```

CSS Variables

kebab-case

```
--color-primary
```

---

# Comments

Avoid obvious comments.

Bad

```ts
// increment index

index++;
```

Use comments only when explaining intent.

---

# Magic Numbers

Avoid

```ts
duration: 1378;
```

Prefer

```ts
const HERO_FADE_DURATION = 1.4;
```

---

# Constants

Reusable values belong inside

```
constants/
```

Not inside components.

---

# Utilities

Utility functions should

- be pure
- have no side effects
- be reusable

---

# Error Handling

Never silently ignore errors.

Always handle

- loading
- empty
- error

states.

---

# Async Code

Always use

```ts
async / await;
```

Avoid deeply nested promise chains.

---

# Accessibility

Every component should verify

- keyboard navigation
- semantic HTML
- alt text
- labels
- focus states

Accessibility is not optional.

---

# Performance

Prefer

lazy loading

dynamic imports

memoization only when necessary

optimized images

Avoid premature optimization.

---

# Animations

Animations should

support storytelling

remain performant

respect reduced motion

avoid layout shift

Never animate everything.

---

# Three.js

Keep Three.js isolated.

Never mix rendering logic with UI components.

---

# Folder Rules

Every file belongs to one responsibility.

Avoid dumping unrelated code into

```
utils

helpers

shared
```

Use feature boundaries.

---

# Reusability Rule

Before creating anything ask:

Does this already exist?

Can it be reused?

Should it become a shared component?

Never duplicate implementations.

---

# Documentation

When implementing new systems:

Update documentation if architecture changes.

Documentation should remain synchronized with the codebase.

---

# Git

Each commit should represent one logical change.

Good

```
feat: add featured projects section

fix: improve navigation accessibility

refactor: simplify hero animation
```

Avoid

```
update

changes

fixes

misc
```

---

# Code Reviews

Every implementation should be reviewed for

Architecture

Performance

Accessibility

Responsive behavior

Design System compliance

Duplicate code

Type safety

---

# AI Contribution Rules

When AI generates code it must

Follow documentation.

Respect folder structure.

Reuse components.

Avoid unnecessary dependencies.

Avoid unrelated modifications.

Stop after completing the requested task.

---

# Definition of Done

Before considering work complete, verify:

✓ Code compiles.

✓ No TypeScript errors.

✓ No ESLint errors.

✓ Responsive.

✓ Accessible.

✓ Uses Design System.

✓ Reuses existing components.

✓ No duplicated logic.

✓ No unnecessary dependencies.

✓ Documentation remains valid.

---

# Guiding Principle

> Every line of code should make the project easier to understand, easier to extend, and easier to maintain.
