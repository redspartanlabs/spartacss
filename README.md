# SpartaCSS

A framework-agnostic CSS design system built for systems that must last.

SpartaCSS is RedSpartan Labs' framework-agnostic design system — design
tokens, a base reset/layout layer, a core set of UI components, an icon
system, and a notifications feature module. It's pure CSS: no JavaScript,
no framework bindings, usable from any site or app regardless of stack.

**[→ Documentation index](docs/README.md)** — components, tokens, theming,
layout, motion, accessibility, and the architecture decisions behind them.

**Status:** the package is at `1.0.1` and not yet published to any
registry — per ADR-0001's phased distribution plan, it's currently consumed
via a tag-pinned git dependency (see Installation below). See
[ADR-0001](docs/adr/0001-package-architecture.md) for the architecture this
repository is built against, [ADR-0002](docs/adr/0002-versioning-and-stability-policy.md)
for what counts as a breaking change, and [CHANGELOG.md](CHANGELOG.md) for
release history.

## Getting started

Four steps, in order. Each links the document that covers it properly —
none of that documentation is repeated here.

**1. Install.** A tag-pinned git dependency (see [Installation](#installation)):

```
npm install github:redspartanlabs/spartacss#v1.0.1
```

**2. Import a bundle.** One line gets you the default bundle — tokens,
reset, layout and every core component:

```css
@import "@redspartanlabs/spartacss";
```

Pick a different bundle if you need less or more; the
[Usage](#usage) section below lists all of them with what each contains.

**3. Choose a theme, or don't.** SpartaCSS is dark-first: with no attribute
set it renders dark, and it never switches on its own. Light mode is opt-in:

```html
<html data-theme="light">
```

See [Theming](docs/theming.md) for the full precedence rules and which
tokens change between themes.

**4. Build with the tokens, then the components.** Reference `--sp-*`
custom properties from your own CSS rather than hardcoding values, and put
your overrides in your own stylesheet loaded after SpartaCSS's —
[Design Tokens](docs/tokens.md) covers both, including what to override and
what to leave alone. Then reach for a component:

```html
<button class="sp-button sp-button--primary">Save</button>
```

[Button](docs/button.md) documents that one; the
[documentation index](docs/README.md) lists the rest.

## Installation

Not yet published to a registry. Per the phased distribution plan in
ADR-0001, install via a tag-pinned git dependency:

```
npm install github:redspartanlabs/spartacss#v1.0.1
```

A registry-published `npm install @redspartanlabs/spartacss` will follow in
a later phase, once a registry target is chosen.

Git-tag installation delivers the prebuilt `dist/*.css` artifacts directly
from the tagged release tree — installing does not run SpartaCSS's build,
does not require Lightning CSS, and does not require SpartaCSS's build
toolchain to be installed on the consumer's machine (see
[ADR-0004](docs/adr/0004-git-tag-artifact-distribution.md)).

## Usage

Every bundle is a plain CSS file, imported by the package subpath that
names it. Those subpaths are the package's public API — they are declared
in `package.json`'s `exports` field, and each has a `.min.css` twin.

The `dist/` directory is where the files happen to sit, not how you address
them: `exports` does not expose `dist/`, so a deep import like
`@redspartanlabs/spartacss/dist/spartacss.css` is not a supported path and
will not resolve under tooling that honors `exports`.

| Import | Contains |
| --- | --- |
| `@redspartanlabs/spartacss` | The default bundle — core plus every component, overlay, data-display and pattern. Same as `…/spartacss.css`. |
| `@redspartanlabs/spartacss/spartacss.css` | The same bundle, named explicitly. |
| `@redspartanlabs/spartacss/sparta.css` | Core only — tokens, reset, base, layout, utilities, animations, accessibility. No components. |
| `@redspartanlabs/spartacss/sparta-all.css` | Everything: the default bundle plus the icons and notifications modules. |
| `@redspartanlabs/spartacss/sparta-icons.css` | The icon module on its own. |
| `@redspartanlabs/spartacss/sparta-notifications.css` | The notifications module on its own. |

Append `.min` before `.css` for the minified variant of any of them — for
example `@redspartanlabs/spartacss/sparta-all.min.css`.

### Core stylesheet

Required foundation — tokens, reset, layout utilities, and all core
components. Everything else in this package builds on it.

```css
@import "@redspartanlabs/spartacss";
/* or the minified variant: */
@import "@redspartanlabs/spartacss/spartacss.min.css";
```

### Core-only and full-framework entry points

Two additional bundles sit either side of `spartacss.css`, which is
unchanged and remains the recommended default:

```css
/* Tokens, reset, base, layout, and utilities only — no components */
@import "@redspartanlabs/spartacss/sparta.css";

/* Everything: core + components + modules (overlay, data, docs, feedback,
   icons) + patterns, in one file */
@import "@redspartanlabs/spartacss/sparta-all.css";
```

`spartacss.css` ships exactly what it always has (core + components; not
icons or notifications), so existing imports keep working unchanged.
`sparta-all.css` is the superset bundle, including the icon and
notifications modules that are otherwise separate imports.

### Icon module

Optional. Adds the `.sp-icon` system (86 icons via a mask-based `::before`
engine).

```css
@import "@redspartanlabs/spartacss/sparta-icons.css";
```

See [Icons](docs/icons.md) for the class API and the full set.

**Dependency note:** most icons are fully self-contained, but 9 of the 86
(`x`, `chevron-down`, `check`, `trending-up`/`down`, `arrow-right`,
`external-link`, `sort-asc`/`desc`) source their shape from custom
properties defined in the core stylesheet's tokens layer. Those 9 will not
render if the icon module is loaded without core.

### Notifications module

Optional. Adds Toast, Alert Banner, and Confirm/Dialog components.

```css
@import "@redspartanlabs/spartacss/sparta-notifications.css";
```

See [Notifications](docs/notifications.md) for the class API.

**Dependency note:** this module has no tokens of its own — every visual
property resolves through the core stylesheet's tokens layer. Core must be
loaded for this module to render correctly at all.

### Module dependency relationships

```
spartacss.css (core)          — no dependencies, always required
  ├── sparta-icons.css         — optional; 9/86 icons need core's tokens
  └── sparta-notifications.css — optional; fully requires core's tokens
```

## Build

Maintainer and contributor material. Consuming SpartaCSS does not require
any of it — a tag-pinned install delivers the prebuilt `dist/` artifacts
and never runs this build ([ADR-0004](docs/adr/0004-git-tag-artifact-distribution.md)).
If you are using SpartaCSS rather than working on it, the
[documentation index](docs/README.md) is where to go next.

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
npm install          # installs dependencies only — does not build dist/
npm run build        # explicit maintainer/contributor step: bundle + minified variant of each entry point
npm run clean        # remove dist/
npm run verify       # check dist/spartacss.css against the committed baseline
npm run verify:artifact # check every package.json "exports" entry resolves to a built dist/ file
```

**Note on `lightningcss-cli`'s install script:** npm 12 blocks dependency
install scripts by default. `lightningcss-cli`'s postinstall script (which
stages its platform-specific binary) is explicitly approved via
`package.json`'s version-pinned `allowScripts` entry; bumping the
`lightningcss-cli` version requires re-approving it with
`npm install-scripts approve lightningcss-cli`.

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
