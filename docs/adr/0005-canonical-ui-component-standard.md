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

Component pages also do more than list classes. Many already say when to
choose a component over a sibling — `link.md` sends actions that do not
navigate to Button "so the correct element/role is used"; `drawer.md`
contrasts itself with Modal — and state what the consumer's markup, script and
ARIA must do, and what to avoid. That content is valuable, but nothing
distinguishes what a page *commits to* from what it merely *recommends*. The
distinction matters because ADR-0002's rule 3 protects "a documented
markup/structure contract a component depends on": advice written in the same
voice as a requirement can be read as part of the stability contract.

SpartaCSS's documentation is the artifact's own documentation, and this
repository is its authoritative source. RedSpartan HQ catalogs SpartaCSS as a
reusable artifact; how HQ presents SpartaCSS's documentation is governed by
HQ's own records, and any such presentation derives from this documentation
without replacing it. General design, accessibility and engineering theory is
the subject of external standards and of general references such as HQ's
Athenaeum. This record describes that boundary from SpartaCSS's side only; it
makes no decision for HQ.

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
9. **Component documentation describes both the technical contract and how to
   use the component correctly, and distinguishes three kinds of content by
   their force:**
   - **Provided behavior** — what SpartaCSS's own CSS does: visual states,
     CSS-only interaction, focus styling, reduced-motion, forced-colors and
     responsive behavior, and the behavior of documented selectors.
   - **Integration requirements** — what the consumer must do for the
     component to work correctly or accessibly: the expected semantic element
     and markup, which state classes to add and remove and where, the ARIA to
     keep in step with visual state, and focus management, focus trapping,
     `Escape` handling and return focus where the pattern needs them.
   - **Usage guidance** — advice for using the component well: when to choose
     it over a sibling or a native alternative, composition, common misuse,
     and wording where it matters. Usage guidance is **advisory** and outside
     the stability contract.

   A statement is an integration requirement if ignoring it would break the
   component, make it inaccessible, violate its documented semantic or
   integration contract, or cause documented behavior to fail. Otherwise it is
   guidance. Pages make the distinction visible, so advice is never mistaken
   for a commitment. How provided behavior and integration requirements
   relate to ADR-0002 is set out in "Relationship to ADR-0002" below.
10. **Documentation applies established knowledge to the component; it does
    not host general theory or make product decisions.** A page may apply and
    summarize established design, accessibility and engineering knowledge as
    it bears on that component, and may cite the external normative authority
    it relies on, such as the WAI-ARIA Authoring Practices, WCAG or MDN.
    General theory is not reproduced. Decisions that belong to the consuming
    application — how loading or empty states look across a product, whether
    destructive actions are confirmed — remain the application's; a page
    documents the component's own states and may offer considerations as
    guidance. SpartaCSS documentation must remain usable without any other
    RedSpartan documentation, and depends on no HQ URL.
11. **These documentation rules cover SpartaCSS components and patterns**,
    including components delivered by feature modules. Layout primitives,
    utilities and tokens are documented in the foundation pages. The rules
    govern SpartaCSS's documentation only, and set no rule for other
    artifacts or for RedSpartan HQ.

---

## Relationship to ADR-0002

This ADR does not amend ADR-0002, and ADR-0002 governs wherever the two
appear to disagree.

**What ADR-0002 states.** Its breaking-change rules apply to the **supported,
documented** API surface. Among them: removing or renaming "a public class
selector or BEM part" (rule 1); removing or renaming "a public modifier
(`--variant`) class" (rule 2); changing "a documented markup/structure
contract a component depends on" (rule 3); changing a class's cascade-layer
placement or precedence in a way that alters which rule wins (rule 5);
changing accessibility behavior in a way that narrows or alters the supported
contract (rule 6); and modifying or removing any selector "explicitly marked
`FROZEN` in source" (rule 7). Among the changes it classifies as non-breaking
is one that "Updates documentation, internal comments, or build tooling with
no observable change to shipped CSS". ADR-0002 does not distinguish variant
modifiers from state modifiers, does not define stability labels for
documentation pages, and does not distinguish advisory content on a
documentation page from contractual content.

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
- **Provided behavior and integration requirements** (Decision 9) are the
  documented content that ADR-0002's rules can protect. This record does not
  extend any of those rules: whether a particular change to such content is
  breaking, and under which rule, is for ADR-0002 to determine.
- **Usage guidance**, identified as advisory, is treated as outside the
  supported, documented API surface. Changing it alters documentation only,
  with no observable change to shipped CSS — a change ADR-0002 classifies as
  non-breaking. Marking guidance as advisory keeps it from being read as a
  rule 3 markup/structure contract.

**Not resolved here.** Rule 3 covers markup/structure "a component depends
on", and ADR-0002's non-breaking list covers documentation-only updates. For
an integration requirement the CSS itself does not depend on — an ARIA,
focus-trapping or `Escape` expectation — a change made in documentation alone
matches the wording of that non-breaking clause, while rule 6 protects the
supported accessibility contract. ADR-0002's text does not settle which
applies, and this record does not settle it either.

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
- **Keep component pages to API reference only.** Rejected. A consumer cannot
  use a stateful component correctly from its classes alone; the markup,
  script and ARIA it expects are part of using it, and most existing pages
  already carry them.
- **Treat everything on a component page as contractual.** Rejected. It would
  turn advice into a stability commitment, so that improving a recommendation
  could require a major version.
- **Record documentation guidance in a separate ADR.** Rejected. What a
  component page commits to is the question this record already answers;
  splitting it would leave one decision across two records.

---

## Consequences

**Benefits**

- Ratifies what the library already does and gives new components a checkable
  specification.
- Makes existing deviations visible and classifiable without changing shipped
  CSS.
- Gives every component page a stated stability status, so consumers can see
  which selectors ADR-0002's guarantees cover.
- Lets consumers tell what SpartaCSS commits to from what it recommends, and
  lets guidance improve without a major version.
- No shipped CSS changes. This decision and the standard are documentation;
  under ADR-0002 that is non-breaking and requires no version change.

**Tradeoffs**

- Immediate consistency is given up. The library keeps its known vocabulary
  collisions and literals until separate decisions address them.
- Authors must classify each statement as a requirement or as guidance, and
  some statements sit close to the line. The test in Decision 9 decides them.

**Maintenance implications**

- A documentation conformance pass follows. Each component page gains a
  stability section, the conditional sections the standard requires, and a
  `Source:` footer naming contributing concern files. Pages with a meaningful
  alternative gain "When to use which" guidance, on both sides of the pair,
  and existing advice is marked as guidance. The four pages that do not
  follow the common structure (`modal`, `tooltip`, `accordion`, `app-shell`)
  are brought into it.
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
- **Documentation-only changes to integration requirements** — whether
  changing an integration requirement the CSS does not depend on, such as an
  ARIA or focus-management expectation, in documentation alone is breaking
  under ADR-0002 rule 6 or non-breaking as a documentation update. See
  "Relationship to ADR-0002".
- **Documentation strategy, beyond component reference** — this record
  partially addresses ADR-0001's deferred documentation-strategy item by
  defining the structure of component reference documentation. How other
  RedSpartan documentation references SpartaCSS remains open.
