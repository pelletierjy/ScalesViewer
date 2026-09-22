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
import { cp, stat, readFile, writeFile } from "node:fs/promises";

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

// Create a stable entry-point script that HomeworkPanel.tsx expects,
// but only if the widget build didn't already produce one.
try {
  const widgetPath = resolve(dest, "need-homework-widget.js");
  try {
    await stat(widgetPath);
    console.log("Widget entry point already exists, skipping creation.");
  } catch {
    const indexHtmlPath = resolve(dest, "index.html");
    const html = await readFile(indexHtmlPath, "utf-8");
    const scriptMatch = html.match(/<script[^>]*type=["']module["'][^>]*src=["']([^"']+)["']/);
    if (scriptMatch) {
      const scriptSrc = scriptMatch[1]; // e.g. /need-homework/assets/index-XXXX.js
      const relativePath = scriptSrc.replace(/^\/need-homework\//, "./");
      await writeFile(widgetPath, `import "${relativePath}";\n`);
      console.log(`Created stable entry point: ${widgetPath}`);
    } else {
      console.warn("Could not find module script in index.html; skipping entry-point creation.");
    }
  }
} catch (err) {
  console.warn("Failed to create stable entry point:", err.message);
}
