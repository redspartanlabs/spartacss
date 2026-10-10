# Dropdown

## Purpose

Dropdown is a pure-CSS menu that opens on hover or keyboard focus — for
action menus, user menus, and similar small popovers that don't need
Modal/Drawer's blocking behavior. Unlike Modal/Drawer/Accordion, Dropdown
needs **no JavaScript at all** to open and close; visibility is driven
entirely by `:hover`/`:focus-within`.

## When to use which

- **Requirement:** use a native `<select>` (see [Forms](./forms.md)) when the
  reader is choosing a value as part of a form. A Dropdown is a menu of
  actions or links, not a form control; it has no value, no selected option and
  does not submit.
- **Guidance:** use Dropdown for a short list of related actions or links
  behind one trigger: an account menu, a row's actions.
- **Guidance:** for choices that switch content in place, use
  [Tabs](./tabs.md). For a panel that needs the reader's full attention, use
  [Modal](./modal.md) or [Drawer](./drawer.md).

## Usage

Hover the trigger, or focus it with the keyboard, to open the menu. This
example is live and interactive.

```html preview height=15
<div class="sp-dropdown">
  <button class="sp-dropdown__trigger sp-button sp-button--ghost">
    Options
  </button>

  <div class="sp-dropdown__menu">
    <span class="sp-dropdown__label">Account</span>
    <a class="sp-dropdown__item" href="#">Profile</a>
    <a class="sp-dropdown__item sp-dropdown__item--active" href="#">Settings</a>
    <div class="sp-dropdown__divider"></div>
    <button class="sp-dropdown__item sp-dropdown__item--danger">Sign out</button>
  </div>
</div>
```

## Class API

- `.sp-dropdown` — positioning context (`position: relative`). Wrap the
  trigger and menu together.
- `.sp-dropdown__trigger` — the element that opens the menu on hover/focus.
  Any element works; no specific tag is required.
- `.sp-dropdown__menu` — the popover itself. Hidden by default
  (`opacity`/`visibility`/`transform`), shown when `.sp-dropdown` is
  `:hover`ed or contains focus (`:focus-within`).
- `.sp-dropdown__item` — a menu row. Works on `<a>` or `<button>`.
- `.sp-dropdown__divider` — a thin horizontal rule between item groups.
- `.sp-dropdown__label` — a small uppercase group heading, non-interactive.

## Variants

### Menu position

`--right` aligns the menu's right edge with the trigger's; `--up` opens it
upward. Use them when the default (below, left-aligned) would run off the edge
of the screen or into the bottom of the page.

```html preview height=11
<div class="sp-cluster sp-cluster--justify-between">
  <div class="sp-dropdown">
    <button class="sp-dropdown__trigger sp-button sp-button--ghost">Default</button>
    <div class="sp-dropdown__menu"><a class="sp-dropdown__item" href="#">One</a><a class="sp-dropdown__item" href="#">Two</a></div>
  </div>
  <div class="sp-dropdown">
    <button class="sp-dropdown__trigger sp-button sp-button--ghost">Right-aligned</button>
    <div class="sp-dropdown__menu sp-dropdown__menu--right"><a class="sp-dropdown__item" href="#">One</a><a class="sp-dropdown__item" href="#">Two</a></div>
  </div>
</div>
```

```html preview height=15
<div style="padding-top: 9rem">
  <div class="sp-dropdown">
    <button class="sp-dropdown__trigger sp-button sp-button--ghost">Opens upward</button>
    <div class="sp-dropdown__menu sp-dropdown__menu--up"><a class="sp-dropdown__item" href="#">One</a><a class="sp-dropdown__item" href="#">Two</a></div>
  </div>
</div>
```

### Item style

`--active` marks the current item; `--danger` marks a destructive one.
`--active` and `--danger` are independent and can both apply, though
combining them isn't a typical use case.

```html
<a class="sp-dropdown__item sp-dropdown__item--active">...</a>
<button class="sp-dropdown__item sp-dropdown__item--danger">...</button>
```

## State modifiers

- **Open/closed** — not a class you toggle. `.sp-dropdown__menu` becomes
  visible automatically whenever its ancestor `.sp-dropdown` is `:hover`ed
  by a mouse **or** contains keyboard focus (`:focus-within`) — no
  JavaScript or state class required. This is a deliberate difference from
  Modal/Drawer/Accordion, which all require a consumer-toggled class.
- `:disabled` / `[aria-disabled="true"]` on `.sp-dropdown__item` — both dim
  the item and disable pointer events, same equivalence pattern as Button
  (see [`button.md`](./button.md)).
- `.sp-dropdown__item:hover` / `:focus` / `:active` — standard interaction
  feedback; `--danger` items get a red-tinted hover instead of the default.

```html preview height=16
<div class="sp-dropdown">
  <button class="sp-dropdown__trigger sp-button sp-button--ghost">States</button>
  <div class="sp-dropdown__menu">
    <a class="sp-dropdown__item" href="#">Normal</a>
    <a class="sp-dropdown__item sp-dropdown__item--active" href="#">Active</a>
    <button class="sp-dropdown__item" disabled>Disabled</button>
    <button class="sp-dropdown__item sp-dropdown__item--danger">Danger</button>
  </div>
</div>
```

## Accessibility

- Because Dropdown opens via `:focus-within`, it's reachable by keyboard
  Tab navigation with no extra markup — tabbing into the trigger or any
  menu item keeps the menu open.
- There is no built-in `Escape`-to-close or click-outside-to-close
  behavior — Dropdown is deliberately a hover/focus-driven popover, not a
  managed overlay like Modal. If you need those behaviors, they require
  your own JavaScript (see
  [`accessibility.md`](./accessibility.md#css-vs-javascript-responsibility)).
- `.sp-dropdown__item` styles both `<a>` and `<button>` — use `<button>`
  for actions (like "Sign out" above) and `<a>` for navigation, so
  assistive technology announces the correct role.
- SpartaCSS does not add `role="menu"`/`role="menuitem"` or manage
  `aria-expanded` on the trigger — add these yourself if your use case
  needs full ARIA menu semantics (see
  [`accessibility.md`](./accessibility.md#aria-responsibility-boundaries)).

What SpartaCSS provides, and what stays yours:

| SpartaCSS provides | Your application provides |
| --- | --- |
| Opening and closing on hover and focus, with no script | `Escape` and click-outside closing, if you want them |
| The menu's look, positions and item styles | Menu semantics (`role`, `aria-expanded`) if you need a full ARIA menu |
| Keyboard reach by Tab | Arrow-key navigation within the menu, if you want it |

## Responsive behavior

Dropdown has no breakpoint-specific rules. On a device without hover, the menu
opens when focus moves into the dropdown. The menu does not reposition itself,
so choose `--right` or `--up` so it stays on screen at the widths you support.

## Common mistakes

**Using it as a `<select>`.** A Dropdown has no value and does not take part in
a form. See Forms.

**Expecting `Escape` or an outside click to close it.** It closes only when
the pointer leaves and focus moves out.

**A menu that runs off the screen.** The default opens below and aligned to the
left. Near the right edge use `--right`; near the bottom use `--up`.

**Items that are `<div>`s.** Use `<a>` for navigation and `<button>` for
actions, so they are focusable and announced correctly.

## Related

- [Forms](./forms.md) — the native `<select>`.
- [Button](./button.md) — triggers are usually buttons.
- [Tabs](./tabs.md) — switching content in place.
- [Accessibility](./accessibility.md) — what a CSS-only menu does not provide.

---
Source: `src/modules/overlay/sparta-dropdown.css`
