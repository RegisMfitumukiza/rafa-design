# Handoff Instructions for Next AI Agent

## Objective

Complete the full Sanity CMS integration for RAFA Design website, implementing all 8 content schemas (Projects ✅, Journal ✅, Services ⚠️, Team ❌, Studio ❌, Careers ❌, Contact ❌, Settings ❌) with 100% Sanity migration, zero hybrid fallback, and production-grade TypeScript/ESLint compliance.

## Current State

### What's Done ✅

- Projects schema: fully migrated, pages working
- Journal schema: fully migrated, pages working
- Services schema: created, migration ran, but **needs verification** (sidebar issue)
- Sanity client configured and working
- GROQ query patterns established
- Transform/fetch utility patterns established

### What's Not Done ❌

- Services verification (possible browser cache issue)
- Team schema and migration
- Studio schema and migration
- Careers schema and migration
- Contact schema and migration
- Site Settings schema
- All pages for new schemas
- Complete GROQ queries for new types
- Migration scripts for new types

## Key Documents to Read FIRST

**MUST READ IN ORDER:**

1. `COMPREHENSIVE-SANITY-INTEGRATION-PROMPT.md` — Complete spec for all 8 schemas (2000+ lines)
2. `SERVICES-MISSING-INVESTIGATION.md` — Why Services sidebar isn't showing
3. `AGENTS.md` — Project guidelines (no hardcoding, design system, TypeScript 0-errors)

**Reference Files:**

- `src/sanity/schemas/service.ts` — Template for new schemas (5-group pattern)
- `src/sanity/lib/queries.ts` — GROQ query patterns
- `src/sanity/lib/transforms.ts` — Transform function patterns
- `src/sanity/lib/fetch.ts` — Fetch utility patterns
- `sanity.config.ts` — Studio structure pattern

## Exact Steps to Complete

### Phase 1: Fix Services (30 minutes)

**1.1 Verify Schema Registration**

```bash
# Check src/sanity/schemas/index.ts line ~18-22
# Should have:
#   import serviceSchema from "./service";
#   ...
#   export const schemaTypes: SchemaTypeDefinition[] = [
#     projectSchema,
#     journalSchema,
#     serviceSchema,  ← MUST EXIST
#   ];

# If serviceSchema is missing from array, add it
# File: src/sanity/schemas/index.ts, line ~22 add: serviceSchema,
```

**1.2 Restart Studio and Clear Cache**

```bash
# Stop dev server
Ctrl+C

# Clear caches
rm -r .next
rm -r .sanity

# Start fresh
npm run dev

# Should see "compiled successfully"
```

**1.3 Verify in Studio**

1. Open http://localhost:3000/admin
2. Look for "03 // Services" with 🏗️ icon in left sidebar
3. If visible, click it → should show 6 services

**1.4 Test Vision Query**

1. In `/admin`, click "Vision" (right sidebar)
2. Paste: `*[_type == "service"]`
3. Should return array of 6 services

**If Services appear:** Phase 1 done ✅
**If Services missing:** Run migration again:

```bash
npm run migrate:services
```

---

### Phase 2: Implement Team Schema (2-3 hours)

**2.1 Create Team Schema**

Create file: `src/sanity/schemas/team.ts`

Use pattern from `src/sanity/schemas/service.ts`:

- Copy structure
- Replace "service" references with "team"
- Implement 4 groups: Content, Media, References, Configuration
- Fields: name, slug, title, bio, email, phone, portrait, credentials, projects[], experience[], order, category, displayOnTeamPage

**Reference:** COMPREHENSIVE-SANITY-INTEGRATION-PROMPT.md → "4. TEAM SCHEMA"

**2.2 Register Team Schema**

File: `src/sanity/schemas/index.ts`

```typescript
import teamSchema from "./team";

export const schemaTypes: SchemaTypeDefinition[] = [
  projectSchema,
  journalSchema,
  serviceSchema,
  teamSchema, // ← ADD THIS
];

export { projectSchema, journalSchema, serviceSchema, teamSchema };
```

**2.3 Add Team Queries**

File: `src/sanity/lib/queries.ts`

Add:

```typescript
export const teamMembersQuery = `*[_type == "team" && displayOnTeamPage != false] | order(order asc) {
  _id,
  name,
  slug,
  title,
  bio,
  email,
  phone,
  portrait {
    asset->{_id, url, metadata{dimensions, lqip}},
    alt
  },
  credentials,
  projects[]->{_id, slug, title},
  experience[]{company, role, years},
  order,
  category
}`;

export const teamMemberBySlugQuery = `*[_type == "team" && slug.current == $slug][0] {...}`;
export const teamSlugsQuery = `*[_type == "team"].slug.current`;
```

**2.4 Add Team Transforms**

File: `src/sanity/lib/transforms.ts`

Add interfaces and transform functions (reference: COMPREHENSIVE-SANITY-INTEGRATION-PROMPT.md → "PART 5")

**2.5 Add Team Fetch Functions**

File: `src/sanity/lib/fetch.ts`

```typescript
import type { TeamMember } from "@/content/team";

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const { teamMembersQuery } = await import("./queries");
    const { transformSanityTeamMembers } = await import("./transforms");
    const sanityMembers = await client.fetch(teamMembersQuery);
    return transformSanityTeamMembers(sanityMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  // Similar pattern to getServiceBySlug
}

export async function getTeamSlugs(): Promise<string[]> {
  // Similar pattern to getServiceSlugs
}
```

**2.6 Create Team Content Types**

File: `src/content/team.ts`

```typescript
export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  email?: string;
  phone?: string;
  portrait: { src: string; alt: string };
  credentials: string[];
  projectSlugs: string[];
  experience: Array<{ company: string; role: string; years: string }>;
  order: number;
  category: string;
}
```

**2.7 Export from Sanity Lib**

File: `src/sanity/lib/index.ts`

```typescript
export { getTeamMembers, getTeamMemberBySlug, getTeamSlugs } from "./fetch";
```

**2.8 Update Studio Config**

File: `sanity.config.ts`

Add to structure (after Services):

```typescript
S.listItem()
  .title("04 // Team")
  .icon(() => "👥")
  .child(S.documentTypeList("team").defaultOrdering([{ field: "order", direction: "asc" }])),
```

**2.9 Create Migration Script**

File: `scripts/migrate-team-to-sanity.mjs`

(Check if team data exists in codebase first)

**2.10 Create Team Pages**

Files:

- `src/app/(site)/team/page.tsx` — listing page
- `src/app/(site)/team/[slug]/page.tsx` — detail page (optional)

---

### Phase 3: Implement Remaining Schemas (3-4 hours)

**3.1-3.3: Studio Schema**

- File: `src/sanity/schemas/studio.ts` (1 document, 3 groups)
- Queries: `studioInfoQuery`
- Content type: `src/content/studio.ts`
- Pages: `src/app/(site)/studio/page.tsx`

**3.4-3.6: Careers Schema**

- File: `src/sanity/schemas/career.ts` (5 groups)
- Queries: `careersQuery`, `careerBySlugQuery`, `careerSlugsQuery`
- Content type: `src/content/careers.ts`
- Pages: `src/app/(site)/careers/page.tsx`, `src/app/(site)/careers/[slug]/page.tsx`

**3.7-3.9: Contact Schema**

- File: `src/sanity/schemas/contact.ts` (3 groups, document type for submissions)
- Queries: `contactQuery`, `contactByIdQuery`
- No content type needed (raw Sanity doc)
- Existing contact page: update to show site settings (not submissions)

**3.10-3.12: Site Settings Schema**

- File: `src/sanity/schemas/siteSettings.ts` (1 singleton document)
- Query: `siteSettingsQuery`
- Content type: `src/content/siteSettings.ts`
- Usage: All pages can query for global contact info, social links, maintenance mode

For each schema, follow the exact pattern from Phases 1-2.

---

### Phase 4: Verification & Quality (1-2 hours)

**4.1 TypeScript Check**

```bash
npx tsc --noEmit
# Should be 0 errors
```

**4.2 ESLint Check**

```bash
npm run lint
# Should be 0 errors/warnings on new files
```

**4.3 Build Test**

```bash
npm run build
# Should complete successfully
```

**4.4 Studio Verification**

1. Go to `/admin`
2. All 8 sections should appear in sidebar with correct order and icons
3. Can create/edit documents in each section
4. Vision queries work for each type

**4.5 Pages Verification**

- [ ] `/services` shows services from Sanity
- [ ] `/services/[slug]` shows detail from Sanity
- [ ] `/team` shows team members from Sanity
- [ ] `/team/[slug]` shows detail from Sanity (if created)
- [ ] `/studio` shows studio info from Sanity
- [ ] `/careers` shows open positions from Sanity
- [ ] `/careers/[slug]` shows posting from Sanity
- [ ] `/contact` shows contact info from Site Settings

**4.6 SEO Fields**

- All content types have `seo` object with title, description, keywords
- Pages use `generateMetadata()` from Sanity data

---

## Key Rules to Follow

### Architecture Rules (from AGENTS.md)

- ✅ Prefer composition
- ✅ Keep components small
- ✅ Reuse existing patterns
- ✅ Use feature-first architecture
- ❌ Never hardcode values
- ❌ Never duplicate components
- ❌ Never duplicate architectures

### Design Rules (from AGENTS.md)

- ✅ Use Design System (tokens, typography, spacing, colors)
- ✅ Use CSS variables
- ❌ Never hardcode colors, font sizes, spacing, breakpoints
- ❌ Never hardcode animation durations

### TypeScript Rules

- ✅ 0 errors after `npx tsc --noEmit`
- ✅ All types properly imported
- ✅ No `any` types (use proper interfaces)
- ✅ All async functions properly awaited

### ESLint Rules

- ✅ 0 warnings/errors after `npm run lint`
- ✅ Import order: `next/*` → `@/*` → relative → `@sanity/*`
- ✅ No unused imports
- ✅ React hooks rules followed

---

## Expected Deliverables

When complete:

### 8 Schema Files ✅

- [x] `src/sanity/schemas/project.ts` (existing)
- [x] `src/sanity/schemas/journal.ts` (existing)
- [x] `src/sanity/schemas/service.ts` (existing)
- [ ] `src/sanity/schemas/team.ts` (new)
- [ ] `src/sanity/schemas/studio.ts` (new)
- [ ] `src/sanity/schemas/career.ts` (new)
- [ ] `src/sanity/schemas/contact.ts` (new)
- [ ] `src/sanity/schemas/siteSettings.ts` (new)

### 8 Query Sets in queries.ts ✅

- [x] Projects, Projects by Slug, Project Slugs
- [x] Journal Articles, Article by Slug, Articles by Category, Featured Article, Article Slugs
- [x] Services, Service by Slug, Service Slugs
- [ ] Team, Team by Slug, Team Slugs
- [ ] Studio Info
- [ ] Careers, Career by Slug, Career Slugs
- [ ] Contact, Contact by ID
- [ ] Site Settings

### 8 Transform Sets in transforms.ts ✅

- [x] Projects transforms
- [x] Journal transforms
- [x] Services transforms
- [ ] Team transforms
- [ ] Studio transforms
- [ ] Careers transforms
- [ ] Contact transforms
- [ ] Site Settings transforms

### 8 Content Type Files ✅

- [x] `src/content/projects.ts` (existing)
- [x] `src/content/journal.ts` (existing)
- [x] `src/content/services/index.ts` (existing)
- [ ] `src/content/team.ts` (new)
- [ ] `src/content/studio.ts` (new)
- [ ] `src/content/careers.ts` (new)
- [ ] `src/content/siteSettings.ts` (new)

### Fetch Functions in fetch.ts ✅

- [x] getProjects, getProjectBySlug, getProjectSlugs
- [x] getArticles, getArticleBySlug, etc.
- [x] getServices, getServiceBySlug, getServiceSlugs
- [ ] getTeamMembers, getTeamMemberBySlug, getTeamSlugs
- [ ] getStudioInfo
- [ ] getCareers, getCareerBySlug, getCareerSlugs
- [ ] Contact functions (if needed)
- [ ] getSiteSettings

### Pages ✅

- [x] `/services` (listing)
- [x] `/services/[slug]` (detail)
- [ ] `/team` (listing)
- [ ] `/team/[slug]` (detail, optional)
- [ ] `/studio` (detail page, singleton)
- [ ] `/careers` (listing)
- [ ] `/careers/[slug]` (detail)

### Migration Scripts ✅

- [x] `scripts/migrate-services-to-sanity.mjs` (existing)
- [ ] `scripts/migrate-team-to-sanity.mjs` (new)
- [ ] `scripts/migrate-studio-to-sanity.mjs` (new)
- [ ] `scripts/migrate-careers-to-sanity.mjs` (new)
- [ ] `package.json` updated with all migrate scripts

### Studio Config ✅

- [x] `sanity.config.ts` updated with all 8 sections + icons + ordering

---

## Estimated Timeline

- Phase 1 (Services fix): 30 min
- Phase 2 (Team): 2-3 hours
- Phase 3 (Remaining 4 schemas): 3-4 hours
- Phase 4 (Verification): 1-2 hours

**Total: 7-10 hours of focused work**

---

## How to Verify Success

```bash
# 1. All files compile
npx tsc --noEmit
# Output: no errors

# 2. All lint passes
npm run lint
# Output: 0 errors, 0 warnings on new files

# 3. Build succeeds
npm run build
# Output: "compiled successfully"

# 4. Visit Studio
open http://localhost:3000/admin
# Should see all 8 sections with icons

# 5. Test each type in Vision
*[_type == "team"]
*[_type == "studio"]
*[_type == "career"]
*[_type == "contact"]
*[_type == "siteSettings"]
# All should return documents

# 6. Test pages load
curl http://localhost:3000/team
curl http://localhost:3000/careers
curl http://localhost:3000/studio
# All should render without errors
```

---

## Support References

- Sanity docs: https://www.sanity.io/docs
- GROQ docs: https://www.sanity.io/docs/groq
- Next.js docs: https://nextjs.org/docs
- Project AGENTS.md: Read for all rules
- Project docs/: Read docs/00-documentation-index.md for architecture

---

## Contact Points

If blocked:

1. Check COMPREHENSIVE-SANITY-INTEGRATION-PROMPT.md "PART 9: TROUBLESHOOTING"
2. Run `npm run build` to get full error output
3. Test GROQ queries in Vision tool
4. Verify `.env.local` has correct credentials
5. Check TypeScript: `npx tsc --noEmit`
6. Check ESLint: `npm run lint`

Good luck! This is a straightforward implementation following established patterns. Focus on consistency with existing Project/Journal schemas.
