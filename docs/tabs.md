# Tabs

## Purpose

Tabs switches between panels of content via a row of labeled triggers —
default underline style, plus pill and vertical layout variants.

## When to use which

- **Requirement:** use Tabs to switch between panels of content *on the same
  page*, where the panels are alternative views of one thing. Do not use Tabs
  for navigation between pages: that is a set of links, and it needs link
  semantics, a real URL for each destination, and the browser's history. Use a
  list of [links](./link.md) in a `<nav>`, or [Breadcrumbs](./breadcrumbs.md)
  for a path.
- **Guidance:** for sections the reader may want open together, use
  [Accordion](./accordion.md).
- **Guidance:** for a small action menu, use [Dropdown](./dropdown.md).

## Usage

The first tab is selected. SpartaCSS ships no JavaScript, so tabs in this
example do not switch: selecting a tab is your script's job (see JavaScript
responsibility below).

```html preview height=11
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

`--pills` replaces the underline style with a rounded, padded pill
selector on a background track. `--vertical` switches the tab list to a
column with a right-side divider instead of a bottom one — pair it with a
side-by-side layout (e.g. `.sp-cluster` or `.sp-grid`) for the tabs and
panel, since `--vertical` only affects the tab list itself.

```html preview height=7
<div class="sp-tabs sp-tabs--pills">
  <button class="sp-tabs__tab sp-tabs__tab--active">Overview</button>
  <button class="sp-tabs__tab">Activity</button>
  <button class="sp-tabs__tab">Settings</button>
</div>
```

```html preview height=17 wide=12
<div class="sp-cluster">
  <div class="sp-tabs sp-tabs--vertical">
    <button class="sp-tabs__tab sp-tabs__tab--active">Overview</button>
    <button class="sp-tabs__tab">Activity</button>
    <button class="sp-tabs__tab">Settings</button>
  </div>
  <div class="sp-tabs__panel">Overview content, beside the tab list.</div>
</div>
```

```html
<div class="sp-tabs sp-tabs--pills">...</div>
<div class="sp-tabs sp-tabs--vertical">...</div>
```

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

```html preview height=6
<div class="sp-tabs">
  <button class="sp-tabs__tab sp-tabs__tab--active">Selected</button>
  <button class="sp-tabs__tab">Unselected</button>
  <button class="sp-tabs__tab sp-tabs__tab--disabled">Disabled (class)</button>
  <button class="sp-tabs__tab" disabled>Disabled (native)</button>
</div>
```

## JavaScript responsibility

Your script:

- moves `.sp-tabs__tab--active` to the activated tab and removes it from the
  others;
- hides every panel (`.sp-tabs__panel--hidden`) except the one for the active
  tab;
- sets the ARIA tabs pattern if you want it: `role="tablist"` on `.sp-tabs`,
  `role="tab"` and `aria-selected` on each tab, `role="tabpanel"` on each panel,
  and a roving `tabindex` with arrow-key movement between tabs.

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

## Responsive behavior

Tabs has no breakpoint-specific rules. The tab list scrolls horizontally, with
its scrollbar hidden, when the tabs do not fit — so a reader on a narrow screen
can reach every tab, but nothing signals that there are more. If you have many
tabs, consider another pattern for narrow screens, or give the list a visible
cue.

## Common mistakes

**Using tabs as site navigation.** Each destination should be a link with its
own URL. See When to use which.

**Showing every panel.** Without `--hidden` on the inactive panels, all of them
are visible. Toggle `--hidden` together with `--active`.

**Claiming the ARIA tabs pattern without implementing it.** Adding
`role="tab"` without `aria-selected`, roving focus and arrow keys is worse than
plain buttons: it promises behavior that is not there.

**Pills or vertical tabs without a layout.** `--vertical` only styles the tab
list. Place the list and its panel side by side yourself.

## Related

- [Accordion](./accordion.md) — sections that open independently.
- [Breadcrumbs](./breadcrumbs.md) and [Pagination](./pagination.md) —
  navigation between pages.
- [Layout](./layout.md) — placing vertical tabs beside their panel.
- [Accessibility](./accessibility.md) — the CSS versus JavaScript contract.

---
Source: `src/modules/data/sparta-tabs.css`
