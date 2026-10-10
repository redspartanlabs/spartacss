# Building page layouts

This guide shows how the layout primitives, the page-level patterns and a few
components fit together into whole pages. It adds no new classes: everything
here is documented on the page it links. Read [Layout](./layout.md) first for
the four primitives.

## Start from the page frame

A page is a navbar, then content. [App shell](./app-shell.md) gives the frame,
[container](./layout.md) limits the content's width, and a
[page header](./page-header.md) opens it:

```html
<div class="sp-app-shell">
  <nav class="sp-navbar" aria-label="Main">…</nav>
  <main class="sp-app-shell__main">
    <div class="sp-container">
      <div class="sp-page-header">…</div>
      <div class="sp-stack sp-stack--lg">
        <!-- sections -->
      </div>
    </div>
  </main>
</div>
```

Each section is a block in a **stack**, so the vertical rhythm comes from one
class on the parent and not from margins on every child.

## A dashboard

Summary figures in an intrinsic grid, then a card holding the detail. The grid
needs no breakpoint: it fits as many columns as the width allows.

```html preview height=55
<div class="sp-stack sp-stack--lg">
  <div class="sp-page-header">
    <div class="sp-page-header__content">
      <span class="sp-page-header__eyebrow">Overview</span>
      <h1 class="sp-page-header__title">Dashboard</h1>
    </div>
    <div class="sp-page-header__actions">
      <button class="sp-button sp-button--sm sp-button--primary">New report</button>
    </div>
  </div>

  <div class="sp-grid sp-grid--auto">
    <div class="sp-stat"><div class="sp-stat__label">Orders</div><div class="sp-stat__value">318</div><div class="sp-stat__delta sp-stat__delta--up">+8.1%</div></div>
    <div class="sp-stat"><div class="sp-stat__label">Revenue</div><div class="sp-stat__value">$48.2k</div><div class="sp-stat__delta sp-stat__delta--up">+12.4%</div></div>
    <div class="sp-stat"><div class="sp-stat__label">Refunds</div><div class="sp-stat__value">7</div><div class="sp-stat__delta sp-stat__delta--down">-2</div></div>
  </div>

  <div class="sp-card">
    <div class="sp-card__header"><h2 class="sp-card__title">Recent orders</h2></div>
    <div class="sp-card__body">
      <div class="sp-table-wrapper">
        <table class="sp-table sp-table--hover">
          <thead><tr><th scope="col">Order</th><th scope="col" class="sp-col-right">Total</th></tr></thead>
          <tbody>
            <tr><td>#2041</td><td class="sp-col-right">$120.00</td></tr>
            <tr><td>#2040</td><td class="sp-col-right">$86.50</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
```

Why it is built this way:

- The grid is `--auto`, not `--cols-3`. A fixed count is one column on a narrow
  screen and three on a wide one with nothing between; the intrinsic grid is
  right at every width.
- The table sits in a **table wrapper**, so a wide table scrolls inside its box
  and does not widen the page.
- Spacing between the three blocks is the stack's gap. None of them carries a
  margin of its own.

## A list page

The title and its primary action in the header, the data, then paging. When there
is nothing to list, an empty state takes the table's place.

```html preview height=30
<div class="sp-stack sp-stack--lg">
  <div class="sp-page-header">
    <div class="sp-page-header__content"><h1 class="sp-page-header__title">Projects</h1></div>
    <div class="sp-page-header__actions"><button class="sp-button sp-button--sm sp-button--primary">New project</button></div>
  </div>

  <div class="sp-table-wrapper">
    <table class="sp-table sp-table--striped">
      <thead><tr><th scope="col">Name</th><th scope="col">Status</th><th scope="col" class="sp-col-right">Members</th></tr></thead>
      <tbody>
        <tr><td>Website</td><td><span class="sp-badge sp-badge--success">Active</span></td><td class="sp-col-right">8</td></tr>
        <tr><td>Mobile app</td><td><span class="sp-badge sp-badge--warning">On hold</span></td><td class="sp-col-right">5</td></tr>
        <tr><td>Billing</td><td><span class="sp-badge sp-badge--neutral">Draft</span></td><td class="sp-col-right">2</td></tr>
      </tbody>
    </table>
  </div>

  <nav class="sp-pagination" aria-label="Pagination">
    <ul class="sp-pagination__list">
      <li><a class="sp-pagination__link sp-pagination__link--disabled" aria-disabled="true">Prev</a></li>
      <li><a class="sp-pagination__link sp-pagination__link--active" aria-current="page">1</a></li>
      <li><a class="sp-pagination__link" href="#page-2">2</a></li>
      <li><a class="sp-pagination__link" href="#page-2">Next</a></li>
    </ul>
  </nav>
</div>
```

```html preview height=14
<div class="sp-empty">
  <h2 class="sp-empty__title">No projects yet</h2>
  <p class="sp-empty__body">Create your first project to get started.</p>
  <div class="sp-empty__actions"><button class="sp-button sp-button--primary sp-button--sm">New project</button></div>
</div>
```

## Content with an aside

For content next to a smaller block, a cluster wraps the two when they do not
fit side by side. Give each a basis through your own CSS; SpartaCSS provides the
wrapping row and the gap, not the widths.

```html preview height=19 wide=12
<div class="sp-cluster">
  <div class="sp-card" style="flex: 2 1 16rem"><div class="sp-card__body"><h2 class="sp-card__title">Article</h2><p>The main content takes the space that is left and wraps below the aside when the row is too narrow.</p></div></div>
  <div class="sp-card" style="flex: 1 1 10rem"><div class="sp-card__body"><h2 class="sp-card__title">Aside</h2><p>Related links.</p></div></div>
</div>
```

SpartaCSS has no sidebar layout. If you need a persistent side navigation, build
it from these primitives, or use a [Drawer](./drawer.md) for a temporary one.

## Responsive checklist

- Prefer **intrinsic** layout: `.sp-grid--auto` and `.sp-cluster`, which need no
  breakpoint.
- Use `--cols-N` only when an exact count is part of the design, and expect one
  column under `768px`.
- Wrap tables in `.sp-table-wrapper`.
- Test at a narrow width. The navbar collapses under `768px`, the page header
  stacks under `640px`, and the container's padding tightens under `640px`.
- Keep the document order the same as the reading order. Layout classes change
  appearance, not the order a keyboard or screen reader follows.

## What SpartaCSS provides, and what stays yours

| SpartaCSS provides | Your application provides |
| --- | --- |
| The primitives, the page patterns and their breakpoints | The page's content and its structure (`<main>`, headings, landmarks) |
| Even spacing and wrapping | Widths for items inside a cluster, where you want them |
| The collapsed navbar | The script that opens it, and `aria-expanded` |

## Common mistakes

**Margins on every child instead of a stack.** Use `.sp-stack` on the parent and
let its gap do the spacing.

**A grid per row.** One `.sp-grid--auto` holding all the items wraps by itself.

**Content outside a container.** Without `.sp-container`, content runs to the
edges of a wide screen.

**Testing only at desktop width.** Most layout problems show at narrow widths.

## Related

- [Layout](./layout.md), [App shell](./app-shell.md) and
  [Page header](./page-header.md): the building blocks.
- [Stat](./stat.md), [Card](./card.md) and [Table](./table.md): typical
  contents.
- [Designing forms](./guide-forms.md): forms inside these layouts.
- [Staying consistent](./guide-consistency.md).
