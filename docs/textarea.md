# Textarea

## Purpose

`.sp-textarea` styles a native `<textarea>`. It is one of the form controls in
`sparta-form.css`, alongside [Input](./input.md), [Select](./select.md),
[Checkbox & Radio](./checkbox-radio.md) and [Toggle Switch](./toggle.md).
[Forms](./forms.md) documents the `.sp-form-group` and `.sp-field` wrappers that
lay a control out with its label, hint and error.

It styles a **native** element: typing, validation and form submission are the
element's, not SpartaCSS's. SpartaCSS provides the appearance and the visual
states; your application provides the label, the validation and the messages.

## Usage

```html preview height=11
<textarea class="sp-textarea" placeholder="Your message" aria-label="Message"></textarea>
```

- **Class API:** `.sp-textarea` — base class; `resize: vertical` by
  default (disabled when `:disabled`).
- **Variants:** `--error`.
- **States:** `:hover`, `:focus`, `:disabled`.

## Accessibility

- `.sp-textarea` styles a native `<textarea>`, so native keyboard operability and
  form submission behavior work with no extra effort.
- Always pair a textarea with a `<label>` (via `.sp-label`/`.sp-field__label`
  wrapping it, or `for`/`id`) — the class does not generate an accessible name
  on its own.
- `:focus-visible` is styled explicitly (border/shadow ring, the consistent
  `--sp-shadow-focus` treatment) rather than relying on the browser default, and
  the shared global focus rule in `sparta-accessibility.css` explicitly excludes
  this class so the two rules don't conflict — see
  [`accessibility.md`](./accessibility.md#keyboard-and-focus-expectations).
- **Requirement:** a validation state needs more than the class. Set
  `aria-invalid="true"` on the textarea, and point `aria-describedby` at the
  message. SpartaCSS draws the red; it does not tell assistive technology the
  value is invalid.

## Responsive behavior

`.sp-textarea` has no breakpoint-specific rules. Give it the width you want with
its container, or put it in a [grid](./layout.md) next to other fields.

## Common mistakes

**A control with no label.** A placeholder is not a label: it disappears when
the reader types, and is not reliably announced.

```html
<!-- Wrong -->
<textarea class="sp-textarea" placeholder="Message"></textarea>

<!-- Right -->
<label class="sp-label" for="message">Message</label>
<textarea class="sp-textarea" id="message"></textarea>
```

**An error that is only a red border.** Add text, and tell assistive
technology.

```html
<!-- Wrong: color is the only signal -->
<textarea class="sp-textarea sp-textarea--error"></textarea>

<!-- Right -->
<textarea class="sp-textarea sp-textarea--error" id="m" aria-invalid="true" aria-describedby="m-err"></textarea>
<span class="sp-form-error" id="m-err">Write a message.</span>
```

## Related

- [Forms](./forms.md) — the `.sp-form-group` and `.sp-field` wrappers.
- [Input](./input.md), [Select](./select.md) — the other text-entry controls.
- [Accessibility](./accessibility.md) — focus and ARIA responsibility
  boundaries.

---
Source: `src/components/sparta-form.css`
