/**
 * Fix Missing _key Properties in Material Narratives
 *
 * Adds unique _key to all materialNarrative array items
 * Run with: node scripts/fix-material-keys.mjs
 */

import { randomUUID } from "crypto";

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-08-20",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Helper to generate unique keys
function generateKey() {
  return randomUUID().replace(/-/g, "").substring(0, 12);
}

async function fixMaterialKeys() {
  console.log("🔧 Fixing material narrative keys...\n");

  try {
    // Fetch all projects
    const projects = await client.fetch('*[_type == "project"]{ _id, slug, materialNarrative }');

    let fixedCount = 0;
    let skippedCount = 0;

    for (const project of projects) {
      if (!project.materialNarrative || project.materialNarrative.length === 0) {
        console.log(`⏭️  Skipping ${project.slug.current} (no materials)`);
        skippedCount++;
        continue;
      }

      // Check if any items are missing _key
      const needsFix = project.materialNarrative.some((item) => !item._key);

      if (!needsFix) {
        console.log(`✅ ${project.slug.current} already has keys`);
        skippedCount++;
        continue;
      }

      // Add _key to items that don't have one
      const fixedMaterials = project.materialNarrative.map((item) => {
        if (!item._key) {
          return {
            ...item,
            _key: generateKey(),
          };
        }
        return item;
      });

      // Update the project
      await client.patch(project._id).set({ materialNarrative: fixedMaterials }).commit();

      console.log(`✅ Fixed ${project.slug.current} (${fixedMaterials.length} materials)`);
      fixedCount++;
    }

    console.log("\n" + "=".repeat(60));
    console.log(`\n✨ Summary:`);
    console.log(`   ✅ Fixed: ${fixedCount} projects`);
    console.log(`   ⏭️  Skipped: ${skippedCount} projects`);
    console.log(`   📁 Total: ${projects.length} projects\n`);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

// Run the fix
fixMaterialKeys();
