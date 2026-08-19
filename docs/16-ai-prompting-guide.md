# AI Prompting Guide

## Purpose

This document defines how AI should be instructed throughout the development of this project.

The objective is to ensure every prompt produces predictable, maintainable, production-quality results while respecting the project's architecture and documentation.

This guide applies regardless of the AI model being used (Claude, ChatGPT, Gemini, Cursor, Windsurf, Codex, or future assistants).

---

# Core Philosophy

AI is a development partner.

Not an autonomous architect.

Every implementation must follow the project's documentation before introducing new ideas.

The AI should improve implementation quality without changing established architecture.

---

# Before Writing Any Prompt

Before asking AI to build something, identify:

• What is being built?
• Why is it needed?
• Which documentation applies?
• Which folders will change?
• Which existing components should be reused?
• What should remain untouched?

A good prompt always has context.

---

# Documentation Hierarchy

Every implementation must follow this order.

1. Documentation Index
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
12. Vibe Coding Workflow
13. Coding Standards
14. Remaining documentation

Never instruct the AI to violate higher-priority documents.

---

# Golden Prompt Structure

Every implementation prompt should contain five sections.

## 1. Context

Describe where the task belongs.

Example

We are currently implementing the Projects page.

The design system has already been established.

Navigation is complete.

---

## 2. Objective

State one clear objective.

Example

Build the Featured Projects section.

---

## 3. Requirements

Describe expectations.

Example

Use existing components.

Use design tokens.

Follow animation guidelines.

Responsive.

Accessible.

---

## 4. Constraints

State what should NOT happen.

Example

Do not modify Navigation.

Do not change the Design System.

Do not install dependencies.

Do not create duplicate components.

---

## 5. Deliverables

Describe expected output.

Example

Components

Hooks

Types

Animations

Documentation updates

Nothing else.

---

# One Goal Per Prompt

Every prompt should solve one problem.

Good

Build Navigation

Build Hero

Build Project Card

Build Footer

Bad

Build the entire website.

Large prompts reduce quality.

---

# Ask for Reviews

Use AI for reviews as often as implementation.

Example

Review this component.

Identify architecture issues.

Suggest performance improvements.

Check accessibility.

Verify responsive behavior.

Look for duplicated logic.

Review before adding features.

---

# Prompt Templates

---

## Build a Component

Context

We are implementing the architecture website.

Objective

Build the ProjectCard component.

Requirements

Follow the design system.

Use existing typography.

Use reusable spacing.

Accessible.

Responsive.

Do not modify unrelated files.

Return only the required files.

---

## Build a Feature

Context

The Hero is already complete.

Objective

Implement the Featured Projects feature.

Requirements

Reuse existing components.

Follow the Page Architecture.

Follow Animation Guidelines.

Do not create duplicate UI.

---

## Build a Page

Context

Navigation and Footer already exist.

Objective

Create the Studio page.

Requirements

Follow Page Architecture.

Reuse existing Sections.

Minimal animations.

Responsive.

Accessible.

SEO ready.

---

## Refactor

Review the implementation.

Reduce duplication.

Improve readability.

Do not change behavior.

Maintain API compatibility.

---

## Performance Review

Review the implementation for

Performance

Bundle size

Animation performance

Accessibility

Image optimization

Suggest improvements only.

---

## Accessibility Review

Review

Semantic HTML

ARIA

Keyboard support

Reduced motion

Color contrast

Focus states

Do not modify styling unless necessary.

---

## Animation Review

Review animations against

Animation Guidelines

Performance

Timing

Consistency

Accessibility

Suggest improvements.

---

## Architecture Review

Review the implementation.

Verify

Folder placement

Component hierarchy

Feature boundaries

Design System usage

Naming conventions

Dependency direction

Do not generate unrelated code.

---

# Request Incremental Work

Instead of

Build the Home Page.

Use

Build the Hero section.

↓

Review.

↓

Build Featured Projects.

↓

Review.

↓

Build Studio Preview.

↓

Review.

↓

Build Footer.

This produces significantly higher quality.

---

# Request Self Review

Always ask the AI to review itself.

Example

Before responding:

Review your implementation.

Check for duplicated code.

Verify responsive behavior.

Verify accessibility.

Verify design system usage.

Suggest improvements before returning code.

---

# Request File Scope

Limit the files AI may modify.

Example

Only modify

src/features/projects

src/components/ui

Do not modify any other files.

This prevents accidental regressions.

---

# Request Output Format

Always specify the desired output.

Examples

Explain first.

Generate code afterward.

Return complete files.

Return only changed sections.

Return diff only.

Explain decisions.

---

# Continue Existing Work

When continuing a feature, remind AI of the current state.

Example

Navigation is complete.

Hero is complete.

Design System is finalized.

Continue by building Featured Projects.

Avoid rebuilding previous work.

---

# Large Feature Strategy

Break every large feature into phases.

Example

Projects

Phase 1

Layout

Phase 2

Cards

Phase 3

Filtering

Phase 4

Animation

Phase 5

Responsive

Phase 6

Optimization

Never request all phases simultaneously.

---

# Asking AI to Think

Useful instructions

Review before coding.

Think step by step.

Inspect existing architecture.

Reuse before creating.

Explain assumptions.

Stop after implementation.

These improve consistency.

---

# Bad Prompts

Avoid

"Make it beautiful."

"Improve everything."

"Fix my website."

"Refactor all files."

"Create the whole landing page."

These are ambiguous.

---

# Good Prompts

Good prompts are

Specific

Focused

Incremental

Architecturally aware

Constrained

Reviewable

---

# AI Collaboration Rules

Treat AI like another senior developer.

Provide context.

Give constraints.

Review outputs.

Ask questions.

Never blindly accept generated code.

The developer remains responsible for architectural decisions.

---

# Project-Specific Rules

For this architecture studio project:

• Respect the Design System.
• Respect the editorial design language.
• Preserve visual consistency.
• Use animations to support storytelling.
• Never imitate competitor websites directly.
• Create original implementations inspired by modern architectural experiences.
• Prioritize performance over visual effects.
• Three.js is an enhancement, not a dependency for understanding the website.
• Every implementation should feel timeless rather than trendy.

---

# Definition of a Successful Prompt

A successful prompt:

✓ Has context.

✓ Defines one objective.

✓ Includes constraints.

✓ References project documentation.

✓ Limits file scope.

✓ Specifies deliverables.

✓ Requests self-review.

✓ Produces maintainable code.

The quality of the project depends as much on the quality of the prompts as it does on the quality of the implementation.

Always communicate with precision.
