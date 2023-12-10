import { StackCalculator } from './stackCalculator'

export function patchToSafeCalculator(calculator: StackCalculator): StackCalculator {
  const divideOriginal = calculator.divide
  calculator.divide = () => {
    const divisor = calculator.peekValue()
    if (divisor === 0) {
      throw Error('Division by zero')
    }
    return divideOriginal.apply(calculator)
  }
  return calculator
}
