let timer;
let isRunning = false;
let timeRemaining = 0; // Time in seconds
let timerValue = ''; // For input from number keypad

const display = document.getElementById('timer');
const setButton = document.getElementById('setButton');
const clearButton = document.getElementById('clearButton');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const returnButton = document.getElementById('return');
const controlsDiv = document.getElementById('controls');
const keyPad = document.getElementById('keypad');
const setClearDiv = document.getElementById('set-clear');

// Load the alarm sound
const alarmSound = new Audio('assets/sounds/loud_alarm_sound.mp3');

// const testSoundButton = document.getElementById('testSoundButton');

// testSoundButton.addEventListener('click', () => {
//     alarmSound.play()
//         .then(() => {
//             console.log('Sound played successfully.');
//         })
//         .catch((error) => {
//             console.error('Error playing sound:', error);
//         });
// });


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
            showSetClear(); // Show set-clear div again when timer finishes
            alarmSound.play()
                .then(() => {
                    console.log('Sound played successfully.');
                    // Stop the sound after 3 seconds
                    setTimeout(() => {
                        alarmSound.pause();
                        alarmSound.currentTime = 0; // Reset the audio to the beginning
                    }, 5000); // 3000ms = 3 seconds
                })
                .catch((error) => {
                    console.error('Error playing sound:', error);
                });

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
    alarmSound.pause();
};

const returnFunction = () => {
    stopTimer();
    timeRemaining = 0;
    timerValue = '';
    updateDisplay();
    showSetClear();
    alarmSound.pause();
};

// Function to hide set-clear div and show controls div
const showControls = () => {
    setClearDiv.style.visibility = 'hidden';
    keyPad.style.visibility = 'hidden';
    controlsDiv.style.visibility = 'visible';
};

const showSetClear = () => {
    controlsDiv.style.visibility = 'hidden';
    setClearDiv.style.visibility = 'visible';
    keyPad.style.visibility = 'visible';
};


// Set button: Get the input from number keypad and set the timer
setButton.addEventListener('click', () => {
    if (timerValue.length === 0) {
        alert('Please enter a time using the number keypad.');
        return;
    }

    // Pad timerValue to ensure it is at least 6 digits long
    const paddedValue = timerValue.padStart(6, '0');

    // Extract hours, minutes, and seconds from the padded value
    const hours = parseInt(paddedValue.substring(0, 2), 10);
    const minutes = parseInt(paddedValue.substring(2, 4), 10);
    const seconds = parseInt(paddedValue.substring(4, 6), 10);

    // Calculate total timeRemaining in seconds
    timeRemaining = hours * 3600 + minutes * 60 + seconds;

    // Update display and show controls
    updateDisplay();
    showControls(); // Show controls when timer is set

    // Clear inputs
    clearinputs();
});

// Clear button: Clear input and reset the timer
clearButton.addEventListener('click', () => {
    stopTimer();
    timeRemaining = 0;
    timerValue = '';
    updateDisplay();
    showSetClear(); // Show set-clear div again after clearing
});

const clearinputs = () => {
    timerValue = '';
};

// Start and Stop buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
returnButton.addEventListener('click', returnFunction);

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

// Initialize display to show set-clear div and hide controls div
showSetClear();
