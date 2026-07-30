# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html),
per ADR-0001.

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

[Unreleased]: https://github.com/redspartanlabs/spartacss/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/redspartanlabs/spartacss/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/redspartanlabs/spartacss/releases/tag/v0.1.0
