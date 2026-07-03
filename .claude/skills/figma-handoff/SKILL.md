---
name: figma-handoff
description: Rebuild a Stitch/Figma screen export from .figma/screens/*/code.html into STYORA's real semantic HTML5 + BEM/Sass source, using the exported markup only as a visual/structural reference. Use when implementing index.html, collection.html, or product.html from the design exports.
---

# Figma/Stitch handoff

Turn one exported screen under `.figma/screens/<screen>/code.html` (with its paired
`screen.png`) into real project code. The export is AI-generated Stitch output — it is
a reference for layout, spacing, and content, not something to copy into `src/`.

## Available screens

`styora_home_updated_{desktop,mobile}`, `styora_collection_updated_{desktop,mobile}`,
`styora_product_updated_{desktop,mobile}` — desktop and mobile exports of the same
screen should be reconciled into one responsive implementation, not two pages.

Product imagery lives in `.figma/products/*` and hero/banner imagery in
`.figma/banners/*` — reuse these assets (optimize/convert per spec §7 item 20) instead
of sourcing new placeholder images.

## Process

1. **Read, don't copy.** Open the desktop and mobile `code.html` for the target screen
   plus `screen.png` to understand structure, hierarchy, and content — but write fresh
   markup. Stitch output is typically div-soup with utility-class-style naming; none of
   its class names or element structure should land in `src/`.

2. **Rebuild as semantic HTML5** in the matching project page (`index.html` /
   `collection.html` / `product.html`): use `<header>`, `<nav>`, `<main>`, `<section>`,
   `<article>`, `<footer>` per the actual content role, not the export's div nesting.

3. **Re-derive every visual value as a token.** Cross-reference colors/type/spacing
   against `.figma/screens/kinetic_performance_system/DESIGN.md` and this project's
   `abstracts/_variables.scss` (spec §4) — if the export uses a color or size that
   isn't already a token, add the token rather than hardcoding the value pulled from
   the export.

4. **Rename every class to BEM** following the [new-bem-block](../new-bem-block/SKILL.md)
   skill — one new `.claude/skills` component partial per distinct block found in the
   export (hero, product-card, marquee, viewer-360, accordion, etc.), reusing existing
   blocks where the export just shows a variant (`--modifier`) of something that
   already exists.

5. **Reconcile desktop + mobile into one responsive block.** Diff the two exports for
   the same screen to find what actually changes (columns, font-size, spacing) versus
   what's identical, and express the difference with the project's breakpoint mixins
   and `clamp()` fluid type — don't build separate mobile/desktop markup trees.

6. **Add the motion layer last**, per spec §4.4 and root `CLAUDE.md` — 3D tilt,
   parallax, scroll reveals, marquee — since the exports are static and won't show it.
   Every motion addition needs its `prefers-reduced-motion` fallback in the same change.

7. **Verify against `screen.png`** visually once built, then hand off to
   [qa-audit](../qa-audit/SKILL.md) before considering the page done.
