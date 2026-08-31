# Content Models

---

# Purpose

This document defines the data structures used throughout the RAFA Design website.

All content must follow these models.

Components should consume content models.

Components should never define their own content structure.

---

# Content Architecture Principle

The project follows:

Content → Data Model → Component → Page

Example:

Project Data

↓

Project Model

↓

ProjectCard Component

↓

Projects Page

---

# General Rules

All content models must:

- Be strongly typed.
- Be reusable.
- Separate content from presentation.
- Support future CMS integration.
- Avoid duplicated structures.
- Remain independent from UI components.

---

# Project Model

Projects are the primary content of the website.

Every project follows this structure.

```ts
interface Project {
  id: string;

  slug: string;

  title: string;

  subtitle?: string;

  category: ProjectCategory[];

  status: ProjectStatus;

  year: number;

  location: Location;

  client?: string;

  description: string;

  story?: string;

  heroImage: ImageAsset;

  gallery: ImageAsset[];

  drawings?: Drawing[];

  videos?: VideoAsset[];

  model3D?: ModelAsset;

  services: ServiceReference[];

  details?: ProjectDetails;

  awards?: Award[];

  team?: TeamReference[];

  relatedProjects?: string[];

  featured: boolean;
}
```

---

# Project Categories

```ts
type ProjectCategory =
  | "architecture"
  | "interior"
  | "landscape"
  | "urban-design"
  | "master-planning"
  | "research"
  | "renovation"
  | "visualization";
```

---

# Project Status

```ts
type ProjectStatus = "completed" | "ongoing" | "concept" | "competition";
```

---

# Project Details

Technical project information.

```ts
interface ProjectDetails {
  area?: string;

  site?: string;

  materials?: string[];

  sustainability?: string[];

  duration?: string;

  construction?: string;
}
```

---

# Location Model

```ts
interface Location {
  city: string;

  country: string;

  coordinates?: {
    latitude: number;

    longitude: number;
  };
}
```

---

# Image Model

All images follow a common structure.

```ts
interface ImageAsset {
  src: string;

  alt: string;

  width?: number;

  height?: number;

  caption?: string;

  credit?: string;
}
```

---

# Drawing Model

Architectural drawings.

```ts
interface Drawing {
  type: "plan" | "section" | "elevation" | "diagram";

  src: string;

  title?: string;

  description?: string;
}
```

---

# Video Model

```ts
interface VideoAsset {
  src: string;

  poster?: string;

  title?: string;

  autoplay?: boolean;

  muted?: boolean;
}
```

---

# 3D Model

Used for Three.js experiences.

```ts
interface ModelAsset {
  src: string;

  format: "glb" | "gltf";

  scale?: number;

  position?: {
    x: number;

    y: number;

    z: number;
  };
}
```

---

# Service Model

Services represent studio capabilities. The model is the single source of truth for both the discipline index (`/services`) and each discipline's detail page (`/services/[slug]`).

```ts
interface ServiceApproach {
  title: string;
  statement: string;
}

interface Service {
  id: string;

  slug: string;

  title: string;

  /** Punchy one-line description used on index rows and search */
  shortDescription: string;

  /** Large editorial statement shown at the top of the detail page */
  intro: string;

  /** Long-form editorial description of how RAFA approaches this discipline */
  description: string;

  /** Numbered methodological approach points for the detail page */
  approach: ServiceApproach[];

  icon?: string;

  relatedProjects: string[];
}
```

Helpers exported from `src/content/services/index.ts`:

- `getServices()` / `getServiceBySlug(slug)` — all services / single lookup.
- `getRelatedProjectsForService(service)` — the discipline's project evidence (`relatedProjects`).
- `getServiceIndex(slug)` — zero-padded discipline number ("01"–"06") for overlines.
- `getRelatedServicesForService(service)` — disciplines sharing project evidence with the given one, strongest first, skipping itself. Empty when the discipline has no shared evidence (e.g. Urban Design, Consulting).

`ServiceCard`/`ServicesGrid` were removed with the editorial redesign (2026-08-13) — see `docs/08-component-inventory.md`.

---

# Available Services

Initial services:

```ts
type ServiceCategory =
  | "architecture"
  | "interior-design"
  | "landscape-design"
  | "urban-design"
  | "master-planning"
  | "renovation"
  | "visualization"
  | "consulting";
```

---

# Studio Model

Represents the identity of the studio.

```ts
interface StudioPrinciple {
  code: string;

  title: string;

  statement: string;
}

interface WorkingMethod {
  code: string;

  title: string;

  description: string;
}

interface ClientSector {
  code: string;

  title: string;

  description: string;

  projects?: string[];
}

interface Studio {
  name: string;

  overline: string;

  manifesto: string;

  introduction: string;

  philosophy: string;

  beliefs: StudioPrinciple[];

  workingMethods: WorkingMethod[];

  history?: string;

  images: ImageAsset[];

  visit: {
    overline: string;

    heading: string;

    body: string;

    visits: string;
  };
}
```

Separate collections: `teamMembers: TeamMember[]`, `awards: Award[]` (with `project?` and `citation?`), `timeline: TimelineEvent[]`, `timelineIntro: string`, `clientSectors: ClientSector[]`, `clientReferencesNote: string`.

---

# Team Member Model

```ts
interface TeamMember {
  id: string;

  name: string;

  role: string;

  biography: string;

  image: ImageAsset;

  disciplines?: string[];

  experience?: number;

  interests?: string[];

  socialLinks?: SocialLink[];
}
```

---

# Social Link Model

```ts
interface SocialLink {
  platform: "instagram" | "linkedin" | "behance" | "pinterest" | "x";

  url: string;
}
```

---

# Process Model

Represents the studio workflow.

```ts
interface ProcessStep {
  id: string;

  title: string;

  description: string;

  order: number;

  visual?: ImageAsset;
}
```

A `processHero: ImageAsset` export provides the lead plate for `/process` ("work in progress" — reuses the studio's material samples and study models). Phase titles/descriptions are never invented in the UI; the content model remains the single source of truth.

Example:

```
Research

↓

Concept

↓

Design Development

↓

Documentation

↓

Construction

↓

Completion
```

---

# Journal Article Model

Editorial content.

```ts
interface JournalArticle {
  id: string;

  slug: string;

  title: string;

  excerpt: string;

  content: string;

  coverImage: ImageAsset;

  author?: string;

  publishedAt: string;

  category: JournalCategory;

  relatedProjects?: string[];
}
```

---

# Journal Categories

```ts
type JournalCategory = "news" | "research" | "awards" | "events" | "ideas" | "publications";
```

---

# Career Model

```ts
interface CareerPosition {
  id: string;

  title: string;

  location: string;

  type: "full-time" | "internship" | "contract";

  description: string;

  requirements: string[];
}
```

---

# Contact Model

```ts
interface ContactInformation {
  email: string;

  phone?: string;

  address?: string;

  offices?: Office[];
}
```

---

# Office Model

```ts
interface Office {
  city: string;

  country: string;

  address: string;

  coordinates?: {
    latitude: number;

    longitude: number;
  };
}
```

---

# Navigation Model

Navigation is data-driven.

```ts
interface NavigationItem {
  label: string;

  href: string;

  children?: NavigationItem[];

  external?: boolean;
}
```

---

# Footer Model

```ts
interface FooterSection {
  title: string;

  links: FooterLink[];
}

interface FooterLink {
  label: string;

  href: string;

  external?: boolean;
}
```

---

# SEO Model

Every page supports metadata.

```ts
interface SEO {
  title: string;

  description: string;

  keywords?: string[];

  image?: ImageAsset;

  canonical?: string;
}
```

---

# Page Model

Every major page can define:

```ts
interface PageContent {
  title: string;

  description?: string;

  seo: SEO;

  sections: PageSection[];
}
```

---

# Section Model

Pages are composed from sections.

```ts
interface PageSection {
  type: string;

  content: unknown;
}
```

Examples:

```
HeroSection

ProjectGrid

StudioIntroduction

ServicesGrid

JournalPreview

ContactSection
```

---

# Site Settings Model

Global site-wide configuration (Sanity `siteSettings` singleton). Maps to `SiteSettings` in `src/content/siteSettings.ts` and the `siteSettings` schema.

```ts
interface SiteSettings {
  id: string;

  siteName: string;

  description: string;

  maintenanceMode: boolean;

  tagline?: string;

  siteUrl?: string;

  email?: string;

  phone?: string;

  analyticsCode?: string;

  maintenanceMessage?: string;

  defaultSeo?: {
    title?: string;

    description?: string;

    keywords?: string[];

    ogImage?: ImageAsset;
  };
}
```

All optional fields exist to satisfy `exactOptionalPropertyTypes`.

---

# Content Location

All static content belongs inside:

```
src/content/
```

Structure:

```
content/

projects/

services/

studio/

journal/

company/

navigation/

footer/
```

---

# Future CMS Compatibility

These models should be compatible with future CMS migration.

Possible systems:

- Sanity
- Contentful
- Payload
- Strapi
- Directus

Components should consume normalized models, not CMS responses.

---

# AI Implementation Rules

AI agents must:

- Never invent new content models.
- Never put content directly inside components.
- Reuse existing interfaces.
- Ask before changing schemas.
- Keep content separate from presentation.
- Maintain compatibility with future CMS migration.

---

# Success Criteria

The content architecture is successful when:

✓ Projects can scale from 5 to 500.

✓ Content can move to a CMS.

✓ Components remain reusable.

✓ Pages remain flexible.

✓ AI can generate consistent implementations.

✓ Content remains the focus of the experience.

---

# Guiding Principle

> Structure the content once. Present it many ways.
