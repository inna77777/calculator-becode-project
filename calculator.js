const mainElement = document.querySelector("main");
const calcBody = document.createElement("div");
calcBody.classList.add("calc-body");

const resultDisplay = document.createElement("div");
resultDisplay.classList.add("result");
resultDisplay.textContent = "0";
calcBody.appendChild(resultDisplay);
const calcButtons = document.createElement("div");
calcButtons.classList.add("calc-buttons");

const buttonContents = [
  "(",
  ")",
  "%",
  "AC",
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "x",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
];

buttonContents.forEach((content) => {
  const button = document.createElement("div");
  button.textContent = content;
  if (content.match(/[0-9.]/)) {
    button.classList.add("number");
  } else if (content === "=") {
    button.classList.add("equal");
  } else {
    button.classList.add("symbols");
  }
  calcButtons.appendChild(button);
});
calcBody.appendChild(calcButtons);
mainElement.appendChild(calcBody);

let buttons = document.querySelectorAll(".calc-buttons > div");
let result = document.querySelector(".result");

let num1 = "";
let num2 = "";
let operator = "";
let finish = false;
let sign = ["+", "-", "x", "/", "%"];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.textContent;
    if (key === "AC") {
      clearAll();
    } else if (key === "=") {
      calculate();
    } else if (sign.includes(key)) {
      addOperator(key);
    } else if (key === ".") {
      dot();
    } else if (finish === true && !sign.includes(key)) {
      num1 = key;
    } else {
      num1 += key;
    }
    display();
  });
});

function clearAll() {
  num1 = "";
  num2 = "";
  operator = "";
  finish = false;
}

function calculate() {
  let res;
  switch (operator) {
    case "+":
      res = parseFloat(num2) + parseFloat(num1);
      break;
    case "-":
      res = parseFloat(num2) - parseFloat(num1);
      break;
    case "*":
      res = parseFloat(num2) * parseFloat(num1);
      break;
    case "/":
      res = parseFloat(num2) / parseFloat(num1);
      break;
    case "%":
      res = parseFloat(num2) % parseFloat(num1);
      break;
    default:
      res = num1;
  }
  num1 = res.toString();
  num2 = "";
  operator = "";
  finish = true;
  display();
}

function display() {
  if (num1 === "" && num2 === "" && operator === "") {
    result.textContent = "0";
  } else if (operator && num2) {
    result.textContent = num2 + operator + num1;
  } else {
    result.textContent = num1;
  }
}

function dot() {
  if (num1 === "") {
    num1 = "0.";
  } else if (!num1.includes(".")) {
    num1 += ".";
  }
}
function addOperator(operatorAdd) {
  if (num1 === "") {
    return;
  }
  if (operator !== "") {
    return;
  }
  operator = operatorAdd;
  num2 = num1;
  num1 = "";
}
