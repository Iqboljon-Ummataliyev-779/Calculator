let calcSwitcher = document.querySelector(".c-t-ch-m-switch"),
  calcSwitcherDot = document.querySelector(".c-t-ch-m-switch-dot"),
  body = document.querySelector("body"),
  calcText = document.querySelector(".calc-text"),
  calcButtons = document.querySelectorAll(".calc-button"),
  deleteBtn = document.querySelector("#delBtn"),
  resetBtn = document.querySelector("#resetBtn"),
  equalBtn = document.querySelector("#equalBtn"),
  dotBtn = document.querySelector("#dotBtn"),
  storageFilled = false,
  add,
  subtract,
  decrement,
  incremend;

let firstPart;
let secondPart;
function theme1() {
  body.classList.add("theme-1");
  body.classList.remove("theme-2");
  body.classList.remove("theme-3");
}
function theme2() {
  body.classList.add("theme-2");
  body.classList.remove("theme-1");
  body.classList.remove("theme-3");
}
function theme3() {
  body.classList.add("theme-3");
  body.classList.remove("theme-2");
  body.classList.remove("theme-1");
}
theme1();

let start,
  secondMovement,
  backMove1,
  backMove2 = false,
  prevMovement,
  firstMovement = true;

calcSwitcher.addEventListener("mousedown", startChecking);
calcSwitcher.addEventListener("mousemove", changeSwitcher);
calcSwitcher.addEventListener("mouseup", endChecking);
calcSwitcher.addEventListener("mouseleave", endChecking);

function startChecking(e) {
  start = true;
  prevMovement = e.clientX;
}
function endChecking() {
  start = false;
}
function changeSwitcher(e) {
  if (!start) return;
  let movementX = e.clientX;
  if (firstMovement) {
    if (movementX - prevMovement > 20) {
      calcSwitcherDot.classList.add("dot-center");
      firstMovement = false;
      secondMovement = true;
      theme2();
    }
  }
  if (secondMovement) {
    if (movementX - prevMovement > 29) {
      calcSwitcherDot.classList.remove("dot-center");
      calcSwitcherDot.classList.add("dot-end");
      backMove1 = true;
      secondMovement = false;
      theme3();
    }
  }
  if (backMove1) {
    if (movementX - prevMovement < -21) {
      calcSwitcherDot.classList.add("dot-center");
      calcSwitcherDot.classList.remove("dot-end");
      backMove1 = false;
      backMove2 = true;
      secondMovement = true;
      theme2();
    }
  }
  if (backMove2) {
    if (movementX - prevMovement < -27) {
      calcSwitcherDot.classList.remove("dot-center");
      calcSwitcherDot.classList.add("dot-start");
      backMove2 = false;
      firstMovement = true;
      theme1();
    }
  }
}
let lastKey;
function setFirspart(kN) {
  if (kN == "x") {
    kN = "*";
  }
  if (storageFilled == false) {
    firstPart = calcText.textContent;
    storageFilled = true;
    calcText.textContent = "";
    lastKey = kN;
  } else {
    return "";
  }
}
function setNumber(keyName) {
  let kN = keyName.key;
  if (kN == "/" || kN == "+" || kN == "-" || kN == "*") {
    setFirspart(kN);
  } else if (kN == "Enter") {
    showResult();
  }
}
equalBtn.addEventListener("click", showResult);
function showResult() {
  secondPart = calcText.textContent;
  let result = `${firstPart} ${secondPart}`.split(" ");
  result = result.map((e) => Number(e));
  storageFilled = false;
  firstPart = undefined;
  secondPart = undefined;

  if (lastKey == "/") {
    calcText.textContent = result[0] / result[1];
  } else if (lastKey == "*") {
    calcText.textContent = result[0] * result[1];
  } else if (lastKey == "-") {
    calcText.textContent = result[0] - result[1];
  } else if (lastKey == "+") {
    calcText.textContent = result[0] + result[1];
  }
  lastKey = "";
}
function deleteNumber() {
  calcText.textContent = calcText.textContent.slice(
    0,
    calcText.textContent.length - 1
  );
}
function reset() {
  calcText.textContent = "";
}

resetBtn.addEventListener("click", reset);
deleteBtn.addEventListener("click", () => {
  deleteNumber();
});
document.addEventListener("keyup", (e) => {
  let keyName = e.key;
  switch (keyName) {
    case ".":
      calcText.textContent += keyName;
      break;
    case "Backspace":
      deleteNumber();
      break;
  }
  setNumber(e);
  if (keyName.search(/\d/) === 0) {
    calcText.textContent += keyName;
  }
});

calcButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let buttonText = e.target.textContent;
    if (buttonText.search(/\d/) === 0) {
      calcText.textContent += buttonText;
    }
    if (
      buttonText == "+" ||
      buttonText == "-" ||
      buttonText == "x" ||
      buttonText == "/"
    ) {
      setFirspart(buttonText);
    }
  });
});