# ADR-0006: npm Registry Distribution

**Status:** Accepted (2026-10-09)

---

## Context

ADR-0001 Decision 7 made distribution phased: consumers first depend on a
fixed, tag-pinned Git reference, with a registry-published release to follow
"once a distribution target is chosen". ADR-0001 left two items open: the
package registry, and the package name including its scope. ADR-0002 and
ADR-0003 carried both items forward unchanged, and ADR-0004 carried the
registry-publication item forward. ADR-0004 also left a question for the
registry phase: whether a registry release would reuse its
artifact-distribution contract or need a decision record of its own.

`package.json` already names the package `@redspartanlabs/spartacss`, and
consumers already install it through npm's Git-dependency mechanism. This
record settles the registry target so the README and `RELEASING.md` can state
it. It does not record that any version has been published.

---

## Decision

1. **npm is SpartaCSS's intended registry**, using the public registry at
   `https://registry.npmjs.org/`.
2. **The package name is `@redspartanlabs/spartacss`**, the name already in
   `package.json`.
3. **GitHub remains the canonical home** for source, tags, release history and
   GitHub Releases. The npm package is a distribution channel for a release
   that already exists as a commit and an annotated tag; it is never the
   source of a release.
4. **The npm release reuses ADR-0004's artifact contract.** A published
   version contains what the `files` whitelist selects from the tagged release
   tree, with the prebuilt `dist/` artifacts, so installing it does not run
   SpartaCSS's build. The Git-tag install and the npm install deliver the same
   release contents.
5. **The npm version equals the Git tag.** Version `X.Y.Z` is published only
   from the commit tagged `vX.Y.Z`, after that tag and its GitHub Release
   exist and are verified.
6. **Publication is a manual, separately approved step** after the GitHub
   Release. It is defined in `RELEASING.md`. Automating it, or attaching
   provenance attestations, is deferred.
7. **A published npm version is permanent.** It cannot be reused or replaced.
   Correcting a published release requires a new version.
8. **Git-tag installation remains supported** alongside the npm install.
9. **The package is public, and the publication procedure states that
   explicitly** by passing `--access public`. This record does not add
   `publishConfig` or change any package metadata.
10. **`1.0.2` is a GitHub release only and is not published to npm.** The
    first npm publication is intended to be version `1.0.3`, so that the
    published package carries this policy and the publication procedure. That
    release is prepared and approved separately.

This record states intent and policy. It does not assert that the
`@redspartanlabs` npm scope or organization exists or is controlled by the
project, that any version has been published, or that any publisher account
has access. Those are verified at publication time by the preflight checks in
`RELEASING.md`.

---

## Relationship to ADR-0001, ADR-0002 and ADR-0004

This ADR answers the registry and package-name items ADR-0001 left open. It
does not revise ADR-0001's phasing, ADR-0004's contract, or ADR-0002's
versioning and breaking-change rules.

ADR-0002 describes `1.0.0` as the first version whose breaking-change
classification is enforced against a "public, registry-published contract".
Whether that trigger applies to releases distributed by Git tag remains
undecided (see ADR-0005), and this record does not decide it.

---

## Consequences

**Benefits**
- Consumers get a conventional `npm install @redspartanlabs/spartacss` without
  Git-dependency preparation.
- Both channels deliver identical release contents, so there is one artifact
  contract to maintain.

**Tradeoffs**
- A published npm version cannot be corrected in place. A defect found after
  publication needs a new version and release.
- Publication adds credentials, organization access and an irreversible step
  to the release procedure.
- A scoped package is private by default on npm, so publication must request
  public access explicitly.

**Maintenance implications**
- `RELEASING.md` carries the publication procedure and its safeguards.
- The README describes npm as the intended channel until a version is
  verifiably published, and is updated only after that is confirmed.

---

## Future ADRs / Decisions

- **Registry ownership and access** — whether and how the `@redspartanlabs`
  scope is owned and who may publish. Not decided here and verified at
  publication time.
- **Provenance and publish automation** — whether publication is ever
  automated or carries provenance attestations. Deferred; publication stays
  manual until a later record decides otherwise. ADR-0004 likewise leaves
  CI-owned artifact production undecided.
- **Registry-published enforcement trigger** — raised in ADR-0005 as an open
  question about how ADR-0002's trigger applies to releases distributed by Git
  tag. Not decided here.
