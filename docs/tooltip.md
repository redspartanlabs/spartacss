# Tooltip

Tooltip shows a short piece of contextual text next to an element when a
user hovers or focuses it. `.sp-tooltip`/`.sp-tooltip__text` is the
supported and documented Tooltip API.

## `.sp-tooltip`

```html
<span class="sp-tooltip">
  Hover me
  <span class="sp-tooltip__text">Tooltip content</span>
</span>
```

- `.sp-tooltip` — the trigger wrapper. Wrap it around whatever element
  should show the tooltip.
- `.sp-tooltip__text` — the tooltip bubble. Hidden by default; shown on
  hover or keyboard focus of the parent `.sp-tooltip`. No JavaScript
  required — this is a pure-CSS component.

The tooltip surface stays legible in both light and dark themes with no
action required from the consumer.

## Variants

### Placement

```html
<span class="sp-tooltip">...<span class="sp-tooltip__text">...</span></span>                        <!-- top (default) -->
<span class="sp-tooltip sp-tooltip--bottom">...<span class="sp-tooltip__text">...</span></span>
<span class="sp-tooltip sp-tooltip--left">...<span class="sp-tooltip__text">...</span></span>
<span class="sp-tooltip sp-tooltip--right">...<span class="sp-tooltip__text">...</span></span>
```

Placement modifiers go on `.sp-tooltip`, not on `.sp-tooltip__text`.

## Accessibility

- The tooltip shows on `:hover` **and** `:focus-within`, so it's reachable
  by keyboard, not just mouse.
- `prefers-reduced-motion: reduce` disables the show/hide transition for
  users who have that OS preference set; the tooltip still appears and
  disappears, just without motion.

## Legacy: `[data-tooltip]`

`[data-tooltip]` (with the optional `[data-tooltip-pos]` attribute) and
`.sp-tooltip--visible` are a separate, older Tooltip implementation. They
remain fully supported and their behavior is unchanged, but they will not
receive new variants. Prefer `.sp-tooltip` above for new work.

---
Source: `src/modules/overlay/sparta-tooltip.css`
