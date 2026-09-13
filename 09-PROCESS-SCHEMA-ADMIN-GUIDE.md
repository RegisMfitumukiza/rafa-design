# Process Page Schema — Complete Admin Guide

**For:** Studio leadership, marketing, and content directors  
**Purpose:** Know how to explain your design methodology through the 6-phase process  
**Location:** `/admin → "09 // Process 🔄"`

---

## Overview

The Process Page is a **singleton** (only one exists) that controls the entire `/process` page. It displays:

- **Hero section** with methodology intro
- **6 sequential phases** of your design process (Discovery → Built)
- **Built Proof transition** linking process to completed projects
- **Closing CTA** for project inquiries

**Total Tabs:** 5 sections  
**Estimated time to fill:** 30-45 minutes  
**Difficulty:** Medium (requires clear thinking about your process)

---

## Why Process Matters

The process page communicates:

- ✅ Your design methodology and approach
- ✅ How clients work with you step-by-step
- ✅ What to expect at each phase
- ✅ Transparency about your practice
- ✅ Professionalism and thoroughness

---

## Tab-by-Tab Breakdown

---

# 01 // HERO & INTRO

### What This Tab Does

Defines the **opening section** of the process page (hero image, intro statement).

---

## Field 1: Hero Overline

**Field Name:** `heroOverline` (Optional, text)

**What to enter:**

```
Section label above hero title.
Brief contextual phrase.
```

**Examples:**

```
✅ GOOD:
├─ "Specification // Methodology"
├─ "How We Work"
├─ "Our Approach"
└─ "Design Process"

❌ AVOID:
├─ Too long (defeats purpose)
└─ Vague or unclear
```

**Real Example:**

```
Hero Overline: "Specification // Methodology"
```

---

## Field 2: Hero Title

**Field Name:** `heroTitle` (Required, text)

**What to enter:**

```
Main heading of process page.
What this page is about.
Large, prominent display.
```

**Examples:**

```
✅ GOOD:
├─ "Methodology"
├─ "Our Process"
├─ "How We Design"
├─ "Design Sequence"
└─ "From Brief to Building"

❌ AVOID:
├─ "Process Page" (too generic)
├─ Too long or complex
└─ Unclear meaning
```

**Real Example:**

```
Hero Title: "Methodology"
```

---

## Field 3: Hero Description

**Field Name:** `heroDescription` (Required, text)

**What to enter:**

```
Lead editorial statement.
Explains your architectural methodology.
Sets context for phases.
```

**Length:**

- 400-500 characters
- 3-5 sentences
- Comprehensive but readable

**Examples:**

```
Description 1:
"Our design methodology is a disciplined sequence. We begin
with deep listening: understanding site, client, context, and
constraints. From this research emerges concept. Concept is
developed, refined, and tested. Documentation translates design
intent for builders and craftspeople. Construction oversight
ensures quality and fidelity. Each phase builds on the last.
The result is architecture that responds to its specific place."

---

Description 2:
"Design is a process, not a moment. We move through phases
methodically: discovery, design, documentation, and built
oversight. Discovery establishes understanding. Design creates
solutions. Documentation ensures clarity. Built oversight
guarantees execution. We believe that transparency about this
process builds client confidence and results in better outcomes."

---

Description 3:
"Architecture emerges through disciplined methodology. We research
thoroughly before designing. We develop concepts iteratively,
testing ideas through sketches, models, and digital tools. We
document with precision so builders understand intent. We oversee
construction to ensure quality. This sequential approach—research,
design, documentation, built—results in architecture that responds
to place and improves how people live."
```

**Tips:**

- Explain your philosophy about design process
- Be honest about phases you actually go through
- Show why methodology matters
- Avoid being too technical or jargon-heavy

**Real Example:**

```
Hero Description: "Our design methodology is a disciplined
sequence. We begin with deep listening—understanding site,
client, context, and constraints. From this research emerges
concept, which is developed and refined through iteration.
Documentation translates design intent for builders and
craftspeople. Construction oversight ensures quality and
fidelity to design. Each phase builds on the last. The result
is architecture that responds to its specific place."
```

---

## Field 4: Hero Image (Work in Progress)

**Field Name:** `heroImage` (Optional, image)

**What to enter:**

```
Opening photograph representing "work in progress."
Shows studio practice, design work, or methodology.
Full-width hero plate.
```

**What makes a good hero image:**

```
✅ GOOD:
├─ Material samples and study models at work table
├─ Sketches, drawings, design work in progress
├─ Team collaborating and discussing design
├─ Work-in-progress construction or model
├─ Design tools and methodology artifacts
├─ Hands-on craft or detailed work
└─ Natural, authentic studio moment

❌ AVOID:
├─ Finished building (save for Built Proof)
├─ Generic or stock-looking
├─ Too polished or staged
└─ Unclear connection to process
```

**Sub-fields:**

### Alt Text (required for accessibility)

```
Accessibility description.

Example:
"Material samples and architectural models on work table
during design development"
```

### Caption (optional)

```
Text displayed under image.

Examples:
├─ "Material samples and study models at the work table"
├─ "Design in progress"
└─ "Where methodology becomes form"
```

**Real Example:**

```
Hero Image:
├─ File: process-hero-image.jpg (2400x1600px)
├─ Alt Text: "Material samples and architectural models
│            on studio work table during design development"
└─ Caption: "Material samples and study models at the work table"
```

---

# 02 // METHODOLOGY STEPS

### What This Tab Does

Defines the **6-phase sequence** of your design process.

---

## Field: Methodology Steps (array)

**Field Name:** `steps` (Required, array)

**What to enter:**

```
The sequence of phases in your methodology.
Typically 5-6 phases from discovery to built.
Each phase: order, title, duration, description, deliverables, visual.
```

**Structure for each phase:**

### Phase Number (required)

```
Sequential order (1, 2, 3, etc.).

Typically:
├─ 1 = Discovery / Research
├─ 2 = Concept Development
├─ 3 = Design Development
├─ 4 = Documentation / Specifications
├─ 5 = Construction / Built
└─ 6 = Post-Occupancy (optional)
```

### Phase Title (required)

```
Name of this phase.

Examples:
├─ "Discovery"
├─ "Concept Development"
├─ "Design Development"
├─ "Documentation"
├─ "Construction & Oversight"
└─ "Completion & Evaluation"
```

### Duration (optional)

```
Typical timeframe for this phase.

Examples:
├─ "4 – 8 weeks"
├─ "2 – 3 months"
├─ "6 months"
├─ "12 – 18 months"
└─ "Variable"
```

### Description (required, 800 chars max)

```
Detailed narrative of what happens in this phase.
What activities, goals, and focus areas.

Examples:

PHASE 1: Discovery
"Discovery is foundational. We spend weeks understanding the site:
visiting at different times of day, studying light patterns,
understanding topography, climate, geology. We interview the client:
their vision, constraints, values, program requirements. We study
regulations and precedents. We analyze existing structures and
infrastructure. From this deep research emerges a comprehensive
understanding that informs all subsequent design. We document
findings in site analysis, interviews, and regulatory summaries."

---

PHASE 2: Concept Development
"With understanding established, concept emerges. We develop multiple
design directions, testing different approaches to site, program,
and form. Concepts are presented through sketches, simple models,
and renderings. We gather client feedback on direction. We discuss
strengths and weaknesses of each approach. Concept is refined based
on feedback. A clear design direction emerges and is approved by
the client."

---

PHASE 3: Design Development
"The approved concept is now developed fully. Spatial relationships
are detailed. Material palettes are established. Structural systems
are designed. Systems integration is worked through. Multiple
iterations are tested digitally and through physical models. Regular
client meetings track progress. Design is refined and documented in
increasingly detailed drawings. By phase end, the design vision is
crystalline and ready for technical specifications."

---

PHASE 4: Documentation & Specifications
"Design intent is now translated for builders and craftspeople.
Construction documents are produced: floor plans, sections, details,
specifications. Every element is specified: materials, dimensions,
finishes, performance requirements. Consultant documentation
(structural, MEP, landscape) is coordinated. Specifications are
reviewed by builders and consultants. Questions are resolved.
Construction documents are finalized and ready for bidding or
construction administration."

---

PHASE 5: Construction & Oversight
"Now the building is made. Our team visits the site regularly. We
track progress and resolve questions that arise on site. We approve
material samples before installation. We troubleshoot problems while
maintaining design intent. We ensure quality craftsmanship and
attention to detail. We coordinate between trades. Regular site
meetings keep the project on track. By project completion, the
building reflects our design vision."

---

PHASE 6: Completion & Evaluation (Optional)
"The building is complete. Clients move in and inhabit the space.
We follow up: How is the building performing? Are there issues to
resolve? How do spaces feel in use? Do they function as intended?
We gather feedback. We learn. We document lessons for future work."
```

### Key Deliverables (optional, array)

```
Tags describing what is produced in this phase.

Examples:

PHASE 1 Deliverables:
├─ Site Analysis
├─ Client Interviews
├─ Regulatory Summary
└─ Program Summary

---

PHASE 2 Deliverables:
├─ Concept Sketches
├─ Design Renderings
├─ Study Models
└─ Concept Presentation

---

PHASE 3 Deliverables:
├─ Design Drawings
├─ Material Palette
├─ 3D Models
└─ Detailed Specifications

---

PHASE 4 Deliverables:
├─ Construction Documents
├─ Technical Specifications
├─ Consultant Coordination
└─ Bid-ready Drawings

---

PHASE 5 Deliverables:
├─ Site Oversight
├─ Quality Approval
├─ Material Samples
└─ RFI Resolution

---

PHASE 6 Deliverables (Optional):
├─ Post-Occupancy Evaluation
├─ Client Feedback
├─ Performance Documentation
└─ Lessons Learned
```

### Evidence Plate (optional, image)

```
Full-width photo illustrating this phase.
Shows the work or deliverables of the phase.

Examples:

PHASE 1 Image:
├─ Site study photographs
├─ Client meeting documentation
└─ Research materials and notes

---

PHASE 2 Image:
├─ Concept sketches photographed
├─ Study model detail
├─ Rendering or digital concept
└─ Design team collaborating

---

PHASE 3 Image:
├─ Detailed drawings/technical documentation
├─ Material samples organized
├─ 3D model photography
└─ Design refinement in progress

---

PHASE 4 Image:
├─ Construction documents spread
├─ Specification sheets
├─ Detail drawings
└─ Coordination with consultants

---

PHASE 5 Image:
├─ Construction site photography
├─ Material installation detail
├─ Quality oversight moment
└─ Craftspeople at work

---

PHASE 6 Image (Optional):
├─ Completed building exterior
├─ Interior space in use
├─ Client inhabiting space
└─ Finished detail
```

**Sub-field: Alt Text**

```
Accessibility description of image.

Example:
"Architectural study models on desk showing design development"
```

**Sub-field: Caption**

```
Text displayed under image.

Example:
"Design concepts tested through physical models"
```

---

### Complete Process Example (6 Phases)

```
PHASE 1:
├─ Order: 1
├─ Title: "Discovery"
├─ Duration: "4 – 8 weeks"
├─ Description: [detailed discovery narrative]
├─ Deliverables: [Site Analysis, Client Interviews, Program Summary]
└─ Visual: [site study photograph]

PHASE 2:
├─ Order: 2
├─ Title: "Concept Development"
├─ Duration: "6 – 10 weeks"
├─ Description: [concept narrative]
├─ Deliverables: [Concept Sketches, Renderings, Study Models, Presentation]
└─ Visual: [concept sketch or model photograph]

PHASE 3:
├─ Order: 3
├─ Title: "Design Development"
├─ Duration: "3 – 6 months"
├─ Description: [design development narrative]
├─ Deliverables: [Design Drawings, Material Palette, 3D Models, Specifications]
└─ Visual: [detailed design drawing or material palette]

PHASE 4:
├─ Order: 4
├─ Title: "Documentation & Specifications"
├─ Duration: "2 – 4 months"
├─ Description: [documentation narrative]
├─ Deliverables: [Construction Documents, Technical Specs, Consultant Coordination]
└─ Visual: [construction documents spread]

PHASE 5:
├─ Order: 5
├─ Title: "Construction & Oversight"
├─ Duration: "6 – 24 months (project dependent)"
├─ Description: [construction narrative]
├─ Deliverables: [Site Oversight, Material Approvals, Quality Control, RFI Resolution]
└─ Visual: [construction site photography]

PHASE 6 (Optional):
├─ Order: 6
├─ Title: "Completion & Evaluation"
├─ Duration: "Ongoing"
├─ Description: [post-completion narrative]
├─ Deliverables: [Post-Occupancy Evaluation, Feedback, Documentation]
└─ Visual: [completed building photograph]
```

---

# 03 // BUILT PROOF

### What This Tab Does

Creates a **transition section** linking the process to completed projects.

---

## Field: Built Proof Transition (object)

**Field Name:** `proof` (Optional, object)

**What to enter:**

```
Editorial transition from process to projects.
Links methodology to actual built work.
Call to action to view completed projects.
```

**Sub-fields:**

### Overline (optional)

```
Label for this section.

Example:
"Specification // Evidence"
```

### Heading (optional)

```
Section heading.

Examples:
├─ "Built Proof"
├─ "See the Work"
├─ "From Process to Built"
└─ "Methodology Made Real"
```

### Body Text (optional)

```
Transition explanation.

Example:
"This process—research, design, documentation, construction
oversight—results in buildings and spaces that respond to their
specific place. See how our methodology translates to built reality
across residential, institutional, and commercial scales."
```

### Action Link Label (optional)

```
Button text linking to projects.

Examples:
├─ "See the Work"
├─ "View Projects"
├─ "Explore Portfolio"
└─ "See Built Examples"
```

### Action Link URL (optional)

```
Where the link goes.

Examples:
├─ "/projects"
├─ "/portfolio"
└─ "/work"
```

---

### Complete Built Proof Example

```
Built Proof Transition:
├─ Overline: "Specification // Evidence"
├─ Heading: "Built Proof"
├─ Body: "This process—research, design, documentation,
│        construction oversight—results in buildings and
│        spaces that respond to their specific place. See
│        how our methodology translates to built reality."
├─ Action Label: "See the Work"
└─ Action URL: "/projects"
```

---

# 04 // CALL TO ACTION

### What This Tab Does

Defines the **closing CTA** for project inquiries.

---

## Field: Closing Call to Action (object)

**Field Name:** `cta` (Optional, object)

**What to enter:**

```
Final call to action section.
Invites prospective clients to inquire.
Links to contact or project inquiry.
```

**Sub-fields:**

### Overline (optional)

```
Label.

Example:
"Collaboration // Next Steps"
```

### Heading (optional)

```
Main heading.

Examples:
├─ "Have a project in mind?"
├─ "Let's Work Together"
├─ "Start a Project"
└─ "Ready to Build?"
```

### Body Text (optional)

```
Call to action explanation.

Examples:
├─ "If you have a project and want to explore how
   our methodology could serve your vision, let's talk.
   We'd love to hear about your ideas."

├─ "We're always interested in meaningful projects
   where we can apply this methodology to create
   responsive, well-crafted buildings and spaces."

└─ "If you resonate with this approach and want to
   discuss a project, we're here to listen."
```

### Button Label (optional)

```
Button text.

Examples:
├─ "Start a Project"
├─ "Get in Touch"
├─ "Contact Us"
└─ "Discuss Your Project"
```

### Button Link (optional)

```
Where button links to.

Examples:
├─ "/contact"
├─ "/inquiry"
├─ "mailto:contact@rafadesign.pt"
└─ "https://forms.google.com/..."
```

---

### Complete CTA Example

```
Closing Call to Action:
├─ Overline: "Collaboration // Next Steps"
├─ Heading: "Have a project in mind?"
├─ Body: "If you have a project and want to explore how
│        our methodology could serve your vision, let's talk.
│        We'd love to hear about your ideas."
├─ Button Label: "Start a Project"
└─ Button Link: "/contact"
```

---

# 05 // SEO

### What This Tab Does

Controls how process page appears in **search engines**.

---

## Field 1: Meta Title

**Field Name:** `seo.title` (Optional, text)

**What to enter:**

```
Title in Google search results.
```

**Examples:**

```
✅ GOOD:
├─ "Our Design Process – RAFA Design"
├─ "Methodology & Design Sequence | RAFA Design"
└─ "How We Work – Architecture Process | RAFA Design"

❌ AVOID:
├─ Too long (gets cut off)
└─ Keyword stuffing
```

**Real Example:**

```
Meta Title: "Our Design Process & Methodology | RAFA Design"
```

---

## Field 2: Meta Description

**Field Name:** `seo.description` (Optional, text)

**What to enter:**

```
Summary for Google search results.
```

**Examples:**

```
✅ GOOD:
├─ "Discover how RAFA Design approaches architecture.
   Our 6-phase methodology: discovery, concept, design,
   documentation, construction, completion."

└─ "Our design methodology is a disciplined sequence:
   research, design, documentation, and built oversight.
   Learn how we create responsive architecture."

❌ AVOID:
├─ Too long
└─ Generic description
```

**Real Example:**

```
Meta Description: "Our design process: discovery, concept
development, design, documentation, construction oversight.
Learn how RAFA Design creates responsive architecture."
```

---

# WORKFLOW: SETTING UP PROCESS PAGE

**Step-by-step example:**

```
1. Go to /admin → "09 // Process 🔄"
2. Find "Process Page" document (singleton)
3. Click to edit

FILL 01 // HERO & INTRO:
4. Hero Overline: "Specification // Methodology"
5. Hero Title: "Methodology"
6. Hero Description: [lead editorial statement]
7. Hero Image: [work-in-progress studio photograph]
   ├─ Alt Text: [accessibility description]
   └─ Caption: [optional label]

FILL 02 // METHODOLOGY STEPS:
8. Create 5-6 phases. For each phase:
   ├─ Phase Number: 1, 2, 3, etc.
   ├─ Phase Title: [e.g., "Discovery"]
   ├─ Duration: [e.g., "4-8 weeks"]
   ├─ Description: [detailed phase narrative]
   ├─ Deliverables: [tags for outputs]
   └─ Visual: [phase evidence photograph]

FILL 03 // BUILT PROOF:
9. Built Proof Overline: "Specification // Evidence"
10. Heading: "Built Proof"
11. Body: [transition to projects]
12. Action Label: "See the Work"
13. Action URL: "/projects"

FILL 04 // CALL TO ACTION:
14. CTA Overline: "Collaboration // Next Steps"
15. Heading: "Have a project in mind?"
16. Body: [project inquiry message]
17. Button Label: "Start a Project"
18. Button URL: "/contact"

FILL 05 // SEO:
19. Meta Title: "Our Design Process | RAFA Design"
20. Meta Description: [search engine summary]

21. [Publish]
```

---

# QUICK REFERENCE: WHAT'S REQUIRED

```
REQUIRED (must fill):
✅ Hero Title
✅ Hero Description
✅ Methodology Steps (at least 1 phase)

HIGHLY RECOMMENDED:
⭐ Hero Overline
⭐ Hero Image (with alt text)
⭐ 5-6 complete phases (Discovery through Built)
⭐ Deliverables for each phase
⭐ Evidence images for each phase
⭐ Built Proof transition
⭐ Closing CTA

OPTIONAL:
⚪ Phase duration
⚪ SEO fields
```

---

# BEST PRACTICES

**Describing phases:**

- ✅ Be specific about what actually happens
- ✅ Use clear, accessible language
- ✅ Show client involvement/collaboration
- ✅ Explain deliverables and outcomes
- ✅ Be honest about timeline (don't minimize complexity)

**Methodology:**

- ✅ Should match your actual process
- ✅ 5-6 phases typical (covers whole project)
- ✅ Phases should build on each other logically
- ✅ Consider your project types when defining phases

**Evidence photography:**

- ✅ Show actual work/process, not generic images
- ✅ Phase 1: research and analysis materials
- ✅ Phase 2: sketches, models, concepts
- ✅ Phase 3: drawings, materials, refinement
- ✅ Phase 4: documentation and specifications
- ✅ Phase 5: construction and site work
- ✅ Phase 6: completed building

**Call to action:**

- ✅ Inviting and warm
- ✅ Clear about next step
- ✅ Link to actual contact form or email

---

## DONE ✅

All Process Page schema fields explained with real examples.

**Next:** Sustainability page guide
