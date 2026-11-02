# Input

## Purpose

`.sp-input` styles a native `<input>` of any type. It is one of the form
controls in `sparta-form.css`, alongside [Select](./select.md),
[Textarea](./textarea.md), [Checkbox & Radio](./checkbox-radio.md) and
[Toggle Switch](./toggle.md). [Forms](./forms.md) documents the `.sp-form-group`
and `.sp-field` wrappers that lay a control out with its label, hint and error.

It styles a **native** element. Nothing here replaces the browser's form
behavior: validation, autofill, submission and keyboard operation are the
element's, not SpartaCSS's. SpartaCSS provides the appearance and the visual
states; your application provides the label, the validation logic and the
messages.

## When to use which

- **Guidance:** put a label, hint and error around an input with
  `.sp-form-group` for a simple stack, or `.sp-field` when you need a
  required/optional marker, an icon inside the control, a validation state, or a
  label beside the control. See [Forms](./forms.md).

## Usage

```html preview height=6
<input class="sp-input" type="text" placeholder="you@example.com" aria-label="Email" />
```

- **Class API:** `.sp-input` — base class, works on any `<input type="...">`.
  It is a full-width block: it fills its container.
- **Variants:** `--sm`, default (unsized), `--lg`.
- **States:** `:hover` (not while focused/disabled), `:focus` (border +
  shadow ring), `:disabled` (45% opacity), `--error` (red border + red
  focus ring — can be applied directly to `.sp-input` or inherited via a
  parent `.sp-field--error`).

```html preview height=21
<div class="sp-stack">
  <input class="sp-input sp-input--sm" type="text" placeholder="Small" aria-label="Small" />
  <input class="sp-input" type="text" placeholder="Default" aria-label="Default" />
  <input class="sp-input sp-input--lg" type="text" placeholder="Large" aria-label="Large" />
  <input class="sp-input" type="text" value="Disabled" aria-label="Disabled" disabled />
  <input class="sp-input sp-input--error" type="text" value="Error" aria-label="Error" aria-invalid="true" />
</div>
```

## Accessibility

- `.sp-input` styles a native `<input>`, so native keyboard operability,
  autofill, and form submission behavior all work with no extra effort.
- Always pair an input with a `<label>` (via `.sp-label`/`.sp-field__label`
  wrapping it, or `for`/`id`) — the class does not generate an accessible name
  on its own.
- `:focus-visible` is styled explicitly (border/shadow ring, the consistent
  `--sp-shadow-focus` treatment) rather than relying on the browser default, and
  the shared global focus rule in `sparta-accessibility.css` explicitly excludes
  this class so the two rules don't conflict — see
  [`accessibility.md`](./accessibility.md#keyboard-and-focus-expectations).
- **Requirement:** a validation state needs more than the class. Set
  `aria-invalid="true"` on the input, and point `aria-describedby` at the
  message. SpartaCSS draws the red; it does not tell assistive technology the
  value is invalid.
- Color is never the only signal for an error. Show message text too; a
  border-color change alone is not accessible error messaging.

## Responsive behavior

`.sp-input` is a full-width block, so it fills the width you give it and no
breakpoint is needed. To place fields side by side on wide screens and stacked on
narrow ones, put them in a [grid](./layout.md).

## Common mistakes

**A control with no label.** A placeholder is not a label: it disappears when
the reader types, and is not reliably announced.

```html
<!-- Wrong -->
<input class="sp-input" type="email" placeholder="Email" />

<!-- Right -->
<label class="sp-label" for="email">Email</label>
<input class="sp-input" id="email" type="email" />
```

**An error that is only a red border.** Add text, and tell assistive
technology.

```html
<!-- Wrong: color is the only signal -->
<input class="sp-input sp-input--error" type="text" />

<!-- Right -->
<input class="sp-input sp-input--error" id="n" type="text" aria-invalid="true" aria-describedby="n-err" />
<span class="sp-form-error" id="n-err">Enter your name.</span>
```

## Related

- [Forms](./forms.md) — the `.sp-form-group` and `.sp-field` wrappers.
- [Select](./select.md), [Textarea](./textarea.md) — the other text-entry
  controls.
- [Accessibility](./accessibility.md) — focus and ARIA responsibility
  boundaries.

---
Source: `src/components/sparta-form.css`
