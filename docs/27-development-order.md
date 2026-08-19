# Development Order

## Purpose

This document defines the exact implementation sequence for the RAFA Design platform.

It acts as the project's execution plan.

Every feature should be implemented in the order defined below unless an Architecture Decision explicitly changes the sequence.

The objective is to ensure that every feature is built on top of completed foundations.

This document works together with:

- Documentation Index
- Development Workflow
- Product Roadmap
- Implementation Tracker

---

# Development Rules

Development must always follow these principles:

- Never skip dependencies.
- Never build features before their foundation exists.
- Complete one milestone before beginning another.
- Prefer vertical completion over partially implementing many features.
- Every completed milestone should be production-ready.

---

# Phase 1 — Project Foundation

Objective

Create a stable technical foundation for the entire platform.

Tasks

□ Configure project structure

□ Configure TypeScript

□ Configure ESLint

□ Configure Prettier

□ Configure Husky

□ Configure GitHub Actions

□ Configure path aliases

□ Configure global providers

□ Configure metadata

□ Configure fonts

□ Configure global CSS

□ Configure utility helpers

Deliverable

A clean, production-ready foundation.

---

# Phase 2 — Design System

Objective

Build the visual language of the website.

Tasks

□ Typography

□ Color palette

□ Spacing scale

□ Containers

□ Grid system

□ Breakpoints

□ Border radius

□ Shadows

□ Motion tokens

□ Z-index system

□ Utility classes

Deliverable

A complete design system.

---

# Phase 3 — Core Layout

Objective

Create the shared application shell.

Tasks

□ Root Layout

□ Global Navigation

□ Mobile Navigation

□ Footer

□ Page Container

□ Section Component

□ Responsive Layout

□ Global Loader

□ Page Transition System

□ Smooth Scrolling

Deliverable

Reusable application layout.

---

# Phase 4 — Core Components

Objective

Build reusable UI components.

Tasks

□ Buttons

□ Links

□ Typography Components

□ Cards

□ Image Component

□ Video Component

□ Badge

□ Tags

□ Inputs

□ Textarea

□ Forms

□ Dialog

□ Drawer

□ Accordion

□ Tabs

□ Carousel

□ Modal

□ Toast

Deliverable

Reusable UI library.

---

# Phase 5 — Homepage

> **Superseded 2026-08-11** — the client pivoted: the Studio Index landing (`src/features/landing/landing.tsx`) replaced the homepage preview sections as the deliverable of this phase. The landing mirrors the fullscreen menu's Studio Index composition (numbered 01–06 index + brand field + contact row, no hero, no previews, no search on `/`). The original preview-section tasks below are retained for history.

Objective

Build the primary storytelling experience.

Tasks

□ Hero

□ Featured Projects

□ Studio Introduction

□ Services Preview

□ Process Preview

□ Journal Preview

□ Contact CTA

□ Homepage Animations

□ Homepage Responsive Review

Deliverable

Production-ready homepage.

---

# Phase 6 — Projects

Objective

Build the portfolio experience.

Tasks

□ Projects Listing

□ Filtering

□ Search

□ Categories

□ Project Cards

□ Project Detail

□ Image Gallery

□ Video Gallery

□ Related Projects

□ Project Navigation

Deliverable

Complete project showcase.

---

# Phase 7 — Studio

Objective

Present the architecture practice.

Tasks

□ Studio Page

□ Philosophy

□ Team

□ Timeline

□ Awards

□ Clients

Deliverable

Complete studio presentation.

---

# Phase 8 — Services

Objective

Present studio services.

Tasks

□ Services Listing

□ Service Detail

□ Process Integration

Deliverable

Complete services section.

---

# Phase 9 — Process

Objective

Explain the design methodology.

Tasks

□ Process Timeline

□ Process Details

□ Supporting Visuals

Deliverable

Complete process page.

---

# Phase 10 — Journal

Objective

Build the editorial experience.

Tasks

□ Journal Listing

□ Categories

□ Search

□ Journal Detail

□ Related Articles

Deliverable

Editorial platform.

---

# Phase 11 — Contact

Objective

Allow visitors to reach the studio.

Tasks

□ Contact Page

□ Contact Form

□ Map

□ Studio Information

□ Careers

Deliverable

Complete contact experience.

---

# Phase 12 — CMS Integration

## Status

✗ Removed from Version 1.0 scope (ADR-019)

Static content layer (`src/content/`) is the content platform for Version 1.0.

Revisit after Version 1.0 if the studio needs non-technical publishing.

---

# Phase 13 — Media Infrastructure

Objective

Professional media management.

Tasks

□ Responsive Images (next/image)

□ Image Optimization

□ Gallery Optimization

□ Local Media Organization

> Cloudinary and Video Delivery deferred (external credentials).

Deliverable

Production media pipeline.

---

# Phase 14 — Motion

## Status

In progress (core complete).

Loading Experience intentionally skipped per docs/09-animation-guidelines (fake loaders discouraged). Revisit after Phase 16 if a load-state strategy is adopted.

Objective

Refine interactions.

Tasks

✓ Page Transitions

✓ Scroll Animations

✓ Text Reveals

✓ Image Reveals

✓ Hover Effects

☐ Loading Experience (deferred — see note above)

✓ Micro Interactions

Deliverable

Consistent motion language.

---

# Phase 15 — Three.js

## Status

Removed 2026-08-11.

The Three.js layer existed to back the homepage hero. When the hero was deleted in the Studio Index landing pivot, the entire `src/three/` layer, the `theme.scene` palette, and the `@react-three/fiber` / `three` / `@types/three` dependencies were removed. Three.js remains out of v1 scope (docs/10 guidelines) unless a future story gives it a purpose.

Objective

Enhance storytelling with 3D.

Tasks

✓ Hero Scene

✓ Interactive Elements

✓ Scroll Integration

✓ Performance Optimization (foundations)

✓ Mobile Fallbacks

Deliverable

Production-ready Three.js experience.

---

# Phase 16 — Optimization

Objective

Prepare the platform for production.

Tasks

□ Performance Optimization

□ Accessibility Audit

□ SEO

□ Structured Data

□ Browser Testing

□ Mobile Testing

□ Lighthouse Optimization

□ Error Handling

□ Loading States

Deliverable

Production-ready application.

---

# Phase 17 — Deployment

Objective

Launch Version 1.0.

Tasks

□ Environment Variables

□ Production Build

□ Deployment

□ Analytics

□ Monitoring

□ Error Tracking

□ Final QA

Deliverable

Version 1.0 released.

---

# Current Development Policy

At the beginning of every development session:

1. Read the Documentation Index.
2. Read the Implementation Tracker.
3. Identify the current phase.
4. Continue from the next unfinished task.
5. Do not repeat completed work.
6. Update the Implementation Tracker when finished.

---

# Definition of Progress

A phase is considered complete only when:

✓ Every task within the phase is complete.

✓ All quality requirements are satisfied.

✓ The implementation follows the Design System.

✓ Documentation remains accurate.

✓ The Implementation Tracker has been updated.

Only then may development proceed to the next phase.

---

# Final Principle

The project should evolve one completed milestone at a time.

Avoid jumping between unrelated features.

A smaller number of fully polished features is always preferable to many unfinished implementations.

Version 1.0 should feel complete, cohesive, and production-ready—not like a collection of partially finished pages.
