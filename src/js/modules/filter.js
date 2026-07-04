/**
 * Filter.js — Product filtering and sorting on the collection page
 */

import { qs, qsa } from '../utils/dom.js';

class ProductFilter {
  constructor() {
    this.products = qsa('.product-card');
    this.categoryLinks = qsa('.filters__category-link');
    this.sortRadios = qsa('.filters__sort-radio');
    this.filterToggle = qs('.filter-toggle');
    this.filterSidebar = qs('.collection__sidebar');
    this.filterBackdrop = qs('.filter-backdrop');
    this.filterClose = qs('.filters__close');
    this.resetButton = qs('.filters__reset');

    this.activeCategory = null;
    this.currentSort = 'newest';

    this.init();
  }

  init() {
    this.categoryLinks.forEach((link) => {
      link.addEventListener('click', this.handleCategoryClick.bind(this));
    });

    this.sortRadios.forEach((radio) => {
      radio.addEventListener('change', this.handleSortChange.bind(this));
    });

    if (this.filterToggle) {
      this.filterToggle.addEventListener('click', this.openFilters.bind(this));
    }

    if (this.filterBackdrop) {
      this.filterBackdrop.addEventListener('click', this.closeFilters.bind(this));
    }

    if (this.filterClose) {
      this.filterClose.addEventListener('click', this.closeFilters.bind(this));
    }

    if (this.resetButton) {
      this.resetButton.addEventListener('click', this.handleReset.bind(this));
    }

    this.syncSidebarA11y();
    this.applyURLParams();
    this.applyFilters();

    window.addEventListener('resize', () => this.syncSidebarA11y());
  }

  syncSidebarA11y() {
    if (!this.filterSidebar) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    if (isDesktop) {
      this.filterSidebar.classList.remove('is-open');
      this.filterSidebar.setAttribute('aria-hidden', 'false');
      this.filterBackdrop?.classList.remove('is-visible');
      document.body.style.overflow = '';
    } else if (!this.filterSidebar.classList.contains('is-open')) {
      this.filterSidebar.setAttribute('aria-hidden', 'true');
    }
  }

  applyURLParams() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const sort = params.get('sort');

    if (category) {
      this.setActiveCategory(category);
    }

    if (sort) {
      this.currentSort = sort;
      const radio = Array.from(this.sortRadios).find((r) => r.value === sort);

      if (radio) {
        radio.checked = true;
      }
    } else {
      const checked = Array.from(this.sortRadios).find((r) => r.checked);
      if (checked) {
        this.currentSort = checked.value;
      }
    }
  }

  setActiveCategory(category) {
    this.activeCategory = category;

    this.categoryLinks.forEach((link) => {
      const isActive = link.dataset.category === category;
      link.classList.toggle('is-active', isActive);
      link.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  handleCategoryClick(event) {
    event.preventDefault();

    const link = event.currentTarget;
    const category = link.dataset.category;

    // Toggle off if already active (show all)
    if (this.activeCategory === category) {
      this.activeCategory = null;
      this.categoryLinks.forEach((item) => {
        item.classList.remove('is-active');
        item.setAttribute('aria-current', 'false');
      });
      this.updateURL(null);
    } else {
      this.setActiveCategory(category);
      this.updateURL(category);
    }

    this.applyFilters();

    if (window.matchMedia('(max-width: 1023px)').matches) {
      this.closeFilters();
    }
  }

  updateURL(category) {
    const url = new URL(window.location.href);

    if (category) {
      url.searchParams.set('category', category);
    } else {
      url.searchParams.delete('category');
    }

    window.history.replaceState({}, '', url);
  }

  handleSortChange(event) {
    this.currentSort = event.target.value;
    this.applySort();
  }

  handleReset() {
    this.activeCategory = null;
    this.currentSort = 'newest';

    this.categoryLinks.forEach((link) => {
      link.classList.remove('is-active');
      link.setAttribute('aria-current', 'false');
    });

    this.sortRadios.forEach((radio) => {
      radio.checked = radio.value === 'newest';
    });

    this.updateURL(null);
    this.applyFilters();
  }

  applyFilters() {
    this.products.forEach((product) => {
      const productCategory = product.dataset.category;
      const matches =
        !this.activeCategory || productCategory === this.activeCategory;

      product.classList.toggle('is-hidden', !matches);
    });

    this.applySort();
  }

  applySort() {
    const grid = this.products[0]?.parentElement;
    if (!grid) return;

    const visibleProducts = Array.from(this.products).filter(
      (product) => !product.classList.contains('is-hidden')
    );

    visibleProducts.sort((a, b) => {
      const priceA = parseFloat(a.dataset.price);
      const priceB = parseFloat(b.dataset.price);
      const orderA = parseInt(a.dataset.order || '0', 10);
      const orderB = parseInt(b.dataset.order || '0', 10);

      switch (this.currentSort) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'newest':
        default:
          return orderA - orderB;
      }
    });

    visibleProducts.forEach((product) => {
      grid.appendChild(product);
    });
  }

  openFilters() {
    if (this.filterSidebar) {
      this.filterSidebar.classList.add('is-open');
      this.filterSidebar.setAttribute('aria-hidden', 'false');
    }

    if (this.filterBackdrop) {
      this.filterBackdrop.classList.add('is-visible');
    }

    document.body.style.overflow = 'hidden';

    const firstLink = this.categoryLinks[0];
    if (firstLink) {
      firstLink.focus();
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

    document.body.style.overflow = '';

    if (this.filterToggle) {
      this.filterToggle.focus();
    }
  }
}

export function initFilter() {
  if (!document.querySelector('.collection')) {
    return null;
  }

  return new ProductFilter();
}

export { ProductFilter };
