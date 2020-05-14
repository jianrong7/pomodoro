const settings = document.querySelector('#settings');
const gearBtn = document.querySelector('#gearBtn');
const playBtn = document.querySelector("#play")
const pauseBtn = document.querySelector("#pause")
const pomodoroSlider = document.getElementById("pomodoro");
const pomodoroOutput = document.getElementById("pomodoroCounter");
const shortBreakSlider = document.getElementById("shortBreak");
const shortBreakOutput = document.getElementById("shortBreakCounter");
const longBreakSlider = document.getElementById("longBreak");
const longBreakOutput = document.getElementById("longBreakCounter");
const keys = document.querySelector("#multimediaButtons");
const display = document.querySelector('#time');

let settingsShown = false;

function stopTimer() {
    clearInterval(myTimer)
}

// Timer function
function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was calledve elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) 
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    var myTimer = setInterval(timer, 1000);
}

playBtn.addEventListener("click", function () {
    var fiveMinutes = +(60 * pomodoroSlider.value),
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
});
pauseBtn.addEventListener("clicl", stopTimer);

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

// MAKE CIRCLE MOVE WHEN TIMER STARTS