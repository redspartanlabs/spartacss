# Card

## Purpose

Card is a general-purpose content container — a surface with border,
radius, and shadow, plus optional header/body/footer parts and a colored
left-accent variant for semantic emphasis.

## Usage

```html
<div class="sp-card">
  <div class="sp-card__header">
    <h3 class="sp-card__title">Card title</h3>
  </div>
  <div class="sp-card__body">Card content.</div>
  <div class="sp-card__footer">
    <button class="sp-button sp-button--primary sp-button--sm">Action</button>
  </div>
</div>
```

Header, body, and footer are each optional and independent — use only the
parts you need.

## Class API

- `.sp-card` — the container. Required.
- `.sp-card__header` — top section; flex row, space-between, for a
  title plus optional trailing action.
- `.sp-card__title` — heading text inside the header.
- `.sp-card__subtitle` — secondary line under the title.
- `.sp-card__body` — main content area.
- `.sp-card__footer` — bottom section; flex row with wrapping, on an
  elevated background (`--sp-bg-elevated`) to visually separate it from
  the body.

## Variants

### Semantic accent

A 3px colored left border, for categorizing a card without changing its
overall surface:

```html
<div class="sp-card sp-card--primary">...</div>
<div class="sp-card sp-card--success">...</div>
<div class="sp-card sp-card--warning">...</div>
<div class="sp-card sp-card--error">...</div>
<div class="sp-card sp-card--info">...</div>
<div class="sp-card sp-card--secondary">...</div>
```

### Interactive

```html
<div class="sp-card sp-card--interactive">...</div>
```

Adds `cursor: pointer` and a stronger hover response (lift + larger
shadow) — use when the whole card is a click target (e.g. wrapped in an
`<a>` or given a click handler), not for cards that merely contain
interactive children.

## State modifiers

- `:hover` — every card gets a subtle shadow/border-color response by
  default; `.sp-card--interactive` upgrades this to a `translateY` lift
  plus a larger shadow, signaling clickability.

## Accessibility

Card itself carries no interactive semantics. If `.sp-card--interactive`
is used to indicate the whole card is clickable, wrap it in a real `<a>`
or `<button>` (or add appropriate `role`/keyboard handling yourself) — the
hover-lift styling alone does not make a `<div>` keyboard-operable.

---
Source: `src/components/sparta-card.css`
