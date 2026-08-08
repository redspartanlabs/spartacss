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

5. **Run the full build and verification suite.**
   `npm run build` followed by `npm run verify`. If verification reports
   drift, confirm the drift is the *expected* consequence of this
   release's intentional changes (diff it line-by-line) before
   regenerating any committed baseline — never regenerate a baseline to
   silence an unexplained failure.

6. **Perform a final diff and commit-content review.**
   `git diff --stat HEAD` and a full `git diff HEAD` — confirm every
   changed file is accounted for by step 2's scope, with no stray or
   unexpected files.

7. **Commit the release changes.**

8. **Verify the commit.**
   `git status --short` (clean) and `git rev-parse HEAD` (matches the
   commit you intended to create).

9. **Create the annotated version tag** (`git tag -a vX.Y.Z <commit> -m "..."`).

10. **Verify the tag dereferences to the intended commit.**
    `git rev-parse vX.Y.Z^{}` must equal the commit hash from step 8.

11. **Push the commit.**

12. **Push the tag.**

13. **Verify both remote refs.**
    `git ls-remote origin refs/heads/<branch>` and
    `git ls-remote origin refs/tags/vX.Y.Z` — confirm the remote branch
    tip matches the pushed commit, and the tag exists on `origin`.

14. **Create the GitHub release from the existing tag.**
    Do not create a new tag as part of this step — use the tag already
    pushed in step 12.

15. **Verify the published release targets the exact commit.**
    Confirm the release's target commit matches the tag's dereferenced
    commit from step 10.

16. **Confirm no unexpected files, commits, tags, or releases exist.**
    A final `git status --short`, `git log` spot-check, and `git tag
    --list` / GitHub releases list review.

## Non-negotiable agreement check

Before publishing (step 14), `package.json`'s `version`,
`package-lock.json`'s `version`, the new `CHANGELOG.md` entry's version
heading, the git tag name, and the GitHub release's tag must all read
the **same version number**. If any of the five disagree, stop and fix
the mismatch before proceeding — do not publish a release where these
are inconsistent.
