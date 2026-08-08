# Layout

SpartaCSS's layout system lives in `src/core/sparta-layout.css`. As of
`0.4.0`, four primitives are the supported, documented layout API:

- **`.sp-container`** — centers content and constrains its width.
- **`.sp-stack`** — a vertical flex column with consistent spacing.
- **`.sp-cluster`** — a wrapping horizontal flex row with consistent spacing.
- **`.sp-grid`** — a CSS grid, either with an explicit column count or
  intrinsically responsive via `--auto`.

These four names follow the established [Every Layout](https://every-layout.dev/)
layout-primitive vocabulary rather than inventing new terminology.

## `.sp-container`

```html
<div class="sp-container">...</div>
<div class="sp-container sp-container--sm">...</div>   <!-- max-width: 768px -->
<div class="sp-container sp-container--md">...</div>   <!-- max-width: 1024px -->
<div class="sp-container sp-container--lg">...</div>   <!-- max-width: 1440px -->
<div class="sp-container sp-container--fluid">...</div> <!-- no max-width -->
```

Default max-width is `1280px` (`--sp-container-base`). Horizontal padding
collapses to `--sp-space-4` under `640px` viewport width.

## `.sp-stack`

```html
<div class="sp-stack">...</div>
<div class="sp-stack sp-stack--sm">...</div>  <!-- gap: --sp-space-2 -->
<div class="sp-stack sp-stack--lg">...</div>  <!-- gap: --sp-space-6 -->
<div class="sp-stack sp-stack--xl">...</div>  <!-- gap: --sp-space-8 -->
```

Default gap is `--sp-space-4`.

## `.sp-cluster`

```html
<div class="sp-cluster">...</div>
<div class="sp-cluster sp-cluster--center">...</div>
<div class="sp-cluster sp-cluster--justify-between">...</div>
```

`.sp-cluster` has **no default cross-axis alignment** — it falls back to the
initial `stretch` value rather than assuming items should be vertically
centered. If you're clustering same-height items (buttons, badges, tags) and
want them centered, add `.sp-cluster--center` explicitly. Gap modifiers
(`--sm`/`--lg`/`--xl`) follow the same scale as `.sp-stack`.

## `.sp-grid`

```html
<div class="sp-grid sp-grid--cols-3">...</div>       <!-- fixed 3 columns -->
<div class="sp-grid sp-grid--auto">...</div>          <!-- intrinsic, no breakpoint -->
```

- `.sp-grid--cols-2/3/4/6/12` set an explicit column count, collapsing to a
  single column under `768px` viewport width. Use these when you need an
  exact column count.
- `.sp-grid--auto` uses `repeat(auto-fit, minmax(15rem, 1fr))` — the column
  count adapts to available width with no breakpoint at all. Use this for
  card grids and similar content where an exact count doesn't matter. The
  minimum item width (`15rem`) is not a token — it has a single consumer, and
  per SpartaCSS's token convention (documented in `sparta-tokens.css`), a
  value used in exactly one place stays a local literal rather than being
  promoted to shared token vocabulary. Override it per-instance via the
  `--sp-grid-min-item` custom property if a different minimum is needed.

`.sp-grid--gap-0/sm/md/lg/xl` control spacing on either grid mode.

## Breakpoints

Two viewport widths are used across this file's `@media` conditions:
`640px` and `768px`. These are the canonical breakpoint scale — new
responsive rules should reuse these values rather than introducing new ones.
They cannot be expressed as CSS custom properties, since `@media` conditions
don't resolve `var()`; this document is the single source of truth for them.

## Legacy: `.sp-flex` and atomic utilities

`.sp-flex` (and its `--row`/`--col`/`--wrap`/`--start`/`--center`/`--end`/
`--justify-*`/`--gap-*` modifiers, plus `.sp-flex-1`/`.sp-flex-none`/
`.sp-flex-shrink-0`) and the atomic spacing/sizing/display utility classes
(`.sp-p-*`, `.sp-px-*`, `.sp-py-*`, `.sp-m-*`, `.sp-mt-*`, `.sp-mb-*`,
`.sp-w-*`, `.sp-h-*`, `.sp-block`/`.sp-inline`/`.sp-hidden`/etc.) are frozen
as of `0.4.0`. They remain fully supported for backward compatibility and
their behavior is unchanged, but they will not receive new variants. Prefer
the four primitives above for new layout work.

---
Source: `src/core/sparta-layout.css`
