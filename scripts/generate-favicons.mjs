/**
 * Favicon Generator Script
 *
 * Extracts the official geometric monogram from `public/logo/rafa-bg-black.png`
 * and generates properly sized, high-contrast, edge-to-edge favicons:
 *
 *   - favicon-16x16.png (16x16)
 *   - favicon-32x32.png (32x32)
 *   - apple-touch-icon.png (180x180)
 *   - android-chrome-192x192.png (192x192)
 *   - android-chrome-512x512.png (512x512)
 *   - favicon.ico (multi-resolution: 16, 32, 48)
 *
 * Usage: node scripts/generate-favicons.mjs
 */

import fs from "fs";
import path from "path";

import sharp from "sharp";

// Bounding box of the mark alone in public/logo/rafa-bg-black.png
const MARK_BBOX = {
  left: 966,
  top: 611,
  width: 458,
  height: 619,
};

const BG_COLOR = { r: 10, g: 10, b: 10, alpha: 1 }; // #0a0a0a

/**
 * Creates a valid multi-image ICO buffer from PNG buffers.
 * @param {Array<{ width: number, height: number, buffer: Buffer }>} images
 * @returns {Buffer}
 */
function createIco(images) {
  const headerSize = 6;
  const entrySize = 16;
  const numImages = images.length;
  let offset = headerSize + entrySize * numImages;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: 1 = ICO
  header.writeUInt16LE(numImages, 4); // Number of images

  const entries = [];
  const imageBuffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0); // Width
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset to image data

    entries.push(entry);
    imageBuffers.push(img.buffer);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...imageBuffers]);
}

async function renderIcon(extractedBuffer, size, fillRatio = 0.8) {
  const markHeight = Math.round(size * fillRatio);
  const markWidth = Math.round(markHeight * (MARK_BBOX.width / MARK_BBOX.height));

  const resizedMark = await sharp(extractedBuffer)
    .resize(markWidth, markHeight, {
      fit: "contain",
      kernel: size <= 32 ? "lanczos3" : "lanczos3",
    })
    .toBuffer();

  let pipeline = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG_COLOR,
    },
  }).composite([{ input: resizedMark, gravity: "center" }]);

  // Boost contrast slightly at micro-sizes so strokes pop on dark and light tabs
  if (size <= 32) {
    pipeline = pipeline.sharpen({ sigma: 0.8, m1: 1.5, m2: 0.5 });
  }

  return pipeline.png().toBuffer();
}

async function main() {
  console.log("📐 Extracting high-resolution mark from public/logo/rafa-bg-black.png...");
  const extractedBuffer = await sharp("public/logo/rafa-bg-black.png")
    .extract(MARK_BBOX)
    .toBuffer();

  const outDir = path.join(process.cwd(), "public", "favicon");

  console.log("🎨 Rendering optimized favicon assets (80% fill ratio)...");

  // 16x16
  const buf16 = await renderIcon(extractedBuffer, 16, 0.82);
  fs.writeFileSync(path.join(outDir, "favicon-16x16.png"), buf16);
  console.log("   ✓ favicon-16x16.png (16x16)");

  // 32x32
  const buf32 = await renderIcon(extractedBuffer, 32, 0.82);
  fs.writeFileSync(path.join(outDir, "favicon-32x32.png"), buf32);
  console.log("   ✓ favicon-32x32.png (32x32)");

  // 48x48 (for ICO)
  const buf48 = await renderIcon(extractedBuffer, 48, 0.82);

  // 180x180 (Apple Touch)
  const buf180 = await renderIcon(extractedBuffer, 180, 0.78);
  fs.writeFileSync(path.join(outDir, "apple-touch-icon.png"), buf180);
  console.log("   ✓ apple-touch-icon.png (180x180)");

  // 192x192 (Android Chrome)
  const buf192 = await renderIcon(extractedBuffer, 192, 0.78);
  fs.writeFileSync(path.join(outDir, "android-chrome-192x192.png"), buf192);
  console.log("   ✓ android-chrome-192x192.png (192x192)");

  // 512x512 (Android Chrome)
  const buf512 = await renderIcon(extractedBuffer, 512, 0.78);
  fs.writeFileSync(path.join(outDir, "android-chrome-512x512.png"), buf512);
  console.log("   ✓ android-chrome-512x512.png (512x512)");

  // Multi-resolution favicon.ico (16, 32, 48)
  const icoBuf = createIco([
    { width: 16, height: 16, buffer: buf16 },
    { width: 32, height: 32, buffer: buf32 },
    { width: 48, height: 48, buffer: buf48 },
  ]);
  fs.writeFileSync(path.join(outDir, "favicon.ico"), icoBuf);
  console.log("   ✓ favicon.ico (multi-resolution: 16, 32, 48)");

  // Clean up any test preview files
  const testPreviews = [
    path.join(outDir, "test-preview-512.png"),
    path.join(outDir, "test-preview-32.png"),
  ];
  for (const p of testPreviews) {
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  console.log("\n✨ All favicons successfully generated with optimal scaling!\n");
}

main().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
