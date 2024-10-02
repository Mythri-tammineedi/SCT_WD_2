let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapCounter = 1;

const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const timeDisplay = document.getElementById('time-display');
const lapsList = document.getElementById('laps');

// Start the stopwatch
startButton.addEventListener('click', () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    isRunning = true;
    startButton.textContent = 'Resume';
    pauseButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
  }
});

// Pause the stopwatch
pauseButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  isRunning = false;
  pauseButton.disabled = true;
});

// Reset the stopwatch
resetButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  startButton.textContent = 'Start';
  updateTimeDisplay(0);
  pauseButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;
  lapsList.innerHTML = '';
  lapCounter = 1;
});

// Record a lap
lapButton.addEventListener('click', () => {
  const lapTime = formatTime(elapsedTime);
  const lapElement = document.createElement('li');
  lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
  lapsList.appendChild(lapElement);
  lapCounter++;
});

// Update the time display
function updateTime() {
  elapsedTime = Date.now() - startTime;
  updateTimeDisplay(elapsedTime);
}

// Update the time on the page
function updateTimeDisplay(time) {
  timeDisplay.textContent = formatTime(time);
}

// Format time in mm:ss:ms
function formatTime(time) {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 60000) % 60);

  const ms = milliseconds < 10 ? `0${milliseconds}` : milliseconds;
  const s = seconds < 10 ? `0${seconds}` : seconds;
  const m = minutes < 10 ? `0${minutes}` : minutes;

  return `${m}:${s}:${ms}`;
}
