# Progress

## Purpose

`sparta-progress.css` is the single source file for SpartaCSS's three
loading/progress-indication primitives: **Spinner** (indeterminate
rotation), **Progress Bar** (determinate fill), and **Skeleton**
(placeholder shimmer). They're related by purpose — all communicate
"something is loading" — but are three distinct, independent APIs; use
whichever fits your loading scenario, not all three together.

## When to use which

- **Guidance:** use a **Spinner** when work is in progress and you cannot say
  how much is done, or how long it will take.
- **Guidance:** use a **Progress Bar** when you know the fraction complete — an
  upload, a multi-step flow.
- **Guidance:** use **Skeleton** when you are waiting for content and know its
  rough shape, so the layout does not jump when it arrives.
- **Guidance:** for a button that is busy, use the button's own
  `--loading` state rather than a separate spinner. See [Button](./button.md).

## Spinner

### Usage

```html preview height=5
<span class="sp-spinner" role="status" aria-label="Loading"></span>
```

### Class API

- `.sp-spinner` — a rotating ring, built from a bordered circle with one
  colored edge. Animates via the `sp-spin` keyframe (see
  [`motion.md`](./motion.md)).

### Variants

Size: `--xs`, `--sm`, `--md` (default), `--lg`, `--xl`.

```html preview height=7
<span class="sp-spinner sp-spinner--xs" role="status" aria-label="Loading"></span>
<span class="sp-spinner sp-spinner--sm" role="status" aria-label="Loading"></span>
<span class="sp-spinner sp-spinner--md" role="status" aria-label="Loading"></span>
<span class="sp-spinner sp-spinner--lg" role="status" aria-label="Loading"></span>
<span class="sp-spinner sp-spinner--xl" role="status" aria-label="Loading"></span>
```

Color: `--secondary`, `--success`, `--warning`, `--error`, `--muted`
(default is primary).

```html preview height=10 wide=6
<span class="sp-spinner sp-spinner--lg" role="status" aria-label="Loading"></span>
<span class="sp-spinner sp-spinner--lg sp-spinner--secondary" role="status" aria-label="Loading"></span>
<span class="sp-spinner sp-spinner--lg sp-spinner--success" role="status" aria-label="Loading"></span>
<span class="sp-spinner sp-spinner--lg sp-spinner--warning" role="status" aria-label="Loading"></span>
<span class="sp-spinner sp-spinner--lg sp-spinner--error" role="status" aria-label="Loading"></span>
<span class="sp-spinner sp-spinner--lg sp-spinner--muted" role="status" aria-label="Loading"></span>
```

### States

None — Spinner is always animating once rendered; there is no
static/paused variant. Remove the element from the DOM (or hide it) when
loading completes.

## Progress Bar

### Usage

```html preview height=4
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

```html preview height=9
<div class="sp-stack">
  <div class="sp-progress sp-progress--sm"><div class="sp-progress__bar" style="width: 40%"></div></div>
  <div class="sp-progress sp-progress--md"><div class="sp-progress__bar" style="width: 40%"></div></div>
  <div class="sp-progress sp-progress--lg"><div class="sp-progress__bar" style="width: 40%"></div></div>
  <div class="sp-progress sp-progress--xl"><div class="sp-progress__bar" style="width: 40%"></div></div>
</div>
```

Fill color: `.sp-progress__bar--secondary` / `--success` / `--warning` /
`--error` / `--info` (default is primary).

```html preview height=11
<div class="sp-stack">
  <div class="sp-progress"><div class="sp-progress__bar" style="width: 70%"></div></div>
  <div class="sp-progress"><div class="sp-progress__bar sp-progress__bar--secondary" style="width: 70%"></div></div>
  <div class="sp-progress"><div class="sp-progress__bar sp-progress__bar--success" style="width: 70%"></div></div>
  <div class="sp-progress"><div class="sp-progress__bar sp-progress__bar--warning" style="width: 70%"></div></div>
  <div class="sp-progress"><div class="sp-progress__bar sp-progress__bar--error" style="width: 70%"></div></div>
  <div class="sp-progress"><div class="sp-progress__bar sp-progress__bar--info" style="width: 70%"></div></div>
</div>
```

Fill texture: `.sp-progress--striped` (apply to `.sp-progress`, not the
bar) adds a diagonal-stripe pattern to the fill.

```html preview height=4
<div class="sp-progress sp-progress--lg sp-progress--striped">
  <div class="sp-progress__bar sp-progress__bar--success" style="width: 80%"></div>
</div>
```

### States

None beyond the width value you set — there is no built-in indeterminate
mode for Progress Bar (use Spinner for indeterminate loading instead).

## Skeleton

### Usage

```html preview height=10
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

```html preview height=30
<div class="sp-stack">
  <div class="sp-skeleton sp-skeleton--text"></div>      <!-- one text line -->
  <div class="sp-skeleton sp-skeleton--heading"></div>   <!-- wider heading line -->
  <div class="sp-skeleton sp-skeleton--avatar"></div>    <!-- circular -->
  <div class="sp-skeleton sp-skeleton--button"></div>    <!-- button-sized block -->
  <div class="sp-skeleton sp-skeleton--card"></div>      <!-- large block -->
  <div class="sp-skeleton sp-skeleton--table-row"></div> <!-- row-height block -->
</div>
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

What SpartaCSS provides, and what stays yours:

| SpartaCSS provides | Your application provides |
| --- | --- |
| The look and the animation | `role`, accessible name and live-region behavior |
| A smooth transition when the bar's width changes | The width value itself, and the `aria-valuenow` that matches it |
| The reduced-motion contract | Removing the spinner or skeleton when loading finishes |

A Progress Bar announced as a progress bar:

```html preview height=4
<div class="sp-progress" role="progressbar" aria-label="Upload" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
  <div class="sp-progress__bar" style="width: 60%"></div>
</div>
```

## Responsive behavior

None of the three has breakpoint-specific behavior. A Progress Bar fills its
container's width; a Spinner is fixed-size; Skeleton blocks fill their
container unless you size them.

## Common mistakes

**A Progress Bar whose `width` and `aria-valuenow` disagree.** SpartaCSS draws
only the width. Update both together.

**Using a Progress Bar for unknown duration.** It has no indeterminate mode. A
bar that sits at an arbitrary percentage tells the reader something false. Use
a Spinner.

**Leaving a Skeleton in the accessibility tree.** Screen readers will try to
read the empty blocks. Mark the container `aria-hidden="true"`, or mark the
region being loaded `aria-busy="true"`.

**Stacking all three.** A spinner, a bar and a skeleton for the same wait is
noise. Choose the one that matches what you know (see When to use which).

## Related

- [Button](./button.md) — the `--loading` state for a busy button.
- [Motion](./motion.md) — the animations and the reduced-motion contract.
- [Accessibility](./accessibility.md) — ARIA responsibility boundaries.
- [Empty state](./empty-state.md) — what to show when loading finishes with
  nothing.

---
Source: `src/components/sparta-progress.css`
