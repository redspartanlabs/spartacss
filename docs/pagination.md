# Pagination

## Purpose

Pagination renders a row of page links/buttons with active, disabled, and
compact-pill presentation.

## When to use which

- **Guidance:** use Pagination to move through a long, ordered set one page at a
  time, where the reader may want to jump to a particular page.
- **Guidance:** for a short sequence, a pair of previous and next
  [links](./link.md) is enough. For a path through a hierarchy, use
  [Breadcrumbs](./breadcrumbs.md).

## Usage

The links in this example point at `#` targets so that it can be shown on its
own; in your application they are real URLs, as in the code below.

```html preview height=9
<nav class="sp-pagination" aria-label="Pagination">
  <ul class="sp-pagination__list">
    <li><a class="sp-pagination__link sp-pagination__link--disabled" aria-disabled="true">Prev</a></li>
    <li><a class="sp-pagination__link sp-pagination__link--active" aria-current="page">1</a></li>
    <li><a class="sp-pagination__link" href="#page-2">2</a></li>
    <li><a class="sp-pagination__link" href="#page-3">3</a></li>
    <li><a class="sp-pagination__link" href="#page-2">Next</a></li>
  </ul>
</nav>
```

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

`--simple` renders links as fully rounded pills instead of the default
rounded-rectangle.

```html preview height=9
<nav class="sp-pagination sp-pagination--simple" aria-label="Simple pagination">
  <ul class="sp-pagination__list">
    <li><a class="sp-pagination__link" href="#p1">1</a></li>
    <li><a class="sp-pagination__link sp-pagination__link--active" aria-current="page">2</a></li>
    <li><a class="sp-pagination__link" href="#p3">3</a></li>
    <li><a class="sp-pagination__link" href="#p4">4</a></li>
  </ul>
</nav>
```

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

What SpartaCSS provides, and what stays yours:

| SpartaCSS provides | Your application provides |
| --- | --- |
| The row, the active and disabled looks | The page links and their URLs |
| Nothing at runtime | Deciding which page is current, and `aria-current="page"` |
| — | Which page numbers to show for a long set (first, last, a window around the current page) |

## Responsive behavior

Pagination is a flex row with no breakpoint-specific rules. A long run of page
numbers can exceed a narrow screen; show a window of pages (for example, the
current page and its neighbors) rather than every number.

## Common mistakes

**The active link navigates.** Giving the current page an `href` to itself adds
a pointless reload. Leave it without one and mark it `aria-current="page"`.

**A disabled link that is still a link.** Remove the `href` from a disabled
Prev or Next, or keyboard users can activate it.

**No `<nav>` and no label.** Name the landmark ("Pagination") so it can be
found.

**Hundreds of page numbers.** Show a window, and the first and last page.

## Related

- [Link](./link.md) — the underlying links.
- [Breadcrumbs](./breadcrumbs.md) — position in a hierarchy.
- [Table](./table.md) — the long data sets pagination usually serves.
- [Accessibility](./accessibility.md) — landmarks and ARIA state.

---
Source: `src/modules/data/sparta-pagination.css`
