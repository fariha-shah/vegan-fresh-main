// src/utils/toast.js
// Minimal toast utility — creates a floating message at bottom-right.
// No external library needed; matches .toast class in index.css

let timeoutId = null;

function show(message, duration = 2200) {
  let el = document.getElementById('vf-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'vf-toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.innerHTML = `✅ ${message}`;
  el.style.display = 'flex';

  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    el.style.display = 'none';
  }, duration);
}

export default { show };
