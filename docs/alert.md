# Alert

## Purpose

Alert is an inline, static status message — a colored, left-accented box
with an icon slot, optional title, and body text. For a transient,
dismissible, position-fixed notification, see the Notifications module's
Alert Banner (`.sp-alert-banner`) instead — the two are related concepts
with intentionally distinct class names and live in different files (core
vs. the notifications module); Alert is not a legacy predecessor of Alert
Banner.

## Usage

```html
<div class="sp-alert sp-alert--success">
  <svg class="sp-alert__icon" aria-hidden="true">...</svg>
  <div class="sp-alert__content">
    <div class="sp-alert__title">Success</div>
    <div class="sp-alert__body">Your changes have been saved.</div>
  </div>
</div>
```

`.sp-alert__title` is optional — omit it for a body-only alert.

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

```html
<div class="sp-alert sp-alert--success">...</div>
<div class="sp-alert sp-alert--warning">...</div>
<div class="sp-alert sp-alert--error">...</div>
<div class="sp-alert sp-alert--info">...</div>
<div class="sp-alert sp-alert--primary">...</div>
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

---
Source: `src/components/sparta-alert.css`
