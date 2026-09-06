/**
 * Stale Services Icon Cleanup Script
 *
 * Removes the legacy `icon` field from service documents.
 *
 * The `icon` field was part of an older services schema and has been removed
 * from `src/sanity/schemas/service.ts`. Documents still carrying the field
 * surface a "Unknown field found" warning in Sanity Studio, so the stored data
 * is aligned with the current schema (the field is not read anywhere).
 *
 * Usage: node scripts/cleanup-stale-service-icons.mjs
 */

import { client } from "./lib/sanity.mjs";

async function cleanupStaleIcons() {
  console.log("🔍 Searching for service documents with a stale `icon` field...\n");

  const docs = await client.fetch(
    `*[_type == "service" && defined(icon)]{ _id, title, slug, icon }`,
  );

  if (docs.length === 0) {
    console.log("✅ No service documents carry the stale `icon` field.");
    return;
  }

  console.log(`📊 Found ${docs.length} document(s) to clean:`);
  for (const doc of docs) {
    console.log(`   - ${doc.title} (${doc.slug?.current}) icon: "${doc.icon}"`);
  }
  console.log("");

  let updated = 0;
  for (const doc of docs) {
    try {
      await client.patch(doc._id).unset(["icon"]).commit();
      console.log(`   ✅ Removed icon from: ${doc.title}`);
      updated++;
    } catch (error) {
      console.error(`   ❌ Failed to update ${doc.title}: ${error.message}`);
    }
  }

  console.log("\n═══════════════════════════════════════════════");
  console.log(`✨ Cleanup complete!`);
  console.log(`   Updated: ${updated}/${docs.length}`);
  console.log("═══════════════════════════════════════════════");
}

cleanupStaleIcons().catch((error) => {
  console.error("💥 Cleanup failed:", error);
  process.exit(1);
});
