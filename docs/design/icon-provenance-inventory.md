# Icon Provenance & Compliance Inventory

**Status:** Accepted (2026-08-09)
**Scope:** the 75 SpartaCSS icons not covered by the 11 frozen foundational
icons (see below). This is a factual compliance record, not a design
document — see [`docs/design/icon-standard.md`](icon-standard.md) for
construction rules and [ADR-0003](../adr/0003-independent-iconography-system.md)
for why RedSpartan maintains an independent iconography system at all.

---

## 1. Frozen foundational icons (out of scope for this inventory)

The following 11 icons are treated as authoritative and frozen per current
project direction:

`check`, `chevron-down`, `arrow-right`, `sort-asc`, `sort-desc`, `x`,
`plus`, `minus`, `search`, `settings`, `user`

**Status update:** "frozen" describes the *approved replacement
geometry*, originally validated in `.scratch/icons/foundational-review.html`
(local, gitignored, not part of the shipped project). **All 11 have since
been integrated into `src/`** — `src/modules/icons/sparta-icons.css` and
the core `--sp-icon-mask-*`/`--sp-icon-bg-*` tokens in
`src/core/sparta-tokens.css` now carry the approved frozen geometry for
all 11, including the two consumers that shared frozen shapes outside the
`.sp-icon-*` class system (`--sp-icon-bg-check-white`, which now sources
the same frozen `check` construction, and the local `.sp-select` chevron
in `src/components/sparta-form.css`, which now sources the same frozen
`chevron-down` construction). Their provenance status *as currently
distributed* is therefore original RedSpartan geometry, not the
Feather/Lucide-derived geometry the original audit found (most of the 11
were themselves confirmed Feather/Lucide-derived prior to this
integration; `sort-asc`/`sort-desc` were unresolved/unknown). This
inventory covers the remaining 75 that have not yet gone through
original-construction review at all; the 11 are out of its scope because
their compliance question is now resolved by integration, not because it
remains open.

## 2. Classification definitions

- **Confirmed third-party-derived** — direct path-data or geometric
  comparison against an identified upstream source found a byte-identical
  or near-identical match. Evidence-based, not inferred from naming.
- **Unverified/presumed** — not individually compared against any upstream
  source. Flagged because the icon's name matches Feather/Lucide's own
  naming vocabulary, and because every icon actually checked in this
  project (20 of 86, across two investigation rounds) turned out to be
  derived with zero exceptions — a 100% hit rate that makes "presumed
  clean" an unsupported assumption for the unchecked remainder. This is a
  risk flag, not a finding.
- **Unresolved/unknown** — checked against multiple candidate sources and
  no match was found anywhere. The only icons that ever received this
  classification (`sort-asc`, `sort-desc`) are part of the frozen 11 and
  are excluded from this inventory's 75. **No icon among the 75 currently
  carries this classification** — none of the 75 were individually checked
  closely enough to rule out a match the way `sort-asc`/`sort-desc` were.

## 3. Confirmed third-party-derived (14 of 75)

Direct evidence — byte-for-byte or near-identical path-data comparison
against the named upstream file, performed during the original provenance
investigation.

| Icon | Source | License | Copyright | Attribution requirement |
|---|---|---|---|---|
| `external-link` | Feather (`external-link.svg`) | MIT | Cole Bemis, 2013–2023 | Reproduce copyright notice + full MIT license text |
| `trending-up` | Feather (`trending-up.svg`) | MIT | Cole Bemis | Same |
| `trending-down` | Feather (`trending-down.svg`) | MIT | Cole Bemis | Same |
| `award` | Feather (`award.svg`) | MIT | Cole Bemis | Same |
| `paper-clip` | Feather (`paperclip.svg`) | MIT | Cole Bemis | Same |
| `send` | Feather (`send.svg`) | MIT | Cole Bemis | Same |
| `image` | Feather (`image.svg`) | MIT | Cole Bemis | Same |
| `rss` | Feather (`rss.svg`) | MIT | Cole Bemis | Same |
| `file-text` | Feather (`file-text.svg`) | MIT | Cole Bemis | Same |
| `list-view` | Feather `list.svg`, renamed | MIT | Cole Bemis | Same |
| `chart-bar` | Feather `bar-chart-2.svg` + one added baseline line | MIT | Cole Bemis | Same (modification does not remove the obligation — MIT covers "the Software" including derivative/modified copies) |
| `drag-handle` | Lucide `grip-vertical.svg`, renamed | ISC | Lucide Icons and Contributors | Reproduce copyright notice + full ISC license text |
| `table-2` | Lucide `table-2.svg` (Lucide's own LICENSE file classifies this specific icon under its MIT/Feather-derived block, not its ISC block — see note) | **MIT** (per Lucide's own attribution list) | Cole Bemis | Reproduce copyright notice + full MIT license text |
| `shield-check` | **Composite**: body = Feather `shield.svg` (exact match); checkmark = Lucide-lineage geometry (same coordinates as Lucide's current `shield-check.svg` inner check, expressed as a polyline instead of a relative path) | **Dual**: MIT (body) + ISC (checkmark) | Cole Bemis (MIT) / Lucide Icons and Contributors (ISC) | Both notices required — this single icon has two applicable licenses for its two components |

**Note on `table-2`:** Lucide's own `LICENSE` file explicitly lists `table-2`
in its "derived from the Feather project" block, covered there under MIT
rather than Lucide's own ISC block — confirmed by reading that file
directly rather than assuming ISC because the icon currently lives in
Lucide's set.

## 4. Unverified/presumed (61 of 75)

Not individually checked against any upstream source. Listed here as a
risk-flagged group, not as cleared:

`alert-triangle`, `archive`, `arrow-left`, `arrow-up-down`, `at-sign`,
`bell`, `bookmark`, `briefcase`, `calendar`, `camera`, `check-circle`,
`check-square`, `chevron-left`, `chevron-right`, `chevron-up`, `clock`,
`code`, `copy`, `database`, `download`, `edit`, `expand`, `eye`, `eye-off`,
`filter`, `flag`, `globe`, `grid`, `heart`, `help-circle`, `home`, `info`,
`layers`, `link`, `lock`, `log-out`, `mail`, `maximize`, `menu`,
`message-circle`, `minimize`, `moon`, `more-horizontal`, `more-vertical`,
`pause`, `percent`, `phone`, `play`, `refresh`, `share`, `slash`, `star`,
`sun`, `tag`, `target`, `terminal`, `trash`, `upload`, `users`, `x-circle`,
`zap`

No license or attribution requirement can be stated for this group yet —
that determination requires the same direct comparison performed for the
14 confirmed icons above, which has not been done. Absence of a finding
here is not evidence of originality.

## 5. Unresolved/unknown (0 of 75)

None. (`sort-asc`/`sort-desc`, the only icons ever classified this way,
are part of the frozen 11 and out of this inventory's scope.)

## 6. Does any currently-distributed icon actually require attribution right now?

Based only on repository evidence and the upstream license texts already
verified directly from the Feather and Lucide repositories (not inferred):

- **Yes, for the 14 confirmed icons in §3.** Both the MIT License (Feather)
  and the ISC License (Lucide) are permissive but **conditional** —
  redistribution is permitted only if the copyright notice and license
  text are reproduced alongside the copy. `src/modules/icons/sparta-icons.css`
  and `src/core/sparta-tokens.css` currently ship all 14 of these shapes
  with **no attribution anywhere in the repository** — no `NOTICE` file, no
  in-file comment, nothing. That condition is unmet today, independent of
  any redesign work in progress.
- **This is not a new problem introduced by this project phase.** The gap
  has existed since `0.1.0` per `docs/extraction-plan.md` §9 item 3 and
  ADR-0003's Context section — this inventory is the first time it's been
  itemized with sources and license terms rather than left as an open
  flag.
- **For the 61 unverified icons (§4):** no attribution claim can be made
  either way, because no comparison has been performed.
- **For the 11 frozen icons (§1):** no attribution is required. Their
  production geometry is now the approved original RedSpartan
  construction, not the Feather/Lucide-derived geometry the original
  audit found — the integration referenced in §1 resolved this.
- **No claim beyond this is being made.** This is not legal advice; it's a
  direct reading of the MIT and ISC license texts against what the
  repository currently contains. It does not address, and this document
  takes no position on, whether the two years since `0.1.0` create any
  additional obligation beyond the license terms themselves.

## 7. Is a `NOTICE` file required at this stage?

**Not created here, per explicit instruction — but the factual answer, if
asked directly, is yes, for the 14 confirmed icons, for as long as they
continue to ship.** Two paths close this gap, and this document doesn't
choose between them:

1. Add an interim `NOTICE`/third-party-attribution file covering the 14
   confirmed icons (and updating it if the §4 unverified group later
   yields more confirmed matches), kept until each icon is individually
   replaced with approved original geometry and integrated.
2. Prioritize redesigning and integrating the 14 confirmed icons ahead of
   the 61 unverified ones, closing the gap by replacement rather than by
   attribution.

This is a scope/sequencing decision, not a compliance-inventory decision —
left for direction, per instruction, rather than acted on here.

---

## Related documents

- [`docs/design/icon-standard.md`](icon-standard.md) — construction rules for replacement geometry.
- [ADR-0003](../adr/0003-independent-iconography-system.md) — why RedSpartan replaces rather than attributes-and-keeps, as the strategic default.
- `.scratch/icons/foundational-review.html` (local, gitignored) — visual review workspace for the 11 frozen icons; not the source of compliance findings recorded here.

---
Source: this document's findings are derived from direct inspection of `src/modules/icons/sparta-icons.css` and `src/core/sparta-tokens.css`, and from direct comparison against the upstream Feather (`feathericons/feather`) and Lucide (`lucide-icons/lucide`) repositories performed earlier in this project's provenance investigation.
