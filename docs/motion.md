# Motion

SpartaCSS's motion is small and deliberate: a shared timing scale in
`src/core/sparta-tokens.css`, a handful of named keyframes in
`src/core/sparta-animations.css`, and one global reduced-motion override in
`src/core/sparta-accessibility.css` that every animated component obeys
automatically. There is no animation library and no JavaScript-driven
motion anywhere in SpartaCSS.

## Transition tokens

```css
--sp-duration-fast: 100ms
--sp-duration-base: 160ms
--sp-duration-slow: 260ms

--sp-ease: cubic-bezier(0.4, 0, 0.2, 1)
--sp-ease-out: cubic-bezier(0, 0, 0.2, 1)
```

Components reference these instead of hardcoding a duration or easing
curve, so a future change to the scale propagates everywhere consistently.
When writing your own transitions against SpartaCSS's classes, prefer the
same tokens for visual consistency:

```css
.my-widget {
  transition: opacity var(--sp-duration-base) var(--sp-ease);
}
```

There is no dedicated "slow" or "fast" semantic guidance beyond the names
themselves — `fast` for micro-interactions (hover/focus state changes),
`base` for the majority of component transitions (Tooltip, Accordion),
`slow` for larger surface changes (Modal/Drawer entrance/exit).

## Animation layer

`sparta-animations.css` defines six `@keyframes`, each named for what it
does:

| Keyframe | Purpose |
|---|---|
| `sp-spin` | Continuous rotation — Spinner. |
| `sp-shimmer` | Background-position sweep — Skeleton loading state. |
| `sp-fade-in` / `sp-fade-out` | Opacity 0↔1 — Toast, Alert Banner, Dialog entrance/exit. |
| `sp-slide-in-right` / `sp-slide-in-left` | Transform translateX — Drawer entrance, depending on side. |

These keyframes are referenced by name (`animation: sp-fade-in ...`) from
the component files that need them; they carry no timing of their own —
duration/easing is supplied at the call site using the transition tokens
above.

## The `prefers-reduced-motion` contract

Reduced motion is enforced in two layers. The baseline is a single global
rule in `sparta-accessibility.css` that applies to every element with no
opt-in required:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```

On its own, this collapses every animation and transition in SpartaCSS —
component-specific or not — to effectively instant (`1ms`) via the
universal selector, with no component needing its own block just to
receive that baseline.

**Several components go further** and define their own
`@media (prefers-reduced-motion: reduce)` block on top of the baseline —
Tooltip, Modal, Accordion, and Notifications (Toast/Dialog/Alert Banner).
These set `transition: none` or `animation: none` outright, rather than
relying on the 1ms collapse, typically because the component also needs
to reset an animated property (e.g. Modal's `opacity`/`transform`) to its
resting value so no partial-transition frame is visible even briefly. Where
a component doc mentions "respects reduced motion," check that component's
own source for whether it relies on the global baseline alone or defines
its own block — this document describes the mechanism, not which
components use which layer.

Two things hold regardless of which layer applies:

- Elements still change state (a Modal still opens, a Tooltip still
  appears) — only the *animated transition* between states is suppressed,
  not the state change itself.
- This is a CSS-only guarantee. SpartaCSS has no JavaScript to intercept,
  so there's nothing to "turn off" beyond what the OS-level media query
  already reports.

---
Source: `src/core/sparta-tokens.css` (transition tokens), `src/core/sparta-animations.css` (keyframes), `src/core/sparta-accessibility.css` (reduced-motion contract)
