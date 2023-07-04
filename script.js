const input = document.querySelector('input');
const defaultText = document.getElementById('default');
const debounceText = document.getElementById('debounce');
const throttleText = document.getElementById('throttle');

// Default
input.addEventListener('input', e => {
  defaultText.textContent = e.target.value;

  onDebounce(e.target.value);
  onThrottle(e.target.value);
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

// Throttle
const throttle = (fn, delay = 1000) => {
  let shouldWait = false;
  let waitingArgs;

  const timeoutFunc = () => {
    console.log('timeoutFunc');
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      fn(waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return function (text) {
    if (shouldWait) {
      waitingArgs = text;
      return;
    }

    fn(text);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
};

const onThrottle = throttle(text => {
  throttleText.textContent = text;
});
