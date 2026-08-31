/**
 * Team Member Migration Script
 *
 * Migrates the studio team members into Sanity as `teamMember` documents.
 *
 * Usage: node scripts/migrate-team-to-sanity.mjs
 */

import { assetFromPublic, client, imageField } from "./lib/sanity.mjs";

const teamToMigrate = [
  {
    _type: "teamMember",
    name: "Rafael Mendes",
    slug: { _type: "slug", current: "rafael-mendes" },
    role: "Founder & Lead Architect",
    category: "Director",
    experience: 18,
    disciplines: ["Architecture", "Master Planning"],
    interests: ["Monolithic form", "Stone construction", "Site-specific massing"],
    biography:
      "Rafael founded RAFA Design Hub in 2018 after a decade working with respected practices in Lisbon and London. His work is shaped by a deep interest in how architecture mediates between people and the natural environment.",
    email: "rafael@rafadesign.pt",
    phone: "+351 912 000 001",
    imagePath: "/images/team/rafael-mendes.jpg",
    order: 1,
    displayOnTeamPage: true,
    socialLinks: [
      { _type: "socialLink", platform: "linkedin", url: "https://linkedin.com" },
      { _type: "socialLink", platform: "instagram", url: "https://instagram.com" },
      { _type: "socialLink", platform: "website", url: "https://example.com", label: "Portfolio" },
    ],
  },
  {
    _type: "teamMember",
    name: "Sara Costa",
    slug: { _type: "slug", current: "sara-costa" },
    role: "Senior Architect",
    category: "Senior Architect",
    experience: 12,
    disciplines: ["Architecture", "Landscape Integration"],
    interests: ["Topography", "Native planting", "Threshold spaces"],
    biography:
      "Sara brings a background in landscape architecture to every project, ensuring that buildings and their surroundings are conceived as a single, integrated system.",
    email: "sara@rafadesign.pt",
    phone: "+351 912 000 002",
    imagePath: "/images/team/sara-costa.jpg",
    order: 2,
    displayOnTeamPage: true,
    socialLinks: [
      { _type: "socialLink", platform: "linkedin", url: "https://linkedin.com" },
      { _type: "socialLink", platform: "website", url: "https://example.com", label: "Portfolio" },
    ],
  },
  {
    _type: "teamMember",
    name: "Tiago Martins",
    slug: { _type: "slug", current: "tiago-martins" },
    role: "Interior Designer",
    category: "Interior Designer",
    experience: 8,
    disciplines: ["Interior Design"],
    interests: ["Materiality", "Texture", "Sensory atmosphere"],
    biography:
      "Tiago leads the interior design practice, focusing on materiality, texture, and the sensory experience of space. He believes interiors should feel like they have grown out of the architecture.",
    email: "tiago@rafadesign.pt",
    imagePath: "/images/team/tiago-martins.jpg",
    order: 3,
    displayOnTeamPage: true,
    socialLinks: [
      { _type: "socialLink", platform: "instagram", url: "https://instagram.com" },
      { _type: "socialLink", platform: "linkedin", url: "https://linkedin.com" },
      { _type: "socialLink", platform: "pinterest", url: "https://pinterest.com" },
    ],
  },
  {
    _type: "teamMember",
    name: "Ana Pereira",
    slug: { _type: "slug", current: "ana-pereira" },
    role: "Architect & Project Lead",
    category: "Associate",
    experience: 10,
    disciplines: ["Architecture", "Project Delivery"],
    interests: ["Precision detailing", "Site supervision", "Construction logic"],
    biography:
      "Ana manages the studio's project delivery, bringing rigorous attention to detail and a collaborative approach that keeps clients engaged throughout the design and construction process.",
    email: "ana@rafadesign.pt",
    phone: "+351 912 000 004",
    imagePath: "/images/team/ana-pereira.jpg",
    order: 4,
    displayOnTeamPage: true,
    socialLinks: [{ _type: "socialLink", platform: "linkedin", url: "https://linkedin.com" }],
  },
];

async function migrateTeam() {
  console.log("🚀 Starting Team Member Migration\n");
  console.log(`📊 Found ${teamToMigrate.length} team members to migrate\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const member of teamToMigrate) {
    try {
      console.log(`📝 Migrating: ${member.name}`);

      const existing = await client.fetch(
        `*[_type == "teamMember" && slug.current == $slug][0]._id`,
        { slug: member.slug.current },
      );

      if (existing) {
        console.log(`   ⏭️  Already exists (${existing}), skipping...`);
        continue;
      }

      let image = undefined;
      if (member.imagePath) {
        const asset = await assetFromPublic(member.imagePath);
        image = imageField(asset, { alt: member.name });
      }

      const doc = { ...member };
      delete doc.imagePath;
      if (image) doc.image = image;
      else delete doc.image;

      const result = await client.create(doc);
      console.log(`   ✅ Migrated successfully (ID: ${result._id})`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
      errorCount++;
    }

    console.log("");
  }

  console.log("═══════════════════════════════════════════════");
  console.log(`✨ Migration Complete for Team Members!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log("═══════════════════════════════════════════════\n");
}

migrateTeam().catch((error) => {
  console.error("💥 Migration failed:", error);
  process.exit(1);
});
