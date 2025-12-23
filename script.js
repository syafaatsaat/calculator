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

function insertOperator(operator) {
    const operators = ['+', '-', '×', '÷']; 
    let currentExpression = displayText.textContent;
    if (checkOperatorUsed().result) 
    {
        let displayTextLen = currentExpression.length;
        let lastVariableUsed = currentExpression[displayTextLen - 1];
        if (operators.includes(lastVariableUsed)) {
            removeVariable();
        }
        else {
            return;
        }
    }

    displayText.textContent += operator;
}

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

function removeVariable() {
    let expression = displayText.textContent;
    if (expression.length < 2) {
        displayText.textContent = "0";
    }
    else {
        newExpression = expression.slice(0, expression.length - 1);
        displayText.textContent = newExpression;
    }
}

function computeResult() {
    const operatorUsed = checkOperatorUsed();
    let result = "";
    if (operatorUsed.result) {
        let variables = displayText.textContent.split(operatorUsed.operator);
        if (variables[1] === "") {
            result = variables[0];
        }
        else {
            let num1 = +variables[0];
            let num2 = +variables[1];
            result = operate(operatorUsed.operator, num1, num2);
        }

        displayText.textContent = result;
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
        case 'add':
            insertOperator('+');
            break;
        case 'subtract':
            insertOperator('-');
            break;
        case 'multiply':
            insertOperator('×');
            break;
        case 'divide':
            insertOperator('÷');
            break;
        case 'equal':
            computeResult();
            break;
        case 'backspace':
            removeVariable();
            break;
        case 'clear':
            displayText.textContent = "0";
            break;
    }
});