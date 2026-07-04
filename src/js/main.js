// Main JS entry point
// Import and initialize all modules

import { initStickyHeader } from './modules/stickyHeader.js';
import { initNav } from './modules/nav.js';
import { initTilt } from './modules/tilt.js';
import { initCountUp } from './modules/countUp.js';
import { initNewsletter } from './modules/newsletter.js';

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
  }
  
  console.log('All modules loaded');
}

