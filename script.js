class Cal {
  constructor(prevOperand_TxtElmnt, crntOperand_TxtElmnt) {
    this.prevOperand_TxtElmnt = prevOperand_TxtElmnt
    this.crntOperand_TxtElmnt = crntOperand_TxtElmnt
    this.clear()
  }

  clear() {
    this.crntOperand = ''
    this.prevOperand = ''
    this.opr = undefined
  }

  delete() {
    this.crntOperand = this.crntOperand.toString().slice(0, -1)
  }

  appendNumber(num) {
    if (num === '.' && this.crntOperand.includes('.')) return
    this.crntOperand = this.crntOperand.toString() + num.toString()
  }

  chooseOperation(opr) {
    if (this.crntOperand === '') return
    if (this.preOperand !== '') {
      this.compute()
    }
    this.opr = opr
    this.prevOperand = this.crntOperand
    this.crntOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.prevOperand)
    const crnt = parseFloat(this.crntOperand)
    if (isNaN(prev) || isNaN(crnt)) return
    switch (this.opr) {
      case '+':
        computation = prev + crnt
        break
      case '-':
        computation = prev - crnt
        break
      case 'x':
        computation = prev * crnt
        break
      case '÷':
        computation = prev / crnt
        break
      case '%':
        computation = prev % crnt
        break
      default:
        return
    }
    this.crntOperand = computation
    this.opr = undefined
    this.prevOperand = ''
  }

  getDisplayNumber(num) {
    const strNum = num.toString()
    const intDig = parseFloat(strNum.split('.')[0])
    const decDig = strNum.split('.')[1]
    let intDis
    if (isNaN(intDig)) {
      intDis = ''
    } else {
      intDis = intDig.toLocaleString('en', { maxFractDigits: 0 })
    }
    if (decDig != null) {
      return `${intDis}.${decDig}`
    } else {
      return intDis
    }
  }

  updateDisplay() {
    this.crntOperand_TxtElmnt.innerText =
      this.getDisplayNumber(this.crntOperand)
    if (this.opr != null) {
      this.prevOperand_TxtElmnt.innerText =
        `${this.getDisplayNumber(this.prevOperand)} ${this.opr}`
    } else {
      this.prevOperand_TxtElmnt.innerText = ''
    }
  }
}


const numButtons = document.querySelectorAll('[data-num]')
const oprButtons = document.querySelectorAll('[data-opr]')
const equButton = document.querySelector('[data-equ]')
const delButton = document.querySelector('[data-del]')
const ACButton = document.querySelector('[data-AC]')
const prevOperand_TxtElmnt = document.querySelector('[data-prev-operand]')
const crntOperand_TxtElmnt = document.querySelector('[data-crnt-operand]')

const cal = new Cal(prevOperand_TxtElmnt, crntOperand_TxtElmnt)

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    cal.appendNumber(button.innerText)
    cal.updateDisplay()
  })
})

oprButtons.forEach(button => {
  button.addEventListener('click', () => {
    cal.chooseOperation(button.innerText)
    cal.updateDisplay()
  })
})

equButton.addEventListener('click', button => {
  cal.compute()
  cal.updateDisplay()
})

ACButton.addEventListener('click', button => {
  cal.clear()
  cal.updateDisplay()
})

delButton.addEventListener('click', button => {
  cal.delete()
  cal.updateDisplay()
})

document.addEventListener('keydown', function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/%]/g
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    cal.appendNumber(event.key)
    cal.updateDisplay()
  }
  if (event.key === '.') {
    event.preventDefault();
    cal.appendNumber(event.key)
    cal.updateDisplay()
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    cal.chooseOperation(event.key)
    cal.updateDisplay()
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    cal.compute()
    cal.updateDisplay()
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    cal.delete()
    cal.updateDisplay()
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    cal.clear()
    cal.updateDisplay()
  }

});
