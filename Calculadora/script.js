const DOGE_PHRASES = ['wow', 'such math', 'very equation', 'much smart', 'many calculus','many correct','so numberus']
const PRESSED_OPERATOR_COLOR = "rgba(255, 235, 121, 0.699)"

function dogePhraseGenerator() {
  return DOGE_PHRASES[Math.floor(Math.random() * DOGE_PHRASES.length)]
}

class Doge {
  constructor(commentElement) {
    this.commentElement = commentElement;
  }
  
  updateComment() {
    this.commentElement.innerHTML = dogePhraseGenerator();
  }
  
}

class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.allClear();
  }

  appendNumber(number) {
    if (this.result) {
      this.allClear();
    }
    if (number == '.' && this.currentNumber.includes('.')) {
      return
    };
    this.currentNumber = this.currentNumber.toString() + number.toString();
  };
  
  setOperator(operatorElement) {
    if (this.result) {
      this.bufferedNumber = this.result;
      this.result = undefined;

    } else if (this.bufferedNumber) {
      this.solve();
      this.updateDisplay();
      this.bufferedNumber = this.result;
      this.result = undefined;

    } else {
      this.bufferedNumber = this.currentNumber;
    }


    if (this.operatorElement) {
      this.operatorElement.style.backgroundColor = '';
    }
    this.operatorElement = operatorElement;
    this.operatorElement.style.backgroundColor = PRESSED_OPERATOR_COLOR;
  }
  
  solve() {
    if (!this.result) {
      this.result = this.bufferedNumber;
      this.bufferedNumber = undefined;
      this.operandNumber = this.displayElement.innerHTML;
    }

    switch(this.operatorElement.innerHTML){
      case '+':
        this.result = (parseFloat(this.result) + parseFloat(this.operandNumber)).toString();
        break
      case '-':
        this.result = (parseFloat(this.result) - parseFloat(this.operandNumber)).toString();
        break
      case '÷':
        this.result = (parseFloat(this.result) / parseFloat(this.operandNumber)).toString();
        break
      case '*':
        this.result = (parseFloat(this.result) * parseFloat(this.operandNumber)).toString();
        break
    }

    this.currentNumber = this.result;
    this.operatorElement.style.backgroundColor = '';
  }

  switchNumberSign() {
    if (this.currentNumber.includes('-')) {
      this.currentNumber = this.currentNumber.replace('-','');
    } else {
      this.currentNumber = '-' + this.currentNumber;
    };
  }

  updateDisplay() {
    if (this.currentNumber.includes('.')) {
      this.displayElement.innerHTML = this.currentNumber;
    } else {
      this.displayElement.innerHTML = parseFloat(this.currentNumber).toString();
    }
  }

  allClear() {
    this.currentNumber = '0';
    this.bufferedNumber = undefined;
    this.operandNumber = undefined;
    this.result = undefined;
    if (this.operatorElement) {
      this.operatorElement.style.backgroundColor = '';
    }
    this.operatorElement = undefined;
  }
  
  clear() {
    this.currentNumber = '0';
  }
};

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const allClearButton = document.querySelector('.allClear');
const clearButton = document.querySelector('.clear');
const numberSignButton = document.querySelector('.numberSign');
const equalButton = document.querySelector('.equal');
const displayElement = document.querySelector('.display');
const dogeComment = document.querySelector('.dogeComment');

const calculator = new Calculator(
  displayElement
);

const doge = new Doge(
  dogeComment
)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerHTML);
    calculator.updateDisplay();
  })
})

operatorButtons.forEach(button => {
  button.addEventListener('click', () => { 
    calculator.setOperator(button);
    calculator.clear();
  })
})

equalButton.addEventListener('click', () => {
  calculator.solve();
  calculator.updateDisplay();
  calculator.clear();
  doge.updateComment();
})

numberSignButton.addEventListener('click', () => {
  calculator.switchNumberSign();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
  calculator.allClear ();
  calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})