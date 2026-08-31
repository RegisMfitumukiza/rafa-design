# COMPREHENSIVE SANITY CMS INTEGRATION PROMPT

## Executive Summary

This document provides a complete, end-to-end specification for integrating all Sanity CMS content schemas (Projects, Journal, Services, Team, Studio, Careers, Contact) into the RAFA Design website. The integration follows industrial real-world patterns with 100% Sanity migration (no hybrid fallback), TypeScript 0-errors discipline, and production-grade implementation.

**Current Status:**

- ✅ Projects: 100% Sanity (working)
- ✅ Journal: 100% Sanity (working)
- ⚠️ Services: Schema created, data migrated, but **not fully wired** — sidebar shows but data fetch incomplete
- ❌ Team: Not started
- ❌ Studio: Not started
- ❌ Careers: Not started
- ❌ Contact: Not started

---

## PART 1: INVESTIGATION & DIAGNOSIS

### Current Implementation Issues

**Services Problem (Why sidebar shows but no data):**

1. **Static vs. Sanity mismatch:** `src/content/services/index.ts` contains hardcoded static services data
2. **Pages partially wired:** Detail page uses `getServiceBySlug()` from Sanity, but listing page might still reference static data
3. **Missing data fetch verification:** Services pages don't verify they're getting real Sanity data
4. **No Studio UI integration test:** Haven't tested creating/editing services in Studio UI

**What exists:**

- ✅ `src/sanity/schemas/service.ts` - schema complete (5 groups)
- ✅ `src/sanity/lib/queries.ts` - GROQ queries added
- ✅ `src/sanity/lib/transforms.ts` - transforms added
- ✅ `src/sanity/lib/fetch.ts` - `getServices()`, `getServiceBySlug()`, `getServiceSlugs()`
- ✅ Migration script (`scripts/migrate-services-to-sanity.mjs`) - 6 services migrated to Sanity
- ✅ Pages updated (`src/app/(site)/services/page.tsx`, `src/app/(site)/services/[slug]/page.tsx`)
- ❌ **Not verified:** Services appearing in sidebar vs. being queryable in Studio

**Next steps:**

1. Verify Sanity documents exist by running GROQ query in Vision tool
2. Test that detail pages render real Sanity data (not static fallback)
3. Complete Team, Studio, Careers, Contact schemas and integrations

---

## PART 2: COMPLETE SANITY SCHEMA SPECIFICATIONS

### Schema Order (Documentation Hierarchy)

Implement in this order:

1. **Projects** ✅ (complete)
2. **Journal** ✅ (complete)
3. **Services** ⚠️ (complete but verify)
4. **Team Members** (next)
5. **Studio Settings** (next)
6. **Careers** (next)
7. **Contact Submissions** (next)
8. **Site Settings** (singleton, last)

### 3. SERVICES SCHEMA ⚠️ (Verify & Complete)

**File:** `src/sanity/schemas/service.ts` (already exists — verify)

**Status Check:**

```bash
# In Sanity Vision tool:
*[_type == "service"]
# Should return 6 documents (Architecture, Interior Design, Landscape, Urban, Renovation, Consulting)

# For each service:
*[_type == "service" && slug.current == "architecture"][0]
# Should show all 5 groups populated: Content, Approach, References, Configuration, SEO
```

**If Services missing from sidebar:**

1. Clear browser cache and restart Studio dev server
2. Re-run migration: `npm run migrate:services`
3. Check `.env.local` has correct `SANITY_API_TOKEN` with write permissions

---

### 4. TEAM SCHEMA (New)

**File to create:** `src/sanity/schemas/team.ts`

**Purpose:** Team members listed on `/team` page

**Structure (4 groups):**

```
01 // Content
  - name (string, required)
  - slug (slug auto from name)
  - title (string) — e.g., "Founding Director"
  - bio (text) — 100-300 chars
  - email (string, optional)
  - phone (string, optional)

02 // Media
  - portrait (image + alt, required)
  - credentials[] (string array) — e.g., "Diploma AAM", "RIBA"

03 // References
  - projects[] (references to project documents) — projects this person led/collaborated on
  - experience[] (object array)
    - company (string)
    - role (string)
    - years (string, e.g., "2015–2020")

04 // Configuration
  - order (number) — display order in team listing
  - category (string) — "Director", "Associate", "Intern", etc.
  - displayOnTeamPage (boolean) — exclude from public listing if false
```

**Data to migrate:**

- Check `src/content/team` or similar for existing team data
- If exists: create migration script `scripts/migrate-team-to-sanity.mjs`
- If not: create 3-5 seed documents manually in Studio

---

### 5. STUDIO SCHEMA (New)

**File to create:** `src/sanity/schemas/studio.ts`

**Purpose:** Studio (workspace) information and details

**Structure (3 groups):**

```
01 // Content
  - title (string) — e.g., "RAFA Design Studio"
  - slug (slug auto from title)
  - description (text) — long-form description
  - founded (number) — founding year
  - location (string) — primary office location

02 // Media
  - heroImage (image + alt)
  - studioPhotos[] (images) — gallery of studio/workspace photos

03 // References
  - notableProjects[] (references to project documents) — featured works
  - teamMembers[] (references to team documents) — key people
  - affiliations[] (string array) — professional organizations
```

**Data:** Create 1 singleton document (or single document) with studio info

---

### 6. CAREERS SCHEMA (New)

**File to create:** `src/sanity/schemas/career.ts`

**Purpose:** Job postings and career opportunities

**Structure (5 groups):**

```
01 // Content
  - title (string, required) — job title
  - slug (slug auto from title)
  - location (string) — office location
  - type (string enum) — "Full-time", "Part-time", "Internship", "Contract"
  - description (text, required) — job description
  - requirements (text) — key skills/experience needed
  - salary (string, optional) — e.g., "€45–60k"

02 // Timeline
  - postedAt (datetime) — when posted
  - closesAt (datetime, optional) — application deadline
  - status (string enum) — "Open", "Closed", "On Hold"

03 // Application
  - applicationUrl (url, optional) — external application link
  - applicationEmail (string, optional) — email for applications
  - contactPerson (reference to team member, optional)

04 // SEO
  - seo.title (string)
  - seo.description (text)
  - seo.keywords (string array)

05 // Configuration
  - featured (boolean) — highlight on careers page
  - order (number)
```

**Data:** Create 2-3 sample job postings

---

### 7. CONTACT SCHEMA (New)

**File to create:** `src/sanity/schemas/contact.ts`

**Purpose:** Store contact form submissions (CMS records, not submission service)

**Structure (3 groups):**

```
01 // Message
  - name (string, required)
  - email (string, required)
  - phone (string, optional)
  - message (text, required) — message body
  - subject (string, optional)

02 // Metadata
  - submittedAt (datetime, auto-set)
  - status (string enum) — "New", "Read", "Replied", "Archived"
  - internalNotes (text, optional) — private team notes
  - assignedTo (reference to team member, optional)

03 // Configuration
  - tags[] (string array) — for filtering/organizing messages
```

**Note:** Contact form still posts to backend (Resend API, etc.), but Sanity stores records for review in Studio

---

### 8. SITE SETTINGS SCHEMA (Singleton)

**File to create:** `src/sanity/schemas/siteSettings.ts`

**Purpose:** Global site configuration

**Structure (1 document type, no groups):**

```
- name: "siteSettings" (singleton, single document)
- fields:
  - title (string) — "RAFA Design"
  - tagline (string) — short site tagline
  - description (text) — site meta description
  - email (string) — hello@rafa.design
  - phone (string)
  - address (text)
  - socialLinks (object array)
    - platform (string enum) — "Instagram", "LinkedIn", "Twitter", "YouTube"
    - url (string)
  - analyticsCode (string) — Google Analytics ID
  - maintenanceMode (boolean) — if true, show maintenance page
  - maintenanceMessage (text)
```

**Config:** Use `definePlugin` to make singleton appear at top of Studio

---

## PART 3: COMPLETE PAGE WIRING

### Pages to Wire

#### 3.1 Services (Current Issue — Fix)

**File:** `src/app/(site)/services/page.tsx`

**Current code:**

```typescript
import { getServices } from "@/sanity/lib";
// ... but it might also reference static @/content/services
```

**Fix:**

```typescript
// ✅ ONLY fetch from Sanity, never fallback to static
import { getServices } from "@/sanity/lib";
import { getServicesDescription, pageContent } from "@/content/pages";

export default async function ServicesPage() {
  const services = await getServices(); // Sanity only

  // Verify we got data
  if (!services || services.length === 0) {
    console.warn("No services found in Sanity");
    return <ErrorPage message="Services not available" />;
  }

  return (
    // ... rest of page
  );
}
```

**Listing order:** `order` field from Sanity (already implemented)

---

#### 3.2 Services Detail

**File:** `src/app/(site)/services/[slug]/page.tsx`

**Status:** Already async with proper project resolution ✅

**Verify:**

- `generateStaticParams()` calls `getServices()` from Sanity
- `generateMetadata()` uses Sanity data for SEO
- Detail page renders Sanity content, not static fallback

---

#### 3.3 Team Page (New)

**File to create:** `src/app/(site)/team/page.tsx`

**Structure:**

```typescript
import { getTeamMembers } from "@/sanity/lib";

export const dynamic = "force-static"; // ISR for team updates

export async function generateMetadata() {
  return {
    title: "Our Team",
    description: "Meet the architects and designers at RAFA",
  };
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <Section container="wide">
      <h1>Team</h1>
      <div className="grid grid-cols-3 gap-4">
        {teamMembers.map(member => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </Section>
  );
}
```

**Detail page (optional):** `src/app/(site)/team/[slug]/page.tsx`

- Shows full bio, projects led, experience timeline
- Uses `generateStaticParams()` from Sanity slugs

---

#### 3.4 Studio Page (New)

**File to create:** `src/app/(site)/studio/page.tsx`

**Structure:**

```typescript
import { getStudioInfo } from "@/sanity/lib";

export default async function StudioPage() {
  const studio = await getStudioInfo();

  return (
    <>
      <StudioHero studio={studio} />
      <StudioAbout studio={studio} />
      <StudioGallery studio={studio} />
      <StudioProjects studio={studio} />
      <StudioTeam studio={studio} />
    </>
  );
}
```

---

#### 3.5 Careers Page (New)

**File to create:** `src/app/(site)/careers/page.tsx`

**Structure:**

```typescript
import { getCareers } from "@/sanity/lib";

export default async function CareersPage() {
  const openings = await getCareers();

  return (
    <>
      <CareersHero />
      <CareersListings openings={openings} />
      <CareersApplySection />
    </>
  );
}
```

**Detail page (optional):** `src/app/(site)/careers/[slug]/page.tsx`

---

#### 3.6 Contact Page (Existing — Update)

**File:** `src/app/(site)/contact/page.tsx` (likely exists)

**Update:**

- Form submission still posts to backend API
- Backend stores in Sanity via `client.create()` if needed
- Frontend only reads Site Settings for contact info (email, phone, address)

---

## PART 4: SANITY LIB FUNCTIONS

### Files to Create/Update

#### `src/sanity/lib/queries.ts`

Add queries for new schemas:

```typescript
// Team
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

export const teamMemberBySlugQuery = `*[_type == "team" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  title,
  bio,
  email,
  phone,
  portrait{asset->{_id, url}, alt},
  credentials,
  projects[]->{_id, slug, title},
  experience[]{company, role, years}
}`;

// Studio
export const studioInfoQuery = `*[_type == "studio"][0] {
  _id,
  title,
  slug,
  description,
  founded,
  location,
  heroImage{asset->{_id, url}, alt},
  studioPhotos[]{asset->{_id, url}, alt},
  notableProjects[]->{_id, slug, title},
  teamMembers[]->{_id, name, title, portrait{asset->{url}, alt}},
  affiliations
}`;

// Careers
export const careersQuery = `*[_type == "career" && status == "Open"] | order(featured desc, postedAt desc) {
  _id,
  title,
  slug,
  location,
  type,
  description,
  requirements,
  salary,
  postedAt,
  closesAt,
  applicationUrl,
  applicationEmail,
  contactPerson->{name, email},
  featured,
  order
}`;

export const careerBySlugQuery = `*[_type == "career" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  location,
  type,
  description,
  requirements,
  salary,
  postedAt,
  closesAt,
  applicationUrl,
  applicationEmail,
  contactPerson->{name, email},
  seo{title, description, keywords}
}`;

// Site Settings (singleton)
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  tagline,
  description,
  email,
  phone,
  address,
  socialLinks[]{platform, url},
  analyticsCode,
  maintenanceMode,
  maintenanceMessage
}`;
```

---

#### `src/sanity/lib/transforms.ts`

Add transforms for new types:

```typescript
export interface SanityTeamMember {
  _id: string;
  name: string;
  slug: { current: string };
  title: string;
  bio: string;
  email?: string;
  phone?: string;
  portrait: { asset: { _id: string; url: string }; alt?: string };
  credentials: string[];
  projects: { _id: string; slug: { current: string }; title: string }[];
  experience: { company: string; role: string; years: string }[];
  order: number;
  category: string;
}

export function transformSanityTeamMember(sanityMember: SanityTeamMember): TeamMember {
  return {
    id: sanityMember._id,
    slug: sanityMember.slug.current,
    name: sanityMember.name,
    title: sanityMember.title,
    bio: sanityMember.bio,
    email: sanityMember.email,
    phone: sanityMember.phone,
    portrait: {
      src: sanityMember.portrait.asset.url,
      alt: sanityMember.portrait.alt || sanityMember.name,
    },
    credentials: sanityMember.credentials,
    projectSlugs: sanityMember.projects.map((p) => p.slug.current),
    experience: sanityMember.experience,
    order: sanityMember.order,
    category: sanityMember.category,
  };
}

export function transformSanityTeamMembers(sanityMembers: SanityTeamMember[]): TeamMember[] {
  return sanityMembers.map(transformSanityTeamMember);
}

// Similar for Studio, Careers, SiteSettings...
```

---

#### `src/sanity/lib/fetch.ts`

Add fetch functions:

```typescript
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
  try {
    const { teamMemberBySlugQuery } = await import("./queries");
    const { transformSanityTeamMember } = await import("./transforms");
    const sanityMember = await client.fetch(teamMemberBySlugQuery, { slug });
    if (!sanityMember) return null;
    return transformSanityTeamMember(sanityMember);
  } catch (error) {
    console.error(`Error fetching team member ${slug}:`, error);
    return null;
  }
}

export async function getStudioInfo(): Promise<StudioInfo | null> {
  try {
    const { studioInfoQuery } = await import("./queries");
    const { transformSanityStudio } = await import("./transforms");
    const sanityStudio = await client.fetch(studioInfoQuery);
    if (!sanityStudio) return null;
    return transformSanityStudio(sanityStudio);
  } catch (error) {
    console.error("Error fetching studio info:", error);
    return null;
  }
}

export async function getCareers(): Promise<CareerOpening[]> {
  try {
    const { careersQuery } = await import("./queries");
    const { transformSanityCareers } = await import("./transforms");
    const sanityCareers = await client.fetch(careersQuery);
    return transformSanityCareers(sanityCareers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const { siteSettingsQuery } = await import("./queries");
    const { transformSanitySettings } = await import("./transforms");
    const sanitySettings = await client.fetch(siteSettingsQuery);
    if (!sanitySettings) return null;
    return transformSanitySettings(sanitySettings);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}
```

---

#### `src/sanity/lib/index.ts`

Export new functions:

```typescript
export {
  getTeamMembers,
  getTeamMemberBySlug,
  getStudioInfo,
  getCareers,
  getCareerBySlug,
  getSiteSettings,
  // ... existing exports
} from "./fetch";
```

---

## PART 5: CONTENT TYPES & INTERFACES

### Create TypeScript interfaces for new types

**File to create:** `src/content/team.ts`

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
  experience: { company: string; role: string; years: string }[];
  order: number;
  category: string;
}
```

**File to create:** `src/content/studio.ts`

```typescript
export interface StudioInfo {
  id: string;
  title: string;
  slug: string;
  description: string;
  founded: number;
  location: string;
  heroImage: { src: string; alt: string };
  studioPhotos: Array<{ src: string; alt: string }>;
  notableProjectSlugs: string[];
  teamMemberIds: string[];
  affiliations: string[];
}
```

**File to create:** `src/content/careers.ts`

```typescript
export interface CareerOpening {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  description: string;
  requirements: string;
  salary?: string;
  postedAt: string;
  closesAt?: string;
  status: "Open" | "Closed" | "On Hold";
  applicationUrl?: string;
  applicationEmail?: string;
  contactPersonName?: string;
  featured: boolean;
  order: number;
}
```

---

## PART 6: STUDIO CONFIGURATION

### Update `sanity.config.ts`

```typescript
import { structureTool } from "sanity/structure";

// Update structure to include all content types
structureTool({
  structure: (S) =>
    S.list()
      .title("RAFA CMS")
      .items([
        // 01 // Projects
        S.listItem()
          .title("01 // Projects")
          .icon(() => "📐")
          .child(S.documentTypeList("project")),

        // 02 // Journal
        S.listItem()
          .title("02 // Journal")
          .icon(() => "📰")
          .child(S.documentTypeList("journalArticle")),

        // 03 // Services
        S.listItem()
          .title("03 // Services")
          .icon(() => "🏗️")
          .child(S.documentTypeList("service")),

        // 04 // Team
        S.listItem()
          .title("04 // Team")
          .icon(() => "👥")
          .child(S.documentTypeList("team")),

        // 05 // Studio
        S.listItem()
          .title("05 // Studio")
          .icon(() => "🎨")
          .child(S.documentTypeList("studio")),

        // 06 // Careers
        S.listItem()
          .title("06 // Careers")
          .icon(() => "💼")
          .child(S.documentTypeList("career")),

        // 07 // Messages
        S.listItem()
          .title("07 // Messages")
          .icon(() => "💌")
          .child(S.documentTypeList("contact")),

        // 08 // Settings
        S.listItem()
          .title("08 // Settings")
          .icon(() => "⚙️")
          .child(S.documentTypeList("siteSettings")),
      ]),
}),
```

---

## PART 7: MIGRATION SCRIPTS

### For each new schema, create migration scripts:

**`scripts/migrate-team-to-sanity.mjs`**

- Check if team data exists in static files
- Create migration for each team member
- Set order, category, displayOnTeamPage

**`scripts/migrate-studio-to-sanity.mjs`**

- Create single studio document
- Populate with studio info, affiliations, notable projects

**`scripts/migrate-careers-to-sanity.mjs`**

- Migrate existing job postings if any
- Create sample postings for testing

**`scripts/migrate-contact-to-sanity.mjs`**

- Optional: if existing contact submissions exist, migrate them

**Update `package.json`:**

```json
{
  "scripts": {
    "migrate:services": "node scripts/migrate-services-to-sanity.mjs",
    "migrate:team": "node scripts/migrate-team-to-sanity.mjs",
    "migrate:studio": "node scripts/migrate-studio-to-sanity.mjs",
    "migrate:careers": "node scripts/migrate-careers-to-sanity.mjs",
    "migrate:all": "npm run migrate:services && npm run migrate:team && npm run migrate:studio && npm run migrate:careers"
  }
}
```

---

## PART 8: VERIFICATION CHECKLIST

### Before marking complete, verify:

**Schema Registration:**

- [ ] All 8 schemas appear in `src/sanity/schemas/index.ts` exports
- [ ] All 8 schemas appear in `schemaTypes` array
- [ ] All schemas import correctly (no circular dependencies)

**Sanity Studio:**

- [ ] TypeScript builds: `npx tsc --noEmit` (0 errors)
- [ ] ESLint passes: `npm run lint` (0 errors on new files)
- [ ] Studio starts: `npm run dev`
- [ ] All 8 content types appear in `/admin` sidebar
- [ ] Can create/edit documents in each type
- [ ] Can see documents in Vision tool

**Pages Wired:**

- [ ] Services listing shows Sanity data (not static fallback)
- [ ] Services detail renders Sanity content
- [ ] Team page exists and shows all team members
- [ ] Team detail pages work with dynamic routes
- [ ] Studio page renders studio info
- [ ] Careers page lists open positions
- [ ] Career detail page shows full posting
- [ ] Contact page shows site settings info

**Exports & Imports:**

- [ ] All fetch functions exported from `src/sanity/lib/index.ts`
- [ ] All types exported from content files
- [ ] Pages import from Sanity lib (not static content)
- [ ] Import order follows ESLint rules

**Data Consistency:**

- [ ] Services detail page shows related projects correctly
- [ ] Team member pages show project association
- [ ] Studio page shows team members and notable projects
- [ ] All images load correctly
- [ ] All references resolve (no broken links)

**Performance:**

- [ ] `generateStaticParams()` returns complete list for ISR
- [ ] GROQ queries are optimized (no N+1)
- [ ] Image optimization applied (next/image)
- [ ] Build completes: `npm run build`

---

## PART 9: TROUBLESHOOTING COMMON ISSUES

### Services not showing in sidebar

**Symptom:** Services section added to `sanity.config.ts` but doesn't appear

**Solution:**

1. Clear browser cache: `Ctrl+Shift+Del`
2. Restart Studio dev server: stop `npm run dev`, restart
3. Verify schema is in `schemaTypes` array
4. Check `.env.local` has correct project ID and dataset

### Pages still showing static data

**Symptom:** Services pages render but don't show Sanity data

**Solution:**

```typescript
// ✅ CORRECT: Import from Sanity lib
import { getServices } from "@/sanity/lib";

// ❌ WRONG: Don't import from static content
import { getServices as getStaticServices } from "@/content/services";
```

### Build fails with "Cannot find name 'Service'"

**Solution:** Add type import to `src/sanity/lib/fetch.ts`:

```typescript
import type { Service } from "@/content/services";
```

### GROQ queries return null

**Solution:** Test in Vision tool (`/admin` → Vision):

```
*[_type == "service"][0]
# Should show one document
```

If returns null:

1. Run migration: `npm run migrate:services`
2. Check Sanity project ID matches `.env.local`
3. Verify API token has read/write permissions

---

## PART 10: DEPLOYMENT CHECKLIST

Before deploying to production:

- [ ] All TypeScript compiles (0 errors)
- [ ] All ESLint passes (0 warnings)
- [ ] All pages build: `npm run build`
- [ ] No console errors in browser dev tools
- [ ] All Sanity queries tested in Vision tool
- [ ] Contact info updated in Site Settings
- [ ] SEO fields filled for all content types
- [ ] Images optimized and have alt text
- [ ] All links tested (no 404s)
- [ ] Analytics code set in Site Settings
- [ ] Team members marked `displayOnTeamPage: true`
- [ ] Career postings status set correctly
- [ ] Maintenance mode disabled in Site Settings
- [ ] ISR revalidation times configured appropriately

---

## SUMMARY

This specification provides:

1. ✅ Complete schema definitions for 8 content types
2. ✅ GROQ queries for each type
3. ✅ TypeScript transforms and interfaces
4. ✅ Fetch utilities for pages
5. ✅ Page templates for each section
6. ✅ Migration scripts for data population
7. ✅ Studio configuration with sidebar structure
8. ✅ Verification checklist
9. ✅ Troubleshooting guide
10. ✅ Deployment checklist

**Estimated completion time:** 2-3 days full implementation

**Next AI agent:** Can implement all 8 schemas, pages, queries, and transforms following this specification exactly. Start with Part 2 (complete Services fix), then move through Parts 3-7 sequentially.
