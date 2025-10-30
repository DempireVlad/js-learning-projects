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

btnModes[0].classList.add("active_color");
applyBtn.addEventListener("click", () => {
  const selectedFont = document.querySelector("input[name='font']:checked");
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
  coloroptions.forEach((color) => {
    if (color.checked) {
      if (color.id === "color1") {
        progressRingCircle.style.stroke = "#F87070";
        active_color.style.backgroundColor = "#F87070";
      } else if (color.id === "color2") {
        progressRingCircle.style.stroke = "#70F3F8";
        active_color.style.backgroundColor = "#70F3F8";
      } else if (color.id === "color3") {
        progressRingCircle.style.stroke = "#D881F8";
        active_color.style.backgroundColor = "#D881F8";
      }
    }
  });
  modal.style.display = "none";
});


btnModes.forEach((btn) => {
  btn.addEventListener("click", () => {
    btnModes.forEach((b) => b.classList.remove("active_color"));
    btn.classList.add("active_color");
  });
});

settingBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
