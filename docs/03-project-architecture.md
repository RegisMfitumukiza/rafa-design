# Project Architecture

---

# Purpose

This document defines the architectural philosophy of the RAFA Design website.

The goal is not simply to organize files.

The goal is to create a scalable architecture capable of supporting:

- many pages
- premium animations
- 3D experiences
- future CMS integration
- future multilingual support
- future client dashboard
- future project management
- future hiring portal

without ever needing to restructure the project.

Architecture always comes before implementation.

---

# Architectural Philosophy

The project follows five major principles.

## 1. Feature First

Everything should be grouped by feature whenever possible.

Instead of placing unrelated files together, every major feature owns its own logic.

Example

Navigation

contains

- components
- hooks
- animations
- styles
- utilities

inside one feature.

This makes features portable and easier to maintain.

---

## 2. Shared Design System

Every page must use the same design language.

Nothing should contain hardcoded values.

Never write

padding: 64px

Instead

spacing.xxxl

Never write

font-size: 72px

Instead

typography.display

Never write

#000

Instead

colors.text.primary

Every visual value originates from the Design System.

---

## 3. Component Driven Development

Everything should become reusable.

Instead of building pages,

build components.

Pages are only compositions of components.

Example

Landing page

↓

Hero

↓

Heading

↓

Button

↓

Container

↓

Motion Wrapper

↓

Typography

Everything is layered.

---

## 4. Separation of Responsibilities

Every folder has one responsibility.

Examples

content/

contains text

components/

contains reusable UI

features/

contains business features

motion/

contains reusable GSAP logic

services/

contains API requests

config/

contains application configuration

design-system/

contains tokens

Nothing should have mixed responsibilities.

---

## 5. Progressive Complexity

Never introduce complexity too early.

The project grows in layers.

Foundation

↓

Components

↓

Layouts

↓

Pages

↓

Animations

↓

Interactions

↓

3D

↓

CMS

↓

Optimization

The architecture must support this growth naturally.

---

# Application Layers

The application is divided into layers.

Layer 1

Foundation

Includes

- Next.js
- React
- TypeScript
- Tailwind
- ESLint
- Prettier

---

Layer 2

Design System

Contains

- colors
- typography
- spacing
- radius
- shadows
- motion
- breakpoints
- containers

Nothing bypasses this layer.

---

Layer 3

Reusable Components

Buttons

Cards

Images

Typography

Containers

Grid

Media

Navigation Elements

etc.

---

Layer 4

Features

Features combine multiple reusable components.

Example

Navigation Feature

contains

Desktop Navigation

Mobile Navigation

Navigation Animations

Navigation Hooks

Navigation State

---

Layer 5

Pages

Pages assemble features.

Example

Home

↓

Hero Feature

↓

Projects Feature

↓

Studio Feature

↓

Footer Feature

---

Layer 6

Motion

Motion exists independently.

Animations never live directly inside components unless they are tiny.

Reusable animations belong inside

motion/

or

animations/

---

Layer 7

ThreeJS

3D experiences remain isolated.

Never mix ThreeJS logic inside ordinary UI.

---

# Folder Responsibilities

## app/

Next.js routing only.

Contains

- layouts
- route files
- metadata

Business logic should not live here.

---

## assets/

Stores static assets.

Images

Icons

Videos

Models

Fonts

---

## components/

Pure reusable UI.

Never contains page-specific logic.

---

## features/

Large application sections.

Hero

Projects

Studio

Journal

Navigation

Footer

etc.

---

## sections/

Page compositions.

A page imports sections.

A section imports features.

---

## content/

Static content.

Project descriptions

Studio text

Navigation labels

Footer links

Journal metadata

No JSX.

---

## design-system/

Single source of truth.

Every design value originates here.

---

## motion/

Reusable GSAP animations.

Timeline builders

Scroll triggers

Reveal animations

Parallax

Text animations

etc.

---

## services/

External communication.

Future CMS

Analytics

Email

APIs

---

## providers/

React providers.

Theme

Lenis

GSAP

Three

Context Providers

---

## hooks/

Reusable custom hooks.

---

## lib/

Generic utilities.

---

## utils/

Pure helper functions.

---

## config/

Configuration.

Routes

SEO

Navigation

Metadata

Site Information

---

# Routing Philosophy

Every page is independent.

/

Projects

/projects

Project Details

/projects/[slug]

Studio

/studio

Services

/services

Process

/process

Journal

/journal

Article

/journal/[slug]

Careers

/careers

Contact

/contact

Privacy

/privacy

404

/not-found

Pages should remain lightweight.

Business logic belongs inside Features.

---

# Data Flow

Design System

↓

Components

↓

Features

↓

Sections

↓

Pages

↓

App Router

The flow is always one direction.

No circular dependencies.

---

# Dependency Rules

Components may use

Design System

Utilities

Hooks

Motion

Features may use

Components

Motion

Content

Hooks

Pages may use

Features

Sections

Content

Layouts

Features should never import Pages.

Components should never import Pages.

The dependency graph must always move downward.

---

# Scalability

The architecture should comfortably support:

100+

projects

Multiple journals

CMS

Headless APIs

Dark mode

Localization

ThreeJS

GSAP

Large image libraries

Video backgrounds

Interactive maps

Awards

Studio timeline

Careers

Without requiring architectural changes.

---

# Future Ready

The architecture intentionally prepares for

Contentful

Sanity

Prismic

Strapi

DatoCMS

GraphQL

REST APIs

Image CDN

Cloudinary

Vercel Blob

AI search

Filtering

Search

Infinite scrolling

Progressive loading

without changing the folder structure.

---

# Architectural Principles

Always prefer

composition over inheritance

reuse over duplication

configuration over hardcoding

tokens over raw values

features over page logic

motion over CSS hacks

clarity over cleverness

consistency over novelty

Architecture should remain understandable even years from now.
