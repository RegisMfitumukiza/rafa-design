# Documentation Index

> **This is the primary entry point for the RAFA Design codebase.**
>
> Every developer and AI assistant must read this document before making any changes.
>
> This document defines how the project is organized, how development is performed, and which documentation governs each decision.
>
> The documentation is considered the **single source of truth** for the architecture of this project.

---

# Project Philosophy

RAFA Design is not a traditional corporate website.

It is a premium digital architectural experience.

The objective is not simply to display projects.

The objective is to communicate architectural thinking through typography, imagery, composition, motion, interaction, and storytelling.

Every design decision should reinforce the studio's identity.

Technology exists to support the experience—not to dominate it.

Every animation, layout, interaction, and transition should have a clear purpose.

The website should feel timeless rather than trendy.

The project prioritizes:

- Simplicity
- Elegance
- Editorial storytelling
- Premium craftsmanship
- Performance
- Accessibility
- Maintainability
- Scalability

---

# AI Development Workflow

Every development session must follow the same workflow.

The AI must never begin implementation without first understanding the project state.

## Step 1

Read this Documentation Index.

## Step 2

Read the Architecture Decisions document.

## Step 3

Read the Implementation Tracker to determine the current state of the project.

## Step 4

Read the Product Roadmap to identify the next milestone.

## Step 5

Read every document related to the feature being implemented.

## Step 6

Produce an implementation plan.

## Step 7

Implement the feature.

## Step 8

Verify that the implementation follows the documentation.

## Step 9

Update the Implementation Tracker after the task is completed.

This workflow must never be skipped.

---

# Documentation Hierarchy

The following documents are ordered by authority.

Higher-level documents always take precedence over lower-level documents.

---

## Level 0 — Governance

These documents control the project.

00 Documentation Index

01 Architecture Decisions

---

## Level 1 — Foundation

These define the project itself.

02 Project Overview

03 Project Architecture

04 Design System

05 Design Principles

Nothing may violate these documents.

---

## Level 2 — Navigation

These define how visitors move through the experience.

06 Navigation Philosophy

---

## Level 3 — UI Architecture

These define how the interface is built.

07 Component Architecture

08 Component Inventory

09 Animation Guidelines

10 Animation Library

11 Three.js Guidelines

12 Page Architecture

---

## Level 4 — Development

These define how code is written.

13 Folder Responsibilities

14 Development Workflow

15 Vibe Coding Workflow

16 AI Prompting Guide

17 Coding Standards

18 Naming Conventions

---

## Level 5 — Content

These define the website content.

19 Content Strategy

20 Content Models

---

## Level 6 — Quality

These define production standards.

21 Performance Checklist

22 Accessibility

23 SEO

---

## Level 7 — Product Management and Delivery

These define implementation planning and project delivery.

24 Product Roadmap

25 Implementation Tracker

26 Deployment

27 Development Order

28 Release Notes

29 Known Issues

30 Changelog

---

# Source of Truth

Every directory has one responsibility.

No responsibility should exist in multiple places.

---

## Documentation

Defines the project architecture.

Location

docs/

Highest authority.

---

## Design System

Defines the visual language.

Location

src/design-system/

Responsible for

- Colors
- Typography
- Spacing
- Containers
- Grid
- Shadows
- Radius
- Motion
- Breakpoints
- Z-index

---

## Components

Reusable UI components.

Location

src/components/

---

## Features

Feature-specific implementations.

Location

src/features/

---

## Content

Editable content and CMS integration.

Location

src/content/

---

## Configuration

Application configuration.

Location

src/config/

Includes

- Navigation
- Routes
- Metadata
- SEO
- Site configuration

---

## Assets

Static media.

Location

src/assets/

Includes

- Images
- Videos
- Icons
- 3D Models

---

## Motion

Animation utilities.

Location

src/motion/

---

## Styles

Global styling architecture.

Location

src/styles/

---

# Development Order

Development follows the Product Roadmap.

Features must be implemented in dependency order.

The AI must never skip ahead unless explicitly instructed.

Before beginning work, always verify the current state using the Implementation Tracker.

---

# Development Principles

Every implementation should satisfy the following principles.

## Keep Components Small

Components should have a single responsibility.

Large components should be broken into smaller reusable components.

Avoid components larger than approximately 200–250 lines unless there is a justified architectural reason.

---

## Prefer Composition

Compose multiple small components instead of creating large configurable components.

---

## Avoid Duplication

If code appears more than twice, extract it.

---

## Build for Scale

Assume the project will continue growing.

Avoid shortcuts that create technical debt.

---

## Performance First

Performance is part of the design.

Animations should never reduce usability.

Prefer GPU-accelerated animations.

Avoid layout thrashing.

---

## Accessibility First

Accessibility is part of the design process.

Never postpone accessibility.

---

## Maintainability

Readable code is preferred over clever code.

Future developers should immediately understand every implementation.

---

# AI Development Rules

When contributing to this project, the AI must:

✓ Read all relevant documentation before implementation

✓ Respect Architecture Decisions

✓ Follow the Design System

✓ Follow Coding Standards

✓ Follow Naming Conventions

✓ Reuse existing components

✓ Extend existing architecture instead of replacing it

✓ Keep components modular

✓ Build production-ready implementations

✓ Avoid placeholder implementations unless requested

✓ Never hardcode colors, spacing, typography, or motion values

✓ Use design tokens

✓ Respect folder responsibilities

✓ Keep animations meaningful

✓ Consider accessibility from the beginning

✓ Optimize for performance

✓ Update the Implementation Tracker after completing work

✓ Keep documentation synchronized with the codebase

---

# What AI Must Avoid

The AI must not:

- Skip documentation
- Ignore Architecture Decisions
- Invent new architectural patterns
- Create duplicate components
- Create duplicate utilities
- Introduce unnecessary dependencies
- Hardcode colors
- Hardcode typography
- Hardcode spacing
- Hardcode motion values
- Mix styling approaches
- Ignore responsive design
- Ignore accessibility
- Ignore performance
- Replace working architecture without justification
- Leave unfinished implementations
- Over-engineer solutions

---

# Definition of Done

A task is considered complete only when:

✓ Requirements are fully implemented

✓ TypeScript passes

✓ ESLint passes

✓ The implementation is responsive

✓ Accessibility requirements are satisfied

✓ Animations follow the Animation Guidelines

✓ Performance considerations have been addressed

✓ The implementation follows the Design System

✓ Documentation remains accurate

✓ The Implementation Tracker has been updated

---

# Project Goals

The completed platform should demonstrate:

- Premium visual quality
- Editorial layout
- Architectural storytelling
- Smooth cinematic scrolling
- Exceptional typography
- Consistent spacing
- High-performance animations
- Responsive design
- Excellent accessibility
- Strong SEO
- Modular architecture
- Long-term maintainability
- Reusable component system
- Production-ready engineering
- High Lighthouse scores

---

# Documentation Maintenance

Documentation is part of the codebase.

Whenever architecture changes:

1. Update the documentation.
2. Review related documentation.
3. Update the implementation.
4. Update the Implementation Tracker.

Documentation should never become outdated.

---

# Final Principle

Quality is more important than speed.

Every implementation should feel intentional.

Every component should have a clear responsibility.

Every animation should communicate something meaningful.

Every page should contribute to one cohesive architectural experience.

If an implementation does not improve storytelling, usability, maintainability, or performance, it should not be added to the project.
