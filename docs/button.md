# Button

## Purpose

Button is the primary interactive-action element — a single class,
`.sp-button`, plus size, color/style, width, and loading modifiers. Works
on `<button>`, `<a>`, or any element you choose; SpartaCSS styles whatever
it's placed on, but a real `<button>` is expected for native keyboard
activation (see Accessibility below).

## Usage

```html
<button class="sp-button sp-button--primary">Save</button>
<a href="/docs" class="sp-button sp-button--outline">Learn more</a>
```

## Class API

- `.sp-button` — base class. Required on every button; provides layout,
  padding, border, and the shared transition/disabled/focus behavior.

## Variants

### Size

```html
<button class="sp-button sp-button--primary sp-button--sm">Small</button>
<button class="sp-button sp-button--primary sp-button--md">Medium (default)</button>
<button class="sp-button sp-button--primary sp-button--lg">Large</button>
```

### Width

```html
<button class="sp-button sp-button--primary sp-button--full">Full width</button>
```

### Color / style

Filled: `--primary`, `--secondary`, `--success`, `--warning`, `--error`,
`--info`.

Low-emphasis: `--ghost` (transparent, no border, subtle hover fill).

Outline: `--outline` (primary), plus semantic outline variants
`--outline-secondary`, `--outline-success`, `--outline-warning`,
`--outline-error`, `--outline-info` — transparent background and colored
border/text at rest, filling with the solid color on hover.

```html
<button class="sp-button sp-button--ghost">Ghost</button>
<button class="sp-button sp-button--outline">Outline</button>
<button class="sp-button sp-button--outline-error">Outline error</button>
```

Exactly one color/style variant should be applied at a time — they aren't
designed to be combined with each other.

## State modifiers

- `:hover`, `:active` — native pseudo-classes; each color variant defines
  its own hover/active background and elevation (`translateY`/shadow)
  response, disabled automatically once `:disabled` is set (`:not(:disabled)`
  guards on every hover/active rule).
- `:disabled` / `[aria-disabled="true"]` — both are styled identically
  (45% opacity, `cursor: not-allowed`, pointer-events off). Use whichever
  matches your markup — a native `<button disabled>` or an `<a>` with
  `aria-disabled="true"` (links can't take the `disabled` attribute).
- `.sp-button--loading` — hides the label (`color: transparent`) and shows
  a centered spinner (`sp-spin` keyframe, see [`motion.md`](./motion.md)).
  Disables pointer events but does **not** add `disabled`/`aria-disabled`
  for you — set that yourself if the action should also be unclickable
  while loading.

## Accessibility

- Use a real `<button>` (or `<a>` for navigation) — SpartaCSS provides the
  visual state changes for `:disabled`, `:focus-visible`, etc., but native
  keyboard activation (`Enter`/`Space` on `<button>`) comes from the
  element, not the class.
- `:focus-visible` renders as a box-shadow ring (`--sp-shadow-focus`)
  rather than the shared outline-based focus rule, since a shadow reads
  more clearly against a filled/colored button surface. See
  [`accessibility.md`](./accessibility.md) for the full focus-ring policy.
- `.sp-button--loading` only removes visual pointer interaction; it does
  not announce a busy state to assistive technology — pair it with
  `aria-busy="true"` on the button if the loading state should be
  announced.

---
Source: `src/components/sparta-button.css`
