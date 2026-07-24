# SpartaCSS

SpartaCSS is RedSpartan Labs' independent, reusable design system — design
tokens, a base reset/layout layer, a core set of UI components, an icon
system, and a notifications feature module. It's pure CSS: no JavaScript,
no framework bindings, usable from any site or app regardless of stack.

**Status:** core, icon system, and notifications module are all extracted
and buildable, but the package is still pre-release (`0.0.0`, private) — not
yet published to any registry or tagged for release. See
`docs/adr/0001-package-architecture.md` for the architecture this repository
is being built against, and `docs/extraction-plan.md` for extraction status
and inventory detail.

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

Source lives in `src/styles/` (`spartacss.css`, `sparta-icons.css`,
`sparta-notifications.css`). Building produces `dist/`: an unminified copy of
each source file plus a `.min.css` variant.

```
npm install   # also runs the build automatically (via "prepare")
npm run build # unminified copy + minified variant of each file
npm run clean # remove dist/
```

Minification uses [Lightning CSS](https://lightningcss.dev/) exclusively —
no PostCSS, no Sass, no additional build abstraction. The unminified `dist/*.css`
files are plain copies of `src/styles/*.css`, not reprocessed, so they're
guaranteed byte-identical to source. Only the `.min.css` variants pass
through Lightning CSS. No browser-compatibility target list (`--targets`) is
set — verified to preserve the source's existing hand-written vendor
prefixes (`-webkit-`/`-moz-`) without adding or removing any.

One known, verified difference in the minified output: Lightning CSS drops
the redundant bare `@layer tokens, reset, layout, components, accessibility;`
pre-declaration in `spartacss.css`, since it re-derives the identical order
from the populated `@layer` blocks that follow. This is a no-op within this
package's own files; it would only matter if a consumer ever wanted to
interleave its own cascade layers with SpartaCSS's before this stylesheet
loads.

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
