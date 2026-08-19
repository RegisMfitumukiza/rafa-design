# Accessibility

## Philosophy

Accessibility is a core design principle.

Every visitor should be able to understand, navigate, and interact with the website regardless of their device, input method, or abilities.

The architecture of the website must be beautiful without creating unnecessary barriers.

Accessibility is considered during design, development, animation, content creation, and testing.

---

# Accessibility Goals

Target Lighthouse Accessibility Score

100

WCAG Compliance

WCAG 2.2 AA

Every page must pass accessibility validation before production.

---

# Semantic HTML

Always use semantic elements.

Examples

<header>

<nav>

<main>

<section>

<article>

<aside>

<footer>

Avoid unnecessary div wrappers.

Use semantic HTML before adding ARIA.

---

# Heading Structure

Each page must have one

<h1>

The hierarchy must never skip levels.

Correct

H1

H2

H3

H3

H2

Incorrect

H1

H3

H5

Headings must represent document structure rather than styling.

---

# Navigation

Every page must support complete keyboard navigation.

Users must be able to

Tab

Shift + Tab

Enter

Escape

Arrow Keys

where appropriate.

Focus must never become trapped.

Navigation should always remain predictable.

---

# Focus States

Never remove focus outlines.

Replace default outlines with branded focus styles.

Example

2px outline

4px offset

High contrast color

Focus must always be visible.

---

# Keyboard Support

Every interactive element must be reachable.

Buttons

Links

Forms

Dialogs

Menus

Project cards

Gallery controls

Filters

No interaction may rely solely on hover.

---

# Skip Navigation

Every page must include

Skip to Content

link.

Visible on focus.

Placed before the main navigation.

---

# Images

Every image requires meaningful alt text.

Decorative images

alt=""

Project photography

Describe architecture rather than colors.

Example

Good

"Concrete residential house overlooking the forest"

Bad

"Image"

---

# Icons

Icons that communicate meaning require labels.

Decorative icons

aria-hidden="true"

Interactive icons

aria-label

Example

Search

Close

Menu

Next Project

Previous Project

---

# Buttons

Buttons must describe actions.

Good

View Project

Contact Studio

Read Journal

Bad

Click Here

Learn More

Button sizes

Minimum

44px

touch target.

---

# Links

Links must clearly describe destinations.

Avoid

Read More

Click Here

Instead

Read the Studio Story

Explore Residential Projects

---

# Forms

Every input requires

<label>

Never rely only on placeholders.

Support

Autocomplete

Keyboard navigation

Error messages

Validation

Required fields

Accessible descriptions

---

# Form Errors

Errors must

Explain the issue

Explain how to fix it

Be announced by screen readers

Use

aria-live

where appropriate.

---

# Color Contrast

Minimum

WCAG AA

Text

4.5:1

Large text

3:1

Interactive elements

Clearly distinguishable.

Never communicate information using color alone.

---

# Motion

Animations should enhance storytelling.

Never create discomfort.

Respect

prefers-reduced-motion

If enabled

Disable

Parallax

Large transitions

Scroll effects

Three.js camera movement

GSAP timelines

Replace with subtle fades.

---

# Scroll Animations

Animations should never block content.

Content must remain readable even when animations fail.

Every page should work without JavaScript.

---

# Three.js Accessibility

3D scenes are decorative.

They must never contain essential information.

Provide accessible fallback content.

Allow animations to pause when required.

Limit excessive camera motion.

---

# Typography

Minimum body size

16px

Recommended

18px

Line height

1.5–1.8

Maximum readable width

70 characters

Never justify paragraphs.

---

# Responsive Accessibility

Touch targets

Minimum

44px

Spacing between interactive elements

Minimum

8px

Avoid accidental taps.

---

# Screen Readers

Every page should provide

Meaningful landmarks

Meaningful labels

Descriptive buttons

Proper heading hierarchy

Accessible form validation

Accessible navigation

---

# ARIA

Use ARIA only when HTML cannot solve the problem.

Incorrect

<div role="button">

Correct

<button>

ARIA supplements HTML.

It never replaces semantic HTML.

---

# Media

Videos

Captions

Optional transcripts

Controls accessible by keyboard

No autoplay with sound

Animations

Must pause when required

---

# Project Galleries

Gallery navigation must support

Keyboard

Screen readers

Touch

Mouse

Project images should announce

Project name

Location

Year

Category

when appropriate.

---

# Carousels

Avoid automatic rotation.

If autoplay exists

Provide

Pause

Play

Previous

Next

controls.

---

# Loading States

Loading indicators should announce themselves.

Example

Loading projects...

Use

aria-live="polite"

---

# Error Pages

404

Readable explanation

Return Home

View Projects

Search

No dead ends.

---

# Testing Checklist

Before production

✓ Keyboard navigation

✓ Screen reader testing

✓ Lighthouse Accessibility

✓ Color contrast testing

✓ Responsive testing

✓ Focus visibility

✓ Reduced motion

✓ Forms

✓ Navigation

✓ Images

---

# Accessibility Definition of Done

Accessibility is complete only when

✓ Lighthouse Accessibility = 100

✓ WCAG AA compliant

✓ Keyboard accessible

✓ Screen reader friendly

✓ Proper semantics

✓ Reduced motion supported

✓ Responsive

✓ High contrast

✓ Meaningful labels

✓ Focus management complete

Only then is the page considered production-ready.
