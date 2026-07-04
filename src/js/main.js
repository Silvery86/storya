// Main JS entry point
// Import and initialize all modules

import { initStickyHeader } from './modules/stickyHeader.js';
import { initNav } from './modules/nav.js';
import { initTilt } from './modules/tilt.js';
import { initCountUp } from './modules/countUp.js';
import { initNewsletter } from './modules/newsletter.js';
import { initTestimonials } from './modules/testimonials.js';
import { initFilter } from './modules/filter.js';
import { initAccordion } from './modules/accordion.js';
import { initVariantPicker } from './modules/variantPicker.js';
import { initViewer360 } from './modules/viewer360.js';

console.log('STYORA initialized');

// Initialize modules when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  // Layout modules (all pages)
  initStickyHeader();
  initNav();
  
  // Home page modules
  if (document.querySelector('.hero')) {
    // 3D tilt on product cards
    initTilt('[data-tilt]');
    
    // Count-up animation on stats
    initCountUp('[data-count]');
    
    // Newsletter form validation
    initNewsletter('#newsletter-form');
    
    // Testimonials carousel
    initTestimonials();
  }
  
  // Collection page modules
  if (document.querySelector('.collection')) {
    // Product filtering and sorting
    initFilter();
    
    // 3D tilt on product cards
    initTilt('[data-tilt]');
  }
  
  // Product page modules
  if (document.querySelector('.product')) {
    // 360° viewer
    initViewer360('.viewer-360', {
      frameCount: 36,
      imagePath: '/assets/products/vortex-shell'
    });
    
    // Accordion sections
    initAccordion('.accordion', {
      allowMultiple: false
    });
    
    // Variant picker
    const variantPicker = initVariantPicker('.variant-picker');
    
    // Add to cart validation
    const addToCartBtn = document.querySelector('[data-action="add-to-cart"]');
    if (addToCartBtn && variantPicker) {
      addToCartBtn.addEventListener('click', (e) => {
        if (!variantPicker.isValid()) {
          e.preventDefault();
          alert('Please select a color and size');
        }
      });
    }
  }
  
  console.log('All modules loaded');
}

