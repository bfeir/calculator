class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clearAllDisplay();
    }


    clearAllDisplay() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    deleteTheLastNumberDisplayed() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumberInputByUser(number) {
        if (number === "." && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseCalculatorOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.computeMathematicFormula();
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    computeMathematicFormula() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getCurrentNumberDisplayedWithDecimalDigits(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplayOfCalculator() {
        this.currentOperandTextElement.innerText = this.getCurrentNumberDisplayedWithDecimalDigits(this.currentOperand)
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`   
        } else {
            this.previousOperandTextElement.innerText = ''
        }

    }
}

const numberButtons = document.querySelectorAll('[data-number');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumberInputByUser(button.innerText)
        calculator.updateDisplayOfCalculator()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseCalculatorOperation(button.innerText)
        calculator.updateDisplayOfCalculator()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.computeMathematicFormula()
    calculator.updateDisplayOfCalculator()
})

allClearButton.addEventListener('click', () => {
    calculator.clearAllDisplay()
    calculator.updateDisplayOfCalculator()
})

deleteButton.addEventListener('click', () => {
    calculator.deleteTheLastNumberDisplayed()
    calculator.updateDisplayOfCalculator()
})