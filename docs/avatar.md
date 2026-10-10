# Avatar

## Purpose

Avatar renders a user/entity representation — image, initials, or a
status indicator — plus `.sp-avatar-group` for overlapping stacks of
multiple avatars. Both live in `sparta-avatar.css`; documented together
since Avatar Group is simply a layout wrapper around one or more
`.sp-avatar` elements, not a separate API surface.

## Usage

Initials, with a status dot:

```html preview height=6
<span class="sp-avatar">JD</span>

<span class="sp-avatar">
  JD
  <span class="sp-avatar__status sp-avatar__status--online"></span>
</span>
```

An image. The `<img>` is sized and cropped to fill the avatar; the source and
`alt` are yours:

```html
<span class="sp-avatar">
  <img src="/user.jpg" alt="Jane Doe" />
</span>
```

Avatar Group:

```html preview height=6
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

```html preview height=8
<span class="sp-avatar sp-avatar--xs">XS</span>
<span class="sp-avatar sp-avatar--sm">SM</span>
<span class="sp-avatar sp-avatar--md">MD</span>
<span class="sp-avatar sp-avatar--lg">LG</span>
<span class="sp-avatar sp-avatar--xl">XL</span>
```

`--md` is the default; an avatar with no size modifier looks the same.

### Color

```html preview height=6
<span class="sp-avatar">AB</span>
<span class="sp-avatar sp-avatar--primary">AB</span>
<span class="sp-avatar sp-avatar--secondary">AB</span>
<span class="sp-avatar sp-avatar--success">AB</span>
```

Only `--primary`, `--secondary`, and `--success` color variants exist in
source today — there is no `--warning`/`--error`/`--info` avatar color at
this time.

### Shape

```html preview height=6
<span class="sp-avatar">JD</span>
<span class="sp-avatar sp-avatar--square">JD</span>
```

### Status

```html preview height=6
<span class="sp-avatar">ON<span class="sp-avatar__status sp-avatar__status--online"></span></span>
<span class="sp-avatar">AW<span class="sp-avatar__status sp-avatar__status--away"></span></span>
<span class="sp-avatar">BU<span class="sp-avatar__status sp-avatar__status--busy"></span></span>
<span class="sp-avatar">OF<span class="sp-avatar__status sp-avatar__status--offline"></span></span>
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

```html preview height=6
<span class="sp-avatar">JD<span class="sp-avatar__status sp-avatar__status--online"></span><span class="sp-sr-only">Online</span></span>
```

## Responsive behavior

Avatar has no breakpoint-specific behavior. Avatars are fixed-size, so choose
the size that suits the layout and keep it consistent for the same kind of
item.

## Common mistakes

**A status dot with nothing for assistive technology.** The dot is a colored
circle. Add visually hidden text (shown above) so "online" is not conveyed by
color alone.

**A generic `alt`.**

```html
<!-- Wrong: tells a screen reader nothing -->
<span class="sp-avatar"><img src="/jd.jpg" alt="avatar" /></span>

<!-- Right: the person -->
<span class="sp-avatar"><img src="/jd.jpg" alt="Jane Doe" /></span>
```

**Expecting a color variant that does not exist.** There is no `--error`,
`--warning` or `--info` avatar.

## Related

- [Badge & Chip](./badge.md) — labels and tokens.
- [Accessibility](./accessibility.md) — the `.sp-sr-only` utility.
- [Card](./card.md) and [List](./list.md) — common places for avatars.

---
Source: `src/components/sparta-avatar.css`
