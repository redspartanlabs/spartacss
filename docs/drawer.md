# Drawer

## Purpose

Drawer is a fixed-position panel that slides in from the left or right edge
of the viewport — for side navigation, filters, or secondary content that
shouldn't take over the whole screen the way Modal does.

## When to use which

- **Guidance:** use Drawer for secondary content that sits beside the page —
  filters, navigation, details — where the reader benefits from keeping the
  surrounding page in view.
- **Guidance:** use [Modal](./modal.md) for a short, focused decision or task
  that needs the reader's attention first and blocks everything behind it.
- **Guidance:** content that is always needed belongs in the page, not in a
  panel the reader has to open.

## Usage

An open right-side drawer. In a live example the drawer fills the example's
own frame, standing in for the viewport.

```html preview height=26
<div class="sp-backdrop sp-backdrop--visible"></div>

<div class="sp-drawer sp-drawer--right sp-drawer--sm sp-drawer--open" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
  <div class="sp-drawer__header">
    <h2 class="sp-drawer__title" id="drawer-title">Filters</h2>
    <button class="sp-drawer__close" aria-label="Close"></button>
  </div>

  <div class="sp-drawer__body">
    <p>Drawer content.</p>
  </div>

  <div class="sp-drawer__footer">
    <button class="sp-button sp-button--sm">Cancel</button>
    <button class="sp-button sp-button--sm sp-button--primary">Apply</button>
  </div>
</div>
```

### The `.sp-backdrop` relationship

Unlike Modal — whose overlay (`.sp-modal__overlay`) is a dedicated child
element scoped to that one component — Drawer has **no overlay of its
own**. It shares a standalone `.sp-backdrop` class instead, defined
alongside Drawer in the same source file. This is a real structural
difference between the two overlay components, not an oversight:

- `.sp-backdrop` is its own sibling element, not nested inside `.sp-drawer`.
- It has no default visibility — `.sp-backdrop--visible` must be added to
  show it, exactly the way `.sp-drawer--open` must be added to show the
  drawer itself. **These two classes are independent and both are the
  consumer's responsibility to toggle together** — adding `.sp-drawer--open`
  alone will slide the drawer in with no dimmed backdrop behind it, and
  vice versa.
- Because `.sp-backdrop` isn't Drawer-specific by name, don't assume some
  other component owns or auto-manages it — it exists specifically to be
  paired with Drawer (and is not used by Modal, which has its own overlay).

## Class API

- `.sp-drawer` — the sliding panel itself. Fixed position, hidden
  (`visibility: hidden`, `opacity: 0`) until `--open` is added.
- `.sp-drawer__header` / `__title` / `__close` — sticky top section.
- `.sp-drawer__body` — scrollable content area.
- `.sp-drawer__footer` — bottom action row.
- `.sp-backdrop` / `.sp-backdrop--visible` — the dimmed page overlay,
  documented above. Not nested inside `.sp-drawer`.

## Variants

### Side

Exactly one side modifier should be applied — it controls both which edge
the drawer is pinned to and which direction it slides from.

```html preview height=26
<div class="sp-backdrop sp-backdrop--visible"></div>

<div class="sp-drawer sp-drawer--left sp-drawer--sm sp-drawer--open" role="dialog" aria-modal="true" aria-labelledby="drawer-left-title">
  <div class="sp-drawer__header">
    <h2 class="sp-drawer__title" id="drawer-left-title">Navigation</h2>
    <button class="sp-drawer__close" aria-label="Close"></button>
  </div>
  <div class="sp-drawer__body"><p>A drawer pinned to the left edge.</p></div>
</div>
```

```html
<div class="sp-drawer sp-drawer--left sp-drawer--open">...</div>
<div class="sp-drawer sp-drawer--right sp-drawer--open">...</div>
```

### Width

```html
<div class="sp-drawer sp-drawer--sm">...</div>   <!-- 320px -->
<div class="sp-drawer sp-drawer--md">...</div>   <!-- 480px, default -->
<div class="sp-drawer sp-drawer--lg">...</div>   <!-- 640px -->
<div class="sp-drawer sp-drawer--xl">...</div>   <!-- 800px -->
<div class="sp-drawer sp-drawer--full">...</div> <!-- 100vw -->
```

A drawer's width is a maximum: it never exceeds the viewport it sits in.

### Transition speed

```html
<div class="sp-drawer sp-drawer--fast">...</div>          <!-- 150ms -->
<div class="sp-drawer sp-drawer--slow">...</div>          <!-- 420ms -->
<div class="sp-drawer sp-drawer--no-transition">...</div> <!-- instant -->
```

These override the default `--sp-duration-slow`-based transition (see
[`motion.md`](./motion.md)) with a literal duration rather than a token —
use sparingly, only when the default speed is genuinely wrong for a
specific drawer's content.

## State modifiers

SpartaCSS ships no JavaScript. `.sp-drawer--open` and
`.sp-backdrop--visible` are plain state modifiers that your own script
toggles together — the same convention used by `.sp-modal--open` and
`.sp-accordion__item--open`.

## JavaScript responsibility

Your script:

- adds `.sp-drawer--open` to the drawer **and** `.sp-backdrop--visible` to the
  backdrop to show them, and removes both to hide them;
- moves focus into the drawer when it opens and back to the control that
  opened it when it closes;
- closes it on `Escape`, and on a click on `.sp-backdrop` if you want that;
- keeps focus inside while it is open if it is modal;
- sets `role="dialog"`, `aria-modal="true"` and an accessible name, as the
  examples above do.

## Accessibility

Drawer provides structure and open/close styling only. As with Modal (see
[`modal.md`](./modal.md)), the consumer's own script is responsible for
focus management (moving focus into the drawer on open, restoring it on
close), `Escape`-key handling, and the appropriate `aria-*` attributes
(e.g. `role="dialog"`, `aria-modal="true"`). `.sp-drawer__close` has no
built-in accessible name — always pair it with `aria-label` as shown in
Usage. See [`accessibility.md`](./accessibility.md) for the full CSS vs.
JavaScript responsibility contract.

## Responsive behavior

Drawer has no breakpoint-specific rules. Each width modifier is a maximum, so
the drawer narrows on a small screen; `--full` fills the viewport.

## Common mistakes

**Toggling only one of the pair.** `--open` without `--visible` shows no
backdrop; `--visible` without `--open` dims the page for nothing. Toggle
`.sp-drawer--open` and `.sp-backdrop--visible` together.

**Two side modifiers.** `--left` and `--right` together leave the drawer's
edge undefined. Use one.

**An unnamed close button.**

```html
<!-- Wrong -->
<button class="sp-drawer__close"></button>

<!-- Right -->
<button class="sp-drawer__close" aria-label="Close"></button>
```

**A `.sp-icon` inside `.sp-drawer__close`.** It draws its own icon already; see
[Icons](./icons.md).

## Related

- [Modal](./modal.md) — a centered dialog.
- [Accessibility](./accessibility.md) — the CSS versus JavaScript contract.
- [Motion](./motion.md) — transitions and reduced motion.
- [App shell](./app-shell.md) — a navbar that opens with `--open` on narrow
  screens.

---
Source: `src/modules/overlay/sparta-drawer.css`
