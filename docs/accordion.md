# Accordion

Accordion organizes content into collapsible sections, showing one or more
at a time. `.sp-accordion__header`/`.sp-accordion__icon` is the supported
and documented Accordion API.

## `.sp-accordion`

```html
<div class="sp-accordion">
  <div class="sp-accordion__item sp-accordion__item--open">
    <button class="sp-accordion__header">
      Section title
      <span class="sp-accordion__icon">
        <span class="sp-icon sp-icon-chevron-down"></span>
      </span>
    </button>
    <div class="sp-accordion__content">
      <p>Section content.</p>
    </div>
  </div>

  <div class="sp-accordion__item">
    <button class="sp-accordion__header">
      Another section
      <span class="sp-accordion__icon">
        <span class="sp-icon sp-icon-chevron-down"></span>
      </span>
    </button>
    <div class="sp-accordion__content">
      <p>Section content.</p>
    </div>
  </div>
</div>
```

- `.sp-accordion` — the outer bordered container.
- `.sp-accordion__item` — one collapsible section. Add `--open` to expand it.
- `.sp-accordion__header` — the clickable header row (a `<button>`).
- `.sp-accordion__icon` — a chevron slot; expects a real child icon element
  (e.g. `.sp-icon-chevron-down` from `sparta-icons.css`) and rotates 180°
  when its item is open.
- `.sp-accordion__content` — the collapsible body. Animates open/closed via
  `grid-template-rows`, so no fixed height is required.

## State modifiers

SpartaCSS ships no JavaScript. `.sp-accordion__item--open` is a plain
state modifier that your own script toggles on `.sp-accordion__item`
(typically on the header's click handler) — the same convention used by
`.sp-modal--open` and `.sp-navbar--open`.

## Accessibility

Accordion provides structure and styling only — no JavaScript behavior is
shipped. The consumer is responsible for:

- Toggling `.sp-accordion__item--open` in response to user interaction.
- Any `aria-expanded`/`aria-controls` attributes needed to communicate
  expanded/collapsed state to assistive technology.

`.sp-accordion__header` is a real `<button>`, so it's keyboard-focusable
and activatable by default without any extra markup.

## Legacy: `.sp-accordion__trigger`

`.sp-accordion__trigger` and `.sp-accordion__content--animated` are a
separate, older Accordion implementation. Rather than a child icon
element, `.sp-accordion__trigger` renders its chevron as a `::after`
pseudo-element. They remain fully supported and their behavior is
unchanged, but they will not receive new variants. Prefer
`.sp-accordion__header`/`.sp-accordion__icon` above for new work.

---
Source: `src/modules/overlay/sparta-accordion.css`
