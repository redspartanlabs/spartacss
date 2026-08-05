# SpartaCSS

A framework-agnostic CSS design system built for systems that must last.

SpartaCSS is RedSpartan Labs' framework-agnostic design system — design
tokens, a base reset/layout layer, a core set of UI components, an icon
system, and a notifications feature module. It's pure CSS: no JavaScript,
no framework bindings, usable from any site or app regardless of stack.

**Status:** core, icon system, and notifications module are all extracted
and buildable. The package is at `0.7.0` and not yet published to any
registry — per ADR-0001's phased distribution plan, it's currently consumed
via a tag-pinned git dependency (see Installation below). See
`docs/adr/0001-package-architecture.md` for the architecture this
repository is being built against, `CHANGELOG.md` for release history, and
`docs/extraction-plan.md` for the original extraction's status and
inventory detail.

## Installation

Not yet published to a registry. Per the phased distribution plan in
ADR-0001, once a version is tagged, install via a tag-pinned git dependency:

```
npm install github:redspartanlabs/spartacss#<tag>
```

A registry-published `npm install @redspartanlabs/spartacss` will follow in
a later phase, once a registry target is chosen. No tag exists yet — this
section will be updated with a real tag once one is cut.

## Usage

Each module is a plain CSS file under `dist/`; include whichever ones you
need. (Exact import paths — e.g. whether a shorter subpath alias is
available via `package.json` `exports` — are still being finalized; the
literal paths below always work regardless of that decision.)

### Core stylesheet

Required foundation — tokens, reset, layout utilities, and all core
components. Everything else in this package builds on it.

```css
@import "@redspartanlabs/spartacss/dist/spartacss.css";
/* or the minified variant: */
@import "@redspartanlabs/spartacss/dist/spartacss.min.css";
```

### Core-only and full-framework entry points

As of the Phase 1 architecture split, two additional bundles are available
alongside `spartacss.css` (which is unchanged and remains the recommended
default for existing consumers):

```css
/* Tokens, reset, base, layout, and utilities only — no components */
@import "@redspartanlabs/spartacss/dist/sparta.css";

/* Everything: core + components + modules (overlay, data, docs, feedback,
   icons) + patterns, in one file */
@import "@redspartanlabs/spartacss/dist/sparta-all.css";
```

`spartacss.css` continues to ship exactly what it always has (core +
components; not icons or notifications) so existing imports keep working
unchanged. `sparta-all.css` is new and additive — it's the superset bundle,
including the icon and notifications modules that were previously only
available as separate imports.

### Icon module

Optional. Adds the `.sp-icon` system (86 icons via a mask-based `::before`
engine).

```css
@import "@redspartanlabs/spartacss/dist/sparta-icons.css";
```

**Dependency note:** most icons are fully self-contained, but 8 of the 86
(`x`, `chevron-down`, `check`, `trending-up`/`down`, `arrow-right`,
`external-link`, `sort-asc`/`desc`) source their shape from custom
properties defined in the core stylesheet's tokens layer. Those 8 will not
render if the icon module is loaded without core.

### Notifications module

Optional. Adds Toast, Alert Banner, and Confirm/Dialog components.

```css
@import "@redspartanlabs/spartacss/dist/sparta-notifications.css";
```

**Dependency note:** this module has no tokens of its own — every visual
property resolves through the core stylesheet's tokens layer. Core must be
loaded for this module to render correctly at all.

### Module dependency relationships

```
spartacss.css (core)          — no dependencies, always required
  ├── sparta-icons.css         — optional; 8/86 icons need core's tokens
  └── sparta-notifications.css — optional; fully requires core's tokens
```

## Build

Source lives in `src/`, organized as a modular design-system tree rather
than a single file:

```
src/
  sparta.css               — core-only entry point (@imports src/core/*)
  spartacss.css            — legacy default-bundle entry point: imports
                              sparta.css, then components/modules(excluding
                              icons/notifications)/patterns
  sparta-all.css           — full-framework entry point: imports
                              spartacss.css, then the icons and
                              notifications modules
  core/                    — tokens, reset, base, layout, utilities,
                              animations, accessibility
  components/              — individual reusable UI elements (button,
                              card, form, badge, alert, avatar, progress,
                              link, kbd, divider, list, empty-state)
  modules/
    overlay/                — modal, drawer, dropdown, tooltip, accordion
    data/                   — table, tabs, breadcrumbs, pagination, stat
    docs/                   — code block
    feedback/               — sparta-notifications.css
    icons/                  — sparta-icons.css
  patterns/                — page-level compositions (page header)
```

Each of the three top-level entry points (`sparta.css`, `spartacss.css`,
`sparta-all.css`) is bundled independently via Lightning CSS's `--bundle`
mode, which resolves its own `@import` graph into a single self-contained
`dist/*.css` file plus a `.min.css` variant. `spartacss.css` is its own
explicit source file — not derived from `sparta-all.css` by excluding
anything at build time — so the legacy default bundle's scope (core +
components + modules excluding icons/notifications + patterns, exactly what
the original single-file `spartacss.css` always shipped) is declared
directly in `src/spartacss.css`'s import list and can't drift silently if
`sparta-all.css` changes. `dist/sparta-icons.css` and
`dist/sparta-notifications.css` remain plain copies, unchanged.

```
npm install   # also runs the build automatically (via "prepare")
npm run build # bundle + minified variant of each entry point
npm run clean # remove dist/
```

Minification uses [Lightning CSS](https://lightningcss.dev/) exclusively —
no PostCSS, no Sass, no additional build abstraction. No browser-compatibility
target list (`--targets`) is set — preserves the source's existing
hand-written vendor prefixes (`-webkit-`/`-moz-`) without adding or removing
any.

Cascade-layer order (`tokens, reset, layout, components, accessibility`) is
declared once, at the top of `sparta.css`, and every per-component/module
file re-opens the same named layer (`@layer components { ... }`) rather than
introducing new layer names — so splitting the file tree does not change
which rule wins when two selectors of equal specificity collide. A few
legacy dual implementations (e.g. two tooltip APIs, two accordion trigger
APIs) were preserved side-by-side exactly as they existed in the monolith;
consolidating them is deliberately out of scope for this phase.

**Note on `lightningcss --version` output:** running the installed CLI
directly (e.g. `./node_modules/.bin/lightningcss --version`) prints something
like `lightningcss 1.0.0-alpha.72`, not the npm package version. This is
expected — that string is the underlying Rust crate's own internal version
(baked into the binary at compile time), which the upstream project
versions independently from its npm releases. It is not a sign of an
outdated or wrong package; the actual installed/maintained package version
is whatever `lightningcss-cli` resolves to in `package-lock.json` (verified
current against upstream's GitHub releases as of this writing).

## License

Apache License 2.0 — see [LICENSE](./LICENSE). RedSpartan Labs branding,
trademarks, and project identity are separate from the license grant.
