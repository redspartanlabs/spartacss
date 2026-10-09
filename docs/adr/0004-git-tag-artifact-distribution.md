# ADR-0004: Git-Tag Release-Artifact Distribution

**Status:** Accepted (2026-08-13)

---

## Context

ADR-0001 Decision 7 establishes that SpartaCSS's distribution is phased:
initially consumers depend on a fixed, tag-pinned Git reference, with a
registry-published release to follow once a distribution target is chosen.
That decision establishes the *transport* (a tag-pinned Git dependency) but
does not specify what a consumer installing that tag actually receives.

The initial implementation of tag-pinned distribution relied on npm's
`prepare` lifecycle script (`"prepare": "npm run build"`) to build `dist/`
on the consumer's machine at install time. This made every `npm install
github:redspartanlabs/spartacss#<tag>` implicitly depend on SpartaCSS's own
build toolchain — Lightning CSS (via the `lightningcss-cli` native-binary
package) — succeeding on the consumer's machine, during npm's
git-dependency preparation flow, a context distinct from a normal
top-level install. A real installation attempt from an Angular application
on Windows failed during this step: `lightningcss-cli`'s platform-specific
binary was not correctly staged, and npm's Windows bin-shim generation
surfaced this as an "is not recognized as an internal or external command"
error. Investigation confirmed this was not an isolated Windows quirk but
a structural consequence of requiring a consumer-side build: `dist/` has
never been tracked in Git (it is `.gitignore`d) and was absent from every
existing tag, so `prepare` — not the consumer's own dependency footprint —
was the only thing standing between a tag-pinned install and a completely
empty package.

This ADR records the corrected distribution contract: what a Git-tag
install delivers, and why.

---

## Decision

1. **Git-tag installation is an artifact-distribution mechanism, not a
   source-distribution mechanism.** `npm install
   github:redspartanlabs/spartacss#<tag>` delivers a finished,
   ready-to-use package — not a source checkout the consumer must build.
2. **Release tags contain prebuilt `dist/` artifacts.** The tree at any
   release tag includes the built `dist/*.css` and `dist/*.min.css` files
   required by `package.json`'s `exports` map, alongside `LICENSE`,
   `NOTICE`, and `README.md` (per the existing `files` whitelist).
3. **`dist/` remains intentionally absent from normal development
   commits.** Day-to-day commits on `main` stay source-oriented; `dist/`
   is `.gitignore`d throughout ordinary development and is never
   committed as part of routine work.
4. **Release commits intentionally include `dist/`.** At the point a
   release is cut, the freshly built and verified `dist/` is force-added
   (`git add -f dist`) and becomes part of that specific commit — the one
   exception to Decision 3, scoped to the release process itself.
5. **The release tag points directly at that release commit, on `main`'s
   normal history.** No tag-only branch, detached commit, or alternate
   ref topology is introduced by this decision; the existing
   single-branch model is unchanged.
6. **Consumers installing a tag do not execute SpartaCSS's build.** The
   `prepare` lifecycle script (`"prepare": "npm run build"`) has been
   removed from `package.json` specifically so that npm's git-dependency
   installation flow has no build step to run — installation is
   fetch-and-pack only.
7. **Consumers do not need Lightning CSS, `lightningcss-cli`, or any other
   SpartaCSS build-time dependency.** These remain `devDependencies`,
   relevant only to SpartaCSS's own development and release process.
8. **`package.json`'s `exports` map resolves to the prebuilt `dist/`
   files delivered by Decision 2** — no change to the `exports` map's
   shape or entry points was required or made by this decision.
9. **The release procedure that produces this artifact is defined in
   `RELEASING.md`**, which sequences a clean rebuild (`npm run clean &&
   npm run build`), verification (`npm run verify` and `npm run
   verify:artifact`), force-adding `dist/`, and committing/tagging — in
   that order — so that the `dist/` entering a release commit is always
   freshly generated from the exact source tree being released, never
   stale or partially rebuilt.

---

## Relationship to ADR-0001 and ADR-0002

This ADR is compatible with, and does not revise, ADR-0001's phased
distribution decision (Decision 7): it specifies the concrete contents of
the tag-pinned reference that decision already committed to, without
changing the phasing itself — a registry-published release remains a
future phase, not yet decided here.

This ADR does not change ADR-0002's versioning or breaking-change rules.
No `exports` entry was added, removed, or renamed, and no shipped CSS
changed as a result of this decision; per ADR-0002's own classification,
changes of this shape ("build tooling with no observable change to shipped
CSS") are non-breaking.

---

## Consequences

**Benefits**
- A tag-pinned Git install no longer depends on the consumer's machine
  being able to build SpartaCSS — eliminating the class of failure that
  motivated this decision.
- The release artifact is deterministic: the same `dist/` a Git-tag
  consumer receives is the one verified by `verify`/`verify:artifact`
  immediately before the release commit.
- No change to the public `exports` surface, module boundaries, or CSS
  output — this is purely a distribution-mechanism correction.
- Establishes an artifact-distribution contract that a future
  registry-published release can reuse directly, rather than requiring a
  second, divergent build/publish model later.

**Tradeoffs**
- Release commits carry a `dist/` diff that ordinary development commits
  do not — a deliberate, scoped exception to keeping `main`
  source-oriented, not a general practice.
- The release process now depends on a manual, correctly-ordered sequence
  (clean → build → verify → verify:artifact → force-add → commit) to
  guarantee the committed `dist/` is fresh; `RELEASING.md` encodes this
  ordering, but it remains a human-followed checklist rather than an
  automated guarantee.

**Maintenance implications**
- Any future change to `package.json`'s `exports` map or `files`
  whitelist should be checked against this ADR's Decisions 2 and 8 to
  confirm the release artifact still satisfies what consumers are told to
  expect.
- If and when a registry-published release (ADR-0001's later phase) is
  adopted, that work should confirm whether it reuses this same
  artifact-distribution contract or requires its own decision record —
  this ADR does not presume that answer. See
  [ADR-0006](0006-npm-registry-distribution.md).

---

## Future ADRs / Decisions

- **Registry publication** — carried forward from ADR-0001, unaffected
  and undecided by this ADR. Addressed later in
  [ADR-0006](0006-npm-registry-distribution.md).
- **CI-owned artifact production** — whether the release build/verify
  sequence in `RELEASING.md` is eventually automated in CI rather than
  run locally by a maintainer is not decided here; today's CI workflow is
  unchanged by this ADR and does not produce or publish release
  artifacts.
- **GitHub Release assets** — whether a downloadable artifact separate
  from the tagged Git tree is added later is not decided here.
