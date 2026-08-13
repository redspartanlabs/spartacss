# ADR-0003: Independent RedSpartan Iconography System

**Status:** Accepted (2026-08-08)

---

## Context

`sparta-icons.css` and the core icon-mask tokens (`--sp-icon-mask-*` /
`--sp-icon-bg-*` in `sparta-tokens.css`) shipped from `0.1.0` onward without
any documented shape provenance. `docs/extraction-plan.md` §9 item 3 flagged
this directly at extraction time: *"Icon shape provenance/licensing (open,
deferred) — flagged in the original source inventory as needing
verification before external distribution... tracked as a pre-`v1.0.0`
release check, not a blocker to extraction itself."* That check was never
subsequently performed anywhere in the CHANGELOG or ADR history — it
remained an open item through `0.9.2`.

A pre-1.0 readiness investigation performed that check. Direct path-data
comparison against upstream sources confirmed that a substantial portion of
the sampled icon shapes are byte-identical or near-identical to Feather
Icons (MIT, Cole Bemis) and Lucide (ISC, Lucide Icons and Contributors) —
including core, load-bearing shapes consumed directly by components
(`x`, `chevron-down`, `check`, `trending-up`/`down`, `arrow-right`,
`external-link`). Two icons (`sort-asc`, `sort-desc`) had no verifiable
source at all under any library checked. No icon sampled was found to be
independently original.

This is a real decision point, not merely a licensing footnote. SpartaCSS's
own stated identity — a framework-agnostic design system "built for systems
that must last," independently owned per ADR-0001 — is undermined if a
core visible surface (every icon a consumer sees) is substantially someone
else's design work wearing SpartaCSS's color tokens.

## Problem

Two separable questions were in front of this decision:

1. **Legal/compliance:** can the existing Feather/Lucide-derived shapes be
   shipped with correct attribution? Yes — both licenses are permissive and
   compatible with Apache-2.0 distribution provided their notices are
   reproduced.
2. **Identity:** does shipping those shapes, attributed or not, satisfy
   SpartaCSS's own goal of being RedSpartan's original design system?

This ADR answers the second question, which the licensing fix alone does
not resolve.

## Decision

1. **RedSpartan maintains an independent, original iconography system for
   SpartaCSS.** Icon shapes are constructed from RedSpartan's own
   geometry, not adapted, traced, or recomposed from any existing icon
   library.
2. **Existing icon libraries — Feather, Lucide, Material Symbols,
   Heroicons, Font Awesome, Bootstrap Icons, and similar — may be
   consulted for semantic reference only** (e.g. confirming that a
   magnifying glass is the conventional symbol for search). Their
   geometry, proportions, or construction patterns must never become the
   default source for a RedSpartan icon's actual path data.
3. **The construction rules this decision requires are documented
   normatively in
   [`docs/design/icon-standard.md`](../design/icon-standard.md)** (the
   RedSpartan Icon Standard v1.0) — grid, stroke, angle, mirroring, fusion,
   and optical-review requirements. This ADR records *why* independence is
   required; the Icon Standard records *how* it is achieved and verified.
4. **"RedSpartan color + another library's geometry does not constitute a
   RedSpartan icon."** Recoloring, restyling, or applying SpartaCSS's mask
   engine to an existing library's shapes does not satisfy this decision,
   regardless of attribution correctness.
5. Icons are validated through an explicit optical-review process (true
   12/16/20/24px inspection plus magnified/construction-grid review, per
   the Icon Standard) before being considered approved — a shape is not
   accepted merely because its coordinates satisfy the numeric rules.

## Alternatives considered

- **Keep the existing Feather/Lucide-derived shapes and add third-party
  attribution (a `NOTICE` file).** Rejected as the terminal state: this is
  legally sufficient but does not meet the product goal of SpartaCSS being
  RedSpartan's own design system — the iconography would remain someone
  else's original work with a license notice attached, not a RedSpartan
  original. (Attribution may still be the correct interim step for any
  shape not yet redrawn under this decision; that is an implementation
  question for the Icon Standard and CHANGELOG, not a reversal of this
  ADR.)
- **Adopt a different existing open-source icon library wholesale**, in
  place of Feather/Lucide. Rejected: this trades one external dependency
  for another and does not establish an independent visual identity,
  which is the actual problem being solved.
- **Redraw icons ad hoc, without a documented construction standard.**
  Rejected: the foundational icon review surfaced real family-cohesion
  failures (shallow, generic chevron/arrowhead angles inherited from the
  libraries being replaced) that only became visible once compared as a
  set. Without a normative standard, consistency across icons — and across
  future contributors — cannot be verified or maintained, and the same
  generic-vocabulary problem is likely to recur one icon at a time.

## Consequences

**Benefits**
- SpartaCSS's iconography becomes genuinely original, consistent with its
  stated identity as an independently-owned design system (ADR-0001).
- A documented construction standard gives all future icon work — not just
  the foundational set — a repeatable, checkable process instead of
  case-by-case redraws.
- Resolves `docs/extraction-plan.md` §9 item 3, an open item since
  `0.1.0`.
- Removes the third-party attribution/`NOTICE` obligation entirely for
  newly authored icons, rather than maintaining it indefinitely.

**Tradeoffs**
- Materially more design effort per icon than adapting an existing
  library — every shape requires original construction and a full optical
  review, not a stroke-width or color change.
- Residual risk that an independently-constructed shape coincidentally
  resembles an existing library's icon, given how geometrically
  constrained some concepts are (a magnifying glass has few reasonable
  constructions). The Icon Standard's review process reduces this risk
  through deliberate comparison; it does not eliminate it as a
  possibility for every glyph.

**Maintenance implications**
- Any new or revised icon must be checked against
  `docs/design/icon-standard.md`, not merely judged as "looks plausible."
- The full ~86-icon set is not redrawn by this ADR — only the foundational
  subset has been through the process as of this writing. The remaining
  icons carry the same unresolved provenance status until individually
  redrawn and approved under this decision.
- `.scratch/icons/foundational-review.html` (local, gitignored) is
  validation tooling for this process, not documentation of record — it is
  expected to be recreated or discarded per review session. The Icon
  Standard and this ADR are the durable artifacts.

## Relationship to the Icon Standard

This ADR is the decision record: *why* RedSpartan icons must be an
independent system. `docs/design/icon-standard.md` is the specification:
*how* that independence is expressed and verified in actual construction
rules. Individual icon design iterations, candidate comparisons, and
experimental geometry are not re-litigated here or in the Icon Standard —
that working history belongs in the disposable review workspace, per the
Icon Standard §10.

## Future ADRs / Decisions

- **Icon-set completion policy** — sequencing and scope for redrawing the
  remaining non-foundational icons under this decision.
- **Third-party attribution for any interim, not-yet-redrawn icons** —
  whether a `NOTICE` file is warranted for the portion of the set still
  carrying unresolved provenance while the full redraw is in progress, and
  how that's tracked/communicated to consumers in the meantime.
- Carried forward from ADR-0001/ADR-0002, still open and unaffected by this
  ADR: package registry, package name, additional-module governance.
