/**
 * Diagnose Project Typology Field Data Types
 *
 * This diagnostic script queries the Sanity dataset to identify which project
 * documents have typology stored as a string (not as an array).
 *
 * Issue: The schema defines typology as an array of strings, but some documents
 * may have string values from earlier migrations or manual entry.
 *
 * This script:
 * 1. Fetches all projects from Sanity
 * 2. For each project, checks if typology is a string type
 * 3. Reports the _id, title, and actual typology value
 * 4. Shows exactly which documents need to be fixed
 *
 * Usage: node scripts/diagnose-typology-strings.mjs
 */

import { client } from "./lib/sanity.mjs";

async function diagnoseTypologyStrings() {
  console.log("🔍 Querying all projects to identify typology data types...\n");

  // Fetch all projects with _id, title, and typology
  const query = `*[_type == "project"] { _id, title, typology }`;

  let projects = [];
  try {
    projects = await client.fetch(query);
  } catch (error) {
    console.error("💥 Failed to query projects:", error.message);
    process.exit(1);
  }

  console.log(`Found ${projects.length} total projects.\n`);

  const results = {
    stringTypology: [],
    arrayTypology: [],
    nullTypology: [],
    otherTypes: [],
  };

  // Analyze each project
  for (const project of projects) {
    const { _id, title, typology } = project;

    if (typeof typology === "string") {
      results.stringTypology.push({
        _id,
        title,
        typology,
      });
    } else if (Array.isArray(typology)) {
      results.arrayTypology.push({
        _id,
        title,
        typology,
      });
    } else if (typology === null || typology === undefined) {
      results.nullTypology.push({
        _id,
        title,
      });
    } else {
      results.otherTypes.push({
        _id,
        title,
        typology,
        detectedType: typeof typology,
      });
    }
  }

  // Print results
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log("📊 TYPOLOGY DATA TYPE ANALYSIS");
  console.log("═══════════════════════════════════════════════════════════════════\n");

  // String typology (problematic)
  console.log(`⚠️  STRING TYPOLOGY (${results.stringTypology.length} documents - NEED FIXING):`);
  if (results.stringTypology.length > 0) {
    results.stringTypology.forEach((doc) => {
      console.log(`   • ${doc._id}`);
      console.log(`     Title: "${doc.title}"`);
      console.log(`     Typology Value: "${doc.typology}" (type: string)`);
      console.log("");
    });
  } else {
    console.log("   (none)\n");
  }

  // Array typology (correct)
  console.log(`✅ ARRAY TYPOLOGY (${results.arrayTypology.length} documents - CORRECT):`);
  if (results.arrayTypology.length > 0) {
    results.arrayTypology.slice(0, 5).forEach((doc) => {
      console.log(`   • ${doc._id}`);
      console.log(`     Title: "${doc.title}"`);
      console.log(`     Typology Value: [${doc.typology.map((t) => `"${t}"`).join(", ")}]`);
      console.log("");
    });
    if (results.arrayTypology.length > 5) {
      console.log(
        `   ... and ${results.arrayTypology.length - 5} more documents with correct array format\n`,
      );
    }
  } else {
    console.log("   (none)\n");
  }

  // Null/undefined typology
  console.log(`⏭️  NULL/UNDEFINED TYPOLOGY (${results.nullTypology.length} documents):`);
  if (results.nullTypology.length > 0) {
    console.log(`   ${results.nullTypology.length} documents have no typology value set\n`);
  } else {
    console.log("   (none)\n");
  }

  // Other types (unexpected)
  console.log(`❓ OTHER TYPES (${results.otherTypes.length} documents - UNEXPECTED):`);
  if (results.otherTypes.length > 0) {
    results.otherTypes.forEach((doc) => {
      console.log(`   • ${doc._id}`);
      console.log(`     Title: "${doc.title}"`);
      console.log(
        `     Typology Value: ${JSON.stringify(doc.typology)} (detected type: ${doc.detectedType})`,
      );
      console.log("");
    });
  } else {
    console.log("   (none)\n");
  }

  // Summary
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log("📈 SUMMARY");
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log(`Total Projects: ${projects.length}`);
  console.log(`  • String typology (needs fixing): ${results.stringTypology.length}`);
  console.log(`  • Array typology (correct): ${results.arrayTypology.length}`);
  console.log(`  • Null/undefined typology: ${results.nullTypology.length}`);
  console.log(`  • Other types: ${results.otherTypes.length}`);
  console.log("═══════════════════════════════════════════════════════════════════\n");

  // Exit code
  if (results.stringTypology.length > 0) {
    console.log(
      `⚠️  ACTION NEEDED: ${results.stringTypology.length} project(s) have string typology values.`,
    );
    console.log("   Run 'node scripts/fix-project-typology-strings.mjs' to fix them.\n");
    process.exit(1);
  } else {
    console.log("✨ All projects have correct typology data types!\n");
    process.exit(0);
  }
}

// Execute the diagnostic
diagnoseTypologyStrings().catch((error) => {
  console.error("💥 Diagnostic failed:", error.message || JSON.stringify(error));
  process.exit(1);
});
