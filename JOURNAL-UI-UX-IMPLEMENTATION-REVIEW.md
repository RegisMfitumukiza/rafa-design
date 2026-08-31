# Journal UI/UX Implementation Review

## Executive Summary

The Journal implementation demonstrates an **architectural monograph UI pattern** with industrial editorial structure. Content flows through a **12-column asymmetric grid** with sticky marginalia rail (table of contents), monumental hero imagery, Portable Text editorial blocks, and metadata specification matrices. The pattern establishes the template for Services, Team, and other detail pages.

---

## PART 1: ARCHITECTURE OVERVIEW

### Content Flow

```
URL: /journal/[slug]
         ↓
generateStaticParams()
  → getArticleSlugs() from Sanity
     ↓
getArticleBySlug(slug) from Sanity
  → Fetch full JournalArticle object
     ↓
JournalDocumentSanity component
  → Renders monograph layout
     ↓
Visual sections:
  1. Scroll Progress Bar (hairline)
  2. 12-col Header (8 cols title/intro + 4 cols metadata spec)
  3. Hero Image (full-width with credit)
  4. 12-col Monograph Grid:
     - Left 4 cols: ReadingIndexRail (sticky TOC)
     - Right 8 cols: ArticleContent (Portable Text)
  5. Credits & Keywords (structured data)
  6. Back To Top button (floating)
  7. Related Articles Carousel
```

---

## PART 2: UI STRUCTURE — Monograph Pattern

### 2.1 Scroll Progress Indicator

**Component:** `ScrollProgress`

**What it does:**

- 2px hairline horizontal bar at top of viewport
- Fills from left to right as user scrolls down page
- Visual feedback for reading progress
- No interaction required

**Implementation pattern:**

```typescript
// Fixed position at top
// Updates width based on: (scrolled / totalHeight) * 100%
// Uses CSS or GSAP for smooth animation
```

---

### 2.2 Header Section (12-Column Split)

**Structure:**

```
┌─────────────────────────────────────────────────────┐
│ ← Journal // Category                                │ (Breadcrumb)
├──────────────────────────────────────────────────────┤
│                                                       │
│ Left 8 Columns              │  Right 4 Columns      │
│ ──────────────────────      │  ──────────────────   │
│ Monumental Title            │  01 // Author         │
│ (Powerful, bold)            │  RAFA Design Hub      │
│                             │                        │
│ Subtitle (if exists)        │  02 // Published      │
│ Styled differently          │  August 19, 2026      │
│                             │                        │
│ Excerpt (visual intro)      │  03 // Reading Time   │
│ Sets editorial tone         │  8 min read           │
│                             │                        │
│                             │  04 // Discipline     │
│                             │  Research             │
│                             │                        │
│                             │  05 // Share          │
│                             │  [Share Buttons]      │
│                             │                        │
└──────────────────────────────────────────────────────┘
```

**Code Location:** `src/features/journal/document/journal-document-sanity.tsx` lines 71-123

**Key Features:**

- Left side: Editorial copy (title, subtitle, excerpt)
- Right side: Specification matrix in **industrial design system**
  - 01 // Author
  - 02 // Published
  - 03 // Reading Time
  - 04 // Discipline (category)
  - 05 // Share (social buttons)
- Border separator on mobile (`border-t`), column separator on desktop
- Breadcrumb navigation links back to `/journal` with category

---

### 2.3 Hero Image Plate

**Component:** `ImageReveal` motion wrapper

**What it renders:**

```
┌─────────────────────────────────────┐
│  Hero Image                         │
│  (Full width, aspect-hero ratio)    │
│  (Image fills container)            │
├─────────────────────────────────────┤
│ Caption (if exists) | Photo: Credit │
│ (Bottom of image)                   │
└─────────────────────────────────────┘
```

**Code:** `journal-document-sanity.tsx` lines 151-178

**Key Features:**

- Uses Next.js `Image` component (optimization)
- `aspect-hero` ratio (16:10 approximately)
- Caption and credit attribution
- Contained in `Section` with `container="full"`
- Separated from header by `mb-2xl` margin

---

### 2.4 Monograph Grid (12-Column Asymmetric)

This is the **core reading experience** — the pattern you should replicate for Services detail pages.

#### Layout Structure

```
┌────────────────────────────────────────────────────────────┐
│  LEFT 4 COLS          │    RIGHT 8 COLS                    │
│  (Sticky)             │    (Scrollable content)            │
│                       │                                     │
│ Index // Sections     │                                     │
│ ───────────────────   │                                     │
│ ❶ 01 // Context      │    [Heading 01 // Context]          │
│ ❷ 02 // Approach     │    Paragraph text body...           │
│ ❸ 03 // Materials    │    ... continues ...                │
│                       │                                     │
│ Specification // Meta │    [Heading 02 // Approach]        │
│ ───────────────────   │    More paragraph text...          │
│ Author                │                                     │
│ Published             │    [Image block]                   │
│ Reading Time          │    (Max-width constrained)         │
│ Discipline            │                                     │
│ [Share]               │    Continuing narrative...         │
│                       │                                     │
│                       │    [Pull Quote]                    │
│                       │    "Important statement..."        │
│                       │                                     │
│                       │    [Heading 03 // Materials]       │
│                       │    Final section content...        │
│                       │                                     │
│                       │    [Gallery block]                 │
│                       │    3 images in grid               │
│                       │                                     │
│                       │    Credits & Keywords              │
│                       │    (structured data matrix)        │
└────────────────────────────────────────────────────────────┘
```

**Code:** `journal-document-sanity.tsx` lines 181-254

**Key Features:**

- Left rail is `sticky top-28` (stays in viewport while scrolling)
- Hidden on mobile/tablet (`hidden lg:block`)
- Right column has `max-w-2xl` constraint on text width
- Gap between columns: `gap-x-2xl`

---

## PART 3: LEFT RAIL — Reading Index (Marginalia)

### ReadingIndexRail Component

**File:** `src/features/journal/document/reading-index-rail.tsx`

**Purpose:**

- Table of contents showing article structure
- Sticky on left side of screen (desktop only)
- Auto-highlights current section as user scrolls
- Click to smooth-scroll to section

### Structure

```
Index // Sections
───────────────────
❶ 01 // Context
❷ 02 // Approach
❸ 03 // Materials
❹ 04 // Performance

Specification // Meta
───────────────────
Author: John Architect
Published: 19 Aug 2026
Reading Time: 8 min
Discipline: Research
[Share Buttons]
```

### How It Works

**1. Extract Headings from Content**

```typescript
// From: heading-utils.ts
const headings = extractHeadingsFromContent(rawContent);

// Returns: Array of headings like:
// [
//   { id: "context", number: "01", title: "Context" },
//   { id: "approach", number: "02", title: "Approach" },
//   ...
// ]
```

**Heading format:** `"01 // Context"` (parsed from h2 tags)

**2. Intersection Observer for Active Section**

```typescript
// In ReadingIndexRail component
const [activeId, setActiveId] = useState<string | null>(null);

useEffect(() => {
  // Observes which section is visible in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id); // Updates active
        }
      });
    },
    {
      rootMargin: "-15% 0px -70% 0px", // Triggers when section is 15% from top
      threshold: 0,
    },
  );

  // Observe all heading elements
  headings.forEach((heading) => {
    const el = document.getElementById(heading.id);
    if (el) observer.observe(el);
  });
}, [headings]);
```

**3. Visual Feedback for Active Section**

```typescript
// Each heading link shows active state:
{
  isActive
    ? "text-foreground border-foreground -ml-[13px] border-l-2 pl-3 font-medium"
    : "text-foreground/45 hover:text-foreground/80";
}

// Visual effect:
// Inactive: Faded text on left
// Active:   Bold text with THICK LEFT BORDER replacing left margin
```

---

## PART 4: RIGHT COLUMN — Content Rendering (Portable Text)

### ArticleContent Component

**File:** `src/components/journal/portable-text.tsx`

**What it does:**

- Takes Sanity Portable Text blocks (array of objects)
- Renders them with custom React components
- Supports 10+ block types

### Supported Block Types

#### 1. **h2 (Section Headings)**

```typescript
// Input from Sanity: "01 // Context"
// Parsed to extract number + title
// Output:
//   <div id="context" className="scroll-mt-28 border-t border-b pt-xl">
//     <p>"01 // Section"</p>
//     <h2>Context</h2>
//   </div>
```

- Numbered headings (auto-extracted from text)
- ID is set for scroll targeting
- Separated by top border
- Supports smooth scroll-margin

#### 2. **h3 (Subsection Headings)**

```typescript
<h3 className="text-xl font-display font-medium tracking-tight sm:text-2xl">
  Subsection Title
</h3>
```

#### 3. **normal (Body Paragraphs)**

```typescript
<p className="text-lg leading-[1.8] text-foreground/85">
  {content}
</p>
```

- Large text for readability (18px+)
- High line-height (1.8)
- Subtle text color (85% opacity)

#### 4. **blockquote (Quoted Text)**

```typescript
<blockquote className="border-l-2 border-foreground/30 pl-lg my-xl py-sm">
  <p className="text-xl italic">{children}</p>
</blockquote>
```

- Left border accent
- Italic, larger
- Vertical spacing

#### 5. **image (Single Image Block)**

```typescript
// Input: Sanity image object
// Output:
//   <figure>
//     <Image src={url} layout="contained|wide|full" />
//     <figcaption>
//       <p>Caption</p>
//       <p>"Photo: Credit"</p>
//     </figcaption>
//   </figure>
```

- Three layout options: contained (max-w-4xl) | wide (max-w-5xl) | full (100vw)
- Auto-optimized via Next.js Image
- Caption + credit attribution

#### 6. **gallery (Image Grid)**

```typescript
// Input: Array of images + column count
// Output: CSS Grid with specified columns
//   1 col on mobile
//   2 cols on tablet
//   N cols on desktop
```

- Responsive grid
- Hover zoom effect (`group-hover:scale-105`)
- Optional captions per image

#### 7. **pullQuote (Large Quoted Emphasis)**

```typescript
<blockquote className="border-l-2 border-foreground/30 py-md pl-xl my-3xl">
  <p className="text-2xl font-display font-medium tracking-tight">
    "{content}"
  </p>
  <cite className="font-mono text-[10px] tracking-widest uppercase">
    — {author}
  </cite>
</blockquote>
```

- Large monumental typography
- Author attribution
- Distinct from regular blockquote

#### 8. **video (YouTube / Vimeo / Direct)**

```typescript
// Input: Any video URL
// Output:
//   <figure>
//     <iframe src={embedUrl} />
//     <figcaption>Caption + Credit</figcaption>
//   </figure>
```

- Aspect ratio: `aspect-video` (16:9)
- Auto-detects YouTube / Vimeo / direct video
- Embeds appropriately

#### 9. **projectReference (Inline Project Card)**

```typescript
// Input: Reference to Project document in Sanity
// Output:
//   <Link href="/projects/{slug}">
//     <div className="grid sm:grid-cols-12">
//       <img /> {/* Project hero */}
//       <div>
//         Specification // Project Reference
//         Project Title →
//         Subtitle
//         Location · Year
//       </div>
//     </div>
//   </Link>
```

- Clickable card linking to project detail
- Shows project image + metadata
- Hover effect with translate arrow

#### 10. **divider (Visual Separator)**

```typescript
// Three styles:
// 1. "space": Just vertical margin
// 2. "ruled": Small horizontal line
// 3. "line": Full-width hr
```

---

## PART 5: MARKS (Inline Styling)

Content within paragraphs can have **inline marks**:

### Supported Marks

| Mark       | Output              | Code                          |
| ---------- | ------------------- | ----------------------------- |
| **link**   | Underlined, colored | `<a href={url}>text</a>`      |
| **strong** | Bold                | `<strong>{children}</strong>` |
| **em**     | Italic              | `<em>{children}</em>`         |

### Link Behavior

```typescript
// External links: Open in new tab
{
  isExternal && { target: "_blank", rel: "noopener noreferrer" };
}

// Internal links: Navigate normally
// Both underlined with hover effect
```

---

## PART 6: BOTTOM SECTIONS

### Credits & Attribution

```
Specification // Credits & Attribution
─────────────────────────────────────

Photography     | John Photographer
Text            | Jane Writer
Editing         | Editorial Team (link)
```

- 2-column grid on desktop
- Each credit has role + name
- Names can link to external URL

### Keywords / Taxonomy

```
Keywords: #research #architecture #materials #process
```

- Hash-tagged keywords
- Small styled pills
- Used for search/filtering

---

## PART 7: Related Articles Carousel

**Component:** `RelatedArticlesCarousel`

**What it renders:**

- At bottom of article
- 3-5 related articles (filtered by category)
- Horizontal scroll on mobile
- Grid on desktop
- Shows featured image + title

---

## PART 8: Content Consumption Flow

### Data → Component → Render

```
Step 1: Fetch
────────────
URL: /journal/[slug]
  ↓
generateStaticParams() calls getArticleSlugs()
  → Returns ["language-of-light", "open-house-porto", ...]
  ↓
For each slug:
  → Create static route: /journal/language-of-light, etc.

Step 2: Get Data
────────────────
Page component runs:
  const article = await getArticleBySlug(slug)

Sanity query returns:
  {
    _id: "...",
    slug: { current: "language-of-light" },
    title: "Language of Light",
    subtitle: "How natural light shapes...",
    excerpt: "...",
    hero: { asset, alt, caption, credit },
    content: [{...}, {...}, ...],  // Portable Text blocks
    author: { name, role },
    category: "research",
    estimatedReadingTime: 8,
    credits: [{role, name, organization, url}, ...],
    keywords: ["light", "material", "design"],
    publishedAt: "2026-08-19"
  }

Step 3: Extract Metadata
─────────────────────────
headings = extractHeadingsFromContent(content)
  → Scans content blocks for h2 headings
  → Returns: [
      { id: "context", number: "01", title: "Context" },
      { id: "approach", number: "02", title: "Approach" }
    ]

Step 4: Render Structure
────────────────────────
<JournalDocumentSanity article={article} />
  ↓ Renders:
  [1] ScrollProgress (hairline bar)
  [2] Header section (12-col split)
  [3] Hero image
  [4] 12-col monograph grid:
      [L] ReadingIndexRail (headings + metadata)
      [R] ArticleContent (Portable Text blocks)
  [5] Credits & keywords
  [6] BackToTop button
  [7] RelatedArticlesCarousel

Step 5: Interactive Elements
──────────────────────────────
ReadingIndexRail:
  - Intersection Observer tracks scroll position
  - Updates activeId state
  - User clicks heading → smooth scroll to section

ArticleContent:
  - PortableText component renders each block
  - Custom components for image, gallery, video, projectReference, etc.
  - Headings auto-parse number from text (01 // Context → 01 + Context)
  - Links highlight on hover
```

---

## PART 9: DESIGN SYSTEM INTEGRATION

### Typography

| Element          | Token          | CSS Class                                      |
| ---------------- | -------------- | ---------------------------------------------- |
| H1 (Title)       | `font-display` | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` |
| H2 (Sections)    | `font-display` | `text-2xl sm:text-3xl lg:text-4xl`             |
| H3 (Subsections) | `font-display` | `text-xl sm:text-2xl`                          |
| Body Paragraph   | —              | `text-lg sm:text-xl leading-[1.8]`             |
| Meta / Spec      | `font-mono`    | `text-[10px] tracking-widest uppercase`        |
| Quote            | `font-display` | `text-2xl sm:text-3xl md:text-4xl`             |

### Colors

| Element          | Color                              |
| ---------------- | ---------------------------------- |
| Primary text     | `text-foreground`                  |
| Secondary text   | `text-foreground/75` (75% opacity) |
| Meta labels      | `text-foreground/35` (35% opacity) |
| Borders          | `border-border/30`                 |
| Background hover | `bg-foreground/[0.02]`             |

### Spacing

| Element         | Token               |
| --------------- | ------------------- |
| Large sections  | `mt-3xl` / `mb-3xl` |
| Medium sections | `mt-2xl` / `mb-2xl` |
| Small elements  | `mt-lg` / `mb-lg`   |
| Extra tight     | `mt-sm` / `mb-sm`   |

### Motion

- **Reveal:** Elements fade in on scroll
- **ImageReveal:** Images reveal with ken burns effect
- **Scroll progress:** Smooth width animation
- **Hover:** Subtle scale, color, translate effects

---

## PART 10: SERVICES DETAIL PAGE — Replication Pattern

To build Services detail pages, replicate this pattern:

### Skeleton Structure for `/services/[slug]`

```typescript
// File: src/app/(site)/services/[slug]/page.tsx

export async function generateStaticParams() {
  const services = await getServices();  // from @/sanity/lib
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  // Return SEO metadata from service data
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  // Extract approach points as "headings"
  const headings = service.approach.map((point, i) => ({
    id: slugify(point.title),
    number: String(i + 1).padStart(2, "0"),
    title: point.title,
  }));

  return (
    <>
      {/* 1. Scroll Progress */}
      <ScrollProgress />

      {/* 2. Header (12-col split) */}
      <Section container="wide" className="pt-xl pb-2xl">
        <div className="grid md:grid-cols-12 gap-x-2xl">
          <div className="md:col-span-8">
            <h1>{service.title}</h1>
            <p>{service.intro}</p>
          </div>
          <div className="md:col-span-4">
            {/* Spec matrix with order, icon, related projects count, etc. */}
          </div>
        </div>
      </Section>

      {/* 3. Lead Image */}
      {service.leadProject?.heroImage && (
        <Section container="full" noPadding>
          <Image src={service.leadProject.heroImage.src} />
        </Section>
      )}

      {/* 4. Monograph Grid */}
      <Section container="wide" className="my-2xl">
        <div className="grid lg:grid-cols-12 gap-x-2xl">
          {/* Left 4: Index + Meta */}
          <div className="hidden lg:col-span-4 lg:block">
            <ServiceIndexRail headings={headings} service={service} />
          </div>

          {/* Right 8: Narrative */}
          <div className="lg:col-span-8">
            {/* Description */}
            <h2>01 // Approach</h2>
            <p>{service.description}</p>

            {/* Approach points as numbered sections */}
            {service.approach.map((point, i) => (
              <div key={i} id={slugify(point.title)}>
                <h3>{String(i + 1).padStart(2, "0")} // {point.title}</h3>
                <p>{point.statement}</p>
              </div>
            ))}

            {/* Related projects section */}
            {service.relatedProjects.length > 0 && (
              <div>
                <h2>02 // Selected Work</h2>
                {/* Render projects */}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* 5. Related Services */}
      {/* Similar to RelatedArticlesCarousel */}
    </>
  );
}
```

---

## PART 11: KEY TAKEAWAYS FOR SERVICES IMPLEMENTATION

### What to Replicate ✅

1. **12-Column Asymmetric Grid** (8+4 or similar split)
2. **Sticky Left Rail** with table of contents
3. **Scroll Progress Indicator** at top
4. **Monumental Header** with hero image
5. **Structured Metadata Matrix** (numbered spec)
6. **Heading Auto-parsing** (extract number from text)
7. **Intersection Observer** for active section highlight
8. **Portable Text** content rendering (or custom blocks for approach points)
9. **Back To Top** floating button
10. **Related Items** carousel at bottom

### Pattern Differences for Services

- **Approach points** = numbered methodology (not h2 headings)
- **Related items** = Related Services + Selected Projects
- **Editorial intents** = Filter images from projects by discipline
- **No author/credits** needed (corporate content, not journalism)
- **No keywords** (optional, low priority)

---

## SUMMARY

The Journal detail page establishes a **reusable monograph pattern** with:

- **Async data fetching** from Sanity
- **Static generation** via `generateStaticParams()`
- **Industrial 12-column layout** with asymmetric split
- **Sticky marginalia** for navigation
- **Portable Text** block system for rich content
- **Design system** tokens (spacing, typography, colors)
- **Motion effects** for visual hierarchy
- **SEO** best practices (metadata, structured data)

Apply this exact pattern to Services, Team, Studio, Careers for consistency and professional polish.
