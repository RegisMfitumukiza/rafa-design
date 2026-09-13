# Team Schema — Complete Admin Guide

**For:** HR, studio operations, marketing, and business development  
**Purpose:** Know how to add team members with profiles, roles, and social connections  
**Location:** `/admin → "04 // Team Members 👥"`

---

## Overview

Team Members are individual people on your studio team who appear on the **Studio page** in the team grid and in individual **Dossier modals** (detailed profiles).

Each team member has a professional profile showing their role, expertise, biography, and social connections.

**Total Tabs:** 4 sections  
**Estimated time to add member:** 10-15 minutes  
**Difficulty:** Easy (straightforward personal information)

---

## Why Team Members Matter

Team profiles help:

- ✅ Build client confidence and trust
- ✅ Show your studio's expertise and depth
- ✅ Highlight leadership and key people
- ✅ Create human connection to your work
- ✅ Allow selective visibility (public vs. internal)

---

## Tab-by-Tab Breakdown

---

# 01 // CONTENT

### What This Tab Does

Defines the **core identity** of the team member (name, role, biography).

---

## Field 1: Full Name

**Field Name:** `name` (Required)

**What to enter:**

```
Person's full, professional name.
How they are known in the studio.
Used in all listings and references.
```

**Examples:**

```
✅ GOOD:
├─ Rafael Mendes
├─ Sofia Oliveira
├─ João da Silva
├─ Maria Santos
└─ António Ferreira

❌ AVOID:
├─ Rafa (too casual)
├─ Rafael Mendes da Silva e Oliveira (too long)
└─ Designer 1 (not a name)
```

**Tips:**

- Use full professional name
- Consistent spelling across documents
- Under 80 characters

**Real Example:**

```
Full Name: Rafael Mendes
```

---

## Field 2: Slug

**Field Name:** `slug` (Required, auto-filled)

**What it is:**

```
URL-friendly identifier for this person.
Auto-generated from name.
Used in dossier modal URLs.
```

**How it appears:**

```
Name: Rafael Mendes
Slug: rafael-mendes

Website URL: /studio/team/rafael-mendes

---

Name: Sofia Oliveira
Slug: sofia-oliveira

Website URL: /studio/team/sofia-oliveira
```

**Rules:**

- Lowercase only
- Hyphens between words
- Auto-generated (edit only if needed)
- Unique per person

---

## Field 3: Role at RAFA

**Field Name:** `role` (Required)

**What to enter:**

```
Professional title / position at the studio.
How this person is presented publicly.
Reflects their responsibilities.
```

**Examples:**

```
✅ GOOD:
├─ Founder & Lead Architect
├─ Principal Architect
├─ Senior Interior Designer
├─ Project Manager
├─ Design Director
├─ Associate Architect
├─ Junior Architect
├─ Landscape Architect
├─ Studio Manager
└─ Practice Coordinator

❌ AVOID:
├─ Architect (too generic)
├─ The Designer (not professional)
├─ Works Here (vague)
└─ Senior Person #1 (not a real role)
```

**Tips:**

- Be specific about seniority
- Match actual responsibilities
- Use consistent terminology
- Under 80 characters

**Real Example:**

```
Role: Founder & Lead Architect
(Clear authority and expertise)
```

---

## Field 4: Biography

**Field Name:** `biography` (Required, text)

**What to enter:**

```
Short editorial bio / personal story.
Shown in the dossier modal (when clicking team member).
Personal connection to their work.
Professional but humanizing.
```

**Examples:**

```
Rafael Mendes (Founder):
"Rafael founded RAFA Design after working with leading
architecture studios in Europe and Brazil. His work focuses
on the relationship between building and landscape, and the
role of material honesty in creating spatial experience.
He holds degrees from the Faculty of Architecture of the
University of Porto and spent five years in Berlin refining
his practice. Rafael believes that great architecture emerges
from deep listening to place—its climate, materials, culture,
and human needs."

---

Sofia Oliveira (Senior Interior Designer):
"Sofia brings 12 years of interior design experience to
RAFA, having previously led interior practices at two
Lisbon-based studios. Her work explores the intersection
of material authenticity and spatial craftsmanship. Sofia
is fascinated by how materials age over time and how their
imperfections become character. She is an advocate for
locally-sourced materials and traditional craft techniques
applied in contemporary contexts."

---

João da Silva (Project Manager):
"João ensures that design intent translates seamlessly
into built reality. With 8 years in project management and
construction coordination, he brings deep knowledge of
building process, regulations, and craft excellence. João
is bilingual in Portuguese and English, and leads all
client coordination during construction phases."

---

Maria Santos (Associate Architect):
"Maria is passionate about sustainable design and
environmental integration. Her recent projects focus
on adaptive reuse and renovating historic structures
with contemporary sensibility. She is currently exploring
the intersection of digital tools and traditional craft
in her architectural practice."
```

**Length:**

- 60-600 characters
- 3-5 sentences
- Personal but professional
- Conveys their passion/focus

**Writing tips:**

- Start with experience or background
- Include their design philosophy or passion
- Be authentic, not generic
- Show what makes them unique
- Can include education or background if relevant

**Real Example:**

```
Biography: "Rafael founded RAFA Design after ten years
working with leading European studios. His practice focuses
on the relationship between building and landscape, and the
power of material honesty in spatial experience. He believes
great architecture emerges from deep listening to place—
climate, materials, culture. Rafael holds degrees from FAUP
and spent five years in Berlin developing his practice."
```

---

## Field 5: Disciplines

**Field Name:** `disciplines` (Optional, array of tags)

**What to enter:**

```
Professional disciplines this person specializes in.
Their areas of expertise.
Used for portfolio filtering (future feature).
```

**Examples:**

```
Rafael Mendes:
├─ Architecture
├─ Master Planning
├─ Site Strategy
└─ Material Design

Sofia Oliveira:
├─ Interior Design
├─ Spatial Planning
├─ Material Selection
└─ Residential Design

João da Silva:
├─ Project Management
├─ Construction Coordination
└─ Building Process

Maria Santos:
├─ Architecture
├─ Adaptive Reuse
├─ Renovation
└─ Sustainable Design
```

**Tips:**

- Use professional terminology
- 2-4 disciplines per person
- These help organize team profiles
- Can be searched/filtered

**Real Example:**

```
Disciplines: ["Architecture", "Master Planning",
              "Materiality", "Landscape Integration"]
```

---

## Field 6: Interests

**Field Name:** `interests` (Optional, array of tags)

**What to enter:**

```
Personal/professional interests and passions.
What they care about in design.
Humanizes their profile.
```

**Examples:**

```
Rafael Mendes:
├─ Monolithic form
├─ Stone construction
├─ Light strategy
├─ Landscape response
└─ Vernacular architecture

Sofia Oliveira:
├─ Timber detail
├─ Material aging
├─ Craft tradition
├─ Residential spaces
└─ Local materials

João da Silva:
├─ Building process
├─ Construction craft
├─ Regulatory compliance
└─ Quality craftsmanship

Maria Santos:
├─ Adaptive reuse
├─ Biophilic design
├─ Historic preservation
├─ Sustainable materials
└─ Digital craft integration
```

**Tips:**

- 3-5 interests per person
- Be specific, not generic
- Show personality and passion
- Examples: specific material, design philosophy, building type

**Real Example:**

```
Interests: ["Monolithic form", "Stone construction",
            "Light manipulation", "Vernacular tradition"]
```

---

## Field 7: Years of Experience

**Field Name:** `experience` (Optional, number)

**What to enter:**

```
Total years working in architecture/design.
Reflects seniority and expertise.
Used for team context.
```

**Examples:**

```
Rafael Mendes: 15 years
Sofia Oliveira: 12 years
João da Silva: 8 years
Maria Santos: 4 years
Intern: 0 years
```

**Rules:**

- Whole number (no decimals)
- 0-60 range
- Optional but recommended

**Real Example:**

```
Years of Experience: 15
(Shows this is experienced leadership)
```

---

# 02 // MEDIA & SOCIAL

### What This Tab Does

Manages **portrait photography** and **social/contact connections**.

---

## Field 1: Portrait

**Field Name:** `image` (Required, image)

**What to enter:**

```
Professional studio portrait / headshot.
Shown in team grid and dossier modal.
Portrait orientation (3:4 aspect ratio preferred).
```

**What makes a good portrait:**

```
✅ GOOD:
├─ Professional studio photography
├─ Head and shoulders shot
├─ Clear, well-lit face
├─ Neutral or professional background
├─ Square or portrait orientation
├─ High resolution (at least 800px tall)
└─ Consistent lighting with other team members

❌ AVOID:
├─ Casual selfie or snapshots
├─ Group photos (crop to individual)
├─ Outdoor/landscape photos
├─ Too small/low resolution
├─ Extreme angles or artistic distortion
└─ Inconsistent style with other team members
```

**Sub-fields:**

### Alt Text (optional, accessibility)

```
Description for screen readers.

Example:
"Rafael Mendes, portrait"
or
"Sofia Oliveira, professional headshot"
```

### Caption (optional)

```
Optional text displayed under image.
Usually leave empty for team photos.
```

**Real Example:**

```
Portrait:
├─ File: rafael-mendes-portrait.jpg (1200x1600px)
├─ Alt Text: "Rafael Mendes, portrait"
└─ Caption: (empty)
```

---

## Field 2: Email

**Field Name:** `email` (Optional, email)

**What to enter:**

```
Professional email address.
Used for team member contact.
Validated as proper email format.
```

**Examples:**

```
✅ GOOD:
├─ rafael@rafadesign.pt
├─ sofia.oliveira@rafadesign.pt
└─ contact@rafadesign.pt

❌ AVOID:
├─ rafael (no @ symbol)
├─ rafael@ (no domain)
└─ Not an actual email format
```

**Tips:**

- Use professional studio email domain
- Format: firstname.lastname@domain or firstname@domain
- Optional—only if you want public contact option

**Real Example:**

```
Email: rafael@rafadesign.pt
```

---

## Field 3: Phone

**Field Name:** `phone` (Optional, text)

**What to enter:**

```
Professional phone number.
Used for team member contact.
International format preferred.
```

**Examples:**

```
✅ GOOD:
├─ +351 223 456 789
├─ +351 96 234 5678
└─ +351 (223) 456 789

❌ AVOID:
├─ 223 456 789 (no country code)
├─ (223) 456-789 (inconsistent format)
└─ +351223456789 (no spacing/formatting)
```

**Tips:**

- Use international format (+country code)
- Include spaces for readability
- Optional—only if you want public contact option

**Real Example:**

```
Phone: +351 223 456 789
```

---

## Field 4: Social Links

**Field Name:** `socialLinks` (Optional, array)

**What to enter:**

```
Professional and social media profiles.
Links to Instagram, LinkedIn, portfolio, etc.
Each link includes platform + URL.
```

**How to add:**

```
1. Click "+ Add Social Link"
2. Platform: (lowercase identifier)
3. URL: (full link)
4. Label Override: (optional display name)
5. Repeat for each social profile
```

---

### Social Link Fields

#### Platform

**Field Name:** `platform` (Required, text)

```
Lowercase identifier of the platform.

Examples:
├─ instagram
├─ linkedin
├─ twitter (or x)
├─ youtube
├─ tiktok
├─ portfolio
├─ website
├─ github
├─ vimeo
└─ behance

Rules:
├─ Lowercase only
├─ No spaces or special characters
├─ Consistent naming across team
└─ Match platform name (instagram, not IG)
```

---

#### URL

**Field Name:** `url` (Required, text)

```
Full URL to the profile or page.

Examples:
├─ https://instagram.com/rafael.design
├─ https://www.linkedin.com/in/rafael-mendes
├─ https://www.behance.net/rafadesign
├─ https://rafadesign.com/portfolio
└─ https://www.youtube.com/@rafadesign

Rules:
├─ Full URL (include https://)
├─ No shortened URLs (use full)
└─ Verified working link
```

---

#### Label Override

**Field Name:** `label` (Optional, text)

```
Custom display name for the link.
If empty, platform name is used.

Examples without override:
├─ Platform: instagram → Shows as "Instagram"
├─ Platform: linkedin → Shows as "LinkedIn"
└─ Platform: portfolio → Shows as "Portfolio"

Examples with override:
├─ Platform: website, Label: "Personal Work"
│  → Shows as "Personal Work" instead of "Website"
├─ Platform: behance, Label: "Design Archive"
│  → Shows as "Design Archive" instead of "Behance"
└─ Platform: vimeo, Label: "Film & Motion"
│  → Shows as "Film & Motion" instead of "Vimeo"
```

**Tips:**

- Leave empty for standard platforms (Instagram, LinkedIn)
- Use override for custom meaning or context
- Keep short (under 30 characters)

---

### Complete Social Links Examples

**Rafael Mendes (Founder):**

```
Social Link 1:
├─ Platform: instagram
├─ URL: https://instagram.com/rafael.mendes
└─ Label: (empty → shows "Instagram")

Social Link 2:
├─ Platform: linkedin
├─ URL: https://www.linkedin.com/in/rafael-mendes
└─ Label: (empty → shows "LinkedIn")

Social Link 3:
├─ Platform: portfolio
├─ URL: https://rafael-mendes-design.com
└─ Label: "Design Archive"
```

**Sofia Oliveira (Interior Designer):**

```
Social Link 1:
├─ Platform: instagram
├─ URL: https://instagram.com/sofiainteriors
└─ Label: (empty)

Social Link 2:
├─ Platform: behance
├─ URL: https://www.behance.net/sofiainteriors
└─ Label: "Professional Work"

Social Link 3:
├─ Platform: linkedin
├─ URL: https://www.linkedin.com/in/sofia-oliveira-design
└─ Label: (empty)
```

---

# 03 // CONFIGURATION

### What This Tab Does

Controls **visibility** and **ordering** of team member in listings.

---

## Field 1: Display Order

**Field Name:** `order` (Required, number)

**What to enter:**

```
Position in team grid.
Lower numbers appear first.
Controls team page layout.
```

**Examples:**

```
If you have 8 team members:
├─ Rafael Mendes: order 1 (appears first/top-left)
├─ Sofia Oliveira: order 2
├─ João da Silva: order 3
├─ Maria Santos: order 4
├─ Ana Costa: order 5
├─ Carlos Dias: order 6
├─ Elena Silva: order 7
└─ Miguel Rocha: order 8 (appears last)

Grid layout (typical):
Row 1: [1]  [2]  [3]  [4]
Row 2: [5]  [6]  [7]  [8]
```

**Tips:**

- Usually: Founder/Leadership first
- Then: Senior/Principal architects
- Then: Associates/Juniors
- Can reorder anytime

**Real Example:**

```
Display Order: 1
(Rafael appears first on team page)
```

---

## Field 2: Category // Seniority Tier

**Field Name:** `category` (Optional, reference)

**What to enter:**

```
Seniority tier / team category.
Controlled separately in admin.
Used for team organization and future filtering.
```

**Available Categories:**

```
Typically:
├─ Leadership (Founder, Principal, Director)
├─ Senior (Senior Architect, Lead Designer)
├─ Mid-Level (Architect, Designer)
├─ Junior (Junior Architect, Associate)
└─ Support (Coordinator, Manager)
```

**How to select:**

```
1. Click the Category field
2. Search for category (e.g., "Leadership")
3. Click to select
4. Category appears as tag
```

**Tips:**

- Link to existing category (don't create new)
- Helps organize team structure
- Used for future team filtering
- Optional but recommended

**Real Example:**

```
Category: Leadership
(Identifies Rafael as founder/leadership tier)
```

---

## Field 3: Display on Team Page

**Field Name:** `displayOnTeamPage` (Required, boolean toggle)

**What to enter:**

```
Show or hide from public team listing.
When TRUE: appears on /studio page team grid
When FALSE: hidden from public view

Use for:
├─ Inactive team members
├─ Internal staff (not client-facing)
├─ People in transition
└─ Future hires not yet ready to publish
```

**Examples:**

```
✅ Display = TRUE:
├─ Active team members
├─ Public-facing roles
└─ Leadership/principals

❌ Display = FALSE:
├─ Departed team members (keep record)
├─ Internal staff only (coordinators, admins)
├─ People who requested privacy
└─ Seasonal/contract workers
```

**Tips:**

- Default: TRUE (shown)
- Doesn't delete the person—just hides from public
- Can toggle anytime

**Real Example:**

```
Display on Team Page: TRUE
(Rafael is publicly visible on /studio)

---

Display on Team Page: FALSE
(Intern is not shown, kept for internal records)
```

---

# 04 // SEO

### What This Tab Does

Controls how team member profile appears in **Google Search** and **social media**.

---

## Field 1: Meta Title

**Field Name:** `seo.title` (Optional, text)

**What to enter:**

```
Title shown in Google search results for dossier.
Also shown when profile shared on social media.
If empty, uses name + role as default.
```

**Examples:**

```
✅ GOOD:
├─ "Rafael Mendes, Founder & Lead Architect | RAFA Design"
├─ "Sofia Oliveira, Interior Designer | RAFA Design"
├─ "João da Silva, Project Manager | RAFA Design"
└─ "Maria Santos, Architect | RAFA Design"

❌ AVOID:
├─ "Team Member" (too generic)
├─ "Rafael" (insufficient context)
└─ "RAFA Design RAFA Design RAFA Design" (keyword stuffing)
```

**Ideal length:**

- 50-60 characters
- Includes name + role + firm

**Real Example:**

```
Meta Title: "Rafael Mendes, Founder | RAFA Design"
```

---

## Field 2: Meta Description

**Field Name:** `seo.description` (Optional, text)

**What to enter:**

```
Summary shown under title in Google search.
Also shown when profile shared on social.
If empty, uses biography as default.
```

**Examples:**

```
✅ GOOD:
├─ "Rafael Mendes is Founder of RAFA Design. 15 years
   experience in architecture and master planning.
   Focuses on material honesty and site-responsive design."

├─ "Sofia Oliveira, Senior Interior Designer at RAFA Design.
   12 years experience in spatial design with emphasis on
   materiality, craft, and locally-sourced materials."

└─ "Maria Santos, Architect at RAFA Design. 4 years
   experience in adaptive reuse and sustainable design."

❌ AVOID:
├─ "We work at RAFA Design" (generic)
├─ Very long/hard to read
└─ Missing context about person
```

**Ideal length:**

- 155-160 characters
- 1-2 sentences
- Personality + expertise

**Real Example:**

```
Meta Description: "Rafael Mendes, Founder of RAFA Design.
15 years in architecture and master planning. Focuses on
material honesty, light strategy, and site-responsive design."
```

---

# WORKFLOW: ADDING A TEAM MEMBER

**Step-by-step example: Adding "Rafael Mendes"**

```
1. Go to /admin → "04 // Team Members 👥"
2. Click [+ Create] button

FILL 01 // CONTENT:
3. Full Name: Rafael Mendes
4. Slug: rafael-mendes (auto)
5. Role at RAFA: Founder & Lead Architect
6. Biography: "Rafael founded RAFA Design after ten years
   working with leading European architecture studios.
   His practice focuses on the relationship between building
   and landscape, and the power of material honesty in
   creating spatial experience. He believes great architecture
   emerges from deep listening to place—climate, materials,
   culture, local traditions. Rafael holds degrees from the
   Faculty of Architecture of the University of Porto and
   spent five years in Berlin refining his practice before
   establishing RAFA in 2019."
7. Disciplines: [Architecture, Master Planning, Materiality, Site Strategy]
8. Interests: [Monolithic form, Stone construction, Light strategy, Vernacular]
9. Years of Experience: 15

FILL 02 // MEDIA & SOCIAL:
10. Portrait: [portrait photo of Rafael]
    ├─ Alt Text: "Rafael Mendes, portrait"
    └─ Caption: (empty)
11. Email: rafael@rafadesign.pt
12. Phone: +351 223 456 789
13. Social Link 1:
    ├─ Platform: instagram
    ├─ URL: https://instagram.com/rafael.mendes
    └─ Label: (empty)
14. Social Link 2:
    ├─ Platform: linkedin
    ├─ URL: https://www.linkedin.com/in/rafael-mendes-design
    └─ Label: (empty)
15. Social Link 3:
    ├─ Platform: portfolio
    ├─ URL: https://rafael-mendes-design.com
    └─ Label: "Design Archive"

FILL 03 // CONFIGURATION:
16. Display Order: 1
17. Category // Seniority Tier: Leadership
18. Display on Team Page: TRUE (toggle on)

FILL 04 // SEO:
19. Meta Title: "Rafael Mendes, Founder | RAFA Design"
20. Meta Description: "Rafael Mendes, Founder of RAFA Design.
    15 years in architecture and master planning. Focuses on
    material honesty, light strategy, and landscape integration."

21. [Publish]
```

---

# QUICK REFERENCE: WHAT'S REQUIRED

```
REQUIRED (must fill):
✅ Full Name (person's name)
✅ Slug (auto-generated)
✅ Role at RAFA (professional title)
✅ Biography (personal story)
✅ Portrait (headshot image)
✅ Display Order (position in grid)
✅ Display on Team Page (visibility toggle)

HIGHLY RECOMMENDED:
⭐ Disciplines (areas of expertise)
⭐ Interests (personal passions)
⭐ Years of Experience (seniority indicator)
⭐ Social Links (Instagram, LinkedIn)
⭐ Category (seniority tier)

OPTIONAL (nice to have):
⚪ Email (contact)
⚪ Phone (contact)
⚪ SEO fields (search engine optimization)
```

---

# COMMON TEAM STRUCTURE

**If you have 7 active team members:**

```
Member 1: order 1, category: Leadership
├─ Name: Rafael Mendes
├─ Role: Founder & Lead Architect
├─ Experience: 15 years
├─ Display: TRUE
└─ Social: Instagram, LinkedIn, Portfolio

Member 2: order 2, category: Senior
├─ Name: Sofia Oliveira
├─ Role: Principal Interior Designer
├─ Experience: 12 years
├─ Display: TRUE
└─ Social: Instagram, LinkedIn

Member 3: order 3, category: Senior
├─ Name: António Rocha
├─ Role: Senior Architect
├─ Experience: 10 years
├─ Display: TRUE
└─ Social: Instagram, LinkedIn

Member 4: order 4, category: Mid-Level
├─ Name: Maria Santos
├─ Role: Architect
├─ Experience: 4 years
├─ Display: TRUE
└─ Social: Instagram

Member 5: order 5, category: Mid-Level
├─ Name: Elena Silva
├─ Role: Junior Architect
├─ Experience: 1 year
├─ Display: TRUE
└─ Social: LinkedIn

Member 6: order 6, category: Support
├─ Name: João Costa
├─ Role: Project Manager
├─ Experience: 7 years
├─ Display: TRUE
└─ Social: LinkedIn

Member 7: order 7, category: Support
├─ Name: Ana Dias
├─ Role: Studio Coordinator
├─ Experience: 2 years
├─ Display: TRUE
└─ Social: (minimal/optional)

Internal (not displayed):
├─ Name: Carlos Intern
├─ Display: FALSE (not shown publicly)
└─ Used for internal records only
```

---

## SPECIAL CASES

### Case 1: Team Member Leaves / Departing

```
When someone leaves the team:
├─ Set Display on Team Page: FALSE
├─ Keep record in system (don't delete)
├─ Their profile stays in Sanity
└─ No longer shows on /studio page

Later, if needed:
├─ Can reactivate by setting Display: TRUE
├─ Can update information if they return
└─ Historical record preserved
```

### Case 2: Internal-Only Team Members

```
For staff not shown publicly (admins, coordinators):
├─ Set Display on Team Page: FALSE
├─ Still create profile for internal use
├─ Track in team database
├─ Keep up-to-date contact info
└─ Useful for business operations
```

### Case 3: Multiple Social Profiles

```
If someone is very active:
├─ Add all relevant profiles
├─ Keep limit to 3-5 main platforms
├─ Prioritize professional (LinkedIn, portfolio)
├─ Include creative (Instagram, Behance if relevant)
└─ Avoid adding too many (cluttered)
```

---

# BEST PRACTICES

**Photography consistency:**

- ✅ All team members should have similar headshot style
- ✅ Same lighting, background, composition
- ✅ Professional studio photography recommended
- ✅ Helps with visual cohesion on team page

**Role titles:**

- ✅ Use consistent seniority language across team
- ✅ Update when promotions happen
- ✅ Clear hierarchy (Founder, Principal, Senior, Associate)
- ✅ Avoid ambiguous titles

**Social links:**

- ✅ Verify links work before publishing
- ✅ Keep profiles current
- ✅ Instagram and LinkedIn most important
- ✅ Only include active, professional profiles

**Bio writing:**

- ✅ Authentic voice, not corporate-speak
- ✅ Balance professional + personal
- ✅ Show what makes them unique
- ✅ Consistent tone with other team members

---

## DONE ✅

All Team Member schema fields explained with real examples.

**Ready for next schema?** (Studio, Careers, Contact, Site Settings)

Which one would you like next?
