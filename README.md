# SpartaCSS

SpartaCSS is RedSpartan Systems' independent, reusable design system — design
tokens, a base reset/layout layer, a core set of UI components, an icon
system, and a notifications feature module.

**Status:** core, icon system, and notifications module all extracted, with
`package.json` and a build pipeline in place. The package is still
unversioned/unpublished (`0.0.0`, private) — a real release is a separate,
later milestone. See `docs/adr/0001-package-architecture.md` for the
architecture this repository is being built against, and
`docs/extraction-plan.md` for extraction status and inventory detail.

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

## License

Apache License 2.0 — see [LICENSE](./LICENSE). RedSpartan Labs branding,
trademarks, and project identity are separate from the license grant.
