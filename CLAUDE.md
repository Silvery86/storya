# STYORA — Project Rules

Static sportswear e-commerce demo: `index.html` (landing), `collection.html` (product
grid + filters), `product.html` (PDP with 360° viewer). Full spec lives in
[.docs/storya-project-1.md](.docs/storya-project-1.md) — read it before planning any
non-trivial change. Design tokens and rationale live in
[.figma/screens/kinetic_performance_system/DESIGN.md](.figma/screens/kinetic_performance_system/DESIGN.md).
Stitch/Figma screen exports (reference only, not production code) are under
`.figma/screens/*/code.html` and product/banner imagery under `.figma/products/`,
`.figma/banners/`.

Current state: pre-scaffold. Only `.docs/`, `.figma/`, and this file exist — no
`package.json` or `src/` yet. The first task in this repo will be the Vite scaffold
described in the plan (§8, Day 1).

## Hard constraints (do not violate)

- **Zero frameworks, zero JS libraries, zero jQuery** in the core build. No React/Vue,
  no GSAP/jQuery/lodash. Three.js/Spline are stretch-only and must stay out of the core
  bundle if ever added. This is the entire point of the portfolio piece — reach for
  vanilla ES6+ before suggesting a dependency.
- **CSS 3D and motion only** via native CSS (`perspective`, `transform-style:
  preserve-3d`, `rotate3d`, `animation-timeline: view()/scroll()`) with an
  IntersectionObserver JS fallback where scroll-driven animation isn't supported.
- **Every animation/transform must have a `prefers-reduced-motion: reduce` fallback**
  that disables it. This is non-negotiable per the DoD checklist — never ship a new
  transform/animation without the reduced-motion counterpart in the same change.
- Animate only `transform`/`opacity`. Never animate layout-triggering properties
  (`width`, `top`, `margin`, etc.) — this is a stated 60fps/Lighthouse requirement.

## Architecture

- **CSS**: Sass (SCSS syntax), one entry point `src/styles/main.scss` that forwards
  everything. Full folder layout is in the spec §5 — `abstracts/` (variables, mixins,
  functions), `base/`, `layout/`, `components/` (one partial per BEM block), `pages/`.
- **JS**: ES6 modules, no bundler magic beyond Vite. `src/js/main.js` imports and inits
  `src/js/modules/*`. Shared helpers (`qs`/`qsa`, rafThrottle, debounce) live in
  `src/js/utils/`.
- **BEM**: strict `.block`, `.block__element`, `.block--modifier` naming — see the
  [new-bem-block](.claude/skills/new-bem-block/SKILL.md) skill and spec §6. One block =
  one Sass partial. No nesting past the block. No styling by ID or bare element
  selector inside a component; utilities (e.g. `.visually-hidden`) live in
  `_global.scss` only.
- **Design tokens**: all colors/type/space/motion values are CSS custom properties in
  `abstracts/_variables.scss`, sourced from spec §4 and `DESIGN.md`. Never hardcode a
  hex/px value in a component partial when a token exists.

## Content & data

- Product data is static, local JSON (`products.json`) — no backend, no fetch to
  external APIs.
- All images need real `alt` text; decorative images get `alt=""`.
- Every page needs a unique `<title>`/meta description, Open Graph tags, and (PDP only)
  JSON-LD `Product` schema in `<head>`.

## Git workflow

- `main` is production. Work in `feat/*` / `fix/*` branches, even solo — open and merge
  PRs rather than committing straight to `main`.
- Conventional commits: `feat: add 3d tilt card module`, `fix: safari transform-style
  flatten`, `style: refactor hero to bem`, `docs: add readme lighthouse scores`.

## Definition of Done

Before calling any page/feature complete, run through
[qa-audit](.claude/skills/qa-audit/SKILL.md) — it encodes the full checklist from spec
§9 (W3C validation, Lighthouse ≥95 SEO/a11y and ≥90 performance, keyboard-only pass
including the 360° viewer, no horizontal scroll at 320px, reduced-motion coverage, BEM
compliance, zero external JS libs).

## Bringing in Figma/Stitch screens

Reference exports in `.figma/screens/*/code.html` are AI-generated Stitch markup —
never copy them into `src/` verbatim. Use the
[figma-handoff](.claude/skills/figma-handoff/SKILL.md) skill to rebuild them as
semantic HTML5 + this project's BEM/Sass so the shipped code is genuinely hand-authored.
