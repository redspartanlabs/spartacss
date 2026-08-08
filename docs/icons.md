# Icons

## Purpose

SpartaCSS ships a pure-CSS icon system — no SVG sprite file, no icon font,
no JavaScript. Each icon is a named class rendered via a `::before`
pseudo-element, masked with an inline SVG shape and filled with
`currentColor`, so icons automatically match whatever text color
surrounds them.

## Usage

```html
<span class="sp-icon sp-icon-check" aria-hidden="true"></span>
<span class="sp-icon sp-icon--lg sp-icon-star" aria-hidden="true"></span>
```

Every icon requires **two** classes: the base `.sp-icon` (sizing/layout)
and one `.sp-icon-<name>` (the shape). `.sp-icon-check` alone, with no
`.sp-icon`, will render at whatever size its parent happens to produce
rather than the intended default.

## Class API

- `.sp-icon` — base class. `inline-flex`, defaults to 1.25rem (20px, the
  "md" size).
- `.sp-icon-<name>` — the shape, e.g. `.sp-icon-check`, `.sp-icon-search`,
  `.sp-icon-trash`. The full set is enumerated directly in source (~86
  icons, grouped into System UI, Semantic/Feedback, Navigation & Action,
  Marketing & Content, and Extended categories) — treat the source file's
  enumerated class list as the authoritative reference for exactly which
  names exist, rather than a name guessed from a similar icon library.

## Variants

### Size

```html
<span class="sp-icon sp-icon--xs sp-icon-check"></span>
<span class="sp-icon sp-icon--sm sp-icon-check"></span>
<span class="sp-icon sp-icon--md sp-icon-check"></span> <!-- default -->
<span class="sp-icon sp-icon--lg sp-icon-check"></span>
<span class="sp-icon sp-icon--xl sp-icon-check"></span>
<span class="sp-icon sp-icon--2xl sp-icon-check"></span>
```

### Alignment

```html
<span class="sp-icon sp-icon--align-top sp-icon-check"></span>
<span class="sp-icon sp-icon--align-bottom sp-icon-check"></span>
<span class="sp-icon sp-icon--align-text-top sp-icon-check"></span>
<span class="sp-icon sp-icon--align-text-bottom sp-icon-check"></span>
```

Sets `vertical-align` for inline placement next to text — use when the
default `middle` alignment doesn't line up well with surrounding text.

## Component integration

A few core components have their own dedicated rules for icons placed
inside them:

- **Button** — `.sp-button .sp-icon` gets automatic trailing margin,
  removed if the icon is the button's only child (`.sp-button--icon-only`
  for icon-only buttons).
- **Alert** — `.sp-alert .sp-icon` gets a fixed size and trailing margin
  when placed directly inside `.sp-alert` (as an alternative to Alert's
  own `.sp-alert__icon` slot — see [`alert.md`](./alert.md)). Note: this
  integration only sets sizing/spacing; it does not reliably tint the
  icon's color per severity today, so don't depend on `.sp-alert--success`
  etc. to automatically recolor a bare `.sp-icon` child — set an explicit
  color yourself if you need severity-tinted icon color outside of
  `.sp-alert__icon`.
- **Modal, Drawer** close buttons render their own built-in icon (via
  `::before`, not a `.sp-icon` child) — do not add a `.sp-icon` inside
  `.sp-modal__close`/`.sp-drawer__close`, it would render a second,
  redundant icon alongside the component's own.

## Accessibility

- `.sp-icon[aria-hidden="true"]` disables pointer events on the icon —
  SpartaCSS does not add `aria-hidden` for you; add it yourself on any
  icon that's purely decorative (i.e. the vast majority of icon usage,
  since the surrounding text or label usually already conveys the
  meaning), as shown throughout Usage above.
- If an icon is the *only* content of an interactive element (e.g. an
  icon-only button), it is **not** decorative — do not mark it
  `aria-hidden`, and instead give the interactive element itself an
  accessible name via `aria-label` (see
  [`button.md`](./button.md#accessibility) for the icon-only Button case).

---
Source: `src/modules/icons/sparta-icons.css`
