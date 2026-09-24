#!/usr/bin/env node
/**
 * Lists every "[COMPLETAR]" content placeholder under app/.
 * Default: prints them (as GitHub annotations in CI) and exits 0.
 * --strict: exits 1 if any remain — use it once all content is filled in.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SCAN_DIR = join(ROOT, "app");
const MARKER = "[COMPLETAR";
const strict = process.argv.includes("--strict");
const inCI = process.env.GITHUB_ACTIONS === "true";

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (/\.(ts|tsx)$/.test(name) && !/\.test\.tsx?$/.test(name)) yield path;
  }
}

const hits = [];
for (const file of walk(SCAN_DIR)) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.includes(MARKER)) hits.push({ file: relative(ROOT, file).replaceAll("\\", "/"), line: i + 1, text: line.trim() });
    });
}

for (const hit of hits) {
  if (inCI) console.log(`::warning file=${hit.file},line=${hit.line}::Content placeholder: ${hit.text}`);
  else console.log(`${hit.file}:${hit.line}  ${hit.text}`);
}
console.log(hits.length === 0 ? "No content placeholders left." : `${hits.length} content placeholder(s) left.`);

process.exit(strict && hits.length > 0 ? 1 : 0);
