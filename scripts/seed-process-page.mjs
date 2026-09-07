/**
 * Process Page Seed & Migration Script
 *
 * Populates the `processPage` singleton in Sanity with the studio's full
 * 6-phase architectural methodology, hero image, proof section, and CTA.
 *
 * Usage: node scripts/seed-process-page.mjs
 */

import { assetFromPublic, client, imageField } from "./lib/sanity.mjs";

const PROCESS_PAGE_ID = "processPage";

async function main() {
  console.log("🚀 Seeding Process Page content into Sanity Studio...\n");

  // 1. Upload Hero Image
  console.log("1. Uploading Hero Plate...");
  const heroAsset = await assetFromPublic("/images/studio/studio-materials.jpg");
  const heroImage = heroAsset
    ? imageField(heroAsset, {
        alt: "Material samples and models in the studio",
        caption: "Material samples and study models at the work table",
      })
    : undefined;

  // 2. Upload Step Visuals
  console.log("2. Uploading Evidence Plates for Phases...");
  const conceptAsset = await assetFromPublic("/images/process/concept-sketch.jpg");
  const conceptVisual = conceptAsset
    ? imageField(conceptAsset, {
        alt: "Concept sketch of a coastal residence",
        caption: "Conceptual spatial diagram and massing study",
      })
    : undefined;

  const siteVisitAsset = await assetFromPublic("/images/process/site-visit.jpg");
  const siteVisitVisual = siteVisitAsset
    ? imageField(siteVisitAsset, {
        alt: "Site visit during construction",
        caption: "Site observation and structural junction review",
      })
    : undefined;

  // 3. Assemble 6 Steps
  const steps = [
    {
      _key: "discovery",
      order: 1,
      title: "Discovery",
      duration: "2 – 4 weeks",
      description:
        "Every project begins with listening. We meet with clients, visit the site, and study the context — the light, the topography, the surrounding architecture, and the local climate. This phase establishes the brief, the budget, and the core aspirations that will guide every decision that follows.",
      deliverables: ["Site Analysis", "Client Brief", "Feasibility Study"],
    },
    {
      _key: "concept",
      order: 2,
      title: "Concept",
      duration: "4 – 8 weeks",
      description:
        "Armed with a deep understanding of the site and the brief, we develop the architectural narrative. Sketches, study models, and reference material converge into a clear design direction. We present the concept through drawings, collages, and spatial diagrams that communicate the atmosphere and intent of the project.",
      deliverables: ["Concept Drawings", "Spatial Diagrams", "Material Direction"],
      ...(conceptVisual ? { visual: conceptVisual } : {}),
    },
    {
      _key: "design-development",
      order: 3,
      title: "Design Development",
      duration: "8 – 16 weeks",
      description:
        "The concept is refined into a detailed architectural proposal. Plans, sections, and elevations are drawn at scale. Materials are selected, tested, and specified. We work closely with engineers, consultants, and artisans to ensure every detail is considered before construction begins.",
      deliverables: ["Plans & Sections", "Material Specifications", "Consultant Coordination"],
    },
    {
      _key: "documentation",
      order: 4,
      title: "Documentation",
      duration: "6 – 12 weeks",
      description:
        "Comprehensive construction drawings and specifications are prepared. This phase translates the design into precise instructions for builders — from structural details to joinery schedules, from lighting layouts to landscape plans. Every dimension, every junction, every material is resolved.",
      deliverables: ["Construction Drawings", "Joinery Schedules", "Lighting Layouts"],
    },
    {
      _key: "construction",
      order: 5,
      title: "Construction",
      duration: "12 – 52 weeks",
      description:
        "During construction, we visit the site regularly to ensure the work matches the intent. We review samples, coordinate with contractors, and resolve the inevitable questions that arise when a design becomes a building. This phase is a dialogue — between the drawings, the site, and the hands that build.",
      deliverables: ["Site Reviews", "Sample Approvals", "Contractor Coordination"],
      ...(siteVisitVisual ? { visual: siteVisitVisual } : {}),
    },
    {
      _key: "completion",
      order: 6,
      title: "Completion",
      duration: "2 – 4 weeks",
      description:
        "A building is never truly finished — it begins its life when people inhabit it. We document the completed work, gather feedback, and stay connected with our clients long after the handover. Many of our projects lead to new ones, as spaces evolve and families grow.",
      deliverables: ["Handover Dossier", "As-Built Records", "Post-Occupancy Review"],
    },
  ];

  // 4. Assemble Process Page Document
  const doc = {
    _id: PROCESS_PAGE_ID,
    _type: "processPage",
    heroOverline: "Specification // Methodology",
    heroTitle: "Methodology",
    heroDescription:
      "Every project follows a clear arc — from discovery to completion. The path is never linear, but the principles remain the same: listen, conceive, refine, build.",
    ...(heroImage ? { heroImage } : {}),
    steps,
    proof: {
      overline: "Specification // Evidence",
      heading: "Built Proof",
      body: "Our methodology is tested and refined through every built project — from private residences to adaptive reuse.",
      actionText: "See the Work",
      actionUrl: "/projects",
    },
    cta: {
      overline: "Process // Contact",
      heading: "Have a project in mind?",
      body: "Tell us about the place, the ambition and the challenge.",
      action: "Start a project",
      actionUrl: "/contact",
    },
    seo: {
      title: "Methodology | RAFA Design Hub",
      description:
        "Our architectural process is a continuous dialogue between research, material exploration, and precision execution. Every project progresses through six disciplined phases.",
    },
  };

  console.log("3. Writing canonical processPage document to Sanity dataset...");
  const result = await client.createOrReplace(doc);
  console.log(`✅ Process Page document created/replaced successfully! (_id: ${result._id})\n`);
}

main().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
