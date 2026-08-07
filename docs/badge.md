# Badge & Chip

## Purpose

`.sp-badge` and `.sp-chip` both live in `sparta-badge.css` and both render
a small, pill-shaped, colored label — but they serve different purposes
and are not interchangeable:

- **Badge** — a static, compact status/count label (e.g. "NEW", "3",
  "BETA"). Small, uppercase, non-interactive by default.
- **Chip** — a larger, optionally interactive, optionally removable token
  (e.g. a selected filter, an input tag). Supports hover, selection, and a
  built-in remove button.

If you need a tiny inline status indicator, use Badge. If you need a
selectable or removable token (filter pills, multi-select tags), use Chip.

---

## Badge

### Usage

```html
<span class="sp-badge sp-badge--primary">New</span>
<span class="sp-badge sp-badge--success sp-badge--dot">Online</span>
```

### Class API

- `.sp-badge` — base class. Required; must be paired with a color variant.

### Variants

Color: `--primary`, `--secondary`, `--success`, `--warning`, `--error`,
`--info`, `--neutral`.

Size: `--sm`, default (unsized), `--lg`.

Style: `--dot` — prepends a small solid `currentColor` dot before the
label (via `::before`), for a status-indicator look.

```html
<span class="sp-badge sp-badge--neutral sp-badge--sm">Draft</span>
<span class="sp-badge sp-badge--error sp-badge--lg">Failed</span>
```

### State modifiers

None — Badge is a static, non-interactive label with no hover/focus/
active states.

### Accessibility

Badge text should be meaningful on its own (e.g. "3 unread", not just a
bare "3" with meaning conveyed only by surrounding visual context) since
it carries no additional ARIA labeling by default. `.sp-badge--dot`'s dot
is purely decorative — the color/status meaning should also be present in
the text content, not conveyed by color alone.

---

## Chip

### Usage

```html
<span class="sp-chip sp-chip--interactive">
  Frontend
  <button class="sp-chip__remove" aria-label="Remove Frontend filter">×</button>
</span>
```

### Class API

- `.sp-chip` — base class. Works as a static label on its own; add
  `--interactive` for hover feedback and `.sp-chip__remove` for a remove
  affordance.
- `.sp-chip__remove` — small circular button, meant to sit inside a chip.

### Variants

Color: `--primary`, `--secondary`, `--success`, `--warning`, `--error`
(same subtle-background/border/text pattern as Badge's color variants,
tuned for Chip's larger surface).

Size: `--sm`, default (unsized), `--lg`.

```html
<span class="sp-chip sp-chip--primary sp-chip--sm">Active</span>
```

### State modifiers

- `.sp-chip--interactive` — adds `cursor: pointer` and a hover response
  (surface background, lighter border, primary text) — use when the whole
  chip is clickable (e.g. a filter toggle).
- `.sp-chip--selected` / `.sp-chip--active` — both apply the identical
  "selected" treatment (primary-subtle background/border/text); use
  whichever name reads better for your use case (toggle-style selection
  vs. active-filter state) — they are aliases, not different states.
- `.sp-chip__remove:hover` — the remove button's opacity increases from
  0.6 to 1 on hover, independent of the parent chip's own state.

### Accessibility

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

---
Source: `src/components/sparta-badge.css`
