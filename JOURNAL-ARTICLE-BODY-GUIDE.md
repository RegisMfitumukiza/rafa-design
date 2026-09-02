# Journal Article Body Field — Complete Button & Feature Guide

## Overview

The **Article Body** field is a Portable Text array that supports rich editorial content. It's where all article content lives—from paragraphs to images to videos to pull quotes.

**Location in Sanity Studio:**

- Document: Journal Article
- Tab: 01 // Content
- Field: Article Body

---

## TOOLBAR BUTTONS — What They Do

When you click into the Article Body field, a toolbar appears with buttons. Here's what each one does:

```
┌──────────────────────────────────────────────────────────────┐
│ No style  # 📋 ≡ ≣  🔗  📷  Gallery  ...  📺  ⤢            │
│ ──────────────────────────────────────────────────────────────│
│                                                                │
│ [Your content area here]                                      │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

### Toolbar Buttons (Left to Right)

| #   | Icon       | Name            | What It Does                              | When to Use                    |
| --- | ---------- | --------------- | ----------------------------------------- | ------------------------------ |
| 1   | `No style` | Style Dropdown  | Choose block type (Normal, H2, H3, Quote) | Formatting paragraph text      |
| 2   | `#`        | Heading Marker  | Marks this block as H2 heading            | Section titles (auto-numbered) |
| 3   | `📋`       | Lists Toggle    | Toggle bullet/numbered list               | When you need points           |
| 4   | `≡`        | Bulleted List   | Create unordered list                     | - Point 1<br>- Point 2         |
| 5   | `≣`        | Numbered List   | Create ordered list                       | 1. First<br>2. Second          |
| 6   | `🔗`       | Link            | Add hyperlink to text                     | Linking to URLs or pages       |
| 7   | `📷`       | Image           | Insert single image                       | Standalone photos              |
| 8   | `Gallery`  | Gallery Block   | Insert image grid                         | Multiple images together       |
| 9   | `...`      | More Options    | Additional block types                    | Pull quotes, videos, dividers  |
| 10  | `📺`       | Video (in More) | Insert video                              | YouTube, Vimeo, direct video   |
| 11  | `⤢`        | Expand          | Full-screen editor                        | Better editing experience      |

---

## BUTTON DETAILS & WORKFLOWS

### 1. Style Dropdown (`No style`)

**Current setting:** Shows what style the current block is

**Available styles:**

- **Normal** — Regular paragraph text
- **H2** — Section heading (numbered: "01 // Context")
- **H3** — Subsection heading
- **Quote** — Blockquote (indented with left border)

**How to use:**

```
1. Click into a paragraph
2. Click "No style" dropdown
3. Select H2
4. Type: "01 // Context" (number will auto-parse in frontend)
```

**Result on website:**

```
────────────────────────────────────
01 // Section
Context
────────────────────────────────────
```

---

### 2. Heading Marker (#)

**Same as Style Dropdown for H2** but quick-toggle button

**Keyboard shortcut:** Likely `Ctrl+Alt+1` or similar

**What it does:**

- Converts paragraph to H2 heading
- Or removes heading if already H2

---

### 3. Lists - Bulleted (≡)

**Creates unordered list** with bullet points

**How to use:**

```
1. Type first item
2. Press Enter
3. Automatically creates new bullet
4. Keep typing
5. Press Backspace on empty line to end list
```

**Markdown equivalent:**

```
- First point
- Second point
- Third point
```

**On website:**

```
• First point
• Second point
• Third point
```

---

### 4. Lists - Numbered (≣)

**Creates ordered list** with numbers

**How to use:**

```
1. Type first item
2. Press Enter
3. Auto-generates "2."
4. Keep typing
5. Press Backspace on empty line to end
```

**Markdown equivalent:**

```
1. First step
2. Second step
3. Third step
```

**On website:**

```
1. First step
2. Second step
3. Third step
```

---

### 5. Link Button (🔗)

**Adds hyperlink to selected text**

**How to use:**

```
1. Highlight/select text
2. Click Link button
3. Paste URL: https://example.com
4. Click "Apply" or press Enter
5. Text now links to URL
```

**Supported URL schemes:**

- `http://` — Regular web link
- `https://` — Secure web link
- `mailto:` — Email link
- `tel:` — Phone link

**On website:**

```
Text appears underlined + colored
Hover shows URL tooltip
Click opens URL (external = new tab)
```

**Example URLs:**

```
https://www.rafa-design.com/projects/casa-monte
mailto:hello@rafa-design.com
tel:+351-912-345-678
```

---

### 6. Image Button (📷)

**Inserts single image** into the article

**How to use:**

```
1. Position cursor where you want image
2. Click Image button
3. Upload image or select from media library
4. Fill in required fields (see below)
5. Image appears in article
```

**Image block fields:**

| Field        | Type   | Required? | Purpose                                     |
| ------------ | ------ | --------- | ------------------------------------------- |
| **Alt Text** | String | ✅ YES    | Accessibility text (appears if image fails) |
| **Caption**  | String | Optional  | Text under image (e.g., "Casa Monte, 2025") |
| **Credit**   | String | Optional  | Photo credit (e.g., "Photo: João Silva")    |
| **Layout**   | Radio  | Pre-set   | How image displays                          |

**Layout options:**

| Layout         | Width     | Use Case                         |
| -------------- | --------- | -------------------------------- |
| **Contained**  | max-w-4xl | Default, text-width image        |
| **Wide**       | max-w-5xl | Wider than text, still contained |
| **Full Bleed** | 100vw     | Full screen width, no margin     |

**On website:**

```
[Image rendered at chosen width]
─────────────────────────────────
Caption text (if provided)
Photo: Photographer Name (if provided)
```

**Best practices:**

- Always provide Alt Text (required for accessibility)
- Use descriptive captions
- Credit photographers/sources
- Use "Contained" by default, "Full Bleed" for impact moments

---

### 7. Gallery Button

**Inserts grid of multiple images**

**How to use:**

```
1. Position cursor
2. Click Gallery button
3. Click "Add Images"
4. Select/upload multiple images (minimum 2)
5. Set alt text for each
6. Set number of columns (2, 3, or 4)
7. Gallery appears as responsive grid
```

**Gallery block fields:**

| Field       | Type   | Required?    | Purpose                   |
| ----------- | ------ | ------------ | ------------------------- |
| **Images**  | Array  | ✅ YES       | List of images (min 2)    |
| **Columns** | Number | Pre-set to 3 | Grid columns (2, 3, or 4) |

**For each image in gallery:**

- Alt Text (required for each)
- Caption (optional for each)

**Column behavior:**

- **2 columns:** `[Image][Image]` on desktop
- **3 columns:** `[Image][Image][Image]` on desktop
- **4 columns:** `[Image][Image][Image][Image]` on desktop

**Responsive:**

```
Desktop: 3 columns
Tablet:  2 columns
Mobile:  1 column (stacked)
```

**On website:**

```
┌─────────┬─────────┬─────────┐
│ Img 1   │ Img 2   │ Img 3   │
└─────────┴─────────┴─────────┘
Caption 1  Caption 2  Caption 3
```

**Best practices:**

- Use 3 columns for most cases
- Ensure consistent image aspect ratios
- Add captions for context
- Hover zoom effect on images

---

### 8. More Options Button (...)

**Reveals additional block types:**

When you click `...`, you see:

- Pull Quote
- Video
- Project Reference
- Divider

(These are covered below)

---

### 9. Video Block (from More menu)

**Inserts video player**

**Supported platforms:**

- YouTube
- Vimeo
- Direct video files (.mp4, .webm)

**How to use:**

```
1. Click "..." (More options)
2. Select "Video"
3. Paste video URL:
   - YouTube: https://youtube.com/watch?v=...
   - Vimeo: https://vimeo.com/...
   - Direct: https://example.com/video.mp4
4. Add optional Caption and Credit
5. Video player appears
```

**Video block fields:**

| Field         | Type   | Required? | Purpose                        |
| ------------- | ------ | --------- | ------------------------------ |
| **Video URL** | URL    | ✅ YES    | YouTube, Vimeo, or direct link |
| **Caption**   | String | Optional  | Text above video               |
| **Credit**    | String | Optional  | Video creator/source           |

**On website:**

```
Caption (if provided)
┌─────────────────────────────┐
│   [YouTube/Vimeo Player]    │
│   (Aspect ratio 16:9)       │
└─────────────────────────────┘
Credit (if provided)
```

**Best practices:**

- Use YouTube for public videos
- Use Vimeo for private/controlled videos
- Always test link before publishing
- Add captions for context

---

### 10. Pull Quote Block (from More menu)

**Large emphasis quote**

**How to use:**

```
1. Click "..." (More options)
2. Select "Pull Quote"
3. Enter Quote text
4. Enter Attribution (optional author/source)
5. Large styled quote appears
```

**Pull Quote block fields:**

| Field           | Type   | Required? | Purpose        |
| --------------- | ------ | --------- | -------------- |
| **Quote**       | Text   | ✅ YES    | The quote text |
| **Attribution** | String | Optional  | Who said it    |

**On website:**

```
┌─────────────────────────────┐
│  "This is a large quote"    │
│  that stands out from       │
│  regular paragraph text"    │
│  — Jane Architect           │
└─────────────────────────────┘
```

**Styling:**

- Large monumental typography (font-display)
- Left border accent
- Italic (not blockquote, but emphasized)
- 2-3x larger than body text

**Best practices:**

- Use for powerful statements
- Include attribution when possible
- Keep under 200 characters for readability
- Different from blockquote (which is plain quote)

---

### 11. Project Reference Block (from More menu)

**Inline link to a project**

**How to use:**

```
1. Click "..." (More options)
2. Select "Project Reference"
3. Click to select a Project from your portfolio
4. Card appears in article linking to project
```

**Project Reference block fields:**

| Field       | Type      | Required? | Purpose                  |
| ----------- | --------- | --------- | ------------------------ |
| **Project** | Reference | ✅ YES    | Link to Project document |

**On website:**

```
┌──────────────────────────────────┐
│ Spec // Project Reference        │
│                                  │
│ [Project Image] │ Project Title  │
│                 │ → (hover)      │
│                 │ Subtitle       │
│                 │ Location · Year│
└──────────────────────────────────┘
```

**Behavior:**

- Click card → opens `/projects/[slug]`
- Shows project hero image + basic info
- Hover: title moves right, arrow appears
- New tab on external projects

**Best practices:**

- Use in contextual mentions ("As we did in [project]")
- Don't overuse (1-2 per article max)
- Good for educational/comparison articles

---

### 12. Divider Block (from More menu)

**Visual separator between sections**

**How to use:**

```
1. Click "..." (More options)
2. Select "Divider"
3. Choose style (see below)
4. Divider appears
```

**Divider block fields:**

| Field     | Type  | Default | Purpose         |
| --------- | ----- | ------- | --------------- |
| **Style** | Radio | space   | Type of divider |

**Style options:**

| Style     | Visual                     | Use Case                  |
| --------- | -------------------------- | ------------------------- |
| **Line**  | Full-width horizontal line | Hard section break        |
| **Space** | Just vertical margin       | Soft pause/breathing room |
| **Ruled** | Small centered line        | Elegant scene break       |

**On website:**

```
Line style:
─────────────────────────────────

Space style:
(just whitespace)

Ruled style:
        ──────
```

**Best practices:**

- "Space" for most pauses
- "Line" for major section breaks
- "Ruled" for subtle, elegant separations
- Don't overuse dividers

---

## TEXT FORMATTING (Inline Marks)

These work **within** paragraph text:

| Name                | How to Use                  | Result             | Keyboard |
| ------------------- | --------------------------- | ------------------ | -------- |
| **Bold/Strong**     | Highlight + click B icon    | **Bold text**      | `Ctrl+B` |
| **Italic/Emphasis** | Highlight + click I icon    | _Italic text_      | `Ctrl+I` |
| **Link**            | Highlight + click Link icon | [Linked text](url) | `Ctrl+K` |

---

## COMPLETE ARTICLE BODY WORKFLOW

### Example: Writing a Full Article

```
1. START with H2 heading
   [Click Style → H2]
   [Type: "01 // Context"]

2. ADD body paragraphs
   [Type normally, paragraph creates automatically]

3. INSERT image for emphasis
   [Click Image button]
   [Upload photo of site]
   [Alt: "Casa Monte site, overlooking valley"]
   [Caption: "Site view from north"]
   [Credit: "Photo: João Silva"]
   [Layout: Wide]

4. ADD subsection heading
   [Click Style → H3]
   [Type: "Materials and finishes"]

5. CONTINUE with paragraphs
   [More text...]

6. EMPHASIZE quote
   [Click ... → Pull Quote]
   [Quote: "Light defines the interior"]
   [Attribution: "— Design Director"]

7. ADD gallery of details
   [Click Gallery]
   [Select 4 images of materials]
   [Set to 2 columns]
   [Add captions: "Concrete detail", "Oak timber"]

8. REFERENCE related project
   [Click ... → Project Reference]
   [Select: "Villa Marim"]
   [Card appears with project info]

9. BREAK between sections
   [Click ... → Divider]
   [Style: Ruled]

10. CONTINUE with final section
    [H2: "02 // Performance"]
    [Body text...]
    [Embed video of walkthrough]
    [Click ... → Video]
    [URL: YouTube link]
    [Caption: "Interior walkthrough"]
```

**Result on website:**

```
HEADER
──────────────────────────────────
01 // Context
[Body text]
[Site photograph (wide)]

[H3] Materials and finishes
[Body text]

"Light defines the interior"
— Design Director

[Gallery of 4 material photos, 2 cols]

Spec // Project Reference
[Villa Marim card]

         ──────

02 // Performance
[Body text]
[Video player]
```

---

## WHEN BUTTONS APPEAR/DISAPPEAR

### Always Available:

- Style dropdown
- Heading marker
- List buttons
- Link button
- Image button
- Gallery button
- More options (...)
- Expand button

### Conditional (appear when selected):

- **Bold/Italic:** Only when text is highlighted
- **Link:** Only when text is highlighted
- **Style dropdown:** Shows current style of current block

### Not clickable when:

- Block is empty (buttons inactive)
- Multiple blocks selected (some buttons disabled)

---

## VALIDATION & REQUIREMENTS

**Article Body field is required:**

- Must have at least 1 block
- First block is usually H2 heading + paragraph

**Each block has requirements:**

- **Images:** Alt text required (accessibility)
- **Gallery:** Minimum 2 images required
- **Video:** URL required
- **Pull Quote:** Quote text required
- **Project Reference:** Must select a project

**Publishing requires:**

- Article Body must be filled
- Hero Image must be provided
- All required fields completed

---

## KEYBOARD SHORTCUTS

Common shortcuts in the Article Body editor:

| Action             | Shortcut              |
| ------------------ | --------------------- |
| Bold               | `Ctrl+B`              |
| Italic             | `Ctrl+I`              |
| Undo               | `Ctrl+Z`              |
| Redo               | `Ctrl+Y`              |
| Heading            | `Ctrl+Alt+1` (H2)     |
| List               | `Ctrl+Alt+8` (bullet) |
| Exit current block | `Escape`              |

---

## BEST PRACTICES FOR ARTICLE BODY

✅ **DO:**

- Use H2 for section headings (numbered: "01 // Context")
- Use descriptive alt text for all images
- Include captions for context
- Credit photographers
- Use Pull Quotes for emphasis
- Break up long text with images/dividers
- Test links before publishing

❌ **DON'T:**

- Use H2 repeatedly without body text
- Forget alt text (breaks accessibility)
- Use Gallery for single images (use Image block)
- Add videos > 100MB (embed YouTube instead)
- Overuse Pull Quotes (dilutes impact)
- Create articles with no headings

---

## TROUBLESHOOTING

| Problem                    | Cause            | Solution                 |
| -------------------------- | ---------------- | ------------------------ |
| Button greyed out          | No text selected | Highlight text first     |
| Image won't upload         | File too large   | Resize to <5MB           |
| Video won't play           | Invalid URL      | Use YouTube/Vimeo link   |
| Gallery won't save         | < 2 images       | Add minimum 2 images     |
| Alt text shows error       | Field empty      | Fill alt text (required) |
| Heading number won't parse | Wrong format     | Use "01 // Title" format |

---

## SUMMARY

**Article Body** is your editorial canvas:

- **Buttons:** 12 main buttons + formatting for rich content
- **Block Types:** Paragraphs, headings, lists, images, galleries, quotes, videos, projects, dividers
- **Formatting:** Bold, italic, links for inline emphasis
- **Responsive:** All blocks adapt to mobile/tablet/desktop
- **Validated:** Required fields prevent incomplete articles
- **Published:** Full article renders from this single field

Master the Article Body, and you can create sophisticated editorial experiences without touching code.
