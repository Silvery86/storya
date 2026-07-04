/**
 * Tilt.js — 3D card tilt effect
 * Applies pointer-based 3D rotation to elements
 */

import { qsa, rafThrottle } from '../utils/dom.js';

// Configuration
const TILT_CONFIG = {
  maxTilt: 15, // degrees
  perspective: 1000, // pixels
  scale: 1.05,
  speed: 400, // transition speed in ms
  glare: false, // optional glare effect
  reset: true, // reset on mouse leave
};

class TiltElement {
  constructor(element, config = {}) {
    this.element = element;
    this.config = { ...TILT_CONFIG, ...config };
    
    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;
    
    this.transitionTimeout = null;
    this.updateBind = this.update.bind(this);
    
    this.init();
  }
  
  init() {
    // Set perspective on parent
    this.element.style.transformStyle = 'preserve-3d';
    this.element.style.willChange = 'transform';
    
    // Bind events
    this.element.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.element.addEventListener('mousemove', rafThrottle(this.onMouseMove.bind(this)));
    this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    
    // Update dimensions
    this.updateElementPosition();
  }
  
  updateElementPosition() {
    const rect = this.element.getBoundingClientRect();
    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.left = rect.left;
    this.top = rect.top;
  }
  
  onMouseEnter() {
    this.updateElementPosition();
    
    // Enable transitions
    this.element.style.transition = `transform ${this.config.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
  }
  
  onMouseMove(event) {
    this.update(event);
  }
  
  onMouseLeave() {
    if (this.config.reset) {
      this.element.style.transform = `perspective(${this.config.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  }
  
  update(event) {
    // Calculate mouse position relative to element
    const mouseX = event.clientX - this.left;
    const mouseY = event.clientY - this.top;
    
    // Calculate percentage position (-50 to 50)
    const percentX = (mouseX / this.width) * 100 - 50;
    const percentY = (mouseY / this.height) * 100 - 50;
    
    // Calculate tilt angles
    const tiltY = ((percentX / 50) * this.config.maxTilt).toFixed(2);
    const tiltX = ((percentY / 50) * -this.config.maxTilt).toFixed(2);
    
    // Apply transform
    const transform = `
      perspective(${this.config.perspective}px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale3d(${this.config.scale}, ${this.config.scale}, ${this.config.scale})
    `.replace(/\s+/g, ' ').trim();
    
    this.element.style.transform = transform;
  }
  
  destroy() {
    this.element.removeEventListener('mouseenter', this.onMouseEnter);
    this.element.removeEventListener('mousemove', this.onMouseMove);
    this.element.removeEventListener('mouseleave', this.onMouseLeave);
    
    this.element.style.transform = '';
    this.element.style.transition = '';
    this.element.style.transformStyle = '';
    this.element.style.willChange = '';
  }
}

// Initialize tilt on all elements with [data-tilt] attribute
export function initTilt(selector = '[data-tilt]') {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    console.log('Tilt disabled: prefers-reduced-motion is enabled');
    return [];
  }
  
  const elements = qsa(selector);
  const instances = [];
  
  elements.forEach(element => {
    // Read config from data attributes
    const config = {
      maxTilt: parseFloat(element.dataset.tiltMax) || TILT_CONFIG.maxTilt,
      scale: parseFloat(element.dataset.tiltScale) || TILT_CONFIG.scale,
    };
    
    instances.push(new TiltElement(element, config));
  });
  
  console.log(`Tilt initialized on ${instances.length} element(s)`);
  return instances;
}

// Export class for manual instantiation
export { TiltElement };
