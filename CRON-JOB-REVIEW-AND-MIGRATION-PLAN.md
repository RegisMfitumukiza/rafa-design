# CRON JOB REVIEW & SANITY MIGRATION PLAN

## Current Cron Job Analysis

### 1. Existing Cron Configuration

**File**: `vercel.json`

```json
{
  "crons": [
    {
      "path": "/api/cron/editorial-reminder",
      "schedule": "0 0 1 * *"
    }
  ]
}
```

**Schedule**: `0 0 1 * *` = **First day of every month at midnight (UTC)**

**Endpoint**: `/api/cron/editorial-reminder`

---

### 2. Current Cron Job Logic

**File**: `src/app/api/cron/editorial-reminder/route.ts`

**Purpose**: Editorial inactivity reminder

**Current Implementation**:

```typescript
// 1. Fetches all articles using getArticles() from local TypeScript
const articles = getArticles();

// 2. Gets the latest article (articles are pre-sorted by date descending)
const latestArticle = articles[0];

// 3. Calculates days/months since latest article
const diffInDays = now - latestArticle.publishedAt;
const diffInMonths = diffInDays / 30.44;

// 4. Checks if inactive (>= 6 months)
const INACTIVE_THRESHOLD_MONTHS = 6;
const isInactive = diffInMonths >= 6;

// 5. Returns JSON payload with warning if inactive
{
  status: "warning" | "active",
  alert: true/false,
  message: "INACTIVE EDITORIAL REMINDER: No new article published for X months",
  latestArticle: { title, slug, publishedAt },
  inactiveDays: number,
  inactiveMonths: number,
  thresholdMonths: 6,
  actionRequired: "Studio admin should publish new content..."
}
```

**Security**: Protected by `CRON_SECRET` environment variable

- Request must include header: `Authorization: Bearer <CRON_SECRET>`
- Skipped in development unless `CRON_SECRET` is set

---

## Assessment: Does This Concern Sanity?

### Your Instinct is **Partially Correct** ✅⚠️

**You're right that**:

- The cron job logic doesn't change conceptually
- The business rule (6-month threshold) stays the same
- The schedule (monthly) stays the same
- The alert payload structure can stay the same

**But you need to update**:

- ✅ **Data source**: Change from `getArticles()` (local TypeScript) to Sanity GROQ query
- ⚠️ **Published vs Draft**: Now you need to query only **published** articles (not drafts)
- ⚠️ **Query efficiency**: Sanity query should be optimized (only fetch latest article)

**The cron job WILL BREAK after Sanity migration if not updated.**

---

## Migration Plan for Cron Job

### Phase 1: Update Data Source (During Journal Migration - Week 2)

**When**: Phase 4 (Journal Migration) - Week 2, Day 3

**What to change**:

**Before (current)**:

```typescript
import { getArticles } from "@/content/journal";

export async function GET(request: Request) {
  const articles = getArticles(); // ❌ Local TypeScript
  const latestArticle = articles[0];
  // ... rest of logic
}
```

**After (with Sanity)**:

```typescript
import { sanityClient } from "@/sanity/lib/client";

export async function GET(request: Request) {
  // Authorization check (unchanged)
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ✅ NEW: Query Sanity for latest PUBLISHED article only
  const latestArticle = await sanityClient.fetch<{
    title: string;
    slug: { current: string };
    publishedAt: string;
  } | null>(
    `*[_type == "journalArticle" && !(_id in path("drafts.**"))] 
     | order(publishedAt desc)[0] {
       title,
       slug,
       publishedAt
     }`,
  );

  if (!latestArticle) {
    return NextResponse.json(
      {
        status: "warning",
        alert: true,
        message: "No articles found in the archive.",
      },
      { status: 200 },
    );
  }

  // Rest of logic unchanged (date calculations, threshold check, payload)
  const latestDate = new Date(latestArticle.publishedAt);
  const now = new Date();
  const diffInMs = now.getTime() - latestDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = parseFloat((diffInDays / 30.44).toFixed(1));

  const INACTIVE_THRESHOLD_MONTHS = 6;
  const isInactive = diffInMonths >= INACTIVE_THRESHOLD_MONTHS;

  const payload = {
    status: isInactive ? "warning" : "active",
    alert: isInactive,
    message: isInactive
      ? `INACTIVE EDITORIAL REMINDER: No new article published for ${diffInMonths} months (${diffInDays} days).`
      : `Editorial archive active. Latest article published ${diffInMonths} months ago.`,
    latestArticle: {
      title: latestArticle.title,
      slug: latestArticle.slug.current, // ✅ Note: Sanity slug is object with .current
      publishedAt: latestArticle.publishedAt,
    },
    inactiveDays: diffInDays,
    inactiveMonths: diffInMonths,
    thresholdMonths: INACTIVE_THRESHOLD_MONTHS,
    actionRequired: isInactive
      ? "Studio admin should compose and publish a new journal story, material study, or project monograph."
      : "None.",
  };

  return NextResponse.json(payload, { status: 200 });
}
```

---

### Key Changes Explained

#### 1. **Data Source**

```typescript
// OLD: Local TypeScript array
const articles = getArticles();
const latestArticle = articles[0]; // Already sorted by your function

// NEW: Sanity GROQ query
const latestArticle = await sanityClient.fetch(
  `*[_type == "journalArticle" && !(_id in path("drafts.**"))] 
   | order(publishedAt desc)[0]`,
);
```

**Why the filter `!(_id in path("drafts.**"))`**:

- Excludes draft articles
- Only counts **published** articles
- Critical: You don't want drafts to reset the inactivity counter

#### 2. **Query Optimization**

```typescript
// ✅ Efficient: Only fetch 1 article, only fetch 3 fields
*[_type == "journalArticle" && !(_id in path("drafts.**"))]
| order(publishedAt desc)[0] {
  title,
  slug,
  publishedAt
}
```

**Why this is better than fetching all articles**:

- Faster (Sanity only processes 1 document)
- Less bandwidth
- Lower API usage costs
- Same result

#### 3. **Slug Access**

```typescript
// OLD: slug is string
latestArticle.slug; // "language-of-light"

// NEW: slug is object
latestArticle.slug.current; // "language-of-light"
```

Sanity slugs are objects with a `.current` property.

---

## Testing the Updated Cron Job

### Local Testing (Before Deployment)

```bash
# 1. Start Next.js dev server
npm run dev

# 2. In another terminal, trigger cron manually
curl http://localhost:8000/api/cron/editorial-reminder \
  -H "Authorization: Bearer your_cron_secret_here"

# Expected response:
{
  "status": "active",
  "alert": false,
  "message": "Editorial archive active. Latest article published 2.1 months ago.",
  "latestArticle": {
    "title": "The Language of Light",
    "slug": "language-of-light",
    "publishedAt": "2024-06-15"
  },
  "inactiveDays": 63,
  "inactiveMonths": 2.1,
  "thresholdMonths": 6,
  "actionRequired": "None."
}
```

### Production Testing (After Deployment)

Vercel will automatically trigger the cron on the 1st of each month.

**Manual test in production**:

```bash
curl https://yourdomain.com/api/cron/editorial-reminder \
  -H "Authorization: Bearer $CRON_SECRET"
```

---

## When to Update This Cron Job

### Recommended Timeline

| Phase         | Task                                   | Status                            |
| ------------- | -------------------------------------- | --------------------------------- |
| **Phase 1-3** | Foundation, Settings, Projects         | ⏭️ Skip cron (not affected)       |
| **Phase 4**   | Journal Migration                      | ✅ **UPDATE CRON HERE**           |
| **Phase 5-9** | Services, Careers, Singletons, Preview | ⏭️ Cron already updated           |
| **Phase 10**  | Cleanup                                | ✅ Test cron with production data |

**Specific moment**: **Week 2, Day 3** - After journal articles are migrated to Sanity

**Why then**:

- Journal content is in Sanity
- GROQ queries are working
- You can test with real Sanity data
- Old `getArticles()` function will be deprecated

---

## No Other Changes Needed

### What Stays the Same ✅

1. **Vercel cron configuration** (`vercel.json`):
   - ✅ Schedule: `0 0 1 * *` (monthly)
   - ✅ Path: `/api/cron/editorial-reminder`
   - ✅ No changes needed

2. **Environment variable**:
   - ✅ `CRON_SECRET` remains the same
   - ✅ Already documented in `.env.example`

3. **Business logic**:
   - ✅ 6-month threshold
   - ✅ Calculation logic (days/months)
   - ✅ Response payload structure
   - ✅ Warning/active status

4. **Security**:
   - ✅ Bearer token authentication
   - ✅ Authorization header check

### What You Don't Need ❌

- ❌ **No new cron jobs**: This is the only one
- ❌ **No Sanity webhooks for this**: Cron runs on schedule, not on content changes
- ❌ **No additional email integration** (unless you want to add it later)

---

## Optional Enhancement: Email Notifications

### Current State

The cron job returns JSON but **doesn't send emails**.

### Optional Addition (Post-Migration)

You could add email notifications using **Resend** (you already have it for contact form):

```typescript
// After detecting inactivity
if (isInactive) {
  // Send email to studio admin
  await resend.emails.send({
    from: "editorial@rafadesign.com",
    to: "owner@rafadesign.com",
    subject: "⚠️ RAFA Journal Inactivity Alert",
    html: `
      <p>No new article published for ${diffInMonths} months (${diffInDays} days).</p>
      <p>Latest article: "${latestArticle.title}" published on ${latestArticle.publishedAt}</p>
      <p>Consider publishing new content to maintain editorial momentum.</p>
    `,
  });
}
```

**Decision**: Add this **after** Sanity migration is complete (Phase 11).

---

## Sanity-Specific Considerations

### 1. **Draft Articles Don't Count**

✅ **Critical**: The query excludes drafts with `!(_id in path("drafts.**"))`

**Why this matters**:

- You might have 3 draft articles in progress
- But if your last **published** article was 7 months ago
- The cron should still alert you
- Drafts don't count toward editorial activity

### 2. **Scheduled Publishing (Future)**

If you later add scheduled publishing:

- An article scheduled for next week counts as a draft today
- Only after it publishes does it reset the inactivity counter
- The cron logic remains correct

### 3. **Performance**

- ✅ Query is optimized (only 1 article, 3 fields)
- ✅ Sanity free tier allows 500k API requests/month
- ✅ 1 cron call/month = 1 query/month
- ✅ Zero performance concern

---

## Summary

### Your Instinct: ✅ Mostly Correct

> "this does not concern sanity"

**Correct in spirit**: The cron job logic, schedule, and purpose don't change.

**But needs update**: The **data source** must change from local TypeScript to Sanity GROQ.

### Action Required

✅ **Now (Pre-Migration)**:

- No action needed
- Cron job continues working with local TypeScript content

✅ **Week 2, Day 3 (During Journal Migration)**:

- Update `/api/cron/editorial-reminder/route.ts`
- Replace `getArticles()` with Sanity GROQ query
- Test with `curl` locally
- Deploy and test in production

✅ **Post-Migration**:

- Cron job works with Sanity content
- Monthly checks continue automatically
- Optionally add email notifications

### Files to Update (1 file)

```
src/app/api/cron/editorial-reminder/route.ts  ← Update data source
```

### Files NOT to Update (1 file)

```
vercel.json  ← Keep as-is (schedule unchanged)
```

---

## Decision Checklist

- [x] Cron job reviewed
- [x] Update plan documented
- [x] Timeline identified (Week 2, Day 3)
- [x] No additional cron jobs needed
- [x] No breaking changes to Vercel config
- [ ] Ready to proceed to Phase 1

---

**You are correct: This is a minor update, not a major blocker.**

The cron job is an easy fix during journal migration. It doesn't affect our ability to start Phase 1 today.

**Recommendation**: Proceed with Phase 1 (Sanity Foundation). We'll update the cron job in Week 2 when we migrate journal content.

---

**Report Prepared**: 2026-08-19  
**Status**: ✅ NO BLOCKERS — PROCEED TO PHASE 1  
**Cron Update Scheduled**: Week 2, Day 3 (Journal Migration)
