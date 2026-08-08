# Divider

## Purpose

Divider draws a horizontal or vertical separator line, with an optional
centered label.

## Usage

```html
<hr class="sp-divider" />

<div class="sp-divider sp-divider--labeled">
  <span class="sp-divider__label">OR</span>
</div>
```

## Class API

- `.sp-divider` — a horizontal rule. Works on `<hr>` (recommended, for
  semantics) or any element.
- `.sp-divider__label` — the centered text inside a `--labeled` divider.

## Variants

### Spacing

```html
<hr class="sp-divider sp-divider--sm" />
<hr class="sp-divider sp-divider--lg" />
```

### Weight / style

```html
<hr class="sp-divider sp-divider--strong" />
<hr class="sp-divider sp-divider--dashed" />
```

### Orientation

```html
<span class="sp-divider sp-divider--vertical"></span>
```

`--vertical` switches to a left border and stretches to fill the height of
a flex/grid container (`align-self: stretch`) — use inside a flex row,
not as a standalone block element.

### Labeled

```html
<div class="sp-divider--labeled">
  <span class="sp-divider__label">Section title</span>
</div>
```

`--labeled` is a structurally different pattern from the plain divider —
it's a flex container with two line segments (`::before`/`::after`)
flanking `.sp-divider__label`, not a single rule. Apply it to a `<div>`,
not an `<hr>`, since it requires a child label element.

## State modifiers

None — Divider is a static, non-interactive element.

## Accessibility

An `<hr>` is announced by screen readers as a thematic break — appropriate
when the divider represents a real content boundary. If a divider is
purely decorative (e.g. inside a card for visual rhythm only, not marking
a topic change), consider a non-semantic element instead, or add
`role="none"`/`aria-hidden="true"` so it isn't announced as content.
`.sp-divider--labeled`'s label text is real content and is always
announced normally.

---
Source: `src/components/sparta-divider.css`
