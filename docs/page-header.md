# Page Header

## Purpose

Page Header is a page-level pattern for a title, optional eyebrow/
subtitle/meta row, and a trailing actions slot — meant to sit at the top
of a page's content area, typically inside [`app-shell.md`](./app-shell.md)'s
`.sp-app-shell__main`/`.sp-container`.

## Usage

```html
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

```html
<div class="sp-page-header sp-page-header--sm">...</div>
<div class="sp-page-header sp-page-header--lg">...</div>
```

### Title wrapping

```html
<h1 class="sp-page-header__title sp-page-header__title--wrap">...</h1>
```

By default the title truncates on one line (`white-space: nowrap` +
ellipsis); `--wrap` allows it to wrap to multiple lines instead. Below
`640px` the title always wraps regardless of this modifier.

### Border

```html
<div class="sp-page-header sp-page-header--borderless">...</div>
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

---
Source: `src/patterns/sparta-page-header.css`
