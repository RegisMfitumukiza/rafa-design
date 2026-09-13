/**
 * Fix Project Typology Field Migration Script
 *
 * Converts typology field values from strings to arrays for projects.
 *
 * Issue: Some project documents store typology as a string (e.g., "Residential")
 * but the schema now defines it as an array of strings.
 *
 * This script:
 * 1. Queries all projects where typology exists and is a string (not an array)
 * 2. For each affected project, converts the string value to a single-item array
 * 3. Patches the documents with the corrected typology array
 * 4. Reports the number of documents fixed
 * 5. Is idempotent (doesn't double-convert already-fixed documents)
 *
 * Usage: node scripts/fix-project-typology-strings.mjs
 */

import { client } from "./lib/sanity.mjs";

/**
 * Check if a value is a string
 */
function isString(value) {
  return typeof value === "string";
}

/**
 * Check if a value is an array
 */
function isArray(value) {
  return Array.isArray(value);
}

/**
 * Convert a string typology to an array with lowercase-hyphenated format
 */
function normalizeTypology(value) {
  if (!value) return null;

  // Already an array? Return as-is
  if (isArray(value)) return value;

  // String? Convert to array with normalized format
  if (isString(value)) {
    // Normalize: trim, lowercase, replace spaces with hyphens
    const normalized = value.trim().toLowerCase().replace(/\s+/g, "-");

    return [normalized];
  }

  // Invalid type? Skip
  return null;
}

async function fixProjectTypology() {
  console.log("🔍 Querying projects with string typology values...\n");

  // Query all projects and fetch the documents to inspect typology field
  const query = `*[_type == "project"] { _id, _rev, title, typology }`;
  const projects = await client.fetch(query);

  console.log(`Found ${projects.length} total projects.\n`);

  let fixed = 0;
  let skipped = 0;
  let errors = 0;

  // Process each project
  for (const project of projects) {
    const { _id, title, typology } = project;

    // Skip if typology is missing
    if (typology === undefined || typology === null) {
      console.log(`   ⏭️  ${_id} — typology missing, skipping`);
      skipped++;
      continue;
    }

    // Skip if typology is already an array (already fixed or created correctly)
    if (isArray(typology)) {
      console.log(`   ✅ ${_id} — typology already an array, no action needed`);
      skipped++;
      continue;
    }

    // Skip if typology is not a string (unexpected type)
    if (!isString(typology)) {
      console.log(`   ⚠️  ${_id} — typology has unexpected type (${typeof typology}), skipping`);
      skipped++;
      continue;
    }

    try {
      // Convert string to array
      const normalizedTypology = normalizeTypology(typology);

      if (!normalizedTypology) {
        console.log(`   ⚠️  ${_id} — failed to normalize typology value, skipping`);
        errors++;
        continue;
      }

      // Patch the document with the array
      await client.patch(_id).set({ typology: normalizedTypology }).commit();

      console.log(
        `   🔧 ${_id} ("${title}") — converted "${typology}" → [${normalizedTypology.map((t) => `"${t}"`).join(", ")}]`,
      );
      fixed++;
    } catch (error) {
      console.error(`   💥 ${_id} — patch failed: ${error.message || JSON.stringify(error)}`);
      errors++;
    }
  }

  console.log("\n═══════════════════════════════════════════════");
  console.log(`✨ Migration Complete!`);
  console.log(`   Fixed: ${fixed}`);
  console.log(`   Skipped (no action needed): ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total processed: ${fixed + skipped + errors}/${projects.length}`);
  console.log("═══════════════════════════════════════════════");

  if (errors > 0) {
    process.exit(1);
  }
}

// Execute the migration
fixProjectTypology().catch((error) => {
  console.error("💥 Migration failed:", error.message || JSON.stringify(error));
  process.exit(1);
});
