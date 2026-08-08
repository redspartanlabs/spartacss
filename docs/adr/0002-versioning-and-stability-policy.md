# ADR-0002: Versioning and Stability Policy

**Status:** Accepted (2026-08-07)

---

## Context

ADR-0001 commits SpartaCSS to semantic versioning but does not define what
constitutes a breaking change for a pure-CSS, class-selector-based design
system — semver's usual JavaScript-API framing (function signatures,
exported symbols) doesn't map directly onto CSS. ADR-0001's own
Maintenance Implications flagged this as an open gap: "a real
major-version policy, since external consumers depend on its stability."
With `1.0.0` approaching as SpartaCSS's first stable public API
commitment, this policy needs to exist before that commitment is made,
not after.

`0.9.1` provided a concrete precedent worth recording here: restoring
`@layer components` membership to `sparta-icons.css` and
`sparta-notifications.css`. Those two files were unlayered from
extraction through `0.9.0` — an undocumented oversight, not a ratified
decision (see `docs/extraction-plan.md`; the pre-extraction monolith had
this content inside `@layer components`). Fixing it pre-`1.0.0` was
judged preferable to carrying an accidental, unexplained behavior into
the stable contract. This ADR generalizes that judgment call into a
standing policy.

---

## Decision

A change is **breaking** (requires a major version bump once at `1.0.0`
or later) if it does any of the following to a **supported, documented**
API surface:

1. Removes or renames a public class selector or BEM part.
2. Removes or renames a public modifier (`--variant`) class.
3. Changes a documented markup/structure contract a component depends on
   (e.g. requiring a new wrapper element, changing expected child order).
4. Removes or renames a public design token (`--sp-*`).
5. Changes a class's cascade-layer placement or precedence in a way that
   alters which rule wins a real conflict for existing consumers.
6. Changes accessibility behavior in a way that narrows or alters the
   supported contract (e.g. removing a `:focus-visible` state, changing
   what `prefers-reduced-motion` disables).
7. Modifies or removes a **frozen legacy API** (any selector explicitly
   marked `FROZEN` in source — see the Tooltip/Accordion/Modal legacy
   blocks). Frozen APIs are a standing promise independent of version;
   changing one is always breaking, at any version.
8. Changes the package's public `exports` map or removes a published
   `dist/*.css` entry point.

A change is **non-breaking** (minor or patch) if it:

- Adds a new selector, modifier, token, or entry point.
- Fixes a value that was demonstrably broken (e.g. an undefined token
  reference that silently dropped a declaration) and never produced its
  intended documented behavior — restoring intended behavior is not
  changing it.
- Corrects a cascade-layer or precedence inconsistency that was never
  documented or ratified as intentional — same reasoning as this ADR's
  `0.9.1` precedent. This exception does not apply once a behavior has
  been part of an `Accepted` ADR or a released, documented contract.
- Updates documentation, internal comments, or build tooling with no
  observable change to shipped CSS.

**`1.0.0` marks the first version where this policy's breaking-change
classification is enforced against a public, registry-published
contract.** Pre-`1.0.0` releases (`0.x`) may still contain corrections
like the `0.9.1` `@layer` fix without a major bump, per semver's own
pre-1.0 convention — but this ADR's classification still applies to
judge whether a given `0.x` change should be flagged and documented as a
compatibility-relevant fix in the CHANGELOG (as `0.9.1`'s was), even
though it doesn't force a major version number.

---

## Consequences

**Benefits**
- Removes ambiguity the next time an undocumented inconsistency (like the
  `@layer` gap) is found: this ADR gives a repeatable test instead of a
  fresh judgment call each time.
- Gives consumers a concrete, checkable definition of what `1.0.0`'s
  stability promise actually covers.
- Frozen legacy APIs get an explicit, permanent breaking-change
  classification, reinforcing the convention already used informally
  since `0.4.0`.

**Tradeoffs**
- Any future "is this actually broken or intentional" question now
  requires checking whether the behavior was ever written down in an
  `Accepted` ADR or release doc — undocumented behavior is deliberately
  cheaper to fix than documented behavior, which places real weight on
  keeping documentation current (per the `docs/` coverage work in
  `0.8.0`/`0.9.0`).

---

## Future ADRs / Decisions

Carried forward from ADR-0001, still open and unaffected by this ADR:
package registry, package name, additional-module governance.
