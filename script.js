const input = document.querySelector('input');
const defaultText = document.getElementById('default');
const debounceText = document.getElementById('debounce');
const throttleText = document.getElementById('throttle');

// Default
input.addEventListener('input', e => {
  defaultText.textContent = e.target.value;

  onDebounce(e.target.value);
});

// Debounce
const debounce = (fn, delay = 1000) => {
  let timer;
  return function (text) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(text);
    }, delay);
  };
};

const onDebounce = debounce(text => {
  debounceText.textContent = text;
});
