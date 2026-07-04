/**
 * VariantPicker.js — Color and size selection
 */

import { qs, qsa } from '../utils/dom.js';

const COLOR_LABELS = {
  'black-volt': 'Black/Volt',
  slate: 'Slate',
  'electric-blue': 'Electric Blue',
};

class VariantPicker {
  constructor(container) {
    this.container = container;

    this.colorInputs = qsa('input[name="color"]', container);
    this.sizeInputs = qsa('input[name="size"]', container);
    this.colorValue = qs('[data-variant="color"] .variant-picker__value', container);

    this.selectedColor = null;
    this.selectedSize = null;

    this.init();
  }

  init() {
    this.colorInputs.forEach((input) => {
      input.addEventListener('change', this.handleColorChange.bind(this));

      if (input.checked) {
        this.selectedColor = input.value;
        this.updateColorLabel();
      }
    });

    this.sizeInputs.forEach((input) => {
      input.addEventListener('change', this.handleSizeChange.bind(this));

      if (input.checked) {
        this.selectedSize = input.value;
      }
    });
  }

  handleColorChange(event) {
    this.selectedColor = event.target.value;
    this.updateColorLabel();
    this.dispatchChange();
  }

  handleSizeChange(event) {
    this.selectedSize = event.target.value;
    this.dispatchChange();
  }

  updateColorLabel() {
    if (!this.colorValue || !this.selectedColor) return;

    this.colorValue.textContent =
      COLOR_LABELS[this.selectedColor] ||
      this.selectedColor
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('/');
  }

  dispatchChange() {
    this.container.dispatchEvent(
      new CustomEvent('variantChange', {
        detail: {
          color: this.selectedColor,
          size: this.selectedSize,
        },
      })
    );
  }

  getSelectedVariant() {
    return {
      color: this.selectedColor,
      size: this.selectedSize,
      isComplete: !!(this.selectedColor && this.selectedSize),
    };
  }

  isValid() {
    return !!(this.selectedColor && this.selectedSize);
  }
}

export function initVariantPicker(selector = '.product__variants') {
  const container = typeof selector === 'string' ? qs(selector) : selector;

  if (!container) {
    console.warn('Variant picker container not found');
    return null;
  }

  return new VariantPicker(container);
}

export { VariantPicker };
