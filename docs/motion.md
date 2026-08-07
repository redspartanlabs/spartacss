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

SpartaCSS enforces reduced motion **globally**, not per-component. The
single source of truth is this block in `sparta-accessibility.css`:

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

What this means in practice:

- **Every** animation and transition in SpartaCSS — component-specific or
  not — is collapsed to effectively instant (`1ms`) when the user's OS/
  browser signals a reduced-motion preference. No component needs its own
  `@media (prefers-reduced-motion)` block to opt in; it's handled once,
  centrally, and applies universally via the universal selector.
- Elements still change state (a Modal still opens, a Tooltip still
  appears) — only the *animated transition* between states is suppressed,
  not the state change itself.
- Individual component docs that mention "respects reduced motion" (e.g.
  Tooltip) are describing this same global rule, not a separate
  per-component implementation — this document is the canonical
  explanation; component docs link here rather than re-deriving it.
- This is a CSS-only guarantee. SpartaCSS has no JavaScript to intercept,
  so there's nothing to "turn off" beyond what the OS-level media query
  already reports.

---
Source: `src/core/sparta-tokens.css` (transition tokens), `src/core/sparta-animations.css` (keyframes), `src/core/sparta-accessibility.css` (reduced-motion contract)
