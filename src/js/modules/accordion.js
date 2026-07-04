/**
 * Accordion.js — Expandable content sections
 * Implements ARIA-compliant accordion with keyboard navigation
 */

import { qs, qsa } from '../utils/dom.js';

class Accordion {
  constructor(element, config = {}) {
    this.element = element;
    this.config = {
      allowMultiple: config.allowMultiple || false,
      animationDuration: config.animationDuration || 300
    };
    
    this.triggers = qsa('.accordion__trigger', this.element);
    
    this.init();
  }
  
  getPanel(trigger) {
    const panelId = trigger.getAttribute('aria-controls');
    if (panelId) {
      const byId = document.getElementById(panelId);
      if (byId) return byId;
    }

    const item = trigger.closest('.accordion__item');
    return item ? qs('.accordion__panel', item) : trigger.nextElementSibling;
  }

  init() {
    this.triggers.forEach((trigger) => {
      const panel = this.getPanel(trigger);
      if (!panel) return;

      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      if (!isExpanded) {
        panel.setAttribute('aria-hidden', 'true');
        panel.hidden = true;
        panel.style.maxHeight = '0';
      } else {
        panel.setAttribute('aria-hidden', 'false');
        panel.hidden = false;
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }

      trigger.addEventListener('click', this.handleClick.bind(this));
      trigger.addEventListener('keydown', this.handleKeydown.bind(this));
    });
  }
  
  handleClick(event) {
    const trigger = event.currentTarget;
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      this.collapse(trigger);
    } else {
      // If not allowing multiple, collapse all others
      if (!this.config.allowMultiple) {
        this.collapseAll();
      }
      this.expand(trigger);
    }
  }
  
  handleKeydown(event) {
    const trigger = event.currentTarget;
    const triggers = Array.from(this.triggers);
    const currentIndex = triggers.indexOf(trigger);
    
    let nextTrigger;
    
    switch (event.key) {
      case 'ArrowDown':
      case 'Down':
        event.preventDefault();
        nextTrigger = triggers[currentIndex + 1] || triggers[0];
        nextTrigger.focus();
        break;
        
      case 'ArrowUp':
      case 'Up':
        event.preventDefault();
        nextTrigger = triggers[currentIndex - 1] || triggers[triggers.length - 1];
        nextTrigger.focus();
        break;
        
      case 'Home':
        event.preventDefault();
        triggers[0].focus();
        break;
        
      case 'End':
        event.preventDefault();
        triggers[triggers.length - 1].focus();
        break;
    }
  }
  
  expand(trigger) {
    const panel = this.getPanel(trigger);
    if (!panel) return;

    trigger.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    panel.hidden = false;
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  }

  collapse(trigger) {
    const panel = this.getPanel(trigger);
    if (!panel) return;

    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    panel.style.maxHeight = '0';

    const onEnd = () => {
      if (trigger.getAttribute('aria-expanded') === 'false') {
        panel.hidden = true;
      }
      panel.removeEventListener('transitionend', onEnd);
    };
    panel.addEventListener('transitionend', onEnd);
  }
  
  collapseAll() {
    this.triggers.forEach(trigger => {
      if (trigger.getAttribute('aria-expanded') === 'true') {
        this.collapse(trigger);
      }
    });
  }
  
  expandAll() {
    this.triggers.forEach(trigger => {
      if (trigger.getAttribute('aria-expanded') !== 'true') {
        this.expand(trigger);
      }
    });
  }
}

// Initialize all accordions on the page
export function initAccordion(selector = '.accordion', config = {}) {
  const accordions = qsa(selector);
  const instances = [];
  
  accordions.forEach(accordion => {
    instances.push(new Accordion(accordion, config));
  });
  
  console.log(`Accordion initialized on ${instances.length} element(s)`);
  return instances;
}

// Export class for manual instantiation
export { Accordion };
