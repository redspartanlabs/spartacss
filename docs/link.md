# Link

## Purpose

Link styles inline and standalone hyperlinks — color, hover/active
underline behavior, muted/subtle/danger tones, and external-link/
standalone-with-arrow presentations.

## Usage

```html
<p>Read the <a class="sp-link" href="/docs">documentation</a> for details.</p>

<a class="sp-link sp-link--standalone" href="/get-started">
  Get started
</a>
```

## Class API

- `.sp-link` — base class for an `<a>`. Underline is transparent at rest
  and fades in on hover (`text-decoration-color` transition) rather than
  toggling `text-decoration` outright.

## Variants

### Tone

```html
<a class="sp-link sp-link--muted" href="#">...</a>
<a class="sp-link sp-link--subtle" href="#">...</a>
<a class="sp-link sp-link--danger" href="#">...</a>
```

### Underline behavior

```html
<a class="sp-link sp-link--plain" href="#">...</a>
```

`--plain` starts with no underline at all and only shows one on hover
(inverse of the default, which always has an invisible-until-hover
underline reserving the same layout space).

### External / standalone

```html
<a class="sp-link sp-link--external" href="https://example.com" target="_blank" rel="noopener">
  External site
</a>

<a class="sp-link sp-link--standalone" href="/next">
  Continue
</a>
```

`--external` appends a small external-link icon after the text via
`::after`. `--standalone` is a distinct presentation — no underline,
medium weight, inline-flex layout — with its own trailing arrow icon that
animates (`translateX`) on hover. These two are visually and structurally
different; don't combine them.

### Size

```html
<a class="sp-link sp-link--sm" href="#">...</a>
<a class="sp-link sp-link--lg" href="#">...</a>
```

## State modifiers

- `:hover` — every tone variant defines its own hover color/underline
  response.
- `:active` — darkens further (base `.sp-link` only; tone variants don't
  override `:active` individually).
- `:focus-visible` — box-shadow ring, consistent with the rest of
  SpartaCSS's interactive elements (see
  [`accessibility.md`](./accessibility.md#keyboard-and-focus-expectations)).

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

---
Source: `src/components/sparta-link.css`
