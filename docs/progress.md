# Progress

## Purpose

`sparta-progress.css` is the single source file for SpartaCSS's three
loading/progress-indication primitives: **Spinner** (indeterminate
rotation), **Progress Bar** (determinate fill), and **Skeleton**
(placeholder shimmer). They're related by purpose — all communicate
"something is loading" — but are three distinct, independent APIs; use
whichever fits your loading scenario, not all three together.

## Spinner

### Usage

```html
<span class="sp-spinner" role="status" aria-label="Loading"></span>
```

### Class API

- `.sp-spinner` — a rotating ring, built from a bordered circle with one
  colored edge. Animates via the `sp-spin` keyframe (see
  [`motion.md`](./motion.md)).

### Variants

Size: `--xs`, `--sm`, `--md` (default), `--lg`, `--xl`.

Color: `--secondary`, `--success`, `--warning`, `--error`, `--muted`
(default is primary).

```html
<span class="sp-spinner sp-spinner--lg sp-spinner--success"></span>
```

### States

None — Spinner is always animating once rendered; there is no
static/paused variant. Remove the element from the DOM (or hide it) when
loading completes.

## Progress Bar

### Usage

```html
<div class="sp-progress">
  <div class="sp-progress__bar" style="width: 60%"></div>
</div>
```

### Class API

- `.sp-progress` — the track (background, rounded, `overflow: hidden`).
- `.sp-progress__bar` — the filled portion. SpartaCSS does not compute or
  animate the width value itself — set `width` (inline style, as above, or
  a custom property) from your own logic; the bar transitions smoothly
  between width changes via `--sp-duration-slow`.

### Variants

Track height: `--sm`, `--md` (default), `--lg`, `--xl`.

Fill color: `.sp-progress__bar--secondary` / `--success` / `--warning` /
`--error` / `--info` (default is primary).

Fill texture: `.sp-progress--striped` (apply to `.sp-progress`, not the
bar) adds a diagonal-stripe pattern to the fill.

```html
<div class="sp-progress sp-progress--lg sp-progress--striped">
  <div class="sp-progress__bar sp-progress__bar--success" style="width: 80%"></div>
</div>
```

### States

None beyond the width value you set — there is no built-in indeterminate
mode for Progress Bar (use Spinner for indeterminate loading instead).

## Skeleton

### Usage

```html
<div class="sp-skeleton-group">
  <div class="sp-skeleton sp-skeleton--heading"></div>
  <div class="sp-skeleton sp-skeleton--text"></div>
  <div class="sp-skeleton sp-skeleton--text"></div>
</div>
```

### Class API

- `.sp-skeleton` — base shimmering placeholder block (animated gradient
  sweep via the `sp-shimmer` keyframe).
- `.sp-skeleton-group` — a vertical flex wrapper for stacking multiple
  skeleton lines with consistent gap.

### Variants (shape presets)

```html
<div class="sp-skeleton sp-skeleton--text"></div>      <!-- one text line -->
<div class="sp-skeleton sp-skeleton--heading"></div>   <!-- wider heading line -->
<div class="sp-skeleton sp-skeleton--avatar"></div>    <!-- circular -->
<div class="sp-skeleton sp-skeleton--button"></div>    <!-- button-sized block -->
<div class="sp-skeleton sp-skeleton--card"></div>      <!-- large block -->
<div class="sp-skeleton sp-skeleton--table-row"></div> <!-- row-height block -->
```

Corner radius override: `--sm` / `--lg` (default radius is `--sp-radius-md`).

### States

None — Skeleton always animates; swap it out for real content once loaded
rather than toggling a state on it.

## Accessibility

- **Spinner and Progress Bar** communicate loading state visually only.
  Add `role="status"` (or `role="progressbar"` with `aria-valuenow`/
  `aria-valuemin`/`aria-valuemax` for Progress Bar) and an accessible
  label yourself if the loading state should be announced — SpartaCSS
  does not add ARIA roles or live-region behavior automatically (see
  [`accessibility.md`](./accessibility.md#aria-responsibility-boundaries)).
- **Skeleton** is purely decorative — mark its container
  `aria-hidden="true"` (or `aria-busy="true"` on the region being loaded)
  so assistive technology doesn't attempt to read empty placeholder
  blocks as content.
- All three respect the shared `prefers-reduced-motion` contract (see
  [`motion.md`](./motion.md)) — animations collapse to effectively
  instant, with no per-component opt-in needed.

---
Source: `src/components/sparta-progress.css`
