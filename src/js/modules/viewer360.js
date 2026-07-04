/**
 * Viewer360.js — 360° product viewer
 * Allows users to rotate product view by dragging or using arrow keys
 */

import { qs, qsa } from '../utils/dom.js';

class Viewer360 {
  constructor(container, config = {}) {
    this.container = container;
    this.config = {
      frameCount: config.frameCount || 36, // Number of frames in sequence
      imagePath: config.imagePath || '', // Base path for images
      autoRotate: config.autoRotate || false,
      autoRotateSpeed: config.autoRotateSpeed || 50,
      ...config
    };
    
    this.canvas = qs('.viewer-360__canvas', container);
    this.image = qs('.viewer-360__canvas img', container);
    this.loading = qs('.viewer-360__loading', container);
    this.indicator = qs('.viewer-360__indicator', container);
    this.hint = qs('.viewer-360__hint', container);
    this.prevBtn = qs('[data-action="prev"]', container);
    this.nextBtn = qs('[data-action="next"]', container);
    this.playBtn = qs('[data-action="play"]', container);
    
    this.frames = [];
    this.currentFrame = 0;
    this.isDragging = false;
    this.startX = 0;
    this.isLoaded = false;
    this.autoRotateInterval = null;
    
    this.init();
  }
  
  async init() {
    // For demo purposes, we'll simulate frame loading
    // In production, you'd load actual frame images
    this.frames = Array.from({ length: this.config.frameCount }, (_, i) => {
      return `${this.config.imagePath}/frame-${String(i + 1).padStart(3, '0')}.jpg`;
    });
    
    // Set up event listeners
    this.setupEvents();
    
    // Simulate loading
    await this.simulateLoading();
    
    // Update display
    this.updateFrame();
    
    console.log('360° Viewer initialized');
  }
  
  setupEvents() {
    // Mouse/touch drag
    this.canvas.addEventListener('mousedown', this.handleDragStart.bind(this));
    this.canvas.addEventListener('mousemove', this.handleDragMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleDragEnd.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleDragEnd.bind(this));
    
    // Touch events
    this.canvas.addEventListener('touchstart', this.handleDragStart.bind(this));
    this.canvas.addEventListener('touchmove', this.handleDragMove.bind(this));
    this.canvas.addEventListener('touchend', this.handleDragEnd.bind(this));
    
    // Keyboard controls
    this.container.addEventListener('keydown', this.handleKeydown.bind(this));
    
    // Button controls
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.rotate(-1));
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.rotate(1));
    }
    
    if (this.playBtn) {
      this.playBtn.addEventListener('click', this.toggleAutoRotate.bind(this));
    }
  }
  
  async simulateLoading() {
    // Simulate image preloading
    return new Promise(resolve => {
      setTimeout(() => {
        this.isLoaded = true;
        if (this.loading) {
          this.loading.classList.add('is-hidden');
        }
        resolve();
      }, 1000);
    });
  }
  
  handleDragStart(event) {
    this.isDragging = true;
    this.startX = this.getClientX(event);
    this.canvas.classList.add('is-dragging');
    
    // Hide hint after first interaction
    if (this.hint) {
      this.hint.classList.add('is-hidden');
    }
    
    // Stop auto-rotate on interaction
    this.stopAutoRotate();
  }
  
  handleDragMove(event) {
    if (!this.isDragging) return;
    
    event.preventDefault();
    
    const currentX = this.getClientX(event);
    const deltaX = currentX - this.startX;
    
    // Determine rotation direction and amount
    // Sensitivity: pixels per frame
    const sensitivity = 10;
    const frameDelta = Math.floor(deltaX / sensitivity);
    
    if (frameDelta !== 0) {
      this.rotate(frameDelta);
      this.startX = currentX;
    }
  }
  
  handleDragEnd() {
    this.isDragging = false;
    this.canvas.classList.remove('is-dragging');
  }
  
  handleKeydown(event) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'Left':
        event.preventDefault();
        this.rotate(-1);
        break;
        
      case 'ArrowRight':
      case 'Right':
        event.preventDefault();
        this.rotate(1);
        break;
    }
  }
  
  rotate(delta) {
    this.currentFrame = (this.currentFrame + delta + this.config.frameCount) % this.config.frameCount;
    this.updateFrame();
  }
  
  updateFrame() {
    // In production, update the image src
    // this.image.src = this.frames[this.currentFrame];
    
    // Update indicator
    if (this.indicator) {
      this.indicator.textContent = `${this.currentFrame + 1} / ${this.config.frameCount}`;
    }
  }
  
  goToFrame(frameIndex) {
    this.currentFrame = Math.max(0, Math.min(frameIndex, this.config.frameCount - 1));
    this.updateFrame();
  }
  
  toggleAutoRotate() {
    if (this.autoRotateInterval) {
      this.stopAutoRotate();
    } else {
      this.startAutoRotate();
    }
  }
  
  startAutoRotate() {
    this.autoRotateInterval = setInterval(() => {
      this.rotate(1);
    }, this.config.autoRotateSpeed);
    
    if (this.playBtn) {
      this.playBtn.setAttribute('aria-label', 'Pause rotation');
      // Update icon if needed
    }
  }
  
  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
      
      if (this.playBtn) {
        this.playBtn.setAttribute('aria-label', 'Play rotation');
      }
    }
  }
  
  getClientX(event) {
    return event.type.includes('touch')
      ? event.touches[0].clientX
      : event.clientX;
  }
  
  destroy() {
    this.stopAutoRotate();
    // Remove event listeners
    // (omitted for brevity, but should be implemented)
  }
}

// Initialize 360 viewer
export function initViewer360(selector = '.viewer-360', config = {}) {
  const container = typeof selector === 'string' ? qs(selector) : selector;
  
  if (!container) {
    console.warn('360 viewer container not found');
    return null;
  }
  
  return new Viewer360(container, config);
}

// Export class for manual instantiation
export { Viewer360 };
