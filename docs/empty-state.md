# Empty State

## Purpose

Empty State is a centered placeholder for when a list, table, or section
has no content to show — icon, title, body text, and an optional action
row.

## Usage

```html preview height=19
<div class="sp-empty">
  <span class="sp-empty__icon">
    <span class="sp-icon sp-icon-archive sp-icon--xl" aria-hidden="true"></span>
  </span>
  <h3 class="sp-empty__title">No results found</h3>
  <p class="sp-empty__body">Try adjusting your filters or search terms.</p>
  <div class="sp-empty__actions">
    <button class="sp-button sp-button--primary sp-button--sm">Clear filters</button>
  </div>
</div>
```

All parts are optional except `.sp-empty` itself — omit any slot you
don't need.

The icon uses the [icon module](./icons.md), so it needs `sparta-icons.css` or
a bundle that includes it.

```html preview height=11
<div class="sp-empty">
  <h3 class="sp-empty__title">Nothing here yet</h3>
  <p class="sp-empty__body">A title and body are enough.</p>
</div>
```

## Class API

- `.sp-empty` — centered flex column container.
- `.sp-empty__icon` — icon slot, dimmed to 40% opacity so it reads as
  secondary to the title/body text.
- `.sp-empty__title` — the heading line.
- `.sp-empty__body` — supporting text, capped at `36ch` so it doesn't
  stretch full-width in a wide container.
- `.sp-empty__actions` — row for one or more follow-up actions (typically
  buttons).

## Variants

Only the container padding changes between sizes — icon/title/body sizing
is constant across all three.

```html preview height=29
<div class="sp-stack">
  <div class="sp-empty sp-empty--sm"><h3 class="sp-empty__title">Small</h3><p class="sp-empty__body">Less padding.</p></div>
  <div class="sp-empty"><h3 class="sp-empty__title">Default</h3><p class="sp-empty__body">The default padding.</p></div>
  <div class="sp-empty sp-empty--lg"><h3 class="sp-empty__title">Large</h3><p class="sp-empty__body">More padding.</p></div>
</div>
```

## State modifiers

None — Empty State is a static placeholder with no interactive states of
its own (any interactivity lives in its `.sp-empty__actions` buttons/links,
documented separately).

## Accessibility

Empty State's icon is decorative — mark it `aria-hidden="true"` (as with
Alert's icon, see [`alert.md`](./alert.md#accessibility)) since the title
and body text already convey the meaning. If the empty state replaces
content that a screen reader user might expect (e.g. a table that had
rows a moment ago and now doesn't), consider an `aria-live` region around
it so the transition to "no results" is announced.

## When to use it

- **Guidance:** use Empty State when a region has no content *and the reader
  could do something about it*: no search results, a new project with no items.
  Say why it is empty and, where there is one, offer the next step.
- **Guidance:** while content is still loading, use [Progress](./progress.md)
  (a Skeleton or Spinner) instead. An empty state shown during loading
  misreports the situation.

## Responsive behavior

Empty State has no breakpoint-specific behavior. It is a centered column, and
its body is capped at `36ch`, so it stays readable in both narrow and wide
containers.

## Common mistakes

**Showing an empty state while data is still loading.** The reader sees "No
results" and then results appear. Show a skeleton or spinner until you know.

**A title with no way forward.** "No projects" with nothing else tells the
reader what is wrong but not what to do. Add an action where there is one.

**Marking the icon as meaningful.** The title already says what happened. Leave
the icon `aria-hidden="true"` so it is not announced as well.

## Related

- [Progress](./progress.md) — the loading states that come before.
- [Table](./table.md) and [List](./list.md) — the content this stands in for.
- [Button](./button.md) — the actions.
- [Icons](./icons.md) — the icon set.

---
Source: `src/components/sparta-empty-state.css`
