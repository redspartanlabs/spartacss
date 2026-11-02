#!/usr/bin/env node
// Runs the root real-browser regression tests (test/browser, Playwright:
// Chromium, Firefox and WebKit) as part of `npm run verify`.
//
// This installs nothing and never touches a lockfile. In place beforehand:
//
//   npm ci                                                 the dev dependencies
//   npm exec playwright install chromium firefox webkit     the browsers (CI caches them)
//   npm run build                                           dist/sparta-all.css
//
// One thing is checked first so a failure says what is wrong instead of failing
// obscurely: the stylesheet under test is not older than its source.

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const CSS = resolve(process.env.SPARTA_CSS || "dist/sparta-all.css");
const ROOT_PW = "node_modules/@playwright/test/package.json";

function stop(message, fix) {
  console.error(`error: ${message}`);
  if (fix) console.error(`Fix it with:\n  ${fix}`);
  process.exit(1);
}

if (!existsSync(ROOT_PW)) stop("the Playwright dev dependency is not installed.", "npm ci");
if (!existsSync(CSS)) stop(`${CSS} is missing; the tests run against the built stylesheet.`, "npm run build");

// The stylesheet must not be older than any source file (ignored when SPARTA_CSS points elsewhere).
if (!process.env.SPARTA_CSS) {
  let newest = 0;
  (function walk(dir) {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name.endsWith(".css")) newest = Math.max(newest, statSync(path).mtimeMs);
    }
  })("src");
  if (statSync(CSS).mtimeMs < newest) stop("dist/sparta-all.css is older than the CSS source; the tests would check a stale build.", "npm run build");
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const result = spawnSync(npm, ["exec", "--", "playwright", "test", "--config", "test/browser/playwright.config.mjs"], {
  encoding: "utf8",
  shell: process.platform === "win32",
});
process.stdout.write(result.stdout ?? "");
process.stderr.write(result.stderr ?? "");
if (result.status !== 0 && /Executable doesn't exist|npx playwright install|browserType\.launch/.test(`${result.stdout}${result.stderr}`)) {
  console.error("\nThe Playwright browsers may not be installed. Install them (once) with:\n  npm exec playwright install chromium firefox webkit");
}
process.exit(result.status ?? 1);
