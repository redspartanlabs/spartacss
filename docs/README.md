# SpartaCSS Documentation

Every document in this directory, grouped by what you are trying to do.

This page is navigation only — it links documentation rather than restating
it. Each linked document remains the authority on its own subject, and each
names its own source file at the bottom so you can read the CSS behind it.

New to SpartaCSS? Start with the [README](../README.md)'s Getting started
section, then come back here.

## Foundations

Read these first if you are adopting SpartaCSS. All four are in every
bundle, because they are core — nothing below them is optional.

| Document | What it covers |
| --- | --- |
| [Design Tokens](tokens.md) | The `--sp-*` custom properties every component resolves through: naming convention, color system, typography, spacing, and the reference-vs-override guidance for extending SpartaCSS from your own stylesheet. |
| [Theming](theming.md) | The dark and light themes, how the `data-theme` attribute selects one, and which tokens change between them. |
| [Layout](layout.md) | The four supported layout primitives — container, stack, cluster, and grid. |
| [Motion](motion.md) | The timing scale, the named keyframes, and the global reduced-motion override. |
| [Accessibility](accessibility.md) | What SpartaCSS guarantees on its own, and what it cannot — the contract that follows from shipping no JavaScript. |

## Components

Everything in this section is included in `spartacss.css`, the default
bundle, and therefore also in `sparta-all.css`. No extra import is needed
for any of it.

### Core components

| Document | What it covers |
| --- | --- |
| [Button](button.md) | `.sp-button` with its size, color, width and loading modifiers. |
| [Card](card.md) | A surface with header, body and footer parts. |
| [Forms](forms.md) | Input, Select, Textarea, Checkbox, Radio and Toggle Switch, plus the `.sp-form-group` and `.sp-field` wrapper systems. |
| [Badge & Chip](badge.md) | Two pill-shaped labels that are deliberately not interchangeable — a static badge and an interactive chip. |
| [Alert](alert.md) | An inline, static status message. For transient messages, see Notifications. |
| [Avatar](avatar.md) | User and entity representation, plus overlapping groups. |
| [Progress](progress.md) | Spinner, Progress Bar and Skeleton — three independent APIs sharing one source file. |
| [Link](link.md) | Inline and standalone hyperlinks, including external-link presentation. |
| [Kbd](kbd.md) | Keyboard-key badges and key combinations. |
| [Divider](divider.md) | Horizontal and vertical separators, with an optional label. |
| [List](list.md) | `<ul>`/`<ol>` styling and its presentation variants. |
| [Empty State](empty-state.md) | The centered placeholder for a list or section with nothing to show. |

### Overlay

| Document | What it covers |
| --- | --- |
| [Modal](modal.md) | A dialog above the page, with backdrop. |
| [Drawer](drawer.md) | A panel sliding in from a viewport edge. |
| [Dropdown](dropdown.md) | A pure-CSS menu opening on hover or keyboard focus. |
| [Tooltip](tooltip.md) | Contextual text shown on hover or focus. |
| [Accordion](accordion.md) | Collapsible content sections. |

### Data display

| Document | What it covers |
| --- | --- |
| [Table](table.md) | Native `<table>` styling, striping, hover and sortable-column indicators. |
| [Tabs](tabs.md) | Panel switching, with underline, pill and vertical variants. |
| [Breadcrumbs](breadcrumbs.md) | A hierarchical trail with automatic separators. |
| [Pagination](pagination.md) | Page links with active, disabled and compact presentation. |
| [Stat](stat.md) | A single metric with label, value, trend and footer slots. |
| [Code Block](code.md) | Inline code, multi-line blocks, and syntax token classes. |

### Page-level patterns

| Document | What it covers |
| --- | --- |
| [Page Header](page-header.md) | Title, eyebrow, subtitle, meta row and trailing actions. |
| [Navbar & App Shell](app-shell.md) | The `.sp-navbar` navigation component and the `.sp-app-shell` application layout. |

## Modules that need their own import

These two are **not** in `spartacss.css`. Import the module alongside core,
or use `sparta-all.css`, which contains both. Both depend on core's tokens
— see each document for the specifics.

| Document | What it covers | Import |
| --- | --- | --- |
| [Icons](icons.md) | The `.sp-icon` system: named classes rendered through a mask-based `::before`, inheriting `currentColor`. | `@redspartanlabs/spartacss/sparta-icons.css` |
| [Notifications](notifications.md) | Toast, Alert Banner, and Confirm/Dialog. | `@redspartanlabs/spartacss/sparta-notifications.css` |

## Decisions

Architecture decision records. These explain why SpartaCSS is built the way
it is, and they govern the answers to questions the reference documentation
above does not settle.

| Record | Subject |
| --- | --- |
| [ADR-0001](adr/0001-package-architecture.md) | Package architecture and the phased distribution plan. |
| [ADR-0002](adr/0002-versioning-and-stability-policy.md) | What counts as a breaking change for a pure-CSS design system. Read this before depending on a class name. |
| [ADR-0003](adr/0003-independent-iconography-system.md) | Why the iconography system is SpartaCSS's own. |
| [ADR-0004](adr/0004-git-tag-artifact-distribution.md) | Why release tags carry prebuilt `dist/` artifacts. |

Release history lives in [CHANGELOG.md](../CHANGELOG.md); the procedure for
cutting a release is [RELEASING.md](../RELEASING.md).

## Design standards

Construction specifications rather than consumer documentation. You do not
need these to use SpartaCSS; you do need them to add an icon to it.

| Document | Subject |
| --- | --- |
| [RedSpartan Icon Standard](design/icon-standard.md) | The authoritative construction specification for SpartaCSS's icons. |
| [Icon Provenance & Compliance Inventory](design/icon-provenance-inventory.md) | Per-icon provenance and licensing position. |

## Historical

Kept for the reasoning it records. **Not** a description of how SpartaCSS
works now, and not a current status report — for that, read
[CHANGELOG.md](../CHANGELOG.md) and the decisions above.

| Document | Subject |
| --- | --- |
| [v1 Source Extraction Plan](extraction-plan.md) | The original extraction of SpartaCSS out of its host application. Predates `package.json`, the build pipeline and the modular `src/` tree, and says so at the top. |
