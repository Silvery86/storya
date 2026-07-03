// DOM utilities

// Query selector shortcuts
export const qs = (selector, parent = document) => parent.querySelector(selector);
export const qsa = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

// RAF throttle for scroll/resize handlers
export const rafThrottle = (fn) => {
  let isRunning = false;
  return (...args) => {
    if (isRunning) return;
    isRunning = true;
    requestAnimationFrame(() => {
      fn(...args);
      isRunning = false;
    });
  };
};

// Debounce
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
