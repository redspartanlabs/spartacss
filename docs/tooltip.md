# Tooltip

SpartaCSS's tooltip lives in `src/modules/overlay/sparta-tooltip.css`. As of
`0.6.0`, `.sp-tooltip`/`.sp-tooltip__text` is the supported, documented
Tooltip API.

## `.sp-tooltip`

```html
<span class="sp-tooltip">
  Hover me
  <span class="sp-tooltip__text">Tooltip content</span>
</span>
```

- `.sp-tooltip` — the trigger wrapper. `position: relative`, so the tooltip
  text can position itself against it.
- `.sp-tooltip__text` — the tooltip bubble. Hidden by default; shown on
  `:hover` or `:focus-within` of the parent `.sp-tooltip`. No JavaScript
  required — this is a pure-CSS component.

### Placement

```html
<span class="sp-tooltip">...<span class="sp-tooltip__text">...</span></span>                        <!-- top (default) -->
<span class="sp-tooltip sp-tooltip--bottom">...<span class="sp-tooltip__text">...</span></span>
<span class="sp-tooltip sp-tooltip--left">...<span class="sp-tooltip__text">...</span></span>
<span class="sp-tooltip sp-tooltip--right">...<span class="sp-tooltip__text">...</span></span>
```

Placement modifiers go on `.sp-tooltip`, not on `.sp-tooltip__text`.

### Surface color

`.sp-tooltip__text` uses `var(--sp-bg-inverse)` (paired with
`var(--sp-text-inverse)`) rather than any of the theme-reactive
`--sp-bg-*` tokens. This is deliberate: a tooltip's surface needs to stay
dark regardless of the active theme so its white text stays legible — the
same reason `--sp-text-inverse` itself doesn't flip between themes.
`prefers-reduced-motion: reduce` disables the show/hide opacity transition.

## Legacy: `[data-tooltip]`

`[data-tooltip]` / `[data-tooltip-pos]` and `.sp-tooltip--visible` are a
separate, older tooltip implementation, frozen as of `0.6.0`. They remain
fully supported for backward compatibility and their behavior is
unchanged, but they will not receive new variants. Prefer `.sp-tooltip`
above for new work.
