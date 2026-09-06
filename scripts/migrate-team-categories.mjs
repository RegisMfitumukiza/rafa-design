/**
 * Team Category Seed & Migration Script
 *
 * 1. Seeds default `teamCategory` documents in Sanity (Director, Associate, etc.)
 * 2. Scans all `teamMember` documents (both drafts and published)
 * 3. Converts legacy string `category` values into proper references
 *
 * Usage: node scripts/migrate-team-categories.mjs
 */

import { client } from "./lib/sanity.mjs";

const defaultCategories = [
  { _id: "teamCategory-director", title: "Director", order: 1 },
  { _id: "teamCategory-associate", title: "Associate", order: 2 },
  { _id: "teamCategory-senior-architect", title: "Senior Architect", order: 3 },
  { _id: "teamCategory-architect", title: "Architect", order: 4 },
  { _id: "teamCategory-interior-designer", title: "Interior Designer", order: 5 },
  { _id: "teamCategory-intern", title: "Intern", order: 6 },
];

async function run() {
  console.log("1. Seeding default teamCategory documents...");
  const categoryMap = new Map();

  for (const cat of defaultCategories) {
    const doc = {
      _type: "teamCategory",
      _id: cat._id,
      title: cat.title,
      order: cat.order,
    };
    await client.createOrReplace(doc);
    categoryMap.set(cat.title.toLowerCase(), cat._id);
    console.log(`   ✓ [teamCategory] ${cat.title} (${cat._id})`);
  }

  console.log(
    "\n2. Checking teamMember documents (including open drafts) for legacy string categories...",
  );
  const members = await client.fetch(
    `*[_type == "teamMember" || (_id in path("drafts.**") && _type == "teamMember")]{ _id, name, category }`,
  );
  console.log(`   Found ${members.length} teamMember documents in dataset.`);

  for (const member of members) {
    if (typeof member.category === "string") {
      const catKey = member.category.toLowerCase();
      const targetCatId = categoryMap.get(catKey) || categoryMap.get("director");

      console.log(
        `   Migrating ${member.name} (${member._id}): "${member.category}" -> ref "${targetCatId}"`,
      );

      await client
        .patch(member._id)
        .set({
          category: {
            _type: "reference",
            _ref: targetCatId,
          },
        })
        .commit();
      console.log(`   ✓ Successfully patched ${member.name}`);
    } else if (member.category?._ref) {
      console.log(
        `   ✓ ${member.name} (${member._id}) is already a reference to ${member.category._ref}`,
      );
    } else {
      console.log(`   - ${member.name} (${member._id}) has no category set.`);
    }
  }

  console.log("\n✅ All team categories seeded and team members migrated successfully!\n");
}

run().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
