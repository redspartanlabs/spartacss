# App Shell

`.sp-app-shell` is SpartaCSS's application-shell pattern for pairing a
[Navbar](./navbar.md) with a page's content area. Navbar, SpartaCSS's navigation
component, has its own page.

## When to use which

- **Guidance:** use [Navbar](./navbar.md) for a site's or application's primary
  navigation: a row of top-level destinations with a brand and, optionally,
  actions.
- **Guidance:** use App Shell when you want the whole-page composition —
  navbar on top, page content filling the rest — as a fixed reference point.
- **Guidance:** for a secondary or temporary side panel, use
  [Drawer](./drawer.md). There is no sidebar navigation component (see Not
  included).
- **Requirement:** navigation between pages is a set of links in a `<nav>`.
  Do not build it from [Tabs](./tabs.md).

## `.sp-navbar`

Navbar is documented on its own page: [Navbar](./navbar.md) — its slots, the
`--open` state, the JavaScript it leaves to you, accessibility and common
mistakes. The live example of the shell below includes one.

## `.sp-app-shell`

A thin wrapper pairing Navbar with the existing layout primitives — it is
not a new layout system, and it does not duplicate `.sp-container`/
`.sp-stack`/`.sp-cluster`. It exists only to make the full-page composition
a fixed reference point rather than something every consumer has to
rediscover.

```html preview height=24
<div class="sp-app-shell">
  <nav class="sp-navbar" aria-label="Main">
    <div class="sp-navbar__brand">Acme</div>
    <button class="sp-navbar__toggle" aria-label="Toggle menu" aria-expanded="false"><span class="sp-icon sp-icon-menu"></span></button>
    <div class="sp-navbar__links">
      <a class="sp-navbar__link sp-navbar__link--active" href="#dashboard" aria-current="page">Dashboard</a>
      <a class="sp-navbar__link" href="#reports">Reports</a>
    </div>
  </nav>

  <main class="sp-app-shell__main">
    <div class="sp-container">
      <div class="sp-page-header">
        <div class="sp-page-header__content"><h1 class="sp-page-header__title">Dashboard</h1></div>
      </div>
      <div class="sp-stack">
        <div class="sp-card"><div class="sp-card__body">Page content goes here.</div></div>
      </div>
    </div>
  </main>
</div>
```

- `.sp-app-shell` — `min-height: 100vh`, flex column. Pins the Navbar to
  the top and lets the content area fill the remaining height.
- `.sp-app-shell__main` — `flex: 1`. Put your `.sp-container`-wrapped page
  content inside it.

## Accessibility

- Put the links in a `<nav>` and give it an accessible name (`aria-label`),
  as the examples do. Use `aria-current="page"` on the link for the current
  page; `--active` is the visual state only.
- `.sp-navbar__toggle` is a button with no text. Give it an accessible name and
  keep `aria-expanded` current.
- The shell's content area should be a `<main>`, once per page.
- SpartaCSS adds no skip link. For a navbar with many links, provide one
  yourself (see [Accessibility](./accessibility.md)).

## Responsive behavior

Below `768px` the navbar wraps, the toggle appears and the links collapse until
`--open` is set. Above it the links are inline and the toggle is hidden. The
shell itself is a full-height flex column at every width.

## Common mistakes

**Setting `--open` and nothing else.** The menu opens, but the toggle still says
"collapsed". Keep `aria-expanded` in step.

**A toggle with no name.** It contains only an icon.

**Nested `<main>` elements, or none.** Use exactly one `<main>` per page, in
`.sp-app-shell__main`.

**Expecting a sidebar.** There is no sidebar shell. See Not included.

## Not included

There is no Sidebar component or sidebar-based shell variant. A top-nav
shell and a sidebar shell are different layout problems; building both in
one release would have coupled them unnecessarily. The `.sp-sidebar`
reference in `sparta-accessibility.css`'s print rule remains unimplemented
and is tracked as known, deferred debt.

## Related

- [Navbar](./navbar.md) — the navigation row inside the shell.
- [Page header](./page-header.md) — the title row inside the shell.
- [Layout](./layout.md) — container, stack, cluster and grid, and the
  breakpoints.
- [Drawer](./drawer.md) — a side panel.
- [Accessibility](./accessibility.md) — landmarks and skip links.

---
Source: `src/components/sparta-navbar.css`, `src/patterns/sparta-app-shell.css`
