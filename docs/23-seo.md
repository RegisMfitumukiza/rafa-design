# SEO

## Philosophy

SEO is built into the architecture of the website.

It is not an afterthought.

Every page, project, article, and service should provide meaningful information for both users and search engines.

The objective is to create a website that is discoverable without compromising design quality.

The implementation should prioritize semantic HTML, structured content, performance, accessibility, and high-quality metadata.

---

# SEO Goals

Target Lighthouse SEO Score

100

Every public page must include

✓ Unique title

✓ Meta description

✓ Canonical URL

✓ Open Graph metadata

✓ Twitter metadata

✓ Structured data

✓ Sitemap inclusion

✓ Robots directives

---

# URL Structure

URLs should be human-readable.

Good

/

/projects

/projects/private-villa-kigali

/projects/museum-of-modern-art

/services

/studio

/journal

/journal/designing-for-tropical-climates

/contact

Avoid

?id=34

/project?id=1

/page-3

URLs should remain permanent whenever possible.

---

# Metadata

Every page must define

Title

Description

Keywords (optional)

Canonical URL

Open Graph

Twitter Card

Robots

Example

Title

Private Villa Kigali | RAFA Design

Description

A contemporary residence designed to maximize natural light, privacy, and landscape integration.

---

# Metadata Hierarchy

Global metadata

Defined inside

app/layout.tsx

Page-specific metadata

Generated inside each route

Projects

Generate metadata dynamically.

Journal

Generate metadata dynamically.

Services

Static metadata.

---

# Open Graph

Every page should include

Title

Description

Image

URL

Site Name

Locale

Type

Projects should use their own featured image.

Journal articles should use their own cover image.

---

# Twitter Cards

Use

summary_large_image

Every project should display

Project image

Title

Description

---

# Canonical URLs

Every page must define its canonical URL.

Prevent duplicate indexing.

Example

https://rafadesign.com/projects/private-villa-kigali

---

# Structured Data

Use Schema.org.

---

## Organization

Include

Studio name

Logo

Website

Contact information

Social links

---

## WebSite

Include

Website name

Search action (future)

---

## Project

Architecture projects should use appropriate CreativeWork schema.

Include

Project name

Description

Location

Completion year

Architect

Images

Category

---

## Article

Journal pages

Headline

Description

Author

Published date

Modified date

Featured image

---

## Breadcrumb

Every internal page should include breadcrumb schema.

Example

Home

Projects

Private Villa Kigali

---

# XML Sitemap

Automatically generate

sitemap.xml

Include

Projects

Journal

Services

Studio

Contact

Exclude

404

Admin pages

Draft content

---

# Robots

Generate

robots.txt

Allow

Public pages

Disallow

Private routes

Temporary preview routes

Development endpoints

---

# Images

Every image should include

Meaningful filename

Example

private-villa-kigali-living-room.webp

Avoid

image001.webp

Every image requires

Alt text

Width

Height

Lazy loading where appropriate

---

# Project SEO

Every project page should include

Project name

Location

Year

Category

Services provided

Short description

Long description

Photography credits

Awards (if applicable)

Client (if public)

Project gallery

Related projects

This creates highly indexable pages.

---

# Journal SEO

Every article should include

Title

Excerpt

Author

Publication date

Reading time

Categories

Tags

Featured image

Related articles

---

# Internal Linking

Projects should link to

Related projects

Relevant services

Journal articles

Studio page

Journal articles should link to

Projects

Services

Other articles

This creates a healthy internal linking structure.

---

# Headings

One H1 per page.

Follow semantic order.

H1

H2

H3

Avoid multiple H1 elements.

---

# Content Quality

Avoid keyword stuffing.

Write naturally.

Content should prioritize people first.

Search engines second.

Architecture should be described using

Materials

Context

Space

Landscape

Function

Light

Construction

Experience

rather than repetitive keywords.

---

# Performance and SEO

SEO depends on

Performance

Accessibility

Semantic HTML

Structured data

Fast loading

Mobile responsiveness

These are required.

---

# Social Sharing

Every page should generate

Open Graph image

Correct title

Correct description

Correct URL

Projects should have visually strong preview images.

---

# Future Features

Support

Multi-language SEO

Regional metadata

Automatic OG image generation

Project filtering pages

Tag pages

Search pages

---

# SEO Checklist

Before production

✓ Metadata

✓ Canonical

✓ Open Graph

✓ Twitter

✓ Structured data

✓ Sitemap

✓ Robots

✓ Semantic headings

✓ Alt text

✓ Internal links

✓ Lighthouse SEO

✓ Mobile friendly

✓ Fast loading

---

# Definition of Done

SEO is complete only when

✓ Lighthouse SEO = 100

✓ Every page has metadata

✓ Every project is indexable

✓ Structured data validates successfully

✓ Sitemap includes all public pages

✓ Robots configured correctly

✓ Open Graph previews display correctly

✓ URLs are permanent and readable

Only then is the page considered production-ready.
