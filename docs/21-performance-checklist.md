# Performance Checklist

## Purpose

Performance is not an optimization phase.

Performance is a design requirement from the beginning of the project.

Every page, animation, image, and interaction must justify its cost.

The objective is to create an architecture website that feels cinematic while remaining extremely fast.

---

# Performance Goals

Target Lighthouse Scores

Performance
95+

Accessibility
100

Best Practices
100

SEO
100

Core Web Vitals

LCP
< 2.5s

CLS
< 0.05

INP
< 200ms

TTFB
< 500ms

---

# General Rules

Never animate everything.

Animate only what improves storytelling.

Never load unnecessary JavaScript.

Prefer CSS whenever possible.

Avoid client components unless interaction requires them.

Prefer Server Components.

---

# Images

Use Next Image.

Always define

- width
- height
- sizes

Never use original 10MB images.

Required formats

AVIF
WebP

Fallback

JPEG

Large project images

lazy loading

Hero image

priority

Gallery

lazy

Fullscreen viewer

dynamic import

---

# Videos

Videos should never autoplay with sound.

Use

muted

playsInline

loop

preload="metadata"

Large videos

stream

compress

Never preload every video.

---

# Fonts

Maximum

2 font families

Variable fonts preferred.

Subset fonts.

Use

display="swap"

No external font loading after initial render.

---

# JavaScript

Dynamic import

Use for

Gallery

Three.js

Map

Heavy sections

Journal filters

Never load features not used on the current page.

---

# CSS

Keep global CSS minimal.

Avoid deep selectors.

Prefer utility classes.

Use CSS variables for design tokens.

Avoid duplicated styles.

---

# Animation Performance

Use

transform

opacity

Avoid

top

left

width

height

for animations.

Never animate

box-shadow

filter

large blur

unless absolutely necessary.

---

# GSAP

Create timelines only when entering viewport.

Kill timelines when components unmount.

Use context().

Never create duplicate ScrollTriggers.

Refresh only when layout changes.

---

# Scroll

Use Lenis.

Never attach multiple scroll listeners.

Avoid expensive calculations inside scroll callbacks.

Throttle when required.

---

# Three.js

Load models only when required.

Dispose

geometry

materials

textures

when leaving page.

Limit draw calls.

Compress textures.

Prefer baked lighting.

Avoid unnecessary shadows.

---

# React

Memoize expensive components.

Avoid unnecessary state.

Avoid prop drilling.

Split components.

Server Components first.

Client Components only when interaction exists.

---

# Data

Static content

Generate at build.

Projects

Static.

Journal

Static or ISR.

Forms

Dynamic.

---

# Bundle

Regularly inspect

Bundle Analyzer.

Avoid unnecessary dependencies.

Every package added must have a reason.

---

# Assets

Optimize

SVG

Images

Videos

Fonts

3D models

Never commit unused assets.

---

# Accessibility Performance

Animations must respect

prefers-reduced-motion.

Images require alt text.

Proper heading hierarchy.

Keyboard navigation.

---

# SEO Performance

Metadata

OpenGraph

Twitter

Schema.org

Canonical URLs

Generated automatically.

---

# Build Checklist

Before every production deployment

✓ npm run lint

✓ npm run typecheck

✓ npm run build

✓ Lighthouse

✓ Responsive testing

✓ Accessibility testing

✓ Cross-browser testing

---

# Definition of Done

A page is complete only if:

✓ Responsive

✓ Accessible

✓ Fast

✓ SEO ready

✓ Motion polished

✓ Clean code

✓ Uses design system

✓ No console errors

✓ No layout shift

✓ Production ready

Only then is implementation considered finished.
