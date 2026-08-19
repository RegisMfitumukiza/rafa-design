# 10 — Animation Library

> Source of Truth
>
> This document defines every approved animation used throughout the website.
>
> All animations must be reusable.
>
> No animation should be created ad hoc inside components.
>
> If a new animation is required, this document must be updated first.

---

# Philosophy

The website should feel cinematic without becoming theatrical.

Movement exists to reveal content, improve orientation, reinforce hierarchy, and create continuity.

Every animation belongs to one of the approved categories below.

---

# Animation Categories

The website contains six categories of motion.

1. Entrance Animations
2. Hover Animations
3. Scroll Animations
4. Navigation Animations
5. Layout Transitions
6. Three.js Motion

No animation should exist outside these categories.

---

# Entrance Animations

---

## Fade In

Purpose

Reveal supporting content.

Used For

Paragraphs

Captions

Buttons

Metadata

Properties

Opacity

Duration

300ms

Ease

Standard

---

## Fade Up

Purpose

Reveal primary content.

Used For

Headings

Cards

Images

Translation

20–40px

Duration

500ms

Ease

Emphasized

---

## Reveal Mask

Purpose

Editorial image reveal.

Used For

Project imagery

Hero imagery

Gallery

Technique

Clip Path

Overflow Hidden

Scale

Slight

---

## Split Text Reveal

Purpose

Premium typography reveal.

Used For

Hero titles

Large headings

Studio statements

Implementation

Split by lines.

Never characters unless specifically required.

---

## Scale Reveal

Purpose

Introduce media.

Scale

0.95 → 1

Opacity

0 → 1

Used For

Large visuals

Hero media

Three.js canvas

---

# Scroll Animations

---

## Section Reveal

Trigger

Section enters viewport.

Sequence

Heading

↓

Description

↓

Media

↓

Actions

---

## Stagger Children

Purpose

Reveal collections.

Examples

Projects

Journal

Awards

Team

Delay

80–120ms

---

## Image Parallax

Purpose

Create depth.

Movement

Very subtle.

Maximum

20%

Never extreme.

---

## Sticky Content

Purpose

Editorial storytelling.

Used For

Project narratives

Process timeline

Studio history

---

## Horizontal Scroll

Purpose

Special storytelling.

Use sparingly.

Never for normal content.

---

# Hover Animations

---

## Link Underline

Simple underline reveal.

Used throughout navigation.

---

## Link Arrow

Arrow shifts slightly.

Movement

4px

---

## Card Lift

Purpose

Show interactivity.

Translate

-4px

Shadow

Increase slightly.

---

## Image Zoom

Scale

1 → 1.04

Never more than 1.08

---

## Image Brightness

Slight brightness adjustment.

Used on galleries.

---

## Magnetic Button

Optional.

Primary CTAs only.

Movement remains subtle.

---

# Navigation Animations

---

## Navbar Appearance

Fade

↓

Slide

↓

Blur reduction

---

## Mobile Menu

Fade

Scale

Opacity

Background blur

---

## Active Navigation

Animated indicator.

Never rely only on color.

---

## Logo Transition

Subtle scale

Opacity

Used when scrolling.

---

# Layout Transitions

---

## Page Fade

Default transition.

Outgoing

Fade Out

Incoming

Fade In

---

## Shared Element Transition

Future implementation.

Project previews.

Gallery.

---

## Layout Shift

Animated layout changes.

Filtering

Grid updates

Sorting

---

# Cursor Animations

---

## Cursor Follow

Smooth interpolation.

Desktop only.

---

## Cursor Expand

Hovering interactive elements.

---

## Cursor Label

Project previews.

Gallery interactions.

---

# Loading Animations

---

## Skeleton

Preferred loading method.

---

## Progressive Image

Blur

↓

Sharp

---

## Lazy Reveal

Media enters only when required.

---

## Video Intro Splash

Purpose

Branded full-screen intro on first visit of a session.

Deliverable

Seamless video → live-site transition.

Properties

Full viewport video overlay (`object-fit: cover`).

Autoplay, muted, plays inline, no controls.

Fade out 300–500 ms (opacity only).

Reveals the already-mounted header + content underneath.

Session-gated (`sessionStorage`) — once per session.

Skips under `prefers-reduced-motion`.

Duration

Fade uses `duration-slow` (480 ms).

Ease

Emphasized.

Implementation

`src/components/splash/SplashProvider.tsx` (logic) + `SplashScreen.tsx` (overlay).

# Three.js Motion

---

## Hero Camera Drift

Extremely subtle.

Continuous.

---

## Scene Rotation

Very slow.

Almost imperceptible.

---

## Mouse Interaction

Small movement.

No exaggerated tracking.

---

## Lighting Transition

Smooth interpolation.

---

# Footer Animations

Footer content reveals progressively.

Logo

↓

Navigation

↓

Contact

↓

Copyright

---

# Motion Tokens

Durations

Instant

80ms

Fast

160ms

Base

250ms

Slow

450ms

Cinematic

900ms

---

# Easings

Standard

cubic-bezier(.2,0,0,1)

Emphasized

cubic-bezier(.16,1,.3,1)

Cinematic

cubic-bezier(.77,0,.175,1)

---

# Animation Restrictions

The following are prohibited.

❌ Bounce

❌ Elastic

❌ Flash

❌ Spin

❌ Large rotations

❌ Random floating

❌ Continuous wobbling

❌ Infinite attention-seeking animations

❌ Autoplaying complex sequences

---

# Performance Rules

Animate only

- transform
- opacity
- filter

Avoid

- width
- height
- margin
- padding
- left
- top

---

# GSAP Standards

All GSAP code should

- use timelines
- clean up on unmount
- use context()
- avoid global selectors
- respect prefers-reduced-motion

---

# Lenis Integration

Lenis controls scrolling.

GSAP ScrollTrigger synchronizes with Lenis.

No competing scroll libraries are allowed.

---

# Animation Decision Tree

Need to reveal content?

→ Fade or Reveal

Need interaction?

→ Hover Animation

Need storytelling?

→ Scroll Animation

Need immersive experience?

→ Three.js Motion

Need navigation feedback?

→ Navigation Animation

If none of the above apply,

do not animate.

---

# Future Expansion

Additional animations may be introduced only if they:

- solve a real UX problem
- improve navigation
- enhance storytelling
- remain performant
- align with the established motion language

---

# Final Principle

Users should remember the architecture.

Not the animation.

Motion exists to elevate the experience—not to become the experience itself.
