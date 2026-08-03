# Modal

Modal presents content in a dialog above the page, with a backdrop behind
it. `.sp-modal__overlay`/`.sp-modal__content` is the supported and
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

- `.sp-modal` — the fixed, full-viewport positioning root. Hidden until
  `--open` is added.
- `.sp-modal__overlay` — the backdrop, positioned behind `__content`.
- `.sp-modal__content` — the dialog box itself.
- `.sp-modal__header` / `__title` / `__close` / `__body` / `__footer` —
  structural slots for the dialog's content.

## Variants

```html
<div class="sp-modal__content sp-modal__content--sm">...</div>  <!-- 400px -->
<div class="sp-modal__content sp-modal__content--md">...</div>  <!-- 560px, default -->
<div class="sp-modal__content sp-modal__content--lg">...</div>  <!-- 800px -->
<div class="sp-modal__content sp-modal__content--xl">...</div>  <!-- 1100px -->
<div class="sp-modal__content sp-modal__content--full">...</div> <!-- fills the viewport -->
```

## State modifiers

SpartaCSS ships no JavaScript. `.sp-modal--open` is a plain state
modifier that your own script adds to `.sp-modal` — the same convention
used by `.sp-accordion__item--open` and `.sp-navbar--open`.

`prefers-reduced-motion: reduce` disables the open/close opacity and
transform transitions; the modal still appears/disappears, just without
motion.

## Accessibility

SpartaCSS's Modal provides structure and open/close styling only.
Specifically, it does **not** provide:

- Focus trapping within the dialog while open.
- `Escape`-key handling to close the dialog.
- Any JavaScript behavior at all.

The consumer's own script is responsible for managing focus (moving it
into the dialog on open and restoring it on close), wiring up `Escape`
and backdrop-click handling if desired, and setting the appropriate
`aria-*` attributes (e.g. `role="dialog"`, `aria-modal="true"`,
`aria-labelledby` pointing at `.sp-modal__title`).

## Legacy: `.sp-modal-backdrop` / `.sp-modal__dialog`

`.sp-modal-backdrop` and `.sp-modal__dialog` are a separate, older Modal
implementation. Notably, this legacy API has a `.sp-modal--closing`
exit-transition state that the supported and documented API above does
not — useful to know if you're deciding whether to migrate. The legacy
selectors remain fully supported and their behavior is unchanged, but
they will not receive new variants. Prefer
`.sp-modal__overlay`/`.sp-modal__content` above for new work.

---
Source: `src/modules/overlay/sparta-modal.css`
