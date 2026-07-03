---
name: qa-audit
description: Run the STYORA Definition-of-Done checklist against the current build (HTML validity, SEO/meta, accessibility, reduced-motion coverage, BEM compliance, zero external JS libs, responsive/no-horizontal-scroll). Use before considering any STYORA page or feature complete, or when the user asks for a QA/Lighthouse/accessibility pass.
---

# QA audit

Audit the current state of the STYORA project against the Definition-of-Done in
`.docs/storya-project-1.md` §9. Report a pass/fail checklist — don't silently fix
things unless asked; surface what's missing so the user can decide priority.

## Checks to run

1. **HTML validity** — for each `.html` page, check for: `<!doctype html>`, `lang`
   attribute on `<html>`, one `<title>` and `<meta name="description">` per page (must
   be unique per page, not copy-pasted), Open Graph tags, a skip-to-content link as the
   first focusable element. PDP (`product.html`) additionally needs a JSON-LD
   `Product` `<script type="application/ld+json">` block in `<head>` — validate its
   JSON parses and has the required schema.org `Product` fields (name, image, offers).
   If `npx html-validate` or similar is available, prefer running the real validator
   over a manual read.

2. **Accessibility**:
   - Every `<img>` has `alt`; purely decorative images use `alt=""`.
   - Every interactive control (nav, filter, accordion, 360° viewer, variant picker) is
     reachable and operable by keyboard alone — check for visible focus states, correct
     `tabindex` usage (no positive tabindex), and ARIA only where semantic HTML can't
     express the state (e.g. `aria-expanded` on accordion triggers).
   - The 360° viewer specifically needs arrow-key spin support, not just drag.

3. **Reduced motion** — grep the Sass/CSS for every rule that sets `transform`,
   `animation`, or `animation-timeline` outside of `@media (prefers-reduced-motion:
   reduce)`, and confirm each one has a corresponding reduced-motion override that
   disables it. Flag any transform/animation block that has no matching override.

4. **Animation performance** — grep for animations/transitions on properties other
   than `transform`/`opacity` (e.g. `width`, `top`, `left`, `margin`, `height` in a
   `transition`/`@keyframes` block) — these cause layout thrash and should be flagged.

5. **BEM compliance** — scan `src/styles/components/*.scss` for: selectors nesting
   deeper than one level from the block, bare element selectors or ID selectors inside
   a component partial, and class names that don't match
   `block(__element)?(--modifier)?`.

6. **Zero external JS libraries** — check `package.json` dependencies and `src/js/`
   imports for anything beyond Vite/Sass devDependencies and this project's own
   modules/utils. Flag jQuery, lodash, GSAP, or any UI framework as a violation of the
   core-build constraint (Three.js/Spline are only acceptable if explicitly scoped as
   the stretch goal and documented as such in the README).

7. **Responsive** — confirm there's no horizontal scroll at 320px width (check for
   unconstrained fixed widths, missing `max-width: 100%` on images/media, or elements
   escaping the container grid).

8. **Lighthouse** (if a dev/build server is available) — run
   `npx lighthouse <url> --only-categories=performance,accessibility,seo --preset=desktop`
   (and a mobile pass) and report the four scores against the targets: SEO ≥95,
   Accessibility ≥95, Performance ≥90.

## Output

Present results as a checklist mirroring spec §9, each item marked done / failing /
not-yet-applicable, with the specific file:line for any failure so it's directly
actionable.
