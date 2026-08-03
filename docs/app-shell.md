# Navbar & App Shell

`0.5.0` adds SpartaCSS's first navigation component (`.sp-navbar`) and its
first application-shell pattern (`.sp-app-shell`), resolving a long-standing
gap: `.sp-navbar__toggle` icon-color rules and a `.sp-navbar`/`.sp-sidebar`
print-hide rule have existed in `sparta-utilities.css`, `sparta-icons.css`,
and `sparta-accessibility.css` since before the modular architecture split,
with no actual Navbar component behind them until now.

## `.sp-navbar`

```html
<nav class="sp-navbar">
  <div class="sp-navbar__brand">Acme</div>

  <button class="sp-navbar__toggle" aria-label="Toggle menu">
    <span class="sp-icon sp-icon-menu"></span>
  </button>

  <div class="sp-navbar__links">
    <a class="sp-navbar__link sp-navbar__link--active" href="#">Dashboard</a>
    <a class="sp-navbar__link" href="#">Reports</a>
    <a class="sp-navbar__link" href="#">Settings</a>
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

```html
<nav class="sp-navbar sp-navbar--open">...</nav>
```

SpartaCSS ships no JavaScript. `.sp-navbar--open` is a plain state modifier
that your own script adds to `.sp-navbar` (typically on the toggle button's
click handler) — the same convention already used by `.sp-modal--open` and
`.sp-accordion__item--open`. SpartaCSS doesn't introduce a new state
mechanism for Navbar; it reuses the one that already exists.

The `768px` collapse breakpoint is the same one documented in
`docs/layout.md` — no new breakpoint was introduced for this component.

## `.sp-app-shell`

A thin wrapper pairing Navbar with the existing layout primitives — it is
not a new layout system, and it does not duplicate `.sp-container`/
`.sp-stack`/`.sp-cluster`. It exists only to make the full-page composition
a fixed reference point rather than something every consumer has to
rediscover.

```html
<div class="sp-app-shell">
  <nav class="sp-navbar">...</nav>

  <main class="sp-app-shell__main">
    <div class="sp-container">
      <div class="sp-page-header">...</div>
      <div class="sp-stack">
        <!-- page content -->
      </div>
    </div>
  </main>
</div>
```

- `.sp-app-shell` — `min-height: 100vh`, flex column. Pins the Navbar to
  the top and lets the content area fill the remaining height.
- `.sp-app-shell__main` — `flex: 1`. Put your `.sp-container`-wrapped page
  content inside it.

## Not included in `0.5.0`

There is no Sidebar component or sidebar-based shell variant. A top-nav
shell and a sidebar shell are different layout problems; building both in
one release would have coupled them unnecessarily. The `.sp-sidebar`
reference in `sparta-accessibility.css`'s print rule remains unimplemented
and is tracked as known, deferred debt — not resolved by this release.
