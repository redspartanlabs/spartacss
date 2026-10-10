# ADR-0007: Documentation Preview Contract

**Status:** Accepted (2026-10-09)

**Amended by:** [ADR-0008](0008-multiple-live-examples.md), which supersedes decision 3 (one marked
example per page) and extends the marker grammar of decision 1.

---

## Context

SpartaCSS documentation pages show HTML examples in fenced code blocks. A
consumer of the documentation, such as a documentation site, may want to render
one of those examples live beside its source. Nothing in the documentation says
which example is meant for that. A consumer left to guess would infer it from
fence order, headings or metadata of its own, and each of those changes
silently when a page is edited.

This record lets a page designate an example explicitly, in the page itself. It
is a documentation convention. It changes no CSS, selector, token or export
(see ADR-0002), and it requires nothing of any consumer.

---

## Decision

1. **The marker.** A fenced code block is designated for optional live
   rendering when its info string is the language identifier `html` followed by
   the token `preview`:

   ````markdown
   ```html preview
   <button class="sp-button sp-button--primary sp-button--sm">Small</button>
   <button class="sp-button sp-button--primary sp-button--md">Medium (default)</button>
   <button class="sp-button sp-button--primary sp-button--lg">Large</button>
   ```
   ````

   Whitespace between the two words is not significant. A fence is a marker
   only in this form. A `preview` token in any other form is malformed: a
   different language, a different letter case, or any additional token.
   Verification rejects a malformed marker instead of ignoring it. Other
   tokens in the info string are reserved.
2. **Permission, not requirement.** The marker permits a consumer to render the
   example live. It does not require any consumer to do so, and a consumer that
   does not is unaffected.
3. **One per page.** A page contains at most one marked example.
4. **Content.** A marked example is a standalone HTML fragment. It is
   non-empty, it is not a whole document (`<!doctype>`, `<html>`, `<head>` or
   `<body>`), it contains no `<script>` element, and none of its link targets
   (`href`, `src`, `action`, `formaction`, `poster`) is site-relative. A link
   target is site-relative when it is neither an absolute URL with a scheme nor
   a fragment-only reference. It also depends on no other content of its page.
5. **Rendering is unchanged.** The marker extends only the info string. The
   language remains `html`, so a conforming Markdown renderer presents the block
   as it did before.
6. **No inference.** A consumer must not infer a live example from fence
   position, from headings, or from metadata it keeps itself. An example is
   eligible for live rendering only if it carries the marker.
7. **Enforcement and first use.** `scripts/verify-docs-preview.mjs`, run by
   `npm run verify`, applies decisions 1, 3 and 4 to every Markdown page under
   `docs/`, except that it cannot check by machine that an example depends on
   no other content of its page. It also requires the pages it names to carry
   their marker. The first is the Size example on the Button page. The release
   procedure in `RELEASING.md` runs the same script against the extracted
   release package.

---

## Relationship to other records

This record adds a documentation convention and does not change what ADR-0002
treats as a breaking change. Adding a marker to a page is a documentation
change. The authoring rule for component pages appears in section 15.8 of the
component standard (ADR-0005, still Proposed). That section states the rule,
and this record is the decision behind it. No existing record is amended.

---

## Consequences

**Benefits**
- A consumer can render a live example without guessing, and the choice is
  visible in the page and reviewable in its diff.
- The marker survives edits that reorder a page, because it travels with the
  example.
- Pages render as they did before.

**Tradeoffs**
- A page can designate only one example.
- Verification checks the properties listed in decisions 1, 3 and 4. Whether an
  example is truly standalone, and whether it looks right when rendered, remain
  the author's and reviewer's responsibility.
- A consumer whose Markdown tool treats the whole info string as the language
  name must read only its first word.

**Maintenance implications**
- A page that gains a marker is added to the pages `scripts/verify-docs-preview.mjs`
  requires only when a consumer depends on it.

---

## Future ADRs / Decisions

- **Other languages or several previews per page** — not decided. The marker
  covers one `html` example per page.
- **Further info-string tokens** — reserved and not defined here.
- **Which further pages carry a marker** — decided page by page, not by this
  record.
