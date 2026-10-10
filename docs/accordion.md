# Accordion

Accordion organizes content into collapsible sections, showing one or more
at a time. `.sp-accordion__header`/`.sp-accordion__icon` is the supported
and documented Accordion API.

## When to use which

- **Guidance:** use Accordion to let a reader scan a list of headings and open
  only the sections they need: FAQs, grouped settings, long reference content.
- **Guidance:** if the reader needs most of the content, show it in the page.
  Hiding content they will almost always open adds a click for nothing.
- **Guidance:** for sections the reader moves between one at a time, with all
  titles always visible, use [Tabs](./tabs.md).

## `.sp-accordion`

The first section is open. SpartaCSS ships no JavaScript, so the sections in
this example do not toggle: the open state is the class on the item, and
toggling it is your script's job.

```html preview height=14
<div class="sp-accordion">
  <div class="sp-accordion__item sp-accordion__item--open">
    <button class="sp-accordion__header" aria-expanded="true" aria-controls="acc-1">
      Section title
      <span class="sp-accordion__icon">
        <span class="sp-icon sp-icon-chevron-down" aria-hidden="true"></span>
      </span>
    </button>
    <div class="sp-accordion__content" id="acc-1">
      <p>Section content.</p>
    </div>
  </div>

  <div class="sp-accordion__item">
    <button class="sp-accordion__header" aria-expanded="false" aria-controls="acc-2">
      Another section
      <span class="sp-accordion__icon">
        <span class="sp-icon sp-icon-chevron-down" aria-hidden="true"></span>
      </span>
    </button>
    <div class="sp-accordion__content" id="acc-2">
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

The chevron comes from the [icon module](./icons.md), so the accordion needs
`sparta-icons.css` or a bundle that includes it.

## State modifiers

SpartaCSS ships no JavaScript. `.sp-accordion__item--open` is a plain
state modifier that your own script toggles on `.sp-accordion__item`
(typically on the header's click handler) — the same convention used by
`.sp-modal--open` and `.sp-navbar--open`.

All sections closed, and several open at once, are both just a matter of which
items carry the class:

```html preview height=22
<div class="sp-accordion">
  <div class="sp-accordion__item sp-accordion__item--open">
    <button class="sp-accordion__header" aria-expanded="true" aria-controls="acc-a">One<span class="sp-accordion__icon"><span class="sp-icon sp-icon-chevron-down" aria-hidden="true"></span></span></button>
    <div class="sp-accordion__content" id="acc-a"><p>Open.</p></div>
  </div>
  <div class="sp-accordion__item sp-accordion__item--open">
    <button class="sp-accordion__header" aria-expanded="true" aria-controls="acc-b">Two<span class="sp-accordion__icon"><span class="sp-icon sp-icon-chevron-down" aria-hidden="true"></span></span></button>
    <div class="sp-accordion__content" id="acc-b"><p>Also open.</p></div>
  </div>
  <div class="sp-accordion__item">
    <button class="sp-accordion__header" aria-expanded="false" aria-controls="acc-c">Three<span class="sp-accordion__icon"><span class="sp-icon sp-icon-chevron-down" aria-hidden="true"></span></span></button>
    <div class="sp-accordion__content" id="acc-c"><p>Closed.</p></div>
  </div>
</div>
```

## JavaScript responsibility

Your script:

- toggles `.sp-accordion__item--open` on the item when its header is activated;
- keeps `aria-expanded` on the header in step with that class;
- if only one section should be open at a time, closes the others itself.

SpartaCSS draws the open and closed states and animates between them. It does
not know which items are open.

## Accessibility

Accordion provides structure and styling only — no JavaScript behavior is
shipped. The consumer is responsible for:

- Toggling `.sp-accordion__item--open` in response to user interaction.
- Any `aria-expanded`/`aria-controls` attributes needed to communicate
  expanded/collapsed state to assistive technology.

`.sp-accordion__header` is a real `<button>`, so it's keyboard-focusable
and activatable by default without any extra markup. The open/close
transition respects the shared reduced-motion contract documented
canonically in [`motion.md`](./motion.md); see
[`accessibility.md`](./accessibility.md) for the full CSS vs. JavaScript
responsibility contract this state-modifier pattern follows.

## Responsive behavior

Accordion has no breakpoint-specific behavior. It is a block that fills its
container.

## Common mistakes

**Adding `--open` and not updating `aria-expanded`.** The section looks open
while a screen reader still announces "collapsed".

**A header that is not a button.** The header is a `<button>`; a `<div>` with a
click handler cannot be focused or activated from the keyboard.

**An empty icon slot.** `.sp-accordion__icon` expects a real child icon; with
nothing inside, there is no chevron.

**Mixing the legacy trigger with the current header.** `.sp-accordion__trigger`
is a separate, older API that draws its own chevron. Use one set of classes
per accordion.

## Legacy: `.sp-accordion__trigger`

`.sp-accordion__trigger` and `.sp-accordion__content--animated` are a
separate, older Accordion implementation. Rather than a child icon
element, `.sp-accordion__trigger` renders its chevron as a `::after`
pseudo-element. They remain fully supported and their behavior is
unchanged, but they will not receive new variants. Prefer
`.sp-accordion__header`/`.sp-accordion__icon` above for new work.

## Related

- [Tabs](./tabs.md) — one visible panel at a time, titles always shown.
- [Icons](./icons.md) — the chevron.
- [Accessibility](./accessibility.md) — the CSS versus JavaScript contract.
- [Motion](./motion.md) — the open and close transition.

---
Source: `src/modules/overlay/sparta-accordion.css`
