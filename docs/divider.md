# Divider

## Purpose

Divider draws a horizontal or vertical separator line, with an optional
centered label.

## Usage

```html preview height=11
<p>Above the rule.</p>
<hr class="sp-divider" />
<p>Below the rule.</p>

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

```html preview height=17
<p>Small spacing</p>
<hr class="sp-divider sp-divider--sm" />
<p>Default spacing</p>
<hr class="sp-divider" />
<p>Large spacing</p>
<hr class="sp-divider sp-divider--lg" />
<p>End</p>
```

### Weight / style

```html preview height=7
<hr class="sp-divider" />
<hr class="sp-divider sp-divider--strong" />
<hr class="sp-divider sp-divider--dashed" />
```

### Orientation

`--vertical` switches to a left border and stretches to fill the height of
a flex/grid container (`align-self: stretch`) — use inside a flex row,
not as a standalone block element.

```html preview height=5
<div class="sp-cluster">
  <span>Left</span>
  <span class="sp-divider sp-divider--vertical"></span>
  <span>Middle</span>
  <span class="sp-divider sp-divider--vertical"></span>
  <span>Right</span>
</div>
```

### Labeled

`--labeled` is a structurally different pattern from the plain divider —
it's a flex container with two line segments (`::before`/`::after`)
flanking `.sp-divider__label`, not a single rule. Apply it to a `<div>`,
not an `<hr>`, since it requires a child label element.

```html preview height=6
<div class="sp-divider--labeled">
  <span class="sp-divider__label">Section title</span>
</div>
```

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

## Responsive behavior

Divider has no breakpoint-specific behavior. A horizontal divider fills its
container's width. A vertical divider takes its height from the flex or grid
row it sits in, so it needs a container that gives it height.

## Common mistakes

**A vertical divider outside a flex or grid container.** It stretches with
`align-self`, which only applies inside one. On its own it has no height.

**`--labeled` on an `<hr>`.** An `<hr>` cannot contain the label.

```html
<!-- Wrong -->
<hr class="sp-divider sp-divider--labeled" />

<!-- Right -->
<div class="sp-divider--labeled"><span class="sp-divider__label">Or</span></div>
```

**Using a divider for spacing.** A rule is a boundary. For space between
things, use a [stack](./layout.md).

## Related

- [Layout](./layout.md) — stack and cluster, for spacing.
- [Card](./card.md) — dividers inside card bodies.
- [List](./list.md) — `--divided` lists draw their own rules.

---
Source: `src/components/sparta-divider.css`
