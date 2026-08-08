# Drawer

## Purpose

Drawer is a fixed-position panel that slides in from the left or right edge
of the viewport — for side navigation, filters, or secondary content that
shouldn't take over the whole screen the way Modal does.

## Usage

```html
<div class="sp-backdrop sp-backdrop--visible"></div>

<div class="sp-drawer sp-drawer--right sp-drawer--open">
  <div class="sp-drawer__header">
    <h2 class="sp-drawer__title">Filters</h2>
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

```html
<div class="sp-drawer sp-drawer--left sp-drawer--open">...</div>
<div class="sp-drawer sp-drawer--right sp-drawer--open">...</div>
```

Exactly one side modifier should be applied — it controls both which edge
the drawer is pinned to and which direction it slides from.

### Width

```html
<div class="sp-drawer sp-drawer--sm">...</div>   <!-- 320px -->
<div class="sp-drawer sp-drawer--md">...</div>   <!-- 480px, default -->
<div class="sp-drawer sp-drawer--lg">...</div>   <!-- 640px -->
<div class="sp-drawer sp-drawer--xl">...</div>   <!-- 800px -->
<div class="sp-drawer sp-drawer--full">...</div> <!-- 100vw -->
```

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

## Accessibility

Drawer provides structure and open/close styling only. As with Modal (see
[`modal.md`](./modal.md)), the consumer's own script is responsible for
focus management (moving focus into the drawer on open, restoring it on
close), `Escape`-key handling, and the appropriate `aria-*` attributes
(e.g. `role="dialog"`, `aria-modal="true"`). `.sp-drawer__close` has no
built-in accessible name — always pair it with `aria-label` as shown in
Usage. See [`accessibility.md`](./accessibility.md) for the full CSS vs.
JavaScript responsibility contract.

---
Source: `src/modules/overlay/sparta-drawer.css`
