# Dropdown

## Purpose

Dropdown is a pure-CSS menu that opens on hover or keyboard focus — for
action menus, user menus, and similar small popovers that don't need
Modal/Drawer's blocking behavior. Unlike Modal/Drawer/Accordion, Dropdown
needs **no JavaScript at all** to open and close; visibility is driven
entirely by `:hover`/`:focus-within`.

## Usage

```html
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

```html
<div class="sp-dropdown__menu sp-dropdown__menu--right">...</div> <!-- align right edge -->
<div class="sp-dropdown__menu sp-dropdown__menu--up">...</div>   <!-- open upward -->
```

### Item style

```html
<a class="sp-dropdown__item sp-dropdown__item--active">...</a>
<button class="sp-dropdown__item sp-dropdown__item--danger">...</button>
```

`--active` and `--danger` are independent and can both apply, though
combining them isn't a typical use case.

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

---
Source: `src/modules/overlay/sparta-dropdown.css`
