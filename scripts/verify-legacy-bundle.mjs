#!/usr/bin/env node
// Verifies that dist/spartacss.css — the legacy default bundle
// (`.` / `./spartacss.css` exports) — has not drifted from the committed
// baseline snapshot. Run `npm run build` first; this script does not build.
//
// If this fails on a change that is an intentional, reviewed update to the
// legacy bundle's contents, regenerate the baseline deliberately:
//   npm run build && cp dist/spartacss.css test/baseline/spartacss.css
// and commit the updated baseline alongside the change that caused it.
//
// Line endings are normalized (CRLF -> LF) before comparison so that a
// platform-driven checkout/build line-ending difference is not reported as
// content drift; see .gitattributes for the corresponding storage-side fix.

import { existsSync, readFileSync } from "node:fs";

const DIST_FILE = "dist/spartacss.css";
const BASELINE_FILE = "test/baseline/spartacss.css";

function normalize(text) {
  return text.replace(/\r\n/g, "\n");
}

if (!existsSync(DIST_FILE)) {
  console.error(`error: ${DIST_FILE} not found. Run 'npm run build' first.`);
  process.exit(1);
}

if (!existsSync(BASELINE_FILE)) {
  console.error(`error: ${BASELINE_FILE} not found. Nothing to verify against.`);
  process.exit(1);
}

const dist = normalize(readFileSync(DIST_FILE, "utf8"));
const baseline = normalize(readFileSync(BASELINE_FILE, "utf8"));

if (dist === baseline) {
  console.log(`OK: ${DIST_FILE} matches the committed baseline.`);
  process.exit(0);
}

const distLines = dist.split("\n");
const baselineLines = baseline.split("\n");
const maxLines = Math.max(distLines.length, baselineLines.length);
let firstDiff = -1;
for (let i = 0; i < maxLines; i++) {
  if (distLines[i] !== baselineLines[i]) {
    firstDiff = i;
    break;
  }
}

console.error();
console.error(`error: ${DIST_FILE} has drifted from ${BASELINE_FILE}.`);
console.error(`First difference at line ${firstDiff + 1}:`);
console.error(`  baseline: ${baselineLines[firstDiff] ?? "<end of file>"}`);
console.error(`  dist:     ${distLines[firstDiff] ?? "<end of file>"}`);
console.error(
  `(baseline: ${baselineLines.length} lines, dist: ${distLines.length} lines)`
);
console.error();
console.error("If this change is intentional, regenerate the baseline and commit it:");
console.error(`  npm run build && cp ${DIST_FILE} ${BASELINE_FILE}`);
process.exit(1);
