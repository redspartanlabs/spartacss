# Breadcrumbs

## Purpose

Breadcrumbs renders a horizontal trail of links showing the current page's
position in a hierarchy, with an automatic separator between items.

## When to use which

- **Guidance:** use Breadcrumbs to show where the current page sits in a
  hierarchy and to let the reader climb back up it. It suits sites with several
  levels; it adds little to a flat site.
- **Guidance:** for navigating between sibling pages, use a list of
  [links](./link.md) or [Pagination](./pagination.md). For switching views on
  one page, use [Tabs](./tabs.md).

## Usage

The links in this example point at `#` targets so that it can be shown on its
own; in your application they are your pages' real URLs, as in the code below
the example.

```html preview height=6
<nav class="sp-breadcrumbs" aria-label="Breadcrumb">
  <ol class="sp-breadcrumbs__list">
    <li class="sp-breadcrumbs__item">
      <a class="sp-breadcrumbs__link" href="#home">Home</a>
    </li>
    <li class="sp-breadcrumbs__item">
      <a class="sp-breadcrumbs__link" href="#reports">Reports</a>
    </li>
    <li class="sp-breadcrumbs__item">
      <span class="sp-breadcrumbs__current" aria-current="page">Q3 Summary</span>
    </li>
  </ol>
</nav>
```

```html
<nav class="sp-breadcrumbs" aria-label="Breadcrumb">
  <ol class="sp-breadcrumbs__list">
    <li class="sp-breadcrumbs__item"><a class="sp-breadcrumbs__link" href="/">Home</a></li>
    <li class="sp-breadcrumbs__item"><a class="sp-breadcrumbs__link" href="/reports">Reports</a></li>
    <li class="sp-breadcrumbs__item"><span class="sp-breadcrumbs__current" aria-current="page">Q3 Summary</span></li>
  </ol>
</nav>
```

## Class API

- `.sp-breadcrumbs` — outer wrapper; also defines the separator character
  via the `--sp-breadcrumb-sep` custom property (default: `"/"`).
- `.sp-breadcrumbs__list` — flex row, wraps on narrow viewports.
- `.sp-breadcrumbs__item` — one crumb. Every item except the last
  automatically gets a separator appended after it via `::after`.
- `.sp-breadcrumbs__link` — a clickable crumb.
- `.sp-breadcrumbs__current` — the final, non-clickable crumb representing
  the current page.

## Variants

Override the separator per instance by redeclaring the custom property:

```html preview height=6
<nav class="sp-breadcrumbs" style="--sp-breadcrumb-sep: '›'" aria-label="Breadcrumb">
  <ol class="sp-breadcrumbs__list">
    <li class="sp-breadcrumbs__item"><a class="sp-breadcrumbs__link" href="#home">Home</a></li>
    <li class="sp-breadcrumbs__item"><a class="sp-breadcrumbs__link" href="#docs">Docs</a></li>
    <li class="sp-breadcrumbs__item"><span class="sp-breadcrumbs__current" aria-current="page">Guide</span></li>
  </ol>
</nav>
```

This is a plain CSS custom property, not a `--sp-breadcrumbs--*` class
modifier — set it inline (as above) or in your own stylesheet scoped to
whatever selector you need.

## State modifiers

None — Breadcrumbs has no interactive states beyond the native `:hover`/
`:focus-visible` already defined on `.sp-breadcrumbs__link`.

## Accessibility

- Wrap the component in `<nav aria-label="Breadcrumb">` as shown in Usage
  — SpartaCSS provides no landmark role by default.
- Use `.sp-breadcrumbs__current` (a `<span>`, not a link) for the current
  page, and consider adding `aria-current="page"` to it for assistive
  technology.
- The separator (`::after` content, driven by `--sp-breadcrumb-sep`) is
  decorative and not read as meaningful text by screen readers reading
  generated content conventions — don't rely on it to convey structure;
  the underlying `<ol>`/`<li>` list order already does that.

## Responsive behavior

`.sp-breadcrumbs__list` wraps, so a long trail flows onto further lines on a
narrow screen instead of overflowing. There are no breakpoint-specific rules.

```html preview height=8
<nav class="sp-breadcrumbs" aria-label="Breadcrumb">
  <ol class="sp-breadcrumbs__list">
    <li class="sp-breadcrumbs__item"><a class="sp-breadcrumbs__link" href="#a">Organization settings</a></li>
    <li class="sp-breadcrumbs__item"><a class="sp-breadcrumbs__link" href="#b">Billing and subscriptions</a></li>
    <li class="sp-breadcrumbs__item"><a class="sp-breadcrumbs__link" href="#c">Payment methods</a></li>
    <li class="sp-breadcrumbs__item"><span class="sp-breadcrumbs__current" aria-current="page">Add a card</span></li>
  </ol>
</nav>
```

## Common mistakes

**No `<nav>` and no label.** Without them the trail is not a landmark, and
there is nothing to tell a screen-reader user what it is.

**The current page as a link.** A crumb that links to the page you are on adds
a dead end. Use `.sp-breadcrumbs__current`.

**A trail that does not match the hierarchy.** Breadcrumbs show where a page
*is*, not how the reader got there. Build the trail from the page's position.

**Expecting the separator to be read aloud.** It is generated content; the
`<ol>` carries the structure.

## Related

- [Link](./link.md) — the underlying links.
- [Pagination](./pagination.md) — moving between pages of a set.
- [Page header](./page-header.md) — breadcrumbs are often placed above a title.
- [Accessibility](./accessibility.md) — landmarks and labels.

---
Source: `src/modules/data/sparta-breadcrumbs.css`
