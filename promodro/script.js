const settingBtn = document.querySelector(".settings-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.getElementById("close-btn");
const btnModes = document.querySelectorAll(".mode");
const timeDisplay = document.querySelector(".time-display");
const applyBtn = document.querySelector(".apply-btn");
const progressRingCircle = document.querySelector(".progress-ring__circle");
const up = document.querySelectorAll(".up");
const down = document.querySelectorAll(".down");
const pomodoroInput = document.getElementById("pomodoro");
const shortInput = document.getElementById("short-break");
const longInput = document.getElementById("long-break");
const inputNumber = document.querySelectorAll("input[type='number']");
const timerBtn = document.querySelector(".timer-btn");

btnModes[0].classList.add("active_color");
let currentColor = "#F87070";
applyBtn.addEventListener("click", () => {
  const selectedFont = document.querySelector("input[name='font']:checked");
  // вибір шрифту
  if (selectedFont) {
    if (selectedFont.id === "font1") {
      document.body.style.fontFamily = "Kumbh Sans, sans-serif";
      document.body.style.fontWeight = "700";
    } else if (selectedFont.id === "font2") {
      document.body.style.fontFamily = "Roboto Slab, serif";
      document.body.style.fontWeight = "700";
    } else if (selectedFont.id === "font3") {
      document.body.style.fontFamily = "Space Mono, monospace";
      document.body.style.fontWeight = "400";
    }
  }

  const active_color = document.querySelector(".active_color");
  const coloroptions = document.querySelectorAll("input[name='color']");

  // Оновлення кольору
  coloroptions.forEach((color) => {
    if (color.checked) {
      if (color.id === "color1") {
        currentColor = "#F87070";
      } else if (color.id === "color2") {
        currentColor = "#70F3F8";
      } else if (color.id === "color3") {
        currentColor = "#D881F8";
      }

      progressRingCircle.style.stroke = currentColor;
      active_color.style.backgroundColor = currentColor;
    }
  });

  // Оновлення часу на дисплеї відповідно вибраного режиму
  const activeMode = document.querySelector(".mode.active_color"); //
  if (activeMode === btnModes[0]) {
    timeDisplay.textContent = `${pomodoroInput.value}:00`;
  } else if (activeMode === btnModes[1]) {
    timeDisplay.textContent = `${shortInput.value}:00`;
  } else if (activeMode === btnModes[2]) {
    timeDisplay.textContent = `${longInput.value}:00`;
  }
  progressRingCircle.style.strokeDashoffset = 0;
  currentTime = 0;
  clearInterval(timerInterval);
  timerBtn.textContent = "START";
  isRunning = false;
  totalTime = 0;

  modal.style.display = "none";
});

btnModes.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    btnModes.forEach((b) => {
      b.classList.remove("active_color");
      b.style.backgroundColor = "";
    });
    btn.classList.add("active_color");
    btn.style.backgroundColor = currentColor;

    const times = [pomodoroInput.value, shortInput.value, longInput.value];
    timeDisplay.textContent = `${times[index]}:00`;

    clearInterval(timerInterval);
    isRunning = false;
    timerBtn.textContent = "START";
    currentTime = 0;
    progressRingCircle.style.strokeDashoffset = 0;
  });
});


// Обробники для кнопок збільшення та зменшення значень
up.forEach((button, index) => {
  button.addEventListener("click", () => {
    const inputs = [pomodoroInput, shortInput, longInput];
    const maxValues = [60, 15, 30];
    const input = inputs[index];
    const maxValue = maxValues[index];
    input.value = Math.min(parseInt(input.value) + 1, maxValue);
  });
});

down.forEach((button, index) => {
  button.addEventListener("click", () => {
    const inputs = [pomodoroInput, shortInput, longInput];
    const minValues = [25, 1, 15];
    const input = inputs[index];
    const minValue = minValues[index];
    input.value = Math.max(parseInt(input.value) - 1, minValue);
  });
});

let currentTime = 0;
let timerInterval;
let isRunning = false;
let totalTime = 0;

//Функіція форматування часу

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}


function updateDisplay(timeInSeconds) {
  timeDisplay.textContent = formatTime(timeInSeconds);
}

//Отримання часу до вибраного режиму
function getActiveMode() {
  if (btnModes[0].classList.contains("active_color")) {
    return parseInt(pomodoroInput.value) * 60;
  } else if (btnModes[1].classList.contains("active_color")) {
    return parseInt(shortInput.value) * 60;
  } else if (btnModes[2].classList.contains("active_color")) {
    return parseInt(longInput.value) * 60;
  }
}

// Функція для запуску таймера
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerBtn.textContent = "PAUSE";
    if (currentTime === 0) {
      currentTime = getActiveMode();
      totalTime = currentTime;
    }

    updateDisplay(currentTime);

    const circle = document.querySelector(".progress-ring__circle");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = 0;

    const setProgress = (percent) => {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    };

    if (totalTime > 0) {
      const initialPercent = (currentTime / totalTime) * 100;
      setProgress(initialPercent);
    } else {
      setProgress(0);
    }
    // Запуск інтервалу таймера
    timerInterval = setInterval(() => {
      if (currentTime > 0) {
        currentTime--;
        updateDisplay(currentTime);
        let percent = (currentTime / totalTime) * 100;
        setProgress(percent);
      } else if (currentTime === 0) {
        clearInterval(timerInterval);
        isRunning = false;
        timerBtn.textContent = "RESTART";
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        timerBtn.textContent = "START";
      }
    }, 1000);
  } else {
    isRunning = false;
    timerBtn.textContent = "START";
    clearInterval(timerInterval);
  }
}

timerBtn.onmouseover = function () {
  this.style.color = currentColor;
};

timerBtn.onmouseout = function () {
  this.style.color = "";
};

timerBtn.addEventListener("click", startTimer);
//Відкриття та закриття налаштувань
settingBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
