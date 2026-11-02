# Toggle Switch

## Purpose

`.sp-toggle` styles a native checkbox as an on/off switch, with an optional label
beside it. It is one of the form controls in `sparta-form.css`, alongside
[Input](./input.md), [Select](./select.md), [Textarea](./textarea.md) and
[Checkbox & Radio](./checkbox-radio.md).

It styles a **native** checkbox: checking, keyboard operation and form submission
are the browser's. SpartaCSS provides the appearance and the visual states; your
application provides the label and what the switch does.

## When to use which

- **Guidance:** a Toggle Switch suits a setting that takes effect immediately; a
  [Checkbox](./checkbox-radio.md) suits a choice that is submitted with the form
  (accept terms).

## Usage

```html preview height=5
<label class="sp-toggle">
  <input class="sp-toggle__input" type="checkbox" />
  <span class="sp-toggle__label">Enable notifications</span>
</label>
```

- **Class API:** `.sp-toggle` wraps `.sp-toggle__input` (a checkbox styled
  as a track+thumb switch) and optional `.sp-toggle__label`.
- **Variants:** `--sm`, default (unsized), `--lg` — scales both track and
  thumb, and the thumb's checked-state travel distance, together.
- **States:** `:checked` (track fills primary, thumb slides right),
  `:focus-visible` (shadow ring on the track), `:disabled` (45% opacity).

```html preview height=13
<div class="sp-stack">
  <label class="sp-toggle sp-toggle--sm"><input class="sp-toggle__input" type="checkbox" checked /><span class="sp-toggle__label">Small, on</span></label>
  <label class="sp-toggle"><input class="sp-toggle__input" type="checkbox" checked /><span class="sp-toggle__label">Default, on</span></label>
  <label class="sp-toggle sp-toggle--lg"><input class="sp-toggle__input" type="checkbox" /><span class="sp-toggle__label">Large, off</span></label>
  <label class="sp-toggle"><input class="sp-toggle__input" type="checkbox" disabled /><span class="sp-toggle__label">Disabled</span></label>
</div>
```

## Accessibility

- `.sp-toggle__input` is a native `<input type="checkbox">`, so native keyboard
  operability works with no extra effort: it takes focus with Tab and toggles
  with Space.
- Wrap the input and its label text in `.sp-toggle`, which is a `<label>` as in
  the examples, so the text names the control. The classes do not generate an
  accessible name on their own.
- `:focus-visible` is styled explicitly (the consistent `--sp-shadow-focus`
  treatment on the track) rather than relying on the browser default — see
  [`accessibility.md`](./accessibility.md#keyboard-and-focus-expectations).
- SpartaCSS adds no `role="switch"` or other ARIA. If you want the control
  announced as a switch rather than a checkbox, add that yourself (see
  [`accessibility.md`](./accessibility.md#aria-responsibility-boundaries)).

## Responsive behavior

Toggle Switch has no breakpoint-specific rules. It is an inline control that
flows with the content around it.

## Common mistakes

**A toggle with no label text.** The track and thumb carry no meaning for
assistive technology; the label does.

**A toggle for something submitted later.** A switch implies the change happens
now. For a choice that is submitted with a form, use a Checkbox.

## Related

- [Checkbox & Radio](./checkbox-radio.md) — choices submitted with the form.
- [Forms](./forms.md) — the `.sp-form-group` and `.sp-field` wrappers.
- [Accessibility](./accessibility.md) — focus and ARIA responsibility
  boundaries.

---
Source: `src/components/sparta-form.css`
