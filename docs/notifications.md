# Notifications

## Purpose

`sparta-notifications.css` is the single source file for SpartaCSS's
three system-to-user messaging patterns — **Toast** (transient,
auto-dismissing), **Alert Banner** (persistent, page-level, dismissible),
and **Confirm/Dialog** (blocking decision modal) — combined in one file
because they're commonly imported together, per the file's own header
comment. They are three distinct, independent APIs; pick whichever
matches the message's urgency and lifetime, not all three for the same
message. Toast and Dialog each have their own page; this page documents Alert
Banner and the behavior the three share.

This module requires core (`spartacss.css`) — every visual property
resolves through core's token layer, and it has no tokens of its own.

## When to use which

- **Guidance:** use a **Toast** for a short confirmation or notice that is a
  result of something the reader just did ("Saved"), that can disappear on its
  own, and that does not need a decision.
- **Guidance:** use an **Alert Banner** for a page-level condition that should
  stay until the reader dismisses it or it no longer applies: a connection
  problem, a read-only mode, a maintenance notice.
- **Guidance:** use a **Confirm / Dialog** when the reader must decide before
  continuing — typically to confirm something destructive. Everything behind it
  waits.
- **Guidance:** for a message that belongs to a part of the page and stays
  there, use [Alert](./alert.md). For a general-purpose dialog with arbitrary
  content, use [Modal](./modal.md).

Do not rely on a Toast as the only way a reader learns something essential:
it disappears, and a reader may not see it in time.

## Toast

Toast is documented on its own page: [Toast](./toast.md) — the transient,
auto-dismissing message, its positions and colors.

## Alert Banner

### Usage

```html preview height=8
<div class="sp-alert-banner sp-alert-banner--warning">
  <span class="sp-alert-banner__icon">⚠</span>
  <div class="sp-alert-banner__body">
    <div class="sp-alert-banner__title">Read-only mode</div>
    <div class="sp-alert-banner__text">Changes won't be saved until you reconnect.</div>
  </div>
  <button class="sp-alert-banner__close" aria-label="Dismiss">×</button>
</div>
```

Unlike Toast, Alert Banner sits inline in your page layout (not
fixed-position) and stays until dismissed. For a static, non-dismissible
inline message, see [`alert.md`](./alert.md) instead — Alert and Alert
Banner are related concepts with intentionally distinct class names, not
a legacy/current pair.

### Class API

- `.sp-alert-banner` — the container.
- `.sp-alert-banner__icon` / `__body` / `__title` / `__text` / `__actions`
  / `__link` / `__close` — structural slots.

### Variants

Color: `--success`, `--error`, `--warning`, `--info`, `--neutral`. Banner title and
text use neutral theme text colors on the tint (at least 4.5:1 in both themes);
the variant color is carried by the left border, the background and the icon
(the 65% mix of the variant color and `--sp-text-primary`, at least 3.4:1). The
dismiss button is `--sp-text-secondary` at full opacity; hover raises it to
`--sp-text-primary` with a 12% tint background.

```html preview height=18
<div class="sp-stack">
  <div class="sp-alert-banner sp-alert-banner--success"><span class="sp-alert-banner__icon">✓</span><div class="sp-alert-banner__body"><div class="sp-alert-banner__title">Success</div><div class="sp-alert-banner__text">Everything is up to date.</div></div></div>
  <div class="sp-alert-banner sp-alert-banner--error"><span class="sp-alert-banner__icon">✕</span><div class="sp-alert-banner__body"><div class="sp-alert-banner__title">Error</div><div class="sp-alert-banner__text">The sync failed.</div></div></div>
  <div class="sp-alert-banner sp-alert-banner--warning"><span class="sp-alert-banner__icon">!</span><div class="sp-alert-banner__body"><div class="sp-alert-banner__title">Warning</div><div class="sp-alert-banner__text">Scheduled maintenance tonight.</div></div></div>
  <div class="sp-alert-banner sp-alert-banner--info"><span class="sp-alert-banner__icon">i</span><div class="sp-alert-banner__body"><div class="sp-alert-banner__title">Info</div><div class="sp-alert-banner__text">A new version is available.</div></div></div>
  <div class="sp-alert-banner sp-alert-banner--neutral"><span class="sp-alert-banner__icon">•</span><div class="sp-alert-banner__body"><div class="sp-alert-banner__title">Neutral</div><div class="sp-alert-banner__text">A plain notice.</div></div></div>
</div>
```

Layout: `--full` (edge-to-edge, no radius, bottom border instead of a
left accent — for a banner spanning the full page width) and `--compact`
(tighter padding, title/text collapse to a single inline line).

```html preview height=7
<div class="sp-stack">
  <div class="sp-alert-banner sp-alert-banner--info sp-alert-banner--full"><span class="sp-alert-banner__icon">i</span><div class="sp-alert-banner__body"><div class="sp-alert-banner__title">Full width</div><div class="sp-alert-banner__text">Edge to edge, no radius.</div></div></div>
  <div class="sp-alert-banner sp-alert-banner--info sp-alert-banner--compact"><span class="sp-alert-banner__icon">i</span><div class="sp-alert-banner__body"><div class="sp-alert-banner__title">Compact</div><div class="sp-alert-banner__text">Title and text on one line.</div></div></div>
</div>
```

### State modifiers

Alert Banner has no built-in dismiss tracking — `.sp-alert-banner__close`
is styled but your own script removes the element (or hides it) in
response to a click.

## Confirm / Dialog

Confirm / Dialog is documented on its own page: [Dialog](./dialog.md) — the
blocking decision dialog, its sizes, icon tones and its own button classes.

## JavaScript responsibility

These components are styling only. Your script:

- creates a Toast, places it in a `.sp-toast-wrap`, and — if it should
  disappear — runs the timer, adds `.sp-toast--out`, waits for the animation to
  finish, then removes it;
- removes or hides an Alert Banner when its close button is pressed;
- opens a Dialog, moves focus into it, traps focus while it is open, closes it
  on `Escape` if you want that, and returns focus to the control that opened
  it, adding `.sp-dialog-overlay--out` first if the exit animation should play;
- adds the ARIA roles listed below.

## Accessibility (all three)

- None of these three add ARIA roles automatically. Add `role="status"`
  or `role="alert"` to Toast/Alert Banner (depending on urgency), and
  `role="alertdialog"`/`aria-modal="true"` to Dialog, yourself (see
  [`accessibility.md`](./accessibility.md#aria-responsibility-boundaries)).
- Dialog's blocking nature means focus management (trapping focus inside
  it, returning focus on close, `Escape`-to-close) is entirely the
  consumer's responsibility — same contract as
  [`modal.md`](./modal.md#accessibility).
- All entrance/exit animations across Toast, Alert Banner, and Dialog
  respect the shared `prefers-reduced-motion` contract (see
  [`motion.md`](./motion.md)) — they collapse automatically, with no
  per-component opt-in needed.
- `.sp-toast__close`, `.sp-alert-banner__close`, and `.sp-dialog__close`
  all render as bare glyphs by default (`×`) — always pair with
  `aria-label` as shown throughout Usage above.

## Responsive behavior

None of the three has breakpoint-specific rules. A Toast wrapper is fixed to the
corner or edge its position modifier names, and an Alert Banner is a block that
fills its container; `--full` makes it span the page. A Dialog is a centered
box capped by its size modifier.

## Common mistakes

**Mixing `.sp-button` into a Dialog footer.** Dialog has its own
`.sp-dialog-btn` classes, scoped to it. Use those.

**A Toast as the only way to learn something.** It disappears. If the message
matters, also show it somewhere that stays.

**No role on a dynamic message.** A Toast or Banner inserted after load is not
announced unless it has `role="status"` or `role="alert"`.

**A Dialog with no focus management.** It blocks the page visually, but focus
can still move to the controls behind it. See JavaScript responsibility.

**A close button that is only "×".** Give each close button an `aria-label`.

**A progress bar that does not match the timer.** `.sp-toast__progress` only
animates for the duration you set. If the toast is dismissed on a different
schedule, the bar misleads.

## Related

- [Toast](./toast.md) and [Dialog](./dialog.md) — the other two patterns.
- [Alert](./alert.md) — a static message that stays in the page.
- [Modal](./modal.md) — a general-purpose dialog.
- [Button](./button.md) — buttons for use outside a Dialog.
- [Accessibility](./accessibility.md) — ARIA responsibility boundaries.
- [Motion](./motion.md) — the reduced-motion contract.

---
Source: `src/modules/feedback/sparta-notifications.css`
