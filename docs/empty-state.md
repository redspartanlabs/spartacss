# Empty State

## Purpose

Empty State is a centered placeholder for when a list, table, or section
has no content to show — icon, title, body text, and an optional action
row.

## Usage

```html
<div class="sp-empty">
  <span class="sp-empty__icon">
    <span class="sp-icon sp-icon-archive sp-icon--xl"></span>
  </span>
  <h3 class="sp-empty__title">No results found</h3>
  <p class="sp-empty__body">Try adjusting your filters or search terms.</p>
  <div class="sp-empty__actions">
    <button class="sp-button sp-button--primary sp-button--sm">Clear filters</button>
  </div>
</div>
```

All parts are optional except `.sp-empty` itself — omit any slot you
don't need.

## Class API

- `.sp-empty` — centered flex column container.
- `.sp-empty__icon` — icon slot, dimmed to 40% opacity so it reads as
  secondary to the title/body text.
- `.sp-empty__title` — the heading line.
- `.sp-empty__body` — supporting text, capped at `36ch` so it doesn't
  stretch full-width in a wide container.
- `.sp-empty__actions` — row for one or more follow-up actions (typically
  buttons).

## Variants

```html
<div class="sp-empty sp-empty--sm">...</div>
<div class="sp-empty sp-empty--lg">...</div>
```

Only the container padding changes between sizes — icon/title/body sizing
is constant across all three.

## State modifiers

None — Empty State is a static placeholder with no interactive states of
its own (any interactivity lives in its `.sp-empty__actions` buttons/links,
documented separately).

## Accessibility

Empty State's icon is decorative — mark it `aria-hidden="true"` (as with
Alert's icon, see [`alert.md`](./alert.md#accessibility)) since the title
and body text already convey the meaning. If the empty state replaces
content that a screen reader user might expect (e.g. a table that had
rows a moment ago and now doesn't), consider an `aria-live` region around
it so the transition to "no results" is announced.

---
Source: `src/components/sparta-empty-state.css`
