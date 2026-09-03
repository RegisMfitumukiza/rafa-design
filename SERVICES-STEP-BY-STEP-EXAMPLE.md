# How to Add a New Service in Sanity — Step-by-Step Example

## Overview

We already have 6 services migrated:

1. ✅ Architecture
2. ✅ Interior Design
3. ✅ Landscape Design
4. ✅ Urban Design
5. ✅ Renovation
6. ✅ Consulting

**Let's add a 7th service: "3D Visualization & Rendering"**

---

## PART 1: THE SERVICE WE'RE ADDING

### What We're Creating

**Service Name:** 3D Visualization & Rendering

**Concept:**

- Digital renderings and 3D visualizations of projects
- Used for client presentations, marketing, competitions
- Bridge between concept and built reality

---

## PART 2: GATHER THE INFORMATION FIRST

Before going to Sanity, prepare all the content:

### 01 // Content Group

**Title:**

```
3D Visualization & Rendering
```

**Slug:**

```
3d-visualization-rendering
(Auto-generated from title)
```

**Short Description:**

```
Photorealistic renderings and 3D visualizations for presentations, marketing, and client engagement.
```

**Intro Statement:**

```
Digital representations that bridge concept and reality — compelling visualizations that communicate design intent with clarity and precision.
```

**Full Description:**

```
Our visualization practice combines technical expertise with artistic sensibility to create compelling digital representations of architectural concepts. We produce photorealistic renderings for client presentations, competition submissions, and marketing materials. Each visualization is carefully crafted to communicate design intent, materiality, and spatial relationships with precision. We work across scales and typologies — from building exteriors and interior spaces to urban masterplans and landscape environments. Our renderings serve as powerful communication tools, enabling stakeholders to understand and engage with design before construction begins.
```

### 02 // Approach (4 numbered points)

Point 1:

- **Title:** Concept Translation
- **Statement:** We translate architectural drawings and models into immersive digital visualizations that communicate design intent with clarity and nuance.

Point 2:

- **Title:** Photorealism
- **Statement:** Advanced rendering techniques, material studies, and lighting design create visualizations that feel authentic and grounded in reality.

Point 3:

- **Title:** Storytelling
- **Statement:** Each visualization is composed as a narrative moment — framing the space, the light, and the human experience within it.

Point 4:

- **Title:** Precision
- **Statement:** Every detail is verified against technical drawings to ensure accuracy and fidelity to the actual design intent.

### 03 // References (Related Projects)

Choose 2-4 projects that feature visualizations:

- Casa Monte (has renderings)
- Villa Marim (has renderings)
- Atelier Norte (if has renderings)
- Or any other projects

### 04 // Configuration

**Order:** 7 (comes after Consulting #6)

**Icon:** visualization (or 3d, render, digital)

**Editorial Intents:** (Which images from projects are relevant for this discipline)

```
- design-intent (showing concept clarity)
- spatial-experience (interior renderings)
- environmental (how building sits in landscape)
```

### 05 // SEO (Optional)

**Meta Title:**

```
3D Visualization & Rendering Services | RAFA Design
```

**Meta Description:**

```
Photorealistic 3D renderings and visualizations for architectural presentations, marketing, and client engagement.
```

**Keywords:**

```
3d-rendering
visualization
photorealistic
digital-representation
architectural-rendering
```

---

## PART 3: ADDING IT TO SANITY STUDIO

### Step 1: Open Sanity Studio

```
1. Go to: http://localhost:3000/admin
2. Click on "04 // Services" 🏗️ in left sidebar
3. Click [+ Create] or [+ New Document]
```

**Visual in Studio:**

```
┌────────────────────────────────────────┐
│ RAFA CMS                               │
│                                        │
│ ☐ 01 // Projects 📐                    │
│ ☐ 02 // Journal 📰                     │
│ ☐ 03 // Services 🏗️                    │ ← Click here
│   ├─ Architecture                      │
│   ├─ Interior Design                   │
│   ├─ Landscape Design                  │
│   ├─ Urban Design                      │
│   ├─ Renovation                        │
│   └─ Consulting                        │
│ ☐ 04 // Team 👥                        │
└────────────────────────────────────────┘
```

### Step 2: Create New Service Document

```
1. Hover over "03 // Services" section
2. Click [+] button that appears
3. Select "Service" from dropdown
4. New blank service form opens
```

**Or:**

```
1. Click [+ Create] in top bar
2. Select "Service" type
3. Blank form opens
```

### Step 3: Fill in 01 // Content Group

**The form opens with "01 // Content" tab active:**

```
┌─────────────────────────────────────────────┐
│ Create Service Document                     │
├─────────────────────────────────────────────┤
│                                             │
│ 01 // Content  02 // Approach  03 // ...   │ ← Tabs
│                                             │
│ Title *                                     │
│ [3D Visualization & Rendering]              │
│                                             │
│ URL Slug *                                  │
│ [Auto-generated]                            │
│ 3d-visualization-rendering                  │
│                                             │
│ Short Description *                         │
│ [Photorealistic renderings and 3D...]       │
│                                             │
│ Introduction Statement *                    │
│ [Digital representations that bridge...]    │
│                                             │
│ Full Description *                          │
│ [Our visualization practice combines...]    │
│ (5-row text area)                           │
│                                             │
│ [Save] [Publish] [Close]                   │
└─────────────────────────────────────────────┘
```

**Fill fields:**

```
Title field:
[Type: 3D Visualization & Rendering]

URL Slug field:
[Click generate from title button if available]
[Or type: 3d-visualization-rendering]

Short Description field:
[Paste: Photorealistic renderings and 3D visualizations...]

Introduction Statement field:
[Paste: Digital representations that bridge concept...]

Full Description field:
[Paste: Our visualization practice combines...]
```

---

### Step 4: Fill in 02 // Approach Group

**Click "02 // Approach" tab:**

```
┌─────────────────────────────────────────────┐
│ 01 // Content  02 // Approach  03 // ...    │
├─────────────────────────────────────────────┤
│                                             │
│ Methodological Approach *                   │
│ (3-6 approach points required)              │
│                                             │
│ [+ Add item]                                │
│                                             │
│ Approach points will appear here:           │
│ (empty initially)                           │
└─────────────────────────────────────────────┘
```

**Add first approach point:**

```
1. Click [+ Add item]
2. Form appears:

┌─────────────────────────────────┐
│ Title                           │
│ [Concept Translation]           │
│                                 │
│ Statement                       │
│ [We translate architectural...] │
│ (2-row text area)               │
│                                 │
│ [✓] [Remove]                   │
└─────────────────────────────────┘
```

**Fill approach point 1:**

```
Title: Concept Translation
Statement: We translate architectural drawings and models into immersive digital visualizations that communicate design intent with clarity and nuance.
```

**Add point 2:**

```
1. Click [+ Add item] again
2. Fill:

Title: Photorealism
Statement: Advanced rendering techniques, material studies, and lighting design create visualizations that feel authentic and grounded in reality.
```

**Add point 3:**

```
Title: Storytelling
Statement: Each visualization is composed as a narrative moment — framing the space, the light, and the human experience within it.
```

**Add point 4:**

```
Title: Precision
Statement: Every detail is verified against technical drawings to ensure accuracy and fidelity to the actual design intent.
```

**Result:**

```
Methodological Approach
├─ [✓] Concept Translation
│       We translate architectural...
│
├─ [✓] Photorealism
│       Advanced rendering techniques...
│
├─ [✓] Storytelling
│       Each visualization is composed...
│
└─ [✓] Precision
        Every detail is verified...
```

---

### Step 5: Fill in 03 // References Group

**Click "03 // References" tab:**

```
┌─────────────────────────────────────────────┐
│ 01 // Content  02 // Approach  03 // Ref   │
├─────────────────────────────────────────────┤
│                                             │
│ Related Projects                            │
│                                             │
│ [+ Add item]                                │
│                                             │
│ (Empty initially)                           │
└─────────────────────────────────────────────┘
```

**Add related projects:**

```
1. Click [+ Add item]
2. Reference dialog opens:

┌─────────────────────────────────┐
│ Search projects...              │
│ [Type: "Casa"]                  │
│                                 │
│ Results:                        │
│ ☐ Casa Monte                    │
│   Residential · Porto, PT       │
│ ☐ Casa Bella                    │
│   Residential · Lisbon, PT      │
└─────────────────────────────────┘

3. Click "Casa Monte"
4. Added to list
```

**Add second project:**

```
1. Click [+ Add item] again
2. Type: "Villa"
3. Click "Villa Marim"
```

**Add third project:**

```
1. Click [+ Add item] again
2. Type: "Atelier"
3. Click "Atelier Norte"
```

**Result:**

```
Related Projects
├─ [x] Casa Monte
│       Residential · Porto, PT
│
├─ [x] Villa Marim
│       Residential · Porto, PT
│
└─ [x] Atelier Norte
        Commercial · Porto, PT

[+ Add item]
```

---

### Step 6: Fill in 04 // Configuration Group

**Click "04 // Configuration" tab:**

```
┌─────────────────────────────────────────────┐
│ 01 // ...  04 // Configuration  05 // ...  │
├─────────────────────────────────────────────┤
│                                             │
│ Display Order *                             │
│ [7]  (comes after Consulting)               │
│                                             │
│ Icon                                        │
│ [visualization]                             │
│                                             │
│ Editorial Image Intents                     │
│ [☐] Design Intent                           │
│ [☑] Spatial Experience                      │
│ [☑] Site Relationship                       │
│ [☐] Materiality                             │
│ [☑] Construction                            │
│ [☐] Environmental                           │
│                                             │
└─────────────────────────────────────────────┘
```

**Fill fields:**

```
Display Order field:
[Type: 7]  (7th service, after Consulting #6)

Icon field:
[Type: visualization]
(Options: architecture, interior, landscape, urban, renovation, consulting, visualization)

Editorial Intents checkboxes:
[☑] design-intent (renderings show design concept)
[☑] spatial-experience (interior renderings)
[☑] environmental (site context renderings)

(Uncheck materiality, construction if not needed)
```

---

### Step 7: Fill in 05 // SEO Group

**Click "05 // SEO" tab:**

```
┌─────────────────────────────────────────────┐
│ 01 // ...  05 // SEO                        │
├─────────────────────────────────────────────┤
│                                             │
│ Meta Title                                  │
│ [3D Visualization & Rendering Services...] │
│ (60 chars max)                              │
│                                             │
│ Meta Description                            │
│ [Photorealistic 3D renderings and...]      │
│ (160 chars max)                             │
│                                             │
│ Keywords                                    │
│ [+ Add tags]                                │
│ [3d-rendering]                              │
│ [visualization]                             │
│ [photorealistic]                            │
│                                             │
└─────────────────────────────────────────────┘
```

**Fill fields:**

```
Meta Title field:
[3D Visualization & Rendering Services | RAFA Design]

Meta Description field:
[Photorealistic 3D renderings and visualizations for architectural presentations, marketing, and client engagement.]

Keywords field:
[Type and press Enter to add each tag]
- 3d-rendering
- visualization
- photorealistic
- digital-representation
- architectural-rendering
```

---

### Step 8: Save Draft (Optional)

**Before publishing, save as draft:**

```
1. Click [Save] button
2. Document saves
3. Can come back later to edit
```

---

### Step 9: Publish

**When ready to go live:**

```
1. Click [Publish] button
2. Confirmation dialog appears:

┌──────────────────────────────────┐
│ Publish?                         │
│ "3D Visualization & Rendering"   │
│                                  │
│ [Cancel]  [Publish]              │
└──────────────────────────────────┘

3. Click [Publish]
4. Document published to Sanity
5. Appears in /admin sidebar
6. Appears on website at /services/3d-visualization-rendering
```

---

## PART 4: WHAT APPEARS ON WEBSITE

### Services Listing Page

After publishing, the new service appears at `/services`:

```
════════════════════════════════════════════════
                    SERVICES
════════════════════════════════════════════════

Services    (Industrial numbered list)

01 // Architecture
Custom homes, commercial buildings...

02 // Interior Design
Materiality, finishes, and furnishings...

... (3-6)

07 // 3D Visualization & Rendering    ← NEW!
Photorealistic renderings and 3D...

════════════════════════════════════════════════
```

### Service Detail Page

New page created automatically at `/services/3d-visualization-rendering`:

```
════════════════════════════════════════════════
                SERVICE DETAIL PAGE
════════════════════════════════════════════════

← Services // 3D Visualization & Rendering

07 // 3D Visualization & Rendering
Digital representations that bridge...

[Hero image from first related project]

── Approach // Methodology ──

01 // Concept Translation
We translate architectural drawings...

02 // Photorealism
Advanced rendering techniques...

03 // Storytelling
Each visualization is composed...

04 // Precision
Every detail is verified...

── Selected Work ──
[Grid of 3 related projects]
├─ Casa Monte
├─ Villa Marim
└─ Atelier Norte

── Related Disciplines ──
[Links to other services]
Architecture, Interior Design

════════════════════════════════════════════════
```

---

## PART 5: COMPLETE FORM SCREENSHOT

### What You See in Studio

```
┌────────────────────────────────────────────────────────┐
│ Service: 3D Visualization & Rendering                  │
│ (Editing)                                              │
├────────────────────────────────────────────────────────┤
│                                                        │
│ Tabs: 01 // Content | 02 // Approach | 03 // Ref...   │
│                                                        │
│ FORM (01 // Content tab active):                       │
│                                                        │
│ Title *                                                │
│ [3D Visualization & Rendering               ]          │
│                                                        │
│ URL Slug *                                             │
│ [3d-visualization-rendering                ]          │
│  Generate from title ↻                                 │
│                                                        │
│ Short Description *                                    │
│ [Photorealistic renderings and 3D visualizations] (49) │
│                                                        │
│ Introduction Statement *                               │
│ [Digital representations that bridge concept and]     │
│ [...reality — compelling visualizations that...]      │
│  (2-row text area)                                     │
│                                                        │
│ Full Description *                                     │
│ [Our visualization practice combines technical...]    │
│ [...expertise with artistic sensibility to create...] │
│ [...compelling digital representations...]            │
│  (5-row text area)                                     │
│                                                        │
├────────────────────────────────────────────────────────┤
│ [Save]  [Publish]  [Close]  [More...]                  │
└────────────────────────────────────────────────────────┘
```

---

## PART 6: VALIDATION CHECKS

### Before Publishing, Verify:

```
✓ Title: Required, filled
✓ Slug: Required, auto-generated, filled
✓ Short Description: Required, filled
✓ Intro Statement: Required, filled
✓ Full Description: Required, filled
✓ Approach points: Required (min 3), all 4 filled
✓ Related Projects: Optional, 3 added
✓ Display Order: Required, set to 7
✓ Icon: Set to "visualization"
✓ Editorial Intents: 3 selected
✓ SEO title: Optional, filled
✓ SEO description: Optional, filled
✓ SEO keywords: Optional, 5 added
```

---

## PART 7: AFTER PUBLISHING

### What Happens Automatically

```
1. Document saved to Sanity backend
2. Slug created: "3d-visualization-rendering"
3. Pages generated:
   ├─ /services (listing)
   └─ /services/3d-visualization-rendering (detail)
4. Sitemap updated
5. Breadcrumbs created
6. Related services linked
7. Preview appears in sidebar
```

### Check It On Website

```
1. Build/deploy triggers
2. Wait for build to complete
3. Visit: http://localhost:3000/services
4. See: "07 // 3D Visualization & Rendering"
5. Click to view: /services/3d-visualization-rendering
```

---

## PART 8: FULL EXAMPLE DATA

### Copy-Paste Ready Content

```
Title:
3D Visualization & Rendering

Slug:
3d-visualization-rendering

Short Description:
Photorealistic renderings and 3D visualizations for presentations, marketing, and client engagement.

Intro Statement:
Digital representations that bridge concept and reality — compelling visualizations that communicate design intent with clarity and precision.

Full Description:
Our visualization practice combines technical expertise with artistic sensibility to create compelling digital representations of architectural concepts. We produce photorealistic renderings for client presentations, competition submissions, and marketing materials. Each visualization is carefully crafted to communicate design intent, materiality, and spatial relationships with precision. We work across scales and typologies — from building exteriors and interior spaces to urban masterplans and landscape environments. Our renderings serve as powerful communication tools, enabling stakeholders to understand and engage with design before construction begins.

APPROACH POINTS:
─────────────────

Point 1:
Title: Concept Translation
Statement: We translate architectural drawings and models into immersive digital visualizations that communicate design intent with clarity and nuance.

Point 2:
Title: Photorealism
Statement: Advanced rendering techniques, material studies, and lighting design create visualizations that feel authentic and grounded in reality.

Point 3:
Title: Storytelling
Statement: Each visualization is composed as a narrative moment — framing the space, the light, and the human experience within it.

Point 4:
Title: Precision
Statement: Every detail is verified against technical drawings to ensure accuracy and fidelity to the actual design intent.

RELATED PROJECTS:
─────────────────
- Casa Monte
- Villa Marim
- Atelier Norte

CONFIGURATION:
──────────────
Order: 7
Icon: visualization
Editorial Intents: design-intent, spatial-experience, environmental

SEO:
────
Title: 3D Visualization & Rendering Services | RAFA Design
Description: Photorealistic 3D renderings and visualizations for architectural presentations, marketing, and client engagement.
Keywords: 3d-rendering, visualization, photorealistic, digital-representation, architectural-rendering
```

---

## SUMMARY

| Step | What to Do                                                    |
| ---- | ------------------------------------------------------------- |
| 1    | Go to `/admin` → Click "03 // Services"                       |
| 2    | Click [+ Create] → Select "Service"                           |
| 3    | Fill "01 // Content" (title, slug, descriptions)              |
| 4    | Fill "02 // Approach" (4 approach points)                     |
| 5    | Fill "03 // References" (3 related projects)                  |
| 6    | Fill "04 // Configuration" (order, icon, intents)             |
| 7    | Fill "05 // SEO" (title, description, keywords)               |
| 8    | Click [Publish]                                               |
| 9    | New service appears at `/services/3d-visualization-rendering` |

**Time to complete:** ~10 minutes
**Difficulty:** Easy (mostly copy-paste)
**Result:** Fully functional service page with all content, related projects, and SEO
