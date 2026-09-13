# Careers Schema — Complete Admin Guide

**For:** HR, recruitment, studio operations, and marketing  
**Purpose:** Know how to post job openings and manage the careers page  
**Location:** `/admin → "06 // Careers 💼"` (two related sections)

---

## Overview

Careers in RAFA Design consist of **two separate documents**:

1. **Individual Job Postings** (`Career / Job Posting`)
   - One document per open position
   - Appears in `/careers` job listing
   - Title, location, requirements, application link
   - Can be opened, closed, or featured

2. **Careers Page Content** (`Careers Page`)
   - Singleton (one only) managing page-level content
   - Hero section, open application CTA, benefits
   - Studio image/atmosphere
   - Frames all job postings

**Total Tabs:** 3 tabs (for job postings) + 4 tabs (for careers page)  
**Estimated time:** 10 min per job posting; 20-30 min for careers page setup  
**Difficulty:** Easy (straightforward information)

---

## Why Careers Matter

The careers page helps:

- ✅ Attract talented designers and architects
- ✅ Show studio culture and values
- ✅ Communicate benefits and working environment
- ✅ Manage open positions clearly
- ✅ Build employer brand

---

## Part 1: Job Postings (Career)

---

# 01 // CONTENT

### What This Tab Does

Defines the **job details** (title, location, requirements).

---

## Field 1: Job Title

**Field Name:** `title` (Required)

**What to enter:**

```
Official position title.
How the role is known externally.
Clear and professional.
```

**Examples:**

```
✅ GOOD:
├─ Architect
├─ Senior Architect
├─ Associate Architect
├─ Junior Architect
├─ Architectural Technologist
├─ Interior Designer
├─ Project Manager
├─ 3D Visualization Specialist
├─ Landscape Designer
└─ Junior Designer

❌ AVOID:
├─ Architect-ish (vague)
├─ Designer Person (unprofessional)
├─ Help Wanted (too casual)
└─ "We Need Someone" (not a title)
```

**Tips:**

- Use standard job titles
- Include seniority level if relevant
- Under 80 characters
- Clear and searchable

**Real Example:**

```
Job Title: Senior Architect
```

---

## Field 2: URL Slug

**Field Name:** `slug` (Required, auto-filled)

**What it is:**

```
URL-friendly identifier for the job.
Auto-generated from title.
Used in job posting URLs.
```

**How it appears:**

```
Title: Senior Architect
Slug: senior-architect

Website URL: /careers/senior-architect

---

Title: 3D Visualization Specialist
Slug: 3d-visualization-specialist

Website URL: /careers/3d-visualization-specialist
```

**Auto-generation:**

- System creates this automatically
- Only edit if needed for clarity
- Lowercase, hyphenated

---

## Field 3: Discipline / Category

**Field Name:** `discipline` (Required, dropdown)

**What to enter:**

```
Professional discipline / team category.
Helps organize and filter positions.
Choose from predefined list.
```

**Options:**

```
Available categories:
├─ Architecture
├─ Interior Architecture
├─ Visualization & Media
├─ Urban Design & Research
└─ Practice & Operations
```

**Examples:**

```
Architect position:
├─ Discipline: Architecture

Interior Designer position:
├─ Discipline: Interior Architecture

Project Manager position:
├─ Discipline: Practice & Operations

3D Specialist position:
├─ Discipline: Visualization & Media
```

**Tips:**

- Choose the primary discipline
- Used for job listing filtering
- Helps organize careers page

**Real Example:**

```
Discipline: Architecture
```

---

## Field 4: Location

**Field Name:** `location` (Required, text)

**What to enter:**

```
Where the position is based.
City, country, or remote status.
Clear geography for applicant.
```

**Examples:**

```
✅ GOOD:
├─ Porto, Portugal
├─ Remote
├─ Hybrid (Porto-based, some remote)
├─ Kigali, Rwanda
├─ European (flexible location)
├─ London, UK
└─ Berlin, Germany

❌ AVOID:
├─ "Europe" (too vague)
├─ "Somewhere" (unprofessional)
└─ No location (unclear)
```

**Tips:**

- Be specific about city
- Clarify remote/hybrid status
- Include country for international
- Under 80 characters

**Real Example:**

```
Location: Porto, Portugal (Hybrid)
```

---

## Field 5: Employment Type

**Field Name:** `type` (Required, dropdown)

**What to enter:**

```
Type of employment contract.
Choose from predefined options.
Sets expectations for applicant.
```

**Options:**

```
Available types:
├─ Full-time
├─ Internship
├─ Contract
└─ Part-time
```

**Examples:**

```
Senior Architect: Full-time
Junior Architect: Internship or Full-time
Specialist Contract: Contract
Workshop Leader: Part-time
```

**Tips:**

- Be clear about commitment level
- Helps self-select applicants
- Different from status (Open/Closed)

**Real Example:**

```
Employment Type: Full-time
```

---

## Field 6: Description

**Field Name:** `description` (Required, text)

**What to enter:**

```
Detailed job description.
What the role involves.
What makes it special.
Who should apply.
```

**Length:**

- 400-600 characters
- 4-6 sentences
- Comprehensive but readable

**Examples:**

```
Architect Role:
"We are seeking a talented architect to join our Porto-based
studio. You will work on residential and institutional projects,
from concept through completion. Your responsibilities include
site analysis, design development, regulatory coordination, and
on-site construction oversight. You should be passionate about
responsive design, material honesty, and craft excellence.
Experience with both digital tools and hand-drawing is essential.
This is an opportunity to work on high-quality projects with
experienced mentors in a collaborative studio environment."

---

Interior Designer Role:
"RAFA Design seeks an experienced interior designer to develop
and detail interior spaces for residential and commercial projects.
You will lead spatial planning, material selection, and finish
specification. We value designers who understand how spaces feel,
not just how they look. Experience with material sourcing, local
craft traditions, and sustainable interior solutions is preferred.
You should be comfortable presenting to clients and working
collaboratively with architects and consultants."

---

Junior Architect / Internship:
"Are you passionate about architecture? We're looking for junior
architects and talented interns to join us for 6-12 months. You
will support project teams on all phases: research, design
development, documentation, and construction. You will learn
how we approach responsive design, site understanding, and craft.
This is an intensive learning opportunity, ideal for recent
graduates or junior practitioners building experience. Portfolio
and passion for design are more important than years of experience."
```

**Writing tips:**

- Be honest about expectations
- Show studio culture
- Explain what makes role special
- Invite right kind of applicant
- Include growth opportunity if relevant

**Real Example:**

```
Description: "We seek an experienced architect to join our Porto
studio. You will work on residential and institutional projects
from concept through completion. Responsibilities include site
analysis, design development, regulatory coordination, and
construction oversight. You should be passionate about responsive
design, material honesty, and craft excellence. Experience with
digital tools and hand-drawing essential. Opportunity to work on
high-quality projects with experienced mentors in collaborative
studio environment."
```

---

## Field 7: Requirements

**Field Name:** `requirements` (Required, array of text)

**What to enter:**

```
Key skills and experience needed.
Must-haves and nice-to-haves.
Each requirement is separate item.
```

**Examples:**

```
Architect (Senior):
├─ 5+ years professional architecture experience
├─ Portfolio demonstrating design quality
├─ Experience with residential and institutional projects
├─ Proficiency in Rhino and AutoCAD
├─ Strong sketching and hand-drawing skills
├─ Experience managing construction documentation
├─ Knowledge of Portuguese building regulations
└─ Fluent in English and Portuguese

---

Interior Designer:
├─ 3+ years interior design experience
├─ Portfolio showing spatial and material sensibility
├─ Experience with material sourcing and finishes
├─ Proficiency in SketchUp and design software
├─ Understanding of sustainable materials
├─ Strong communication with clients
└─ Fluent in English; Portuguese preferred

---

Junior Architect / Intern:
├─ Recent architecture degree or equivalent training
├─ Portfolio showing design thinking
├─ Basic proficiency in Rhino/AutoCAD
├─ Strong sketching ability
├─ Passion for responsive design and materiality
└─ Ability to work in team environment

---

Project Manager:
├─ 3+ years project management in design/construction
├─ Experience coordinating consultants and contractors
├─ Fluent in both Portuguese and English
├─ Strong organizational and communication skills
├─ Experience with construction budgets and schedules
├─ Knowledge of Portuguese building and planning regulations
└─ Comfort with on-site presence during construction
```

**Tips:**

- 5-7 requirements typical
- Start with experience level
- Mix hard skills (software) and soft skills (attitude)
- Be honest—don't ask for impossible combination
- Include language requirements if relevant
- Mention nice-to-haves implicitly ("knowledge of" = not required)

**Real Example:**

```
Requirements:
├─ 5+ years professional architecture experience
├─ Strong portfolio demonstrating design quality
├─ Proficiency in Rhino and AutoCAD
├─ Experience with residential project delivery
├─ Excellent sketching and hand-drawing skills
├─ Knowledge of Portuguese regulations preferred
└─ Fluent in English and Portuguese
```

---

## Field 8: Application Link

**Field Name:** `applicationLink` (Optional, text)

**What to enter:**

```
External URL for applications.
Link to Google Forms, Typeform, email form, etc.
If empty, use studio contact email.
```

**Examples:**

```
✅ GOOD:
├─ https://forms.google.com/architect-application-2024
├─ https://rafadesign.typeform.com/to/architect-form
├─ https://airtable.com/shr1234567890
└─ mailto:jobs@rafadesign.pt

❌ AVOID:
├─ Short URL (hard to verify)
└─ Dead or invalid link (test first)
```

**Tips:**

- Use professional form service (Google Forms, Typeform, Airtable)
- Alternatively: direct email (mailto:jobs@rafadesign.pt)
- Test link before publishing
- Optional—if empty, applicants contact studio email

**Real Example:**

```
Application Link: https://forms.google.com/rafadesign-architect-2024
```

---

# 02 // CONFIGURATION

### What This Tab Does

Controls **visibility** and **featured status** of the job posting.

---

## Field 1: Display Order

**Field Name:** `order` (Required, number)

**What to enter:**

```
Position in job listings.
Lower numbers appear first.
Reorder postings anytime.
```

**Examples:**

```
If you have 5 open positions:
├─ Senior Architect: order 1 (featured, appears first)
├─ Junior Architect: order 2
├─ Interior Designer: order 3
├─ Project Manager: order 4
└─ 3D Specialist: order 5 (appears last)
```

**Tips:**

- Usually: most urgent/priority first
- Can reorder as needs change
- Order independent of Status

**Real Example:**

```
Display Order: 1
```

---

## Field 2: Status

**Field Name:** `status` (Required, dropdown)

**What to enter:**

```
Current state of the position.
Controls visibility on careers page.
```

**Options:**

```
Available statuses:
├─ Open (actively hiring, shows on page)
├─ Closed (not hiring, hidden from listings)
└─ On Hold (temporarily paused, hidden)
```

**Examples:**

```
Active search:
├─ Status: Open

Filled position:
├─ Status: Closed

Paused temporarily:
├─ Status: On Hold
```

**Tips:**

- Only "Open" positions appear in listings
- "Closed" and "On Hold" are hidden
- Can change status anytime without deleting
- Keep records for future hiring

**Real Example:**

```
Status: Open
```

---

## Field 3: Featured

**Field Name:** `featured` (Required, boolean toggle)

**What to enter:**

```
Highlight this position.
Featured jobs appear at top of careers page.
Useful for urgent/priority roles.
```

**Examples:**

```
Featured = TRUE:
├─ Senior Architect (flagship role)
└─ Appears at top with special highlighting

Featured = FALSE:
├─ Junior Architect (standard listing)
└─ Appears in normal position order
```

**Tips:**

- Only feature 1-2 most important roles
- Too many featured = confuses hierarchy
- Can change without re-posting
- Default: FALSE (not featured)

**Real Example:**

```
Featured: TRUE
(Senior Architect is priority hire)
```

---

# 03 // SEO

### What This Tab Does

Controls how job posting appears in **search engines**.

---

## Field 1: Meta Title

**Field Name:** `seo.title` (Optional, text)

**What to enter:**

```
Title in Google search results.
If empty, uses job title + studio name.
```

**Examples:**

```
✅ GOOD:
├─ "Senior Architect – RAFA Design"
├─ "Architect Job – Porto, Portugal | RAFA Design"
└─ "Interior Designer Position | RAFA Design"

❌ AVOID:
├─ Too long (gets cut off)
└─ Keyword stuffing (unreadable)
```

**Ideal length:**

- 50-60 characters
- Includes job title + firm name

**Real Example:**

```
Meta Title: "Senior Architect – RAFA Design Porto"
```

---

## Field 2: Meta Description

**Field Name:** `seo.description` (Optional, text)

**What to enter:**

```
Summary shown under title in Google.
If empty, uses description field.
```

**Examples:**

```
✅ GOOD:
├─ "Senior Architect position in Porto, Portugal.
   5+ years experience. Join collaborative design studio
   focused on responsive architecture and craft excellence."

└─ "Hiring: Interior Designer for residential and commercial
   projects. Portfolio required. Material honesty and
   spatial design focus. Porto, Portugal."

❌ AVOID:
├─ Too long/hard to read
└─ Generic "We're hiring" text
```

**Ideal length:**

- 155-160 characters
- 1-2 sentences
- Specific about role and location

**Real Example:**

```
Meta Description: "Senior Architect in Porto. 5+ years
experience. Join RAFA Design's collaborative team focused
on responsive architecture and craft excellence."
```

---

# WORKFLOW: POSTING A JOB

**Step-by-step example: "Senior Architect"**

```
1. Go to /admin → "06 // Careers 💼"
2. Click "+ Create Career / Job Posting"

FILL 01 // CONTENT:
3. Job Title: Senior Architect
4. Slug: senior-architect (auto)
5. Discipline: Architecture
6. Location: Porto, Portugal (Hybrid)
7. Employment Type: Full-time
8. Description: [comprehensive job description - see examples]
9. Requirements:
   ├─ 5+ years professional architecture experience
   ├─ Strong portfolio demonstrating design quality
   ├─ Proficiency in Rhino and AutoCAD
   ├─ Experience with residential and institutional projects
   ├─ Excellent sketching and hand-drawing skills
   ├─ Knowledge of Portuguese building regulations preferred
   └─ Fluent in English and Portuguese
10. Application Link: https://forms.google.com/rafadesign-architect-2024

FILL 02 // CONFIGURATION:
11. Display Order: 1
12. Status: Open
13. Featured: TRUE (if urgent/priority)

FILL 03 // SEO:
14. Meta Title: "Senior Architect – RAFA Design Porto"
15. Meta Description: "Senior Architect in Porto. 5+ years
    experience. Join RAFA Design's collaborative team."

16. [Publish]
```

---

# QUICK REFERENCE: JOB POSTINGS

```
REQUIRED (must fill):
✅ Job Title
✅ Slug (auto-generated)
✅ Discipline
✅ Location
✅ Employment Type
✅ Description
✅ Requirements (at least 1)
✅ Display Order
✅ Status

OPTIONAL (nice to have):
⚪ Application Link
⚪ Featured toggle
⚪ SEO fields
```

---

---

# Part 2: Careers Page Content

---

# 01 // HERO

### What This Tab Does

Defines the **hero section** of the `/careers` page.

---

## Field: Hero Section

**Field Name:** `hero` (object)

**What to enter:**

```
Opening message of careers page.
Overline + Heading + Body text.
Sets tone for job listings.
```

**Sub-fields:**

### Overline (optional)

```
Section label above heading.

Example:
"Careers"
or
"Work With Us"
```

### Heading (required)

```
Main heading (max 80 characters).

Examples:
├─ "Join Our Studio"
├─ "We're Hiring"
├─ "Build With Us"
├─ "Careers at RAFA Design"
└─ "Let's Create Together"
```

### Body (required, 600 chars max)

```
Detailed introduction to careers.
Explains studio culture and opportunities.

Example:
"RAFA Design is growing. We're looking for talented architects,
designers, and specialists who share our commitment to responsive
design, material honesty, and craft excellence. If you're passionate
about creating buildings that improve how people live, and excited
about collaborative practice, we'd like to hear from you.

We offer opportunities across architecture, interior design,
visualization, urban design, and studio operations. Whether you're
a seasoned professional or early-career designer, we support growth
and create space for meaningful work.

Browse open positions below or send us your portfolio and a note
about your interests."
```

**Length:**

- 400-600 characters
- 3-5 sentences
- Welcoming and authentic
- Explains what you value

**Tips:**

- Show studio culture
- Invite right kind of people
- Be honest about expectations
- Include variety of opportunities

---

### Complete Hero Example

```
Hero Section:
├─ Overline: "Careers"
├─ Heading: "Join Our Studio"
└─ Body: "RAFA Design is growing. We're looking for
         talented architects, designers, and specialists
         who share our commitment to responsive design,
         material honesty, and craft excellence. If you're
         passionate about creating buildings that improve
         how people live, we'd like to hear from you.
         We offer opportunities across architecture,
         interior design, visualization, urban design, and
         operations. Browse open positions below or contact
         us with your portfolio and interests."
```

---

# 02 // OPEN APPLICATION

### What This Tab Does

**Call-to-action** for unsolicited applications (no specific role).

---

## Field: Open Application CTA

**Field Name:** `openApplication` (object)

**What to enter:**

```
Encourage people to apply even if no role fits.
Open door for future opportunities.
```

**Sub-fields:**

### Overline (optional)

```
Label for this section.

Example:
"Open Applications"
or
"Always Interested"
```

### Heading (optional)

```
Section heading.

Examples:
├─ "Don't See Your Role?"
├─ "Send Your Portfolio"
└─ "Always Looking for Talent"
```

### Body (optional)

```
Explanation of open application process.

Example:
"If you're passionate about our work but don't see a specific
opening that fits, we'd still love to hear from you. Send us
your portfolio, resume, and a note about what excites you about
our practice. We review applications continuously and consider
them for future opportunities as they arise."

Length: 250-400 characters
```

### CTA Label (optional)

```
Button text.

Examples:
├─ "Send Portfolio"
├─ "Apply Now"
├─ "Get In Touch"
└─ "Contact Us"
```

---

### Complete Open Application Example

```
Open Application CTA:
├─ Overline: "Open Applications"
├─ Heading: "Don't See Your Role?"
├─ Body: "If you're passionate about our work but don't see
         an opening that fits, send us your portfolio and
         tell us about your interests. We review submissions
         continuously and consider talented people for
         future opportunities."
└─ CTA: "Send Portfolio"
```

---

# 03 // BENEFITS

### What This Tab Does

Highlights **perks and benefits** of working at the studio.

---

## Field: Benefits (array)

**Field Name:** `benefits` (Optional, array)

**What to enter:**

```
3-6 key benefits of working here.
Each benefit has: Number + Title + Description.
Helps attract the right people.
```

**Structure:**

### Number (optional)

```
Sequential numbering.

Examples:
├─ "01"
├─ "02"
├─ "03"
└─ "04"
```

### Title (required)

```
Benefit name (max 80 characters).

Examples:
├─ "Meaningful Work"
├─ "Collaborative Culture"
├─ "Professional Growth"
├─ "Flexibility & Balance"
├─ "Learning Opportunities"
├─ "Competitive Compensation"
├─ "Studio Environment"
└─ "International Experience"
```

### Description (required, 300 chars max)

```
Detailed explanation of benefit.

Examples:
├─ "You'll work on high-quality projects that improve
   how people live. Your work matters and will be built."

├─ "We value collaboration across disciplines.
   Architects work with interior designers, landscape
   architects, engineers, and craftspeople."

├─ "We invest in team development. Mentorship, workshops,
   conference attendance, and continuing education supported."

├─ "Flexible working arrangements. Remote options,
   flexible hours, and support for work-life balance."

└─ "Opportunity to work internationally. Projects and
   collaborations across Europe, Africa, and beyond."
```

---

### Complete Benefits Example

```
Benefit 1:
├─ Number: "01"
├─ Title: "Meaningful Work"
└─ Description: "You'll work on high-quality projects that
               improve how people live. Your design work
               will be built and experienced by real people."

Benefit 2:
├─ Number: "02"
├─ Title: "Collaborative Culture"
└─ Description: "We work across disciplines. Architects
               collaborate with interior designers, landscape
               architects, engineers, and craftspeople."

Benefit 3:
├─ Number: "03"
├─ Title: "Professional Growth"
└─ Description: "We invest in your development. Mentorship,
               workshops, conferences, and continuing
               education are supported and encouraged."

Benefit 4:
├─ Number: "04"
├─ Title: "Flexibility & Balance"
└─ Description: "We believe in sustainable working practices.
               Flexible hours, remote options, and support
               for work-life balance."

Benefit 5:
├─ Number: "05"
├─ Title: "International Experience"
└─ Description: "Opportunities to work on international
               projects and collaborations across Europe,
               Africa, and beyond."

Benefit 6:
├─ Number: "06"
├─ Title: "Studio Environment"
└─ Description: "Our Porto atelier is a beautiful, creative
               workspace with natural light, materials library,
               and model-making facilities."
```

**Number of benefits:**

- Typical: 4-6 benefits
- Show what's genuine, not inflated
- Mix tangible (flexibility) and intangible (meaning)

---

# 04 // MEDIA

### What This Tab Does

Manages **studio imagery** for careers page.

---

## Field: Studio Image

**Field Name:** `studioImage` (Optional, image)

**What to enter:**

```
Full-width photograph of studio.
Shown between job listings and benefits.
Reinforces studio culture and atmosphere.
```

**What makes a good studio image:**

```
✅ GOOD:
├─ Authentic studio photograph
├─ Shows team working, collaborating
├─ Captures creative atmosphere
├─ Professional photography
├─ Full-width layout
└─ High resolution

❌ AVOID:
├─ Generic office stock photo
├─ Too posed/artificial
├─ Low resolution
└─ Doesn't reflect real studio
```

**Sub-fields:**

### Alt Text (accessibility)

```
Description for screen readers.

Example:
"RAFA Design team working in Porto studio with models
and architectural drawings"
```

### Caption (optional)

```
Text displayed with image.

Example:
"Studio atelier, Porto"
or
"Where we work"
```

---

### Complete Studio Image Example

```
Studio Image:
├─ File: careers-studio-image.jpg (2400x1600px)
├─ Alt Text: "RAFA Design team working in Porto studio
│            with architectural models"
└─ Caption: "Our studio in Porto"
```

---

# WORKFLOW: SETTING UP CAREERS PAGE

**Step-by-step example:**

```
1. Go to /admin → "06 // Careers 💼"
2. Find "Careers Page" document (singleton)
3. Click to edit

FILL 01 // HERO:
4. Overline: "Careers"
5. Heading: "Join Our Studio"
6. Body: [introduction text explaining opportunities]

FILL 02 // OPEN APPLICATION:
7. Overline: "Open Applications"
8. Heading: "Don't See Your Role?"
9. Body: [explanation of unsolicited applications]
10. CTA Label: "Send Portfolio"

FILL 03 // BENEFITS:
11. Add 4-6 benefits (number, title, description for each)

FILL 04 // MEDIA:
12. Studio Image: [upload atelier photo]
    ├─ Alt Text: [accessibility description]
    └─ Caption: [optional caption]

13. [Publish]

THEN: Create individual job postings (see Part 1 workflow)
```

---

# COMPLETE CAREERS WORKFLOW

**Full process from start to finish:**

```
SETUP (One-time):
1. Set up Careers Page with hero, benefits, studio image
2. Create "Open Application CTA" section

ONGOING (For each open position):
3. Create new Career/Job Posting
4. Fill all required fields
5. Set order and status
6. Publish
7. Share link if needed

UPDATING:
8. Change status to "Closed" when role is filled
9. Keep records for future reference
10. Reorder positions as needed
11. Update benefits/page content occasionally
```

---

# QUICK REFERENCE: CAREERS PAGE

```
CAREERS PAGE FIELDS:

01 // HERO:
✅ Heading (required)
⚪ Overline, Body (optional)

02 // OPEN APPLICATION:
⚪ Overline, Heading, Body, CTA Label (all optional)

03 // BENEFITS:
⭐ Highly recommended (4-6 benefits)
   Each: Number + Title + Description

04 // MEDIA:
⭐ Studio Image (highly recommended)
   Provides visual context for careers page
```

---

# BEST PRACTICES

**Job postings:**

- ✅ Be honest about expectations
- ✅ Show what makes your studio special
- ✅ Include growth opportunity if relevant
- ✅ Keep descriptions readable (not exhaustive)
- ✅ Test application links before publishing
- ✅ Update status promptly when position filled
- ✅ Keep archives for future hiring cycles

**Careers page:**

- ✅ Reflect actual studio culture
- ✅ Show benefits that are real/meaningful
- ✅ Use professional photography
- ✅ Keep hero message warm and welcoming
- ✅ Update regularly as studio evolves

**Discipline categories:**

- Use consistent naming
- Align with your actual team structure
- Helps organize and filter roles

**Ordering:**

- Feature most urgent/important first
- Use "Featured" toggle for priority roles
- Change order as priorities shift

---

## DONE ✅

All Careers schema fields explained with real examples.

**Coverage:**

- Career / Job Posting (8 fields across 3 tabs)
- Careers Page singleton (hero, application CTA, benefits, media)
- Complete workflows for both
- Best practices

**Next schema:** Contact (contact form, location, social media, editorial image)

Ready to continue?
