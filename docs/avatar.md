# Avatar

## Purpose

Avatar renders a user/entity representation — image, initials, or a
status indicator — plus `.sp-avatar-group` for overlapping stacks of
multiple avatars. Both live in `sparta-avatar.css`; documented together
since Avatar Group is simply a layout wrapper around one or more
`.sp-avatar` elements, not a separate API surface.

## Usage

```html
<span class="sp-avatar">JD</span>

<span class="sp-avatar">
  <img src="/user.jpg" alt="Jane Doe" />
</span>

<span class="sp-avatar">
  JD
  <span class="sp-avatar__status sp-avatar__status--online"></span>
</span>
```

Avatar Group:

```html
<div class="sp-avatar-group">
  <span class="sp-avatar">A</span>
  <span class="sp-avatar">B</span>
  <span class="sp-avatar">C</span>
</div>
```

## Class API

- `.sp-avatar` — the circular (by default) container. Renders text
  content (e.g. initials) directly, or an `<img>` child which is
  automatically sized and cropped (`object-fit: cover`).
- `.sp-avatar__status` — a small dot badge, absolutely positioned at the
  bottom-right corner.
- `.sp-avatar-group` — a `row-reverse` flex wrapper that overlaps its
  `.sp-avatar` children with a negative margin and a ring matching the
  page surface color.

## Variants

### Size

```html
<span class="sp-avatar sp-avatar--xs">...</span>
<span class="sp-avatar sp-avatar--sm">...</span>
<span class="sp-avatar sp-avatar--md">...</span> <!-- default -->
<span class="sp-avatar sp-avatar--lg">...</span>
<span class="sp-avatar sp-avatar--xl">...</span>
```

### Color

```html
<span class="sp-avatar sp-avatar--primary">...</span>
<span class="sp-avatar sp-avatar--secondary">...</span>
<span class="sp-avatar sp-avatar--success">...</span>
```

Only `--primary`, `--secondary`, and `--success` color variants exist in
source today — there is no `--warning`/`--error`/`--info` avatar color at
this time.

### Shape

```html
<span class="sp-avatar sp-avatar--square">...</span>
```

### Status

```html
<span class="sp-avatar__status sp-avatar__status--online"></span>
<span class="sp-avatar__status sp-avatar__status--away"></span>
<span class="sp-avatar__status sp-avatar__status--busy"></span>
<span class="sp-avatar__status sp-avatar__status--offline"></span>
```

## State modifiers

`.sp-avatar-group .sp-avatar:hover` lifts the hovered avatar
(`translateY`) and raises its stacking order — a static, CSS-only
"bring to front on hover" effect requiring no script.

## Accessibility

- If `.sp-avatar` contains only initials (no `<img>`), that text is
  already accessible as content — no extra markup needed.
- If `.sp-avatar` wraps an `<img>`, give it a meaningful `alt` (the
  person's name, not "avatar") — SpartaCSS does not add or infer one.
- `.sp-avatar__status` is a purely visual dot with no accessible text of
  its own. If the status needs to be conveyed to assistive technology,
  add visually-hidden text (e.g. `.sp-sr-only`, see
  [`accessibility.md`](./accessibility.md#keyboard-and-focus-expectations))
  alongside it rather than relying on color alone.

---
Source: `src/components/sparta-avatar.css`
