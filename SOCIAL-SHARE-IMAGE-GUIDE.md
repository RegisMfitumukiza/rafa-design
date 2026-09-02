# Social Share Image (OG Image) — Complete Guide

## Quick Answer

| Question        | Answer                                                    |
| --------------- | --------------------------------------------------------- |
| What is it?     | Image that appears when you share article on social media |
| Is it required? | ❌ **NO** — Optional                                      |
| What if empty?  | Uses **hero image** by default                            |
| What if filled? | Uses **this specific image** instead of hero              |
| When to use?    | When you want different image for social vs. article      |

---

## PART 1: WHAT IS A SOCIAL SHARE IMAGE?

### Visual Example

**When someone shares your article on Twitter/LinkedIn/Facebook:**

```
Without Social Share Image (uses hero):
┌─────────────────────────────────┐
│                                 │
│     [Hero Image from Article]   │
│                                 │
├─────────────────────────────────┤
│ Language of Light               │
│ Light shapes the experience...  │
└─────────────────────────────────┘

With Social Share Image (custom):
┌─────────────────────────────────┐
│                                 │
│   [Custom OG Image (different)]  │
│                                 │
├─────────────────────────────────┤
│ Language of Light               │
│ Light shapes the experience...  │
└─────────────────────────────────┘
```

### Where It Appears

- 🐦 **Twitter/X** — Thumbnail in tweet
- 📘 **Facebook** — Preview in feed
- 💼 **LinkedIn** — Article card
- 💬 **WhatsApp** — Share preview
- 🔗 **Slack** — Link preview
- 📧 **Email** — Link preview

---

## PART 2: FIELD LOCATION IN SANITY

### In Studio

**Location:** 05 // SEO (tab)

```
┌─────────────────────────────────────┐
│ SEO Override                        │
│                                    │
│ Meta Title                         │
│ [Override title for search...]     │
│                                    │
│ Meta Description                   │
│ [Override excerpt...]              │
│                                    │
│ Keywords                           │
│ [#keyword #tags]                   │
│                                    │
│ Social Share Image                 │ ← THIS FIELD
│ [Upload or select image]           │
│ Alt Text: [for accessibility]      │
│                                    │
│ ✓ Leave empty to use hero image    │
└─────────────────────────────────────┘
```

### Schema Definition

```typescript
defineField({
  name: "seo",
  title: "SEO Override",
  type: "object",
  group: "seo",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Meta Title",
    },
    {
      name: "description",
      type: "text",
      title: "Meta Description",
    },
    {
      name: "keywords",
      type: "array",
      title: "Keywords",
    },
    {
      name: "ogImage", // ← Social Share Image
      type: "image",
      title: "Social Share Image",
      description: "Override default hero image for social media (leave empty to use hero)",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
        },
      ],
    },
  ],
});
```

---

## PART 3: HOW TO ADD IT

### In Sanity Studio

**Step 1: Open Article**

```
Click article document
```

**Step 2: Go to SEO Tab**

```
Click "05 // SEO" tab
```

**Step 3: Find Social Share Image**

```
Scroll to "Social Share Image" field
```

**Step 4: Upload/Select Image**

```
Option A: Click to upload new image
Option B: Click to select from media library
Option C: Leave empty (use hero image)
```

**Step 5: Add Alt Text**

```
Alt Text field appears after image upload
Required for accessibility
Example: "Casa Monte south elevation"
```

**Step 6: Publish**

```
Click "Publish" to save
Changes live after publish
```

### Visual in Studio

```
┌─────────────────────────────────────────────────┐
│ Social Share Image                              │
│                                                 │
│ [+ Upload image or select from library]         │
│                                                 │
│ Or                                              │
│                                                 │
│ ┌───────────────────────────────────────┐      │
│ │      [Existing image preview]        │      │
│ │    (if already uploaded)             │      │
│ │                                       │      │
│ │  [x] Remove  [↻] Replace             │      │
│ └───────────────────────────────────────┘      │
│                                                 │
│ Alt Text *                                      │
│ [Casa Monte south elevation]                    │
│                                                 │
│ ✓ Leave Social Share Image empty to use        │
│   article hero image instead                   │
└─────────────────────────────────────────────────┘
```

---

## PART 4: WHAT HAPPENS

### Scenario 1: Social Share Image Empty

**In Sanity:**

```
Social Share Image: [empty]
Hero Image: [Casa Monte photo]
```

**On Social Media:**

```
User shares article link on Twitter
Social media crawls page
Finds meta tag: <meta property="og:image" content="...">
Uses: Hero Image (Casa Monte photo)
Shows: Hero image in tweet preview
```

**Code:**

```typescript
// When no ogImage, uses hero
const ogImage = article.hero?.src; // Falls back to hero
```

**Result:** Article's hero image appears in social preview

---

### Scenario 2: Social Share Image Filled

**In Sanity:**

```
Social Share Image: [Custom image: Design process photo]
Hero Image: [Casa Monte photo]
```

**On Social Media:**

```
User shares article link on Twitter
Social media crawls page
Finds meta tag: <meta property="og:image" content="...">
Uses: Social Share Image (Design process photo)
Shows: Design process photo in tweet preview
```

**Code:**

```typescript
// When ogImage exists, uses it
const ogImage = article.seo?.ogImage?.src || article.hero?.src;
// Returns: ogImage URL (not hero)
```

**Result:** Custom image appears in social preview (NOT hero image)

---

## PART 5: WHEN TO USE

### Use Same Image (Leave Empty)

✅ **When:**

- Hero image is good for social sharing
- Hero image clearly represents article
- No need for variation
- Want consistency between page and social

**Example:**

```
Article: "Language of Light"
Hero: Beautiful interior with light
Social: [Leave empty → uses hero]
Result: Same interior photo on Twitter/Facebook
```

### Use Different Image (Upload Custom)

✅ **When:**

- Hero image too wide/tall for social (wrong aspect ratio)
- Want to highlight different aspect for social
- Social image needs text overlay
- Want more graphic/simplified version for social
- Hero doesn't work well as square thumbnail

**Example:**

```
Article: "Casa Monte: Design Process"
Hero: Full building exterior (wide, cinematic)
Social: Process diagram/sketch (square, focused)
Social Share Image: [Upload diagram]
Result: Diagram shows on Twitter, building on website
```

### Best Dimensions

**Optimal for social media:**

- **Width:** 1200px
- **Height:** 630px
- **Ratio:** 1.91:1 (common for Open Graph)

**If square:**

- **Width:** 1200px
- **Height:** 1200px
- **Ratio:** 1:1

---

## PART 6: HOW IT WORKS TECHNICALLY

### The Meta Tags

When article is shared on social media, these tags are read:

```html
<!-- If Social Share Image is filled: -->
<meta property="og:image" content="https://site.com/images/custom-og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Casa Monte south elevation" />

<!-- If Social Share Image is empty, falls back to: -->
<meta property="og:image" content="https://site.com/images/hero-image.jpg" />
```

### How Social Platforms Use It

```
User clicks "Share" on Twitter
    ↓
Twitter's crawler fetches your page
    ↓
Looks for og:image meta tag
    ↓
If finds og:image → uses that image
If not found → tries to guess from page
    ↓
Displays image in tweet preview
    ↓
User sees preview and decides to click
```

### Code Path

```typescript
// In: src/app/(site)/journal/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(slug);

  return {
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.seo?.ogImage?.src || article.hero?.src,
          // ↑ If ogImage exists, use it
          //   Otherwise use hero
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      images: [
        article.seo?.ogImage?.src || article.hero?.src,
        // ↑ Same logic for Twitter
      ],
    },
  };
}
```

---

## PART 7: VISUAL DIFFERENCES

### Article Page vs. Social Preview

```
ARTICLE PAGE:
┌─────────────────────────────────────┐
│ [Hero image: Full building photo]   │
│ (16:9 aspect, cinematic)            │
│ (Wide, fills viewport)              │
│                                     │
│ Language of Light                   │
│ (Large text below)                  │
└─────────────────────────────────────┘

TWITTER PREVIEW (same image):
┌───────────────────┐
│ [Small thumbnail] │
│ Language of Light │
│ Light shapes...   │
└───────────────────┘

TWITTER PREVIEW (custom OG image):
┌───────────────────┐
│ [Different image] │ ← Custom OG image
│ Language of Light │
│ Light shapes...   │
└───────────────────┘
```

### Aspect Ratio Impact

```
HERO IMAGE (usually):
Width: 1600px
Height: 900px
Ratio: 16:9 (cinematic)

When shown as social thumbnail (square crop):
Some content on sides might be lost

SOCIAL SHARE IMAGE (optimized):
Width: 1200px
Height: 630px
Ratio: 1.91:1 (social standard)

When shown as social thumbnail:
Displays perfectly without cropping
```

---

## PART 8: BEST PRACTICES

### ✅ DO

- **Add alt text** (required for accessibility)
- **Use 1200x630px** for optimal social display
- **Keep it simple** (thumbnail will be small)
- **Test preview** on actual social platform before publishing
- **Consider text overlay** if abstract image (helps viewers understand)
- **Match brand** (use professional/consistent style)

### ❌ DON'T

- Leave alt text empty
- Use images smaller than 1200x630
- Use blurry or low-quality images
- Use images with too much text
- Upload overly complex designs
- Use different style from website branding

### Testing the Preview

**Before publishing, test:**

1. **Twitter/X Card Validator**
   - Go to: https://cards-dev.twitter.com/validator
   - Paste article URL
   - See preview of how tweet will look

2. **Facebook Sharing Debugger**
   - Go to: https://developers.facebook.com/tools/debug/sharing/
   - Paste article URL
   - See preview of how Facebook will show it

3. **LinkedIn Inspector**
   - Go to: https://www.linkedin.com/feed/
   - Try sharing the article
   - See how preview appears

---

## PART 9: EXAMPLES

### Example 1: Research Article

**Article:** "Language of Light"

**Hero image:** Beautiful interior with dramatic light (16:9, cinematic)

**Decision:** Leave Social Share Image empty

**Reason:**

- Hero is compelling for social media
- Shows beautiful architectural photography
- Works well as small thumbnail
- No need for variation

**Result:**

```
Twitter preview shows interior photo
Facebook preview shows interior photo
LinkedIn shows interior photo
→ Consistent across all platforms
```

---

### Example 2: Process Article

**Article:** "Design Process: Casa Monte"

**Hero image:** Full building exterior (16:9, very wide)

**Decision:** Upload custom Social Share Image

**Custom image:** Process diagram/sketch (1200x630, focused)

**Reason:**

- Hero is beautiful but too cinematic for small social thumbnail
- Process diagram more relevant to article topic
- Diagram reads better when scaled down
- Want to highlight methodology, not just architecture

**Result:**

```
Website: Shows beautiful building photo (hero)
Twitter: Shows process diagram (custom OG image)
Facebook: Shows process diagram
→ Better representation on social, while keeping hero on website
```

---

### Example 3: Award Announcement

**Article:** "Casa Monte Wins International Award"

**Hero image:** Celebration photo (1600x900)

**Decision:** Upload custom Social Share Image

**Custom image:** Award badge + building photo (1200x630)

**Reason:**

- Hero is moment-in-time (people celebrating)
- Want to emphasize award recognition
- Badge + building clearly communicates achievement
- Better thumbnail for social sharing

**Result:**

```
Website: Shows celebration moment
Twitter: Shows award recognition graphic
Facebook: Shows award recognition graphic
→ Award clearly communicated on social
```

---

## PART 10: TROUBLESHOOTING

| Problem                                | Cause                         | Solution                            |
| -------------------------------------- | ----------------------------- | ----------------------------------- |
| Wrong image shows on Twitter           | Social media cached old meta  | Use Twitter Card Validator to flush |
| Image looks blurry on social           | Wrong dimensions uploaded     | Re-upload at 1200x630px             |
| Image doesn't appear at all            | Not published yet             | Click "Publish" in Sanity           |
| Different image on different platforms | Platforms process differently | Adjust & test on each platform      |
| Alt text not showing                   | Alt field empty               | Fill in descriptive alt text        |
| Hero image shows instead of custom     | ogImage field empty           | Upload image to ogImage field       |

---

## SUMMARY TABLE

| Aspect           | Detail                                         |
| ---------------- | ---------------------------------------------- |
| **Location**     | 05 // SEO tab → Social Share Image field       |
| **Required?**    | ❌ No — optional                               |
| **Default**      | Uses hero image if empty                       |
| **Best size**    | 1200x630px (1.91:1 ratio)                      |
| **When to use**  | Different image than hero for social           |
| **When to skip** | Hero image is good for social                  |
| **Appears on**   | Twitter, Facebook, LinkedIn, Slack, etc.       |
| **Alt text**     | Required for accessibility                     |
| **Testing**      | Use Twitter Card Validator + Facebook Debugger |

---

## VISUAL FLOWCHART

```
Article shared on social media
    ↓
Social platform crawls meta tags
    ↓
Looks for og:image tag
    ↓
Is Social Share Image filled in Sanity?
    ├─ YES → Use that image
    │         (show custom OG image)
    │
    └─ NO → Use hero image
             (show article's hero image)
    ↓
Social platform displays preview
    ↓
User sees thumbnail + title + description
```

---

## REAL-WORLD COMPARISON

### Article Page View

```
User visits /journal/language-of-light
Website loads full article
Shows large hero image (1600x900)
User reads full content
```

### Social Share Preview

```
User shares article on Twitter
Twitter crawler fetches meta tags
Shows social preview (200x200px)
Shows title + excerpt + image
User clicks to visit article
```

**The OG image is what Twitter shows (small), not the website hero (large)**

---

## BOTTOM LINE

- **Not required** — optional field
- **Default behavior** — uses hero image if empty
- **When to use** — when you want social thumbnail different from website hero
- **Best practice** — add alt text for accessibility
- **Test before publishing** — use Twitter Card Validator
- **Optimal size** — 1200x630px for social media

**Most articles:** Leave empty (hero image works fine)
**Process/diagram articles:** Upload custom image (more relevant for social)
