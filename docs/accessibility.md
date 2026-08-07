# Accessibility

SpartaCSS is framework-agnostic, pure CSS — SpartaCSS ships no JavaScript
and has no framework bindings. This document states, once, the contract
that follows from that: what SpartaCSS guarantees on its own, and what
remains the consumer's responsibility to wire up. Individual component
docs link back here for keyboard/focus/reduced-motion behavior rather than
re-explaining it each time.

## CSS vs. JavaScript responsibility

SpartaCSS ships styling and CSS-only interaction (`:hover`, `:focus`,
`:focus-within`, `:checked`, `prefers-reduced-motion`, etc.). It does not
ship, and will never ship, JavaScript. This means:

- **Pure-CSS interactive components** (Tooltip, Dropdown-via-`:focus-within`)
  work with no JS at all — hover and keyboard focus alone drive their
  visible state.
- **State-toggle components** (Modal, Drawer, Accordion's `--open`-style
  APIs) render both open and closed states in CSS, but the consumer's own
  JavaScript is responsible for adding/removing the state class or
  attribute (e.g. `.sp-modal--open`) in response to user interaction. This
  is the same convention used consistently since `0.5.0`
  (`.sp-app-shell`'s Navbar `--open` modifier) through `0.6.0`'s Tooltip/
  Accordion/Modal consolidation.
- **Focus trapping, keyboard-driven closing (`Escape`), and return-focus
  behavior** for Modal/Drawer are **not** implemented by SpartaCSS — these
  require JavaScript and are the consumer's responsibility. SpartaCSS
  provides the visual open/closed states and the focus-visible styling;
  it does not manage focus.

If a component needs behavior beyond what `:hover`/`:focus`/`:checked`/
class-toggling can express, that behavior is out of SpartaCSS's scope by
design, not an oversight.

## Keyboard and focus expectations

- Every interactive element that can receive focus gets a visible focus
  indicator via `:focus-visible`, defined once in
  `src/core/sparta-accessibility.css` and consumed by all components — no
  per-component focus-ring CSS to duplicate.
- Form controls and Button define their own `:focus-visible` treatment
  (`--sp-border-focus`-based, often paired with `--sp-shadow-focus`) rather
  than the default `outline`, because a box-model-aware ring reads better
  against a filled control; the shared rule explicitly excludes them
  (`:not(.sp-input):not(.sp-select)...`) so the two don't fight.
- `.sp-skip-link` — a standard skip-to-content pattern, hidden until
  focused (`top: -100%` → `top: 0` on `:focus`). Consumers are responsible
  for placing it as the first focusable element in the page and pointing
  it at their main-content anchor.
- Pure-CSS components that rely on `:focus-within` (Tooltip) are reachable
  by keyboard Tab navigation with no extra markup required.

## ARIA responsibility boundaries

SpartaCSS does not inject, require, or validate any `aria-*` attribute.
Wiring correct ARIA roles/states onto your markup is entirely the
consumer's responsibility. Where SpartaCSS *styles in response to* an ARIA
attribute already present in your markup, that's a styling hook, not ARIA
ownership:

- `.sp-button:disabled` and `.sp-button[aria-disabled="true"]` are styled
  identically — SpartaCSS reacts to whichever the consumer's markup uses,
  it doesn't decide which is correct for a given use case.
- The icon module ships a rule for `[aria-hidden]` icons (pointer-events
  disabled) — again, styling a state the consumer's markup declares, not
  adding the attribute itself.

Semantic roles for composite widgets (dialog, tablist, listbox, etc.) are
never assumed or auto-applied by any SpartaCSS class name — a class like
`.sp-modal` does not imply `role="dialog"` was added for you.

## Semantic HTML expectations

SpartaCSS's classes style whatever element they're placed on, but several
components are designed around a specific expected element and may not
behave correctly (particularly for keyboard users) on the wrong one:

- **Accordion** trigger expects a `<button>` — native keyboard
  activation (`Enter`/`Space`) and focusability come from the element,
  not from `.sp-accordion__header`/`.sp-accordion__trigger` alone.
- **Form controls** (`.sp-input`, `.sp-select`, `.sp-textarea`,
  `.sp-checkbox input`, `.sp-radio input`, `.sp-toggle__input`) expect the
  corresponding native `<input>`/`<select>`/`<textarea>` element — the
  classes style native form controls, they are not a custom-element
  replacement for one.
- **Link-styled components** (`.sp-link`, external-link variants) expect
  an `<a>` — for behavior like `target="_blank"` semantics and correct
  screen-reader link announcement.
- **Modal/Drawer/Dialog** containers are unopinionated about the wrapping
  element, but should be given `role="dialog"`/`aria-modal="true"` by the
  consumer for correct semantics — SpartaCSS styles the box, not the role.

## Reduced motion

Covered in full in [`motion.md`](./motion.md): a single global
`prefers-reduced-motion: reduce` override collapses all animations and
transitions to `1ms`, applied once and inherited everywhere — no
per-component opt-in required.

## Forced colors (Windows High Contrast Mode)

SpartaCSS includes a `@media (forced-colors: active)` block in
`sparta-accessibility.css` that adds explicit borders to components whose
default appearance relies on background-color or shadow alone to convey
their boundary — under forced-colors, background/shadow are typically
suppressed by the user agent, so a border is the fallback that keeps the
element's edge visible:

```css
@media (forced-colors: active) {
  .sp-button, .sp-input, .sp-select, .sp-textarea { border: 2px solid ButtonText; }
  .sp-badge, .sp-chip { border: 1px solid ButtonText; }
  .sp-alert, .sp-modal__content, .sp-drawer { border: 2px solid ButtonText; }
  .sp-card { border: 1px solid ButtonText; }
}
```

`ButtonText` is a forced-colors system keyword, not a SpartaCSS token — it
resolves to whatever the user's OS/browser high-contrast theme defines, by
design, so these borders stay correct under any forced-colors palette the
user has chosen.

---
Source: `src/core/sparta-accessibility.css`
