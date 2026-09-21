#!/usr/bin/env node
/**
 * Copies the built need-homework app into ScalesViewer's public folder
 * so it can be served from the same origin (avoiding iframe blocking).
 *
 * Usage:
 *   node scripts/sync-homework.mjs [path-to-need-homework-dist]
 *
 * Default source: ../need-home-work/dist
 */
import { cp, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const src = resolve(process.argv[2] || resolve(__dirname, "../../", "../need-home-work/dist"));
const dest = resolve(__dirname, "../public/need-homework");

try {
  await stat(src);
} catch {
  console.error(`Source directory not found: ${src}`);
  console.error("Build need-homework first (pnpm run build) or pass the dist path as an argument.");
  process.exit(1);
}

await cp(src, dest, { recursive: true, force: true });
console.log(`Synced need-homework dist to ${dest}`);
