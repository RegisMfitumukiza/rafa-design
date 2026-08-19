import { existsSync } from "node:fs";
import { mkdir, readdir, readFile } from "node:fs/promises";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CONTENT_DIR = join(ROOT, "src", "content");
const OUTPUT_DIR = join(ROOT, "public", "images");

const IMAGE_PATTERN = /\/images\/([\w\-/]+\.jpg)/g;

function hashString(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function aspectForPath(filePath) {
  if (filePath.startsWith("team/")) {
    return { width: 1080, height: 1440 };
  }
  if (filePath.includes("-hero")) {
    return { width: 1600, height: 686 };
  }
  if (filePath.startsWith("projects/")) {
    return { width: 1600, height: 900 };
  }
  if (filePath.startsWith("journal/")) {
    return { width: 1600, height: 900 };
  }
  return { width: 1600, height: 900 };
}

function svgPlaceholder(filePath) {
  const { width, height } = aspectForPath(filePath);
  const hue = 18 + (hashString(filePath) % 30);
  const light = `hsl(${hue} 32% 91%)`;
  const dark = `hsl(${hue} 34% 66%)`;
  const accent = `hsl(${hue} 45% 55%)`;

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${light}"/>
      <stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <radialGradient id="v" cx="0.5" cy="0.42" r="0.78">
      <stop offset="0.62" stop-color="rgba(24,18,12,0)"/>
      <stop offset="1" stop-color="rgba(24,18,12,0.22)"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <rect x="${width * 0.12}" y="${height * 0.6}" width="${width * 0.76}" height="${Math.max(2, height * 0.008)}" fill="${accent}" opacity="0.5"/>
  <rect width="${width}" height="${height}" fill="url(#v)"/>
</svg>`;
}

async function collectImagePaths(dir) {
  const paths = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      paths.push(...(await collectImagePaths(full)));
    } else if (entry.name.endsWith(".ts")) {
      const source = await readFile(full, "utf8");
      for (const match of source.matchAll(IMAGE_PATTERN)) {
        paths.push(match[1]);
      }
    }
  }
  return paths;
}

async function generate() {
  const unique = [...new Set(await collectImagePaths(CONTENT_DIR))].sort();
  let generated = 0;
  let skipped = 0;

  for (const filePath of unique) {
    const target = join(OUTPUT_DIR, filePath);
    if (existsSync(target)) {
      skipped += 1;
      continue;
    }
    await mkdir(dirname(target), { recursive: true });
    const svg = Buffer.from(svgPlaceholder(filePath));
    await sharp(svg).jpeg({ quality: 75 }).toFile(target);
    generated += 1;
  }

  const publicPath = relative(ROOT, OUTPUT_DIR);
  console.log(
    `Placeholder images (${publicPath}): ${generated} generated, ${skipped} already present, ${unique.length} total.`,
  );
}

await generate();
