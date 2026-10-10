# ADR-0008: Multiple Live Examples and Their Height

**Status:** Accepted (2026-10-09)

---

## Context

ADR-0007 lets a documentation page designate one HTML example for optional live
rendering, with the fence info string `html preview`. It chose one per page
because one was all that the first consumer needed.

That limit is now the wrong one. A component page shows a component by
showing its variants and states, and a reader needs to see each of them
rendered, beside the code that produces it. A page about a button has sizes,
colours, outlines and states; a page about a form has several field shapes. One
live example per page leaves most of what the page documents unrendered.

A second problem appears as soon as examples are rendered in isolation, which
ADR-0007 anticipates. A consumer that renders an example in its own isolated
document cannot measure how tall that document is, so it cannot size the frame
to fit. Only the example's author knows roughly how much room it needs.

This record changes the first and answers the second. It adds no requirement
for any consumer, and changes no CSS, selector, token or export (see ADR-0002).

---

## Decision

1. **Any number per page.** This supersedes decision 3 of ADR-0007. A page may
   contain any number of marked examples. Each is independent; a page that
   marks none, one or many is equally valid. Every other decision of ADR-0007
   stands.
2. **Optional height hints.** The marker may carry up to two further tokens
   after `preview`, each whole rem from 3 to 60. `height=N` is the author's
   recommendation for the height of a frame that shows the example at the
   narrowest layout it is designed for. `wide=M` may follow it, and is the
   recommendation for a frame that is comfortably wide, about 30rem or more,
   where content that wrapped when narrow takes less room. `wide` is given only
   together with `height`, and after it.

   ````markdown
   ```html preview height=14 wide=8
   <div class="sp-cluster">…</div>
   ```
   ````

   The hints are presentation advice only. A consumer may use, adjust or ignore them,
   and an example without them is equally valid. The info string is otherwise
   as in ADR-0007: the language `html`, whitespace, `preview`, and nothing
   else. A marker with a different token, an out-of-range or non-numeric
   value, a repeated hint, `wide` without `height` or before it, or a hint on a
   fence that is not a marker is malformed, and verification rejects it.
3. **Content rules, tightened.** A marked example is still a standalone,
   non-empty HTML fragment (ADR-0007, decision 4), and its link targets are
   still not site-relative. In addition it contains none of the following:
   an `<iframe>`, `<object>`, `<embed>`, `<link>`, `<meta>`, `<base>`, `<style>`
   or `<form>` element; an event-handler attribute (`onclick` and the like); or
   a `javascript:`, `data:` or `vbscript:` URL. An example demonstrates what
   SpartaCSS produces, so it has no stylesheet, script or embedded content of
   its own. The constructs rejected are exactly those listed here; this sentence
   gives the reason and adds no further rule.
4. **An example is rendered by the package's own stylesheet.** What an example
   looks like is what the published CSS produces for its markup, and nothing
   about it depends on styles from the page that shows it. An example may
   set `data-theme` on an element of its own to show a theme.
5. **Classes must exist.** Every `sp-` class named in a `class` attribute of an
   HTML code example in `docs/` must be a class that the package's built CSS
   defines. This applies to every `html` fence, marked or not, because an
   unmarked example documents the same API; it is the mechanical form of the
   existing rule that a page must not document a class that does not exist.
6. **No inference.** Unchanged from ADR-0007: only a marked fence is eligible
   for live rendering.
7. **Enforcement.** `scripts/verify-docs-preview.mjs`, run by
   `npm run verify`, applies decisions 2, 3 and 5, and the rules of ADR-0007
   that remain, to every Markdown page under `docs/`. It reads the built
   stylesheet to know which classes exist, so it runs after the build. The
   release procedure runs it against the extracted release package.

---

## Relationship to other records

This supersedes decision 3 of ADR-0007 only, and extends its marker grammar.
ADR-0007 itself is not edited by this record; a reader of ADR-0007 should read
it together with this one. The authoring rules for component pages, section
15.8 of the component standard (ADR-0005, still Proposed), are updated to match.
Nothing here changes what ADR-0002 treats as a breaking change: adding or
removing a marker is a documentation change.

---

## Consequences

**Benefits**
- A page can show every variant and state it documents, each beside its code.
- A consumer can size an isolated frame sensibly without measuring it.
- A documented class name that does not exist, or has been renamed, fails
  verification instead of reaching readers.

**Tradeoffs**
- A height hint is a guess by the author, and can be wrong. A hint that is too
  small clips an example; one that is too large leaves empty space. Authors
  should check an example at a narrow width and at a wide one. A consumer that
  can measure its frames need not use the hints at all.
- Examples are limited to markup and the package's own styles. An example that
  needs script to show its behaviour is outside what a live example can show,
  and the page should say so in prose.

**Maintenance implications**
- The set of unsafe constructs in decision 3 is checked by pattern. A
  consumer that renders examples should still isolate them rather than rely on
  this check alone.
- Pages that must carry a marked example are listed in
  `scripts/verify-docs-preview.mjs`.

---

## Future ADRs / Decisions

- **Other languages** — the marker covers `html` only, as in ADR-0007.
- **Further info-string tokens** — still reserved. `height=N` and `wide=M` are
  the only ones defined.
- **A cross-reference from ADR-0007** to this record is recommended and left
  to the repository owner.
