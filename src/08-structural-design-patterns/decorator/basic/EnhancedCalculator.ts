import { StackCalculator } from '../../proxy/calcurator/stackCalculator'

class EnhancedCalculator {
  constructor(private calculator: StackCalculator) {
    this.calculator = calculator
  }

  add() {
    const addend2 = this.calculator.getValue()
    const addend1 = this.calculator.getValue()
    const result = addend1! + addend2!
    this.calculator.putValue(result)
    return result
  }

  divide() {
    const divisor = this.calculator.peekValue()
    if (divisor === 0) {
      throw Error('Division by zero')
    }
    return this.calculator.divide()
  }

  putValue(value: number) {
    return this.calculator.stack.push(value)
  }

  getValue() {
    return this.calculator.stack.pop()
  }

  peekValue() {
    return this.calculator.peekValue()
  }

  clear() {
    return (this.calculator.stack = [])
  }

  multiply() {
    return this.calculator.multiply()
  }
}

const calculator = new StackCalculator()
const enhancedCalculator = new EnhancedCalculator(calculator)

enhancedCalculator.putValue(4)
enhancedCalculator.putValue(3)
console.log(enhancedCalculator.add())
enhancedCalculator.putValue(2)
console.log(enhancedCalculator.multiply())
