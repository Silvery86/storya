/**
 * Accordion.js — Expandable content sections
 * Implements ARIA-compliant accordion with keyboard navigation
 */

import { qsa } from '../utils/dom.js';

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
  
  init() {
    // Set initial ARIA attributes
    this.triggers.forEach((trigger, index) => {
      const panel = trigger.nextElementSibling;
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      
      // Set IDs for ARIA
      const triggerId = `accordion-trigger-${index}`;
      const panelId = `accordion-panel-${index}`;
      
      trigger.id = triggerId;
      trigger.setAttribute('aria-controls', panelId);
      
      panel.id = panelId;
      panel.setAttribute('aria-labelledby', triggerId);
      
      // Set initial state
      if (!isExpanded) {
        panel.setAttribute('aria-hidden', 'true');
        panel.style.maxHeight = '0';
      } else {
        panel.setAttribute('aria-hidden', 'false');
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
      
      // Bind events
      trigger.addEventListener('click', this.handleClick.bind(this));
      trigger.addEventListener('keydown', this.handleKeydown.bind(this));
    });
    
    console.log('Accordion initialized');
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
    const panel = trigger.nextElementSibling;
    
    trigger.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    
    // Animate height
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  }
  
  collapse(trigger) {
    const panel = trigger.nextElementSibling;
    
    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    
    // Animate height
    panel.style.maxHeight = '0';
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
