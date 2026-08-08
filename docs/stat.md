# Stat

## Purpose

Stat is a card-like display for a single metric — label, large value,
optional trend delta, sublabel, icon, and footer slot. For general content
cards, see [`card.md`](./card.md); Stat is purpose-built for numeric/KPI
display rather than arbitrary content.

## Usage

```html
<div class="sp-stat">
  <div class="sp-stat__header">
    <span class="sp-stat__label">Revenue</span>
    <span class="sp-stat__icon">
      <span class="sp-icon sp-icon-trending-up"></span>
    </span>
  </div>
  <div class="sp-stat__value">$48.2k</div>
  <div class="sp-stat__delta sp-stat__delta--up">
    +12.4% <span class="sp-stat__sublabel">vs last month</span>
  </div>
</div>
```

## Class API

- `.sp-stat` — the card container (border, radius, shadow, hover
  response — same visual language as Card).
- `.sp-stat__header` — top row; label + optional icon, space-between.
- `.sp-stat__label` — small uppercase label.
- `.sp-stat__icon` — icon slot in the header (expects a child icon, e.g.
  `.sp-icon` from `sparta-icons.css`).
- `.sp-stat__value` — the large headline number.
- `.sp-stat__delta` — trend indicator row; renders a directional icon via
  `::before` based on its `--up`/`--down`/`--neutral` modifier.
- `.sp-stat__sublabel` — small muted text, typically next to a delta.
- `.sp-stat__footer` — bottom row for supplementary content (e.g. a
  sparkline or a link).

## Variants

### Value size

```html
<div class="sp-stat__value sp-stat__value--sm">...</div>
<div class="sp-stat__value sp-stat__value--lg">...</div>
```

### Semantic accent

Same 3px left-border accent pattern as Card:

```html
<div class="sp-stat sp-stat--primary">...</div>
<div class="sp-stat sp-stat--success">...</div>
<div class="sp-stat sp-stat--warning">...</div>
<div class="sp-stat sp-stat--error">...</div>
<div class="sp-stat sp-stat--info">...</div>
<div class="sp-stat sp-stat--secondary">...</div>
```

### Surface / density

```html
<div class="sp-stat sp-stat--elevated">...</div> <!-- elevated bg, stronger shadow -->
<div class="sp-stat sp-stat--compact">...</div>  <!-- tighter padding, smaller value -->
```

## State modifiers

- `.sp-stat__delta--up` / `--down` / `--neutral` — colors the delta text
  (success/error/muted) and renders a matching trend icon (trending-up,
  trending-down, or a plain arrow for neutral) before the text. These are
  presentation-only — SpartaCSS does not compute or compare values; your
  own logic decides which modifier applies.
- `:hover` on `.sp-stat` — shadow/border response, same as Card;
  `--elevated` gets its own stronger hover shadow.

## Accessibility

Stat is a static display, not an interactive control. If the value updates
dynamically (e.g. a live-updating dashboard), consider `aria-live` on
`.sp-stat__value` yourself if the update should be announced — SpartaCSS
has no live-region behavior built in. `.sp-stat__icon` and the
`.sp-stat__delta::before` trend icon are decorative; the delta's text
content (e.g. "+12.4%") already conveys the meaning, so no additional
labeling is required as long as that text is present.

---
Source: `src/modules/data/sparta-stat.css`
