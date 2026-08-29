import { randomUUID } from "crypto";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-08-20",
  useCdn: false,
});

function generateKey() {
  return randomUUID().replace(/-/g, "").substring(0, 12);
}

// Static articles data (converted to migration format with block keys)
const rawArticles = [
  {
    _id: "language-of-light",
    _type: "journalArticle",
    title: "The Language of Light",
    slug: { _type: "slug", current: "language-of-light" },
    subtitle: "How the quality of daylight shapes our architectural decisions",
    excerpt:
      "An exploration of light as material — and why we design for shadows as much as for sun.",
    type: "essay",
    category: "ideas",
    publishedAt: "2026-06-18T10:00:00.000Z",
    readingTime: 8,
    author: {
      name: "Rafael Mendes",
      role: "Founding Architect",
    },
    imageFile: "/images/journal/language-of-light.jpg",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Light is the most democratic material in architecture. It costs nothing, it belongs to everyone, and yet it transforms a space more profoundly than any finish or furnishing. This is the story of how we think about light at RAFA Design Hub.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "01 // The Character of Light" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Every site has a character of light. A north-facing slope in Porto receives a cool, even light that flatters stone and plaster. A south-facing site in the Algarve receives a brilliant, high-contrast light that demands shade. We begin every project by mapping the light — how it enters each room, at what time of day, in which season.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "02 // Designing with Precision" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "We design openings with precision. Windows are not holes in a wall; they are instruments that direct, filter, and shape light. Deep reveals create pools of shadow. A carefully placed skylight washes a wall with moving light across the day. Brise-soleil, screens, and planting soften the glare of summer sun while letting winter light penetrate deep into the interior.",
          },
        ],
      },
      {
        _type: "pullQuote",
        content:
          "The goal is not more light, but better light. A room that receives dappled morning light for an hour feels more generous than one that is flooded uniformly all day.",
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "03 // The Meaning of Shadow" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "We design for the shadow as much as for the sun — because it is the shadow that gives the light its meaning. In the Mediterranean climate, shadow is not the absence of light. It is a presence, a quality, a material condition that makes the interior habitable.",
          },
        ],
      },
    ],
    seo: {
      keywords: ["light", "design-philosophy", "architecture", "shadow"],
    },
  },
  {
    _id: "open-house-porto-2026",
    _type: "journalArticle",
    title: "Open House Porto — Studio Patio",
    slug: { _type: "slug", current: "open-house-porto-2026" },
    subtitle: "Join us for a weekend celebrating architecture in Porto",
    excerpt:
      "This September, our own studio will open its doors as part of the Open House Porto festival.",
    type: "event",
    category: "events",
    publishedAt: "2026-07-12T09:00:00.000Z",
    readingTime: 3,
    author: {
      name: "RAFA Design Hub",
    },
    imageFile: "/images/journal/open-house-porto.jpg",
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "About the Event" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Open House Porto is a celebration of architecture in the city — a weekend when buildings that are normally closed to the public open their doors, and architects share the stories behind their work.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "This year, Studio Patio — our own workspace in Porto's historic centre — will be part of the programme. The studio is a small building wrapped around a restored patio, designed as our own laboratory for ideas about light, material, and space.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Your Visit" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Visitors will have the opportunity to walk through the studio, meet members of the team, and see current work in progress. We will also display the process materials behind recent projects: sketches, study models, and material samples.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            marks: ["strong"],
            text: "When: ",
          },
          {
            _type: "span",
            text: "September 20-21, 2026, 9:00 AM - 6:00 PM",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            marks: ["strong"],
            text: "Where: ",
          },
          {
            _type: "span",
            text: "Studio Patio, Rua de São Bento da Vitória, Porto 4050-543, Portugal",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            marks: ["strong"],
            text: "Admission: ",
          },
          {
            _type: "span",
            text: "Free",
          },
        ],
      },
    ],
    seo: {
      keywords: ["event", "open-house", "porto", "studio-visit"],
    },
  },
  {
    _id: "casa-monte-archdaily-award",
    _type: "journalArticle",
    title: "Casa Monte Named ArchDaily Building of the Year",
    slug: { _type: "slug", current: "casa-monte-archdaily-award" },
    excerpt:
      "Our hillside residence in the Algarve has been recognised as one of the year's most significant buildings.",
    type: "award",
    category: "awards",
    publishedAt: "2025-06-08T10:00:00.000Z",
    readingTime: 2,
    author: {
      name: "RAFA Design Hub",
    },
    imageFile: "/images/journal/casa-monte-award.jpg",
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Recognition" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "We are delighted to share that Casa Monte has been selected as ArchDaily Building of the Year in the Residential category.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The award recognises projects that demonstrate architectural excellence and contribute positively to the profession and the built environment. To be included among the winning projects this year is a humbling validation of the studio's approach.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "The Project" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Casa Monte, completed in 2025, is a private residence that negotiates a steep hillside site above the Atlantic. The house stretches along the contour of the slope, opening its interior to the landscape through carefully positioned apertures. Local stone anchors the volume to the ground; white render and deep overhangs respond to the Mediterranean climate.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Acknowledgment" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The project was a collaboration with an exceptional team of consultants, builders, and craftspeople, and above all with clients who trusted the process. We thank them all.",
          },
        ],
      },
    ],
    seo: {
      keywords: ["award", "casa-monte", "archdaily", "recognition"],
    },
  },
];

async function uploadImage(imagePath) {
  try {
    const projectRoot = join(__dirname, "..");
    const fullPath = join(projectRoot, "public", imagePath);
    if (!existsSync(fullPath)) {
      console.warn(`⚠️  Image not found on disk: ${fullPath}`);
      return null;
    }
    const imageBuffer = readFileSync(fullPath);

    const asset = await client.assets.upload("image", imageBuffer, {
      filename: imagePath.split("/").pop(),
    });

    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.warn(`⚠️  Could not upload image ${imagePath}:`, error.message);
    return null;
  }
}

function assignKeys(content) {
  return content.map((block) => {
    const keyedBlock = { ...block, _key: generateKey() };
    if (Array.isArray(keyedBlock.children)) {
      keyedBlock.children = keyedBlock.children.map((child) => ({
        ...child,
        _key: generateKey(),
      }));
    }
    return keyedBlock;
  });
}

async function migrateArticles() {
  console.log("🚀 Starting Journal Articles Migration\n");
  console.log(`📊 Found ${rawArticles.length} articles to migrate\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const raw of rawArticles) {
    try {
      console.log(`📝 Migrating: ${raw.title}`);

      const { imageFile, ...articleData } = raw;
      articleData.content = assignKeys(articleData.content);

      if (imageFile) {
        const heroImage = await uploadImage(imageFile);
        if (heroImage) {
          heroImage.alt = articleData.title;
          articleData.hero = heroImage;
        }
      }

      // Publish directly via createOrReplace
      const result = await client.createOrReplace(articleData);

      console.log(`   ✅ Published successfully (ID: ${result._id})`);
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
  console.log(`   Total: ${rawArticles.length}`);
  console.log("═══════════════════════════════════════════════\n");
}

migrateArticles().catch((error) => {
  console.error("💥 Migration failed:", error);
  process.exit(1);
});
