# Spinner

## Purpose

`.sp-spinner` is SpartaCSS's indeterminate loading indicator: a rotating ring
shown while work is in progress. It lives in `sparta-progress.css` with
[Progress](./progress.md) (a determinate bar) and [Skeleton](./skeleton.md) (a
placeholder shimmer). They communicate "something is loading" but are three
distinct, independent APIs; use whichever fits your loading scenario, not all
three together.

## When to use which

- **Guidance:** use a **Spinner** when work is in progress and you cannot say
  how much is done, or how long it will take.
- **Guidance:** use [Progress](./progress.md) when you know the fraction
  complete — an upload, a multi-step flow.
- **Guidance:** use [Skeleton](./skeleton.md) when you are waiting for content
  and know its rough shape, so the layout does not jump when it arrives.
- **Guidance:** for a button that is busy, use the button's own
  `--loading` state rather than a separate spinner. See [Button](./button.md).

## Usage

```html preview height=5
<span class="sp-spinner" role="status" aria-label="Loading"></span>
```

## Class API

- `.sp-spinner` — a rotating ring, built from a bordered circle with one
  colored edge. Animates via the `sp-spin` keyframe (see
  [`motion.md`](./motion.md)).

## Variants

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

## States

None — Spinner is always animating once rendered; there is no
static/paused variant. Remove the element from the DOM (or hide it) when
loading completes.

## Accessibility

- A Spinner communicates loading state visually only. Add `role="status"` and an
  accessible label yourself if the loading state should be announced, as the
  examples do — SpartaCSS does not add ARIA roles or live-region behavior
  automatically (see
  [`accessibility.md`](./accessibility.md#aria-responsibility-boundaries)).
- It respects the shared `prefers-reduced-motion` contract (see
  [`motion.md`](./motion.md)) — the animation collapses to effectively instant,
  with no per-component opt-in needed.

What SpartaCSS provides, and what stays yours:

| SpartaCSS provides | Your application provides |
| --- | --- |
| The look and the animation | `role`, accessible name and live-region behavior |
| The reduced-motion contract | Removing the spinner when loading finishes |

## Responsive behavior

Spinner has no breakpoint-specific behavior. It is fixed-size.

## Common mistakes

**Using a Progress bar for unknown duration.** A bar that sits at an arbitrary
percentage tells the reader something false. Use a Spinner.

**Stacking all three.** A spinner, a bar and a skeleton for the same wait is
noise. Choose the one that matches what you know (see When to use which).

## Related

- [Progress](./progress.md) — a determinate bar.
- [Skeleton](./skeleton.md) — a placeholder for content that is loading.
- [Button](./button.md) — the `--loading` state for a busy button.
- [Motion](./motion.md) — the animations and the reduced-motion contract.
- [Accessibility](./accessibility.md) — ARIA responsibility boundaries.

---
Source: `src/components/sparta-progress.css`
