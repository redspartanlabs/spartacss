# Table

## Purpose

Table styles a native `<table>` for tabular data — header, rows, striping,
hover feedback, and a sortable-column indicator, plus column-alignment
utilities.

## When to use which

- **Requirement:** use a table for data that has rows and columns, where each
  cell relates to a row header and a column header. Do not use one for page
  layout.
- **Guidance:** for a plain sequence of items with no columns, use
  [List](./list.md). For a set of independent content blocks, use
  [Card](./card.md) in a [grid](./layout.md).

## Usage

```html preview height=12
<div class="sp-table-wrapper">
  <table class="sp-table sp-table--hover">
    <thead>
      <tr>
        <th scope="col" class="sp-sortable sp-sort-asc" aria-sort="ascending">Name</th>
        <th scope="col" class="sp-col-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Widget</td>
        <td class="sp-col-right">$42.00</td>
      </tr>
      <tr>
        <td>Gadget</td>
        <td class="sp-col-right">$18.50</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Class API

- `.sp-table-wrapper` — scroll container; adds horizontal scroll and a
  border/radius around the table. Recommended for any table that might
  overflow its column, since `.sp-table` itself has no overflow handling.
- `.sp-table` — the `<table>` element itself.
- `.sp-sortable` — apply to a `<th>` to indicate it's clickable for sorting
  (cursor + hover color change only — see State modifiers below).
- `.sp-col-right` / `.sp-col-center` / `.sp-col-nowrap` — alignment/wrap
  utilities for individual `<th>`/`<td>` cells.

## Variants

`--striped` and `--hover` can be combined — striped rows get a slightly
different hover background (`--sp-bg-base`) than the default hover state,
so the hover feedback stays visible against either stripe color.

```html preview height=18
<div class="sp-table-wrapper">
  <table class="sp-table sp-table--striped sp-table--hover">
    <thead><tr><th scope="col">Plan</th><th scope="col" class="sp-col-center">Seats</th><th scope="col" class="sp-col-right">Price</th></tr></thead>
    <tbody>
      <tr><td>Starter</td><td class="sp-col-center">1</td><td class="sp-col-right">$0</td></tr>
      <tr><td>Team</td><td class="sp-col-center">10</td><td class="sp-col-right">$49</td></tr>
      <tr><td>Business</td><td class="sp-col-center">50</td><td class="sp-col-right">$199</td></tr>
      <tr><td>Enterprise</td><td class="sp-col-center">Unlimited</td><td class="sp-col-right">Custom</td></tr>
    </tbody>
  </table>
</div>
```

`--compact` tightens the cell padding, for dense data:

```html preview height=13
<div class="sp-table-wrapper">
  <table class="sp-table sp-table--compact">
    <thead><tr><th scope="col">Region</th><th scope="col" class="sp-col-right">Requests</th></tr></thead>
    <tbody>
      <tr><td>North</td><td class="sp-col-right">12,400</td></tr>
      <tr><td>South</td><td class="sp-col-right">9,800</td></tr>
      <tr><td>West</td><td class="sp-col-right">15,100</td></tr>
    </tbody>
  </table>
</div>
```

```html
<table class="sp-table sp-table--striped">...</table>
<table class="sp-table sp-table--hover">...</table>
<table class="sp-table sp-table--compact">...</table>
```

## State modifiers

- `.sp-sort-asc` / `.sp-sort-desc` — apply to the currently-sorted `<th>`
  (alongside `.sp-sortable`) to show a small arrow icon indicating sort
  direction. SpartaCSS does not track or toggle sort state — your own
  script adds/removes/swaps these classes in response to a header click,
  and is also responsible for actually re-ordering the rows.
- `.sp-table--hover` rows show a background change on `:hover`; combined
  with `.sp-table--striped`, the hover background is distinct from the
  stripe background so it remains visible on every row.

```html preview height=9
<div class="sp-table-wrapper">
  <table class="sp-table">
    <thead><tr>
      <th scope="col" class="sp-sortable sp-sort-asc" aria-sort="ascending">Name</th>
      <th scope="col" class="sp-sortable sp-sort-desc" aria-sort="descending">Date</th>
      <th scope="col" class="sp-sortable" aria-sort="none">Size</th>
    </tr></thead>
    <tbody><tr><td>report.pdf</td><td>Oct 9</td><td>1.2 MB</td></tr></tbody>
  </table>
</div>
```

## JavaScript responsibility

Sorting is yours. When a header is activated, your script:

- re-orders the rows;
- moves `.sp-sort-asc` or `.sp-sort-desc` to that header and removes it from the
  others;
- updates `aria-sort` on the headers to match.

A sortable header is better as a `<button>` inside the `<th>`, so it can be
focused and activated from the keyboard. `.sp-sortable` only changes the cursor
and the hover color.

## Accessibility

- Table styles a real `<table>`/`<thead>`/`<tbody>`/`<th>`/`<td>` structure
  — use proper `<th scope="col">` (or `scope="row"` for row headers) so
  assistive technology can associate cells with their headers. SpartaCSS
  does not add `scope` for you.
- `.sp-sortable` is purely a visual/cursor affordance. If a column is
  sortable, expose that to assistive technology via `aria-sort` on the
  `<th>` (`"ascending"`/`"descending"`/`"none"`) — SpartaCSS does not set
  this automatically (see
  [`accessibility.md`](./accessibility.md#aria-responsibility-boundaries)).
- `.sp-table-wrapper`'s horizontal scroll has no visible scroll affordance
  beyond the browser's native scrollbar — consider your own visual cue
  (e.g. a fade edge) if a table is likely to overflow on small viewports.

## Responsive behavior

Table has no breakpoint-specific rules. A table is as wide as its content
needs, so on a narrow screen it can exceed its column. Wrap it in
`.sp-table-wrapper`, which scrolls it horizontally inside its own box so the
page itself does not scroll sideways.

```html preview height=10
<div class="sp-table-wrapper">
  <table class="sp-table">
    <thead><tr><th scope="col" class="sp-col-nowrap">Identifier</th><th scope="col" class="sp-col-nowrap">Description of the item</th><th scope="col" class="sp-col-nowrap">Owner</th><th scope="col" class="sp-col-nowrap">Last updated</th><th scope="col" class="sp-col-nowrap">Status</th></tr></thead>
    <tbody><tr><td class="sp-col-nowrap">INV-2041-A</td><td class="sp-col-nowrap">A long description that does not wrap</td><td class="sp-col-nowrap">Jordan Rivera</td><td class="sp-col-nowrap">9 October 2026</td><td class="sp-col-nowrap">Approved</td></tr></tbody>
  </table>
</div>
```

## Common mistakes

**A table without a wrapper on a narrow screen.** `.sp-table` has no overflow
handling, so a wide table pushes the page sideways. Wrap it.

**Header cells with no `scope`.** Assistive technology cannot tell which header
a cell belongs to.

```html
<!-- Wrong -->
<tr><th>Name</th><th>Amount</th></tr>

<!-- Right -->
<tr><th scope="col">Name</th><th scope="col">Amount</th></tr>
```

**`.sp-sortable` with no `aria-sort` and no keyboard path.** It only changes the
cursor. Add `aria-sort`, and make the header activatable (a `<button>` inside).

**A table used to lay out a page.** A table promises rows and columns of data.
Use [layout](./layout.md) primitives.

## Related

- [List](./list.md) and [Card](./card.md) — other ways to present repeated
  items.
- [Pagination](./pagination.md) — paging through long tables.
- [Empty state](./empty-state.md) — a table with no rows.
- [Accessibility](./accessibility.md) — ARIA responsibility boundaries.

---
Source: `src/modules/data/sparta-table.css`
