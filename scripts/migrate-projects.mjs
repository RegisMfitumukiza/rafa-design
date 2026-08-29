/**
 * Project Migration Script
 *
 * Imports existing TypeScript project data into Sanity CMS.
 * Run with: node scripts/migrate-projects.mjs
 */

import { randomUUID } from "crypto";

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Helper function to generate unique keys for array items
function generateKey() {
  return randomUUID().replace(/-/g, "").substring(0, 12);
}

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-08-20",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Project data (extracted from src/content/projects/index.ts)
const projects = [
  {
    _type: "project",
    _id: "casa-monte",
    title: "Casa Monte",
    slug: { _type: "slug", current: "casa-monte" },
    subtitle: "A hillside retreat in the Algarve",
    category: ["architecture", "interior"],
    typology: "Residential",
    status: "completed",
    year: 2025,
    areaM2: 320,
    location: { city: "Algarve", country: "Portugal" },
    coordinates: { lat: 37.0179, lng: -7.9308, label: "Algarve, Portugal" },
    client: "Private Family Office",
    photographerCredit: "Francisco Nogueira",

    concept:
      "A house that does not resist its site - it follows the contour, opens to the afternoon light, and settles into the land.",

    description:
      "A private residence that negotiates a steep hillside site, opening the interior to the landscape through carefully positioned apertures.",

    story:
      "The site sits on a south-facing slope with views over the Atlantic. Rather than cutting into the hill, the house stretches along the contour, each room oriented to capture the afternoon light. Local stone anchors the volume to the ground; white render and deep overhangs protect the facade from the Mediterranean sun.",

    lightStrategy:
      "The building section was designed as a light instrument. A continuous clerestory above the kitchen runs the full length of the north wall, admitting indirect sky light throughout the day. The south apertures are shaded by a 1.2-metre concrete overhang, calibrated to exclude direct sun above 45 degrees elevation - blocking July midday while admitting December afternoon sun.",

    siteResponse:
      "No mature trees were removed. The construction platform was cut in a single pass, preserving the natural drainage. The garden terracing uses the same limestone as the building, so the cultivated landscape reads as an extension of the architecture rather than a setting for it.",

    materialNarrative: [
      {
        _key: generateKey(),
        name: "Local Limestone",
        rationale:
          "Quarried 12 kilometres from the site, the limestone was chosen for its warm ochre tone that reads identically whether dry or wet - a permanence the Mediterranean climate demands of exterior materials.",
      },
      {
        _key: generateKey(),
        name: "White Hydraulic Lime Render",
        rationale:
          "Traditional mineral render rather than synthetic coating - breathable, repairable, and capable of the slight surface variation that gives the facade depth under raking light.",
      },
      {
        _key: generateKey(),
        name: "White Oak",
        rationale:
          "European white oak, lightly brushed and oiled, used throughout the interior. The brushing opens the grain without ageing the timber artificially - a surface that will develop honestly over time.",
      },
    ],

    team: {
      partnerInCharge: "Rafael Mendes",
      projectLead: "Sara Costa",
      team: ["Ana Pereira", "Tiago Martins"],
      collaborators: ["Afonsos Engenharia (Structural)", "Luz & Sombra (Lighting)"],
    },

    services: ["architecture", "interior-design"],
    featured: true,
  },

  {
    _type: "project",
    _id: "atelier-norte",
    title: "Atelier Norte",
    slug: { _type: "slug", current: "atelier-norte" },
    subtitle: "A creative workspace in Porto",
    category: ["architecture", "interior", "renovation"],
    typology: "Adaptive Reuse",
    status: "completed",
    year: 2024,
    areaM2: 180,
    location: { city: "Porto", country: "Portugal" },
    coordinates: { lat: 41.1579, lng: -8.6291, label: "Porto, Portugal" },
    client: "Norte Creative Group",
    photographerCredit: "Simao Ribeiro",

    concept:
      "The building already existed. Our task was not to replace it, but to listen to what remained and build the minimum necessary around it.",

    description: "The renovation of a 19th-century townhouse into a collaborative design studio.",

    story:
      "The brief called for a space that could accommodate a growing team while preserving the character of the original building. We removed later partitions to reveal the original double-height volume, inserting a mezzanine that expands the floor area without closing the room. Existing timber beams are left exposed; the material palette is restrained - concrete, steel, and birch ply.",

    lightStrategy:
      "In a dense urban block, light is scarce and directional. The rear courtyard was treated as a light well - its white-painted surfaces reflecting northern sky light deep into the studio plan. The street facade retains its original window rhythm but the glazing bars were removed, maximising the glass area without altering the facade composition.",

    siteResponse:
      "The project does not add to the Porto skyline. It works entirely within the existing building envelope - an internal transformation that is invisible from the street. The facade was cleaned and the original lime render repaired rather than replaced, returning the building to its 19th-century appearance.",

    materialNarrative: [
      {
        _key: generateKey(),
        name: "Exposed Original Masonry",
        rationale:
          "The granite party walls were cleaned of later finishes but not repointed. The raw, uneven surface of the original stone is left visible throughout the studio - a direct connection to the construction.",
      },
      {
        _key: generateKey(),
        name: "Mild Steel",
        rationale:
          "The mezzanine structure uses mild steel rather than stainless - a deliberate choice. The material will develop a patina over time, darkening in tone as the studio ages. The building history will continue to be written on the surfaces.",
      },
      {
        _key: generateKey(),
        name: "Baltic Birch Ply",
        rationale:
          "Used for worksurfaces, storage, and the stair treads. Birch ply is durable, workable, and honest - a material that architects understand and that clients can see being used with confidence.",
      },
    ],

    team: {
      partnerInCharge: "Rafael Mendes",
      projectLead: "Tiago Martins",
      team: ["Ana Pereira"],
      collaborators: ["Norte Reabilitacao (Contractor)"],
    },

    services: ["architecture", "interior-design", "renovation"],
    featured: true,
  },

  {
    _type: "project",
    _id: "villa-marim",
    title: "Villa Marim",
    slug: { _type: "slug", current: "villa-marim" },
    subtitle: "Coastal living on the Ria Formosa",
    category: ["architecture", "landscape"],
    typology: "Residential",
    status: "completed",
    year: 2025,
    areaM2: 280,
    location: { city: "Algarve", country: "Portugal" },
    coordinates: { lat: 37.0315, lng: -7.8241, label: "Ria Formosa, Portugal" },
    client: "Private Client",
    photographerCredit: "Francisco Nogueira",

    concept:
      "Three pavilions arranged around a shared courtyard - a family home that works like a village, where privacy and gathering are both possible without negotiation.",

    description:
      "A summer house organized around a series of courtyards, blurring the boundary between inside and out.",

    story:
      "The project takes its cue from the vernacular architecture of the Ria Formosa - white volumes, shaded patios, and a porous relationship between interior and landscape. Three pavilions are arranged around a central courtyard, connected by covered walkways. Each pavilion opens fully onto its own garden, allowing the family to occupy the spaces differently throughout the day and across seasons.",

    lightStrategy:
      "The bedroom pavilion faces east-northeast, receiving direct sun only in the morning and remaining cool through the hottest part of the day. The limestone brise-soleil filters this early light, casting a moving grid of shadow across the bedroom floor - a gentle, natural alarm.",

    siteResponse:
      "The lagoon edge was left entirely unbuilt. A 40-metre setback from the water creates a meadow of native grass that acts as a visual buffer between the architecture and the protected natural habitat. The building never competes with the horizon.",

    materialNarrative: [
      {
        name: "White Hydraulic Lime Render",
        rationale:
          "The white render is a direct inheritance from the vernacular architecture of the Algarve. It is not decorative - it is thermally functional, reflecting solar radiation in summer while allowing the walls to breathe in all seasons.",
      },
      {
        _key: generateKey(),
        name: "Alentejo Limestone",
        rationale:
          "Used for all horizontal surfaces - courtyard paving, walkway floors, and the pool surround. The stone is laid in large format to minimise joints, creating a continuous surface that reads as a single plane in the afternoon light.",
      },
      {
        _key: generateKey(),
        name: "Cork Insulation",
        rationale:
          "Portuguese cork insulates all roof assemblies. No imported petrochemical insulation was used. The material is harvested 200 kilometres north of the site; its carbon footprint is negative throughout its service life.",
      },
    ],

    team: {
      partnerInCharge: "Sara Costa",
      projectLead: "Rafael Mendes",
      team: ["Ana Pereira"],
    },

    services: ["architecture", "landscape-design"],
    featured: true,
  },

  {
    _type: "project",
    _id: "baia-house",
    title: "Baia House",
    slug: { _type: "slug", current: "baia-house" },
    subtitle: "Reimagining a mid-century villa",
    category: ["renovation", "interior"],
    typology: "Adaptive Reuse",
    status: "completed",
    year: 2024,
    areaM2: 200,
    location: { city: "Lisbon", country: "Portugal" },
    coordinates: { lat: 38.7223, lng: -9.1393, label: "Lisbon Hills, Portugal" },
    client: "Private Client",
    photographerCredit: "Clara Monteiro",

    concept:
      "Respect the original architect intelligence. Correct what decades of alteration had obscured. Add only what the building was always missing.",

    description: "A sensitive renovation of a mid-century modern villa in the hills above Lisbon.",

    story:
      "The original house was designed in 1962 by a student of Francisco Keil do Amaral. Our task was to update it for contemporary living while respecting the spirit of the original design. We restored the original cedar brise-soleil, opened the kitchen to the garden, and introduced a warm material palette of terracotta, oak, and linen.",

    lightStrategy:
      "The original cedar brise-soleil was designed to block summer sun above 55 degrees elevation on the west facade. The restoration preserved this geometry exactly. The result is a west-facing living room that receives warm afternoon light in autumn and winter but remains shaded and cool during the summer.",

    siteResponse:
      "The garden is on a steep slope below the house. Rather than terracing for a flat lawn, the garden was replanted with native hillside species - cistus, lavender, and wild olive - that require no irrigation and provide a natural visual screen from the street below.",

    materialNarrative: [
      {
        name: "Original Terrazzo",
        rationale:
          "The existing terrazzo - found beneath 40 years of vinyl flooring - was restored by a specialist craftsman using the original aggregate mix. The restored floor is indistinguishable from the original; only the areas where the vinyl had caused moisture damage were re-cast.",
      },
      {
        _key: generateKey(),
        name: "Terracotta",
        rationale:
          "New terracotta was introduced in the kitchen and bathrooms as a counterpoint to the terrazzo - warmer, more tactile, and clearly contemporary. The tone was matched to the clay soil, rooting the interior in the hillside landscape.",
      },
      {
        _key: generateKey(),
        name: "Linen",
        rationale:
          "All soft furnishings use undyed natural linen. The material ages and softens with use, developing a patina that echoes the timber, terrazzo, and clay that surround it.",
      },
    ],

    team: {
      partnerInCharge: "Rafael Mendes",
      projectLead: "Sara Costa",
      team: ["Tiago Martins"],
    },

    services: ["architecture", "interior-design", "renovation"],
    featured: false,
  },

  {
    _type: "project",
    _id: "largo-gallery",
    title: "Largo Gallery",
    slug: { _type: "slug", current: "largo-gallery" },
    subtitle: "A contemporary art space in a historic palace",
    category: ["architecture", "interior"],
    typology: "Cultural",
    status: "completed",
    year: 2026,
    areaM2: 350,
    location: { city: "Lisbon", country: "Portugal" },
    coordinates: { lat: 38.7105, lng: -9.1415, label: "Chiado, Lisbon" },
    client: "Largo Arts Foundation",
    photographerCredit: "Simao Ribeiro",

    concept:
      "Art and architecture in conversation - neither one subservient. A gallery that exists as a guest inside a palace, never forgetting whose house it is.",

    description:
      "A contemporary art gallery inserted into the ground floor of a 17th-century palace.",

    story:
      "The challenge was to create a neutral exhibition space within a building with strong existing character. We designed a series of freestanding white volumes within the original rooms, creating a gallery-within-a-palace. The interstitial spaces - between the old walls and the new volumes - become circulation and contemplation areas. The project explores the tension between preservation and intervention.",

    team: {
      partnerInCharge: "Rafael Mendes",
      projectLead: "Ana Pereira",
      team: ["Sara Costa"],
    },

    services: ["architecture", "interior-design"],
    featured: false,
  },

  {
    _type: "project",
    _id: "urban-residence",
    title: "Urban Residence",
    slug: { _type: "slug", current: "urban-residence" },
    subtitle: "Contemporary living in historic Baixa",
    category: ["architecture", "interior"],
    typology: "Residential",
    status: "ongoing",
    year: 2026,
    areaM2: 145,
    location: { city: "Lisbon", country: "Portugal" },
    client: "Private Client",

    concept:
      "A new apartment carved from a historic building - respecting the envelope while reimagining the interior.",

    description: "An ongoing residential project in Lisbon historic downtown district.",

    story:
      "A complete interior renovation of a 19th-century apartment in Baixa, creating contemporary living spaces while preserving the building historic character.",

    services: ["architecture", "interior-design"],
    featured: false,
  },
];

// Main migration function
async function migrateProjects() {
  console.log("🚀 Starting project migration to Sanity...\n");

  // Check if we have a token
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌ Error: SANITY_API_TOKEN not found in .env.local");
    console.log("\n📝 To create a token:");
    console.log("1. Go to https://sanity.io/manage");
    console.log("2. Select your project (9rbnou67)");
    console.log("3. Go to API settings");
    console.log('4. Create a new token with "Editor" permissions');
    console.log("5. Add it to .env.local as SANITY_API_TOKEN=your_token_here\n");
    process.exit(1);
  }

  let successCount = 0;
  let errorCount = 0;

  for (const project of projects) {
    try {
      console.log(`📦 Migrating: ${project.title}...`);

      // Create or update the project document
      const result = await client.createOrReplace(project);

      console.log(`✅ Success: ${project.title} (ID: ${result._id})`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error migrating ${project.title}:`, error.message);
      errorCount++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`\n📊 Migration Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📁 Total: ${projects.length}`);

  if (successCount > 0) {
    console.log("\n🎉 Projects imported to Sanity!");
    console.log("\n⚠️  Next steps:");
    console.log("   1. Visit http://localhost:8000/admin");
    console.log("   2. Open each project");
    console.log("   3. Upload hero images and gallery images manually");
    console.log("   4. Add chapter images if needed");
    console.log("   5. Publish each project\n");
  }
}

// Run migration
migrateProjects().catch((error) => {
  console.error("❌ Migration failed:", error);
  process.exit(1);
});
