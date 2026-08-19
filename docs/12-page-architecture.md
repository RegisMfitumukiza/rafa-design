# Page Architecture

## Purpose

This document defines how every page in the website is structured.

The goal is consistency.

Every page should feel like part of the same experience while still having its own identity.

The architecture emphasizes visual storytelling instead of traditional marketing layouts.

---

# Philosophy

Pages are not collections of UI components.

Pages are narratives.

Each page should guide the visitor through a sequence of carefully composed visual moments.

Each section exists for a reason.

Every transition has meaning.

Scrolling should feel like moving through a physical exhibition rather than browsing a website.

---

# Universal Page Structure

Every page follows this hierarchy.

```
Page

├── Navigation
│
├── Hero
│
├── Primary Content
│
├── Secondary Story Sections
│
├── CTA (only where appropriate)
│
└── Footer
```

Not every page requires every section.

Pages should remain intentionally minimal.

---

# Global Navigation

Navigation is persistent across the entire website.

Responsibilities

• Branding

• Primary navigation

• Project filtering (when applicable)

• Theme toggle

• Mobile navigation

Navigation should remain lightweight.

Avoid oversized headers.

Navigation should never compete with page content.

---

# Hero

Every page begins with a Hero.

A hero is not always text.

Examples include

• Fullscreen image

• Fullscreen video

• Split layout

• Project collage

• Cinematic typography

• Minimal title over whitespace

The hero defines the mood of the page.

---

# Page Intro Composition

Every page intro follows the same alignment rule.

## Vertical (heading cluster)

The identity of the page is always stacked vertically, left-aligned, at a constrained width:

- Overline
- H1 title
- At most one short tagline sentence (one declarative line)

This is the heading cluster. It is never split.

## Horizontal (12-col split)

Anything below the heading cluster that is a full-length text block — a manifesto, a narrative body, or meta data — must sit to the right on a 12-column grid, sharing the baseline with the heading cluster.

## Rule of thumb

If content reads as part of the title (one declarative sentence), keep it vertical.

If it is a second full paragraph, it must split horizontally.

## Reference implementations

- Projects page — overline + `Projects` + one-line tagline stack vertically; the commission count sits right at the baseline. Heading cluster only.
- Studio page — overline + `Studio` stack vertically; manifesto (left) and introduction (right) split on the 12-col grid below the heading cluster.

---

# Section Types

Pages are composed using reusable section patterns.

Examples

Image Section

Large photography

Editorial Section

Text-driven storytelling

Gallery Section

Image grids

Project Section

Project listings

Quote Section

Large testimonial

Studio Section

Team information

Statistics Section

Minimal numbers

Video Section

Background video

Process Section

Step-by-step narrative

CTA Section

Invitation to contact

Footer Section

Site navigation

---

# Section Rhythm

The website follows alternating rhythm.

Example

Large image

↓

Whitespace

↓

Editorial text

↓

Project gallery

↓

Fullscreen media

↓

Quote

↓

Projects

↓

Footer

This creates breathing space.

Never stack multiple dense sections together.

---

# Layout Widths

Use predefined containers.

Narrow

Editorial reading

Content

Text with media

Standard

Default layouts

Wide

Large imagery

Full

Immersive media

Never invent arbitrary widths.

---

# Vertical Spacing

Sections breathe.

Spacing should feel generous.

Examples

Hero → Section

Very large spacing

Editorial → Gallery

Large spacing

Gallery → Quote

Medium spacing

Footer

Large spacing

Avoid cramped layouts.

---

# Grid Usage

Desktop

12 columns

Tablet

8 columns

Mobile

4 columns

Content aligns consistently across every page.

---

# Scroll Experience

Scrolling should feel continuous.

Avoid hard visual breaks.

Transitions should feel natural.

Examples

Image fades

Parallax

Scale transitions

Mask reveals

Horizontal movement

Opacity transitions

No distracting gimmicks.

---

# Typography Hierarchy

Each page follows the same hierarchy.

Hero

Largest typography

Section titles

Large typography

Body

Comfortable reading size

Metadata

Small uppercase

Captions

Small muted text

Hierarchy should remain identical across all pages.

---

# Photography

Photography is the primary storytelling medium.

Images should occupy significant space.

Avoid tiny decorative images.

Images should often extend beyond text.

---

# Motion Placement

Motion is used to guide attention.

Examples

Section reveal

Image scale

Text fade

Navigation transitions

Gallery transitions

Cursor interaction

Motion should never interrupt reading.

---

# Footer

Footer concludes every experience.

Contains

Studio information

Navigation

Contact

Social links

Newsletter (optional)

Large brand signature

The footer should feel like the final architectural space.

---

# Page Categories

The website consists of several page types.

---

## Landing

Purpose

Create curiosity.

Primary focus

Direct navigation.

The homepage is a viewport-filling cover (2026-08-11, refined 2026-08-12): no hero, no preview sections, and no header, footer, or search on the route. A minimal top bar carries the image logo (`<Logo />`) + theme toggle. The cover composition centers the image logo top-center on desktop (`<Logo imgClassName="h-[clamp(4rem,12vh,12rem)] w-auto" />`), pins the numbered 01–06 primary index bottom-left (`PrimaryNavIndex variant="display"` under an `INDEX` mono overline), and the email + social row bottom-right; below `lg` the three stack in normal flow (logo → index → socials). Navigation happens through the index itself. The fullscreen menu (a full directory: GENERAL / DISCIPLINES / PRACTICE + search + contact, all sharing the image logo) remains the primary navigation on every other route.

Very little explanation.

---

## Projects

Purpose

Browse all work.

Includes

Filtering

Categories

Grid

Search (optional)

---

## Project Detail

Purpose

Tell one project's story.

Includes

Hero

Overview

Gallery

Process

Materials

Credits

Related projects

---

## Studio

Purpose

Present philosophy.

Includes

Manifesto

History

Team

Culture

Office

---

## Services

Purpose

Explain capabilities.

Editorial approach.

Avoid marketing language.

---

## Process

Purpose

Explain how projects evolve — the studio's methodology, not a corporate six-step pitch.

Composition (2026-08-14)

1. Editorial 12-col intro (Pattern B) — "Specification // Methodology" overline → h1 → lead statement
2. Work-in-progress hero — `processHero` (studio material samples / study models), `ImageReveal`, 16:9 → 21:9, mono caption
3. Ruled methodology index — `ProcessTimeline` / `ProcessStep`, hairline-bordered rows `[2] number · [4] title · [6] description`, phase `visual`s as full-width 16:9 evidence plates
4. "See the Work →" link to `/projects` (the only cross-reference the content model supports; rows are not links)
5. Closing CTA — shared `DisciplineCta` with `pageContent.process.cta` → `/contact`

Restraints

Timelines

Photography

Minimal text

The phase copy, titles, and order come exclusively from `src/content/process/index.ts` — never invented in the UI.

---

## Journal

Purpose

Publish articles.

Editorial layouts.

---

## Careers

Purpose

Recruit talent.

Minimal interface.

---

## Contact

Purpose

Start conversations.

Includes

Map

Contact form

Studio information

Social links

---

# Responsive Behaviour

Desktop

Editorial layouts

Tablet

Reduced spacing

Mobile

Single-column layouts

Touch-first interactions

No horizontal scrolling.

---

# Accessibility

Every page must include

Semantic HTML

Keyboard navigation

Visible focus states

Proper heading hierarchy

Image alt text

Reduced motion support

---

# Performance

Pages should prioritize

Image optimization

Lazy loading

Minimal JavaScript

Streaming where possible

Animation performance

---

# Success Criteria

Every page should feel

Architectural

Editorial

Minimal

Premium

Timeless

Fast

Accessible

Cohesive

The visitor should feel they are exploring a carefully curated architectural publication rather than a conventional company website.
