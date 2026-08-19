# Naming Conventions

---

# Purpose

This document defines the official naming conventions for the RAFA Design codebase.

Every file, folder, variable, component, animation, hook, utility, route, content file and asset must follow these rules.

Consistency is mandatory.

---

# General Principles

The project follows one naming philosophy:

> Predictable > Clever

Names should describe purpose rather than implementation.

Good examples:

ProjectCard
NavigationMenu
HeroSection
ScrollIndicator
FeaturedProjects

Avoid names like:

Card2
ComponentA
Utils
DataThing
HelperFunctions
SectionOne

---

# Folder Naming

Folders always use:

kebab-case

Examples

components/
design-system/
project-gallery/
page-transition/
scroll-trigger/

Never use

Components
projectGallery
ProjectGallery
project_gallery

---

# File Naming

## React Components

PascalCase

Examples

ProjectCard.tsx

Navigation.tsx

Footer.tsx

Hero.tsx

ImageReveal.tsx

ProjectGrid.tsx

StudioTimeline.tsx

Never

projectCard.tsx

project-card.tsx

PROJECTCARD.tsx

---

## Hooks

camelCase beginning with use

Examples

useScrollProgress.ts

useLenis.ts

useWindowSize.ts

useCursor.ts

useMousePosition.ts

---

## Utilities

camelCase

Examples

formatDate.ts

generateSlug.ts

clampValue.ts

calculateOffset.ts

preloadImages.ts

---

## Constants

camelCase

Examples

navigationLinks.ts

breakpoints.ts

animationDurations.ts

---

## Types

PascalCase

Examples

Project.ts

Navigation.ts

ImageData.ts

AnimationConfig.ts

PageMetadata.ts

---

## Interfaces

Always PascalCase.

Prefix with I is NOT used.

Correct

Project

NavigationItem

HeroMedia

Wrong

IProject

INavigation

---

## Enums

PascalCase

Examples

ProjectCategory

ThemeMode

AnimationState

---

# Variables

camelCase

Examples

featuredProjects

activeProject

scrollProgress

currentSection

imageScale

Never

FeaturedProjects

featured_projects

FEATUREDPROJECTS

---

# Boolean Variables

Should answer a yes/no question.

Correct

isOpen

isLoaded

isHovered

isVisible

hasScrolled

canAnimate

shouldLoop

Wrong

open

loaded

hover

animation

---

# Functions

camelCase

Functions should begin with verbs.

Examples

calculateLayout()

generateMetadata()

preloadImages()

playAnimation()

pauseTimeline()

loadProjects()

sortProjects()

filterCategory()

---

# Async Functions

Start with verbs.

Examples

fetchProjects()

loadProject()

createProject()

updateProject()

deleteProject()

submitContactForm()

---

# React Components

PascalCase.

Every component represents exactly one UI responsibility.

Examples

Hero

Navigation

Footer

CursorFollower

ProjectGrid

ProjectCard

ImageReveal

SectionTitle

StudioStory

---

# Props Interface

ComponentNameProps

Example

interface HeroProps

interface ProjectCardProps

interface NavigationProps

Never

Props

HeroInterface

DataProps

---

# Event Handlers

Prefix with handle.

Examples

handleClick()

handleScroll()

handleResize()

handleHover()

handleOpenMenu()

---

# Animation Variables

GSAP timelines

tl

masterTl

heroTl

galleryTl

Never

timelineOne

animationThing

gsapAnimation

---

Animation states

isAnimating

animationProgress

scrollVelocity

currentFrame

---

# CSS Variables

Always

--rafa-

Examples

--rafa-background

--rafa-text

--rafa-accent

--rafa-border

--rafa-spacing-xl

--rafa-radius-lg

---

# Tailwind Utilities

Class ordering

Layout

Spacing

Sizing

Flex/Grid

Typography

Background

Border

Effects

Animation

State

Example

className="
flex
items-center
justify-between
px-8
py-6
text-sm
font-medium
bg-white
border
transition-colors
hover:bg-neutral-100
"

---

# Design Tokens

Use camelCase.

Examples

primaryColor

spacingXL

shadowSoft

animationDuration

gridColumns

---

# Assets

Images

kebab-case

Examples

hero-image.webp

project-cover.webp

living-room.webp

museum-night.webp

---

Videos

hero-video.mp4

studio-film.mp4

project-loop.mp4

---

3D Models

museum.glb

villa.glb

building.glb

---

Icons

arrow-right.svg

logo-symbol.svg

menu.svg

close.svg

---

# Routes

Always lowercase.

Always kebab-case.

Correct

/

projects

projects/museum

studio

contact

journal

careers

Wrong

Projects

ProjectDetails

aboutUs

OurStudio

---

# URL Slugs

Always lowercase.

Use hyphens.

Examples

museum-of-light

forest-house

urban-campus

cultural-center

---

# Content Files

Content collections

project-name.ts

Examples

museum-of-light.ts

villa-house.ts

city-library.ts

---

# Branch Naming

feature/navigation

feature/projects-page

feature/home-animation

feature/footer

fix/mobile-menu

fix/page-transition

docs/design-system

docs/component-architecture

refactor/navigation

performance/images

---

# Commit Messages

Follow Conventional Commits.

Examples

feat: add project gallery

feat: implement page transitions

fix: correct navbar overlap

fix: optimize image loading

refactor: simplify animation manager

docs: update component architecture

style: improve spacing scale

chore: update dependencies

---

# Environment Variables

Uppercase.

Prefix with NEXT_PUBLIC when exposed to the client.

Examples

NEXT_PUBLIC_SITE_URL

NEXT_PUBLIC_CMS_URL

NEXT_PUBLIC_GA_ID

DATABASE_URL

---

# Import Order

1. React / Next

2. External Libraries

3. Internal Aliases

4. Relative Imports

5. Types

6. Styles

Example

import Link from "next/link"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/Button"

import { ProjectCard } from "@/features/projects/ProjectCard"

import type { Project } from "@/types/Project"

import "./styles.css"

---

# AI Naming Rules

AI agents must never invent names.

Before creating anything:

1. Search for an existing component.

2. Reuse existing names.

3. Do not duplicate functionality.

4. Do not abbreviate names.

5. Keep naming consistent across the project.

If an existing name already represents the concept, reuse it.

---

# Summary

The entire codebase follows:

- Folders → kebab-case
- React Components → PascalCase
- Types → PascalCase
- Interfaces → PascalCase
- Variables → camelCase
- Functions → camelCase
- Hooks → useSomething
- Event Handlers → handleSomething
- CSS Variables → --rafa-*
- Assets → kebab-case
- Routes → kebab-case
- Branches → feature/*
- Commits → Conventional Commits

These conventions are mandatory for every contributor and every AI agent.
