# Sustainability Page Schema — Complete Admin Guide

**For:** Studio leadership, environmental officers, and marketing  
**Purpose:** Know how to communicate your environmental commitments and ecological approach  
**Location:** `/admin → "10 // Sustainability 🌱"`

---

## Overview

The Sustainability Page is a **singleton** (only one exists) that controls the entire `/sustainability` page. It communicates:

- **Environmental manifesto** and philosophy
- **Four core commitments** to sustainability
- **Guiding principles** for ecological practice
- **Environmental frameworks** and certifications
- **Collaboration call** for sustainable projects

**Total Tabs:** 8 sections  
**Estimated time to fill:** 40-60 minutes  
**Difficulty:** Medium-High (requires clear environmental thinking)

---

## Why Sustainability Matters

The sustainability page communicates:

- ✅ Your studio's environmental values
- ✅ Commitment to ecological responsibility
- ✅ Frameworks and standards you follow
- ✅ How sustainability is integrated into practice
- ✅ Attractiveness to environmentally-conscious clients

---

## Tab-by-Tab Breakdown

---

# 01 // HERO & MANIFESTO

### What This Tab Does

Defines the **opening section** (hero statement, manifesto, intro).

---

## Field: Manifesto / Intro (object)

**Field Name:** `manifesto` (object)

**What to enter:**

```
Opening environmental statement.
Sets tone for entire sustainability page.
Overline + Heading + Lead body text.
```

**Sub-fields:**

### Overline (optional)

```
Label above main heading.

Examples:
├─ "Environmental Responsibility // Ecological Stewardship"
├─ "Our Commitment"
├─ "Sustainability // Practice"
└─ "Environmental Principles"
```

### Heading (required, max 120 chars)

```
Main manifesto statement.
Powerful and memorable.

Examples:
├─ "Architecture that endures — for people and for the planet."
├─ "Sustainable design is good design."
├─ "The only sustainable architecture is responsive architecture."
├─ "Buildings that heal, not harm."
└─ "Environmental responsibility is fundamental."
```

### Lead Body (required, 600 chars max)

```
Editorial introduction to sustainability approach.
Explains your environmental philosophy.

Example:
"We believe that sustainable architecture begins with honest
design. Buildings should respond to their specific place—
climate, geography, materials. They should perform well
passively before relying on mechanical systems. Materials
should be chosen for durability and environmental impact.
Construction should support local economy and craft traditions.
The result is architecture that is good for the planet, good
for users, and enduring for decades."
```

**Length:**

- 450-600 characters
- 3-5 sentences
- Powerful and authentic

**Real Example:**

```
Manifesto:
├─ Overline: "Environmental Responsibility // Ecological Stewardship"
├─ Heading: "Architecture that endures — for people and for the planet."
└─ Body: "We believe sustainable architecture begins with honest
        design. Buildings should respond to their specific place:
        climate, geography, materials. They should perform passively
        before relying on mechanical systems. Materials should be
        chosen for durability and environmental impact. Construction
        should support local economy and craft. The result is
        architecture that is good for the planet, good for users,
        and enduring for decades."
```

---

# 02 // PHILOSOPHY

### What This Tab Does

Defines your **environmental philosophy** (longer statement).

---

## Field: Philosophy Statement (object)

**Field Name:** `philosophy` (object)

**What to enter:**

```
Comprehensive environmental thinking.
Longer than manifesto.
Explains "why" sustainability matters.
```

**Sub-fields:**

### Heading (required, max 120 chars)

```
Title of philosophy statement.

Examples:
├─ "Good architecture is inherently sustainable."
├─ "Sustainability is not a feature—it's a foundation."
├─ "Designing for durability."
├─ "Responsive design is sustainable design."
└─ "Environmental responsibility through craft."
```

### Body Copy (required, 800 chars max)

```
Detailed environmental philosophy.
Your approach and values.

Examples:

Philosophy 1:
"We believe that the most sustainable building is the one that
lasts—physically, emotionally, and socially. A building constructed
with durable materials, well-crafted details, and deep response to
place will be occupied and cherished for generations. It will not
need replacement. It will not be demolished. Its embodied energy
will be amortized across decades of life.

This approach begins with material honesty. We choose materials for
their durability, thermal mass, and environmental origin. We prefer
local materials, traditional craft, and connection to geological place.

Sustainability also means designing for passive performance. Buildings
should respond to climate passively. Orientation, fenestration, thermal
mass, and shading should minimize mechanical systems. The building
should breathe with the season."

---

Philosophy 2:
"Sustainable architecture is not about technical systems or
certifications alone. It is about place-based thinking. Every project
sits on a specific site with unique climate, geology, culture, and
materials. Our responsibility is to design in dialogue with that place,
not against it.

This means studying how light moves through seasons. Understanding local
building traditions. Using materials that connect to the land. Designing
buildings that use less energy because they respond intelligently to their
context.

It means creating buildings that people want to maintain and improve over
time. Buildings with soul. Buildings that age beautifully. These buildings
live longer, consume less resources, and contribute more to community than
any highly optimized but soulless structure."

---

Philosophy 3:
"Sustainability is a holistic commitment. It is not one department or one
decision. It is woven through every phase of design and construction.

In Discovery: we analyze climate, materials, and site conditions. We
research local traditions and construction methods. We understand what
building longevity means in this place.

In Design: we make decisions about orientation, thermal mass, fenestration,
and material palette. We design for passive performance first. We specify
durable, responsibly-sourced materials.

In Documentation: we specify performance targets. We detail for durability.
We communicate intent clearly to builders and craftspeople.

In Construction: we oversee material quality. We ensure proper construction
methods. We prioritize craft excellence that will endure."
```

**Length:**

- 700-800 characters
- 5-8 sentences or short paragraphs
- Comprehensive and nuanced
- Personal and authentic

**Real Example:**

```
Philosophy:
├─ Heading: "Good architecture is inherently sustainable."
└─ Body: "We believe that the most sustainable building is one
        that lasts. A building constructed with durable materials,
        well-crafted details, and deep response to place will be
        occupied for generations. This approach begins with material
        honesty—choosing materials for durability, thermal mass, and
        environmental origin. We prefer local materials and
        traditional craft. Sustainability also means designing for
        passive performance. Buildings should respond to climate
        through orientation, fenestration, and thermal mass. We
        minimize mechanical systems. The building breathes with the
        season. This is sustainable architecture: place-based,
        durable, crafted, and alive."
```

---

# 03 // MATERIAL MEDIA

### What This Tab Does

Manages an **editorial image** showing materials and craft.

---

## Field: Material Study Image

**Field Name:** `materialImage` (Optional, image)

**What to enter:**

```
Full-width photograph of materials or craft work.
Shows your approach to material selection.
Educational and beautiful.
```

**What makes a good material image:**

```
✅ GOOD:
├─ Material samples arranged thoughtfully
├─ Timber, stone, concrete, earth tones
├─ Natural light on surfaces
├─ Shows texture and aging potential
├─ Studio work table with materials
├─ Craftspeople at work with materials
├─ Close detail of material craft
└─ Professional, artistic composition

❌ AVOID:
├─ Generic material samples
├─ Poor lighting
├─ Stock photo feel
└─ No connection to craft or practice
```

**Sub-fields:**

### Alt Text (required, accessibility)

```
Accessibility description.

Example:
"Material samples at the studio table—stone, timber, and earth,
showing natural textures and aging potential"
```

### Caption (optional)

```
Text displayed under image.

Examples:
├─ "Material samples at the studio table — stone, timber, and earth."
├─ "Where material choices are made"
└─ "Durability and environmental origin"
```

**Real Example:**

```
Material Study Image:
├─ File: sustainability-material-image.jpg (2400x1600px)
├─ Alt Text: "Material samples on studio work table showing stone,
│            timber, and concrete with natural textures"
└─ Caption: "Material samples at the studio table — stone, timber, and earth"
```

---

# 04 // FOUR COMMITMENTS

### What This Tab Does

Defines your **core environmental commitments** (4 pillars).

---

## Field: Core Commitments (array)

**Field Name:** `commitments` (Optional, array)

**What to enter:**

```
4 fundamental environmental commitments.
Each commitment: number, title, description.
Your sustainability pillars.
```

**Structure for each commitment:**

### Index Number (optional)

```
Sequential number (01, 02, 03, 04).

Examples:
├─ "01"
├─ "02"
├─ "03"
└─ "04"
```

### Title (required, max 80 chars)

```
Name of the commitment.

Examples:
├─ "Material Honesty & Durability"
├─ "Responsive Design"
├─ "Passive Performance"
├─ "Local Materials & Craft"
├─ "Ecological Integration"
├─ "Embodied Carbon Reduction"
├─ "Adaptive Reuse"
└─ "Stakeholder Engagement"
```

### Description (required, 600 chars max)

```
What this commitment means and how you practice it.

Examples:

COMMITMENT 1: Material Honesty & Durability
"We choose materials for their true nature, durability, and
environmental impact. Concrete is honest concrete. Timber shows
its grain and ages beautifully. Stone reveals geological time.
We avoid materials that pretend to be something they are not.
We specify materials that will endure decades of use. The most
sustainable material is the one that lasts—that is not replaced,
disposed of, or demolished. Our material choices reflect this
commitment to longevity."

---

COMMITMENT 2: Responsive Design
"Sustainable design begins with place. We design in response to
specific site conditions: climate, topography, geology, culture,
existing materials. Buildings should sit comfortably on their
place. They should respond to seasonal light patterns, prevailing
winds, and local temperatures. This responsive approach minimizes
the need for mechanical systems. It uses the site's natural
advantages. It connects building to place in deep and authentic ways."

---

COMMITMENT 3: Passive Performance First
"We design buildings to perform well passively before adding
mechanical systems. Proper orientation, fenestration, thermal mass,
and shading should reduce heating and cooling loads dramatically.
Daylighting should replace artificial light. Natural ventilation
should replace mechanical systems where possible. Only after passive
strategies are maximized do we add active systems. This approach
reduces operational energy consumption and cost."

---

COMMITMENT 4: Local Materials & Craft
"We source materials locally when possible and ethical. Local
materials have lower transportation impacts. They connect buildings
to geological place. We support local economy and craft traditions.
We work with regional craftspeople. We value traditional construction
methods adapted with contemporary technology. This commitment to local
materials and craft creates buildings that belong to their place."

---

COMMITMENT 5: Adaptive Reuse
"We believe in renovation and adaptive reuse. Existing buildings hold
embodied energy, materials, heritage, and memory. Renovation is better
than demolition. Adaptive reuse is sustainable reuse. We design
renovations that improve performance, upgrade accessibility, and
create new possibility. We respect architectural heritage while
making buildings relevant for today."

---

COMMITMENT 6: Ecological Integration
"We design with nature, not against it. Gardens, landscape, and green
infrastructure are central to our work. We understand stormwater
management, native plantings, and habitat creation as design tools.
We design buildings that improve ecological performance—reduce heat
island effect, support biodiversity, manage water responsibly. The
building and its landscape work as one integrated system."
```

**Length:**

- 500-600 characters per commitment
- 3-4 sentences
- Specific and actionable
- Shows how you practice it

---

### Complete Commitments Example (4)

```
Commitment 1:
├─ Number: "01"
├─ Title: "Material Honesty & Durability"
└─ Description: [material honesty narrative]

Commitment 2:
├─ Number: "02"
├─ Title: "Responsive Design"
└─ Description: [responsive design narrative]

Commitment 3:
├─ Number: "03"
├─ Title: "Passive Performance"
└─ Description: [passive performance narrative]

Commitment 4:
├─ Number: "04"
├─ Title: "Local Materials & Craft"
└─ Description: [local materials narrative]
```

**Number of commitments:**

- Typical: 4 commitments
- Can be 3-5
- Should represent core pillars
- Should be genuinely practiced

---

# 05 // GUIDING PRINCIPLES

### What This Tab Does

Lists **architectural tenets** and design aphorisms.

---

## Field: Guiding Principles (array)

**Field Name:** `principles` (Optional, array of text)

**What to enter:**

```
Concise sustainability principles or aphorisms.
Each principle is one short statement.
List of core ideas guiding your work.
```

**Examples:**

```
Guiding Principles:
├─ "The most sustainable building is the one that lasts."
├─ "Responsive design is inherently sustainable."
├─ "Material honesty creates environmental honesty."
├─ "Durability is the best sustainability strategy."
├─ "Design for place, not for style."
├─ "Passive strategies first, systems second."
├─ "Local materials, local craft, local economy."
├─ "Renovation before demolition."
├─ "Beauty makes buildings endure."
├─ "Ecological integration is design integration."
├─ "Quality craftsmanship is environmental commitment."
├─ "Light, materials, and climate are primary design tools."
└─ "Simplicity is sustainable."
```

**Format:**

- Short, memorable phrases
- 8-15 principles typical
- Can stand alone as design mantras
- Mix practical and philosophical
- Use array/tags format

**Real Example:**

```
Guiding Principles:
├─ "The most sustainable building is the one that lasts."
├─ "Responsive design minimizes waste and energy."
├─ "Material honesty is environmental honesty."
├─ "Durability beats certification."
├─ "Design with climate, not against it."
├─ "Passive strategies first."
├─ "Local materials, local craft."
├─ "Renovation before demolition."
├─ "Beauty matters—it makes buildings endure."
├─ "Ecological integration from beginning to end."
└─ "Simplicity is sustainable."
```

---

# 06 // FRAMEWORKS & CERTIFICATIONS

### What This Tab Does

Lists **environmental standards and certifications** you follow.

---

## Field: Environmental Frameworks & Standards (array)

**Field Name:** `certifications` (Optional, array)

**What to enter:**

```
Building standards and environmental certifications.
Frameworks that guide your work.
Each: standard name + full description.
```

**Structure for each framework:**

### Standard Name (required)

```
Acronym or abbreviated name.

Examples:
├─ "BREEAM"
├─ "LEED"
├─ "Passive House"
├─ "Living Building Challenge"
├─ "WELL"
├─ "Fitwel"
├─ "DGNB"
├─ "HQE"
└─ "EarthCheck"
```

### Scope / Full Title (required)

```
Full name and scope.

Examples:
├─ "Building Research Establishment Environmental Assessment Method"
├─ "Leadership in Energy and Environmental Design"
├─ "Certified Passive House Standard"
├─ "Living Building Challenge – Regenerative Building Design"
├─ "WELL Building Standard – Health and Wellness"
├─ "Deutsche Gesellschaft für Nachhaltiges Bauen"
└─ "Haute Qualité Environnementale (High Environmental Quality)"
```

---

### Complete Frameworks Example

```
Framework 1:
├─ Name: "BREEAM"
└─ Scope: "Building Research Establishment Environmental
          Assessment Method – UK building certification"

Framework 2:
├─ Name: "LEED"
└─ Scope: "Leadership in Energy and Environmental Design –
          International building sustainability rating system"

Framework 3:
├─ Name: "Passive House"
└─ Scope: "Certified Passive House Standard – Ultra-low energy
          building standard with rigorous performance targets"

Framework 4:
├─ Name: "Living Building Challenge"
└─ Scope: "Living Building Challenge – Regenerative building
          framework addressing social and environmental impact"

Framework 5:
├─ Name: "WELL"
└─ Scope: "WELL Building Standard – Framework focusing on human
          health, wellness, and indoor environmental quality"

Framework 6:
├─ Name: "DGNB"
└─ Scope: "Deutsche Gesellschaft für Nachhaltiges Bauen –
          German holistic sustainability rating system"
```

**Number of frameworks:**

- Typical: 3-6 frameworks
- Only include ones you actually use/follow
- Be honest about which projects use which standard
- Can vary by project type

**Real Example:**

```
Environmental Frameworks:
├─ BREEAM: "Building Research Establishment Environmental
           Assessment Method"
├─ Passive House: "Certified passive house standard with ultra-low
                  energy performance targets"
├─ LEED: "Leadership in Energy and Environmental Design –
         International sustainability rating system"
└─ Living Building Challenge: "Regenerative framework addressing
                             social and environmental impact"
```

---

# 07 // COLLABORATION CTA

### What This Tab Does

Creates a **call to action** for sustainable project collaboration.

---

## Field: Collaboration Call to Action (object)

**Field Name:** `collaboration` (object)

**What to enter:**

```
Final invitation for sustainable project collaboration.
Encourages clients interested in environmental design.
```

**Sub-fields:**

### Heading (required, max 100 chars)

```
Main CTA heading.

Examples:
├─ "Sustainable architecture starts with the brief."
├─ "Design sustainability from the start."
├─ "Let's create together."
├─ "Want to build something sustainable?"
└─ "Environmental design as a foundation."
```

### Body Text (required, 400 chars max)

```
Collaboration message.

Examples:
├─ "If you have a project and want to prioritize
   environmental responsibility from the beginning,
   let's talk. We believe sustainable design is good
   design—it creates better buildings that last longer
   and improve how people live."

├─ "Sustainability isn't an add-on. It's fundamental
   to our approach. If you're interested in creating
   environmentally responsive buildings, we'd love to
   explore your project with you."

└─ "We're always interested in projects where
   environmental responsibility and place-based design
   are central. If that resonates with your vision,
   let's connect."
```

### CTA Button Label (optional)

```
Button text.

Examples:
├─ "Start a Conversation"
├─ "Discuss Your Project"
├─ "Get in Touch"
└─ "Contact Us"
```

---

### Complete Collaboration Example

```
Collaboration CTA:
├─ Heading: "Sustainable architecture starts with the brief."
├─ Body: "If you have a project and want to prioritize
│        environmental responsibility from the beginning,
│        let's talk. We believe sustainable design is good
│        design. It creates buildings that last longer and
│        improve how people live."
└─ Button: "Start a Conversation"
```

---

# 08 // SEO

### What This Tab Does

Controls how sustainability page appears in **search engines**.

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
├─ "Sustainable Architecture – RAFA Design"
├─ "Environmental Design & Sustainability | RAFA Design"
└─ "Sustainable Buildings & Eco-Responsive Design"

❌ AVOID:
├─ Too long
└─ Keyword stuffing
```

**Real Example:**

```
Meta Title: "Sustainable Architecture & Environmental Design | RAFA Design"
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
├─ "RAFA Design's approach to sustainable architecture.
   We design durable, responsive buildings that are
   good for people and the planet."

└─ "Sustainable architecture through material honesty,
   responsive design, and ecological integration.
   Learn our environmental commitments."

❌ AVOID:
├─ Too long
└─ Generic "sustainability is important"
```

**Real Example:**

```
Meta Description: "Sustainable architecture through material
honesty, responsive design, and passive performance.
Discover RAFA Design's environmental commitments."
```

---

# WORKFLOW: SETTING UP SUSTAINABILITY PAGE

**Step-by-step example:**

```
1. Go to /admin → "10 // Sustainability 🌱"
2. Find "Sustainability Page" document (singleton)
3. Click to edit

FILL 01 // HERO & MANIFESTO:
4. Overline: "Environmental Responsibility // Ecological Stewardship"
5. Heading: "Architecture that endures — for people and for the planet."
6. Lead Body: [environmental manifesto]

FILL 02 // PHILOSOPHY:
7. Heading: "Good architecture is inherently sustainable."
8. Body Copy: [comprehensive environmental philosophy]

FILL 03 // MATERIAL MEDIA:
9. Material Study Image: [material samples photo]
   ├─ Alt Text: [accessibility description]
   └─ Caption: [optional label]

FILL 04 // FOUR COMMITMENTS:
10. Create 4 commitments. For each:
    ├─ Number: "01", "02", etc.
    ├─ Title: [commitment name]
    └─ Description: [what it means]

FILL 05 // GUIDING PRINCIPLES:
11. Add 8-12 guiding principles (array of short statements)

FILL 06 // FRAMEWORKS & CERTIFICATIONS:
12. Add 3-6 environmental standards (name + full description)

FILL 07 // COLLABORATION CTA:
13. Heading: [CTA heading]
14. Body: [collaboration message]
15. Button Label: "Start a Conversation"

FILL 08 // SEO:
16. Meta Title: [search result title]
17. Meta Description: [search result summary]

18. [Publish]
```

---

# QUICK REFERENCE: WHAT'S REQUIRED

```
REQUIRED (must fill):
✅ Manifesto Heading
✅ Manifesto Body
✅ Philosophy Heading
✅ Philosophy Body

HIGHLY RECOMMENDED:
⭐ Hero Overline
⭐ Material Study Image (with alt text)
⭐ 4 Core Commitments
⭐ 8-12 Guiding Principles
⭐ 3-6 Environmental Frameworks
⭐ Collaboration CTA
⭐ SEO Meta Title & Description

OPTIONAL:
⚪ Material Image caption
```

---

# BEST PRACTICES

**Environmental messaging:**

- ✅ Be authentic, not greenwashing
- ✅ Specific examples of your practice
- ✅ Honest about limitations and challenges
- ✅ Show how sustainability integrates into all work
- ✅ Avoid corporate jargon

**Commitments & principles:**

- ✅ Should be genuinely practiced
- ✅ Not just aspirational
- ✅ Specific and actionable
- ✅ Show trade-offs and complexities
- ✅ Updated as practice evolves

**Frameworks:**

- ✅ Only include standards you actually use
- ✅ Be clear about scope (which projects?)
- ✅ Can vary by project type
- ✅ Certifications are tools, not goals

**Photography:**

- ✅ Material images should be beautiful and educational
- ✅ Show aging potential and durability
- ✅ Professional quality
- ✅ Reflect your actual practice

---

## DONE ✅

All Sustainability Page schema fields explained with real examples.

---

# 🎉 ALL 10 SCHEMAS COMPLETE

**Comprehensive guides created:**

1. ✅ 01-PROJECTS-SCHEMA-ADMIN-GUIDE.md
2. ✅ 02-JOURNAL-SCHEMA-ADMIN-GUIDE.md
3. ✅ 03-SERVICES-SCHEMA-ADMIN-GUIDE.md
4. ✅ 04-TEAM-SCHEMA-ADMIN-GUIDE.md
5. ✅ 05-STUDIO-SCHEMA-ADMIN-GUIDE.md
6. ✅ 06-CAREERS-SCHEMA-ADMIN-GUIDE.md
7. ✅ 07-CONTACT-SCHEMA-ADMIN-GUIDE.md
8. ✅ 08-SITE-SETTINGS-SCHEMA-ADMIN-GUIDE.md
9. ✅ 09-PROCESS-SCHEMA-ADMIN-GUIDE.md
10. ✅ 10-SUSTAINABILITY-SCHEMA-ADMIN-GUIDE.md

**Total coverage:**

- 10 comprehensive admin guides
- 60+ fields explained
- 150+ real examples
- 10 complete workflows
- All best practices documented

**Studio ready:** Owners can now populate any schema independently with professional guidance.
