/**
 * Testimonials Carousel (3D Layered)
 * 
 * Features:
 * - 3D perspective transforms with depth layering
 * - Card stacking effect (prev/next visible in background)
 * - Smooth rotateY transitions
 * - Keyboard support (arrow keys)
 * - Auto-play with pause on hover
 * - Touch/swipe support
 * - Respects prefers-reduced-motion
 */

import { qs, qsa } from '../utils/dom.js';

class TestimonialsCarousel {
  constructor(element) {
    this.carousel = element;
    this.track = qs('.testimonials__track', this.carousel);
    this.items = qsa('.testimonials__item', this.carousel);
    this.prevBtn = qs('.testimonials__nav--prev', this.carousel);
    this.nextBtn = qs('.testimonials__nav--next', this.carousel);
    this.dots = qsa('.testimonials__dot', this.carousel);
    
    this.currentIndex = 0;
    this.totalItems = this.items.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds
    
    // Touch/swipe
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    this.init();
  }
  
  init() {
    if (!this.track || this.totalItems === 0) return;
    
    // Set track height based on tallest item
    this.setTrackHeight();
    
    // Button events
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    
    // Dot indicators
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Keyboard navigation
    this.carousel.addEventListener('keydown', (e) => this.handleKeydown(e));
    
    // Touch/swipe
    this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    
    // Auto-play (if motion is allowed)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.startAutoPlay();
      
      // Pause on hover
      this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
      this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    // Initial state
    this.updateCarousel();
  }
  
  setTrackHeight() {
    // Find tallest item and set track height
    let maxHeight = 0;
    this.items.forEach(item => {
      const height = item.offsetHeight;
      if (height > maxHeight) maxHeight = height;
    });
    this.track.style.height = `${maxHeight + 100}px`; // +100 for 3D depth
    this.track.style.position = 'relative';
  }
  
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    this.updateCarousel();
    this.resetAutoPlay();
  }
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalItems;
    this.updateCarousel();
    this.resetAutoPlay();
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
    this.resetAutoPlay();
  }
  
  updateCarousel() {
    const prevIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    const nextIndex = (this.currentIndex + 1) % this.totalItems;
    
    // Update all items with 3D classes
    this.items.forEach((item, index) => {
      // Remove all state classes
      item.classList.remove('is-active', 'is-prev', 'is-next', 'is-exit-left', 'is-exit-right');
      
      if (index === this.currentIndex) {
        // Active slide (center, front)
        item.classList.add('is-active');
      } else if (index === prevIndex) {
        // Previous slide (left, background)
        item.classList.add('is-prev');
      } else if (index === nextIndex) {
        // Next slide (right, background)
        item.classList.add('is-next');
      } else {
        // Other slides (hidden far back)
        const diff = index - this.currentIndex;
        if (diff < 0 || (diff > this.totalItems / 2)) {
          item.classList.add('is-exit-left');
        } else {
          item.classList.add('is-exit-right');
        }
      }
    });
    
    // Update dots
    this.dots.forEach((dot, index) => {
      const isActive = index === this.currentIndex;
      dot.setAttribute('aria-selected', isActive);
    });
  }
  
  handleKeydown(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.next();
    }
  }
  
  handleTouchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
  }
  
  handleTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  }
  
  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left -> next
        this.next();
      } else {
        // Swiped right -> prev
        this.prev();
      }
    }
  }
  
  startAutoPlay() {
    if (this.autoPlayInterval) return;
    
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, this.autoPlayDelay);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  resetAutoPlay() {
    this.stopAutoPlay();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.startAutoPlay();
    }
  }
}

/**
 * Initialize testimonials carousel
 */
export function initTestimonials() {
  const carousel = qs('[data-testimonials-carousel]');
  
  if (carousel) {
    new TestimonialsCarousel(carousel);
  }
}
