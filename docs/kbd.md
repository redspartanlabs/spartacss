# Kbd

## Purpose

Kbd renders a keyboard-key badge — for documenting shortcuts — plus a
combo wrapper for chaining multiple keys with a separator.

## Usage

```html preview height=7
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

```html preview height=5
<kbd class="sp-kbd sp-kbd--sm">Tab</kbd>
<kbd class="sp-kbd">Tab</kbd>
<kbd class="sp-kbd sp-kbd--lg">Tab</kbd>
```

A shortcut written with a different separator:

```html preview height=5
<span class="sp-kbd-combo"><kbd class="sp-kbd">⌘</kbd><span class="sp-kbd-sep">+</span><kbd class="sp-kbd">Shift</kbd><span class="sp-kbd-sep">+</span><kbd class="sp-kbd">P</kbd></span>
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

## Responsive behavior

Kbd has no breakpoint-specific behavior. A combo is `inline-flex`, so it stays
together; long sentences containing combos wrap around them.

## Common mistakes

**A shortcut that does nothing.** Kbd only *displays* a key. SpartaCSS does not
bind keys. If your application advertises "Ctrl + K", it must handle it.

**Using `<kbd>` for a button.** A key badge is not interactive. For something
to press, use [Button](./button.md).

**A separator that reads badly aloud.** The separator is real text. "+" reads
as "plus". A decorative character such as "·" may be read out literally.

## Related

- [Button](./button.md) — interactive controls.
- [Tooltip](./tooltip.md) — a common place to show a shortcut.
- [Accessibility](./accessibility.md) — keyboard expectations.

---
Source: `src/components/sparta-kbd.css`
