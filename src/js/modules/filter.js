/**
 * Filter.js — Product filtering and sorting
 * Handles category filtering and price sorting on collection page
 */

import { qs, qsa } from '../utils/dom.js';

class ProductFilter {
  constructor() {
    this.products = qsa('.product-card');
    this.categoryChips = qsa('.filters__category-chip');
    this.sortSelect = qs('.filters__sort-select');
    this.resultsCount = qs('.collection__count');
    this.filterToggle = qs('.filter-toggle');
    this.filterSidebar = qs('.collection__sidebar');
    this.filterBackdrop = qs('.filter-backdrop');
    this.filterClose = qs('.filters__close');
    this.resetButton = qs('.filters__reset');
    
    this.activeCategories = new Set();
    this.currentSort = 'featured';
    
    this.init();
  }
  
  init() {
    // Category filtering
    this.categoryChips.forEach(chip => {
      chip.addEventListener('click', this.handleCategoryToggle.bind(this));
    });
    
    // Sorting
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', this.handleSortChange.bind(this));
    }
    
    // Mobile filter toggle
    if (this.filterToggle) {
      this.filterToggle.addEventListener('click', this.openFilters.bind(this));
    }
    
    if (this.filterBackdrop) {
      this.filterBackdrop.addEventListener('click', this.closeFilters.bind(this));
    }
    
    if (this.filterClose) {
      this.filterClose.addEventListener('click', this.closeFilters.bind(this));
    }
    
    // Reset button
    if (this.resetButton) {
      this.resetButton.addEventListener('click', this.handleReset.bind(this));
    }
    
    // Check URL parameters for initial filters
    this.applyURLParams();
    
    // Initial count update
    this.updateResultsCount();
    
    console.log('Product filters initialized');
  }
  
  applyURLParams() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    
    if (category) {
      // Find and activate the category chip
      const chip = Array.from(this.categoryChips).find(
        c => c.dataset.category === category
      );
      
      if (chip) {
        this.activeCategories.add(category);
        chip.classList.add('is-active');
        chip.setAttribute('aria-pressed', 'true');
      }
    }
    
    // Apply filters
    this.applyFilters();
  }
  
  handleCategoryToggle(event) {
    const chip = event.currentTarget;
    const category = chip.dataset.category;
    
    // Toggle active state
    if (this.activeCategories.has(category)) {
      this.activeCategories.delete(category);
      chip.classList.remove('is-active');
      chip.setAttribute('aria-pressed', 'false');
    } else {
      this.activeCategories.add(category);
      chip.classList.add('is-active');
      chip.setAttribute('aria-pressed', 'true');
    }
    
    this.applyFilters();
  }
  
  handleSortChange(event) {
    this.currentSort = event.target.value;
    this.applySort();
  }
  
  handleReset() {
    // Clear all filters
    this.activeCategories.clear();
    
    // Reset chips
    this.categoryChips.forEach(chip => {
      chip.classList.remove('is-active');
      chip.setAttribute('aria-pressed', 'false');
    });
    
    // Reset sort
    this.currentSort = 'featured';
    if (this.sortSelect) {
      this.sortSelect.value = 'featured';
    }
    
    // Apply
    this.applyFilters();
  }
  
  applyFilters() {
    let visibleCount = 0;
    
    this.products.forEach(product => {
      const productCategory = product.dataset.category;
      
      // If no filters active, show all
      if (this.activeCategories.size === 0) {
        product.classList.remove('is-hidden');
        visibleCount++;
      } else {
        // Show if product matches any active category
        if (this.activeCategories.has(productCategory)) {
          product.classList.remove('is-hidden');
          visibleCount++;
        } else {
          product.classList.add('is-hidden');
        }
      }
    });
    
    this.updateResultsCount(visibleCount);
    this.applySort();
  }
  
  applySort() {
    // Get visible products
    const visibleProducts = Array.from(this.products).filter(
      p => !p.classList.contains('is-hidden')
    );
    
    // Sort products
    visibleProducts.sort((a, b) => {
      const priceA = parseFloat(a.dataset.price);
      const priceB = parseFloat(b.dataset.price);
      
      switch (this.currentSort) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'featured':
        default:
          // Keep original order (featured)
          return 0;
      }
    });
    
    // Re-append products in new order
    const grid = this.products[0]?.parentElement;
    if (grid) {
      visibleProducts.forEach(product => {
        grid.appendChild(product);
      });
    }
  }
  
  updateResultsCount(count) {
    if (!this.resultsCount) return;
    
    const total = count !== undefined ? count : this.products.length;
    const text = total === 1 ? '1 product' : `${total} products`;
    
    this.resultsCount.textContent = text;
  }
  
  openFilters() {
    if (this.filterSidebar) {
      this.filterSidebar.classList.add('is-open');
      this.filterSidebar.setAttribute('aria-hidden', 'false');
    }
    
    if (this.filterBackdrop) {
      this.filterBackdrop.classList.add('is-visible');
    }
    
    // Prevent body scroll on mobile
    document.body.style.overflow = 'hidden';
    
    // Focus first filter
    const firstChip = this.categoryChips[0];
    if (firstChip) {
      firstChip.focus();
    }
  }
  
  closeFilters() {
    if (this.filterSidebar) {
      this.filterSidebar.classList.remove('is-open');
      this.filterSidebar.setAttribute('aria-hidden', 'true');
    }
    
    if (this.filterBackdrop) {
      this.filterBackdrop.classList.remove('is-visible');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to toggle button
    if (this.filterToggle) {
      this.filterToggle.focus();
    }
  }
}

// Auto-initialize on collection page
export function initFilter() {
  if (!document.querySelector('.collection')) {
    return null;
  }
  
  return new ProductFilter();
}

// Export class for manual instantiation
export { ProductFilter };
