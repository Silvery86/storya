// Main JS entry point
// Import and initialize all modules

import { initStickyHeader } from './modules/stickyHeader.js';
import { initNav } from './modules/nav.js';

console.log('STYORA initialized');

// Initialize modules when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  // Initialize header
  initStickyHeader();
  
  // Initialize navigation
  initNav();
  
  console.log('All modules loaded');
}

