let timer;
let isRunning = false;
let timeRemaining = 0; // Time in seconds
let timerValue = ''; // For input from number keypad

const display = document.getElementById('timer');
const timeInput = document.getElementById('timeInput');
const setButton = document.getElementById('setButton');
const clearButton = document.getElementById('clearButton');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

// Function to update the display in HH:MM:SS format
const updateDisplay = () => {
  const hours = Math.floor(timeRemaining / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((timeRemaining % 3600) / 60).toString().padStart(2, '0');
  const seconds = (timeRemaining % 60).toString().padStart(2, '0');
  display.textContent = `${hours}:${minutes}:${seconds}`;
};

// Function to start the timer countdown
const startTimer = () => {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(timer);
      isRunning = false;
      updateDisplay();
      return;
    }
    timeRemaining--;
    updateDisplay();
  }, 1000);
};

// Function to stop the timer
const stopTimer = () => {
  clearInterval(timer);
  isRunning = false;
};

// Set button: Get the input from text and set the timer
setButton.addEventListener('click', () => {
  const timeParts = timeInput.value.split(':').map(part => parseInt(part, 10));
  if (timeParts.length === 3) {
    const [hours, minutes, seconds] = timeParts;
    timeRemaining = hours * 3600 + minutes * 60 + seconds;
    updateDisplay();
  } else {
    alert('Please enter time in HH:MM:SS format');
  }
});

// Clear button: Clear input and reset the timer
clearButton.addEventListener('click', () => {
  timeInput.value = '';
  stopTimer();
  timeRemaining = 0;
  timerValue = ''; // Clear number keypad input
  updateDisplay();
});

// Start and Stop buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);

// Function to update the timer display from the number keypad input
const updateTimerDisplayFromKeypad = () => {
  const formattedValue = timerValue.padStart(6, '0'); // Ensure it's at least 6 digits
  const hours = formattedValue.substring(0, 2);
  const minutes = formattedValue.substring(2, 4);
  const seconds = formattedValue.substring(4, 6);
  display.textContent = `${hours}:${minutes}:${seconds}`;
};

// Handle input from the number keypad
const numButtons = document.querySelectorAll('.num-button');
numButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    if (timerValue.length < 6) { // Limit to 6 digits (HHMMSS)
      timerValue += e.target.textContent; // Append the clicked number
      updateTimerDisplayFromKeypad(); // Update the display
    }
  });
});

// Optional: Add functionality to set timer from number keypad input
setButton.addEventListener('click', () => {
  if (timerValue.length === 6) {
    const hours = parseInt(timerValue.substring(0, 2), 10);
    const minutes = parseInt(timerValue.substring(2, 4), 10);
    const seconds = parseInt(timerValue.substring(4, 6), 10);
    timeRemaining = hours * 3600 + minutes * 60 + seconds;
    updateDisplay();
    timerValue = ''; // Clear the input after setting
  }
});
