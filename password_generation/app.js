const slider = document.getElementById("length");
function updateSlider() {
  const min = slider.min ? slider.min : 0;
  const max = slider.max ? slider.max : 100;
  const val = ((slider.value - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(to right, 
    var(--accent-color) 0%, 
    var(--accent-color) ${val}%, 
    #18171F ${val}%, 
    #18171F 100%)`;
}
slider.addEventListener("input", updateSlider);
updateSlider();

const lengthText = document.getElementById("lengthText");
const copyButton = document.getElementById("copy");
const passwordInput = document.getElementById("password");
const generateButton = document.querySelector(".generate");
const inputs = document.querySelectorAll('input[type="checkbox"]');
const copiedText = document.querySelector("#copy p");
const strengthBar = document.querySelector(".strength-bar");
const strengthLabel = document.querySelector(".strength-label");

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["@", "$", "#", "%", "&", "*", "?", "!"];
const characterCodes = Array.from(Array(26)).map((_, i) => i + 97);
const lowerCaseLetters = characterCodes.map((code) =>
  String.fromCharCode(code)
);
const upperCaseLetters = lowerCaseLetters.map((letter) => letter.toUpperCase());

function upgradePassword() {
  const length = slider.value;
  lengthText.textContent = `${length}`;

  const checkboxValues = Array.from(inputs).map((input) => input.checked);

  const password = generate(length, ...checkboxValues);


  passwordInput.value = password;
}



const generate = (
  length,
  hasUpperCase,
  hasLowerCase,
  hasNumbers,
  hasSymbols
) => {
  let charCodes = [
    ...(hasLowerCase ? lowerCaseLetters : []),
    ...(hasUpperCase ? upperCaseLetters : []),
    ...(hasNumbers ? numbers : []),
    ...(hasSymbols ? symbols : []),
  ];



  let optionsCount = 0;
  if (hasLowerCase) optionsCount++;
  if (hasUpperCase) optionsCount++;
  if (hasNumbers) optionsCount++;
  if (hasSymbols) optionsCount++;
  
  if (length  < 1 || optionsCount === 0) {
    strengthBar.style.backgroundImage = "url(./images/empty.png)";
    strengthLabel.textContent = "Need More";
  } else if (length < 6) {
    strengthBar.style.backgroundImage = "url(./images/to_weak.png)";
    strengthLabel.textContent = "TOO WEAK!";
  } else if (length < 10) {
    if (optionsCount >= 2) {
      strengthBar.style.backgroundImage = "url(./images/weak.png)";
      strengthLabel.textContent = "WEAK";
    } else {
      strengthBar.style.backgroundImage = "url(./images/to_weak.png)";
      strengthLabel.textContent = "TOO WEAK!";
    }
  } else if (length < 14) {
    if (optionsCount >= 3) {
      strengthBar.style.backgroundImage = "url(./images/medium.png)";
      strengthLabel.textContent = "MEDIUM";
    } else {
      strengthBar.style.backgroundImage = "url(./images/weak.png)";
      strengthLabel.textContent = "WEAK";
    }
  } else {
    if (optionsCount === 4) {
      strengthBar.style.backgroundImage = "url(./images/strong.png)";
      strengthLabel.textContent = "STRONG";
    } else if (optionsCount >= 2) {
      strengthBar.style.backgroundImage = "url(./images/medium.png)";
      strengthLabel.textContent = "MEDIUM";
    } else {
      strengthBar.style.backgroundImage = "url(./images/weak.png)";
      strengthLabel.textContent = "WEAK";
    }
  }


  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charCodes.length);
    password += charCodes[randomIndex];
  }
  return password;
};



inputs.forEach((inputsItem) =>
  inputsItem.addEventListener("input", upgradePassword)
);
slider.addEventListener("input", upgradePassword);
generateButton.addEventListener("click", upgradePassword);
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value);
  copiedText.textContent = "COPIED";
  setTimeout(() => {
    copiedText.textContent = "";
  }, 1000);
  
});



upgradePassword();
