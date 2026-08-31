# Services Missing from Sidebar — Investigation & Fix

## Problem Statement

Services schema was created and migration script ran, but Services don't appear in Sanity Studio sidebar even though the config includes it.

## Root Cause Analysis

### What We Know

1. ✅ `sanity.config.ts` includes:

   ```typescript
   S.listItem()
     .title("03 // Services")
     .icon(() => "🏗️")
     .child(S.documentTypeList("service"));
   ```

2. ✅ `src/sanity/schemas/index.ts` exports `serviceSchema`

3. ✅ `src/sanity/schemas/service.ts` exists and is complete (5 groups)

4. ✅ Migration script ran (output showed 5/6 success, then 1/6 on retry = all 6 migrated)

5. ✅ Pages partially wired (detail page uses Sanity fetch)

### Likely Causes

1. **Schema not being imported correctly** — check if `serviceSchema` is in the exports array
2. **Browser cache issue** — browser cached old version without Services
3. **Dev server needs restart** — Studio doesn't hot-reload schema changes
4. **Sanity project not synced** — API token permissions issue
5. **Static data fallback** — pages might still be reading from `src/content/services/index.ts`

## Investigation Steps

### Step 1: Verify Schema Registration

**Check file:** `src/sanity/schemas/index.ts`

```typescript
// Should have:
import serviceSchema from "./service";

export const schemaTypes: SchemaTypeDefinition[] = [
  projectSchema,
  journalSchema,
  serviceSchema, // ← THIS MUST EXIST
];
```

**Fix if missing:**

```bash
# Line near schemaTypes array should include:
serviceSchema,
```

### Step 2: Verify Sanity Project Connection

**In Studio (http://localhost:3000/admin):**

1. Open Vision tool (right sidebar)
2. Run query:
   ```groq
   *[_type == "service"]
   ```
3. Should return 6 documents

**If returns empty:**

- [ ] Check `.env.local` has correct `SANITY_API_TOKEN`
- [ ] Verify token has "read" + "write" permissions in Sanity project settings
- [ ] Re-run migration: `npm run migrate:services`

### Step 3: Restart Studio with Clean Cache

```bash
# Stop the dev server
Ctrl+C

# Clear Next.js cache
rm -r .next

# Clear Sanity config cache
rm -r .sanity

# Restart
npm run dev
```

### Step 4: Test in Vision Tool

Once Studio restarts:

1. Go to `/admin`
2. Click "Vision" in top right
3. Paste query:
   ```groq
   *[_type == "service" && slug.current == "architecture"][0]
   ```
4. Should show full Architecture service document

**If query returns `null`:**

- Services weren't migrated properly
- Run: `npm run migrate:services`
- Check output for errors

### Step 5: Verify Pages Are Sanity-First

**File:** `src/app/(site)/services/page.tsx`

Should look like:

```typescript
import { getServices } from "@/sanity/lib"; // ✅ From Sanity lib

export default async function ServicesPage() {
  const services = await getServices();

  if (!services || services.length === 0) {
    console.warn("No services from Sanity");
    return <div>No services available</div>;
  }

  // Render services
}
```

**❌ Wrong pattern (static fallback):**

```typescript
import { getServices } from "@/content/services"; // ❌ Static data!
```

## Quick Fix Checklist

- [ ] 1. Verify `serviceSchema` is in `src/sanity/schemas/index.ts` exports array
- [ ] 2. Stop dev server (`Ctrl+C`)
- [ ] 3. Clear caches: `rm -r .next .sanity`
- [ ] 4. Restart: `npm run dev`
- [ ] 5. Open `/admin` and check sidebar for "03 // Services"
- [ ] 6. If still missing, test Vision query: `*[_type == "service"]`
- [ ] 7. If Vision returns empty, run: `npm run migrate:services`
- [ ] 8. Verify pages use `getServices` from `@/sanity/lib` (not static)

## Expected Result

After fixes:

1. **In Studio:** Services section appears in sidebar with 🏗️ icon
2. **In Vision:** `*[_type == "service"]` returns 6 documents
3. **On website:** `/services` shows all 6 services from Sanity (not static)
4. **On website:** `/services/architecture` shows real Sanity data

## Verification Commands

```bash
# 1. Check TypeScript (should be 0 errors)
npx tsc --noEmit

# 2. Check ESLint on services files (should be 0 errors)
npx eslint "src/app/(site)/services/**/*.tsx" src/sanity/lib/fetch.ts

# 3. Try building
npm run build

# 4. In Vision tool, run:
*[_type == "service"] | order(order asc)
# Should return array of 6 services with all fields populated
```

## If Services Still Don't Appear

**Nuclear option:** Manually create one service in Studio

1. Go to `/admin`
2. Click "Create"
3. Select "Service" from list
4. Fill in minimal fields:
   - Title: "Test Service"
   - Slug: "test-service" (auto-generate from title)
   - Short Description: "Test"
   - Intro: "Test intro"
   - Description: "Test description"
   - Approach: Add 1 point with title + statement
   - Order: 99
5. Publish
6. Sidebar should update automatically

If still not visible, schema is not registered. Go back to Step 1.

## Long-term Fix

The services implementation is correct but incomplete. Recommendation:

1. **Complete Services wiring:** Verify detail pages and related projects work
2. **Move to Team schema:** Build out Team, Studio, Careers following same pattern
3. **100% Sanity migration:** All content eventually comes from Sanity, zero static fallback
4. **ISR configuration:** Set revalidation times for each content type (projects: 1h, journal: 30m, services: 24h)

See `COMPREHENSIVE-SANITY-INTEGRATION-PROMPT.md` for full specification.
