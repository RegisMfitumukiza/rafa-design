/**
 * Careers Migration Script
 *
 * Migrates the careers page singleton (`careers`) and the individual job
 * postings (`career`) into Sanity.
 *
 * Usage: node scripts/migrate-careers-to-sanity.mjs
 */

import { assetFromPublic, client, imageField } from "./lib/sanity.mjs";

const careershipPositions = [
  {
    _type: "career",
    slug: { _type: "slug", current: "architect" },
    title: "Architect",
    location: "Porto",
    type: "full-time",
    description:
      "We are looking for an architect with 3-5 years of experience to join our design team. You will work across residential and cultural projects, from concept through to construction.",
    requirements: [
      "Degree in architecture and 3+ years of professional experience",
      "Strong design portfolio with built work",
      "Proficiency in Revit, AutoCAD, and Adobe Creative Suite",
      "Excellent communication and teamwork skills",
    ],
    order: 1,
    status: "Open",
    featured: true,
  },
  {
    _type: "career",
    slug: { _type: "slug", current: "interior-designer" },
    title: "Interior Designer",
    location: "Lisbon",
    type: "full-time",
    description:
      "An opportunity to join our interior design practice, working on residential and commercial projects with a focus on materiality and craft.",
    requirements: [
      "Degree in interior design or architecture",
      "Portfolio demonstrating material sensitivity",
      "Experience with FF&E selection and specification",
      "Fluency in Portuguese and English",
    ],
    order: 2,
    status: "Open",
  },
  {
    _type: "career",
    slug: { _type: "slug", current: "summer-internship" },
    title: "Summer Internship",
    location: "Porto",
    type: "internship",
    description:
      "A 3-month paid internship for final-year architecture students. You will support the design team on live projects and gain hands-on experience of a small studio.",
    requirements: [
      "Enrolled in final year of architecture degree",
      "Strong drawing and model-making skills",
      "Curiosity and a collaborative attitude",
    ],
    order: 3,
    status: "Open",
  },
  {
    _type: "career",
    slug: { _type: "slug", current: "visualization-specialist" },
    title: "Architectural Visualization Specialist",
    location: "Remote",
    type: "contract",
    description:
      "Freelance opportunity for a skilled visualization artist to produce photorealistic renders and animations for client presentations and publications.",
    requirements: [
      "Exceptional portfolio of architectural renderings",
      "Expertise in 3ds Max, Corona or V-Ray, and Photoshop",
      "Understanding of architectural drawing conventions",
    ],
    order: 4,
    status: "Open",
  },
];

const careersPageFields = {
  _type: "careers",
  hero: {
    overline: "Careers",
    heading: "Join the practice.",
    body: "We are a small studio built on the belief that architecture is a collaborative discipline. Every project is an opportunity to learn - from the site, from the client, from each other. If you care about materiality, craft, and the long-term impact of what we build, we would like to hear from you.",
  },
  openApplication: {
    overline: "Open Applications",
    heading: "Don't see your role?",
    body: "We are always interested in meeting people who think carefully, work collaboratively, and care deeply about the built environment. Whether you are an architect, designer, researcher, or builder, we welcome open applications.",
    cta: "Send an open application",
  },
  benefits: [
    {
      number: "01",
      title: "A small team",
      description: "You will work directly with the studio founders on every project.",
    },
    {
      number: "02",
      title: "Real responsibility",
      description: "From your first week, you will contribute to live projects.",
    },
    {
      number: "03",
      title: "Studio culture",
      description: "Site visits, material libraries, and a studio in Porto's historic centre.",
    },
    {
      number: "04",
      title: "Growth",
      description: "Annual review, mentorship, and support for professional development.",
    },
  ],
};

async function migrateCareers() {
  console.log("🚀 Starting Careers Migration\n");

  // 1) Careers page singleton
  const existingSingleton = await client.fetch(`*[_type == "careers"][0]._id`);
  if (existingSingleton) {
    console.log(`⏭️  Careers page singleton already exists (${existingSingleton}), skipping...`);
  } else {
    const asset = await assetFromPublic("/images/studio/studio-atelier.jpg");
    const image = imageField(asset, {
      alt: "The RAFA Design Hub studio in Porto",
      caption: "The practice atelier in Porto",
    });
    const doc = { ...careersPageFields };
    if (image) doc.studioImage = image;
    const result = await client.create(doc);
    console.log(`✅ Careers page singleton migrated (ID: ${result._id})`);
  }

  console.log("");

  // 2) Job postings
  let successCount = 0;
  let errorCount = 0;
  for (const position of careershipPositions) {
    try {
      console.log(`📝 Migrating position: ${position.title}`);

      const existing = await client.fetch(`*[_type == "career" && slug.current == $slug][0]._id`, {
        slug: position.slug.current,
      });

      if (existing) {
        console.log(`   ⏭️  Already exists (${existing}), skipping...`);
        continue;
      }

      const result = await client.create(position);
      console.log(`   ✅ Migrated successfully (ID: ${result._id})`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
      errorCount++;
    }
    console.log("");
  }

  console.log("═══════════════════════════════════════════════");
  console.log("✨ Migration Complete for Careers!");
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log("═══════════════════════════════════════════════\n");
}

migrateCareers().catch((error) => {
  console.error("💥 Migration failed:", error);
  process.exit(1);
});
