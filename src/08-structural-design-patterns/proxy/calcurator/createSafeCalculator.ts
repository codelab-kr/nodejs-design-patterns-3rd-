import { StackCalculator } from './stackCalculator'


export function createSafeCalculator(calculator: StackCalculator) {
  return {
    divide() {
      const divisor = calculator.peekValue()
      if (divisor === 0) {
        throw Error('Division by zero')
      }
      return calculator.divide()
    },

    putValue(value: number) {
      return calculator.stack.push(value)
    },

    getValue() {
      return calculator.stack.pop()
    },

    peekValue() {
      return calculator.peekValue()
    },

    clear() {
      return (calculator.stack = [])
    },

    multiply() {
      return calculator.multiply()
    }
  }
}
