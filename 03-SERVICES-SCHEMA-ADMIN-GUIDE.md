# Services Schema — Complete Admin Guide

**For:** Service coordinators, business development, and editorial staff  
**Purpose:** Know exactly what to fill in each field when adding a service offering  
**Location:** `/admin → "03 // Services 🏗️"`

---

## Overview

A service represents a **professional discipline** that RAFA offers: Architecture, Interior Design, Landscape Design, Urban Design, Renovation, Consulting, 3D Visualization, etc.

Each service has a **detail page** on the website showing your approach, methodology, and portfolio projects that demonstrate that discipline.

**Total Tabs:** 5 sections  
**Estimated time to add service:** 15-20 minutes  
**Difficulty:** Medium (requires clear business positioning)

---

## Why Services Matter

Services help:

- ✅ Organize your offering clearly
- ✅ Help clients understand what you do
- ✅ Filter portfolio by discipline
- ✅ Show your unique approach to each discipline
- ✅ Drive business inquiries

---

## Tab-by-Tab Breakdown

---

# 01 // CONTENT

### What This Tab Does

Defines **what** the service is and **how** you describe it.

---

## Field 1: Service Title

**Field Name:** `title` (Required)

**What to enter:**

```
The official name of the service / discipline.
How you want this service known publicly.
```

**Examples:**

```
✅ GOOD:
├─ Architecture
├─ Interior Design
├─ Landscape Design
├─ Urban Design
├─ Renovation
├─ Consulting
├─ 3D Visualization & Rendering
└─ Master Planning

❌ AVOID:
├─ Service 1 (too generic)
├─ Building Design (too vague)
└─ We do architecture (not professional)
```

**Tips:**

- Keep professional and clear
- Use standard discipline names
- Under 60 characters
- This becomes the page title

**Real Example:**

```
Title: Architecture
(Simple, professional, clear)
```

---

## Field 2: Slug

**Field Name:** `slug` (Required, auto-filled)

**What it is:**

```
URL-friendly version of the title.
Used in the website URL.
Auto-generated from title, can edit.
```

**How it appears:**

```
Title: Architecture
Slug: architecture

Website URL: /services/architecture

---

Title: 3D Visualization & Rendering
Slug: 3d-visualization-rendering

Website URL: /services/3d-visualization-rendering
```

**Rules:**

- Lowercase only
- Hyphens between words
- No special characters (& becomes nothing)
- Unique (can't have duplicates)

**Tip:**
System auto-generates this. Only edit if needed for clarity.

---

## Field 3: Short Description

**Field Name:** `shortDescription` (Required, text)

**What to enter:**

```
One-line punchy description.
Appears on service card in listings.
Very short, hooks the reader.
```

**Examples:**

```
✅ GOOD:
├─ "Custom buildings and interior environments"
├─ "Spatial design with emphasis on materiality"
├─ "Landscape integration and environmental response"
├─ "Urban context and strategic planning"
├─ "Transformation of existing structures"
├─ "Strategic guidance for complex projects"
├─ "Photorealistic renderings and visualization"
└─ "Masterplans for districts and developments"

❌ AVOID:
├─ "We provide architecture services" (too generic)
├─ "RAFA Design does this service" (includes firm name)
└─ "This is what we do" (not specific)
```

**Length:**

- Under 120 characters
- 1 sentence
- Descriptive but concise

**Tips:**

- Lead with what makes it special
- Not just "what it is" but "what makes it unique"
- This is the first thing people read

**Real Example:**

```
Service: Architecture
Short Description: "Custom buildings and interior environments responding to specific place"
(Brief but conveys the philosophy)
```

---

## Field 4: Introduction Statement

**Field Name:** `intro` (Required, text)

**What to enter:**

```
Larger editorial statement about the discipline.
Appears at top of service detail page.
Sets the tone and philosophy.
Bigger than short description.
```

**Examples:**

```
Architecture:
"We design buildings and interior environments
that respond to specific conditions of place:
topography, climate, light, materials, culture.
Each project is a dialogue with its context."

Interior Design:
"Interior spaces are shaped by material honesty,
light, and human scale. We design environments
where the quality of everyday experience is paramount.
Finishes, furniture, and spatial flow work in concert."

Landscape Design:
"We understand landscape as a design discipline in its
own right—not decoration but essential infrastructure.
Garden design, site restoration, and environmental
integration are central to our practice."

Renovation:
"Existing buildings hold memories, materials, and value.
Renovation is not erasure but evolution. We work with
what exists to create new possibility while respecting
architectural heritage."
```

**Length:**

- 250-350 characters
- 2-3 sentences
- Conveys philosophy and approach

**Tips:**

- Write in your voice (firm's philosophy)
- Explain "why" this discipline matters
- Set context for reader

**Real Example:**

```
Intro: "We design buildings and interior environments
that respond to specific conditions of place. Architecture
is a dialogue with topography, climate, light, materials,
and culture. Each project emerges from deep understanding
of context."
```

---

## Field 5: Full Description

**Field Name:** `description` (Required, text)

**What to enter:**

```
Long-form editorial description.
Detailed explanation of your approach.
Shown on service detail page.
Substantive, professional, thoughtful.
```

**Examples:**

```
Architecture (800 words):
"Architecture at RAFA begins with listening. We listen
to the land. We study how sunlight moves across a site
through seasons. We understand local materials,
construction traditions, and geological conditions.
We listen to our clients—their visions, constraints,
values. We listen to the future inhabitants who will
spend years in the spaces we design.

From this listening emerges design. Not imposed from
above, but responsive to place. Our buildings sit on
their sites with intention. They celebrate local
materials. They respond to climate through thoughtful
orientation and fenestration. They create spatial
experiences that feel both timeless and of-this-moment.

We believe architecture should improve how people live.
Not through superficial styling but through spatial
intelligence, material honesty, and careful craft.
A well-designed kitchen is not about trends but about
how light falls across counters, how movement flows
between appliances, how materials age with dignity.

This philosophy extends to scale. We have designed
residential homes, mixed-use developments, institutional
buildings, and urban masterplans. At every scale,
our commitment remains the same: creating built
environments where people can live and work with
greater possibility and beauty."

---

Interior Design (600 words):
"Interior design is about the spaces where life happens.
It is where we sleep, work, cook, think, create. The
quality of these environments shapes our daily experience.

We design interiors that begin with understanding the
human dimension. How will this space be used? Who will
inhabit it? What activities will it contain? From that
understanding comes spatial organization—clear zones,
flowing connections, moments of gathering and retreat.

Material selection is central to our approach. We choose
materials that are honest about their nature. A concrete
floor looks and acts like concrete. Timber shows its
grain and warmth. Stone reveals geological time. We
avoid materials that pretend to be something they are not.

Light shapes interior experience. Strategic window
placement, skylights, and artificial lighting design
create spatial atmosphere. Morning light in a kitchen
sets a different tone than afternoon light in a bedroom.
We design for these temporal shifts.

Details matter. Door handles, light switch placement,
stair proportions, joinery—these are not afterthoughts
but central to how spaces feel. A well-designed interior
is one where you never question why something is where
it is."
```

**Length:**

- 500-800 characters
- 4-8 sentences
- Covers: philosophy, approach, values, examples

**Tips:**

- Write in first person (we do, we believe)
- Be specific about your approach
- Include examples if possible
- Avoid marketing jargon

**Real Example:**

```
Description: "Architecture at RAFA begins with deep
listening to place. We study light patterns, local
materials, topography, and climate. From this
understanding emerges design that responds to specific
conditions rather than imposing generic solutions.
Our buildings sit on their sites with intention,
celebrate local materials, and create spatial
experiences where people can live with greater beauty
and possibility. This philosophy extends from residential
homes to urban masterplans—at every scale, our
commitment is making environments that improve how
people live."
```

---

## Field 6: Cover / Lead Discipline Image

**Field Name:** `coverImage` (Optional, image)

**What to enter:**

```
Hero image representing this service discipline.
Appears at top of service detail page.
Optional—if empty, uses first related project's hero image.
```

**What makes a good cover image:**

```
✅ GOOD:
├─ Cinematic, high-quality photo
├─ Clearly represents this discipline
├─ Shows your best work
├─ Professional architectural photography
├─ Landscape orientation
└─ High resolution (2000px+ wide)

❌ AVOID:
├─ Small, low-resolution thumbnail
├─ Unclear or poorly lit
├─ Snapshot/casual phone photo
├─ Portrait orientation
└─ Generic/stock image
```

**Examples:**

```
Architecture service:
├─ Beautiful exterior of signature project
├─ Shows building in landscape context
├─ Captures design philosophy visually

Interior Design service:
├─ Beautiful interior space
├─ Shows material quality and spatial design
├─ Demonstrates aesthetic approach

Landscape Design service:
├─ Garden or landscape intervention
├─ Shows relationship between design and nature
├─ Beautiful, evocative photography
```

**Sub-fields:**

### Alt Text (optional, accessibility)

```
Describe the image for screen readers.

Example:
"Contemporary home of pale stone exterior on sloped
landscape with mature oak tree"
```

### Caption (optional)

```
Text below the image.

Example:
"Architecture responds to the specific conditions of place"
```

### Credit (optional)

```
Photographer attribution.

Example:
"Photography by João Silva"
```

**Real Example:**

```
Cover Image:
├─ File: architecture-hero.jpg (2400x1600px)
├─ Alt Text: "Contemporary home of stone and timber
│            on sloped landscape"
├─ Caption: "Architecture emerges from dialogue with place"
└─ Credit: "Photography by João Silva"
```

---

# 02 // APPROACH

### What This Tab Does

Explains your **methodology** for this discipline (3-6 key points).

---

## Field: Methodological Approach

**Field Name:** `approach` (Required, array)

**What to enter:**

```
3-6 key points of your approach to this discipline.
Numbered methodology points.
Each point has title + statement.
Shows your thinking process.
```

**What each approach point contains:**

### Title (required)

```
Short name of the approach point
Examples:
├─ "Context"
├─ "Research"
├─ "Materiality"
├─ "Light"
├─ "Craft"
├─ "Collaboration"
└─ "Refinement"

Keep under 30 characters
```

### Statement (required)

```
One-sentence editorial explanation of this approach.

Examples:
├─ "Every design responds to specific conditions of place"
├─ "We spend months understanding site, climate, materials"
├─ "Material selection is fundamental, never decorative"
├─ "Light shapes spatial experience and emotional response"
├─ "Quality craft and detailing define lived experience"
├─ "Collaboration with specialists creates better outcomes"
└─ "Refinement through iteration and user testing"

Keep under 200 characters
```

---

### Complete Approach Examples

**Architecture (5 points):**

```
Approach 1:
├─ Title: Context
└─ Statement: "Every design begins with deep understanding
              of the specific place—topography, climate,
              materials, light, and culture."

Approach 2:
├─ Title: Materiality
└─ Statement: "Material selection is honest and fundamental,
              responding to local conditions and available craft."

Approach 3:
├─ Title: Light
└─ Statement: "Strategic fenestration and light design shape
              spatial experience and emotional response."

Approach 4:
├─ Title: Human Scale
└─ Statement: "Architecture exists to improve how people live.
              Details, proportions, and spatial flow are paramount."

Approach 5:
├─ Title: Craft
└─ Statement: "Quality detailing and construction excellence define
              how spaces feel and perform over decades."
```

**Interior Design (4 points):**

```
Approach 1:
├─ Title: Use & Flow
└─ Statement: "We design from understanding of how space will be
              used—spatial organization emerges from lived activity."

Approach 2:
├─ Title: Material Honesty
└─ Statement: "Materials are chosen for their true nature and beauty,
              not for mimicking something else."

Approach 3:
├─ Title: Light & Shadow
└─ Statement: "Careful light design creates atmosphere and reveals
              materials and proportions through the day."

Approach 4:
├─ Title: Detail & Craft
└─ Statement: "Precision in joinery, hardware, and finish specifies
              quality and creates spaces that feel intentional."
```

**Landscape Design (4 points):**

```
Approach 1:
├─ Title: Ecological Response
└─ Statement: "Design works with natural systems—hydrology, soil,
              native plants—rather than against them."

Approach 2:
├─ Title: Site Integration
└─ Statement: "Landscape is infrastructure and experience, not
              decoration. It should improve ecological performance."

Approach 3:
├─ Title: Material Authenticity
└─ Statement: "We use locally-sourced materials, native plants, and
              natural finishes that age gracefully."

Approach 4:
├─ Title: Human Experience
└─ Statement: "Gardens are created for the people who will inhabit
              them—comfort, beauty, and usability matter equally."
```

**Renovation (4 points):**

```
Approach 1:
├─ Title: Respect Existing
└─ Statement: "Existing buildings contain value—materials, heritage,
              craft—which we preserve and celebrate."

Approach 2:
├─ Title: Thoughtful Intervention
└─ Statement: "New work is distinguished from old, creating dialogue
              rather than mimicry between past and present."

Approach 3:
├─ Title: Performance
└─ Statement: "We upgrade building performance—thermal comfort,
              light, acoustics, accessibility—while respecting character."

Approach 4:
├─ Title: Transformation
└─ Statement: "Renovation makes buildings relevant for today without
              erasing the memories and meaning they contain."
```

---

## Guidelines for Approach Points

**Number of points:**

- Minimum: 3 (must establish pattern)
- Typical: 4-5 (covers main aspects)
- Maximum: 6 (avoids overwhelming reader)

**Writing tips:**

- Start each statement from RAFA's perspective ("we", "our")
- Be specific about values, not generic
- Each point should be distinct from others
- Avoid marketing-speak; be authentic
- Order matters—start with most important

**Real Example (Complete):**

```
Service: Architecture
Approach Points:

APPROACH 1:
├─ Title: "Context"
└─ Statement: "Every design responds to specific conditions of place—
              topography, climate, light, materials, and culture."

APPROACH 2:
├─ Title: "Materiality"
└─ Statement: "Material selection is honest and fundamental, chosen
              for connection to geological and cultural place."

APPROACH 3:
├─ Title: "Light Design"
└─ Statement: "Strategic fenestration becomes a design tool, shaping
              spatial experience and emotional response through seasons."

APPROACH 4:
├─ Title: "Human Scale"
└─ Statement: "Architecture improves how people live. Daily moments—
              morning light in kitchen, proportions of stairs—are paramount."

APPROACH 5:
├─ Title: "Craft"
└─ Statement: "Quality detailing and construction excellence define how
              spaces age and perform over decades."
```

---

# 03 // REFERENCES

### What This Tab Does

Links this service to **portfolio projects** that demonstrate it.

---

## Field: Related Projects

**Field Name:** `relatedProjects` (Optional, array)

**What to enter:**

```
2-5 projects that exemplify this service.
Projects shown on service detail page.
Helps potential clients see work.
Creates portfolio filtering by discipline.
```

**How to add:**

```
1. Click "+ Add"
2. Search for project by name (Casa Monte, etc.)
3. Click project to link it
4. Repeat for 2-5 projects
```

**Which projects to choose:**

```
✅ Best examples of this discipline
✅ Your proudest work in this category
✅ Projects showing range/scale
✅ Mix of different project types if relevant

❌ Don't include:
├─ Projects where discipline is minor role
├─ Mediocre examples
└─ Unrelated projects (force-fit)
```

**Examples:**

```
Architecture:
├─ Casa Monte (residential, material-focused)
├─ Vila Marim (residential, light-focused)
├─ Atelier Norte (adaptive reuse, workspace)
├─ Porto Development (mixed-use, urban)
└─ Museum Renovation (cultural, institutional)

Interior Design:
├─ Casa Monte (kitchen, bedroom, living spaces)
├─ Atelier Norte (workspace design)
└─ Villa Marim (material-rich interiors)

Landscape Design:
├─ Casa Monte (site response, integration)
├─ Porto Riverside (public landscape)
└─ Villa Marim (garden design)

3D Visualization & Rendering:
├─ Porto Development (master plan renders)
├─ Future Museum (building renderings)
└─ Urban Concept Study (visualization study)
```

**Real Example:**

```
Service: Architecture

Related Projects:
├─ Casa Monte (demonstrates site response, materiality)
├─ Villa Marim (shows light strategy, detail craft)
├─ Atelier Norte (exemplifies adaptive reuse)
├─ Porto Development (shows urban integration)
└─ Museum Renovation (institutional scale, heritage respect)

(Each appears as a clickable project card on /services/architecture)
```

---

# 04 // CONFIGURATION

### What This Tab Does

Controls **how** the service appears on the website (order, filtering).

---

## Field 1: Display Order

**Field Name:** `order` (Required, number)

**What to enter:**

```
Position of service in the listing.
Lower numbers appear first.
Controls sequence on /services page.
```

**Examples:**

```
If you have 7 services:
├─ Architecture: order 1 (appears first)
├─ Interior Design: order 2
├─ Landscape Design: order 3
├─ Urban Design: order 4
├─ Renovation: order 5
├─ Consulting: order 6
└─ 3D Visualization: order 7 (appears last)
```

**Tips:**

- Strategic ordering matters
- Put most important/flagship first
- Consider your business priorities
- Can reorder anytime

**Real Example:**

```
3D Visualization & Rendering: order 7
(Appears last in service listings)
```

---

## Field 2: Editorial Image Intents

**Field Name:** `editorialIntents` (Optional, array)

**What to enter:**

```
Which types of project images to show for this service.
Filters images from related projects.
Each service sees different photos from same project.
```

**Available Intent Options:**

```
✅ design-intent
   └─ Concept clarity, design thinking
      Examples: sketches, renderings, concepts

✅ spatial-experience
   └─ Interior space, how space feels
      Examples: interior photos, room details

✅ site-relationship
   └─ Building in landscape, context
      Examples: exteriors, site integration

✅ materiality
   └─ Materials, finishes, details
      Examples: close-ups, material samples

✅ construction
   └─ Building process, construction phases
      Examples: construction progress, details

✅ environmental
   └─ Nature, landscape, gardens, outdoors
      Examples: gardens, outdoor spaces, ecology
```

**How it works:**

When you link Casa Monte to Architecture service:

```
Casa Monte has 6 photos tagged:
├─ Photo 1: Exterior (site-relationship)
├─ Photo 2: Living room (spatial-experience)
├─ Photo 3: Materials (materiality)
├─ Photo 4: Construction (construction)
├─ Photo 5: Landscape (environmental)
└─ Photo 6: Sketch (design-intent)

Architecture's intents: [design-intent, site-relationship, construction]

Result: Shows only Photos 1, 4, 6 (all others hidden)
```

---

### Examples by Service

**Architecture:**

```
Editorial Intents: [design-intent, site-relationship, construction]

Shows:
├─ ✅ Design concepts and sketches
├─ ✅ Building in landscape context
└─ ✅ Construction documentation

Hides:
├─ ❌ Interior room details (Interior's concern)
├─ ❌ Material close-ups (Materiality focus)
└─ ❌ Gardens (Landscape's focus)
```

**Interior Design:**

```
Editorial Intents: [spatial-experience, materiality]

Shows:
├─ ✅ Interior rooms and spaces
└─ ✅ Material details and finishes

Hides:
├─ ❌ Building exterior (Architecture focus)
├─ ❌ Construction process (Building focus)
└─ ❌ Landscape/gardens (Landscape focus)
```

**Landscape Design:**

```
Editorial Intents: [site-relationship, environmental]

Shows:
├─ ✅ Building in landscape context
└─ ✅ Gardens, nature, outdoor spaces

Hides:
├─ ❌ Interior rooms (Interior focus)
├─ ❌ Material details (Construction focus)
└─ ❌ Design concepts (Architecture's story)
```

**3D Visualization & Rendering:**

```
Editorial Intents: [design-intent, spatial-experience, environmental]

Shows:
├─ ✅ Design renderings and concepts
├─ ✅ Interior space visualizations
└─ ✅ Site context and landscape integration

Hides:
├─ ❌ Construction photos (not rendered)
└─ ❌ Completed building details (not renders)
```

---

### Guidelines for Editorial Intents

**How to choose:**

```
Ask: "What types of project images best tell this
     discipline's story?"

Architecture → How does building sit on site?
Interior → How do rooms feel, what materials?
Landscape → How does design integrate with nature?
Renovation → What changed, how does old + new work together?
3D Visualization → Can we show renders + context?
```

**Number of intents:**

- Typical: 2-3 intents per service
- Minimum: 1 (at least show something)
- Maximum: All 6 (shows everything—less filtered)

**Real Example:**

```
Service: Architecture

Display Order: 1

Editorial Image Intents:
[✓ design-intent, ✓ site-relationship, ✓ construction]

(When Casa Monte appears on /services/architecture,
show only exterior, context, and construction photos—
not interior or garden photos)
```

---

# 05 // SEO

### What This Tab Does

Controls how the service appears in **Google Search** and **social media**.

---

## Field 1: Meta Title

**Field Name:** `seo.title` (Optional, text)

**What to enter:**

```
Title shown in Google search results.
Also shown when service page shared on social media.
If empty, uses service title as default.
```

**Examples:**

```
✅ GOOD:
├─ "Architecture Services | RAFA Design Studio"
├─ "Interior Design by RAFA Design"
├─ "Landscape Design & Planning | RAFA"
└─ "3D Visualization & Rendering Services"

❌ AVOID:
├─ "Architecture" (too generic, no context)
├─ "RAFA Design RAFA Design RAFA Design" (keyword stuffing)
└─ Too long (gets cut off in search)
```

**Ideal length:**

- 50-60 characters
- Includes service name + firm name or descriptor
- Readable and descriptive

**Real Example:**

```
Meta Title: "Architecture Services | RAFA Design"
(Shown in Google results and social shares)
```

---

## Field 2: Meta Description

**Field Name:** `seo.description` (Optional, text)

**What to enter:**

```
Summary shown under title in Google search results.
Also shown when service page shared on social media.
If empty, uses short description as default.
```

**Examples:**

```
✅ GOOD:
├─ "Custom buildings and interior environments responding
   to specific place. RAFA Design creates architecture
   through deep understanding of context, light, and materials."

├─ "Interior design focused on spatial experience, material
   honesty, and human scale. We design environments where
   everyday moments are shaped by thoughtful craft."

└─ "3D visualization and rendering for architects and
   developers. Photorealistic renderings bringing design
   concepts to life."

❌ AVOID:
├─ "We provide architecture services" (generic)
├─ Just repeating title
└─ Keyword stuffing (unreadable)
```

**Ideal length:**

- 155-160 characters
- 1-2 sentences
- Compelling and descriptive

**Real Example:**

```
Meta Description: "Custom buildings and interior environments
responding to place. RAFA designs through deep understanding
of context, light, and materials. Creating architecture that
improves how people live."

(Shown in Google search results)
```

---

## Field 3: Keywords

**Field Name:** `seo.keywords` (Optional, array of tags)

**What to enter:**

```
Search terms people use to find this service.
Helps Google understand what the service is.
Lowercase-with-hyphens format.
```

**Examples:**

```
Architecture:
├─ architecture-design
├─ custom-homes
├─ commercial-architecture
├─ adaptive-reuse
├─ architectural-design
├─ residential-architecture
└─ building-design

Interior Design:
├─ interior-design
├─ interior-architecture
├─ space-planning
├─ material-selection
├─ residential-interiors
└─ commercial-interiors

Landscape Design:
├─ landscape-design
├─ garden-design
├─ site-planning
├─ environmental-design
├─ outdoor-spaces
└─ landscape-architecture

3D Visualization:
├─ 3d-rendering
├─ architectural-visualization
├─ photorealistic-rendering
├─ design-rendering
└─ visualization-services
```

**Tips:**

- 5-10 keywords typical
- Match actual service
- Think like someone searching
- Include long-tail phrases

**Real Example:**

```
Keywords: ["architecture-design", "custom-homes",
           "residential-architecture", "site-responsive-design",
           "material-honesty", "light-design", "adaptive-reuse"]
```

---

# WORKFLOW: ADDING A SERVICE

**Step-by-step example: "3D Visualization & Rendering"**

```
1. Go to /admin → "03 // Services 🏗️"
2. Click [+ Create] button

FILL 01 // CONTENT:
3. Title: 3D Visualization & Rendering
4. Slug: 3d-visualization-rendering (auto)
5. Short Description: "Photorealistic renderings bringing
                       design concepts to life"
6. Introduction Statement: "Visualization is a communication
   tool that helps clients and stakeholders understand design
   intent before construction. We create photorealistic 3D
   renderings that accurately represent materials, light, scale,
   and spatial quality."
7. Full Description: "At RAFA, visualization serves the design
   process, not marketing alone. We create renderings to test
   design ideas, understand spatial relationships, and
   communicate with precision to clients and consultants.

   Our renderings are informed by deep architectural knowledge.
   We understand how light actually behaves in a space. We
   render materials honestly—how concrete ages, how timber
   weathered, how stone catches light. Proportions and human
   scale are paramount. A rendering that looks beautiful but
   misrepresents the actual experience is dishonest.

   We work at all project stages—from early concepts to
   construction documentation. Renderings help test design
   moves, understand site context, and navigate the complex
   process from idea to built reality."
8. Cover Image: [rendering of a beautiful project]
   ├─ Alt: "Photorealistic 3D rendering of contemporary home"
   ├─ Caption: "Design visualization brings concepts to life"
   └─ Credit: "Visualization by RAFA Design"

FILL 02 // APPROACH:
9. Approach 1:
   ├─ Title: "Design Truth"
   └─ Statement: "Renderings accurately represent materials,
                  light, and spatial quality—not idealized marketing"
10. Approach 2:
    ├─ Title: "Material Honesty"
    └─ Statement: "We render materials as they actually appear—
                   concrete's texture, timber's grain, stone's aging"
11. Approach 3:
    ├─ Title: "Light Simulation"
    └─ Statement: "Strategic lighting simulation shows how daylight
                   and artificial light define spatial experience"
12. Approach 4:
    ├─ Title: "Human Scale"
    └─ Statement: "Proportions and human figures help viewers
                   understand actual spatial dimensions"

FILL 03 // REFERENCES:
13. Related Projects:
    ├─ Porto Development (showing master plan renders)
    ├─ Future Museum (showing building visualizations)
    └─ Urban Concept Study (showing visualization work)

FILL 04 // CONFIGURATION:
14. Display Order: 7
    (Last in service list)
15. Editorial Image Intents:
    ├─ ✓ design-intent (concept renderings)
    ├─ ✓ spatial-experience (interior renderings)
    └─ ✓ environmental (site context rendering)

FILL 05 // SEO:
16. Meta Title: "3D Visualization & Rendering | RAFA Design"
17. Meta Description: "Photorealistic 3D renderings for
                      architectural design. We create accurate
                      visualizations showing materials, light,
                      and spatial quality."
18. Keywords: 3d-rendering, architectural-visualization,
              photorealistic-rendering, design-visualization,
              rendering-services

19. [Publish]
```

---

# QUICK REFERENCE: WHAT'S REQUIRED

```
REQUIRED (must fill):
✅ Title (service name)
✅ Slug (auto-generated)
✅ Short Description (1-line hook)
✅ Introduction Statement (editorial statement)
✅ Full Description (detailed explanation)
✅ Approach (3-6 methodology points)
✅ Display Order (position in listing)

HIGHLY RECOMMENDED:
⭐ Cover Image (hero image for service)
⭐ Related Projects (2-5 portfolio examples)
⭐ Editorial Intents (image filtering)

OPTIONAL (nice to have):
⚪ SEO fields (title, description, keywords)
```

---

# COMMON SERVICES STRUCTURE

**If you have these 7 services:**

```
Service 1: order 1
├─ Title: Architecture
├─ Intro: "Custom buildings responding to place"
└─ Approach: Context, Materiality, Light, Human Scale, Craft
   Related Projects: Casa Monte, Villa Marim, Atelier Norte
   Intents: design-intent, site-relationship, construction

Service 2: order 2
├─ Title: Interior Design
├─ Intro: "Interior spaces shaped by experience"
└─ Approach: Use & Flow, Material Honesty, Light, Detail & Craft
   Related Projects: Casa Monte, Atelier Norte, Villa Marim
   Intents: spatial-experience, materiality

Service 3: order 3
├─ Title: Landscape Design
├─ Intro: "Landscape as infrastructure and experience"
└─ Approach: Ecological Response, Integration, Authenticity, Human Experience
   Related Projects: Casa Monte, Porto Riverside, Villa Marim
   Intents: site-relationship, environmental

Service 4: order 4
├─ Title: Urban Design
├─ Intro: "Strategic planning for urban contexts"
└─ Approach: Context Study, Public Benefit, Integration, Phasing
   Related Projects: Porto Development, Urban Strategy Study
   Intents: design-intent, site-relationship, environmental

Service 5: order 5
├─ Title: Renovation
├─ Intro: "Thoughtful transformation of existing buildings"
└─ Approach: Respect Existing, Intervention, Performance, Evolution
   Related Projects: Atelier Norte, Historic Building Renovation
   Intents: construction, materiality, design-intent

Service 6: order 6
├─ Title: Consulting
├─ Intro: "Strategic guidance for complex projects"
└─ Approach: Problem Framing, Research, Strategy, Implementation
   Related Projects: Case studies, feasibility work
   Intents: design-intent (concept work)

Service 7: order 7
├─ Title: 3D Visualization & Rendering
├─ Intro: "Renderings bringing design concepts to life"
└─ Approach: Design Truth, Material Honesty, Light Simulation, Human Scale
   Related Projects: Porto Development, Future Museum, Concepts
   Intents: design-intent, spatial-experience, environmental
```

---

## DONE ✅

All Services schema fields explained with real examples.

**Ready for next schema?** (Team, Studio, Careers, Contact, Site Settings)

Which one would you like next?
