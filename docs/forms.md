# Forms

## Purpose

`sparta-form.css` is the single source file for every form-related
primitive in SpartaCSS: Input, Select, Textarea, Checkbox, Radio, Toggle
Switch, plus two independent wrapper systems — the plain
`.sp-form-group`/`.sp-label` pattern, and the richer `.sp-field` system
(icon slots, required/optional markers, error/success/warning states,
inline layout). Both wrapper systems style the same underlying
`.sp-input`/`.sp-select`/`.sp-textarea` classes; they are two supported
ways to structure a field, not a legacy/current pair — pick whichever
fits your form's complexity. `.sp-field` is documented in full below since
it's the more capable option; `.sp-form-group` is documented briefly since
it's a thin wrapper with no variants of its own.

Every primitive styles a **native** form element. Nothing here replaces the
browser's form behavior: validation, autofill, submission and keyboard
operation are the elements', not SpartaCSS's. SpartaCSS provides the
appearance and the visual states; your application provides the labels, the
validation logic and the messages.

## When to use which

- **Guidance:** pick `.sp-form-group` for a simple label-control-hint stack,
  and `.sp-field` when you need a required/optional marker, an icon inside the
  control, a validation state, or a label beside the control.
- **Requirement:** use a native `<select>` (`.sp-select`) when the reader must
  choose from a list as part of a form. A [Dropdown](./dropdown.md) is a menu
  of actions or navigation, not a form control.
- **Guidance:** for a single yes/no, a Checkbox suits a choice that is
  submitted with the form (accept terms); a Toggle Switch suits a setting that
  takes effect immediately. For one choice among several, use Radios.

## `.sp-form-group` (simple wrapper)

```html preview height=9
<div class="sp-form-group">
  <label class="sp-label" for="email">Email</label>
  <input class="sp-input" id="email" type="email" />
  <span class="sp-form-hint">We'll never share your email.</span>
</div>
```

- `.sp-form-group` — vertical flex wrapper with small gap and bottom
  margin, for stacking label + control + hint/error.
- `.sp-label` — the field's label text.
- `.sp-label--required` — appends a red ` *`.
- `.sp-form-hint` — muted helper text below the control.
- `.sp-form-error` — error-colored text below the control (styling only —
  toggling it based on validation state is up to you).

```html preview height=9
<div class="sp-form-group">
  <label class="sp-label sp-label--required" for="name">Name</label>
  <input class="sp-input sp-input--error" id="name" type="text" required aria-invalid="true" aria-describedby="name-error" />
  <span class="sp-form-error" id="name-error">Enter your name.</span>
</div>
```

## `.sp-field` (full field system)

### Usage

```html preview height=9
<div class="sp-field">
  <label class="sp-field__label sp-field__label--required" for="name2">Name</label>
  <div class="sp-field__control">
    <input class="sp-input" id="name2" type="text" required />
  </div>
  <span class="sp-field__hint">As it appears on your ID.</span>
</div>
```

With a leading icon and an error state:

```html preview height=9
<div class="sp-field sp-field--error">
  <label class="sp-field__label" for="search">Search</label>
  <div class="sp-field__control sp-field__control--icon-left">
    <span class="sp-field__icon sp-field__icon--left">🔍</span>
    <input class="sp-input" id="search" type="text" aria-invalid="true" aria-describedby="search-error" />
  </div>
  <span class="sp-field__error" id="search-error">This field is required.</span>
</div>
```

### Class API

- `.sp-field` — the field wrapper. Vertical layout by default; stacks
  automatically with `margin-top` when a second `.sp-field` follows.
- `.sp-field__label` — label row; supports `--required` (red `*` suffix)
  and `--optional` (muted "optional" suffix) modifiers.
- `.sp-field__control` — wraps the actual input, positioned `relative` so
  icon slots can be absolutely positioned inside it.
- `.sp-field__control--icon-left` / `--icon-right` — reserves input
  padding for an icon slot on that side.
- `.sp-field__icon` — the icon itself; `--left`/`--right` position it.
  Non-interactive (`pointer-events: none`) and dims/brightens on the
  control's `:focus-within`.
- `.sp-field__hint` — muted helper text.
- `.sp-field__error` / `.sp-field__warning` — colored feedback text (error
  red, warning orange); shown/hidden by your own markup logic, not by CSS.

### Variants / State modifiers

- `.sp-field--error` — reddens the label, borders the contained
  `.sp-input`/`.sp-select`/`.sp-textarea`, and gives them a red focus ring.
- `.sp-field--success` — greens the contained control's border and focus
  ring (no label color change, unlike error/warning).
- `.sp-field--warning` — oranges the label and the contained control's
  border/focus ring.
- `.sp-field--disabled` — dims the label and hint to 45% opacity and shows
  `cursor: not-allowed`; you're still responsible for disabling the actual
  `<input>`.
- `.sp-field--inline` — switches the field to a horizontal row (label
  left, control right, space-between) instead of the default vertical
  stack.

`--error`, `--success`, and `--warning` are mutually exclusive — apply at
most one at a time.

```html preview height=32
<div class="sp-stack">
  <div class="sp-field sp-field--error">
    <label class="sp-field__label" for="f-err">Error</label>
    <div class="sp-field__control"><input class="sp-input" id="f-err" type="text" value="bad value" aria-invalid="true" aria-describedby="f-err-msg" /></div>
    <span class="sp-field__error" id="f-err-msg">That value is not valid.</span>
  </div>
  <div class="sp-field sp-field--success">
    <label class="sp-field__label" for="f-ok">Success</label>
    <div class="sp-field__control"><input class="sp-input" id="f-ok" type="text" value="good value" /></div>
    <span class="sp-field__hint">Looks good.</span>
  </div>
  <div class="sp-field sp-field--warning">
    <label class="sp-field__label" for="f-warn">Warning</label>
    <div class="sp-field__control"><input class="sp-input" id="f-warn" type="text" value="questionable" aria-describedby="f-warn-msg" /></div>
    <span class="sp-field__warning" id="f-warn-msg">This is usually longer.</span>
  </div>
  <div class="sp-field sp-field--disabled">
    <label class="sp-field__label" for="f-dis">Disabled</label>
    <div class="sp-field__control"><input class="sp-input" id="f-dis" type="text" value="read only for now" disabled /></div>
    <span class="sp-field__hint">The input itself is also disabled.</span>
  </div>
</div>
```

Required and optional markers, and an inline field:

```html preview height=12
<div class="sp-stack">
  <div class="sp-field">
    <label class="sp-field__label sp-field__label--optional" for="f-opt">Nickname</label>
    <div class="sp-field__control"><input class="sp-input" id="f-opt" type="text" /></div>
  </div>
  <div class="sp-field sp-field--inline">
    <label class="sp-field__label" for="f-inl">Inline</label>
    <div class="sp-field__control"><input class="sp-input" id="f-inl" type="text" /></div>
  </div>
</div>
```

---

## Input

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

## Select

```html preview height=6
<select class="sp-select" aria-label="Option">
  <option>Option A</option>
  <option>Option B</option>
</select>
```

- **Class API:** `.sp-select` — base class; disables native appearance and
  draws its own chevron.
- **Variants:** none beyond `--error`.
- **States:** `:hover`, `:focus`, `:disabled`, `--error`.
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

## Textarea

```html preview height=11
<textarea class="sp-textarea" placeholder="Your message" aria-label="Message"></textarea>
```

- **Class API:** `.sp-textarea` — base class; `resize: vertical` by
  default (disabled when `:disabled`).
- **Variants:** `--error`.
- **States:** `:hover`, `:focus`, `:disabled`.

## Checkbox & Radio

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

## Toggle Switch

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

## Accessibility (all form primitives)

- Every primitive above styles a **native** form element
  (`<input>`/`<select>`/`<textarea>`) — none of them are custom-element
  reimplementations, so native keyboard operability, autofill, and form
  submission behavior all work with no extra effort.
- Always pair a control with a `<label>` (via `.sp-label`/`.sp-field__label`
  wrapping it, or `for`/`id`) — none of these classes generate an
  accessible name on their own.
- `:focus-visible` is styled explicitly on every primitive (border/shadow
  ring, consistent `--sp-shadow-focus` treatment) rather than relying on
  the browser default, and the shared global focus rule in
  `sparta-accessibility.css` explicitly excludes these classes so the two
  rules don't conflict — see
  [`accessibility.md`](./accessibility.md#keyboard-and-focus-expectations).
- Color is never the only signal for error/success/warning states —
  `.sp-field__error`/`.sp-form-error` etc. rely on text content, with
  color as a secondary reinforcement. Ensure your markup actually
  populates that text; a border-color change alone is not accessible
  error messaging.
- Required/optional markers (`.sp-label--required`,
  `.sp-field__label--required`/`--optional`) are purely visual
  (`::after` content) — pair with the native `required` attribute on the
  input itself so assistive technology and form validation both recognize
  it, not just sighted users.
- **Requirement:** a validation state needs more than the class. Set
  `aria-invalid="true"` on the control, and point `aria-describedby` at the
  message, as the error examples above do. SpartaCSS draws the red; it does
  not tell assistive technology the value is invalid.

What SpartaCSS provides, and what stays yours:

| SpartaCSS provides | Your application provides |
| --- | --- |
| The appearance of every control and its hover, focus, checked and disabled states | The `<label>` for every control |
| The error, success, warning and disabled looks | Deciding when a field is in each state, and the message text |
| Required and optional markers as styled text | The `required` attribute, and the validation itself |
| Nothing at runtime — there is no JavaScript | `aria-invalid`, `aria-describedby`, and moving focus to the first error on submit |

## Responsive behavior

`.sp-input` is a full-width block, so a field fills the width you give it and
no breakpoint is needed. `.sp-field--inline` keeps its label and control on one
row; on a narrow container, prefer the default stacked field. To place fields
side by side on wide screens and stacked on narrow ones, put them in a
[grid](./layout.md).

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

**`.sp-field--disabled` without `disabled`.** The class dims the field; it
does not disable the input. The reader can still type in it.

**A required marker without `required`.** The `*` is decoration. Set the
attribute so validation and assistive technology know.

**Mixing `.sp-field` and `.sp-form-group` states.** `--error` on
`.sp-field` styles the control inside it; on a `.sp-form-group` there is no
such modifier. Put `.sp-input--error` on the control there.

## Related

- [Button](./button.md) — submit and reset buttons.
- [Dropdown](./dropdown.md) — a menu, not a form control.
- [Layout](./layout.md) — placing fields in a stack or grid.
- [Accessibility](./accessibility.md) — focus and ARIA responsibility
  boundaries.
- [Alert](./alert.md) — a form-level message.

---
Source: `src/components/sparta-form.css`
