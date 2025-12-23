function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

const displayText = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

function insertDigit(digit) {
    if (displayText.textContent === "0") {
        if (digit !== "0") {
            displayText.textContent = digit;
        }
    }
    else {
        displayText.textContent += digit;
    }
}

function removeDigit() {
    let numbers = displayText.textContent;
    if (numbers.length < 2) {
        displayText.textContent = "0";
    }
    else {
        numbers = numbers.slice(0, numbers.length - 1);
        displayText.textContent = numbers;
    }
}

buttons.addEventListener('click', (event) => {
    let target = event.target;

    switch (target.id) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            insertDigit(target.id);
            break;
        case 'backspace':
            removeDigit();
            break;
        case 'clear':
            displayText.textContent = "0";
            break;
    }
});