# Breadcrumbs

## Purpose

Breadcrumbs renders a horizontal trail of links showing the current page's
position in a hierarchy, with an automatic separator between items.

## Usage

```html
<nav class="sp-breadcrumbs" aria-label="Breadcrumb">
  <ol class="sp-breadcrumbs__list">
    <li class="sp-breadcrumbs__item">
      <a class="sp-breadcrumbs__link" href="/">Home</a>
    </li>
    <li class="sp-breadcrumbs__item">
      <a class="sp-breadcrumbs__link" href="/reports">Reports</a>
    </li>
    <li class="sp-breadcrumbs__item">
      <span class="sp-breadcrumbs__current">Q3 Summary</span>
    </li>
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

```html
<nav class="sp-breadcrumbs" style="--sp-breadcrumb-sep: '›'">
  ...
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

---
Source: `src/modules/data/sparta-breadcrumbs.css`
