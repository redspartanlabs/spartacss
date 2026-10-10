# Navbar & App Shell

`.sp-navbar` is SpartaCSS's navigation component, and `.sp-app-shell` is its
application-shell pattern for pairing Navbar with a page's content area.
`.sp-navbar__toggle` icon-color rules and a `.sp-navbar`/`.sp-sidebar`
print-hide rule predate both — they existed in `sparta-utilities.css`,
`sparta-icons.css`, and `sparta-accessibility.css` since before the modular
architecture split, with no actual Navbar component behind them until
`0.5.0` introduced one.

## When to use which

- **Guidance:** use Navbar for a site's or application's primary navigation: a
  row of top-level destinations with a brand and, optionally, actions.
- **Guidance:** use App Shell when you want the whole-page composition —
  navbar on top, page content filling the rest — as a fixed reference point.
- **Guidance:** for a secondary or temporary side panel, use
  [Drawer](./drawer.md). There is no sidebar navigation component (see Not
  included).
- **Requirement:** navigation between pages is a set of links in a `<nav>`.
  Do not build it from [Tabs](./tabs.md).

## `.sp-navbar`

The collapse breakpoint is a viewport media query, so a live example responds
to the width of the frame that shows it. The frames on this page are narrower
than `768px`, so the navbar below shows its narrow layout: the links are
hidden behind the menu button.

```html preview height=7
<nav class="sp-navbar" aria-label="Main">
  <div class="sp-navbar__brand">Acme</div>

  <button class="sp-navbar__toggle" aria-label="Toggle menu" aria-expanded="false">
    <span class="sp-icon sp-icon-menu"></span>
  </button>

  <div class="sp-navbar__links">
    <a class="sp-navbar__link sp-navbar__link--active" href="#dashboard" aria-current="page">Dashboard</a>
    <a class="sp-navbar__link" href="#reports">Reports</a>
    <a class="sp-navbar__link" href="#settings">Settings</a>
  </div>

  <div class="sp-navbar__actions">
    <button class="sp-button sp-button--sm">Sign out</button>
  </div>
</nav>
```

- `.sp-navbar__brand` — logo/title slot, left-aligned, never shrinks.
- `.sp-navbar__links` — the nav-item row. Above `768px` it renders inline;
  below `768px` it's hidden by default and only shown, as a full-width
  stacked column, when `.sp-navbar--open` is present on `.sp-navbar`.
- `.sp-navbar__link` / `.sp-navbar__link--active` — individual nav items.
- `.sp-navbar__actions` — right-aligned slot (buttons, avatar, etc.), never
  shrinks.
- `.sp-navbar__toggle` — the mobile menu button. Hidden above `768px`,
  shown below it. Its icon color states are already defined in
  `sparta-utilities.css`/`sparta-icons.css` — this component only adds the
  button's own structural rules.

### The `--open` state (no JS shipped)

SpartaCSS ships no JavaScript. `.sp-navbar--open` is a plain state modifier
that your own script adds to `.sp-navbar` (typically on the toggle button's
click handler) — the same convention already used by `.sp-modal--open` and
`.sp-accordion__item--open`. SpartaCSS doesn't introduce a new state
mechanism for Navbar; it reuses the one that already exists.

The same navbar with `--open`: below `768px` the links are shown as a stacked
column.

```html preview height=14 wide=11
<nav class="sp-navbar sp-navbar--open" aria-label="Main">
  <div class="sp-navbar__brand">Acme</div>

  <button class="sp-navbar__toggle" aria-label="Toggle menu" aria-expanded="true">
    <span class="sp-icon sp-icon-menu"></span>
  </button>

  <div class="sp-navbar__links">
    <a class="sp-navbar__link sp-navbar__link--active" href="#dashboard" aria-current="page">Dashboard</a>
    <a class="sp-navbar__link" href="#reports">Reports</a>
    <a class="sp-navbar__link" href="#settings">Settings</a>
  </div>

  <div class="sp-navbar__actions">
    <button class="sp-button sp-button--sm">Sign out</button>
  </div>
</nav>
```

The `768px` collapse breakpoint is the same one documented in
`docs/layout.md` — no new breakpoint was introduced for this component.

### JavaScript responsibility

Your script:

- adds and removes `.sp-navbar--open` on `.sp-navbar` when the toggle is pressed;
- keeps `aria-expanded` on the toggle in step with it;
- closes the menu, if you want it to, when a link is chosen or `Escape` is
  pressed.

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

- [Page header](./page-header.md) — the title row inside the shell.
- [Layout](./layout.md) — container, stack, cluster and grid, and the
  breakpoints.
- [Drawer](./drawer.md) — a side panel.
- [Accessibility](./accessibility.md) — landmarks and skip links.

---
Source: `src/components/sparta-navbar.css`, `src/patterns/sparta-app-shell.css`
