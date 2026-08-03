# Modal

SpartaCSS's modal lives in `src/modules/overlay/sparta-modal.css`. As of
`0.6.0`, `.sp-modal__overlay`/`.sp-modal__content` is the supported,
documented Modal API.

## `.sp-modal`

```html
<div class="sp-modal sp-modal--open">
  <div class="sp-modal__overlay"></div>

  <div class="sp-modal__content">
    <div class="sp-modal__header">
      <h2 class="sp-modal__title">Modal title</h2>
      <button class="sp-modal__close" aria-label="Close"></button>
    </div>

    <div class="sp-modal__body">
      <p>Modal content.</p>
    </div>

    <div class="sp-modal__footer">
      <button class="sp-button sp-button--sm">Cancel</button>
      <button class="sp-button sp-button--sm sp-button--primary">Confirm</button>
    </div>
  </div>
</div>
```

- `.sp-modal` — the fixed, full-viewport positioning root. Hidden
  (`opacity: 0`, `visibility: hidden`) until `--open` is added.
- `.sp-modal__overlay` — the backdrop, positioned behind `__content`.
- `.sp-modal__content` — the dialog box itself. Size modifiers:
  `--sm` (400px) / `--md` (560px, default) / `--lg` (800px) / `--xl`
  (1100px) / `--full` (fills the viewport).
- `.sp-modal__header` / `__title` / `__close` / `__body` / `__footer` —
  structural slots for the dialog's content.

### The `--open` state (no JS shipped)

SpartaCSS ships no JavaScript. `.sp-modal--open` is a plain state modifier
that your own script adds to `.sp-modal` — the same convention used by
`.sp-accordion__item--open` and `.sp-navbar--open`.

`prefers-reduced-motion: reduce` disables the open/close opacity and
transform transitions; the modal still appears/disappears, just without
motion.

## Legacy: `.sp-modal-backdrop` / `.sp-modal__dialog`

`.sp-modal-backdrop` and `.sp-modal__dialog` are a separate, older Modal
implementation, frozen as of `0.6.0`. Notably, this legacy API has a
`.sp-modal--closing` exit-transition state that the supported and
documented API above does not — that gap is tracked as a possible
future addition to the supported and documented API, not resolved by
this release. The legacy selectors remain
fully supported for backward compatibility and their behavior is
unchanged, but they will not receive new variants. Prefer
`.sp-modal__overlay`/`.sp-modal__content` above for new work.
