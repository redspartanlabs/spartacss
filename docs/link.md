# Link

## Purpose

Link styles inline and standalone hyperlinks — color, hover/active
underline behavior, muted/subtle/danger tones, and external-link/
standalone-with-arrow presentations.

## When to use which

- **Requirement:** use Link, an `<a href>`, to *navigate* — to another page, a
  section, or an external site. For something that performs an action on the
  current page, use a `<button>`, styled with [Button](./button.md).
- **Guidance:** for a navigation call to action that should look like a button,
  put `.sp-button` on the `<a>`. For links in running text, use Link.

## Usage

```html preview height=6
<p>Read the <a class="sp-link" href="#documentation">documentation</a> for details.</p>

<a class="sp-link sp-link--standalone" href="#get-started">
  Get started
</a>
```

## Class API

- `.sp-link` — base class for an `<a>`. Underline is transparent at rest
  and fades in on hover (`text-decoration-color` transition) rather than
  toggling `text-decoration` outright.

## Variants

### Tone

```html preview height=5
<a class="sp-link" href="#a">Default</a>
<a class="sp-link sp-link--muted" href="#b">Muted</a>
<a class="sp-link sp-link--subtle" href="#c">Subtle</a>
<a class="sp-link sp-link--danger" href="#d">Danger</a>
```

### Underline behavior

`--plain` starts with no underline at all and only shows one on hover
(inverse of the default, which always has an invisible-until-hover
underline reserving the same layout space).

```html preview height=5
<a class="sp-link" href="#a">Default underline</a>
<a class="sp-link sp-link--plain" href="#b">Plain</a>
```

### External / standalone

```html preview height=5
<a class="sp-link sp-link--external" href="https://example.com" target="_blank" rel="noopener">
  External site
</a>

<a class="sp-link sp-link--standalone" href="#next">
  Continue
</a>
```

`--external` appends a small external-link icon after the text via
`::after`. `--standalone` is a distinct presentation — no underline,
medium weight, inline-flex layout — with its own trailing arrow icon that
animates (`translateX`) on hover. These two are visually and structurally
different; don't combine them.

### Size

```html preview height=5
<a class="sp-link sp-link--sm" href="#a">Small</a>
<a class="sp-link" href="#b">Default</a>
<a class="sp-link sp-link--lg" href="#c">Large</a>
```

## State modifiers

- `:hover` — every tone variant defines its own hover color/underline
  response.
- `:active` — darkens further (base `.sp-link` only; tone variants don't
  override `:active` individually).
- `:focus-visible` — box-shadow ring, consistent with the rest of
  SpartaCSS's interactive elements (see
  [`accessibility.md`](./accessibility.md#keyboard-and-focus-expectations)).

Hover, press and focus are interactive. Hover a link above, or tab to it, to
see them.

## Accessibility

- `--external` only adds a visual icon — it does not add
  `target="_blank"`, `rel="noopener"`, or any screen-reader announcement
  that the link opens externally. Add those attributes yourself (as shown
  in Usage), and consider visually-hidden text (e.g. "opens in new tab")
  if that context matters for your audience.
- Link styles a real `<a>` — use it for navigation only; for
  button-styled actions that don't navigate, use [`button.md`](./button.md)
  instead so the correct element/role is used (see
  [`accessibility.md`](./accessibility.md#semantic-html-expectations)).
- **Guidance:** because the default underline appears only on hover, a link
  in running text is distinguished at rest by color alone. Make sure its color
  has enough contrast with the surrounding text, or choose `--plain` only where
  the context makes the link obvious.
- An `<a>` needs an `href` to be a link at all: without one it is not
  focusable and is not announced as a link.

## Responsive behavior

Link has no breakpoint-specific behavior. It is inline and wraps with the text
around it; `--standalone` is `inline-flex`, so a long label stays on its own
line and the arrow stays attached.

## Common mistakes

**A link used as a button.** An `<a>` with no real destination, used to run an
action, is announced as a link and cannot be activated with Space.

```html
<!-- Wrong -->
<a class="sp-link" href="#" onclick="save()">Save</a>

<!-- Right -->
<button class="sp-button sp-button--ghost" type="button">Save</button>
```

**Combining `--external` and `--standalone`.** They are different structures.
Choose one.

**Expecting `--external` to open a new tab.** It adds an icon only.

```html
<!-- Right: the attributes are yours to add -->
<a class="sp-link sp-link--external" href="https://example.com" target="_blank" rel="noopener">Example</a>
```

**Leaving off the `href`.** The class styles it, but it is no longer a link.

## Related

- [Button](./button.md) — actions, and navigation calls to action.
- [Breadcrumbs](./breadcrumbs.md) and [Pagination](./pagination.md) — links
  arranged as navigation.
- [Icons](./icons.md) — the external-link and arrow icons.
- [Accessibility](./accessibility.md) — semantic HTML expectations.

---
Source: `src/components/sparta-link.css`
