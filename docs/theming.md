# Theming

SpartaCSS ships two themes — dark and light — driven entirely by CSS custom
properties in `src/core/sparta-tokens.css`. There is no JavaScript theme
switcher; SpartaCSS only defines the tokens and the rules for which values
apply when. Toggling a theme at runtime (e.g. a UI switch) is the consumer's
responsibility, via the `data-theme` attribute or one of the override classes
described below.

SpartaCSS is a **dark-first** design system: dark is always the default
theme, and it does not change based on the visitor's OS or browser
`prefers-color-scheme` setting. Light mode is fully supported, but it is
opt-in only — SpartaCSS will never silently switch to light mode on its own.

## The same markup in both themes

The theme is chosen by an attribute (or class) on an element, and it applies to
everything inside that element. These are the same components in the default
theme, in `data-theme="dark"` and in `data-theme="light"`. Brand and
semantic colors are the same in all three; surfaces, text, borders and shadows
change.

```html preview height=43
<div class="sp-stack">
  <div  style="background: var(--sp-bg-base); color: var(--sp-text-primary); padding: var(--sp-space-4); border-radius: var(--sp-radius-lg); border: 1px solid var(--sp-border)">
    <div class="sp-stack sp-stack--sm">
      <strong>Default (no attribute) — dark</strong>
      <span style="color: var(--sp-text-secondary)">Secondary text on the base surface.</span>
      <div class="sp-card"><div class="sp-card__body">A card on the surface.</div></div>
      <div class="sp-cluster">
        <button class="sp-button sp-button--primary sp-button--sm">Primary</button>
        <button class="sp-button sp-button--outline sp-button--sm">Outline</button>
        <span class="sp-badge sp-badge--success">Success</span>
      </div>
    </div>
  </div>
  <div data-theme="dark" style="background: var(--sp-bg-base); color: var(--sp-text-primary); padding: var(--sp-space-4); border-radius: var(--sp-radius-lg); border: 1px solid var(--sp-border)">
    <div class="sp-stack sp-stack--sm">
      <strong>data-theme="dark" — dark</strong>
      <span style="color: var(--sp-text-secondary)">Secondary text on the base surface.</span>
      <div class="sp-card"><div class="sp-card__body">A card on the surface.</div></div>
      <div class="sp-cluster">
        <button class="sp-button sp-button--primary sp-button--sm">Primary</button>
        <button class="sp-button sp-button--outline sp-button--sm">Outline</button>
        <span class="sp-badge sp-badge--success">Success</span>
      </div>
    </div>
  </div>
  <div data-theme="light" style="background: var(--sp-bg-base); color: var(--sp-text-primary); padding: var(--sp-space-4); border-radius: var(--sp-radius-lg); border: 1px solid var(--sp-border)">
    <div class="sp-stack sp-stack--sm">
      <strong>data-theme="light" — light</strong>
      <span style="color: var(--sp-text-secondary)">Secondary text on the base surface.</span>
      <div class="sp-card"><div class="sp-card__body">A card on the surface.</div></div>
      <div class="sp-cluster">
        <button class="sp-button sp-button--primary sp-button--sm">Primary</button>
        <button class="sp-button sp-button--outline sp-button--sm">Outline</button>
        <span class="sp-badge sp-badge--success">Success</span>
      </div>
    </div>
  </div>
</div>
```

## Precedence

Three states are possible, resolved in this order (later wins):

1. **Default** — no `data-theme` attribute/class set. Renders **dark**,
   regardless of OS/browser preference.
2. **Explicit `data-theme="dark"` / `.sp-dark`** — renders dark. Equivalent
   to the default, but lets a consumer state the theme choice explicitly
   rather than relying on the implicit default.
3. **Explicit `data-theme="light"` / `.sp-light`** — renders light.

There is no OS-preference-driven state. `prefers-color-scheme` is not read
anywhere in SpartaCSS's tokens.

All three states are part of the stable API under
[ADR-0002](adr/0002-versioning-and-stability-policy.md) and none has changed
since `1.0.0`. For when each was introduced, see
[CHANGELOG.md](../CHANGELOG.md).

## Enabling light mode

Light mode must be requested explicitly:

```html
<html data-theme="light">
```

If your application wants dark mode, no attribute is required — it's the
default. Setting `data-theme="dark"` explicitly is optional and purely for
clarity/symmetry with the light-mode opt-in.

The attribute also works on a single element, to make one region light inside a
dark page, or the reverse. The classes `.sp-light` and `.sp-dark` do the same
as the attributes:

```html preview height=11 wide=9
<div class="sp-light" style="background: var(--sp-bg-surface); color: var(--sp-text-primary); padding: var(--sp-space-4); border-radius: var(--sp-radius-lg)">
  <strong>A light region</strong>, chosen with the <code class="sp-code">.sp-light</code> class.
  <div class="sp-cluster" style="margin-top: var(--sp-space-3)">
    <button class="sp-button sp-button--primary sp-button--sm">Action</button>
    <button class="sp-button sp-button--ghost sp-button--sm">Cancel</button>
  </div>
</div>
```

## Switching at runtime

SpartaCSS has no script, so a theme switch is your code. It sets or removes the
attribute, and remembers the reader's choice if you want it remembered:

```js
// Application code — SpartaCSS ships none.
const root = document.documentElement;

function setTheme(theme) {              // 'light' | 'dark'
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Apply the saved choice as early as possible, to avoid a flash of dark.
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);
```

SpartaCSS does not read `prefers-color-scheme`. If you want to follow the
reader's operating-system setting, your code reads it and sets the attribute.

## What theme-switching affects

Only surface, text, border, and shadow tokens change between themes
(`--sp-bg-*`, `--sp-text-*`, `--sp-border`/`--sp-border-light`/`--sp-border-strong`,
`--sp-shadow-sm`/`--sp-shadow-md`/`--sp-shadow-lg`/`--sp-shadow-xl`). Brand and semantic colors
(`--sp-color-primary`, `--sp-color-error`, etc.), `--sp-border-focus`, and
`--sp-shadow-focus` are constant across both themes by design.

## Responsive behavior

Theming does not depend on viewport width. A theme applies the same at every
size.

## Common mistakes

**Expecting light mode from the reader's system setting.** SpartaCSS is
dark-first and does not read `prefers-color-scheme`. Light mode needs
`data-theme="light"` (or `.sp-light`).

**Hardcoding a color in your own CSS.** A literal `#1d1e22` does not change
with the theme. Use the tokens: `var(--sp-bg-surface)`, `var(--sp-text-primary)`.

**Setting the theme on an element that is not an ancestor.** The attribute
affects the element and what is inside it. A sibling is unaffected.

**Expecting brand or semantic colors to change.** They are the same in both
themes by design, as is the focus ring.

**Setting a theme and not setting a surface.** A themed element redefines the
tokens; it does not paint a background by itself. Give the region a
`background: var(--sp-bg-base)` (as the examples do) so the theme is visible.

## Related

- [Design tokens](./tokens.md) — the tokens that change.
- [Accessibility](./accessibility.md) — contrast and forced colors.
- [Getting started](./getting-started.md) — setting the theme on `<html>`.

---
Source: `src/core/sparta-tokens.css`
