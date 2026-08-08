# List

## Purpose

List styles `<ul>`/`<ol>` content with consistent spacing, marker
coloring, nesting, and several presentation variants (unstyled, inline,
divided, checked).

## Usage

```html
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

## Variants

```html
<ul class="sp-list sp-list--unstyled">...</ul> <!-- no marker, no indent -->
<ul class="sp-list sp-list--inline">...</ul>   <!-- horizontal, wrapping -->
<ul class="sp-list sp-list--divided">...</ul>  <!-- horizontal rule between items -->
<ul class="sp-list sp-list--checked">...</ul>  <!-- checkmark instead of a marker -->
```

`--unstyled`, `--inline`, `--divided`, and `--checked` all remove the
native marker and left padding — they're independent presentation modes,
not combinable with `--ul`/`--ol` (which rely on native markers) or
meaningfully with each other.

Size: `--sm`, default (unsized), `--lg`.

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

---
Source: `src/components/sparta-list.css`
