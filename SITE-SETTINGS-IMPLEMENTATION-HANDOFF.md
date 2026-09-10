# Site Settings Integration — Complete Handoff Prompt

## Task Overview

Implement **Site Settings from Sanity** as the single source of truth for global site configuration, eliminating hardcoded values and duplication.

Currently: Site Settings schema exists but code doesn't use it.  
Goal: Make Site Settings control entire website configuration.

---

## Current State (Problems)

### Problem 1: Hardcoded Site Configuration

**File:** `src/config/site.ts`

```typescript
export const siteConfig = {
  name: "RAFA Design Hub",  // ← Hardcoded
  description: "Premium architecture and interior design...",  // ← Hardcoded
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8000",  // ← Hardcoded
  keywords: [...]  // ← Hardcoded
};
```

**Problem:** If you change these in Sanity, website doesn't update. You must edit code.

---

### Problem 2: Duplicated Email/Phone

**Location 1 - Contact Schema:**

```
/admin → Contact Page → 01 // Contact Details
├─ email: "hello@rafadesign.com"
└─ phone: "+351 22 1234567"
```

**Location 2 - Site Settings Schema:**

```
/admin → Site Settings → 03 // Organisation
├─ email: "hello@rafadesign.com" (DUPLICATE)
└─ phone: "+351 22 1234567" (DUPLICATE)
```

**Problem:** Two sources of truth = conflicts, confusion, maintenance nightmare.

---

### Problem 3: Maintenance Mode Not Implemented

**Schema has:** `maintenanceMode` flag + `maintenanceMessage`  
**Code does:** Nothing with it

**Problem:** Can't toggle maintenance page from Sanity.

---

### Problem 4: Analytics Not Dynamic

**Schema has:** `analyticsCode` field  
**Code does:** Hardcoded Vercel Analytics only

**Problem:** Can't change Google Analytics ID without code change.

---

## What Needs to Change

### HIGH PRIORITY

#### 1. Create Dynamic Site Config Hook

**New File:** `src/lib/get-site-config.ts`

```typescript
import { getSiteSettings } from "@/sanity/lib";

export async function getSiteConfig() {
  const settings = await getSiteSettings();

  if (!settings) {
    // Fallback if Sanity is down
    return {
      name: "RAFA Design Hub",
      description: "Architecture and design studio",
      url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8000",
      keywords: ["architecture", "design"],
      analyticsCode: undefined,
      maintenanceMode: false,
      maintenanceMessage: "",
    };
  }

  return {
    name: settings.identity?.name || "RAFA Design Hub",
    tagline: settings.identity?.tagline,
    description: settings.identity?.description,
    url: (settings.identity?.url || process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:8000",
    keywords: settings.seo?.keywords || [],
    seoDefaults: {
      title: settings.seo?.defaultTitle,
      description: settings.seo?.defaultDescription,
      ogImage: settings.seo?.defaultOgImage,
    },
    organisation: {
      email: settings.organisation?.email,
      phone: settings.organisation?.phone,
    },
    analyticsCode: settings.operational?.analyticsCode,
    maintenanceMode: settings.operational?.maintenanceMode || false,
    maintenanceMessage: settings.operational?.maintenanceMessage || "",
  };
}
```

---

#### 2. Update Root Layout

**File:** `src/app/layout.tsx`

**Current (line 18):**

```typescript
import { siteConfig } from "@/config/site";
```

**Change to:**

```typescript
import { getSiteConfig } from "@/lib/get-site-config";
```

**Current (line 20-26):**

```typescript
export const metadata: Metadata = createMetadata({
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  ...
});
```

**Change to:**

```typescript
// Make this dynamic after fetching settings
// Will update in component implementation below
```

**Current (line 33):**

```typescript
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContactInformation();
```

**Change to:**

```typescript
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContactInformation();
  const config = await getSiteConfig();

  // Check maintenance mode
  if (config.maintenanceMode) {
    return (
      <html lang={siteConfig.locale} suppressHydrationWarning>
        <head>
          <title>Maintenance</title>
        </head>
        <body className="bg-background text-foreground flex min-h-dvh flex-col items-center justify-center font-sans">
          <div className="text-center">
            <h1 className="font-display mb-md text-4xl">{config.name}</h1>
            <p className="text-foreground/60 mb-lg">{config.maintenanceMessage}</p>
            <p className="text-foreground/40 text-sm">We'll be back soon.</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang={siteConfig.locale} className="h-full antialiased" suppressHydrationWarning>
      {/* ... rest of layout */}
    </html>
  );
}
```

---

#### 3. Remove Email/Phone from Site Settings Schema

**File:** `src/sanity/schemas/siteSettings.ts`

**Remove this section (around line 80-95):**

```typescript
defineField({
  name: "email",
  title: "Contact Email",
  type: "string",
  group: "organisation",
  ...
}),

defineField({
  name: "phone",
  title: "Contact Phone",
  type: "string",
  group: "organisation",
  ...
}),
```

**Reason:** These already exist in Contact Schema. No duplication.

---

#### 4. Update SEO Configuration

**File:** `src/config/seo.ts`

**Current:** Reads from hardcoded `siteConfig`

**Change to:** Accept config parameter or fetch dynamically

```typescript
import { getSiteConfig } from "@/lib/get-site-config";

export async function getDefaultSEO() {
  const config = await getSiteConfig();

  return {
    title: config.seoDefaults?.title || config.name,
    description: config.seoDefaults?.description || config.description,
    ogImage: config.seoDefaults?.ogImage,
    keywords: config.keywords,
  };
}
```

---

### MEDIUM PRIORITY

#### 5. Implement Analytics Integration

**File:** `src/app/layout.tsx`

**Update Script injection (around line 95):**

```typescript
// Current: Only Vercel Analytics
<Analytics />

// Change to:
<Analytics />
{config.analyticsCode && (
  <Script
    async
    src={`https://www.googletagmanager.com/gtag/js?id=${config.analyticsCode}`}
  />
)}
{config.analyticsCode && (
  <Script
    id="google-analytics"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${config.analyticsCode}');
      `,
    }}
  />
)}
```

---

#### 6. Update Footer to Use Central Config

**File:** `src/components/layout/Footer.tsx`

**Current:** Uses hardcoded `siteConfig`

**Change to:**

```typescript
import { getSiteConfig } from "@/lib/get-site-config";

export async function Footer() {
  const config = await getSiteConfig();

  return (
    <footer>
      <p>{config.name}</p>
      <p>{config.tagline}</p>
      {/* Use contact from getContactInformation() */}
    </footer>
  );
}
```

---

### LOW PRIORITY (Nice to Have)

#### 7. Update Splash Screen

**File:** `src/components/splash/SplashScreen.tsx`

**Change:** Use `config.name` instead of hardcoded "RAFA DESIGN HUB"

---

#### 8. Create Migration Guide

Document for non-technical users:

```
Where to manage site configuration:

Identity (Site name, tagline, URL):
→ /admin → Site Settings → 01 // Identity

SEO Defaults (Meta tags, keywords):
→ /admin → Site Settings → 02 // SEO

Contact Email/Phone:
→ /admin → Contact Page → 01 // Contact Details

Analytics:
→ /admin → Site Settings → 04 // Operational

Maintenance Mode:
→ /admin → Site Settings → 04 // Operational
```

---

## Files to Update (Summary)

| File                                     | Change                          | Priority  |
| ---------------------------------------- | ------------------------------- | --------- |
| `src/lib/get-site-config.ts`             | CREATE new file                 | 🔴 High   |
| `src/app/layout.tsx`                     | Fetch config, check maintenance | 🔴 High   |
| `src/sanity/schemas/siteSettings.ts`     | Remove email/phone fields       | 🔴 High   |
| `src/config/seo.ts`                      | Use dynamic config              | 🟡 Medium |
| `src/app/layout.tsx`                     | Add Google Analytics injection  | 🟡 Medium |
| `src/components/layout/Footer.tsx`       | Use config instead of hardcoded | 🟡 Medium |
| `src/components/splash/SplashScreen.tsx` | Use config name                 | 🟠 Low    |

---

## Testing Checklist

After implementation:

```
[ ] Update site name in /admin Site Settings
    → Verify it updates on website (not hardcoded)

[ ] Update description in /admin Site Settings
    → Verify it appears in meta tags

[ ] Update keywords in /admin Site Settings
    → Verify they appear in page head

[ ] Enable maintenance mode in /admin Site Settings
    → Verify maintenance page shows on all routes

[ ] Disable maintenance mode
    → Verify site returns to normal

[ ] Add analytics code in /admin Site Settings
    → Verify Google Analytics script loads (check dev tools)

[ ] Change email/phone in /admin Contact Page
    → Verify it updates in footer (not hardcoded)

[ ] TypeScript: npx tsc --noEmit
    → 0 errors

[ ] ESLint: npm run lint
    → 0 warnings

[ ] No console errors in dev tools
```

---

## Cache Strategy

Use Next.js 15+ on-demand revalidation:

```typescript
export async function getSiteConfig() {
  const settings = await getSiteSettings();
  // Cache tag already in getSiteSettings()
  // Revalidate on: POST to /admin, publish in Sanity
  return settings;
}
```

Existing fetch functions already have:

```typescript
{
  next: {
    tags: [cacheTags.settings];
  }
}
```

No additional setup needed.

---

## Questions for AI

If anything unclear:

1. Should maintenance page be a separate route or inline in layout?
   - Recommend: Inline in layout (catches ALL routes)

2. Should siteConfig.ts still exist as fallback?
   - Recommend: Yes, keep for emergency fallback

3. Should metadata export be dynamic too?
   - Recommend: Not possible (metadata must be exported sync)
   - Instead: Use default, update per-page as needed

4. What if Sanity is down?
   - Plan: Fallback to hardcoded defaults (shown above)

5. Should we cache Site Settings differently than other content?
   - Plan: No, use same on-demand revalidation strategy

---

## Success Criteria

- ✅ Site name/description pulled from Sanity (not hardcoded)
- ✅ Email/phone only in Contact Schema (no duplication)
- ✅ Maintenance mode toggles site availability from Sanity
- ✅ Analytics code injected dynamically from Sanity
- ✅ TypeScript 0 errors
- ✅ ESLint 0 warnings
- ✅ No broken links or console errors
- ✅ All tests pass (if tests exist)

---

## Deliverable

All files updated with:

- ✅ Dynamic config fetching from Sanity
- ✅ Maintenance mode detection in layout
- ✅ Email/phone fields removed from Site Settings schema
- ✅ Analytics injection from Sanity
- ✅ No hardcoded values (except fallback)
- ✅ Proper error handling
- ✅ Comments explaining logic

---

## Time Estimate

**20-30 minutes** for competent developer

---

## Related Documentation

- Sanity Site Settings schema: `src/sanity/schemas/siteSettings.ts`
- Contact schema: `src/sanity/schemas/contact.ts`
- Current config: `src/config/site.ts`
- Fetch functions: `src/sanity/lib/fetch.ts`

---

## Reference: What Fields Exist in Site Settings

```typescript
// 01 // Identity
├─ name: string
├─ tagline: string
├─ description: text
└─ siteUrl: string

// 02 // SEO
├─ seoDefaults object:
│  ├─ defaultTitle: string
│  ├─ defaultDescription: text
│  ├─ defaultKeywords: array
│  └─ defaultOgImage: image
└─ (metadata for fallback)

// 03 // Organisation
├─ contactEmail: removed (use Contact schema)
├─ contactPhone: removed (use Contact schema)
└─ (consolidation point)

// 04 // Operational
├─ analyticsCode: string (Google Analytics ID)
├─ maintenanceMode: boolean
└─ maintenanceMessage: text
```

---

## Notes for Implementation

1. **Metadata export is static** — Can't make it fully dynamic in Next.js
   - Solution: Set sensible defaults, pages can override per-route
   - This is fine for SEO purposes

2. **Maintenance mode should catch ALL routes** — Implement in layout, not separate page
   - Solution shown above (inline check in RootLayout)

3. **Keep fallback hardcoded values** — In case Sanity is down
   - Ensures site stays online even if CMS fails

4. **Cache invalidation happens automatically** — Use existing cache tags

5. **Email/phone in two places is wrong** — Remove from Site Settings schema
   - Contact Schema is single source of truth for contact info
