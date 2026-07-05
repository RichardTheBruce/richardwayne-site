// Build-time image prep script.
// Copies staged source images into public/work/ and produces cropped
// variants for the tall landing-page screenshots so card art does not
// have to render an entire 7000px+ scroll capture.
//
// Run with: node scripts/prep-images.mjs

import { mkdir, readdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, "..");
const stagingDir = path.resolve(siteRoot, "..", "assets-staging");
const outDir = path.join(siteRoot, "public", "work");

const crops = [
  { file: "memetropolis-landing.png", out: "memetropolis-landing-crop.png", top: 1600 },
  { file: "ppe-rebuild-landing.png", out: "ppe-rebuild-landing-crop.png", top: 1600 },
  { file: "ppe-legacy-landing.png", out: "ppe-legacy-landing-crop.png", top: 1200 },
];

async function main() {
  if (!existsSync(stagingDir)) {
    throw new Error(`Staging directory not found: ${stagingDir}`);
  }
  await mkdir(outDir, { recursive: true });

  const files = await readdir(stagingDir);
  for (const file of files) {
    if (!file.toLowerCase().endsWith(".png")) continue;
    const src = path.join(stagingDir, file);
    const dest = path.join(outDir, file);
    await copyFile(src, dest);
    console.log(`copied ${file}`);
  }

  for (const crop of crops) {
    const src = path.join(stagingDir, crop.file);
    if (!existsSync(src)) {
      console.warn(`skip crop, source missing: ${crop.file}`);
      continue;
    }
    const meta = await sharp(src).metadata();
    const width = meta.width ?? 1440;
    const height = Math.min(crop.top, meta.height ?? crop.top);
    const dest = path.join(outDir, crop.out);
    await sharp(src)
      .extract({ left: 0, top: 0, width, height })
      .png()
      .toFile(dest);
    console.log(`cropped ${crop.file} -> ${crop.out} (${width}x${height})`);
  }

  console.log("Image prep complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
