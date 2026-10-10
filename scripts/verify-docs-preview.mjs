// Verifies the documentation live-example contract (ADR-0007, ADR-0008).
//
// Usage: node scripts/verify-docs-preview.mjs [root]
//
// `root` is a directory that contains `docs/` and the built `dist/`: the
// repository root by default, or the extracted release package
// (`<directory>/package`) during a release. Run it after the build, because
// it reads the built stylesheet to learn which classes exist. Exits non-zero,
// listing every violation, when the contract is not met.
//
// What it checks, for every Markdown page under docs/:
//   • a marker is exactly `html preview`, optionally followed by `height=N`
//     and then `wide=M` (each whole rem, 3 to 60; `wide` only with `height`);
//     any other mention of the word `preview` in an info string is malformed,
//     and so is a `height=` or `wide=` token on a fence that is not a marker;
//   • a marked example is a non-empty fragment that is not a whole document,
//     loads and embeds nothing, has no script, no event handler and no
//     javascript:, data: or vbscript: URL, and has no site-relative link;
//   • every `sp-` class named in a `class` attribute of ANY `html` fence is
//     defined by the built CSS (a documented class that does not exist is
//     the failure the component standard forbids);
//   • the pages listed in REQUIRED carry at least the markers they must;
//   • the pages listed in SECTIONS have the headings (levels two to four) the component
//     standard's documentation contract calls for (section 15), so a page that
//     loses its accessibility notes or its common mistakes is caught.
//
// No dependencies. The fence scanner implements the part of CommonMark fenced
// code blocks that the contract needs (backtick or tilde fences, up to three
// spaces of indentation, a closing fence at least as long as the opening one),
// so a marker shown inside a longer example fence is not counted.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Recommended frame heights are whole rem within this range. */
export const HEIGHT_RANGE = { min: 3, max: 60 };

// Pages that must carry live examples, and the least each must carry. The
// documentation index, the accessibility contract and the historical plan carry
// none, and are deliberately absent. `contains` names classes that a page's
// marked examples, taken together, must demonstrate.
export const REQUIRED = {
  'docs/accordion.md': { min: 1 },
  'docs/alert.md': { min: 1 },
  'docs/app-shell.md': { min: 1 },
  'docs/avatar.md': { min: 1 },
  'docs/badge.md': { min: 1 },
  'docs/breadcrumbs.md': { min: 1 },
  'docs/button.md': { min: 1, contains: ['sp-button--sm', 'sp-button--md', 'sp-button--lg'] },
  'docs/card.md': { min: 1 },
  'docs/code.md': { min: 1 },
  'docs/divider.md': { min: 1 },
  'docs/drawer.md': { min: 1 },
  'docs/dropdown.md': { min: 1 },
  'docs/empty-state.md': { min: 1 },
  'docs/forms.md': { min: 1 },
  'docs/getting-started.md': { min: 1 },
  'docs/guide-consistency.md': { min: 1 },
  'docs/guide-forms.md': { min: 1 },
  'docs/guide-layouts.md': { min: 1 },
  'docs/icons.md': { min: 1 },
  'docs/kbd.md': { min: 1 },
  'docs/layout.md': { min: 1 },
  'docs/link.md': { min: 1 },
  'docs/list.md': { min: 1 },
  'docs/modal.md': { min: 1 },
  'docs/motion.md': { min: 1 },
  'docs/notifications.md': { min: 1 },
  'docs/page-header.md': { min: 1 },
  'docs/pagination.md': { min: 1 },
  'docs/progress.md': { min: 1 },
  'docs/stat.md': { min: 1 },
  'docs/table.md': { min: 1 },
  'docs/tabs.md': { min: 1 },
  'docs/theming.md': { min: 1 },
  'docs/tokens.md': { min: 1 },
  'docs/tooltip.md': { min: 1 },
};

// Sections a page must keep, as the start of a heading, compared
// without regard to case ("Accessibility" also matches "Accessibility (all form
// primitives)"). Component pages state how to use the component, what is left to
// the application, and what goes wrong; foundations and guides state what goes
// wrong and where to read next.
const COMPONENT_SECTIONS = ['Accessibility', 'Common mistakes', 'Related'];
const GENERAL_SECTIONS = ['Common mistakes', 'Related'];
const COMPONENT_PAGES = [
  'accordion', 'alert', 'app-shell', 'avatar', 'badge', 'breadcrumbs', 'button', 'card', 'code', 'divider', 'drawer',
  'dropdown', 'empty-state', 'forms', 'icons', 'kbd', 'link', 'list', 'modal', 'notifications', 'page-header',
  'pagination', 'progress', 'stat', 'table', 'tabs', 'tooltip',
];
const GENERAL_PAGES = ['accessibility', 'getting-started', 'guide-consistency', 'guide-forms', 'guide-layouts', 'layout', 'motion', 'theming', 'tokens'];
export const SECTIONS = {
  ...Object.fromEntries(COMPONENT_PAGES.map((p) => [`docs/${p}.md`, COMPONENT_SECTIONS])),
  ...Object.fromEntries(GENERAL_PAGES.map((p) => [`docs/${p}.md`, GENERAL_SECTIONS])),
};

const LINK_ATTRIBUTES = /\b(href|src|action|formaction|poster)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi;

const UNSAFE = [
  [/<script\b/i, 'contains a <script> element'],
  [/<(iframe|object|embed|link|meta|base|style|form)\b/i, 'contains an element that loads, embeds or submits something'],
  [/<!doctype|<html\b|<head\b|<body\b/i, 'is a whole document, not a fragment'],
  [/\son[a-z]+\s*=/i, 'contains an event-handler attribute'],
  [/\b(?:href|src|action|formaction|poster|xlink:href)\s*=\s*["']?\s*(?:javascript|data|vbscript):/i, 'contains a javascript:, data: or vbscript: URL'],
];

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

/** The text of every heading from level two to four, outside fenced code. */
export function headingsOf(source) {
  const headings = [];
  let open = null;
  for (const line of source.replace(/\r\n/g, '\n').split('\n')) {
    if (!open) {
      const m = /^ {0,3}(`{3,}|~{3,})/.exec(line);
      if (m) {
        open = { char: m[1][0], length: m[1].length };
        continue;
      }
      const h = /^#{2,4} (.+?)\s*$/.exec(line);
      if (h) headings.push(h[1]);
    } else {
      const t = line.replace(/^ {0,3}/, '').trimEnd();
      if (t.length >= open.length && [...t].every((c) => c === open.char)) open = null;
    }
  }
  return headings;
}

/**
 * Reads a fence's info string against the marker grammar.
 * @returns {{kind:'none'} | {kind:'example', height:number|null, wide:number|null} | {kind:'malformed', reason:string}}
 */
export function parseMarker(info) {
  const tokens = info.split(/\s+/).filter(Boolean);
  if (!tokens.some((t) => t.toLowerCase() === 'preview')) {
    // A hint belongs to a marker (ADR-0008, decision 2); on any other fence it is a mistake.
    return tokens.some((t) => /^(height|wide)=/i.test(t))
      ? { kind: 'malformed', reason: 'a "height=" or "wide=" hint is only valid after "html preview"' }
      : { kind: 'none' };
  }
  if (tokens[0] !== 'html' || tokens[1] !== 'preview') {
    return { kind: 'malformed', reason: 'expected the language "html" followed by "preview"' };
  }
  if (tokens.length === 2) return { kind: 'example', height: null, wide: null };
  // After "preview": "height=N", then optionally "wide=M", in that order.
  const rest = tokens.slice(2);
  const height = /^height=(\d+)$/.exec(rest[0]);
  const wide = rest.length === 2 ? /^wide=(\d+)$/.exec(rest[1]) : null;
  if (!height || rest.length > 2 || (rest.length === 2 && !wide)) {
    return { kind: 'malformed', reason: 'after "preview" only "height=N", then optionally "wide=M", are allowed' };
  }
  for (const [name, match] of [['height', height], ['wide', wide]]) {
    if (!match) continue;
    const value = Number(match[1]);
    if (value < HEIGHT_RANGE.min || value > HEIGHT_RANGE.max) {
      return { kind: 'malformed', reason: `${name}=${value} is outside ${HEIGHT_RANGE.min}-${HEIGHT_RANGE.max} rem` };
    }
  }
  return { kind: 'example', height: Number(height[1]), wide: wide ? Number(wide[1]) : null };
}

function isSiteRelative(target) {
  if (target.startsWith('#')) return false;
  return !/^[a-z][a-z0-9+.-]*:/i.test(target);
}

/** The `sp-` classes a stylesheet defines, with CSS escapes resolved. */
export function definedClasses(css) {
  const bare = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const classes = new Set();
  for (const m of bare.matchAll(/\.((?:[A-Za-z0-9_-]|\\.)+)/g)) {
    const name = m[1].replace(/\\(.)/g, '$1');
    if (name.startsWith('sp-')) classes.add(name);
  }
  return classes;
}

/** The `sp-` class names written in `class` attributes of an HTML snippet. */
export function usedClasses(html) {
  const used = new Set();
  // `(?<![\w-])` so `data-class="…"` and `aria-class="…"` are not read as `class`.
  for (const m of html.matchAll(/(?<![\w-])class\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    for (const token of (m[1] ?? m[2]).split(/\s+/)) {
      if (token.startsWith('sp-') && !/[{}$<>]|\.\.\./.test(token)) used.add(token);
    }
  }
  return used;
}

/**
 * Checks one page. `classes` is the set of classes the built CSS defines, or
 * null to skip the class check.
 * @returns {{problems: string[], marked: {line:number, body:string, height:number|null}[]}}
 */
export function checkPage(rel, source, classes = null) {
  const problems = [];
  const marked = [];
  for (const fence of scanFences(source)) {
    const where = `${rel}:${fence.line}`;
    const marker = parseMarker(fence.info);
    if (marker.kind === 'malformed') {
      problems.push(`${where}: malformed preview marker "${fence.info}" (${marker.reason})`);
      continue;
    }
    const language = fence.info.split(/\s+/)[0];
    const isHtml = language === 'html';

    if (marker.kind === 'example') {
      if (fence.unclosed) problems.push(`${where}: marked example is in an unclosed fence`);
      marked.push({ line: fence.line, body: fence.body, height: marker.height, wide: marker.wide });
      if (!fence.body.trim()) problems.push(`${where}: marked example is empty`);
      for (const [pattern, what] of UNSAFE) {
        if (pattern.test(fence.body)) problems.push(`${where}: marked example ${what}`);
      }
      for (const m of fence.body.matchAll(LINK_ATTRIBUTES)) {
        const target = (m[2] ?? m[3] ?? m[4] ?? '').trim();
        if (isSiteRelative(target)) {
          problems.push(`${where}: marked example has a site-relative ${m[1].toLowerCase()} target "${target}"`);
        }
      }
    }

    if (isHtml && classes) {
      for (const name of usedClasses(fence.body)) {
        if (!classes.has(name)) problems.push(`${where}: class "${name}" is not defined by the built CSS`);
      }
    }
  }
  return { problems, marked };
}

function markdownFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? markdownFiles(path.join(dir, e.name)) : e.name.endsWith('.md') ? [path.join(dir, e.name)] : []));
}

/** Reads the classes defined by the root's built stylesheet. */
export function loadClasses(root) {
  const file = path.join(root, 'dist', 'sparta-all.css');
  if (!fs.existsSync(file)) return { classes: null, problem: `${file}: not found — build before verifying` };
  return { classes: definedClasses(fs.readFileSync(file, 'utf8')) };
}

export function checkTree(root, { required = REQUIRED, sections = SECTIONS } = {}) {
  const problems = [];
  const docs = path.join(root, 'docs');
  if (!fs.existsSync(docs)) return { problems: [`${docs}: no docs/ directory`], pages: 0, previews: 0 };
  const { classes, problem } = loadClasses(root);
  if (problem) problems.push(problem);

  const markedByPage = new Map();
  const headingsByPage = new Map();
  const files = markdownFiles(docs);
  for (const file of files) {
    const rel = path.relative(root, file).split(path.sep).join('/');
    const source = fs.readFileSync(file, 'utf8');
    const result = checkPage(rel, source, classes);
    problems.push(...result.problems);
    markedByPage.set(rel, result.marked);
    headingsByPage.set(rel, headingsOf(source));
  }
  for (const [rel, wanted] of Object.entries(sections)) {
    const headings = headingsByPage.get(rel);
    if (!headings) {
      problems.push(`${rel}: page with required sections not found`);
      continue;
    }
    for (const name of wanted) {
      if (!headings.some((h) => h.toLowerCase().startsWith(name.toLowerCase()))) {
        problems.push(`${rel}: missing a "${name}" section`);
      }
    }
  }
  for (const [rel, want] of Object.entries(required)) {
    const marked = markedByPage.get(rel);
    if (!marked) {
      problems.push(`${rel}: required page not found`);
      continue;
    }
    if (marked.length < want.min) {
      problems.push(`${rel}: expected at least ${want.min} marked example(s), found ${marked.length}`);
      continue;
    }
    const all = marked.map((m) => m.body).join('\n');
    for (const needle of want.contains ?? []) {
      if (!all.includes(needle)) problems.push(`${rel}: the marked examples do not demonstrate "${needle}"`);
    }
  }
  const previews = [...markedByPage.values()].reduce((n, m) => n + m.length, 0);
  return { problems, pages: files.length, previews, classes: classes?.size ?? 0 };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const { problems, pages, previews, classes } = checkTree(root);
  if (problems.length) {
    for (const p of problems) console.error(`FAIL  ${p}`);
    console.error(`\n${problems.length} problem(s) in the documentation examples (ADR-0007, ADR-0008).`);
    process.exit(1);
  }
  console.log(
    `OK: ${pages} documentation page(s) scanned; ${previews} marked example(s); ` +
      `every sp- class in an html example is defined by the built CSS (${classes} classes); required pages carry their examples.`,
  );
}
