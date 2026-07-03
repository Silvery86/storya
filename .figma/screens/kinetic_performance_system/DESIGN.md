---
name: Kinetic Performance System
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#b5c4ff'
  on-secondary: '#00297a'
  secondary-container: '#0056ea'
  on-secondary-container: '#d8dfff'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b5c4ff'
  on-secondary-fixed: '#00174d'
  on-secondary-fixed-variant: '#003dab'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 96px
    fontWeight: '400'
    lineHeight: 90px
    letterSpacing: -0.04em
  display-lg:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 60px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Anton
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  stats-md:
    fontFamily: Anton
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

The design system is engineered for a high-octane, premium performance sportswear experience. It draws inspiration from cinematic sports marketing and futuristic automotive interfaces, blending **Minimalism** with **High-Contrast Bold** elements. 

The aesthetic is defined by "kinetic tension"—the feeling of motion even in static states. This is achieved through aggressive typography, deep obsidian surfaces, and high-energy "Volt" accents that slice through the dark interface. The UI should evoke a sense of speed, precision, and elite status, positioning the product as a leader in sport-technology.

**Visual Principles:**
- **Cinematic Depth:** Use deep blacks and charcoal layering to make products and data visualizations pop.
- **Aggressive Athletics:** Tight spacing and heavy weights convey strength and urgency.
- **Tech-Forward Precision:** Hairline borders and micro-interactions suggest a highly engineered, data-driven platform.

## Colors

The palette is strictly high-contrast to ensure maximum visibility and energy.

- **Primary (Volt):** Used exclusively for high-priority actions, conversion points, and critical performance data. It represents energy and "go" signals.
- **Secondary (Electric Blue):** Used for technical details, secondary interactions, and subtle branding accents to balance the intensity of the Volt.
- **Base (Onyx/Charcoal):** The background is a near-black obsidian (#0A0A0B). Surfaces use a raised charcoal (#141417) to create distinct physical levels without relying on heavy shadows.
- **Accents:** Use pure white (#FFFFFF) for primary text to ensure maximum readability against the dark backgrounds.

## Typography

The typography strategy relies on the contrast between massive, condensed display faces and technical, legible sans-serifs.

- **Display & Headings:** Use **Anton**. Always uppercase with tight tracking. This font is the "voice" of the brand—loud, fast, and uncompromising.
- **Body & Content:** Use **Inter**. It provides a clean, neutral balance to the aggressive headings, ensuring product descriptions and technical specs are easy to digest.
- **Data & Labels:** Use **JetBrains Mono** for technical data, SKUs, and performance metrics to lean into the "sports-tech" aesthetic.

## Layout & Spacing

This design system utilizes a **Fluid Grid** with generous negative space to emphasize high-quality product imagery and editorial content.

- **Grid:** 12-column desktop grid with 24px gutters. Elements should often span full-width or break the grid for a "kinetic" feel.
- **Rhythm:** Based on a 4px scale. Use large gaps (80px, 120px) between sections to create a premium, uncrowded feel typical of high-end fashion/sport brands.
- **Mobile:** Transition to a 4-column grid with 16px margins. Headings should be scaled down but remain the dominant visual element.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Subtle Glows** rather than traditional drop shadows.

- **Surfaces:** Use `#141417` for cards and containers sitting on the `#0A0A0B` background.
- **Borders:** Use 1px "Hairline" borders (`rgba(255,255,255,0.1)`) to define shapes without adding visual weight.
- **Glows:** Primary interactive elements (like active CTA buttons) should have a soft, low-opacity outer glow using the Primary Volt color (`rgba(204, 255, 0, 0.2)`) with a 20px-40px blur.
- **Floating Cards:** Use subtle 3D transforms (tilt) on hover for product cards to suggest responsiveness and depth.

## Shapes

The shape language is "Streamlined Geometric." 

- **Corners:** A base radius of 16px (`rounded-lg`) is used for all primary cards, buttons, and input fields. This softens the aggressive typography and creates a modern, ergonomic feel.
- **Icons:** Use sharp or slightly rounded linear icons with a consistent 2px stroke weight.
- **Containers:** Large section containers can remain sharp (0px) to maintain a structural, architectural feel, while internal components remain rounded.

## Components

- **Buttons:** 
  - *Primary:* Solid Volt (#CCFF00) with black text. High-contrast. No border. Subtle volt glow on hover.
  - *Secondary:* Transparent with a white hairline border. White text.
- **Product Cards:** Floating charcoal surfaces (#141417). Product imagery should be high-contrast and often "bleed" outside the card container or use 3D layering. Use the 16px corner radius.
- **Inputs:** Dark background (#0A0A0B) with a subtle white hairline border. On focus, the border changes to Primary Volt with a micro-glow.
- **Chips/Labels:** Use JetBrains Mono in all-caps. Rounded-pill shape with a 1px border.
- **Progress Bars/Performance Metrics:** Use thin, 4px tall bars. The "filled" portion should be a gradient from Electric Blue to Volt to indicate high performance.
- **Lists:** Clean, border-bottom separated rows using 1px white (10% opacity). Minimalist and data-focused.