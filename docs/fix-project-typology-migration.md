# Fix Project Typology Migration

## Overview

This document describes the migration script created to fix the `typology` field in Sanity project documents.

**Issue:** Some project documents stored typology as a string (e.g., `"Residential"`) while the current schema defines it as an array of strings (e.g., `["residential"]`).

**Solution:** A migration script that converts string typology values to single-item arrays, automatically normalizing them to lowercase-hyphenated format.

## Files Created/Modified

### New Files

- `scripts/fix-project-typology-strings.mjs` — The migration script

### Modified Files

- `package.json` — Added `migrate:fix-typology` npm script

## Script Features

### 1. Connects to Sanity

- Uses the shared Sanity client from `scripts/lib/sanity.mjs`
- Reads credentials from `.env.local` environment variables
- Uses write-capable token (`SANITY_API_TOKEN`)

### 2. Queries Projects with GROQ

```groq
*[_type == "project"] { _id, _rev, title, typology }
```

- Fetches all project documents
- Inspects `typology` field for each document
- Includes both published and draft documents

### 3. Converts String to Array

For each project, the script:

1. **Checks if typology is missing** → Skips (marks as "no action needed")
2. **Checks if typology is already an array** → Skips (idempotent)
3. **Checks if typology is a string** → Converts to array with normalization
4. **Checks if typology is unexpected type** → Skips with warning

### 4. Normalization Process

String values are normalized to lowercase-hyphenated format:

- `"Residential"` → `["residential"]`
- `"Mixed Use"` → `["mixed-use"]`
- `"Urban Design"` → `["urban-design"]`

Normalization steps:

- Trim whitespace
- Convert to lowercase
- Replace spaces with hyphens

### 5. Patches Documents

Uses Sanity's patch API:

```javascript
await client.patch(id).set({ typology: normalizedTypology }).commit();
```

### 6. Idempotency

The script is fully idempotent:

- Already-fixed documents (arrays) are skipped
- Missing typology is skipped
- Multiple runs produce the same result
- Safe to re-run without side effects

### 7. Error Handling

- Catches and logs individual document patch failures
- Reports summary statistics
- Exits with error code (1) if any patches failed
- Exits with success code (0) if all processed successfully

## Usage

### Run the Migration

```bash
npm run migrate:fix-typology
```

### Example Output

```
🔍 Querying projects with string typology values...

Found 7 total projects.

   ✅ atelier-norte — typology already an array, no action needed
   ✅ casa-monte — typology already an array, no action needed
   ✅ drafts.casa-monte — typology already an array, no action needed
   ⏭️  drafts.largo-gallery — typology missing, skipping
   ✅ largo-gallery — typology already an array, no action needed
   ✅ urban-residence — typology already an array, no action needed
   ✅ villa-marim — typology already an array, no action needed

═══════════════════════════════════════════════
✨ Migration Complete!
   Fixed: 0
   Skipped (no action needed): 7
   Errors: 0
   Total processed: 7/7
═══════════════════════════════════════════════
```

## Verification

### In Sanity Studio

1. Open a project document in Sanity Studio
2. Navigate to the "01 // Identity & Classification" group
3. Check the "Typology" field
4. Verify it displays as an array tag field (not an invalid property error)

### In Console/Terminal

- No "Invalid property" errors in the browser console
- No schema validation warnings in Sanity Studio
- Projects display normally in the studio list view

## Technical Details

### Schema Definition

From `src/sanity/schemas/project.ts`:

```typescript
defineField({
  name: "typology",
  title: "Typology",
  type: "array",
  group: "identity",
  of: [{ type: "string" }],
  options: {
    layout: "tags",
    list: [
      { title: "Residential", value: "residential" },
      { title: "Commercial", value: "commercial" },
      { title: "Cultural", value: "cultural" },
      // ... more options
    ],
  },
  validation: (Rule) =>
    Rule.required()
      .min(1)
      .custom((typologies: string[] | undefined) => {
        // Validates format: lowercase-with-hyphens
        // Checks for duplicates
      }),
});
```

### Valid Typology Values

- `residential`
- `commercial`
- `cultural`
- `adaptive-reuse`
- `public`
- `institutional`
- `mixed-use`
- `industrial`
- `infrastructure`
- `hospitality`
- `healthcare`
- `educational`
- `retail`
- `sports-recreation`
- `religious`

## Migration Status

**Execution Date:** [Date of migration]
**Status:** Complete
**Documents Fixed:** 0 (all projects already correct)
**Documents Skipped:** 7 (no action needed)
**Errors:** 0

All projects in the dataset already have the correct typology format (arrays). No conversions were required.

## Future Considerations

- If future data imports use string typology values, this script can be re-run safely
- The script is production-ready and can be used on any Sanity dataset
- Consider running this periodically after batch imports
- Monitor for schema validation errors in Sanity Studio

## Related Documentation

- `src/sanity/schemas/project.ts` — Project schema definition
- `scripts/lib/sanity.mjs` — Shared Sanity client setup
- `.env.local` — Required environment variables
