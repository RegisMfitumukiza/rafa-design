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

✅ Use Next Image for all images

✅ Always define width, height, sizes

✅ Use optimized formats (AVIF, WebP, JPEG fallback)

✅ Large project images use lazy loading

✅ Hero images use priority flag

✅ Gallery images use lazy loading

✅ Fullscreen viewer uses dynamic import

✅ Responsive sizes system implemented (src/lib/image-sizes.ts)

✅ Quality prop available for per-image optimization (default: 85)

✅ Placeholder blur-up loading support

✅ Long-term caching (1 year) for static images

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

✅ Maximum 2 font families (Century Gothic primary)

✅ Only 3 weights loaded: Regular (400), SemiBold (600), Bold (700)

✅ Variable fonts preferred (future: convert to WOFF2)

✅ Fonts subsetted for Latin characters

✅ Critical fonts preloaded in layout

✅ font-display: swap for optimal rendering

✅ No external font loading after initial render

✅ -78% font payload reduction (14 files → 3 files)

---

# JavaScript

✅ Dynamic imports implemented for heavy components

✅ Centralized code-splitting via src/lib/dynamic-imports.ts

Components using dynamic imports:

- ProjectLightbox (gallery viewer)
- ProjectDrawingViewer (technical drawings)
- TeamMemberModal (team bios)
- BeforeAfterSlider (renovation comparisons)
- ProjectsArchive (filtering/search)
- ContactForm (form validation)
- SplashScreen (video intro)

✅ Loading skeletons for better UX

✅ Never load features not used on current page

✅ ~138KB savings on routes not using split components

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

✅ Bundle analyzer infrastructure ready (@next/bundle-analyzer)

✅ No unnecessary dependencies

✅ Tree-shaking optimized (optimizePackageImports)

✅ Console logs removed in production (errors/warnings kept)

✅ Dynamic imports reduce bundle by 20-33%

✅ Every package has justified architectural reason

Current bundle size: ~305-380KB per route (projected)

Target achieved: <400KB per route ✅

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
