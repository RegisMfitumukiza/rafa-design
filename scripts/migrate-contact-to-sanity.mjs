/**
 * Contact Migration Script
 *
 * Migrates the contact information singleton (`contact`) into Sanity,
 * including offices, social links, project types, and editorial image.
 *
 * Usage: node scripts/migrate-contact-to-sanity.mjs
 */

import { assetFromPublic, client, imageField } from "./lib/sanity.mjs";

async function migrateContact() {
  console.log("🚀 Starting Contact Migration\n");

  const existing = await client.fetch(`*[_type == "contact"][0]._id`);
  if (existing) {
    console.log(`⏭️  Contact document already exists (${existing}), skipping...`);
    console.log("\n   To re-run, delete the existing contact document first.");
    return;
  }

  // Office images
  const portoImage = await assetFromPublic("/images/studio/studio-materials.jpg");
  const lisbonImage = await assetFromPublic("/images/studio/studio-atelier.jpg");
  const editorialImage = await assetFromPublic("/images/studio/studio-atelier.jpg");

  const doc = {
    _type: "contact",
    email: "studio@rafadesign.com",
    phone: "+351 220 000 000",
    address: "Rua do Patio 42, 4000-000 Porto",
    coordinates: "41.1579° N, 8.6291° W",
    projectTypes: [
      "Architecture",
      "Interior Design",
      "Renovation",
      "Landscape Design",
      "Urban Design",
      "Other",
    ],
    offices: [
      {
        _type: "office",
        name: "Porto Atelier",
        city: "Porto",
        country: "Portugal",
        address: "Rua do Patio 42, 4000-000 Porto",
        coordinates: "41.1579° N, 8.6291° W",
        hours: "09:00 – 18:00 WET",
        phone: "+351 220 000 000",
        mapsUrl: "https://maps.google.com/?q=41.1579,-8.6291",
        image: imageField(portoImage, {
          alt: "RAFA Design Hub Porto Atelier exterior and entry",
          caption: "Porto Atelier – Historic centre, Porto",
        }),
      },
      {
        _type: "office",
        name: "Lisbon Studio",
        city: "Lisbon",
        country: "Portugal",
        address: "Avenida da Liberdade 110, 1250-146 Lisboa",
        coordinates: "38.7223° N, 9.1393° W",
        hours: "09:00 – 18:00 WET",
        phone: "+351 210 000 000",
        mapsUrl: "https://maps.google.com/?q=38.7223,-9.1393",
        image: imageField(lisbonImage, {
          alt: "RAFA Design Hub Lisbon Studio workspace",
          caption: "Lisbon Studio – Avenida da Liberdade, Lisbon",
        }),
      },
    ],
    socialLinks: [
      { _type: "socialLink", platform: "instagram", url: "https://instagram.com/rafadesign" },
      { _type: "socialLink", platform: "linkedin", url: "https://linkedin.com/company/rafadesign" },
      { _type: "socialLink", platform: "behance", url: "https://behance.net/rafadesign" },
      { _type: "socialLink", platform: "pinterest", url: "https://pinterest.com/rafadesign" },
    ],
    editorialImage: imageField(editorialImage, {
      alt: "RAFA Design Hub practice atelier working environment",
      caption: "The practice atelier in Porto – material studies and working models",
    }),
  };

  const result = await client.create(doc);
  console.log(`✅ Contact document migrated successfully (ID: ${result._id})`);
}

migrateContact().catch((error) => {
  console.error("💥 Migration failed:", error);
  process.exit(1);
});
