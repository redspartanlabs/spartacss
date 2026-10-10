# Icons

## Purpose

SpartaCSS ships a pure-CSS icon system — no SVG sprite file, no icon font,
no JavaScript. Each icon is a named class rendered via a `::before`
pseudo-element, masked with an inline SVG shape and filled with
`currentColor`, so icons automatically match whatever text color
surrounds them.

## When to use it

- **Guidance:** use an icon to support a label, not to replace one. An icon beside
  text is decorative; an icon alone needs an accessible name from its control
  (see Accessibility).
- **Guidance:** these are the icons SpartaCSS ships. If you need one that is not
  listed, use your own SVG rather than a guessed class name.

## Usage

```html preview height=5
<span class="sp-icon sp-icon-check" aria-hidden="true"></span>
<span class="sp-icon sp-icon--lg sp-icon-star" aria-hidden="true"></span>
```

Every icon requires **two** classes: the base `.sp-icon` (sizing/layout)
and one `.sp-icon-<name>` (the shape). `.sp-icon-check` alone, with no
`.sp-icon`, will render at whatever size its parent happens to produce
rather than the intended default.

## Class API

- `.sp-icon` — base class. `inline-flex`, defaults to 1.25rem (20px, the
  "md" size).
- `.sp-icon-<name>` — the shape, e.g. `.sp-icon-check`, `.sp-icon-search`,
  `.sp-icon-trash`. The full set is enumerated directly in source (~86
  icons, grouped into System UI, Semantic/Feedback, Navigation & Action,
  Marketing & Content, and Extended categories) — treat the source file's
  enumerated class list as the authoritative reference for exactly which
  names exist, rather than a name guessed from a similar icon library.

## Variants

### Size

```html preview height=6
<span class="sp-icon sp-icon--xs sp-icon-check"></span>
<span class="sp-icon sp-icon--sm sp-icon-check"></span>
<span class="sp-icon sp-icon--md sp-icon-check"></span> <!-- default -->
<span class="sp-icon sp-icon--lg sp-icon-check"></span>
<span class="sp-icon sp-icon--xl sp-icon-check"></span>
<span class="sp-icon sp-icon--2xl sp-icon-check"></span>
```

### Alignment

```html
<span class="sp-icon sp-icon--align-top sp-icon-check"></span>
<span class="sp-icon sp-icon--align-bottom sp-icon-check"></span>
<span class="sp-icon sp-icon--align-text-top sp-icon-check"></span>
<span class="sp-icon sp-icon--align-text-bottom sp-icon-check"></span>
```

Sets `vertical-align` for inline placement next to text — use when the
default `middle` alignment doesn't line up well with surrounding text.

## Gallery

Every icon this release ships, with the class that selects it, in four groups in
alphabetical order. Each is used as `<span class="sp-icon sp-icon-NAME">`; the
galleries show them at `--lg`. The list was taken from the stylesheet for this
release, so it is complete for it and may differ in another.

### alert-triangle to code

```html preview height=50 wide=29
<div class="sp-grid sp-grid--auto sp-grid--gap-sm" style="--sp-grid-min-item: 6.5rem">
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-alert-triangle" aria-hidden="true"></span><code class="sp-code">alert-triangle</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-archive" aria-hidden="true"></span><code class="sp-code">archive</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-arrow-left" aria-hidden="true"></span><code class="sp-code">arrow-left</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-arrow-right" aria-hidden="true"></span><code class="sp-code">arrow-right</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-arrow-up-down" aria-hidden="true"></span><code class="sp-code">arrow-up-down</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-at-sign" aria-hidden="true"></span><code class="sp-code">at-sign</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-award" aria-hidden="true"></span><code class="sp-code">award</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-bell" aria-hidden="true"></span><code class="sp-code">bell</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-bookmark" aria-hidden="true"></span><code class="sp-code">bookmark</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-briefcase" aria-hidden="true"></span><code class="sp-code">briefcase</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-calendar" aria-hidden="true"></span><code class="sp-code">calendar</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-camera" aria-hidden="true"></span><code class="sp-code">camera</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-chart-bar" aria-hidden="true"></span><code class="sp-code">chart-bar</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-check" aria-hidden="true"></span><code class="sp-code">check</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-check-circle" aria-hidden="true"></span><code class="sp-code">check-circle</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-check-square" aria-hidden="true"></span><code class="sp-code">check-square</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-chevron-down" aria-hidden="true"></span><code class="sp-code">chevron-down</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-chevron-left" aria-hidden="true"></span><code class="sp-code">chevron-left</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-chevron-right" aria-hidden="true"></span><code class="sp-code">chevron-right</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-chevron-up" aria-hidden="true"></span><code class="sp-code">chevron-up</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-clock" aria-hidden="true"></span><code class="sp-code">clock</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-code" aria-hidden="true"></span><code class="sp-code">code</code></div>
</div>
```

### copy to list-view

```html preview height=50 wide=29
<div class="sp-grid sp-grid--auto sp-grid--gap-sm" style="--sp-grid-min-item: 6.5rem">
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-copy" aria-hidden="true"></span><code class="sp-code">copy</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-database" aria-hidden="true"></span><code class="sp-code">database</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-download" aria-hidden="true"></span><code class="sp-code">download</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-drag-handle" aria-hidden="true"></span><code class="sp-code">drag-handle</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-edit" aria-hidden="true"></span><code class="sp-code">edit</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-expand" aria-hidden="true"></span><code class="sp-code">expand</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-external-link" aria-hidden="true"></span><code class="sp-code">external-link</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-eye" aria-hidden="true"></span><code class="sp-code">eye</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-eye-off" aria-hidden="true"></span><code class="sp-code">eye-off</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-file-text" aria-hidden="true"></span><code class="sp-code">file-text</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-filter" aria-hidden="true"></span><code class="sp-code">filter</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-flag" aria-hidden="true"></span><code class="sp-code">flag</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-globe" aria-hidden="true"></span><code class="sp-code">globe</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-grid" aria-hidden="true"></span><code class="sp-code">grid</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-heart" aria-hidden="true"></span><code class="sp-code">heart</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-help-circle" aria-hidden="true"></span><code class="sp-code">help-circle</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-home" aria-hidden="true"></span><code class="sp-code">home</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-image" aria-hidden="true"></span><code class="sp-code">image</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-info" aria-hidden="true"></span><code class="sp-code">info</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-layers" aria-hidden="true"></span><code class="sp-code">layers</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-link" aria-hidden="true"></span><code class="sp-code">link</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-list-view" aria-hidden="true"></span><code class="sp-code">list-view</code></div>
</div>
```

### lock to settings

```html preview height=50 wide=29
<div class="sp-grid sp-grid--auto sp-grid--gap-sm" style="--sp-grid-min-item: 6.5rem">
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-lock" aria-hidden="true"></span><code class="sp-code">lock</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-log-out" aria-hidden="true"></span><code class="sp-code">log-out</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-mail" aria-hidden="true"></span><code class="sp-code">mail</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-maximize" aria-hidden="true"></span><code class="sp-code">maximize</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-menu" aria-hidden="true"></span><code class="sp-code">menu</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-message-circle" aria-hidden="true"></span><code class="sp-code">message-circle</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-minimize" aria-hidden="true"></span><code class="sp-code">minimize</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-minus" aria-hidden="true"></span><code class="sp-code">minus</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-moon" aria-hidden="true"></span><code class="sp-code">moon</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-more-horizontal" aria-hidden="true"></span><code class="sp-code">more-horizontal</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-more-vertical" aria-hidden="true"></span><code class="sp-code">more-vertical</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-paper-clip" aria-hidden="true"></span><code class="sp-code">paper-clip</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-pause" aria-hidden="true"></span><code class="sp-code">pause</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-percent" aria-hidden="true"></span><code class="sp-code">percent</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-phone" aria-hidden="true"></span><code class="sp-code">phone</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-play" aria-hidden="true"></span><code class="sp-code">play</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-plus" aria-hidden="true"></span><code class="sp-code">plus</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-refresh" aria-hidden="true"></span><code class="sp-code">refresh</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-rss" aria-hidden="true"></span><code class="sp-code">rss</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-search" aria-hidden="true"></span><code class="sp-code">search</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-send" aria-hidden="true"></span><code class="sp-code">send</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-settings" aria-hidden="true"></span><code class="sp-code">settings</code></div>
</div>
```

### share to zap

```html preview height=46 wide=24
<div class="sp-grid sp-grid--auto sp-grid--gap-sm" style="--sp-grid-min-item: 6.5rem">
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-share" aria-hidden="true"></span><code class="sp-code">share</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-shield-check" aria-hidden="true"></span><code class="sp-code">shield-check</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-slash" aria-hidden="true"></span><code class="sp-code">slash</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-sort-asc" aria-hidden="true"></span><code class="sp-code">sort-asc</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-sort-desc" aria-hidden="true"></span><code class="sp-code">sort-desc</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-star" aria-hidden="true"></span><code class="sp-code">star</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-sun" aria-hidden="true"></span><code class="sp-code">sun</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-table-2" aria-hidden="true"></span><code class="sp-code">table-2</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-tag" aria-hidden="true"></span><code class="sp-code">tag</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-target" aria-hidden="true"></span><code class="sp-code">target</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-terminal" aria-hidden="true"></span><code class="sp-code">terminal</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-trash" aria-hidden="true"></span><code class="sp-code">trash</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-trending-down" aria-hidden="true"></span><code class="sp-code">trending-down</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-trending-up" aria-hidden="true"></span><code class="sp-code">trending-up</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-upload" aria-hidden="true"></span><code class="sp-code">upload</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-user" aria-hidden="true"></span><code class="sp-code">user</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-users" aria-hidden="true"></span><code class="sp-code">users</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-x" aria-hidden="true"></span><code class="sp-code">x</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-x-circle" aria-hidden="true"></span><code class="sp-code">x-circle</code></div>
  <div class="sp-stack sp-stack--sm" style="align-items: center; text-align: center"><span class="sp-icon sp-icon--lg sp-icon-zap" aria-hidden="true"></span><code class="sp-code">zap</code></div>
</div>
```

## Component integration

A few core components have their own dedicated rules for icons placed
inside them:

- **Button** — `.sp-button .sp-icon` gets automatic trailing margin,
  removed if the icon is the button's only child (`.sp-button--icon-only`
  for icon-only buttons).
- **Alert** — `.sp-alert .sp-icon` gets a fixed size and trailing margin
  when placed directly inside `.sp-alert` (as an alternative to Alert's
  own `.sp-alert__icon` slot — see [`alert.md`](./alert.md)). Note: this
  integration only sets sizing/spacing; it does not reliably tint the
  icon's color per severity today, so don't depend on `.sp-alert--success`
  etc. to automatically recolor a bare `.sp-icon` child — set an explicit
  color yourself if you need severity-tinted icon color outside of
  `.sp-alert__icon`.
- **Modal, Drawer** close buttons render their own built-in icon (via
  `::before`, not a `.sp-icon` child) — do not add a `.sp-icon` inside
  `.sp-modal__close`/`.sp-drawer__close`, it would render a second,
  redundant icon alongside the component's own.

An icon in a button, before a label and on its own. (Alert has its own icon
slot, documented on its page, which is the better fit for tinting an icon by
severity.)

```html preview height=6
<button class="sp-button sp-button--primary"><span class="sp-icon sp-icon-plus" aria-hidden="true"></span>Add</button>
<button class="sp-button sp-button--ghost sp-button--icon-only" aria-label="Search"><span class="sp-icon sp-icon-search"></span></button>
```

## Accessibility

- `.sp-icon[aria-hidden="true"]` disables pointer events on the icon —
  SpartaCSS does not add `aria-hidden` for you; add it yourself on any
  icon that's purely decorative (i.e. the vast majority of icon usage,
  since the surrounding text or label usually already conveys the
  meaning), as shown throughout Usage above.
- If an icon is the *only* content of an interactive element (e.g. an
  icon-only button), it is **not** decorative — do not mark it
  `aria-hidden`, and instead give the interactive element itself an
  accessible name via `aria-label` (see
  [`button.md`](./button.md#accessibility) for the icon-only Button case).

## Responsive behavior

Icons have no breakpoint-specific behavior. They are fixed-size inline
elements, sized by `--xs` to `--2xl` and not by the viewport. They take the
surrounding text color, so they follow a theme.

## Common mistakes

**Only the shape class.** The size and layout come from `.sp-icon`.

```html
<!-- Wrong: no base class -->
<span class="sp-icon-check"></span>

<!-- Right -->
<span class="sp-icon sp-icon-check" aria-hidden="true"></span>
```

**A guessed name.** An icon name taken from another library may not exist
here. Look it up in the Gallery above; a class that does not exist renders
nothing.

**An icon-only control with no name.** The control, not the icon, needs the
accessible name:

```html
<!-- Wrong -->
<button class="sp-button sp-button--ghost sp-button--icon-only"><span class="sp-icon sp-icon-search"></span></button>

<!-- Right -->
<button class="sp-button sp-button--ghost sp-button--icon-only" aria-label="Search"><span class="sp-icon sp-icon-search"></span></button>
```

**An icon inside a Modal or Drawer close button.** They draw their own.

## Related

- [Button](./button.md) — icons in buttons, and `--icon-only`.
- [Alert](./alert.md) — the alert icon slot.
- [Accordion](./accordion.md), [Stat](./stat.md) and
  [Empty state](./empty-state.md) — components that expect an icon.
- [Design tokens](./tokens.md) — the icon-mask tokens are an internal detail.

---
Source: `src/modules/icons/sparta-icons.css`
