# Code Block

## Purpose

`sparta-code.css` styles code in two distinct contexts — inline code
within running text, and multi-line code blocks — plus a set of syntax
token classes for basic highlighting. One file, three related but
independent pieces: use inline for short snippets, block for multi-line
code, and tokens only if you're rendering syntax-highlighted output.

## Inline code

### Usage

```html
<p>Run <code class="sp-code">npm install</code> to get started.</p>
```

### Class API

- `.sp-code` — inline monospace badge. Works on `<code>` (recommended).

## Code block

### Usage

```html
<div class="sp-pre__header">
  <span>index.js</span>
  <button class="sp-pre__copy">Copy</button>
</div>
<pre class="sp-pre"><code>console.log("hello");</code></pre>
```

`.sp-pre__header` is optional — omit it for a plain block with no
filename/copy-button row. When present, it removes the top corner
radius from the immediately-following `.sp-pre` (via an adjacent-sibling
selector) so the two visually join into one unit — the header must be
a sibling immediately before `.sp-pre`, not a wrapper around it.

### Class API

- `.sp-pre` — the block container. Works on `<pre>` (recommended, for
  whitespace preservation); horizontally scrollable for long lines.
- `.sp-pre__header` — optional top bar for a filename/label and actions.
- `.sp-pre__copy` — a small button, styled for a "copy to clipboard"
  action inside the header. SpartaCSS does not implement clipboard
  behavior — wire up the actual copy logic yourself.

### Variants

```html
<pre class="sp-pre sp-pre--sm">...</pre>
```

## Syntax tokens

Apply directly to `<span>`s wrapping tokenized code content — SpartaCSS
does not tokenize code for you; pair with a syntax highlighter (or
server-rendered highlighting) that outputs these class names.

```html
<span class="sp-token-keyword">const</span>
<span class="sp-token-string">"value"</span>
```

Available: `.sp-token-keyword`, `-string`, `-function`, `-class`,
`-number`, `-comment`, `-variable`, `-operator`, `-attr`, `-tag`,
`-property`, `-regex`, `-escape`, `-inserted`, `-deleted`, `-muted`.

## State modifiers

None — Code Block is static content display. `.sp-pre__copy` has
`:hover` feedback but no built-in "copied" confirmation state; add your
own (e.g. swapping button text) after the copy action completes.

## Accessibility

- `.sp-pre__copy` needs an accessible name beyond a bare icon if you
  replace its text with an icon — keep visible text (as in Usage) or add
  `aria-label` if you do.
- Syntax token colors (`.sp-token-*`) are not the only way meaning is
  conveyed in code — the underlying text is always present and readable
  regardless of color, so no additional accessibility work is needed for
  the tokens themselves.

---
Source: `src/modules/docs/sparta-code.css`
