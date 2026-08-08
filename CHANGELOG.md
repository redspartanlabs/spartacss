# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html),
per ADR-0001.

## [0.9.2] - 2026-08-07

### Fixed

- Restored `@layer components` placement for `src/core/sparta-utilities.css`,
  the same correction applied to the icons and notifications modules in
  `0.9.1`. This file was unlayered with no documented rationale; two of
  its selectors (`.sp-navbar__toggle`, `.sp-alert__icon`) are the sole
  source of that property for their component, making this the same
  category of undocumented cascade-precedence gap ADR-0002 was written
  to close. No selector, declaration, value, or ordering changed — only
  cascade-layer membership was corrected.
- `package.json` `version` corrected to `0.9.2`. The `0.9.1` release was
  published with `package.json` still reading `"version": "0.9.0"` — a
  release-process metadata error (see the `0.9.1` entry below). This
  release restores agreement between the package version, the CHANGELOG,
  the git tag, and the GitHub release, per `RELEASING.md`.

### Added

- `RELEASING.md` — the operational release checklist, kept separate from
  `docs/adr/0002-versioning-and-stability-policy.md` (which defines what
  counts as a breaking change, not how to execute a release).

## [0.9.1] - 2026-08-07

### Fixed

- Restored `@layer components` placement for `sparta-icons.css` and
  `sparta-notifications.css`. Both modules were unlayered from
  extraction through `0.9.0` — an undocumented oversight, not a
  deliberate design choice (the pre-extraction monolith's rules
  originated inside `@layer components`; see `docs/extraction-plan.md`).
  No selector, declaration, value, or ordering changed — only
  cascade-layer membership was corrected.
- Added the missing `--sp-shadow-xl` design token. It was referenced by
  the Confirm/Dialog component's `box-shadow` but never defined, which
  silently dropped the shadow entirely. The token now resolves correctly
  across the default, light, and dark themes.

### Added

- `Source:` footers to `docs/app-shell.md`, `docs/layout.md`, and
  `docs/theming.md`, bringing them in line with the documentation
  convention established in `0.8.0`/`0.9.0`.
- `docs/adr/0002-versioning-and-stability-policy.md` — defines what
  constitutes a breaking change for SpartaCSS ahead of `1.0.0`, using
  the `@layer` correction above as its founding precedent.

### Known issue

- This release was published with `package.json` still reading
  `"version": "0.9.0"` instead of `0.9.1` — a release-process metadata
  error, not a CSS API change. The published `v0.9.1` git tag and GitHub
  release are unaffected and remain the authoritative historical
  artifacts for this version; they have not been modified. The version
  field was corrected in `0.9.2`.

## [0.9.0] - 2026-08-07

### Added

- Component and module documentation completing the coverage started in
  `0.8.0`, using the established consumer-facing template and the
  combine-when-shared-source-file convention:
  - `docs/drawer.md` — including the `.sp-backdrop` relationship and the
    consumer responsibility around toggling it alongside `--open`.
  - `docs/dropdown.md`
  - `docs/table.md`
  - `docs/tabs.md`
  - `docs/pagination.md`
  - `docs/breadcrumbs.md`
  - `docs/stat.md`
  - `docs/avatar.md` (`.sp-avatar` + `.sp-avatar-group`)
  - `docs/progress.md` (Spinner, Progress Bar, and Skeleton)
  - `docs/list.md`
  - `docs/link.md`
  - `docs/divider.md`
  - `docs/kbd.md`
  - `docs/empty-state.md`
  - `docs/code.md` (inline code, code blocks, and syntax tokens)
  - `docs/page-header.md`
  - `docs/icons.md`
  - `docs/notifications.md` (Toast, Alert Banner, and Confirm/Dialog)
- `--sp-ease-in` and `--sp-ease-back` in `sparta-tokens.css` — previously
  referenced by the notifications module's Toast exit, Dialog overlay
  exit, and Dialog entrance animations but never defined, which silently
  dropped all three animations. Purely additive; no existing token
  changed.
- `.sp-modal--closing` support for the supported Modal API
  (`.sp-modal__overlay` / `.sp-modal__content`), mirroring the exit
  transition the frozen legacy API (`.sp-modal-backdrop` /
  `.sp-modal__dialog`) already had — closing a parity gap named at
  `0.6.0`. Legacy behavior is unchanged.

### Changed

- `docs/tooltip.md`, `docs/accordion.md`, `docs/modal.md` now link to
  `docs/motion.md` and `docs/accessibility.md` for reduced-motion and
  CSS-vs-JavaScript responsibility guidance instead of only stating it
  inline.
- `docs/modal.md` updated to reflect that `.sp-modal--closing` is now
  supported by both the current and legacy Modal APIs.

## [0.8.0] - 2026-08-06

### Added

- Foundation documentation:
  - `docs/tokens.md` — token naming conventions, the color system,
    typography tokens, the spacing scale, and reference-vs-override
    guidance.
  - `docs/motion.md` — transition tokens, the animation layer, and the
    `prefers-reduced-motion` contract.
  - `docs/accessibility.md` — CSS vs. JavaScript responsibility, keyboard
    and focus expectations, ARIA responsibility boundaries, and semantic
    HTML expectations.
- Component documentation, using the established consumer-facing template
  (Purpose, Usage, Class API, Variants, State modifiers, Accessibility,
  Source reference):
  - `docs/button.md`
  - `docs/forms.md`
  - `docs/card.md`
  - `docs/badge.md`
  - `docs/alert.md`

### Changed

- Documentation is now organized around a clear separation of concerns:
  repository Markdown as the source of truth, foundation guidance (tokens,
  motion, accessibility) separated from component API usage, and
  accessibility responsibilities documented centrally rather than repeated
  per component.

## [0.7.0] - 2026-08-04

### Changed

- Package maturity work: `package.json` `version` bumped `0.2.0` → `0.7.0`.
- `package.json` `description` replaced with a framework-agnostic tagline:
  "A framework-agnostic CSS design system built for systems that must
  last."
- Removed `"private": true` from `package.json` — SpartaCSS is now intended
  for public npm distribution rather than being flagged as an internal
  package.

### Added

- `homepage` field in `package.json`, pointing at the repository's README.
- `keywords` field in `package.json` (`css`, `design-system`,
  `framework-agnostic`, `frontend`, `web-development`) for registry
  discoverability.

## [0.6.0] - 2026-08-02

### Added

- `--sp-bg-inverse` in `sparta-tokens.css` — a theme-invariant surface
  token (`:root` only, not overridden per theme), mirroring the existing
  theme-invariant `--sp-text-inverse`. Needed because every other
  `--sp-bg-*` token flips per theme, but inverse-context UI (Tooltip's
  surface) needs a background that stays dark regardless of the active
  theme so its `--sp-text-inverse` text stays legible. Verified no
  existing token already covered this before adding it.
- `docs/tooltip.md`, `docs/accordion.md`, `docs/modal.md` — the first
  usage documentation for these three components, each naming the
  supported and documented selector set and pointing at its frozen
  legacy counterpart.

### Changed

- `.sp-tooltip__text` (`sparta-tooltip.css`) now sources its background
  from `--sp-bg-inverse` instead of a hardcoded `#111111` literal.
  Value-for-value substitution only — no visual change in either theme,
  since the supported tooltip API never varied by theme to begin with.
- `.sp-tooltip__text` now respects `prefers-reduced-motion: reduce`,
  disabling its show/hide transition — ported from the legacy
  `[data-tooltip]` implementation, which already had this and the
  supported one didn't.
- `.sp-tooltip`/`.sp-tooltip__text`, `.sp-accordion__header`/
  `.sp-accordion__icon`, and `.sp-modal__overlay`/`.sp-modal__content`
  are now explicitly designated the supported, documented API for
  Tooltip, Accordion, and Modal respectively. Their legacy counterparts
  (`[data-tooltip]`/`.sp-tooltip--visible`, `.sp-accordion__trigger`/
  `.sp-accordion__content--animated`, `.sp-modal-backdrop`/
  `.sp-modal__dialog`) are now explicitly marked frozen in source
  comments — same convention as `.sp-flex`/atomic utilities since
  `0.4.0`. This closes debt named at extraction (see `0.2.0`'s
  "Unchanged (verified)" section and ADR-0001) but never resolved.

### Unchanged (verified)

- No legacy selector was removed, renamed, or had its computed output
  changed. `[data-tooltip]`, `.sp-tooltip--visible`,
  `.sp-accordion__trigger`, `.sp-accordion__content--animated`,
  `.sp-modal-backdrop`, and `.sp-modal__dialog` render identically to
  `0.5.0` — confirmed via baseline diff showing zero lines touched in
  any of their rules.
- No new components. No `.sp-sidebar` work — still deferred per `0.5.0`.
- Modal's legacy-only `--closing` exit-transition state was not ported
  to the supported and documented API — a real feature gap, but out of
  scope for this consolidation release; tracked as future work.
- Accordion's legacy `::after`-mask chevron approach was not ported to
  the supported and documented API — a design choice (DOM child vs.
  pseudo-element icon), not a bug.
- No JavaScript shipped.

## [0.5.0] - 2026-07-30

### Added

- `.sp-navbar` component (`src/components/sparta-navbar.css`) —
  `__brand`/`__links`/`__link`/`__actions`/`__toggle` slots, `--open` state
  modifier for a mobile-collapsed menu below the existing `768px`
  breakpoint. Resolves the dangling `.sp-navbar__toggle` icon-color rules
  (`sparta-utilities.css`, `sparta-icons.css`) and the `.sp-navbar` print
  rule (`sparta-accessibility.css`) that have existed with no component
  behind them since before the modular architecture split.
- `.sp-app-shell` pattern (`src/patterns/sparta-app-shell.css`) — a thin
  page-level wrapper composing Navbar with the existing `.sp-container`/
  `.sp-stack` primitives. Two rules only (`.sp-app-shell`,
  `.sp-app-shell__main`); the composition itself is documented, not
  reimplemented as new layout CSS.
- `docs/app-shell.md` — Navbar API reference, the `--open` state contract
  (no JS shipped, consumer-toggled, same convention as `.sp-modal--open`/
  `.sp-accordion__item--open`), and the App Shell composition guide with
  starter markup.

### Unchanged (verified)

- No Sidebar component or sidebar-based shell was added. The `.sp-sidebar`
  reference in `sparta-accessibility.css`'s print rule remains
  unimplemented — deferred, not resolved by this release.
- No new utility classes; `.sp-container`/`.sp-stack`/`.sp-cluster`/
  `.sp-grid` and the frozen `.sp-flex`/atomic utility layer are unchanged.
- No JavaScript shipped.

## [0.4.0] - 2026-07-29

### Added

- `.sp-cluster` in `sparta-layout.css` — a wrapping horizontal composition
  primitive (`--center`, `--sm`/`--lg`/`--xl` gap, `--justify-between`/
  `--justify-end`). No default cross-axis alignment: centering is opt-in via
  `--center` rather than assumed.
- `.sp-grid--auto` — an intrinsically responsive grid mode
  (`repeat(auto-fit, minmax(15rem, 1fr))`) requiring no breakpoint, alongside
  the existing explicit `--cols-N` variants.
- `--sp-container-base`/`--sp-container-sm`/`--sp-container-md`/
  `--sp-container-lg` tokens in `sparta-tokens.css`, plus a comment
  documenting the two canonical breakpoints (`640px`, `768px`) already in
  use across `sparta-layout.css`'s media queries.
- `docs/layout.md` — documents the four supported layout primitives
  (`.sp-container`, `.sp-stack`, `.sp-cluster`, `.sp-grid`), the breakpoint
  scale, and the legacy status of `.sp-flex`/atomic utilities.

### Changed

- `.sp-container` and its `--sm`/`--md`/`--lg` modifiers now source their
  max-width from the new container tokens instead of inline pixel literals.
  Value-for-value substitution only — no visual change.
- `.sp-flex` and the atomic spacing/sizing/display utility classes
  (`.sp-p-*`, `.sp-m-*`, `.sp-w-*`, `.sp-h-*`, display helpers, etc.) are now
  explicitly documented as frozen/legacy in both `sparta-layout.css` and
  `docs/layout.md`. Not removed, not modified — retained for backward
  compatibility, but will not receive new variants going forward.

### Unchanged (verified)

- `.sp-container`, `.sp-stack`, `.sp-flex`, and every atomic utility class
  render identically to `0.3.0`. This release is additive curation, not a
  rewrite — no existing selector was renamed or removed.

## [0.3.0] - 2026-07-29

### Added

- `data-theme="dark"` / `.sp-dark` — explicit dark-mode override in
  `sparta-tokens.css`, for consumers who want to state their theme choice
  explicitly rather than relying on the implicit default. Functionally
  equivalent to the default; added purely for API symmetry with the existing
  `data-theme="light"` / `.sp-light` opt-in.
- `.sp-field--warning` (and `.sp-field__warning`) in `sparta-form.css` — a
  third field-validation state alongside the existing `--error`/`--success`
  modifiers, giving forms a complete error/warning/success trio. Modeled
  structurally on `.sp-field--error`.
- `docs/theming.md` — documents the theming precedence contract (default,
  explicit dark, explicit light) and which tokens are theme-dependent.

### Unchanged (verified)

- Dark remains the unconditional default theme when no explicit override is
  set. SpartaCSS does not read `prefers-color-scheme` and will not switch
  themes based on OS/browser preference — this was evaluated during
  development and deliberately rejected to preserve SpartaCSS's dark-first
  product direction. Existing consumers see no behavior change.

## [0.2.0] - 2026-07-28

### Added

- Modular `src/` architecture: the single-file `spartacss.css` source has
  been split into `core/` (tokens, reset, base, layout, utilities,
  animations, accessibility), `components/`, `modules/` (`overlay/`,
  `data/`, `docs/`, `feedback/`, `icons/`), and `patterns/` directories.
- New `sparta.css` entry point — core only (tokens, reset, base, layout,
  utilities), for consumers who only want the foundation without any
  components.
- New `sparta-all.css` entry point — the full framework in one file,
  including the icon and notifications modules that were previously only
  available as separate imports.
- Corresponding new `package.json` exports: `./sparta.css`,
  `./sparta.min.css`, `./sparta-all.css`, `./sparta-all.min.css`.
- `.github/workflows/ci.yml` — GitHub Actions workflow that runs on pushes
  and pull requests targeting `main`, installing dependencies and running
  `npm run build`. Node version is loaded from `.nvmrc` (via
  `node-version-file`) rather than hardcoded, so CI and local development
  can't drift apart.
- `.nvmrc` pinning local/CI Node version to 22.
- Legacy bundle regression verification: `npm run verify`
  (`scripts/verify-legacy-bundle.sh`) diffs the freshly built
  `dist/spartacss.css` against a committed baseline snapshot
  (`test/baseline/spartacss.css`) and fails the build if the legacy default
  bundle's output has drifted. Wired into CI as a step that runs after
  `npm run build`, so any unintentional change to the legacy bundle's
  contents fails CI rather than shipping silently.

### Changed

- Build pipeline now bundles each entry point (`sparta.css`, `spartacss.css`,
  `sparta-all.css`) independently via Lightning CSS's `--bundle` mode,
  resolving each file's own `@import` graph, rather than copying a single
  source file directly into `dist/`.
- `spartacss.css` is now an explicit source entry point in `src/` (importing
  `sparta.css` plus components/modules/patterns, excluding icons and
  notifications) rather than the single monolithic source file it was
  before.

### Unchanged (verified)

- `dist/spartacss.css` — the existing default (`.` / `./spartacss.css`)
  export — was verified content-equivalent (identical normalized rule set)
  to its pre-refactor output. No public class was renamed, no component
  behavior changed, and the legacy bundle's scope (core + components +
  modules excluding icons/notifications + patterns) is unchanged.
- `dist/sparta-icons.css` and `dist/sparta-notifications.css` remain
  byte-identical plain copies of their source files.
- All existing duplicate implementations preserved as-is (e.g. two tooltip
  APIs, two accordion-trigger APIs) — consolidating them is deliberately
  out of scope for this release; tracked as future work.

## [0.1.0] - 2026-07-23

### Added

- Initial extraction of SpartaCSS as an independent package: core stylesheet
  (tokens, reset, layout, components), icon system (`sparta-icons.css`), and
  notifications module (`sparta-notifications.css`).
- `package.json` with Lightning CSS build pipeline (`npm run build`
  producing unminified and minified variants of each file into `dist/`).
- Public package exports for core, icon, and notifications stylesheets
  (unminified and minified).

### Fixed

- Resolved Toast implementation duplication between core and the
  notifications module; the notifications module's Toast is the canonical
  implementation, with no public class renamed and no behavior changed.
- Resolved `.sp-icon` "ICON SLOTS" duplication between core and the icon
  system; ownership confirmed as belonging to the icon system, duplicate
  block removed from core.

[Unreleased]: https://github.com/redspartanlabs/spartacss/compare/v0.9.2...HEAD
[0.9.2]: https://github.com/redspartanlabs/spartacss/compare/v0.9.1...v0.9.2
[0.9.1]: https://github.com/redspartanlabs/spartacss/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/redspartanlabs/spartacss/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/redspartanlabs/spartacss/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/redspartanlabs/spartacss/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/redspartanlabs/spartacss/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/redspartanlabs/spartacss/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/redspartanlabs/spartacss/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/redspartanlabs/spartacss/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/redspartanlabs/spartacss/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/redspartanlabs/spartacss/releases/tag/v0.1.0
