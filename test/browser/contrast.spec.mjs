// Contrast Batch 2 (C1-C4): measured contrast, not screenshots.
//   C1/C2  neutral text on tinted Alert, Banner, Badge, Chip and Avatar; semantic icons and
//          dots; no opacity-reduced content for alert body, chip remove and banner close
//   C3     Warning and Success button states
//   C4     one shared keyboard focus indicator that survives hover/press and forced colors
//
// Ratios are computed from computed styles, compositing translucent backgrounds over the
// ancestors up to the page surface. Thresholds: 4.5 for text (WCAG 1.4.3), 3 for
// non-text (1.4.11 / focus-indicator design target). Disabled controls are exempt from the
// active-text requirement (WCAG 1.4.3 exception), so they are only checked for being unchanged.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const css = fs.readFileSync(process.env.SPARTA_CSS || path.join(root, 'dist/sparta-all.css'), 'utf8');

const THEMES = ['dark', 'light'];
const SURFACES = ['base', 'surface', 'elevated'];
const SEMANTIC = ['success', 'warning', 'error', 'info'];

const html = (theme, surface, body) => `<!doctype html><html data-theme="${theme}"><head><meta charset="utf-8"><style>${css}</style>
<style>*,*::before,*::after{transition:none!important;animation:none!important}body{margin:0;padding:1rem;background:var(--sp-bg-base);color:var(--sp-text-primary)}
#ctx{padding:1rem;background:var(--sp-bg-${surface});display:flex;flex-direction:column;gap:12px;align-items:flex-start}</style></head>
<body><button id="first" class="sp-button">first</button><div id="ctx">${body}</div></body></html>`;

/** Installed once per page: contrast helpers working from computed styles. */
const HELPERS = () => {
  const parse = (c) => {
    let m = c.match(/^rgba?\(([^)]+)\)$/);
    if (m) { const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p[3] ?? 1]; }
    m = c.match(/^color\(srgb ([^)]+)\)$/);
    if (m) { const p = m[1].split(/[ /]+/).filter(Boolean).map(Number); return [p[0] * 255, p[1] * 255, p[2] * 255, p[3] ?? 1]; }
    throw new Error('unparsed colour: ' + c);
  };
  const over = (f, b) => [0, 1, 2].map((i) => f[i] * f[3] + b[i] * (1 - f[3])).concat(1);
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  /** Opaque colour behind an element: its own and ancestor backgrounds, composited. */
  const backdrop = (el, upto) => {
    const layers = [];
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      layers.push(parse(getComputedStyle(n).backgroundColor));
      if (n === upto) break;
    }
    let out = [255, 255, 255, 1];
    for (let i = layers.length - 1; i >= 0; i -= 1) out = over(layers[i], out);
    return out;
  };
  /** Foreground colour with the element's own opacity applied over its backdrop. */
  const fgOver = (fg, bd, el) => over([fg[0], fg[1], fg[2], fg[3] * Number(getComputedStyle(el).opacity)], bd);
  window.__c = {
    text(sel, ctxEl) {
      const el = document.querySelector(sel);
      const bd = backdrop(el);
      return ratio(fgOver(parse(getComputedStyle(el).color), bd, el), bd);
    },
    /** Colour of el (or its pseudo) against the backdrop of host. */
    nontext(sel, pseudo) {
      const el = document.querySelector(sel);
      const cs = getComputedStyle(el, pseudo || null);
      const host = pseudo ? el.parentElement : el;
      const bd = backdrop(host);
      const fg = parse(pseudo ? cs.backgroundColor : cs.color);
      return ratio(fgOver(fg, bd, el), bd);
    },
    opacity: (sel) => Number(getComputedStyle(document.querySelector(sel)).opacity),
    /** Contrast of text vs the element's own background (buttons). */
    own(sel) {
      const el = document.querySelector(sel);
      const bd = backdrop(el);
      return ratio(parse(getComputedStyle(el).color), bd);
    },
    outline(sel) {
      const el = document.querySelector(sel);
      const cs = getComputedStyle(el);
      const page = backdrop(el.parentElement);
      const oc = parse(cs.outlineColor);
      return {
        style: cs.outlineStyle, width: parseFloat(cs.outlineWidth), offset: parseFloat(cs.outlineOffset),
        color: cs.outlineColor, ratioVsPage: ratio(over(oc, page), page), focusVisible: el.matches(':focus-visible'),
      };
    },
  };
};

async function load(page, theme, surface, body) {
  await page.setContent(html(theme, surface, body));
  await page.evaluate(HELPERS);
}
const call = (page, fn, ...args) => page.evaluate(([f, a]) => window.__c[f](...a), [fn, args]);

// --- C1 / C2: semantic surfaces --------------------------------------------------------

const alertHtml = SEMANTIC.concat('primary').map((v) => `<div class="sp-alert sp-alert--${v}" style="width:360px"><svg class="sp-alert__icon" id="alert-icon-${v}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="10" r="8"/></svg><div class="sp-alert__content"><div class="sp-alert__title" id="alert-title-${v}">Title</div><div class="sp-alert__body" id="alert-body-${v}">Body text for the alert.</div></div></div>`).join('');
const bannerHtml = SEMANTIC.map((v) => `<div class="sp-alert-banner sp-alert-banner--${v}" style="width:360px"><span class="sp-alert-banner__icon" id="ban-icon-${v}">!</span><div class="sp-alert-banner__body"><div class="sp-alert-banner__title" id="ban-title-${v}">Title</div><div class="sp-alert-banner__text" id="ban-text-${v}">Message text.</div></div><button class="sp-alert-banner__close" id="ban-close-${v}" aria-label="Dismiss">×</button></div>`).join('');
const BADGE = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
const badgeHtml = BADGE.map((v) => `<span class="sp-badge sp-badge--${v}" id="badge-${v}">Badge</span><span class="sp-badge sp-badge--${v} sp-badge--dot" id="dot-${v}">Dot</span>`).join('');
const CHIP = ['primary', 'success', 'warning', 'error', 'secondary', 'selected', 'active'];
const chipHtml = CHIP.map((v) => `<span class="sp-chip sp-chip--${v}" id="chip-${v}">Chip <button class="sp-chip__remove" id="chip-rm-${v}" aria-label="Remove">×</button></span>`).join('');
const avatarHtml = ['primary', 'secondary', 'success'].map((v) => `<span class="sp-avatar sp-avatar--${v}" id="av-${v}">AB</span>`).join('');
const toastHtml = SEMANTIC.map((v) => `<div class="sp-toast sp-toast--${v}"><span class="sp-toast__icon" id="toast-icon-${v}">✓</span><div class="sp-toast__body"><div class="sp-toast__title">T</div></div></div>`).join('');
const dialogIconHtml = ['danger', 'warning', 'info', 'success'].map((v) => `<span class="sp-dialog__icon sp-dialog__icon--${v}" id="dlg-icon-${v}">!</span>`).join('');
const semanticHtml = alertHtml + bannerHtml + badgeHtml + chipHtml + avatarHtml + toastHtml + dialogIconHtml;

for (const theme of THEMES) for (const surface of SURFACES) {
  test.describe(`semantic surfaces — ${theme} / ${surface}`, () => {
    test.beforeEach(async ({ page }) => { await load(page, theme, surface, semanticHtml); });

    test('text on tinted surfaces is at least 4.5:1', async ({ page }) => {
      const sels = [];
      for (const v of SEMANTIC.concat('primary')) sels.push(`#alert-title-${v}`, `#alert-body-${v}`);
      for (const v of SEMANTIC) sels.push(`#ban-title-${v}`, `#ban-text-${v}`);
      for (const v of BADGE) sels.push(`#badge-${v}`, `#dot-${v}`);
      for (const v of CHIP) sels.push(`#chip-${v}`);
      for (const v of ['primary', 'secondary', 'success']) sels.push(`#av-${v}`);
      const failures = [];
      for (const s of sels) { const r = await call(page, 'text', s); if (r < 4.5) failures.push(`${s} ${r.toFixed(2)}`); }
      expect(failures, failures.join('\n')).toEqual([]);
    });

    test('icons, dots and control glyphs are at least 3:1', async ({ page }) => {
      const nt = [];
      for (const v of SEMANTIC.concat('primary')) nt.push([`#alert-icon-${v}`]);
      for (const v of SEMANTIC) nt.push([`#ban-icon-${v}`], [`#ban-close-${v}`], [`#toast-icon-${v}`]);
      for (const v of ['danger', 'warning', 'info', 'success']) nt.push([`#dlg-icon-${v}`]);
      for (const v of BADGE) nt.push([`#dot-${v}`, '::before']);
      for (const v of CHIP) nt.push([`#chip-rm-${v}`]);
      const failures = [];
      for (const [s, ps] of nt) { const r = await call(page, 'nontext', s, ps); if (r < 3) failures.push(`${s}${ps || ''} ${r.toFixed(2)}`); }
      expect(failures, failures.join('\n')).toEqual([]);
    });

    test('targeted opacity reductions are gone', async ({ page }) => {
      for (const s of ['#alert-body-info', '#chip-rm-primary', '#ban-close-info']) expect(await call(page, 'opacity', s), s).toBe(1);
    });

    test('semantic identity is kept on border and background', async ({ page }) => {
      const probe = await page.evaluate(() => ['.sp-alert--error', '.sp-badge--error', '.sp-chip--error'].map((s) => { const cs = getComputedStyle(document.querySelector(s)); return [cs.borderTopColor, cs.backgroundColor, cs.color]; }));
      for (const [border, bg, text] of probe) { expect(border).not.toBe(text); expect(bg).not.toBe('rgba(0, 0, 0, 0)'); }
    });
  });
}

test('hover feedback on chip remove and banner close is a background tint, not opacity', async ({ page }) => {
  await load(page, 'dark', 'base', chipHtml + bannerHtml);
  for (const s of ['#chip-rm-primary', '#ban-close-info']) {
    const before = await page.evaluate((x) => getComputedStyle(document.querySelector(x)).backgroundColor, s);
    await page.hover(s);
    const after = await page.evaluate((x) => { const cs = getComputedStyle(document.querySelector(x)); return [cs.backgroundColor, cs.opacity]; }, s);
    expect(after[0], s).not.toBe(before);
    expect(after[1], s).toBe('1');
    expect(await call(page, 'nontext', s), `${s} hovered`).toBeGreaterThanOrEqual(3);
    await page.mouse.move(0, 0);
  }
});

// --- C3: buttons -------------------------------------------------------------------------

const BUTTONS = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
const buttonHtml = BUTTONS.map((v) => `<button class="sp-button sp-button--${v}" id="b-${v}">${v}</button><button class="sp-button sp-button--${v}" id="bd-${v}" disabled>${v}</button>`).join('')
  + `<button class="sp-button sp-button--outline-warning" id="b-outline-warning">outline-warning</button>`;

for (const theme of THEMES) {
  test(`button states are at least 4.5:1 — ${theme}`, async ({ page }) => {
    await load(page, theme, 'base', buttonHtml);
    const failures = [];
    for (const id of BUTTONS.map((v) => `b-${v}`)) {
      const rest = await call(page, 'own', `#${id}`);
      await page.hover(`#${id}`);
      const hover = await call(page, 'own', `#${id}`);
      await page.mouse.down();
      const active = await call(page, 'own', `#${id}`);
      await page.mouse.up(); await page.mouse.move(0, 0);
      for (const [state, r] of [['default', rest], ['hover', hover], ['active', active]]) if (r < 4.5) failures.push(`${id} ${state} ${r.toFixed(2)}`);
    }
    // outline-warning only fills on hover/active (its resting text is outside this batch).
    await page.hover('#b-outline-warning');
    const oh = await call(page, 'own', '#b-outline-warning');
    await page.mouse.down();
    const oa = await call(page, 'own', '#b-outline-warning');
    await page.mouse.up(); await page.mouse.move(0, 0);
    if (oh < 4.5) failures.push(`outline-warning hover ${oh.toFixed(2)}`);
    if (oa < 4.5) failures.push(`outline-warning active ${oa.toFixed(2)}`);
    expect(failures, failures.join('\n')).toEqual([]);
  });

  test(`warning keeps one dark foreground and a darker pressed fill — ${theme}`, async ({ page }) => {
    await load(page, theme, 'base', buttonHtml);
    const read = () => page.evaluate(() => { const cs = getComputedStyle(document.getElementById('b-warning')); return [cs.color, cs.backgroundColor]; });
    const rest = await read();
    await page.hover('#b-warning'); const hover = await read();
    await page.mouse.down(); const active = await read();
    await page.mouse.up();
    expect(new Set([rest[0], hover[0], active[0]]).size, 'foreground must not flip').toBe(1);
    expect(rest[0]).toBe('rgb(17, 17, 17)');
    expect(active[1]).not.toBe(rest[1]);
  });

  test(`disabled warning and success buttons are unchanged apart from opacity — ${theme}`, async ({ page }) => {
    await load(page, theme, 'base', buttonHtml);
    for (const v of ['warning', 'success']) {
      const [en, dis] = await page.evaluate((x) => ['b-', 'bd-'].map((p) => { const cs = getComputedStyle(document.getElementById(p + x)); return [cs.color, cs.backgroundColor, cs.opacity, cs.pointerEvents]; }), v);
      expect(dis[0]).toBe(en[0]); expect(dis[1]).toBe(en[1]);
      expect(dis[2]).toBe('0.45'); expect(dis[3]).toBe('none');
    }
  });
}

// --- C4: focus -----------------------------------------------------------------------------

const focusHtml = `<a id="link" href="#x">link</a>
<div class="sp-tabs"><button class="sp-tabs__tab sp-tabs__tab--active" id="tab">Overview</button></div>
<div class="sp-accordion"><div class="sp-accordion__item"><button class="sp-accordion__header" id="acc" aria-expanded="false">Header</button><div class="sp-accordion__content"><p>c</p></div></div></div>
${['primary', 'outline', 'ghost', 'warning', 'success'].map((v) => `<button class="sp-button sp-button--${v}" id="fb-${v}">${v}</button>`).join('')}
<input class="sp-input" id="input" value="x"><select class="sp-select" id="select"><option>a</option></select>`;
const BTN_FOCUS = ['fb-primary', 'fb-outline', 'fb-ghost', 'fb-warning', 'fb-success'];

/** Keyboard modality, then focus the target (so :focus-visible applies in every engine). */
async function keyboardFocus(page, id) {
  await page.focus('#first'); await page.keyboard.press('Shift+Tab').catch(() => {}); await page.keyboard.press('Tab');
  await page.evaluate((i) => document.getElementById(i).focus(), id);
}

for (const theme of THEMES) for (const surface of SURFACES) {
  test.describe(`focus indicator — ${theme} / ${surface}`, () => {
    test.beforeEach(async ({ page }) => { await load(page, theme, surface, focusHtml); });

    test('buttons, links, tabs and Accordion headers get a 2px outline of at least 3:1', async ({ page }) => {
      for (const id of [...BTN_FOCUS, 'link', 'tab', 'acc']) {
        await keyboardFocus(page, id);
        const o = await call(page, 'outline', `#${id}`);
        expect(o.focusVisible, id).toBe(true);
        expect(o.style, id).toBe('solid');
        expect(o.width, id).toBe(2);
        expect(o.offset, id).toBeGreaterThanOrEqual(2);
        expect(o.ratioVsPage, `${id} ${o.ratioVsPage.toFixed(2)}`).toBeGreaterThanOrEqual(3);
      }
    });

    test('the button outline survives hover and press', async ({ page, browserName }) => {
      for (const id of ['fb-primary', 'fb-warning', 'fb-success']) {
        await keyboardFocus(page, id);
        await page.hover(`#${id}`);
        let o = await call(page, 'outline', `#${id}`);
        expect([o.style, o.width], `${id} hovered`).toEqual(['solid', 2]);
        await page.mouse.down();
        // Safari does not focus buttons on mousedown, so a pointer press moves focus away and
        // there is no focused-and-pressed state to measure there.
        if (await page.evaluate((i) => document.activeElement === document.getElementById(i), id)) {
          o = await call(page, 'outline', `#${id}`);
          expect([o.style, o.width], `${id} pressed`).toEqual(['solid', 2]);
          expect(o.ratioVsPage).toBeGreaterThanOrEqual(3);
        } else {
          test.info().annotations.push({ type: 'note', description: `${id}: focus left the button on mousedown (${browserName})` });
          expect(browserName).toBe('webkit');
        }
        await page.mouse.up(); await page.mouse.move(0, 0);
      }
    });
  });
}

test('the outline colour follows a scoped theme region', async ({ page }) => {
  await load(page, 'dark', 'base', `<div class="sp-light" style="background:var(--sp-bg-base);padding:8px"><button class="sp-button sp-button--ghost" id="scoped">scoped</button></div>`);
  await keyboardFocus(page, 'scoped');
  const o = await call(page, 'outline', '#scoped');
  expect(o.color).toBe('rgb(17, 17, 17)');
  expect(o.ratioVsPage).toBeGreaterThanOrEqual(3);
});

test('pointer clicks do not show the focus outline on buttons', async ({ page }) => {
  await load(page, 'dark', 'base', focusHtml);
  await page.click('#fb-primary');
  const o = await call(page, 'outline', '#fb-primary');
  expect(o.style).toBe('none');
});

test('forced colors: focused buttons and links still have an outline', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'WebKit has no forced-colors emulation in Playwright');
  await page.emulateMedia({ forcedColors: 'active' });
  await load(page, 'dark', 'base', focusHtml);
  for (const id of ['fb-primary', 'fb-warning', 'link', 'tab', 'acc']) {
    await keyboardFocus(page, id);
    expect(await page.evaluate(() => matchMedia('(forced-colors: active)').matches)).toBe(true);
    let o = await call(page, 'outline', `#${id}`);
    expect([o.style, o.width], id).toEqual(['solid', 2]);
    await page.hover(`#${id}`);
    o = await call(page, 'outline', `#${id}`);
    expect([o.style, o.width], `${id} hovered`).toEqual(['solid', 2]);
  }
});

test('form controls keep their own focus treatment (documented limitation, out of this batch)', async ({ page }) => {
  await load(page, 'dark', 'base', focusHtml);
  for (const id of ['input', 'select']) {
    await keyboardFocus(page, id);
    expect((await call(page, 'outline', `#${id}`)).style, id).toBe('none');
  }
});
