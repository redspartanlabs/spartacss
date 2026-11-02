# Skeleton

## Purpose

`.sp-skeleton` is SpartaCSS's placeholder for content that is loading: a block
with a shimmering gradient, shaped like the content it stands in for. It lives in
`sparta-progress.css` with [Spinner](./spinner.md) (an indeterminate ring) and
[Progress](./progress.md) (a determinate bar). They communicate "something is
loading" but are three distinct, independent APIs; use whichever fits your
loading scenario, not all three together.

## When to use which

- **Guidance:** use **Skeleton** when you are waiting for content and know its
  rough shape, so the layout does not jump when it arrives.
- **Guidance:** use a [Spinner](./spinner.md) when you cannot say how much is
  done or how long it will take, and a [Progress](./progress.md) bar when you
  know the fraction complete.

## Usage

```html preview height=10
<div class="sp-skeleton-group">
  <div class="sp-skeleton sp-skeleton--heading"></div>
  <div class="sp-skeleton sp-skeleton--text"></div>
  <div class="sp-skeleton sp-skeleton--text"></div>
</div>
```

## Class API

- `.sp-skeleton` — base shimmering placeholder block (animated gradient
  sweep via the `sp-shimmer` keyframe).
- `.sp-skeleton-group` — a vertical flex wrapper for stacking multiple
  skeleton lines with consistent gap.

## Variants (shape presets)

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

## States

None — Skeleton always animates; swap it out for real content once loaded
rather than toggling a state on it.

## Accessibility

- Skeleton is purely decorative — mark its container `aria-hidden="true"` (or
  `aria-busy="true"` on the region being loaded) so assistive technology doesn't
  attempt to read empty placeholder blocks as content. SpartaCSS does not add
  ARIA roles automatically (see
  [`accessibility.md`](./accessibility.md#aria-responsibility-boundaries)).
- It respects the shared `prefers-reduced-motion` contract (see
  [`motion.md`](./motion.md)) — the animation collapses to effectively instant,
  with no per-component opt-in needed.

What SpartaCSS provides, and what stays yours:

| SpartaCSS provides | Your application provides |
| --- | --- |
| The look and the animation | Hiding the placeholder from assistive technology |
| The reduced-motion contract | Removing the skeleton when loading finishes |

## Responsive behavior

Skeleton has no breakpoint-specific behavior. Blocks fill their container unless
you size them.

## Common mistakes

**Leaving a Skeleton in the accessibility tree.** Screen readers will try to
read the empty blocks. Mark the container `aria-hidden="true"`, or mark the
region being loaded `aria-busy="true"`.

**Stacking all three.** A spinner, a bar and a skeleton for the same wait is
noise. Choose the one that matches what you know (see When to use which).

## Related

- [Spinner](./spinner.md) — an indeterminate loading ring.
- [Progress](./progress.md) — a determinate bar.
- [Motion](./motion.md) — the animations and the reduced-motion contract.
- [Accessibility](./accessibility.md) — ARIA responsibility boundaries.
- [Empty state](./empty-state.md) — what to show when loading finishes with
  nothing.

---
Source: `src/components/sparta-progress.css`
