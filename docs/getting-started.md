# Getting started

## What SpartaCSS is

SpartaCSS is RedSpartan Labs' framework-agnostic design system: design tokens,
a base reset and layout layer, a set of UI components, an icon system and a
notifications module. It is plain CSS (custom properties and class selectors)
with no JavaScript and no framework bindings, so it works on any page that can
load a stylesheet, whatever the site is built with
([ADR-0001](adr/0001-package-architecture.md)).

What that means in practice:

- **Presentation is decided once.** Colors, spacing, type and the look of
  ordinary interface parts come from tokens and classes in one stylesheet, so
  two pages built years apart still look related.
- **You compose with class names.** A component is a class on an element you
  choose: `<button class="sp-button sp-button--primary">`. Variants are
  modifier classes added to the same element.
- **Behavior is yours.** SpartaCSS draws open and closed states, but it does not
  open or close anything, trap focus, or sort a table. Each component's page
  lists what it provides and what your application provides. The
  [accessibility page](./accessibility.md) states the contract once.

## What you get

SpartaCSS ships a few bundles. Most projects want `sparta-all.css`, or the
default plus the icon module.

| Import | Contains |
| --- | --- |
| `@redspartanlabs/spartacss` (and `…/spartacss.css`) | The default bundle: core plus every component, overlay, data-display and pattern. **Not** the icons or notifications modules. |
| `@redspartanlabs/spartacss/sparta.css` | Core only: tokens, reset, base, layout, utilities, animations and accessibility rules. No components. |
| `@redspartanlabs/spartacss/sparta-all.css` | Everything: the default bundle plus icons and notifications. |
| `@redspartanlabs/spartacss/sparta-icons.css` | The icon module alone. |
| `@redspartanlabs/spartacss/sparta-notifications.css` | The notifications module alone. |

Append `.min` before `.css` for the minified twin of any of them. These package
subpaths are the supported way to address the files; the `dist/` directory is
where the files happen to sit, not a public path.

Two things in that table matter early:

- The icon module is **not** in the default bundle. Anything that draws an icon
  (`.sp-icon`, `.sp-button--icon-only`, the Accordion chevron, the Empty State
  and Stat icons) needs `sparta-icons.css`, or `sparta-all.css`, which includes
  it.
- The notifications and icon modules read core's tokens, so core must be loaded
  too. `sparta-all.css` already includes it.

## Install

From npm:

```
npm install @redspartanlabs/spartacss
```

Or as a tag-pinned dependency straight from GitHub, using the tag of the release
you want:

```
npm install github:redspartanlabs/spartacss#vX.Y.Z
```

Both deliver the same release contents. A tag install delivers the prebuilt
files and does not run SpartaCSS's own build. Recent versions of npm refuse Git
dependencies unless you allow them, either with
`npm install --allow-git=all …` on that command or through your project's npm
configuration; installing from the registry does not have this requirement.

The package also contains this documentation (`docs/`), the changelog and the
release procedure.

## Load a stylesheet

With a tool that resolves package imports (a bundler, or a CSS pipeline), import
the bundle from your stylesheet:

```css
@import "@redspartanlabs/spartacss/sparta-all.css";
```

Without one, serve the file yourself: copy the minified bundle out of the
installed package as part of your own build and link it from your pages.

```html
<link rel="stylesheet" href="/assets/sparta-all.min.css">
```

Load it before your own stylesheet, so your overrides come after it.

## Your first page

A complete minimal page. The `<html>` element has no theme attribute, so it
renders in SpartaCSS's default dark theme (see Theming below).

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Account</title>
  <link rel="stylesheet" href="/assets/sparta-all.min.css">
  <link rel="stylesheet" href="/assets/app.css">
</head>
<body>
  <main class="sp-container">
    <!-- page content -->
  </main>
</body>
</html>
```

And the content that goes where the comment is, rendered. It uses a
[container](./layout.md), a [page header](./page-header.md), a
[card](./card.md), two [form fields](./forms.md) and a [button](./button.md):

```html preview height=38 wide=35
<div class="sp-container">
  <div class="sp-page-header">
    <div class="sp-page-header__content">
      <h1 class="sp-page-header__title">Account</h1>
      <p class="sp-page-header__subtitle">Manage how you appear to others.</p>
    </div>
  </div>

  <div class="sp-card">
    <div class="sp-card__header"><h2 class="sp-card__title">Profile</h2></div>
    <div class="sp-card__body">
      <div class="sp-field">
        <label class="sp-field__label" for="gs-name">Display name</label>
        <div class="sp-field__control"><input class="sp-input" id="gs-name" type="text" value="Jordan" /></div>
        <span class="sp-field__hint">Shown next to your comments.</span>
      </div>
      <div class="sp-field">
        <label class="sp-field__label sp-field__label--optional" for="gs-bio">Bio</label>
        <div class="sp-field__control"><textarea class="sp-textarea" id="gs-bio"></textarea></div>
      </div>
    </div>
    <div class="sp-card__footer">
      <button class="sp-button sp-button--primary" type="submit">Save changes</button>
      <button class="sp-button sp-button--ghost" type="button">Cancel</button>
    </div>
  </div>
</div>
```

## How the examples in this documentation work

Where this documentation is shown with rendered examples, each is SpartaCSS
drawn by the package's own stylesheet, with the markup that produced it shown
directly beneath. On a site that only displays the Markdown, you see the markup
alone. Either way, the markup is what you copy. Three things worth knowing:

- Examples are real: every `sp-` class in every HTML example in this
  documentation is checked against the stylesheet that ships with the same
  release.
- A rendered example is drawn in its own isolated frame, so a viewport media
  query inside it (`640px`, `768px`) responds to the frame's width, not to your
  screen. See [Layout](./layout.md).
- Examples show markup and styling. They run no script, so an example of a
  component that needs your JavaScript, such as opening a modal or switching a
  tab, shows a state rather than a behavior.

## Theming

SpartaCSS is dark-first. With no attribute, you get dark. Light mode is opt-in:

```html
<html data-theme="light">
```

It never follows the reader's system setting by itself. Toggling a theme is
your code. See [Theming](./theming.md).

## Tokens, and overriding SpartaCSS

Colors, spacing, type, radii, shadows and timing are CSS custom properties named
`--sp-*`. Use them in your own CSS instead of literal values, so your styles
follow the theme and the scale:

```css
.my-banner {
  padding: var(--sp-space-4);
  background: var(--sp-bg-elevated);
  color: var(--sp-text-primary);
}
```

To change SpartaCSS itself, redeclare tokens in your own stylesheet; do not edit
files in `node_modules`:

```css
:root { --sp-color-primary: #2a6df4; }
```

SpartaCSS declares its rules in cascade layers, in this order: `tokens`,
`reset`, `layout`, `components`, `accessibility`. CSS you write outside any layer
takes precedence over rules inside layers, whatever the selector's specificity,
so a plain rule in your own stylesheet is enough to override a component.
[Design tokens](./tokens.md) covers both.

## Where to go next

- **Foundations:** [Design tokens](./tokens.md), [Theming](./theming.md),
  [Layout](./layout.md), [Motion](./motion.md),
  [Accessibility](./accessibility.md).
- **Components:** the [documentation index](./README.md) lists every one,
  grouped by what it does.
- **Putting it together:** [Building page layouts](./guide-layouts.md),
  [Designing forms](./guide-forms.md) and
  [Staying consistent](./guide-consistency.md).

## Common mistakes

**Importing a path inside `dist/`.** `@redspartanlabs/spartacss/dist/spartacss.css`
is not exported and will not resolve under tools that honor `exports`. Use the
subpaths in the table.

**Icons that do not appear.** The default bundle has no icons. Import
`sparta-icons.css`, or use `sparta-all.css`.

**A module without core.** `sparta-icons.css` and `sparta-notifications.css`
read core's tokens. Loading one alone, without `sparta.css`, `spartacss.css` or
`sparta-all.css`, leaves it without the values it needs.

**Loading SpartaCSS after your own stylesheet.** Your overrides then lose any
tie. Load SpartaCSS first.

**Expecting behavior.** A class never opens, closes, validates or sorts
anything. The component's page says what is left to you.

## Related

- [Design tokens](./tokens.md) and [Theming](./theming.md).
- [Button](./button.md), [Forms](./forms.md) and [Card](./card.md): the
  components in the example above.
- [Accessibility](./accessibility.md): what SpartaCSS does and does not do.

---
Source: `README.md` and `package.json`
