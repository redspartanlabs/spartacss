# Button

## Purpose

Button is the primary interactive-action element — a single class,
`.sp-button`, plus size, color/style, width, and loading modifiers. Works
on `<button>`, `<a>`, or any element you choose; SpartaCSS styles whatever
it's placed on, but a real `<button>` is expected for native keyboard
activation (see Accessibility below).

It is CSS only. The class gives an element a button's appearance and its
visual states; what the button *does*, and whether it can be activated at all,
is the element's job and your application's.

## When to use which

- **Requirement:** use a `<button>` for an action the page performs on its own
  — submitting a form, opening a dialog, toggling something. Use an `<a href>`
  for navigation to another page or location. Putting `.sp-button` on an
  `<a>` changes how the link looks, not what it is: it still navigates, it is
  still announced as a link, and it does not activate with the Space key.
- **Guidance:** for a navigation call to action, `.sp-button` on an `<a>` is
  appropriate. For ordinary links in running text, use
  [Link](./link.md) instead.
- **Guidance:** for several related choices that switch content in place, a
  [Tabs](./tabs.md) control fits better than a row of buttons.

## Usage

The two ways to use the class — an action and a navigation:

```html preview height=6
<button class="sp-button sp-button--primary">Save</button>
<a href="#details" class="sp-button sp-button--outline">Learn more</a>
```

## Class API

- `.sp-button` — base class. Required on every button; provides layout,
  padding, border, and the shared transition/disabled/focus behavior.
- Size: `--sm`, `--md`, `--lg`.
- Width: `--full`.
- Color/style: `--primary`, `--secondary`, `--success`, `--warning`,
  `--error`, `--info`, `--ghost`, `--outline`, and `--outline-secondary`,
  `--outline-success`, `--outline-warning`, `--outline-error`,
  `--outline-info`.
- State: `--loading`.
- `--icon-only` — a square button holding only an icon. It is defined by the
  [icon module](./icons.md), so it needs `sparta-icons.css` or a bundle that
  includes it.

Every modifier is written with the base class, for example
`sp-button sp-button--primary sp-button--lg`.

## Variants

### Size

`--md` is the default size: a button with no size modifier looks the same.
Set a size modifier only when you want a different one.

```html preview height=9 wide=6
<button class="sp-button sp-button--primary sp-button--sm">Small</button>
<button class="sp-button sp-button--primary sp-button--md">Medium (default)</button>
<button class="sp-button sp-button--primary sp-button--lg">Large</button>
```

### Width

A button is as wide as its content. `--full` makes it fill its container, which
is the usual choice for a primary action on a narrow screen or in a narrow
card.

```html preview height=6
<button class="sp-button sp-button--primary sp-button--full">Full width</button>
```

### Color / style

Filled: `--primary`, `--secondary`, `--success`, `--warning`, `--error`,
`--info`.

```html preview height=10 wide=8
<button class="sp-button sp-button--primary">Primary</button>
<button class="sp-button sp-button--secondary">Secondary</button>
<button class="sp-button sp-button--success">Success</button>
<button class="sp-button sp-button--warning">Warning</button>
<button class="sp-button sp-button--error">Error</button>
<button class="sp-button sp-button--info">Info</button>
```

Low-emphasis: `--ghost` (transparent, no border, subtle hover fill).

Outline: `--outline` (primary), plus semantic outline variants
`--outline-secondary`, `--outline-success`, `--outline-warning`,
`--outline-error`, `--outline-info` — transparent background and colored
border/text at rest, filling with the solid color on hover.

```html preview height=10 wide=8
<button class="sp-button sp-button--ghost">Ghost</button>
<button class="sp-button sp-button--outline">Outline</button>
<button class="sp-button sp-button--outline-secondary">Secondary</button>
<button class="sp-button sp-button--outline-success">Success</button>
<button class="sp-button sp-button--outline-warning">Warning</button>
<button class="sp-button sp-button--outline-error">Outline error</button>
<button class="sp-button sp-button--outline-info">Info</button>
```

Exactly one color/style variant should be applied at a time — they aren't
designed to be combined with each other.

### With an icon

An icon inside a button sits before the label with a small gap. A button that
holds only an icon uses `--icon-only`, which makes it square. Both rely on the
[icon module](./icons.md).

```html preview height=6
<button class="sp-button sp-button--primary"><span class="sp-icon sp-icon-plus" aria-hidden="true"></span>New item</button>
<button class="sp-button sp-button--outline-error"><span class="sp-icon sp-icon-trash" aria-hidden="true"></span>Delete</button>
<button class="sp-button sp-button--ghost sp-button--icon-only" aria-label="Settings"><span class="sp-icon sp-icon-settings"></span></button>
```

An icon beside a label is decorative, so it is marked `aria-hidden="true"`. An
icon that is the button's only content is not marked: the button is named by
its `aria-label` (see [Icons](./icons.md#accessibility)).

## State modifiers

- `:hover`, `:active` — native pseudo-classes; each color variant defines
  its own hover/active background and elevation (`translateY`/shadow)
  response, disabled automatically once `:disabled` is set (`:not(:disabled)`
  guards on every hover/active rule).
- `:disabled` / `[aria-disabled="true"]` — both are styled identically
  (45% opacity, `cursor: not-allowed`, pointer-events off). Use whichever
  matches your markup — a native `<button disabled>` or an `<a>` with
  `aria-disabled="true"` (links can't take the `disabled` attribute).
- `.sp-button--loading` — hides the label (`color: transparent`) and shows
  a centered spinner (`sp-spin` keyframe, see [`motion.md`](./motion.md)).
  Disables pointer events but does **not** add `disabled`/`aria-disabled`
  for you — set that yourself if the action should also be unclickable
  while loading.

Hover and press are interactive, so this page shows the states that are
visible at rest:

```html preview height=8
<button class="sp-button sp-button--primary" disabled>Disabled</button>
<button class="sp-button sp-button--outline" disabled>Disabled outline</button>
<button class="sp-button sp-button--primary sp-button--loading" aria-busy="true" disabled>Saving</button>
<a class="sp-button sp-button--primary" href="#top" aria-disabled="true">Disabled link</a>
```

Focus is shown by keyboard navigation. Tab to a button to see it: the focus
ring is a box-shadow (`--sp-shadow-focus`), drawn only for `:focus-visible`, so
it appears for keyboard users and not on a mouse click.

## Accessibility

- Use a real `<button>` (or `<a>` for navigation) — SpartaCSS provides the
  visual state changes for `:disabled`, `:focus-visible`, etc., but native
  keyboard activation (`Enter`/`Space` on `<button>`) comes from the
  element, not the class.
- `:focus-visible` renders as a box-shadow ring (`--sp-shadow-focus`)
  rather than the shared outline-based focus rule, since a shadow reads
  more clearly against a filled/colored button surface. See
  [`accessibility.md`](./accessibility.md) for the full focus-ring policy.
- `.sp-button--loading` only removes visual pointer interaction; it does
  not announce a busy state to assistive technology — pair it with
  `aria-busy="true"` on the button if the loading state should be
  announced.
- **Requirement:** a button that shows only an icon needs an accessible name,
  for example `aria-label="Settings"`. SpartaCSS draws the icon; it cannot
  name the button. See [Icons](./icons.md#accessibility) for how an icon-only
  button's icon is marked.
- **Requirement:** `aria-disabled="true"` on an `<a>` only *describes* the
  link as disabled and styles it. A link with an `href` still navigates when
  activated from the keyboard. If a link must not be followed, your
  application has to stop it, or leave the `href` off.

What SpartaCSS provides, and what stays yours:

| SpartaCSS provides | Your application provides |
| --- | --- |
| Appearance, sizes, colors, hover and press response | Choosing `<button>` or `<a>` correctly |
| The visible focus ring | The accessible name of an icon-only button |
| The disabled and loading appearance | Actually preventing activation while disabled or loading, and `aria-busy` |
| Nothing at runtime — there is no JavaScript | The action the button performs |

## Responsive behavior

Button has no breakpoint-specific behavior. It keeps its label on one line
(`white-space: nowrap`), so a long label does not wrap inside the button. On a
narrow screen, use `--full` to let a button fill its container, and give a
group of buttons room to wrap by placing them in a layout container such as
[a cluster](./layout.md).

```html preview height=6
<div class="sp-cluster">
  <button class="sp-button sp-button--primary">Save changes</button>
  <button class="sp-button sp-button--ghost">Cancel</button>
</div>
```

## Common mistakes

**Making a `<div>` or `<span>` act as a button.** The class styles it, but
nothing makes it focusable or keyboard-operable.

```html
<!-- Wrong: not focusable, no Enter/Space activation, not announced as a button -->
<div class="sp-button sp-button--primary" onclick="save()">Save</div>

<!-- Right -->
<button class="sp-button sp-button--primary" type="button">Save</button>
```

**Combining color variants.** One color/style variant per button.

```html
<!-- Wrong: two variants compete -->
<button class="sp-button sp-button--primary sp-button--success">Save</button>

<!-- Right -->
<button class="sp-button sp-button--success">Save</button>
```

**Using `--loading` alone to prevent a second submit.** It only stops mouse
interaction. A keyboard user can still press Enter or Space.

```html
<!-- Wrong: still activatable from the keyboard -->
<button class="sp-button sp-button--primary sp-button--loading">Saving</button>

<!-- Right: also disabled, and announced as busy -->
<button class="sp-button sp-button--primary sp-button--loading" aria-busy="true" disabled>Saving</button>
```

**An icon-only button with no name.** A screen reader announces "button" and
nothing else.

```html
<!-- Wrong -->
<button class="sp-button sp-button--ghost sp-button--icon-only"><span class="sp-icon sp-icon-trash"></span></button>

<!-- Right -->
<button class="sp-button sp-button--ghost sp-button--icon-only" aria-label="Delete item"><span class="sp-icon sp-icon-trash"></span></button>
```

**Relying on `aria-disabled` to stop a link.** See Accessibility above.

## Related

- [Link](./link.md) — inline and standalone hyperlinks, for navigation in
  running text.
- [Icons](./icons.md) — the icon set, and `--icon-only` buttons.
- [Forms](./forms.md) — submit and reset buttons inside fields and forms.
- [Accessibility](./accessibility.md) — the focus-ring policy and what
  SpartaCSS cannot do without JavaScript.
- [Design tokens](./tokens.md) — the colors, spacing and radii every variant
  resolves through.

---
Source: `src/components/sparta-button.css`
