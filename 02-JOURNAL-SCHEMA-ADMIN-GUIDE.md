# Journal Schema — Complete Admin Guide

**For:** Editorial staff, writers, designers, and content managers  
**Purpose:** Know exactly how to write and structure articles in Sanity  
**Location:** `/admin → "02 // Journal 📰"`

---

## Overview

The Journal is where RAFA publishes **editorial content**: essays, case studies, material studies, interviews, field notes, and thinking pieces.

Think of it as a **design monograph** where you tell stories about architecture, design, thinking, and process.

**Total Tabs:** 5 sections  
**Content Types:** Essays, project stories, material studies, interviews, field notes, news  
**Estimated time:** 30-45 minutes for a complete article  
**Difficulty:** Medium (requires good writing and editorial thinking)

---

## Tab-by-Tab Breakdown

---

# 01 // CONTENT

### What This Tab Does

The **editorial heart** of the article. This is where you write and add media.

---

## Field 1: Title

**Field Name:** `title` (Required)

**What to enter:**

```
The headline of the article.
Main title shown on journal page.
Also shown in browser tabs and search results.
```

**Examples:**

```
✅ GOOD:
├─ "The Language of Light in Contemporary Interiors"
├─ "Material Stories: Understanding Local Geology"
├─ "Coastal Modernism: A Dialogue with Place"
├─ "Casa Monte: Five Years After Completion"
├─ "On the Craft of Adaptive Reuse"
└─ "Field Notes from the Atelier"

❌ AVOID:
├─ "Article 1" (too generic)
├─ "Some Thoughts" (vague)
├─ "RAFA Design Essay" (not descriptive)
└─ "Title" (placeholder)
```

**Tips:**

- Keep under 120 characters
- Descriptive and intriguing
- Gives reader clear sense of content
- Avoid all-caps unless intentional

**Real Example:**

```
Title: "The Language of Light in Contemporary Interiors"
(Appears as main headline on journal page)
```

---

## Field 2: Slug

**Field Name:** `slug` (Required, auto-filled)

**What it is:**

```
URL-friendly version of the title.
Used in the website URL.
Automatically generated, can be edited.
```

**How it appears:**

```
Title: The Language of Light in Contemporary Interiors
Slug: the-language-of-light-in-contemporary-interiors

Website URL: /journal/the-language-of-light-in-contemporary-interiors
```

**Rules:**

- Lowercase only
- Hyphens between words
- No special characters
- Unique (no duplicates)

**Tip:**
System auto-generates this. Edit only if needed for clarity or SEO.

---

## Field 3: Subtitle

**Field Name:** `subtitle` (Optional)

**What to enter:**

```
Secondary headline or tagline.
Appears below main title in listing cards.
Gives additional context.
```

**Examples:**

```
✅ GOOD:
├─ "Exploring how daylight transforms design"
├─ "Why material honesty matters"
├─ "Lessons from five years of occupation"
└─ "A conversation with our design team"

❌ AVOID:
├─ Just repeating the title
├─ Too long (defeats purpose)
└─ Generic phrases
```

**Tips:**

- Keep under 200 characters
- Complements title, doesn't repeat it
- Optional but recommended

**Real Example:**

```
Title: "The Language of Light in Contemporary Interiors"
Subtitle: "Exploring how strategic fenestration transforms spatial experience"
```

---

## Field 4: Excerpt

**Field Name:** `excerpt` (Required, text)

**What to enter:**

```
Brief summary of the article.
Appears on listing cards.
Used in search results and social media.
First impression of what article is about.
```

**Examples:**

```
✅ GOOD:
├─ "An exploration of how light becomes a design
   material in interior spaces. This essay examines
   the Casa Monte project and the strategic use of
   fenestration to shape spatial experience and
   emotional response."

├─ "Material selection is rarely decorative in RAFA's
   practice. This field study documents how local stone,
   timber, and concrete were chosen for Casa Monte based
   on geological context, durability, and cultural
   meaning."

└─ "A conversation with our design team about the five-
   year occupation of Casa Monte. How have residents
   adapted the spaces? What did we learn about the
   relationship between design and lived experience?"

❌ AVOID:
├─ Too long (more than 300 characters)
├─ Too short (less than 50 characters)
├─ Vague or generic
└─ Doesn't summarize article
```

**Length:**

- 50-300 characters
- 1-3 sentences
- Clear hook about topic

**Tips:**

- Make it compelling (readers see this first)
- Summarize main idea
- Include article's central question or argument

**Real Example:**

```
Excerpt: "An exploration of how light becomes a design
material in interior spaces. This essay examines Casa
Monte and the strategic use of fenestration to shape
spatial experience."
```

---

## Field 5: Article Body (Content)

**Field Name:** `content` (Required, array)

**What this is:**

```
The actual article content.
Rich text editor with multiple content types.
Mix text, images, galleries, videos, quotes, and more.
This is where the editorial magic happens.
```

### Content Blocks Available

You can add different types of blocks:

#### 1. **Text / Paragraph Blocks**

Formatting options:

```
Styles (heading levels):
├─ Normal (body text)
├─ H2 (section heading)
├─ H3 (subsection heading)
└─ Quote / Blockquote (indented quotes)

Text Formatting:
├─ Strong (bold)
├─ Emphasis (italic)
└─ Links (hyperlinks)
```

**When to use:**

```
Normal: Main body text of article
H2: Section breaks ("02 // Material Response")
H3: Subsection headings
Quote: Pull quotes from other sources (indented)
```

**Example Structure:**

```
[H2] The Language of Light

[Normal] Light is not simply illumination in architecture.
It is material presence. It defines how we experience
space, how we understand scale, how we feel emotion.

[Normal] At Casa Monte, the design process began with
a study of light patterns. How does sunlight move through
the site across seasons? Where is shadow deepest? What
angles create drama, and what creates intimacy?

[H3] The Morning Sequence

[Normal] The kitchen faces east. Morning light floods
across the workspace, warming stone counters and creating
a sense of invitation for the day ahead...

[Blockquote] "Light is the only material that can sculpt
form and define emotion simultaneously." — Our design
philosophy
```

---

#### 2. **Images**

Single images embedded in text flow.

**Fields:**

```
├─ Image file (required)
├─ Alt text (required for accessibility)
├─ Caption (optional, appears below)
├─ Credit (optional, photographer/source)
└─ Layout (how wide to show):
   ├─ Contained (inside text width)
   ├─ Wide (wider than text)
   └─ Full Bleed (edge-to-edge cinematic)
```

**When to use:**

```
✅ Single images scattered through text
✅ One image per concept or moment
✅ Detail shots, material close-ups
✅ Architectural elements
```

**Real Example:**

```
[Text] The concrete foundation...

[Image]
├─ File: casa-monte-concrete-detail.jpg
├─ Alt: "Close-up of poured concrete foundation with
│       recessed timber frame detail"
├─ Caption: "Foundation detail showing material honesty"
├─ Credit: "Photography by João Silva"
└─ Layout: Contained

[Text] This detail reveals...
```

---

#### 3. **Gallery**

Multiple images displayed together in grid.

**Fields:**

```
├─ Images array (2+ required)
│  └─ Each image has: file, alt text, caption
└─ Columns (2, 3, or 4 layout)
```

**When to use:**

```
✅ Series of related images
✅ Before/after comparisons
✅ Material palette display
✅ Process documentation
✅ Site context views
```

**Real Example:**

```
[Gallery]
├─ Layout: 3 columns
├─ Image 1: Casa Monte exterior (alt text + caption)
├─ Image 2: Living room detail
├─ Image 3: Bedroom from hallway
├─ Image 4: Kitchen island
├─ Image 5: Material samples
└─ Image 6: Landscape context

(Displays as 3-column grid on website)
```

---

#### 4. **Pull Quote**

Large, highlighted quote block.

**Fields:**

```
├─ Content (the quote text)
└─ Author (optional attribution)
```

**When to use:**

```
✅ Key quote from the article
✅ Interview highlights
✅ Powerful statement
✅ Reader takeaway
✅ Design philosophy
```

**Real Example:**

```
[Pull Quote]
├─ Content: "Material selection is never decoration.
│            It is a dialogue with place, time, and
│            the hands that will touch the surface."
└─ Author: "Maria Santos, Project Lead"

(Displays large with borders/styling)
```

---

#### 5. **Video**

Embedded video in article.

**Fields:**

```
Option A: Upload directly to Sanity
├─ Video file (.mp4, .webm)
└─ Recommended for loops, short clips

Option B: Link to external video
├─ YouTube URL
├─ Vimeo URL
└─ Other video platform

Then add:
├─ Caption (describes video)
└─ Credit (filmmaker/cinematographer)
```

**When to use:**

```
✅ Construction timelapse
✅ Space walkthrough video
✅ Material application demo
✅ Interview or panel discussion
✅ Site documentation
```

**Real Example:**

```
[Video]
├─ URL: https://vimeo.com/casa-monte-detail
├─ Caption: "Material detail closeup - light and shadow"
└─ Credit: "Cinematography by João Silva"

(Displays embedded with play button)
```

---

#### 6. **Project Reference**

Link to a project in your portfolio.

**What it is:**

```
A card showing one of your projects.
Connects editorial thinking to built work.
Shows project teaser with image, title, year.
Clicakable to full project page.
```

**When to use:**

```
✅ Illustrating a concept with real project
✅ Showing "this article explains Casa Monte"
✅ Cross-referencing related portfolio work
✅ Demonstrating design approach
```

**Real Example:**

```
[Project Reference]
└─ Links to: Casa Monte project

(Displays as card showing Casa Monte image, title,
year, and clickable link to /projects/casa-monte)
```

---

#### 7. **Divider**

Visual break between sections.

**Options:**

```
├─ Line (thin horizontal line)
├─ Space (just spacing)
└─ Ruled (decorative ruled line)
```

**When to use:**

```
✅ Between major sections
✅ Before/after important shift
✅ Visual rhythm and pacing
```

**Real Example:**

```
[Text] ...the final thoughts on material.

[Divider] - style: Ruled

[H2] Epilogue: Five Years Later
```

---

### Building a Complete Article

**Example: "The Language of Light in Contemporary Interiors"**

```
[H2] The Language of Light

[Normal] Light is not simply illumination. It is
material presence. It shapes spatial experience and
emotional response. In this essay, we explore how
strategic fenestration becomes a design tool...

[Image]
├─ Casa Monte exterior in morning light
├─ Alt: "Contemporary home on hillside, eastern facade
│       flooded with morning sun"
├─ Caption: "Arrival sequence: morning light anchors
│           the approach"
└─ Layout: Full Bleed

[H3] The Design Process

[Normal] Before drawing a single line, we studied the
site. Where does sunlight move? How does shadow fall?
What angles create drama?

[Gallery - 2 columns]
├─ Image 1: Site context in morning
├─ Image 2: Site context in afternoon
├─ Image 3: Site context at sunset
└─ Image 4: Site plan with sun angles marked

[H3] The Kitchen

[Normal] The kitchen faces east...

[Image - Kitchen detail]

[Pull Quote]
├─ "Light becomes the primary material shaping the
   kitchen experience"
└─ Author: Design notes

[H3] Living Space Transformation

[Video - Space walkthrough]

[H3] Material Response

[Normal] Light doesn't just illuminate the space,
it reveals materials...

[Gallery - 3 columns]
├─ Material 1: Stone texture in morning
├─ Material 2: Stone texture in afternoon
├─ Material 3: Timber grain in evening
├─ Material 4: Concrete and light
├─ Material 5: Glass and reflection
└─ Material 6: Material junction detail

[Project Reference] - Casa Monte

[Normal] Five years after completion, residents
continue to discover new qualities of light as
seasons change...

[Divider]

[H2] Conclusion

[Normal] The essay concludes with reflections on...
```

---

## Field 6: Keywords

**Field Name:** `keywords` (Optional, tags)

**What to enter:**

```
Search-friendly keywords for the article.
Helps people find article via search.
Used for SEO and site search.
```

**Examples:**

```
✅ GOOD keywords:
├─ light-design
├─ interior-architecture
├─ material-honesty
├─ fenestration
├─ spatial-experience
└─ case-study
```

**Tips:**

- lowercase-with-hyphens format
- 3-7 keywords typical
- Reflect actual article topics
- Think about search terms

---

# 02 // METADATA

### What This Tab Does

Categorizes and **organizes** the article. Affects how it appears on the journal index and filters.

---

## Field 1: Article Type

**Field Name:** `type` (Required, select one)

**What to enter:**

```
What kind of article is this?
Determines editorial layout on website.
Different types get different styling/presentation.
```

**Available Types:**

```
✅ Essay (Long-form Monograph)
   └─ Long-form thinking piece, exploration
      Example: "The Language of Light"

✅ Project Story (Case Study)
   └─ Deep dive into one specific project
      Example: "Casa Monte: Five Years Later"

✅ Material Study (Tectonics & Craft)
   └─ Focused exploration of materials, details
      Example: "Material Stories: Local Stone"

✅ Interview / Dialogue
   └─ Conversation format, Q&A
      Example: "In Conversation with Our Team"

✅ Field Notes (Site Research)
   └─ On-site observation and documentation
      Example: "Field Notes from Porto's Coast"

✅ Exhibition / Event
   └─ Coverage of show, talk, event
      Example: "Open House Porto 2024"

✅ Award / Recognition
   └─ Award announcement or recognition
      Example: "Casa Monte Wins International Prize"

✅ News & Studio
   └─ Studio updates, announcements
      Example: "New Team Members Join RAFA"

✅ General Article
   └─ Miscellaneous content
```

**How to choose:**

```
"Is this about a specific project?" → Project Story
"Is this exploring an idea/material/concept?" → Essay or Material Study
"Is this a conversation?" → Interview
"Did we just get an award?" → Award
"Are we announcing something?" → News & Studio
"Have we been on site documenting?" → Field Notes
```

**Real Example:**

```
Type: Essay (Long-form Monograph)
(This article is a philosophical exploration, not tied
to a specific project)
```

---

## Field 2: Category

**Field Name:** `category` (Required, select one)

**What to enter:**

```
Main topic/discipline of the article.
Used for filtering on journal index page.
Shows as category tabs on website.
```

**Available Categories:**

```
✅ Architecture
✅ Interior Design
✅ Landscape
✅ Urbanism & Planning
✅ Sustainability & Ecology
✅ Materiality & Craft
✅ Research & Theory
✅ Ideas & Essays
✅ Events & Exhibitions
✅ Awards & Honors
✅ Publications
✅ Studio & News
```

**How to choose:**

```
Primarily about buildings? → Architecture
Primarily about interior spaces? → Interior Design
Primarily about outdoor/garden design? → Landscape
About cities, planning, urban context? → Urbanism & Planning
About being eco-conscious? → Sustainability & Ecology
Focused on materials and craft? → Materiality & Craft
Academic or theoretical? → Research & Theory
Philosophical exploration? → Ideas & Essays
About an event/exhibition? → Events & Exhibitions
Announcing an award? → Awards & Honors
Reprint or publication news? → Publications
Studio announcement? → Studio & News
```

**Real Example:**

```
Category: Materiality & Craft
(This article is primarily about light and materials)
```

---

## Field 3: Featured Article

**Field Name:** `featured` (Optional, toggle)

**What to enter:**

```
Toggle ON to make this the featured article.
Featured article shows prominently:
  - Top of /journal page as hero
  - Top of /homepage in featured section
Shows only ONE featured article at a time.
```

**When to use:**

```
✅ Most important or recent article
✅ Want to highlight this piece
✅ Best article you've published
❌ Don't toggle multiple at once
```

**Real Example:**

```
Featured: ON
(This article is highlighted as featured on journal
and homepage)
```

---

## Field 4: Publication Date

**Field Name:** `publishedAt` (Required, date/time)

**What to enter:**

```
When was this article published?
Determines article order (newest first usually).
Shows on article page and listing cards.
```

**How to set:**

```
Click the date field
Select date and time
Or type: "2024-03-15 10:00 AM"
```

**Tips:**

- Set to actual publication date
- Past date = already published
- Future date = article publishes then
- Can schedule articles to publish later

**Real Example:**

```
Published At: March 15, 2024 at 10:00 AM
(Shows on article as "Published March 15, 2024")
```

---

## Field 5: Last Updated

**Field Name:** `updatedAt` (Optional, date/time)

**What to enter:**

```
When was the article last edited?
Shows if article has been revised.
Optional but recommended for major updates.
```

**When to fill:**

```
✅ After significant edits
✅ Corrections or additions
✅ To show "updated March 20, 2024"
⚪ Leave empty if never updated
```

**Real Example:**

```
Updated At: March 20, 2024 at 2:30 PM
(Shows as "Updated March 20, 2024" on page)
```

---

## Field 6: Author

**Field Name:** `author` (Optional, object)

**What to enter:**

```
Who wrote this article?
Shows byline on article page.
```

**What it contains:**

### Author Name (required)

```
Full name of author
Example: "Maria Santos"
```

### Author Role (optional)

```
Their role at RAFA
Example: "Senior Architect"
or "Design Director"
```

### Author URL (optional)

```
Link to their profile or website
Example: "https://mariastudio.com"
```

**Real Example:**

```
Author:
├─ Name: Maria Santos
├─ Role: Senior Architect
└─ URL: (can be empty)

(Shows as byline: "By Maria Santos, Senior Architect")
```

---

## Field 7: Reading Time

**Field Name:** `readingTime` (Optional, number)

**What to enter:**

```
Estimated time to read the article (in minutes).
Shows on article page as "5 min read".
Helps readers decide if they have time.
```

**How to calculate:**

```
Average reading speed: 200 words per minute
Article words ÷ 200 = approximate minutes

Example:
├─ 1000 words ÷ 200 = 5 minutes
├─ 2000 words ÷ 200 = 10 minutes
└─ 3000 words ÷ 200 = 15 minutes

Add 1-2 minutes if article has lots of images/videos
```

**Tips:**

- Can auto-calculate or set manually
- Helps reader gauge commitment
- More accurate if you include it

**Real Example:**

```
Reading Time: 8 minutes
(Shows on article as "8 min read")
```

---

# 03 // MEDIA

### What This Tab Does

Contains the **hero image** that represents the article.

---

## Field: Hero Image

**Field Name:** `hero` (Required, image)

**What to enter:**

```
Main cover image for the article.
First visual impression.
Shows on listing cards and article top.
Large, cinematic, editorial quality.
```

**What makes a good hero:**

```
✅ GOOD:
├─ Cinematic, beautifully composed
├─ High resolution (2000px+ wide)
├─ Clear editorial quality
├─ Captures article's essence
├─ Professional photography
└─ Landscape orientation (not portrait)

❌ AVOID:
├─ Small, low-res thumbnail
├─ Poor quality/blurry
├─ Snapshot-style casual photo
├─ Too dark or unclear
└─ Portrait orientation (gets cropped)
```

**Sub-fields:**

### Alt Text (required for accessibility)

```
Describe the image for screen readers.
What do you see in plain language.

Example:
"Contemporary interior space with morning light
streaming through large east-facing window,
warm stone surfaces, and refined timber details"
```

### Caption (optional)

```
Text appearing below the hero image.

Example:
"The eastern facade captures morning light,
defining the primary living experience"
```

### Credit (optional)

```
Photographer or source attribution.

Example:
"Photography by João Silva"
```

**Real Example:**

```
Hero Image:
├─ File: light-language-hero.jpg (2400x1600px)
├─ Alt Text: "Contemporary interior with morning
│            light and stone surfaces"
├─ Caption: "Morning light defines the interior experience"
└─ Credit: "Photography by João Silva"
```

---

# 04 // REFERENCES

### What This Tab Does

Links your article to **projects and other articles** for cross-navigation.

---

## Field 1: Related Projects

**Field Name:** `relatedProjects` (Optional, array)

**What to enter:**

```
Link to 1-3 projects shown at bottom of article.
Shows as project cards connecting thinking to built work.
Helps readers explore your portfolio.
```

**How to add:**

```
1. Click "+ Add"
2. Search for project by name
3. Click project to link it
4. Repeat for up to 3 projects
```

**When to use:**

```
✅ If article discusses/illustrates a project
✅ To show how thinking becomes built work
✅ To guide readers to complete case studies
❌ Don't force it; leave empty if no connection
```

**Real Example:**

```
Article: "The Language of Light"

Related Projects (at bottom):
├─ Casa Monte (main example in article)
├─ Villa Marim (similar light strategy)
└─ Atelier Norte (featured in gallery)

(Readers click to see full project pages)
```

---

## Field 2: Related Articles

**Field Name:** `relatedArticles` (Optional, array)

**What to enter:**

```
Link to 2-4 other journal articles.
Shows as carousel at bottom of article.
Guides readers to similar thinking.
```

**How to add:**

```
1. Click "+ Add"
2. Search for article by title
3. Click article to link it
4. Repeat for up to 4 articles
```

**When to use:**

```
✅ If other articles explore related themes
✅ To build thematic connections
✅ To keep readers engaged longer
❌ Leave empty if no strong connection
```

**Real Example:**

```
Article: "The Language of Light"

Related Articles (at bottom):
├─ "Material Stories: Understanding Local Stone"
├─ "Adaptive Reuse and Spatial Memory"
└─ "Field Notes from Portuguese Coast"

(Readers click to read more thinking)
```

---

# 05 // SEO

### What This Tab Does

Controls how the article appears in **Google Search** and **social media**.

---

## Field 1: Meta Title

**Field Name:** `seo.title` (Optional, text)

**What to enter:**

```
Title shown in Google search results.
Also shown when article is shared on social media.
If empty, uses article title as default.
```

**Examples:**

```
✅ GOOD:
├─ "The Language of Light in Contemporary Interiors | RAFA Design"
├─ "Material Stories: Understanding Local Geology"
└─ "Casa Monte Case Study — Contemporary Architecture"

❌ AVOID:
├─ Same as article title (redundant)
├─ Keyword stuffing (unreadable)
└─ Too long (gets cut off in search)
```

**Ideal length:**

- 50-60 characters
- Includes article title or main concept
- Optional: Include studio name

**Real Example:**

```
Meta Title: "The Language of Light in Contemporary Interiors | RAFA Design"
(Shown in Google results and social shares)
```

---

## Field 2: Meta Description

**Field Name:** `seo.description` (Optional, text)

**What to enter:**

```
Summary shown under title in Google search.
Also shown when article is shared on social.
If empty, uses excerpt as default.
```

**Examples:**

```
✅ GOOD:
├─ "An exploration of how strategic fenestration
   and light become design tools in interior
   architecture. How Casa Monte demonstrates
   material honesty and spatial experience."

├─ "Field documentation of coastal modernism.
   How contemporary architecture responds to
   Portuguese landscape, geology, and light
   conditions."

└─ "A conversation with RAFA's design team about
   five years of living in Casa Monte. What worked?
   What surprised us? How has the design evolved?"

❌ AVOID:
├─ Too short (insufficient information)
├─ Just repeating title
└─ Keyword stuffing
```

**Ideal length:**

- 155-160 characters
- 1-2 sentences
- Compelling hook

**Real Example:**

```
Meta Description: "An exploration of how strategic
fenestration becomes a design material. This essay
examines Casa Monte and light's role in shaping
spatial experience and emotional response."

(Shown in Google search results)
```

---

## Field 3: Keywords

**Field Name:** `seo.keywords` (Optional, array of tags)

**What to enter:**

```
Search terms people use to find this article.
Helps Google understand article topic.
Lowercase-with-hyphens format.
```

**Examples:**

```
✅ GOOD keywords:
├─ light-and-space
├─ interior-architecture
├─ material-design
├─ fenestration
├─ spatial-experience
└─ case-study

❌ AVOID:
├─ UPPERCASE
├─ Spaces (use hyphens)
└─ Non-descriptive terms
```

**Tips:**

- 5-10 keywords typical
- Match actual article topic
- Think like a reader searching
- Include long-tail keywords (phrases)

**Real Example:**

```
Keywords: ["light-design", "interior-architecture",
           "material-honesty", "fenestration",
           "case-study", "spatial-experience"]
```

---

## Field 4: Social Share Image

**Field Name:** `seo.ogImage` (Optional, image)

**What to enter:**

```
Image shown when article is shared on social media.
If empty, uses hero image as default.
Usually don't need to set this.
```

**Specifications:**

```
Optimal: 1200x630 pixels (16:9 ratio)
Format: JPG or PNG
Size: ≤ 1 MB
```

**When to set:**

```
✅ If you want different social image than hero
✅ If hero is too dark/unclear for social
⚪ Leave empty to use hero image (usually fine)
```

**Real Example:**

```
Social Share Image: (usually same as hero)
(When article shared on Twitter/LinkedIn,
this image appears with the link)
```

---

# ARTICLE TYPES: DETAILED EXAMPLES

## Example 1: Essay

```
Type: Essay (Long-form Monograph)
Category: Ideas & Essays
Featured: OFF
Title: "The Language of Light in Contemporary Interiors"
Subtitle: "Exploring how strategic fenestration shapes spatial experience"

Excerpt: "An exploration of how light becomes a design
material. This essay examines Casa Monte and how
strategic fenestration defines interior experience."

Content (Body):
├─ [H2] The Language of Light
├─ [Normal] Introductory paragraph...
├─ [Image] Casa Monte exterior
├─ [H3] The Design Process
├─ [Normal] Process description...
├─ [Gallery] 3 sun studies
├─ [H3] The Kitchen
├─ [Normal] Kitchen narrative...
├─ [Image] Kitchen detail
├─ [Pull Quote] Key insight
├─ [H3] Living Space Transformation
├─ [Video] Space walkthrough
├─ [H3] Material Response
├─ [Gallery] Material close-ups
├─ [Project Reference] Casa Monte
├─ [H2] Conclusion
└─ [Normal] Closing thoughts...

Author: Maria Santos (Senior Architect)
Reading Time: 12 minutes
Hero: Beautiful interior light photo

Related Projects: [Casa Monte]
Related Articles: [Material Stories: Local Stone,
                   Adaptive Reuse Concepts]

Keywords: light-design, interior-architecture,
          material-honesty, case-study
```

---

## Example 2: Project Story (Case Study)

```
Type: Project Story (Case Study)
Category: Architecture
Featured: OFF
Title: "Casa Monte: Five Years After"
Subtitle: "Lessons learned from five years of occupation"

Excerpt: "A deep dive into how Casa Monte has evolved
since completion. What worked? What surprised us?
How has living in the space changed our design thinking?"

Content (Body):
├─ [H2] Five Years In
├─ [Normal] Introduction about revisiting completed project...
├─ [Gallery] 4 project photos, then vs now
├─ [H3] The Learning Curve
├─ [Normal] What we learned...
├─ [Image] Before/After sequence
├─ [H3] How Occupants Use Space
├─ [Normal] User adaptation...
├─ [Video] Residents talking about living experience
├─ [Pull Quote] Quote from residents
├─ [H3] Material Performance
├─ [Normal] How materials aged...
├─ [Gallery] Close-up details
├─ [H3] Light Throughout Seasons
├─ [Normal] Seasonal light changes...
├─ [Project Reference] Casa Monte
└─ [H2] Takeaways for Future Design

Author: João Silva (Principal)
Reading Time: 8 minutes
Hero: Recent photo of Casa Monte, 2024

Related Projects: [Casa Monte]
Related Articles: [Material Stories, Coastal Modernism]
```

---

## Example 3: Material Study

```
Type: Material Study (Tectonics & Craft)
Category: Materiality & Craft
Featured: OFF
Title: "Material Stories: Understanding Local Geology"
Subtitle: "Why we chose regional stone for Casa Monte"

Excerpt: "A study of why material selection matters.
This essay explores how local stone connects a building
to its geological place."

Content (Body):
├─ [H2] Material as Place
├─ [Normal] Introduction...
├─ [Image] Quarry photograph
├─ [H3] The Geology of Place
├─ [Normal] Regional geology...
├─ [Gallery] 4 geological images
├─ [H3] Selection Criteria
├─ [Normal] How we chose this stone...
├─ [Gallery] 6 material samples
├─ [Pull Quote] Quote about material honesty
├─ [H3] Craftsmanship & Detail
├─ [Normal] How craftspeople work with this stone...
├─ [Image] Stone mason at work
├─ [Gallery] Construction details
├─ [H3] Aging & Patina
├─ [Normal] How stone weathers over time...
├─ [Video] Time-lapse of material aging
├─ [Project Reference] Casa Monte
└─ [H2] Conclusion: Material as Experience

Author: Maria Santos, with interviews from stone mason
Reading Time: 10 minutes
Hero: Beautiful close-up of the stone detail

Related Projects: [Casa Monte, Villa Marim]
Related Articles: [Materiality in Design, Craft Traditions]

Keywords: material-selection, local-materials,
          craftsmanship, stone-detail
```

---

## Example 4: Interview

```
Type: Interview / Dialogue
Category: Studio & News
Featured: OFF
Title: "In Conversation: Reflecting on Five Years"
Subtitle: "A dialogue with our design team"

Excerpt: "We sat down with our core team to discuss what
we've learned from completing Casa Monte, Villa Marim, and
recent projects. Reflections on design process, material
culture, and future directions."

Content (Body):
├─ [H2] In Conversation
├─ [Normal] Introduction: We gathered...
├─ [H3] On Design Process
├─ [Normal] Q: How has our process evolved?
├─ [Normal] A: In the beginning, we were...
├─ [Normal] Q: What surprised you most?
├─ [Normal] A: Definitely the speed at which materials age...
├─ [Pull Quote] "Material aging is not degradation;
│               it's conversation with time"
├─ [Image] Team in studio
├─ [H3] On Material Honesty
├─ [Normal] Q: Why is material honesty important?
├─ [Normal] A: Because every material tells a story...
├─ [Gallery] Material details from projects
├─ [H3] On The Future
├─ [Normal] Q: Where do you want to go next?
├─ [Normal] A: We're interested in exploring...
├─ [Video] Team discussing future directions
└─ [H2] Closing Thoughts

Author: Interview conducted by [Name]
Reading Time: 15 minutes
Hero: Portrait of team in studio

Related Projects: [Casa Monte, Villa Marim, Atelier Norte]
Related Articles: [Material Stories, The Learning Curve]
```

---

# WORKFLOW: PUBLISHING AN ARTICLE

**Step-by-step example: "The Language of Light"**

```
1. Go to /admin → "02 // Journal 📰"
2. Click [+ Create] button

FILL 01 // CONTENT:
3. Title: "The Language of Light in Contemporary Interiors"
4. Slug: the-language-of-light... (auto-generates)
5. Subtitle: "Exploring how strategic fenestration..."
6. Excerpt: "An exploration of how light becomes..."
7. Content Body:
   ├─ [H2] The Language of Light
   ├─ [Normal] Introductory text...
   ├─ [Image] Casa Monte exterior
   ├─ [H3] The Design Process
   ├─ [Normal] Process description...
   ├─ [Gallery] 3 sun studies
   ... (build complete article)

FILL 02 // METADATA:
8. Type: Essay (Long-form Monograph)
9. Category: Materiality & Craft
10. Featured: OFF (or ON if this is the main article)
11. Publication Date: March 15, 2024 at 10:00 AM
12. Author:
    ├─ Name: Maria Santos
    ├─ Role: Senior Architect
    └─ URL: (optional)
13. Reading Time: 12 minutes

FILL 03 // MEDIA:
14. Hero Image:
    ├─ File: light-hero.jpg
    ├─ Alt Text: "Contemporary interior with morning light"
    ├─ Caption: "Morning light in the living space"
    └─ Credit: "Photography by João Silva"

FILL 04 // REFERENCES:
15. Related Projects: [Casa Monte]
16. Related Articles: [Material Stories, Coastal Modernism]

FILL 05 // SEO:
17. Meta Title: "The Language of Light | RAFA Design"
18. Meta Description: "An exploration of how light
                       becomes a design material..."
19. Keywords: light-design, interior-architecture,
              material-honesty, fenestration

20. [Publish]
```

---

# QUICK REFERENCE: WHAT'S REQUIRED

```
REQUIRED (must fill):
✅ Title (01 // Content)
✅ Slug (auto-generated)
✅ Excerpt (summary)
✅ Content Body (article text + media)
✅ Article Type (essay, story, study, etc.)
✅ Category (architecture, interior, etc.)
✅ Publication Date
✅ Hero Image

HIGHLY RECOMMENDED:
⭐ Subtitle (gives context)
⭐ Author (byline)
⭐ Reading Time (helps readers)
⭐ Related Projects (cross-navigation)
⭐ Related Articles (engagement)

OPTIONAL (nice to have):
⚪ Featured toggle (highlight article)
⚪ Last Updated (if revised)
⚪ SEO fields (title, description, keywords)
```

---

# CONTENT BLOCK QUICK REFERENCE

```
What to Add Where:

Beginning of article:
├─ [H2] Main Section Heading
└─ [Normal] 2-3 paragraph introduction

Middle sections:
├─ [H3] Subsection Heading
├─ [Normal] Body text
├─ [Image] OR [Gallery] (visualize concept)
├─ [Video] (if applicable)
└─ [Pull Quote] (key insight)

Throughout:
├─ Repeat [H3], [Normal], [Image/Gallery], [Video]
├─ Add [Divider] between major sections
└─ Use [Project Reference] once (Casa Monte example)

End:
├─ [H2] Conclusion / Closing
├─ [Normal] Final thoughts
├─ [Divider]
├─ Related Projects carousel
└─ Related Articles carousel
```

---

## DONE ✅

All Journal schema fields explained with real examples.

**Ready for next schema?** (Services, Team, Studio, etc.)
