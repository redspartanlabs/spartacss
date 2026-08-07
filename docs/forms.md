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

## `.sp-form-group` (simple wrapper)

```html
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

## `.sp-field` (full field system)

### Usage

```html
<div class="sp-field">
  <label class="sp-field__label sp-field__label--required" for="name">Name</label>
  <div class="sp-field__control">
    <input class="sp-input" id="name" type="text" />
  </div>
  <span class="sp-field__hint">As it appears on your ID.</span>
</div>
```

With a leading icon and an error state:

```html
<div class="sp-field sp-field--error">
  <label class="sp-field__label" for="search">Search</label>
  <div class="sp-field__control sp-field__control--icon-left">
    <span class="sp-field__icon sp-field__icon--left">🔍</span>
    <input class="sp-input" id="search" type="text" />
  </div>
  <span class="sp-field__error">This field is required.</span>
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

---

## Input

```html
<input class="sp-input" type="text" placeholder="you@example.com" />
```

- **Class API:** `.sp-input` — base class, works on any `<input type="...">`.
- **Variants:** `--sm`, default (unsized), `--lg`.
- **States:** `:hover` (not while focused/disabled), `:focus` (border +
  shadow ring), `:disabled` (45% opacity), `--error` (red border + red
  focus ring — can be applied directly to `.sp-input` or inherited via a
  parent `.sp-field--error`).

## Select

```html
<select class="sp-select">
  <option>Option A</option>
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

## Textarea

```html
<textarea class="sp-textarea" placeholder="Your message"></textarea>
```

- **Class API:** `.sp-textarea` — base class; `resize: vertical` by
  default (disabled when `:disabled`).
- **Variants:** `--error`.
- **States:** `:hover`, `:focus`, `:disabled`.

## Checkbox & Radio

```html
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

## Toggle Switch

```html
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

---
Source: `src/components/sparta-form.css`
