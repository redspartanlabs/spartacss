// Verifies the documentation live-example contract (ADR-0007).
//
// Usage: node scripts/verify-docs-preview.mjs [root]
//
// `root` is a directory that contains `docs/`: the repository root by default,
// or the extracted release package (`<directory>/package`) during a release.
// Exits non-zero, listing every violation, when the contract is not met.
//
// No dependencies. The fence scanner implements the part of CommonMark fenced
// code blocks that the contract needs (backtick or tilde fences, up to three
// spaces of indentation, a closing fence at least as long as the opening one),
// so a marker shown inside a longer example fence is not counted.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Pages that must carry a marker, and what the marked example must contain.
export const REQUIRED = {
  'docs/button.md': { count: 1, contains: ['sp-button--sm', 'sp-button--md', 'sp-button--lg'] },
};

const LINK_ATTRIBUTES = /\b(href|src|action|formaction|poster)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi;

export function scanFences(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const fences = [];
  let open = null;
  lines.forEach((line, index) => {
    if (!open) {
      const m = /^( {0,3})(`{3,}|~{3,})(.*)$/.exec(line);
      if (m && !(m[2][0] === '`' && m[3].includes('`'))) {
        open = { char: m[2][0], length: m[2].length, line: index + 1, info: m[3].trim(), body: [] };
      }
      return;
    }
    const stripped = line.replace(/^ {0,3}/, '').trimEnd();
    const closes =
      line.length - line.replace(/^ {0,3}/, '').length <= 3 &&
      stripped.length >= open.length &&
      [...stripped].every((c) => c === open.char);
    if (closes) {
      fences.push({ line: open.line, info: open.info, body: open.body.join('\n') });
      open = null;
    } else {
      open.body.push(line);
    }
  });
  if (open) fences.push({ line: open.line, info: open.info, body: open.body.join('\n'), unclosed: true });
  return fences;
}

function isSiteRelative(target) {
  if (target.startsWith('#')) return false;
  return !/^[a-z][a-z0-9+.-]*:/i.test(target);
}

export function checkPage(rel, source) {
  const problems = [];
  const marked = [];
  for (const fence of scanFences(source)) {
    const tokens = fence.info.split(/\s+/).filter(Boolean);
    if (!tokens.slice(1).some((t) => t.toLowerCase() === 'preview') && tokens[0]?.toLowerCase() !== 'preview') continue;
    const where = `${rel}:${fence.line}`;
    if (tokens.length !== 2 || tokens[0] !== 'html' || tokens[1] !== 'preview') {
      problems.push(`${where}: malformed preview marker "${fence.info}" (expected exactly "html preview")`);
      continue;
    }
    if (fence.unclosed) problems.push(`${where}: marked example is in an unclosed fence`);
    marked.push(fence);
    if (!fence.body.trim()) problems.push(`${where}: marked example is empty`);
    if (/<script\b/i.test(fence.body)) problems.push(`${where}: marked example contains a <script> element`);
    if (/<!doctype|<html\b|<head\b|<body\b/i.test(fence.body)) {
      problems.push(`${where}: marked example is a whole document, not a fragment`);
    }
    for (const m of fence.body.matchAll(LINK_ATTRIBUTES)) {
      const target = (m[2] ?? m[3] ?? m[4] ?? '').trim();
      if (isSiteRelative(target)) {
        problems.push(`${where}: marked example has a site-relative ${m[1].toLowerCase()} target "${target}"`);
      }
    }
  }
  if (marked.length > 1) {
    problems.push(`${rel}: ${marked.length} marked examples (at most 1 allowed), at lines ${marked.map((f) => f.line).join(', ')}`);
  }
  return { problems, marked };
}

function markdownFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? markdownFiles(path.join(dir, e.name)) : e.name.endsWith('.md') ? [path.join(dir, e.name)] : []));
}

export function checkTree(root) {
  const problems = [];
  const docs = path.join(root, 'docs');
  if (!fs.existsSync(docs)) return { problems: [`${docs}: no docs/ directory`], pages: 0, previews: 0 };
  const markedByPage = new Map();
  const files = markdownFiles(docs);
  for (const file of files) {
    const rel = path.relative(root, file).split(path.sep).join('/');
    const result = checkPage(rel, fs.readFileSync(file, 'utf8'));
    problems.push(...result.problems);
    markedByPage.set(rel, result.marked);
  }
  for (const [rel, want] of Object.entries(REQUIRED)) {
    const marked = markedByPage.get(rel);
    if (!marked) {
      problems.push(`${rel}: required page not found`);
      continue;
    }
    if (marked.length !== want.count) {
      problems.push(`${rel}: expected exactly ${want.count} marked example(s), found ${marked.length}`);
      continue;
    }
    for (const needle of want.contains) {
      if (!marked[0].body.includes(needle)) problems.push(`${rel}: marked example does not contain "${needle}"`);
    }
  }
  const previews = [...markedByPage.values()].reduce((n, m) => n + m.length, 0);
  return { problems, pages: files.length, previews };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const { problems, pages, previews } = checkTree(root);
  if (problems.length) {
    for (const p of problems) console.error(`FAIL  ${p}`);
    console.error(`\n${problems.length} problem(s) in the documentation preview contract (ADR-0007).`);
    process.exit(1);
  }
  console.log(`OK: ${pages} documentation page(s) scanned; ${previews} marked preview(s); every required page carries its marker.`);
}
