#!/usr/bin/env node
/**
 * Copies the built need-homework widget bundle into ScalesViewer's public
 * folder so <need-homework-app> can be loaded from the same origin.
 *
 * Usage:
 *   node scripts/sync-homework.mjs [path-to-need-homework-dist]
 *
 * Default source: ../../need-home-work/dist (sibling repo)
 */
import { copyFile, mkdir, rm, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const srcDir = resolve(process.argv[2] || resolve(__dirname, "../../need-home-work/dist"));
const src = resolve(srcDir, "need-homework-widget.js");
const destDir = resolve(__dirname, "../public/need-homework");
const dest = resolve(destDir, "need-homework-widget.js");

try {
  await stat(src);
} catch {
  console.error(`Widget bundle not found: ${src}`);
  console.error("Build need-home-work's widget first (pnpm run build:widget) or pass its dist path as an argument.");
  process.exit(1);
}

await rm(destDir, { recursive: true, force: true });
await mkdir(destDir, { recursive: true });
await copyFile(src, dest);
console.log(`Synced need-homework-widget.js to ${dest}`);
