/**
 * Viewer360.js — 360° product viewer
 * Rotate product view by dragging or using arrow keys
 */

import { qs, qsa } from '../utils/dom.js';

const FRAME_MAP = {
  '01': 0,
  '09': 8,
  '17': 16,
  '25': 24,
};

class Viewer360 {
  constructor(container, config = {}) {
    this.container = container;
    this.config = {
      frameCount: config.frameCount || 36,
      imagePath: config.imagePath || '',
      autoRotate: config.autoRotate || false,
      autoRotateSpeed: config.autoRotateSpeed || 50,
      ...config,
    };

    this.canvas = qs('.viewer360__container', container) || qs('.viewer-360__canvas', container);
    this.image = qs('.viewer360__image', container) || qs('.viewer-360__canvas img', container);
    this.hint = qs('.viewer360__hint', container) || qs('.viewer-360__hint', container);
    this.prevBtn = qs('[data-action="rotate-left"], [data-action="prev"]', container);
    this.nextBtn = qs('[data-action="rotate-right"], [data-action="next"]', container);
    this.thumbnails = qsa('.thumbnail[data-frame]');

    this.currentFrame = 0;
    this.isDragging = false;
    this.startX = 0;
    this.autoRotateInterval = null;

    this.init();
  }

  init() {
    this.setupEvents();
    this.updateFrame();
  }

  setupEvents() {
    if (!this.canvas) return;

    this.canvas.addEventListener('mousedown', this.handleDragStart.bind(this));
    this.canvas.addEventListener('mousemove', this.handleDragMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleDragEnd.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleDragEnd.bind(this));

    this.canvas.addEventListener('touchstart', this.handleDragStart.bind(this), { passive: true });
    this.canvas.addEventListener('touchmove', this.handleDragMove.bind(this), { passive: false });
    this.canvas.addEventListener('touchend', this.handleDragEnd.bind(this));

    this.container.addEventListener('keydown', this.handleKeydown.bind(this));

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.rotate(-1));
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.rotate(1));
    }

    this.thumbnails.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        if (thumb.hasAttribute('data-video')) return;

        const frameKey = thumb.dataset.frame;
        const frameIndex = FRAME_MAP[frameKey] ?? (parseInt(frameKey, 10) - 1);

        this.goToFrame(frameIndex);
        this.setActiveThumbnail(thumb);
      });
    });
  }

  handleDragStart(event) {
    this.isDragging = true;
    this.startX = this.getClientX(event);
    this.canvas.classList.add('is-dragging');
    this.stopAutoRotate();
  }

  handleDragMove(event) {
    if (!this.isDragging) return;

    event.preventDefault();

    const currentX = this.getClientX(event);
    const deltaX = currentX - this.startX;
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
        event.preventDefault();
        this.rotate(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.rotate(1);
        break;
    }
  }

  rotate(delta) {
    this.currentFrame =
      (this.currentFrame + delta + this.config.frameCount) % this.config.frameCount;
    this.updateFrame();
  }

  goToFrame(frameIndex) {
    this.currentFrame = Math.max(0, Math.min(frameIndex, this.config.frameCount - 1));
    this.updateFrame();
  }

  updateFrame() {
    if (!this.image || !this.config.imagePath) return;

    const frameNum = String(this.currentFrame + 1).padStart(2, '0');
    this.image.src = `${this.config.imagePath}/frame-${frameNum}.jpg`;
  }

  setActiveThumbnail(activeThumb) {
    this.thumbnails.forEach((thumb) => {
      const isActive = thumb === activeThumb;
      thumb.classList.toggle('thumbnail--active', isActive);
      thumb.setAttribute('aria-selected', String(isActive));
    });
  }

  stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }

  getClientX(event) {
    return event.type.includes('touch')
      ? event.touches[0].clientX
      : event.clientX;
  }

  destroy() {
    this.stopAutoRotate();
  }
}

export function initViewer360(selector = '.viewer360', config = {}) {
  const container = typeof selector === 'string' ? qs(selector) : selector;

  if (!container) {
    console.warn('360 viewer container not found');
    return null;
  }

  return new Viewer360(container, config);
}

export { Viewer360 };
