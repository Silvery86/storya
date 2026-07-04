/**
 * VariantPicker.js — Color and size selection
 * Handles variant selection and updates product details
 */

import { qs, qsa } from '../utils/dom.js';

class VariantPicker {
  constructor(container) {
    this.container = container;
    
    this.colorInputs = qsa('input[name="color"]', container);
    this.sizeInputs = qsa('input[name="size"]', container);
    this.colorLabel = qs('.variant-picker__label .selected', container.querySelector('[data-variant="color"]'));
    this.sizeLabel = qs('.variant-picker__label .selected', container.querySelector('[data-variant="size"]'));
    
    this.selectedColor = null;
    this.selectedSize = null;
    
    this.init();
  }
  
  init() {
    // Color selection
    this.colorInputs.forEach(input => {
      input.addEventListener('change', this.handleColorChange.bind(this));
      
      // Set initial selection
      if (input.checked) {
        this.selectedColor = input.value;
        this.updateColorLabel();
      }
    });
    
    // Size selection
    this.sizeInputs.forEach(input => {
      input.addEventListener('change', this.handleSizeChange.bind(this));
      
      // Set initial selection
      if (input.checked) {
        this.selectedSize = input.value;
        this.updateSizeLabel();
      }
    });
    
    console.log('Variant picker initialized');
  }
  
  handleColorChange(event) {
    this.selectedColor = event.target.value;
    this.updateColorLabel();
    this.updateProduct();
  }
  
  handleSizeChange(event) {
    this.selectedSize = event.target.value;
    this.updateSizeLabel();
    this.updateProduct();
  }
  
  updateColorLabel() {
    if (this.colorLabel && this.selectedColor) {
      this.colorLabel.textContent = this.selectedColor.charAt(0).toUpperCase() + this.selectedColor.slice(1);
    }
  }
  
  updateSizeLabel() {
    if (this.sizeLabel && this.selectedSize) {
      this.sizeLabel.textContent = this.selectedSize.toUpperCase();
    }
  }
  
  updateProduct() {
    // In a real app, this would:
    // 1. Update product images based on color
    // 2. Check stock availability for the variant
    // 3. Update price if variants have different prices
    // 4. Update SKU/product ID
    
    console.log(`Selected variant: ${this.selectedColor} / ${this.selectedSize}`);
    
    // Dispatch custom event for other components to listen to
    const event = new CustomEvent('variantChange', {
      detail: {
        color: this.selectedColor,
        size: this.selectedSize
      }
    });
    
    this.container.dispatchEvent(event);
  }
  
  getSelectedVariant() {
    return {
      color: this.selectedColor,
      size: this.selectedSize,
      isComplete: !!(this.selectedColor && this.selectedSize)
    };
  }
  
  isValid() {
    return this.selectedColor && this.selectedSize;
  }
}

// Initialize variant picker
export function initVariantPicker(selector = '.variant-picker') {
  const container = typeof selector === 'string' ? qs(selector) : selector;
  
  if (!container) {
    console.warn('Variant picker container not found');
    return null;
  }
  
  return new VariantPicker(container);
}

// Export class for manual instantiation
export { VariantPicker };
