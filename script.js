// Get references to the DOM elements
const input = document.querySelector('input');
const defaultText = document.getElementById('default');
const debounceText = document.getElementById('debounce');
const throttleText = document.getElementById('throttle');

// Default
// Event listener for input changes
input.addEventListener('input', e => {
  // Update the default text immediately with the input value
  defaultText.textContent = e.target.value;

  // Invoke the debounce and throttle functions with the input value
  onDebounce(e.target.value);
  onThrottle(e.target.value);
});

// Debounce
// Debounce function to delay invoking a function until after a specified delay
const debounce = (fn, delay = 1000) => {
  let timer;
  return function (text) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(text);
    }, delay);
  };
};

// Debounce function applied to onDebounce function
const onDebounce = debounce(text => {
  // Update the debounce text with the input value after the specified delay
  debounceText.textContent = text;
});

// Throttle
// Throttle function to limit the rate at which a function can be invoked
const throttle = (fn, delay = 1000) => {
  let shouldWait = false;
  let waitingArgs;

  // Function to be called after the specified delay
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      // Invoke the function with the waiting arguments
      fn(waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return function (text) {
    if (shouldWait) {
      // If waiting, store the arguments for later invocation
      waitingArgs = text;
      return;
    }

    // Invoke the function with the current arguments
    fn(text);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
};

// Throttle function applied to onThrottle function
const onThrottle = throttle(text => {
  // Update the throttle text with the input value
  throttleText.textContent = text;
});
