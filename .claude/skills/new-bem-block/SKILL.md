---
name: new-bem-block
description: Scaffold a new STYORA BEM component (Sass partial, optional JS module, main.scss import) following the project's BEM + Sass architecture. Use when adding any new UI block (card, viewer, badge, etc.) to the STYORA project.
---

# New BEM block

Scaffold one new component block for the STYORA project (see root `CLAUDE.md` and
`.docs/storya-project-1.md` §5–6 for the full architecture and BEM rules).

## Steps

1. **Name the block** in kebab-case (e.g. `product-card`, `viewer-360`, `stat-counter`).
   One block = one file, one responsibility. If what's being asked for is really a
   variant of an existing block, add a `--modifier` instead of a new block.

2. **Create the Sass partial** at `src/styles/components/_<block>.scss`:
   - Top-level selector is the block: `.block { }`.
   - Elements as `&__element`, modifiers as `&--modifier`. Never nest deeper than one
     level from the block (no `.block__element__sub`).
   - Pull every color/spacing/radius/motion value from the tokens in
     `abstracts/_variables.scss` — never hardcode a hex or raw px/ms value that a token
     already covers. If a needed token doesn't exist yet, add it to `_variables.scss`
     first rather than inlining a magic value.
   - If the block has any transform/animation, it MUST end with a
     `@media (prefers-reduced-motion: reduce)` block that neutralizes it (see the
     `.product-card` example in spec §6 for the pattern: `transform: none; transition:
     none;` or removing the animation).
   - Use the project's easing token (`--ease-out-expo`) and 200–600ms durations for
     any transition.

3. **Register the import** — add a `@use`/`@forward` line for the new partial in
   `src/styles/main.scss` in the `components/` group, keeping the existing
   alphabetical/logical grouping.

4. **If the block is interactive** (needs pointer/keyboard/scroll behavior), add a
   matching ES6 module at `src/js/modules/<block>.js`:
   - Import shared helpers from `src/js/utils/` (`qs`/`qsa`, `rafThrottle`, `debounce`)
     instead of re-implementing them.
   - Export an `init` function; wire it up from `src/js/main.js`. Don't auto-run on
     import — keep modules side-effect-free until explicitly initialized.
   - Any pointer-move-driven effect (tilt, magnetic buttons) must go through
     `rafThrottle` — don't run transform math on every raw `pointermove` event.
   - Gate any JS-driven animation behind `window.matchMedia('(prefers-reduced-motion:
     reduce)').matches` the same way the CSS is gated.

5. **Verify BEM compliance** before finishing: no IDs used for styling, no bare element
   selectors (`div`, `img`) inside the component partial, class names match
   `block`, `block__element`, `block--modifier`, `block__element--modifier` exactly.
