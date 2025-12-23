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
    if (num2 === 0) {
        return "Undefined";
    }

    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
    }
}

const displayText = document.querySelector("#display");
const buttons = document.querySelector("#buttons");
let justFinishedOperation = false;
let theLeftOperand = "";
let theOperator = "";
let theRightOperand = "";

function checkOperatorUsed() {
    const operators = ['+', '-', '×', '÷'];
    let currentExpression = displayText.textContent;
    for (const operator of operators) {
        if (currentExpression.includes(operator)) {
            return {
                result: true,
                operator: operator,
            };
        }
    }
    return {
        result: false
    };
}

function updateDisplay() {
    displayText.textContent = theLeftOperand + theOperator + theRightOperand;
    if (displayText.textContent.length === 0) {
        displayText.textContent = "0";
    }
}

function insertOperator(operator) {
    if (justFinishedOperation && theLeftOperand === "Undefined") {
        return;
    }
    
    if (theRightOperand === "") {
        theOperator = operator;
    }
}

function insertDigit(digit) {
    if (justFinishedOperation) {
        clearDisplay();
    }

    if (theOperator === "") {
        if (digit === ".") {
            if (theLeftOperand.includes(digit)) {
                return;
            }
        }

        theLeftOperand += digit;
    }
    else {
        if (digit === ".") {
            if (theRightOperand.includes(digit)) {
                return;
            }
        }

        theRightOperand += digit;
    }
}

function removeVariable() {
    if (justFinishedOperation) {
        clearDisplay();
    }

    if (theOperator === "") {
        if (theLeftOperand.length > 0) {
            theLeftOperand = theLeftOperand.slice(
                0, theLeftOperand.length - 1
            );
        }
    }
    else {
        if (theRightOperand.length > 0) {
            theRightOperand = theRightOperand.slice(
                0, theRightOperand.length - 1
            );
        }
        else {
            theOperator = "";
        }
    }
}

function computeResult() {
    if (theOperator !== "") {
        let result = "";
        if (theRightOperand === "") {
            result = theLeftOperand;
        }
        else {
            result = operate(theOperator, +theLeftOperand, +theRightOperand);
        }

        theLeftOperand = result;
        theOperator = "";
        theRightOperand = "";
        justFinishedOperation = true;
    }
}

function clearDisplay() {
    justFinishedOperation = false;
    theLeftOperand = "";
    theOperator = "";
    theRightOperand = "";
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
            updateDisplay();
            break;
        case 'decimal':
            insertDigit('.');
            updateDisplay();
            break;
        case 'add':
            insertOperator('+');
            updateDisplay();
            break;
        case 'subtract':
            insertOperator('-');
            updateDisplay();
            break;
        case 'multiply':
            insertOperator('×');
            updateDisplay();
            break;
        case 'divide':
            insertOperator('÷');
            updateDisplay();
            break;
        case 'equal':
            computeResult();
            updateDisplay();
            break;
        case 'backspace':
            removeVariable();
            updateDisplay();
            break;
        case 'clear':
            clearDisplay();
            updateDisplay();
            break;
    }
});