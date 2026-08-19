# Content Strategy

---

# Purpose

Content is the foundation of the RAFA Design website.

Every page exists to communicate the studio's work through carefully structured visual storytelling.

Unlike traditional corporate websites, content is not secondary to the interface.

The interface exists to showcase the content.

Every design decision must elevate photography, architecture, motion, and narrative.

---

# Content Philosophy

The website should communicate through:

• Architecture
• Photography
• Motion
• Typography
• White space
• Minimal copy

Visitors should understand the studio before reading paragraphs.

Images always communicate first.

Words support the visuals.

---

# Content Hierarchy

Priority order:

1. Projects
2. Studio
3. Services
4. Process
5. Journal
6. Careers
7. Contact
8. Legal

Everything revolves around the projects.

---

# Content Categories

## Projects

Primary content of the website.

Each project includes:

- Title
- Subtitle
- Category
- Location
- Year
- Status
- Client
- Area
- Team
- Awards
- Services
- Description
- Hero image
- Gallery
- Drawings
- Videos
- Animations
- Related projects

Projects represent the portfolio.

---

## Studio

Explains who RAFA Design is.

Contains:

Studio story

Vision

Mission

Approach

Values

Team

Office

History

Design philosophy

---

## Services

Explains what the studio offers.

Possible services:

Architecture

Interior Design

Landscape

Master Planning

Urban Design

Furniture Design

Visualization

Consultancy

Research

Renovation

---

## Process

Explains how projects are executed.

Typical flow:

Discovery

Research

Concept

Development

Visualization

Documentation

Construction

Completion

---

## Journal

Editorial section.

Contains:

Articles

News

Awards

Talks

Events

Exhibitions

Research

Ideas

Travel

Publications

---

## Careers

Contains:

Open positions

Studio culture

Benefits

Internships

Application form

---

## Contact

Contains:

Office locations

Maps

Email

Phone

Social links

Inquiry form

---

# Content Types

The project uses only structured content.

Never hardcode long text inside components.

Content belongs inside:

src/content/

---

Example

content/

projects/

museum.ts

villa.ts

tower.ts

journal/

adaptive-reuse.ts

future-city.ts

services/

architecture.ts

interior.ts

company/

mission.ts

team.ts

---

# Project Content Model

Every project follows the same schema.

Project

↓

Metadata

↓

Hero

↓

Overview

↓

Gallery

↓

Technical Details

↓

Story

↓

Related Projects

↓

Credits

---

Example

Project

Hero Image

↓

Project Title

↓

Location

↓

Short Intro

↓

Image Gallery

↓

Architecture Story

↓

Technical Information

↓

Drawings

↓

Related Projects

---

# Writing Style

The writing should be:

Minimal

Confident

Editorial

Professional

Architectural

Avoid marketing language.

Avoid:

"We are the best."

"We deliver amazing projects."

Instead write:

"A residential project overlooking Lake Kivu that explores local materials and passive cooling."

Architecture should speak for itself.

---

# Image Strategy

Photography is the primary communication medium.

Every project should have:

Hero image

Gallery

Landscape photos

Portrait photos

Detail photography

Interior photography

Construction photography (optional)

Context photography

Drone photography (optional)

Images should never feel repetitive.

---

# Video Strategy

Videos are secondary storytelling.

Possible media:

Drone footage

Walkthroughs

Timelapses

Construction progress

Studio reels

Interviews

Ambient loops

Videos should autoplay silently when appropriate.

---

# 3D Strategy

Three.js should support storytelling.

Examples:

Building rotation

Site exploration

Environmental lighting

Material interaction

Exploded models

Parallax objects

3D must never replace real photography.

---

# Homepage Content

The homepage is a curated experience.

It does not explain everything.

Instead it introduces the studio through selected work.

Typical order:

Navigation

↓

Hero

↓

Featured Projects

↓

Selected Philosophy

↓

Featured Services

↓

Studio Preview

↓

Journal Preview

↓

Footer

Every section should encourage exploration.

---

# Project Listing

Projects are filterable.

Possible filters:

Architecture

Interior

Landscape

Planning

Research

Residential

Commercial

Hospitality

Education

Culture

Healthcare

Competition

Completed

In Progress

Concept

---

# Project Detail Pages

Each project tells a story.

Flow:

Hero

↓

Overview

↓

Large photography

↓

Story

↓

Technical information

↓

Drawings

↓

Gallery

↓

Related projects

↓

Next project

The experience should feel cinematic.

---

# Navigation Content

Navigation should remain concise.

Primary navigation:

Projects

Studio

Services

Process

Journal

Careers

Contact

Secondary navigation:

Search

Theme

Language (future)

---

# Footer Content

Footer should remain minimal.

Contains:

Office

Email

Social

Newsletter

Legal

Copyright

Back to top

No unnecessary widgets.

---

# SEO Content

Every page includes:

Title

Description

Open Graph

Twitter Card

Structured Data

Canonical URL

Social image

---

# Content Maintenance

Content should be easy to update.

Never duplicate content.

Every piece of content should exist only once.

Components consume content.

They do not own it.

---

# AI Content Rules

AI agents must:

Never invent project information.

Never hardcode text.

Reuse existing content files.

Keep copy concise.

Prefer visual storytelling over paragraphs.

Never duplicate project descriptions.

Always separate content from presentation.

---

# Future CMS

The architecture should allow migration to a CMS.

Possible future integrations:

Sanity

Contentful

Strapi

DatoCMS

Payload CMS

No component should depend directly on the CMS.

Components consume normalized data.

---

# Content Workflow

Research

↓

Content creation

↓

Review

↓

Photography

↓

Optimization

↓

Implementation

↓

QA

↓

Publishing

---

# Success Criteria

The content strategy is successful when:

Projects remain the focus.

Photography dominates the experience.

Typography supports the visuals.

Content is reusable.

Components remain presentation-only.

Every page feels editorial.

Every project tells a memorable story.

The website communicates quality before users read a single paragraph.
