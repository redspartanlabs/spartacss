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

### Semantic

```css
--sp-color-success  --sp-color-warning  --sp-color-error  --sp-color-info
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

A single linear scale (0–8), used directly by components (gaps, padding)
and exposed to consumers as utility classes in `sparta-layout.css`:
`.sp-p-*`, `.sp-px-*`, `.sp-py-*`, `.sp-m-*`, `.sp-mt-*`, `.sp-mb-*` (not
every step has a utility class — only the commonly-needed ones do). See
[`layout.md`](./layout.md) for the layout primitives that also consume
this scale (`.sp-stack`, `.sp-cluster`, `.sp-grid` gaps).

## Other token groups (brief reference)

- **Radius** — `--sp-radius-sm/md/lg/xl/full`.
- **Shadow** — `--sp-shadow-sm/md/lg` (theme-dependent) and
  `--sp-shadow-focus` (constant).
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

Do not override tokens by editing `sparta-tokens.css` directly if you're
consuming SpartaCSS as a package — that file is replaced on every update.
Overrides belong in your own stylesheet, loaded after SpartaCSS's.

Not everything is a token. Per the source's own documented policy (see the
"ICON TOKEN FAMILIES" comment in `sparta-tokens.css`), a value or shape
used by exactly one consumer stays a local literal in that one rule — a
token with a single consumer isn't shared, it's just indirection. Only
values that are genuinely reused, or are foundational primitives expected
to be reused, get promoted to a token.

---
Source: `src/core/sparta-tokens.css`
