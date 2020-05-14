const settings = document.querySelector('#settings');
const gearBtn = document.querySelector('#gearBtn');
const pomodoroSlider = document.getElementById("pomodoro");
const pomodoroOutput = document.getElementById("pomodoroCounter");
const shortBreakSlider = document.getElementById("shortBreak");
const shortBreakOutput = document.getElementById("shortBreakCounter");
const longBreakSlider = document.getElementById("longBreak");
const longBreakOutput = document.getElementById("longBreakCounter");

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

// MAKE CIRCLE MOVE WHEN TIMER STARTS