# RedSpartan Icon Standard v1.0

**Status:** Accepted (2026-08-08)

This document is the authoritative construction specification for SpartaCSS's
icon system. It defines what a RedSpartan icon *is*, geometrically and
procedurally, independent of any single icon's design history. See
[ADR-0003](../adr/0003-independent-iconography-system.md) for why this
standard exists at all rather than adapting an existing icon library.

---

## 1. Purpose and visual identity

SpartaCSS's iconography exists to give the design system a visual identity
that is genuinely its own — "systems that must last" applies to the
icon set the same way it applies to the token layer or the component API.
The intended character, established during the foundational icon review, is:

- angular, decisive, geometric — a controlled "spearhead" quality, not
  literal spikes or blades
- crisp at small sizes rather than merely crisp when enlarged
- restrained: sharp geometry communicates intent, it does not decorate
- recognizably one family across the whole set, not a shared stroke width
  wrapped around unrelated shapes

An icon that is merely "a shape with RedSpartan's stroke width" has not met
this standard. The geometry itself — angles, proportions, terminal
treatment — carries the identity, not the color or the stroke value alone.

## 2. Canonical grid

- **`viewBox="0 0 24 24"`** for every icon, no exceptions. This is the
  coordinate system every rule below is expressed in.
- Icons are authored once, at this single resolution, and scaled by the CSS
  mask engine (`mask-size: contain`) to every shipped size. There is no
  per-size alternate artwork mechanism — a construction that only works
  enlarged is not acceptable, because it is the same file that must render
  at 12px.

## 3. Live area and boundary rules

- **Live area:** a 2-unit margin from each canvas edge, i.e. content
  normally occupies **x:2–22, y:2–22** (a 20×20 usable area).
- Individual icons may deliberately extend closer to the edge (down to
  roughly a 1-unit margin) when the glyph is meant to read as reaching or
  directional — `arrow-right`'s tip is the reference case. This is a
  per-icon judgment call, not a license to ignore the margin by default.
- **Circle keyline:** circular glyphs default to a diameter-20 circle
  centered at (12,12) as a starting point, then are optically tuned
  (typically enlarged slightly) to *read* as equal in weight to a square
  glyph of the same nominal footprint — see §9.

## 4. Stroke weights and stroke-family rules

- **Canonical stroke width: 2.0 units.** This is the default for every
  orthogonal (horizontal/vertical) stroke and any stroke whose angle from
  horizontal is closer to 0°/90° than to 45°.
- **Diagonal compensation: 1.9 units.** Applied to strokes whose angle from
  horizontal falls closer to 45° than to horizontal or vertical — roughly
  the 30°–60° band. Diagonal strokes read visually heavier than orthogonal
  strokes of identical nominal width because of how anti-aliasing covers a
  hypotenuse; the 0.1-unit reduction is a deliberate, small correction, not
  a stylistic choice.
- **This is evaluated per element, per angle — not copied from one icon to
  another.** An icon's stroke width is decided by *that icon's own*
  geometry. Matching another icon's stroke-width choice because it "should
  be consistent" without checking the actual angle is not a valid
  justification — see §12 on the difference between family consistency and
  numerical mimicry.
- **Minimum gap between parallel strokes: 3 units.** Below this, two
  2-unit-wide strokes plus their round caps merge into a single mass once
  scaled to 12px.
- **Minimum enclosed-loop diameter: 6 units.** Enclosed negative space
  smaller than this fills in visually at 12px (verified during the
  foundational review's `search` and `user` inspections).

## 5. Caps and joins

- **Caps: `stroke-linecap: round`, universally.** This is a fixed system
  convention, not a per-icon choice.
- **Joins: `stroke-linejoin: round` is the default** for every construction.
- **Miter joins are permitted at a vertex only when its actual geometric
  miter ratio satisfies `1 / sin(θ ÷ 2) ≤ 3.3`**, where θ is that vertex's
  real interior angle, computed from the construction's actual coordinates —
  not estimated by eye and not assumed from an icon's general category. The
  ratio is the authoritative test; **θ ≥ ~35° is only its approximate
  angular equivalent**, not an independent cutoff. "Acute vs. orthogonal" is
  not itself the test: a wide acute angle can be safely mitered, and a
  narrow one cannot.
- **When the ratio exceeds 3.3, round is mandatory.** Miter must not be used
  at that vertex under any circumstance, regardless of visual intent.
- **The threshold's justification is proportional miter extension relative
  to stroke width — not a claim that miter joins are inherently unsuitable
  at small sizes.** At a vertex where two strokes of width *w* meet at
  interior angle θ, a miter join extends the outer corner by a length
  proportional to `w / sin(θ ÷ 2)`. Below the threshold, that extension
  stays proportionate to the stroke weight and reads as a clean, decisive
  point; above it, the extension becomes visibly disproportionate and reads
  as a stray spike. Validation confirmed a ~53° miter renders cleanly at
  true 12px, so no blanket claim about miter and small sizes is made here.
- **This threshold was tested before being formalized, not adopted from
  theory alone.** It was established through direct rendered comparison —
  round vs. miter, at true 12/16/20/24px — across controlled test geometry
  and real production/proposed icon constructions (`arrow-right`,
  `external-link`, `chevron-down`, and deliberately narrow/orthogonal
  stress cases).
- The angularity this standard asks for comes primarily from the underlying
  geometry (§6), not from the terminal treatment — the miter allowance
  above is a refinement available where the geometry supports it, not a
  license to sharpen joins generally.

## 6. Preferred angles and proportions

- Point-terminated glyphs (chevrons, arrowheads, check-mark sweeps) default
  toward a **steeper, narrower angle** — established during the foundational
  pass at roughly **51°–55°** — rather than the shallow ~35°–40° angles
  typical of generic UI icon libraries. A narrower tip reads as decisive; a
  wide, blunt tip reads as generic.
- **This "51°–55°" figure is a construction guideline, not a single
  universal measurement.** Different constructions measure angle
  differently, and the guideline is meant to be applied using whichever
  measurement is natural for the glyph in question, not forced into one
  convention:
  - **Arm/segment angle from horizontal** — the angle each individual
    stroke segment makes with the horizontal axis. This is how
    `chevron-down` (each arm from its vertex) and `check` (each stroke of
    the two-segment sweep) are measured and evaluated against the
    guideline.
  - **Tip/interior angle** — the full angle enclosed at the point where two
    segments meet, i.e. roughly twice the per-edge angle from the shaft's
    axis. This is how `arrow-right`'s head is evaluated: its narrowed
    ~53° tip angle is what reads as an elongated "spearhead" point, even
    though the per-edge angle used to classify its stroke width (§4) is a
    different, smaller number (~27°, measured from horizontal, which is
    why that stroke gets canonical width rather than diagonal
    compensation — the two measurements answer different questions).
  Do not assume every pointed icon should be measured, or hit the 51°–55°
  target, the same way. Pick the measurement that matches how the glyph is
  actually constructed, and use the guideline to judge whether the result
  reads decisively — not as a number every construction must literally
  produce.
- **This is a default preference, not a mandate to hit a specific number,
  under either measurement.** The construction that reads best for a given
  glyph's own proportions and 12px legibility wins. `sort-asc`/`sort-desc`'s
  approved construction (Candidate C, §11) was explicitly *not* tuned to
  match this angle band — its arm angle is a side effect of a proportion
  that read well on its own terms. Forcing an angle purely for numerical
  consistency with another icon is not a valid justification for a
  geometry change.
- Optical balance takes precedence over mathematical centering: asymmetric
  shapes (triangles, chevrons, arrowheads) are allowed up to roughly ±0.5
  unit of deviation from the canvas's literal center if that is what makes
  them *look* centered.

## 7. Alignment and symmetry rules

- Glyphs built from repeated primitives (bars, dots, tracks) default to a
  shared left/top alignment (e.g. `settings`' three tracks, the sort
  icons' bars) rather than independently justified positions, so the
  repetition itself reads as deliberate.
- Symmetric constructions (a plain chevron, a plain X) stay symmetric
  unless there is a specific, demonstrable reason to break symmetry.
  Asymmetry introduced only to look more "Spartan" is explicitly against
  this standard — see ADR-0003 and §14.

## 8. Mirroring requirements

- Any icon pair that represents directional opposites (`sort-asc` /
  `sort-desc`, and any future up/down or left/right pair) must be an
  **exact vertical or horizontal mirror** of each other — every coordinate
  related by `y′ = 24 − y` (or `x′ = 24 − x` for horizontal pairs), verified
  by construction (i.e. computed from the same source geometry), not
  redrawn independently and eyeballed into looking similar.
- A mirror relationship is a hard requirement, not a style goal: if the two
  icons in a directional pair are not exact mirrors, the pair is not
  approved regardless of how each one looks individually.

## 9. Minimum feature-size considerations (12–24px)

Because one artwork file serves every shipped size (§2), legibility at the
smallest size is the binding constraint, not an afterthought checked last:

- **12px is the size every construction is designed against first.** A
  stroke or feature that only works at 24px and above is not acceptable.
- At the 2.0-unit canonical stroke, 12px resolves to **1.0 physical px** at
  1× — the floor below which a stroke becomes unreliable across browsers.
  At 1.9-unit diagonal compensation, 12px resolves to **0.95px** — accepted
  as the existing family tolerance (present since the original `x` and
  `check` constructions), not something to silently regress further below.
- Enclosed loops need to clear roughly 4 physical px of interior hollow
  space at 12px to read as a ring rather than a filled dot — this is what
  drove the `user` head from ⌀7 to ⌀8 during the foundational review.
- Small filled accents (e.g. `settings`' thumb dots) are held to a lower
  bar than open strokes — filled shapes read smaller than open loops at
  equal size — but should still be checked at true 12px, not assumed fine.

## 10. Optical-review requirements

Satisfying every rule in §3–§9 numerically does **not** constitute
approval. This standard requires a separate, explicit **optical** review
before any construction is considered final:

1. Inspect the candidate at true, unscaled **12px**.
2. Inspect at true **16px**.
3. Inspect at true **20px**.
4. Inspect at true **24px**.
5. Inspect at a high-magnification / construction-grid view (the
   foundational review used a 96–120px specimen over a 2-unit gridline
   background with the live-area boundary marked).
6. Judge both **mathematical geometry** (does it satisfy §3–§9) and
   **optical appearance** (does it look muddy, cramped, decorative, or
   generic) — these are separate questions, and passing the first does not
   answer the second.
7. **Where strict mathematical geometry produces a poor small-size
   result, optical clarity wins.** A rule in this document exists to serve
   legibility and identity, not the other way around — if following a rule
   literally makes an icon read worse at 12px, that is a signal to revisit
   the construction, not a reason to ship it anyway.

This review is normative for every icon, foundational or not. The
`.scratch/icons/foundational-review.html` workspace (disposable, gitignored,
not part of the shipped project) is the visual tool this review is
performed in — it is validation tooling, not documentation. This Markdown
file is the durable rule set; the review HTML's per-iteration history is
not preserved once a construction is approved.

## 11. Combining and fusing multiple geometric elements

Some glyphs are naturally built from more than one stroke or shape (a
magnifying glass's lens and handle; a sort icon's bars and its directional
indicator). Two failure modes were identified during the foundational
review and are explicitly ruled on here:

- **Floating adjacency is not fusion.** Two elements placed near each
  other with a visible gap read as "two things," not "one glyph," no
  matter how well-proportioned each one is individually.
- **Preferred technique — coordinate-shared touch fusion.** When two
  separate stroke elements need to read as continuous, terminate them at
  the exact same coordinate. Round line caps (§5) naturally overlap at a
  shared point and read as one unbroken stroke.
- **Stronger technique — integrated single-path construction.** Where it
  does not compromise the semantic clarity of the individual sub-parts
  (§13), prefer building the fused region as **one continuous path** (e.g.
  a straight segment that bends directly into a pointed terminal) rather
  than two elements touching at a shared coordinate. This reads as more
  deliberate and is the stronger result where it's achievable without
  distorting what the sub-part needs to individually communicate.
- **Do not reintroduce collisions while fusing.** Fusing two elements must
  not cause a different part of the glyph to violate the minimum-gap rule
  (§4) against a third element. Moving a directional indicator into its own
  vertical or horizontal zone, clear of unrelated strokes, is an acceptable
  and often necessary precondition for fusing it safely with the one
  element it's meant to join.

## 12. Family-consistency requirements

- Family consistency is judged **as a set**, not icon-by-icon. Before
  approving a new construction, compare it against the rest of the
  approved set and ask: would these read as designed by the same hand if
  seen together, for reasons beyond sharing a stroke width?
- Shared angle preferences (§6), shared alignment conventions (§7), and
  shared fusion techniques (§11) are the intended connective tissue.
  **Copying a specific numeric value from one icon to another purely for
  consistency, when that value does not suit the second icon's own
  proportions, is not consistency — it is numerical mimicry and is
  explicitly against this standard.**
- Not every icon needs to carry the same visual "weight" or drama.
  Directional/structural marks (`arrow-right`, `check`, chevrons) are
  expected to carry more of the family's distinctive character than
  data/structural glyphs (sort indicators, table icons) or icons that are
  inherently curve-based (`search`, `user`). A restrained supporting-cast
  icon is not a failure of the standard.

## 13. Silhouette and recognizability requirements

- An icon's semantic meaning must remain unambiguous after any angularity
  or fusion treatment. A `sort-asc` icon that no longer clearly reads as
  "sort, ascending" has failed regardless of how distinctive it looks.
- Reworked geometry must be checked against **plausible misreadings**, not
  just against its own intended meaning — the foundational review rejected
  a bar-capping chevron construction for `sort-asc`/`sort-desc` specifically
  because, magnified, it read as a filter/funnel icon rather than a sort
  icon. A construction that is internally elegant but externally
  ambiguous is not approved.
- Decorative geometry — detail added because it looks more "Spartan" but
  carries no construction or legibility purpose — is not permitted. Every
  angle, fusion, or proportion choice must trace back to one of: legibility
  at small size, family consistency, or the glyph's own semantic clarity.

## 14. When filled geometry is appropriate

- RedSpartan icons are **outline-first**. There is no parallel filled
  icon style, and introducing one is a decision beyond this standard's
  current scope (it would need its own API surface — a new class modifier
  — which has not been authorized).
- Small **filled accents inside an otherwise-outlined glyph** are
  permitted where they function as a secondary detail, not the glyph's
  primary carrier of meaning — e.g. `settings`' filled thumb dots atop
  outlined tracks. A filled accent must still pass the 12px optical check
  (§9, §10) on its own.
- A glyph should not be converted to a fully filled/solid treatment to
  solve a legibility problem — that is a style change, not a fix, and is
  out of scope for an individual icon's construction review.

## 15. Approval and freeze criteria

An icon construction is **approved and frozen** only when all of the
following are true:

1. It satisfies the mechanical rules in §2–§9 (grid, live area, stroke
   family, caps/joins, mirroring where applicable, minimum feature sizes).
2. It has been optically reviewed per §10, at true 12/16/20/24px plus a
   magnified/construction-grid view — not judged from the coordinate math
   alone.
3. It has been evaluated as part of the family per §12, not only in
   isolation.
4. Its semantic clarity has been explicitly checked per §13, including a
   deliberate look for plausible misreadings.
5. The design lead has given explicit visual approval against the
   rendered comparison (current vs. revised), not the source coordinates.

Once frozen, a construction is not re-opened for further iteration without
a new, explicit review request. "Frozen" means the geometry is settled —
subsequent work on the icon set should treat it as a fixed reference point,
the same way `arrow-right`'s revised spearhead tip became the reference
character for evaluating other candidates during this pass, not a floor to
build further changes on top of without cause.

---

## 16. RedSpartan as an independent iconography system

**RedSpartan icons are an original iconography system.** They are not a
themed or recolored adaptation of Feather, Lucide, Material Symbols,
Heroicons, Font Awesome, Bootstrap Icons, or any other existing icon
library. This is a project decision, not an incidental style preference —
see [ADR-0003](../adr/0003-independent-iconography-system.md) for the full
context.

- Existing icon libraries may be **consulted for semantic reference
  only** — understanding what concept a glyph conventionally communicates
  (a magnifying glass means search) is unavoidable and fine. Their
  **geometry, proportions, or construction patterns must never become the
  source** for a RedSpartan icon's actual path data.
- **RedSpartan color + another library's geometry does not constitute a
  RedSpartan icon.** Applying this design system's stroke width, palette,
  or mask-rendering technique to a traced, copied, or lightly-modified
  shape from an existing library does not satisfy this standard, no matter
  how compliant the numbers look.
- Every construction rule in this document (§2–§14) exists to give
  RedSpartan's own construction language — not familiarity with an
  existing library's visual vocabulary — priority when a design decision
  is being made.

---

## Related documents

- [ADR-0003 — Independent RedSpartan Iconography System](../adr/0003-independent-iconography-system.md) — why this standard exists.
- `.scratch/icons/foundational-review.html` (local, gitignored, not part of the shipped project) — the current visual validation workspace where constructions are inspected against this standard before approval.
- [`docs/icons.md`](../icons.md) — the consumer-facing usage documentation for the shipped icon system (class API, sizing, component integration). This standard governs how the shapes themselves are constructed; `docs/icons.md` governs how consumers use the finished result.

---
Source: this document is the normative construction specification; it has no single shipped-CSS source file to point to the way component docs do.
