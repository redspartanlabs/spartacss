# List

## Purpose

List styles `<ul>`/`<ol>` content with consistent spacing, marker
coloring, nesting, and several presentation variants (unstyled, inline,
divided, checked).

## When to use which

- **Guidance:** use List for a sequence or set of short items: points, steps,
  features. Use `--ol` when order matters and `--ul` when it does not.
- **Guidance:** for tabular data with columns, use [Table](./table.md). For a
  row of navigation links, a list of links styled with `--inline` or
  `--unstyled` is fine, inside a `<nav>`.

## Usage

```html preview height=11
<ul class="sp-list sp-list--ul">
  <li class="sp-list__item">First point</li>
  <li class="sp-list__item">Second point</li>
</ul>

<ol class="sp-list sp-list--ol">
  <li class="sp-list__item">Step one</li>
  <li class="sp-list__item">Step two</li>
</ol>
```

## Class API

- `.sp-list` — base class; sets spacing, color, and line-height for list
  content. Pair with `--ul` or `--ol` for native disc/decimal markers with
  SpartaCSS's marker coloring.
- `.sp-list__item` — an individual item (`<li>`).
- Nested `.sp-list` inside a `.sp-list__item` automatically gets reduced
  indentation and switches marker style (circle for nested `--ul`,
  lower-alpha for nested `--ol`) — no extra class needed on the nested
  list.

```html preview height=11
<ul class="sp-list sp-list--ul">
  <li class="sp-list__item">Fruit
    <ul class="sp-list sp-list--ul">
      <li class="sp-list__item">Apple</li>
      <li class="sp-list__item">Pear</li>
    </ul>
  </li>
  <li class="sp-list__item">Vegetables</li>
</ul>
```

## Variants

`--unstyled`, `--inline`, `--divided`, and `--checked` all remove the
native marker and left padding — they're independent presentation modes,
not combinable with `--ul`/`--ol` (which rely on native markers) or
meaningfully with each other.

```html preview height=7
<ul class="sp-list sp-list--unstyled"><li class="sp-list__item">No marker</li><li class="sp-list__item">No indent</li></ul>
```

```html preview height=5
<ul class="sp-list sp-list--inline"><li class="sp-list__item">Horizontal</li><li class="sp-list__item">and</li><li class="sp-list__item">wrapping</li></ul>
```

```html preview height=13
<ul class="sp-list sp-list--divided"><li class="sp-list__item">A rule between</li><li class="sp-list__item">each pair</li><li class="sp-list__item">of items</li></ul>
```

```html preview height=9
<ul class="sp-list sp-list--checked"><li class="sp-list__item">Included in every plan</li><li class="sp-list__item">Unlimited projects</li><li class="sp-list__item">Priority support</li></ul>
```

Size: `--sm`, default (unsized), `--lg`.

```html preview height=8
<ul class="sp-list sp-list--ul sp-list--sm"><li class="sp-list__item">Small</li></ul>
<ul class="sp-list sp-list--ul"><li class="sp-list__item">Default</li></ul>
<ul class="sp-list sp-list--ul sp-list--lg"><li class="sp-list__item">Large</li></ul>
```

## State modifiers

None — List is a static content component with no interactive states.

## Accessibility

- `.sp-list--checked`'s checkmark (rendered via `::before`, sharing the
  same `--sp-icon-bg-check-white` token as Checkbox's checked state — see
  [`forms.md`](./forms.md#checkbox--radio)) is decorative. The item's own
  text content is what conveys meaning — don't rely on the checkmark alone
  to communicate "completed" or "included" if that distinction matters;
  say so in the text.
- `.sp-list--inline` visually reflows items into a horizontal row but the
  underlying `<ul>`/`<li>` semantics are unchanged, so list semantics
  (item count, list role) are preserved for assistive technology
  regardless of which visual variant is applied.

## Responsive behavior

List has no breakpoint-specific behavior. `--inline` wraps onto further lines
when the items do not fit.

## Common mistakes

**Combining `--ul` with `--unstyled`, `--inline`, `--divided` or `--checked`.**
Those variants replace the native marker that `--ul` and `--ol` depend on.
Choose one mode.

**Using `--ol` where order does not matter.** The numbers promise a sequence.

**Using a list for layout.** A `<ul>` of unrelated blocks adds list semantics
the reader does not need. Use a [stack](./layout.md) for spacing.

## Related

- [Table](./table.md) — data with columns.
- [Forms](./forms.md) — the checkmark token shared with Checkbox.
- [Breadcrumbs](./breadcrumbs.md) — a navigation trail, which is its own
  component.

---
Source: `src/components/sparta-list.css`
