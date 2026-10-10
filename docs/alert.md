# Alert

## Purpose

Alert is an inline, static status message — a colored, left-accented box
with an icon slot, optional title, and body text. For a transient,
dismissible, position-fixed notification, see the Notifications module's
Alert Banner (`.sp-alert-banner`) instead — the two are related concepts
with intentionally distinct class names and live in different files (core
vs. the notifications module); Alert is not a legacy predecessor of Alert
Banner.

## When to use which

- **Guidance:** use Alert for a message that belongs to the page or a section
  of it and stays there: a form-level error, a notice above a settings group,
  a result summary. It is always visible and has no dismiss behavior.
- **Guidance:** use [Notifications](./notifications.md) (Toast or Alert Banner)
  for a transient message that appears in response to something the reader
  did, floats above the page, and goes away.
- **Guidance:** for a small label on an item rather than a message, use
  [Badge](./badge.md).

## Usage

The icon slot takes an inline SVG. The examples on this page use simple
shapes; any SVG that sizes to its slot works.

```html preview height=9
<div class="sp-alert sp-alert--success">
  <svg class="sp-alert__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M6.5 10.5l2.5 2.5 4.5-5"/></svg>
  <div class="sp-alert__content">
    <div class="sp-alert__title">Success</div>
    <div class="sp-alert__body">Your changes have been saved.</div>
  </div>
</div>
```

`.sp-alert__title` is optional — omit it for a body-only alert.

```html preview height=7
<div class="sp-alert sp-alert--info">
  <svg class="sp-alert__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M10 9v5M10 6.5v.5"/></svg>
  <div class="sp-alert__content">
    <div class="sp-alert__body">A body-only alert: no title.</div>
  </div>
</div>
```

## Class API

- `.sp-alert` — the container. Required; must be paired with exactly one
  color variant.
- `.sp-alert__icon` — fixed-size (1.25rem) icon slot; sits at the start of
  the row, top-aligned with the text baseline.
- `.sp-alert__content` — wraps title + body; takes up remaining width.
- `.sp-alert__title` — bold, uppercase, small-caps-style label line.
- `.sp-alert__body` — the message text, rendered at 85% opacity to
  visually recede below the title.

## Variants

Color/severity — each sets background (`-subtle` token), left border
color, and text color to match:

```html preview height=34
<div class="sp-stack">
  <div class="sp-alert sp-alert--success">
    <svg class="sp-alert__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M6.5 10.5l2.5 2.5 4.5-5"/></svg>
    <div class="sp-alert__content"><div class="sp-alert__title">Success</div><div class="sp-alert__body">The report was exported.</div></div>
  </div>
  <div class="sp-alert sp-alert--warning">
    <svg class="sp-alert__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2.5L18 16.5H2z"/><path d="M10 8v4M10 14v.5"/></svg>
    <div class="sp-alert__content"><div class="sp-alert__title">Warning</div><div class="sp-alert__body">Your storage is almost full.</div></div>
  </div>
  <div class="sp-alert sp-alert--error">
    <svg class="sp-alert__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M7 7l6 6M13 7l-6 6"/></svg>
    <div class="sp-alert__content"><div class="sp-alert__title">Error</div><div class="sp-alert__body">The upload failed. Try again.</div></div>
  </div>
  <div class="sp-alert sp-alert--info">
    <svg class="sp-alert__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M10 9v5M10 6.5v.5"/></svg>
    <div class="sp-alert__content"><div class="sp-alert__title">Info</div><div class="sp-alert__body">A new version is available.</div></div>
  </div>
  <div class="sp-alert sp-alert--primary">
    <svg class="sp-alert__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M10 9v5M10 6.5v.5"/></svg>
    <div class="sp-alert__content"><div class="sp-alert__title">Note</div><div class="sp-alert__body">The primary color, for a brand-level message.</div></div>
  </div>
</div>
```

Exactly one color variant should be applied — they aren't designed to be
combined.

## State modifiers

Alert has no interactive states — it's a static, always-visible message
box. There is no built-in dismiss/close behavior; if you need a
dismissible alert, use Alert Banner (`sparta-notifications.css`) instead.

## Accessibility

- `.sp-alert__icon` is decorative by convention — mark it
  `aria-hidden="true"` (as in the example above) unless it's conveying
  information not already in the text.
- Alert has no default `role`. For alerts that appear dynamically and
  should be announced to assistive technology, add `role="alert"` (or
  `role="status"` for less urgent updates) to `.sp-alert` yourself —
  SpartaCSS does not add this for you (see
  [`accessibility.md`](./accessibility.md#aria-responsibility-boundaries)).
- Color alone conveys severity (success/warning/error/info); pairing with
  a distinct icon per variant (as shown in Usage) is recommended so the
  message isn't color-only.
- Keep the title meaningful on its own ("Error", "Warning"): the uppercase
  styling is only appearance.

What SpartaCSS provides, and what stays yours:

| SpartaCSS provides | Your application provides |
| --- | --- |
| The box, the severity colors, the icon slot | `role="alert"` or `role="status"` for messages that appear dynamically |
| Nothing at runtime | Showing, hiding and dismissing the alert |
| — | A text cue for severity, so color is not the only signal |

## Responsive behavior

Alert has no breakpoint-specific behavior. It is a block that fills its
container; the content column shrinks and the text wraps.

## Common mistakes

**Two severity variants on one alert.**

```html
<!-- Wrong -->
<div class="sp-alert sp-alert--error sp-alert--warning">...</div>

<!-- Right: one variant -->
<div class="sp-alert sp-alert--error">...</div>
```

**Expecting a dynamic message to be announced.** Alert has no `role`.
A message inserted into the page after load is not announced unless you add
one.

```html
<!-- Right: announced when it appears -->
<div class="sp-alert sp-alert--error" role="alert">...</div>
```

**Using Alert for a transient confirmation.** An alert that sits in the page
until the reader leaves is the wrong tool for "Saved". Use a Toast from
[Notifications](./notifications.md).

**Color as the only difference.** Success and error alerts that differ only
in color, with no title, icon or wording to tell them apart, fail readers who
cannot distinguish the colors.

## Related

- [Notifications](./notifications.md) — transient Toast and Alert Banner.
- [Icons](./icons.md) — the `.sp-icon` integration with Alert.
- [Badge & Chip](./badge.md) — small labels.
- [Forms](./forms.md) — field-level error text.
- [Design tokens](./tokens.md) — the `-subtle` color tokens behind each variant.

---
Source: `src/components/sparta-alert.css`
