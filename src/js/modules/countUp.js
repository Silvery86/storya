/**
 * CountUp.js — Animated number counter
 * Counts up numbers when they scroll into view
 */

import { qsa } from '../utils/dom.js';

class CountUp {
  constructor(element, config = {}) {
    this.element = element;
    this.target = parseFloat(element.dataset.count) || 0;
    this.duration = config.duration || 2000;
    this.suffix = element.dataset.countSuffix || '';
    this.prefix = element.dataset.countPrefix || '';
    
    this.current = 0;
    this.increment = this.target / (this.duration / 16); // 60fps
    this.hasAnimated = false;
    
    this.observer = null;
    
    this.init();
  }
  
  init() {
    // Start at 0
    this.updateDisplay(0);
    
    // Create intersection observer
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '0px'
      }
    );
    
    this.observer.observe(this.element);
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.hasAnimated) {
        this.hasAnimated = true;
        this.element.classList.add('is-visible');
        this.animate();
        this.observer.unobserve(this.element); // Only animate once
      }
    });
  }
  
  animate() {
    const startTime = performance.now();
    
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      this.current = this.target * easeProgress;
      this.updateDisplay(this.current);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure we end at exact target
        this.updateDisplay(this.target);
      }
    };
    
    requestAnimationFrame(step);
  }
  
  updateDisplay(value) {
    // Format number (whole numbers or 1 decimal place)
    const formatted = Number.isInteger(this.target)
      ? Math.round(value).toLocaleString()
      : value.toFixed(1);
    
    this.element.textContent = `${this.prefix}${formatted}${this.suffix}`;
  }
  
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize count-up on all elements with [data-count] attribute
export function initCountUp(selector = '[data-count]') {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Just show final values without animation
    const elements = qsa(selector);
    elements.forEach(element => {
      const value = parseFloat(element.dataset.count) || 0;
      const suffix = element.dataset.countSuffix || '';
      const prefix = element.dataset.countPrefix || '';
      const formatted = Number.isInteger(value)
        ? value.toLocaleString()
        : value.toFixed(1);
      element.textContent = `${prefix}${formatted}${suffix}`;
      element.classList.add('is-visible');
    });
    console.log('CountUp disabled: prefers-reduced-motion is enabled');
    return [];
  }
  
  const elements = qsa(selector);
  const instances = [];
  
  elements.forEach(element => {
    instances.push(new CountUp(element));
  });
  
  console.log(`CountUp initialized on ${instances.length} element(s)`);
  return instances;
}

// Export class for manual instantiation
export { CountUp };
