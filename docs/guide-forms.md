# Designing forms

This guide covers how to put SpartaCSS's form pieces together into a form that
is clear to fill in and accessible to use. The classes are documented on the
[Forms](./forms.md) page; this is about composing them. It adds no new classes.

The division of work is the same throughout: SpartaCSS draws the controls and
their states; you provide the labels, the validation, the messages and the
script.

## One field

Every control has a visible label, tied to it with `for` and `id`. Help text
goes below the control. Mark a required field with the marker class **and** the
native `required` attribute: the marker is only a visual `*`.

```html preview height=9
<div class="sp-field">
  <label class="sp-field__label sp-field__label--required" for="gf-email">Email</label>
  <div class="sp-field__control">
    <input class="sp-input" id="gf-email" type="email" autocomplete="email" required aria-describedby="gf-email-hint" />
  </div>
  <span class="sp-field__hint" id="gf-email-hint">We'll only use it to send your receipt.</span>
</div>
```

Why:

- A **label** is the control's name. A placeholder is not: it disappears as the
  reader types.
- `aria-describedby` ties the hint to the control, so it is read with it.
- The right `type` and `autocomplete` give the reader the right keyboard and
  autofill. Both are native; SpartaCSS only styles the result.

## A whole form

Group related fields, and say what each group is. In a real page the outer
element is a `<form>`; a live example here uses a `<div>`, because an example
must not submit anything. Fields stack with an even gap
when they follow one another. Put the actions at the end, with one primary action.

```html preview height=43
<div class="sp-stack sp-stack--lg">
  <div class="sp-card">
    <div class="sp-card__header"><h2 class="sp-card__title">Account</h2></div>
    <div class="sp-card__body">
      <div class="sp-field">
        <label class="sp-field__label sp-field__label--required" for="gf-name">Name</label>
        <div class="sp-field__control"><input class="sp-input" id="gf-name" type="text" autocomplete="name" required /></div>
      </div>
      <div class="sp-field">
        <label class="sp-field__label sp-field__label--required" for="gf-plan">Plan</label>
        <div class="sp-field__control">
          <select class="sp-select" id="gf-plan"><option>Starter</option><option>Team</option><option>Business</option></select>
        </div>
      </div>
      <div class="sp-field">
        <label class="sp-field__label sp-field__label--optional" for="gf-note">Note</label>
        <div class="sp-field__control"><textarea class="sp-textarea" id="gf-note"></textarea></div>
      </div>
    </div>
  </div>

  <div class="sp-card">
    <div class="sp-card__header"><h2 class="sp-card__title">Preferences</h2></div>
    <div class="sp-card__body">
      <div class="sp-stack sp-stack--sm">
        <label class="sp-toggle"><input class="sp-toggle__input" type="checkbox" checked /><span class="sp-toggle__label">Email me about my account</span></label>
        <label class="sp-checkbox"><input type="checkbox" /><span class="sp-checkbox--label">I accept the terms</span></label>
      </div>
    </div>
  </div>

  <div class="sp-cluster">
    <button class="sp-button sp-button--primary" type="submit">Create account</button>
    <button class="sp-button sp-button--ghost" type="button">Cancel</button>
  </div>
</div>
```

Choosing the control:

- A **checkbox** for a yes/no that is submitted with the form; a **toggle** for a
  setting that takes effect immediately; **radios** for one choice among a few
  that should all be visible; a **select** for one choice among many.
- One **primary** button per form. Secondary actions use `--ghost` or
  `--outline`, so the main action is unmistakable.
- For radios, use a native `<fieldset>` with a `<legend>` to name the group.
  SpartaCSS has no classes for them.

## Validation

SpartaCSS has the *look* of an invalid field, not the logic. The pattern has
three parts that must agree:

1. The field carries the state class (`.sp-field--error`).
2. The control says it is invalid (`aria-invalid="true"`) and points at its message
   (`aria-describedby`).
3. The message is real text, in `.sp-field__error`.

```html preview height=15
<div class="sp-stack">
  <div class="sp-alert sp-alert--error" role="alert">
    <svg class="sp-alert__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M7 7l6 6M13 7l-6 6"/></svg>
    <div class="sp-alert__content"><div class="sp-alert__title">There is a problem</div><div class="sp-alert__body">Fix the field below, then try again.</div></div>
  </div>

  <div class="sp-field sp-field--error">
    <label class="sp-field__label sp-field__label--required" for="gf-pw">Password</label>
    <div class="sp-field__control"><input class="sp-input" id="gf-pw" type="password" required aria-invalid="true" aria-describedby="gf-pw-err" /></div>
    <span class="sp-field__error" id="gf-pw-err">Use at least 12 characters.</span>
  </div>
</div>
```

For the reader, in order:

- Say what is wrong **in text**, next to the field. Color alone is not a message.
- When the form is submitted with errors, move focus to the first invalid field
  or to a summary, so a keyboard or screen-reader user lands where the problem
  is. That is your script.
- Clear the error state and message when the value becomes valid.

## Submitting

Disable the action and show it is busy. `--loading` is only visual, so also set
`disabled` and `aria-busy`:

```html preview height=6
<button class="sp-button sp-button--primary sp-button--loading" type="submit" aria-busy="true" disabled>Creating account</button>
```

## Fields side by side

Two fields on one row when there is room: a grid with an explicit count gives
two columns on a wide screen and one under `768px`.

```html preview height=14
<div class="sp-grid sp-grid--cols-2">
  <div class="sp-field"><label class="sp-field__label" for="gf-first">First name</label><div class="sp-field__control"><input class="sp-input" id="gf-first" type="text" autocomplete="given-name" /></div></div>
  <div class="sp-field"><label class="sp-field__label" for="gf-last">Last name</label><div class="sp-field__control"><input class="sp-input" id="gf-last" type="text" autocomplete="family-name" /></div></div>
</div>
```

The frame above is narrower than `768px`, so it shows the single-column layout
that a phone gets; on a wide screen the two fields sit side by side.

## What SpartaCSS provides, and what stays yours

| SpartaCSS provides | Your application provides |
| --- | --- |
| Controls, field layout, error, success, warning and disabled looks | Labels, `required`, `type` and `autocomplete` |
| The required and optional markers | Validation, messages, and `aria-invalid` / `aria-describedby` |
| The busy look on a button | Disabling it, `aria-busy`, and the submit itself |
| Nothing at runtime | Moving focus to the first error |

## Common mistakes

**Placeholders as labels.** See One field.

**Only a red border.** Add the message text, and the ARIA that connects it.

**Everything primary.** A form with three filled buttons has no main action.

**A toggle for something that is submitted later.** A toggle looks like it acts
immediately. If the choice is sent with the form, use a checkbox.

**A long form on one card.** Group fields into sections with a heading each.

## Related

- [Forms](./forms.md): every control and state.
- [Button](./button.md), [Alert](./alert.md) and [Card](./card.md).
- [Accessibility](./accessibility.md): the contract this relies on.
- [Building page layouts](./guide-layouts.md).
