# Table

## Purpose

Table styles a native `<table>` for tabular data — header, rows, striping,
hover feedback, and a sortable-column indicator, plus column-alignment
utilities.

## Usage

```html
<div class="sp-table-wrapper">
  <table class="sp-table sp-table--hover">
    <thead>
      <tr>
        <th class="sp-sortable sp-sort-asc">Name</th>
        <th class="sp-col-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Widget</td>
        <td class="sp-col-right">$42.00</td>
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

```html
<table class="sp-table sp-table--striped">...</table>
<table class="sp-table sp-table--hover">...</table>
<table class="sp-table sp-table--compact">...</table>
```

`--striped` and `--hover` can be combined — striped rows get a slightly
different hover background (`--sp-bg-base`) than the default hover state,
so the hover feedback stays visible against either stripe color.

## State modifiers

- `.sp-sort-asc` / `.sp-sort-desc` — apply to the currently-sorted `<th>`
  (alongside `.sp-sortable`) to show a small arrow icon indicating sort
  direction. SpartaCSS does not track or toggle sort state — your own
  script adds/removes/swaps these classes in response to a header click,
  and is also responsible for actually re-ordering the rows.
- `.sp-table--hover` rows show a background change on `:hover`; combined
  with `.sp-table--striped`, the hover background is distinct from the
  stripe background so it remains visible on every row.

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

---
Source: `src/modules/data/sparta-table.css`
