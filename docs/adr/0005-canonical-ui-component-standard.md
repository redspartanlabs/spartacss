# ADR-0005: Canonical UI Component Standard

**Status:** Proposed (2026-09-11)

---

## Context

SpartaCSS ships roughly seventy BEM blocks across thirty-five source files.
Their conventions are consistent in practice but written down nowhere as a
rule: every class carries the `sp-` prefix and follows
`block__element--modifier` with no nested elements; visual state is expressed
as classes that the consumer's own JavaScript toggles; components resolve
their values through global `--sp-*` tokens; supported components sit in
`@layer components`; the only viewport breakpoints are `640px` and `768px`;
and 22 of the 27 component pages contain the same
Purpose / Usage / Class API / Variants / States / Accessibility sections,
all 27 ending in a `Source:` footer.

That absence matters because of
[ADR-0002](0002-versioning-and-stability-policy.md). ADR-0002 limits its
breaking-change rules to the **supported, documented** API surface, and its
own Tradeoffs state that undocumented behavior is "deliberately cheaper to fix
than documented behavior". Documentation is therefore the boundary of
SpartaCSS's stability contract — yet nothing defines what a component is, what
its page must state, or which of its selectors that page commits to. No
component page currently states its stability status, including the three
whose legacy APIs are formally `FROZEN`.

[ADR-0001](0001-package-architecture.md) listed "Documentation strategy — how
usage/reference documentation is structured" among its deferred decisions.

A read-only architecture investigation also found that the library is not
perfectly uniform. The same state is named more than one way (`--open`,
`--visible`, `--active`; `--closing`, `--out`); `danger` and `error` are both
used for destructive intent; several colour and duration literals bypass the
token system; and some consequences of the layer order — utilities losing to
component rules, legacy `FROZEN` rules sitting outside every layer — are
undocumented. The term "module" is also used for two different things: the
source folders that group related components (`src/modules/overlay`, `data`,
`docs`), and the separately exported feature modules (Icons, Notifications).

---

## Decision

1. **SpartaCSS adopts a normative component standard.**
   [`docs/design/component-standard.md`](../design/component-standard.md)
   (the SpartaCSS Component Standard) is the operational specification that
   component authors and documentation authors follow. As with
   [ADR-0003](0003-independent-iconography-system.md) and the Icon Standard,
   this record states *why*; the standard states *how*.
2. **A canonical component is a recognizable UI unit with a named `sp-` BEM
   block and a supported, documented API.** Its supported API lives in
   `@layer components`, resolves reusable and themed values through global
   `--sp-*` tokens, is expressed entirely as classes, requires no JavaScript,
   and is described by its own documentation page.
3. **Classification uses three independent axes**, so that categories are not
   collapsed merely because they all contain CSS classes:
   - **Kind** — component, pattern, layout primitive, utility, or token.
   - **Organization and distribution** — a *component group* is source
     organization only; a *feature module* is a separately exported bundle.
     "Module" is not a third kind of UI thing.
   - **Stability status** — *Supported*, *Legacy / FROZEN*, or *Internal*.
4. **The standard codifies the existing architecture rather than redesigning
   it.** The BEM grammar, class-driven state, the CSS/JavaScript/ARIA
   responsibility split, the global-token model and its literal policy, the
   layer order, the two breakpoints, and the documentation structure are
   ratified as they exist.
5. **Canonical vocabularies apply to future APIs only.** The standard defines
   state names (`open`, `active`, `selected`, `disabled`, `closing`) and
   semantic colour meanings (`error` for status and validation, `danger` for
   destructive action, `neutral`/`muted` for non-semantic emphasis) for new
   work. Existing public selectors that differ are **grandfathered
   compatibility behavior**. No existing selector is renamed by this decision.
6. **Every component page carries an explicit stability status** —
   *Supported*, *Legacy / FROZEN* or *Internal*. How these statuses relate to
   ADR-0002 is set out in "Relationship to ADR-0002" below.
7. **A component has one authoritative owning implementation file.**
   Cross-cutting concern files may contribute styles to it and are named in
   its documentation. Two definitions of the same selector are an
   implementation defect unless explicitly justified.
8. **Deviations are recorded, not fixed.** Known inconsistencies are listed in
   the standard's register and classified as grandfathered compatibility
   behavior, as items for a later conformance workstream, or as issues for
   later architectural review. Resolving them is outside this decision.

---

## Relationship to ADR-0002

This ADR does not amend ADR-0002, and ADR-0002 governs wherever the two
appear to disagree.

**What ADR-0002 states.** Its breaking-change rules apply to the **supported,
documented** API surface. Among them: removing or renaming "a public class
selector or BEM part" (rule 1); removing or renaming "a public modifier
(`--variant`) class" (rule 2); changing a class's cascade-layer placement or
precedence in a way that alters which rule wins (rule 5); changing
accessibility behavior in a way that narrows or alters the supported contract
(rule 6); and modifying or removing any selector "explicitly marked `FROZEN`
in source" (rule 7). ADR-0002 does not distinguish variant modifiers from
state modifiers, and it does not define stability labels for documentation
pages.

**What this ADR establishes as its application of that contract.** These are
readings of ADR-0002 adopted for component documentation, not text ADR-0002
contains:

- ***Supported*** names ADR-0002's supported, documented surface. ADR-0002's
  breaking-change rules apply to it in full.
- ***Legacy / FROZEN*** names the selectors rule 7 covers, and is applied only
  where a selector is explicitly marked `FROZEN` in source. Prose describing
  something as "frozen" does not confer the status.
- ***Internal*** names selectors outside ADR-0002's supported, documented
  surface, to which its breaking-change rules therefore do not apply.
- **State modifiers.** For component APIs, a Supported state modifier is
  treated exactly like a variant modifier under rules 1 and 2: it is a public
  class selector and a BEM part, and a public modifier class. Removing or
  renaming one is therefore treated as breaking. ADR-0002's text names
  modifiers generically and does not mention state modifiers; this record
  adopts the reading that includes them.

---

## Alternatives considered

- **Leave the conventions implicit.** Rejected. ADR-0002 limits its
  guarantees to the supported, documented surface, so while the rules for
  what a component page commits to remain unwritten, the edge of the contract
  is ungoverned, and each new component or page re-decides it.
- **Normalize the library as part of the standard** — rename selectors to one
  vocabulary, move utilities above components, tokenize every literal.
  Rejected. Renaming a variant selector is breaking under ADR-0002 rules 1–2,
  and renaming a state selector is too under this record's reading of those
  rules; moving utilities between layers is breaking under rule 5; and
  changing a `FROZEN` API is breaking under rule 7. Bundling these into the
  standard would make adopting a documentation rule require a major version.
- **Move state to ARIA attribute selectors.** Rejected. Every stateful
  component already exposes class-based state, and SpartaCSS deliberately does
  not own ARIA: its accessibility contract leaves roles and states to the
  consumer. Replacing the mechanism would be breaking, and it would transfer
  semantic responsibility SpartaCSS has declined to take.
- **Put the full rules in this ADR.** Rejected. The rules are detailed and
  will be versioned as the library grows. ADR-0003 already established the
  pattern of a short decision record paired with a normative standard.

---

## Consequences

**Benefits**

- Ratifies what the library already does and gives new components a checkable
  specification.
- Makes existing deviations visible and classifiable without changing shipped
  CSS.
- Gives every component page a stated stability status, so consumers can see
  which selectors ADR-0002's guarantees cover.
- No shipped CSS changes. This decision and the standard are documentation;
  under ADR-0002 that is non-breaking and requires no version change.

**Tradeoffs**

- Immediate consistency is given up. The library keeps its known vocabulary
  collisions and literals until separate decisions address them.

**Maintenance implications**

- A documentation conformance pass follows. Each component page gains a
  stability section, the conditional sections the standard requires, and a
  `Source:` footer naming contributing concern files. The four pages that do
  not follow the common structure (`modal`, `tooltip`, `accordion`,
  `app-shell`) are brought into it.
- Undocumented classes become a decision, not a default. Classes shipped
  without documentation are not Supported. Each must be documented as
  Supported or labeled Internal; none is promoted by this decision.
- A conformance workstream becomes possible. The standard's register gives
  each deviation a classification that can be acted on case by case, under
  ADR-0002.

---

## Future ADRs / Decisions

- **Formal `FROZEN` status of `.sp-flex` and the atomic utilities** —
  `sparta-layout.css` has no `FROZEN` marker, as ADR-0002 rule 7 requires,
  while the `FROZEN` markers on the legacy Tooltip, Accordion and Modal APIs
  describe themselves as following the "same convention as the frozen
  `.sp-flex`/atomic utilities from 0.4.0." Not decided here; until it is,
  documentation must not describe them as either carrying or lacking the
  guarantee.
- **Supported browser baseline** — to be set by an explicit project decision;
  this record does not infer one from the CSS features in use.
- **Registry-published enforcement trigger** — whether ADR-0002's trigger
  applies to releases distributed by git tag (ADR-0004). Not decided here.
- **Vocabulary collisions** — whether existing state and colour vocabulary
  collisions are eventually normalized, aliased, or kept.
- **Literal and token defects** — the classification of each item in the
  standard's register.
- **Visual value changes** — how ADR-0002 classifies changes to a visual
  value, such as a colour or spacing value, that neither rename nor remove
  anything.
- **Documentation strategy, beyond component reference** — this record
  partially addresses ADR-0001's deferred documentation-strategy item by
  defining the structure of component reference documentation. How other
  RedSpartan documentation references SpartaCSS remains open.
