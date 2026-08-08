# Kbd

## Purpose

Kbd renders a keyboard-key badge — for documenting shortcuts — plus a
combo wrapper for chaining multiple keys with a separator.

## Usage

```html
<p>Press <kbd class="sp-kbd">Esc</kbd> to close.</p>

<span class="sp-kbd-combo">
  <kbd class="sp-kbd">Ctrl</kbd>
  <span class="sp-kbd-sep">+</span>
  <kbd class="sp-kbd">K</kbd>
</span>
```

## Class API

- `.sp-kbd` — a single key badge. Works on `<kbd>` (recommended) or any
  inline element. Monospace font, bordered, with a slight inset shadow to
  read as a physical key.
- `.sp-kbd-combo` — inline-flex wrapper for chaining multiple `.sp-kbd`
  elements with consistent gap.
- `.sp-kbd-sep` — the separator between keys in a combo (e.g. `+`).

## Variants

Size: `--sm`, default (unsized), `--lg` — applies to `.sp-kbd` only.

```html
<kbd class="sp-kbd sp-kbd--sm">Tab</kbd>
```

## State modifiers

None — Kbd is a static, non-interactive label.

## Accessibility

`<kbd>` is the correct semantic element for representing keyboard input in
running text, and is what the Usage examples use — prefer it over a
generic `<span>` so assistive technology and browser default styling both
recognize it as keyboard-input content. `.sp-kbd-sep`'s separator
character is real text content (not a pseudo-element), so it's read
normally by screen readers — choose a separator that reads sensibly aloud
(e.g. "+") if that matters for your audience.

---
Source: `src/components/sparta-kbd.css`
