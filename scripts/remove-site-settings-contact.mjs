/**
 * Site Settings Contact Removal Script
 *
 * Removes the redundant `email` and `phone` fields from the `siteSettings`
 * singleton document.
 *
 * Contact details are managed exclusively in the dedicated `contact`
 * document; Site Settings is not a second source of truth for contact
 * information. The fields were removed from the Studio schema, so stored
 * values are unset to keep the dataset in sync and avoid "Unknown field found"
 * warnings.
 *
 * Usage: node scripts/remove-site-settings-contact.mjs
 */

import { client } from "./lib/sanity.mjs";

const TYPE = "siteSettings";
const FIELDS = ["email", "phone"];

async function removeContactFields() {
  console.log("🔍 Inspecting siteSettings for contact fields...\n");

  const doc = await client.fetch(`*[_type == $type][0]`, { type: TYPE });

  if (!doc) {
    console.log("⚠️  No siteSettings document found — nothing to do.");
    return;
  }

  const present = FIELDS.filter((field) => field in doc);

  if (present.length === 0) {
    console.log("✅ siteSettings carries no contact fields — already clean.");
    return;
  }

  console.log(`📊 Found fields to remove on "${doc._id}":`);
  for (const field of present) {
    console.log(`   - ${field}: "${doc[field]}"`);
  }
  console.log("");

  await client.patch(doc._id).unset(present).commit();
  console.log(`   ✅ Removed: ${present.join(", ")}`);

  console.log("\n═══════════════════════════════════════════════");
  console.log("✨ Cleanup complete!");
  console.log("═══════════════════════════════════════════════");
}

removeContactFields().catch((error) => {
  console.error("💥 Cleanup failed:", error);
  process.exit(1);
});
