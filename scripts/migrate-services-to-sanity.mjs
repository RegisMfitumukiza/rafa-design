/**
 * Services Migration Script
 *
 * Migrates existing static services to Sanity CMS.
 *
 * Usage: node scripts/migrate-services-to-sanity.mjs
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-08-20",
  useCdn: false,
});

// Services data to migrate
const servicesToMigrate = [
  {
    _type: "service",
    title: "Architecture",
    slug: { _type: "slug", current: "architecture" },
    shortDescription: "Custom homes, commercial buildings, and cultural spaces.",
    intro:
      "Architecture as the quiet negotiation between land, light, and the way people live — buildings at once rooted and open.",
    description:
      "From concept to construction, we deliver architectural design that responds to site, program, and context. Every project begins with a deep understanding of the land, the light, and the way people will inhabit the space. We work across scales — from small interventions to new buildings — always prioritising material honesty, spatial clarity, and a quiet sense of craft.",
    approach: [
      {
        _type: "approachPoint",
        title: "Context",
        statement:
          "Every project begins by reading the site — its slope, its climate, its history, and the way light moves across it.",
      },
      {
        _type: "approachPoint",
        title: "Spatial strategy",
        statement:
          "Plans are composed as sequences of rooms and thresholds, with a clear hierarchy of public and private, light and shadow.",
      },
      {
        _type: "approachPoint",
        title: "Materiality",
        statement:
          "Materials are chosen for honesty and permanence — local stone, mineral render, timber — and detailed to age with dignity.",
      },
      {
        _type: "approachPoint",
        title: "Performance",
        statement:
          "Passive solar orientation, natural ventilation, and robust construction ensure buildings that perform across decades.",
      },
    ],
    editorialIntents: ["design-intent", "site-relationship", "construction", "environmental"],
    order: 1,
    icon: "architecture",
    seo: {
      keywords: ["architecture", "design", "buildings", "custom-homes"],
    },
  },
  {
    _type: "service",
    title: "Interior Design",
    slug: { _type: "slug", current: "interior-design" },
    shortDescription: "Materiality, finishes, and furnishings.",
    intro:
      "Interiors that extend the architecture rather than decorate it — rooms composed of material, light, and a restrained palette.",
    description:
      "Our interior design practice approaches each space as an extension of the architecture. We select materials, finishes, and furnishings that feel natural to the building rather than applied to it. The palette is restrained — focused on texture, warmth, and the sensory experience of being in a room. We work closely with artisans and makers to create bespoke elements where the standard will not do.",
    approach: [
      {
        _type: "approachPoint",
        title: "Context",
        statement:
          "Each interior begins from the building that contains it — its proportions, its light, and the way it meets the outside.",
      },
      {
        _type: "approachPoint",
        title: "Spatial strategy",
        statement:
          "Rooms are organised around how they are inhabited — circulation, gathering, rest — with storage resolved before decoration.",
      },
      {
        _type: "approachPoint",
        title: "Materiality",
        statement:
          "Textures and finishes are selected to age and warm with use — wood, linen, stone, plaster — worked closely with artisans.",
      },
      {
        _type: "approachPoint",
        title: "Performance",
        statement:
          "Acoustics, thermal comfort, and durability are treated as part of the aesthetic rather than as afterthoughts.",
      },
    ],
    editorialIntents: ["spatial-experience", "materiality"],
    order: 2,
    icon: "interior",
    seo: {
      keywords: ["interior-design", "materials", "finishes", "furnishings"],
    },
  },
  {
    _type: "service",
    title: "Landscape Design",
    slug: { _type: "slug", current: "landscape-design" },
    shortDescription: "Outdoor spaces conceived as integral to the architecture.",
    intro:
      "The ground around a building is designed as architecture — terrain, planting, and light shaped as one system with the interior.",
    description:
      "We believe a building and its surroundings should be designed as a single system. Our landscape work extends the interior outward — shaping gardens, courtyards, and terraces that are as carefully considered as the rooms inside. We work with native planting, local stone, and natural drainage to create landscapes that feel settled and enduring.",
    approach: [
      {
        _type: "approachPoint",
        title: "Context",
        statement:
          "Landscapes begin from the existing ground — its drainage, its exposure, and the native species already at home there.",
      },
      {
        _type: "approachPoint",
        title: "Spatial strategy",
        statement:
          "Exterior rooms are composed with the same care as interiors — courts, terraces, and paths that direct movement and view.",
      },
      {
        _type: "approachPoint",
        title: "Materiality",
        statement:
          "Local stone, earth, and water are used with restraint — surfaces that settle and strengthen as they weather.",
      },
      {
        _type: "approachPoint",
        title: "Performance",
        statement:
          "Planting is chosen for the climate it must survive — native, drought-tolerant, and free of permanent irrigation.",
      },
    ],
    editorialIntents: ["site-relationship", "environmental"],
    order: 3,
    icon: "landscape",
    seo: {
      keywords: ["landscape-design", "gardens", "outdoor-spaces", "planting"],
    },
  },
  {
    _type: "service",
    title: "Urban Design",
    slug: { _type: "slug", current: "urban-design" },
    shortDescription: "Master planning and public space strategy.",
    intro:
      "Work at the scale of streets and blocks — shaping public space, movement, and the relationship between buildings and the city.",
    description:
      "At the urban scale, our work focuses on the relationship between buildings, public space, and movement. We develop strategies that prioritise walkability, natural light, and a sense of enclosure — creating neighbourhoods that feel cohesive without being uniform. Our approach is collaborative, working with developers, municipalities, and communities to shape the places people live.",
    approach: [
      {
        _type: "approachPoint",
        title: "Context",
        statement:
          "Urban strategies respond to the existing city — its grain, its street network, and the patterns of everyday life.",
      },
      {
        _type: "approachPoint",
        title: "Spatial strategy",
        statement:
          "Public space is designed as the city's primary room — walkable, shaded, and framed by well-mannered buildings.",
      },
      {
        _type: "approachPoint",
        title: "Materiality",
        statement:
          "Materials at the urban scale are chosen for endurance — paving, trees, and street furniture that age coherently.",
      },
      {
        _type: "approachPoint",
        title: "Performance",
        statement:
          "Mixed programmes, natural light, and a sense of enclosure keep neighbourhoods alive across the day.",
      },
    ],
    editorialIntents: ["design-intent", "site-relationship"],
    order: 4,
    icon: "urban",
    seo: {
      keywords: ["urban-design", "master-planning", "public-space", "city"],
    },
  },
  {
    _type: "service",
    title: "Renovation",
    slug: { _type: "slug", current: "renovation" },
    shortDescription: "Sensitive interventions in existing buildings.",
    intro:
      "We intervene in existing buildings with restraint — preserving character, proportion, and materiality while renewing performance.",
    description:
      "We approach renovation with restraint and respect for the original architecture. Our work preserves what matters — character, proportion, materiality — while introducing the performance and programmatic changes needed for contemporary life. Whether restoring a mid-century villa or adapting a historic townhouse, we treat each building as a layered history to be read and continued.",
    approach: [
      {
        _type: "approachPoint",
        title: "Context",
        statement:
          "Renovation begins by reading the existing building as a layered history — what it was, what it became, and what matters.",
      },
      {
        _type: "approachPoint",
        title: "Spatial strategy",
        statement:
          "New elements are composed to respect the original order — legible additions that never pretend to be original.",
      },
      {
        _type: "approachPoint",
        title: "Materiality",
        statement:
          "Original materials are restored wherever they survive; new materials are chosen to age in the same register.",
      },
      {
        _type: "approachPoint",
        title: "Performance",
        statement:
          "Thermal, acoustic, and programmatic upgrades are introduced without compromising the character that gives a building its value.",
      },
    ],
    editorialIntents: ["construction", "materiality", "design-intent"],
    order: 5,
    icon: "renovation",
    seo: {
      keywords: ["renovation", "restoration", "adaptive-reuse", "historic-buildings"],
    },
  },
  {
    _type: "service",
    title: "Consulting",
    slug: { _type: "slug", current: "consulting" },
    shortDescription: "Feasibility studies, design strategy, and expert advice.",
    intro:
      "Strategic advice across the life of a project — from site evaluation and feasibility to design review and construction monitoring.",
    description:
      "We provide strategic advice at every stage of a project — from site evaluation and feasibility studies to design review and construction monitoring. Our consulting work helps clients, developers, and institutions make informed decisions about their built environment, drawing on decades of collective experience across typologies and contexts.",
    approach: [
      {
        _type: "approachPoint",
        title: "Context",
        statement:
          "Consulting begins from an honest assessment of the site, the brief, and the constraints that will shape the outcome.",
      },
      {
        _type: "approachPoint",
        title: "Spatial strategy",
        statement:
          "We help clients evaluate spatial options — comparing massing, programme, and phasing against cost and value.",
      },
      {
        _type: "approachPoint",
        title: "Materiality",
        statement:
          "Advice on materials and systems is grounded in performance — durability, maintenance, and long-term operational cost.",
      },
      {
        _type: "approachPoint",
        title: "Performance",
        statement:
          "Independent design review and construction monitoring keep projects aligned with intent, budget, and programme.",
      },
    ],
    editorialIntents: [],
    order: 6,
    icon: "consulting",
    seo: {
      keywords: ["consulting", "feasibility", "design-strategy", "expert-advice"],
    },
  },
];

/**
 * Migrate services to Sanity
 */
async function migrateServices() {
  console.log("🚀 Starting Services Migration\n");
  console.log(`📊 Found ${servicesToMigrate.length} services to migrate\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const service of servicesToMigrate) {
    try {
      console.log(`📝 Migrating: ${service.title}`);

      // Check if service already exists
      const existing = await client.fetch(`*[_type == "service" && slug.current == $slug][0]._id`, {
        slug: service.slug.current,
      });

      if (existing) {
        console.log(`   ⏭️  Already exists (${existing}), skipping...`);
        continue;
      }

      // Create the document
      const result = await client.create(service);

      console.log(`   ✅ Migrated successfully (ID: ${result._id})`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
      errorCount++;
    }

    console.log("");
  }

  console.log("═══════════════════════════════════════════════");
  console.log(`✨ Migration Complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Total: ${servicesToMigrate.length}`);
  console.log("═══════════════════════════════════════════════\n");
}

// Run migration
migrateServices().catch((error) => {
  console.error("💥 Migration failed:", error);
  process.exit(1);
});
