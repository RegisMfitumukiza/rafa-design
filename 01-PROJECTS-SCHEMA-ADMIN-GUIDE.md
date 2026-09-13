# Projects Schema — Complete Admin Guide

**For:** Studio owners, project coordinators, and content managers  
**Purpose:** Know exactly what to fill in each field when adding a project to Sanity  
**Location:** `/admin → "01 // Projects 📐"`

---

## Overview

A project is a complete architectural work (building, renovation, interior, landscape, etc.) with all its details, images, team info, and awards.

**Total Tabs:** 8 sections  
**Estimated time to add project:** 20-30 minutes  
**Difficulty:** Medium (requires good photography and clear writing)

---

## Tab-by-Tab Breakdown

---

# 01 // IDENTITY & CLASSIFICATION

### What This Tab Does

Defines **what** the project is, **when** it happened, and **how to categorize** it.

---

## Field 1: Project Title

**Field Name:** `title` (Required)

**What to enter:**

```
The official name of the project.
Usually the building, project, or place name.
```

**Examples:**

```
✅ GOOD:
├─ Casa Monte
├─ Villa Marim
├─ Atelier Norte
├─ Porto Riverside Office Complex
└─ Baia House Renovation

❌ AVOID:
├─ Project 1
├─ New Building
└─ Design 2024
```

**Tips:**

- Use actual project name (how it's known locally or by client)
- Capitalize properly (title case)
- No extra words like "The" unless officially named that way
- Keep under 60 characters

**Real Example:**

```
Title: Casa Monte
(This is the actual project name; it appears as the page title)
```

---

## Field 2: Slug

**Field Name:** `slug` (Required, Auto-filled)

**What it is:**

```
URL-friendly version of the title.
Used in the website URL.
Automatically generated from title, but you can edit.
```

**How it appears:**

```
Title: Casa Monte
Slug: casa-monte

Website URL: /projects/casa-monte
```

**Rules:**

- Lowercase only
- Hyphens between words (no spaces)
- No special characters
- Unique (can't have two projects with same slug)

**Examples:**

```
✅ GOOD:
├─ casa-monte
├─ villa-marim
├─ atelier-norte
├─ porto-riverside-office
└─ baia-house-renovation

❌ AVOID:
├─ CasaMonte (uppercase)
├─ casa_monte (underscore)
├─ casa monte (space)
└─ casa-monte-2024 (date in slug)
```

**Tip:**
System auto-generates this from title. Edit only if needed for clarity.

---

## Field 3: Subtitle

**Field Name:** `subtitle` (Optional)

**What to enter:**

```
One-line description that appears below title on project cards.
Gives quick context about the project.
```

**Examples:**

```
✅ GOOD:
├─ "Contemporary residential design in Porto"
├─ "Adaptive reuse of industrial warehouse"
├─ "Landscape integration study"
├─ "Mixed-use urban development"
└─ "Material exploration and site response"

❌ AVOID:
├─ "Project by RAFA Design" (too generic)
├─ "Nice building" (too vague)
└─ Empty (defeats purpose)
```

**Real Example:**

```
Title: Casa Monte
Subtitle: Contemporary residential design with emphasis on materiality
(Appears on card as secondary line)
```

**Tips:**

- Keep under 60 characters
- Make it descriptive, not just descriptive
- Describes the **approach** or **type**, not the name

---

## Field 4: Categories

**Field Name:** `categories` (Required, select multiple)

**What to enter:**

```
Choose which discipline(s) the project falls under.
You can pick multiple (project might be both Architecture + Interior).
```

**Available Categories:**

```
✅ Architecture
✅ Interior
✅ Landscape
✅ Urban Design
✅ Master Planning
✅ Research
✅ Renovation
✅ Visualization
```

**Examples:**

```
Casa Monte:
├─ Architecture (main discipline)
└─ (Interior might be secondary)

Villa Marim:
├─ Architecture (main)
├─ Landscape (integrated landscape design)
└─ (select both if both are significant)

Atelier Norte:
├─ Interior (workspace design)
└─ (primary discipline)
```

**Rules:**

- At least 1 required
- Check all that apply
- No duplicates

**Real Example:**

```
Project: Casa Monte
Categories selected: [Architecture]
(Single category, but interior is part of it)
```

---

## Field 5: Typology

**Field Name:** `typology` (Required, select multiple)

**What to enter:**

```
What TYPE of building/space is this?
(Functional category, not discipline)
```

**Available Typologies:**

```
Core Types:
├─ Residential (homes, apartments)
├─ Commercial (offices, retail)
├─ Cultural (museums, galleries, performance)
├─ Adaptive Reuse (renovation of existing)
└─ Public (civic, community spaces)

Extended Types:
├─ Institutional (schools, universities, government)
├─ Mixed-Use (residential + commercial + retail)
├─ Industrial (factories, warehouses, studios)
├─ Infrastructure (transportation, utilities)
├─ Hospitality (hotels, restaurants, bars)
├─ Healthcare (clinics, hospitals, wellness)
├─ Educational (schools, training centers)
├─ Retail (stores, markets, showrooms)
├─ Sports & Recreation (gyms, pools, courts)
└─ Religious (churches, temples, prayer spaces)
```

**Examples:**

```
Casa Monte:
├─ Typology: Residential
└─ (It's a house)

Atelier Norte:
├─ Typology: Industrial (could be workspace)
└─ or Commercial (depends on use)

Porto Riverside Complex:
├─ Typology: Mixed-Use
└─ (Has residential + offices + retail)

Museum Renovation:
├─ Typology: Cultural, Adaptive Reuse
└─ (Both apply)
```

**Real Example:**

```
Project: Casa Monte
Typologies selected: [Residential]
(Single selection, clearly residential)
```

---

## Field 6: Status

**Field Name:** `status` (Required, select one)

**What to enter:**

```
Current state of the project.
Pick ONE that best describes it.
```

**Options:**

```
✅ Completed
   (Finished, occupied, available to visit)
   Examples: Casa Monte, Villa Marim, Atelier Norte

🔄 Ongoing
   (Currently under construction)
   Examples: Porto development (2024-2025)

💡 Concept
   (Early stage, design phase, not yet built)
   Examples: Conceptual studies, design proposals

🏆 Competition
   (Won competition, but not yet built)
   Examples: Competition submissions, proposals
```

**Real Examples:**

```
Casa Monte → Completed (finished in 2018)
New Porto Development → Ongoing (under construction)
Museum Concept → Concept (design proposal)
Competition Entry → Competition (won award, pending approval)
```

**Tip:**
Status affects how it appears on website and search. Use accurate status.

---

## Field 7: Year

**Field Name:** `year` (Required, number)

**What to enter:**

```
Year of project completion or last significant milestone.
```

**Examples:**

```
Casa Monte: 2018 (completed)
Atelier Norte: 2020 (completed)
Villa Marim: 2022 (completed)
Concept Project: 2024 (current year if recent)
Porto Development: 2024 (started) or 2025 (completion year)
```

**Rules:**

- 4-digit year (e.g., 2024, not '24)
- Must be between 1900-2100
- Use year project completed, or current year if ongoing

**Tip:**
Used for timeline sorting (newest first usually).

---

# 02 // LOCATION & SPECIFICATIONS

### What This Tab Does

Captures **where** the project is and **how big** it is.

---

## Field 1: Location (City & Country)

**Field Name:** `location` (Required, object with two parts)

### City

**What to enter:**

```
City where the project is located.
```

**Examples:**

```
✅ Porto
✅ Lisbon
✅ Kigali
✅ New York
✅ Barcelona
```

### Country

**What to enter:**

```
Country name (full name).
```

**Examples:**

```
✅ Portugal
✅ Rwanda
✅ USA
✅ Spain
```

**Real Example:**

```
Casa Monte Location:
├─ City: Porto
└─ Country: Portugal
(Shows as "Porto, Portugal" on website)
```

---

## Field 2: Coordinates (Latitude & Longitude)

**Field Name:** `coordinates` (Optional, object)

**What to enter:**

```
GPS coordinates of the project location.
Useful for maps and location discovery.
Composed of 3 sub-fields.
```

### Latitude

**What to enter:**

```
North/South position (-90 to +90)
Positive = North, Negative = South
```

**Example:**

```
Casa Monte: 41.1579
(North of equator, Portugal)
```

### Longitude

**What to enter:**

```
East/West position (-180 to +180)
Positive = East, Negative = West
```

**Example:**

```
Casa Monte: -8.6291
(West of prime meridian, Portugal)
```

### Label

**What to enter:**

```
Optional human-readable label for coordinates.
Shows instead of raw numbers on website.
```

**Examples:**

```
✅ "41.1579° N, 8.6291° W"
✅ "Porto, Portugal"
✅ "41°N 8°W"
```

**Real Example:**

```
Casa Monte Coordinates:
├─ Latitude: 41.1579
├─ Longitude: -8.6291
└─ Label: "Porto, Portugal"

(Displays as: "41.1579° N, 8.6291° W" or "Porto, Portugal")
```

**How to find coordinates:**

1. Search location on Google Maps
2. Right-click on location
3. Click coordinates at top
4. Decimal coordinates appear (copy these)

---

## Field 3: Area (m²)

**Field Name:** `areaM2` (Optional, number)

**What to enter:**

```
Total area of project in square meters.
```

**Examples:**

```
Casa Monte: 450 (m²)
Villa Marim: 850 (m²)
Atelier Norte: 1200 (m²)
Porto Complex: 25000 (m²)
```

**Tips:**

- Enter only the number (e.g., 450, not "450 m²")
- Use total built area
- Can leave empty if not applicable (e.g., landscape projects)

**Real Example:**

```
Casa Monte Area: 450
(Means 450 square meters)
```

---

# 03 // EDITORIAL & STORY

### What This Tab Does

Tells the **story** of the project: why it was designed this way, what makes it special.

---

## Field 1: Design Concept

**Field Name:** `concept` (Optional, text)

**What to enter:**

```
One sentence stating the central design idea.
This appears in LARGE TYPE on the project detail page.
The core philosophy of the design.
```

**Examples:**

```
Casa Monte:
"A contemporary home that responds to the specific
geography of the site through careful material selection
and spatial layering."

Villa Marim:
"Interior spaces defined by the relationship between
natural light, material honesty, and human scale."

Atelier Norte:
"A workspace designed to facilitate creative collaboration
through fluid spatial connections and natural light."
```

**Tips:**

- 1 sentence (can be long)
- Poetic but clear
- Captures the **why**, not the **what**
- Appears prominently on detail page

**Real Example:**

```
Concept: "Design rooted in the dialogue between
landscape and material expression."
```

---

## Field 2: Description

**Field Name:** `description` (Required, text)

**What to enter:**

```
Short paragraph explaining the project.
Used on listing cards, search results, SEO.
More detailed than concept but shorter than full story.
```

**Examples:**

```
Casa Monte:
"Contemporary residential design in Porto that integrates
site topography with refined material palette. The home
responds to landscape context while establishing clear
spatial hierarchies and intimate living zones."

Villa Marim:
"Residential interior renovation emphasizing materiality
and craft. Natural light drives spatial experience through
strategic window placement. Bespoke joinery and material
selection create warmth and human-scaled environments."

Atelier Norte:
"Adaptive reuse of industrial warehouse into collaborative
design studio. Open-plan spaces encourage creative exchange
while maintaining focused work zones. Existing structure
celebrated through honest material restoration."
```

**Length:**

- 3-5 sentences
- 100-150 words ideal
- Clear and descriptive

**Tips:**

- Explain the PROJECT, not the firm
- What makes it different/special?
- Avoid generic language
- Describe approach or concept

**Real Example:**

```
Description: "Contemporary residential design integrating
landscape topography with refined material palette. The
design responds to site context through careful spatial
layering and material selection, creating intimate living
environments."
```

---

## Field 3: Story (Legacy)

**Field Name:** `story` (Optional, text)

**What to enter:**

```
Full narrative about the project.
Only used if you DON'T use the Chapters system (see next).
Use this for simpler, single-block projects.
Or leave empty if using Chapters.
```

**When to use:**

```
USE Story if:
├─ Simple project with one main narrative
├─ No complex multi-section breakdown
└─ Don't want to use Chapters system

DON'T use Story if:
├─ Using Chapters for detailed breakdown
└─ Project has multiple story sections
```

**Length:**

- 400-800 words
- Full narrative paragraph or two
- Complete story of project

**Real Example:**

```
Story: "Casa Monte represents a 10-year journey to
understand site-responsive design. Located on a sloped
property overlooking Porto, the home emerges from the
landscape rather than imposing upon it. The design began
with months of site study: observing light patterns,
understanding seasonal changes, and mapping local materials.
This informed a material palette of local stone, weathered
timber, and refined concrete that responds to the specific
geography of place..."
```

---

## Field 4: Chapters (with Images & Narrative)

**Field Name:** `chapters` (Optional, array)

**What to enter:**

```
Ordered sections of the project story, each with text and image.
Use this for detailed, visual storytelling.
Better for complex projects with multiple aspects.
```

**What each chapter contains:**

```
├─ Heading (optional label like "01 // Context")
├─ Body (text narrative, 2-3 sentences per chapter)
├─ Image (chapter image, with metadata)
└─ Image Intent (what the image represents)
```

### Chapter Image Fields

Each image in a chapter has:

```
1. Image File
   └─ The photo for this chapter section

2. Alt Text (required)
   └─ "Contemporary living room with large windows
       overlooking Porto landscape"

3. Caption (optional)
   └─ "The main living space responds to the slope
       of the site"

4. Narrative (optional)
   └─ "Light becomes a design tool here, shifting
       throughout the day and seasons."

5. Intent (required, pick one)
   └─ What does this image represent?
      ├─ Design Intent (concept clarity)
      ├─ Spatial Experience (how space feels)
      ├─ Materiality (materials/finishes)
      ├─ Site Relationship (context, surroundings)
      ├─ Environmental (landscape/nature)
      └─ Construction (building process)

6. Full Bleed (optional toggle)
   └─ Show image edge-to-edge? (cinematic effect)
```

**Examples:**

```
Chapter 1:
├─ Heading: "01 // Context"
├─ Body: "The site slopes steeply toward Porto's
│         waterfront. An existing oak tree occupies
│         the center of the property. These constraints
│         became the primary drivers of form."
└─ Image: [Photo of site context]
   ├─ Alt: "Sloped site with mature oak tree overlooking Porto"
   ├─ Caption: "The oak tree anchors the design strategy"
   ├─ Intent: Site Relationship
   └─ Full Bleed: Yes

Chapter 2:
├─ Heading: "02 // Materials"
├─ Body: "Local limestone quarried nearby provides
│         the structural palette. Timber from forests
│         in northern Portugal brings warmth to interiors.
│         Together, these materials respond to place."
└─ Image: [Material detail photo]
   ├─ Alt: "Close-up of limestone foundation with timber frame detail"
   ├─ Caption: "Material joinery detail"
   ├─ Intent: Materiality
   └─ Full Bleed: No

Chapter 3:
├─ Heading: "03 // Light"
├─ Body: "Windows position follow the path of sun
│         throughout day. Morning light floods the kitchen.
│         Afternoon light settles in the study. Evening
│         light softens in bedrooms."
└─ Image: [Interior light photo]
   ├─ Alt: "Living room filled with afternoon sunlight"
   ├─ Caption: "Afternoon light in the main living space"
   ├─ Intent: Spatial Experience
   └─ Full Bleed: Yes
```

**Tips:**

- Order chapters logically (start, middle, end or concept, process, result)
- Each chapter = one idea or moment
- Images should support text, not replace it
- 2-5 chapters typical

**Real Example (Full Casa Monte Chapter):**

```
Chapter 1:
├─ Heading: "01 // Site Response"
├─ Body: "The property slopes steeply toward Porto.
│         An existing oak tree occupies the center.
│         The design emerged from respecting these
│         natural constraints rather than fighting them."
└─ Image: [Site overview photo]
   ├─ Alt: "Contemporary home integrated into sloped site"
   ├─ Caption: "The home emerges from the landscape"
   ├─ Narrative: "4 years of site study informed every decision"
   ├─ Intent: site-relationship
   └─ Full Bleed: true
```

---

## Field 5: Material Narrative

**Field Name:** `materialNarrative` (Optional, array)

**What to enter:**

```
List of key materials with explanation of WHY each was chosen.
Celebrates the material choices and design thinking.
```

**What each material needs:**

```
├─ Material Name
│  └─ "Local limestone", "Reclaimed oak", "Weathered copper"
└─ Rationale (why this material)
   └─ "Selected for its connection to local geology
       and weathering patterns that echo the site's
       natural history"
```

**Examples:**

```
Material 1:
├─ Name: Local Limestone
└─ Rationale: "Quarried from nearby sources, this stone
              connects the building to its geological place.
              The pale tone responds to Portugal's light."

Material 2:
├─ Name: Weathered Timber Cladding
└─ Rationale: "Forest-harvested timber develops a silver
              patina over time. This connects the building
              to the landscape's material transformation."

Material 3:
├─ Name: Concrete Poured-in-Place
└─ Rationale: "Structural concrete provides honest expression
              of the building's framework. Its thermal mass
              helps regulate interior climate naturally."
```

**Tips:**

- 3-5 materials typical
- Explain the **choice**, not just what it is
- Think about origin, durability, meaning

**Real Example:**

```
Casa Monte Materials:

Material 1:
├─ Name: Local Stone (Granite)
└─ Rationale: "Sourced from quarries within 50km.
              Connects the building to regional geology."

Material 2:
├─ Name: Reclaimed Oak Timber
└─ Rationale: "Salvaged from 19th-century structures.
              Brings history and patina into contemporary space."
```

---

## Field 6: Light Strategy

**Field Name:** `lightStrategy` (Optional, text)

**What to enter:**

```
How daylight was used as a DESIGN TOOL.
Not just "there are windows" but how light shapes the space.
```

**Examples:**

```
Casa Monte:
"Fenestration designed to follow sun path. Morning light
floods eastern side during breakfast. Mid-day southern
exposure warms the primary living space. Evening western
light softens in bedroom zones. Upper windows capture
diffuse northern light for studio space."

Villa Marim:
"Strategic window placement creates dramatic light transitions.
Entry foyer remains cool and shaded, contrasting with bright
living spaces. High clerestory windows provide ambient light
while maintaining privacy. Light becomes a material itself,
shifting throughout seasons."
```

**Tips:**

- Specific about directions and times
- Describes emotional/spatial effect
- Shows intentional design thinking
- 2-3 sentences

**Real Example:**

```
Light Strategy: "Windows follow the sun path through the day.
Eastern exposure warms the kitchen at sunrise. Southern light
fills the main living space mid-day. Western light softens
in evening bedrooms. This dynamic strategy reduces artificial
lighting needs while connecting occupants to daily rhythms."
```

---

## Field 7: Site Response

**Field Name:** `siteResponse` (Optional, text)

**What to enter:**

```
How the building responds to and respects the specific site.
Topography, climate, views, existing conditions, etc.
```

**Examples:**

```
Casa Monte:
"The sloped topography determined the floor plan. By following
contours rather than cutting into the hill, the design minimizes
site disturbance. The oak tree is preserved as a focal point of
the entry courtyard. Orientation maximizes southern exposure
while northern facade provides privacy from neighboring properties."

Villa Marim:
"Built into a coastal hillside, the design uses the grade change
to its advantage. Upper level provides ocean views while lower
level remains sheltered from wind. Material selection references
local geology—stone from nearby quarries gives the building a
sense of place."
```

**Tips:**

- Specific about topography/climate
- Shows respect for existing conditions
- Describes how site shaped design
- 2-3 sentences

**Real Example:**

```
Site Response: "Located on a steep slope overlooking Porto,
the design follows the natural grade change. Rather than
cutting into the hillside, we built into the slope, minimizing
site disturbance. The existing oak tree anchors the entry,
and southern orientation maximizes light and views while
minimizing exposure to winter winds."
```

---

# 04 // PHOTOGRAPHY & MEDIA

### What This Tab Does

Contains all images and videos for the project.

---

## Field 1: Hero Image

**Field Name:** `heroImage` (Required, image file)

**What to enter:**

```
The MOST IMPORTANT image of the project.
The cinematic opening photograph.
First impression of the project.
Shows at top of detail page in large format.
```

**What makes a good hero image:**

```
✅ GOOD:
├─ Cinematic, well-composed shot
├─ Shows the building/project clearly
├─ Professional photography quality
├─ Captures the essence/character
├─ Wide shot (landscape orientation)
└─ High resolution (at least 2000px wide)

❌ AVOID:
├─ Small/thumbnail quality photo
├─ Blurry or poorly lit
├─ Snapshot/casual phone photo
├─ Detail/close-up only
└─ Portrait orientation (too narrow)
```

**Examples of good hero images:**

```
Casa Monte:
├─ Wide shot of building in landscape context
├─ Captured during golden hour (warm light)
├─ Shows relationship to site
└─ Professional architectural photography

Villa Marim:
├─ Exterior facade with refined materials
├─ Clear architectural language
├─ Beautiful lighting
└─ Shows the character of design
```

**Sub-fields:**

### Alt Text (required for accessibility)

```
Describe the image for screen readers.
What you see in the image in plain language.

Example:
"Contemporary home of pale stone and timber
integrated into a sloped Porto landscape with
an existing oak tree in foreground"
```

### Caption (optional)

```
Text describing what the image shows.
Appears below the hero image.

Example:
"The home emerges from the landscape,
responding to topography through material
and spatial choice"
```

**Real Example:**

```
Hero Image:
├─ Image File: casa-monte-hero.jpg (2400x1600px)
├─ Alt Text: "Contemporary residence with pale stone
│            and timber facade on sloped Porto landscape"
└─ Caption: "The home emerges from the landscape,
            respecting both site topography and existing
            vegetation"
```

---

## Field 2: Hero Video (Optional)

**Field Name:** `heroVideo` (Optional, video file)

**What to enter:**

```
Optional short cinematic loop shown with hero image.
Ambient background video on detail page.
Creates immersive entry to project.
```

**Specifications:**

```
Format: .mp4 or .webm
Duration: ≤ 60 seconds (short loop)
Size: ≤ 50 MB
Resolution: 1080p minimum
Content: Silent or subtle sound
Purpose: Ambient, cinematic atmosphere
```

**What to film:**

```
✅ GOOD video content:
├─ Slow pan across the building
├─ Drone flyover of site
├─ Light movement through space
├─ Detail walk-through
├─ Landscape/context view
└─ Material detail close-up

❌ AVOID:
├─ People (unless essential)
├─ Talking/dialogue
├─ Fast cuts
├─ Shaky camera
└─ Dark/poorly lit footage
```

**Sub-fields:**

### Caption (optional)

```
Describes the video content.

Example:
"Cinematic approach to the home"
```

### Credit (optional)

```
Cinematographer or director name.

Example:
"Cinematography by João Silva"
```

**Real Example:**

```
Hero Video:
├─ File: casa-monte-hero-loop.mp4 (30 sec, 45MB)
├─ Caption: "Cinematic approach through the landscape"
└─ Credit: "Cinematography by João Silva"

(Optional — if not needed, leave empty)
```

---

## Field 3: Gallery

**Field Name:** `gallery` (Array of images and videos)

**What to enter:**

```
Complete collection of project photos and videos.
Ordered from most important to least.
Tells the story of the project visually.
Multiple photos from different angles, seasons, times of day.
```

**Two types of gallery items:**

### Type A: Photo Plates

Each photo needs:

```
1. Image File (required)
   └─ High-quality architectural photo

2. Alt Text (required for accessibility)
   └─ Describe what's shown

3. Caption (optional)
   └─ Context or poetic description

4. Narrative (optional)
   └─ 1-2 sentences explaining the photo

5. Intent (required — pick one)
   └─ What does this photo represent?
      ├─ design-intent (shows concept/design thinking)
      ├─ spatial-experience (how space feels)
      ├─ materiality (materials/finishes)
      ├─ site-relationship (context/landscape)
      ├─ environmental (nature/outdoors/landscape)
      └─ construction (building process)

6. Full Bleed (optional toggle)
   └─ Show edge-to-edge? (cinematic effect)
```

### Type B: Video Plates

Each video needs:

```
1. Video File (required, .mp4 or .webm)
   └─ Short video clip (15-60 seconds)

2. Poster Frame (optional)
   └─ Still image shown before playback

3. Caption (optional)
   └─ What's in the video

4. Credit (optional)
   └─ Filmmaker/cinematographer name

5. Narrative (optional)
   └─ What the video shows (construction timelapse,
      light study, spatial walkthrough, etc.)

6. Intent (required — pick one)
   └─ Same options as photos (design-intent,
      spatial-experience, etc.)

7. Full Bleed (optional)
   └─ Show edge-to-edge?
```

**Examples of Gallery Structure:**

```
Casa Monte Gallery (in order):

Photo 1:
├─ Image: Exterior from driveway approach
├─ Caption: "Arrival sequence"
├─ Intent: site-relationship
└─ Full Bleed: Yes (cinematic entrance)

Photo 2:
├─ Image: Living room with afternoon light
├─ Caption: "Main living space"
├─ Intent: spatial-experience
└─ Full Bleed: No

Photo 3:
├─ Image: Stone and timber detail
├─ Caption: "Material junction detail"
├─ Intent: materiality
└─ Full Bleed: No

Video 1:
├─ Video: 30-second pan through living space
├─ Caption: "Interior spatial experience"
├─ Intent: spatial-experience
└─ Credit: João Silva (cinematographer)

Photo 4:
├─ Image: Kitchen with morning light
├─ Intent: spatial-experience
└─ Full Bleed: Yes

... (continue with 10-20 photos total)
```

**Tips for Gallery:**

- Start with most impressive/cinematic images
- Mix wide shots and details
- Include different times of day/seasons
- 15-25 images typical for complete project
- Order tells a story (arrival → interiors → details)
- Videos break up image sequence

**Real Example (Single Gallery Item):**

```
Gallery Photo 5:
├─ Image: casa-monte-kitchen-morning.jpg
├─ Alt Text: "Kitchen with large window showing
│            morning light, pale counters, and built
│            timber cabinetry"
├─ Caption: "Kitchen flooded with morning light"
├─ Narrative: "Strategic window placement captures
│             eastern sun during breakfast hours"
├─ Intent: spatial-experience
└─ Full Bleed: false
```

---

## Field 4: Photographer Credit

**Field Name:** `photographerCredit` (Optional, text)

**What to enter:**

```
Name and possibly website of architectural photographer.
Gives credit to the photographer.
```

**Examples:**

```
✅ "Photography by João Silva"
✅ "João Silva Photography"
✅ "Architectural photography: João Silva | www.example.com"
```

**Real Example:**

```
Photographer Credit: "Photography by João Silva"
(Appears at bottom of project page)
```

---

## Field 5: Before & After

**Field Name:** `beforeAfter` (Optional, object)

**What to enter:**

```
For renovation/transformation projects only.
Shows what the site/building was before and after design.
Side-by-side comparison.
```

**What it contains:**

### Before Image (required for this section)

```
├─ Image file (before photo)
├─ Alt text
└─ Caption (e.g., "Original warehouse, 1960s")
```

### After Image (required for this section)

```
├─ Image file (after/completed photo)
├─ Alt text
└─ Caption (e.g., "Renovated studio, 2024")
```

### Overall Caption

```
└─ Describes the transformation
   (e.g., "A 40-year-old warehouse transformed
    into a contemporary design studio")
```

**Example:**

```
Before & After:
├─ Before Image:
│  ├─ File: warehouse-before.jpg
│  ├─ Alt: "Industrial warehouse with broken windows,
│  │       weathered metal facade"
│  └─ Caption: "Original warehouse, 1960s"
├─ After Image:
│  ├─ File: warehouse-after.jpg
│  ├─ Alt: "Renovated warehouse with large new
│  │       windows, cleaned stone facade, modern entrance"
│  └─ Caption: "Renovated studio, 2024"
└─ Overall Caption: "A 60-year-old warehouse
                     transformed into contemporary
                     creative studio space"
```

**Real Example (from project):**

```
Before & After:
├─ Before: Old warehouse with corrugated metal roof
├─ After: Renovated with restored stone, new windows
└─ Caption: "60-year warehouse transformed into
            collaborative design studio"
```

---

# 05 // CHAPTERS & DRAWINGS (Technical)

### What This Tab Does

Holds **technical drawings** (plans, sections, elevations) with metadata.

---

## Field: Technical Drawings

**Field Name:** `drawings` (Optional, array)

**What to enter:**

```
Architectural plans, sections, elevations, details.
Construction/technical documentation.
Each drawing is a complete set with metadata.
```

**What each drawing needs:**

```
1. Drawing Image (required)
   └─ High-res scan or render of the drawing

2. Drawing Title (required)
   └─ What is this drawing?
      ├─ "Ground Floor Plan"
      ├─ "North Elevation"
      ├─ "Section A-A"
      ├─ "Material Detail @ Scale 1:10"
      └─ "Foundation Plan"

3. Drawing Code (required)
   └─ Project drawing number
      ├─ "DWG // 01"
      ├─ "DWG // 02"
      └─ (sequential numbering)

4. Scale Notation (required)
   └─ Architectural scale
      ├─ "1:100 @ A1" (plan on A1 paper)
      ├─ "1:50 @ A3" (detail on A3 paper)
      ├─ "1:10 @ A1" (construction detail)
      └─ "As noted" (if multiple scales)

5. Alt Text (required)
   └─ Describe drawing for accessibility
      └─ "Ground floor plan showing entry,
         living areas, kitchen, and bedroom"

6. Caption (required)
   └─ Detailed technical description
      └─ "Ground floor plan showing spatial
         organization. Entry sequence leads to
         open-plan living/kitchen. Bedroom wing
         accessed via private corridor. 900mm
         door openings throughout."

7. Technical Note (optional)
   └─ Additional information
      └─ "Designed to 1:100 scale for building
         permit submission. Revised 3/15/2024
         per structural engineer feedback."
```

**Examples:**

```
Drawing 1:
├─ Title: "Ground Floor Plan"
├─ Code: "DWG // 01"
├─ Scale: "1:100 @ A1"
├─ Alt Text: "Ground floor plan with entry, living
│            room, kitchen, and master bedroom"
├─ Caption: "900mm wide doorways maintain universal
│           accessibility. Open-plan living space
│           with southern light. Separate guest
│           bedroom accessed via corridor."
└─ Note: "Dimensions in millimeters. All doors 900mm."

Drawing 2:
├─ Title: "Section A-A"
├─ Code: "DWG // 02"
├─ Scale: "1:100 @ A1"
├─ Alt Text: "Vertical section through center of
│            building showing two-story height and
│            relationship to slope"
├─ Caption: "North-south section reveals how design
│           responds to 8-meter site slope. Double-
│           height living space maximizes light and
│           spatial experience."
└─ Note: "Section taken at grid line 3. Refer to
          plan DWG // 01."

Drawing 3:
├─ Title: "North Elevation"
├─ Code: "DWG // 03"
├─ Scale: "1:100 @ A1"
├─ Alt Text: "North-facing facade showing stone base
│            and timber upper story with small window"
├─ Caption: "North elevation shows privacy response.
│           Limited fenestration on privacy side.
│           Material transition from stone base to
│           timber cladding at first floor."
└─ Note: "All timber detail per specification DET // 05."
```

**Tips for Drawings:**

- Include key plans (floor plans, elevations, sections)
- Include important details (material junctions, custom elements)
- Scale and code for each (professional documentation)
- 5-10 drawings typical for complete project
- Order logically (plans first, then sections, then details)

**Real Example:**

```
Drawing 1 (Casa Monte):
├─ Image: casa-monte-ground-floor-plan.jpg
├─ Title: Ground Floor Plan
├─ Code: DWG // 01
├─ Scale: 1:100 @ A1
├─ Alt Text: "Ground floor plan showing entry foyer,
│            open-plan living/kitchen, master bedroom,
│            bathroom, and outdoor terrace"
├─ Caption: "9-meter deep living space responds to
│           southern slope orientation. Open plan allows
│           flexibility. All windows positioned for
│           optimal light and privacy balance."
└─ Note: "Revised per structural engineer feedback
          March 2024. All doors: 900mm clear width."
```

---

# 06 // MATERIALS & SERVICES

### What This Tab Does

Lists what **services** were provided (architecture, interior, landscape, etc.) for this project.

---

## Field: Services

**Field Name:** `services` (Required, select multiple)

**What to enter:**

```
Which RAFA services were involved in this project?
Check all that apply.
```

**Available Services:**

```
✅ Architecture (main building design)
✅ Interior Design (interior spaces)
✅ Master Planning (site/district planning)
✅ Urban Design (urban context)
✅ Landscape Design (gardens, outdoor, nature)
✅ Feasibility Studies (pre-design studies)
✅ Project Management (coordination/oversight)
✅ Construction Supervision (on-site oversight)
✅ Renovation (existing building work)
✅ Visualization (renderings, 3D)
```

**Examples:**

```
Casa Monte:
├─ Services: [Architecture, Interior Design, Landscape]
└─ (Residential project with all three disciplines)

Villa Marim:
├─ Services: [Interior Design]
└─ (Interior renovation only)

Atelier Norte:
├─ Services: [Architecture, Renovation]
└─ (Adaptive reuse of existing building)

Porto Complex:
├─ Services: [Architecture, Master Planning,
│             Urban Design, Landscape]
└─ (Large multi-disciplinary project)
```

**Rules:**

- At least 1 service required
- Check all services involved (even minor roles)
- Multiple selections common for large projects

**Real Example:**

```
Casa Monte Services:
[Architecture, Interior Design, Landscape Design]
(All three disciplines were part of this project)
```

---

# 07 // TEAM & RECOGNITION

### What This Tab Does

Credit the **team** and **awards** for the project.

---

## Field 1: Client

**Field Name:** `client` (Optional, text)

**What to enter:**

```
Name of the client or developer.
Who commissioned the project.
```

**Examples:**

```
✅ "Private residential client"
✅ "Casa Monte Developments Ltd."
✅ "Porto City Planning Department"
✅ "Anonymous private client"
```

**Tips:**

- Use actual client name if public
- "Private client" or "Confidential client" if sensitive
- Can leave empty if not applicable

**Real Example:**

```
Client: "Private residential client"
```

---

## Field 2: Project Team

**Field Name:** `team` (Optional, object)

**What to enter:**

```
Team members involved in the project.
```

**What it contains:**

### Partner in Charge (optional)

```
Senior partner leading the project
Example: "João Silva"
```

### Project Lead (optional)

```
Day-to-day project architect
Example: "Maria Santos"
```

### Team Members (optional, array)

```
List of architects, designers involved
Example: ["Ana Costa", "Paulo Oliveira", "Sofia Dias"]
```

### Collaborators (optional, array)

```
External partners (engineers, consultants, etc.)
Example: ["Structural: Silva Engineering",
          "MEP: TechSys Consulting",
          "Landscape: GreenScape Design"]
```

**Real Example:**

```
Casa Monte Team:
├─ Partner in Charge: "João Silva"
├─ Project Lead: "Maria Santos"
├─ Team Members: ["Ana Costa", "Paulo Oliveira"]
└─ Collaborators: ["Structural: Silva Engineering",
                   "Landscape: Costa Landscape Design"]
```

---

## Field 3: Awards & Recognition

**Field Name:** `awards` (Optional, array)

**What to enter:**

```
Awards and honors received by this project.
```

**What each award needs:**

```
1. Award Title (required)
   └─ Name of the award
      ├─ "International Architecture Prize"
      ├─ "Best Residential Design"
      └─ "Emerging Studio Award"

2. Year (required)
   └─ When the award was received
      └─ 2023 (4-digit year)

3. Organization (optional)
   └─ Organization giving the award
      ├─ "World Architecture Festival"
      ├─ "Architectural Review Magazine"
      └─ "Portuguese Architecture Association"
```

**Examples:**

```
Award 1:
├─ Title: "International Architecture Prize"
├─ Year: 2022
└─ Organization: "World Architecture Festival"

Award 2:
├─ Title: "Design of the Year"
├─ Year: 2021
└─ Organization: "Architectural Review"

Award 3:
├─ Title: "Best Emerging Practice"
├─ Year: 2023
└─ Organization: "Contemporary Architects Forum"
```

**Tips:**

- Leave empty if no awards
- Include significant awards only
- Title, Year required; Organization helpful but optional

**Real Example:**

```
Casa Monte Awards:

Award 1:
├─ Title: International Architecture Prize
├─ Year: 2022
└─ Organization: World Architecture Festival

Award 2:
├─ Title: Design of the Year
├─ Year: 2023
└─ Organization: Architectural Digest
```

---

# 08 // SEO

### What This Tab Does

Controls how the project appears in **Google Search** and **social media**.

---

## Field 1: Meta Title

**Field Name:** `seo.title` (Optional, text)

**What to enter:**

```
Title shown in Google search results.
Also shown when people share project on social media.
If empty, uses project title as fallback.
```

**Examples:**

```
✅ GOOD:
├─ "Casa Monte — Contemporary Residential Architecture"
├─ "Villa Marim: Award-Winning Interior Design"
└─ "Atelier Norte | Adaptive Reuse Studio"

❌ AVOID:
├─ "Project" (too generic)
├─ "Casa Monte Casa Monte Casa Monte" (keyword stuffing)
└─ Only the title "Casa Monte" (repetitive)
```

**Ideal length:**

- 50-60 characters (fits in Google search result)
- Descriptive but concise
- Includes project name + key descriptor

**Real Example:**

```
Meta Title: "Casa Monte — Contemporary Residential Architecture | Porto"
(Appears in Google results, browser tab, social shares)
```

---

## Field 2: Meta Description

**Field Name:** `seo.description` (Optional, text)

**What to enter:**

```
Summary shown under title in Google search results.
Also shown when people share project on social media.
If empty, uses project description as fallback.
```

**Examples:**

```
✅ GOOD:
├─ "Contemporary residential design in Porto that
   responds to site topography and materiality.
   Award-winning architecture exploring light,
   space, and place."

├─ "Interior renovation emphasizing craft and
   natural materials. A workspace designed for
   creative collaboration through fluid spatial
   connections."

└─ "Adaptive reuse of 1960s warehouse into
   contemporary design studio. Existing structure
   celebrated through honest material restoration."

❌ AVOID:
├─ Too short (missing information)
├─ Keyword stuffing (not readable)
└─ Duplicate text from everywhere
```

**Ideal length:**

- 155-160 characters (fits Google search result)
- 1-2 sentences
- Describes the PROJECT, not the firm

**Real Example:**

```
Meta Description: "Contemporary residential design in Porto
integrating landscape topography with refined material palette.
Award-winning architecture exploring light, space, and place."

(Appears in Google search results below title)
```

---

## Field 3: Social Share Image

**Field Name:** `seo.ogImage` (Optional, image)

**What to enter:**

```
Image shown when someone shares project on social media.
If empty, uses hero image as fallback.
```

**Specifications:**

```
Optimal size: 1200x630 pixels
Aspect ratio: 16:9 (wide rectangle)
File format: JPG or PNG
File size: ≤ 1 MB
```

**What image to use:**

```
✅ GOOD:
├─ Same as hero image (usually best)
├─ Best/most iconic photo
├─ Clear, high-contrast image
└─ Represents project at a glance

❌ AVOID:
├─ Text-heavy image (doesn't work well on social)
├─ Dark/unclear image
└─ Portrait orientation (gets cropped)
```

**Real Example:**

```
Social Share Image: casa-monte-og-image.jpg
(1200x630px, same as hero image)

(When someone shares on Twitter/LinkedIn/Facebook,
this image appears with the link)
```

---

## When to Fill SEO Fields

```
✅ ALWAYS fill if:
├─ Project is important/award-winning
├─ You want to improve Google ranking
└─ You want social sharing to look professional

⚠️ OPTIONAL:
├─ Project-specific descriptions not needed
├─ Can leave empty, uses smart fallbacks
└─ Not critical, but improves discoverability
```

---

# QUICK REFERENCE: WHAT'S REQUIRED

```
REQUIRED (must fill):
✅ Title (01 // Identity)
✅ Slug (auto-generated, can edit)
✅ Category (at least 1)
✅ Typology (at least 1)
✅ Status (completed/ongoing/concept/competition)
✅ Year (number)
✅ Location (city + country)
✅ Description (short paragraph)
✅ Hero Image (main photo)
✅ Services (at least 1)

HIGHLY RECOMMENDED:
⭐ Concept (one-sentence design idea)
⭐ Chapters or Story (detailed narrative)
⭐ Gallery (15+ photos)
⭐ Drawings (plans, sections, details)
⭐ Material Narrative (why materials chosen)
⭐ Photographer Credit

OPTIONAL (nice to have):
⚪ Subtitle, Coordinates, Area
⚪ Light Strategy, Site Response
⚪ Hero Video, Before & After
⚪ Team, Client, Awards
⚪ SEO (Title, Description, OG Image)
```

---

# WORKFLOW: ADDING A PROJECT

**Step-by-step to add Casa Monte:**

```
1. Go to /admin → "01 // Projects 📐"
2. Click [+ Create] button

FILL OUT:
3. 01 // Identity
   ├─ Title: Casa Monte
   ├─ Slug: casa-monte (auto)
   ├─ Subtitle: Contemporary residential design
   ├─ Category: [Architecture]
   ├─ Typology: [Residential]
   ├─ Status: Completed
   └─ Year: 2018

4. 02 // Location
   ├─ City: Porto
   ├─ Country: Portugal
   ├─ Area: 450
   └─ Coordinates: 41.1579° N, 8.6291° W

5. 03 // Editorial
   ├─ Concept: "A contemporary home..."
   ├─ Description: "Contemporary residential design..."
   ├─ Chapters: [5-6 chapters with images]
   ├─ Material Narrative: [4-5 materials]
   ├─ Light Strategy: "Fenestration designed..."
   └─ Site Response: "Located on a steep slope..."

6. 04 // Photography
   ├─ Hero Image: [main photo]
   ├─ Gallery: [15-20 photos/videos]
   └─ Photographer Credit: João Silva

7. 05 // Technical
   ├─ Drawings: [5-8 plans, sections, details]

8. 06 // Materials
   ├─ Services: [Architecture, Interior, Landscape]

9. 07 // Team
   ├─ Client: Private residential
   ├─ Team: [names]
   └─ Awards: [if any]

10. 08 // SEO
    ├─ Title: "Casa Monte — Contemporary Architecture"
    ├─ Description: "Contemporary residential design..."
    └─ OG Image: [hero image]

11. [Publish]
```

---

## DONE ✅

All Projects schema fields explained with real examples.

**Ready for next schema?** (Journal, Services, Team, etc.)
