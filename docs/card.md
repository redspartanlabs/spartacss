# Card

## Purpose

Card is a general-purpose content container — a surface with border,
radius, and shadow, plus optional header/body/footer parts and a colored
left-accent variant for semantic emphasis.

Use it to group related content that belongs together on a page: a summary, a
form section, a result, a settings panel. It is a surface and nothing more; it
adds no behavior and no semantics of its own.

## Usage

```html preview height=15
<div class="sp-card">
  <div class="sp-card__header">
    <h3 class="sp-card__title">Card title</h3>
  </div>
  <div class="sp-card__body">Card content.</div>
  <div class="sp-card__footer">
    <button class="sp-button sp-button--primary sp-button--sm">Action</button>
  </div>
</div>
```

Header, body, and footer are each optional and independent — use only the
parts you need.

```html preview height=8
<div class="sp-card">
  <div class="sp-card__body">A card with only a body.</div>
</div>
```

## Class API

- `.sp-card` — the container. Required.
- `.sp-card__header` — top section; flex row, space-between, for a
  title plus optional trailing action.
- `.sp-card__title` — heading text inside the header.
- `.sp-card__subtitle` — secondary line under the title.
- `.sp-card__body` — main content area.
- `.sp-card__footer` — bottom section; flex row with wrapping, on an
  elevated background (`--sp-bg-elevated`) to visually separate it from
  the body.

The title is styled text, not a heading element. Choose the heading level
that fits where the card sits in your page (`<h2>`, `<h3>`, …) and put the
class on it, as the example above does.

```html preview height=16 wide=14
<div class="sp-card">
  <div class="sp-card__header">
    <div>
      <h3 class="sp-card__title">Quarterly report</h3>
      <div class="sp-card__subtitle">Updated this morning</div>
    </div>
    <button class="sp-button sp-button--ghost sp-button--sm">Share</button>
  </div>
  <div class="sp-card__body">The header holds a title, an optional subtitle, and an optional action on the right.</div>
</div>
```

## Variants

### Semantic accent

A 3px colored left border, for categorizing a card without changing its
overall surface:

```html preview height=34
<div class="sp-stack">
  <div class="sp-card sp-card--primary"><div class="sp-card__body">Primary</div></div>
  <div class="sp-card sp-card--secondary"><div class="sp-card__body">Secondary</div></div>
  <div class="sp-card sp-card--success"><div class="sp-card__body">Success</div></div>
  <div class="sp-card sp-card--warning"><div class="sp-card__body">Warning</div></div>
  <div class="sp-card sp-card--error"><div class="sp-card__body">Error</div></div>
  <div class="sp-card sp-card--info"><div class="sp-card__body">Info</div></div>
</div>
```

The accent is a categorization cue, not a status message. For a message that
the reader must notice, use [Alert](./alert.md).

### Interactive

Adds `cursor: pointer` and a stronger hover response (lift + larger
shadow) — use when the whole card is a click target (e.g. wrapped in an
`<a>` or given a click handler), not for cards that merely contain
interactive children.

```html preview height=13 wide=11
<a href="#details" style="text-decoration: none; color: inherit; display: block">
  <div class="sp-card sp-card--interactive">
    <div class="sp-card__header"><h3 class="sp-card__title">Whole card is a link</h3></div>
    <div class="sp-card__body">Hover to see the lift. The link makes it keyboard-operable.</div>
  </div>
</a>
```

## State modifiers

- `:hover` — every card gets a subtle shadow/border-color response by
  default; `.sp-card--interactive` upgrades this to a `translateY` lift
  plus a larger shadow, signaling clickability.

## Composing cards

Cards are layout-neutral: they take the width of their container. To lay
several out, use the layout primitives. `.sp-grid--auto` fits as many cards
per row as the width allows, with no breakpoint:

```html preview height=29
<div class="sp-grid sp-grid--auto">
  <div class="sp-card"><div class="sp-card__header"><h3 class="sp-card__title">One</h3></div><div class="sp-card__body">First card.</div></div>
  <div class="sp-card"><div class="sp-card__header"><h3 class="sp-card__title">Two</h3></div><div class="sp-card__body">Second card.</div></div>
  <div class="sp-card"><div class="sp-card__header"><h3 class="sp-card__title">Three</h3></div><div class="sp-card__body">Third card.</div></div>
</div>
```

See [Layout](./layout.md) for the grid, stack and cluster primitives.

## Accessibility

Card itself carries no interactive semantics. If `.sp-card--interactive`
is used to indicate the whole card is clickable, wrap it in a real `<a>`
or `<button>` (or add appropriate `role`/keyboard handling yourself) — the
hover-lift styling alone does not make a `<div>` keyboard-operable.

- A card is not a landmark. If a group of cards is a list of items, mark it up
  as a list and make each card a list item; SpartaCSS does not do this for you.
- Keep a sensible heading order. The title class styles text; the heading
  level is yours to choose.

## Responsive behavior

Card has no breakpoint-specific behavior of its own: it is a block that fills
its container, and its footer wraps. Responsiveness comes from how you place
cards — see Composing cards above.

## Common mistakes

**A clickable card that is only a `<div>`.** `.sp-card--interactive` makes it
look clickable; it does not make it focusable or operable from the keyboard.

```html
<!-- Wrong: looks clickable, but a keyboard user cannot reach or activate it -->
<div class="sp-card sp-card--interactive" onclick="open()">...</div>

<!-- Right: a real link around the card -->
<a href="/report" style="text-decoration: none; color: inherit; display: block">
  <div class="sp-card sp-card--interactive">...</div>
</a>
```

**`--interactive` on a card that only contains buttons.** The whole card then
signals that it is a click target, which it is not. Leave the modifier off and
let the buttons inside be the targets.

**Using the accent as the only signal.** A colored left border conveys
category to sighted users only. If the category matters, say it in text too.

## Related

- [Alert](./alert.md) — for a status message rather than a content group.
- [Layout](./layout.md) — arranging several cards.
- [Page header](./page-header.md) and [Stat](./stat.md) — patterns that often
  sit inside or beside cards.
- [Button](./button.md) — actions in a card footer.

---
Source: `src/components/sparta-card.css`
