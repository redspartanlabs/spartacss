# Code Block

## Purpose

`sparta-code.css` styles code in two distinct contexts — inline code
within running text, and multi-line code blocks — plus a set of syntax
token classes for basic highlighting. One file, three related but
independent pieces: use inline for short snippets, block for multi-line
code, and tokens only if you're rendering syntax-highlighted output.

## When to use which

- **Guidance:** use inline code (`.sp-code`) for a short name, command or value
  inside a sentence; use a block (`.sp-pre`) for anything of more than a line,
  or anything the reader will copy.
- **Guidance:** to show a keyboard key rather than code, use [Kbd](./kbd.md).

## Inline code

### Usage

```html preview height=5
<p>Run <code class="sp-code">npm install</code> to get started.</p>
```

### Class API

- `.sp-code` — inline monospace badge. Works on `<code>` (recommended).

## Code block

### Usage

```html preview height=10
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

```html preview height=10
<pre class="sp-pre sp-pre--sm"><code>const small = true;</code></pre>
<pre class="sp-pre"><code>const normal = true;</code></pre>
```

A block with no header:

```html preview height=8
<pre class="sp-pre"><code>npm install @redspartanlabs/spartacss</code></pre>
```

## Syntax tokens

Apply directly to `<span>`s wrapping tokenized code content — SpartaCSS
does not tokenize code for you; pair with a syntax highlighter (or
server-rendered highlighting) that outputs these class names.

```html preview height=10
<pre class="sp-pre"><code><span class="sp-token-keyword">const</span> greeting <span class="sp-token-operator">=</span> <span class="sp-token-string">"hello"</span><span class="sp-token-operator">;</span>
<span class="sp-token-comment">// a comment</span>
<span class="sp-token-function">render</span>(greeting, <span class="sp-token-number">42</span>);</code></pre>
```

Available: `.sp-token-keyword`, `-string`, `-function`, `-class`,
`-number`, `-comment`, `-variable`, `-operator`, `-attr`, `-tag`,
`-property`, `-regex`, `-escape`, `-inserted`, `-deleted`, `-muted`.

## State modifiers

None — Code Block is static content display. `.sp-pre__copy` has
`:hover` feedback but no built-in "copied" confirmation state; add your
own (e.g. swapping button text) after the copy action completes.

## JavaScript responsibility

The copy button is appearance only. Your script reads the block's text, writes
it to the clipboard, and, if you want one, shows a confirmation by changing the
button's text or state. SpartaCSS does neither.

## Accessibility

- `.sp-pre__copy` needs an accessible name beyond a bare icon if you
  replace its text with an icon — keep visible text (as in Usage) or add
  `aria-label` if you do.
- Syntax token colors (`.sp-token-*`) are not the only way meaning is
  conveyed in code — the underlying text is always present and readable
  regardless of color, so no additional accessibility work is needed for
  the tokens themselves.
- A `<pre>` that scrolls horizontally is a scrollable region. A keyboard user
  can scroll it only if it can receive focus; add `tabindex="0"` (and a label)
  if long lines are likely.

## Responsive behavior

Code Block has no breakpoint-specific rules. `.sp-pre` scrolls horizontally
inside its own box, so a long line does not widen the page. Inline `.sp-code`
wraps with the surrounding text.

## Common mistakes

**A wrapper around `.sp-pre` for the header.** The header must be the sibling
immediately before the `<pre>`. Wrapping both removes the join.

**A copy button that does nothing.** `.sp-pre__copy` is styled only. Without
your script it is a button that does nothing.

**Expecting highlighting.** `.sp-token-*` classes color spans you provide.
SpartaCSS does not read or tokenize your code.

**A `<div>` with `white-space` tricks instead of `<pre>`.** Use `<pre>` so
whitespace and the code's meaning are preserved.

## Related

- [Kbd](./kbd.md) — keyboard keys.
- [Button](./button.md) — the copy action's styling is a small button.
- [Tokens](./tokens.md) — the colors the syntax classes resolve through.

---
Source: `src/modules/docs/sparta-code.css`
