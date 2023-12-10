import { StackCalculator } from './stackCalculator'

export class SafeCalculator {
  private calculator

  constructor(calculator: StackCalculator) {
    this.calculator = calculator
  }

  // 프록시 함수
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
