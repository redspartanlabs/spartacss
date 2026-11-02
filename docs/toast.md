# Toast

## Purpose

`.sp-toast` is SpartaCSS's transient, auto-dismissing message: a short notice
that appears in a corner or at an edge of the viewport. It lives in
`sparta-notifications.css` with [Alert Banner and Confirm / Dialog](./notifications.md),
three distinct, independent APIs; pick whichever matches the message's urgency
and lifetime.

This module requires core (`spartacss.css`) — every visual property resolves
through core's token layer, and it has no tokens of its own.

## When to use which

- **Guidance:** use a **Toast** for a short confirmation or notice that is a
  result of something the reader just did ("Saved"), that can disappear on its
  own, and that does not need a decision.
- **Guidance:** for a page-level condition that stays until it is dismissed, use
  an Alert Banner (see [Notifications](./notifications.md)). When the reader must
  decide before continuing, use [Dialog](./dialog.md).
- **Guidance:** for a message that belongs to a part of the page and stays
  there, use [Alert](./alert.md).

Do not rely on a Toast as the only way a reader learns something essential:
it disappears, and a reader may not see it in time.

## Usage

```html preview height=12
<div class="sp-toast-wrap sp-toast-wrap--top-right">
  <div class="sp-toast sp-toast--success">
    <span class="sp-toast__icon">✓</span>
    <div class="sp-toast__body">
      <div class="sp-toast__title">Saved</div>
      <div class="sp-toast__text">Your changes have been saved.</div>
    </div>
    <button class="sp-toast__close" aria-label="Dismiss">×</button>
    <div class="sp-toast__progress" style="animation-duration: 5s"></div>
  </div>
</div>
```

## Class API

- `.sp-toast-wrap` — fixed-position container for one or more toasts;
  position is set entirely by its variant (below), not by default.
- `.sp-toast` — an individual toast. Plays an entrance animation on
  render.
- `.sp-toast__icon` / `__body` / `__title` / `__text` / `__action` /
  `__close` — structural slots.
- `.sp-toast__progress` — an optional bottom bar showing time until
  auto-dismiss; set its own `animation-duration` inline (as above) to
  match how long the toast will stay visible — SpartaCSS does not
  compute or synchronize this with any actual dismiss timer.

## Variants

Position (apply to `.sp-toast-wrap`): `--top-left`, `--top-right`,
`--top-center`, `--bottom-left`, `--bottom-right`, `--bottom-center`.

Color (apply to `.sp-toast`): `--success`, `--error`, `--warning`,
`--info`, `--neutral`. The icon uses the 65% mix of the variant color and
`--sp-text-primary` (at least 3:1 in both themes).

```html preview height=34
<div class="sp-toast-wrap sp-toast-wrap--top-center">
  <div class="sp-toast sp-toast--success"><span class="sp-toast__icon">✓</span><div class="sp-toast__body"><div class="sp-toast__title">Success</div><div class="sp-toast__text">It worked.</div></div></div>
  <div class="sp-toast sp-toast--error"><span class="sp-toast__icon">✕</span><div class="sp-toast__body"><div class="sp-toast__title">Error</div><div class="sp-toast__text">It failed.</div></div></div>
  <div class="sp-toast sp-toast--warning"><span class="sp-toast__icon">!</span><div class="sp-toast__body"><div class="sp-toast__title">Warning</div><div class="sp-toast__text">Be careful.</div></div></div>
  <div class="sp-toast sp-toast--info"><span class="sp-toast__icon">i</span><div class="sp-toast__body"><div class="sp-toast__title">Info</div><div class="sp-toast__text">For your information.</div></div></div>
  <div class="sp-toast sp-toast--neutral"><span class="sp-toast__icon">•</span><div class="sp-toast__body"><div class="sp-toast__title">Neutral</div><div class="sp-toast__text">A plain notice.</div></div></div>
</div>
```

## State modifiers

`.sp-toast--out` plays the exit animation. SpartaCSS does not remove the
toast from the DOM or track its lifetime — your own script adds
`--out`, waits for the animation to finish, then removes the element
(and is responsible for the auto-dismiss timer itself, if any).

## JavaScript responsibility

Toast is styling only. Your script:

- creates a Toast, places it in a `.sp-toast-wrap`, and — if it should
  disappear — runs the timer, adds `.sp-toast--out`, waits for the animation to
  finish, then removes it;
- adds the ARIA role listed below.

## Accessibility

- Toast does not add an ARIA role automatically. Add `role="status"` or
  `role="alert"` yourself, depending on urgency (see
  [`accessibility.md`](./accessibility.md#aria-responsibility-boundaries)).
- The entrance and exit animations respect the shared `prefers-reduced-motion`
  contract (see [`motion.md`](./motion.md)) — they collapse automatically, with
  no per-component opt-in needed.
- `.sp-toast__close` renders as a bare glyph by default (`×`) — always pair it
  with `aria-label` as shown in Usage above.

## Responsive behavior

Toast has no breakpoint-specific rules. A Toast wrapper is fixed to the corner or
edge its position modifier names.

## Common mistakes

**A Toast as the only way to learn something.** It disappears. If the message
matters, also show it somewhere that stays.

**No role on a dynamic message.** A Toast inserted after load is not announced
unless it has `role="status"` or `role="alert"`.

**A close button that is only "×".** Give it an `aria-label`.

**A progress bar that does not match the timer.** `.sp-toast__progress` only
animates for the duration you set. If the toast is dismissed on a different
schedule, the bar misleads.

## Related

- [Notifications](./notifications.md) — the module Toast belongs to, with Alert
  Banner.
- [Dialog](./dialog.md) — a decision the reader must make.
- [Alert](./alert.md) — a static message that stays in the page.
- [Accessibility](./accessibility.md) — ARIA responsibility boundaries.
- [Motion](./motion.md) — the reduced-motion contract.

---
Source: `src/modules/feedback/sparta-notifications.css`
