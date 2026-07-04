# STYORA — Premium Performance Sportswear

**Portfolio-quality e-commerce demo** showcasing modern web development with semantic HTML5, Sass + BEM methodology, and vanilla ES6+ JavaScript. **Zero frameworks, zero external libraries.**

🔗 **[Live Demo](https://styora.netlify.app)** | 📄 **[Project Plan](.docs/storya-project-1.md)**

---

## 🎯 Project Goals

- Demonstrate **professional-grade code architecture** without frameworks
- Showcase **3D motion effects** with pure CSS and vanilla JS
- Prove **performance is possible** without React/Vue bloat (< 13 kB gzipped)
- Implement **accessibility best practices** (WCAG AA, keyboard-only navigation)
- Build **pixel-perfect responsive** layouts (320px → 1440px+)

---

## ✨ Key Features

### **Pages**
- **Landing Page** — 3D parallax hero, kinetic marquee, stats with count-up, newsletter
- **Collection Page** — Multi-select filtering, price sorting, 15 products with 3D tilt
- **Product Page** — 360° viewer, variant picker, accordion details, sticky mobile bar

### **Components (BEM)**
- Button (primary/secondary/ghost variants)
- Product Card (3D tilt on hover)
- Navigation (mobile hamburger, focus management)
- Filters (category chips, sort dropdown)
- Accordion (ARIA-compliant, keyboard nav)
- Variant Picker (color swatches, size chips)
- 360° Viewer (drag/keyboard controls)

### **JavaScript Modules (Vanilla ES6)**
- `tilt.js` — Pointer-based 3D card rotation
- `countUp.js` — Animated stat counters with IntersectionObserver
- `newsletter.js` — Form validation with Constraint Validation API
- `filter.js` — Product filtering and sorting
- `accordion.js` — Expand/collapse with ARIA states
- `variantPicker.js` — Color/size selection
- `viewer360.js` — 360° frame rotation

### **Design System (STYORA Kinetic)**
- **Colors:** Volt (#ccff00) accent, near-black (#0a0a0b) bg
- **Typography:** Anton display, Archivo body
- **Spacing:** 4px → 128px scale
- **Motion:** Expo easings, `prefers-reduced-motion` support

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
styora_html/
├── index.html              # Landing page
├── collection.html         # Product grid with filters
├── product.html           # Product detail page
├── src/
│   ├── styles/
│   │   ├── main.scss              # Entry point
│   │   ├── abstracts/             # Variables, mixins, functions
│   │   ├── base/                  # Reset, typography, global
│   │   ├── layout/                # Header, footer, container
│   │   ├── components/            # BEM components (one file per block)
│   │   └── pages/                 # Page-specific styles
│   └── js/
│       ├── main.js                # Entry point
│       ├── modules/               # Feature modules
│       └── utils/                 # DOM helpers, throttle, etc.
├── .docs/                 # Project plan & specs
└── vite.config.js         # Multi-page build config
```

---

## 🎨 Architecture Decisions

### **Why BEM?**
- Enforces consistent naming (block__element--modifier)
- One Sass partial = one component
- No nesting past the block level
- Predictable specificity (no !important needed)

### **Why Vanilla JS?**
- Prove performance is possible without React/Vue
- Modern ES6 modules work great with Vite
- Total bundle: ~12 kB gzipped (vs 40+ kB for frameworks)
- Direct DOM access is fast when done right

### **Why Sass?**
- @forward for module system (better than @import)
- CSS custom properties for design tokens
- Mixins for reduced-motion and utilities
- BEM nesting is cleaner with &__element syntax

---

## 📊 Performance Metrics

```
CSS:  38.04 kB → 6.80 kB gzipped (82% reduction)
JS:   19.80 kB → 5.66 kB gzipped (71% reduction)
HTML: 88.12 kB → 15.08 kB gzipped (83% reduction)

Total: ~27 kB gzipped (all 3 pages + assets)
```

**Lighthouse Scores (Target):**
- Performance: ≥90
- Accessibility: ≥95
- SEO: ≥95
- Best Practices: 100

---

## ♿ Accessibility Features

- ✅ Keyboard-only navigation (Tab, Escape, Arrow keys)
- ✅ Skip-to-content link
- ✅ ARIA roles and labels on all interactive components
- ✅ Focus management in mobile menu and modals
- ✅ `prefers-reduced-motion` support for all animations
- ✅ Semantic HTML5 landmarks (header, nav, main, footer)
- ✅ Color contrast WCAG AA compliant
- ✅ Touch targets ≥44px
- ✅ Alt text on all images

---

## 🧪 Browser Support

- **Modern browsers:** Chrome, Firefox, Safari, Edge (last 2 versions)
- **Fallbacks:** No `backdrop-filter` → solid background, No CSS Grid → flexbox
- **Tested on:** Desktop (1440px) + Mobile (375px, 320px)

---

## 🛠️ Tech Stack

- **Build Tool:** Vite 6.0
- **CSS Preprocessor:** Sass 1.83 (SCSS syntax)
- **JavaScript:** ES6 modules (no transpilation needed)
- **Runtime Dependencies:** **Zero** ✅

---

## 📚 Documentation

- **Project Plan:** [.docs/storya-project-1.md](.docs/storya-project-1.md)
- **Progress Tracking:** [PROGRESS.md](PROGRESS.md)
- **Design System:** [.figma/screens/kinetic_performance_system/DESIGN.md](.figma/screens/kinetic_performance_system/DESIGN.md)

---

## 🎯 Definition of Done (QA Checklist)

- [x] W3C HTML validation passes on all pages
- [x] Lighthouse ≥90 performance, ≥95 accessibility/SEO
- [x] Keyboard-only navigation works (including 360° viewer)
- [x] Screen reader tested (ARIA labels verified)
- [x] No horizontal scroll at 320px width
- [x] All animations have `prefers-reduced-motion` fallback
- [x] BEM naming consistently applied
- [x] Zero external JS libraries
- [x] Touch targets ≥44px
- [x] Color contrast WCAG AA

---

## 📝 License

MIT License — Free to use for learning and portfolio purposes.

---

## 🙏 Acknowledgments

- Design system inspired by modern athletic wear brands
- 360° viewer concept from product photography best practices
- Accessibility guidelines from WCAG 2.1 AA standards

---

**Built with ❤️ using vanilla web technologies**
