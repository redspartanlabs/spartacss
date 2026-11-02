# Badge

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
selectable or removable token (filter pills, multi-select tags), use
[Chip](./chip.md), which has its own page.

## When to use which

- **Guidance:** use Badge to label or count something that is not itself
  actionable: a status ("Beta"), a count ("3 unread"), a category.
- **Guidance:** use Chip when the label is something the reader can select,
  toggle or remove: an active filter, a tag in an input.
- **Guidance:** for a message rather than a label, use [Alert](./alert.md).
  For a button-shaped action, use [Button](./button.md).

---

## Badge

### Usage

```html preview height=5
<span class="sp-badge sp-badge--primary">New</span>
<span class="sp-badge sp-badge--success sp-badge--dot">Online</span>
```

### Class API

- `.sp-badge` — base class. Required; must be paired with a color variant.

### Variants

Color: `--primary`, `--secondary`, `--success`, `--warning`, `--error`,
`--info`, `--neutral`. The tinted variants use the variant color for the border
and (subtle) background and neutral `--sp-text-primary` for the label, so the
label keeps at least 4.5:1 in both themes.

```html preview height=7
<span class="sp-badge sp-badge--primary">Primary</span>
<span class="sp-badge sp-badge--secondary">Secondary</span>
<span class="sp-badge sp-badge--success">Success</span>
<span class="sp-badge sp-badge--warning">Warning</span>
<span class="sp-badge sp-badge--error">Error</span>
<span class="sp-badge sp-badge--info">Info</span>
<span class="sp-badge sp-badge--neutral">Neutral</span>
```

Size: `--sm`, default (unsized), `--lg`.

```html preview height=5
<span class="sp-badge sp-badge--neutral sp-badge--sm">Draft</span>
<span class="sp-badge sp-badge--neutral">Default</span>
<span class="sp-badge sp-badge--error sp-badge--lg">Failed</span>
```

Style: `--dot` — prepends a small solid dot before the label (via `::before`),
for a status-indicator look. On a color variant the dot is the 65% mix of the
variant color and `--sp-text-primary` (at least 3:1 against the badge).

```html preview height=5
<span class="sp-badge sp-badge--success sp-badge--dot">Online</span>
<span class="sp-badge sp-badge--warning sp-badge--dot">Degraded</span>
<span class="sp-badge sp-badge--error sp-badge--dot">Offline</span>
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

Chip is documented on its own page: [Chip](./chip.md) — usage, color and size
variants, the `--interactive`, `--selected` and `--active` states, the remove
button, accessibility and common mistakes.

## Responsive behavior

Neither Badge nor [Chip](./chip.md) has breakpoint-specific behavior. They are
inline elements and flow with the text around them. Place a group of chips in a
[cluster](./layout.md) so they wrap onto new lines instead of overflowing.

## Common mistakes

**Using Badge as a button.** A Badge has no hover, focus or active state and
is not meant to be activated. For something to click, use Chip or Button.

**A color-only status.** A green dot and a red dot with no text tell color-blind
readers nothing. Keep the text ("Online", "Offline") — the dot is decoration.

## Related

- [Button](./button.md) — for actions.
- [Alert](./alert.md) — for messages.
- [Chip](./chip.md) — a selectable or removable token.
- [Layout](./layout.md) — clusters for groups of chips.

---
Source: `src/components/sparta-badge.css`
