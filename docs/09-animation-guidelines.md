# 09 — Animation Guidelines

> Source of Truth
>
> Animation is part of the user experience.
>
> It is never decoration.
>
> Every movement must have a purpose.

---

# Philosophy

Architecture is static.

Movement brings architecture to life.

The website should feel calm, cinematic, deliberate and premium.

Users should never notice animations because they are flashy.

Instead they should feel that the interface naturally responds to them.

The best animation is one that feels inevitable.

---

# Design References

The animation language draws inspiration from premium architectural and editorial experiences.

Influences include

- BIG
- Snøhetta
- Foster + Partners
- Apple
- Linear
- Framer
- Awwwards editorial experiences

The implementation must never copy these websites directly.

Only borrow principles.

---

# Motion Personality

Every animation should feel

Calm

Elegant

Confident

Intentional

Editorial

Minimal

Organic

Never playful.

Never exaggerated.

Never distracting.

---

# Core Principles

Animation should

Guide

Reveal

Focus attention

Provide continuity

Reward interaction

Never exist only because it looks impressive.

---

# Motion Rules

Animation should never block interaction.

Animation should never delay content.

Animation should never become repetitive.

Animation should never reduce readability.

Animation should never decrease performance.

---

# Motion Hierarchy

There are five levels of motion.

---

Level 1

Micro interactions

Hover

Focus

Button feedback

Cursor

Links

---

Level 2

Component transitions

Cards

Images

Navigation

Accordions

Filters

---

Level 3

Section reveals

Hero

Projects

Studio

Journal

Contact

---

Level 4

Page transitions

Navigation between pages

Loading transitions

Shared element transitions

---

Level 5

Immersive experiences

Three.js

Parallax

Camera movement

Scroll storytelling

These should be used sparingly.

---

# Timing

Instant

80ms

Fast

150ms

Standard

250ms

Slow

450ms

Cinematic

800–1200ms

Long animations should remain smooth.

---

# Easing

Avoid default easing.

Preferred easing

Standard

```
cubic-bezier(.2,0,.0,1)
```

Emphasized

```
cubic-bezier(.16,1,.3,1)
```

Cinematic

```
cubic-bezier(.77,0,.175,1)
```

---

# Scroll Philosophy

Scrolling is the primary interaction.

Scrolling should feel continuous.

Nothing should snap unexpectedly.

Avoid hijacking the browser.

Lenis provides smooth scrolling.

GSAP ScrollTrigger enhances sections.

The browser remains in control.

---

# Text Animation

Text should never bounce.

Preferred

Fade

Mask reveal

Clip reveal

Split text

Line reveal

Opacity

Translate Y

Avoid

Rotate

Bounce

Elastic

Swing

Flash

---

# Image Animation

Preferred

Reveal mask

Fade

Scale slightly

Parallax

Clip-path reveal

Avoid

Zoom explosions

Large rotations

Random movement

---

# Navigation

Navigation should feel immediate.

Menus

Fade

Slide

Blur

Opacity

Logo transitions should remain subtle.

---

# Hover Effects

Hover should communicate interactivity.

Good

Opacity

Underline

Color shift

Small translate

Small scale

Border transitions

Avoid

Large scaling

Rotation

Spinning

Overly elastic movement

---

# Cards

Cards should animate

once

when entering the viewport.

Hover should remain subtle.

Avoid repeated animations.

---

# Section Reveal

Every section enters naturally.

Recommended sequence

Heading

↓

Supporting text

↓

Media

↓

Actions

↓

Decorative elements

Never reveal everything simultaneously.

---

# Project Grid

Projects should reveal progressively.

Stagger timing

80–120ms

Never reveal every card together.

---

# Hero

The hero defines the first impression.

Sequence

Background

↓

Media

↓

Heading

↓

Description

↓

Navigation cue

Total duration

Approximately 1 second.

---

# Cursor

The custom cursor should

Follow naturally

Never lag excessively

Never obscure content

Disappear on touch devices

---

# Loading

Avoid loading screens.

Prefer progressive rendering.

If a loading state is required

Fade

Skeleton

Progressive image loading

Avoid fake loaders.

## Approved Exception — Branded Intro Splash

A real, branded home-page intro splash may play on the first visit of a session as a deliberate storytelling experience — it is not a fake loader. Revised 2026-09-05: this is now a **typographic/architectural GSAP curtain** (monospace "SPECIFICATION // ARCHITECTURE STUDIO" overline, studio wordmark in display font with letter-spacing settling, a 1 px drafting hairline expanding center-outward, Kigali GPS coordinates, then a curtain elevation off the top) — **not a video**. The earlier `public/videos/rafa-video.mp4` video version was replaced by the curtain, and the splash is now **home-only** (`SplashProvider` in `src/app/(site)/page.tsx`; inner pages skip it). Constraints (implemented 2026-08-03, revised 2026-09-05):

- Plays once per session (`sessionStorage`), skipped on refresh and page navigation.
- Waits for `window load` + `document.fonts.ready` before starting.
- Elevates its curtain off-screen over 550 ms (cubic-bezier 0.77 0 0.175 1) revealing the already-mounted header/content; total duration ~1.4 s.
- Skips entirely under `prefers-reduced-motion`.
- Locks scroll while active; cleans up all listeners and GSAP context.

---

# Page Transition

Page transitions should feel invisible.

Recommended

Fade

Shared layout

Content continuity

Avoid dramatic wipes.

---

# Three.js

Three.js should support content.

Never compete with it.

Scene movement should remain subtle.

The architecture remains the focus.

---

# Reduced Motion

Respect

prefers-reduced-motion

Disable

Parallax

Split text

Complex GSAP timelines

Heavy camera movement

Replace with simple fades.

---

# Performance

60 FPS target.

Avoid layout thrashing.

Animate

opacity

transform

filter

Avoid animating

width

height

top

left

margin

padding

---

# Animation Checklist

Before shipping

✓ Purposeful

✓ Smooth

✓ Accessible

✓ Responsive

✓ GPU accelerated

✓ Supports reduced motion

✓ Uses GSAP timeline when appropriate

✓ Does not distract

✓ Feels premium

---

# Golden Rule

Animation should make architecture feel alive.

It should never become the architecture itself.
