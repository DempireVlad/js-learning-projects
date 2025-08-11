let firstNumber = +window.prompt("Write the first number");
let secondNumber = +window.prompt("Write the second number");
let mathematicalOperation = window.prompt(
  "Select an action: +, -, *, /",
  "Write your action"
);

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

/**
 * The main function of the calculator
 *
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @param {"+" | "-" | "*" | "/"} action - Operator to apply
 * @returns {number | string} The result of the calculation or an error message
 * @example
 * calculator(5, 2, "*"); // 10
 */
function calculator(num1, num2, action) {
  if (action !== "+" && action !== "-" && action !== "/" && action !== "*") {
    return "Incorrect action";
  } else if (isNaN(num1) || isNaN(num2)) {
    return "No number entered!";
  } else if (action === "+") {
    return add(num1, num2);
  } else if (action === "-") {
    return subtract(num1, num2);
  } else if (action === "*") {
    return multiply(num1, num2);
  } else if (action === "/") {
    if (num2 === 0) {
      return "You can't divide by zero.!";
    }
    return divide(num1, num2);
  }
}

console.log(calculator(firstNumber, secondNumber, mathematicalOperation));