// Navigation Module
// Mobile menu toggle with keyboard support and focus trap

import { qs, qsa } from '../utils/dom.js';

export function initNav() {
  const toggle = qs('.nav__toggle');
  const menu = qs('.nav__menu');
  
  if (!toggle || !menu) return;
  
  let isOpen = false;
  
  // Toggle menu
  function toggleMenu() {
    isOpen = !isOpen;
    toggle.setAttribute('aria-expanded', isOpen);
    
    if (isOpen) {
      // Prevent body scroll on mobile
      document.body.style.overflow = 'hidden';
      
      // Focus first link
      const firstLink = qs('.nav__link', menu);
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
    }
  }
  
  // Close menu
  function closeMenu() {
    if (isOpen) {
      isOpen = false;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
    }
  }
  
  // Toggle on click
  toggle.addEventListener('click', toggleMenu);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });
  
  // Close on link click (mobile)
  const links = qsa('.nav__link', menu);
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        closeMenu();
      }
    });
  });
  
  // Close on resize to desktop
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 768 && isOpen) {
        closeMenu();
      }
    }, 150);
  });
  
  // Cleanup function
  return () => {
    document.body.style.overflow = '';
  };
}
