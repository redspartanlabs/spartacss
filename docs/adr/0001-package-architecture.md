# ADR-0001: SpartaCSS Package Architecture

**Status:** Accepted (2026-07-21)

---

## Context

SpartaCSS is becoming an independent package so it can serve as reusable design-system infrastructure across RedSpartan Systems products, not just RedSpartan HQ — versioned and released on its own schedule rather than tied to any single consumer's timeline.

Ownership separation matters because shared infrastructure that lives inside a single consumer's repository tends to accumulate duplicated or diverging copies as more consumers appear. A single, independently owned source of truth avoids that outcome and keeps each consuming repository scoped to what it actually owns.

---

## Decision

1. **SpartaCSS is an independent design system package**, with its own repository and release lifecycle, separate from RedSpartan HQ.
2. **HQ consumes SpartaCSS but does not own it** — the dependency direction is one-way (HQ → SpartaCSS); no SpartaCSS source lives inside the HQ repository.
3. **SpartaCSS remains framework-independent.** It is pure CSS — custom properties and class selectors only, with no JavaScript/TypeScript and no framework-specific bindings — so it can be consumed by RedSpartan HQ or any future RedSpartan product regardless of site framework.
4. **The package boundary includes core CSS, the icon system, and feature modules** — the foundational tokens/reset/layout/component layer, the icon system, and the notifications module. Demo or preview-only artifacts are excluded from the package.
5. **Toast belongs to the notifications module.** It is the canonical Toast API; a duplicate Toast implementation found in the core layer is legacy duplication, removed as cleanup during initial packaging, with no public class renamed and no behavior changed.
6. **Versioning follows semver.** The initial release represents the existing source, extracted with only the Toast cleanup (Decision 5) as a content change; breaking changes require a major version bump.
7. **Distribution is phased.** Initially, consumers depend on a fixed, tag-pinned reference to the package; a registry-published release follows once a distribution target is chosen.

**Licensing:** SpartaCSS is licensed under the Apache License 2.0. RedSpartan Labs retains ownership of branding, trademarks, and project identity separately from the license grant.

---

## Consequences

**Benefits**
- RedSpartan HQ's repository stays scoped to its own concerns rather than hosting shared design-system infrastructure.
- SpartaCSS can be adopted by future RedSpartan products without forking or copying source.
- Independent versioning lets the design system evolve on its own schedule.
- A single authoritative source per component removes the class of bug the Toast duplication represented.

**Tradeoffs**
- Adds cross-repo coordination: consumers must explicitly track and update their SpartaCSS dependency version.
- The initial tag-pinned distribution phase is less convenient than a registry install, until that phase is complete.
- A SpartaCSS bug affecting a consumer requires a new SpartaCSS release before the consumer can pick up the fix — consumers may not patch it locally, per the ownership boundary above.

**Maintenance implications**
- SpartaCSS requires its own changelog discipline and a real major-version policy, since external consumers depend on its stability.
- The Toast cleanup is a one-time fix that must land at initial packaging — it should not be deferred.
- As more products adopt SpartaCSS, future component or token changes must be evaluated against all consumers, not just HQ.

---

## Future ADRs / Decisions

- **Package registry** — where the package is ultimately published.
- **Package name** — including scope, linked to the registry decision.
- **Documentation strategy** — how usage/reference documentation is structured, and whether it's referenced (not duplicated) from other RedSpartan documentation.
- **Additional modules** — how future feature modules are added to the package boundary without destabilizing the core layer.
