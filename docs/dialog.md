# Dialog

## Purpose

`.sp-dialog` is SpartaCSS's confirm dialog: a blocking decision, typically to
confirm something destructive. It is a modal-replacement for browser
`confirm()`/`prompt()`, distinct from [Modal](./modal.md)'s general-purpose
content dialog. It lives in `sparta-notifications.css` with
[Toast](./toast.md) and Alert Banner (see [Notifications](./notifications.md)),
three distinct, independent APIs.

This module requires core (`spartacss.css`) — every visual property resolves
through core's token layer, and it has no tokens of its own.

## When to use which

- **Guidance:** use a Dialog when the reader must decide before continuing —
  typically to confirm something destructive. Everything behind it waits.
- **Guidance:** for a general-purpose dialog with arbitrary content, use
  [Modal](./modal.md).
- **Guidance:** for a short notice that can disappear on its own, use
  [Toast](./toast.md).

## Usage

```html preview height=24
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

Dialog ships its **own** button classes (`.sp-dialog-btn*`) scoped locally to its
footer, deliberately not `.sp-button`, so a dialog's buttons render
correctly even if core Button styles haven't loaded yet — don't mix
`.sp-button` into a `.sp-dialog__footer`; use `.sp-dialog-btn*`.

## Class API

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

## Variants

Size: `--sm`, default (unsized), `--lg` (apply to `.sp-dialog`).

Icon tone: `.sp-dialog__icon--danger` / `--warning` / `--info` / `--success`. The glyph
is the 65% mix of the tone color and `--sp-text-primary` (at least 3:1 in both
themes) on the subtle tone background.

```html preview height=20
<div class="sp-dialog-overlay">
  <div class="sp-dialog sp-dialog--sm">
    <div class="sp-dialog__header">
      <span class="sp-dialog__icon sp-dialog__icon--info">i</span>
      <div class="sp-dialog__title-group">
        <div class="sp-dialog__title">Small dialog</div>
        <div class="sp-dialog__desc">An informational confirmation.</div>
      </div>
    </div>
    <div class="sp-dialog__footer sp-dialog__footer--split">
      <button class="sp-dialog-btn sp-dialog-btn--ghost">Back</button>
      <button class="sp-dialog-btn sp-dialog-btn--primary">Continue</button>
    </div>
  </div>
</div>
```

## State modifiers

`.sp-dialog-overlay--out` plays an exit fade. Your own script adds it, waits for
the animation, then removes the dialog. `.sp-dialog-btn:disabled` dims the
button and disables pointer events.

## JavaScript responsibility

Dialog is styling only. Your script:

- opens a Dialog, moves focus into it, traps focus while it is open, closes it
  on `Escape` if you want that, and returns focus to the control that opened
  it, adding `.sp-dialog-overlay--out` first if the exit animation should play;
- adds the ARIA roles listed below.

## Accessibility

- Dialog does not add ARIA roles automatically. Add
  `role="alertdialog"`/`aria-modal="true"` yourself (see
  [`accessibility.md`](./accessibility.md#aria-responsibility-boundaries)).
- Dialog's blocking nature means focus management (trapping focus inside it,
  returning focus on close, `Escape`-to-close) is entirely the consumer's
  responsibility — same contract as [`modal.md`](./modal.md#accessibility).
- The entrance and exit animations respect the shared `prefers-reduced-motion`
  contract (see [`motion.md`](./motion.md)) — they collapse automatically, with
  no per-component opt-in needed.
- `.sp-dialog__close` renders as a bare glyph by default (`×`) — always pair it
  with `aria-label` as shown in Usage above.

## Responsive behavior

Dialog has no breakpoint-specific rules. It is a centered box capped by its size
modifier.

## Common mistakes

**Mixing `.sp-button` into a Dialog footer.** Dialog has its own
`.sp-dialog-btn` classes, scoped to it. Use those.

**A Dialog with no focus management.** It blocks the page visually, but focus
can still move to the controls behind it. See JavaScript responsibility.

**A close button that is only "×".** Give it an `aria-label`.

## Related

- [Notifications](./notifications.md) — the module Dialog belongs to.
- [Modal](./modal.md) — a general-purpose dialog.
- [Toast](./toast.md) — a transient notice.
- [Button](./button.md) — buttons for use outside a Dialog.
- [Accessibility](./accessibility.md) — ARIA responsibility boundaries.
- [Motion](./motion.md) — the reduced-motion contract.

---
Source: `src/modules/feedback/sparta-notifications.css`
