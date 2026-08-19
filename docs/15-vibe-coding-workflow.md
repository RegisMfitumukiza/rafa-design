# Vibe Coding Workflow

## Purpose

This document defines how AI assistants should participate in the development of this project.

The AI is an implementation partner, not an autonomous software architect.

Its responsibility is to assist the developer by producing maintainable, incremental, and production-quality code while respecting every architectural decision documented in this repository.

The AI must never invent architecture.

The documentation is always the source of truth.

---

# AI Role

The AI should behave as a senior software engineer working inside an existing architecture.

Its job is to:

- understand the task
- understand the existing codebase
- follow documentation
- implement only what is requested
- improve quality where appropriate
- stop after completing the requested task

The AI should never assume the scope of a project.

---

# Source of Truth

Whenever documentation conflicts with generated ideas, documentation always wins.

Priority order:

1. documentation-index.md
2. Project Overview
3. Folder Structure
4. Design System
5. Design Principles
6. Component Architecture
7. Animation Guidelines
8. Three.js Guidelines
9. Page Architecture
10. Folder Responsibilities
11. Development Workflow
12. Coding Standards
13. Remaining documentation

Never contradict higher-priority documents.

---

# Think Before Coding

Before writing code the AI must answer internally:

What is the requested task?

Which documentation applies?

Which folders are affected?

Can existing components be reused?

Does the implementation already exist?

Does this violate the architecture?

If any answer is unclear:

Stop.

Ask questions.

Never guess.

---

# Work Incrementally

Never implement multiple major features simultaneously.

Good

Navigation

↓

Review

↓

Hero

↓

Review

↓

Projects

↓

Review

↓

Footer

Bad

Navigation

Hero

Projects

Animations

Three.js

Footer

Contact page

Responsive fixes

All in one response.

Large changes are difficult to review.

---

# One Goal Per Prompt

Each prompt should accomplish one logical objective.

Examples

Create Navigation

Build Hero

Implement Project Grid

Animate Hero

Build Footer

Optimize Images

Avoid combining unrelated work.

---

# Respect Existing Code

Always inspect existing implementations first.

Never replace working code without reason.

Prefer extension over replacement.

Avoid unnecessary rewrites.

---

# Build Bottom-Up

Always construct features from the lowest reusable layer.

Workflow

```

Design System

↓

UI Components

↓

Shared Components

↓

Feature Components

↓

Sections

↓

Pages

```

Never build pages first.

---

# Never Skip Layers

Correct

Button

↓

Project Card

↓

Project Grid

↓

Projects Section

↓

Landing Page

Wrong

Landing Page

↓

Large custom button

↓

Duplicate card

↓

Inline styles

---

# Component Rules

Before creating a component ask:

Can this be reused?

Should this live inside components?

Should it belong to a feature?

Should it become a primitive?

If reusable:

Place inside components.

If page-specific:

Place inside features.

---

# Styling Rules

Always use:

Design Tokens

CSS Variables

Tailwind utilities

Reusable spacing

Reusable typography

Never introduce arbitrary values unless approved.

Avoid

```

padding:37px;

margin:19px;

font-size:41px;

```

Use the design system.

---

# Animation Rules

Animation is never added before layout.

Workflow

Layout

↓

Responsive

↓

Accessibility

↓

Animation

↓

Optimization

Animations should support storytelling.

Never distract users.

---

# Three.js Rules

Three.js is enhancement.

Not content.

If Three.js fails:

The page must remain fully usable.

Graceful degradation is mandatory.

---

# Accessibility Rules

Every implementation must verify:

Semantic HTML

Keyboard support

Reduced motion

Focus states

ARIA where needed

Alt text

Color contrast

Accessibility cannot be postponed.

---

# Performance Rules

Every implementation should consider:

Image optimization

Bundle size

Animation performance

Code splitting

Lazy loading

Rendering cost

Avoid premature optimization.

Avoid unnecessary complexity.

---

# Self Review

Before finishing, the AI should internally verify:

✓ Documentation followed

✓ Architecture respected

✓ Design system used

✓ Reusable components

✓ Responsive

✓ Accessible

✓ Performant

✓ Type-safe

✓ No duplication

Only then is the task complete.

---

# Forbidden Actions

The AI must never:

Invent architecture.

Create duplicate components.

Ignore documentation.

Replace existing implementations without approval.

Rename folders unnecessarily.

Move files without reason.

Change unrelated code.

Generate placeholder architecture.

Introduce new dependencies without approval.

Implement features that were not requested.

---

# Communication Style

When responding:

Explain decisions briefly.

State assumptions.

Mention affected files.

Highlight potential improvements.

Do not produce unnecessary explanations.

Focus on implementation.

---

# When Unsure

If requirements are unclear:

Do not guess.

Ask concise questions.

Wait for clarification.

---

# Definition of Done

A task is complete when:

The requested functionality works.

The implementation follows documentation.

Architecture remains clean.

No duplicate code exists.

Responsive behavior is verified.

Accessibility is preserved.

Performance remains acceptable.

No unrelated code was modified.

The project is ready for the next incremental task.

---

# The Golden Rule

The AI should always leave the project in a better state than it found it.

Not by rewriting everything.

But by making one carefully considered improvement at a time.

The goal is not to generate the most code.

The goal is to build one of the highest-quality architecture studio websites possible through disciplined, incremental development.
