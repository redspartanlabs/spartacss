# Modal

Modal presents content in a dialog above the page, with a backdrop behind
it. `.sp-modal__overlay`/`.sp-modal__content` is the supported and
documented Modal API.

## When to use which

- **Guidance:** use Modal for a short, focused task or decision that needs the
  reader's attention before they continue: a confirmation, a small form.
  Everything behind it is blocked.
- **Guidance:** use [Drawer](./drawer.md) for secondary content that sits beside
  the page — filters, navigation, details — where the reader may want to keep
  the page in view.
- **Guidance:** if the content is not urgent, or the reader can ignore it, a
  Modal is the wrong choice. Put it in the page, or use
  [Notifications](./notifications.md).

## `.sp-modal`

An open modal. The page behind it is blank here because a live example shows
only the modal itself; in your application the overlay dims the page.

```html preview height=22
<div class="sp-modal sp-modal--open" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="sp-modal__overlay"></div>

  <div class="sp-modal__content">
    <div class="sp-modal__header">
      <h2 class="sp-modal__title" id="modal-title">Modal title</h2>
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

`--sm` is 400px wide, `--md` (the default) 560px, `--lg` 800px, `--xl` 1100px,
and `--full` fills the viewport. A modal is also capped by the width of the
viewport it sits in.

```html preview height=20
<div class="sp-modal sp-modal--open" role="dialog" aria-modal="true" aria-labelledby="modal-small-title">
  <div class="sp-modal__overlay"></div>
  <div class="sp-modal__content sp-modal__content--sm">
    <div class="sp-modal__header">
      <h2 class="sp-modal__title" id="modal-small-title">Small modal</h2>
      <button class="sp-modal__close" aria-label="Close"></button>
    </div>
    <div class="sp-modal__body"><p>A 400px dialog for a short message.</p></div>
    <div class="sp-modal__footer"><button class="sp-button sp-button--sm sp-button--primary">OK</button></div>
  </div>
</div>
```

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

`.sp-modal--closing` (added to `.sp-modal` alongside `--open`) plays an
exit transition on `.sp-modal__overlay`/`.sp-modal__content` — fading the
overlay and reversing `__content`'s entrance transform/opacity. Use it
when you want the exit animation to finish playing before your script
removes `--open` (and, typically, the modal from the DOM) — add
`--closing`, wait for the transition to complete, then remove both
`--open` and `--closing`.

`prefers-reduced-motion: reduce` disables the open/close opacity and
transform transitions; the modal still appears/disappears, just without
motion. This follows SpartaCSS's global reduced-motion contract — see
[`motion.md`](./motion.md) for the canonical explanation.

## JavaScript responsibility

A closed modal is `.sp-modal` without `--open`: it is `visibility: hidden` and
takes no input. Your script:

- adds `.sp-modal--open` to `.sp-modal` to show it, and removes it to hide it;
- optionally adds `.sp-modal--closing` first, waits for the transition, then
  removes both;
- moves focus into the dialog when it opens, and back to the control that
  opened it when it closes;
- closes it on `Escape`, and on a click on `.sp-modal__overlay` if you want
  that;
- keeps focus inside the dialog while it is open;
- sets `role="dialog"`, `aria-modal="true"` and `aria-labelledby`, as the
  examples above do.

A sketch of the first, third and fourth duties, as application code. It is not
part of SpartaCSS and is not a complete dialog: it does not trap focus.

```js
const modal = document.querySelector('.sp-modal');
let opener = null;

function openModal(trigger) {
  opener = trigger;
  modal.classList.add('sp-modal--open');
  modal.querySelector('.sp-modal__content').setAttribute('tabindex', '-1');
  modal.querySelector('.sp-modal__content').focus();
}

function closeModal() {
  modal.classList.remove('sp-modal--open');
  opener?.focus();
}

modal.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});
modal.querySelector('.sp-modal__overlay').addEventListener('click', closeModal);
```

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
`aria-labelledby` pointing at `.sp-modal__title`). See
[`accessibility.md`](./accessibility.md) for the full CSS vs. JavaScript
responsibility contract this follows.

- **Requirement:** `.sp-modal__close` is an empty button that draws its own
  icon. Give it an accessible name (`aria-label="Close"`) as the examples do.

## Responsive behavior

Modal has no breakpoint-specific rules. Its width is a maximum, so it narrows
to fit a small viewport; `--full` fills the viewport at any size.

## Common mistakes

**Adding `--open` and nothing else.** The modal appears, but focus is still on
the page behind it, `Escape` does nothing, and a screen reader is not told a
dialog opened. See JavaScript responsibility.

**No accessible name on the close button, or no label on the dialog.**

```html
<!-- Wrong: a dialog with no name, and an unnamed close button -->
<div class="sp-modal sp-modal--open">
  ...<button class="sp-modal__close"></button>...
</div>

<!-- Right -->
<div class="sp-modal sp-modal--open" role="dialog" aria-modal="true" aria-labelledby="t">
  ...<h2 class="sp-modal__title" id="t">Title</h2>
  <button class="sp-modal__close" aria-label="Close"></button>...
</div>
```

**Putting a `.sp-icon` inside `.sp-modal__close`.** It draws its own icon; a
second one would render beside it (see [Icons](./icons.md)).

**Using a modal for something the reader can ignore.** A modal takes the whole
page. Use it only when the task cannot continue without an answer.

## Legacy: `.sp-modal-backdrop` / `.sp-modal__dialog`

`.sp-modal-backdrop` and `.sp-modal__dialog` are a separate, older Modal
implementation. Both APIs now support a `.sp-modal--closing` exit
transition (the supported API gained this in `0.9.0`, closing a previous
parity gap). The legacy selectors remain fully supported and their
behavior is unchanged, but they will not receive new variants. Prefer
`.sp-modal__overlay`/`.sp-modal__content` above for new work.

## Related

- [Drawer](./drawer.md) — a side panel instead of a centered dialog.
- [Notifications](./notifications.md) — transient messages, Confirm/Dialog.
- [Accessibility](./accessibility.md) — the CSS versus JavaScript contract.
- [Motion](./motion.md) — the transitions and reduced motion.
- [Button](./button.md) — the footer actions.

---
Source: `src/modules/overlay/sparta-modal.css`
