# Tooltip

Tooltip shows a short piece of contextual text next to an element when a
user hovers or focuses it. `.sp-tooltip`/`.sp-tooltip__text` is the
supported and documented Tooltip API.

## When to use which

- **Requirement:** do not put information a reader needs only in a tooltip. It
  appears on hover or focus, so touch users and many assistive-technology users
  may never see it. If the text is needed, show it as visible text.
- **Guidance:** use Tooltip for a short clarification of something already
  visible: the name of an icon-only control, the meaning of an abbreviation.
- **Guidance:** for a message the reader must notice, use
  [Alert](./alert.md). For richer content that opens on demand, use
  [Dropdown](./dropdown.md) or [Modal](./modal.md).

## `.sp-tooltip`

Hover or focus the text to see the tooltip. This example is live.

```html preview height=7
<div style="padding: 2.5rem 1rem 0">
  <span class="sp-tooltip">
    Hover me
    <span class="sp-tooltip__text">Tooltip content</span>
  </span>
</div>
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

Placement modifiers go on `.sp-tooltip`, not on `.sp-tooltip__text`. The
default is above the trigger.

```html preview height=13 wide=11
<div style="padding: 3rem 4rem">
  <div class="sp-cluster">
    <span class="sp-tooltip">Top (default)<span class="sp-tooltip__text">Above</span></span>
    <span class="sp-tooltip sp-tooltip--bottom">Bottom<span class="sp-tooltip__text">Below</span></span>
    <span class="sp-tooltip sp-tooltip--left">Left<span class="sp-tooltip__text">To the left</span></span>
    <span class="sp-tooltip sp-tooltip--right">Right<span class="sp-tooltip__text">To the right</span></span>
  </div>
</div>
```

```html
<span class="sp-tooltip">...<span class="sp-tooltip__text">...</span></span>                        <!-- top (default) -->
<span class="sp-tooltip sp-tooltip--bottom">...<span class="sp-tooltip__text">...</span></span>
<span class="sp-tooltip sp-tooltip--left">...<span class="sp-tooltip__text">...</span></span>
<span class="sp-tooltip sp-tooltip--right">...<span class="sp-tooltip__text">...</span></span>
```

## Accessibility

- The tooltip shows on `:hover` **and** `:focus-within`, so it's reachable
  by keyboard, not just mouse.
- `prefers-reduced-motion: reduce` disables the show/hide transition for
  users who have that OS preference set; the tooltip still appears and
  disappears, just without motion. This follows SpartaCSS's global
  reduced-motion contract — see [`motion.md`](./motion.md) for the
  canonical explanation, and
  [`accessibility.md`](./accessibility.md) for the full CSS vs.
  JavaScript responsibility contract.
- The wrapper must be focusable for the keyboard to reach the tooltip: put
  it around a link, a button or another focusable element, or give it
  `tabindex="0"`. A tooltip around plain text is reachable by hover only.
- A tooltip's text is not tied to its trigger for assistive technology.
  SpartaCSS adds no `aria-describedby` or `role="tooltip"`; if you rely on the
  text, add that wiring yourself.

## Responsive behavior

Tooltip has no breakpoint-specific rules. Its only media rule is the
reduced-motion one. A tooltip is positioned beside its trigger and does not
reposition itself, so choose a placement that stays on screen at the widths you
support. On a device without hover, the tooltip shows when its trigger
receives focus.

## Common mistakes

**A tooltip around plain text for keyboard users.** It never receives focus.

```html
<!-- Wrong for keyboard users: plain text cannot be focused -->
<span class="sp-tooltip">Label<span class="sp-tooltip__text">Detail</span></span>

<!-- Right: around something focusable -->
<span class="sp-tooltip"><button class="sp-button sp-button--ghost sp-button--icon-only" aria-label="Help"><span class="sp-icon sp-icon-help-circle"></span></button><span class="sp-tooltip__text">Help</span></span>
```

**Putting required information in a tooltip.** See When to use which.

**The modifier on the wrong element.** `--bottom` goes on `.sp-tooltip`.

```html
<!-- Wrong -->
<span class="sp-tooltip"><span class="sp-tooltip__text sp-tooltip--bottom">...</span></span>

<!-- Right -->
<span class="sp-tooltip sp-tooltip--bottom">...<span class="sp-tooltip__text">...</span></span>
```

## Legacy: `[data-tooltip]`

`[data-tooltip]` (with the optional `[data-tooltip-pos]` attribute) and
`.sp-tooltip--visible` are a separate, older Tooltip implementation. They
remain fully supported and their behavior is unchanged, but they will not
receive new variants. Prefer `.sp-tooltip` above for new work.

## Related

- [Dropdown](./dropdown.md) and [Modal](./modal.md) — richer, on-demand content.
- [Alert](./alert.md) — messages the reader must see.
- [Icons](./icons.md) — icon-only controls often need a tooltip.
- [Motion](./motion.md) — the reduced-motion contract.

---
Source: `src/modules/overlay/sparta-tooltip.css`
