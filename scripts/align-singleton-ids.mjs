/**
 * Singleton ID Alignment Script
 *
 * Renames each singleton document to its canonical `_id` (equal to its `_type`)
 * so the Studio structure items can navigate straight to a fixed document ID
 * (the professional singleton pattern: `S.editor().documentId(type)`).
 *
 * Before this, singletons were created by the migration scripts with random
 * `_id`s and opened via `S.documentTypeList`, which is why they appeared as an
 * empty "documents of this type" list. This script:
 *
 *   1. For each singleton that already has a document with a random `_id`,
 *      copies it to the canonical `_id` and removes the old copy (same
 *      transaction).
 *   2. Creates an empty `pageIntros` document at its canonical `_id` if none
 *      exists. Empty fields fall through to the static `pageContent` defaults.
 *
 * Usage: node scripts/align-singleton-ids.mjs
 */

import { client } from "./lib/sanity.mjs";

const SINGLETONS = ["studio", "careers", "contact", "siteSettings", "pageIntros"];

const SYSTEM_FIELDS = new Set(["_id", "_rev", "_createdAt", "_updatedAt", "_type", "_key"]);

function normalize(doc, canonicalId) {
  const data = Object.fromEntries(Object.entries(doc).filter(([key]) => !SYSTEM_FIELDS.has(key)));
  return { ...data, _id: canonicalId, _type: doc._type };
}

async function alignSingleton(type) {
  // Prefer the published document; fall back to any document (e.g. draft).
  const doc = await client.fetch(`*[_type == $type][0]`, { type });

  if (doc) {
    if (doc._id === type) {
      console.log(`⏭️  ${type}: already canonical (_id = "${type}"), skipping.`);
      return;
    }

    const tx = client.transaction().create(normalize(doc, type)).delete(doc._id);

    // Also clear any draft lingering under the previous random id.
    const draftId = `drafts.${doc._id}`;
    const hasDraft = await client.fetch(`*[_id == $id][0]._id`, { id: draftId });
    if (hasDraft) tx.delete(draftId);

    await tx.commit();
    console.log(`✅ ${type}: renamed ${doc._id} -> ${type}`);
    return;
  }

  // No document exists — create an empty canonical one so the structure item
  // opens an editor immediately. Empty fields use the static fallback.
  const result = await client.create({ _type: type, _id: type });
  console.log(`✅ ${type}: created empty document (${result._id}).`);
}

async function main() {
  console.log("🚀 Aligning singleton document IDs\n");

  for (const type of SINGLETONS) {
    await alignSingleton(type);
  }

  console.log("\n✅ Singleton alignment complete.");
}

main().catch((error) => {
  console.error("💥 Alignment failed:", error);
  process.exit(1);
});
