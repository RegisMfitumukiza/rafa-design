# 11 — Three.js Guidelines

> Source of Truth
>
> Three.js is an enhancement layer, not the product.
>
> It exists to support architecture, storytelling, and spatial understanding.
>
> Visitors should remember the projects—not the technology behind them.
>
> **Status (2026-08-11):** the Three.js layer was removed — it existed only to back the deleted homepage hero. These guidelines remain the policy if a future story gives Three.js a purpose; they do not apply to the current codebase.

---

# Philosophy

Architecture is already three-dimensional.

The purpose of Three.js is not to make the website "look cool."

Instead, Three.js should help communicate:

- space
- scale
- atmosphere
- materiality
- depth
- interaction

Every scene must improve the user's understanding of the work.

If a scene exists only because it looks impressive, it should not be built.

---

# Design Inspiration

The experience should take inspiration from:

- Apple
- Linear
- Awwwards Editorial Experiences
- BIG
- Snøhetta
- Foster + Partners

without copying any implementation.

The result should feel uniquely RAFA.

---

# Three.js Principles

Every scene must be

Minimal

Elegant

Responsive

Fast

Accessible

Purposeful

Never distracting.

---

# Progressive Enhancement

The website must work perfectly without WebGL.

Three.js is an enhancement.

Not a dependency.

Every page should remain usable when

- JavaScript is disabled
- WebGL is unavailable
- GPU performance is poor
- Mobile hardware is limited

---

# When Three.js Is Allowed

Three.js should be used only when it improves storytelling.

Examples

Hero atmosphere

Interactive building models

Project visualization

Environmental backgrounds

Spatial transitions

Material demonstrations

Lighting simulations

Architectural concepts

Nothing else.

---

# When Three.js Is Forbidden

Do not use Three.js for

Buttons

Navigation

Forms

Text

Footer

Simple icons

Decorative objects

Loading animations

Random particles

Random floating geometry

Spinning logos

Rotating cubes

Background noise

Decorative effects without meaning

---

# Scene Hierarchy

Every scene should follow the same structure.

```
Canvas

↓

Scene

↓

Camera

↓

Lights

↓

Environment

↓

Models

↓

Interaction

↓

Post Processing (optional)
```

Never place everything inside one file.

---

# Folder Structure

```
three/

components/

hooks/

loaders/

materials/

scenes/

utils/
```

Each folder has one responsibility.

---

# Scene Architecture

Each scene should contain

One camera

One environment

Minimal lighting

Few models

Simple interaction

Avoid complex scene graphs.

---

# Camera Principles

Camera movement should feel cinematic.

Never aggressive.

Recommended

Slow drift

Gentle interpolation

Smooth transitions

Subtle parallax

Avoid

Fast rotations

Orbit controls everywhere

Constant movement

Camera shaking

Sudden zooms

---

# Lighting

Lighting should simulate architecture.

Preferred

HDRI

Area lights

Directional light

Soft shadows

Ambient lighting

Avoid

Colored lights

Neon lighting

Extreme bloom

Heavy lens flare

---

# Materials

Materials should feel realistic.

Recommended

Concrete

Glass

Wood

Stone

Metal

Fabric

Avoid

Cartoon materials

Reflective chrome everywhere

Extreme emissive materials

Unrealistic shaders

---

# Models

Model quality matters more than quantity.

Prefer

Low polygon

Optimized meshes

Compressed textures

Shared materials

Instancing

Avoid

Massive CAD exports

Millions of polygons

Unused geometry

Duplicate meshes

---

# Asset Optimization

All models should be

Compressed

Draco compressed

Mesh optimized

Texture optimized

Lazy loaded

---

# Texture Guidelines

Use

WebP

KTX2

Compressed formats

Maximum size should be justified.

Avoid unnecessarily large textures.

---

# Performance Budget

Desktop

60 FPS

Mobile

30–60 FPS

GPU memory should remain efficient.

The user should never hear their laptop fan because of our website.

---

# Mobile Strategy

Mobile devices receive simplified scenes.

Possible approaches

Reduced geometry

Reduced lighting

Static fallback

Image replacement

Disable expensive shaders

Maintain the same visual language.

---

# Interaction

Interaction should be subtle.

Mouse movement

Small camera movement

Hover response

Scene interpolation

Avoid

Games

Complex dragging

Physics

Large object manipulation

---

# Scroll Integration

Scroll controls the story.

Scroll should

Reveal

Transition

Guide

Never hijack navigation.

---

# React Three Fiber

Use React Three Fiber exclusively.

Do not write raw Three.js unless absolutely necessary.

React should control the scene.

---

# Drei

Prefer Drei helpers whenever appropriate.

Examples

Environment

Float

Stage

Text

Camera

Bounds

PerformanceMonitor

Avoid reinventing existing utilities.

---

# State

Three.js state should remain isolated.

Never mix UI state with rendering state.

---

# Loading

Use Suspense.

Lazy load scenes.

Display lightweight placeholders.

Never block the page.

---

# Post Processing

Less is more.

Allowed

Ambient Occlusion

Tone Mapping

Bloom (very subtle)

Depth of Field (minimal)

Forbidden

Heavy blur

Extreme bloom

Glitch

RGB shift

CRT

Distortion

Film grain overload

---

# Accessibility

If WebGL fails

Users should still experience

Images

Video

Content

Projects

Text

Nothing should become inaccessible.

---

# SEO

Three.js must never replace semantic HTML.

Search engines should still understand

Titles

Descriptions

Projects

Services

Journal

Everything important remains HTML.

---

# Future AI Integration

Three.js scenes should be modular.

Future additions may include

Interactive project exploration

Material configurators

Environmental simulation

Architectural walkthroughs

AR/VR support

These should integrate naturally without rewriting the architecture.

---

# Scene Inventory

Approved scene types

Hero Scene

Project Scene

Background Environment

Material Showcase

Concept Visualization

Interactive Building

Timeline Visualization

No additional scene types should be introduced without updating this document.

---

# Performance Checklist

Before shipping

✓ 60 FPS target

✓ Lazy loaded

✓ Mobile optimized

✓ Accessible fallback

✓ Optimized assets

✓ Minimal draw calls

✓ No memory leaks

✓ Responsive

✓ SEO unaffected

✓ Progressive enhancement

---

# Final Principle

Three.js should make architecture feel tangible.

It should never become the focus of the website.

The visitor should leave remembering the projects, the spaces, and the studio—not the technology used to present them.
