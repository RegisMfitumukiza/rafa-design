# Product Roadmap

## Purpose

This document defines the complete implementation roadmap for the RAFA Design platform.

It is the primary planning document that describes:

- what will be built
- when it will be built
- what is included in Version 1.0
- what is postponed
- what belongs to future releases

This roadmap prevents feature creep while ensuring every feature contributes to a cohesive, premium architecture experience.

The roadmap should be updated throughout development.

---

# Product Vision

RAFA Design is not intended to be a conventional corporate website.

It is a digital architectural experience.

The website should communicate the quality of the studio before a visitor ever makes contact.

Every page should feel like a carefully designed architectural publication where typography, imagery, motion, white space, and interaction work together to tell stories.

Technology should always support the architecture—not compete with it.

---

# Current Status

Project Status

🟡 Active Development

Current Version

v0.1

Target Release

Version 1.0

Primary Stack

• Next.js
• React
• TypeScript
• Tailwind CSS
• GSAP
• Lenis
• Three.js
• Vercel

Content platform

• Static content layer (`src/content/`) — see ADR-019

---

# Version 1.0 Goal

Deliver a complete premium architecture platform within approximately three weeks.

Version 1.0 must feel production-ready.

It should include every feature necessary for the studio to publish projects, communicate its philosophy, and generate client inquiries.

The objective is quality—not simply completion.

---

# Timeline

## Week 1 — Foundation

Objective

Build the technical and visual foundation.

Deliverables

✓ Project architecture

✓ Design system

✓ Typography system

✓ Color system

✓ Layout system

✓ Navigation

✓ Footer

✓ Global animations

✓ Responsive grid

✓ Base components

✓ Utility components

✓ Motion infrastructure

✓ Three.js foundation

✓ CMS setup

✓ Cloudinary setup

✓ SEO foundation

✓ Accessibility foundation

---

## Week 2 — Platform Development

Objective

Build every public-facing page.

Deliverables

✓ Homepage

✓ Projects

✓ Project Detail

✓ Services

✓ Studio

✓ Process

✓ Journal

✓ Contact

✓ Careers

✓ Search

✓ Filtering

✓ Content integration

✓ Responsive optimization

✓ Mobile experience

✓ Tablet experience

---

## Week 3 — Polish & Production

Objective

Transform the website into a premium production experience.

Deliverables

✓ Performance optimization

✓ Animation refinement

✓ Three.js optimization

✓ Accessibility review

✓ SEO completion

✓ Structured metadata

✓ Image optimization

✓ Loading states

✓ Error handling

✓ Testing

✓ Browser compatibility

✓ Production deployment

---

# Version 1.0 Deliverables

## Core Pages

✓ Homepage

✓ Projects

✓ Project Detail

✓ Services

✓ Studio

✓ Process

✓ Journal

✓ Careers

✓ Contact

---

## Content

✓ Static content layer (ADR-019)

✓ Rich content blocks

✓ Project management

✓ Journal management

✓ Team management

✓ SEO fields

> CMS (Sanity), Portable Text, Draft Mode, and Preview Mode are removed from Version 1.0 scope. See ADR-019.
>
> **Post Version 1.0 plan:** Sanity CMS will be introduced for real-world content publishing. The static content layer (`src/content/`) stays as the demo source until then — components already consume normalized models (`ImageAsset`, etc.), so swapping the data source to Sanity queries requires no component changes.

---

## Media

✓ Local media pipeline (`next/image`)

✓ Responsive images

✓ Image galleries

✓ Lazy loading

✓ Optimized delivery

> Cloudinary and Video Delivery are deferred — they require external credentials. See ADR-019.
>
> **Post Version 1.0 plan:** Cloudinary will be added for media delivery if it integrates well with the Sanity CMS integration (Sanity stores assets, Cloudinary optimizes/delivers them). Generated placeholders in `public/images/**` act as the demo imagery until real client photography is uploaded.

---

## Motion

✓ GSAP

✓ Lenis

✓ Scroll animations

✓ Page transitions

✓ Image reveals

✓ Text reveals

✓ Section transitions

✓ Loading experience

✓ Micro interactions

---

## Three.js

✓ Hero scene

✓ Lightweight interactions

✓ Performance optimization

✓ Mobile fallback

✓ Progressive enhancement

---

## Performance

✓ Lighthouse optimization

✓ Core Web Vitals

✓ Responsive images

✓ Code splitting

✓ Lazy loading

✓ Prefetching

✓ Bundle optimization

---

## Accessibility

✓ Keyboard navigation

✓ Semantic HTML

✓ Color contrast

✓ Focus management

✓ Screen reader support

✓ Reduced motion

---

## SEO

✓ Metadata

✓ Open Graph

✓ Structured data

✓ Sitemap

✓ Robots

✓ Canonical URLs

✓ Dynamic metadata

---

## Deployment

✓ Production deployment

✓ Analytics

✓ Monitoring

✓ Error logging

✓ Performance monitoring

---

# Version 1.1

The following features may be added after Version 1.0 if they improve the visitor experience.

Possible additions

• Advanced Three.js storytelling

• Sanity CMS integration for content publishing

• Cloudinary media delivery (if it pairs well with Sanity)

• Interactive project explorer

• Project timeline visualization

• Material exploration

• Spatial navigation

• Interactive maps

• Project comparison

These features should only be implemented if they improve storytelling without reducing performance.

---

# Version 2.0

These features are intentionally postponed until the studio requires them.

Possible future additions

• Client portal

• Password protected projects

• Private presentations

• Project documentation portal

• Consultation booking

• Client dashboards

• Authentication

These are business features rather than portfolio features.

---

# AI Roadmap

Artificial Intelligence is intentionally postponed until after Version 1.0.

Possible capabilities

• AI-assisted project search

• Intelligent recommendations

• Natural language navigation

• Project similarity

• Visual search

AI must enhance discovery without replacing traditional navigation.

---

# Explicitly Out of Scope

The following features are intentionally excluded from Version 1.0.

✗ Payments

✗ Shopping cart

✗ User accounts

✗ Notifications

✗ Multi-language

✗ E-commerce

✗ Complex dashboards

✗ Community features

✗ Messaging

✗ Comments

✗ Social feeds

These features introduce unnecessary complexity and are not aligned with the studio's immediate goals.

---

# Success Criteria

Version 1.0 is considered successful when visitors can:

✓ Understand the studio's philosophy

✓ Explore projects effortlessly

✓ Experience refined motion

✓ Navigate intuitively

✓ Read comfortably

✓ Contact the studio easily

✓ Enjoy exceptional performance

✓ Access the website on any device

✓ Experience a memorable digital presentation

---

# Product Principles

Every implementation decision should satisfy the following questions:

- Does it improve storytelling?
- Does it improve usability?
- Does it respect the design system?
- Does it improve performance?
- Does it maintain simplicity?
- Does it reflect architectural thinking?
- Is it maintainable?
- Is it production-ready?

If the answer to any of these questions is "No", the feature should be reconsidered.

---

# Long-Term Vision

The long-term ambition is to create one of the finest architecture websites on the web.

The platform should become a benchmark for:

• Editorial storytelling

• Elegant typography

• Cinematic motion

• Architectural presentation

• Performance

• Accessibility

• Design craftsmanship

Every interaction should feel intentional.

Every animation should have meaning.

Every page should communicate the studio's philosophy through design rather than explanation.

The website itself should become a demonstration of architectural thinking.
