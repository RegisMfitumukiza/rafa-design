# Development Workflow

## Purpose

This document defines the standard development workflow for the RAFA Design platform.

Every feature, page, animation, component, and enhancement must follow the same workflow to ensure consistency, maintainability, and production quality.

This workflow applies equally to human developers and AI assistants.

The objective is not simply to write code.

The objective is to build the platform in a disciplined, predictable, and scalable manner.

---

# Development Philosophy

Development should always be:

- Incremental
- Modular
- Predictable
- Reviewable
- Reusable
- Performance-first
- Accessibility-first
- Documentation-driven

Every change should have a clear purpose.

Large, unreviewable implementations should be avoided.

---

# Standard Development Session

Every development session follows the same sequence.

```
Read Documentation
        ↓
Check Progress
        ↓
Identify Next Task
        ↓
Plan
        ↓
Implement
        ↓
Review
        ↓
Test
        ↓
Optimize
        ↓
Update Documentation
        ↓
Update Implementation Tracker
        ↓
Commit
```

This workflow must never be skipped.

---

# Step 1 — Read Documentation

Before writing any code, review the project documentation.

The minimum reading order is:

1. Documentation Index
2. Architecture Decisions
3. Implementation Tracker
4. Product Roadmap

Then review every document related to the feature being implemented.

The documentation is the project's single source of truth.

---

# Step 2 — Check Current Progress

Before beginning work, determine:

- Current development phase
- Current milestone
- Completed features
- Features currently in progress
- Remaining tasks

Always consult the Implementation Tracker.

Never duplicate completed work.

---

# Step 3 — Determine the Next Task

Development follows the Product Roadmap.

Always begin with the next unfinished task.

Do not skip dependencies unless explicitly instructed.

Large milestones should be divided into small reviewable tasks.

Example:

Navigation

↓

Desktop Navigation

↓

Mobile Navigation

↓

Responsive Navigation

↓

Navigation Animations

↓

Accessibility Review

↓

Performance Review

---

# Step 4 — Understand the Task

Before implementation, answer the following:

- What problem is being solved?
- Which documentation applies?
- Which folders are involved?
- Does a similar implementation already exist?
- Can an existing component be reused?
- Does this align with the project philosophy?

Never write code without understanding the objective.

---

# Step 5 — Plan the Implementation

Break the feature into logical implementation steps.

Example:

Homepage

↓

Hero

↓

Featured Projects

↓

Studio Preview

↓

Services Preview

↓

Journal Preview

↓

Call to Action

↓

Footer

↓

Responsive Review

↓

Animation Pass

↓

Performance Pass

Planning should always precede implementation.

---

# Step 6 — Reuse Before Creating

Before creating anything new, check for existing implementations.

Examples:

- Buttons
- Cards
- Layouts
- Sections
- Motion utilities
- Typography components

Prefer extension over duplication.

---

# Step 7 — Build

Implement only the current task.

Avoid unrelated refactoring.

Keep pull requests focused.

Every implementation should remain easy to review.

---

# Step 8 — Apply the Design System

All styling must come from the Design System.

Never introduce arbitrary values.

Always use:

- Design tokens
- CSS variables
- Shared typography
- Shared spacing
- Shared colors
- Shared shadows
- Shared radius
- Shared motion values

Consistency is more important than convenience.

---

# Step 9 — Add Motion

Motion is applied only after the layout has been verified.

Workflow:

Layout

↓

Interaction

↓

Animation

↓

Optimization

↓

Accessibility Review

Motion should support the content—not distract from it.

---

# Step 10 — Responsive Review

Every feature must be reviewed on:

- Desktop
- Laptop
- Tablet
- Mobile

Layouts should adapt naturally across breakpoints.

---

# Step 11 — Accessibility Review

Verify:

- Semantic HTML
- Heading hierarchy
- Keyboard navigation
- Focus visibility
- Screen reader support
- Reduced motion
- Alt text
- Color contrast

Accessibility is part of the implementation—not a final step.

---

# Step 12 — Performance Review

Review:

- Image optimization
- Lazy loading
- Bundle size
- Render performance
- Animation performance
- Three.js optimization
- Code splitting
- Hydration behavior

Performance is part of the design process.

---

# Step 13 — Self Review

Before marking a task complete, ask:

- Does it follow the Design System?
- Is it reusable?
- Is it responsive?
- Is it accessible?
- Is it consistent?
- Can it be simplified?
- Does it introduce duplication?
- Is the code maintainable?

Every implementation should satisfy these questions.

---

# Step 14 — Documentation

If architecture has changed, update the documentation before continuing.

Examples:

- New component
- New design token
- New folder
- New architecture decision
- New animation pattern

Documentation should evolve alongside the implementation.

---

# Step 15 — Update the Implementation Tracker

After completing a task:

- Mark completed items
- Update project progress
- Record the current milestone
- Record remaining work
- Record implementation notes if necessary

The tracker must always reflect the current state of the project.

---

# Git Workflow

Each feature should be developed independently.

Examples:

```
feature/navigation

feature/hero

feature/projects

feature/journal

feature/contact
```

Avoid mixing unrelated work in a single branch.

---

# Commit Strategy

Each commit should represent one logical change.

Examples:

```
feat: implement desktop navigation

feat: build homepage hero

feat: add featured projects section

fix: improve mobile spacing

refactor: simplify project card

docs: update design system
```

Avoid generic commit messages.

Never use:

```
update

changes

fixes
```

---

# Pull Request Checklist

Every pull request should answer:

- What changed?
- Why was it needed?
- Which documentation was followed?
- Which pages are affected?
- Were responsive layouts verified?
- Were animations tested?
- Was accessibility reviewed?
- Were performance impacts considered?

---

# Definition of Done

A task is complete only when:

✓ Requirements are implemented

✓ Architecture remains consistent

✓ Design System is respected

✓ Responsive layouts are verified

✓ Accessibility requirements are satisfied

✓ Performance has been reviewed

✓ Animations follow the Motion Guidelines

✓ Documentation is current

✓ Implementation Tracker has been updated

✓ Code is production-ready

---

# Workflow Summary

Every task follows the same lifecycle.

```
Read Documentation
        ↓
Check Progress
        ↓
Select Next Task
        ↓
Understand
        ↓
Plan
        ↓
Reuse
        ↓
Build
        ↓
Apply Design System
        ↓
Animate
        ↓
Responsive Review
        ↓
Accessibility Review
        ↓
Performance Review
        ↓
Self Review
        ↓
Update Documentation
        ↓
Update Implementation Tracker
        ↓
Commit
```

---

# Final Principle

Consistency is more valuable than speed.

Every implementation should leave the project in a better state than before.

Development should always move the project closer to a cohesive, production-ready architectural experience.

When in doubt, prefer simplicity, clarity, and maintainability over unnecessary complexity.
