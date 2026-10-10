# Layout

SpartaCSS's layout system lives in `src/core/sparta-layout.css`. Four
primitives are the supported, documented layout API:

- **`.sp-container`** — centers content and constrains its width.
- **`.sp-stack`** — a vertical flex column with consistent spacing.
- **`.sp-cluster`** — a wrapping horizontal flex row with consistent spacing.
- **`.sp-grid`** — a CSS grid, either with an explicit column count or
  intrinsically responsive via `--auto`.

These four names follow the established [Every Layout](https://every-layout.dev/)
layout-primitive vocabulary rather than inventing new terminology.

## Choosing a primitive

- **Container** limits how wide content can grow and centers it.
- **Stack** puts things one under another with an even gap.
- **Cluster** puts things side by side and wraps them onto more lines when they
  do not fit.
- **Grid** puts things in columns.

They nest: a grid of cards, each card holding a stack, a cluster of buttons in
a card footer.

A note on the live examples on this page and throughout the documentation: a
viewport media query responds to the width of the frame that shows the example,
not to the width of your screen. The frames are narrower than the `640px` and
`768px` breakpoints below, so an example that depends on one of them shows its
*narrow* layout. This matters for `.sp-grid--cols-N`, which collapses under
`768px`: its example below is a single column. The intrinsic `.sp-grid--auto`
has no breakpoint and shows the same at any width.

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

A container is a block that is centered and no wider than its maximum. In a
frame narrower than the maximum it fills the frame, as here:

```html preview height=9
<div class="sp-container sp-container--sm" style="outline: 1px dashed var(--sp-border-strong)">
  <div class="sp-card"><div class="sp-card__body">Content inside a small container (max 768px).</div></div>
</div>
```

## `.sp-stack`

```html
<div class="sp-stack">...</div>
<div class="sp-stack sp-stack--sm">...</div>  <!-- gap: --sp-space-2 -->
<div class="sp-stack sp-stack--lg">...</div>  <!-- gap: --sp-space-6 -->
<div class="sp-stack sp-stack--xl">...</div>  <!-- gap: --sp-space-8 -->
```

Default gap is `--sp-space-4`.

```html preview height=23
<div class="sp-stack">
  <div class="sp-card"><div class="sp-card__body">Default gap</div></div>
  <div class="sp-card"><div class="sp-card__body">Default gap</div></div>
</div>
<div class="sp-stack sp-stack--sm" style="margin-top: var(--sp-space-6)">
  <div class="sp-card"><div class="sp-card__body">Small gap</div></div>
  <div class="sp-card"><div class="sp-card__body">Small gap</div></div>
</div>
```

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

```html preview height=17 wide=14
<div class="sp-stack">
  <div class="sp-cluster sp-cluster--center">
    <button class="sp-button sp-button--primary">Save</button>
    <button class="sp-button sp-button--ghost">Cancel</button>
    <span class="sp-badge sp-badge--success">Draft</span>
  </div>
  <div class="sp-cluster sp-cluster--justify-between">
    <span>Pushed to the start</span>
    <span>and the end</span>
  </div>
  <div class="sp-cluster">
    <span class="sp-chip">Wraps</span><span class="sp-chip">onto</span><span class="sp-chip">further</span><span class="sp-chip">lines</span><span class="sp-chip">when</span><span class="sp-chip">there</span><span class="sp-chip">is</span><span class="sp-chip">not</span><span class="sp-chip">enough</span><span class="sp-chip">room</span>
  </div>
</div>
```

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

An intrinsic grid. It fits as many columns as the width allows, so it needs no
breakpoint:

```html preview height=23
<div class="sp-grid sp-grid--auto">
  <div class="sp-card"><div class="sp-card__body">One</div></div>
  <div class="sp-card"><div class="sp-card__body">Two</div></div>
  <div class="sp-card"><div class="sp-card__body">Three</div></div>
  <div class="sp-card"><div class="sp-card__body">Four</div></div>
</div>
```

A grid with an explicit column count. Under `768px` of viewport width it is a
single column, which is what the frame shows here; in a wider viewport this is
three columns:

```html preview height=18
<div class="sp-grid sp-grid--cols-3">
  <div class="sp-card"><div class="sp-card__body">One</div></div>
  <div class="sp-card"><div class="sp-card__body">Two</div></div>
  <div class="sp-card"><div class="sp-card__body">Three</div></div>
</div>
```

Raising the minimum item width of an intrinsic grid:

```html preview height=13 wide=8
<div class="sp-grid sp-grid--auto sp-grid--gap-lg" style="--sp-grid-min-item: 12rem">
  <div class="sp-card"><div class="sp-card__body">A wider minimum</div></div>
  <div class="sp-card"><div class="sp-card__body">so fewer columns</div></div>
</div>
```

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
`.sp-w-*`, `.sp-h-*`, `.sp-block`/`.sp-inline`/`.sp-hidden`/etc.) remain
fully supported for backward compatibility and their behavior is
unchanged, but they will not receive new variants. Prefer the four
primitives above for new layout work.

These utilities have been described as frozen by convention since `0.4.0`.
Whether they carry ADR-0002's formal `FROZEN` guarantee is unresolved: that
rule covers selectors explicitly marked `FROZEN` in source, and no selector
in `sparta-layout.css` carries the marker, while the markers on the legacy
Tooltip/Accordion/Modal APIs describe themselves as following the same
convention as these utilities. See
[ADR-0005](adr/0005-canonical-ui-component-standard.md).

## Responsive behavior

Layout is where SpartaCSS's responsive behavior lives. The container shrinks its
padding under `640px`. `.sp-grid--cols-N` collapses to one column under
`768px`. `.sp-grid--auto` and `.sp-cluster` adapt to the available width with
no breakpoint at all. Prefer the intrinsic ones, `--auto` and the cluster,
where an exact column count is not needed.

## Common mistakes

**A fixed column count for content that has no required count.** `--cols-4` is
one column on a phone and four on a desktop with nothing in between. For cards,
`--auto` gives the right number at every width.

**A cluster of buttons that look misaligned.** A cluster has no default
cross-axis alignment. Add `.sp-cluster--center` when the items should line up
vertically.

**Building a layout out of the legacy utilities.** `.sp-flex` and the atomic
`.sp-p-*` and `.sp-m-*` classes still work but will not receive new variants.
Prefer the four primitives.

**Nesting a container inside a container.** A container centers and limits
width once. A second one adds padding and a second maximum for no reason.

**Using a grid for one row of unrelated items.** A cluster, which wraps, is the
better fit.

## Related

- [Design tokens](./tokens.md) — the spacing scale the gaps use.
- [Card](./card.md) and [Stat](./stat.md) — common grid items.
- [App shell](./app-shell.md) and [Page header](./page-header.md) — page-level
  composition.
- [Getting started](./getting-started.md) — your first page.

---
Source: `src/core/sparta-layout.css`
