// Sticky Header Module
// Adds/removes sticky class based on scroll position

import { qs, rafThrottle } from '../utils/dom.js';

export function initStickyHeader() {
  const header = qs('.header');
  if (!header) return;
  
  const SCROLL_THRESHOLD = 50; // pixels
  
  const handleScroll = rafThrottle(() => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    header.classList.toggle('header--scrolled', scrolled);
  });
  
  // Initial check
  handleScroll();
  
  // Listen to scroll
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Cleanup function (optional)
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}
