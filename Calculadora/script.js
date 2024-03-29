const PRESSABLE_BUTTONS = ['1','2','3','4','5','6','7','9','0','.','+','-','*','/','Enter','Delete','Backspace']
const DOGE_PHRASES = ['wow', 'such math', 'very equation', 'much smart', 'many calculus','many correct','so numberus']
const PRESSED_OPERATOR_COLOR = "rgba(255, 235, 121, 0.7)"

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
    if (this.operatorElement && this.operatorElement.style.backgroundColor === PRESSED_OPERATOR_COLOR) {
      console.log('entrou aqui')
      this.operatorElement.style.backgroundColor = '';
      this.operatorElement = operatorElement;
      this.operatorElement.style.backgroundColor = PRESSED_OPERATOR_COLOR;
      return
    }

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

    this.operatorElement = operatorElement;
    this.operatorElement.style.backgroundColor = PRESSED_OPERATOR_COLOR;
  }
  
  solve() {
    if (!this.result) {
      this.result = this.bufferedNumber;
      this.bufferedNumber = undefined;
      this.operandNumber = this.displayElement.innerHTML;
    }
    if (this.result && this.operatorElement && this.operandNumber){
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
  }

  switchNumberSign() {
    if (this.displayElement.innerHTML.includes('-')) {
      this.currentNumber = this.displayElement.innerHTML.replace('-','');
    } else {
      this.currentNumber = '-' + this.displayElement.innerHTML;
    };
  }

  updateDisplay() {
    if (/^0*$/.test(this.currentNumber)){
      this.currentNumber = '0'
    }

    if (parseFloat(this.currentNumber)==0) {
      this.displayElement.innerHTML = this.currentNumber;
    } else {
      this.displayElement.innerHTML = parseFloat(parseFloat(this.currentNumber).toFixed(16));
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

document.addEventListener('keyup',(event) => {
  if (PRESSABLE_BUTTONS.includes(event.key)){
    document.getElementById(event.key).click()
  }
})