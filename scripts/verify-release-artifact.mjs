#!/usr/bin/env node
// Verifies that every entry in package.json's `exports` map resolves to a
// real, non-empty file. Run `npm run build` first; this script does not
// build. Intended to run before a release tag is cut, so a tagged release
// can never ship an `exports` entry that does not resolve to a built
// artifact — this is the mechanical check for the release-artifact
// contract described in the distribution architecture decision.

import { existsSync, readFileSync, statSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url)));
const exportsMap = pkg.exports ?? {};
const specifiers = Object.entries(exportsMap);

if (specifiers.length === 0) {
  console.error("error: package.json has no \"exports\" entries to verify.");
  process.exit(1);
}

let missing = 0;

for (const [specifier, target] of specifiers) {
  const relPath = target.replace(/^\.\//, "");
  const exists = existsSync(relPath);
  const size = exists ? statSync(relPath).size : 0;
  const ok = exists && size > 0;
  const status = ok ? "OK  " : "MISS";
  console.log(
    `${status}  ${specifier.padEnd(30)} -> ${target}${ok ? `  (${size} bytes)` : ""}`
  );
  if (!ok) missing++;
}

console.log();
if (missing > 0) {
  console.error(
    `error: ${missing} of ${specifiers.length} export target(s) missing or empty in dist/. Run 'npm run build' first.`
  );
  process.exit(1);
}

console.log(`OK: all ${specifiers.length} export target(s) resolved to built artifacts.`);
