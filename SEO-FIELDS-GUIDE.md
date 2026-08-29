# SEO Fields Guide

## What is SEO?

**SEO** = Search Engine Optimization

These fields control how your project appears when:

- Someone searches on Google
- Someone shares the link on social media (Facebook, Twitter, LinkedIn)
- The link is previewed in messaging apps (WhatsApp, Slack)

---

## SEO Fields in Sanity

The SEO section in Sanity has **3 fields** (all optional):

### 1. Meta Title

### 2. Meta Description

### 3. Social Share Image

---

## Field 1: Meta Title

### What it is:

The title that appears in Google search results and browser tabs.

### Character Limit:

**50-60 characters** (Google cuts off longer titles)

### Format:

`[Project Name] | [Key Feature] | RAFA Design`

### Examples:

**Good Examples:**

```
Casa Monte | Hillside Residence | RAFA Design
Atelier Norte | Coastal Architecture Studio | RAFA
Villa Marim | Modernist Renovation | RAFA Design
Baia House | Oceanfront Retreat | RAFA Design
```

**Default (if left empty):**

```
Casa Monte
```

Just uses the project title.

### Best Practice:

- Keep under 60 characters
- Include project name
- Add descriptive keyword
- End with studio name

### SEO Impact:

✅ Shows in Google search results  
✅ Shows in browser tab  
✅ Shows when bookmarked

---

## Field 2: Meta Description

### What it is:

The preview text that appears under the title in Google search results.

### Character Limit:

**150-160 characters** (Google cuts off longer descriptions)

### Purpose:

Convince people to click your link in search results.

### Format:

Brief, compelling summary focusing on key features and location.

### Examples:

**Casa Monte:**

```
A private hillside residence in Algarve, Portugal. The design follows
the natural contour, opening to afternoon light through carefully
positioned apertures. Completed 2025.
```

(158 characters)

**Atelier Norte:**

```
Architecture studio in Porto featuring board-formed concrete, natural
light strategy, and material-forward design. Coastal modernism meets
Portuguese craft tradition.
```

(159 characters)

**Villa Marim:**

```
Modernist villa renovation in Cascais integrating original 1960s
structure with contemporary interventions. Adaptive reuse project
celebrating architectural heritage.
```

(156 characters)

**Baia House:**

```
Oceanfront residence responding to dramatic coastal site through
strategic apertures and material restraint. Architecture as mediation
between interior and Atlantic.
```

(160 characters)

### Writing Tips:

- Start with what makes it unique
- Include location
- Mention key design features
- Add year if recent/notable
- Use architectural language (not marketing speak)
- End with period (complete sentence)

### Default (if left empty):

Uses the **Description** field you already filled:

```
A private residence that negotiates a steep hillside site,
opening the interior to the landscape through carefully
positioned apertures.
```

### SEO Impact:

✅ Shows in Google search results (under title)  
✅ Affects click-through rate  
✅ Helps Google understand page content

---

## Field 3: Social Share Image (OG Image)

### What it is:

The image that appears when someone shares your project link on social media.

### Technical Name:

**"Open Graph Image"** or **"OG Image"**

### Where it appears:

- Facebook posts
- Twitter/X cards
- LinkedIn shares
- WhatsApp link previews
- Slack link previews
- Discord embeds

### Image Specifications:

**Dimensions:**

- Recommended: **1200 × 630 pixels** (Facebook/Twitter standard)
- Minimum: 600 × 315 pixels
- Aspect Ratio: 1.91:1 (landscape)

**File Format:**

- JPG or PNG
- Max size: 8 MB (but keep under 1 MB for fast loading)

**Content:**
Should show the most compelling view of the project.

### What to use:

**Option 1: Hero Image (Default)**
If you leave this empty, the system uses the project's hero image automatically.

**Option 2: Custom Social Image**
Upload a specific image optimized for social sharing.

### Custom Social Image Guidelines:

**Good choices:**

- Dramatic exterior view
- Signature architectural moment
- Wide-angle showing context
- Twilight/dusk photography (high engagement)

**Avoid:**

- Dark/underexposed images
- Busy/cluttered compositions
- Images with small text (won't be readable)
- Extreme close-ups (needs context)

**Pro tip:** Add subtle text overlay in image editor:

```
CASA MONTE
Algarve, Portugal · 2025
```

### Example Social Share Preview:

```
┌────────────────────────────────────────┐
│ [Large Project Image - 1200x630px]    │
│                                        │
│ Casa Monte | Hillside Residence       │
│                                        │
│ A private hillside residence in        │
│ Algarve, Portugal. The design follows │
│ the natural contour, opening to...    │
│                                        │
│ 🔗 rafa.design/projects/casa-monte    │
└────────────────────────────────────────┘
```

### Default (if left empty):

Uses the project **Hero Image** automatically.

### SEO Impact:

✅ Increases click-through rate on social media  
✅ Makes shares more visually compelling  
✅ Helps content stand out in feeds

---

## Complete Example: Casa Monte

### In Sanity Studio SEO Section:

```
┌─ SEO (click to expand) ─────────────────┐
│                                          │
│ Meta Title:                              │
│ Casa Monte | Hillside Residence | RAFA  │
│                                          │
│ Meta Description:                        │
│ A private hillside residence in Algarve, │
│ Portugal. The design follows the natural │
│ contour, opening to afternoon light      │
│ through carefully positioned apertures.  │
│ Completed 2025.                          │
│                                          │
│ Social Share Image:                      │
│ [Upload custom image] or [Leave empty]  │
│                                          │
└──────────────────────────────────────────┘
```

---

## When to Fill SEO Fields

### Fill SEO Fields When:

- ✅ Project is **featured/flagship** work
- ✅ Project has **awards** or recognition
- ✅ You want to **rank for specific keywords**
- ✅ Project is **recently completed** (fresh content)
- ✅ You're **actively promoting** the project

### Skip SEO Fields When:

- ⭕ Project is older/archived
- ⭕ Internal/concept work
- ⭕ You're okay with default title/description
- ⭕ Time is limited (not critical)

---

## SEO Best Practices

### Meta Title:

1. **Unique** - Different for every project
2. **Descriptive** - What is it?
3. **Concise** - Under 60 characters
4. **Branded** - Include "RAFA" or "RAFA Design"

### Meta Description:

1. **Compelling** - Make people want to click
2. **Accurate** - Matches page content
3. **Complete** - Full sentence with period
4. **Keywords** - Include natural search terms (hillside, residence, Algarve)

### Social Share Image:

1. **High quality** - Sharp, well-composed
2. **Optimized** - 1200×630px, under 500 KB
3. **Compelling** - Best view of project
4. **Readable** - Works at thumbnail size

---

## Common Questions

### Q: What if I leave SEO fields empty?

**A:** The system uses smart defaults:

- **Title:** Project title (e.g., "Casa Monte")
- **Description:** Your project description field
- **Image:** Your hero image

### Q: Should I fill SEO for every project?

**A:** No. Focus on:

- Featured projects
- Recent work
- Award-winning projects
- Projects you want to promote

### Q: Can I use the same description for SEO and Description field?

**A:** They serve different purposes:

- **Description field:** For project cards/listings (shorter)
- **Meta Description:** For Google search results (can be similar but optimized for search)

### Q: How do I know if my SEO is working?

**A:** Test:

1. Share link on social media → See preview
2. Google "site:yourdomain.com casa monte" → See how it appears
3. Use tools: Facebook Sharing Debugger, Twitter Card Validator

### Q: What happens if Meta Title is too long?

**A:** Google cuts it off with "..." - looks unprofessional. Keep under 60 characters.

### Q: Should I stuff keywords?

**A:** No. Write naturally. Google is smart and penalizes keyword stuffing.

---

## Character Counters

### Meta Title Character Count:

```
Casa Monte | Hillside Residence | RAFA Design
↑                                           ↑
1                                          48 ✅ Good (under 60)
```

### Meta Description Character Count:

```
A private hillside residence in Algarve, Portugal. The design follows
the natural contour, opening to afternoon light through carefully
positioned apertures. Completed 2025.
↑                                                                    ↑
1                                                                  158 ✅ Good (under 160)
```

---

## Quick Reference

| Field                  | Required? | Length        | Purpose               |
| ---------------------- | --------- | ------------- | --------------------- |
| **Meta Title**         | Optional  | 50-60 chars   | Google search results |
| **Meta Description**   | Optional  | 150-160 chars | Google preview text   |
| **Social Share Image** | Optional  | 1200×630px    | Social media preview  |

**Recommendation:** Fill SEO fields for your top 5-10 projects, use defaults for the rest.

---

## Where SEO Shows

### Google Search Results:

```
Casa Monte | Hillside Residence | RAFA Design  ← Meta Title
https://rafa.design/projects/casa-monte
A private hillside residence in Algarve,       ← Meta Description
Portugal. The design follows the natural
contour, opening to afternoon light...
```

### Facebook/LinkedIn Share:

```
┌──────────────────────────────────────┐
│ [Social Share Image]                 │  ← OG Image
│                                      │
│ Casa Monte | Hillside Residence     │  ← Meta Title
│ A private hillside residence in      │  ← Meta Description
│ Algarve, Portugal...                 │
│                                      │
│ RAFA.DESIGN                          │
└──────────────────────────────────────┘
```

### Browser Tab:

```
[Favicon] Casa Monte | Hillside Residence | RAFA Design  ← Meta Title
```

---

## Summary

**SEO fields are optional but powerful.** They control how your projects appear in search engines and social media. Fill them for important projects, use defaults for others. Focus on clear, compelling, concise content that accurately describes the architectural work.
