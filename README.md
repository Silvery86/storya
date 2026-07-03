# STYORA — Performance Sportswear Store (Front-End Demo)

> Modern, 3D-animated sportswear e-commerce built with semantic HTML5, Sass, BEM, and vanilla ES6+ — zero frameworks, zero libraries.

🚧 **Work in progress** — implementing the design system and core pages.

## Tech Stack

- **HTML5** — Semantic structure for SEO and accessibility
- **Sass (SCSS)** — Design tokens, BEM methodology, modular architecture
- **Vanilla ES6+ modules** — No jQuery, no external JS libraries
- **CSS 3D transforms** — Native 3D motion with `perspective`, `transform-style: preserve-3d`
- **CSS scroll-driven animations** — Modern parallax with `animation-timeline`
- **Vite** — Fast dev server and optimized multi-page build
- **Netlify** — Deployment with preview

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
styora/
├── src/
│   ├── styles/          # Sass architecture
│   │   ├── abstracts/   # Variables, mixins, functions
│   │   ├── base/        # Reset, typography, global
│   │   ├── layout/      # Header, footer, container
│   │   ├── components/  # BEM blocks (one per file)
│   │   ├── pages/       # Page-specific styles
│   │   └── main.scss    # Main entry point
│   ├── js/
│   │   ├── modules/     # Feature modules
│   │   ├── utils/       # Shared helpers
│   │   └── main.js      # JS entry point
│   └── assets/          # Images, fonts
├── index.html           # Landing page
├── collection.html      # Product grid + filters
└── product.html         # Product detail page (PDP)
```

## Pages

1. **Landing (`index.html`)** — 3D parallax hero, kinetic marquee, featured products
2. **Collection (`collection.html`)** — Filterable product grid with 3D tilt cards
3. **Product (`product.html`)** — 360° product viewer, variant picker, accordion details

## Features

- ✅ Semantic HTML5 with proper document structure
- ✅ SEO optimized (meta tags, Open Graph, JSON-LD schema)
- ✅ Fully responsive (320px–1440px+)
- ✅ Keyboard accessible (all interactions, including 360° viewer)
- ✅ `prefers-reduced-motion` support (disables all 3D/parallax)
- ✅ 60fps animations (transform/opacity only)
- ✅ BEM methodology throughout
- ✅ Zero external JS libraries in core build

## Browser Support

- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile Safari, Chrome Android

## License

This is a portfolio project for educational purposes.
