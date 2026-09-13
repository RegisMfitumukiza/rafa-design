# Contact Schema — Complete Admin Guide

**For:** Studio operations, business development, and administrative staff  
**Purpose:** Know how to manage contact information, offices, and social media  
**Location:** `/admin → "07 // Contact 📞"`

---

## Overview

The Contact document is a **singleton** (only one exists) that controls the entire `/contact` page. It stores:

- Primary contact details (email, phone, address, coordinates)
- Multiple office locations (Porto, satellite offices, etc.)
- Social media links and social channels
- Editorial closing image

**Total Tabs:** 4 sections  
**Estimated time to fill:** 15-25 minutes (usually done once, updated occasionally)  
**Difficulty:** Easy (straightforward information)

---

## Why Contact Information Matters

The contact page helps:

- ✅ Prospective clients reach you
- ✅ Show all office locations
- ✅ Build social media following
- ✅ Provide geographic context (coordinates)
- ✅ Explain what project types you accept

---

## Tab-by-Tab Breakdown

---

# 01 // CONTACT DETAILS

### What This Tab Does

Defines the **primary contact information** for your studio.

---

## Field 1: Primary Email

**Field Name:** `email` (Required, email)

**What to enter:**

```
Main email address for inquiries.
Used throughout the website.
Must be valid email format.
```

**Examples:**

```
✅ GOOD:
├─ contact@rafadesign.pt
├─ studio@rafadesign.pt
├─ info@rafadesign.pt
└─ hello@rafadesign.pt

❌ AVOID:
├─ contact (no @ or domain)
├─ not-an-email (not valid format)
└─ Multiple emails here (use one primary)
```

**Tips:**

- Use professional studio domain
- Consistent format across materials
- Ensure email is monitored
- This is critical—verify it works

**Real Example:**

```
Primary Email: contact@rafadesign.pt
```

---

## Field 2: Primary Phone

**Field Name:** `phone` (Optional, text)

**What to enter:**

```
Main phone number for inquiries.
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
└─ Not a valid number format
```

**Tips:**

- Use international format (+country code)
- Include spaces for readability
- Test that number works
- Optional but recommended

**Real Example:**

```
Primary Phone: +351 223 456 789
```

---

## Field 3: Primary Address

**Field Name:** `address` (Optional, text)

**What to enter:**

```
Main studio address.
Full address or brief location identifier.
```

**Examples:**

```
✅ GOOD:
├─ "Rua da Ferreira, 45, 4050-123 Porto, Portugal"
├─ "Porto, Portugal"
├─ "Ribeira, Porto"
└─ "Atelier, Porto – By appointment"

❌ AVOID:
├─ Just "Portugal" (too vague)
└─ Incomplete address
```

**Tips:**

- Can be full street address or brief location
- Include city and country
- Clarify if by appointment only
- Should match primary office location

**Real Example:**

```
Primary Address: Rua da Ferreira 45, 4050-123 Porto, Portugal
```

---

## Field 4: Coordinates

**Field Name:** `coordinates` (Optional, text)

**What to enter:**

```
Latitude and longitude for map display.
Used for location maps on contact page.
Decimal format (degrees, minutes, seconds).
```

**Format:**

```
Latitude, Longitude format

Examples:
├─ "41.1579° N, 8.6291° W" (Porto)
├─ "40.7128° N, 74.0060° W" (New York)
└─ "48.8566° N, 2.3522° E" (Paris)

Or decimal format:
├─ 41.1579, -8.6291
├─ 40.7128, -74.0060
└─ 48.8566, 2.3522
```

**How to find:**

```
1. Go to Google Maps
2. Search your address
3. Right-click → Copy coordinates
4. Paste into this field

Example from Google Maps:
41.1579, -8.6291
```

**Tips:**

- Used for embedded maps on contact page
- Verify coordinates are accurate
- Affects location splash/visual
- Optional but recommended for location display

**Real Example:**

```
Coordinates: 41.1579° N, 8.6291° W
(Porto studio location)
```

---

## Field 5: Project Types

**Field Name:** `projectTypes` (Optional, array of text)

**What to enter:**

```
Types of projects you accept.
What clients should contact you about.
Each type is separate item in list.
```

**Examples:**

```
✅ GOOD project types:
├─ Architecture
├─ Interior Design
├─ Landscape Design
├─ Urban Design
├─ Renovation
├─ Master Planning
├─ Consulting
├─ 3D Visualization
├─ Mixed-Use Development
└─ Other

❌ AVOID:
├─ "Everything" (too vague)
├─ Very specific projects (too limiting)
└─ Disciplines you don't actually do
```

**Tips:**

- 4-8 project types typical
- Match your actual service offerings
- Helps qualify inquiries
- Shows scope of work you accept
- Displayed on contact page

**Real Example:**

```
Project Types:
├─ Architecture
├─ Interior Design
├─ Landscape Design
├─ Urban Design
├─ Renovation
├─ Master Planning
└─ Consulting
```

---

# 02 // OFFICES

### What This Tab Does

Manages **multiple office locations** (Porto, satellites, etc.).

---

## Field: Offices (array)

**Field Name:** `offices` (Optional, array)

**What to enter:**

```
All studio office locations.
Primary office first, satellites after.
Each office: name, city, address, coordinates, hours, phone, maps URL, image.
Order matters for display.
```

**Structure for each office:**

### Office Name (required)

```
Name of this office location.

Examples:
├─ "RAFA Design Porto"
├─ "Porto Studio"
├─ "Berlin Office"
├─ "Atelier – Porto"
└─ "Main Studio"
```

### City (optional)

```
City where office is located.

Examples:
├─ Porto
├─ Lisbon
├─ Berlin
└─ Kigali
```

### Country (optional)

```
Country of office.

Examples:
├─ Portugal
├─ Germany
├─ Rwanda
└─ UK
```

### Address (optional)

```
Full street address.

Example:
"Rua da Ferreira, 45, 4050-123 Porto, Portugal"
```

### Coordinates (optional)

```
Latitude and longitude for maps.

Example:
"41.1579° N, 8.6291° W"
```

### Opening Hours (optional)

```
Office hours of operation.

Examples:
├─ "Mon-Fri, 9am-6pm"
├─ "By appointment"
├─ "Mon-Fri 09:00-18:00"
└─ "Flexible schedule"
```

### Phone (optional)

```
Office-specific phone number.

Example:
"+351 223 456 789"
```

### Maps URL (optional)

```
Google Maps link to office.

Example:
"https://maps.google.com/?q=41.1579,-8.6291"
```

### Office Image (optional)

```
Photo of this office location.
Exterior, interior, or signage.

Sub-fields:
├─ Image file
├─ Alt Text (accessibility)
└─ Caption (optional label)
```

---

### Complete Offices Example

```
Office 1 (Primary):
├─ Name: "RAFA Design Porto"
├─ City: Porto
├─ Country: Portugal
├─ Address: "Rua da Ferreira, 45, 4050-123 Porto, Portugal"
├─ Coordinates: "41.1579° N, 8.6291° W"
├─ Hours: "Mon-Fri, 9am-6pm (by appointment outside hours)"
├─ Phone: "+351 223 456 789"
├─ Maps URL: "https://maps.google.com/?q=41.1579,-8.6291"
└─ Image: [office-porto.jpg]
   ├─ Alt: "RAFA Design studio exterior in Porto"
   └─ Caption: "RAFA Design, Porto"

Office 2 (Satellite):
├─ Name: "RAFA Design Berlin"
├─ City: Berlin
├─ Country: Germany
├─ Address: "Friedrichstrasse 123, 10117 Berlin, Germany"
├─ Coordinates: "52.5200° N, 13.4050° E"
├─ Hours: "By appointment"
├─ Phone: "+49 30 123 45678"
├─ Maps URL: "https://maps.google.com/?q=52.5200,13.4050"
└─ Image: [office-berlin.jpg]
   ├─ Alt: "RAFA Design satellite office in Berlin"
   └─ Caption: "RAFA Design, Berlin"
```

**Number of offices:**

- Minimum: 1 (primary studio)
- Typical: 1-2 (main + one satellite)
- Can have more if expanded globally

**Important:**

```
⚠️ Order matters
The first office in this list is primary.
Appears at top of contact page and in listings.
Reorder to change hierarchy.
```

---

# 03 // SOCIAL

### What This Tab Does

Manages **social media links** and channels.

---

## Field: Social Links (array)

**Field Name:** `socialLinks` (Optional, array)

**What to enter:**

```
Studio social media profiles.
Platform + URL + optional label override.
Used for social media section on contact page.
```

**How to add:**

```
1. Click "+ Add Social Link"
2. Platform: (lowercase identifier)
3. URL: (full link to profile)
4. Label Override: (optional display name)
5. Repeat for each platform
```

---

### Social Link Sub-fields

#### Platform (required)

```
Lowercase identifier of the social platform.

Examples:
├─ instagram
├─ linkedin
├─ twitter (or x)
├─ youtube
├─ tiktok
├─ vimeo
├─ behance
├─ facebook
├─ pinterest
├─ facebook
└─ newsletter

Rules:
├─ Lowercase only
├─ No spaces or special characters
├─ Standard platform names
└─ Consistent across site
```

---

#### URL (required)

```
Full URL to the social profile.

Examples:
├─ https://instagram.com/rafadesign
├─ https://www.linkedin.com/company/rafa-design
├─ https://www.youtube.com/@rafadesign
├─ https://twitter.com/rafadesign
├─ https://www.behance.net/rafadesign
└─ https://substack.com/@rafadesign

Rules:
├─ Full URL (include https://)
├─ Verified working link
├─ Public profile (not private)
└─ Test before publishing
```

---

#### Label Override (optional)

```
Custom display name for the link.
If empty, platform name is used.

Examples without override:
├─ Platform: instagram → Shows as "Instagram"
├─ Platform: linkedin → Shows as "LinkedIn"
└─ Platform: youtube → Shows as "YouTube"

Examples with override:
├─ Platform: newsletter, Label: "Subscribe to Journal"
│  → Shows as "Subscribe to Journal" instead of "Newsletter"
├─ Platform: behance, Label: "Portfolio"
│  → Shows as "Portfolio" instead of "Behance"
└─ Platform: website, Label: "Personal Work"
│  → Shows as "Personal Work" instead of "Website"
```

**Tips:**

- Leave empty for standard platforms (Instagram, LinkedIn, Twitter, YouTube)
- Use override for custom meaning or context
- Keep label short (under 30 characters)
- Professional and clear

---

### Complete Social Links Example

```
Social Link 1:
├─ Platform: instagram
├─ URL: https://instagram.com/rafadesign
└─ Label: (empty → shows "Instagram")

Social Link 2:
├─ Platform: linkedin
├─ URL: https://www.linkedin.com/company/rafa-design
└─ Label: (empty → shows "LinkedIn")

Social Link 3:
├─ Platform: youtube
├─ URL: https://www.youtube.com/@rafadesign
└─ Label: (empty → shows "YouTube")

Social Link 4:
├─ Platform: newsletter
├─ URL: https://substack.com/@rafadesign
└─ Label: "Subscribe to Journal"
   (Shows custom label instead of "Newsletter")

Social Link 5:
├─ Platform: behance
├─ URL: https://www.behance.net/rafadesign
└─ Label: (empty → shows "Behance")
```

**Number of social links:**

- Typical: 3-5 platforms
- Only include active profiles
- Prioritize professional (LinkedIn, YouTube)
- Include creative (Instagram, Behance if relevant)
- Avoid abandoned accounts

**Real Example:**

```
Social Links:
├─ Instagram: https://instagram.com/rafadesign
├─ LinkedIn: https://www.linkedin.com/company/rafa-design
├─ YouTube: https://www.youtube.com/@rafadesign
└─ Newsletter: https://substack.com/@rafadesign (Label: "Journal")
```

---

# 04 // EDITORIAL

### What This Tab Does

Manages the **closing image** for the contact page.

---

## Field: Editorial Image

**Field Name:** `editorialImage` (Optional, image)

**What to enter:**

```
Closing/final image on contact page.
Displayed after all contact information.
Sets mood and visual closure.
```

**What makes a good editorial image:**

```
✅ GOOD:
├─ Beautiful, inspiring studio/project photo
├─ Represents your design philosophy
├─ High quality professional photography
├─ Creates emotional closure to page
├─ Cinematic or powerful composition
└─ Consistent with site aesthetic

❌ AVOID:
├─ Generic or stock-looking
├─ Low resolution or blurry
├─ Doesn't fit brand aesthetic
└─ Too busy or distracting
```

**Examples:**

```
Good editorial images:
├─ Beautiful exterior of signature project
├─ Studio atelier shot showing craft/culture
├─ Detail of materials or construction
├─ Landscape/site integration photo
├─ Abstract architectural detail
└─ Light/shadow study in interior
```

**Sub-fields:**

### Image File

```
Upload the photograph.

Recommended:
├─ High resolution (2000px+ wide)
├─ Professional photography
├─ Portrait or landscape orientation
└─ Optimized but crisp quality
```

### Alt Text (accessibility)

```
Description for screen readers.

Example:
"Architectural detail of stone and timber construction"
```

### Caption (optional)

```
Text displayed under image.

Example:
"Where we work"
or
(Can be left empty)
```

---

### Complete Editorial Image Example

```
Editorial Image:
├─ File: contact-closing-image.jpg (2400x1600px)
├─ Alt Text: "RAFA Design studio detail showing material
│            quality and light"
└─ Caption: (empty or optional label)
```

---

# WORKFLOW: SETTING UP CONTACT PAGE

**Step-by-step example:**

```
1. Go to /admin → "07 // Contact 📞"
2. Find "Contact Information" document (singleton)
3. Click to edit

FILL 01 // CONTACT DETAILS:
4. Primary Email: contact@rafadesign.pt
5. Primary Phone: +351 223 456 789
6. Primary Address: Rua da Ferreira 45, 4050-123 Porto, Portugal
7. Coordinates: 41.1579° N, 8.6291° W
8. Project Types:
   ├─ Architecture
   ├─ Interior Design
   ├─ Landscape Design
   ├─ Urban Design
   ├─ Renovation
   ├─ Master Planning
   └─ Consulting

FILL 02 // OFFICES:
9. Office 1 (Primary):
   ├─ Name: RAFA Design Porto
   ├─ City: Porto
   ├─ Country: Portugal
   ├─ Address: [full address]
   ├─ Coordinates: [coordinates]
   ├─ Hours: Mon-Fri, 9am-6pm
   ├─ Phone: [phone]
   ├─ Maps URL: [Google Maps link]
   └─ Image: [office photo]

10. Office 2 (if applicable):
    ├─ Name: RAFA Design [City]
    ├─ City: [city]
    ├─ [all other fields]
    └─ Image: [office photo]

FILL 03 // SOCIAL:
11. Social Link 1:
    ├─ Platform: instagram
    ├─ URL: https://instagram.com/rafadesign
    └─ Label: (empty)

12. Social Link 2:
    ├─ Platform: linkedin
    ├─ URL: https://www.linkedin.com/company/rafa-design
    └─ Label: (empty)

13. Social Link 3:
    ├─ Platform: youtube
    ├─ URL: https://www.youtube.com/@rafadesign
    └─ Label: (empty)

14. [Add more social links as needed]

FILL 04 // EDITORIAL:
15. Editorial Image: [upload closing photo]
    ├─ Alt Text: [accessibility description]
    └─ Caption: (optional)

16. [Publish]
```

---

# QUICK REFERENCE: WHAT'S REQUIRED

```
REQUIRED (must fill):
✅ Primary Email
✅ At least one Office (name + city recommended)

HIGHLY RECOMMENDED:
⭐ Primary Phone
⭐ Primary Address
⭐ Coordinates (for map display)
⭐ Office Image (primary office)
⭐ Social Links (3-5 platforms)
⭐ Editorial Image (closing visual)

OPTIONAL (nice to have):
⚪ Project Types (helps qualify inquiries)
⚪ Opening Hours (office availability)
⚪ Maps URL (link to location)
⚪ Multiple Offices (satellites)
```

---

# BEST PRACTICES

**Contact details:**

- ✅ Email is critical—monitor it actively
- ✅ Phone should be current
- ✅ Address should match primary office
- ✅ Verify coordinates are accurate (affects map display)

**Offices:**

- ✅ List primary office first
- ✅ Include office image if possible
- ✅ Keep hours current
- ✅ Clarify if by appointment only
- ✅ Verify Maps URLs work

**Social media:**

- ✅ Only include active, current profiles
- ✅ Prioritize professional platforms (LinkedIn, YouTube)
- ✅ Include creative platforms (Instagram, Behance)
- ✅ Use label overrides for custom meaning
- ✅ Test links before publishing

**Editorial image:**

- ✅ Professional photography
- ✅ Represents your brand
- ✅ Creates emotional closure to page
- ✅ Consistent with overall aesthetic
- ✅ High resolution

**Project types:**

- ✅ Match actual service offerings
- ✅ Helps pre-qualify inquiries
- ✅ Should be 4-8 types
- ✅ Update if services change

---

# SPECIAL CASES

### Case 1: Multiple Offices

```
If you have Porto + Berlin offices:

Offices array:
├─ Office 1: Porto (primary)
├─ Office 2: Berlin (satellite)

First office displayed most prominently.
All offices appear on contact page.
Coordinates used for map display.
```

### Case 2: By Appointment Only

```
If studio is by appointment:

Opening Hours: "By appointment"
Contact: "Studio visits by appointment only"
Phone: [contact number]
Email: [to request appointment]

Clear communication prevents unexpected walk-ins.
```

### Case 3: Remote / Distributed Team

```
If team is distributed:

Primary Address: Can be registered office address
                or "Remote – Globally distributed"
Offices: List main coordination point + satellites
Coordinates: Still useful for regional context
Phone: For scheduling/inquiries
Email: Primary communication channel
```

---

## DONE ✅

All Contact schema fields explained with real examples.

**Coverage:**

- Primary Email, Phone, Address, Coordinates (01 // Contact Details)
- Offices array with all office fields (02 // Offices)
- Social Links with platform, URL, label override (03 // Social)
- Editorial closing image (04 // Editorial)
- Complete setup workflow
- Best practices
- Special cases

**Next schema (final):** Site Settings (identity, organization, SEO, operational)

Ready to continue?
