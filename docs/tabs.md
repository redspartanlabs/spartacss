# Tabs

## Purpose

Tabs switches between panels of content via a row of labeled triggers —
default underline style, plus pill and vertical layout variants.

## Usage

```html
<div class="sp-tabs">
  <button class="sp-tabs__tab sp-tabs__tab--active">Overview</button>
  <button class="sp-tabs__tab">Activity</button>
  <button class="sp-tabs__tab" disabled>Settings</button>
</div>

<div class="sp-tabs__panel">Overview content.</div>
<div class="sp-tabs__panel sp-tabs__panel--hidden">Activity content.</div>
```

## Class API

- `.sp-tabs` — the tab-list row. Horizontally scrollable with a hidden
  scrollbar if the tabs overflow their container.
- `.sp-tabs__tab` — an individual tab trigger (`<button>` recommended).
- `.sp-tabs__panel` — a content panel associated with one tab.

## Variants

### Layout

```html
<div class="sp-tabs sp-tabs--pills">...</div>
<div class="sp-tabs sp-tabs--vertical">...</div>
```

`--pills` replaces the underline style with a rounded, padded pill
selector on a background track. `--vertical` switches the tab list to a
column with a right-side divider instead of a bottom one — pair it with a
side-by-side layout (e.g. `.sp-cluster` or `.sp-grid`) for the tabs and
panel, since `--vertical` only affects the tab list itself.

## State modifiers

- `.sp-tabs__tab--active` — marks the currently selected tab. SpartaCSS
  does not track selection; your own script moves this class between tabs
  in response to clicks and shows/hides the corresponding panel.
- `.sp-tabs__tab--disabled` (or native `disabled` on a `<button>`) — dims
  the tab and disables pointer events.
- `.sp-tabs__panel--hidden` — hides a panel (`display: none`). Toggle
  alongside `--active` so exactly one panel is visible per active tab.
- `:focus-visible` on a tab shows an inset focus ring, shaped to match the
  tab's top corners so it doesn't visually collide with the underline.

## Accessibility

- Use `<button>` for each `.sp-tabs__tab` so they're keyboard-focusable
  and activatable by default (see
  [`accessibility.md`](./accessibility.md#semantic-html-expectations)).
- SpartaCSS does not implement the ARIA tabs pattern (`role="tablist"`,
  `role="tab"`, `role="tabpanel"`, `aria-selected`, roving `tabindex`,
  arrow-key navigation between tabs) — these are the consumer's
  responsibility to add if full tab-pattern semantics are required. Class
  toggling and panel visibility are all SpartaCSS provides; keyboard
  arrow-key movement between tabs is not built in (only native Tab-key
  focus order applies by default).
- Disabled tabs (`--disabled` or native `disabled`) are correctly skipped
  by keyboard Tab order when using a real `<button disabled>`.

---
Source: `src/modules/data/sparta-tabs.css`
