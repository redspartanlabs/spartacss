# Page Header

## Purpose

Page Header is a page-level pattern for a title, optional eyebrow/
subtitle/meta row, and a trailing actions slot — meant to sit at the top
of a page's content area, typically inside [`app-shell.md`](./app-shell.md)'s
`.sp-app-shell__main`/`.sp-container`.

## Usage

```html preview height=15
<div class="sp-page-header">
  <div class="sp-page-header__content">
    <span class="sp-page-header__eyebrow">Reports</span>
    <h1 class="sp-page-header__title">Q3 Summary</h1>
    <p class="sp-page-header__subtitle">Revenue and engagement across all regions.</p>
    <div class="sp-page-header__meta">Last updated 2 hours ago</div>
  </div>
  <div class="sp-page-header__actions">
    <button class="sp-button sp-button--sm">Export</button>
    <button class="sp-button sp-button--sm sp-button--primary">New report</button>
  </div>
</div>
```

Eyebrow, subtitle, meta, and actions are all optional — only `__content`
and `__title` are needed for a minimal header.

```html preview height=7
<div class="sp-page-header">
  <div class="sp-page-header__content">
    <h1 class="sp-page-header__title">Settings</h1>
  </div>
</div>
```

## Class API

- `.sp-page-header` — flex row, space-between, with a bottom border;
  wraps to a column below `640px`.
- `.sp-page-header__content` — left-side group (eyebrow/title/subtitle/
  meta).
- `.sp-page-header__eyebrow` — small uppercase label above the title.
- `.sp-page-header__title` — the page's `<h1>`. Truncates with an ellipsis
  by default on a single line.
- `.sp-page-header__subtitle` — supporting text below the title, capped at
  `65ch`.
- `.sp-page-header__meta` — small muted row for secondary info (dates,
  counts, etc.).
- `.sp-page-header__actions` — right-side action row; never shrinks, and
  goes full-width below `640px`.

## Variants

### Size

```html preview height=17
<div class="sp-stack">
  <div class="sp-page-header sp-page-header--sm"><div class="sp-page-header__content"><h1 class="sp-page-header__title">Small</h1></div></div>
  <div class="sp-page-header"><div class="sp-page-header__content"><h1 class="sp-page-header__title">Default</h1></div></div>
  <div class="sp-page-header sp-page-header--lg"><div class="sp-page-header__content"><h1 class="sp-page-header__title">Large</h1></div></div>
</div>
```

### Title wrapping

By default the title truncates on one line (`white-space: nowrap` +
ellipsis); `--wrap` allows it to wrap to multiple lines instead. Below
`640px` the title always wraps regardless of this modifier.

```html preview height=21 wide=17
<div class="sp-stack">
  <div class="sp-page-header"><div class="sp-page-header__content"><h1 class="sp-page-header__title">A very long title that does not fit on one line and is therefore truncated with an ellipsis</h1></div></div>
  <div class="sp-page-header"><div class="sp-page-header__content"><h1 class="sp-page-header__title sp-page-header__title--wrap">A very long title that does not fit on one line and is therefore allowed to wrap</h1></div></div>
</div>
```

### Border

```html preview height=6
<div class="sp-page-header sp-page-header--borderless"><div class="sp-page-header__content"><h1 class="sp-page-header__title">No bottom border</h1></div></div>
```

## State modifiers

None — Page Header is a static layout pattern with no interactive states
of its own.

## Accessibility

Use a real `<h1>` for `.sp-page-header__title` (as shown in Usage) if this
is the page's primary heading — SpartaCSS styles whatever element you use
but does not assign heading semantics for you (see
[`accessibility.md`](./accessibility.md#semantic-html-expectations)). The
default text-truncation behavior is visual only — the full title text
remains in the DOM and is read in full by screen readers regardless of
the ellipsis; if the full text should also be visible on hover, add your
own `title` attribute.

- A page has one `<h1>`. If the header is not the page's primary heading,
  use the heading level that fits and keep the class.

## Responsive behavior

The header is a row on wide screens: content on the left, actions on the right.
Below a viewport width of `640px` it becomes a column, the actions fill the
width, and the title wraps. The breakpoint is a viewport media query, so a live
example responds to the width of the frame that shows it, not to your screen:
in a frame narrower than 640px the examples on this page show the narrow layout,
which is the one above. To see the wide layout, use the markup in a page wider
than 640px.

## Common mistakes

**A truncated title with nothing to reveal the rest.** The ellipsis hides the
end of the title. Use `--wrap`, or keep titles short, so readers do not lose
information.

**Several page headers on one page for sub-sections.** It is a page-level
pattern. For a section heading inside a card, use [Card](./card.md)'s header.

**Putting the actions before the content in the markup.** Source order is what
keyboard and screen-reader users follow. Keep the title first.

## Related

- [App shell](./app-shell.md) — the layout this usually sits inside.
- [Breadcrumbs](./breadcrumbs.md) — often placed above the header.
- [Button](./button.md) — the actions.
- [Card](./card.md) — headings for sections within a page.

---
Source: `src/patterns/sparta-page-header.css`
