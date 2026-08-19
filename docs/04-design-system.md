# 04 — Design System

---

# Purpose

The Design System defines every visual rule of the RAFA Design website.

Every page, component, layout, animation and interaction must originate from this document.

Nothing should be designed independently from these rules.

The objective is consistency, elegance, longevity and scalability.

This is not a UI Kit.

This is a complete visual language.

---

# Design Philosophy

The interface should disappear.

Projects are the product.

Architecture is the hero.

The website must never feel like software.

Instead it should feel like a carefully designed publication.

Every visual element exists to support the architecture rather than compete with it.

---

# Visual Characteristics

The overall experience should feel

• Minimal

• Calm

• Editorial

• Spacious

• Luxurious

• Confident

• Modern

• Timeless

Never decorative.

Never trendy.

Never flashy.

---

# Design Priorities

Priority order

1. Photography
2. Typography
3. White Space
4. Motion
5. Layout
6. Color
7. UI Components

Notice that buttons are almost the least important part of the experience.

---

# Source of Truth

All design values originate from

src/design-system/

No component may hardcode

spacing

colors

font sizes

breakpoints

durations

radius

shadows

or z-index.

Everything must import values from the design system.

---

# Typography

Typography carries the visual identity.

Images and typography create hierarchy.

Components do not.

---

## Font Pairing

Primary

General Sans

Secondary

Manrope

Fallback

Inter

Monospace

JetBrains Mono

---

## Typography Hierarchy

Display Hero

Large editorial statement.

Usually one or two lines.

Never more than four.

H1

Large page titles.

H2

Section titles.

H3

Card titles.

Body Large

Editorial descriptions.

Body

Default paragraphs.

Caption

Project metadata.

Overline

Small uppercase labels.

Navigation

Simple.

Medium weight.

Small.

---

# Color Philosophy

Color exists to support imagery.

Not to attract attention.

Images provide color.

The interface remains neutral.

---

## Primary Palette

Warm White

Soft Black

Stone

Warm Gray

Sand

---

## Accent

Only one accent color exists.

It should be subtle.

Never saturated.

Used only for

hover

focus

small highlights

interactive indicators

Never large backgrounds.

---

# White Space

White space is a design element.

Never attempt to fill empty areas.

Spacing communicates hierarchy.

More space means greater importance.

---

# Layout Principles

Content aligns to an invisible grid.

Margins remain consistent.

Every page feels balanced.

Large margins are preferred over crowded layouts.

---

# Containers

Narrow

Reading content

Content

Editorial content

Standard

Most layouts

Wide

Project grids

Full

Immersive imagery

---

# Grid

Desktop

12 columns

Tablet

8 columns

Mobile

4 columns

No exceptions.

---

# Vertical Rhythm

Sections follow consistent spacing.

Small sections

80px

Standard sections

120px

Hero transitions

160–240px

Never arbitrary spacing.

---

# Border Radius

Architecture uses geometry.

Rounded corners are minimal.

Cards

4–8px

Buttons

999px only if intentionally pill shaped.

Large rounded cards are discouraged.

---

# Borders

Borders are subtle.

Use transparency.

Never heavy outlines.

---

# Shadows

Shadows are rare.

Elevation comes from spacing.

Not shadows.

If shadows exist

they should be extremely soft.

---

# Icons

Icons are secondary.

Use outline icons.

Simple geometry.

Consistent stroke widths.

No filled icon packs.

---

# Buttons

Buttons should never dominate.

Preferred order

Text Link

↓

Ghost

↓

Outline

↓

Solid

Solid buttons should be rare.

---

# Images

Images define the project.

Photography should occupy large areas.

Allow images to breathe.

Avoid decorative crops.

Prefer cinematic compositions.

---

# Video

Video should autoplay silently.

Loop.

No controls unless necessary.

Videos should behave like moving photography.

---

# Motion Language

Motion communicates hierarchy.

Not decoration.

Animations should feel

natural

slow

smooth

intentional.

Nothing bounces.

Nothing overshoots.

Nothing feels playful.

---

# Component Philosophy

Components should disappear.

Avoid

cards everywhere

colored containers

excessive borders

nested boxes

Instead

Typography

Spacing

Photography

should define sections.

---

# Responsive Philosophy

Layouts adapt.

Design does not shrink.

Content should be rearranged instead of compressed.

Desktop and mobile should feel intentionally designed.

Not simply scaled versions.

---

# Accessibility

Minimalism must never reduce usability.

Contrast

Keyboard navigation

Focus indicators

Screen readers

must always be supported.

---

# Design Checklist

Every component should answer:

Does it improve the architecture?

Can it be simpler?

Can typography solve this instead?

Can spacing solve this instead?

Can imagery solve this instead?

Would BIG publish this?

Would Snøhetta publish this?

If the answer is no,

redesign it.

---

# Future Expansion

The Design System must be capable of supporting

Landing Experience

Projects

Project Details

Studio

Services

Journal

Careers

Contact

CMS

without redesigning the foundations.

This design system is intended to remain stable throughout the life of the project.

---

# Design Tokens (Implementation)

The live token layer lives in `src/styles/tokens.css` (CSS `@theme` + `:root` + `.dark`). Components must never hardcode colors, spacing, type sizes, breakpoints, durations, radius, shadows, or z-index — they consume the tokens below (Tailwind v4 namespace utilities such as `bg-background`, `px-md`, `aspect-hero`, `h-(--header-height)`).

## Aspect Ratios

Named aspect tokens mapped to Tailwind utilities:

- `aspect-hero` → `21 / 9` — page + section heroes
- `aspect-landscape` → `16 / 9` — journal cards, project galleries, office map
- `aspect-standard` → `4 / 3` — project cards
- `aspect-portrait` → `3 / 4` — team portraits

## Layout & Micro-Interaction

`:root` tokens consumed via arbitrary `(--...)` utilities:

- `--header-height: 4rem` → `h-(--header-height)`, `pt-(--header-height)`
- `--micro-lift: 0.25rem` → `hover:-translate-y-(--micro-lift)` (card lift)
- `--micro-scale: 1.04` → `scale-(--micro-scale)` (image zoom)

Motion values (durations, eases, reveal, parallax, micro) live only in `src/design-system/motion.ts` under `motion.values`; there are no duplicate CSS-variable exports.

## Dark Mode

Dark palette is defined once in `.dark { ... }` inside `tokens.css`:

- `--rafa-background: #14120f` · `--rafa-foreground: #ece7de` · `--rafa-surface: #1d1a16`
- `--rafa-accent: #c49a6c` · `--rafa-border: #322e28` · `--rafa-muted: #26221d`

Components use the same semantic tokens in both themes. `html.dark { color-scheme: dark; }` keeps native UI (scrollbars, inputs) aligned. Theme selection is class-based with a stored preference (ADR-020).

## Breakpoints

- `--breakpoint-tablet: 48rem` · `--breakpoint-desktop: 64rem`

Breakpoint tokens are consumed in JS (`sizes` strings, responsive logic). CSS `@media` conditions cannot use `var()` (invalid per the CSS spec and rejected by the build), so media queries use the literal `48rem` / `64rem` with a comment naming the token (ADR-021).
