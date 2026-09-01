# Company Pages Sanity Integration — Team / Studio / Careers / Contact / Site Settings

**Date:** 2026-08-31
**Status:** ✅ Production Ready
**Phase:** 16 — Optimization (CMS completion)

---

## Executive Summary

The Sanity CMS integration — previously covering Projects (`docs/33`), Journal, and Services — is now extended to the **entire company surface** and the **global site configuration**:

- **Team** (`/studio` team grid + dossier)
- **Studio** (`/studio` identity, principles, methods, history, evidence, visit)
- **Careers** (`/careers` page + `/careers` job postings)
- **Contact** (`/contact` info, offices, socials, editorial image)
- **Site Settings** (global identity, SEO defaults, organisation, operational)

Every page is now **Sanity-first**: it fetches from Sanity and renders a fallback when content is missing. No hardcoded content is used on these pages. The integration reuses the established services pattern (schema → query → transform → fetch) with **no new architecture** and **no duplicated components**.

---

## Architecture Decision (MAP 1:1, NOT a new model)

Rather than inventing the `team/career` model proposed in the handoff spec, the new Sanity schemas map **1:1 onto the existing content types**:

| Sanity type                | Content type (existing)                                       | Page                       |
| -------------------------- | ------------------------------------------------------------- | -------------------------- |
| `teamMember`               | `TeamMember` (`src/content/studio`)                           | Studio team grid + dossier |
| `studio` (singleton)       | `Studio` + `awards`/`timeline`/`clientSectors`                | `/studio`                  |
| `career`                   | `CareerPosition` (`src/content/company/careers`)              | Careers positions          |
| `careers` (singleton)      | `CareersContent` + `benefits` (`src/content/company/careers`) | `/careers`                 |
| `contact` (singleton)      | `ContactInformation` (`src/content/company/contact`)          | `/contact`                 |
| `siteSettings` (singleton) | `SiteSettings` (new `src/content/siteSettings.ts`)            | global                     |

Because the schemas mirror the existing typed content, the transform layer is thin and pages switch with near-zero component breakage.

---

## Added

### Schemas (`src/sanity/schemas/`)

- `team.ts` — `teamMember`: name, slug, role, biography, disciplines[], experience, interests[], portrait image, email, phone, socialLinks[], order, category, displayOnTeamPage, SEO override (4 groups).
- `studio.ts` — `studio` singleton: identity (name/overline/manifesto/introduction/philosophy), principles (`beliefs` → `principle`), methods (`workingMethods` → `workingMethod`), media (`images[]`), history (`history`/`timeline`→`timelineEvent`/`awards`→`award`/`clientSectors`→`clientSector`/`clientReferencesNote`), `visit` (5 groups).
- `career.ts` — `career` document: slug, title, location, `type` (full-time/internship/contract), description, requirements[], applicationLink, order, status, featured, SEO.
- `careers.ts` — `careers` singleton: `hero`, `openApplication`, `benefits[]` (→ `benefit`), `studioImage`.
- `contact.ts` — `contact` singleton: details (email/phone/address/coordinates/projectTypes[]), `offices[]` (→ `office`), `socialLinks[]` (→ `socialLink`), `editorialImage` (4 groups).
- `siteSettings.ts` — `siteSettings` singleton: identity (siteName/tagline/description/siteUrl), `defaultSeo`, organisation (email/phone), operational (analyticsCode/maintenanceMode/maintenanceMessage) (4 groups).

All 9 schemas are registered in `src/sanity/schemas/index.ts`.

### Data layer

- `src/sanity/lib/queries.ts` — `teamQuery`, `studioQuery`, `careersPositionsQuery`, `careerBySlugQuery`, `careerSlugsQuery`, `careersQuery`, `contactQuery`, `siteSettingsQuery` (full projections incl. image asset `url`/metadata).
- `src/sanity/lib/transforms.ts` — `transformSanityTeamMember(s)`, `transformSanityStudio`, `transformSanityStudioCollections`, `transformSanityCareer(s)`, `transformSanityCareersPage`, `transformSanityContact`, `transformSanitySiteSettings` + `transformSocialLinks`, `transformOffice`, `sanitizeId`.
- `src/sanity/lib/fetch.ts` — `getTeamMembers`, `getStudioInfo`, `getStudioCollections`, `getStudioHistory`, `getCareers`, `getCareerBySlug`, `getCareerSlugs`, `getCareersPageContent`, `getContactInformation`, `getSiteSettings`.
- `src/sanity/lib/index.ts` — exports all new transforms + fetch functions.
- `src/content/siteSettings.ts` — `SiteSettings` interface.

### Pages (Sanity-first)

- `src/app/(site)/studio/page.tsx` — `Promise.all` of `getStudioInfo` / `getTeamMembers` / `getStudioCollections` / `getStudioHistory`; returns `null` without a studio.
- `src/app/(site)/careers/page.tsx` — fetches `getCareers` / `getCareersPageContent` / `getContactInformation`.
- `src/app/(site)/contact/page.tsx` — fetches `getContactInformation`; returns `null` when absent; passes `contactInfo.offices` → `OfficeMap` and `editorialImage`/`email` → `ContactEditorial`.
- `src/features/contact/office-map.tsx` — now accepts `offices: Office[]` (removed static import).
- `src/features/contact/contact-editorial.tsx` — now accepts `editorialImage`/`email` props (removed static import).

### Studio config (`sanity.config.ts`)

9 structure sections (01 Projects / 02 Journal / 03 Services / 04 Team / 05 Studio / 06 Careers / 07 Careers Page / 08 Contact / 09 Site Settings). Singleton documents (`studio`, `careers`, `contact`, `siteSettings`) hide create/delete/publish/unpublish/duplicate actions.

### Migrations

`scripts/migrate-{team,studio,careers,contact,site-settings}-to-sanity.mjs` + shared `scripts/lib/sanity.mjs` (client + `assetFromPublic` upload + `imageField` helper). Run all five via `npm run migrate:company`. Idempotent (skip existing by slug / singleton query) and upload the local `/public` placeholder images as real Sanity assets.

Migrated into the production dataset and verified: 4 team members, 1 studio, 1 careers page + 4 positions, 1 contact (2 offices), 1 siteSettings.

---

## Data Flow

```
Sanity Studio → Sanity Database → GROQ Query → Transform → Next.js Page (async, null-fallback) → Components
   /admin       (production)      fetch.ts      transforms.ts             pages                     props
```

---

## Site-Wide Social Links (Sanity-First)

As of **2026-09-01**, the footprint social links and contact details are Sanity-driven everywhere, not just on the three company pages:

- New client `ContactProvider` (`src/features/contact/contact-provider.tsx`) + `useContact()` (`contact-context.ts`) expose the Sanity `contact` document to every client surface, with a static fallback to `src/content/company/contact.ts` when the fetch fails.
- `(site)/layout.tsx` became async — it fetches `getContactInformation()` once and feeds the provider.
- Server-rendering consumers that cannot use context fetch directly: `visit-studio.tsx` (async `getContactInformation()` with static fallback) and root `layout.tsx` JSON-LD (`organizationSchema(contact)` → `sameAs` social profiles).
- Converted surfaces: `Footer`, `fullscreen-navigation`, `landing` + `LandingSocialStrip`, `visit-studio`, `contact-form`.

The static `contact.ts` module is retained as the **typed fallback shape** (offline safety / interface source of truth), not the live data source. Real profile URLs are edited in one place: **Sanity Studio → Contact → Social Links**.

## Verification

- `npm run typecheck` → 0 errors.
- Targeted `eslint` on all changed files → 0 errors / 0 warnings.
- `npm run build` → 32 static routes; `/studio`, `/careers`, `/contact` all `○` (static).
- Rendered server HTML confirms migrated content renders (studio manifesto, all 4 team member names, `PRINCIPLE`/`SECTOR` indexes, careers heading + benefits, contact email/offices).
- Rendered homepage HTML contains the Sanity social profile URLs.

---

## Notes

- Contact **form submissions** remain handled by the existing Resend `/api/contact` backend — the CMS stores the studio's public contact details, not submission records.
- The team `slug` field is used as the stable `TeamMember.id` (no per-member detail route exists).
- Placeholder photography was migrated only to complete the data flow; real client photography remains a content deliverable.

---

## Related Documentation

- `docs/33-sanity-integration-complete.md` — Projects CMS integration
- `docs/31-sanity-schema-validation.md` — Schema field alignment
- `docs/20-content-models.md` — Content model reference
- `src/sanity/lib/queries.ts` — GROQ query reference
- `sanity.config.ts` — Studio structure
