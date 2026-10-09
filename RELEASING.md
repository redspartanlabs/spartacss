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

## Publishing to npm

Registry publication is a **separate release step** that follows the GitHub
Release. Steps 1–18 above end with the GitHub Release verified; none of them
publishes to npm, and creating the GitHub Release does not publish the
package. The registry and the package name are recorded in
[ADR-0006](docs/adr/0006-npm-registry-distribution.md).

Release `1.0.2` exists on GitHub only and is not published to npm. Release
`1.0.3` is the first release intended for npm; it is prepared through steps
1–18 and then this section.

**Publication is permanent.** Once a version is published to npm it cannot be
reused or replaced, and unpublishing does not free the version number. A
defect found after publication is corrected by a new version, never by
publishing the same version again.

Work through these steps in order and stop at the first failure. Do not
publish until every preflight step passes.

### Preflight

P1. **Confirm the release commit and tag.** Work from a fresh clone, so the
sources and `dist/` have LF line endings. `git status --short` must return
nothing, `git cat-file -t vX.Y.Z` must print `tag` (an annotated tag, not a
lightweight one), `git rev-parse HEAD` must equal `git rev-parse vX.Y.Z^{}`,
and `git ls-remote origin "refs/tags/vX.Y.Z^{}"` must print the same commit.
The GitHub Release for `vX.Y.Z` must exist and be published.

P2. **Confirm the name and version.**
`node -p "require('./package.json').name"` must print
`@redspartanlabs/spartacss`, and
`node -p "require('./package.json').version"` must print exactly the version
being published. `node -p "require('./package-lock.json').version"` must print
the same version, and both must agree with the changelog heading and the tag
(see the agreement check below).

P3. **Rebuild and verify.** Run `npm ci`, `npm run clean && npm run build`,
`npm run verify` and `npm run verify:artifact`. Then `git status --short`
must again return nothing. A rebuilt `dist/` that differs from the committed
one means stop: the release commit no longer matches its sources.

P4. **Inspect and create the package.** `npm pack --dry-run` must report
`@redspartanlabs/spartacss@X.Y.Z`, and the `dist/` CSS must contain no CR
bytes. Then create the tarball outside the repository, and write the JSON report
to a file outside the repository as well:

```
npm pack --pack-destination <directory> --json > <directory>/pack.json
```

The JSON output gives the tarball's `filename`, its `integrity` and its `shasum`.
Record both values exactly as printed. `integrity` is an SRI string, `sha512-`
followed by a base64 digest; `shasum` is a SHA-1 digest of 40 hexadecimal
characters. The human-readable `npm pack` output truncates the integrity, so
use the JSON. Then recompute the integrity independently from the tarball file:

```
node -p "'sha512-'+require('crypto').createHash('sha512').update(require('fs').readFileSync(process.argv[1])).digest('base64')" <tarball>
```

It must print a string identical to the recorded `integrity`. The command uses
no shell-specific syntax and gives the same result in Git Bash, PowerShell and
`cmd.exe`. A hexadecimal digest, for example the output of `shasum -a 512`, is
a different encoding of the hash and must never be compared with npm's
`integrity` or treated as equal to it. Compare like with like only.

**Check the file list.** The expected inventory is derived, not asserted. It is
every file that Git tracks at the tag under the paths in `package.json`'s
`files` list, plus the three files npm always includes (`package.json`,
`README.md` and `LICENSE`). Compare it with the complete file list in
`pack.json`, running this from the repository root:

```
node -e "const{execSync}=require('child_process'),fs=require('fs');const j=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));const p=Array.isArray(j)?j[0]:Object.values(j)[0];const actual=p.files.map(f=>f.path).sort();const pj=JSON.parse(execSync('git show '+process.argv[2]+':package.json',{encoding:'utf8'}));const paths=[...new Set([...pj.files,'package.json','README.md','LICENSE'])];const expected=execSync('git ls-tree -r --name-only '+process.argv[2]+' -- '+paths.join(' '),{encoding:'utf8'}).split(/\r?\n/).filter(Boolean).sort();const missing=expected.filter(f=>!actual.includes(f)),unexpected=actual.filter(f=>!expected.includes(f));console.log('expected',expected.length,'packed',actual.length,'missing',JSON.stringify(missing),'unexpected',JSON.stringify(unexpected));process.exit(missing.length||unexpected.length?1:0)" <directory>/pack.json vX.Y.Z
```

**Check the documentation contract.** `npm run verify` has already checked the
working tree. Check the package itself too: extract the tarball into an empty
directory outside the repository (for example by running
`tar -xzf <tarball>` from inside that directory), then run this from the
repository root:

```
node scripts/verify-docs-preview.mjs <empty directory>/package
```

It must print `OK`. Any other result means stop and report.

It prints the expected and packed counts, the files missing from the package
and the unexpected files in it, and exits non-zero unless both lists are empty.
Any missing or unexpected file means stop. Because `npm pack` also packs
untracked files, an untracked file in the working tree shows up as unexpected.
That exact tarball is what is published.

P5. **Confirm the registry target.** `npm config get registry` must print
`https://registry.npmjs.org/`, and `npm config get @redspartanlabs:registry`
must not point anywhere else (it prints `undefined` when unset).

P6. **Confirm authentication and access, without exposing credentials.**
`npm whoami` must print the intended publisher account; it fails with
`ENEEDAUTH` when no one is logged in, and publication must not proceed. Confirm
that the account may publish to the `@redspartanlabs` scope, for example with
`npm org ls redspartanlabs <account>` or the organization's page on
npmjs.com. Never print, paste, commit or log a token, a one-time password or
the contents of an `.npmrc`, never put an `--otp` value on a command line,
and never run a command that echoes `_authToken`. Log in interactively with
`npm login`, or use a short-lived automation token supplied by the
environment's secret store.

P7. **Confirm the version is available.** Run
`npm view @redspartanlabs/spartacss@X.Y.Z version`. Only one outcome means the
version appears absent: an `E404` (Not Found) for a request to
`https://registry.npmjs.org/` itself, with that URL named in the error output.
Every other outcome is inconclusive, and you must stop and investigate rather
than assume the version is free: authentication or authorization errors
(`ENEEDAUTH`, `E401`, `E403`), network or DNS failures (`ENOTFOUND`,
`ETIMEDOUT`, `ECONNRESET`), rate limits (`E429`), `5xx` responses, empty or
unexpected output, and a 404 that does not name the intended registry. If the
command prints a version, **stop**: that version exists and must never be
overwritten. Choose a new version through the normal procedure. A confirmed
`E404` does not show that the package or scope is yours, because npm's message
says the package "could not be found or you do not have permission to access
it"; access is established by P6, not by P7. An `E404` for the package as a
whole is expected before its first publication.

### Publish

1. **Dry run.** `npm publish <tarball> --access public --dry-run`. Confirm the
   package name, the version and the file list once more. `--access public`
   is required because scoped packages are private by default.
2. **Publish once.** `npm publish <tarball> --access public`, using the
   tarball recorded in P4 and never a fresh `npm publish` from the working
   tree. Change nothing — no rebuild, no content edit, no version change —
   between preflight and publication.
3. **If the result is ambiguous** (a timeout, a dropped connection, a 5xx
   response, an interrupted command), do **not** retry. First run
   `npm view @redspartanlabs/spartacss@X.Y.Z version dist.integrity`, allowing a
   few minutes for the registry to settle. If the version is present and its
   `dist.integrity` is identical, as a string, to the `integrity` recorded in
   P4, publication succeeded and verification continues. If it is present and
   differs, stop and report. Only if the version is confirmed absent may one
   retry be considered, and only with the owner's approval.

### Verify publication

V1. **Metadata.**
`npm view @redspartanlabs/spartacss@X.Y.Z name version dist.integrity dist.shasum`
must report the expected name and version, a `dist.integrity` identical to the
`integrity` recorded in P4, and a `dist.shasum` identical to the recorded
`shasum`. Compare SRI with SRI and SHA-1 hex with SHA-1 hex. `npm view
@redspartanlabs/spartacss dist-tags` must show `latest` as the new version for
an ordinary release.

V2. **Contents.** Download the published package with
`npm pack @redspartanlabs/spartacss@X.Y.Z --pack-destination <directory> --json`.
Its `integrity` must be identical to the value recorded in P4, and recomputing
the integrity of the downloaded file with the P4 command must print the same
string. Then compare its file list with that of the tarball verified in P4. Any
difference means stop and report.

V3. **Clean consumer install.** In an empty temporary directory outside the
repository, run `npm init -y` and `npm install @redspartanlabs/spartacss@X.Y.Z`.
Confirm that `node_modules/@redspartanlabs/spartacss/package.json` reports
X.Y.Z, that `dist/spartacss.css` and `docs/README.md` are present, and that an
exported entry resolves, for example
`node -p "require.resolve('@redspartanlabs/spartacss/sparta-all.min.css')"`.
Also confirm that the Git-tag install still works in a fresh directory:
`npm install github:redspartanlabs/spartacss#vX.Y.Z`.

V4. **Only after V1–V3 pass,** the README may be updated to say that the
version is published. That is a follow-up change after the tag and is not part
of the tagged release. It must not be made earlier.

The GitHub Release and the npm publication are verified separately. Neither
verifies the other.

## Non-negotiable agreement check

Before publishing (step 16), `package.json`'s `version`,
`package-lock.json`'s `version`, the new `CHANGELOG.md` entry's version
heading, the git tag name, and the GitHub release's tag must all read
the **same version number**. If any of the five disagree, stop and fix
the mismatch before proceeding — do not publish a release where these
are inconsistent.

For an npm publication the same version must also be the one that npm
reports, and the published `dist.integrity` must be identical to the
`integrity` recorded in P4. If they disagree, stop and report. Never repair a
published version in place: a corrective release takes a new version number.

The same applies to the release artifact itself: the `dist/` committed in
step 9 must be exactly the output of steps 5–6 — a clean rebuild,
verified by `npm run verify` and `npm run verify:artifact` — performed
immediately before it was force-added in step 7. If any source change
lands between that build and the commit, rebuild and re-verify before
committing; never commit a `dist/` that predates the source tree it's
being released alongside.
