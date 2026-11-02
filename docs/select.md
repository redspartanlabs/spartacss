# Select

## Purpose

`.sp-select` styles a native `<select>`. It is one of the form controls in
`sparta-form.css`, alongside [Input](./input.md), [Textarea](./textarea.md),
[Checkbox & Radio](./checkbox-radio.md) and [Toggle Switch](./toggle.md).
[Forms](./forms.md) documents the `.sp-form-group` and `.sp-field` wrappers that
lay a control out with its label, hint and error.

It styles a **native** element: the browser's own option list, keyboard
operation and form submission are unchanged. SpartaCSS provides the appearance
and the visual states; your application provides the label, the validation and
the messages.

## When to use which

- **Requirement:** use a native `<select>` (`.sp-select`) when the reader must
  choose from a list as part of a form. A [Dropdown](./dropdown.md) is a menu
  of actions or navigation, not a form control.

## Usage

```html preview height=6
<select class="sp-select" aria-label="Option">
  <option>Option A</option>
  <option>Option B</option>
</select>
```

- **Class API:** `.sp-select` — base class; disables native appearance and
  draws its own chevron. It is a full-width block: it fills its container.
- **Variants:** `--error` is the only modifier. There is **no `--sm` or `--lg`**,
  unlike [Input](./input.md). A select is always the one standard size and fills
  its container's width.
- **States:** `:hover`, `:focus`, `:disabled`, and `--error`. The three
  `.sp-field--error`, `--success` and `--warning` wrappers also restyle it (see
  Field states below).
- **Note:** the chevron icon is a hardcoded literal `background-image`,
  deliberately not tokenized (documented in source as a single-consumer
  exception — see [`tokens.md`](./tokens.md#reference-vs-override-guidance)).
  It does not currently repaint per-theme.

```html preview height=10
<div class="sp-stack">
  <select class="sp-select sp-select--error" aria-label="Error" aria-invalid="true"><option>Error state</option></select>
  <select class="sp-select" aria-label="Disabled" disabled><option>Disabled</option></select>
</div>
```

## Field states

Inside a [`.sp-field`](./forms.md#sp-field-full-field-system), the wrapper's
state class restyles the select: `--error` gives it a red border and a red focus
ring and turns the label red, `--success` a green border and focus ring, and
`--warning` an orange border, focus ring and label. `--success` leaves the label
alone. The message elements are `.sp-field__error`, `.sp-field__hint` and
`.sp-field__warning`. The classes carry the colour only: keep the text, and set
`aria-invalid` and `aria-describedby` yourself (see Accessibility).

```html preview height=26
<div class="sp-stack">
  <div class="sp-field sp-field--error">
    <label class="sp-field__label" for="sel-err">Plan</label>
    <div class="sp-field__control">
      <select class="sp-select" id="sel-err" aria-invalid="true" aria-describedby="sel-err-msg">
        <option value="">Choose a plan</option>
        <option>Starter</option>
      </select>
    </div>
    <span class="sp-field__error" id="sel-err-msg">Choose a plan.</span>
  </div>
  <div class="sp-field sp-field--success">
    <label class="sp-field__label" for="sel-ok">Region</label>
    <div class="sp-field__control">
      <select class="sp-select" id="sel-ok"><option>Europe</option><option>Americas</option></select>
    </div>
    <span class="sp-field__hint">Available in this region.</span>
  </div>
  <div class="sp-field sp-field--warning">
    <label class="sp-field__label" for="sel-warn">Billing</label>
    <div class="sp-field__control">
      <select class="sp-select" id="sel-warn" aria-describedby="sel-warn-msg"><option>Monthly</option><option>Yearly</option></select>
    </div>
    <span class="sp-field__warning" id="sel-warn-msg">Monthly costs more over a year.</span>
  </div>
</div>
```

## Disabled

Use the native `disabled` attribute. `.sp-select:disabled` sets `opacity: 0.45`
and `cursor: not-allowed`, and the hover border change is switched off. A
disabled select cannot take focus and is not submitted with the form: that is
native behavior, not SpartaCSS's. `aria-disabled="true"` is **not** styled on a
select, so use `disabled`. The dimming is only a visual cue: it does not explain
why the control is unavailable. If the reader needs to know, say so in the label,
hint or surrounding text. Whether a disabled control meets contrast requirements
is not something this page claims.

## Placeholder, required and groups

These are native features. SpartaCSS styles the closed control only; the open
option list is drawn by the browser.

```html preview height=12
<div class="sp-stack">
  <label class="sp-label" for="sel-req">Plan</label>
  <select class="sp-select" id="sel-req" required>
    <option value="" disabled selected hidden>Choose a plan…</option>
    <option value="starter">Starter</option>
    <option value="team">Team</option>
  </select>
  <label class="sp-label" for="sel-grp">Region</label>
  <select class="sp-select" id="sel-grp">
    <optgroup label="Europe"><option>Paris</option><option>Berlin</option></optgroup>
    <optgroup label="Americas"><option>Toronto</option><option>Lima</option></optgroup>
  </select>
</div>
```

- **Placeholder:** a first `<option value="">` carries the prompt. Add
  `disabled selected hidden` to stop it being chosen again once the reader has
  picked a value. SpartaCSS does not dim it: the closed select shows it in the
  normal text colour. It is not a label, so the control still needs its own.
- **`required`:** with an empty-valued placeholder option, a required select is
  invalid until a real option is chosen. Showing the error is yours: set
  `aria-invalid`, the message and `.sp-field--error` (see Field states).
- **`<optgroup label>`:** groups options natively, and the label is exposed to
  assistive technology by the browser. SpartaCSS adds no styling to groups or
  option rows.

## Multiple and size

`.sp-select` is designed for a single choice from a dropdown. Adding `multiple`
or a `size` above 1 makes the browser draw a listbox instead, and the current CSS
does not account for it. Checked against the current CSS in Chromium 156, Firefox
157 and WebKit 27.2 (Playwright builds, not Safari):

- The control becomes a bordered listbox about 104px tall at four rows (107px in
  WebKit), still with the standard padding. The appearance of a listbox depends on
  the browser and operating system, so other engines and platforms may differ.
- **The chevron is still drawn** at the right edge, because it is a background
  image, although nothing opens.
- Row highlight and selected-row colours belong to the browser, not to the
  tokens. In the WebKit build tested the selected row was a dark grey with dark
  text, which looked hard to read on the dark theme (seen in a screenshot, not
  measured). Safari was not tested, and the result may differ there.
- `size="1"` behaves like the plain control.

These are limitations of the current implementation, not documented API. For a
multiple choice, use a group of [checkboxes](./checkbox-radio.md).

## Accessibility

- `.sp-select` styles a native `<select>`, so native keyboard operability and
  form submission behavior work with no extra effort.
- Always pair a select with a `<label>` (via `.sp-label`/`.sp-field__label`
  wrapping it, or `for`/`id`) — the class does not generate an accessible name
  on its own.
- Focus is styled on `:focus`, not `:focus-visible`: the border changes to
  `--sp-border-focus` and the `--sp-shadow-focus` ring appears, so a mouse click
  shows it as well as the keyboard. `.sp-select:focus-visible` only sets
  `outline: none`, and the shared global focus rule in `sparta-accessibility.css`
  excludes this class so the two don't conflict — see
  [`accessibility.md`](./accessibility.md#keyboard-and-focus-expectations).
- **Known limitation: focus indicator contrast.** The indicator is a 2px
  `--sp-border-focus` border (the brand colour) plus a 3px ring at 35% opacity.
  Measured against the default page background, the border is about 2.6:1 in the
  dark theme and 5.6:1 in the light theme, and the ring alone is about 1.3:1 and
  1.8:1. In the dark theme the focus state is therefore easy to miss. This is a
  known issue, to be corrected with the other form controls; do not rely on the
  ring alone to show where focus is.
- **Keyboard:** the native keys work unchanged (the exact keys vary by browser and
  operating system): Tab to reach it, the arrow keys
  to change the value, Space or Alt+Down to open the list, type-ahead to jump to
  an option. SpartaCSS neither adds nor removes any of this.
- **Requirement:** a validation state needs more than the class. Set
  `aria-invalid="true"` on the select, as the error example above does, and
  point `aria-describedby` at the message. SpartaCSS draws the red; it does not
  tell assistive technology the value is invalid.

## Responsive behavior

`.sp-select` is a full-width block, so it fills the width you give it and no
breakpoint is needed. Inside a flex row it takes the space that is left; give it
a width, or put it in a [grid](./layout.md), if it should not.

## Common mistakes

**A control with no label.** A select is not named by its options.

```html
<!-- Wrong -->
<select class="sp-select"><option>Choose a plan</option></select>

<!-- Right -->
<label class="sp-label" for="plan">Plan</label>
<select class="sp-select" id="plan"><option>Starter</option></select>
```

**An error that is only a red border.** Add text, and tell assistive
technology.

```html
<!-- Wrong: color is the only signal -->
<select class="sp-select sp-select--error"><option>Choose</option></select>

<!-- Right -->
<select class="sp-select sp-select--error" id="s" aria-invalid="true" aria-describedby="s-err"><option>Choose</option></select>
<span class="sp-form-error" id="s-err">Choose a plan.</span>
```

## Related

- [Forms](./forms.md) — the `.sp-form-group` and `.sp-field` wrappers.
- [Dropdown](./dropdown.md) — a menu of actions, not a form control.
- [Input](./input.md), [Textarea](./textarea.md) — the other text-entry controls.
- [Accessibility](./accessibility.md) — focus and ARIA responsibility
  boundaries.

## Stability

**Supported.** `.sp-select` and `.sp-select--error` are part of the released
API, and ADR-0002's breaking-change rules apply to them. So do the
`.sp-field--error`, `--success` and `--warning` contexts as they apply to a
select; those classes belong to the [Forms](./forms.md) page.

**Internal.** `.sp-select-wrapper` and `.sp-select-icon` ship in the stylesheet
but are not documented as API and are not Supported. They set a colour only and
position nothing. Do not build on them.

---
Source: `src/components/sparta-form.css`
