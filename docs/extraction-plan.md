# SpartaCSS v1 Source Extraction Plan

**Status:** `spartacss.css` (core) and `sparta-icons.css` (icon system) both extracted to `src/styles/`. `sparta-notifications.css` extraction has not started.

**ICON SLOTS duplication — resolved:** `spartacss.css` contained an "ICON SLOTS" section (base `.sp-icon` class plus `.sp-icon--xs` through `.sp-icon--2xl` size modifiers) byte-identical to the same classes in `sparta-icons.css`. Ownership was confirmed as belonging to `sparta-icons.css` — its own comments already self-declared this exact code "the single authoritative .sp-icon definition" and "single authoritative block," and ADR-0001 Decision 4 already names the icon system as its own package-boundary component separate from core. The 44-line duplicate block was removed from `src/styles/spartacss.css`; `sparta-icons.css` was extracted unmodified. Core's separate, non-duplicated per-component icon-color rules (Select, Accordion, Modal close, Drawer close, Navbar toggle, Toast close, Chip remove, Alert) were left untouched — they don't duplicate anything in the icon system, they just set `color` on icons rendered inside specific core components.

**Toast cleanup, as actually applied:** removed the self-contained legacy component block (`.sp-toast-stack`, `.sp-toast`, and their modifiers/parts) and the two duplicate keyframes (`sp-toast-in`, `sp-toast-out`). Also removed one dangling reference to `.sp-toast-stack` inside a `@media print` selector list (a direct consequence of removing that class — left in place it would have been a reference to a deleted selector). Left untouched: the `--sp-z-toast` token and a `.sp-toast__close { color: ... }` rule, both of which are still used by the canonical Toast in `sparta-notifications.css` via the shared class name/token.

This document inventories the existing SpartaCSS v1 implementation and defines what belongs in this repository. It is not an ADR; ADR-0001 (`docs/adr/0001-package-architecture.md`) records the accepted architecture this plan implements.

---

## 1. Current SpartaCSS File Locations

**Correction to initial framing:** the v1 source does not live inside the RedSpartan HQ repository — that repository contains only `LICENSE`, `README.md`, and `CLAUDE.md`. The actual v1 source lives outside any git repository, at:

```
/Users/tylerjohnson/Projects/sparta-samples/
├── index.html                       (demo/preview — not part of the package)
└── styles/
    ├── spartacss.css                (core: tokens, reset, layout, components — v1.2 banner)
    ├── sparta-icons.css             (icon system — v1.8 banner)
    └── sparta-notifications.css     (notifications feature module — v1.0 banner)
```

This location should be re-confirmed as the complete and correct v1 source before extraction begins (flagged previously, still unresolved).

---

## 2. Design Token Inventory

All tokens live in `spartacss.css`'s `@layer tokens`, scoped to `:root` with a `[data-theme="light"]` / `.sp-light` override block:

- **Color** — brand (`--sp-color-primary`/`secondary`, each with `-hover`/`-active`/`-subtle`), semantic (`success`/`warning`/`error`/`info`, same hover/active/subtle pattern)
- **Surface** — `--sp-bg-base`/`surface`/`elevated`/`overlay`
- **Text** — `--sp-text-primary`/`secondary`/`muted`/`disabled`/`inverse`/`on-color`
- **Border** — `--sp-border`/`light`/`strong`/`focus`
- **Typography** — font family/mono, `--sp-text-xs` through `3xl`, font-weight scale, line-height scale
- **Spacing** — `--sp-space-0` through `8`
- **Radius** — `sm`/`md`/`lg`/`xl`/`full`
- **Shadow** — `sm`/`md`/`lg`/`focus`
- **Transitions** — duration scale (`fast`/`base`/`slow`), easing functions
- **Z-index** — a full stacking scale (`base` through `tooltip`)
- **Icon tokens** — two formally documented families: `--sp-icon-mask-*` (mask-image only, shared 2+ consumers or named foundational primitives — `x`, `chevron-down`, `check`) and `--sp-icon-bg-*` (background-image only, color baked in, currently one token: `check-white`). This family split is itself a documented, deliberate architectural policy inside the source, not incidental.

## 3. Reset/Base Layer Inventory

`@layer reset` in `spartacss.css`: box-sizing normalization, `html`/`body` base rendering (font smoothing, base typography), form-element inheritance (`button`/`input`/`select`/`textarea`), button/link resets, `img`/`svg`/`video` display defaults, list-style removal, heading weight/line-height defaults. Small, standard, self-contained.

## 4. Layout Utility Inventory

`@layer layout` in `spartacss.css`: `.sp-container` (with `sm`/`md`/`lg`/`fluid` variants and a responsive padding breakpoint), `.sp-grid` (column-count and gap variants, with a responsive collapse to single column), `.sp-flex` (direction/wrap/align/justify/gap variants, plus `flex-1`/`flex-none`/`flex-shrink-0`), `.sp-stack` (gap variants), `.sp-center`, display utilities (`block`/`inline`/`inline-block`/`inline-flex`/`hidden`/`invisible`), width/height utilities, and padding/margin utility classes (`p-*`, `px-*`, `py-*`, `m-*`, `mt-*`, `mb-*`).

## 5. Component Inventory

`@layer components` in `spartacss.css` contains roughly 34 components, identified directly from section headers: Button, Card, Form Primitives, Input, Select, Textarea, Checkbox & Radio, Toggle Switch, Badge, Alert, Tooltip, Modal, Drawer, Accordion, Table, Tabs, Breadcrumbs, Pagination, Dropdown, Spinner, Progress Bar, Skeleton, **Toast**, Avatar, Chip/Tag, Divider, Empty State, Code Block, Field, Link, List, Kbd, Page Header, Stat, and Navbar.

Two notes on completeness:
- **Toast** here is the legacy duplicate scheduled for removal per ADR-0001 Decision 5 — see Section 9.
- **Navbar** (`.sp-navbar`, `.sp-navbar__toggle`) was found via direct class search, not via the same section-header pattern used for the rest of this list — its comment-header formatting may differ from the other components. Worth a quick visual check during extraction to confirm nothing else was missed the same way.
- The `@layer accessibility` declared alongside the others was not deeply inventoried in prior review (beyond a `prefers-reduced-motion` block already found inside the Modal component itself) — its full contents should be confirmed during extraction rather than assumed.

## 6. Icon System Inventory

`sparta-icons.css` — self-described "framework-agnostic, no dependencies." Structure: a base `.sp-icon` class plus size modifiers (`xs` through `2xl`) and alignment utilities; component-integration rules for Button and Alert (Drawer's integration section is deliberately empty, documented in place); an accessibility rule (`aria-hidden` → `pointer-events: none`); and a "Mask Icon Engine" of ~86 icons rendered via `::before` pseudo-elements, using an explicit enumerated class list (not a wildcard attribute selector — a documented, deliberate fix for a prior selector bug). Icons are grouped into System UI, Semantic/Feedback, Navigation & Action, Marketing & Content, and Extended categories. A subset of icons (`x`, `chevron-down`, `check`, `trending-up`/`down`, `arrow-right`, `external-link`, `sort-asc`/`desc`) source their shapes from `spartacss.css`'s `--sp-icon-mask-*` tokens rather than carrying their own literal SVGs — this is the one real cross-file coupling point (see Section 8). The file carries an extensive, genuinely useful changelog documenting past fixes and architectural decisions (e.g., the token-family policy, the selector-enumeration fix).

## 7. Feature Module Inventory (Notifications/Toast)

`sparta-notifications.css` — explicitly declares in its own header comment: `Requires: spartacss.css (core tokens)`. Contains:
- **Toast** — `.sp-toast-wrap` (6 position variants), `.sp-toast` (success/error/warning/info/neutral), icon/body/title/text/action/close/progress-bar parts, entrance/exit animations. **This is the canonical Toast implementation per ADR-0001 Decision 5.**
- **Alert Banner** — `.sp-alert-banner` (success/error/warning/info/neutral), full-width and compact variants, dismiss/action sub-parts.
- **Confirm/Dialog** — `.sp-dialog-overlay` / `.sp-dialog` (sm/lg sizes), icon+title header, optional "type to confirm" input pattern, footer button variants scoped locally to the dialog (so dialogs render correctly even before core button styles load).
- A `prefers-reduced-motion` block disabling all of the above module's animations.

This module has zero tokens of its own — every visual property resolves through `spartacss.css`'s token layer.

## 8. Dependencies and Coupling Points

- **`sparta-notifications.css` → `spartacss.css`**: one-directional, explicit (declared in the module's own header). It supplies zero components that `spartacss.css` needs back.
- **`sparta-icons.css` → `spartacss.css`**: one-directional, partial — only 8 of ~86 icons source their shape from core tokens (`--sp-icon-mask-*`); the rest are self-contained literal SVGs within the icons file.
- **`spartacss.css`'s own components → its own tokens**: several core components (Modal close, Drawer close, Accordion trigger, Stat delta, standalone/external Link, Table sort) consume the same `--sp-icon-mask-*` tokens directly via `mask-image`, without going through `sparta-icons.css`'s class system at all. The tokens layer is genuinely shared substrate between core and icons, not a one-way dependency of icons on core's components.
- **No JavaScript, no framework bindings, anywhere** — confirmed in the earlier source inventory and unchanged.
- **`spartacss.css` is the only file with no external dependency** — it is self-contained and must exist before the other two are meaningful.
- **`.sp-alert` (core) vs. `.sp-alert-banner` (notifications module)** — two distinct, non-colliding class names but conceptually overlapping "alert" patterns. Not a conflict requiring cleanup, just a documented overlap worth being aware of.

## 9. Extraction Risks or Cleanup Needed

1. **Toast duplication (required cleanup)** — `spartacss.css` contains a legacy, colliding `.sp-toast`/`.sp-toast-stack`/keyframe implementation that must be removed during extraction, per ADR-0001 Decision 5. `sparta-notifications.css`'s version is canonical and untouched.
2. **Version banner reconciliation (open)** — the three files carry independent internal version banners (v1.2 / v1.8 / v1.0) that need to be reconciled against this repository's own `v1.0.0` release; not yet decided how that mapping is expressed.
3. **Icon shape provenance/licensing (open, deferred)** — flagged in the original source inventory as needing verification before external distribution; per your prior decision this is tracked as a pre-`v1.0.0` release check, not a blocker to extraction itself.
4. **Confirm `sparta-samples` is the complete v1 source (open)** — still not explicitly confirmed.
5. **Navbar section formatting / accessibility layer coverage (minor, verify during extraction)** — see Sections 5 and the accessibility-layer note; likely nothing more than a documentation-completeness check, not a functional risk.

## 10. Recommended Extraction Order

1. **`spartacss.css` first** — the foundational, dependency-free file. Apply the Toast cleanup (Section 9, item 1) as part of this same step, since it only touches this file.
2. **`sparta-icons.css` second** — depends only on core tokens, which now exist post-step 1.
3. **`sparta-notifications.css` third** — explicitly depends on core tokens (per its own header) and its Toast is the surviving canonical implementation; extracting it after step 1's cleanup avoids any transient state where two competing Toast implementations exist side by side.
4. **`index.html` is not extracted** — excluded from the package per ADR-0001 Decision 4.
5. After all three land, a build-verification pass (already planned in the repository-initialization checklist) should confirm no other collisions exist between files.

This order follows the dependency direction found in Section 8 (core → icons → notifications) and is the reason it's sequenced this way rather than alphabetically or by file size.
