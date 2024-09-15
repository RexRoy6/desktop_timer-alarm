let timer;
let isRunning = false;
let timeRemaining = 0; // Time in seconds

const display = document.getElementById('timer');
const timeInput = document.getElementById('timeInput');
const setButton = document.getElementById('setButton');
const clearButton = document.getElementById('clearButton');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

const updateDisplay = () => {
  const hours = Math.floor(timeRemaining / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((timeRemaining % 3600) / 60).toString().padStart(2, '0');
  const seconds = (timeRemaining % 60).toString().padStart(2, '0');
  display.textContent = `${hours}:${minutes}:${seconds}`;
};

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

const stopTimer = () => {
  clearInterval(timer);
  isRunning = false;
};

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

clearButton.addEventListener('click', () => {
  timeInput.value = '';
  stopTimer();
  timeRemaining = 0;
  updateDisplay();
});

startButton.addEventListener('click', () => {
  startTimer();
});

stopButton.addEventListener('click', () => {
  stopTimer();
});
