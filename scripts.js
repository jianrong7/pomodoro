const settings = document.querySelector('#settings');
const gearBtn = document.querySelector('#gearBtn');
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const stopBtn = document.querySelector("#stop");
const updateBtn = document.querySelector("#update")
const pomodoroSlider = document.getElementById("pomodoro");
const pomodoroOutput = document.getElementById("pomodoroCounter");
const shortBreakSlider = document.getElementById("shortBreak");
const shortBreakOutput = document.getElementById("shortBreakCounter");
const longBreakSlider = document.getElementById("longBreak");
const longBreakOutput = document.getElementById("longBreakCounter");
const keys = document.querySelector("#multimediaButtons");
const display = document.querySelector('#time');

let isClockRunning = false;
// // in seconds = 25 mins
let workSessionDuration = 1500;
let currentTimeLeftInSession = 1500;
let breakSessionDuration = 300;
let timeSpentInCurrentSession = 0;

function toggleClock(reset) {
    if (reset) {
        //Stop the timer
        stopClock();
    } else {
        if (isClockRunning === true) {
            // Pause the timer
            isClockRunning = false;
            clearInterval(clockTimer);
        } else {
            // Start the timer
            isClockRunning = true;
            clockTimer = setInterval(() => {
                // decrease the time left / increase time spent
                stepDown();
                displayCurrentTimeLeftInSession();
            }, 1000)
        }
    }
}
function stepDown() {
    if(currentTimeLeftInSession > 0) {
        currentTimeLeftInSession--;
        timeSpentInCurrentSession++;
    } else if (currentTimeLeftInSession === 0) {
        timeSpentInCurrentSession = 0;
            if (type == 'Work') {
                currentTimeLeftInSession = breakSessionDuration;
                displaySessionLog('Work');
                type = 'Break';
            } else {
                currentTimeLeftInSession = workSessionDuration;
                displaySessionLog('Break');
                type = 'Work'
            }
    }
    displayCurrentTimeLeftInSession();
}
function displayCurrentTimeLeftInSession() {
    const secondsLeft = currentTimeLeftInSession;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60);
    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time;
    }
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    display.innerText = result.toString();
}
function stopClock() {
    timeSpentInCurrentSession = 0;
    // reset timer we set
    clearInterval(clockTimer);
    // update variable to know that timer is stopped
    isClockRunning = false;
    // reset time left in the session to its original state
    currentTimeLeftInSession = workSessionDuration;
    // update display
    displayCurrentTimeLeftInSession();
}

playBtn.addEventListener('click', () => {
    toggleClock();
}) 
pauseBtn.addEventListener('click', () => {
    toggleClock();
}) 
stopBtn.addEventListener('click', () => {
    toggleClock(true);
}) 

// Settings Menu Javascript
let settingsShown = false;

// Setting menu functions
function showSettings() {
    settings.style.visibility = "visible";
    settings.style.opacity = "1";
}
function hideSettings() {
    settings.style.visibility = "visible";
    settings.style.opacity = "0";
}

// Show settings menu
gearBtn.addEventListener("click", function() {
    if (settingsShown == false) {
        showSettings();
        settingsShown = true;
    } else {
        hideSettings();
        settingsShown = false;
    }
})

// Setting Pomodoro timers to the default values
pomodoroOutput.innerHTML = pomodoroSlider.value;
shortBreakOutput.innerHTML = shortBreakSlider.value;
longBreakOutput.innerHTML = longBreakSlider.value;

// Detect changes on Pomodoro Sliders
pomodoroSlider.oninput = function() {
  pomodoroOutput.innerHTML = this.value;
}
shortBreakSlider.oninput = function() {
    shortBreakOutput.innerHTML = this.value;
}
longBreakSlider.oninput = function() {
    longBreakOutput.innerHTML = this.value;
}
updateBtn.addEventListener("click", function() {
    workSessionDuration = +(pomodoroSlider.value * 60);
    currentTimeLeftInSession = +(pomodoroSlider.value * 60);
    breakSessionDuration = +(shortBreakSlider.value * 60);
    displayCurrentTimeLeftInSession();
})


// MAKE CIRCLE MOVE WHEN TIMER STARTS