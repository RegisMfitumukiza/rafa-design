# Site Settings Schema — Complete Admin Guide

**For:** Site administrators, marketing, and technical operations  
**Purpose:** Know how to manage global site configuration, SEO defaults, and operational settings  
**Location:** `/admin → "08 // Site Settings ⚙️"`

---

## Overview

Site Settings is a **singleton** (only one exists) that controls global configuration for the entire website. It stores:

- **Identity:** Site name, tagline, description, canonical URL
- **SEO:** Default meta tags, keywords, OG image (fallback for all pages)
- **Operational:** Analytics tracking, maintenance mode

**Total Tabs:** 3 sections  
**Estimated time to fill:** 10-15 minutes (usually done once at setup, rarely updated)  
**Difficulty:** Easy (straightforward configuration)

---

## Why Site Settings Matter

Site Settings provides:

- ✅ Fallback SEO for pages without custom overrides
- ✅ Global site identity for social shares
- ✅ Analytics tracking configuration
- ✅ Maintenance mode for planned downtime
- ✅ Canonical site URL for search engines

**Important Note:**

```
⚠️ NOT a second source of contact information
Contact details (email, phone, address) live ONLY in the
Contact schema, not here. Site Settings is for configuration,
not for operational data.
```

---

## Tab-by-Tab Breakdown

---

# 01 // IDENTITY

### What This Tab Does

Defines the **global site identity** (name, tagline, description, canonical URL).

---

## Field 1: Site Name

**Field Name:** `siteName` (Required)

**What to enter:**

```
Official name of your website.
Used in browser tabs, site headers, fallback title.
Your studio / firm name.
```

**Examples:**

```
✅ GOOD:
├─ RAFA Design
├─ RAFA Arquitetura
├─ RAFA Design Studio
└─ RAFA

❌ AVOID:
├─ The Website (too generic)
├─ Architecture Portfolio Site (awkward)
└─ [No name] (blank)
```

**Tips:**

- Keep consistent across all sites/materials
- Under 60 characters
- Professional and clear
- This is your site's primary identity

**Real Example:**

```
Site Name: RAFA Design
```

---

## Field 2: Tagline

**Field Name:** `tagline` (Optional)

**What to enter:**

```
Short descriptive phrase for your studio.
1-2 words or short phrase.
Appears in some site headers/footers.
```

**Examples:**

```
✅ GOOD:
├─ "Architecture & Interior Design"
├─ "Responsive Design Studio"
├─ "Design that responds to place"
├─ "Architecture // Porto"
└─ "Creating thoughtful buildings"

❌ AVOID:
├─ Very long text (defeats purpose)
├─ Generic ("We do design")
└─ Vague or unclear
```

**Length:**

- Under 120 characters
- Snappy and memorable
- Optional but recommended

**Real Example:**

```
Tagline: "Architecture & Interior Design // Porto"
```

---

## Field 3: Site Description

**Field Name:** `description` (Optional, text)

**What to enter:**

```
Comprehensive description of your studio.
Used as fallback meta description (SEO).
Shows when pages don't have custom descriptions.
```

**Examples:**

```
Description 1:
"RAFA Design is an architecture and interior design studio
based in Porto, Portugal. We create buildings and spaces that
respond to specific conditions of place. Committed to material
honesty, craft excellence, and human-centered design."

---

Description 2:
"Design studio focused on responsive architecture and spatial
design. Working across residential, institutional, and commercial
projects with emphasis on place-based design thinking and
material authenticity."

---

Description 3:
"Architecture studio in Porto creating buildings and interiors
that respond to specific conditions of place. Our practice is
grounded in material honesty, craft excellence, and the belief
that great design improves how people live."
```

**Length:**

- 250-300 characters
- 2-3 sentences
- Comprehensive but readable
- Describes your approach and values

**When used:**

- Fallback on pages without custom SEO description
- Used in social shares if no custom OG image
- Helps search engines understand your site

**Real Example:**

```
Site Description: "Architecture and interior design studio in
Porto, Portugal. We create buildings and spaces that respond to
specific conditions of place through material honesty, craft
excellence, and human-centered design. Working across residential,
institutional, and commercial scales."
```

---

## Field 4: Site URL

**Field Name:** `siteUrl` (Optional, text)

**What to enter:**

```
Canonical URL of your website.
Full domain with protocol.
Used for SEO (tells search engines your primary domain).
```

**Examples:**

```
✅ GOOD:
├─ https://rafadesign.pt
├─ https://www.rafadesign.pt
├─ https://rafa-design.com
└─ https://rafadesign.com

❌ AVOID:
├─ rafadesign.pt (no https://)
├─ www.rafadesign.pt (no protocol)
├─ http:// (use https only)
└─ localhost:3000 (local development URL)
```

**Format:**

- Include protocol (https://)
- Include domain (.pt, .com, etc.)
- No trailing slash
- Production URL only

**Tips:**

- Critical for SEO (canonical domain)
- Should match your actual domain
- Used in structured data / schema.org
- Required for OpenGraph meta tags

**Real Example:**

```
Site URL: https://rafadesign.pt
```

---

# 02 // SEO

### What This Tab Does

Defines **default SEO settings** for pages without custom overrides.

---

## Field: Default SEO (object)

**Field Name:** `defaultSeo` (Optional, object)

**What to enter:**

```
Fallback SEO configuration for entire site.
Used when individual pages have no custom SEO.
Provides consistent defaults across all pages.
```

**Sub-fields:**

### Default Meta Title

```
Title shown in Google search results (fallback).
If a page has custom SEO title, that takes priority.
If page has no custom title, this is used.

Character limit: 60 characters (hard limit for display)

Examples:
├─ "RAFA Design – Architecture & Interior Design Studio"
├─ "Architecture Studio in Porto | RAFA Design"
└─ "RAFA Design – Responsive Architecture & Interiors"

Tips:
├─ Include studio name + brief description
├─ 50-60 characters for best display
├─ Include location if relevant
└─ Professional and descriptive
```

**Real Example:**

```
Default Meta Title: "RAFA Design – Architecture & Interior Design Studio"
```

---

### Default Meta Description

```
Summary shown under title in Google search (fallback).
If a page has custom SEO description, that takes priority.
If page has no custom description, this is used.

Character limit: 300 characters (hard limit)
Recommended: 155-160 characters for optimal Google display

Examples:
├─ "Architecture and interior design studio in Porto.
   We create buildings and spaces responding to specific
   conditions of place. Committed to material honesty
   and craft excellence."

├─ "RAFA Design – responsive architecture studio in Porto,
   Portugal. Working across residential, institutional,
   and commercial projects with focus on place-based
   design and material authenticity."

└─ "Discover RAFA Design Studio in Porto. Creating
   architecture and interiors through responsive design,
   material honesty, and craft excellence. See our portfolio
   and approach."

Tips:
├─ 155-160 characters ideal for Google display
├─ Up to 300 for social media previews
├─ Include location if relevant
├─ Be compelling but honest
└─ Include primary keywords naturally
```

**Real Example:**

```
Default Meta Description: "Architecture and interior design studio
in Porto, Portugal. We create buildings and spaces responding to
specific conditions of place through material honesty and craft
excellence. Discover our approach, portfolio, and values."
```

---

### Default Keywords

```
Keywords describing your site (fallback).
Used when pages have no custom keywords.
Helps search engines understand your focus.

Format: Tags (one keyword per tag)

Examples:
├─ architecture
├─ interior-design
├─ portuguese-architecture
├─ design-studio
├─ responsive-design
├─ material-honesty
├─ craft
├─ porto
├─ residential-architecture
├─ institutional-design
└─ urban-design

Tips:
├─ 8-12 keywords typical
├─ Mix broad (architecture) and specific (responsive-design)
├─ Include location (portugal, porto)
├─ Use lowercase-with-hyphens
├─ Include your disciplines
└─ Think about how people search for you
```

**Real Example:**

```
Default Keywords: ["architecture", "interior-design",
                   "design-studio", "responsive-design",
                   "material-honesty", "craft", "porto",
                   "portuguese-architecture", "residential",
                   "institutional-design", "urban-design"]
```

---

### Default OG Image

```
Social media preview image (fallback).
Shown when site/pages shared on social media.
If a page has custom OG image, that takes priority.
If page has no custom image, this is used.

What makes a good OG image:
├─ 1200x630px (optimal for Facebook, Twitter, LinkedIn)
├─ High quality, visually striking
├─ Represents your studio or best project
├─ Text/logo clear at small sizes
├─ Your brand colors and aesthetic
└─ Professional and polished

Examples of good OG images:
├─ Beautiful exterior of signature project
├─ Studio hero shot or atmosphere
├─ Branded graphic with studio name + tagline
├─ Architectural detail or material close-up
└─ Combination of studio name + visual

Sub-field: Alt Text
├─ Accessibility description
├─ Example: "RAFA Design studio exterior in Porto"
└─ Describes the image for screen readers
```

**Real Example:**

```
Default OG Image:
├─ File: rafa-design-og-image.jpg (1200x630px)
├─ Alt Text: "RAFA Design studio in Porto – Architecture & Interior Design"
└─ (Used on all pages when no custom image)
```

---

### Complete Default SEO Example

```
Default SEO:
├─ Default Meta Title:
│  "RAFA Design – Architecture & Interior Design Studio Porto"
├─ Default Meta Description:
│  "Architecture and interior design studio in Porto, Portugal.
│   We create buildings and spaces responding to specific conditions
│   of place through material honesty and craft excellence."
├─ Default Keywords:
│  [architecture, interior-design, design-studio, responsive-design,
│   material-honesty, craft, porto, portuguese-architecture]
└─ Default OG Image:
   [rafa-design-og-image.jpg 1200x630px]
   Alt: "RAFA Design studio in Porto"
```

---

## How Default SEO Works

```
SCENARIO 1: Page with custom SEO
User visits /projects/casa-monte
Casa Monte has custom SEO title: "Casa Monte – RAFA Design"
Result: Custom title is used (default ignored)

---

SCENARIO 2: Page without custom SEO
User visits /about
About page has no custom SEO
Result: Default SEO title/description is used

---

SCENARIO 3: Social share
User shares /journal/article-slug on Instagram
Article has custom OG image: beautiful photo
Result: Custom image shown (default OG ignored)

User shares /services/architecture on Instagram
Services page has no custom OG image
Result: Default OG image is shown

---

SCENARIO 4: Search result
Google indexes /studio (no custom SEO)
Displays default meta title and description
Result: Site Settings defaults show in search results
```

---

# 03 // OPERATIONAL

### What This Tab Does

Manages **technical configuration** (analytics, maintenance mode).

---

## Field 1: Analytics Code

**Field Name:** `analyticsCode` (Optional, text)

**What to enter:**

```
Google Analytics tracking ID or measurement ID.
Enables visitor tracking and analytics.
Used to monitor site traffic and behavior.
```

**Examples:**

```
✅ GOOD:
├─ G-XXXXXXXXXX (Google Analytics 4 format)
├─ UA-XXXXXXXXX-X (Universal Analytics format)
└─ Just the ID, no other text

❌ AVOID:
├─ https://www.google-analytics.com/... (full script)
├─ "My tracking code" (descriptive text)
└─ Multiple IDs in one field
```

**How to find your ID:**

```
1. Go to Google Analytics
2. Go to Admin → Property Settings
3. Copy your Measurement ID (G-XXXXXXXXXX)
4. Paste into this field
```

**Format:**

- Google Analytics 4: G-XXXXXXXXXX (newest)
- Universal Analytics: UA-XXXXXXXXX-X (older)
- Just the ID, nothing else

**Tips:**

- Critical for understanding site traffic
- Requires Google Analytics account
- Test after entering to confirm tracking works
- Update if you change analytics provider

**Real Example:**

```
Analytics Code: G-1A2B3C4D5E6F
```

---

## Field 2: Maintenance Mode

**Field Name:** `maintenanceMode` (Required, boolean toggle)

**What to enter:**

```
Enable/disable maintenance page.
When TRUE: Visitors see maintenance message.
When FALSE: Site operates normally.
```

**Examples:**

```
Maintenance Mode = FALSE (Normal):
├─ Site operates as normal
├─ Visitors see full website
└─ Default state

---

Maintenance Mode = TRUE (Maintenance):
├─ Visitors see maintenance page
├─ Site displays maintenance message
└─ Used during planned downtime
```

**When to use:**

```
✅ Use maintenance mode when:
├─ Doing major site updates
├─ Performing server maintenance
├─ Deploying critical changes
├─ Want to pause traffic temporarily
└─ Scheduled downtime

❌ Don't use for:
├─ Regular updates (usually quick)
├─ Minor content changes
└─ Extended periods (hurts SEO)
```

**Tips:**

- Default: FALSE (off/normal operation)
- Only enable when necessary
- Keep maintenance windows short
- Prepare message before enabling
- Turn off immediately after maintenance complete

**Real Example:**

```
Maintenance Mode: FALSE
(Site operates normally)

---

Maintenance Mode: TRUE
(When doing server updates)
```

---

## Field 3: Maintenance Message

**Field Name:** `maintenanceMessage` (Optional, text)

**What to enter:**

```
Message shown to visitors during maintenance.
Appears when Maintenance Mode = TRUE.
Explains what's happening and when site returns.
```

**Examples:**

```
Message 1:
"We're currently performing scheduled maintenance to improve
your experience. We'll be back online soon. Thank you for your
patience."

---

Message 2:
"Site maintenance in progress. Expected completion: 2 hours.
For urgent inquiries, please email contact@rafadesign.pt"

---

Message 3:
"We're making improvements. Back online shortly.
Questions? Contact us at hello@rafadesign.pt"

---

Message 4:
"We're temporarily offline for system updates.
We appreciate your patience and look forward to seeing
you again soon."
```

**Writing tips:**

- Be honest and professional
- Provide expected duration if known
- Give alternative contact method (email)
- Warm and apologetic tone
- Keep concise (not overwhelming)

**Real Example:**

```
Maintenance Message: "We're performing scheduled maintenance
to improve your experience. Expected time: 2 hours.
For inquiries, email contact@rafadesign.pt.
Thank you for your patience."
```

**When to use:**

```
Only display when Maintenance Mode = TRUE

Leave empty when Maintenance Mode = FALSE
(message won't be shown)
```

---

# WORKFLOW: SETTING UP SITE SETTINGS

**Step-by-step example (initial setup):**

```
1. Go to /admin → "08 // Site Settings ⚙️"
2. Find "Site Settings" document (singleton)
3. Click to edit

FILL 01 // IDENTITY:
4. Site Name: RAFA Design
5. Tagline: "Architecture & Interior Design // Porto"
6. Site Description: [comprehensive studio description]
7. Site URL: https://rafadesign.pt

FILL 02 // SEO:
8. Default Meta Title: "RAFA Design – Architecture & Interior Design Studio"
9. Default Meta Description: [search engine summary]
10. Default Keywords: [list of 8-12 keywords]
11. Default OG Image: [upload 1200x630px image]
    └─ Alt Text: [accessibility description]

FILL 03 // OPERATIONAL:
12. Analytics Code: G-1A2B3C4D5E6F
13. Maintenance Mode: FALSE (toggle off - normal operation)
14. Maintenance Message: (leave empty for now)

15. [Publish]
```

---

# WORKFLOW: ENABLING MAINTENANCE MODE

**Step-by-step example (during planned downtime):**

```
BEFORE MAINTENANCE:
1. Go to /admin → "08 // Site Settings ⚙️"
2. Find "Site Settings" document
3. Click to edit

ENABLE MAINTENANCE:
4. Maintenance Mode: TRUE (toggle on)
5. Maintenance Message: "We're performing scheduled
   maintenance. Expected time: 2 hours.
   For questions: contact@rafadesign.pt"
6. [Publish immediately]

→ Visitors now see maintenance page

DURING MAINTENANCE:
7. [Do your updates/maintenance work]

AFTER MAINTENANCE (Important!):
8. Go back to /admin → "08 // Site Settings ⚙️"
9. Maintenance Mode: FALSE (toggle off)
10. [Publish immediately]

→ Site back online for visitors
```

---

# QUICK REFERENCE: WHAT'S REQUIRED

```
REQUIRED (must fill):
✅ Site Name
✅ Site URL (critical for SEO)
✅ Maintenance Mode toggle

HIGHLY RECOMMENDED:
⭐ Tagline (describes your studio)
⭐ Site Description (fallback for SEO)
⭐ Default Meta Title
⭐ Default Meta Description
⭐ Default OG Image (social shares)
⭐ Analytics Code (track visitors)

OPTIONAL:
⚪ Default Keywords
⚪ Maintenance Message (only needed if using maintenance mode)
```

---

# BEST PRACTICES

**Site identity:**

- ✅ Keep site name consistent with all other materials
- ✅ Tagline should be memorable and descriptive
- ✅ Description should reflect actual studio practice
- ✅ Site URL must match your actual domain

**SEO defaults:**

- ✅ Default meta title under 60 characters
- ✅ Default meta description 155-160 characters
- ✅ OG image is 1200x630px (optimal for social)
- ✅ Keywords should be realistic and relevant
- ✅ These are fallbacks—pages override them with custom values
- ✅ Helps with pages that aren't individually optimized

**Analytics:**

- ✅ Use Google Analytics 4 (G-XXXXXXXXXX) if possible
- ✅ Test tracking after entering code
- ✅ Monitor traffic regularly to understand visitor behavior
- ✅ Use data to inform content and design decisions

**Maintenance mode:**

- ✅ Only enable when necessary
- ✅ Keep maintenance windows as short as possible
- ✅ Provide clear message and estimated duration
- ✅ Include alternative contact method
- ✅ Disable immediately after maintenance (hurts SEO if prolonged)
- ✅ Test maintenance page before enabling

**Important reminders:**

- ⚠️ Site Settings is NOT for contact information
  └─ Contact details live in the Contact schema only
- ⚠️ Default SEO is a fallback, not a replacement
  └─ Individual pages should have custom SEO when possible
- ⚠️ Canonical URL is important for SEO
  └─ Don't change after site is live (can confuse search engines)

---

# WHEN TO UPDATE SITE SETTINGS

**Initial setup (one-time):**

- Set all identity fields
- Configure default SEO
- Enter analytics code
- Maintenance mode OFF

**Ongoing updates:**

- Update description if studio changes
- Update keywords if services change
- Update OG image if brand changes
- Add/change analytics code if needed
- Enable maintenance mode only for planned downtime

**Never change:**

- Site name (without good reason)
- Site URL (breaks SEO)
- Analytics ID (lose tracking history)

---

## DONE ✅

All Site Settings schema fields explained with real examples.

**Coverage:**

- Site Name, Tagline, Description, Canonical URL (01 // Identity)
- Default SEO (Meta Title, Description, Keywords, OG Image) (02 // SEO)
- Analytics Code, Maintenance Mode, Maintenance Message (03 // Operational)
- Complete setup and maintenance workflows
- Best practices
- Important reminders about role and scope

---

# 🎉 ALL 8 SCHEMAS COMPLETE

**Guides created:**

1. ✅ 01-PROJECTS-SCHEMA-ADMIN-GUIDE.md (Projects)
2. ✅ 02-JOURNAL-SCHEMA-ADMIN-GUIDE.md (Journal/Articles)
3. ✅ 03-SERVICES-SCHEMA-ADMIN-GUIDE.md (Services)
4. ✅ 04-TEAM-SCHEMA-ADMIN-GUIDE.md (Team Members)
5. ✅ 05-STUDIO-SCHEMA-ADMIN-GUIDE.md (Studio Page)
6. ✅ 06-CAREERS-SCHEMA-ADMIN-GUIDE.md (Careers)
7. ✅ 07-CONTACT-SCHEMA-ADMIN-GUIDE.md (Contact)
8. ✅ 08-SITE-SETTINGS-SCHEMA-ADMIN-GUIDE.md (Site Settings)

**Total coverage:**

- 8 comprehensive admin guides
- 50+ fields explained
- 100+ real examples
- 8 complete workflows
- All best practices documented
- Ready for studio owners to use

**Next step:** Ready for your review and approval.
