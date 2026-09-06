/**
 * Service Array Keys Fix Script
 *
 * Adds `_key` to every object item in service document arrays (`approach`,
 * `relatedProjects`). Items created via the API client without `_key` surface a
 * "Missing keys" warning in Sanity Studio and cannot be edited until keys exist.
 *
 * Applies to both published and draft documents.
 *
 * Usage: node scripts/fix-service-array-keys.mjs
 */

import { randomUUID } from "crypto";

import { client } from "./lib/sanity.mjs";

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

function withKeys(items) {
  if (!Array.isArray(items)) return null;
  let changed = false;
  const patched = items.map((item) => {
    if (item && typeof item === "object" && typeof item._key !== "string") {
      changed = true;
      return { ...item, _key: key() };
    }
    return item;
  });
  return changed ? patched : null;
}

async function fixDocuments() {
  console.log("🔍 Finding service documents with array items missing `_key`...\n");

  const published = await client.fetch(`*[_type == "service"]{ _id }`);
  const drafts = await client.fetch(`*[_type == "service" && _id in path("drafts.**")]{ _id }`);
  const ids = [...new Set([...published.map((d) => d._id), ...drafts.map((d) => d._id)])];

  let fixed = 0;
  for (const id of ids) {
    const doc = await client.getDocument(id);
    const patch = {};
    for (const field of ["approach", "relatedProjects"]) {
      const patched = withKeys(doc[field]);
      if (patched) patch[field] = patched;
    }

    if (Object.keys(patch).length === 0) {
      console.log(`   ✅ ${id} — already has keys`);
      continue;
    }

    await client.patch(id).set(patch).commit();
    console.log(`   🔧 ${id} — added _key to ${Object.keys(patch).join(", ")}`);
    fixed++;
  }

  console.log("\n═══════════════════════════════════════════════");
  console.log(`✨ Complete! Documents fixed: ${fixed}/${ids.length}`);
  console.log("═══════════════════════════════════════════════");
}

fixDocuments().catch((error) => {
  console.error("💥 Fix failed:", error);
  process.exit(1);
});
