# Theming

SpartaCSS ships two themes — dark and light — driven entirely by CSS custom
properties in `src/core/sparta-tokens.css`. There is no JavaScript theme
switcher; SpartaCSS only defines the tokens and the rules for which values
apply when. Toggling a theme at runtime (e.g. a UI switch) is the consumer's
responsibility, via the `data-theme` attribute or one of the override classes
described below.

SpartaCSS is a **dark-first** design system: dark is always the default
theme, and it does not change based on the visitor's OS or browser
`prefers-color-scheme` setting. Light mode is fully supported, but it is
opt-in only — SpartaCSS will never silently switch to light mode on its own.

## Precedence

Three states are possible, resolved in this order (later wins):

1. **Default** — no `data-theme` attribute/class set. Renders **dark**,
   regardless of OS/browser preference. This has been SpartaCSS's behavior
   since `0.1.0` and remains unchanged in `0.3.0`.
2. **Explicit `data-theme="dark"` / `.sp-dark`** — renders dark. Equivalent
   to the default, but lets a consumer state the theme choice explicitly
   rather than relying on the implicit default. New in `0.3.0`.
3. **Explicit `data-theme="light"` / `.sp-light`** — renders light. Available
   since `0.1.0`, unchanged.

There is no OS-preference-driven state. `prefers-color-scheme` is not read
anywhere in SpartaCSS's tokens.

## Enabling light mode

Light mode must be requested explicitly:

```html
<html data-theme="light">
```

If your application wants dark mode, no attribute is required — it's the
default. Setting `data-theme="dark"` explicitly is optional and purely for
clarity/symmetry with the light-mode opt-in.

## What theme-switching affects

Only surface, text, border, and shadow tokens change between themes
(`--sp-bg-*`, `--sp-text-*`, `--sp-border`/`--sp-border-light`/`--sp-border-strong`,
`--sp-shadow-sm`/`--sp-shadow-md`/`--sp-shadow-lg`). Brand and semantic colors
(`--sp-color-primary`, `--sp-color-error`, etc.), `--sp-border-focus`, and
`--sp-shadow-focus` are constant across both themes by design.
