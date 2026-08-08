# Notifications

## Purpose

`sparta-notifications.css` is the single source file for SpartaCSS's
three system-to-user messaging patterns — **Toast** (transient,
auto-dismissing), **Alert Banner** (persistent, page-level, dismissible),
and **Confirm/Dialog** (blocking decision modal) — combined in one file
because they're commonly imported together, per the file's own header
comment. They are three distinct, independent APIs; pick whichever
matches the message's urgency and lifetime, not all three for the same
message.

This module requires core (`spartacss.css`) — every visual property
resolves through core's token layer, and it has no tokens of its own.

## Toast

### Usage

```html
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

### Class API

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

### Variants

Position (apply to `.sp-toast-wrap`): `--top-left`, `--top-right`,
`--top-center`, `--bottom-left`, `--bottom-right`, `--bottom-center`.

Color (apply to `.sp-toast`): `--success`, `--error`, `--warning`,
`--info`, `--neutral`.

### State modifiers

`.sp-toast--out` plays the exit animation. SpartaCSS does not remove the
toast from the DOM or track its lifetime — your own script adds
`--out`, waits for the animation to finish, then removes the element
(and is responsible for the auto-dismiss timer itself, if any).

## Alert Banner

### Usage

```html
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

Color: `--success`, `--error`, `--warning`, `--info`, `--neutral`.

Layout: `--full` (edge-to-edge, no radius, bottom border instead of a
left accent — for a banner spanning the full page width) and `--compact`
(tighter padding, title/text collapse to a single inline line).

```html
<div class="sp-alert-banner sp-alert-banner--info sp-alert-banner--full">...</div>
```

### State modifiers

Alert Banner has no built-in dismiss tracking — `.sp-alert-banner__close`
is styled but your own script removes the element (or hides it) in
response to a click.

## Confirm / Dialog

### Usage

```html
<div class="sp-dialog-overlay">
  <div class="sp-dialog">
    <div class="sp-dialog__header">
      <span class="sp-dialog__icon sp-dialog__icon--danger">!</span>
      <div class="sp-dialog__title-group">
        <div class="sp-dialog__title">Delete project?</div>
        <div class="sp-dialog__desc">This action cannot be undone.</div>
      </div>
    </div>
    <div class="sp-dialog__footer">
      <button class="sp-dialog-btn sp-dialog-btn--ghost">Cancel</button>
      <button class="sp-dialog-btn sp-dialog-btn--danger">Delete</button>
    </div>
    <button class="sp-dialog__close" aria-label="Close">×</button>
  </div>
</div>
```

Dialog is a modal-replacement for browser `confirm()`/`prompt()` —
destructive-action confirmation and blocking decisions, distinct from
[`modal.md`](./modal.md)'s general-purpose content dialog. Dialog ships
its **own** button classes (`.sp-dialog-btn*`) scoped locally to its
footer, deliberately not `.sp-button`, so a dialog's buttons render
correctly even if core Button styles haven't loaded yet — don't mix
`.sp-button` into a `.sp-dialog__footer`; use `.sp-dialog-btn*`.

### Class API

- `.sp-dialog-overlay` — fixed backdrop, specific to Dialog (not shared
  with Modal's `.sp-modal__overlay` or Drawer's `.sp-backdrop`).
- `.sp-dialog` — the dialog box.
- `.sp-dialog__header` / `__icon` / `__title-group` / `__title` / `__desc`
  — header slots.
- `.sp-dialog__input` — optional text input, for a "type to confirm"
  pattern.
- `.sp-dialog__confirm-hint` — hint text pairing with `__input` (e.g.
  "Type **project-name** to confirm").
- `.sp-dialog__footer` / `.sp-dialog__footer--split` — action row;
  `--split` pushes buttons to opposite ends instead of the default
  right-aligned group.
- `.sp-dialog-btn` (+ `--ghost` / `--primary` / `--danger`) — Dialog's own
  scoped button styles, not `.sp-button`.
- `.sp-dialog__close` — corner close button.

### Variants

Size: `--sm`, default (unsized), `--lg` (apply to `.sp-dialog`).

Icon tone: `.sp-dialog__icon--danger` / `--warning` / `--info` / `--success`.

### State modifiers

`.sp-dialog-overlay--out` plays an exit fade. As with Toast, your own
script adds it, waits for the animation, then removes the dialog.
`.sp-dialog-btn:disabled` dims the button and disables pointer events.

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

---
Source: `src/modules/feedback/sparta-notifications.css`
