# Design Tokens

SpartaCSS is entirely token-driven: every color, size, and timing value a
component uses comes from a CSS custom property defined once in
`src/core/sparta-tokens.css`, inside `@layer tokens`. This document is the
hub for the token system — naming conventions, the color system,
typography, and spacing — plus how to reference tokens correctly versus
overriding them. Theme switching (which tokens change between light and
dark) is covered separately in [`theming.md`](./theming.md); transition
timing and the reduced-motion contract are covered in
[`motion.md`](./motion.md).

## Naming convention

All tokens are prefixed `--sp-` and grouped by what they describe, not by
which component uses them:

```
--sp-<category>-<name>[-<modifier>]
```

Examples: `--sp-color-primary`, `--sp-color-primary-hover`,
`--sp-bg-surface`, `--sp-text-muted`, `--sp-space-4`, `--sp-radius-lg`.

Categories currently defined: color (brand/semantic), surface (`bg`), text,
border, typography (font/text/leading), spacing, container sizing, radius,
shadow, transitions, z-index, and icon-shape masks. A shape or value used
in exactly one place does **not** get promoted to a token — see
"Reference vs. override" below.

## Color system

### Brand

```css
--sp-color-primary        /* + -hover / -active / -subtle */
--sp-color-secondary      /* + -hover / -active / -subtle */
```

```html preview height=18
<div class="sp-stack">
  <div class="sp-stack sp-stack--sm">
    <code class="sp-code">--sp-color-primary</code>
    <div class="sp-cluster">
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-primary);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">base</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-primary-hover);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">hover</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-primary-active);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">active</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-primary-subtle);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">subtle</code></div>
    </div>
  </div>
  <div class="sp-stack sp-stack--sm">
    <code class="sp-code">--sp-color-secondary</code>
    <div class="sp-cluster">
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-secondary);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">base</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-secondary-hover);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">hover</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-secondary-active);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">active</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-secondary-subtle);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">subtle</code></div>
    </div>
  </div>
</div>
```

### Semantic

```css
--sp-color-success  --sp-color-warning  --sp-color-error  --sp-color-info
```

```html preview height=33
<div class="sp-stack">
  <div class="sp-stack sp-stack--sm">
    <code class="sp-code">--sp-color-success</code>
    <div class="sp-cluster">
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-success);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">base</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-success-hover);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">hover</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-success-active);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">active</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-success-subtle);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">subtle</code></div>
    </div>
  </div>
  <div class="sp-stack sp-stack--sm">
    <code class="sp-code">--sp-color-warning</code>
    <div class="sp-cluster">
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-warning);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">base</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-warning-hover);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">hover</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-warning-active);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">active</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-warning-subtle);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">subtle</code></div>
    </div>
  </div>
  <div class="sp-stack sp-stack--sm">
    <code class="sp-code">--sp-color-error</code>
    <div class="sp-cluster">
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-error);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">base</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-error-hover);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">hover</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-error-active);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">active</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-error-subtle);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">subtle</code></div>
    </div>
  </div>
  <div class="sp-stack sp-stack--sm">
    <code class="sp-code">--sp-color-info</code>
    <div class="sp-cluster">
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-info);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">base</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-info-hover);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">hover</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-info-active);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">active</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-color-info-subtle);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">subtle</code></div>
    </div>
  </div>
</div>
```

Each semantic color follows the same `-hover`/`-active`/`-subtle` pattern
as brand. `-subtle` is a low-opacity tint of the base color (e.g.
`rgba(46, 125, 50, 0.12)` for success), used for subtle fills — badge/chip
backgrounds, alert surfaces — where the full-strength color would be too
loud.

Brand and semantic colors are **constant across both themes** — they do
not appear in the `[data-theme]` override blocks. `--sp-border-focus` and
`--sp-shadow-focus` are constant for the same reason: focus indication
should look the same regardless of theme.

### Surface, text, border

```css
--sp-bg-base  --sp-bg-surface  --sp-bg-elevated  --sp-bg-overlay
--sp-text-primary  --sp-text-secondary  --sp-text-muted  --sp-text-disabled
--sp-border  --sp-border-light  --sp-border-strong  --sp-border-focus
```

Surfaces, drawn with the tokens themselves (`--sp-bg-base`, `--sp-bg-surface`,
`--sp-bg-elevated`, `--sp-bg-overlay`). These change with the theme (see
[Theming](./theming.md)):

```html preview height=10
<div class="sp-stack sp-stack--sm">
  <code class="sp-code">--sp-bg-*</code>
  <div class="sp-cluster">
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-bg-base); border: 1px solid var(--sp-border-strong);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">base</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-bg-surface); border: 1px solid var(--sp-border-strong);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">surface</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-bg-elevated); border: 1px solid var(--sp-border-strong);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">elevated</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 2.25rem; border-radius: var(--sp-radius-md); background: var(--sp-bg-overlay); border: 1px solid var(--sp-border-strong);"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">overlay</code></div>
  </div>
</div>
```

Text colors, on the base surface:

```html preview height=13
<div class="sp-stack sp-stack--sm" style="background: var(--sp-bg-base); padding: var(--sp-space-4); border-radius: var(--sp-radius-md)">
  <span style="color: var(--sp-text-primary)">--sp-text-primary</span>
  <span style="color: var(--sp-text-secondary)">--sp-text-secondary</span>
  <span style="color: var(--sp-text-muted)">--sp-text-muted</span>
  <span style="color: var(--sp-text-disabled)">--sp-text-disabled</span>
</div>
```

These four groups **do** change between themes (see
[`theming.md`](./theming.md) for the precedence rules). Two tokens are the
deliberate exception — theme-invariant even though their group normally
flips:

- `--sp-bg-inverse` — always dark, regardless of active theme. Needed by
  inverse-context UI (Tooltip's surface) that always pairs with...
- `--sp-text-inverse` / `--sp-text-on-color` — always light, for text that
  sits on a colored or inverse surface.

## Typography tokens

```css
--sp-font-family   /* system font stack */
--sp-font-mono     /* monospace stack, for Code/Kbd */

--sp-text-xs   0.75rem
--sp-text-sm   0.875rem
--sp-text-base 1rem
--sp-text-lg   1.125rem
--sp-text-xl   1.25rem
--sp-text-2xl  1.5rem
--sp-text-3xl  1.875rem

--sp-font-normal 400  --sp-font-medium 500
--sp-font-semibold 600  --sp-font-bold 700

--sp-leading-tight 1.25  --sp-leading-snug 1.375
--sp-leading-normal 1.5  --sp-leading-relaxed 1.625
```

The size scale:

```html preview height=19
<div class="sp-stack sp-stack--sm">
  <div style="font-size: var(--sp-text-xs)">--sp-text-xs <code class="sp-code">xs</code></div>
  <div style="font-size: var(--sp-text-sm)">--sp-text-sm <code class="sp-code">sm</code></div>
  <div style="font-size: var(--sp-text-base)">--sp-text-base <code class="sp-code">base</code></div>
  <div style="font-size: var(--sp-text-lg)">--sp-text-lg <code class="sp-code">lg</code></div>
  <div style="font-size: var(--sp-text-xl)">--sp-text-xl <code class="sp-code">xl</code></div>
  <div style="font-size: var(--sp-text-2xl)">--sp-text-2xl <code class="sp-code">2xl</code></div>
  <div style="font-size: var(--sp-text-3xl)">--sp-text-3xl <code class="sp-code">3xl</code></div>
</div>
```

Weights and the monospace stack:

```html preview height=13
<div class="sp-stack sp-stack--sm">
  <div style="font-weight: var(--sp-font-normal)">--sp-font-normal</div>
  <div style="font-weight: var(--sp-font-medium)">--sp-font-medium</div>
  <div style="font-weight: var(--sp-font-semibold)">--sp-font-semibold</div>
  <div style="font-weight: var(--sp-font-bold)">--sp-font-bold</div>
  <div style="font-family: var(--sp-font-mono)">--sp-font-mono</div>
</div>
```

There is no font-loading or `@font-face` in SpartaCSS — `--sp-font-family`
is a system-font stack by design, so the framework never blocks on a
web-font download. If you need a custom brand font, override
`--sp-font-family` on `:root` in your own stylesheet.

## Spacing scale

```css
--sp-space-0: 0        --sp-space-1: 0.25rem   --sp-space-2: 0.5rem
--sp-space-3: 0.75rem  --sp-space-4: 1rem      --sp-space-5: 1.25rem
--sp-space-6: 1.5rem   --sp-space-7: 1.75rem   --sp-space-8: 2rem
```

Each bar is as wide as its token:

```html preview height=24
<div class="sp-stack sp-stack--sm">
  <div class="sp-cluster sp-cluster--center"><div style="width: var(--sp-space-0); height: 0.75rem; background: var(--sp-color-primary); min-width: 1px"></div><code class="sp-code">--sp-space-0</code></div>
  <div class="sp-cluster sp-cluster--center"><div style="width: var(--sp-space-1); height: 0.75rem; background: var(--sp-color-primary); min-width: 1px"></div><code class="sp-code">--sp-space-1</code></div>
  <div class="sp-cluster sp-cluster--center"><div style="width: var(--sp-space-2); height: 0.75rem; background: var(--sp-color-primary); min-width: 1px"></div><code class="sp-code">--sp-space-2</code></div>
  <div class="sp-cluster sp-cluster--center"><div style="width: var(--sp-space-3); height: 0.75rem; background: var(--sp-color-primary); min-width: 1px"></div><code class="sp-code">--sp-space-3</code></div>
  <div class="sp-cluster sp-cluster--center"><div style="width: var(--sp-space-4); height: 0.75rem; background: var(--sp-color-primary); min-width: 1px"></div><code class="sp-code">--sp-space-4</code></div>
  <div class="sp-cluster sp-cluster--center"><div style="width: var(--sp-space-5); height: 0.75rem; background: var(--sp-color-primary); min-width: 1px"></div><code class="sp-code">--sp-space-5</code></div>
  <div class="sp-cluster sp-cluster--center"><div style="width: var(--sp-space-6); height: 0.75rem; background: var(--sp-color-primary); min-width: 1px"></div><code class="sp-code">--sp-space-6</code></div>
  <div class="sp-cluster sp-cluster--center"><div style="width: var(--sp-space-7); height: 0.75rem; background: var(--sp-color-primary); min-width: 1px"></div><code class="sp-code">--sp-space-7</code></div>
  <div class="sp-cluster sp-cluster--center"><div style="width: var(--sp-space-8); height: 0.75rem; background: var(--sp-color-primary); min-width: 1px"></div><code class="sp-code">--sp-space-8</code></div>
</div>
```

A single linear scale (0–8), used directly by components (gaps, padding)
and exposed to consumers as utility classes in `sparta-layout.css`:
`.sp-p-*`, `.sp-px-*`, `.sp-py-*`, `.sp-m-*`, `.sp-mt-*`, `.sp-mb-*` (not
every step has a utility class — only the commonly-needed ones do). See
[`layout.md`](./layout.md) for the layout primitives that also consume
this scale (`.sp-stack`, `.sp-cluster`, `.sp-grid` gaps).

## Other token groups (brief reference)

- **Radius** — `--sp-radius-sm/md/lg/xl/full`.
- **Shadow** — `--sp-shadow-sm/md/lg/xl` (theme-dependent) and
  `--sp-shadow-focus` (constant).

```html preview height=18 wide=11
<div class="sp-stack sp-stack--sm">
  <code class="sp-code">--sp-radius-*</code>
  <div class="sp-cluster">
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 3.5rem; background: var(--sp-bg-elevated); border: 1px solid var(--sp-border-strong); border-radius: var(--sp-radius-sm)"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">sm</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 3.5rem; background: var(--sp-bg-elevated); border: 1px solid var(--sp-border-strong); border-radius: var(--sp-radius-md)"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">md</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 3.5rem; background: var(--sp-bg-elevated); border: 1px solid var(--sp-border-strong); border-radius: var(--sp-radius-lg)"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">lg</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 3.5rem; background: var(--sp-bg-elevated); border: 1px solid var(--sp-border-strong); border-radius: var(--sp-radius-xl)"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">xl</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 3.5rem; background: var(--sp-bg-elevated); border: 1px solid var(--sp-border-strong); border-radius: var(--sp-radius-full)"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">full</code></div>
  </div>
</div>
```

```html preview height=13
<div class="sp-stack sp-stack--sm" style="padding: var(--sp-space-3)">
  <code class="sp-code">--sp-shadow-*</code>
  <div class="sp-cluster">
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 3.5rem; background: var(--sp-bg-surface); border-radius: var(--sp-radius-md); box-shadow: var(--sp-shadow-sm)"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">sm</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 3.5rem; background: var(--sp-bg-surface); border-radius: var(--sp-radius-md); box-shadow: var(--sp-shadow-md)"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">md</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 3.5rem; background: var(--sp-bg-surface); border-radius: var(--sp-radius-md); box-shadow: var(--sp-shadow-lg)"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">lg</code></div>
    <div class="sp-stack sp-stack--sm" style="align-items: center"><div style="width: 3.5rem; height: 3.5rem; background: var(--sp-bg-surface); border-radius: var(--sp-radius-md); box-shadow: var(--sp-shadow-xl)"></div><code class="sp-code" style="font-size: var(--sp-text-xs)">xl</code></div>
  </div>
</div>
```
- **Z-index** — a full stacking scale, `--sp-z-base` through
  `--sp-z-tooltip`, ordered base → raised → dropdown → sticky → fixed →
  backdrop → modal → drawer → toast → tooltip. Always reference the named
  token for a new overlay-like component; never hardcode a z-index.
- **Icon masks** — `--sp-icon-mask-*` / `--sp-icon-bg-*`. These are an
  internal implementation detail shared between core component icons
  (Modal/Drawer close, Accordion chevron) and `sparta-icons.css`. Consumers
  generally don't reference these directly — use the `.sp-icon-*` classes
  from the icon module instead.

## Reference vs. override guidance

**Reference tokens with `var()`** in your own CSS rather than hardcoding
SpartaCSS's literal values — this is what keeps your custom styles
theme-aware for free:

```css
.my-custom-banner {
  background: var(--sp-bg-elevated);
  color: var(--sp-text-primary);
  padding: var(--sp-space-4);
}
```

**Override tokens** by redeclaring them at a scope your markup controls —
typically `:root` for a global change, or a wrapping element for a scoped
one:

```css
:root {
  --sp-color-primary: #2a6df4; /* rebrand the primary color globally */
}
```

A token redeclared on an element changes everything inside it. The second
button here sits in a wrapper that redeclares `--sp-color-primary`:

```html preview height=8 wide=6
<button class="sp-button sp-button--primary">Default primary</button>
<span style="--sp-color-primary: #2a6df4; --sp-color-primary-hover: #1e56c4; --sp-color-primary-active: #1747a3">
  <button class="sp-button sp-button--primary">Scoped override</button>
</span>
```

Do not override tokens by editing `sparta-tokens.css` directly if you're
consuming SpartaCSS as a package — that file is replaced on every update.
Overrides belong in your own stylesheet, loaded after SpartaCSS's.

Not everything is a token. Per the source's own documented policy (see the
"ICON TOKEN FAMILIES" comment in `sparta-tokens.css`), a value or shape
used by exactly one consumer stays a local literal in that one rule — a
token with a single consumer isn't shared, it's just indirection. Only
values that are genuinely reused, or are foundational primitives expected
to be reused, get promoted to a token.

## Responsive behavior

Tokens are not responsive: a token has one value at every viewport width. The
two breakpoints SpartaCSS uses, `640px` and `768px`, are not tokens, because
media conditions cannot read custom properties; they are documented in
[Layout](./layout.md#breakpoints).

## Common mistakes

**Hardcoding a value SpartaCSS already names.** `padding: 16px` instead of
`var(--sp-space-4)` stays at 16px when the scale changes and does not follow
a theme.

```css
/* Wrong: ignores the scale, and is a fixed light/dark color */
.my-panel { padding: 16px; background: #1d1e22; }

/* Right: follows the scale and the theme */
.my-panel { padding: var(--sp-space-4); background: var(--sp-bg-surface); }
```

**Editing the package's token file.** It is replaced on every update. Override
in your own stylesheet, loaded after SpartaCSS.

**Overriding a brand color and expecting its states to follow.** `--sp-color-primary`
and its `-hover`, `-active` and `-subtle` are separate tokens. Redeclare the set
you use, as in the example above.

**Using the icon-mask tokens directly.** They are an internal detail. Use the
`.sp-icon-*` classes.

**Expecting every value to be a token.** A value used in one place stays a local
literal by policy. See the last section above.

## Related

- [Theming](./theming.md) — which tokens change between dark and light.
- [Layout](./layout.md) — the spacing scale in the layout primitives.
- [Motion](./motion.md) — the transition tokens.
- [Getting started](./getting-started.md) — loading the stylesheet.

---
Source: `src/core/sparta-tokens.css`
