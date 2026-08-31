/**
 * Studio Migration Script
 *
 * Migrates the studio identity + collections (beliefs, working methods, media,
 * history, timeline, awards, client sectors, visit) into a single Sanity
 * `studio` document.
 *
 * Usage: node scripts/migrate-studio-to-sanity.mjs
 */

import { assetFromPublic, client, imageField } from "./lib/sanity.mjs";

async function buildFields() {
  const images = [
    {
      path: "/images/studio/studio-atelier.jpg",
      alt: "The RAFA Design Hub studio in Porto",
      caption: "The atelier in Porto's historic centre",
    },
    {
      path: "/images/studio/studio-materials.jpg",
      alt: "Material samples and models in the studio",
      caption: "Material samples and study models at the work table",
    },
  ];

  const imageFields = [];
  for (const img of images) {
    const asset = await assetFromPublic(img.path);
    const field = imageField(asset, { alt: img.alt, caption: img.caption });
    if (field) imageFields.push(field);
  }

  return {
    _type: "studio",
    name: "RAFA Design Hub",
    overline: "Architecture & Interior Design // Porto",
    manifesto:
      "We build less, better. Architecture begins with subtraction — removing until only what is essential remains.",
    introduction:
      "RAFA Design Hub is an architecture and interior design studio founded on the belief that the spaces we inhabit shape how we live, work, and connect. Every project is a dialogue between the built and the natural, the permanent and the ephemeral.",
    philosophy:
      "We approach every project as a dialogue between the built and the natural, the permanent and the ephemeral. Our work is rooted in context — the land, the light, the culture, and the people who will occupy the space. We believe in subtraction — the discipline of removing rather than adding — until only what is essential remains.",
    beliefs: [
      {
        _type: "principle",
        code: "PRINCIPLE 01",
        title: "Context",
        statement:
          "The land, the light, the climate, the culture — we design from the site outward, never from a style inward.",
      },
      {
        _type: "principle",
        code: "PRINCIPLE 02",
        title: "Materiality",
        statement:
          "Honest materials age with the building. Wood patinas, stone weathers, and concrete records its making.",
      },
      {
        _type: "principle",
        code: "PRINCIPLE 03",
        title: "Light",
        statement:
          "Light is the first material. We shape spaces around its movement across the day and the seasons.",
      },
      {
        _type: "principle",
        code: "PRINCIPLE 04",
        title: "Craft",
        statement:
          "Every junction, joint, and threshold is a decision. Detailing is not the finish of the design — it is the design.",
      },
      {
        _type: "principle",
        code: "PRINCIPLE 05",
        title: "Clarity",
        statement:
          "A building should be legible at first glance and reveal more with time. Simplicity is complexity resolved.",
      },
    ],
    workingMethods: [
      {
        _type: "workingMethod",
        code: "METHOD 01",
        title: "Model Making",
        description:
          "Every project begins as a physical object. Study models are built early and tested by hand — mass, proportion, and light resolved in three dimensions before they are drawn.",
      },
      {
        _type: "workingMethod",
        code: "METHOD 02",
        title: "Material Research",
        description:
          "A material library is assembled for every project — stone, timber, metal, textiles. Samples are selected by hand, on site, in real light.",
      },
      {
        _type: "workingMethod",
        code: "METHOD 03",
        title: "Design Review",
        description:
          "The studio critiques in the open. Weekly reviews at the model table — every decision defended, tested, or revised.",
      },
      {
        _type: "workingMethod",
        code: "METHOD 04",
        title: "Site & Construction",
        description:
          "Architecture is completed on site, not in the office. We supervise construction, test mock-ups, and refine details against real hands and real light.",
      },
    ],
    history:
      "Founded in 2018, the studio began as a small practice focused on residential projects in northern Portugal. Over the years, our work has expanded across the country and into new typologies — commercial, cultural, and interior — while maintaining the same principles of material honesty and spatial clarity.",
    images: imageFields,
    timeline: [
      {
        _type: "timelineEvent",
        year: 2018,
        title: "Studio Founded",
        description: "RAFA Design Hub established in Porto, focused on residential architecture.",
      },
      {
        _type: "timelineEvent",
        year: 2020,
        title: "First International Project",
        description:
          "Completed our first project outside Portugal — a private residence in Galicia, Spain.",
      },
      {
        _type: "timelineEvent",
        year: 2022,
        title: "Studio Patio Completed",
        description:
          "Moved into our own studio space — a renovation of a 19th-century building in Porto's historic centre.",
      },
      {
        _type: "timelineEvent",
        year: 2023,
        title: "Interior Design Practice Launched",
        description: "Formalised the interior design practice under Tiago Martins' leadership.",
      },
      {
        _type: "timelineEvent",
        year: 2025,
        title: "Casa Monte Awarded",
        description:
          "Casa Monte recognised as ArchDaily Building of the Year, marking the studio's growing international recognition.",
      },
      {
        _type: "timelineEvent",
        year: 2026,
        title: "Largo Gallery Completed",
        description:
          "Opened our largest cultural project to date — a contemporary gallery in a 17th-century Lisbon palace.",
      },
    ],
    awards: [
      {
        _type: "award",
        title: "ArchDaily Building of the Year",
        organization: "ArchDaily",
        year: 2025,
        project: "Casa Monte",
        citation:
          "Awarded for the resolution of a monolithic stone volume within its coastal landscape.",
      },
      {
        _type: "award",
        title: "European Architecture Prize — Honourable Mention",
        organization: "European Centre for Architecture",
        year: 2024,
        project: "Atelier Norte",
        citation:
          "Recognised for the adaptive transformation of a 19th-century workshop into a working atelier.",
      },
      {
        _type: "award",
        title: "Best Residential Project",
        organization: "Portuguese Architecture Awards",
        year: 2024,
        project: "Villa Marim",
        citation:
          "Awarded for the restraint of its material palette and the quiet orchestration of light.",
      },
      {
        _type: "award",
        title: "Emerging Practice of the Year",
        organization: "Architectural Review",
        year: 2023,
        citation:
          "Selected among Europe's emerging practices for the coherence of the studio's built work.",
      },
    ],
    clientSectors: [
      {
        _type: "clientSector",
        code: "SECTOR 01",
        title: "Private Residences",
        description: "Homes designed from the site outward, across Portugal and Spain.",
        projects: ["Casa Monte", "Villa Marim", "Baía House"],
        clients: ["Private Clients", "Family Estates"],
        collaborators: ["Atelier Bugio", "Souto de Moura Engineering"],
      },
      {
        _type: "clientSector",
        code: "SECTOR 02",
        title: "Commercial & Workspaces",
        description: "Working environments shaped for their users and their urban context.",
        projects: ["Atelier Norte", "Studio Patio"],
        clients: ["Norte Creative Group", "Patio Co-Working"],
        collaborators: ["OODA Associates"],
      },
      {
        _type: "clientSector",
        code: "SECTOR 03",
        title: "Cultural",
        description: "Public rooms and institutions conceived for collective life.",
        projects: ["Largo Gallery"],
        clients: ["Lisbon Cultural Heritage Foundation"],
        collaborators: ["Largo Conservation Workshop"],
      },
      {
        _type: "clientSector",
        code: "SECTOR 04",
        title: "Hospitality & Retail",
        description: "Spaces of exchange, materially grounded and built to endure.",
        clients: ["Douro Boutique Hotels Group"],
      },
    ],
    clientReferencesNote: "Full client references available on request.",
    visit: {
      overline: "The Studio // Porto",
      heading: "The studio is open — to the work and to those who commission it.",
      body: "Conversations begin informally. Write to us, or visit the atelier in Porto's historic centre, where the practice lives beside its models and its material library.",
      visits: "Studio visits by appointment",
    },
  };
}

async function migrateStudio() {
  console.log("🚀 Starting Studio Migration\n");

  const existing = await client.fetch(`*[_type == "studio"][0]._id`);
  if (existing) {
    console.log(`⏭️  Studio already exists (${existing}), skipping...`);
    console.log("\n   To re-run, delete the existing studio document first.");
    return;
  }

  const doc = await buildFields();
  const result = await client.create(doc);
  console.log(`✅ Studio migrated successfully (ID: ${result._id})`);
}

migrateStudio().catch((error) => {
  console.error("💥 Migration failed:", error);
  process.exit(1);
});
