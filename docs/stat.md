# Stat

## Purpose

Stat is a card-like display for a single metric — label, large value,
optional trend delta, sublabel, icon, and footer slot. For general content
cards, see [`card.md`](./card.md); Stat is purpose-built for numeric/KPI
display rather than arbitrary content.

## When to use which

- **Guidance:** use Stat for one headline number with its label and, optionally,
  its trend: a KPI, a count, a total.
- **Guidance:** for general content that is not a single metric, use
  [Card](./card.md). For many numbers in rows and columns, use
  [Table](./table.md).

## Usage

```html preview height=12
<div class="sp-stat">
  <div class="sp-stat__header">
    <span class="sp-stat__label">Revenue</span>
    <span class="sp-stat__icon">
      <span class="sp-icon sp-icon-trending-up" aria-hidden="true"></span>
    </span>
  </div>
  <div class="sp-stat__value">$48.2k</div>
  <div class="sp-stat__delta sp-stat__delta--up">
    +12.4% <span class="sp-stat__sublabel">vs last month</span>
  </div>
</div>
```

The icon uses the [icon module](./icons.md), so it needs `sparta-icons.css` or
a bundle that includes it.

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

```html preview height=24
<div class="sp-stack">
  <div class="sp-stat"><div class="sp-stat__label">Small value</div><div class="sp-stat__value sp-stat__value--sm">1,284</div></div>
  <div class="sp-stat"><div class="sp-stat__label">Default value</div><div class="sp-stat__value">1,284</div></div>
  <div class="sp-stat"><div class="sp-stat__label">Large value</div><div class="sp-stat__value sp-stat__value--lg">1,284</div></div>
</div>
```

### Semantic accent

Same 3px left-border accent pattern as Card:

```html preview height=43
<div class="sp-stack">
  <div class="sp-stat sp-stat--primary"><div class="sp-stat__label">Primary</div><div class="sp-stat__value sp-stat__value--sm">42</div></div>
  <div class="sp-stat sp-stat--secondary"><div class="sp-stat__label">Secondary</div><div class="sp-stat__value sp-stat__value--sm">42</div></div>
  <div class="sp-stat sp-stat--success"><div class="sp-stat__label">Success</div><div class="sp-stat__value sp-stat__value--sm">42</div></div>
  <div class="sp-stat sp-stat--warning"><div class="sp-stat__label">Warning</div><div class="sp-stat__value sp-stat__value--sm">42</div></div>
  <div class="sp-stat sp-stat--error"><div class="sp-stat__label">Error</div><div class="sp-stat__value sp-stat__value--sm">42</div></div>
  <div class="sp-stat sp-stat--info"><div class="sp-stat__label">Info</div><div class="sp-stat__value sp-stat__value--sm">42</div></div>
</div>
```

### Surface / density

`--elevated` uses an elevated background and a stronger shadow; `--compact`
tightens the padding and shrinks the value.

```html preview height=15
<div class="sp-stack">
  <div class="sp-stat sp-stat--elevated"><div class="sp-stat__label">Elevated</div><div class="sp-stat__value">9,120</div></div>
  <div class="sp-stat sp-stat--compact"><div class="sp-stat__label">Compact</div><div class="sp-stat__value">9,120</div></div>
</div>
```

## State modifiers

- `.sp-stat__delta--up` / `--down` / `--neutral` — colors the delta text
  (success/error/muted) and renders a matching trend icon (trending-up,
  trending-down, or a plain arrow for neutral) before the text. These are
  presentation-only — SpartaCSS does not compute or compare values; your
  own logic decides which modifier applies.
- `:hover` on `.sp-stat` — shadow/border response, same as Card;
  `--elevated` gets its own stronger hover shadow.

```html preview height=29
<div class="sp-stack">
  <div class="sp-stat"><div class="sp-stat__label">Signups</div><div class="sp-stat__value">1,204</div><div class="sp-stat__delta sp-stat__delta--up">+8.1% <span class="sp-stat__sublabel">vs last week</span></div></div>
  <div class="sp-stat"><div class="sp-stat__label">Churn</div><div class="sp-stat__value">2.3%</div><div class="sp-stat__delta sp-stat__delta--down">-0.4% <span class="sp-stat__sublabel">vs last week</span></div></div>
  <div class="sp-stat"><div class="sp-stat__label">Uptime</div><div class="sp-stat__value">99.9%</div><div class="sp-stat__delta sp-stat__delta--neutral">0.0% <span class="sp-stat__sublabel">no change</span></div></div>
</div>
```

## Accessibility

Stat is a static display, not an interactive control. If the value updates
dynamically (e.g. a live-updating dashboard), consider `aria-live` on
`.sp-stat__value` yourself if the update should be announced — SpartaCSS
has no live-region behavior built in. `.sp-stat__icon` and the
`.sp-stat__delta::before` trend icon are decorative; the delta's text
content (e.g. "+12.4%") already conveys the meaning, so no additional
labeling is required as long as that text is present.

## Responsive behavior

Stat has no breakpoint-specific rules. It is a block that fills its container.
To show several, place them in a [grid](./layout.md): `.sp-grid--auto` fits as
many per row as the width allows.

```html preview height=24
<div class="sp-grid sp-grid--auto">
  <div class="sp-stat"><div class="sp-stat__label">Orders</div><div class="sp-stat__value">318</div></div>
  <div class="sp-stat"><div class="sp-stat__label">Revenue</div><div class="sp-stat__value">$48.2k</div></div>
  <div class="sp-stat"><div class="sp-stat__label">Refunds</div><div class="sp-stat__value">7</div></div>
</div>
```

## Common mistakes

**Choosing the delta modifier by color alone.** `--up` is green and `--down` is
red, but the number and sign are what carry the meaning. Keep "+12.4%" in the
text.

**A down trend that is good news.** SpartaCSS colors `--down` as an error. A
falling error rate is good; write your own logic for the modifier that matches
the meaning, and the words for what it means.

**Expecting SpartaCSS to compare values.** It does not. Your code decides
`--up`, `--down` or `--neutral`.

## Related

- [Card](./card.md) — general content containers with the same visual language.
- [Table](./table.md) — many figures in rows and columns.
- [Layout](./layout.md) — grids of stats.
- [Icons](./icons.md) — the header icon.

---
Source: `src/modules/data/sparta-stat.css`
