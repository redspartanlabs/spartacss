// Tests for the documentation example validator (ADR-0007, ADR-0008).
//
// Run with: node --test scripts/verify-docs-preview.test.mjs
//
// Each rule is shown to fail on a deliberately bad page, and to pass on the
// nearest good one, because a check that has only ever passed has not been
// shown to check anything. No dependencies.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import {
  HEIGHT_RANGE,
  checkPage,
  checkTree,
  definedClasses,
  headingsOf,
  parseMarker,
  scanFences,
  usedClasses,
} from './verify-docs-preview.mjs';

const CLASSES = new Set(['sp-button', 'sp-button--sm', 'sp-button--md', 'sp-button--lg', 'sp-card', 'sp-w-1/2']);
const fence = (info, body) => `\`\`\`${info}\n${body}\n\`\`\`\n`;
const page = (...fences) => `# T\n\n${fences.join('\n')}`;
const check = (source, classes = CLASSES) => checkPage('docs/x.md', source, classes);
const messages = (source, classes) => check(source, classes).problems.join('\n');

describe('the marker grammar', () => {
  it('reads "html preview", with or without one height hint', () => {
    assert.deepEqual(parseMarker('html preview'), { kind: 'example', height: null, wide: null });
    assert.deepEqual(parseMarker('html   preview'), { kind: 'example', height: null, wide: null });
    assert.deepEqual(parseMarker('html preview height=14'), { kind: 'example', height: 14, wide: null });
    assert.deepEqual(parseMarker('html preview height=14 wide=8'), { kind: 'example', height: 14, wide: 8 });
    assert.deepEqual(parseMarker(`html preview height=${HEIGHT_RANGE.min} wide=${HEIGHT_RANGE.max}`), { kind: 'example', height: HEIGHT_RANGE.min, wide: HEIGHT_RANGE.max });
  });

  it('sees no marker where the word never appears', () => {
    for (const info of ['', 'html', 'css', 'html title=x', 'html previews', 'html nopreview', 'html title=preview']) {
      assert.deepEqual(parseMarker(info), { kind: 'none' }, info);
    }
  });

  it('calls every other mention of the word malformed', () => {
    for (const info of [
      'html Preview',
      'html PREVIEW',
      'HTML preview',
      'css preview',
      'preview',
      'preview html',
      'html preview extra',
      'html preview height=14 extra',
      'html preview height=',
      'html preview height=abc',
      'html preview height=1.5',
      'html preview height=-4',
      'html preview width=14',
      'html preview height=14 height=16',
      'html preview wide=8',
      'html preview wide=8 height=14',
      'html preview height=14 wide=',
      'html preview height=14 wide=abc',
      'html preview height=14 wide=8 wide=9',
      'html preview height=14 wide=8 extra',
      `html preview height=14 wide=${HEIGHT_RANGE.min - 1}`,
      `html preview height=14 wide=${HEIGHT_RANGE.max + 1}`,
      `html preview height=${HEIGHT_RANGE.min - 1}`,
      `html preview height=${HEIGHT_RANGE.max + 1}`,
    ]) {
      assert.equal(parseMarker(info).kind, 'malformed', info);
    }
  });

  it('calls a height or wide hint on a fence that is not a marker malformed (ADR-0008)', () => {
    for (const info of ['html height=14', 'html wide=8', 'html wide=8 height=14', 'css height=14', 'height=14', 'html HEIGHT=14', 'html Wide=8']) {
      assert.equal(parseMarker(info).kind, 'malformed', info);
    }
  });

  it('does not read a hint-like word elsewhere in an info string as a hint', () => {
    for (const info of ['html title=height', 'html data-height=14', 'html heights=14', 'html title=wide=8']) {
      assert.deepEqual(parseMarker(info), { kind: 'none' }, info);
    }
  });

  it('rejects a malformed marker in a page', () => {
    assert.match(messages(page(fence('html Preview', '<b>x</b>'))), /malformed preview marker/);
    assert.match(messages(page(fence('html preview height=2', '<b>x</b>'))), /outside 3-60 rem/);
    assert.match(messages(page(fence('css preview', 'b{}'))), /malformed preview marker/);
    assert.match(messages(page(fence('html height=14', '<b>x</b>'))), /only valid after "html preview"/);
  });
});

describe('any number of examples per page (ADR-0008)', () => {
  it('accepts none, one and many', () => {
    assert.equal(check(page(fence('html', '<b>x</b>'))).marked.length, 0);
    assert.equal(check(page(fence('html preview', '<b>x</b>'))).marked.length, 1);
    const many = check(page(fence('html preview', '<a>1</a>'), fence('html preview height=12', '<b>2</b>'), fence('html', '<i>3</i>'), fence('html preview', '<u>4</u>')));
    assert.deepEqual(many.problems, []);
    assert.deepEqual(many.marked.map((m) => [m.body, m.height]), [['<a>1</a>', null], ['<b>2</b>', 12], ['<u>4</u>', null]]);
  });
});

describe('what an example may contain', () => {
  const bad = (body) => messages(page(fence('html preview', body)));

  it('accepts ordinary markup and safe attributes', () => {
    assert.equal(bad('<button class="sp-button" type="button" aria-label="once" disabled>Go</button>'), '');
    assert.equal(bad('<a href="#top">a</a><a href="https://example.test/x">b</a><a href="mailto:a@b.c">c</a>'), '');
  });

  for (const [name, body, pattern] of [
    ['a script', '<script>1</script>', /<script>/],
    ['an event handler', '<button onclick="x()">a</button>', /event-handler/],
    ['a javascript: URL', '<a href="javascript:alert(1)">a</a>', /javascript:, data: or vbscript:/],
    ['a data: URL', "<a href='data:text/html,x'>a</a>", /javascript:, data: or vbscript:/],
    ['an iframe', '<iframe src="https://x.test"></iframe>', /loads, embeds or submits/],
    ['an object', '<object data="x"></object>', /loads, embeds or submits/],
    ['a link element', '<link rel="stylesheet" href="https://x.test/x.css">', /loads, embeds or submits/],
    ['a style element', '<style>b{color:red}</style>', /loads, embeds or submits/],
    ['a base element', '<base href="https://x.test/">', /loads, embeds or submits/],
    ['a form', '<form action="https://x.test"></form>', /loads, embeds or submits/],
    ['a whole document', '<!doctype html><html></html>', /whole document/],
    ['nothing', '   ', /empty/],
    ['a site-relative link', '<a href="/docs/x">a</a>', /site-relative href target "\/docs\/x"/],
    ['a relative link', '<a href="./x.html">a</a>', /site-relative/],
    ['a bare relative link', "<a href='x.html'>a</a>", /site-relative/],
    ['a protocol-relative source', '<img src="//cdn.test/x.png" alt="">', /site-relative src/],
    ['an empty link', '<a href="">a</a>', /site-relative/],
    ['an unquoted relative link', '<a href=docs/x>a</a>', /site-relative/],
  ]) {
    it(`rejects ${name}`, () => {
      assert.match(bad(body), pattern);
    });
  }

  it('does not apply the unsafe-content rules to an unmarked example', () => {
    assert.equal(messages(page(fence('html', '<script>1</script><a href="/x" onclick="y()">a</a>'))), '');
  });

  it('rejects a marked example in an unclosed fence', () => {
    assert.match(messages('# T\n\n```html preview\n<b>x</b>\n'), /unclosed fence/);
  });
});

describe('classes must exist (ADR-0008)', () => {
  it('accepts classes the built CSS defines', () => {
    assert.equal(messages(page(fence('html', '<div class="sp-card"><button class="sp-button sp-button--sm other">a</button></div>'))), '');
    assert.equal(messages(page(fence('html preview', "<div class='sp-card sp-w-1/2'></div>"))), '');
  });

  it('rejects a class the built CSS does not define, in a marked or an unmarked example', () => {
    assert.match(messages(page(fence('html', '<div class="sp-card sp-nope">a</div>'))), /class "sp-nope" is not defined/);
    assert.match(messages(page(fence('html preview', '<div class="sp-button--huge">a</div>'))), /class "sp-button--huge" is not defined/);
  });

  it('names the file and line', () => {
    assert.match(messages('# T\n\n\n```html\n<div class="sp-nope"></div>\n```\n'), /docs\/x\.md:4: class "sp-nope"/);
  });

  it('ignores classes outside html fences, classes without the prefix, and placeholders', () => {
    assert.equal(messages(page(fence('css', '.sp-nope{}'), fence('', '<div class="sp-nope">'))), '');
    assert.equal(messages(page(fence('html', '<div class="my-card sp-card {{ cls }} sp-...">a</div>'))), '');
  });

  it('skips the check, rather than failing it, when there is no built CSS to read', () => {
    assert.equal(messages(page(fence('html', '<div class="sp-nope"></div>')), null), '');
  });

  it('reads defined classes from CSS, resolving escapes and ignoring comments', () => {
    const css = '/* .sp-commented {} */ .sp-card, .sp-button:hover::after{} .sp-w-1\\/2 .sp-a:not(.sp-b){} .other{}';
    assert.deepEqual([...definedClasses(css)].sort(), ['sp-a', 'sp-b', 'sp-button', 'sp-card', 'sp-w-1/2']);
  });

  it('reads used classes from single- and double-quoted attributes', () => {
    assert.deepEqual([...usedClasses(`<a class="sp-a plain  sp-b"><b class='sp-c'></b><i data-class="sp-d"></i></a>`)].sort(), ['sp-a', 'sp-b', 'sp-c']);
  });
});

describe('fences', () => {
  it('does not count a marker shown inside a longer example fence', () => {
    const source = '````markdown\n```html preview\n<b>x</b>\n```\n````\n';
    assert.equal(check(source).marked.length, 0);
    assert.equal(scanFences(source).length, 1);
  });

  it('reads tilde fences and CRLF sources like backtick fences and LF', () => {
    assert.equal(check('~~~html preview\n<b>x</b>\n~~~\n').marked.length, 1);
    assert.equal(check('```html preview\r\n<b>x</b>\r\n```\r\n').marked.length, 1);
  });
});

describe('a documentation tree', () => {
  const tree = ({ css = '.sp-button{} .sp-button--sm{} .sp-button--md{} .sp-button--lg{}', files = {}, withCss = true } = {}) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sp-docs-'));
    fs.mkdirSync(path.join(root, 'docs'));
    fs.mkdirSync(path.join(root, 'dist'));
    if (withCss) fs.writeFileSync(path.join(root, 'dist', 'sparta-all.css'), css);
    for (const [name, content] of Object.entries(files)) {
      fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
      fs.writeFileSync(path.join(root, name), content);
    }
    return root;
  };
  const REQUIRED = { 'docs/button.md': { min: 2, contains: ['sp-button--sm', 'sp-button--lg'] } };
  const good = page(fence('html preview', '<button class="sp-button sp-button--sm">a</button>'), fence('html preview', '<button class="sp-button sp-button--lg">b</button>'));
  const run = (options) => checkTree(tree(options), { required: REQUIRED, sections: {} }).problems.join('\n');

  it('accepts a sound tree', () => {
    assert.equal(run({ files: { 'docs/button.md': good } }), '');
  });

  it('requires the listed pages, and at least the examples each must carry', () => {
    assert.match(run({ files: { 'docs/other.md': good } }), /docs\/button\.md: required page not found/);
    assert.match(run({ files: { 'docs/button.md': page(fence('html preview', '<b class="sp-button">a</b>')) } }), /expected at least 2 marked example\(s\), found 1/);
    assert.match(run({ files: { 'docs/button.md': page(fence('html preview', '<b class="sp-button--sm">a</b>'), fence('html preview', '<b class="sp-button--sm">b</b>')) } }), /do not demonstrate "sp-button--lg"/);
  });

  it('finds problems in nested pages', () => {
    assert.match(run({ files: { 'docs/button.md': good, 'docs/deep/er.md': page(fence('html preview', '<script>1</script>')) } }), /docs\/deep\/er\.md:\d+: marked example contains a <script>/);
  });

  it('refuses to pass without built CSS to check classes against', () => {
    assert.match(run({ withCss: false, files: { 'docs/button.md': good } }), /not found — build before verifying/);
  });

  it('reports a class missing from the built CSS', () => {
    assert.match(run({ css: '.sp-button{}', files: { 'docs/button.md': good } }), /class "sp-button--sm" is not defined/);
  });

  it('refuses a root with no docs', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sp-nodocs-'));
    assert.match(checkTree(root).problems.join('\n'), /no docs\/ directory/);
  });
});

describe('required sections', () => {
  it('reads headings from level two to four, and ignores fenced code', () => {
    const source = '# Title\n\n## One\n\n### Two\n\n#### Three\n\n##### Five\n\n```md\n## Not a heading\n```\n\n## Last\n';
    assert.deepEqual(headingsOf(source), ['One', 'Two', 'Three', 'Last']);
  });

  const tree = (pages) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sp-sections-'));
    fs.mkdirSync(path.join(root, 'docs'));
    fs.mkdirSync(path.join(root, 'dist'));
    fs.writeFileSync(path.join(root, 'dist', 'sparta-all.css'), '.sp-button{}');
    for (const [name, content] of Object.entries(pages)) fs.writeFileSync(path.join(root, 'docs', name), content);
    return root;
  };
  const SECTIONS = { 'docs/a.md': ['Accessibility', 'Common mistakes', 'Related'] };
  const run = (content) => checkTree(tree({ 'a.md': content }), { required: {}, sections: SECTIONS }).problems.join('\n');

  it('accepts a page that has every required section', () => {
    assert.equal(run('# A\n\n## Accessibility\n\n## Common mistakes\n\n## Related\n'), '');
  });

  it('matches a heading by its start and without regard to case', () => {
    assert.equal(run('# A\n\n### Accessibility (all form primitives)\n\n## common MISTAKES\n\n## Related pages\n'), '');
  });

  it('names each missing section', () => {
    const out = run('# A\n\n## Accessibility\n');
    assert.match(out, /missing a "Common mistakes" section/);
    assert.match(out, /missing a "Related" section/);
    assert.doesNotMatch(out, /missing a "Accessibility"/);
  });

  it('does not count a heading that only appears inside a code example', () => {
    assert.match(run('# A\n\n## Accessibility\n\n## Related\n\n```md\n## Common mistakes\n```\n'), /missing a "Common mistakes" section/);
  });

  it('fails when a page that must have sections is absent', () => {
    const root = tree({ 'other.md': '# Other\n' });
    assert.match(checkTree(root, { required: {}, sections: SECTIONS }).problems.join('\n'), /docs\/a\.md: page with required sections not found/);
  });
});
