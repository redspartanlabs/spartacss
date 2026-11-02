# Chip

## Purpose

`.sp-chip` is a larger, optionally interactive, optionally removable token (for
example a selected filter, or an input tag). It supports hover, selection, and a
built-in remove button. It lives in `sparta-badge.css` with [Badge](./badge.md),
which renders a similar pill-shaped colored label but serves a different purpose:
the two are not interchangeable.

If you need a selectable or removable token (filter pills, multi-select tags),
use Chip. If you need a tiny inline status indicator, use [Badge](./badge.md).

## When to use which

- **Guidance:** use Chip when the label is something the reader can select,
  toggle or remove: an active filter, a tag in an input.
- **Guidance:** use [Badge](./badge.md) to label or count something that is not
  itself actionable: a status ("Beta"), a count ("3 unread"), a category.
- **Guidance:** for a message rather than a label, use [Alert](./alert.md). For
  a button-shaped action, use [Button](./button.md).

## Usage

```html preview height=5
<span class="sp-chip sp-chip--interactive">
  Frontend
  <button class="sp-chip__remove" aria-label="Remove Frontend filter">×</button>
</span>
```

## Class API

- `.sp-chip` — base class. Works as a static label on its own; add
  `--interactive` for hover feedback and `.sp-chip__remove` for a remove
  affordance.
- `.sp-chip__remove` — small circular button, meant to sit inside a chip.

## Variants

Color: `--primary`, `--secondary`, `--success`, `--warning`, `--error`
(same subtle-background/border pattern as Badge's color variants, tuned for
Chip's larger surface). The label uses neutral `--sp-text-primary` on the tint
(at least 4.5:1 in both themes); the variant color is carried by the border and
background.

Size: `--sm`, default (unsized), `--lg`.

```html preview height=7 wide=5
<span class="sp-chip">Default</span>
<span class="sp-chip sp-chip--primary">Primary</span>
<span class="sp-chip sp-chip--secondary">Secondary</span>
<span class="sp-chip sp-chip--success">Success</span>
<span class="sp-chip sp-chip--warning">Warning</span>
<span class="sp-chip sp-chip--error">Error</span>
```

```html preview height=6
<span class="sp-chip sp-chip--primary sp-chip--sm">Small</span>
<span class="sp-chip sp-chip--primary">Default</span>
<span class="sp-chip sp-chip--primary sp-chip--lg">Large</span>
```

## State modifiers

- `.sp-chip--interactive` — adds `cursor: pointer` and a hover response
  (surface background, lighter border, primary text) — use when the whole
  chip is clickable (e.g. a filter toggle).
- `.sp-chip--selected` / `.sp-chip--active` — both apply the identical
  "selected" treatment (primary-subtle background, primary border); use
  whichever name reads better for your use case (toggle-style selection
  vs. active-filter state) — they are aliases, not different states.
- `.sp-chip__remove:hover` — the remove button is always drawn at full opacity
  in the chip text color; hover adds a 15% tint background, independent of the
  parent chip's own state.

```html preview height=7 wide=5
<span class="sp-chip sp-chip--interactive">Unselected</span>
<span class="sp-chip sp-chip--interactive sp-chip--selected">Selected</span>
<span class="sp-chip sp-chip--interactive sp-chip--active">Active (same as selected)</span>
```

A removable chip pairs the chip with its remove button:

```html preview height=5
<span class="sp-chip sp-chip--primary">Design<button class="sp-chip__remove" aria-label="Remove Design filter">×</button></span>
<span class="sp-chip sp-chip--primary">Engineering<button class="sp-chip__remove" aria-label="Remove Engineering filter">×</button></span>
```

## Accessibility

- `.sp-chip__remove` is a `<button>`-shaped visual, so use a real
  `<button>` element for it (as in the Usage example) — this gives native
  keyboard operability for free.
- Always give `.sp-chip__remove` an accessible name via `aria-label`
  (e.g. `aria-label="Remove {chip label}"`) — its visible content is
  typically a bare glyph (`×`) with no inherent meaning to assistive
  technology.
- `.sp-chip--interactive` chips that act as toggles (selected/unselected)
  should communicate that state via `aria-pressed` on the underlying
  element — SpartaCSS styles `.sp-chip--selected`/`--active` visually but
  does not set or read any ARIA state itself.

What SpartaCSS provides, and what stays yours:

| SpartaCSS provides | Your application provides |
| --- | --- |
| The pill, its colors and sizes, the selected look, the remove button's look | Making an interactive chip a real `<button>` (or giving it a role and key handling) |
| Hover response on `--interactive` | `aria-pressed` for a toggle, and the remove behavior itself |

## Responsive behavior

Chip has no breakpoint-specific behavior. It is an inline element and flows with
the text around it. Place a group of chips in a [cluster](./layout.md) so they
wrap onto new lines instead of overflowing.

## Common mistakes

**A chip that looks interactive but is a `<span>` with a click handler.**
`.sp-chip--interactive` is appearance only.

```html
<!-- Wrong: not focusable, no keyboard activation -->
<span class="sp-chip sp-chip--interactive" onclick="toggle()">Frontend</span>

<!-- Right: a real button that is also the chip -->
<button type="button" class="sp-chip sp-chip--interactive" aria-pressed="false">Frontend</button>
```

**A remove button with only "×".**

```html
<!-- Wrong: announced as "times, button" -->
<button class="sp-chip__remove">×</button>

<!-- Right -->
<button class="sp-chip__remove" aria-label="Remove Frontend filter">×</button>
```

## Related

- [Badge](./badge.md) — a static status or count label.
- [Button](./button.md) — for actions.
- [Alert](./alert.md) — for messages.
- [Forms](./forms.md) — chips are often used as input tags.
- [Layout](./layout.md) — clusters for groups of chips.

---
Source: `src/components/sparta-badge.css`
