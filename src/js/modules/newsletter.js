/**
 * Newsletter.js — Form validation and submission
 * Validates email and handles form submission
 */

import { qs } from '../utils/dom.js';

class Newsletter {
  constructor(formSelector = '#newsletter-form') {
    this.form = qs(formSelector);
    
    if (!this.form) {
      console.warn(`Newsletter form not found: ${formSelector}`);
      return;
    }
    
    this.input = this.form.querySelector('input[type="email"]');
    this.button = this.form.querySelector('button[type="submit"]');
    this.messageContainer = this.form.querySelector('.newsletter__message');
    
    this.init();
  }
  
  init() {
    // Prevent default form submission
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    
    // Real-time validation on input
    this.input.addEventListener('input', this.handleInput.bind(this));
    
    // Clear error on focus
    this.input.addEventListener('focus', this.clearError.bind(this));
    
    console.log('Newsletter form initialized');
  }
  
  handleInput(event) {
    const value = event.target.value.trim();
    
    // Clear validation states if input is empty
    if (value === '') {
      this.input.classList.remove('has-error', 'is-valid');
      return;
    }
    
    // Validate email format
    if (this.isValidEmail(value)) {
      this.input.classList.remove('has-error');
      this.input.classList.add('is-valid');
    } else {
      this.input.classList.remove('is-valid');
      this.input.classList.add('has-error');
    }
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    
    const email = this.input.value.trim();
    
    // Validate email
    if (!email) {
      this.showError('Please enter your email address');
      return;
    }
    
    if (!this.isValidEmail(email)) {
      this.showError('Please enter a valid email address');
      return;
    }
    
    // Disable form during submission
    this.setLoading(true);
    
    try {
      // Simulate API call (replace with actual endpoint)
      await this.submitEmail(email);
      
      // Show success
      this.showSuccess('Thanks for subscribing! Check your inbox.');
      
      // Reset form after delay
      setTimeout(() => {
        this.form.reset();
        this.input.classList.remove('is-valid');
        this.clearMessage();
      }, 5000);
      
    } catch (error) {
      this.showError(error.message || 'Something went wrong. Please try again.');
    } finally {
      this.setLoading(false);
    }
  }
  
  async submitEmail(email) {
    // Simulate API call with 1s delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) {
          resolve({ success: true });
        } else {
          reject(new Error('Network error'));
        }
      }, 1000);
    });
    
    // Real implementation would be:
    // const response = await fetch('/api/newsletter', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email })
    // });
    // 
    // if (!response.ok) {
    //   throw new Error('Subscription failed');
    // }
    // 
    // return response.json();
  }
  
  isValidEmail(email) {
    // RFC 5322 simplified regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  setLoading(isLoading) {
    this.button.disabled = isLoading;
    
    if (isLoading) {
      this.button.classList.add('button--loading');
      this.button.setAttribute('aria-busy', 'true');
    } else {
      this.button.classList.remove('button--loading');
      this.button.setAttribute('aria-busy', 'false');
    }
  }
  
  showError(message) {
    this.input.classList.add('has-error');
    this.input.classList.remove('is-valid');
    
    if (this.messageContainer) {
      this.messageContainer.textContent = message;
      this.messageContainer.className = 'newsletter__message newsletter__message--error';
      this.messageContainer.setAttribute('role', 'alert');
    }
    
    // Focus input for accessibility
    this.input.focus();
  }
  
  showSuccess(message) {
    this.input.classList.remove('has-error');
    this.input.classList.add('is-valid');
    
    if (this.messageContainer) {
      this.messageContainer.textContent = message;
      this.messageContainer.className = 'newsletter__message newsletter__message--success';
      this.messageContainer.setAttribute('role', 'status');
    }
  }
  
  clearError() {
    this.input.classList.remove('has-error');
    this.clearMessage();
  }
  
  clearMessage() {
    if (this.messageContainer) {
      this.messageContainer.textContent = '';
      this.messageContainer.className = 'newsletter__message';
      this.messageContainer.removeAttribute('role');
    }
  }
}

// Auto-initialize on DOM ready
export function initNewsletter(formSelector) {
  return new Newsletter(formSelector);
}

// Export class for manual instantiation
export { Newsletter };
