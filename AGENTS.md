# AGENTS.md

# RAFA Design — AI Development Instructions

This repository is developed using an AI-assisted workflow.

Every AI agent contributing to this project must follow the instructions in this document before generating, modifying, or deleting any code.

This file is the highest-level operational guide for AI contributors.

---

# Mission

The goal is to build one of the highest-quality architecture studio websites on the web.

The website should communicate architectural thinking through:

- Editorial layouts
- Exceptional typography
- Cinematic motion
- Visual storytelling
- Thoughtful interactions
- Performance
- Simplicity

Technology exists to support the experience—not dominate it.

---

# Primary Rule

Before implementing anything:

1. Read `docs/00-documentation-index.md`.
2. Follow the documentation hierarchy.
3. Review the relevant documentation for the task.
4. Verify whether an implementation already exists.
5. Only then begin coding.

Never skip documentation.

---

# Documentation Hierarchy

Always follow the documentation in this order:

1. Documentation Index
2. Architecture Decisions
3. Project Overview
4. Project Architecture
5. Design System
6. Design Principles
7. Component Architecture
8. Animation Guidelines
9. Three.js Guidelines
10. Page Architecture
11. Development Workflow
12. Coding Standards
13. Remaining documentation

If two documents conflict, the one with the higher priority wins.

---

# Development Order

The project must follow the implementation sequence defined in:

`docs/27-development-order.md`

Do not implement future phases before completing the current one unless explicitly instructed.

---

# Before Writing Code

Always verify:

- Does this already exist?
- Is it reusable?
- Does it follow the Design System?
- Does it follow the Component Architecture?
- Does it follow the Development Workflow?
- Is it responsive?
- Is it accessible?
- Is it performant?

---

# Architecture Rules

Always:

- Prefer composition.
- Keep components small.
- Reuse existing patterns.
- Follow folder responsibilities.
- Build modular features.
- Use feature-first architecture.
- Respect separation of concerns.

Never introduce duplicate architectures.

---

# Design Rules

Always use:

- Design tokens
- Shared typography
- Shared spacing
- Shared colors
- Shared shadows
- Shared radius
- Shared motion

Never hardcode:

- Colors
- Font sizes
- Spacing
- Breakpoints
- Animation durations
- Border radius
- Shadows

Everything should come from the Design System.

---

# Animation Rules

Use only:

- GSAP
- ScrollTrigger
- Lenis
- Framer Motion (only where appropriate)
- Three.js / React Three Fiber

Animation should:

- enhance storytelling
- improve navigation
- reveal content naturally

Never animate for decoration alone.

Performance always takes priority.

---

# Three.js Rules

Three.js should support storytelling.

Do not build complex 3D scenes without a clear purpose.

Keep GPU usage low.

Prefer subtle interactions over spectacle.

---

# Content Rules

Content must remain separate from UI.

Never hardcode copy inside components.

Use:

`src/content`

or the configured CMS once integrated.

---

# Component Rules

Before creating a component:

Search the project.

If a similar component exists:

Extend it.

Do not duplicate it.

---

# Styling Rules

Preferred order:

1. Design System
2. CSS variables
3. Tailwind utilities

Avoid inline styles unless absolutely necessary.

---

# Documentation Rules

When architecture changes:

1. Update documentation.
2. Update implementation.
3. Update the Implementation Tracker.
4. Update Release Notes.
5. Update the Changelog if applicable.

Documentation is part of the codebase.

---

# Git Rules

Each feature should be developed independently.

Keep commits focused.

Example:

feat: add hero navigation

fix: improve project filtering

refactor: simplify gallery architecture

Avoid generic commit messages.

---

# Quality Checklist

Every implementation must satisfy:

✓ Responsive

✓ Accessible

✓ Performant

✓ Reusable

✓ Modular

✓ Documented

✓ Consistent

✓ Production-ready

---

# AI Must Never

Do not:

- invent new architectures
- duplicate components
- ignore documentation
- hardcode values
- introduce unnecessary dependencies
- over-engineer solutions
- optimize prematurely
- mix architectural patterns
- create inconsistent naming

---

# AI Workflow

Every task follows the same lifecycle:

Read Documentation

↓

Understand Context

↓

Plan

↓

Search Existing Code

↓

Reuse Components

↓

Implement

↓

Review

↓

Test

↓

Update Documentation

↓

Update Tracker

↓

Complete Task

---

# Definition of Success

The project is successful when every new contribution:

- improves the codebase
- follows the architecture
- maintains consistency
- keeps the project scalable
- respects the Design System
- improves the overall experience

Every contribution should leave the repository in a better state than it was found.