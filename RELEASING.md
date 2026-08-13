# Releasing SpartaCSS

This document defines the **operational procedure** for cutting a SpartaCSS
release. It answers *how* to release. It does not define what counts as a
breaking change — that question is answered by
[`docs/adr/0002-versioning-and-stability-policy.md`](docs/adr/0002-versioning-and-stability-policy.md).
Classify the release's contents against that ADR before starting this
checklist; this document assumes that classification is already done.

## Checklist

Work through these steps in order. Do not skip ahead — several steps exist
specifically because skipping them has caused real problems in past
releases (see `CHANGELOG.md`'s `0.9.1` entry).

1. **Confirm the working tree is clean.**
   `git status --short` must return nothing before starting.

2. **Classify the intended release and verify scope.**
   Decide the version number using [ADR-0002](docs/adr/0002-versioning-and-stability-policy.md)'s
   breaking/non-breaking definitions. Confirm the actual staged/intended
   changes match that classification — no unrelated cleanup, no scope
   creep beyond what was decided.

3. **Update `package.json`'s `version` field** to the exact intended
   release version. This step is easy to forget when a release is mostly
   documentation or a small fix — it must not be skipped regardless of
   how small the release is.

   Immediately after updating `package.json`, synchronize
   `package-lock.json`'s root `"version"` fields (it appears twice — the
   top-level field and the `""` entry under `"packages"`) to the same
   release version. `npm install --package-lock-only` (or a normal
   `npm install`) can be used to synchronize the lockfile; review the
   resulting diff for any unintended dependency changes before
   committing it — only the version fields should change.

   Also check for stale prose version references outside
   `package.json`/`CHANGELOG.md` — `README.md` in particular has drifted
   before and should always be checked (e.g.
   `grep -n "is at \`" README.md`).

4. **Update `CHANGELOG.md`.** Add a new `## [x.y.z] - YYYY-MM-DD` section
   describing the actual changes, and update the link-reference footer:
   `[Unreleased]` should point to `vX.Y.Z...HEAD`, and a new `[X.Y.Z]`
   comparison link should be added above the previous version's link.

5. **Clean and rebuild the distribution.**
   `npm run clean` followed by `npm run build`. Always rebuild from a
   clean `dist/` immediately before a release — never reuse a `dist/`
   left over from an earlier local build or an earlier step.

6. **Run the full verification suite.**
   `npm run verify` followed by `npm run verify:artifact`. If `verify`
   reports drift, confirm the drift is the *expected* consequence of this
   release's intentional changes (diff it line-by-line) before
   regenerating any committed baseline — never regenerate a baseline to
   silence an unexplained failure. `verify:artifact` must report every
   `package.json` `exports` entry as resolved; if any entry is missing,
   stop and fix the build before proceeding — do not force-add an
   incomplete `dist/`.

7. **Force-add the freshly generated `dist/`.**
   `dist/` is `.gitignore`d during normal development (see
   [ADR-0004](docs/adr/0004-git-tag-artifact-distribution.md)) and will
   not be picked up by a plain `git add`. Stage it explicitly:
   `git add -f dist`
   Only force-add the `dist/` produced by steps 5–6 immediately above —
   never a `dist/` from an earlier session or an earlier point in this
   checklist.

8. **Perform a final diff and commit-content review.**
   `git diff --stat HEAD` and a full `git diff HEAD` — confirm every
   changed file is accounted for by step 2's scope. Under this release
   architecture, the staged `dist/*.css` and `dist/*.min.css` files from
   step 7 are **expected** release content, not stray or unexpected
   files; confirm they're present and match the artifact set
   `verify:artifact` just reported, and that nothing *else* unexpected
   was staged alongside them.

9. **Commit the release changes.**
   This commit intentionally includes the `dist/` staged in step 7 —
   under Option A, the release commit is the artifact-bearing commit.

10. **Verify the commit.**
    `git status --short` (clean) and `git rev-parse HEAD` (matches the
    commit you intended to create).

11. **Create the annotated version tag** (`git tag -a vX.Y.Z <commit> -m "..."`).

12. **Verify the tag dereferences to the intended commit.**
    `git rev-parse vX.Y.Z^{}` must equal the commit hash from step 10.

13. **Push the commit.**

14. **Push the tag.**

15. **Verify both remote refs.**
    `git ls-remote origin refs/heads/<branch>` and
    `git ls-remote origin refs/tags/vX.Y.Z` — confirm the remote branch
    tip matches the pushed commit, and the tag exists on `origin`.

16. **Create the GitHub release from the existing tag.**
    Do not create a new tag as part of this step — use the tag already
    pushed in step 14.

17. **Verify the published release targets the exact commit.**
    Confirm the release's target commit matches the tag's dereferenced
    commit from step 12.

18. **Confirm no unexpected files, commits, tags, or releases exist.**
    A final `git status --short`, `git log` spot-check, `git tag --list`
    / GitHub releases list review, and `git ls-tree -r --name-only
    vX.Y.Z -- dist` to confirm the pushed tag's tree actually contains
    the built `dist/*.css` artifacts.

## Non-negotiable agreement check

Before publishing (step 16), `package.json`'s `version`,
`package-lock.json`'s `version`, the new `CHANGELOG.md` entry's version
heading, the git tag name, and the GitHub release's tag must all read
the **same version number**. If any of the five disagree, stop and fix
the mismatch before proceeding — do not publish a release where these
are inconsistent.

The same applies to the release artifact itself: the `dist/` committed in
step 9 must be exactly the output of steps 5–6 — a clean rebuild,
verified by `npm run verify` and `npm run verify:artifact` — performed
immediately before it was force-added in step 7. If any source change
lands between that build and the commit, rebuild and re-verify before
committing; never commit a `dist/` that predates the source tree it's
being released alongside.
