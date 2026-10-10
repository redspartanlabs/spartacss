# Staying consistent

SpartaCSS exists so presentation is decided once. This guide is about keeping
your application consistent with it, rather than rebuilding parts of it with
slightly different values. It adds no new classes.

## Use the component before writing the rule

Before writing CSS for a button, a message, a label or a surface, check the
[documentation index](./README.md). Two buttons that differ by 2px of padding
are two decisions to maintain. If the component nearly fits, change it with a
variant, a size or a token, not with a copy.

## Use tokens, not values

Everything your own CSS needs from the system (color, spacing, type, radius,
shadow, timing) is a token. Referencing it keeps your styles on the scale and
in the theme.

```html preview height=18 wide=15
<div class="sp-grid sp-grid--auto">
  <div style="padding: 16px; background: #26272c; color: #e8e8ea; border-radius: 6px; border: 1px solid #3a3b42">
    <strong>Hardcoded</strong><br />Fixed values: they will not follow the theme or the scale.
  </div>
  <div style="padding: var(--sp-space-4); background: var(--sp-bg-surface); color: var(--sp-text-primary); border-radius: var(--sp-radius-md); border: 1px solid var(--sp-border)">
    <strong>Tokens</strong><br />The same look today, and it follows both.
  </div>
</div>
```

Put the second kind in your own stylesheet, with your own class names. Use a
prefix that is yours: `sp-` belongs to SpartaCSS.

```css
.acct-callout {
  padding: var(--sp-space-4);
  background: var(--sp-bg-surface);
  color: var(--sp-text-primary);
  border: 1px solid var(--sp-border);
  border-radius: var(--sp-radius-md);
}
```

See [Design tokens](./tokens.md) for the full set.

## Change the system at the token level

To restyle SpartaCSS everywhere (a brand color, a font), redeclare tokens in
your own stylesheet, loaded after it. Do not write rules against `.sp-button`
to recolor it, and do not edit the package.

```html preview height=8 wide=6
<span style="--sp-color-primary: #2a6df4; --sp-color-primary-hover: #1e56c4; --sp-color-primary-active: #1747a3">
  <button class="sp-button sp-button--primary">Rebranded primary</button>
  <button class="sp-button sp-button--outline">Rebranded outline</button>
</span>
```

Every component that uses the primary color changed, because they all read the
same token. That is the property to protect.

## Keep one meaning per color

The semantic colors carry meaning: success, warning, error and info are the
same in every component. Keep them that way in your application.

```html preview height=5
<div class="sp-cluster">
  <span class="sp-badge sp-badge--success">Paid</span>
  <span class="sp-badge sp-badge--warning">Pending</span>
  <span class="sp-badge sp-badge--error">Failed</span>
  <span class="sp-badge sp-badge--info">Refunded</span>
</div>
```

If "Failed" is red in one place and orange in another, the reader has to learn
the screen instead of the system. Say the meaning in text as well as color.

## One emphasis at a time

Within a view, give the main action the strongest treatment and the rest less:

```html preview height=9 wide=6
<div class="sp-cluster">
  <button class="sp-button sp-button--primary">Publish</button>
  <button class="sp-button sp-button--outline">Save draft</button>
  <button class="sp-button sp-button--ghost">Discard</button>
</div>
```

Use one `--primary` per view. Where an action is destructive, use `--error` or
`--outline-error`, and keep that meaning for destructive actions.

## One variant per element

Each family of modifiers (a color, a size) is applied once per element. Two
colors on one button, two severities on one alert and two sizes on one input are
not supported and have no defined result.

## Keep the structure the component documents

Components rely on their documented structure: the card parts, the field
wrapper, the table wrapper. Skipping a wrapper because it looks unnecessary
removes the behavior it carries (the table wrapper is what scrolls a wide
table). If you need to adapt a component, add a class of your own beside it
rather than removing its parts.

## Staying up to date

SpartaCSS follows semantic versioning, and
[ADR-0002](adr/0002-versioning-and-stability-policy.md) defines what counts as a
breaking change for a CSS-only design system: it is why documented class names
are safe to depend on. Read the [changelog](../CHANGELOG.md) when you update, and
pin the version you use.

Because you wrote tokens and documented classes, an update changes your
application the way it changes SpartaCSS's own pages. Rules that reach into a
component's internals do not have that protection.

## Checklist

- Does a component or a variant already do this?
- Are all colors, spacing and type from tokens?
- Is my CSS in my own stylesheet, with my own prefix, loaded after SpartaCSS?
- One variant per family, one primary action per view?
- Does the meaning survive without color, and without a mouse?

## Common mistakes

**Copying a component's CSS into your own file.** The copy no longer follows
updates. Use the component, or write a class of your own using tokens.

**Overriding with `!important`.** Plain unlayered CSS already wins over
SpartaCSS's layered rules; see [Getting started](./getting-started.md).
`!important` makes later overrides harder.

**Recoloring a component with a class rule.** Change the token.

**Inventing a second scale.** `padding: 18px` between `--sp-space-4` and
`--sp-space-5` adds a value the system does not have. Pick the nearest step.

## Related

- [Design tokens](./tokens.md) and [Theming](./theming.md).
- [Getting started](./getting-started.md): loading and overriding.
- [Building page layouts](./guide-layouts.md) and [Designing forms](./guide-forms.md).
- [Accessibility](./accessibility.md).
