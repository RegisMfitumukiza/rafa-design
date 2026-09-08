/**
 * Sustainability Page Seed & Migration Script
 *
 * Populates the `sustainability` singleton in Sanity Studio with the complete
 * architectural manifesto, philosophy, material plate, 4 core commitments,
 * 5 guiding principles, environmental frameworks, and collaboration CTA.
 *
 * Usage: node scripts/migrate-sustainability-to-sanity.mjs
 */

import { assetFromPublic, client, imageField } from "./lib/sanity.mjs";

const SUSTAINABILITY_DOC_ID = "sustainability";

async function main() {
  console.log("🚀 Seeding Sustainability Page content into Sanity Studio...\n");

  // 1. Upload Material Study Image
  console.log("1. Uploading Material Plate...");
  const materialAsset = await assetFromPublic("/images/studio/studio-materials.jpg");
  const materialImage = materialAsset
    ? imageField(materialAsset, {
        alt: "Natural material samples — stone, timber, and concrete — laid out at the RAFA Design studio work table",
        caption: "Material samples at the studio table — Kigali Atelier",
      })
    : undefined;

  // 2. Define Sustainability Document Data
  const doc = {
    _id: SUSTAINABILITY_DOC_ID,
    _type: "sustainability",
    manifesto: {
      overline: "Our Responsibility",
      heading: "Architecture that endures — for people and for the planet.",
      body: "Every project is an act of permanence. We consider environmental responsibility not as an additional layer applied to architecture, but as part of the architectural decision-making process from the beginning.",
    },
    philosophy: {
      heading: "Good architecture is inherently sustainable.",
      body: "We believe the most sustainable building is one that is loved and cared for across generations. Longevity is the foundation of our practice. We design with materials that age well, spaces that can adapt, and structures that do not demand replacement. Good architecture, honestly made, is inherently an act of sustainability.",
    },
    ...(materialImage ? { materialImage } : {}),
    commitments: [
      {
        _key: "materials",
        number: "01",
        title: "Material Honesty",
        description:
          "We specify natural, durable materials — stone, timber, concrete, and metal — selected for their provenance, longevity, and capacity to age with dignity rather than deteriorate. We favour local quarries and regional suppliers wherever possible, reducing embodied carbon while supporting the material cultures of the places we build.",
      },
      {
        _key: "energy",
        number: "02",
        title: "Passive Design First",
        description:
          "Every project begins with orientation, ventilation, and daylight. We design buildings that work with the climate — capturing winter sun, providing summer shade, encouraging natural cross-ventilation — before specifying mechanical systems. Our goal is to reduce energy demand at source, not simply offset consumption.",
      },
      {
        _key: "longevity",
        number: "03",
        title: "Designed to Last",
        description:
          "We resist the short-term. Our buildings are designed with generous floor-to-ceiling heights, structural clarity, and spatial flexibility — so that rooms can change purpose as needs evolve without demolition or reconstruction. Adaptability is the most underrated form of sustainability in architecture.",
      },
      {
        _key: "community",
        number: "04",
        title: "Community & Place",
        description:
          "Responsible architecture must be accountable to the communities in which it is built. We engage with local craftspeople, builders, and makers — bringing skill into our projects, supporting regional economies, and creating work that belongs to its place rather than being imposed upon it.",
      },
    ],
    principles: [
      "Use materials only once, and use them well.",
      "Design for the next hundred years, not the next ten.",
      "The best environmental decision is often no building at all.",
      "Renovation before demolition. Adaptation before replacement.",
      "A building in service is a building that endures.",
    ],
    certifications: [
      {
        _key: "breeam",
        name: "BREEAM",
        description: "Building Research Establishment Environmental Assessment Method",
      },
      {
        _key: "passive-house",
        name: "Passive House",
        description:
          "International Passive House Association standard for ultra-low energy buildings",
      },
      {
        _key: "leed",
        name: "LEED",
        description: "Leadership in Energy and Environmental Design green building certification",
      },
      {
        _key: "biophilic",
        name: "Biophilic Design",
        description: "Integration of daylight, native vegetation, and indoor air quality standards",
      },
    ],
    collaboration: {
      heading: "Sustainable architecture starts with the brief.",
      body: "If environmental responsibility is important to your project, we would love to talk about how we can build it into the design from day one.",
      cta: "Start a conversation",
    },
    seo: {
      title: "Sustainability & Ecological Stewardship | RAFA Design Hub",
      description:
        "Environmental responsibility embedded into architectural thinking: material honesty, passive design, and buildings designed to endure for generations.",
    },
  };

  // 3. Upsert Document
  console.log(`2. Writing document '${SUSTAINABILITY_DOC_ID}' to Sanity...`);
  const result = await client.createOrReplace(doc);
  console.log(`✅ Successfully seeded Sustainability Page (ID: ${result._id})\n`);
}

main().catch((error) => {
  console.error("💥 Migration failed:", error);
  process.exit(1);
});
