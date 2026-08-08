# Pagination

## Purpose

Pagination renders a row of page links/buttons with active, disabled, and
compact-pill presentation.

## Usage

```html
<nav class="sp-pagination" aria-label="Pagination">
  <ul class="sp-pagination__list">
    <li><a class="sp-pagination__link sp-pagination__link--disabled" aria-disabled="true">Prev</a></li>
    <li><a class="sp-pagination__link sp-pagination__link--active" aria-current="page">1</a></li>
    <li><a class="sp-pagination__link" href="?page=2">2</a></li>
    <li><a class="sp-pagination__link" href="?page=3">3</a></li>
    <li><a class="sp-pagination__link" href="?page=2">Next</a></li>
  </ul>
</nav>
```

`.sp-pagination__list` is optional — `.sp-pagination__link` elements can
also be placed directly inside `.sp-pagination` without a `<ul>`/`<li>`
wrapper (the base component also strips list-style from bare `<li>`
children of `.sp-pagination` itself, for that case).

## Class API

- `.sp-pagination` — the flex row container.
- `.sp-pagination__list` — optional `<ul>` wrapper; use when the page
  links are semantically a list.
- `.sp-pagination__link` — an individual page link/button (`<a>` or
  `<button>`).

## Variants

```html
<nav class="sp-pagination sp-pagination--simple">...</nav>
```

`--simple` renders links as fully rounded pills instead of the default
rounded-rectangle.

## State modifiers

- `.sp-pagination__link--active` — the current page. Renders filled with
  the primary color and `cursor: default`; SpartaCSS does not prevent
  clicks or navigation on it beyond that visual cue — pair with
  `aria-current="page"` and avoid giving it an `href` that navigates
  anywhere new.
- `.sp-pagination__link--disabled` — for a Prev/Next link that has nowhere
  to go (e.g. already on page 1). Dims the link, disables pointer events,
  and shows `cursor: not-allowed`.
- `:hover` is suppressed on both `--active` and `--disabled` links (guarded
  with `:not()`), so neither shows a misleading hover state.

## Accessibility

- Wrap the whole component in a `<nav aria-label="Pagination">` (or
  similar) as shown in Usage — SpartaCSS provides no landmark role by
  default.
- Mark the current page link with `aria-current="page"` — `--active`'s
  styling is purely visual and carries no ARIA state of its own (see
  [`accessibility.md`](./accessibility.md#aria-responsibility-boundaries)).
- `--disabled` links should not carry a real `href` — if using `<a>`,
  remove the `href` attribute (or use a `<span>`/`<button disabled>`
  instead) so keyboard/assistive-technology users can't activate a link
  that goes nowhere.

---
Source: `src/modules/data/sparta-pagination.css`
