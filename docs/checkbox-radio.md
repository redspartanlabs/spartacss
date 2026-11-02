# Checkbox & Radio

## Purpose

`.sp-checkbox` and `.sp-radio` style a native checkbox and radio button, with an
optional label text beside each. They are form controls in `sparta-form.css`,
alongside [Input](./input.md), [Select](./select.md), [Textarea](./textarea.md)
and [Toggle Switch](./toggle.md). Their shape is the only difference between
them: the wrapper class decides whether the control is square or circular.

Both style a **native** element: checking, grouping by `name`, keyboard
operation and form submission are the browser's. SpartaCSS provides the
appearance and the visual states; your application provides the labels and the
validation.

## When to use which

- **Guidance:** for a single yes/no, a Checkbox suits a choice that is
  submitted with the form (accept terms); a [Toggle Switch](./toggle.md) suits a
  setting that takes effect immediately. For one choice among several, use
  Radios.

## Usage

```html preview height=5
<label class="sp-checkbox">
  <input type="checkbox" />
  <span class="sp-checkbox--label">Accept terms</span>
</label>

<label class="sp-radio">
  <input type="radio" name="plan" />
  <span class="sp-radio--label">Monthly</span>
</label>
```

- **Class API:** `.sp-checkbox` / `.sp-radio` wrap a native
  `input[type="checkbox"]` / `input[type="radio"]` plus optional
  `.sp-checkbox--label` / `.sp-radio--label` text.
- **Variants:** none — shape (square vs. circle) is determined entirely
  by the wrapper class.
- **States:** `:hover` (border tints primary), `:focus-visible` (shadow
  ring), `:checked` (fills primary; checkbox shows a white check icon via
  `--sp-icon-bg-check-white`; radio shows an inset "dot" via `box-shadow`),
  `:disabled` (45% opacity).

```html preview height=11
<div class="sp-stack">
  <label class="sp-checkbox"><input type="checkbox" checked /><span class="sp-checkbox--label">Checked</span></label>
  <label class="sp-checkbox"><input type="checkbox" disabled /><span class="sp-checkbox--label">Disabled</span></label>
  <label class="sp-radio"><input type="radio" name="size" checked /><span class="sp-radio--label">Selected</span></label>
  <label class="sp-radio"><input type="radio" name="size" /><span class="sp-radio--label">Not selected</span></label>
</div>
```

## Accessibility

- Both styles apply to native `<input>` elements, so native keyboard
  operability and form submission behavior work with no extra effort.
- Wrap the input and its text in the `<label>`, as the examples do, so the text
  names the control and clicking it toggles the input. The classes do not
  generate an accessible name on their own.
- `:focus-visible` is styled explicitly (the consistent `--sp-shadow-focus`
  treatment) rather than relying on the browser default, and the shared global
  focus rule in `sparta-accessibility.css` explicitly excludes these controls so
  the two rules don't conflict — see
  [`accessibility.md`](./accessibility.md#keyboard-and-focus-expectations).
- The checked state is shown by fill and a check or dot, not by color alone.
- A required marker is not part of these controls; set the native `required`
  attribute on the input so validation and assistive technology know.

## Responsive behavior

Neither control has breakpoint-specific rules. Stack a group of them in a
[stack](./layout.md) so each sits on its own line.

## Common mistakes

**A control with no label.** An input with no label text beside it, or outside
its `<label>`, has no accessible name.

**Radios with different `name` values.** Radios are grouped by their native
`name` attribute. SpartaCSS does not group them, so two radios with different
names can both be selected.

**A required marker without `required`.** A visual `*` is decoration. Set the
attribute so validation and assistive technology know.

## Related

- [Toggle Switch](./toggle.md) — a setting that takes effect immediately.
- [Forms](./forms.md) — the `.sp-form-group` and `.sp-field` wrappers.
- [List](./list.md) — `.sp-list--checked` shares the checkbox's check token.
- [Accessibility](./accessibility.md) — focus and ARIA responsibility
  boundaries.

---
Source: `src/components/sparta-form.css`
