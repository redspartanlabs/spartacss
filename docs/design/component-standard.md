# SpartaCSS Component Standard v1.0

**Status:** Proposed (2026-09-11)

This document is the normative specification for SpartaCSS UI components: what
a component is, how it is named, styled, layered and made accessible, and what
its documentation must state. See
[ADR-0005](../adr/0005-canonical-ui-component-standard.md) for why this
standard exists and what it deliberately leaves open.

It codifies the architecture SpartaCSS already has. It does not rename,
remove or restyle anything that ships today. Where the existing library
departs from a rule below, the departure is recorded in §17 rather than
treated as permission for new work to depart the same way.

---

## Normative language

**MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and **MAY** are used in the
sense of RFC 2119 and RFC 8174, and only where capitalized.

- Rules apply in full to **new** components, selectors and documentation.
- Rules apply to **existing** shipped selectors only where the library already
  conforms. An existing selector that does not conform is grandfathered
  (§17) and remains supported exactly as documented; changing it is governed
  by [ADR-0002](../adr/0002-versioning-and-stability-policy.md), not by this
  standard.
- Documentation rules (§15–§16) apply to every component page, existing or
  new.
- These keywords state this standard's own rules. Component pages do not use
  them; a page distinguishes its requirements from its guidance as §15.2
  defines.

---

## 1. Scope and relationship to ADR-0002

This standard does not amend ADR-0002. ADR-0002 defines what counts as a
breaking change to the **supported, documented** API surface. This standard
defines how that surface is drawn for UI components: which selectors a
component page commits to, and in what status (§16), and which content on a
page is contractual and which is advisory usage guidance (§15.2).

Where a rule below cites ADR-0002, it cites what ADR-0002 states. Where this
standard applies ADR-0002 to a case its text does not address, the rule says
so explicitly; those readings are recorded in
[ADR-0005](../adr/0005-canonical-ui-component-standard.md) under
"Relationship to ADR-0002."

Where this standard and ADR-0002 appear to disagree, ADR-0002 governs.

---

## 2. Classification

Every selector, class and custom property is classified on three independent
axes. The axes are deliberately separate: a thing's *kind*, where it is
*shipped*, and how *stable* it is are different questions.

### 2.1 Kind

| Kind | Definition | Examples | Layer |
|---|---|---|---|
| **Component** | A recognizable UI unit with a named `sp-` block and a documented API | Button, Card, Modal, Tabs, Toast | `components` |
| **Pattern** | A page-level composition of components and layout primitives, documented and styled like a component | Page Header, App Shell | `components` |
| **Layout primitive** | Arranges its children; has no visual identity of its own | `.sp-container`, `.sp-stack`, `.sp-cluster`, `.sp-grid` | `layout` |
| **Utility** | A single-purpose class that adjusts one property, usable on any element | `.sp-flex*`, `.sp-p-*`, `.sp-hidden`, `.sp-sr-only` | `layout` or `accessibility` |
| **Token** | A `--sp-*` custom property, or a theme hook that switches token values | `--sp-color-primary`, `[data-theme]`, `.sp-light` | `tokens` |

Reset and base styles are element-level rules with no classes. They are part
of core, not a kind of API.

### 2.2 Organization and distribution

- A **component group** is source organization only. `src/modules/overlay/`,
  `src/modules/data/` and `src/modules/docs/` group related components; their
  contents ship in `spartacss.css` like any other component.
- A **feature module** is a separately exported bundle with its own entry in
  `package.json` `exports`: currently Icons (`sparta-icons.css`) and
  Notifications (`sparta-notifications.css`), both also included in
  `sparta-all.css`. ADR-0001 Decision 4 names these feature modules.
- "Module" MUST NOT be used as a third kind of UI thing. The contents of a
  feature module are classified by §2.1 like everything else: Toast, Alert
  Banner and Dialog are components delivered by the Notifications feature
  module.
- New documentation SHOULD say "component group" or "feature module" rather
  than the bare word "module" wherever the distinction matters. The existing
  directory structure is not changed by this standard.

### 2.3 Stability status

| Status | Meaning | Contract |
|---|---|---|
| **Supported** | Documented as part of the component's public API | ADR-0002's supported, documented surface |
| **Legacy / FROZEN** | A historical API preserved for compatibility and explicitly marked `FROZEN` in source | ADR-0002 rule 7: changing it is always breaking, at any version |
| **Internal** | An implementation detail, not part of the public API | Outside ADR-0002's supported, documented surface, so its breaking-change rules do not apply |

Status is defined in full in §16.

---

## 3. What makes a canonical component

A canonical SpartaCSS component:

1. **MUST** be a recognizable UI unit with a named block, `.sp-<block>` (§4).
2. **MUST** have one authoritative owning source file under `src/components/`,
   `src/modules/<group>/` or `src/patterns/` (§14).
3. **MUST** place its Supported API in `@layer components` (§10).
4. **MUST** express its entire API as classes: block, elements, variant
   modifiers and state modifiers. It **MUST NOT** require JavaScript, and
   **MUST NOT** require a data attribute for its Supported API.
5. **MUST** resolve reusable and themed design values through global
   `--sp-*` tokens, except for literals permitted by §9.
6. **MUST** leave every state change to the consumer's own script, and
   **MUST NOT** assume, inject or depend on ARIA attributes being present
   (§6).
7. **MUST** have its own documentation page meeting §15, with a stability
   status (§16).

A class present in CSS is not a component by virtue of existing. Classes that
exist to make a component work, but are not documented as its API, are
Internal (§16).

---

## 4. Naming and anatomy

### 4.1 Grammar

| Part | Form | Example |
|---|---|---|
| Prefix | `sp-` on every class | `.sp-card` |
| Block | kebab-case | `.sp-page-header` |
| Element | `block__element` | `.sp-card__header` |
| Block modifier | `block--modifier` | `.sp-card--interactive` |
| Element modifier | `block__element--modifier` | `.sp-tabs__tab--active` |

- Every class **MUST** begin with `sp-`.
- Block, element and modifier names **MUST** be kebab-case.
- Elements **MUST NOT** be nested: `.sp-a__b__c` is not permitted. An element
  that belongs inside another element is still named against the block
  (`.sp-dialog__title-group`, not `.sp-dialog__header__title`). The library
  has no nested elements today.
- A modifier **MUST NOT** be used without its block or element class on the
  same element.

### 4.2 Companion blocks

A companion block is a separately named block, `sp-<block>-<role>`, used in
place of an element. It is a deliberate, BEM-adjacent mechanism, not a
naming error. A companion block **MAY** be used when:

- **it contains several instances of the parent block**, which a BEM element
  cannot do — `.sp-avatar-group`, `.sp-skeleton-group`, `.sp-toast-wrap`,
  `.sp-kbd-combo`, `.sp-form-group`, `.sp-table-wrapper`; or
- **it is a separate surface rendered alongside or around the parent**
  rather than a part inside it — `.sp-dialog-overlay`, and the legacy
  `.sp-modal-backdrop`; or
- **it is documented as a distinct component** that shares a name stem with
  another — `.sp-alert-banner` is not a variant of `.sp-alert`.

A part that sits inside a single parent block **SHOULD** be an element
(`.sp-<block>__<part>`), not a companion block. Existing descendant parts
named as companion blocks are grandfathered (§17).

### 4.3 Helpers outside the grammar

New Supported API **MUST NOT** introduce block-less helper classes — classes
that modify a component but are not named against its block. The existing
documented helpers (`.sp-col-*`, `.sp-sortable`, `.sp-sort-asc`/`-desc` on
Table, and the `.sp-token-*` family on Code) remain Supported and are
grandfathered (§17).

Helper classes that exist to make a component work but are not documented
(for example `.sp-select-wrapper` and `.sp-select-icon`) are Internal until a
documentation decision classifies them. Documentation **MUST NOT** promote a
class to Supported without that decision.

---

## 5. Variants and states

BEM's `--modifier` syntax expresses both variants and states. There is no
second syntax, and new API **MUST NOT** introduce one.

- A **variant** changes a component's presentation or configuration and is
  chosen by the author when writing markup: colour, size, placement, layout,
  shape, or motion speed. Examples: `--primary`, `--sm`, `--vertical`,
  `--left`, `--fast`.
- A **state** represents a runtime or interaction condition that the
  consumer's script adds and removes: `--open`, `--active`, `--loading`,
  `--closing`.

Documentation **MUST** keep the two apart: variants under **Variants**, states
under **States** (§15). The distinction is semantic, carried by the
documentation rather than by the class name.

Where native element state exists, a state **SHOULD** be expressed with the
native pseudo-class rather than a class (§6.2). A variant **MUST NOT** be used
to represent a condition that changes at runtime.

---

## 6. State model and the JavaScript boundary

SpartaCSS ships no JavaScript and never will (ADR-0001 Decision 3). State is
therefore divided as follows.

| Responsibility | Owner |
|---|---|
| Presentation of every state, and CSS-only interaction (`:hover`, `:focus-visible`, `:focus-within`, `:checked`, `:disabled`) | SpartaCSS |
| Adding and removing state classes in response to user interaction | Consumer JavaScript |
| ARIA roles, states and properties, and keeping them in step with visual state | Consumer |
| Focus trapping, `Escape` handling and return focus, where the pattern requires them | Consumer JavaScript |

### 6.1 State classes

- A non-native state **MUST** be expressed as a state modifier class on the
  block or element it describes: `.sp-modal--open`,
  `.sp-accordion__item--open`, `.sp-tabs__tab--active`.
- Components **MUST NOT** require ARIA attributes or data attributes to
  render a state. Visual state is class-driven.
- Because visual state and semantic state are expressed separately, the
  consumer is responsible for keeping them synchronized — for example
  `.sp-accordion__item--open` together with `aria-expanded="true"` on its
  trigger. The component page **MUST** say which ARIA state accompanies each
  state class (§15).

### 6.2 Native state

- Where the element has native state, the component **SHOULD** style the
  native pseudo-class: `:disabled`, `:checked`, `:focus-visible`,
  `:focus-within`.
- A state class **MAY** be added where the native state cannot apply, or as
  an alternative to it — `.sp-pagination__link--disabled` exists because
  links cannot take `disabled`; `.sp-tabs__tab--disabled` is offered
  alongside native `disabled` on a `<button>`.
- A component **MAY** style an ARIA attribute that the consumer has already
  set, as a styling hook, where no native state exists:
  `.sp-button[aria-disabled="true"]`,
  `.sp-dropdown__item[aria-disabled="true"]` and
  `.sp-icon[aria-hidden="true"]` do this today.
  Such a hook styles a state the consumer declared; it does not make
  SpartaCSS the owner of that attribute, and the class-based API **MUST**
  remain sufficient on its own.

### 6.3 Pure-CSS interaction

A component whose interaction is fully expressible in CSS **SHOULD** use
CSS-only interaction and require no script at all. Supported examples:
Tooltip and Dropdown open on `:hover` and `:focus-within`.

---

## 7. State vocabulary

The following names apply to **new** state modifiers. Existing public state
selectors that differ remain supported and are grandfathered (§17). This
standard does not rename any of them.

| State | Meaning | Typical accompanying ARIA (consumer-owned) |
|---|---|---|
| `open` | A disclosure, overlay or collapsible region is shown | `aria-expanded="true"` on its control |
| `active` | The current item in a navigational or tabbed set — the one matching the current location or shown panel | `aria-current`, or `aria-selected` on a tab |
| `selected` | An item the user has chosen in a selectable set, independent of navigation | `aria-selected` or `aria-pressed` |
| `disabled` | Non-interactive, where native `:disabled` cannot apply | `aria-disabled="true"` |
| `closing` | An exit transition is running before `open` is removed | — |
| `loading` | An operation is in progress | `aria-busy="true"` where appropriate |

Validation states on form controls use the semantic colour names `error`,
`success` and `warning` (§8).

- A new state **MUST** use a name from this table when one fits.
- A new state **SHOULD** name the positive, non-default condition (`--open`),
  not its inverse (`--hidden`).
- Two classes **MUST NOT** be introduced for the same state. Aliases that
  already exist are grandfathered.

---

## 8. Semantic colour vocabulary

| Name | Meaning |
|---|---|
| `primary`, `secondary` | Brand emphasis |
| `success`, `warning`, `error`, `info` | Status semantics. `error` also covers validation failure |
| `danger` | **Destructive action** on an interactive control: delete, remove, discard |
| `neutral` | Non-semantic emphasis with no status meaning |
| `muted` | De-emphasis |

- `error` and `danger` are different meanings. A new variant **MUST** use
  `error` for a status or validation condition, and `danger` for a control
  whose action is destructive.
- No `--sp-color-danger` token exists. `danger` variants resolve through the
  `--sp-color-error*` tokens; the distinction is carried by the class name.
- A component **MUST NOT** be required to implement every semantic colour.
  It **SHOULD** implement the subset that is meaningful for it, and its page
  **MUST** list exactly the variants that exist.
- Existing uses that depart from these meanings are grandfathered (§17).

---

## 9. Tokens and literals

- Global `--sp-*` tokens are the primary design-system contract. A component
  **MUST** consume global tokens for every reusable or theme-dependent design
  value — colour, surface, text, border colour, spacing, typography, radius,
  shadow, z-index, and motion timing.
- A component **MUST NOT** define or redefine a global `--sp-*` token.
  Consumers override tokens; components consume them.
- A value used in exactly one place **MAY** remain a local literal, under the
  existing policy in `src/core/sparta-tokens.css`: "a token with a single
  consumer isn't shared, it's just indirection." Structural values with no
  token scale, such as border widths, are literals throughout the library.
- A literal **MUST NOT** be used for a theme-dependent value where a token
  exists. It would not follow the active theme.
- A component-scoped custom property is exceptional. One **MAY** be added
  only as a documented consumer knob or per-instance override hook, and its
  page **MUST** document it. The library has two: `--sp-breadcrumb-sep` and
  the `--sp-grid-min-item` override on `.sp-grid--auto`.
- Documentation **MUST NOT** claim that every value in the library already
  comes from a token. Existing literals are recorded in §17 for
  classification; this standard does not classify them.

---

## 10. Cascade layers

### 10.1 Layer order

`src/sparta.css` declares:

```css
@layer tokens, reset, layout, components, accessibility;
```

| Layer | Holds |
|---|---|
| `tokens` | `--sp-*` custom properties and theme overrides |
| `reset` | Element-level reset |
| `layout` | Layout primitives and layout utilities |
| `components` | Components, patterns, and both feature modules |
| `accessibility` | Shared focus ring, screen-reader utilities, reduced motion, forced colors, print |

- A component's Supported API **MUST** be placed in `@layer components`.
- New selectors **MUST NOT** be unlayered. The only unlayered rules in the
  library are the legacy `FROZEN` blocks (§10.2).
- Layer placement is part of the stability contract. Changing a class's layer
  in a way that alters which rule wins is breaking under ADR-0002 rule 5.

### 10.2 Consequences consumers need to know

These follow from the layer order and are part of the current architecture.
Component and foundation documentation **SHOULD** state them where relevant.

1. **Unlayered consumer CSS outranks all layered SpartaCSS, regardless of
   specificity or load order.** This is how consumer overrides win.
2. **Layout utilities can lose to component rules.** `layout` sits below
   `components`, so a utility cannot override a property a component sets:
   `<button class="sp-button sp-hidden">` remains visible, because
   `.sp-button` sets `display`.
3. **The native `hidden` attribute does not hide a component that sets
   `display`.** No `[hidden]` rule exists in SpartaCSS, and any author
   style outranks the browser's default. Components hide content with state
   classes instead (e.g. `.sp-tabs__panel--hidden`).
4. **Legacy `FROZEN` rules are unlayered** — the legacy Tooltip, Accordion
   and Modal blocks, "kept unlayered exactly as before." They therefore
   outrank every layer, including `accessibility`. This is their existing
   precedence; changing it would be breaking under ADR-0002 rule 5 (layer
   placement and precedence) and rule 7 (`FROZEN` selectors).

Whether consequences 2–4 are desirable is recorded for later review in §17.
This standard does not change them.

---

## 11. Accessibility

SpartaCSS supplies accessibility-related CSS. The consumer supplies semantics
and behavior. The full contract is in
[`accessibility.md`](../accessibility.md); this section states what every
component must meet and document.

### 11.1 What SpartaCSS provides

- A visible `:focus-visible` indicator for every focusable element, from the
  shared rule in `src/core/sparta-accessibility.css`. A component that
  replaces the shared ring with its own treatment (form controls and Button
  do) **MUST** provide an equally visible one and **MUST** be excluded from
  the shared rule so the two do not conflict.
- A reduced-motion baseline (§13).
- Forced-colors fallbacks where a component's boundary relies on background
  or shadow alone.
- Screen-reader and skip-link utilities.

### 11.2 What the consumer provides

- Semantic HTML: the expected element for each component.
- ARIA roles, states and properties, kept in step with visual state (§6.1).
- Interactive state changes, focus trapping, `Escape` handling and return
  focus, where the pattern requires them.

### 11.3 Component requirements

- A new component **MUST NOT** remove a visible focus indicator without
  replacing it.
- A component whose focus indicator relies on `box-shadow` or `background`
  **SHOULD** have a forced-colors fallback. Forced-colors mode suppresses
  both.
- A component **MUST NOT** inject ARIA or imply a role through its class name.
- Changing accessibility behavior in a way that narrows or alters the
  supported contract is breaking under ADR-0002 rule 6.

---

## 12. Responsive behavior

- The canonical viewport breakpoints are **`640px`** and **`768px`**, as
  documented in [`layout.md`](../layout.md). A component **MUST NOT**
  introduce any other viewport breakpoint.
- Components **SHOULD** be intrinsically responsive — adapting through
  wrapping, flexible sizing and `max-width` rather than media queries —
  wherever practical. Most of the library is.
- A component that does have breakpoint-specific behavior **MUST** document
  what changes and at which width (§15). Navbar (`768px`) and Page Header
  (`640px`) do this today.
- A page **MUST NOT** imply responsive behavior that the component does not
  have.

---

## 13. Motion

- Reduced motion has two layers (see [`motion.md`](../motion.md)): a global
  baseline in `src/core/sparta-accessibility.css` that collapses every
  animation and transition to `1ms`, and component-level
  `@media (prefers-reduced-motion: reduce)` blocks that some components add
  to remove motion outright or reset an animated property to its resting
  value.
- Every component inherits the baseline with no opt-in. A component **MAY**
  add its own reduced-motion block where the baseline alone would leave a
  visible partial transition.
- Transitions and animations **SHOULD** use the motion tokens
  (`--sp-duration-*`, `--sp-ease*`) and the named keyframes in
  `src/core/sparta-animations.css`.
- A motion variant **MUST NOT** reuse a motion token's name for a different
  duration.
- A component page **MUST** describe its meaningful motion — what animates,
  and any component-specific reduced-motion behavior (§15).
- Changing what reduced motion disables is breaking under ADR-0002 rule 6.

---

## 14. Source ownership

A component has **one authoritative owning implementation file**. Its block,
elements and modifiers are defined there. "Single authoritative source" does
not mean that every rule affecting the component lives in that one file.

Cross-cutting concern files **MAY** contribute styles to a component:

| Concern file | Contributes |
|---|---|
| `src/core/sparta-accessibility.css` | Shared focus ring and its exclusions, skip link, screen-reader utilities, reduced-motion baseline, forced-colors borders, print rules |
| `src/core/sparta-utilities.css` | Global scrollbar styling; colour and state rules for component control icons (close buttons, toggles, chevrons, select icon, chip remove) |
| `src/modules/icons/sparta-icons.css` | The icon system, and icon integration inside Button, Alert and Drawer |

- A concern file **MUST NOT** define a component's structure; it contributes
  only its concern.
- The same selector **MUST NOT** be defined in two files unless the duplication
  is explicitly justified. An unjustified duplicate is an implementation
  defect.
- The component page's `Source:` footer **MUST** name the owning file first,
  then every concern file that materially contributes to the component (§15).

---

## 15. Documentation contract

Each component or pattern has one page in `docs/`. A page describes both the
component's technical contract and how to use the component correctly. The
structure below codifies the one most pages already share.

### 15.1 Scope

- These rules apply to every SpartaCSS component and pattern, including the
  components a feature module delivers.
- Layout primitives, utilities and tokens are not component pages; they are
  documented in the foundation pages ([`tokens.md`](../tokens.md),
  [`layout.md`](../layout.md), [`motion.md`](../motion.md),
  [`accessibility.md`](../accessibility.md)).
- These rules govern SpartaCSS's documentation only.

### 15.2 Contractual and advisory content

Every statement on a component page is one of three kinds:

| Kind | What it states | Force |
|---|---|---|
| **Provided behavior** | What SpartaCSS's own CSS does: visual states, CSS-only interaction, focus styling, reduced-motion, forced-colors and responsive behavior, and the behavior of documented selectors | Contractual |
| **Integration requirement** | What the consumer must do for the component to work correctly or accessibly: the expected element and markup, which state classes to add and remove and where, the ARIA to keep in step with visual state, and focus management, focus trapping, `Escape` handling and return focus where the pattern needs them | Contractual |
| **Usage guidance** | How to use the component well: when to choose it over an alternative, composition, common misuse, and wording where it matters | Advisory |

*Contractual* content is documented content that ADR-0002's rules can
protect; whether a particular change to it is breaking is for ADR-0002 to
determine. *Advisory* content is outside the stability contract. See
[ADR-0005](../adr/0005-canonical-ui-component-standard.md), "Relationship to
ADR-0002", including the case that record leaves open.

**The test.** A statement is an integration requirement if ignoring it would:

- break the component;
- make it inaccessible;
- violate its documented semantic or integration contract; or
- cause documented component behavior to fail.

If a reasonable application could make a different choice without any of those
consequences, the statement is usage guidance. A choice that depends on the
application's product, domain or brand is neither: it belongs to the
application (§15.6).

- **Requirement:** The trigger must be a `<button>`.
- **Guidance:** Prefer a Drawer when the user benefits from keeping the
  surrounding page in view.

**Marking.**

- An integration requirement **MUST** be written as a requirement ("must",
  "must not", "requires").
- Advice **MUST NOT** be written in requirement language.
- Everything in a page's **Usage guidance** section is advisory. That section
  **MUST NOT** contain requirements.
- An advisory statement anywhere else on the page **MUST** begin with
  **Guidance:** — except in **When to use which**, where each distinction is
  labelled individually (§15.5).

### 15.3 Required sections

In this order, on every page:

| # | Section | Contents |
|---|---|---|
| 1 | **Purpose** | What the component is and what it is for |
| 3 | **Usage** | A minimal, correct markup example using the expected semantic element |
| 4 | **Class API** | The block and each element, and what each is for |
| 5 | **Variants** | Every variant modifier that exists, grouped by kind (colour, size, placement, …). "None." if there are none |
| 6 | **States** | Every state modifier and native state the component styles, and which ARIA state the consumer should pair with each. "None." if there are none |
| 7 | **Accessibility** | The expected element, keyboard interaction for interactive components, focus-visible behavior, the ARIA the consumer must supply, and forced-colors behavior where relevant |
| 14 | **Stability** | The status of each part of the API (§16) |
| 15 | **Source** | The `Source:` footer (§14) |

### 15.4 Conditional and recommended sections

Placed at their numbered positions among the required sections, **whenever
they apply**:

| # | Section | Include when | Force |
|---|---|---|---|
| 2 | **When to use which** | A meaningful alternative exists (§15.5) | Each distinction labelled |
| 8 | **JavaScript responsibility** | The component has any state the consumer's script toggles. States exactly which class to add and remove, on which element, in response to what, and which focus or `Escape` behavior the consumer must implement | Contractual |
| 9 | **Motion** | The component animates or transitions | Contractual |
| 10 | **Responsive behavior** | The component has breakpoint-specific behavior | Contractual |
| 11 | **Usage guidance** | Recommended wherever component-specific best practice or common misuse is worth stating | Advisory |
| 12 | **Related** | A cross-link materially helps — a sibling component, a composing pattern. Inline links are also acceptable | — |
| 13 | **Legacy API** | The component has a Legacy / FROZEN API. Documents the legacy selectors fully, including their state classes and variants | Contractual |

### 15.5 When to use which

- A page **MUST** include **When to use which** wherever a meaningful
  alternative exists: a sibling component, or a native HTML element, that a
  reader could reasonably choose for the same need.
- Between two SpartaCSS components, the distinction **MUST** appear on both
  pages. Where the alternative is a native element, the component's page
  carries it.
- Each distinction **MUST** say which to choose and why, and **MUST** be
  labelled **Requirement:** where choosing wrongly would break semantics or
  accessibility, or **Guidance:** where it is a matter of fit.
- The rule is known to apply at least to these pairs. The pages themselves are
  written in the documentation conformance pass.

| Component | Alternative |
|---|---|
| Button | Link |
| Alert | Notifications (Toast, Alert Banner) |
| Drawer | Modal |
| Tooltip | Visible explanatory text |
| Tabs | Page navigation |
| Dropdown | Native `<select>` |

### 15.6 Knowledge, citations and product decisions

- A page **MAY** apply and summarize established design, accessibility and
  engineering knowledge as it bears on the component. It **MUST NOT**
  reproduce general theory.
- Where a page relies on an external normative authority, such as the
  WAI-ARIA Authoring Practices, WCAG or MDN, it **MAY** cite it. A citation
  **SHOULD** point to the specific pattern, criterion or reference relied on,
  and **MUST NOT** be added for decoration.
- The cross-cutting CSS/JavaScript/ARIA contract lives once, in
  [`accessibility.md`](../accessibility.md). A page **SHOULD** link it rather
  than restate it.
- A page **MUST** remain usable on its own. It **MAY** reference other
  RedSpartan documentation where relevant, but **MUST NOT** depend on it or
  on any HQ URL.
- **Product decisions belong to the application.** A page documents the
  component's own states — a Button's `--loading`, a form field's validation
  states, what Empty State renders. It **MUST NOT** prescribe
  application-wide policy, such as how loading appears across a product,
  whether destructive actions require confirmation, or when to show an empty
  state. It **MAY** offer considerations as guidance. A `danger` variant
  communicates destructive intent; it provides no confirmation behavior.

### 15.7 Rules

- A page **MUST NOT** document a class that does not exist.
- A page **MUST** document every Supported selector of its component.
- A page **MUST NOT** frame current behavior as a version-specific release
  note ("`0.5.0` adds…"). Version history belongs in `CHANGELOG.md`.
- Anatomy diagrams and per-component token inventories are **not required**.
  Components consume global tokens and have no component token API to list;
  [`tokens.md`](../tokens.md) documents the tokens.

### 15.8 Live examples

A page **MAY** designate one HTML example for optional live rendering by
consumers of the documentation. The decision is recorded in
[ADR-0007](../adr/0007-documentation-preview-contract.md).

- A page designates an example only with the marker: the info string of the
  example's fenced code block is `html preview`.

  ````markdown
  ```html preview
  <button class="sp-button sp-button--primary">Save</button>
  ```
  ````

- A page **MUST NOT** contain more than one marked example.
- A marked example **MUST** be a standalone HTML fragment: non-empty, not a
  whole document, without a `<script>` element, and without site-relative link
  targets. It **MUST NOT** depend on other content of its page.
- The marker grants permission and nothing more. A page **MUST** still present
  the example's code and explanation as ordinary documentation, and **MUST
  NOT** rely on any consumer rendering the example.
- A `preview` token in any other form (another language, another letter case,
  or an additional token) is malformed and **MUST NOT** appear.
- `scripts/verify-docs-preview.mjs`, run by `npm run verify`, checks the
  marker, the one-per-page limit and the content rules above.

---

## 16. Stability status

### 16.1 Assigning status

- **Supported** — every selector a component page documents as part of its
  API. This is ADR-0002's supported, documented surface, and ADR-0002's
  breaking-change rules apply to it in full.
- **Legacy / FROZEN** — a selector explicitly marked `FROZEN` in source, as
  ADR-0002 rule 7 requires. Changing one is always breaking, at any version.
  The existing markers are on the legacy Tooltip (`[data-tooltip]`,
  `.sp-tooltip--visible`), Accordion (`.sp-accordion__trigger`,
  `.sp-accordion__content--animated`) and Modal (`.sp-modal-backdrop`,
  `.sp-modal__dialog`) APIs.
- **Internal** — a class, custom property or selector that exists to make a
  component work and is not documented as its API. Examples:
  `--sp-icon-mask-*`/`--sp-icon-bg-*` (already described as internal in
  `tokens.md`), and the icon-integration rules in concern files.

### 16.2 Rules

- A page **MUST** state the status of its component's API in its
  **Stability** section. Where a page covers more than one status, it
  **MUST** say which selectors carry which.
- A selector **MUST NOT** be labeled Legacy / FROZEN unless it is marked
  `FROZEN` in source. Prose that calls something "frozen" does not confer the
  status.
- A shipped but undocumented class is **not Supported**. It **MUST** be either
  documented as Supported or labeled Internal by an explicit documentation
  decision; it is not promoted by default.
- **State modifiers.** ADR-0002 rule 1 covers removing or renaming "a public
  class selector or BEM part", and rule 2 covers removing or renaming "a
  public modifier (`--variant`) class". ADR-0002 does not mention state
  modifiers or distinguish them from variants. As its application of that
  contract, ADR-0005 treats a Supported state modifier exactly like a variant
  modifier under rules 1 and 2: removing or renaming one is treated as
  breaking. This is ADR-0005's reading, not text ADR-0002 contains.
- `.sp-flex` and the atomic layout utilities are **Supported**. Whether they
  also carry the Legacy / FROZEN guarantee is unresolved (§18). Until that is
  decided, documentation **MUST NOT** describe them as either carrying or
  lacking it.

---

## 17. Register of existing deviations

The existing library departs from this standard in the places below. Each is
classified as one of:

- **Grandfathered** — supported compatibility behavior. It stays as
  documented; whether a change to it is breaking is classified under
  ADR-0002.
- **To classify** — for a later conformance workstream to classify as an
  intentional literal, a defect, an additive fix, or a breaking change.
- **Review** — an architectural consequence recorded for later review.

This register is not a work order. Nothing in it is changed by this standard.

### 17.1 Naming and anatomy

| Deviation | Evidence | Class |
|---|---|---|
| Descendant parts named as companion blocks | `.sp-dialog-btn` (inside `.sp-dialog`), `.sp-kbd-sep` (inside `.sp-kbd-combo`) | Grandfathered |
| Block-less helpers | `.sp-col-center`, `.sp-col-right`, `.sp-col-nowrap`, `.sp-sortable`, `.sp-sort-asc`, `.sp-sort-desc` (Table); `.sp-token-*` (Code) | Grandfathered |

### 17.2 State vocabulary

| Deviation | Evidence | Class |
|---|---|---|
| `visible` used for "shown" | `.sp-backdrop--visible`; legacy `.sp-tooltip--visible` | Grandfathered |
| `active` used for "shown" | Legacy `.sp-modal-backdrop--active` | Grandfathered |
| `out` used for "closing" | `.sp-toast--out`, `.sp-dialog-overlay--out` | Grandfathered |
| Two names for one state | `.sp-chip--active` and `.sp-chip--selected` apply identical rules | Grandfathered |
| Inverse state | `.sp-tabs__panel--hidden` (visible by default) | Grandfathered |

### 17.3 Semantic colour

| Deviation | Evidence | Class |
|---|---|---|
| `error` used for destructive action | `.sp-button--error` and `--outline-error`; there is no `.sp-button--danger` | Grandfathered |
| Styles for a variant that does not exist | `.sp-alert--danger .sp-icon` in `sparta-icons.css`; Alert has no `--danger` variant | To classify |

### 17.4 Tokens, literals and motion

| Deviation | Evidence | Class |
|---|---|---|
| Ghost Button hover uses a white overlay | `rgba(255, 255, 255, 0.06)` / `0.04` over a transparent base; on the light theme's `#ffffff` surface the hover is not visible | To classify |
| Dialog overlay does not use the overlay token | `.sp-dialog-overlay` uses `rgba(0, 0, 0, 0.6)`; Modal and Drawer use `--sp-bg-overlay` | To classify |
| Validation focus rings are literals | `rgba(198, 40, 40, 0.3)` and siblings in `sparta-form.css` do not follow `--sp-color-error` overrides | To classify |
| Dark text on the secondary colour is a literal | `#111111` three times in `sparta-button.css` | To classify |
| Syntax colours are literals | `#3355FF`, `#E5C158` in `sparta-code.css` | To classify |
| Icon severity tints reference undefined tokens | `--sp-info-base`, `--sp-success-base`, `--sp-warning-base`, `--sp-error-base` in `sparta-icons.css` are never defined; `icons.md` documents the resulting limitation | To classify |
| Motion variants reuse token names for other durations | `.sp-drawer--fast` is `150ms` and `--slow` is `420ms`; `--sp-duration-fast` is `100ms` and `--sp-duration-slow` is `260ms` | To classify |

### 17.5 Layers and precedence

| Deviation | Evidence | Class |
|---|---|---|
| Utilities cannot override components | §10.2 item 2 | Review |
| Native `hidden` does not hide components | §10.2 item 3 | Review |
| Legacy `FROZEN` rules outrank the `accessibility` layer | §10.2 item 4 | Review |
| Legacy Accordion trigger focus under forced colors | Unlayered `.sp-accordion__trigger:focus-visible` sets `outline: none` with an inset `box-shadow`, which forced-colors mode suppresses; the forced-colors block does not cover it | Review |

### 17.6 Source ownership

| Deviation | Evidence | Class |
|---|---|---|
| Duplicate selector | `.sp-select-wrapper .sp-select-icon` is defined in both `sparta-utilities.css` and `sparta-icons.css` | To classify |

### 17.7 Responsive behavior

| Deviation | Evidence | Class |
|---|---|---|
| Mobile treatment only on the legacy Modal | The `640px` rule applies to the legacy `.sp-modal__dialog`; the Supported `.sp-modal__content` has none | Review |

### 17.8 Documentation

| Deviation | Evidence | Class |
|---|---|---|
| No page states a stability status | 0 of 27 component pages | To address in the documentation conformance pass |
| Pages outside the common structure | `modal`, `tooltip`, `accordion`, `app-shell` | To address in the documentation conformance pass |
| "When to use which" missing or one-sided | Covered today: Button ↔ Link (at the element level), Alert → Notifications, Drawer → Modal. Missing: Modal → Drawer, Tooltip vs visible text, Tabs vs page navigation, Dropdown vs native `<select>` (§15.5) | To address in the documentation conformance pass |
| Guidance not marked as advisory | Advisory phrasing ("don't", "avoid", "prefer", "instead", …) appears on 24 of 27 pages, across most sections — the largest share in Accessibility — in the same voice as requirements (§15.2) | To address in the documentation conformance pass |
| Shipped but undocumented classes | `.sp-center`, `.sp-center--full`, `.sp-tooltip--top`, `.sp-sr-only`, `.sp-not-sr-only`, `.sp-select-wrapper`, `.sp-select-icon`; legacy `.sp-modal-backdrop--active` and `.sp-modal__dialog--sm/md/lg/xl/full` | To classify as Supported or Internal (§16.2) |

---

## 18. Unresolved decisions

These are outside this standard and are recorded here so that no rule above
is read as settling them.

1. **Formal `FROZEN` status of `.sp-flex` and the atomic utilities.**
   `sparta-layout.css` has no `FROZEN` marker, as ADR-0002 rule 7 requires;
   the `FROZEN` markers on the legacy Tooltip, Accordion and Modal APIs
   describe themselves as following the "same convention as the frozen
   `.sp-flex`/atomic utilities from 0.4.0."
2. **The supported browser baseline**, and whether raising it is a breaking
   change. This requires an explicit project decision; it is not inferred
   from the CSS features the library uses.
3. **Whether ADR-0002's registry-published enforcement trigger** applies to
   releases distributed by git tag (ADR-0004).
4. **Whether existing vocabulary collisions** (§17.2, §17.3) are eventually
   normalized, aliased, or kept.
5. **The classification of individual literal and token defects** (§17.4).
6. **How ADR-0002 classifies changes to visual values** — a colour, spacing
   or radius value — that neither rename nor remove a selector or token.
7. **Documentation-only changes to integration requirements.** Whether
   changing an integration requirement the CSS does not depend on, such as an
   ARIA or focus-management expectation, in documentation alone is breaking
   under ADR-0002 rule 6 or non-breaking as a documentation update (§15.2).

---

## Related documents

- [ADR-0005: Canonical UI Component Standard](../adr/0005-canonical-ui-component-standard.md) — why this standard exists, and how it applies ADR-0002
- [ADR-0002: Versioning and Stability Policy](../adr/0002-versioning-and-stability-policy.md) — the breaking-change contract this standard maps onto
- [ADR-0001: SpartaCSS Package Architecture](../adr/0001-package-architecture.md) — package boundary, feature modules, no JavaScript
- [Accessibility](../accessibility.md) — the full CSS/JavaScript/ARIA responsibility contract
- [Design Tokens](../tokens.md), [Motion](../motion.md), [Layout](../layout.md) — the foundations components consume
- [RedSpartan Icon Standard](icon-standard.md) — the companion normative standard for iconography
