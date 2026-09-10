/**
 * Site Settings Migration Script
 *
 * Migrates the global site settings singleton (`siteSettings`) into Sanity.
 *
 * Usage: node scripts/migrate-site-settings-to-sanity.mjs
 */

import { assetFromPublic, client, imageField } from "./lib/sanity.mjs";

async function migrateSiteSettings() {
  console.log("🚀 Starting Site Settings Migration\n");

  const existing = await client.fetch(`*[_type == "siteSettings"][0]._id`);
  if (existing) {
    console.log(`⏭️  Site settings already exist (${existing}), skipping...`);
    console.log("\n   To re-run, delete the existing siteSettings document first.");
    return;
  }

  const ogImage = await assetFromPublic("/images/studio/studio-atelier.jpg");

  const doc = {
    _type: "siteSettings",
    siteName: "RAFA Design Hub",
    tagline: "Architecture & Interior Design // Porto",
    description:
      "RAFA Design Hub is an architecture and interior design studio in Porto, Portugal, building less and building better through context, materiality and craft.",
    siteUrl: "https://www.rafadesignhub.com",
    defaultSeo: {
      title: "RAFA Design Hub — Architecture & Interior Design Studio",
      description:
        "RAFA Design Hub is an architecture and interior design studio in Porto building spaces that shape how we live, work and connect.",
      keywords: [
        "architecture",
        "interior design",
        "Porto",
        "studio",
        "residential architecture",
        "cultural architecture",
      ],
      ogImage: imageField(ogImage, {
        alt: "RAFA Design Hub — Architecture & Interior Design Studio",
      }),
    },
    email: "studio@rafadesign.com",
    phone: "+351 220 000 000",
    maintenanceMode: false,
  };

  const result = await client.create(doc);
  console.log(`✅ Site settings migrated successfully (ID: ${result._id})`);
}

migrateSiteSettings().catch((error) => {
  console.error("💥 Migration failed:", error);
  process.exit(1);
});
