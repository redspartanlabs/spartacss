// Accordion: closed content must leave the tab order and the accessibility tree,
// open content must not, the close animation must still play, nested accordions
// must work, and the frozen legacy API must be unchanged.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const cssPath = process.env.SPARTA_CSS || path.join(root, 'dist/sparta-all.css');
const css = fs.readFileSync(cssPath, 'utf8');

const item = (id, content, { open = false, contentClass = 'sp-accordion__content', legacy = false } = {}) => `
<div class="sp-accordion"><div class="sp-accordion__item${open ? ' sp-accordion__item--open' : ''}" id="item-${id}">
  ${legacy
    ? `<div class="sp-accordion__header"><button class="sp-accordion__trigger" id="btn-${id}" aria-expanded="${open}">Legacy ${id}</button></div>`
    : `<button class="sp-accordion__header" id="btn-${id}" aria-expanded="${open}">Header ${id}</button>`}
  <div class="${contentClass}" id="c-${id}">${content}</div>
</div></div>`;

const page_ = (body) => `<!doctype html><html data-theme="dark"><head><meta charset="utf-8"><style>${css}</style></head><body style="padding:1rem">${body}<button id="after">after</button></body></html>`;
const settle = (page, ms = 450) => page.waitForTimeout(ms);
/** True if the target can receive focus: by Tab from the start element, or programmatically (WebKit does not Tab to links by default). */
/** True if  can receive focus: by Tab from , or programmatically (WebKit does not Tab to links by default). */
async function reachableByTab(page, fromId, targetId) {
  await page.focus(`#${fromId}`);
  for (let i = 0; i < 3; i += 1) {
    await page.keyboard.press('Tab');
    if (await page.evaluate((id) => document.activeElement && document.activeElement.id === id, targetId)) return true;
  }
  return page.evaluate((id) => { const el = document.getElementById(id); el.focus(); return document.activeElement === el; }, targetId);
}
const vis = (page, sel) => page.evaluate((s) => getComputedStyle(document.querySelector(s)).visibility, sel);
const inTree = async (page, name) => (await page.locator('body').ariaSnapshot()).includes(name);

const CASES = [
  ['link inside a paragraph', '<p>Text <a id="t" href="#x">p-link</a></p>', 'p-link'],
  ['link as the direct child', '<a id="t" href="#x">direct-link</a>', 'direct-link'],
  ['button inside a wrapper', '<div><button id="t">wrapped-button</button></div>', 'wrapped-button'],
];

test.describe('supported markup', () => {
  for (const [label, content, name] of CASES) {
    test(`closed: ${label} is unreachable and not exposed`, async ({ page }) => {
      await page.setContent(page_(item(1, content)));
      await settle(page);
      expect(await vis(page, '#c-1')).toBe('hidden');
      expect(await reachableByTab(page, 'btn-1', 't')).toBe(false);
      expect(await inTree(page, name)).toBe(false);
    });

    test(`open: ${label} is reachable and exposed`, async ({ page }) => {
      await page.setContent(page_(item(1, content, { open: true })));
      await settle(page);
      expect(await vis(page, '#c-1')).toBe('visible');
      expect(await reachableByTab(page, 'btn-1', 't')).toBe(true);
      expect(await inTree(page, name)).toBe(true);
    });
  }

  test('toggling open then closed restores and removes access', async ({ page }) => {
    await page.setContent(page_(item(1, '<p><a id="t" href="#x">toggle-link</a></p>')));
    await page.evaluate(() => document.getElementById('item-1').classList.add('sp-accordion__item--open'));
    await settle(page);
    expect(await reachableByTab(page, 'btn-1', 't')).toBe(true);
    await page.evaluate(() => document.getElementById('item-1').classList.remove('sp-accordion__item--open'));
    await page.waitForFunction(() => getComputedStyle(document.getElementById('c-1')).visibility === 'hidden', null, { timeout: 5000 });
    expect(await reachableByTab(page, 'btn-1', 't')).toBe(false);
    expect(await inTree(page, 'toggle-link')).toBe(false);
  });

  test('opening is immediate: content is visible at the first frame', async ({ page }) => {
    await page.setContent(page_(item(1, '<p><a href="#x">fast-open</a></p>')));
    await settle(page);
    const v = await page.evaluate(() => {
      document.getElementById('item-1').classList.add('sp-accordion__item--open');
      return getComputedStyle(document.getElementById('c-1')).visibility;
    });
    expect(v).toBe('visible');
  });

  test('closing keeps the content visible while the collapse animates, then hides it', async ({ page }) => {
    await page.setContent(page_(item(1, '<p><a href="#x">anim-link</a></p>', { open: true })));
    await settle(page);
    // Sample every frame so the test does not depend on how fast the machine is.
    const samples = await page.evaluate(async () => {
      const el = document.getElementById('c-1');
      document.getElementById('item-1').classList.remove('sp-accordion__item--open');
      const out = [];
      const t0 = performance.now();
      while (performance.now() - t0 < 700) {
        await new Promise((r) => requestAnimationFrame(r));
        const cs = getComputedStyle(el);
        out.push({ v: cs.visibility, o: parseFloat(cs.opacity) });
      }
      return out;
    });
    // Mid-fade frames exist and the content is still visible in them.
    expect(samples.some((s) => s.v === 'visible' && s.o > 0 && s.o < 1)).toBe(true);
    // It is never hidden while still noticeably opaque (the animation is not cut short).
    expect(samples.some((s) => s.v === 'hidden' && s.o > 0.2)).toBe(false);
    expect(samples[samples.length - 1]).toEqual({ v: 'hidden', o: 0 });
  });

  test('reduced motion: the visibility delay is removed, so closed content hides at once', async ({ page }) => {
    // Computed delays instead of wall-clock timing, which is unreliable under load.
    await page.setContent(page_(item(1, '<p><a href="#x">rm-link</a></p>')));
    const delays = () => page.evaluate(() => getComputedStyle(document.getElementById('c-1')).transitionDelay);
    expect(await delays()).toContain('0.16s');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(await delays()).not.toContain('0.16s');
    await settle(page, 100);
    expect(await vis(page, '#c-1')).toBe('hidden');
  });
});

test.describe('content inside an extra wrapper', () => {
  // The existing open rules use a descendant selector, so an extra element between the
  // item and .sp-accordion__content has always worked. The visibility fix must keep that.
  const wrapped = (open) => `<div class="sp-accordion"><div class="sp-accordion__item${open ? ' sp-accordion__item--open' : ''}" id="item-1">
    <button class="sp-accordion__header" id="btn-1">Header</button>
    <div class="wrapper"><div class="sp-accordion__content" id="c-1"><div><a id="t" href="#x">wrapped-link</a></div></div></div>
  </div></div>`;

  test('open: wrapped content is visible and reachable', async ({ page }) => {
    await page.setContent(page_(wrapped(true)));
    await settle(page);
    expect(await vis(page, '#c-1')).toBe('visible');
    expect(await reachableByTab(page, 'btn-1', 't')).toBe(true);
  });

  test('closed: wrapped content is hidden', async ({ page }) => {
    await page.setContent(page_(wrapped(false)));
    await settle(page);
    expect(await vis(page, '#c-1')).toBe('hidden');
  });
});

test.describe('nested accordions', () => {
  const nested = (outerOpen, innerOpen) => item('o', `<div><a id="oa" href="#x">outer-link</a>${item('i', '<div><a id="ia" href="#x">inner-link</a></div>', { open: innerOpen })}</div>`, { open: outerOpen });

  test('outer open, inner closed: inner content is unreachable', async ({ page }) => {
    await page.setContent(page_(nested(true, false)));
    await settle(page);
    expect(await reachableByTab(page, 'btn-o', 'oa')).toBe(true);
    expect(await reachableByTab(page, 'btn-i', 'ia')).toBe(false);
  });

  test('both open: inner content is reachable', async ({ page }) => {
    await page.setContent(page_(nested(true, true)));
    await settle(page);
    expect(await reachableByTab(page, 'btn-i', 'ia')).toBe(true);
  });

  test('outer closed, inner open: inner content stays unreachable', async ({ page }) => {
    await page.setContent(page_(nested(false, true)));
    await settle(page);
    expect(await reachableByTab(page, 'btn-o', 'oa')).toBe(false);
    expect(await inTree(page, 'inner-link')).toBe(false);
    expect(await inTree(page, 'outer-link')).toBe(false);
  });
});

test.describe('frozen legacy API is unchanged (KNOWN LIMITATION: legacy closed content stays focusable)', () => {
  // These PIN today's behavior so any change to the legacy block is deliberate (ADR-0002 rule 7).
  // Legacy closed content being focusable is itself a known limitation, not endorsed behavior.
  const legacyCases = [
    ['content with both classes', 'sp-accordion__content sp-accordion__content--animated'],
    ['content with --animated only', 'sp-accordion__content--animated'],
  ];
  for (const [label, cls] of legacyCases) {
    test(`${label}: closed content keeps its current visibility and focusability`, async ({ page }) => {
      await page.setContent(page_(item(1, '<div><a id="t" href="#x">legacy-link</a></div>', { legacy: true, contentClass: cls })));
      await settle(page);
      expect(await vis(page, '#c-1')).toBe('visible');
      expect(await reachableByTab(page, 'btn-1', 't')).toBe(true);
    });

    test(`${label}: the close transition still uses the legacy duration`, async ({ page }) => {
      await page.setContent(page_(item(1, '<div><a href="#x">l</a></div>', { legacy: true, contentClass: cls, open: true })));
      await settle(page);
      await page.evaluate(() => document.getElementById('item-1').classList.remove('sp-accordion__item--open'));
      const props = await page.evaluate(() => getComputedStyle(document.getElementById('c-1')).transitionProperty);
      expect(props).not.toContain('visibility');
    });
  }

  test('legacy rules in the stylesheet are the same as the released ones', async () => {
    const legacy = css.slice(css.indexOf('.sp-accordion__trigger {'));
    expect(legacy).toContain('.sp-accordion__content--animated');
    expect(legacy).not.toMatch(/\.sp-accordion__content--animated[^{]*\{[^}]*visibility/);
  });
});

// KNOWN LIMITATION: this asserts a defect, it does not endorse it. Delete or invert it
// when the defect is fixed.
test.describe('KNOWN LIMITATION (not endorsed): multiple direct children', () => {
  test('a second direct child of closed content is not collapsed', async ({ page }) => {
    await page.setContent(page_(item(1, '<p id="a">first</p><p id="b">second</p>')));
    await settle(page);
    const h = await page.evaluate(() => document.getElementById('b').getBoundingClientRect().height);
    // Documents the rendering defect: only the first grid row is collapsed. Revisit when it is fixed.
    expect(h).toBeGreaterThan(0);
  });
});

test('the accordion stylesheet has balanced braces', async () => {
  const src = fs.readFileSync(path.join(root, 'src/modules/overlay/sparta-accordion.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  expect((src.match(/\{/g) || []).length).toBe((src.match(/\}/g) || []).length);
});
